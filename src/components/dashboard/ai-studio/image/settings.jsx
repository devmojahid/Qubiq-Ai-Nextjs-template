"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Settings, Sliders, Square, Grid,
  Layers, Wand2, Maximize2, Minimize2,
  Cpu, Gauge, Sparkles, Zap, Brain,
  Fingerprint, Lightbulb, Palette,
  MonitorPlay, Image as ImageIcon,
  Info, HelpCircle, ChevronDown,
  Clock, Dices, Crown, X
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ImageSettings({ settings, onSettingsChange, isVisible, isMobile, onClose }) {
  const [activeSection, setActiveSection] = useState("model")
  const [showTooltip, setShowTooltip] = useState(null)

  const models = [
    { 
      id: "stable-diffusion-xl",
      name: "Stable Diffusion XL",
      description: "Latest model, best quality",
      icon: Sparkles,
      features: ["Highest quality", "Best details", "Slower generation"],
      tooltip: "Best for professional and high-quality image generation",
      credits: 2
    },
    { 
      id: "stable-diffusion-2.1",
      name: "Stable Diffusion 2.1",
      description: "Fast, efficient generation",
      icon: Zap,
      features: ["Faster generation", "Good quality", "Memory efficient"],
      tooltip: "Great for quick iterations and testing",
      credits: 1
    },
    { 
      id: "deepfloyd-if",
      name: "DeepFloyd IF",
      description: "Advanced image fidelity",
      icon: Brain,
      features: ["High fidelity", "Complex scenes", "Artistic quality"],
      tooltip: "Specialized in artistic and complex compositions",
      credits: 3
    }
  ]

  const dimensions = [
    { 
      width: 1024, 
      height: 1024, 
      label: "Square 1:1", 
      icon: Square,
      description: "Perfect for social media posts",
      tooltip: "Recommended for Instagram and profile pictures"
    },
    { 
      width: 1024, 
      height: 768, 
      label: "Landscape 4:3", 
      icon: MonitorPlay,
      description: "Classic landscape format",
      tooltip: "Great for desktop wallpapers and presentations"
    },
    { 
      width: 768, 
      height: 1024, 
      label: "Portrait 3:4", 
      icon: ImageIcon,
      description: "Vertical composition",
      tooltip: "Ideal for mobile wallpapers and Pinterest"
    },
    { 
      width: 1024, 
      height: 576, 
      label: "Widescreen 16:9", 
      icon: Layers,
      description: "Cinematic format",
      tooltip: "Perfect for banner images and video thumbnails"
    }
  ]

  const samplers = [
    { 
      id: "euler_a", 
      name: "Euler Ancestral", 
      description: "Balanced quality and speed",
      tooltip: "Recommended for most use cases",
      icon: Gauge
    },
    { 
      id: "dpm++_2m", 
      name: "DPM++ 2M", 
      description: "High quality, slower",
      tooltip: "Best for detailed and complex images",
      icon: Crown
    },
    { 
      id: "ddim", 
      name: "DDIM", 
      description: "Fast, good for faces",
      tooltip: "Optimized for portrait generation",
      icon: Zap
    }
  ]

  const sections = [
    { id: "model", label: "AI Model", icon: Brain },
    { id: "dimensions", label: "Image Size", icon: Square },
    { id: "quality", label: "Quality", icon: Sliders },
    { id: "advanced", label: "Advanced", icon: Settings }
  ]

  return (
    <AnimatePresence>
      {isMobile ? (
        <AnimatePresence>
          {isVisible && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[48] lg:hidden bg-black/50 backdrop-blur-sm"
                onClick={onClose}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                className="fixed inset-x-0 bottom-0 z-[49] rounded-t-xl bg-background shadow-xl"
                style={{ maxHeight: "85vh" }}
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary" />
                    Generation Settings
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-secondary/80 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(85vh - 64px)" }}>
                  {/* Settings content */}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      ) : (
        // Desktop version
        <motion.div className="rounded-xl bg-card">
          {/* ... existing settings content ... */}
        </motion.div>
      )}
    </AnimatePresence>
  )
} 