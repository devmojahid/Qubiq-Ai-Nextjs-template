"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Palette, Camera, Brush, Layers,
  Paintbrush, Frame, Wand2, Sparkles,
  Shapes, Mountain, Building, Shirt,
  Glasses, Pencil, Eraser, Spline,
  Info, Star, Clock, Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export const imageStyles = [
  {
    id: "photorealistic",
    name: "Photorealistic",
    description: "Ultra-realistic photographic style",
    icon: Camera,
    examples: [
      "https://source.unsplash.com/random/400x400?photo,realistic",
      "https://source.unsplash.com/random/400x400?photo,camera"
    ],
    features: ["High Detail", "Natural Lighting", "Real-world Accuracy"],
    credits: 2
  },
  {
    id: "digital-art",
    name: "Digital Art",
    description: "Modern digital artwork style",
    icon: Palette,
    examples: [
      "https://source.unsplash.com/random/400x400?digital,art",
      "https://source.unsplash.com/random/400x400?artwork"
    ],
    features: ["Vibrant Colors", "Creative Freedom", "Modern Look"],
    credits: 1
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese anime and manga style",
    icon: Brush,
    examples: [
      "https://source.unsplash.com/random/400x400?anime",
      "https://source.unsplash.com/random/400x400?manga"
    ],
    features: ["Japanese Style", "Manga-inspired", "Cartoonish"],
    credits: 1
  },
  {
    id: "3d",
    name: "3D Render",
    description: "3D rendered graphics style",
    icon: Layers,
    examples: [
      "https://source.unsplash.com/random/400x400?3d,render",
      "https://source.unsplash.com/random/400x400?3d,model"
    ],
    features: ["3D Modeling", "Realistic Rendering", "High Detail"],
    credits: 2
  },
  {
    id: "painting",
    name: "Painting",
    description: "Traditional painting styles",
    icon: Paintbrush,
    examples: [
      "https://source.unsplash.com/random/400x400?painting",
      "https://source.unsplash.com/random/400x400?art"
    ],
    features: ["Traditional Medium", "Artistic Techniques", "Natural Brushwork"],
    credits: 1
  },
  {
    id: "pixel",
    name: "Pixel Art",
    description: "Retro pixel art style",
    icon: Frame,
    examples: [
      "https://source.unsplash.com/random/400x400?pixel,art",
      "https://source.unsplash.com/random/400x400?retro,game"
    ],
    features: ["Retro Style", "Pixelated Graphics", "Classic Game Art"],
    credits: 1
  },
  {
    id: "concept",
    name: "Concept Art",
    description: "Professional concept artwork",
    icon: Wand2,
    examples: [
      "https://source.unsplash.com/random/400x400?concept,art",
      "https://source.unsplash.com/random/400x400?fantasy"
    ],
    features: ["Professional Quality", "Concept Development", "Artistic Freedom"],
    credits: 2
  },
  {
    id: "abstract",
    name: "Abstract",
    description: "Modern abstract art style",
    icon: Shapes,
    examples: [
      "https://source.unsplash.com/random/400x400?abstract",
      "https://source.unsplash.com/random/400x400?modern,art"
    ],
    features: ["Modern Art", "Abstract Composition", "Artistic Freedom"],
    credits: 1
  }
]

export function ImageStyleSelector({ selectedStyle, onSelectStyle }) {
  const [hoveredStyle, setHoveredStyle] = useState(null)

  return (
    <div className="space-y-6">
      {/* Style Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {["All", "Realistic", "Artistic", "Abstract", "3D"].map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap",
              "bg-secondary/50 hover:bg-secondary/80",
              "transition-all duration-200"
            )}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imageStyles.map((style) => (
          <motion.div
            key={style.id}
            onHoverStart={() => setHoveredStyle(style.id)}
            onHoverEnd={() => setHoveredStyle(null)}
            className="relative group"
          >
            <motion.button
              onClick={() => onSelectStyle(style)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full rounded-xl p-4 text-left",
                "border border-border/50 transition-all duration-200",
                "hover:shadow-lg hover:shadow-primary/5",
                selectedStyle?.id === style.id 
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : "hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              {/* Style Header */}
              <div className="flex items-start gap-3">
                <div className={cn(
                  "rounded-lg p-2.5",
                  "bg-gradient-to-br from-primary/10 to-primary/5",
                  "ring-1 ring-primary/10"
                )}>
                  <style.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{style.name}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs",
                      "bg-primary/10 text-primary"
                    )}>
                      {style.credits} credits
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {style.description}
                  </p>
                </div>
              </div>

              {/* Style Examples */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {style.examples.map((example, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={example}
                      alt={`${style.name} example ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Style Features */}
              <div className="mt-3 flex flex-wrap gap-2">
                {style.features.map((feature, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-flex items-center rounded-full",
                      "px-2 py-0.5 text-xs",
                      "bg-secondary text-secondary-foreground",
                      "ring-1 ring-border/50"
                    )}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.button>

            {/* Enhanced Tooltip */}
            <AnimatePresence>
              {hoveredStyle === style.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={cn(
                    "absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50",
                    "w-72 p-4 rounded-lg",
                    "bg-popover border shadow-xl",
                    "backdrop-blur-sm"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-2">
                      <p className="font-medium">{style.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {style.description}
                      </p>
                      <div className="pt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          ~30s generation
                        </span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5" />
                          {style.credits} credits/image
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 