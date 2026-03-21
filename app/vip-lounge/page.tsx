import VIPLounge from '@/components/features/VIPLounge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VIP Lounge | The Drinkers',
  description: 'Ekskluzivni fan club The Drinkers. Odkleni benefite, dostop do backstagea in posebne ugodnosti.',
  keywords: ['VIP', 'fan club', 'The Drinkers', 'exclusive', 'backstage', 'virtual bar'],
};

export default function VIPLoungePage() {
  return <VIPLounge />;
}
