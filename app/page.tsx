import Hero from '@/components/sections/Hero';
import { MusicGrid } from '@/components/sections/MusicGrid';
import { TourCalendar } from '@/components/sections/TourCalendar';
import { AboutSection } from '@/components/sections/AboutSection';
import { GalleryGrid } from '@/components/sections/GalleryGrid';
import { MerchCarousel } from '@/components/sections/MerchCarousel';
import { ContactSection } from '@/components/sections/ContactSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import PivskiStavec from '@/app/(bar)/page';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MusicGrid />
      <TourCalendar />
      <AboutSection />
      <GalleryGrid />
      <MerchCarousel />
      <ContactSection />
      <NewsletterSection />
      <PivskiStavec />
    </>
  );
}
