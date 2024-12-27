"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mic, Wand2, Save, History, Settings, 
  Loader2, Play, Pause, Volume2, VolumeX,
  RefreshCcw, Download, Share2, FileText,
  Sparkles, Clock, Languages, Type,
  StopCircle, Headphones, FileAudio,
  Keyboard, MessageSquare, Upload, Plus, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SpeechInput } from "@/components/dashboard/ai-studio/speech/speech-input"
import { SpeechPreview } from "@/components/dashboard/ai-studio/speech/speech-preview"
import { SpeechSettings } from "@/components/dashboard/ai-studio/speech/settings"
import { SpeechHistory } from "@/components/dashboard/ai-studio/speech/history"
import { SpeechTemplates } from "@/components/dashboard/ai-studio/speech/templates"

export default function SpeechToTextPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [transcribedText, setTranscribedText] = useState("")
  const [audioBlob, setAudioBlob] = useState(null)
  const [settings, setSettings] = useState({
    model: "whisper-large-v3",
    language: "auto",
    mode: "transcribe",
    format: "text",
    timestamps: true,
    speakerDiarization: false,
    punctuation: true,
    profanityFilter: false,
    quality: "high"
  })
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)

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

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(timerRef.current)
      setRecordingTime(0)
    }
    return () => clearInterval(timerRef.current)
  }, [isRecording])

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

  if (typeof window === 'undefined') {
    return null
  }

  if (!mounted) {
    return null
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        setAudioBlob(audioBlob)
        processAudio(audioBlob)
      }

      // Start recording
      mediaRecorder.start()
      setIsRecording(true)

      // Start timer
      let time = 0
      timerRef.current = setInterval(() => {
        time += 1
        setRecordingTime(time)
      }, 1000)

    } catch (error) {
      console.error('Failed to start recording:', error)
      alert('Could not access microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      clearInterval(timerRef.current)
      setIsRecording(false)
      setRecordingTime(0)
    }
  }

  const processAudio = async (blob) => {
    setIsProcessing(true)
    try {
      // Create FormData with audio and settings
      const formData = new FormData()
      formData.append('audio', blob)
      formData.append('settings', JSON.stringify(settings))

      // Send to your API endpoint
      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Failed to process audio')

      const data = await response.json()
      setTranscribedText(data.text)

    } catch (error) {
      console.error('Failed to process audio:', error)
      alert('Failed to process audio. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1800px] mx-auto p-2 sm:p-3 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sticky top-0 z-50 bg-background/95 backdrop-blur-sm pb-2 sm:pb-0"
        >
          <div className="flex-1 min-w-0 px-2">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight truncate">
              Speech to Text
            </h1>
            <p className="text-[13px] sm:text-sm text-muted-foreground">
              Convert speech into accurate text with AI
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

        {/* Enhanced Main Content Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr,300px] xl:grid-cols-[1fr,320px] relative">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6 min-w-0">
            {/* Speech Input & Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card"
            >
              <div className="border-b p-3 sm:p-4">
                <h3 className="font-medium sm:font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  Speech Recognition
                </h3>
              </div>
              <div className="p-3 sm:p-4 space-y-4">
                <SpeechInput
                  isRecording={isRecording}
                  isProcessing={isProcessing}
                  recordingTime={recordingTime}
                  onStartRecording={startRecording}
                  onStopRecording={stopRecording}
                  settings={settings}
                />
                <SpeechPreview
                  text={transcribedText}
                  isProcessing={isProcessing}
                  audioBlob={audioBlob}
                  settings={settings}
                />
              </div>
            </motion.div>
          </div>

          {/* Enhanced Right Sidebar */}
          <div className={cn(
            "lg:sticky lg:top-24",
            "max-h-[calc(100vh-8rem)]",
            "transition-all duration-200",
            typeof window !== 'undefined' && window.innerWidth < 1024 ? "hidden" : "flex flex-col"
          )}>
            <div className="flex-1 flex flex-col gap-4 sm:gap-6 overflow-hidden">
              <div className="flex-none">
                <SpeechSettings 
                  settings={settings}
                  onSettingsChange={setSettings}
                  isVisible={window.innerWidth >= 1024 || showSettings}
                />
              </div>
              <div className="flex-1 min-h-0">
                <SpeechHistory 
                  showHistory={window.innerWidth >= 1024 || showHistory}
                  onToggleHistory={toggleHistory}
                  onSelectTranscription={(item) => {
                    setTranscribedText(item.text)
                    setSettings(item.settings)
                    if (window.innerWidth < 1024) setShowHistory(false)
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Modals */}
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
                          <h3 className="text-sm font-medium">Settings</h3>
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
                        <SpeechSettings 
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
                          <h3 className="text-sm font-medium">Recent Transcriptions</h3>
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
                        <SpeechHistory 
                          showHistory={true}
                          onToggleHistory={toggleHistory}
                          isMobile={true}
                          onClose={() => setShowHistory(false)}
                          onSelectTranscription={(item) => {
                            setTranscribedText(item.text)
                            setSettings(item.settings)
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