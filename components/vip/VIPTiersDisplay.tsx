"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  ChevronDown,
  Star,
  Shield,
  Award,
  Crown,
  Zap,
  Heart,
  Music,
  Ticket,
  ShoppingBag,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// Types
interface MembershipTier {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  icon: React.ReactNode;
  features: string[];
  unavailable: string[];
  popular?: boolean;
  badge?: string;
}

interface Testimonial {
  id: string;
  name: string;
  tier: string;
  quote: string;
  avatar: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    yearlyPrice: 99.99,
    description: "Perfect for casual fans",
    icon: <Heart className="w-8 h-8" />,
    features: [
      "Early access to tickets",
      "10% merch discount",
      "Exclusive newsletter",
      "Fan club access",
      "Member-only content",
      "Priority support",
    ],
    unavailable: [
      "Meet & greet access",
      "Backstage tours",
      "Signed merchandise",
    ],
    badge: "Best Value",
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    yearlyPrice: 199.99,
    description: "For dedicated supporters",
    icon: <Star className="w-8 h-8" />,
    features: [
      "All Basic benefits",
      "20% merch discount",
      "Meet & greet entry",
      "Signed poster",
      "Exclusive vinyl releases",
      "VIP lounge access",
      "Priority seating",
    ],
    unavailable: ["Backstage tours", "Free drinks at shows"],
    popular: true,
    badge: "Most Popular",
  },
  {
    id: "vip",
    name: "VIP Elite",
    price: 49.99,
    yearlyPrice: 499.99,
    description: "The ultimate experience",
    icon: <Crown className="w-8 h-8" />,
    features: [
      "All Premium benefits",
      "30% merch discount",
      "Meet & greet guaranteed",
      "Backstage access",
      "Free drinks at shows",
      "Signed albums",
      "Exclusive merch pack",
      "Personal concierge",
      "Lifetime member perks",
    ],
    unavailable: [],
    badge: "Best Experience",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Marko M.",
    tier: "Premium Member",
    quote:
      "The meet & greet experience was absolutely incredible! Worth every euro. The band was so down to earth and the signed poster is now the centerpiece of my room.",
    avatar: "/images/testimonials/marko.svg",
  },
  {
    id: "2",
    name: "Ana P.",
    tier: "VIP Elite",
    quote:
      "VIP Elite is not just a membership, it's a lifestyle. Backstage access, free drinks, and the personal concierge made me feel like royalty. Best decision ever!",
    avatar: "/images/testimonials/ana.svg",
  },
  {
    id: "3",
    name: "Luka S.",
    tier: "Basic Member",
    quote:
      "Started with Basic and already got my money's worth with early ticket access and the merch discount. Already planning to upgrade to Premium!",
    avatar: "/images/testimonials/luka.svg",
  },
];

const FAQS: FAQ[] = [
  {
    id: "1",
    question: "Can I cancel my membership at any time?",
    answer:
      "Yes! You can cancel your membership at any time. Your membership will remain active until the end of your billing period, and you won't be charged again.",
  },
  {
    id: "2",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through Stripe.",
  },
  {
    id: "3",
    question: "Can I upgrade or downgrade my tier?",
    answer:
      "Absolutely! You can upgrade or downgrade your membership tier at any time from your account settings. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.",
  },
  {
    id: "4",
    question: "Is the yearly plan really cheaper?",
    answer:
      "Yes! Our yearly plans offer significant savings. Basic saves you €20/year, Premium saves €40/year, and VIP Elite saves €100/year compared to monthly billing.",
  },
  {
    id: "5",
    question: "What if I'm not satisfied?",
    answer:
      "We offer a 30-day money-back guarantee on all membership tiers. If you're not completely satisfied, contact us within 30 days for a full refund, no questions asked.",
  },
  {
    id: "6",
    question: "Do you offer student discounts?",
    answer:
      "Yes! Students receive an additional 15% off any membership tier with valid student ID verification. Contact our support team to apply your student discount.",
  },
];

interface VIPTiersDisplayProps {
  onJoin?: (tier: MembershipTier, billingCycle: "monthly" | "yearly") => void;
}

