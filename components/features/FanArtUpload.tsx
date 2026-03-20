'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function FanArtUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setSelectedFile(null);
        setPreview(null);
      }, 3000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Section background="darker">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-crimson text-center mb-4">
            FAN ART GALERIJA
          </h2>
          <p className="text-text-gray text-center mb-8 max-w-2xl mx-auto">
            Ustvari umetninsko delo, inspirirano s The Drinkers in ga deli z nami! Izbrana dela bodo objavljena v naši galeriji.
          </p>

          <div
            className={`card p-8 transition-all duration-300 ${
              isDragging ? 'border-crimson bg-crimson/10' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!preview ? (
              <div
                className="border-2 border-dashed border-white/30 rounded-lg p-12 text-center cursor-pointer hover:border-crimson transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Povleci in spusti sliko
                </h3>
                <p className="text-text-gray mb-4">ali klikni za izbiro datoteke</p>
                <p className="text-text-gray text-sm">
                  Podprti formati: JPG, PNG, GIF (max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-96 object-contain rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setPreview(null);
                      setSelectedFile(null);
                    }}
                    className="absolute top-4 right-4 bg-crimson text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-crimson-light transition-colors font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPreview(null);
                      setSelectedFile(null);
                    }}
                  >
                    PREKLIČI
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isUploading || uploadSuccess}
                    className="flex-1"
                  >
                    {isUploading ? 'NALAGANJE...' : uploadSuccess ? 'OBJAVLJENO!' : 'OBJAVI'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Guidelines */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="text-crimson text-3xl mb-4">
                <i className="fas fa-image" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Format</h3>
              <p className="text-text-gray text-sm">
                JPG, PNG ali GIF, največ 5MB
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-crimson text-3xl mb-4">
                <i className="fas fa-shield-alt" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Originalnost</h3>
              <p className="text-text-gray text-sm">
                Delo mora biti tvoje originalno
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-crimson text-3xl mb-4">
                <i className="fas fa-clock" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Pregled</h3>
              <p className="text-text-gray text-sm">
                Vsa dela so moderirana pred objavo
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
