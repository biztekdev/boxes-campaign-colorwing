'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSessionTracking } from '@/hooks/useSessionTracking';
import { trackFormSubmit } from '@/utils/gtag';

const styles = [
  "Custom Box",
  "Display Boxes",
  "Pillow Boxes",
  "Custom Soap Boxes",
  "Custom Tuck Boxes",
  "Magnetic Closure Boxes",
  "Custom Mailer Boxes",
  "Candle Boxes",
  "Custom Gable Boxes",
  "Eco Friendly Boxes",
  "Drawer Gift Boxes",
  "Satin Lined Boxes",
  "Supplements Packaging",
  "Pharma Packaging",
  "Custom Metalized Print Boxes",
  "Gold Foil Boxes",
];

function formatPhoneNumber(value) {
  const cleaned = value ? value.replace(/[^\d+]/g, '') : '';
  const digits = cleaned.replace(/\D/g, '');
  if (!digits || digits === '1') return '+1';
  let phone = digits;
  if (phone.length === 11 && phone.startsWith('1')) {
    phone = phone.slice(1);
  }
  phone = phone.slice(0, 10);
  const phoneLength = phone.length;
  if (phoneLength === 0) return '+1';
  if (phoneLength < 4) return `+1${phone}`;
  if (phoneLength < 7) return `+1 (${phone.slice(0, 3)}) ${phone.slice(3)}`;
  return `+1 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
}

function normalizePhoneNumber(value) {
  return value ? value.replace(/[^\d+]/g, '') : '';
}

export default function Form() {
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);
  const [customQuantity, setCustomQuantity] = useState("");
  const [sizeWidth, setSizeWidth] = useState("");
  const [sizeHeight, setSizeHeight] = useState("");
  const [sizeGusset, setSizeGusset] = useState("");
  const [sizeUnit, setSizeUnit] = useState("In");
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+1");
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const campaignFormId = 'campaign-custom-bags-form';
  const { updateSession, debouncedUpdate, isReady } = useSessionTracking({
    formId: campaignFormId,
    debounceMs: 1000,
  });

  useEffect(() => {
    if (isReady) {
      const sessionData = {
        fullName: fullName || '',
        company: company || '',
        email: email || '',
        phone: phone || '',
        pouch: selectedStyle || '',
        quantity: customQuantity || '',
        sizeWidth: sizeWidth || '',
        sizeHeight: sizeHeight || '',
        sizeGusset: sizeGusset || '',
        sizeUnit: sizeUnit || '',
        note: message || '',
        campaignId: 'custom-bags',
      };
      const hasSessionData = Object.values(sessionData).some((value) => value !== '');
      if (hasSessionData) {
        debouncedUpdate(sessionData);
      }
    }
  }, [selectedStyle, customQuantity, sizeWidth, sizeHeight, sizeGusset, sizeUnit, message, fullName, company, email, phone, debouncedUpdate, isReady]);

  const validate = () => {
    const nextErrors = {};
    if (!customQuantity) {
      nextErrors.quantity = "Please enter a quantity.";
    } else if (!/^\d+$/.test(customQuantity.trim())) {
      nextErrors.quantity = "Custom quantity must be a number.";
    } else if (parseInt(customQuantity.trim(), 10) < 1000) {
      nextErrors.quantity = "Custom quantity must be at least 1000.";
    }
    if (!sizeWidth.trim()) {
      nextErrors.sizeWidth = "Please enter width.";
    } else if (!/^\d+(\.\d+)?$/.test(sizeWidth.trim())) {
      nextErrors.sizeWidth = "Width must be a valid number.";
    }
    if (!sizeHeight.trim()) {
      nextErrors.sizeHeight = "Please enter height.";
    } else if (!/^\d+(\.\d+)?$/.test(sizeHeight.trim())) {
      nextErrors.sizeHeight = "Height must be a valid number.";
    }
    if (!sizeGusset.trim()) {
      nextErrors.sizeGusset = "Please enter gusset.";
    } else if (!/^\d+(\.\d+)?$/.test(sizeGusset.trim())) {
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
      company,
      product_name: selectedStyle,
      category: 'Custom Bags',
      quantity: customQuantity,
      size_width: sizeWidth,
      size_height: sizeHeight,
      size_gusset: sizeGusset,
      size_unit: sizeUnit,
      description: message,
      isCampaignPage: true,
      campaignId: 'custom-bags',
      campaignUrl: typeof window !== 'undefined' ? window.location.href : '',
    };

    trackFormSubmit({
      formName: 'campaign_custom_bags',
      additionalData: {
        style: selectedStyle,
        quantity: customQuantity,
        size_width: sizeWidth,
        size_height: sizeHeight,
        size_gusset: sizeGusset,
        size_unit: sizeUnit,
        campaignId: 'custom-bags',
      },
    });

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quote', {
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

  return (
    <form className='mt-4' onSubmit={handleSubmit}>
      <h2 className='text-[20px] xl:text-[25px] 2xl:text-[30px] font-bold text-[#000000] leading-tight SFProDisplay'>Custom Boxes That Upscale Your Brand Recognition</h2>
      <p className='text-[12px] xl:text-[14px] font-normal mt-3 text-[#535353]'>With our custom-printed boxes, your brand’s unique identity is maintained, and your brand authority is established.  Secure your brand’s market position with premium Custom Boxes designed for integrity and high-impact retail presence. 
</p>

      <div className='pb-4 px-8 border mt-2 rounded-[10px] border-[#8D8989]'>
         <div className='mt-4 grid gap-4'>
        <label className='block text-[14px] md:text-[16px]  xl:text-[18px] font-medium text-black'>Select Bag Style</label>
        <select
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          className='w-full rounded-[10px] border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-500'
        >
          {styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      <div className='mt-2'>
        <label className='block text-[14px] md:text-[16px]  xl:text-[18px] font-medium text-black'>Quantity</label>
        <input
          value={customQuantity}
          onChange={(e) => setCustomQuantity(e.target.value)}
          placeholder='Enter your desired quantity (min 1000)'
          className={`mt-2 w-full rounded-[10px] border border-[#C0BDBD] px-4 py-3 text-slate-900 outline-none ${errors.quantity ? 'border-red-500' : 'border-slate-300'}`}
        />
      </div>

      <div className='mt-2'>
        <label className='block text-[14px] md:text-[16px]  xl:text-[18px] font-medium text-black'>Size</label>
        <div className='mt-2 grid gap-4 sm:grid-cols-[1fr_1fr_1fr_120px] items-end'>
          <div>
            <input
              value={sizeWidth}
              onChange={(e) => setSizeWidth(e.target.value)}
              placeholder='Width'
              className={`w-full rounded-[10px] border px-4 py-2.5 text-slate-900 outline-none ${errors.sizeWidth ? 'border-red-500' : 'border-slate-300'}`}
            />
          </div>
          <div>
            <input
              value={sizeHeight}
              onChange={(e) => setSizeHeight(e.target.value)}
              placeholder='Height'
              className={`w-full rounded-[10px] border px-4 py-2.5 text-slate-900 outline-none ${errors.sizeHeight ? 'border-red-500' : 'border-slate-300'}`}
            />
          </div>
          <div>
            <input
              value={sizeGusset}
              onChange={(e) => setSizeGusset(e.target.value)}
              placeholder='Gusset'
              className={`w-full rounded-[10px] border px-4 py-2.5 text-slate-900 outline-none ${errors.sizeGusset ? 'border-red-500' : 'border-slate-300'}`}
            />
          </div>
          <div>
            <select
              value={sizeUnit}
              onChange={(e) => setSizeUnit(e.target.value)}
              className='w-full rounded-[10px] border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none'
            >
              <option value='In'>in</option>
              <option value='Cm'>cm</option>
              <option value='Mm'>mm</option>
            </select>
          </div>
        </div>
      </div>

      <div className='mt-2'>
        <label className='block text-[14px] md:text-[16px]  xl:text-[18px] font-medium text-black'>Additional details</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Anything else we should know'
          className='mt-2 w-full rounded-[10px] border border-slate-300 px-4 py-3 text-slate-900 outline-none resize-none min-h-[120px]'
        />
      </div>

      <div className='mt-2 grid gap-4 md:grid-cols-2'>
        <div>
          <label className='block text-[14px] md:text-[16px]  xl:text-[18px] font-medium text-black'>Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='Full Name'
            className={`mt-2 w-full rounded-[10px] border px-4 py-3 text-slate-900 outline-none ${errors.fullName ? 'border-red-500' : 'border-slate-300'}`}
          />
        </div>
        <div>
          <label className='block text-[14px] md:text-[16px]  xl:text-[18px] font-medium text-black'>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className={`mt-2 w-full rounded-[10px] border px-4 py-3 text-slate-900 outline-none ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
          />
        </div>
      </div>

      <div className='mt-2'>
        <label className='block text-[14px] md:text-[16px]  xl:text-[18px] font-medium text-black'>Phone</label>
        <input
          type='tel'
          value={formatPhoneNumber(phone)}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='+1 (123) 456-7890'
          className={`mt-2 w-full rounded-[10px] border px-4 py-3 text-slate-900 outline-none ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
        />
      </div>

    

      <div className='mt-4'>
        <button
          {...(customQuantity && sizeWidth && sizeHeight && sizeGusset && email && phone && phone !== '+1' ? { id: 'quote-submit' } : {})}
          type='submit'
          disabled={isSubmitting}
          className='inline-flex w-full items-center justify-center rounded-full bg-[#00ADEE] px-6 py-4 text-[14px] md:text-[16px] font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isSubmitting ? 'Submitting…' : 'Submit Request'}
        </button>
      </div>
        </div>

     
    </form>
  );
}
