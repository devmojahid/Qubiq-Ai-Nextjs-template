"use client"

import { motion } from "framer-motion"
import { 
  Palette, Camera, Brush, Layers,
  Paintbrush, Frame, Wand2, Sparkles,
  Shapes, Mountain, Building, Shirt,
  Glasses, Pencil, Eraser, Spline
} from "lucide-react"
import { cn } from "@/lib/utils"

export const imageStyles = [
  {
    id: "photorealistic",
    name: "Photorealistic",
    description: "Ultra-realistic photographic style",
    icon: Camera,
    examples: [
      "https://source.unsplash.com/random/400x400?photo,realistic",
      "https://source.unsplash.com/random/400x400?photo,camera"
    ]
  },
  {
    id: "digital-art",
    name: "Digital Art",
    description: "Modern digital artwork style",
    icon: Palette,
    examples: [
      "https://source.unsplash.com/random/400x400?digital,art",
      "https://source.unsplash.com/random/400x400?artwork"
    ]
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese anime and manga style",
    icon: Brush,
    examples: [
      "https://source.unsplash.com/random/400x400?anime",
      "https://source.unsplash.com/random/400x400?manga"
    ]
  },
  {
    id: "3d",
    name: "3D Render",
    description: "3D rendered graphics style",
    icon: Layers,
    examples: [
      "https://source.unsplash.com/random/400x400?3d,render",
      "https://source.unsplash.com/random/400x400?3d,model"
    ]
  },
  {
    id: "painting",
    name: "Painting",
    description: "Traditional painting styles",
    icon: Paintbrush,
    examples: [
      "https://source.unsplash.com/random/400x400?painting",
      "https://source.unsplash.com/random/400x400?art"
    ]
  },
  {
    id: "pixel",
    name: "Pixel Art",
    description: "Retro pixel art style",
    icon: Frame,
    examples: [
      "https://source.unsplash.com/random/400x400?pixel,art",
      "https://source.unsplash.com/random/400x400?retro,game"
    ]
  },
  {
    id: "concept",
    name: "Concept Art",
    description: "Professional concept artwork",
    icon: Wand2,
    examples: [
      "https://source.unsplash.com/random/400x400?concept,art",
      "https://source.unsplash.com/random/400x400?fantasy"
    ]
  },
  {
    id: "abstract",
    name: "Abstract",
    description: "Modern abstract art style",
    icon: Shapes,
    examples: [
      "https://source.unsplash.com/random/400x400?abstract",
      "https://source.unsplash.com/random/400x400?modern,art"
    ]
  }
]

export function ImageStyleSelector({ selectedStyle, onSelectStyle }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Choose Style</h2>
        <button
          onClick={() => onSelectStyle(null)}
          className="text-sm text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {imageStyles.map((style) => (
          <motion.button
            key={style.id}
            onClick={() => onSelectStyle(style)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative rounded-xl p-4 text-left transition-all",
              "border border-border/50",
              "hover:border-primary/50 hover:shadow-md",
              "group focus:outline-none focus:ring-2 focus:ring-primary/20",
              selectedStyle?.id === style.id && "border-primary bg-primary/5"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "rounded-lg p-2.5 transition-all duration-200",
                "bg-gradient-to-br from-primary/10 to-primary/5",
                "group-hover:from-primary/20 group-hover:to-primary/10"
              )}>
                <style.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{style.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {style.description}
                </p>
              </div>
            </div>

            {/* Style Examples Preview */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {style.examples.map((example, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={example}
                    alt={`${style.name} example ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
} 