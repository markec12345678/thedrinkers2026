'use client';

import { useSession } from '@/lib/auth-client';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { motion } from 'framer-motion';

type MembershipTier = 'free' | 'vip' | 'og';

interface GatedContentProps {
  children: React.ReactNode;
  requiredTier?: MembershipTier;
  title?: string;
  description?: string;
  lockedMessage?: string;
}

const tierLevels = {
  free: 0,
  vip: 1,
  og: 2,
};

export function GatedContent({
  children,
  requiredTier = 'free',
  title,
  description,
  lockedMessage,
}: GatedContentProps) {
  const { data: session } = useSession();

  // Not logged in
  if (!session) {
    return (
      <GlassCard variant="dark" className="text-center py-12">
        <div className="text-6xl mb-4">🔒</div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {title || 'Exclusive Content'}
        </h3>
        <p className="text-text-gray mb-6">
          {description || 'Prijavi se za dostop do ekskluzivnih vsebin'}
        </p>
        <Button href="/bar">
          PRIJAVI SE
        </Button>
      </GlassCard>
    );
  }

  // Check tier
  const userTier = (session.user as any).membershipTier || 'free';
  const hasAccess = tierLevels[userTier] >= tierLevels[requiredTier];

  if (!hasAccess) {
    return (
      <GlassCard variant="dark" className="text-center py-12 relative overflow-hidden">
        {/* Blur effect */}
        <div className="absolute inset-0 backdrop-blur-sm z-10" />
        
        {/* Locked content preview */}
        <div className="relative z-20">
          <div className="text-6xl mb-4">🔐</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {title || 'Locked Content'}
          </h3>
          <p className="text-text-gray mb-4">
            {lockedMessage || `To vsebino lahko vidijo samo ${requiredTier === 'vip' ? 'VIP' : 'OG'} člani`}
          </p>
          
          {/* Upgrade prompt */}
          <div className="bg-crimson/20 border border-crimson/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-white mb-2">
              💡 Nadgradi na {requiredTier === 'vip' ? 'VIP' : 'OG'} za dostop
            </p>
            <ul className="text-xs text-text-gray space-y-1">
              {requiredTier === 'vip' && (
                <>
                  <li>✅ Nakupi za €50+ za brezplačno VIP članstvo</li>
                  <li>✅ 10% popust na ves merchandise</li>
                  <li>✅ Zgodnji dostop do vstopnic</li>
                </>
              )}
              {requiredTier === 'og' && (
                <>
                  <li>✅ Nakupi za €200+ za brezplačno OG članstvo</li>
                  <li>✅ 20% popust na ves merchandise</li>
                  <li>✅ Free shipping na vse naročila</li>
                  <li>✅ Dostop do Meet & Greet</li>
                </>
              )}
            </ul>
          </div>
          
          <Button href="/merch">
            ODKRIJ MERCHANDISE
          </Button>
        </div>
      </GlassCard>
    );
  }

  // User has access
  return <>{children}</>;
}

// Helper component for tier badges
export function MembershipBadge({ tier }: { tier: MembershipTier }) {
  const colors = {
    free: 'bg-gray-600',
    vip: 'bg-crimson',
    og: 'bg-gradient-to-r from-yellow-500 to-amber-500',
  };

  const icons = {
    free: '🎫',
    vip: '⭐',
    og: '👑',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase text-white ${colors[tier]}`}>
      {icons[tier]} {tier} Member
    </span>
  );
}
