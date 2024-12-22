"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileAudio, Briefcase, MessageSquare, 
  Video, Book, Newspaper, Mic, Radio,
  Presentation, Award, Rocket, Heart,
  Headphones, Music, Podcast, Sparkles,
  Layers, Palette, Camera, Megaphone,
  GraduationCap, Users, Globe, Play,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

const templates = [
  {
    id: "meeting",
    category: "Business",
    title: "Meeting Minutes",
    description: "Transcribe business meetings with speaker detection",
    duration: "30-60 min",
    icon: Briefcase,
    preview: "/previews/meeting-audio.mp3",
    settings: {
      model: "whisper-large-v3",
      language: "auto",
      mode: "transcribe",
      timestamps: true,
      speakerDiarization: true,
      punctuation: true,
      quality: "high"
    }
  },
  {
    id: "interview",
    category: "Professional",
    title: "Interview Recording",
    description: "Convert interviews with clear speaker separation",
    duration: "15-45 min",
    icon: Users,
    preview: "/previews/interview-audio.mp3",
    settings: {
      model: "whisper-large-v3",
      language: "auto",
      mode: "transcribe",
      timestamps: true,
      speakerDiarization: true,
      punctuation: true,
      quality: "high"
    }
  },
  {
    id: "lecture",
    category: "Education",
    title: "Lecture Notes",
    description: "Transcribe educational content with high accuracy",
    duration: "45-90 min",
    icon: GraduationCap,
    preview: "/previews/lecture-audio.mp3",
    settings: {
      model: "whisper-large-v3",
      language: "auto",
      mode: "transcribe",
      timestamps: true,
      speakerDiarization: false,
      punctuation: true,
      quality: "high"
    }
  },
  {
    id: "podcast",
    category: "Media",
    title: "Podcast Episode",
    description: "Convert podcast episodes with timestamps",
    duration: "30-120 min",
    icon: Podcast,
    preview: "/previews/podcast-audio.mp3",
    settings: {
      model: "whisper-large-v3",
      language: "auto",
      mode: "transcribe",
      timestamps: true,
      speakerDiarization: true,
      punctuation: true,
      quality: "high"
    }
  }
]

const categories = [
  { id: "all", label: "All Templates", icon: Sparkles },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "professional", label: "Professional", icon: Users },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "media", label: "Media", icon: Radio }
]

export function SpeechTemplates({ selectedTemplate, onSelectTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredTemplate, setHoveredTemplate] = useState(null)
  const [isPlaying, setIsPlaying] = useState(null)
  const [currentAudio, setCurrentAudio] = useState(null)

  const filteredTemplates = templates.filter(template => 
    selectedCategory === "all" || 
    template.category.toLowerCase() === selectedCategory.toLowerCase()
  )

  const handlePlayPreview = (template) => {
    if (currentAudio) {
      currentAudio.pause()
      if (currentAudio.src.includes(template.preview)) {
        setIsPlaying(null)
        setCurrentAudio(null)
        return
      }
    }

    const audio = new Audio(template.preview)
    audio.onended = () => {
      setIsPlaying(null)
      setCurrentAudio(null)
    }
    audio.play()
    setCurrentAudio(audio)
    setIsPlaying(template.id)
  }

  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          Speech Templates
        </h3>
        <p className="text-sm text-muted-foreground">
          Start with a pre-configured template
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
              "border bg-card cursor-pointer",
              "hover:border-primary/50 transition-all duration-200",
              selectedTemplate?.id === template.id && "ring-2 ring-primary"
            )}
          >
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
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePlayPreview(template)
                  }}
                  className={cn(
                    "rounded-lg p-2",
                    "bg-primary/10 text-primary",
                    "hover:bg-primary/20 transition-colors"
                  )}
                >
                  {isPlaying === template.id ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Headphones className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(template.settings)
                  .filter(([key, value]) => value === true)
                  .map(([key]) => (
                    <div
                      key={key}
                      className="rounded-full bg-secondary/50 px-2 py-1 text-xs"
                    >
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </div>
                  ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{template.duration}</span>
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
          </motion.div>
        ))}
      </div>
    </div>
  )
} 