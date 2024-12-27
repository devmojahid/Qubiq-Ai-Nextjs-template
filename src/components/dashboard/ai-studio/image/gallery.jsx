"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Download, Share2, Copy, Maximize2, 
  Minimize2, Loader2, ImageIcon, 
  ZoomIn, ZoomOut, RotateCcw
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ImageGallery({ 
  images, 
  viewMode, 
  selectedImage, 
  onSelectImage,
  isGenerating,
  settings 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-primary" />
          Generated Images
          {isGenerating && (
            <span className="text-sm text-muted-foreground">
              (Generating {settings.samples} images...)
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {}}
            className={cn(
              "rounded-lg p-2 hover:bg-secondary/80",
              "text-muted-foreground hover:text-foreground",
              "transition-colors"
            )}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => {}}
            className={cn(
              "rounded-lg p-2 hover:bg-secondary/80",
              "text-muted-foreground hover:text-foreground",
              "transition-colors"
            )}
          >
            {viewMode === "grid" ? (
              <ZoomIn className="h-4 w-4" />
            ) : (
              <ZoomOut className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {Array(settings.samples).fill(0).map((_, i) => (
            <div
              key={i}
              className={cn(
                "aspect-square rounded-xl overflow-hidden",
                "bg-secondary/50 animate-pulse"
              )}
            >
              <div className="h-full w-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && !isGenerating && (
        <div className={cn(
          "grid gap-4",
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        )}>
          {images.map((image) => (
            <motion.div
              key={image.id}
              layoutId={`image-${image.id}`}
              className="group relative aspect-square"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative h-full w-full rounded-xl overflow-hidden",
                  "cursor-pointer border border-border/50",
                  "hover:border-primary/50 hover:shadow-md",
                  "transition-all duration-200"
                )}
                onClick={() => onSelectImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="h-full w-full object-cover"
                />

                {/* Quick Actions Overlay */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                  "flex flex-col justify-end p-4"
                )}>
                  <div className="flex items-center justify-between text-white">
                    <p className="text-sm font-medium truncate max-w-[80%]">
                      {image.prompt}
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Single View */}
      {viewMode === "single" && !isGenerating && selectedImage && (
        <motion.div
          layoutId={`image-${selectedImage.id}`}
          className="space-y-4"
        >
          <div className="relative aspect-square rounded-xl overflow-hidden border border-border/50">
            <img
              src={selectedImage.url}
              alt={selectedImage.prompt}
              className="h-full w-full object-cover"
            />
            
            {/* Image Actions */}
            <div className={cn(
              "absolute inset-x-0 bottom-0 p-4",
              "bg-gradient-to-t from-black/50 to-transparent"
            )}>
              <div className="flex items-center justify-between text-white">
                <div className="text-sm">
                  <p className="font-medium truncate">{selectedImage.prompt}</p>
                  <p className="text-xs opacity-80">
                    Generated with {selectedImage.settings.model}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-lg p-2 bg-white/20 hover:bg-white/30"
                  >
                    <Download className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-lg p-2 bg-white/20 hover:bg-white/30"
                  >
                    <Share2 className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-lg p-2 bg-white/20 hover:bg-white/30"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Details */}
          <div className="rounded-xl bg-card p-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Prompt</label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedImage.prompt}
                </p>
              </div>
              {selectedImage.negativePrompt && (
                <div>
                  <label className="text-sm font-medium">Negative Prompt</label>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedImage.negativePrompt}
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-sm font-medium">Model</label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedImage.settings.model}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Size</label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedImage.settings.width} × {selectedImage.settings.height}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Steps</label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedImage.settings.steps}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
} 