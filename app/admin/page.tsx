'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  Music, 
  Shirt, 
  Ticket, 
  TrendingUp, 
  DollarSign,
  Eye,
  Download,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';

const stats = {
  total_fans: 1247,
  monthly_listeners: 8932,
  merch_sales: 3421,
  ticket_sales: 892,
  monthly_revenue: 15420,
  website_views: 45230,
};

const recentOrders = [
  { id: 'ORD-001', customer: 'Marko M.', item: 'Pijemo ga radi T-Shirt', amount: '€25.00', status: 'completed' },
  { id: 'ORD-002', customer: 'Ana K.', item: 'Lepi in trezni Vinyl', amount: '€35.00', status: 'processing' },
  { id: 'ORD-003', customer: 'Peter S.', item: 'Tour 2026 Hoodie', amount: '€55.00', status: 'completed' },
  { id: 'ORD-004', customer: 'Špela R.', item: 'Concert Ticket', amount: '€20.00', status: 'completed' },
  { id: 'ORD-005', customer: 'Luka B.', item: 'Beer Koozie', amount: '€8.00', status: 'pending' },
];

const recentSignups = [
  { id: 1, name: 'Matej P.', email: 'matej@example.com', date: '2026-03-22', tier: 'Fan' },
  { id: 2, name: 'Špela K.', email: 'spela@example.com', date: '2026-03-21', tier: 'VIP' },
  { id: 3, name: 'Jan V.', email: 'jan@example.com', date: '2026-03-21', tier: 'Fan' },
  { id: 4, name: 'Maja L.', email: 'maja@example.com', date: '2026-03-20', tier: 'OG' },
  { id: 5, name: 'Tomaž D.', email: 'tomaz@example.com', date: '2026-03-20', tier: 'Fan' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'fans'>('overview');

  const statCards = [
    { icon: Users, label: 'VIP Članov', value: stats.total_fans, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { icon: Music, label: 'Mesečnih Poslušalcev', value: stats.monthly_listeners.toLocaleString(), color: 'text-crimson', bgColor: 'bg-crimson/10' },
    { icon: Shirt, label: 'Prodanih Merch Izdelkov', value: stats.merch_sales.toLocaleString(), color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    { icon: Ticket, label: 'Prodanih Vstopnic', value: stats.ticket_sales, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { icon: DollarSign, label: 'Mesečni Prihodek', value: `€${stats.monthly_revenue.toLocaleString()}`, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { icon: Eye, label: 'Ogledov Strani', value: stats.website_views.toLocaleString(), color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
  ];

  return (
    <Section background="dark">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-text-gray">Pregled vseh aktivnosti The Drinkers</p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary">
              <Download className="w-5 h-5 mr-2" />
              Izvozi Poročilo
            </Button>
            <Button>
              <Calendar className="w-5 h-5 mr-2" />
              Dodaj Koncert
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === 'overview'
                ? 'text-crimson border-b-2 border-crimson'
                : 'text-text-gray hover:text-white'
            }`}
          >
            Pregled
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === 'orders'
                ? 'text-crimson border-b-2 border-crimson'
                : 'text-text-gray hover:text-white'
            }`}
          >
            Naročila
          </button>
          <button
            onClick={() => setActiveTab('fans')}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === 'fans'
                ? 'text-crimson border-b-2 border-crimson'
                : 'text-text-gray hover:text-white'
            }`}
          >
            Fani
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {statCards.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${stat.bgColor} rounded-xl p-6 border border-white/10`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-text-gray text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <GlassCard variant="dark" className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-crimson" />
                  Trend Prihodkov
                </h3>
                <div className="h-64 bg-rock-black/50 rounded-lg flex items-center justify-center">
                  <p className="text-text-gray">Chart bo na voljo kmalu...</p>
                </div>
              </GlassCard>

              <GlassCard variant="dark" className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-crimson" />
                  Priljubljeni Izdelki
                </h3>
                <div className="h-64 bg-rock-black/50 rounded-lg flex items-center justify-center">
                  <p className="text-text-gray">Chart bo na voljo kmalu...</p>
                </div>
              </GlassCard>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard variant="dark" className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Zadnja Naročila</h3>
                <div className="space-y-3">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-rock-black/50 rounded-lg">
                      <div>
                        <div className="text-white font-bold">{order.customer}</div>
                        <div className="text-text-gray text-sm">{order.item}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-crimson font-bold">{order.amount}</div>
                        <div className="text-text-gray text-xs capitalize">{order.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard variant="dark" className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Novejši Fani</h3>
                <div className="space-y-3">
                  {recentSignups.slice(0, 5).map((signup) => (
                    <div key={signup.id} className="flex items-center justify-between p-3 bg-rock-black/50 rounded-lg">
                      <div>
                        <div className="text-white font-bold">{signup.name}</div>
                        <div className="text-text-gray text-sm">{signup.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-crimson font-bold text-sm">{signup.tier}</div>
                        <div className="text-text-gray text-xs">{signup.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <GlassCard variant="dark" className="p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Vsa Naročila</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-text-gray font-bold">ID</th>
                    <th className="text-left py-3 px-4 text-text-gray font-bold">Stranka</th>
                    <th className="text-left py-3 px-4 text-text-gray font-bold">Izdelek</th>
                    <th className="text-left py-3 px-4 text-text-gray font-bold">Znesek</th>
                    <th className="text-left py-3 px-4 text-text-gray font-bold">Status</th>
                    <th className="text-left py-3 px-4 text-text-gray font-bold">Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white font-mono">{order.id}</td>
                      <td className="py-3 px-4 text-white">{order.customer}</td>
                      <td className="py-3 px-4 text-text-gray">{order.item}</td>
                      <td className="py-3 px-4 text-crimson font-bold">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          order.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                          order.status === 'processing' ? 'bg-blue-500/20 text-blue-500' :
                          'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="secondary">Podrobnosti</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {/* Fans Tab */}
        {activeTab === 'fans' && (
          <GlassCard variant="dark" className="p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Vsi Fani</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-text-gray font-bold">Ime</th>
                    <th className="text-left py-3 px-4 text-text-gray font-bold">Email</th>
                    <th className="text-left py-3 px-4 text-text-gray font-bold">Tier</th>
                    <th className="text-left py-3 px-4 text-text-gray font-bold">Datum</th>
                    <th className="text-left py-3 px-4 text-text-gray font-bold">Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSignups.map((signup) => (
                    <tr key={signup.id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white font-bold">{signup.name}</td>
                      <td className="py-3 px-4 text-text-gray">{signup.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          signup.tier === 'OG' ? 'bg-purple-500/20 text-purple-500' :
                          signup.tier === 'VIP' ? 'bg-crimson/20 text-crimson' :
                          'bg-blue-500/20 text-blue-500'
                        }`}>
                          {signup.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-gray">{signup.date}</td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="secondary">Uredi</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}
      </div>
    </Section>
  );
}
