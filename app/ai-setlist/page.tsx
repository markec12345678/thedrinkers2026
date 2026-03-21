import AISetlistPredictor from '@/components/features/AISetlistPredictor';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Setlist Predictor | The Drinkers',
  description: 'AI-predicted setlisti za vsako priložnost. Generiraj personaliziran setlist The Drinkers pesmi.',
  keywords: ['setlist', 'AI predictor', 'The Drinkers', 'music', 'playlist'],
};

export default function AISetlistPredictorPage() {
  return <AISetlistPredictor />;
}
