"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Sparkles, Download, Share2, Image as ImageIcon } from "lucide-react";

const ART_STYLES = [
  {
    id: "rock",
    name: "Rock",
    icon: "🎸",
    description: "Energetic rock aesthetic",
  },
  {
    id: "vintage",
    name: "Vintage",
    icon: "📻",
    description: "Retro 90s style",
  },
  {
    id: "modern",
    name: "Modern",
    icon: "✨",
    description: "Contemporary design",
  },
  {
    id: "grunge",
    name: "Grunge",
    icon: "🖤",
    description: "Dark grunge aesthetic",
  },
  { id: "neon", name: "Neon", icon: "🌈", description: "Bright neon colors" },
  {
    id: "minimalist",
    name: "Minimalist",
    icon: "⚪",
    description: "Clean and simple",
  },
];

const MOODS = [
  { id: "party", name: "Party", icon: "🎉", color: "bg-pink-500" },
  { id: "energetic", name: "Energetic", icon: "⚡", color: "bg-yellow-500" },
  { id: "chill", name: "Chill", icon: "😌", color: "bg-blue-500" },
  { id: "rebellious", name: "Rebellious", icon: "🤘", color: "bg-red-600" },
  { id: "nostalgic", name: "Nostalgic", icon: "💫", color: "bg-purple-500" },
  { id: "drinking", name: "Drinking", icon: "🍺", color: "bg-amber-600" },
];

