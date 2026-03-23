'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Music, Shirt, Eye } from 'lucide-react';
import { Section } from '@/components/ui/Section';

interface SocialProofData {
  listeners: number;
  fans: number;
  merch_sold: number;
  monthly_views: number;
}

export function SocialProofWidgets() {
  const [data, setData] = useState<SocialProofData>({
    listeners: 0,
    fans: 0,
    merch_sold: 0,
    monthly_views: 0,
  });

  useEffect(() => {
    // Simulate real-time data (in production, fetch from API)
    const fetchData = async () => {
      // Mock data - replace with real API call
      setData({
        listeners: 1247,
        fans: 892,
        merch_sold: 3421,
        monthly_views: 15420,
      });
    };

    fetchData();
    
    // Update every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Music,
      label: 'Poslušalcev ta teden',
      value: data.listeners.toLocaleString(),
      color: 'text-crimson',
      bgColor: 'bg-crimson/10',
    },
    {
      icon: Users,
      label: 'VIP članov',
      value: data.fans.toLocaleString(),
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Shirt,
      label: 'Prodanih merch izdelkov',
      value: data.merch_sold.toLocaleString(),
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: Eye,
      label: 'Mesečnih ogledov',
      value: data.monthly_views.toLocaleString(),
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.bgColor} rounded-xl p-6 border border-white/10 hover:border-crimson/30 transition-all`}
        >
          <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
          <div className={`text-3xl font-bold ${stat.color} mb-1`}>
            {stat.value}
          </div>
          <div className="text-text-gray text-sm">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Live Activity Feed
export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Array<{
    id: number;
    type: 'listen' | 'join' | 'buy' | 'view';
    user: string;
    action: string;
    time: string;
  }>>([]);

  useEffect(() => {
    // Simulate live activity (in production, use WebSocket)
    const mockActivities = [
      { type: 'listen', user: 'Marko M.', action: 'posluša "Pijemo ga radi"', time: 'zdaj' },
      { type: 'join', user: 'Ana K.', action: 'se je pridružila VIP', time: 'pred 2 min' },
      { type: 'buy', user: 'Peter S.', action: 'je kupil majico', time: 'pred 5 min' },
      { type: 'view', user: 'Luka B.', action: 'ogleduje turnejo', time: 'pred 7 min' },
    ];

    setActivities(mockActivities as any);

    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)];
        return [newActivity, ...prev.slice(0, 3)];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'listen': return '🎵';
      case 'join': return '🎫';
      case 'buy': return '👕';
      case 'view': return '👁️';
      default: return '✨';
    }
  };

  return (
    <div className="bg-rock-black/50 rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Živa Aktivnost
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 text-sm">
            <span className="text-xl">{getIcon(activity.type)}</span>
            <div className="flex-1">
              <span className="text-white font-bold">{activity.user}</span>
              <span className="text-text-gray"> {activity.action}</span>
            </div>
            <span className="text-text-gray text-xs">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Recent Signups
export function RecentSignups() {
  const [signups, setSignups] = useState<Array<{
    name: string;
    city: string;
    time: string;
  }>>([]);

  useEffect(() => {
    // Mock data - replace with real API
    setSignups([
      { name: 'Matej P.', city: 'Ljubljana', time: 'pred 1 min' },
      { name: 'Špela K.', city: 'Maribor', time: 'pred 3 min' },
      { name: 'Jan V.', city: 'Koper', time: 'pred 5 min' },
    ]);
  }, []);

  return (
    <div className="bg-gradient-to-r from-crimson/10 to-purple-500/10 rounded-xl p-6 border border-crimson/20">
      <h3 className="text-lg font-bold text-white mb-4">
        🎫 Novo v VIP Clubu
      </h3>
      <div className="space-y-3">
        {signups.map((signup, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-crimson rounded-full flex items-center justify-center text-white font-bold">
                {signup.name.charAt(0)}
              </div>
              <div>
                <div className="text-white font-bold">{signup.name}</div>
                <div className="text-text-gray text-xs">{signup.city}</div>
              </div>
            </div>
            <span className="text-text-gray text-xs">{signup.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Combined Component
export function SocialProofSection() {
  return (
    <Section background="gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-crimson mb-4">
            Pridruži Se Skupnosti!
          </h2>
          <p className="text-xl text-text-gray max-w-2xl mx-auto">
            Tisoče fanov že uživa v ekskluzivnih vsebinah The Drinkers
          </p>
        </div>

        {/* Stats */}
        <SocialProofWidgets />

        {/* Activity Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <LiveActivityFeed />
          <RecentSignups />
        </div>
      </div>
    </Section>
  );
}
