'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Download, 
  Share2, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Heart,
  Copy,
  Maximize2
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  category: string;
  aspect: string;
  model: string;
  createdAt: string;
}

interface ModelOption {
  id: string;
  name: string;
  description: string;
  quality: string;
  speed: string;
  cost: string;
}

const CATEGORIES = [
  { id: 'album', name: 'Album Cover', icon: '💿', aspect: '1:1' },
  { id: 'band', name: 'Band Photo', icon: '🎸', aspect: '16:9' },
  { id: 'social', name: 'Social Media', icon: '📱', aspect: '1:1' },
  { id: 'poster', name: 'Poster', icon: '🎫', aspect: '2:3' },
  { id: 'merch', name: 'Merchandise', icon: '👕', aspect: '4:5' },
  { id: 'fan-art', name: 'Fan Art', icon: '🎨', aspect: '1:1' },
];

const ASPECT_RATIOS = [
  { id: '1:1', name: 'Square (1:1)', use: 'Album covers, Instagram' },
  { id: '16:9', name: 'Landscape (16:9)', use: 'YouTube, banners' },
  { id: '9:16', name: 'Portrait (9:16)', use: 'TikTok, Stories' },
  { id: '4:3', name: 'Standard (4:3)', use: 'Photos' },
  { id: '2:3', name: 'Poster (2:3)', use: 'Posters' },
  { id: '3:2', name: 'Wide (3:2)', use: 'Facebook covers' },
];

const MODELS: ModelOption[] = [
  {
    id: 'pollinations-free',
    name: 'Pollinations (FREE)',
    description: '100% free, powered by FLUX',
    quality: 'High',
    speed: 'Fast',
    cost: 'Free',
  },
  {
    id: 'flux',
    name: 'FLUX Dev',
    description: 'High quality with styles',
    quality: 'Very High',
    speed: 'Medium',
    cost: 'Paid',
  },
  {
    id: 'seedream',
    name: 'Seedream 4.5',
    description: '2K-4K cinematic',
    quality: 'Ultra',
    speed: 'Medium',
    cost: 'Paid',
  },
  {
    id: 'gemini',
    name: 'Gemini 3 Pro',
    description: "Google's latest",
    quality: 'Ultra',
    speed: 'Fast',
    cost: 'Paid',
  },
];

