import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Politika Zasebnosti',
  description: 'Politika zasebnosti spletne strani The Drinkers.',
};

export default function PrivacyPage() {
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gradient mb-8">POLITIKA ZASEBNOSTI</h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-text-gray mb-6">
            Zadnja posodobitev: {new Date().toLocaleDateString('sl-SI')}
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">1. Uvod</h2>
          <p className="text-text-gray mb-4">
            Podjetje The Drinkers se zavezuje k varstvu vaše zasebnosti. Ta politika zasebnosti 
            pojasnjuje, kako zbiramo, uporabljamo in ščitimo vaše osebne podatke.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">2. Zbiranje Podatkov</h2>
          <p className="text-text-gray mb-4">Zbiramo naslednje vrste podatkov:</p>
          <ul className="list-disc list-inside text-text-gray mb-4 space-y-2">
            <li>Osebni podatki (ime, email, telefonska številka)</li>
            <li>Podatki o napravi in brskalniku</li>
            <li>Podatki o obisku spletne strani</li>
            <li>Newsletter prijave</li>
          </ul>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">3. Uporaba Podatkov</h2>
          <p className="text-text-gray mb-4">Vaše podatke uporabljamo za:</p>
          <ul className="list-disc list-inside text-text-gray mb-4 space-y-2">
            <li>Odgovarjanje na vaša vprašanja</li>
            <li>Pošiljanje newsletterjev (samo s privoljenjem)</li>
            <li>Izboljšanje uporabniške izkušnje</li>
            <li>Analizo uporabe spletne strani</li>
          </ul>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">4. Piškotki</h2>
          <p className="text-text-gray mb-4">
            Naša spletna stran uporablja piškotke za izboljšanje delovanja. Piškotki so majhne 
            besedilne datoteke, ki se shranijo na vaši napravi.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">5. Varstvo Podatkov</h2>
          <p className="text-text-gray mb-4">
            Uporabljamo ustrezne tehnične in organizacijske ukrepe za zaščito vaših osebnih 
            podatkov pred nepooblaščenim dostopom, izgubo ali zlorabo.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">6. Vaše Pravice</h2>
          <p className="text-text-gray mb-4">
            Imate pravico do dostopa, popravka, izbrisa in omejitve obdelave vaših osebnih 
            podatkov. Za uveljavljanje pric nas kontaktirajte na info@thedrinkers.si.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">7. Kontakt</h2>
          <p className="text-text-gray mb-4">
            Za vsa vprašanja glede zasebnosti nas kontaktirajte na:
            <br />
            Email: info@thedrinkers.si
          </p>
        </div>
      </div>
    </Section>
  );
}
