import { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { FanArtUpload } from "@/components/features/FanArtUpload";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Galerija",
  description:
    "Poglej fotografije s koncertov in dogodkov skupine The Drinkers.",
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-rock-dark">
        <div className="absolute inset-0">
          <img
            src="/images/gallery/live-001.jpg"
            alt="Gallery"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-dark" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
            GALERIJA
          </h1>
          <p className="text-xl text-text-gray">Ujeti trenutki</p>
        </div>
      </section>

      {/* Gallery */}
      <GalleryGrid />

      {/* Fan Art Upload */}
      <FanArtUpload />

      {/* Gallery Info */}
      <Section background="gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-crimson mb-6">
            DELI SVOJE FOTOGRAFIJE
          </h2>
          <p className="text-lg text-text-gray mb-8">
            Si nas fotografiral na koncertu? Deli svoje fotografije z nami in
            morda se znajdejo v naši uradni galeriji!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:info@thedrinkers.si?subject=Fan Photos"
              className="px-8 py-4 bg-crimson text-white rounded-lg font-bold uppercase hover:bg-crimson-light transition-colors"
            >
              <i className="fas fa-envelope mr-2" />
              POŠLJI PO EMAILU
            </a>
            <a
              href="https://instagram.com/thedrinkers"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold uppercase hover:bg-white hover:text-rock-black transition-colors"
            >
              <i className="fab fa-instagram mr-2" />
              OZNAČI NA INSTAGRAMU
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
