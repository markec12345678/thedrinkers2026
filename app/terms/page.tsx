import { Metadata } from 'next';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Pogoji Uporabe',
  description: 'Pogoji uporabe spletne strani The Drinkers.',
};

export default function TermsPage() {
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gradient mb-8">POGOJI UPORABE</h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-text-gray mb-6">
            Zadnja posodobitev: {new Date().toLocaleDateString('sl-SI')}
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">1. Splošne Določbe</h2>
          <p className="text-text-gray mb-4">
            S koriščenjem spletne strani thedrinkers.si se strinjate s temi pogoji uporabe. 
            Če se s pogoji ne strinjate, spletne strani ne uporabljajte.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">2. Avtorske Pravice</h2>
          <p className="text-text-gray mb-4">
            Vse vsebine na tej spletni strani (besedila, slike, glasba, videi) so zaščitene 
            z avtorskimi pravicami in so last skupine The Drinkers ali njihovih avtorjev.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">3. Uporaba Vsebin</h2>
          <p className="text-text-gray mb-4">
            Vsebine smejo uporabniki uporabljati samo za osebno uporabo. Komercialna uporaba 
            brez predhodnega pisnega dovoljenja je prepovedana.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">4. Nakupi in Vstopnice</h2>
          <p className="text-text-gray mb-4">
            Nakupi preko spletne strani so predmet posebnih pogojev prodaje. Vstopnice za 
            koncerte so nepovratne, razen če je dogodek odpovedan.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">5. Odgovornost</h2>
          <p className="text-text-gray mb-4">
            The Drinkers ne prevzema odgovornosti za morebitne napake ali nedelovanje spletne 
            strani. Uporaba je na lastno odgovornost uporabnika.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">6. Povezave na Tretje Strani</h2>
          <p className="text-text-gray mb-4">
            Spletna stran lahko vsebuje povezave na tretje strani (Spotify, YouTube, itd.). 
            Za vsebine teh strani ne prevzemamo odgovornosti.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">7. Spremembe Pogojev</h2>
          <p className="text-text-gray mb-4">
            Pridržujemo si pravico do spremembe teh pogojev kadarkoli. Spremembe začnejo 
            veljati z objavo na spletni strani.
          </p>

          <h2 className="text-2xl font-bold text-crimson mt-8 mb-4">8. Kontakt</h2>
          <p className="text-text-gray mb-4">
            Za vprašanja glede pogojev uporabe nas kontaktirajte na:
            <br />
            Email: info@thedrinkers.si
          </p>
        </div>
      </div>
    </Section>
  );
}