export default function AIGeneratorPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>("rock");
  const [selectedMood, setSelectedMood] = useState<string>("energetic");
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [enhancePrompt, setEnhancePrompt] = useState<boolean>(true);
  const [enhancementInfo, setEnhancementInfo] = useState<any>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setImageError(false);
    setEnhancementInfo(null);
    setDebugInfo("Starting generation...");

    try {
      const finalPrompt =
        prompt ||
        `The Drinkers ${selectedStyle} style ${selectedMood} mood artwork, rock band poster, crimson red and black, professional design`;

      console.log("[AI Generator] Sending request with prompt:", finalPrompt);

      // Use LOCAL generation endpoint (SDXL Turbo - FREE, no API key!)
      const response = await fetch("/api/ai/generate-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: finalPrompt,
          category: "fan-art",
          aspect: "1:1",
          style: selectedStyle,
          mood: selectedMood,
          enhancePrompt,
        }),
      });

      console.log("[AI Generator] Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[AI Generator] API error:", errorData);
        throw new Error(errorData.error || "Failed to generate image");
      }

      const data = await response.json();
      console.log("[AI Generator] Response data:", data);

      if (data.success && data.imageUrl) {
        console.log("[AI Generator] Setting image:", data.imageUrl);
        setDebugInfo("Image generated successfully!");
        setGeneratedImage(data.imageUrl);
        console.log(
          "[AI Generator] generatedImage state set to:",
          data.imageUrl,
        );
        setEnhancementInfo(data.enhancementInfo);
        setImageError(false);
      } else {
        throw new Error(data.error || "Generation failed");
      }
    } catch (error) {
      console.error("[AI Generator] Error:", error);
      setImageError(true);
      setGeneratedImage(null);
      setDebugInfo(
        "Error: " + (error instanceof Error ? error.message : "Unknown"),
      );
      alert(
        "Napaka pri generiranju: " +
          (error instanceof Error
            ? error.message
            : "Prosimo poskusite ponovno."),
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (generatedImage) {
      try {
        // Fetch the image as blob
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `the-drinkers-ai-art-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed:", error);
        alert("Napaka pri prenosu slike.");
      }
    }
  };

  const handleShare = () => {
    if (navigator.share && generatedImage) {
      navigator.share({
        title: "The Drinkers AI Art",
        text: `Check out this AI-generated artwork: ${prompt}`,
        url: generatedImage,
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-rock-black">
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-bg.webp"
            alt="AI Generator"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-black" />
        </div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-16 h-16 text-crimson mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
              AI ART STUDIO
            </h1>
            <p className="text-xl text-text-gray">
              Ustvari unikaten artwork z umetno inteligenco
            </p>
          </motion.div>
        </div>
      </section>

      {/* Generator Section */}
      <Section background="darker">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              {/* Style Selection */}
              <GlassCard variant="dark">
                <h3 className="text-2xl font-bold text-white mb-4">
                  1️⃣ Izberi Stil
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {ART_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedStyle === style.id
                          ? "border-crimson bg-crimson/10"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="text-3xl mb-2">{style.icon}</div>
                      <div className="text-white font-bold">{style.name}</div>
                      <div className="text-sm text-text-gray">
                        {style.description}
                      </div>
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Mood Selection */}
              <GlassCard variant="dark">
                <h3 className="text-2xl font-bold text-white mb-4">
                  2️⃣ Izberi Razpoloženje
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {MOODS.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${mood.color} ${
                        selectedMood === mood.id
                          ? "border-white scale-105"
                          : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                    >
                      <div className="text-3xl mb-2">{mood.icon}</div>
                      <div className="text-white font-bold">{mood.name}</div>
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Custom Prompt */}
              <GlassCard variant="dark">
                <h3 className="text-2xl font-bold text-white mb-4">
                  3️⃣ Dodaj Opis (Opcijsko)
                </h3>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Opiši svoj artwork... (npr. 'The Drinkers koncertni poster z rdečimi lučmi')"
                  className="w-full h-32 p-4 bg-rock-black/50 border border-white/10 rounded-lg text-white placeholder-text-gray focus:border-crimson focus:outline-none"
                />
              </GlassCard>

              {/* Prompt Enhancement Toggle */}
              <GlassCard variant="dark">
                <h3 className="text-2xl font-bold text-white mb-4">
                  4️⃣ AI Izboljšanje Opisa
                </h3>
                <div className="flex items-center justify-between p-4 bg-rock-black/50 rounded-lg border border-white/10">
                  <div>
                    <p className="text-white font-bold mb-1">
                      Avtomatsko izboljšaj opis
                    </p>
                    <p className="text-sm text-text-gray">
                      AI bo izboljšal tvoj opis za boljše rezultate
                    </p>
                  </div>
                  <button
                    onClick={() => setEnhancePrompt(!enhancePrompt)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      enhancePrompt ? "bg-crimson" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        enhancePrompt ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </GlassCard>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-6 text-xl"
                size="lg"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 animate-spin" />
                    Generiranje...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ImageIcon className="w-6 h-6" />
                    Ustvari Artwork
                  </span>
                )}
              </Button>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              {/* Enhancement Info Display */}
              {enhancementInfo && (
                <GlassCard
                  variant="dark"
                  className="bg-green-500/10 border-green-500/30"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">
                        ✓ Opis je bil izboljšan
                      </span>
                      <span className="text-xs text-text-gray">
                        ({enhancementInfo.provider})
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-text-gray mb-1">Originalni opis:</p>
                        <p className="text-white bg-rock-black/50 p-2 rounded text-xs">
                          {enhancementInfo.originalPrompt}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-gray mb-1">Izboljšan opis:</p>
                        <p className="text-white bg-rock-black/50 p-2 rounded text-xs">
                          {enhancementInfo.enhancedPrompt}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              )}

              <GlassCard variant="dark" className="h-full">
                <h3 className="text-2xl font-bold text-white mb-4">
                  5️⃣ Tvoj Artwork
                </h3>

                {debugInfo && (
                  <div className="mb-4 p-3 bg-crimson/10 border border-crimson/30 rounded-lg">
                    <p className="text-sm text-crimson">{debugInfo}</p>
                    {generatedImage && (
                      <p className="text-xs text-crimson mt-1">
                        URL: {generatedImage}
                      </p>
                    )}
                  </div>
                )}

                {imageError ? (
                  <div className="w-full aspect-square rounded-lg bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
                    <div className="text-center text-red-400">
                      <span className="text-4xl mb-4 block">❌</span>
                      <p className="text-lg font-bold">
                        Napaka pri generiranju
                      </p>
                      <p className="text-sm mt-2">Prosimo poskusite ponovno</p>
                    </div>
                  </div>
                ) : generatedImage ? (
                  <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-rock-black">
                      <img
                        src={generatedImage}
                        alt="Generated AI Art"
                        className="w-full h-full object-cover"
                        onLoad={() =>
                          console.log(
                            "[AI Generator] Image loaded successfully",
                          )
                        }
                        onError={(e) => {
                          console.error(
                            "[AI Generator] Image failed to load:",
                            e,
                          );
                          setImageError(true);
                        }}
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button onClick={handleDownload} className="flex-1">
                        <Download className="w-5 h-5 mr-2" />
                        Prenesi
                      </Button>
                      <Button
                        onClick={handleShare}
                        variant="secondary"
                        className="flex-1"
                      >
                        <Share2 className="w-5 h-5 mr-2" />
                        Deli
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-square rounded-lg bg-rock-black/50 border-2 border-dashed border-white/10 flex items-center justify-center">
                    <div className="text-center text-text-gray">
                      <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">
                        Tvoj artwork se bo pojavil tukaj
                      </p>
                      <p className="text-sm mt-2">
                        Izberi stil, razpoloženje in klikni &quot;Ustvari
                        Artwork&quot;
                      </p>
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section background="gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-crimson text-center mb-8">
            Nedavno Ustvarjeno
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg overflow-hidden bg-rock-black"
              >
                <img
                  src={`https://image.pollinations.ai/prompt/rock_band_art_${i}?width=512&height=512&seed=${i}&model=flux&nologo=true`}
                  alt={`Example ${i}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                  crossOrigin="anonymous"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
