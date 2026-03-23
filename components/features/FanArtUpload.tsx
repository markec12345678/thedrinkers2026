'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Upload, Image, X, Check, Loader2 } from 'lucide-react';

export function FanArtUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Invalid file type. Please upload JPEG, PNG, WebP, or GIF.');
        return;
      }

      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        setError('File too large. Max size: 10MB.');
        return;
      }

      setFile(selectedFile);
      setError('');

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !artist) {
      setError('Please fill in all required fields and select a file.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('description', description);

      const response = await fetch('/api/fan-art/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploaded(true);
        setFile(null);
        setPreview(null);
        setTitle('');
        setArtist('');
        setDescription('');
      } else {
        setError(result.error || 'Upload failed. Please try again.');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setUploaded(false);
    setFile(null);
    setPreview(null);
    setTitle('');
    setArtist('');
    setDescription('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Section background="gradient">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-crimson mb-4">
            🎨 Objavi Svojo Umetnino
          </h2>
          <p className="text-xl text-text-gray">
            Deli svojo The Drinkers umetnost s skupnostjo
          </p>
        </div>

        {uploaded ? (
          /* Success State */
          <GlassCard variant="dark" className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Hvala za prispevek! 🎉
            </h3>
            <p className="text-text-gray mb-6">
              Tvoja umetnina je bila uspešno oddana. Naša ekipa jo bo pregledala v 24-48 urah.
            </p>
            <Button onClick={resetForm} size="lg">
              Objavi Še Eno
            </Button>
          </GlassCard>
        ) : (
          /* Upload Form */
          <GlassCard variant="dark" className="p-8">
            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-white font-bold mb-4">
                Umetnina *
              </label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-crimson/50 transition-colors"
              >
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg shadow-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setPreview(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-16 h-16 text-text-gray mx-auto mb-4" />
                    <p className="text-white font-bold mb-2">
                      Povleci in spusti ali klikni za upload
                    </p>
                    <p className="text-text-gray text-sm">
                      JPEG, PNG, WebP, GIF (max 10MB)
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">
                Naslov *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="npr. The Drinkers Concert Poster"
                className="w-full px-4 py-3 bg-rock-black/50 border border-white/10 rounded-lg text-white placeholder-text-gray focus:border-crimson focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Artist Name */}
            <div className="mb-4">
              <label className="block text-white font-bold mb-2">
                Tvoje Ime *
              </label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="npr. Marko M."
                className="w-full px-4 py-3 bg-rock-black/50 border border-white/10 rounded-lg text-white placeholder-text-gray focus:border-crimson focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-white font-bold mb-2">
                Opis (Opcijsko)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Opiši svojo umetnino..."
                rows={4}
                className="w-full px-4 py-3 bg-rock-black/50 border border-white/10 rounded-lg text-white placeholder-text-gray focus:border-crimson focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleUpload}
              disabled={uploading || !file || !title || !artist}
              className="w-full py-4 text-lg"
              size="lg"
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Oddajam...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Image className="w-6 h-6" />
                  Objavi Umetnino
                </span>
              )}
            </Button>

            <p className="text-text-gray text-sm text-center mt-4">
              Z objavo se strinjaš, da se tvoja umetnina lahko prikaže v galeriji.
            </p>
          </GlassCard>
        )}
      </div>
    </Section>
  );
}
