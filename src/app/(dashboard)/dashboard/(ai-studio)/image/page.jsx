"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Image as ImageIcon, Wand2, Download, Share2, 
  Save, History, Settings, Loader2, Plus,
  Grid, Layout, LayoutGrid, Palette, Sparkles,
  Sliders, Camera, Maximize2, SlidersHorizontal,
  Layers, Paintbrush, Frame
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ImagePromptInput } from "@/components/dashboard/ai-studio/image/prompt-input"
import { ImageStyleSelector } from "@/components/dashboard/ai-studio/image/style-selector"
import { ImageSettings } from "@/components/dashboard/ai-studio/image/settings"
import { ImageGallery } from "@/components/dashboard/ai-studio/image/gallery"
import { ImageHistory } from "@/components/dashboard/ai-studio/image/history"

export default function ImageGenerationPage() {
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [settings, setSettings] = useState({
    model: "stable-diffusion-xl",
    width: 1024,
    height: 1024,
    steps: 30,
    seed: -1,
    samples: 4,
    guidance: 7.5
  })
  const [generatedImages, setGeneratedImages] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or single
  const [selectedImage, setSelectedImage] = useState(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      // Sample generated images
      const newImages = Array(settings.samples).fill(0).map((_, i) => ({
        id: Date.now() + i,
        url: `https://source.unsplash.com/random/1024x1024?ai,${i}`,
        prompt,
        negativePrompt,
        settings,
        style: selectedStyle,
        timestamp: new Date().toISOString()
      }))
      setGeneratedImages([...newImages, ...generatedImages])
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="container max-w-7xl space-y-8 p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Image Generation</h1>
          <p className="text-muted-foreground">
            Create stunning AI-generated images with precise control
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-xl border bg-card p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-lg p-2 transition-colors",
                viewMode === "grid" 
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary/80"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("single")}
              className={cn(
                "rounded-lg p-2 transition-colors",
                viewMode === "single"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary/80"
              )}
            >
              <Layout className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl",
              "bg-secondary/80 px-4 py-2 text-sm font-medium",
              "hover:bg-secondary transition-colors"
            )}
          >
            <History className="h-4 w-4" />
            History
          </button>
          <button
            onClick={() => {}}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl",
              "bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        <div className="space-y-6">
          {/* Style Selection */}
          <ImageStyleSelector 
            selectedStyle={selectedStyle}
            onSelectStyle={setSelectedStyle}
          />

          {/* Prompt Input */}
          <ImagePromptInput
            prompt={prompt}
            negativePrompt={negativePrompt}
            onPromptChange={setPrompt}
            onNegativePromptChange={setNegativePrompt}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
            selectedStyle={selectedStyle}
          />

          {/* Generated Images */}
          <AnimatePresence mode="wait">
            {generatedImages.length > 0 && (
              <ImageGallery
                images={generatedImages}
                viewMode={viewMode}
                selectedImage={selectedImage}
                onSelectImage={setSelectedImage}
                isGenerating={isGenerating}
                settings={settings}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right Column - Settings & History */}
        <div className="space-y-6">
          {/* Generation Settings */}
          <ImageSettings 
            settings={settings}
            onSettingsChange={setSettings}
          />

          {/* Recent History */}
          <ImageHistory 
            showHistory={showHistory}
            onToggleHistory={setShowHistory}
            onSelectImage={(image) => {
              setPrompt(image.prompt)
              setNegativePrompt(image.negativePrompt)
              setSelectedStyle(image.style)
              setSettings(image.settings)
            }}
          />
        </div>
      </div>
    </div>
  )
} 