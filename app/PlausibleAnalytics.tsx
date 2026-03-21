'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Plausible Analytics Component
 * Privacy-friendly, GDPR compliant analytics
 * 
 * Setup:
 * 1. Sign up at https://plausible.io
 * 2. Add domain: thedrinkers.si
 * 3. Replace PLAUSIBLE_DOMAIN with your domain
 */

export function PlausibleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    if (pathname) {
      const url = pathname + (searchParams?.toString() || '');
      
      // Send to Plausible
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('pageview', { u: url });
      }

      // Also log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Plausible Pageview:', url);
      }
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Track custom events
 * Usage: trackEvent('concert_ticket_click', { city: 'Ljubljana' })
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, eventData ? { props: eventData } : {});
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Plausible Event:', eventName, eventData);
    }
  }
}

/**
 * Track conversions (goals)
 */
export function trackConversion(goalId: string, value?: number) {
  trackEvent('conversion', { goal: goalId, value });
}

/**
 * Track outbound clicks
 */
export function trackOutboundClick(url: string, label: string) {
  trackEvent('outbound_click', { url, label });
}

/**
 * Track file downloads
 */
export function trackDownload(fileName: string, fileType: string) {
  trackEvent('file_download', { fileName, fileType });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string, success: boolean) {
  trackEvent('form_submit', { form: formName, success });
}

/**
 * Track music plays
 */
export function trackMusicPlay(songTitle: string, album?: string) {
  trackEvent('music_play', { song: songTitle, album });
}

/**
 * Track merch interactions
 */
export function trackMerchEvent(action: string, productName?: string, price?: number) {
  trackEvent(`merch_${action}`, { product: productName, price });
}

/**
 * Track tour ticket clicks
 */
export function trackTicketClick(city: string, venue: string, url: string) {
  trackEvent('ticket_click', { city, venue, url });
}

// Declare plausible on window
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { u?: string; props?: Record<string, any> }) => void;
  }
}
