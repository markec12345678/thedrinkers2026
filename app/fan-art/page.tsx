import FanArtGallery from '@/components/features/FanArtGallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fan Art Gallery | The Drinkers',
  description: 'Galerija umetnosti ustvarjene s strani fanov The Drinkers. Oddaj svoje delo, glasuj za najljubše, sodeluj na tekmovanjih.',
  keywords: ['fan art', 'gallery', 'The Drinkers', 'community', 'contest', 'artwork'],
};

export default function FanArtGalleryPage() {
  return <FanArtGallery />;
}
