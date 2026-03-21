/**
 * The Drinkers VIP Lounge
 * Exclusive fan community features
 */

export interface VIPLounge {
  id: string;
  name: string;
  description: string;
  tier: 'free' | 'fan' | 'vip' | 'og';
  features: VIPFeature[];
  requirements: VIPRequirements;
}

export interface VIPFeature {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface VIPRequirements {
  minFollowers?: number;
  minPurchases?: number;
  discordRole?: string;
  newsletterSubscriber?: boolean;
}

/**
 * VIP Tier Definitions
 */
export const VIP_TIERS: Record<string, VIPLounge> = {
  free: {
    id: 'free',
    name: 'Casual Fan',
    description: 'Osnovni dostop do vsebin',
    tier: 'free',
    features: [
      {
        id: 'music',
        name: 'Glasba',
        icon: '🎵',
        description: 'Poslušaj vse pesmi',
        unlocked: true,
      },
      {
        id: 'lyrics',
        name: 'Besedila',
        icon: '📝',
        description: 'Beredila vseh pesmi',
        unlocked: true,
      },
      {
        id: 'tour-dates',
        name: 'Koncerti',
        icon: '📅',
        description: 'Pregled vseh koncertov',
        unlocked: true,
      },
    ],
    requirements: {
      newsletterSubscriber: false,
    },
  },
  
  fan: {
    id: 'fan',
    name: 'Pravi Fan',
    description: 'Aktivni podpornik banda',
    tier: 'fan',
    features: [
      {
        id: 'exclusive-content',
        name: 'Exclusive Content',
        icon: '🎁',
        description: 'Ekskluzivne vsebine',
        unlocked: true,
      },
      {
        id: 'early-access',
        name: 'Early Access',
        icon: '⚡',
        description: 'Zgodnji dostop do vstopnic',
        unlocked: true,
      },
      {
        id: 'discord',
        name: 'Discord',
        icon: '💬',
        description: 'Dostop do Discord serverja',
        unlocked: true,
      },
      {
        id: 'listening-parties',
        name: 'Listening Parties',
        icon: '🎧',
        description: 'Udeležba na poslušanjih',
        unlocked: true,
      },
    ],
    requirements: {
      newsletterSubscriber: true,
      minFollowers: 1, // Follow on social media
    },
  },
  
  vip: {
    id: 'vip',
    name: 'VIP Member',
    description: 'Ultra podpornik z benefiti',
    tier: 'vip',
    features: [
      {
        id: 'backstage',
        name: 'Backstage Pass',
        icon: '🎫',
        description: 'Virtualni backstage dostop',
        unlocked: true,
      },
      {
        id: 'merch-discount',
        name: 'Merch Discount',
        icon: '👕',
        description: '20% popust na ves merch',
        unlocked: true,
      },
      {
        id: 'meet-greet',
        name: 'Meet & Greet',
        icon: '🤝',
        description: 'Možnost za meet & greet',
        unlocked: true,
      },
      {
        id: 'exclusive-drops',
        name: 'Exclusive Drops',
        icon: '🔥',
        description: 'Limitirane izdaje',
        unlocked: true,
      },
      {
        id: 'virtual-bar',
        name: 'Virtual Bar',
        icon: '🍺',
        description: 'Dostop do virtualnega bara',
        unlocked: true,
      },
    ],
    requirements: {
      minPurchases: 2, // Bought merch/tickets 2x
      discordRole: 'vip',
    },
  },
  
  og: {
    id: 'og',
    name: 'OG Member',
    description: 'Original Gangster - najbolj zvesti',
    tier: 'og',
    features: [
      {
        id: 'all-access',
        name: 'All Access',
        icon: '⭐',
        description: 'Dostop do vsega',
        unlocked: true,
      },
      {
        id: 'direct-access',
        name: 'Direct Access',
        icon: '📱',
        description: 'Direkten stik z bandom',
        unlocked: true,
      },
      {
        id: 'exclusive-events',
        name: 'Exclusive Events',
        icon: '🎉',
        description: 'Vabilo na ekskluzivne evente',
        unlocked: true,
      },
      {
        id: 'limited-merch',
        name: 'Limited Merch',
        icon: '🎁',
        description: 'Dostop do limitiranega mercha',
        unlocked: true,
      },
      {
        id: 'founder-badge',
        name: 'Founder Badge',
        icon: '🏆',
        description: 'Founder značka za vedno',
        unlocked: true,
      },
    ],
    requirements: {
      minPurchases: 5,
      discordRole: 'og',
      minFollowers: 3, // Follow on all socials
    },
  },
};

/**
 * Check if user qualifies for tier
 */
export function checkTierEligibility(
  user: {
    newsletterSubscriber?: boolean;
    socialFollows?: number;
    purchases?: number;
    discordRole?: string;
  },
  tier: VIPLounge
): boolean {
  const reqs = tier.requirements;
  
  if (reqs.newsletterSubscriber && !user.newsletterSubscriber) {
    return false;
  }
  
  if (reqs.minFollowers && (!user.socialFollows || user.socialFollows < reqs.minFollowers)) {
    return false;
  }
  
  if (reqs.minPurchases && (!user.purchases || user.purchases < reqs.minPurchases)) {
    return false;
  }
  
  if (reqs.discordRole && user.discordRole !== reqs.discordRole) {
    return false;
  }
  
  return true;
}

/**
 * Get next tier for user
 */
export function getNextTier(currentTier: string): VIPLounge | null {
  const tierOrder = ['free', 'fan', 'vip', 'og'];
  const currentIndex = tierOrder.indexOf(currentTier);
  
  if (currentIndex === -1 || currentIndex >= tierOrder.length - 1) {
    return null;
  }
  
  const nextTierId = tierOrder[currentIndex + 1];
  return VIP_TIERS[nextTierId] || null;
}

/**
 * Calculate progress to next tier
 */
export function calculateTierProgress(
  user: any,
  currentTier: VIPLounge
): {
  nextTier: VIPLounge | null;
  progress: number;
  requirements: Array<{ name: string; current: number; required: number; met: boolean }>;
} {
  const nextTier = getNextTier(currentTier.id);
  
  if (!nextTier) {
    return {
      nextTier: null,
      progress: 100,
      requirements: [],
    };
  }
  
  const reqs = nextTier.requirements;
  const requirements = [];
  let metCount = 0;
  
  if (reqs.newsletterSubscriber) {
    const met = !!user.newsletterSubscriber;
    requirements.push({
      name: 'Newsletter',
      current: met ? 1 : 0,
      required: 1,
      met,
    });
    if (met) metCount++;
  }
  
  if (reqs.minFollowers) {
    const current = user.socialFollows || 0;
    const met = current >= reqs.minFollowers;
    requirements.push({
      name: 'Social Follows',
      current,
      required: reqs.minFollowers,
      met,
    });
    if (met) metCount++;
  }
  
  if (reqs.minPurchases) {
    const current = user.purchases || 0;
    const met = current >= reqs.minPurchases;
    requirements.push({
      name: 'Purchases',
      current,
      required: reqs.minPurchases,
      met,
    });
    if (met) metCount++;
  }
  
  if (reqs.discordRole) {
    const met = user.discordRole === reqs.discordRole;
    requirements.push({
      name: 'Discord Role',
      current: met ? 1 : 0,
      required: 1,
      met,
    });
    if (met) metCount++;
  }
  
  const progress = requirements.length > 0 
    ? Math.round((metCount / requirements.length) * 100)
    : 0;
  
  return {
    nextTier,
    progress,
    requirements,
  };
}

/**
 * Discord integration helpers
 */
export const DISCORD_CONFIG = {
  inviteUrl: 'https://discord.gg/thedrinkers',
  serverId: 'thedrinkers-official',
  roles: {
    free: 'Casual Fan',
    fan: 'Pravi Fan',
    vip: 'VIP Member',
    og: 'OG Member',
  },
  channels: {
    general: 'general',
    music: 'music-chat',
    concerts: 'concert-talk',
    vip: 'vip-lounge',
    backstage: 'backstage-pass',
  },
};

/**
 * Virtual Lounge activities
 */
export const VIRTUAL_LOUNGE_ACTIVITIES = [
  {
    id: 'listening-party',
    name: 'Listening Party',
    icon: '🎧',
    description: 'Skupno poslušanje albumov',
    schedule: 'Every Friday 21:00',
    tier: 'fan',
  },
  {
    id: 'qa-session',
    name: 'Q&A Session',
    icon: '❓',
    description: 'Vprašaj band karkoli',
    schedule: 'Monthly',
    tier: 'vip',
  },
  {
    id: 'acoustic-session',
    name: 'Acoustic Session',
    icon: '🎸',
    description: 'Unplugged performance',
    schedule: 'Quarterly',
    tier: 'og',
  },
  {
    id: 'merch-preview',
    name: 'Merch Preview',
    icon: '👕',
    description: 'Predogled novega mercha',
    schedule: 'Before drops',
    tier: 'vip',
  },
];
