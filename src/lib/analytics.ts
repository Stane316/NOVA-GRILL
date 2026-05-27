/**
 * Google Analytics 4 (GA4) Dynamic Integration Engine
 * Dynamically loads and bootstraps global site tag (gtag.js) on client-side
 * if a valid Measurement ID is supplied inside environment variables.
 */

export function initGA(): void {
  // Check browser runtime environment
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const measurementId = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID;

  // Gracefully skip initialization if environmental key is absent
  if (!measurementId || measurementId === "G-XXXXXXXXXX" || measurementId.trim() === "") {
    console.log("ℹ️ [GA4 Engine] Dynamic key VITE_GA_MEASUREMENT_ID not provided. Analytics tracking deactivated.");
    return;
  }

  try {
    // 1. Dynamically append Google tag script tag to document head
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.id = "google-analytics-gtag-script";
    document.head.appendChild(script);

    // 2. Setup Gtag API arrays and bootstrap wrappers
    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    
    function gtag(...args: any[]): void {
      win.dataLayer.push(arguments);
    }
    
    win.gtag = gtag;

    // 3. Fire initial page initialization view
    gtag("js", new Date());
    gtag("config", measurementId, {
      page_path: window.location.pathname + window.location.hash,
      send_page_view: true,
      cookie_flags: "SameSite=None;Secure",
    });

    console.log(`🚀 [GA4 Engine] Google Analytics successfully booted for token: ${measurementId}`);
  } catch (error) {
    console.error("⚠️ [GA4 Engine] Failed to initialize Google Analytics:", error);
  }
}

/**
 * Custom Event Dispatcher Utility
 * Allows tracking specific premium conversions (e.g., clicking WhatsApp, sending Reservation).
 */
export function trackGAEvent(action: string, category: string, label: string, value?: number): void {
  if (typeof window === "undefined") return;
  
  const win = window as any;
  if (typeof win.gtag === "function") {
    try {
      win.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
      console.log(`📊 [GA4 Event] Tracked: ${action} | ${category} | ${label}`);
    } catch (e) {
      console.warn("⚠️ [GA4 Event] Dispatch failed:", e);
    }
  }
}
