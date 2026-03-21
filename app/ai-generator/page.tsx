import AIImageGenerator from '@/components/features/AIImageGenerator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Image Generator | The Drinkers',
  description: 'Create stunning AI-generated visuals for The Drinkers band. Album covers, band photos, social media content, and more.',
  keywords: ['AI images', 'The Drinkers', 'album cover', 'band photos', 'AI art'],
};

export default function AIImageGeneratorPage() {
  return <AIImageGenerator />;
}
