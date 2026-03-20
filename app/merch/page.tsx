import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { merchItems } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Trgovina',
  description: 'Nakupi uradne merchandise skupine The Drinkers - majice, hoodieji, vinilke in več.',
};

export default function MerchPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-rock-dark">
        <div className="absolute inset-0">
          <img
            src="/images/merch-hero.jpg"
            alt="Merch"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-dark" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">TRGOVINA</h1>
          <p className="text-xl text-text-gray">Uradni merchandise</p>
        </div>
      </section>

      {/* Products Grid */}
      <Section background="gradient">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {merchItems.map((item, index) => (
              <div
                key={item.id}
                className="card overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.limited && (
                    <div className="absolute top-4 right-4 bg-crimson text-white px-3 py-1 rounded text-xs font-bold uppercase">
                      Limited
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                  <div className="text-2xl font-bold text-crimson mb-4">{formatPrice(item.price)}</div>

                  {/* Variants */}
                  {item.variants && item.variants.length > 0 && (
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {item.variants.map((variant, idx) => (
                        <button
                          key={idx}
                          className="w-10 h-10 border border-white/30 rounded flex items-center justify-center text-white hover:border-crimson hover:text-crimson transition-colors text-sm font-bold"
                        >
                          {variant.size || variant.color?.charAt(0)}
                        </button>
                      ))}
                    </div>
                  )}

                  <Button className="w-full" disabled={!item}>
                    V KOŠARICO
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Shipping Info */}
      <Section background="darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-crimson mb-8">DOSTAVA IN PLAČILO</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="text-crimson text-4xl mb-4">
                <i className="fas fa-truck" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hitra Dostava</h3>
              <p className="text-text-gray">Dostava v 2-5 delovnih dneh po vsej Sloveniji</p>
            </div>
            <div className="card p-6">
              <div className="text-crimson text-4xl mb-4">
                <i className="fas fa-credit-card" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Varno Plačilo</h3>
              <p className="text-text-gray">Vse kreditne kartice in PayPal</p>
            </div>
            <div className="card p-6">
              <div className="text-crimson text-4xl mb-4">
                <i className="fas fa-undo" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enostaven Povratek</h3>
              <p className="text-text-gray">30-dnevna garancija na vračilo blaga</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
