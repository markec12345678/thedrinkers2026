'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { useCart } from '@/lib/cart';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: number;
  customer: string;
}

export default function OrderDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from API
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'processing': return 'bg-blue-600';
      case 'shipped': return 'bg-purple-600';
      case 'delivered': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  if (loading) {
    return (
      <Section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">📦</div>
          <p className="text-text-gray">Loading orders...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-4">ORDER DASHBOARD</h1>
          <p className="text-text-gray">Manage and track all orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <GlassCard variant="dark" className="text-center">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-3xl font-bold text-crimson">{orders.length}</div>
            <div className="text-text-gray">Total Orders</div>
          </GlassCard>
          <GlassCard variant="dark" className="text-center">
            <div className="text-4xl mb-2">⏳</div>
            <div className="text-3xl font-bold text-yellow-500">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <div className="text-text-gray">Pending</div>
          </GlassCard>
          <GlassCard variant="dark" className="text-center">
            <div className="text-4xl mb-2">🚚</div>
            <div className="text-3xl font-bold text-blue-500">
              {orders.filter(o => o.status === 'processing').length}
            </div>
            <div className="text-text-gray">Processing</div>
          </GlassCard>
          <GlassCard variant="dark" className="text-center">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-bold text-green-500">
              €{orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </div>
            <div className="text-text-gray">Revenue</div>
          </GlassCard>
        </div>

        {/* Orders Table */}
        <GlassCard variant="dark" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-crimson/20">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-bold">Order ID</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Customer</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Date</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Items</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Total</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Status</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-text-gray">
                      <div className="text-6xl mb-4">📭</div>
                      <p>No orders yet. Start selling!</p>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-t border-white/10 hover:bg-white/5">
                      <td className="px-6 py-4 text-white font-mono text-sm">
                        {order.id.substring(0, 12)}...
                      </td>
                      <td className="px-6 py-4 text-white">{order.customer}</td>
                      <td className="px-6 py-4 text-text-gray">
                        {new Date(order.date).toLocaleDateString('sl-SI')}
                      </td>
                      <td className="px-6 py-4 text-white">{order.items}</td>
                      <td className="px-6 py-4 text-crimson font-bold">
                        €{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)} text-white`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button size="sm" variant="secondary">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <Button onClick={fetchOrders} variant="secondary">
            🔄 Refresh Orders
          </Button>
        </div>
      </div>
    </Section>
  );
}
