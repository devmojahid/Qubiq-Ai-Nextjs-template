"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ImageIcon, Wand2, Save, History, Settings, 
  Loader2, Eye, Code2, Layout,
  RefreshCcw, Download, Share2, Camera,
  Sparkles, Clock, Maximize2, Minimize2,
  Palette, Layers, Sliders, MonitorPlay,
  Smartphone, Tablet, Laptop, Desktop,
  FileCode, Image, Type, Box,
  Grid, GridIcon, LayoutGrid
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ImagePromptInput } from "@/components/dashboard/ai-studio/image/prompt-input"
import { ImageGallery } from "@/components/dashboard/ai-studio/image/gallery"
import { ImageSettings } from "@/components/dashboard/ai-studio/image/settings"
import { ImageHistory } from "@/components/dashboard/ai-studio/image/history"
import { ImageStyleSelector } from "@/components/dashboard/ai-studio/image/style-selector"

export default function ImageGenerationPage() {
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [settings, setSettings] = useState({
    model: "stable-diffusion-xl",
    width: 1024,
    height: 1024,
    steps: 30,
    guidance: 7.5,
    seed: -1,
    samples: 4
  })
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [viewMode, setViewMode] = useState("grid") // grid or single
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
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
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1800px] mx-auto px-4 py-4 sm:px-6 lg:px-8 space-y-4">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Image Generator</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Transform your ideas into stunning visuals with AI
            </p>
          </div>

          {/* Mobile-optimized action buttons */}
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-2",
                "rounded-xl px-3 py-2 sm:px-4 sm:py-2",
                "bg-secondary/80 hover:bg-secondary",
                "text-sm font-medium transition-colors"
              )}
            >
              <History className="h-4 w-4" />
              <span className="sm:inline">History</span>
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-2",
                "rounded-xl px-3 py-2 sm:px-4 sm:py-2",
                "bg-primary text-primary-foreground",
                "text-sm font-medium transition-colors"
              )}
            >
              <Settings className="h-4 w-4" />
              <span className="sm:inline">Settings</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid gap-6 lg:grid-cols-[1fr,340px] xl:grid-cols-[1fr,380px]">
          {/* Left Column - Main Content */}
          <div className="space-y-6 min-w-0">
            {/* Style Selection */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <div className="border-b p-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  Choose Art Style
                </h3>
              </div>
              <div className="p-4 overflow-hidden">
                <ImageStyleSelector 
                  selectedStyle={selectedStyle}
                  onSelectStyle={setSelectedStyle}
                />
              </div>
            </motion.div>

            {/* Image Generation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <div className="border-b p-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-primary" />
                  Generate Image
                </h3>
              </div>

              <div className="p-4 space-y-6">
                <ImagePromptInput
                  prompt={prompt}
                  negativePrompt={negativePrompt}
                  onPromptChange={setPrompt}
                  onNegativePromptChange={setNegativePrompt}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerate}
                  selectedStyle={selectedStyle}
                />

                <AnimatePresence mode="wait">
                  {(isGenerating || generatedImages.length > 0) && (
                    <ImageGallery
                      images={generatedImages}
                      isGenerating={isGenerating}
                      selectedImage={selectedImage}
                      onSelectImage={setSelectedImage}
                      viewMode={viewMode}
                      settings={settings}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Settings & History */}
          <div className="hidden lg:block space-y-6">
            <ImageSettings 
              settings={settings}
              onSettingsChange={setSettings}
              isVisible={true}
              isMobile={false}
            />
            <ImageHistory 
              showHistory={true}
              onToggleHistory={() => {}}
              isMobile={false}
              onSelectImage={(image) => {
                setPrompt(image.prompt)
                setNegativePrompt(image.negativePrompt)
                setSelectedStyle(image.style)
                setSettings(image.settings)
                setSelectedImage(image)
              }}
            />
          </div>
        </div>

        {/* Mobile Modals */}
        {isMobileView && (
          <>
            <AnimatePresence>
              {showSettings && (
                <ImageSettings 
                  settings={settings}
                  onSettingsChange={setSettings}
                  isVisible={showSettings}
                  isMobile={true}
                  onClose={() => setShowSettings(false)}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showHistory && (
                <ImageHistory 
                  showHistory={showHistory}
                  onToggleHistory={setShowHistory}
                  isMobile={true}
                  onClose={() => setShowHistory(false)}
                  onSelectImage={(image) => {
                    setPrompt(image.prompt)
                    setNegativePrompt(image.negativePrompt)
                    setSelectedStyle(image.style)
                    setSettings(image.settings)
                    setSelectedImage(image)
                    setShowHistory(false)
                  }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
} 