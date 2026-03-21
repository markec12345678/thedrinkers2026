'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from '@/lib/auth-client';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { GatedContent, MembershipBadge } from '@/components/ui/GatedContent';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

export default function MemberDashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/bar');
      return;
    }

    // Fetch orders
    fetchOrders();
  }, [session, isPending, router]);

  async function fetchOrders() {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }

  if (isPending || !session) {
    return (
      <Section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🍺</div>
          <p className="text-text-gray">Loading dashboard...</p>
        </div>
      </Section>
    );
  }

  const user = session.user as any;
  const membershipTier = user.membershipTier || 'free';
  const totalSpent = user.totalSpent || 0;
  const nextTierThreshold = membershipTier === 'free' ? 50 : 200;
  const progressToNextTier = ((totalSpent / nextTierThreshold) * 100).toFixed(0);

  return (
    <Section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-5xl font-bold text-gradient">
              DOBRODOŠEL, {user.name?.toUpperCase()}
            </h1>
            <MembershipBadge tier={membershipTier} />
          </div>
          <p className="text-text-gray text-xl">
            Tvoj ekskluzivni fan klub dashboard
          </p>
        </motion.div>

        {/* Membership Progress */}
        <GlassCard variant="dark" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Napredek do naslednje stopnje
              </h2>
              <p className="text-text-gray">
                {membershipTier === 'free' 
                  ? 'Porabi €50 za brezplačno VIP članstvo' 
                  : 'Porabi €200 za brezplačno OG članstvo'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-crimson">
                €{totalSpent.toFixed(2)} / €{nextTierThreshold}
              </div>
              <div className="text-sm text-text-gray">
                {progressToNextTier}% doseženo
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-rock-gray rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-crimson to-crimson-light h-4 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(parseFloat(progressToNextTier), 100)}%` }}
            />
          </div>
          
          {parseFloat(progressToNextTier) >= 100 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-crimson/20 border border-crimson/30 rounded-lg p-4 text-center"
            >
              <p className="text-white font-bold">
                🎉 Čestitke! Kvalificiraš se za {membershipTier === 'free' ? 'VIP' : 'OG'} članstvo
              </p>
              <p className="text-sm text-text-gray mt-2">
                Nadgradnja se bo izvedla avtomatsko ob naslednjem nakupu
              </p>
            </motion.div>
          )}
        </GlassCard>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Exclusive Content */}
          <GlassCard variant="dark">
            <div className="text-4xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Ekskluzivne Vsebine
            </h2>
            <ul className="space-y-3 mb-6">
              <GatedContent requiredTier="vip">
                <li className="flex items-center gap-3 text-text-gray">
                  <span className="text-crimson">✅</span>
                  Backstage videi (5/20)
                </li>
                <li className="flex items-center gap-3 text-text-gray">
                  <span className="text-crimson">✅</span>
                  Neobjavljene skladbe (2/10)
                </li>
              </GatedContent>
              <GatedContent requiredTier="og">
                <li className="flex items-center gap-3 text-text-gray">
                  <span className="text-amber-500">👑</span>
                  Meet & Greet access
                </li>
                <li className="flex items-center gap-3 text-text-gray">
                  <span className="text-amber-500">👑</span>
                  Vsi backstage videi (unlimited)
                </li>
              </GatedContent>
            </ul>
            <Button className="w-full" variant="secondary">
              ODKRIJ VSEBINE
            </Button>
          </GlassCard>

          {/* Order History */}
          <GlassCard variant="dark">
            <div className="text-4xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Zgodovina Naročil
            </h2>
            {loading ? (
              <p className="text-text-gray">Nalaganje...</p>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-text-gray mb-4">Še nimaš nobenega naročila</p>
                <Button onClick={() => window.location.href = '/merch'}>
                  OBISČI TRGOVINO
                </Button>
              </div>
            ) : (
              <ul className="space-y-3 mb-6">
                {orders.slice(0, 3).map((order) => (
                  <li key={order.id} className="flex justify-between items-center border-b border-white/10 pb-3">
                    <div>
                      <p className="text-white font-bold">{order.id.substring(0, 12)}...</p>
                      <p className="text-sm text-text-gray">
                        {new Date(order.date).toLocaleDateString('sl-SI')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-crimson font-bold">€{order.total.toFixed(2)}</p>
                      <p className="text-xs text-text-gray">{order.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Button className="w-full" variant="secondary">
              POGLEJ VSA NAROČILA
            </Button>
          </GlassCard>
        </div>

        {/* Member Benefits */}
        <GlassCard variant="dark" className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Tvoje Članarine Ugodnosti
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-crimson mb-2">
                {membershipTier === 'free' ? '0%' : membershipTier === 'vip' ? '10%' : '20%'} Popust
              </h3>
              <p className="text-text-gray text-sm">
                Na ves merchandise
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎫</div>
              <h3 className="text-xl font-bold text-crimson mb-2">
                {membershipTier === 'free' ? 'Standard' : membershipTier === 'vip' ? '24h' : '48h'} Zgodaj
              </h3>
              <p className="text-text-gray text-sm">
                Dostop do vstopnic
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-crimson mb-2">
                {membershipTier === 'og' ? 'Vedno' : 'Ob €50+'} Brezplačno
              </h3>
              <p className="text-text-gray text-sm">
                Dostava
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Account Settings */}
        <GlassCard variant="dark">
          <h2 className="text-2xl font-bold text-white mb-6">
            Nastavitve Računa
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-bold">Email</p>
                <p className="text-text-gray text-sm">{user.email}</p>
              </div>
              <Button variant="secondary" size="sm">
                UREDI
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-bold">Članarina</p>
                <p className="text-text-gray text-sm capitalize">{membershipTier}</p>
              </div>
              <Button variant="secondary" size="sm">
                NADGRADI
              </Button>
            </div>
            <div className="pt-6 border-t border-white/10">
              <Button 
                onClick={() => signOut()} 
                variant="secondary"
                className="w-full"
              >
                ODJAVI SE
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
