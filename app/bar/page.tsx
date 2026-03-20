import { Metadata } from 'next';
import { DrinkersBar } from '@/components/sections/DrinkersBar';

export const metadata: Metadata = {
  title: "Drinkers' Bar",
  description: 'Ekskluzivni fan klub - dostop samo za člane.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BarPage() {
  return (
    <div className="min-h-screen pt-20">
      <DrinkersBar />
    </div>
  );
}
