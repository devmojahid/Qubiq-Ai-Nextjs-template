"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Wand2, Sparkles, XCircle, 
  AlertCircle, Loader2, MessageSquare,
  Lightbulb, ArrowRight, Plus,
  ChevronDown, ChevronUp
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ImagePromptInput({
  prompt,
  negativePrompt,
  onPromptChange,
  onNegativePromptChange,
  isGenerating,
  onGenerate,
  selectedStyle
}) {
  const [showNegativePrompt, setShowNegativePrompt] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Example prompt suggestions based on selected style
  const getPromptSuggestions = () => {
    if (!selectedStyle) return []
    
    const suggestions = {
      "photorealistic": [
        "A stunning portrait of [subject] with dramatic lighting",
        "Hyperrealistic close-up of [subject] with intricate details",
        "Professional photography of [subject] in [setting]"
      ],
      "digital-art": [
        "Vibrant digital illustration of [subject] with neon accents",
        "Modern digital artwork featuring [subject] in a futuristic style",
        "Stylized digital painting of [subject] with dynamic composition"
      ],
      "anime": [
        "Anime-style character design of [subject] with expressive features",
        "Japanese manga-inspired scene featuring [subject]",
        "Cute chibi version of [subject] in [setting]"
      ],
      "3d": [
        "3D rendered scene of [subject] with realistic textures",
        "Isometric 3D illustration of [subject] with detailed materials",
        "Cinema 4D style rendering of [subject] with ambient lighting"
      ]
    }

    return suggestions[selectedStyle.id] || []
  }

  // Common negative prompts
  const negativePromptSuggestions = [
    "blurry, low quality, distorted",
    "watermark, signature, text",
    "deformed, ugly, bad anatomy",
    "grainy, noisy, pixelated",
    "duplicate, multiple, extra limbs"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Main Prompt Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Prompt</label>
          {selectedStyle && (
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="text-sm text-primary hover:underline"
            >
              View Suggestions
            </button>
          )}
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className={cn(
              "w-full min-h-[100px] p-4 rounded-xl",
              "bg-background border border-border/50",
              "focus:border-primary focus:ring-1 focus:ring-primary",
              "placeholder:text-muted-foreground",
              "resize-none"
            )}
          />
          
          {/* Character Count */}
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {prompt.length} / 1000
          </div>
        </div>

        {/* Prompt Suggestions */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-xl border bg-card/50 p-4"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Lightbulb className="h-4 w-4 text-primary" />
                Suggested prompts for {selectedStyle.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {getPromptSuggestions().map((suggestion, index) => (
                  <motion.button
                    key={index}
                    onClick={() => onPromptChange(suggestion)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-sm",
                      "bg-secondary/50 hover:bg-secondary",
                      "transition-colors"
                    )}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Negative Prompt Section */}
      <div className="space-y-3">
        <button
          onClick={() => setShowNegativePrompt(!showNegativePrompt)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          {showNegativePrompt ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          Negative Prompt
        </button>

        <AnimatePresence>
          {showNegativePrompt && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="relative">
                <textarea
                  value={negativePrompt}
                  onChange={(e) => onNegativePromptChange(e.target.value)}
                  placeholder="Describe what you don't want in the image..."
                  className={cn(
                    "w-full min-h-[80px] p-4 rounded-xl",
                    "bg-background border border-border/50",
                    "focus:border-primary focus:ring-1 focus:ring-primary",
                    "placeholder:text-muted-foreground",
                    "resize-none"
                  )}
                />
                
                {/* Character Count */}
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  {negativePrompt.length} / 500
                </div>
              </div>

              {/* Negative Prompt Suggestions */}
              <div className="flex flex-wrap gap-2">
                {negativePromptSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      const newPrompt = negativePrompt
                        ? `${negativePrompt}, ${suggestion}`
                        : suggestion
                      onNegativePromptChange(newPrompt)
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-sm",
                      "bg-red-500/10 hover:bg-red-500/20",
                      "text-red-500",
                      "transition-colors"
                    )}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Generate Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={onGenerate}
          disabled={!prompt.trim() || isGenerating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl",
            "bg-primary px-6 py-2.5 text-sm font-medium",
            "text-primary-foreground shadow-sm",
            "hover:opacity-90 hover:shadow-md",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all duration-200"
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              Generate
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
} 