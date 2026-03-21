'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';
import { useReportWebVitals } from 'next/web-vitals';

export function VercelAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    const url = pathname + (searchParams?.toString() || '');
    trackPageView(url);
  }, [pathname, searchParams]);

  // Report Web Vitals
  useReportWebVitals((metric: any) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('⚡ Web Vital:', metric);
    }

    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'web_vital', {
        event_category: 'Performance',
        event_label: metric.name,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_name: metric.name,
        metric_value: metric.value.toString(),
      });
    }
  });

  return null;
}
