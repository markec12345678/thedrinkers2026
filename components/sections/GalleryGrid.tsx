'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';

// Use YouTube thumbnails as gallery images since local images don't exist
const galleryImages = [
  { id: 'img-001', src: 'https://img.youtube.com/vi/5bYFArOho7U/maxresdefault.jpg', alt: 'Deset majhnih jagrov', category: 'live' },
  { id: 'img-002', src: 'https://img.youtube.com/vi/hkHHvb2eDb4/maxresdefault.jpg', alt: 'Pijemo ga radi', category: 'live' },
  { id: 'img-003', src: 'https://img.youtube.com/vi/7HHx9c3YnMQ/maxresdefault.jpg', alt: 'Ko Tamo Peva', category: 'live' },
  { id: 'img-004', src: 'https://img.youtube.com/vi/oKa8Y_rwhD0/maxresdefault.jpg', alt: 'Bosten', category: 'live' },
  { id: 'img-005', src: 'https://img.youtube.com/vi/FFKtFXLONR0/maxresdefault.jpg', alt: 'Slovenac', category: 'live' },
  { id: 'img-006', src: 'https://img.youtube.com/vi/d3ygw0J_VgQ/maxresdefault.jpg', alt: 'Lepi In Trezni', category: 'live' },
  { id: 'img-007', src: 'https://img.youtube.com/vi/aU32hb58g4E/maxresdefault.jpg', alt: 'Recidiv', category: 'live' },
  { id: 'img-008', src: 'https://img.youtube.com/vi/xwL-SFI5DTI/maxresdefault.jpg', alt: 'Zeja', category: 'live' },
];

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return;
    const newIndex = (selectedImage + direction + galleryImages.length) % galleryImages.length;
    setSelectedImage(newIndex);
  };

  return (
    <Section id="gallery" background="darker">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          GALERIJA
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-crimson/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <i className="fas fa-expand text-3xl text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-crimson transition-colors text-4xl font-bold z-10"
              >
                ×
              </button>

              {/* Image */}
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Navigation */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => navigateImage(-1)}
                  className="bg-crimson text-white px-6 py-3 rounded-lg hover:bg-crimson-light transition-colors text-2xl font-bold"
                >
                  ‹
                </button>
                <div className="text-center text-text-gray">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
                <button
                  onClick={() => navigateImage(1)}
                  className="bg-crimson text-white px-6 py-3 rounded-lg hover:bg-crimson-light transition-colors text-2xl font-bold"
                >
                  ›
                </button>
              </div>

              {/* Image Info */}
              {galleryImages[selectedImage].title && (
                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-crimson">{galleryImages[selectedImage].title}</h3>
                  {galleryImages[selectedImage].description && (
                    <p className="text-text-gray">{galleryImages[selectedImage].description}</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
