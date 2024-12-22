"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Mic, Sliders, Languages, Sparkles,
  MessageSquare, Zap, Brain, Gauge,
  FileAudio, Volume2, Waveform, Clock,
  Type, Settings, Keyboard, Hash,
  Filter, Radio, AudioLines, Waves,
  FileText, BrainCircuit, Headphones
} from "lucide-react"
import { cn } from "@/lib/utils"

const models = [
  {
    id: "whisper-large-v3",
    name: "Whisper Large v3",
    description: "Most accurate model with advanced features",
    icon: BrainCircuit
  },
  {
    id: "whisper-medium",
    name: "Whisper Medium",
    description: "Balanced accuracy and speed",
    icon: Brain
  },
  {
    id: "whisper-small",
    name: "Whisper Small",
    description: "Fast processing with good accuracy",
    icon: Zap
  }
]

const languages = [
  { id: "auto", label: "Auto Detect", icon: Sparkles },
  { id: "en", label: "English", icon: MessageSquare },
  { id: "es", label: "Spanish", icon: MessageSquare },
  { id: "fr", label: "French", icon: MessageSquare },
  { id: "de", label: "German", icon: MessageSquare },
  { id: "it", label: "Italian", icon: MessageSquare },
  { id: "pt", label: "Portuguese", icon: MessageSquare },
  { id: "nl", label: "Dutch", icon: MessageSquare },
  { id: "pl", label: "Polish", icon: MessageSquare },
  { id: "ru", label: "Russian", icon: MessageSquare }
]

const outputFormats = [
  { id: "text", label: "Plain Text", icon: Type },
  { id: "srt", label: "SRT Subtitles", icon: FileText },
  { id: "vtt", label: "VTT Subtitles", icon: FileText }
]

export function SpeechSettings({ settings, onSettingsChange, isVisible }) {
  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-xl border bg-card overflow-hidden"
        >
          <div className="border-b p-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              Transcription Settings
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize your speech recognition settings
            </p>
          </div>

          <div className="p-4 space-y-6">
            {/* Model Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">AI Model</label>
              <div className="grid gap-2">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleChange("model", model.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg p-3",
                      "border-2 text-left transition-all duration-200",
                      settings.model === model.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <div className={cn(
                      "rounded-lg p-2",
                      "bg-primary/10 text-primary"
                    )}>
                      <model.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{model.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {model.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Language</label>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleChange("language", lang.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg p-3",
                      "border-2 transition-all duration-200",
                      settings.language === lang.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <lang.icon className="h-4 w-4" />
                    <span className="text-sm">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Output Format */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Output Format</label>
              <div className="grid grid-cols-3 gap-2">
                {outputFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => handleChange("format", format.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg p-3",
                      "border-2 transition-all duration-200",
                      settings.format === format.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <format.icon className="h-4 w-4" />
                    <span className="text-xs">{format.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Advanced Options</label>
              <div className="space-y-2">
                {/* Timestamps */}
                <button
                  onClick={() => handleChange("timestamps", !settings.timestamps)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg p-3",
                    "border-2 transition-all duration-200",
                    settings.timestamps
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Word Timestamps</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {settings.timestamps ? "Enabled" : "Disabled"}
                  </div>
                </button>

                {/* Speaker Diarization */}
                <button
                  onClick={() => handleChange("speakerDiarization", !settings.speakerDiarization)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg p-3",
                    "border-2 transition-all duration-200",
                    settings.speakerDiarization
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <AudioLines className="h-4 w-4" />
                    <span>Speaker Detection</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {settings.speakerDiarization ? "Enabled" : "Disabled"}
                  </div>
                </button>

                {/* Punctuation */}
                <button
                  onClick={() => handleChange("punctuation", !settings.punctuation)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg p-3",
                    "border-2 transition-all duration-200",
                    settings.punctuation
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <span>Auto Punctuation</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {settings.punctuation ? "Enabled" : "Disabled"}
                  </div>
                </button>

                {/* Profanity Filter */}
                <button
                  onClick={() => handleChange("profanityFilter", !settings.profanityFilter)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg p-3",
                    "border-2 transition-all duration-200",
                    settings.profanityFilter
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Profanity Filter</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {settings.profanityFilter ? "Enabled" : "Disabled"}
                  </div>
                </button>
              </div>
            </div>

            {/* Quality Settings */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Quality Settings</label>
              <div className="grid grid-cols-3 gap-2">
                {["low", "medium", "high"].map((quality) => (
                  <button
                    key={quality}
                    onClick={() => handleChange("quality", quality)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg p-3",
                      "border-2 transition-all duration-200",
                      settings.quality === quality
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <Gauge className="h-4 w-4" />
                    <span className="text-xs capitalize">{quality}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 