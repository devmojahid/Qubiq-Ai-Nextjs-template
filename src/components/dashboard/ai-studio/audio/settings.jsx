"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Music2, Sliders, Volume2, Clock,
  AudioWaveform, Mic, Radio, Layers,
  Settings, Palette, Sparkles,
  Gauge, FileMusic, Music, Headphones,
  Repeat, Shuffle, Zap, BrainCircuit,
  SlidersHorizontal, Speaker, Hash, Waves
} from "lucide-react"
import { cn } from "@/lib/utils"

const audioModels = [
  {
    id: "deepmind-audio-xl",
    name: "DeepMind Audio XL",
    description: "High-quality audio generation with advanced features",
    icon: BrainCircuit
  },
  {
    id: "fast-audio-gen",
    name: "Fast Audio Gen",
    description: "Quick audio generation with good quality",
    icon: Zap
  }
]

const audioStyles = [
  {
    id: "natural",
    name: "Natural",
    description: "Realistic and organic sound",
    icon: AudioWaveform
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Epic and atmospheric",
    icon: FileMusic
  },
  {
    id: "electronic",
    name: "Electronic",
    description: "Modern electronic style",
    icon: Radio
  },
  {
    id: "ambient",
    name: "Ambient",
    description: "Atmospheric and calming",
    icon: Music
  }
]

const audioFormats = [
  { id: "wav", label: "WAV", description: "Lossless quality" },
  { id: "mp3", label: "MP3", description: "Compressed format" },
  { id: "ogg", label: "OGG", description: "Open format" },
  { id: "flac", label: "FLAC", description: "High quality" }
]

export function AudioSettings({ settings, onSettingsChange, isVisible }) {
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
              Audio Settings
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize your audio generation
            </p>
          </div>

          <div className="p-4 space-y-6">
            {/* Model Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">AI Model</label>
              <div className="grid gap-2">
                {audioModels.map((model) => (
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

            {/* Audio Style */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Audio Style</label>
              <div className="grid grid-cols-2 gap-2">
                {audioStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleChange("style", style.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg p-3",
                      "border-2 text-center transition-all duration-200",
                      settings.style === style.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <style.icon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{style.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {style.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Duration (seconds)</label>
                <span className="text-sm text-muted-foreground">
                  {settings.duration}s
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={settings.duration}
                onChange={(e) => handleChange("duration", parseInt(e.target.value))}
                className={cn(
                  "w-full h-2 rounded-full appearance-none",
                  "bg-secondary",
                  "[&::-webkit-slider-thumb]:appearance-none",
                  "[&::-webkit-slider-thumb]:w-4",
                  "[&::-webkit-slider-thumb]:h-4",
                  "[&::-webkit-slider-thumb]:rounded-full",
                  "[&::-webkit-slider-thumb]:bg-primary",
                  "[&::-webkit-slider-thumb]:cursor-pointer",
                  "[&::-webkit-slider-thumb]:transition-all",
                  "[&::-webkit-slider-thumb]:hover:scale-110"
                )}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5s</span>
                <span>2m</span>
                <span>5m</span>
              </div>
            </div>

            {/* Audio Format */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Output Format</label>
              <div className="grid grid-cols-2 gap-2">
                {audioFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => handleChange("format", format.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-lg p-3",
                      "border-2 transition-all duration-200",
                      settings.format === format.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <div className="text-sm font-medium">{format.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {format.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sample Rate */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Sample Rate</label>
              <div className="grid grid-cols-3 gap-2">
                {[22050, 44100, 48000].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handleChange("sampleRate", rate)}
                    className={cn(
                      "rounded-lg p-2 text-sm",
                      "border transition-all duration-200",
                      settings.sampleRate === rate
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    {(rate / 1000).toFixed(1)}kHz
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Advanced Settings</label>
              <div className="space-y-2">
                {/* Tempo Control */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tempo (BPM)</span>
                  <input
                    type="number"
                    min="40"
                    max="240"
                    value={settings.tempo}
                    onChange={(e) => handleChange("tempo", parseInt(e.target.value))}
                    className={cn(
                      "w-20 rounded-lg bg-secondary/50 px-2 py-1",
                      "text-sm text-right",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                  />
                </div>

                {/* Key Selection */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">Musical Key</span>
                  <select
                    value={settings.key}
                    onChange={(e) => handleChange("key", e.target.value)}
                    className={cn(
                      "rounded-lg bg-secondary/50 px-2 py-1",
                      "text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                  >
                    {["C", "G", "D", "A", "E", "B", "F"].map((key) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>

                {/* Genre Selection */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">Genre</span>
                  <select
                    value={settings.genre}
                    onChange={(e) => handleChange("genre", e.target.value)}
                    className={cn(
                      "rounded-lg bg-secondary/50 px-2 py-1",
                      "text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                  >
                    {["ambient", "electronic", "classical", "jazz", "rock"].map((genre) => (
                      <option key={genre} value={genre}>
                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 