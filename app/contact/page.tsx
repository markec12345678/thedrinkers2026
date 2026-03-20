import { Metadata } from 'next';
import { ContactSection } from '@/components/sections/ContactSection';
import { Section } from '@/components/ui/Section';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktiraj skupino The Drinkers za booking, sodelovanja in vprašanja.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-rock-dark">
        <div className="absolute inset-0">
          <img
            src="/images/contact-hero.jpg"
            alt="Contact"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-dark" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">KONTAKT</h1>
          <p className="text-xl text-text-gray">Piši nam</p>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* FAQ */}
      <Section background="gradient">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-crimson text-center mb-12">POGOSTA VPRAŠANJA</h2>
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Kako lahko rezerviram vstopnice za koncert?
              </h3>
              <p className="text-text-gray">
                Vstopnice lahko rezerviraš preko naše spletne strani pri posameznem koncertu ali preko partnerjev 
                kot so Eventim, Ticketmaster in Stoparje.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Ali omogočate zasebna naročila za koncertne fotografije?
              </h3>
              <p className="text-text-gray">
                Da! Za profesionalne fotografije s koncertov nas kontaktirajte preko emaila in dogovorili se bomo
                za podrobnosti.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Kako lahko pridobim dostop do Drinkers&apos; Bar?
              </h3>
              <p className="text-text-gray">
                Dostop do ekskluzivnega Drinkers&apos; Bar je na voljo imetnikom VIP vstopnic in članom našega fan kluba.
                Več informacij najdeš na strani Drinkers&apos; Bar.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Ali sprejemate naročila za merchandise?
              </h3>
              <p className="text-text-gray">
                Vse izdelke lahko naročite preko naše spletne trgovine. Za večja naročila ali posebne zahteve nas 
                kontaktirajte direktno.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Booking Info */}
      <Section background="darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-crimson mb-6">BOOKING IN POVPRAŠEVANJA</h2>
          <p className="text-lg text-text-gray mb-8">
            Za booking koncertov, gostovanj ali drugih dogodkov nas kontaktirajte na:
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a
              href={`mailto:${SITE_CONFIG.contact.email}?subject=Booking Inquiry`}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-crimson text-white rounded-lg font-bold uppercase hover:bg-crimson-light transition-colors"
            >
              <i className="fas fa-envelope" />
              {SITE_CONFIG.contact.email}
            </a>
            {SITE_CONFIG.contact.phone && (
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-crimson text-crimson rounded-lg font-bold uppercase hover:bg-crimson hover:text-white transition-colors"
              >
                <i className="fas fa-phone" />
                {SITE_CONFIG.contact.phone}
              </a>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
