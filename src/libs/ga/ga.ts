declare global {
  interface Window {
    gtag: (param1: string, param2: string | undefined, param3: object) => void;
  }
}

export function gaPageview(url: string) {
  if (typeof window.gtag === 'undefined') return;
  window.gtag('config', process.env.NEXT_PUBLICK_GA_ID, { page_path: url });
}

interface GaEventProps {
  action: string;
  category?: string;
  label?: string;
  value?: string;
}

export function gaEvent({ action, category, label, value }: GaEventProps) {
  if (typeof window.gtag === 'undefined') return;
  window.gtag('event', action, { event_category: category, event_label: label, value });
}
