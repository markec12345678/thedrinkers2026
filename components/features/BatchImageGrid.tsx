"use client";

import { motion } from "framer-motion";
import { Download, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AIImageGenerationResponse } from "@/lib/types/ai";

interface BatchImageGridProps {
  images: AIImageGenerationResponse[];
  isLoading?: boolean;
  isGenerating?: boolean;
  onDelete?: (imageId: string) => void;
  onDownload?: (imageUrl: string, imageId: string) => void;
  quantity?: number;
}

export function BatchImageGrid({
  images,
  isLoading = false,
  isGenerating = false,
  onDelete,
  onDownload,
  quantity = 4,
}: BatchImageGridProps) {
  const displayImages = images.length > 0 ? images : Array(quantity).fill(null);

  const handleDownload = (image: AIImageGenerationResponse) => {
    if (image.imageUrl && onDownload) {
      onDownload(image.imageUrl, image.imageId || "");
    }
  };

  const handleDownloadAll = () => {
    images.forEach((image) => {
      if (image.success && image.imageUrl && onDownload) {
        onDownload(image.imageUrl, image.imageId || "");
      }
    });
  };

  const successCount = images.filter((img) => img.success).length;
  const hasImages = images.length > 0;

  return (
    <div className="space-y-4">
      {/* Stats Header */}
      {hasImages && (
        <div className="flex justify-between items-center p-4 bg-rock-black/50 rounded-lg border border-white/10">
          <div className="text-sm text-text-gray">
            Uspešno generirano:{" "}
            <span className="text-crimson font-bold">
              {successCount}/{images.length}
            </span>
          </div>
          {successCount > 0 && (
            <Button
              onClick={handleDownloadAll}
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Prenesi Vse ({successCount})
            </Button>
          )}
        </div>
      )}

      {/* Image Grid */}
      <div
        className={`grid gap-4 ${displayImages.length <= 2 ? "grid-cols-2" : displayImages.length <= 4 ? "grid-cols-2 md:grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}
      >
        {displayImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            {/* Loading State */}
            {!image && (isLoading || isGenerating) ? (
              <div className="aspect-square rounded-lg bg-rock-black/50 border-2 border-dashed border-white/10 flex items-center justify-center animate-pulse">
                <div className="text-center">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-text-gray" />
                  <p className="text-xs text-text-gray">Generiranje...</p>
                </div>
              </div>
            ) : image?.success ? (
              /* Success State */
              <div className="relative aspect-square rounded-lg overflow-hidden bg-rock-black border border-white/10 group-hover:border-crimson transition-all">
                <img
                  src={image.imageUrl}
                  alt={image.prompt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                  <Button
                    onClick={() => handleDownload(image)}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  {onDelete && (
                    <Button
                      onClick={() => onDelete(image.imageId || "")}
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Metadata Badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs text-text-gray opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-semibold truncate">
                    {image.model}
                  </p>
                  <p className="truncate">
                    {image.generatedAt
                      ? new Date(image.generatedAt).toLocaleTimeString()
                      : ""}
                  </p>
                </div>
              </div>
            ) : image ? (
              /* Error State */
              <div className="aspect-square rounded-lg bg-rock-black/50 border-2 border-red-500/50 flex items-center justify-center">
                <div className="text-center p-4">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <p className="text-xs text-red-500 font-semibold">
                    Napaka pri generiranju
                  </p>
                  {image.error && (
                    <p className="text-xs text-text-gray mt-1 line-clamp-2">
                      {image.error}
                    </p>
                  )}
                </div>
              </div>
            ) : null}
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {!hasImages && !isLoading && !isGenerating && (
        <div className="aspect-video rounded-lg bg-rock-black/50 border-2 border-dashed border-white/10 flex items-center justify-center">
          <div className="text-center text-text-gray">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold">
              Tvoji artworki se bodo pojavili tukaj
            </p>
            <p className="text-sm mt-2">
              Klikni &quot;Ustvari Artwork&quot; za generiranje
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
