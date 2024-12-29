"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Video, Wand2, Save, History, Settings, 
  Loader2, Play, Pause, Volume2, VolumeX,
  RefreshCcw, Download, Share2, Film,
  Sparkles, Clock, Maximize2, Minimize2,
  Music, Mic, Image as ImageIcon, Type,
  Upload, Plus, X, RotateCcw, Camera,
  Layers, Palette, Sliders, MonitorPlay,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { VideoInput } from "@/components/dashboard/ai-studio/video/video-input"
import { VideoPreview } from "@/components/dashboard/ai-studio/video/video-preview"
import { VideoSettings } from "@/components/dashboard/ai-studio/video/settings"
import { VideoHistory } from "@/components/dashboard/ai-studio/video/history"
import { VideoTemplates } from "@/components/dashboard/ai-studio/video/templates"

export default function VideoGenerationPage() {
  const [isMobileView, setIsMobileView] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideos, setGeneratedVideos] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [settings, setSettings] = useState({
    model: "stable-diffusion-xl-video",
    duration: 15,
    fps: 30,
    resolution: "1080p",
    style: "cinematic",
    music: "none",
    voiceover: false,
    transitions: "smooth"
  })
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [assets, setAssets] = useState({
    images: [],
    audio: null,
    voiceover: null
  })

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
      setTimeout(() => {
        const newVideo = {
          id: Date.now(),
          url: "/files/videos/ai.mp4",
          prompt,
          settings,
          thumbnail: "/images/videos/ai.jpg",
          duration: settings.duration,
          timestamp: new Date().toISOString()
        }
        setGeneratedVideos([newVideo, ...generatedVideos])
        setIsGenerating(false)
      }, 5000)
    } catch (error) {
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="container max-w-[1800px] mx-auto p-2 sm:p-3 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              AI Video Generator
            </h1>
            <p className="text-[13px] sm:text-sm text-muted-foreground">
              Create stunning videos with AI-powered generation
            </p>
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => {
                if (isMobileView) {
                  setShowHistory(!showHistory);
                  if (showSettings) setShowSettings(false);
                } else {
                  setShowHistory(prev => !prev);
                  if (showSettings) setShowSettings(false);
                }
              }}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                "rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2",
                "bg-secondary/80 hover:bg-secondary",
                "text-xs sm:text-sm font-medium",
                "transition-all duration-200",
                showHistory && "bg-secondary shadow-sm",
                "active:scale-95",
                "relative overflow-hidden"
              )}
            >
              <History className="h-3.5 w-3.5" />
              <span>History</span>
              {!isMobileView && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center"
                >
                </motion.span>
              )}
            </button>
            <button
              onClick={() => {
                if (isMobileView) {
                  setShowSettings(!showSettings);
                  if (showHistory) setShowHistory(false);
                } else {
                  setShowSettings(prev => !prev);
                  if (showHistory) setShowHistory(false);
                }
              }}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                "rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2",
                "bg-primary text-primary-foreground",
                "text-xs sm:text-sm font-medium",
                "transition-all duration-200",
                showSettings && "opacity-90 shadow-sm",
                "active:scale-95",
                "relative overflow-hidden"
              )}
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Settings</span>
              {!isMobileView && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center"
                >
                </motion.span>
              )}
            </button>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:grid-cols-[1fr,340px] xl:grid-cols-[1fr,380px]">
          <div className="space-y-4 sm:space-y-6 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <div className="border-b p-3 sm:p-4">
                <h3 className="font-medium sm:font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  Generate Video
                </h3>
              </div>

              <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
                <VideoInput
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerate}
                  assets={assets}
                  onAssetsChange={setAssets}
                  settings={settings}
                />

                <AnimatePresence mode="wait">
                  {(isGenerating || generatedVideos.length > 0) && (
                    <VideoPreview
                      videos={generatedVideos}
                      isGenerating={isGenerating}
                      selectedVideo={selectedVideo}
                      onSelectVideo={setSelectedVideo}
                      settings={settings}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className={cn(
            "hidden lg:block space-y-6",
            "transition-all duration-300",
            showSettings || showHistory ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <VideoSettings 
                  settings={settings}
                  onSettingsChange={setSettings}
                  isVisible={true}
                  isMobile={false}
                />
              </motion.div>
            )}
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <VideoHistory 
                  showHistory={true}
                  onToggleHistory={() => {}}
                  isMobile={false}
                  onSelectVideo={(video) => {
                    setPrompt(video.prompt)
                    setSettings(video.settings)
                    setSelectedVideo(video)
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>

        {isMobileView && (
          <>
            <AnimatePresence mode="wait">
              {showSettings && (
                <div className="fixed inset-0 z-[100]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowSettings(false)}
                  />

                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ 
                      type: "spring", 
                      damping: 20,
                      stiffness: 300,
                      mass: 0.8
                    }}
                    className={cn(
                      "absolute inset-x-0 bottom-0",
                      "bg-background rounded-t-2xl",
                      "shadow-xl border-t border-border/50",
                      "will-change-transform"
                    )}
                    style={{ maxHeight: "90vh" }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="sticky top-0 z-10 bg-background/95 border-b border-border/50">
                      <div className="flex justify-center py-2">
                        <div className="w-8 h-1 rounded-full bg-border" />
                      </div>
                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Video Settings</h3>
                        <button
                          onClick={() => setShowSettings(false)}
                          className="p-1.5 rounded-lg hover:bg-secondary/80 text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-y-auto overscroll-contain">
                      <div className="px-4 py-6">
                        <VideoSettings 
                          settings={settings}
                          onSettingsChange={setSettings}
                          isVisible={showSettings}
                          isMobile={true}
                          onClose={() => setShowSettings(false)}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {showHistory && (
                <div className="fixed inset-0 z-[100]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowHistory(false)}
                  />

                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ 
                      type: "spring", 
                      damping: 20,
                      stiffness: 300,
                      mass: 0.8
                    }}
                    className={cn(
                      "absolute inset-x-0 bottom-0",
                      "bg-background rounded-t-2xl",
                      "shadow-xl border-t border-border/50",
                      "will-change-transform"
                    )}
                    style={{ maxHeight: "90vh" }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="sticky top-0 z-10 bg-background/95 border-b border-border/50">
                      <div className="flex justify-center py-2">
                        <div className="w-8 h-1 rounded-full bg-border" />
                      </div>
                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Video History</h3>
                        <button
                          onClick={() => setShowHistory(false)}
                          className="p-1.5 rounded-lg hover:bg-secondary/80 text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-y-auto overscroll-contain">
                      <div className="px-4 py-6">
                        <VideoHistory 
                          showHistory={showHistory}
                          onToggleHistory={setShowHistory}
                          isMobile={true}
                          onClose={() => setShowHistory(false)}
                          onSelectVideo={(video) => {
                            setPrompt(video.prompt)
                            setSettings(video.settings)
                            setSelectedVideo(video)
                            setShowHistory(false)
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
} 