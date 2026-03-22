import HeroNew from '@/components/sections/HeroNew';
import { MusicGrid } from '@/components/sections/MusicGrid';
import { TourCalendar } from '@/components/sections/TourCalendar';
import { AboutSection } from '@/components/sections/AboutSection';
import MusicVideos from '@/components/sections/MusicVideos';
import { GalleryGrid } from '@/components/sections/GalleryGrid';
import { MerchCarousel } from '@/components/sections/MerchCarousel';
import { ContactSection } from '@/components/sections/ContactSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroNew />
      <MusicGrid />
      <TourCalendar />
      <AboutSection />
      <MusicVideos />
      <GalleryGrid />
      <MerchCarousel />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