export const VIPTiersDisplay: React.FC<VIPTiersDisplayProps> = ({ onJoin }) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const calculateSavings = (tier: MembershipTier) => {
    const monthlyTotal = tier.price * 12;
    return monthlyTotal - tier.yearlyPrice;
  };

  const handleJoin = (tier: MembershipTier) => {
    onJoin?.(tier, billingCycle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Join The Inner Circle
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Become a VIP member and get exclusive access to concerts, merch, and
            experiences
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-lg font-medium ${
                billingCycle === "monthly" ? "text-white" : "text-gray-400"
              }`}
            >
              Monthly
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly",
                )
              }
              className="relative w-16 h-8 bg-purple-600 rounded-full transition-colors"
            >
              <motion.div
                animate={{ x: billingCycle === "monthly" ? 0 : 32 }}
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
              />
            </motion.button>
            <span
              className={`text-lg font-medium ${
                billingCycle === "yearly" ? "text-white" : "text-gray-400"
              }`}
            >
              Yearly
            </span>
            <span className="ml-2 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
              Save up to €100
            </span>
          </div>

          {/* Money-Back Guarantee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600/20 border border-purple-500/30 rounded-full"
          >
            <Shield className="w-5 h-5 text-purple-400" />
            <span className="text-purple-200 font-medium">
              30-Day Money-Back Guarantee
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {MEMBERSHIP_TIERS.map((tier, index) => (
            <MembershipTierCard
              key={tier.id}
              tier={tier}
              billingCycle={billingCycle}
              savings={calculateSavings(tier)}
              onJoin={() => handleJoin(tier)}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Feature Comparison Table */}
        <FeatureComparisonTable />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join?</h2>
          <p className="text-purple-200 mb-8">
            Join thousands of fans who are already enjoying exclusive benefits
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {MEMBERSHIP_TIERS.map((tier) => (
              <Button
                key={tier.id}
                onClick={() => handleJoin(tier)}
                size="lg"
                className={`px-8 py-6 text-lg font-semibold ${
                  tier.popular
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                Join {tier.name} - €
                {billingCycle === "monthly" ? tier.price : tier.yearlyPrice}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Membership Tier Card Component
const MembershipTierCard: React.FC<{
  tier: MembershipTier;
  billingCycle: "monthly" | "yearly";
  savings: number;
  onJoin: () => void;
  delay: number;
}> = ({ tier, billingCycle, savings, onJoin, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-2 ${
        tier.popular
          ? "border-purple-500 dark:border-purple-400 shadow-purple-500/30"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 font-bold">
          ⭐ {tier.badge} ⭐
        </div>
      )}

      <div className={`p-8 ${tier.popular ? "pt-16" : ""}`}>
        {/* Icon & Name */}
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
              tier.id === "basic"
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                : tier.id === "premium"
                  ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
            }`}
          >
            {tier.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {tier.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{tier.description}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">
              €{billingCycle === "monthly" ? tier.price : tier.yearlyPrice}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              /{billingCycle === "monthly" ? "month" : "year"}
            </span>
          </div>
          {billingCycle === "yearly" && savings > 0 && (
            <p className="text-green-600 dark:text-green-400 font-medium mt-2">
              Save €{savings.toFixed(2)}/year
            </p>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {tier.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.3 + i * 0.05 }}
              className="flex items-start gap-3"
            >
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </motion.div>
          ))}
          {tier.unavailable.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: delay + 0.3 + (tier.features.length + i) * 0.05,
              }}
              className="flex items-start gap-3 text-gray-400"
            >
              <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="line-through">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onJoin}
            className={`w-full h-14 text-lg font-semibold ${
              tier.popular
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30"
                : tier.id === "vip"
                  ? "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
                  : "bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900"
            }`}
          >
            Join Now
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Feature Comparison Table
const FeatureComparisonTable: React.FC = () => {
  const features = [
    { name: "Early access to tickets", basic: true, premium: true, vip: true },
    { name: "Merch discount", basic: "10%", premium: "20%", vip: "30%" },
    { name: "Exclusive newsletter", basic: true, premium: true, vip: true },
    { name: "Fan club access", basic: true, premium: true, vip: true },
    { name: "Member-only content", basic: true, premium: true, vip: true },
    { name: "Priority support", basic: true, premium: true, vip: true },
    { name: "Meet & greet", basic: false, premium: true, vip: true },
    { name: "Signed merchandise", basic: false, premium: true, vip: true },
    {
      name: "Exclusive vinyl releases",
      basic: false,
      premium: true,
      vip: true,
    },
    { name: "VIP lounge access", basic: false, premium: true, vip: true },
    { name: "Priority seating", basic: false, premium: true, vip: true },
    { name: "Backstage access", basic: false, premium: false, vip: true },
    { name: "Free drinks at shows", basic: false, premium: false, vip: true },
    { name: "Personal concierge", basic: false, premium: false, vip: true },
    { name: "Lifetime member perks", basic: false, premium: false, vip: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-20"
    >
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
        Compare All Features
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-4 text-gray-900 dark:text-gray-100 font-semibold">
                Feature
              </th>
              <th className="text-center py-4 px-4 text-blue-600 dark:text-blue-400 font-semibold">
                Basic
              </th>
              <th className="text-center py-4 px-4 text-purple-600 dark:text-purple-400 font-semibold">
                Premium
              </th>
              <th className="text-center py-4 px-4 text-amber-600 dark:text-amber-400 font-semibold">
                VIP Elite
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                  {feature.name}
                </td>
                <td className="text-center py-4 px-4">
                  {typeof feature.basic === "boolean" ? (
                    feature.basic ? (
                      <Check className="w-5 h-5 text-green-500 inline" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 inline" />
                    )
                  ) : (
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {feature.basic}
                    </span>
                  )}
                </td>
                <td className="text-center py-4 px-4">
                  {typeof feature.premium === "boolean" ? (
                    feature.premium ? (
                      <Check className="w-5 h-5 text-green-500 inline" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 inline" />
                    )
                  ) : (
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {feature.premium}
                    </span>
                  )}
                </td>
                <td className="text-center py-4 px-4">
                  {typeof feature.vip === "boolean" ? (
                    feature.vip ? (
                      <Check className="w-5 h-5 text-green-500 inline" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 inline" />
                    )
                  ) : (
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      {feature.vip}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// Testimonials Section
const TestimonialsSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-20"
    >
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        What Our Members Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial, i) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
          >
            <Quote className="w-8 h-8 text-purple-400 mb-4" />
            <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
              &quot;{testimonial.quote}&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {testimonial.name}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  {testimonial.tier}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// FAQ Section
const FAQSection: React.FC<{
  openFAQ: string | null;
  setOpenFAQ: (id: string | null) => void;
}> = ({ openFAQ, setOpenFAQ }) => {
  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto mb-20"
    >
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="font-semibold text-gray-900 dark:text-gray-100 pr-8">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openFAQ === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-gray-600 dark:text-gray-400"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VIPTiersDisplay;
