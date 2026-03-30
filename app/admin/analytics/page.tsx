"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointer2,
  ShoppingCart,
  Ticket,
  Mail,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AnalyticsData {
  period: string;
  pageViews: number;
  uniqueVisitors: number;
  topPages: Array<{ path: string; views: number; title: string }>;
  conversions: {
    ticketClicks: number;
    merchPurchases: number;
    newsletterSignups: number;
  };
  devices: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics?period=24h")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch analytics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-rock-black p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-crimson border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-rock-black p-8 flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>Failed to load analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rock-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-rock-muted">Real-time insights for The Drinkers</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Eye}
            label="Page Views (24h)"
            value={data.pageViews}
            trend="+12%"
          />
          <MetricCard
            icon={Users}
            label="Unique Visitors"
            value={data.uniqueVisitors}
            trend="+8%"
          />
          <MetricCard
            icon={MousePointer2}
            label="Ticket Clicks"
            value={data.conversions.ticketClicks}
            trend="+25%"
          />
          <MetricCard
            icon={ShoppingCart}
            label="Merch Purchases"
            value={data.conversions.merchPurchases}
            trend="+5%"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MetricCard
            icon={Mail}
            label="Newsletter Signups"
            value={data.conversions.newsletterSignups}
            trend="+15%"
          />
          <MetricCard
            icon={TrendingUp}
            label="Conversion Rate"
            value={`${((data.conversions.ticketClicks / data.pageViews) * 100).toFixed(2)}%`}
            trend="+3%"
          />
        </div>

        {/* Top Pages */}
        <GlassCard variant="dark" className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Top Pages</h2>
          <div className="space-y-4">
            {data.topPages.map((page, index) => (
              <div
                key={page.path}
                className="flex items-center justify-between p-4 bg-rock-gray/50 rounded-lg"
              >
                <div>
                  <p className="text-white font-medium">{page.title}</p>
                  <p className="text-sm text-rock-muted">{page.path}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-crimson">
                    {page.views}
                  </p>
                  <p className="text-sm text-rock-muted">views</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Device Breakdown */}
        <GlassCard variant="dark" className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Device Breakdown
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <DeviceCard
              icon={Smartphone}
              label="Mobile"
              value={data.devices.mobile}
              color="text-crimson"
            />
            <DeviceCard
              icon={Monitor}
              label="Desktop"
              value={data.devices.desktop}
              color="text-blue-400"
            />
            <DeviceCard
              icon={Tablet}
              label="Tablet"
              value={data.devices.tablet}
              color="text-purple-400"
            />
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            Refresh Data
          </button>
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Open Google Analytics
          </a>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  trend: string;
}) {
  return (
    <GlassCard variant="dark" className="p-6">
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-8 h-8 text-crimson" />
        <span className="text-sm text-green-400 font-medium">{trend}</span>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-rock-muted">{label}</p>
    </GlassCard>
  );
}

function DeviceCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="text-center p-4 bg-rock-gray/50 rounded-lg">
      <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
      <p className="text-2xl font-bold text-white mb-1">{value}%</p>
      <p className="text-sm text-rock-muted">{label}</p>
    </div>
  );
}
