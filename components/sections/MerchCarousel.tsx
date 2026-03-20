'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { merchItems } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export function MerchCarousel() {
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const handleAddToCart = (itemId: string, itemName: string) => {
    setAddedToCart(itemId);
    // Show notification (you can implement a toast system here)
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
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
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
