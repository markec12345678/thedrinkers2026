/**
 * Analytics Tracking Helper
 * Centralized tracking for GA4, Vercel Analytics, and custom events
 */

// GA4 gtag function (will be available globally after script loads)
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

// Event types for type safety
export type AnalyticsEvent =
  // Page views
  | 'page_view'
  
  // User actions
  | 'button_clicked'
  | 'link_clicked'
  | 'form_submitted'
  | 'search_performed'
  
  // Engagement
  | 'video_played'
  | 'video_completed'
  | 'audio_played'
  | 'lyrics_viewed'
  
  // Conversions
  | 'newsletter_signup'
  | 'ticket_click'
  | 'merch_view'
  | 'merch_add_to_cart'
  | 'merch_purchase'
  | 'social_share'
  
  // Tour/Events
  | 'tour_date_view'
  | 'tour_date_click'
  | 'venue_info_click'
  
  // Music
  | 'song_play'
  | 'album_view'
  | 'spotify_click'
  | 'youtube_click'
  | 'apple_music_click';

export interface AnalyticsEventParams {
  // Standard GA4 parameters
  event_category?: string;
  event_label?: string;
  value?: number;
  currency?: string;
  
  // Custom parameters
  page_section?: string;
  button_text?: string;
  link_url?: string;
  form_type?: string;
  content_type?: string;
  item_id?: string;
  item_name?: string;
  
  // Campaign
  campaign_id?: string;
  campaign_name?: string;
  source?: string;
  medium?: string;
  
  // User context
  user_type?: 'visitor' | 'fan' | 'vip';
  device_type?: 'mobile' | 'desktop' | 'tablet';
  
  // Allow any additional parameters
  [key: string]: any;
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: AnalyticsEvent | string,
  params?: AnalyticsEventParams
): void {
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, params);
  }

  // Track with GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Track with Vercel Analytics (if available)
  if (typeof window !== 'undefined') {
    try {
      // @ts-ignore - Vercel Analytics might not be installed
      if (window.va) {
        // @ts-ignore
        window.va.track(eventName, params);
      }
    } catch (error) {
      // Silently fail - Vercel Analytics is optional
    }
  }

  // Send to custom API endpoint (for internal analytics)
  if (process.env.NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS === 'true') {
    sendToCustomAPI(eventName, params);
  }
}

/**
 * Send event to custom API endpoint
 */
async function sendToCustomAPI(
  eventName: string,
  params?: AnalyticsEventParams
): Promise<void> {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        params,
        timestamp: new Date().toISOString(),
        url: window.location.pathname,
        referrer: document.referrer || undefined,
      }),
    });
  } catch (error) {
    console.error('Failed to send analytics:', error);
  }
}

/**
 * Track page view (automatic)
 */
export function trackPageView(path: string, title?: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
  });
}

/**
 * Track button clicks (helper)
 */
export function trackClick(
  buttonText: string,
  section: string,
  url?: string
): void {
  trackEvent('button_clicked', {
    event_category: 'engagement',
    event_label: buttonText,
    button_text: buttonText,
    page_section: section,
    link_url: url,
  });
}

/**
 * Track conversion (helper)
 */
export function trackConversion(
  conversionName: string,
  value?: number,
  currency: string = 'EUR'
): void {
  trackEvent('conversion', {
    event_category: 'conversion',
    event_label: conversionName,
    value,
    currency,
  });
}

/**
 * Track error (for monitoring)
 */
export function trackError(
  error: Error,
  context?: string
): void {
  trackEvent('error', {
    event_category: 'system',
    event_label: error.message,
    error_name: error.name,
    error_stack: error.stack,
    context,
  });
}

/**
 * Track A/B test exposure
 */
export function trackABTest(
  testId: string,
  variant: string,
  userId?: string
): void {
  trackEvent('ab_test_exposure', {
    event_category: 'experiment',
    test_id: testId,
    variant,
    user_id: userId,
  });
}

/**
 * Track A/B test conversion
 */
export function trackABTestConversion(
  testId: string,
  variant: string,
  conversionValue?: number
): void {
  trackEvent('ab_test_conversion', {
    event_category: 'experiment',
    test_id: testId,
    variant,
    value: conversionValue,
  });
}

/**
 * Music-specific tracking
 */
export const music = {
  playSong(songId: string, songName: string) {
    trackEvent('song_play', {
      event_category: 'music',
      item_id: songId,
      item_name: songName,
    });
  },
  
  viewAlbum(albumId: string, albumName: string) {
    trackEvent('album_view', {
      event_category: 'music',
      item_id: albumId,
      item_name: albumName,
    });
  },
  
  clickSpotify(artistId?: string) {
    trackEvent('spotify_click', {
      event_category: 'music',
      link_url: 'https://open.spotify.com',
    });
  },
  
  clickYouTube(videoId?: string) {
    trackEvent('youtube_click', {
      event_category: 'music',
      link_url: 'https://youtube.com',
    });
  },
};

/**
 * Tour-specific tracking
 */
export const tour = {
  viewTourDate(dateId: string, city: string, venue: string) {
    trackEvent('tour_date_view', {
      event_category: 'tour',
      item_id: dateId,
      city,
      venue,
    });
  },
  
  clickTicketButton(dateId: string, city: string, url: string) {
    trackEvent('ticket_click', {
      event_category: 'tour',
      event_label: city,
      item_id: dateId,
      city,
      link_url: url,
    });
  },
  
  clickVenueInfo(venue: string) {
    trackEvent('venue_info_click', {
      event_category: 'tour',
      venue,
    });
  },
};

/**
 * Merch-specific tracking
 */
export const merch = {
  viewProduct(productId: string, productName: string, price?: number) {
    trackEvent('merch_view', {
      event_category: 'ecommerce',
      item_id: productId,
      item_name: productName,
      value: price,
    });
  },
  
  addToCart(productId: string, productName: string, price: number, quantity: number = 1) {
    trackEvent('merch_add_to_cart', {
      event_category: 'ecommerce',
      item_id: productId,
      item_name: productName,
      value: price * quantity,
      quantity,
    });
  },
  
  purchase(orderId: string, total: number, items: Array<{ id: string; name: string; price: number; quantity: number }>) {
    trackEvent('merch_purchase', {
      event_category: 'ecommerce',
      transaction_id: orderId,
      value: total,
      currency: 'EUR',
      items,
    });
  },
};

/**
 * Newsletter tracking
 */
export const newsletter = {
  signup(source: string) {
    trackEvent('newsletter_signup', {
      event_category: 'conversion',
      source,
    });
  },
};

/**
 * Social sharing tracking
 */
export const social = {
  share(platform: string, content: string, url: string) {
    trackEvent('social_share', {
      event_category: 'engagement',
      event_label: platform,
      platform,
      content_type: content,
      link_url: url,
    });
  },
};
