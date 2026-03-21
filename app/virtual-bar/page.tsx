import VirtualBar from '@/components/features/VirtualBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Virtual Bar | The Drinkers',
  description: 'Druži se z drugimi fani v virtualnem baru The Drinkers. Glasba, chat in exclusive events.',
  keywords: ['virtual bar', 'fan community', 'The Drinkers', 'chat', 'music'],
};

export default function VirtualBarPage() {
  return <VirtualBar />;
}
