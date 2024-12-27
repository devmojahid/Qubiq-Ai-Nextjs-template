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
  FileCode, Image, Type, Box, X
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
  const [selectedStyle, setSelectedStyle] = useState("all")
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
  const [viewMode, setViewMode] = useState("grid")
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobileView(width < 1024)
      
      if (width >= 1024) {
        setShowSettings(false)
        setShowHistory(false)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    try {
      // Simulate API call
      setTimeout(() => {
        const newImages = Array(settings.samples).fill(0).map((_, i) => ({
          id: Date.now() + i,
          // url: `https://source.unsplash.com/random/1024x1024?ai,${i}`,
          url: `/images/dashboard/generated-images/generated-image-${i}.jpg`,
          prompt,
          negativePrompt,
          settings,
          style: selectedStyle,
          timestamp: new Date().toISOString()
        }))
        setGeneratedImages([...newImages, ...generatedImages])
        setIsGenerating(false)
      }, 3000)
    } catch (error) {
      console.error('Generation error:', error)
      setIsGenerating(false)
    }
  }

  // Enhanced toggle handlers with better mobile handling
  const toggleHistory = () => {
    if (isMobileView) {
      setShowSettings(false) // Close settings first on mobile
      setShowHistory(!showHistory)
    } else {
      setShowHistory(!showHistory)
    }
  }

  const toggleSettings = () => {
    if (isMobileView) {
      setShowHistory(false) // Close history first on mobile
      setShowSettings(!showSettings)
    } else {
      setShowSettings(!showSettings)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="container max-w-[1800px] mx-auto p-2 sm:p-3 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sticky top-0 z-50 bg-background/95 backdrop-blur-sm pb-2 sm:pb-0"
        >
          <div className="flex-1 min-w-0 px-2">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight truncate">
              AI Image Generator
            </h1>
            <p className="text-[13px] sm:text-sm text-muted-foreground">
              Transform your ideas into stunning visuals with AI
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-2 sm:mt-0 px-2">
            <button
              onClick={toggleHistory}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                "rounded-xl px-3 py-2 sm:px-4 sm:py-2.5",
                "bg-secondary/80 hover:bg-secondary",
                "text-xs sm:text-sm font-medium transition-all duration-200",
                "active:scale-95 transform hover:shadow-md",
                showHistory && "bg-secondary ring-2 ring-primary/20"
              )}
            >
              <History className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>History</span>
            </button>
            <button
              onClick={toggleSettings}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                "rounded-xl px-3 py-2 sm:px-4 sm:py-2.5",
                "bg-primary text-primary-foreground",
                "text-xs sm:text-sm font-medium transition-all duration-200",
                "hover:bg-primary/90 active:scale-95 transform hover:shadow-md",
                showSettings && "ring-2 ring-primary/20"
              )}
            >
              <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Settings</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr,300px] xl:grid-cols-[1fr,320px] relative">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6 min-w-0">
            {/* Style Selector with better mobile handling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <div className="border-b p-3 sm:p-4">
                <h3 className="font-medium sm:font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <Palette className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  Image Styles
                </h3>
              </div>
              <div className="p-3 sm:p-4 overflow-hidden">
                <ImageStyleSelector 
                  selectedStyle={selectedStyle}
                  onSelectStyle={setSelectedStyle}
                />
              </div>
            </motion.div>

            {/* Image Generation with better spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <div className="border-b p-3 sm:p-4">
                <h3 className="font-medium sm:font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <Wand2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  Generate Image
                </h3>
              </div>
              <div className="p-3 sm:p-4 space-y-4">
                <ImagePromptInput
                  prompt={prompt}
                  negativePrompt={negativePrompt}
                  onPromptChange={setPrompt}
                  onNegativePromptChange={setNegativePrompt}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerate}
                  selectedStyle={selectedStyle}
                />
                <ImageGallery
                  images={generatedImages}
                  isGenerating={isGenerating}
                  selectedImage={selectedImage}
                  onSelectImage={setSelectedImage}
                  viewMode={viewMode}
                  settings={settings}
                />
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className={cn(
            "space-y-4 sm:space-y-6 lg:sticky lg:top-24",
            "lg:max-h-[calc(100vh-8rem)] lg:overflow-hidden",
            "lg:block transition-all duration-200",
            isMobileView ? "hidden" : "block"
          )}>
            <div className="h-full flex flex-col gap-4 sm:gap-6">
              <div className="flex-none">
                <ImageSettings 
                  settings={settings}
                  onSettingsChange={setSettings}
                  isVisible={!isMobileView || showSettings}
                />
              </div>
              <div className="flex-1 min-h-0">
                <ImageHistory 
                  showHistory={!isMobileView || showHistory}
                  onToggleHistory={toggleHistory}
                  onSelectImage={(image) => {
                    setPrompt(image.prompt)
                    setNegativePrompt(image.negativePrompt)
                    setSelectedStyle(image.style)
                    setSettings(image.settings)
                    setSelectedImage(image)
                    if (isMobileView) setShowHistory(false)
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Modals */}
        {isMobileView && (
          <>
            <AnimatePresence mode="wait">
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[100]"
                >
                  <motion.div
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowSettings(false)}
                  />
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ 
                      type: "tween", 
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                    className={cn(
                      "absolute inset-x-0 bottom-0",
                      "bg-background rounded-t-2xl",
                      "border-t border-border/50",
                      "overflow-hidden shadow-xl"
                    )}
                    style={{ maxHeight: "85vh" }}
                  >
                    <div className="sticky top-0 z-10 bg-background border-b">
                      <div className="flex justify-center py-2">
                        <div className="w-12 h-1 rounded-full bg-border/60" />
                      </div>
                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Settings</h3>
                        <button
                          onClick={() => setShowSettings(false)}
                          className="p-1.5 rounded-lg hover:bg-secondary/80"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="overflow-y-auto overscroll-contain">
                      <div className="p-4">
                        <ImageSettings 
                          settings={settings}
                          onSettingsChange={setSettings}
                          isVisible={true}
                          isMobile={true}
                          onClose={() => setShowSettings(false)}
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[100]"
                >
                  <motion.div
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowHistory(false)}
                  />
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ 
                      type: "tween", 
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                    className={cn(
                      "absolute inset-x-0 bottom-0",
                      "bg-background rounded-t-2xl",
                      "border-t border-border/50",
                      "overflow-hidden shadow-xl"
                    )}
                    style={{ maxHeight: "85vh" }}
                  >
                    <div className="sticky top-0 z-10 bg-background border-b">
                      <div className="flex justify-center py-2">
                        <div className="w-12 h-1 rounded-full bg-border/60" />
                      </div>
                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Recent Generations</h3>
                        <button
                          onClick={() => setShowHistory(false)}
                          className="p-1.5 rounded-lg hover:bg-secondary/80"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="overflow-y-auto overscroll-contain">
                      <div className="p-4">
                        <ImageHistory 
                          showHistory={true}
                          onToggleHistory={toggleHistory}
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
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
} 