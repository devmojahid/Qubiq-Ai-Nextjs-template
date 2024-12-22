"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Music2, Play, Star, Clock, 
  Headphones, Radio, AudioWaveform,
  FileMusic, Volume2, VolumeX,
  Mic, Sparkles, BrainCircuit,
  Pause, Heart, Zap, Music,
  Film, Podcast, Layers,
  SpeakerWave, Waves, Hash,
  Forward, Rewind, Settings,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"

const templates = [
  {
    id: "background-music",
    category: "Music",
    title: "Background Music",
    description: "Create ambient background music for videos or presentations",
    duration: "30s",
    icon: Music2,
    preview: {
      mp3: "/samples/background-music.mp3",
      ogg: "/samples/background-music.ogg",
      wav: "/samples/background-music.wav"
    },
    prompt: "Generate calming background music with soft piano and ambient pads",
    settings: {
      style: "ambient",
      duration: 30,
      tempo: 80,
      key: "C"
    }
  },
  {
    id: "podcast-intro",
    category: "Production",
    title: "Podcast Intro",
    description: "Professional podcast intro music with energy",
    duration: "15s",
    icon: Podcast,
    preview: {
      mp3: "/samples/podcast-intro.mp3",
      ogg: "/samples/podcast-intro.ogg",
      wav: "/samples/podcast-intro.wav"
    },
    prompt: "Create an energetic podcast intro with modern beats and synths",
    settings: {
      style: "electronic",
      duration: 15,
      tempo: 120,
      key: "G"
    }
  },
  {
    id: "cinematic-score",
    category: "Film",
    title: "Cinematic Score",
    description: "Epic orchestral music for film and video",
    duration: "60s",
    icon: Film,
    preview: {
      mp3: "/samples/cinematic-score.mp3",
      ogg: "/samples/cinematic-score.ogg",
      wav: "/samples/cinematic-score.wav"
    },
    prompt: "Generate an epic orchestral score with dramatic build-up",
    settings: {
      style: "cinematic",
      duration: 60,
      tempo: 90,
      key: "D"
    }
  },
  {
    id: "sound-effects",
    category: "SFX",
    title: "Sound Effects",
    description: "Custom sound effects for any project",
    duration: "5s",
    icon: AudioWaveform,
    preview: {
      mp3: "/samples/sound-effects.mp3",
      ogg: "/samples/sound-effects.ogg",
      wav: "/samples/sound-effects.wav"
    },
    prompt: "Create unique sound effects with modern synthesis",
    settings: {
      style: "electronic",
      duration: 5,
      format: "wav",
      sampleRate: 48000
    }
  }
]

const categories = [
  { id: "all", label: "All Templates", icon: Sparkles },
  { id: "music", label: "Music", icon: Music },
  { id: "production", label: "Production", icon: Radio },
  { id: "film", label: "Film", icon: Film },
  { id: "sfx", label: "Sound FX", icon: AudioWaveform }
]

export function AudioTemplates({ selectedTemplate, onSelectTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [playingId, setPlayingId] = useState(null)
  const [hoveredTemplate, setHoveredTemplate] = useState(null)
  const audioRef = useRef(null)

  const filteredTemplates = templates.filter(template => 
    selectedCategory === "all" || 
    template.category.toLowerCase() === selectedCategory
  )

  const handlePlay = async (templateId, preview) => {
    try {
      if (playingId === templateId) {
        audioRef.current?.pause()
        setPlayingId(null)
        return
      }

      if (!audioRef.current) return

      audioRef.current.removeAttribute('src')
      while (audioRef.current.firstChild) {
        audioRef.current.removeChild(audioRef.current.firstChild)
      }

      const sources = [
        { src: preview.mp3, type: 'audio/mpeg' },
        { src: preview.ogg, type: 'audio/ogg' },
        { src: preview.wav, type: 'audio/wav' }
      ]

      sources.forEach(source => {
        const sourceElement = document.createElement('source')
        sourceElement.src = source.src
        sourceElement.type = source.type
        audioRef.current.appendChild(sourceElement)
      })

      await audioRef.current.load()
      const playPromise = audioRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingId(templateId)
          })
          .catch(error => {
            console.error('Playback failed:', error)
            setPlayingId(null)
            const errorMessage = 
              error.name === 'NotSupportedError' 
                ? 'This audio format is not supported by your browser.'
                : 'Unable to play audio. Please try again.';
            alert(errorMessage)
          })
      }
    } catch (error) {
      console.error('Audio error:', error)
      setPlayingId(null)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeAttribute('src')
        audioRef.current.load()
      }
    }
  }, [])

  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          Audio Templates
        </h3>
        <p className="text-sm text-muted-foreground">
          Start with a pre-designed template
        </p>
      </div>

      {/* Category Selection */}
      <div className="border-b overflow-x-auto">
        <div className="flex p-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                "transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
              )}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "group relative rounded-lg overflow-hidden",
              "border bg-card transition-all duration-200",
              selectedTemplate?.id === template.id
                ? "border-primary ring-2 ring-primary/20"
                : "hover:border-primary/50"
            )}
          >
            {/* Template Preview */}
            <div className="p-4 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "rounded-lg p-2",
                    "bg-primary/10 text-primary"
                  )}>
                    <template.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">{template.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {template.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlay(template.id, template.preview)
                    }}
                    className={cn(
                      "rounded-lg p-2",
                      "bg-primary/10 text-primary",
                      "hover:bg-primary/20 transition-colors"
                    )}
                  >
                    {playingId === template.id ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {template.description}
              </p>

              {/* Waveform Visualization */}
              <div className="relative h-12 bg-secondary/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {Array.from({ length: 50 }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-0.5 mx-px bg-primary/40 rounded-full",
                        "transition-all duration-200",
                        playingId === template.id && "animate-pulse"
                      )}
                      style={{ 
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 50}ms`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{template.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Music2 className="h-3 w-3" />
                    <span>{template.settings.style}</span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectTemplate(template)}
                  className={cn(
                    "rounded-lg px-2 py-1",
                    "bg-primary/10 text-primary",
                    "hover:bg-primary/20 transition-colors"
                  )}
                >
                  Use Template
                </button>
              </div>
            </div>

            {/* Hidden Audio Element */}
            <audio
              key={template.id}
              ref={audioRef}
              className="hidden"
              preload="none"
              onEnded={() => setPlayingId(null)}
              onError={(e) => {
                const error = e.currentTarget.error
                console.error('Audio error:', {
                  code: error?.code,
                  message: error?.message,
                  name: error?.name
                })
                setPlayingId(null)
              }}
            >
              <source src={template.preview.mp3} type="audio/mpeg" />
              <source src={template.preview.ogg} type="audio/ogg; codecs=vorbis" />
              <source src={template.preview.wav} type="audio/wav" />
              <p>Your browser does not support the audio element.</p>
            </audio>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 