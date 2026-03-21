/**
 * A/B Testing Framework
 * Simple, lightweight A/B testing for The Drinkers website
 */

/**
 * A/B Test Configuration
 */
export interface ABTest {
  id: string;
  name: string;
  description: string;
  hypothesis: string;
  variants: {
    id: string;
    name: string;
    weight: number; // 0-1, e.g., 0.5 = 50%
  }[];
  primaryMetric: string;
  secondaryMetrics?: string[];
  guardrailMetrics?: string[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

/**
 * Get current active A/B tests
 */
export const ACTIVE_TESTS: ABTest[] = [
  {
    id: 'tour-cta-2026',
    name: 'Tour Page CTA Test',
    description: 'Test different CTA button text on tour pages',
    hypothesis: 'Because fans respond better to action-oriented language, we believe changing "Buy Tickets" to "Get Your Seat" will increase ticket click-through rate by 15%.',
    variants: [
      { id: 'control', name: 'Buy Tickets', weight: 0.5 },
      { id: 'variant', name: 'Get Your Seat', weight: 0.5 },
    ],
    primaryMetric: 'ticket_click',
    secondaryMetrics: ['tour_date_view'],
    guardrailMetrics: ['bounce_rate'],
    startDate: new Date('2026-03-21'),
    isActive: true,
  },
  {
    id: 'merch-layout-2026',
    name: 'Merch Page Layout Test',
    description: 'Test grid vs carousel layout for merchandise',
    hypothesis: 'Because carousel layouts showcase products better, we believe changing from grid to carousel will increase add-to-cart rate by 20%.',
    variants: [
      { id: 'control', name: 'Grid Layout', weight: 0.5 },
      { id: 'variant', name: 'Carousel Layout', weight: 0.5 },
    ],
    primaryMetric: 'merch_add_to_cart',
    secondaryMetrics: ['merch_view', 'merch_purchase'],
    guardrailMetrics: [],
    startDate: new Date('2026-03-21'),
    isActive: true,
  },
];

/**
 * Hash function for consistent variant assignment
 */
function hash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get user ID (from cookie or generate new)
 */
export function getUserId(): string {
  if (typeof window === 'undefined') {
    return 'server';
  }

  let userId = localStorage.getItem('td_user_id');
  
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('td_user_id', userId);
  }

  return userId;
}

/**
 * Get variant for a specific test
 */
export function getVariant(testId: string): string {
  const test = ACTIVE_TESTS.find(t => t.id === testId);
  
  if (!test || !test.isActive) {
    return 'control';
  }

  const userId = getUserId();
  const hashValue = hash(userId + testId);
  const normalized = hashValue % 100 / 100; // 0-1 range

  // Assign variant based on weight
  let cumulativeWeight = 0;
  for (const variant of test.variants) {
    cumulativeWeight += variant.weight;
    if (normalized < cumulativeWeight) {
      return variant.id;
    }
  }

  return test.variants[test.variants.length - 1].id;
}

/**
 * Track A/B test exposure
 */
export function trackExposure(testId: string, variant: string): void {
  // Import trackEvent dynamically to avoid circular dependency
  import('@/lib/analytics').then(({ trackABTest }) => {
    trackABTest(testId, variant);
  });

  // Store exposure in localStorage for later conversion tracking
  if (typeof window !== 'undefined') {
    const exposures = JSON.parse(
      localStorage.getItem('td_ab_exposures') || '{}'
    );
    exposures[testId] = { variant, timestamp: Date.now() };
    localStorage.setItem('td_ab_exposures', JSON.stringify(exposures));
  }
}

/**
 * Track A/B test conversion
 */
export function trackConversion(
  testId: string,
  value?: number
): void {
  if (typeof window === 'undefined') {
    return;
  }

  const exposures = JSON.parse(
    localStorage.getItem('td_ab_exposures') || '{}'
  );
  
  const exposure = exposures[testId];
  
  if (exposure) {
    import('@/lib/analytics').then(({ trackABTestConversion }) => {
      trackABTestConversion(testId, exposure.variant, value);
    });
  }
}

/**
 * Get all exposures (for dashboard)
 */
export function getExposures(): Record<string, { variant: string; timestamp: number }> {
  if (typeof window === 'undefined') {
    return {};
  }

  return JSON.parse(
    localStorage.getItem('td_ab_exposures') || '{}'
  );
}

/**
 * Calculate statistical significance (simplified)
 */
export function calculateSignificance(
  controlConversions: number,
  controlVisitors: number,
  variantConversions: number,
  variantVisitors: number
): {
  controlRate: number;
  variantRate: number;
  relativeImprovement: number;
  isSignificant: boolean;
  confidence: number;
} {
  const controlRate = controlConversions / controlVisitors;
  const variantRate = variantConversions / variantVisitors;
  const relativeImprovement = (variantRate - controlRate) / controlRate;

  // Simplified z-test (not production-ready, use proper stats library)
  const pooledRate = (controlConversions + variantConversions) / 
                     (controlVisitors + variantVisitors);
  const standardError = Math.sqrt(
    pooledRate * (1 - pooledRate) * (1 / controlVisitors + 1 / variantVisitors)
  );
  
  if (standardError === 0) {
    return {
      controlRate,
      variantRate,
      relativeImprovement,
      isSignificant: false,
      confidence: 0,
    };
  }

  const zScore = (variantRate - controlRate) / standardError;
  const confidence = 1 - (1 / (1 + Math.exp(1.7 * zScore))); // Approximate p-value

  return {
    controlRate,
    variantRate,
    relativeImprovement,
    isSignificant: confidence >= 0.95,
    confidence,
  };
}

/**
 * React hook for A/B testing
 */
export function useABTest(testId: string): {
  variant: string;
  trackConversion: (value?: number) => void;
} {
  const React = require('react');
  const [variant, setVariant] = React.useState('control');

  React.useEffect(() => {
    const assignedVariant = getVariant(testId);
    setVariant(assignedVariant);
    trackExposure(testId, assignedVariant);
  }, [testId]);

  const trackConv = (value?: number) => {
    import('@/lib/analytics').then(({ trackABTestConversion }) => {
      trackABTestConversion(testId, variant, value);
    });
  };

  return { variant, trackConversion: trackConv };
}

/**
 * Get test results (for dashboard)
 */
export async function getTestResults(testId: string): Promise<{
  test: ABTest;
  results: {
    variant: string;
    visitors: number;
    conversions: number;
    rate: number;
  }[];
  significance: {
    isSignificant: boolean;
    confidence: number;
    relativeImprovement: number;
  };
} | null> {
  // TODO: Fetch from database
  // For now, return mock data
  const test = ACTIVE_TESTS.find(t => t.id === testId);
  
  if (!test) {
    return null;
  }

  // Mock results
  const mockResults = test.variants.map((v, i) => ({
    variant: v.id,
    visitors: 500 + i * 50,
    conversions: 50 + i * 10,
    rate: (50 + i * 10) / (500 + i * 50),
  }));

  const significance = calculateSignificance(
    mockResults[0].conversions,
    mockResults[0].visitors,
    mockResults[1]?.conversions || 0,
    mockResults[1]?.visitors || 0
  );

  return {
    test,
    results: mockResults,
    significance,
  };
}
