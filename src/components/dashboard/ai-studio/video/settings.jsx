"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Settings, Video, Sliders, Clock,
  Music, Mic, Camera, Layers,
  MonitorPlay, Palette, Sparkles,
  Wand2, Gauge, Film, Clapperboard,
  SlidersHorizontal, Volume2
} from "lucide-react"
import { cn } from "@/lib/utils"

const videoModels = [
  {
    id: "stable-diffusion-xl-video",
    name: "Stable Diffusion XL",
    description: "High-quality video generation with advanced features",
    icon: Sparkles
  },
  {
    id: "fast-video-gen",
    name: "Fast Video Gen",
    description: "Quick video generation with good quality",
    icon: Wand2
  }
]

const videoStyles = [
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Professional movie-like style",
    icon: Film
  },
  {
    id: "commercial",
    name: "Commercial",
    description: "Perfect for advertisements",
    icon: MonitorPlay
  },
  {
    id: "social",
    name: "Social Media",
    description: "Optimized for social platforms",
    icon: Video
  },
  {
    id: "artistic",
    name: "Artistic",
    description: "Creative and unique style",
    icon: Palette
  }
]

const resolutions = [
  { id: "1080p", label: "1080p", width: 1920, height: 1080 },
  { id: "720p", label: "720p", width: 1280, height: 720 },
  { id: "square", label: "1:1", width: 1080, height: 1080 },
  { id: "vertical", label: "9:16", width: 1080, height: 1920 }
]

export function VideoSettings({ settings, onSettingsChange, isVisible }) {
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
              Video Settings
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize your video generation
            </p>
          </div>

          <div className="p-4 space-y-6">
            {/* Model Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">AI Model</label>
              <div className="grid gap-2">
                {videoModels.map((model) => (
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

            {/* Video Style */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Video Style</label>
              <div className="grid grid-cols-2 gap-2">
                {videoStyles.map((style) => (
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

            {/* Resolution Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Resolution</label>
              <div className="grid grid-cols-2 gap-2">
                {resolutions.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => handleChange("resolution", res.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-lg p-3",
                      "border-2 transition-all duration-200",
                      settings.resolution === res.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <div className="text-sm font-medium">{res.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {res.width}x{res.height}
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
                max="60"
                step="5"
                value={settings.duration}
                onChange={(e) => handleChange("duration", parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5s</span>
                <span>30s</span>
                <span>60s</span>
              </div>
            </div>

            {/* FPS Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Frame Rate (FPS)</label>
              <div className="grid grid-cols-3 gap-2">
                {[24, 30, 60].map((fps) => (
                  <button
                    key={fps}
                    onClick={() => handleChange("fps", fps)}
                    className={cn(
                      "rounded-lg p-2 text-sm",
                      "border transition-all duration-200",
                      settings.fps === fps
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    {fps} FPS
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Options */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Audio Settings</label>
              <div className="space-y-2">
                <button
                  onClick={() => handleChange("music", settings.music === "none" ? "background" : "none")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg p-3",
                    "border-2 transition-all duration-200",
                    settings.music !== "none"
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    <span>Background Music</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {settings.music !== "none" ? "Enabled" : "Disabled"}
                  </div>
                </button>

                <button
                  onClick={() => handleChange("voiceover", !settings.voiceover)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg p-3",
                    "border-2 transition-all duration-200",
                    settings.voiceover
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    <span>AI Voiceover</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {settings.voiceover ? "Enabled" : "Disabled"}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 