const PRESET_PROMPTS = [
  'Professional rock album cover for The Drinkers Slovenian rock band, crimson red and black color scheme, minimalist design, beer glass silhouette, modern typography space, high contrast studio lighting, 4K quality',
  'The Drinkers live in concert, crowd surfing fan, energetic rock show, crimson stage lights, beer mugs in air, Slovenian flag colors, professional concert photography, dynamic action shot',
  'Instagram square post for The Drinkers rock concert announcement, crimson red and black color scheme, guitar and beer mug composition, modern social media aesthetic, bold text space',
  'Concert tour poster for The Drinkers 2026 Slovenian tour, bold text "THE DRINKERS", tour dates and cities, crimson red and black color scheme, beer mug and guitar graphics, vintage rock poster aesthetic',
  'Black t-shirt mockup with "Pijemo ga radi" The Drinkers band logo, crimson red print, professional product photography, white background, e-commerce ready',
];

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('fan-art');
  const [aspect, setAspect] = useState('1:1');
  const [model, setModel] = useState('pollinations-free');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          category,
          aspect,
          model,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const newImage: GeneratedImage = {
          id: result.imageId || `img-${Date.now()}`,
          url: result.imageUrl,
          prompt: result.prompt,
          category: result.category || category,
          aspect: result.aspect,
          model: result.model,
          createdAt: result.generatedAt,
        };

        setGeneratedImages(prev => [newImage, ...prev]);
        setPrompt('');
      } else {
        setError(result.error || 'Failed to generate image');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUsePreset = (presetPrompt: string) => {
    setPrompt(presetPrompt);
    setShowPresets(false);
  };

  const handleDownload = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  const handleShare = async (image: GeneratedImage) => {
    if (navigator.share) {
      try {
        const response = await fetch(image.url);
        const blob = await response.blob();
        const file = new File([blob], 'ai-image.jpg', { type: 'image/jpeg' });
        
        await navigator.share({
          title: 'AI Generated Image',
          text: image.prompt,
          files: [file],
        });
      } catch (err) {
        console.error('Share error:', err);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(image.url);
      alert('Image URL copied to clipboard!');
    }
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-crimson/10 via-rock-black to-rock-bg p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-crimson animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold text-gradient">
              AI Image Generator
            </h1>
            <Sparkles className="w-10 h-10 text-crimson animate-pulse" />
          </div>
          <p className="text-xl text-rock-muted mb-2">
            Create stunning visuals for The Drinkers with AI
          </p>
          <p className="text-sm text-rock-muted">
            Powered by FLUX, Seedream, Gemini & Pollinations.ai
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <GlassCard variant="dark" className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-crimson" />
                Create Your Image
              </h2>

              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Prompt Description *
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate... e.g., 'Professional rock album cover for The Drinkers, crimson red and black color scheme...'"
                  className="w-full h-32 px-4 py-3 bg-rock-gray/50 border border-crimson/30 rounded-lg text-white placeholder-rock-muted focus:outline-none focus:ring-2 focus:ring-crimson/50 resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={() => setShowPresets(!showPresets)}
                    className="text-sm text-crimson hover:underline"
                  >
                    {showPresets ? 'Hide' : 'Use'} preset prompts
                  </button>
                  <span className="text-xs text-rock-muted">
                    {prompt.length} characters
                  </span>
                </div>

                {/* Preset Prompts */}
                <AnimatePresence>
                  {showPresets && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 space-y-2 overflow-hidden"
                    >
                      {PRESET_PROMPTS.map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => handleUsePreset(preset)}
                          className="w-full text-left p-3 bg-rock-gray/30 hover:bg-crimson/10 border border-crimson/20 rounded-lg text-sm text-rock-muted hover:text-white transition-all"
                        >
                          {preset.substring(0, 100)}...
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.id);
                        setAspect(cat.aspect);
                      }}
                      className={`p-3 rounded-lg border transition-all ${
                        category === cat.id
                          ? 'bg-crimson text-white border-crimson'
                          : 'bg-rock-gray/50 text-rock-muted border-crimson/20 hover:border-crimson/50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{cat.icon}</div>
                      <div className="text-xs font-medium">{cat.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Aspect Ratio
                </label>
                <select
                  value={aspect}
                  onChange={(e) => setAspect(e.target.value)}
                  className="w-full px-4 py-3 bg-rock-gray/50 border border-crimson/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-crimson/50"
                >
                  {ASPECT_RATIOS.map((ratio) => (
                    <option key={ratio.id} value={ratio.id}>
                      {ratio.name} - {ratio.use}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  AI Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-3 bg-rock-gray/50 border border-crimson/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-crimson/50"
                >
                  {MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.quality} ({m.cost})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-rock-muted mt-2">
                  {MODELS.find(m => m.id === model)?.description}
                </p>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Generate Image
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>

          {/* Generated Images Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard variant="dark" className="p-6 h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-crimson" />
                Generated Images
                {generatedImages.length > 0 && (
                  <span className="text-sm font-normal text-rock-muted">
                    ({generatedImages.length})
                  </span>
                )}
              </h2>

              {generatedImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-rock-muted">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-center">
                    No images generated yet
                  </p>
                  <p className="text-sm">
                    Enter a prompt and click generate to create your first image
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
                  {generatedImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-rock-gray/50 rounded-lg overflow-hidden border border-crimson/20 hover:border-crimson/50 transition-all cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-xs text-white line-clamp-2">
                            {image.prompt}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-crimson">
                              {image.category}
                            </span>
                            <span className="text-xs text-rock-muted">
                              {image.aspect}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>

        {/* Image Detail Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="bg-rock-surface rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">Generated Image</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-rock-muted hover:text-white"
                >
                  ✕
                </button>
              </div>

              <img
                ref={imageRef}
                src={selectedImage.url}
                alt={selectedImage.prompt}
                className="w-full rounded-lg mb-4"
              />

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Prompt</h4>
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-rock-muted flex-1">
                      {selectedImage.prompt}
                    </p>
                    <button
                      onClick={() => handleCopyPrompt(selectedImage.prompt)}
                      className="p-2 text-crimson hover:bg-crimson/10 rounded"
                      title="Copy prompt"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Category</h4>
                    <p className="text-sm text-rock-muted capitalize">
                      {selectedImage.category}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Aspect Ratio</h4>
                    <p className="text-sm text-rock-muted">
                      {selectedImage.aspect}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Model</h4>
                    <p className="text-sm text-rock-muted">
                      {selectedImage.model}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Created</h4>
                    <p className="text-sm text-rock-muted">
                      {new Date(selectedImage.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownload(selectedImage.url, `${selectedImage.id}.jpg`)}
                    className="btn-primary flex items-center gap-2 flex-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handleShare(selectedImage)}
                    className="btn-secondary flex items-center gap-2 flex-1"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => {
                      setPrompt(selectedImage.prompt);
                      setSelectedImage(null);
                    }}
                    className="btn-secondary flex items-center gap-2"
                    title="Use this prompt"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Remix
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
