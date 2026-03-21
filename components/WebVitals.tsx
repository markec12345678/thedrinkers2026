'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to Vercel Analytics
    if (typeof window !== 'undefined') {
      // Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vitals:', metric);
      }
    }
  });

  return null;
}
