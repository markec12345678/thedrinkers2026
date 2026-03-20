import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { merchItems } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Trgovina',
  description: 'Nakupi uradne merchandise skupine The Drinkers - majice, hoodieji, vinilke in več.',
};

export default function MerchPage() {
  // Filter only t-shirts for MVP
  const mvpProducts = merchItems.filter(item => 
    item.name.toLowerCase().includes('t-shirt') || 
    item.name.toLowerCase().includes('majica')
  ).slice(0, 3);

  const comingSoonProducts = merchItems.filter(item => 
    !item.name.toLowerCase().includes('t-shirt') && 
    !item.name.toLowerCase().includes('majica')
  );

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
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-crimson">
            <span className="px-3 py-1 bg-crimson/20 rounded-full">🚀 MVP Launch</span>
            <span className="px-3 py-1 bg-crimson/20 rounded-full">📦 Free Shipping EU</span>
          </div>
        </div>
      </section>

      {/* MVP Products - Available Now */}
      <Section background="gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-crimson mb-4">NA VOLJO ZDAJ</h2>
            <p className="text-text-gray">Omejena količina - Print-on-Demand</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mvpProducts.map((item, index) => (
              <GlassCard 
                key={item.id} 
                variant="dark" 
                hover 
                floating={index % 2 === 0}
                className="h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-rock-gray">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {item.limited && (
                    <div className="absolute top-2 right-2 bg-crimson text-white px-3 py-1 rounded text-xs font-bold uppercase">
                      Limited Edition
                    </div>
                  )}
                  {!item.inStock && (
                    <div className="absolute top-2 right-2 bg-yellow-600 text-white px-3 py-1 rounded text-xs font-bold uppercase">
                      Pre-Order
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col">
                  <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                  <div className="text-2xl font-bold text-crimson mb-4">
                    {formatPrice(item.price)}
                  </div>

                  {/* Sizes */}
                  {item.variants && item.variants.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-text-gray mb-2">Velikosti:</p>
                      <div className="flex gap-2 flex-wrap">
                        {item.variants.slice(0, 5).map((variant, idx) => (
                          <button
                            key={idx}
                            className="w-10 h-10 border border-white/30 rounded flex items-center justify-center text-white hover:border-crimson hover:text-crimson transition-colors text-sm font-bold"
                          >
                            {variant.size || 'S'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full mb-2" 
                    disabled={!item.inStock}
                    onClick={() => window.location.href = '#checkout'}
                  >
                    {item.inStock ? 'DODAJ V KOŠARICO' : 'OBVESTI ME'}
                  </Button>

                  {/* Features */}
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <ul className="text-sm text-text-gray space-y-1">
                      <li>✅ Premium kvaliteta (100% bombaž)</li>
                      <li>✅ Print-on-Demand (eko-friendly)</li>
                      <li>✅ Dostava 5-7 dni</li>
                      <li>✅ Brezplačna menjava velikosti</li>
                    </ul>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🚚</div>
              <p className="text-sm text-text-gray">Free Shipping EU</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm text-text-gray">Secure Payment</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">♻️</div>
              <p className="text-sm text-text-gray">Eco-Friendly</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">💯</div>
              <p className="text-sm text-text-gray">Official Merch</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Coming Soon Products */}
      <Section background="darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-crimson mb-4">KMALU NA VOLJO</h2>
            <p className="text-text-gray">Prijavi se na email listo za obvestilo</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {comingSoonProducts.slice(0, 6).map((item, index) => (
              <GlassCard 
                key={item.id} 
                variant="dark" 
                className="opacity-60"
              >
                {/* Placeholder Image */}
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-rock-gray flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">👕</div>
                    <p className="text-sm text-text-gray">{item.name}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-yellow-600 text-white px-3 py-1 rounded text-xs font-bold uppercase">
                    Coming Soon
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                  <div className="text-2xl font-bold text-crimson mb-4">
                    {formatPrice(item.price)}
                  </div>

                  {/* Notify Me Form */}
                  <form className="space-y-2" onSubmit={(e) => {
                    e.preventDefault();
                    alert('Hvala! Obvestili te bomo ko bo na voljo.');
                  }}>
                    <input
                      type="email"
                      placeholder="Tvoj email"
                      className="input-field w-full"
                      required
                    />
                    <Button type="submit" variant="secondary" className="w-full">
                      OBVESTI ME
                    </Button>
                  </form>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Newsletter CTA */}
      <Section background="gradient">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              PRIDI DRINKERS FAN CLUB
            </h2>
            <p className="text-text-gray mb-6">
              Ekskluzivni popusti, zgodnji dostop do vstopnic in nov merchandise
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => {
              e.preventDefault();
              alert('Hvala za prijavo! 🤘');
            }}>
              <input
                type="email"
                placeholder="Tvoj email"
                className="input-field flex-1"
                required
              />
              <Button type="submit">
                PRIJAVI SE
              </Button>
            </form>
            <p className="text-xs text-text-gray mt-4">
              Brez spama. Odjaviš se lahko kadarkoli.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
