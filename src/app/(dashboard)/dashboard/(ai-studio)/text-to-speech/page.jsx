"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  AudioWaveform, Wand2, Save, History, Settings, 
  Loader2, Play, Pause, Volume2, VolumeX,
  RefreshCcw, Download, Share2, MessageSquare,
  Sparkles, Clock, Languages, Type,
  StopCircle, Headphones, FileAudio, Mic,
  Keyboard, Music, Upload, Plus, Sliders
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
    style: "natural",
    format: "mp3",
    quality: "high"
  })
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const handleGenerate = async (generatedAudio) => {
    try {
      setGeneratedAudio(generatedAudio);
    } catch (error) {
      console.error('Failed to set generated audio:', error);
    }
  };

  const handleTemplateSelect = (template) => {
    if (template?.text) {
      setText(template.text);
    }
    if (template?.settings) {
      setSettings(prev => ({
        ...prev,
        ...template.settings
      }));
    }
  };

  return (
    <div className="max-w-full space-y-8 p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Text to Speech</h1>
          <p className="text-muted-foreground">
            Convert text to natural-sounding speech with AI voices
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
          {/* Voice Templates */}
          <TextToSpeechTemplates 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateSelect}
            settings={settings}
          />

          {/* Text Input & Audio Preview */}
          <div className="rounded-xl border bg-card">
            <div className="border-b p-4">
              <h3 className="font-semibold flex items-center gap-2">
                <AudioWaveform className="h-4 w-4 text-primary" />
                Speech Generation
              </h3>
            </div>

            <div className="p-4 space-y-4">
              {/* Text Input */}
              <TextToSpeechInput
                text={text}
                onTextChange={setText}
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
                settings={settings}
              />

              {/* Audio Preview */}
              <AnimatePresence mode="wait">
                {(isGenerating || generatedAudio) && (
                  <TextToSpeechPreview
                    audio={generatedAudio}
                    isGenerating={isGenerating}
                    settings={settings}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column - Settings & History */}
        <div className="space-y-6">
          {/* Voice Settings */}
          <TextToSpeechSettings 
            settings={settings}
            onSettingsChange={setSettings}
            isVisible={showSettings}
          />

          {/* Generation History */}
          <TextToSpeechHistory 
            showHistory={showHistory}
            onToggleHistory={setShowHistory}
            onSelectAudio={(item) => {
              setText(item.text)
              setSettings(item.settings)
              setGeneratedAudio(item)
            }}
          />
        </div>
      </div>
    </div>
  )
} 