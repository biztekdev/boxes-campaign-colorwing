export const GA_MEASUREMENT_ID = "G-YQ75TB34L6";

export const pageview = (url) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const trackEvent = ({ action, category, label, value }) => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

// NOTE: Do NOT send PII (name, email, phone, exact message text) to GA.
// Only send non-identifying metadata (e.g. form type, category, flags).
export const trackFormSubmit = ({ formName, additionalData }) => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "form_submit", {
    event_category: "form",
    event_label: formName,
    ...additionalData,
  });
};

// Scroll depth tracking helper (policy-safe, no PII)
export const trackScrollDepth = (percent) => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "scroll_depth", {
    event_category: "engagement",
    event_label: `${percent}%`,
    scroll_percent: percent,
  });
};
