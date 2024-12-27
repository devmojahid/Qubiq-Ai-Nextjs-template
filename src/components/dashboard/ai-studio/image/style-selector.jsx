"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Palette, Camera, Brush, Boxes, Shapes } from "lucide-react"
import { cn } from "@/lib/utils"

const styles = [
  { 
    id: "all", 
    label: "All", 
    description: "All styles",
    icon: Palette,
    examples: [
      "/images/dashboard/generated-images/random/1.jpg",
      "/images/dashboard/generated-images/random/2.jpg"
    ]
  },
  { 
    id: "realistic", 
    label: "Realistic", 
    description: "Photo-realistic images",
    icon: Camera,
    examples: [
      "/images/dashboard/generated-images/random/3.jpg",
      "/images/dashboard/generated-images/random/4.jpg"
    ]
  },
  { 
    id: "artistic", 
    label: "Artistic", 
    description: "Creative artistic styles",
    icon: Brush,
    examples: [
      "/images/dashboard/generated-images/random/5.jpg",
      "/images/dashboard/generated-images/random/6.jpg"
    ]
  },
  { 
    id: "abstract", 
    label: "Abstract", 
    description: "Abstract art styles",
    icon: Shapes,
    examples: [
      "/images/dashboard/generated-images/random/7.jpg",
      "/images/dashboard/generated-images/random/8.jpg"
    ]
  },
  { 
    id: "3d", 
    label: "3D", 
    description: "3D rendered images",
    icon: Boxes,
    examples: [
      "/images/dashboard/generated-images/random/9.jpg",
      "/images/dashboard/generated-images/random/10.jpg"
    ]
  }
]

export function ImageStyleSelector({ selectedStyle, onSelectStyle }) {
  return (
    <div className="space-y-6">
      {/* Style Tabs - Horizontally Scrollable on Mobile */}
      <div className="w-full overflow-x-auto scrollbar-none">
        <div className="flex gap-2 min-w-max px-0.5 pb-2">
          {styles.map((style) => (
            <motion.button
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-lg",
                "transition-all duration-200",
                "hover:bg-secondary/80",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                selectedStyle === style.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary/50 text-foreground"
              )}
            >
              <span className="flex items-center gap-2">
                <style.icon className="h-4 w-4" />
                {style.label}
              </span>
              {selectedStyle === style.id && (
                <motion.div
                  layoutId="activeStyleTab"
                  className="absolute inset-0 bg-primary rounded-lg -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Style Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {styles
            .filter(style => selectedStyle === "all" || style.id === selectedStyle)
            .map((style) => (
              <motion.div
                key={style.id}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "group relative rounded-xl overflow-hidden",
                  "border border-border/50",
                  "transition-all duration-200",
                  "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                )}
              >
                {/* Style Header */}
                <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/60 to-transparent z-10">
                  <div className="flex items-center gap-2 text-white">
                    <style.icon className="h-4 w-4" />
                    <span className="font-medium">{style.label}</span>
                  </div>
                  <p className="text-xs text-white/80 mt-1">
                    {style.description}
                  </p>
                </div>

                {/* Style Examples Grid */}
                <div className="grid grid-cols-2 aspect-[2/1]">
                  {style.examples.map((example, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={example}
                        alt={`${style.label} example ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Hover Overlay */}
                <div className={cn(
                  "absolute inset-0 bg-black/60",
                  "opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-200",
                  "flex items-center justify-center"
                )}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectStyle(style.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg",
                      "bg-white text-black",
                      "text-sm font-medium"
                    )}
                  >
                    Select Style
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 