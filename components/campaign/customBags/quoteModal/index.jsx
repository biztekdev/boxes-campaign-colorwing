'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSessionTracking } from '@/hooks/useSessionTracking';
import { trackFormSubmit } from '@/utils/gtag';

const QUOTE_API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}/quote`
  : '/api/quote';

function formatPhoneNumber(value) {
  if (!value || value === '+1') return '+1';
  const cleanValue = value.replace(/[^\d+]/g, '');
  if (!cleanValue.startsWith('+1')) return '+1';
  const phone = cleanValue.slice(2).replace(/\D/g, '').slice(0, 10);
  const phoneLength = phone.length;
  if (phoneLength === 0) return '+1';
  if (phoneLength < 4) return `+1${phone}`;
  if (phoneLength < 7) return `+1 (${phone.slice(0, 3)}) ${phone.slice(3)}`;
  return `+1 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
}

function normalizePhoneNumber(value) {
  return value ? value.replace(/[^\d+]/g, '') : '';
}

export default function QuoteModal({ isOpen, onClose, product }) {
  const [customQuantity, setCustomQuantity] = useState("");
  const [dimensions, setDimensions] = useState({ width: "", height: "", gusset: "", unit: "Inch" });
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+1");
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const campaignFormId = 'campaign-custom-bags-modal-form';
  const { updateSession, debouncedUpdate, isReady } = useSessionTracking({
    formId: campaignFormId,
    debounceMs: 1000,
  });

  useEffect(() => {
    if (isReady && product) {
      const sessionData = {
        product_name: product?.title || '',
        fullName: fullName || '',
        company: company || '',
        email: email || '',
        phone: phone || '',
        quantity: customQuantity || '',
        dimensions: {
          width: dimensions.width || '',
          height: dimensions.height || '',
          gusset: dimensions.gusset || '',
          unit: dimensions.unit || '',
        },
        campaignId: 'custom-bags-modal',
        formSource: 'product-modal',
      };
      const hasSessionData = [product?.title, fullName, company, email, phone, customQuantity, dimensions.width, dimensions.height, dimensions.gusset].some((v) => v && v !== '');
      if (hasSessionData) {
        debouncedUpdate(sessionData);
      }
    }
  }, [product, customQuantity, dimensions.width, dimensions.height, dimensions.gusset, dimensions.unit, fullName, company, email, phone, debouncedUpdate, isReady]);

  const validate = () => {
    const nextErrors = {};
    if (!fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }
    if (!customQuantity) {
      nextErrors.quantity = "Please enter a quantity.";
    } else if (!/^\d+$/.test(customQuantity.trim())) {
      nextErrors.quantity = "Custom quantity must be a number.";
    } else if (parseInt(customQuantity.trim(), 10) < 1000) {
      nextErrors.quantity = "Custom quantity must be at least 1000.";
    }
    if (!(dimensions.width || '').trim()) {
      nextErrors.sizeWidth = "Please enter width.";
    } else if (!/^\d+(\.\d+)?$/.test((dimensions.width || '').trim())) {
      nextErrors.sizeWidth = "Width must be a valid number.";
    }
    if (!(dimensions.height || '').trim()) {
      nextErrors.sizeHeight = "Please enter height.";
    } else if (!/^\d+(\.\d+)?$/.test((dimensions.height || '').trim())) {
      nextErrors.sizeHeight = "Height must be a valid number.";
    }
    if (!(dimensions.gusset || '').trim()) {
      nextErrors.sizeGusset = "Please enter gusset.";
    } else if (!/^\d+(\.\d+)?$/.test((dimensions.gusset || '').trim())) {
      nextErrors.sizeGusset = "Gusset must be a valid number.";
    }
    if (!email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    const cleanedPhone = normalizePhoneNumber(phone);
    if (!cleanedPhone || cleanedPhone === '+1') {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!/^\+?\d{7,15}$/.test(cleanedPhone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsSuccess(false);

    if (!validate()) {
      setStatusMessage("Please fix the errors in the form.");
      return;
    }

    const payload = {
      name: fullName,
      email,
      phone,
      company: company || '',
      product_name: product?.title || '',
      category: 'Custom Bags',
      quantity: customQuantity,
      dimensions: {
        width: dimensions.width || '',
        height: dimensions.height || '',
        gusset: dimensions.gusset || '',
        unit: dimensions.unit || '',
      },
      description: product?.title || '',
      isCampaignPage: true,
      campaignId: 'custom-bags-modal',
      campaignUrl: typeof window !== 'undefined' ? window.location.href : '',
    };

    trackFormSubmit({
      formName: 'campaign_custom_bags_modal',
      additionalData: {
        fullName: fullName,
        company: company,
        email: email,
        phone: phone,
        quantity: customQuantity,
        dimensions: {
          width: dimensions.width || '',
          height: dimensions.height || '',
          gusset: dimensions.gusset || '',
          unit: dimensions.unit || '',
        },
        product: product?.title || '',
        campaignId: 'custom-bags-modal',
      },
    });

    setIsSubmitting(true);
    try {
      const response = await fetch(QUOTE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Unable to submit form');
      }

      if (isReady) {
        updateSession(payload);
      }

      setIsSuccess(true);
      setStatusMessage('Your request has been submitted successfully!');
      router.push('/thank-you');
      return;
    } catch (error) {
      console.error(error);
      setStatusMessage('Something went wrong. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">{product?.title || 'Get Instant Quote'}</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Quantity</label>
              <input
                value={customQuantity}
                onChange={(e) => setCustomQuantity(e.target.value)}
                placeholder="Enter your desired quantity (min 1000)"
                className={`w-full rounded-lg border px-4 py-3 text-slate-900 outline-none ${errors.quantity ? 'border-red-500' : 'border-slate-300'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Size</label>
              <div className="grid grid-cols-[1fr_1fr_1fr_100px] gap-2">
                <div>
                  <input
                    value={dimensions.width}
                    onChange={(e) => setDimensions((p) => ({ ...p, width: e.target.value }))}
                    placeholder="Width"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${errors.sizeWidth ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                <div>
                  <input
                    value={dimensions.height}
                    onChange={(e) => setDimensions((p) => ({ ...p, height: e.target.value }))}
                    placeholder="Height"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${errors.sizeHeight ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                <div>
                  <input
                    value={dimensions.gusset}
                    onChange={(e) => setDimensions((p) => ({ ...p, gusset: e.target.value }))}
                    placeholder="Gusset"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${errors.sizeGusset ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                <select
                  value={dimensions.unit}
                  onChange={(e) => setDimensions((p) => ({ ...p, unit: e.target.value }))}
                  className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm outline-none"
                >
                  <option value="Inch">In</option>
                  <option value="Cm">Cm</option>
                  <option value="Mm">Mm</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className={`w-full rounded-lg border px-4 py-3 text-slate-900 outline-none ${errors.fullName ? 'border-red-500' : 'border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Company</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company (optional)"
                  className={`w-full rounded-lg border px-4 py-3 text-slate-900 outline-none ${errors.company ? 'border-red-500' : 'border-slate-300'}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className={`w-full rounded-lg border px-4 py-3 text-slate-900 outline-none ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formatPhoneNumber(phone)}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (123) 456-7890"
                  className={`w-full rounded-lg border px-4 py-3 text-slate-900 outline-none ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                />
              </div>
            </div>

            <button
              {...(customQuantity && dimensions.width && dimensions.height && dimensions.gusset && fullName && email && phone && phone !== '+1' ? { id: 'quote-submit' } : {})}
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-[#00ADEE] px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60 mt-6"
            >
              {isSubmitting ? 'Submitting…' : 'Get A Quote'}
            </button>

            {statusMessage && (
              <div className={`rounded-lg px-4 py-3 text-sm ${isSuccess ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}`}>
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
