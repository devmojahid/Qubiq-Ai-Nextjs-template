"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  AudioWaveform, Wand2, Save, History, Settings, 
  Loader2, Play, Pause, Volume2, VolumeX,
  RefreshCcw, Download, Share2, MessageSquare,
  Sparkles, Clock, Languages, Type,
  StopCircle, Headphones, FileAudio, Mic,
  Keyboard, Music, Upload, Plus, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TextToSpeechInput } from "@/components/dashboard/ai-studio/text-to-speech/input"
import { TextToSpeechPreview } from "@/components/dashboard/ai-studio/text-to-speech/preview"
import { TextToSpeechSettings } from "@/components/dashboard/ai-studio/text-to-speech/settings"
import { TextToSpeechHistory } from "@/components/dashboard/ai-studio/text-to-speech/history"
import { TextToSpeechTemplates } from "@/components/dashboard/ai-studio/text-to-speech/templates"

export default function TextToSpeechPage() {
  const [text, setText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAudio, setGeneratedAudio] = useState(null)
  const [settings, setSettings] = useState({
    voice: "alloy",
    model: "tts-1",
    language: "en",
    speed: 1.0,
    pitch: 1.0,
    emphasis: 1.0,
    stability: 0.5,
    clarity: 0.75,
    style: "natural",
    emotion: "neutral"
  })
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  // Add audio player ref
  const audioRef = useRef(null)

  // Initialize mobile view after mount
  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth
        setIsMobileView(width < 1024)
        
        if (width >= 1024) {
          setShowSettings(false)
          setShowHistory(false)
        }
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent hydration mismatch
  if (typeof window === 'undefined' || !mounted) {
    return null
  }

  const toggleHistory = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowSettings(false)
      setShowHistory(!showHistory)
    } else {
      setShowHistory(!showHistory)
    }
  }

  const toggleSettings = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowHistory(false)
      setShowSettings(!showSettings)
    } else {
      setShowSettings(!showSettings)
    }
  }

  // Add generation function
  const generateSpeech = async () => {
    if (!text.trim()) return

    setIsGenerating(true)
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate generated audio
      const mockAudio = {
        id: Date.now(),
        url: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav', // Example audio
        text,
        settings,
        timestamp: new Date().toISOString(),
        duration: '00:30',
        size: '1.2 MB',
        format: 'mp3'
      }

      setGeneratedAudio(mockAudio)
      
      // Add to history (you would implement this)
      // addToHistory(mockAudio)

    } catch (error) {
      console.error('Failed to generate speech:', error)
      // You can add toast notification here
    } finally {
      setIsGenerating(false)
    }
  }

  // Add audio control functions
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }

  // Add download function
  const handleDownload = async () => {
    if (generatedAudio?.url) {
      try {
        const response = await fetch(generatedAudio.url)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `tts-${Date.now()}.mp3`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } catch (error) {
        console.error('Download failed:', error)
      }
    }
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1800px] mx-auto p-2 sm:p-3 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sticky top-0 z-50 bg-background/95 backdrop-blur-sm pb-2 sm:pb-0 border-b"
        >
          <div className="flex-1 min-w-0 px-2">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight truncate">
              Text to Speech
            </h1>
            <p className="text-[13px] sm:text-sm text-muted-foreground">
              Convert your text into natural-sounding speech
            </p>
          </div>

          {/* Mobile-optimized action buttons */}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card"
            >
              <div className="border-b p-3 sm:p-4">
                <h3 className="font-medium sm:font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <AudioWaveform className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  Text to Speech
                </h3>
              </div>
              <div className="p-3 sm:p-4 space-y-4">
                <TextToSpeechInput
                  text={text}
                  onTextChange={setText}
                  onGenerate={generateSpeech}
                  isGenerating={isGenerating}
                  settings={settings}
                />
                
                {/* Enhanced Preview with Audio Controls */}
                <div className="relative">
                  <TextToSpeechPreview
                    audio={generatedAudio}
                    isGenerating={isGenerating}
                    settings={settings}
                    onPlayPause={handlePlayPause}
                    onDownload={handleDownload}
                  />
                  {generatedAudio?.url && (
                    <audio
                      ref={audioRef}
                      src={generatedAudio.url}
                      className="hidden"
                      controls={false}
                    />
                  )}
                </div>

                {/* Action Buttons */}
                {generatedAudio && (
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={handleDownload}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5",
                        "text-xs font-medium rounded-lg",
                        "bg-secondary/80 hover:bg-secondary",
                        "transition-colors duration-200"
                      )}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                    <button
                      onClick={() => {/* Implement share */}}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5",
                        "text-xs font-medium rounded-lg",
                        "bg-secondary/80 hover:bg-secondary",
                        "transition-colors duration-200"
                      )}
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      Share
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className={cn(
            "lg:sticky lg:top-24",
            "max-h-[calc(100vh-8rem)]",
            "transition-all duration-200",
            typeof window !== 'undefined' && window.innerWidth < 1024 ? "hidden" : "flex flex-col"
          )}>
            <div className="flex-1 flex flex-col gap-4 sm:gap-6 overflow-hidden">
              <div className="flex-none">
                <TextToSpeechSettings 
                  settings={settings}
                  onSettingsChange={setSettings}
                  isVisible={window.innerWidth >= 1024 || showSettings}
                />
              </div>
              <div className="flex-1 min-h-0">
                <TextToSpeechHistory 
                  showHistory={window.innerWidth >= 1024 || showHistory}
                  onToggleHistory={toggleHistory}
                  onSelectAudio={(item) => {
                    setText(item.text)
                    setSettings(item.settings)
                    setGeneratedAudio(item)
                    if (window.innerWidth < 1024) setShowHistory(false)
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Modals */}
        {mounted && typeof window !== 'undefined' && window.innerWidth < 1024 && (
          <>
            <AnimatePresence mode="wait">
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
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
                      "flex flex-col",
                      "shadow-xl"
                    )}
                    style={{ maxHeight: "85vh" }}
                  >
                    <div className="flex-none">
                      <div className="sticky top-0 z-10 bg-background border-b">
                        <div className="flex justify-center py-2">
                          <div className="w-12 h-1 rounded-full bg-border/60" />
                        </div>
                        <div className="px-4 pb-3 flex items-center justify-between">
                          <h3 className="text-sm font-medium">Voice Settings</h3>
                          <button
                            onClick={() => setShowSettings(false)}
                            className="p-1.5 rounded-lg hover:bg-secondary/80"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <div className="p-4">
                        <TextToSpeechSettings 
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
                  transition={{ duration: 0.15 }}
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
                      "flex flex-col",
                      "shadow-xl"
                    )}
                    style={{ maxHeight: "85vh" }}
                  >
                    <div className="flex-none">
                      <div className="sticky top-0 z-10 bg-background border-b">
                        <div className="flex justify-center py-2">
                          <div className="w-12 h-1 rounded-full bg-border/60" />
                        </div>
                        <div className="px-4 pb-3 flex items-center justify-between">
                          <h3 className="text-sm font-medium">Generated Audio History</h3>
                          <button
                            onClick={() => setShowHistory(false)}
                            className="p-1.5 rounded-lg hover:bg-secondary/80"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <div className="p-4">
                        <TextToSpeechHistory 
                          showHistory={true}
                          onToggleHistory={toggleHistory}
                          isMobile={true}
                          onClose={() => setShowHistory(false)}
                          onSelectAudio={(item) => {
                            setText(item.text)
                            setSettings(item.settings)
                            setGeneratedAudio(item)
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