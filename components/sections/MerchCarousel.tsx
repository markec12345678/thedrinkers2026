'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

// Merch items with placeholder colors since images don't exist
const merchItems = [
  { id: 'merch-001', name: 'Pijemo ga radi T-Shirt', price: 25, color: 'from-gray-800 to-gray-900', icon: 'T', limited: false, inStock: true, featured: true },
  { id: 'merch-002', name: 'Alkohol je moj idol Hoodie', price: 55, color: 'from-crimson-800 to-crimson-900', icon: 'H', limited: false, inStock: true, featured: true },
  { id: 'merch-003', name: 'The Drinkers Pivski Vrcek', price: 15, color: 'from-amber-700 to-amber-900', icon: 'P', limited: true, inStock: true, featured: true },
  { id: 'merch-004', name: 'Lepi in trezni Cap', price: 20, color: 'from-slate-700 to-slate-900', icon: 'C', limited: false, inStock: true, featured: true },
];

const formatPrice = (price: number) => `${price} EUR`;

export function MerchCarousel() {
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const handleAddToCart = (itemId: string, itemName: string) => {
    setAddedToCart(itemId);
    console.log(`${itemName} added to cart`);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const featuredItems = merchItems.filter((item) => item.featured);

  return (
    <Section id="merch" background="gradient">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          TRGOVINA
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="card overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Placeholder Image */}
              <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <span className="text-6xl font-black text-white/30">{item.icon}</span>
                {item.limited && (
                  <div className="absolute top-3 right-3 bg-crimson text-white px-3 py-1 rounded text-xs font-bold uppercase">
                    Limited
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h4 className="text-lg font-bold text-white mb-2">{item.name}</h4>
                <div className="text-2xl font-bold text-crimson mb-4">{formatPrice(item.price)}</div>
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => handleAddToCart(item.id, item.name)}
                  disabled={!item.inStock}
                >
                  {addedToCart === item.id ? 'DODANO...' : 'V KOŠARICO'}
                </Button>
                {!item.inStock && (
                  <div className="text-center text-crimson font-bold mt-2 text-sm">RAZPRODANO</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button variant="secondary" size="lg" asChild>
            <a href="/merch">POGLEJ VSE PROIZVODE</a>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
