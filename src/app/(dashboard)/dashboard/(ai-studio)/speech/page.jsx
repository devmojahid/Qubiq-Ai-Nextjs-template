"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mic, Wand2, Save, History, Settings, 
  Loader2, Play, Pause, Volume2, VolumeX,
  RefreshCcw, Download, Share2, FileText,
  Sparkles, Clock, Languages, Type,
  StopCircle, Headphones, FileAudio,
  Keyboard, MessageSquare, Upload, Plus
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
    language: "auto", // auto-detect or specific language
    mode: "transcribe", // transcribe or translate
    format: "text", // text, srt, vtt
    timestamps: true,
    speakerDiarization: false,
    punctuation: true,
    profanityFilter: false,
    quality: "high" // low, medium, high
  })
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
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
    <div className="max-w-full space-y-8 p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Speech to Text</h1>
          <p className="text-muted-foreground">
            Convert speech to text with AI-powered transcription
          </p>
        </div>

        <div className="flex items-center gap-4">
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
            onClick={() => setShowSettings(!showSettings)}
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
          {/* Speech Templates */}
          <SpeechTemplates 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />

          {/* Speech Input & Preview */}
          <div className="rounded-xl border bg-card">
            <div className="border-b p-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Mic className="h-4 w-4 text-primary" />
                Speech Recognition
              </h3>
            </div>

            <div className="p-4 space-y-4">
              {/* Recording Controls */}
              <SpeechInput
                isRecording={isRecording}
                isProcessing={isProcessing}
                recordingTime={recordingTime}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                settings={settings}
              />

              {/* Text Preview */}
              <AnimatePresence mode="wait">
                {(isProcessing || transcribedText) && (
                  <SpeechPreview
                    text={transcribedText}
                    isProcessing={isProcessing}
                    audioBlob={audioBlob}
                    settings={settings}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column - Settings & History */}
        <div className="space-y-6">
          {/* Speech Settings */}
          <SpeechSettings 
            settings={settings}
            onSettingsChange={setSettings}
            isVisible={showSettings}
          />

          {/* Speech History */}
          <SpeechHistory 
            showHistory={showHistory}
            onToggleHistory={setShowHistory}
            onSelectTranscription={(item) => {
              setTranscribedText(item.text)
              setSettings(item.settings)
            }}
          />
        </div>
      </div>
    </div>
  )
} 