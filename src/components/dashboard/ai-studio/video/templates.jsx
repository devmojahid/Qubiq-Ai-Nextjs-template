"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Film, Play, Star, Clock, 
  MonitorPlay, Sparkles, Video,
  Clapperboard, Megaphone, ShoppingBag,
  Presentation, Award, Rocket, Zap,
  BookOpen, Briefcase, Palette, Heart
} from "lucide-react"
import { cn } from "@/lib/utils"

const templates = [
  {
    id: "product-showcase",
    category: "Marketing",
    title: "Product Showcase",
    description: "Highlight your product features with elegant transitions",
    duration: "30s",
    icon: ShoppingBag,
    preview: "https://source.unsplash.com/random/800x450?product",
    prompt: "Create a professional product showcase video with smooth transitions, highlighting key features and benefits",
    settings: {
      style: "commercial",
      duration: 30,
      resolution: "1080p"
    }
  },
  {
    id: "social-ad",
    category: "Advertising",
    title: "Social Media Ad",
    description: "Eye-catching ads optimized for social platforms",
    duration: "15s",
    icon: Megaphone,
    preview: "https://source.unsplash.com/random/800x450?social",
    prompt: "Generate a dynamic social media advertisement that captures attention in the first 3 seconds",
    settings: {
      style: "social",
      duration: 15,
      resolution: "square"
    }
  },
  {
    id: "brand-story",
    category: "Branding",
    title: "Brand Story",
    description: "Tell your brand's story in a compelling way",
    duration: "60s",
    icon: Presentation,
    preview: "https://source.unsplash.com/random/800x450?brand",
    prompt: "Create an emotional brand story video that connects with viewers and showcases company values",
    settings: {
      style: "cinematic",
      duration: 60,
      resolution: "1080p"
    }
  },
  {
    id: "tutorial",
    category: "Educational",
    title: "Tutorial Video",
    description: "Clear and engaging instructional content",
    duration: "45s",
    icon: BookOpen,
    preview: "https://source.unsplash.com/random/800x450?tutorial",
    prompt: "Create a step-by-step tutorial video with clear explanations and visual demonstrations",
    settings: {
      style: "social",
      duration: 45,
      resolution: "1080p"
    }
  }
]

const categories = [
  { id: "all", label: "All Templates", icon: Sparkles },
  { id: "marketing", label: "Marketing", icon: Rocket },
  { id: "advertising", label: "Advertising", icon: Megaphone },
  { id: "branding", label: "Branding", icon: Award },
  { id: "educational", label: "Educational", icon: BookOpen }
]

export function VideoTemplates({ selectedTemplate, onSelectTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredTemplate, setHoveredTemplate] = useState(null)

  const filteredTemplates = templates.filter(template => 
    selectedCategory === "all" || 
    template.category.toLowerCase() === selectedCategory
  )

  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Clapperboard className="h-4 w-4 text-primary" />
          Video Templates
        </h3>
        <p className="text-sm text-muted-foreground">
          Start with a pre-designed template
        </p>
      </div>

      {/* Category Selection */}
      <div className="border-b overflow-x-auto">
        <div className="flex p-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                "transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
              )}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelectTemplate(template)}
            className={cn(
              "group relative rounded-lg overflow-hidden cursor-pointer",
              "border transition-all duration-200",
              selectedTemplate?.id === template.id
                ? "border-primary ring-2 ring-primary/20"
                : "hover:border-primary/50"
            )}
          >
            {/* Preview Image */}
            <div className="relative aspect-video">
              <img
                src={template.preview}
                alt={template.title}
                className="w-full h-full object-cover"
              />
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
                "opacity-0 group-hover:opacity-100 transition-opacity"
              )}>
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "rounded-full bg-white/20 p-3 backdrop-blur-sm",
                      "text-white shadow-lg"
                    )}
                  >
                    <Play className="h-6 w-6" />
                  </motion.button>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2">
                  <div className={cn(
                    "flex items-center gap-1 rounded-full",
                    "bg-black/60 px-2 py-1 text-xs text-white",
                    "backdrop-blur-sm"
                  )}>
                    <Clock className="h-3 w-3" />
                    <span>{template.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-3 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <template.icon className="h-4 w-4 text-primary" />
                    {template.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </div>

              {/* Show more details on hover */}
              <AnimatePresence>
                {hoveredTemplate === template.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 space-y-2"
                  >
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        <span>{template.settings.resolution}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Palette className="h-3 w-3" />
                        <span>{template.settings.style}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectTemplate(template)
                      }}
                      className={cn(
                        "w-full rounded-lg bg-primary px-3 py-1.5",
                        "text-sm font-medium text-primary-foreground",
                        "hover:opacity-90 transition-opacity"
                      )}
                    >
                      Use Template
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 