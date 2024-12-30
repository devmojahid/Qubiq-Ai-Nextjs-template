"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  AudioWaveform, Sliders, Languages, Sparkles,
  MessageSquare, Zap, Brain, Gauge,
  FileAudio, Volume2, Waveform, Clock,
  Type, Settings, Keyboard, Hash,
  Filter, Radio, AudioLines, Waves,
  Music, BrainCircuit, Headphones,
  Speech, Mic2, Dna,
  Heart,
  Briefcase,
  Play
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

const voices = [
  {
    id: "alloy",
    name: "Alloy",
    description: "Versatile and well-balanced voice",
    icon: AudioWaveform,
    preview: "/voices/alloy.mp3"
  },
  {
    id: "echo",
    name: "Echo",
    description: "Warm and resonant voice",
    icon: Waves,
    preview: "/voices/echo.mp3"
  },
  {
    id: "fable",
    name: "Fable",
    description: "Expressive and dynamic voice",
    icon: Sparkles,
    preview: "/voices/fable.mp3"
  },
  {
    id: "onyx",
    name: "Onyx",
    description: "Deep and authoritative voice",
    icon: Speech,
    preview: "/voices/onyx.mp3"
  },
  {
    id: "nova",
    name: "Nova",
    description: "Clear and professional voice",
    icon: Mic2,
    preview: "/voices/nova.mp3"
  },
  {
    id: "shimmer",
    name: "Shimmer",
    description: "Bright and energetic voice",
    icon: Dna,
    preview: "/voices/shimmer.mp3"
  }
]

const models = [
  {
    id: "tts-1",
    name: "Standard TTS",
    description: "Fast and reliable text-to-speech",
    icon: Zap
  },
  {
    id: "tts-1-hd",
    name: "HD TTS",
    description: "Higher quality with enhanced clarity",
    icon: BrainCircuit
  }
]

const languages = [
  { id: "en", label: "English", icon: MessageSquare },
  { id: "es", label: "Spanish", icon: MessageSquare },
  { id: "fr", label: "French", icon: MessageSquare },
  { id: "de", label: "German", icon: MessageSquare },
  { id: "it", label: "Italian", icon: MessageSquare },
  { id: "pt", label: "Portuguese", icon: MessageSquare },
  { id: "pl", label: "Polish", icon: MessageSquare },
  { id: "hi", label: "Hindi", icon: MessageSquare },
  { id: "ja", label: "Japanese", icon: MessageSquare },
  { id: "ko", label: "Korean", icon: MessageSquare },
  { id: "zh", label: "Chinese", icon: MessageSquare }
]

const styles = [
  { id: "natural", label: "Natural", icon: Waves },
  { id: "newscaster", label: "Newscaster", icon: Radio },
  { id: "friendly", label: "Friendly", icon: Heart },
  { id: "professional", label: "Professional", icon: Briefcase }
]

export function TextToSpeechSettings({ settings, onSettingsChange, isVisible }) {
  const [currentPreview, setCurrentPreview] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  const handleVoicePreview = async (voice) => {
    if (currentPreview === voice.id) {
      audioRef.current?.pause()
      setCurrentPreview(null)
      setIsPlaying(false)
      return
    }

    try {
      const audio = new Audio(voice.preview)
      audio.onended = () => {
        setCurrentPreview(null)
        setIsPlaying(false)
      }
      await audio.play()
      audioRef.current = audio
      setCurrentPreview(voice.id)
      setIsPlaying(true)
    } catch (error) {
      //
    }
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
              Voice Settings
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize your text-to-speech settings
            </p>
          </div>

          <div className="p-4 space-y-6">
            {/* Voice Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Voice Selection</label>
              <div className="grid gap-2">
                {voices.map((voice) => (
                  <div
                    key={voice.id}
                    onClick={() => handleChange("voice", voice.id)}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-lg p-3",
                      "border-2 text-left transition-all duration-200 cursor-pointer",
                      settings.voice === voice.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "rounded-lg p-2",
                        "bg-primary/10 text-primary"
                      )}>
                        <voice.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{voice.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {voice.description}
                        </div>
                      </div>
                    </div>
                    
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVoicePreview(voice);
                      }}
                      className={cn(
                        "rounded-lg p-2 cursor-pointer",
                        "text-muted-foreground hover:text-foreground",
                        "transition-colors"
                      )}
                    >
                      {currentPreview === voice.id ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Model</label>
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

            {/* Voice Style */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Speaking Style</label>
              <div className="grid grid-cols-2 gap-2">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleChange("style", style.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg p-3",
                      "border-2 transition-all duration-200",
                      settings.style === style.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <style.icon className="h-4 w-4" />
                    <span className="text-sm">{style.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Parameters */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Voice Parameters</label>
              
              {/* Speed Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Speed</span>
                  <span className="text-sm">{settings.speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.speed}
                  onChange={(e) => handleChange("speed", parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Pitch Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pitch</span>
                  <span className="text-sm">{settings.pitch}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.pitch}
                  onChange={(e) => handleChange("pitch", parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Emphasis Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Emphasis</span>
                  <span className="text-sm">{settings.emphasis}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.emphasis}
                  onChange={(e) => handleChange("emphasis", parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Stability Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Stability</span>
                  <span className="text-sm">{settings.stability}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.stability}
                  onChange={(e) => handleChange("stability", parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Output Format */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Output Format</label>
              <div className="grid grid-cols-3 gap-2">
                {["mp3", "wav", "ogg"].map((format) => (
                  <button
                    key={format}
                    onClick={() => handleChange("format", format)}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-lg p-3",
                      "border-2 transition-all duration-200",
                      settings.format === format
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <FileAudio className="h-4 w-4" />
                    <span className="text-sm uppercase">{format}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Settings */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Quality</label>
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