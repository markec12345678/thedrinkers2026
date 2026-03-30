"use client";

import { useState } from "react";
import { Plus, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export interface VariationConfig {
  id: string;
  prompt: string;
  style?: string;
  mood?: string;
}

interface BatchVariationSelectorProps {
  variations: VariationConfig[];
  onVariationsChange: (variations: VariationConfig[]) => void;
  availableStyles?: { id: string; name: string; icon: string }[];
  availableMoods?: { id: string; name: string; icon: string; color: string }[];
}

export function BatchVariationSelector({
  variations,
  onVariationsChange,
  availableStyles = [],
  availableMoods = [],
}: BatchVariationSelectorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addVariation = () => {
    const newVariation: VariationConfig = {
      id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      prompt: "",
      style: availableStyles[0]?.id || "rock",
      mood: availableMoods[0]?.id || "energetic",
    };
    onVariationsChange([...variations, newVariation]);
    setExpandedId(newVariation.id);
  };

  const updateVariation = (id: string, updates: Partial<VariationConfig>) => {
    onVariationsChange(
      variations.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    );
  };

  const deleteVariation = (id: string) => {
    onVariationsChange(variations.filter((v) => v.id !== id));
    setExpandedId(null);
  };

  const duplicateVariation = (id: string) => {
    const variation = variations.find((v) => v.id === id);
    if (variation) {
      const newVariation: VariationConfig = {
        ...variation,
        id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      onVariationsChange([...variations, newVariation]);
    }
  };

  return (
    <GlassCard variant="dark">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">
          Variacije ({variations.length})
        </h3>
        <Button
          onClick={addVariation}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Dodaj Variaciju
        </Button>
      </div>

      <div className="space-y-3">
        {variations.length === 0 ? (
          <div className="text-center py-8 text-text-gray">
            <p>Ni variacij. Klikni &quot;Dodaj Variaciju&quot; za začetek.</p>
          </div>
        ) : (
          variations.map((variation, index) => (
            <div
              key={variation.id}
              className="border border-white/10 rounded-lg overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() =>
                  setExpandedId(
                    expandedId === variation.id ? null : variation.id,
                  )
                }
                className="w-full px-4 py-3 bg-rock-black/50 hover:bg-rock-black/70 transition-colors flex justify-between items-center"
              >
                <div className="text-left">
                  <p className="text-white font-semibold">
                    Variacija {index + 1}
                  </p>
                  <p className="text-xs text-text-gray line-clamp-1">
                    {variation.prompt || "(Ni opisane)"}
                  </p>
                </div>
                <div className="text-sm text-text-gray">
                  {variation.style && variation.mood && (
                    <span>
                      {
                        availableStyles.find((s) => s.id === variation.style)
                          ?.icon
                      }{" "}
                      {
                        availableMoods.find((m) => m.id === variation.mood)
                          ?.icon
                      }
                    </span>
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {expandedId === variation.id && (
                <div className="px-4 py-4 bg-rock-black/30 border-t border-white/10 space-y-4">
                  {/* Prompt */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Opis / Prompt
                    </label>
                    <textarea
                      value={variation.prompt}
                      onChange={(e) =>
                        updateVariation(variation.id, {
                          prompt: e.target.value,
                        })
                      }
                      placeholder="Opiši to variaciju..."
                      className="w-full h-24 p-3 bg-rock-black/50 border border-white/10 rounded-lg text-white placeholder-text-gray focus:border-crimson focus:outline-none"
                    />
                  </div>

                  {/* Style Selection */}
                  {availableStyles.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Stil
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() =>
                              updateVariation(variation.id, { style: style.id })
                            }
                            className={`p-3 rounded-lg border-2 transition-all text-center ${
                              variation.style === style.id
                                ? "border-crimson bg-crimson/20"
                                : "border-white/10 hover:border-white/30"
                            }`}
                          >
                            <div className="text-xl mb-1">{style.icon}</div>
                            <div className="text-xs font-semibold text-white">
                              {style.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mood Selection */}
                  {availableMoods.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Razpoloženje
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableMoods.map((mood) => (
                          <button
                            key={mood.id}
                            onClick={() =>
                              updateVariation(variation.id, { mood: mood.id })
                            }
                            className={`p-3 rounded-lg border-2 transition-all text-center ${mood.color} ${
                              variation.mood === mood.id
                                ? "border-white scale-105"
                                : "border-transparent opacity-50 hover:opacity-100"
                            }`}
                          >
                            <div className="text-xl mb-1">{mood.icon}</div>
                            <div className="text-xs font-semibold text-white">
                              {mood.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => duplicateVariation(variation.id)}
                      variant="secondary"
                      size="sm"
                      className="flex-1 flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Podvoji
                    </Button>
                    <Button
                      onClick={() => deleteVariation(variation.id)}
                      variant="secondary"
                      size="sm"
                      className="flex-1 flex items-center gap-2 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                      Izbriši
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {variations.length > 0 && (
        <div className="mt-4 p-3 bg-crimson/10 border border-crimson/30 rounded-lg text-sm text-text-gray">
          <p>
            💡 Ustvarili boste <strong>{variations.length}</strong> slik, po eno
            za vsako variaciju.
          </p>
        </div>
      )}
    </GlassCard>
  );
}
