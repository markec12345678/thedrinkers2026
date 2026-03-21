'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { 
  Crown, 
  Music, 
  Ticket, 
  Shirt, 
  MessageCircle, 
  Unlock,
  CheckCircle2,
  Lock,
  TrendingUp,
  Gift,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { VIP_TIERS, VIRTUAL_LOUNGE_ACTIVITIES, DISCORD_CONFIG } from '@/lib/vip-lounge';

interface TierCardProps {
  tier: any;
  isCurrent: boolean;
  isNext: boolean;
  progress?: number;
  onSelect: () => void;
}

function TierCard({ tier, isCurrent, isNext, progress = 0, onSelect }: TierCardProps) {
  const tierColors = {
    free: 'from-gray-500 to-gray-700',
    fan: 'from-blue-500 to-blue-700',
    vip: 'from-purple-500 to-purple-700',
    og: 'from-amber-500 to-amber-700',
  };

  const tierIcons = {
    free: Unlock,
    fan: Music,
    vip: Crown,
    og: Crown,
  };

  const Icon = tierIcons[tier.id as keyof typeof tierIcons];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onSelect}
      className={`cursor-pointer`}
    >
      <GlassCard 
        variant={isCurrent ? 'crimson' : 'dark'}
        className={`p-6 h-full border-2 transition-all ${
          isCurrent 
            ? 'border-crimson shadow-lg shadow-crimson/20' 
            : isNext 
              ? 'border-crimson/50' 
              : 'border-crimson/20'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tierColors[tier.id as keyof typeof tierColors]} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {isCurrent && (
            <div className="px-3 py-1 bg-crimson text-white text-xs font-bold rounded-full">
              TVOJ NIVO
            </div>
          )}
          {isNext && !isCurrent && (
            <div className="px-3 py-1 bg-crimson/20 text-crimson text-xs font-bold rounded-full">
              NEXT
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className="text-2xl font-bold text-white mb-2">
          {tier.name}
        </h3>
        <p className="text-sm text-rock-muted mb-4">
          {tier.description}
        </p>

        {/* Progress (if next tier) */}
        {isNext && !isCurrent && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-rock-muted">Napredek</span>
              <span className="text-white font-bold">{progress}%</span>
            </div>
            <div className="h-2 bg-rock-gray rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-crimson to-crimson/50 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Features */}
        <div className="space-y-2">
          {tier.features.slice(0, 4).map((feature: any) => (
            <div key={feature.id} className="flex items-center gap-2 text-sm">
              <span className="text-lg">{feature.icon}</span>
              <span className="text-rock-muted">{feature.name}</span>
            </div>
          ))}
          {tier.features.length > 4 && (
            <div className="text-xs text-rock-muted mt-2">
              +{tier.features.length - 4} več
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function VIPLounge() {
  const [selectedTier, setSelectedTier] = useState('fan');
  
  // Mock user data (in production, fetch from backend)
  const user = {
    newsletterSubscriber: true,
    socialFollows: 2,
    purchases: 1,
    discordRole: undefined,
    currentTier: 'fan',
  };

  const currentTier = VIP_TIERS[user.currentTier];
  const nextTierData = (() => {
    const tierOrder = ['free', 'fan', 'vip', 'og'];
    const currentIndex = tierOrder.indexOf(user.currentTier);
    if (currentIndex >= tierOrder.length - 1) return null;
    return VIP_TIERS[tierOrder[currentIndex + 1]];
  })();

  const activities = VIRTUAL_LOUNGE_ACTIVITIES.filter(
    activity => {
      const tierOrder = ['free', 'fan', 'vip', 'og'];
      return tierOrder.indexOf(activity.tier) <= tierOrder.indexOf(user.currentTier);
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-crimson/10 via-rock-black to-rock-bg p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-10 h-10 text-crimson" />
            <h1 className="text-4xl md:text-6xl font-bold text-gradient">
              VIP Lounge
            </h1>
            <Gift className="w-10 h-10 text-crimson" />
          </div>
          <p className="text-xl text-rock-muted mb-2">
            Ekskluzivni fan club The Drinkers
          </p>
          <p className="text-sm text-rock-muted">
            Odkleni benefite, dostop do backstagea in posebne ugodnosti
          </p>
        </motion.div>

        {/* Current Tier Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <GlassCard variant="crimson" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Tvoj Status: {currentTier.name}
                </h2>
                <p className="text-rock-muted">
                  {currentTier.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-crimson mb-1">
                  {currentTier.features.length}
                </div>
                <div className="text-sm text-rock-muted">
                  Benefitov odklenjenih
                </div>
              </div>
            </div>

            {/* All Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {currentTier.features.map((feature: any) => (
                <div
                  key={feature.id}
                  className="bg-rock-gray/50 rounded-lg p-3 flex flex-col items-center text-center"
                >
                  <span className="text-3xl mb-2">{feature.icon}</span>
                  <span className="text-sm font-medium text-white">
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Tier Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Izberi Svoj Nivo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.values(VIP_TIERS).map((tier) => (
              <TierCard
                key={tier.id}
                tier={tier}
                isCurrent={tier.id === user.currentTier}
                isNext={(() => {
                  const tierOrder = ['free', 'fan', 'vip', 'og'];
                  const currentIndex = tierOrder.indexOf(user.currentTier);
                  return tier.id === tierOrder[currentIndex + 1];
                })()}
                progress={50} // Mock progress
                onSelect={() => setSelectedTier(tier.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Virtual Lounge Activities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            📅 Dogodki v Virtualnem Baru
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity, index) => (
              <GlassCard key={activity.id} variant="dark" className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{activity.icon}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    activity.tier === 'og' ? 'bg-amber-500/20 text-amber-500' :
                    activity.tier === 'vip' ? 'bg-purple-500/20 text-purple-500' :
                    'bg-blue-500/20 text-blue-500'
                  }`}>
                    {activity.tier.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {activity.name}
                </h3>
                <p className="text-sm text-rock-muted mb-3">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-rock-muted">
                  <Calendar className="w-4 h-4" />
                  {activity.schedule}
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Discord Integration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard variant="dark" className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <MessageCircle className="w-16 h-16 text-[#5865F2]" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Pridruži se na Discord
                  </h2>
                  <p className="text-rock-muted">
                    Klepetaj z drugimi fani, dostop do exclusive contenta, in več!
                  </p>
                </div>
              </div>
              <a
                href={DISCORD_CONFIG.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                <ExternalLink className="w-5 h-5" />
                Pridruži Se Zdaj
              </a>
            </div>

            {/* Discord Channels Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {Object.entries(DISCORD_CONFIG.channels).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-lg p-3 text-center"
                >
                  <span className="text-2xl mb-2 block">
                    {key === 'general' ? '💬' :
                     key === 'music' ? '🎵' :
                     key === 'concerts' ? '📅' :
                     key === 'vip' ? '👑' : '🎸'}
                  </span>
                  <span className="text-sm text-white font-medium">
                    #{value}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* How to Level Up */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <GlassCard variant="dark" className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🎯 Kako Napredovati
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-crimson" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Spremljaj nas
                </h3>
                <p className="text-sm text-rock-muted">
                  Followaj nas na socialnih omrežjih
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shirt className="w-8 h-8 text-crimson" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Kupi merch
                </h3>
                <p className="text-sm text-rock-muted">
                  Podpri band z nakupom mercha
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-8 h-8 text-crimson" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Pride na koncert
                </h3>
                <p className="text-sm text-rock-muted">
                  Sodeluj na koncertih in eventih
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
