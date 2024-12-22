"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  SpeakerWave, Briefcase, MessageSquare, 
  Video, Book, Newspaper, Mic, Radio,
  Presentation, Award, Rocket, Heart,
  Headphones, Music, Podcast, Sparkles,
  Layers, Palette, Camera, Megaphone,
  GraduationCap, Users, Globe, Play,
  Volume2, Clock, FileAudio, AudioWaveform
} from "lucide-react"
import { cn } from "@/lib/utils"

const templates = [
  {
    id: "marketing",
    category: "Business",
    title: "Marketing Video",
    description: "Professional voice-over for marketing videos",
    duration: "1-3 min",
    icon: Megaphone,
    preview: "/previews/marketing.mp3",
    settings: {
      voice: "alloy",
      model: "tts-1-hd",
      style: "professional",
      speed: 1.1,
      emphasis: 1.2
    },
    example: "Discover the future of innovation with our groundbreaking solution..."
  },
  {
    id: "podcast",
    category: "Media",
    title: "Podcast Intro",
    description: "Engaging podcast introduction and outro",
    duration: "30-60 sec",
    icon: Podcast,
    preview: "/previews/podcast.mp3",
    settings: {
      voice: "echo",
      model: "tts-1-hd",
      style: "friendly",
      speed: 1.0,
      emphasis: 1.1
    },
    example: "Welcome to [Podcast Name], where we explore fascinating stories..."
  },
  {
    id: "education",
    category: "Learning",
    title: "Educational Content",
    description: "Clear and engaging educational narration",
    duration: "2-5 min",
    icon: GraduationCap,
    preview: "/previews/education.mp3",
    settings: {
      voice: "nova",
      model: "tts-1-hd",
      style: "natural",
      speed: 0.95,
      emphasis: 1.0
    },
    example: "Today, we'll learn about an important concept in [Subject]..."
  },
  {
    id: "audiobook",
    category: "Entertainment",
    title: "Audiobook",
    description: "Expressive narration for stories and books",
    duration: "5-30 min",
    icon: Book,
    preview: "/previews/audiobook.mp3",
    settings: {
      voice: "onyx",
      model: "tts-1-hd",
      style: "natural",
      speed: 0.9,
      emphasis: 1.1
    },
    example: "Chapter One: The journey begins on a misty morning..."
  },
  {
    id: "presentation",
    category: "Business",
    title: "Presentation",
    description: "Professional narration for presentations",
    duration: "2-10 min",
    icon: Presentation,
    preview: "/previews/presentation.mp3",
    settings: {
      voice: "fable",
      model: "tts-1-hd",
      style: "professional",
      speed: 1.0,
      emphasis: 1.1
    },
    example: "In this presentation, we'll discuss the key findings..."
  },
  {
    id: "commercial",
    category: "Advertising",
    title: "Commercial",
    description: "Dynamic voice-over for advertisements",
    duration: "15-60 sec",
    icon: Radio,
    preview: "/previews/commercial.mp3",
    settings: {
      voice: "shimmer",
      model: "tts-1-hd",
      style: "friendly",
      speed: 1.1,
      emphasis: 1.3
    },
    example: "Introducing the revolutionary product that will change..."
  }
]

const categories = [
  { id: "all", label: "All Templates", icon: Sparkles },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "media", label: "Media", icon: Radio },
  { id: "learning", label: "Learning", icon: Book },
  { id: "entertainment", label: "Entertainment", icon: Music },
  { id: "advertising", label: "Advertising", icon: Megaphone }
]

const loadAudioWithFallback = async (template) => {
  const formats = [
    { url: template.preview, type: 'audio/mpeg' },
    { url: template.preview.replace('.mp3', '.wav'), type: 'audio/wav' },
    { url: template.preview.replace('.mp3', '.ogg'), type: 'audio/ogg' }
  ]

  for (const format of formats) {
    try {
      const audio = new Audio()
      audio.preload = 'metadata'
      
      // Create a promise to handle audio loading
      const canPlay = new Promise((resolve, reject) => {
        audio.oncanplay = resolve
        audio.onerror = reject
      })

      audio.src = format.url
      await canPlay
      return audio
    } catch (error) {
      console.warn(`Failed to load ${format.type}:`, error)
      continue // Try next format
    }
  }
  
  throw new Error('No supported audio format found')
}

export function TextToSpeechTemplates({ 
  selectedTemplate, 
  onSelectTemplate,
  settings
}) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredTemplate, setHoveredTemplate] = useState(null)
  const [currentPreview, setCurrentPreview] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef(null)

  const filteredTemplates = templates.filter(template => 
    selectedCategory === "all" || template.category.toLowerCase() === selectedCategory
  )

  const handlePreview = async (template) => {
    if (currentPreview === template.id) {
      audioRef.current?.pause()
      setCurrentPreview(null)
      setIsPlaying(false)
      return
    }

    try {
      setIsLoading(true)
      const audio = await loadAudioWithFallback(template)
      
      audio.onended = () => {
        setCurrentPreview(null)
        setIsPlaying(false)
      }

      audio.onerror = (error) => {
        console.error('Audio playback error:', error)
        setCurrentPreview(null)
        setIsPlaying(false)
        // Show error message to user
      }

      await audio.play()
      audioRef.current = audio
      setCurrentPreview(template.id)
      setIsPlaying(true)
    } catch (error) {
      console.error('Template preview failed:', error)
      // Show error message to user
    } finally {
      setIsLoading(false)
    }
  }

  // Add smoother animations
  const templateVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  const handleTemplateSelect = (template) => {
    if (!template) return;
    
    onSelectTemplate({
      ...template,
      text: template.example || '',
      settings: {
        ...settings,
        ...template.settings
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2",
              "whitespace-nowrap transition-all duration-200",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/80 hover:bg-secondary"
            )}
          >
            <category.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{category.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            onClick={() => handleTemplateSelect(template)}
            className={cn(
              "group relative rounded-xl border bg-card p-4",
              "cursor-pointer transition-colors duration-200",
              selectedTemplate?.id === template.id 
                ? "border-primary ring-1 ring-primary" 
                : "hover:border-primary/50"
            )}
          >
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
              <button
                onClick={() => handlePreview(template)}
                className={cn(
                  "rounded-lg p-2",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors",
                  currentPreview === template.id && "text-primary"
                )}
              >
                {currentPreview === template.id ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm text-muted-foreground">
              {template.description}
            </p>

            {/* Example Preview */}
            <div className="mt-3 rounded-lg bg-secondary/50 p-3">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {template.example}
              </p>
            </div>

            {/* Settings Preview */}
            <AnimatePresence>
              {hoveredTemplate === template.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-3 space-y-2"
                >
                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-full bg-secondary/50 px-2 py-1 text-xs">
                      {template.settings.voice}
                    </div>
                    <div className="rounded-full bg-secondary/50 px-2 py-1 text-xs">
                      {template.settings.style}
                    </div>
                    <div className="rounded-full bg-secondary/50 px-2 py-1 text-xs">
                      {template.settings.speed}x speed
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectTemplate(template)}
                    className={cn(
                      "w-full rounded-lg bg-primary px-3 py-2",
                      "text-sm font-medium text-primary-foreground",
                      "hover:opacity-90 transition-opacity"
                    )}
                  >
                    Use Template
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{template.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <AudioWaveform className="h-3 w-3" />
                <span>{template.settings.model}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 