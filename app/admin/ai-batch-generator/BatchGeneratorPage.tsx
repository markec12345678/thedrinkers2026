"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Download,
  Share2,
  Image as ImageIcon,
  Zap,
  History,
} from "lucide-react";
import { BatchImageGrid } from "@/components/features/BatchImageGrid";
import {
  BatchVariationSelector,
  VariationConfig,
} from "@/components/features/BatchVariationSelector";
import { AIImageGenerationResponse } from "@/lib/types/ai";

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

interface BatchResponse {
  success: boolean;
  images: AIImageGenerationResponse[];
  batchId?: string;
  totalTime?: number;
  quantity?: number;
  mode?: string;
  successCount?: number;
  enhancementInfo?: {
    provider: string;
    originalPrompt: string;
    enhancedPrompt: string;
  };
}

interface BatchHistory {
  id: string;
  images: AIImageGenerationResponse[];
  batchId: string;
  quantity: number;
  mode: string;
  timestamp: string;
  totalTime: number;
}

export default function AIBatchGeneratorPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>("rock");
  const [selectedMood, setSelectedMood] = useState<string>("energetic");
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [batchQuantity, setBatchQuantity] = useState(6);
  const [batchMode, setBatchMode] = useState<"same" | "variations">("same");
  const [generatedImages, setGeneratedImages] = useState<
    AIImageGenerationResponse[]
  >([]);
  const [batchHistory, setBatchHistory] = useState<BatchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [variations, setVariations] = useState<VariationConfig[]>([]);
  const [enhancePrompt, setEnhancePrompt] = useState<boolean>(true);
  const [enhancementInfo, setEnhancementInfo] = useState<any>(null);

  // Load batch history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("batchHistory");
    if (saved) {
      try {
        setBatchHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load batch history:", error);
      }
    }
  }, []);

  // Save batch history to localStorage
  const saveBatchHistory = (history: BatchHistory) => {
    const updated = [history, ...batchHistory].slice(0, 5); // Keep last 5 batches
    setBatchHistory(updated);
    localStorage.setItem("batchHistory", JSON.stringify(updated));
  };

  const handleGenerate = async () => {
    // Validate variations mode
    if (batchMode === "variations" && variations.length === 0) {
      alert("Dodaj vsaj eno variaciju za generiranje.");
      return;
    }

    setIsGenerating(true);

    try {
      const finalPrompt =
        prompt ||
        `The Drinkers ${selectedStyle} style ${selectedMood} mood artwork`;

      const payload: any = {
        prompt: finalPrompt,
        category: "fan-art",
        aspect: "1:1",
        model: "pollinations-free",
        style: selectedStyle,
        mood: selectedMood,
        quantity:
          batchMode === "variations" ? variations.length : batchQuantity,
        mode: batchMode,
        enhancePrompt,
      };

      // Add variation configs if in variations mode
      if (batchMode === "variations" && variations.length > 0) {
        payload.variationConfigs = variations.map((v) => ({
          prompt: v.prompt || finalPrompt,
          style: v.style || selectedStyle,
          mood: v.mood || selectedMood,
        }));
      }

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to generate batch");
      }

      const data: BatchResponse = await response.json();
      setGeneratedImages(data.images || []);
      setEnhancementInfo(data.enhancementInfo);

      // Save to history
      if (data.batchId && data.images) {
        saveBatchHistory({
          id: `history-${Date.now()}`,
          images: data.images,
          batchId: data.batchId,
          quantity: data.quantity || batchQuantity,
          mode: batchMode,
          timestamp: new Date().toISOString(),
          totalTime: data.totalTime || 0,
        });
      }
    } catch (error) {
      console.error("Generation error:", error);
      alert("Napaka pri generiranju. Prosimo poskusite ponovno.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string, imageId: string) => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `the-drinkers-batch-${imageId || Date.now()}.jpg`;
      link.click();
    }
  };

  const handleDeleteImage = (imageId: string) => {
    setGeneratedImages((prev) => prev.filter((img) => img.imageId !== imageId));
  };

  const handleLoadFromHistory = (history: BatchHistory) => {
    setGeneratedImages(history.images);
    setShowHistory(false);
  };

  const handleClearHistory = () => {
    if (confirm("Ste prepričani, da želite izbrisati zgodovino?")) {
      setBatchHistory([]);
      localStorage.removeItem("batchHistory");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-rock-black">
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-bg.webp"
            alt="Batch AI Generator"
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
            <Zap className="w-16 h-16 text-crimson mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
              AI BATCH STUDIO
            </h1>
            <p className="text-xl text-text-gray">
              Ustvari več unikatnih artworkov naenkrat
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
                      <div className="text-white font-bold text-sm">
                        {style.name}
                      </div>
                      <div className="text-xs text-text-gray">
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
                      <div className="text-white font-bold text-sm">
                        {mood.name}
                      </div>
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

              {/* Batch Configuration */}
              <GlassCard variant="dark">
                <h3 className="text-2xl font-bold text-white mb-4">
                  5️⃣ Batch Konfiguracija
                </h3>
                <div className="space-y-4">
                  {/* Quantity Selector (only for same mode) */}
                  {batchMode === "same" && (
                    <div>
                      <label className="block text-sm text-text-gray mb-2">
                        Količina slik (2-6)
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {[2, 3, 4, 5, 6].map((qty) => (
                          <button
                            key={qty}
                            onClick={() => setBatchQuantity(qty)}
                            className={`py-2 px-3 rounded-lg border-2 transition-all font-bold text-sm ${
                              batchQuantity === qty
                                ? "border-crimson bg-crimson/20 text-crimson"
                                : "border-white/20 text-text-gray hover:border-white/40"
                            }`}
                          >
                            {qty}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mode Selector */}
                  <div>
                    <label className="block text-sm text-text-gray mb-2">
                      Način generiranja
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setBatchMode("same");
                          setVariations([]);
                        }}
                        className={`py-3 px-4 rounded-lg border-2 transition-all font-bold text-center text-sm ${
                          batchMode === "same"
                            ? "border-crimson bg-crimson/20 text-crimson"
                            : "border-white/20 text-text-gray hover:border-white/40"
                        }`}
                      >
                        Enake nastavke
                      </button>
                      <button
                        onClick={() => setBatchMode("variations")}
                        className={`py-3 px-4 rounded-lg border-2 transition-all font-bold text-center text-sm ${
                          batchMode === "variations"
                            ? "border-crimson bg-crimson/20 text-crimson"
                            : "border-white/20 text-text-gray hover:border-white/40"
                        }`}
                      >
                        Variacije
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Variations Selector (only in variations mode) */}
              {batchMode === "variations" && (
                <BatchVariationSelector
                  variations={variations}
                  onVariationsChange={setVariations}
                  availableStyles={ART_STYLES}
                  availableMoods={MOODS}
                />
              )}

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={
                  isGenerating ||
                  (batchMode === "variations" && variations.length === 0)
                }
                className="w-full py-6 text-xl"
                size="lg"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 animate-spin" />
                    Generiranje batch (
                    {batchMode === "variations"
                      ? variations.length
                      : batchQuantity}
                    )...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    Ustvari Batch (
                    {batchMode === "variations"
                      ? variations.length
                      : batchQuantity}
                    )
                  </span>
                )}
              </Button>
            </div>

            {/* Results */}
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
                  6️⃣ Rezultati
                </h3>
                <BatchImageGrid
                  images={generatedImages}
                  isGenerating={isGenerating}
                  onDownload={handleDownload}
                  onDelete={handleDeleteImage}
                  quantity={batchQuantity}
                />
              </GlassCard>
            </div>
          </div>
        </div>
      </Section>

      {/* Batch History Section */}
      {batchHistory.length > 0 && (
        <Section background="gradient">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-crimson flex items-center gap-3">
                <History className="w-10 h-10" />
                Nedavno Ustvarjeni Batchi
              </h2>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowHistory(!showHistory)}
                  variant={showHistory ? "secondary" : "default"}
                  size="sm"
                >
                  {showHistory ? "Skrij" : "Pokaži"} Zgodovino
                </Button>
                {showHistory && (
                  <Button
                    onClick={handleClearHistory}
                    variant="secondary"
                    size="sm"
                  >
                    Izbriši Zgodovino
                  </Button>
                )}
              </div>
            </div>

            {showHistory ? (
              <div className="space-y-4">
                {batchHistory.map((history) => (
                  <GlassCard key={history.id} variant="dark">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">
                          Batch {batchHistory.indexOf(history) + 1} •{" "}
                          {history.quantity} slik
                        </h4>
                        <p className="text-sm text-text-gray">
                          {new Date(history.timestamp).toLocaleString()} •{" "}
                          {history.mode} • {history.totalTime}ms
                        </p>
                      </div>
                      <Button
                        onClick={() => handleLoadFromHistory(history)}
                        size="sm"
                      >
                        Naloži
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                      {history.images.slice(0, 6).map((image, idx) => (
                        <div
                          key={idx}
                          className="aspect-square rounded-lg overflow-hidden bg-rock-black"
                        >
                          {image.success && image.imageUrl ? (
                            <img
                              src={image.imageUrl}
                              alt={`Batch preview ${idx}`}
                              className="w-full h-full object-cover hover:scale-110 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full bg-red-500/20 flex items-center justify-center text-xs text-red-400">
                              Napaka
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <p className="text-center text-text-gray">
                Klikni &quot;Pokaži Zgodovino&quot; za pregled nedavnih batchev
              </p>
            )}
          </div>
        </Section>
      )}
    </>
  );
}
