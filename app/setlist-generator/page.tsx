import AISetlistGenerator from '@/components/features/AISetlistGenerator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Setlist Generator | The Drinkers',
  description: 'Ustvari personaliziran setlist The Drinkers pesmi za vsako priložnost. AI-powered playlist generator.',
  keywords: ['setlist', 'playlist', 'The Drinkers', 'AI generator', 'Spotify'],
};

export default function SetlistGeneratorPage() {
  return <AISetlistGenerator />;
}
