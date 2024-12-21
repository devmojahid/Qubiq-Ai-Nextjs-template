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
  Clock, Dices, Crown
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ImageSettings({ settings, onSettingsChange }) {
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl border bg-card overflow-hidden"
    >
      {/* Settings Header with Tabs */}
      <div className="p-6 pb-0 space-y-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Settings className="h-4 w-4 text-primary" />
            Generation Settings
          </h3>
          
          {/* Credits Info */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Credits:</span>
              <span className="font-medium text-foreground">12</span>
            </div>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex items-center gap-1">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2.5",
                "text-sm font-medium transition-all duration-200",
                activeSection === section.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
              
              {/* Active Indicator Line */}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Settings Content with Better Padding */}
      <div className="p-6 space-y-6">
        <AnimatePresence mode="wait">
          {/* Model Selection */}
          {activeSection === "model" && (
            <motion.div
              key="model"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Model Selection Header */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Select AI Model</label>
                  <p className="text-xs text-muted-foreground">
                    Choose the best model for your needs
                  </p>
                </div>
                <button
                  onClick={() => setShowTooltip("models")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>

              {/* Enhanced Model Cards */}
              <div className="grid gap-3">
                {models.map((model) => (
                  <motion.div
                    key={model.id}
                    className="relative group"
                    onHoverStart={() => setShowTooltip(model.id)}
                    onHoverEnd={() => setShowTooltip(null)}
                  >
                    <motion.button
                      onClick={() => onSettingsChange({ ...settings, model: model.id })}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        "w-full flex items-center gap-4 rounded-lg p-4 text-left",
                        "border border-border/50 transition-all duration-200",
                        "hover:shadow-lg hover:shadow-primary/5",
                        settings.model === model.id 
                          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                          : "hover:border-primary/50 hover:bg-secondary/50"
                      )}
                    >
                      {/* Model Icon */}
                      <div className={cn(
                        "rounded-lg p-2.5",
                        "bg-gradient-to-br from-primary/10 to-primary/5",
                        "ring-1 ring-primary/10"
                      )}>
                        <model.icon className="h-5 w-5 text-primary" />
                      </div>

                      {/* Model Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{model.name}</span>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs",
                            "bg-primary/10 text-primary"
                          )}>
                            {model.credits} credits
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {model.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {model.features.map((feature, index) => (
                            <span
                              key={index}
                              className={cn(
                                "inline-flex items-center rounded-full",
                                "px-2 py-0.5 text-xs",
                                "bg-secondary text-secondary-foreground",
                                "ring-1 ring-border/50"
                              )}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {settings.model === model.id && (
                        <div className="absolute -right-px -top-px h-4 w-4">
                          <div className="absolute inset-0 rounded-bl-lg bg-primary" />
                          <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-white" />
                        </div>
                      )}
                    </motion.button>

                    {/* Enhanced Tooltip */}
                    <AnimatePresence>
                      {showTooltip === model.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={cn(
                            "absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50",
                            "w-72 p-4 rounded-lg",
                            "bg-popover border shadow-xl",
                            "backdrop-blur-sm"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-primary mt-0.5" />
                            <div className="space-y-1.5">
                              <p className="font-medium">{model.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {model.tooltip}
                              </p>
                              <div className="pt-2 flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  ~30s generation
                                </span>
                                <span className="flex items-center gap-1">
                                  <Sparkles className="h-3.5 w-3.5" />
                                  {model.credits} credits/image
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Image Dimensions */}
          {activeSection === "dimensions" && (
            <motion.div
              key="dimensions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Choose Image Size</label>
                <button
                  onClick={() => setShowTooltip("dimensions")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {dimensions.map((dim) => (
                  <motion.div
                    key={`${dim.width}x${dim.height}`}
                    className="relative group"
                    onHoverStart={() => setShowTooltip(`dim-${dim.width}x${dim.height}`)}
                    onHoverEnd={() => setShowTooltip(null)}
                  >
                    <motion.button
                      onClick={() => onSettingsChange({ 
                        ...settings, 
                        width: dim.width,
                        height: dim.height 
                      })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "w-full flex flex-col items-center gap-2 rounded-lg p-4",
                        "border border-border/50 transition-all",
                        settings.width === dim.width && settings.height === dim.height
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50 hover:bg-secondary/50"
                      )}
                    >
                      <div className={cn(
                        "relative w-full",
                        "bg-gradient-to-br from-primary/10 to-primary/5",
                        "rounded-lg overflow-hidden",
                        dim.width > dim.height ? "aspect-video" : "aspect-[3/4]"
                      )}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <dim.icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{dim.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {dim.width}×{dim.height}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-center">
                        {dim.description}
                      </div>
                    </motion.button>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {showTooltip === `dim-${dim.width}x${dim.height}` && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={cn(
                            "absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50",
                            "w-64 p-3 rounded-lg",
                            "bg-popover border shadow-lg",
                            "text-sm"
                          )}
                        >
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-primary mt-0.5" />
                            <div>
                              <p className="font-medium">{dim.label}</p>
                              <p className="text-muted-foreground">
                                {dim.tooltip}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quality Settings */}
          {activeSection === "quality" && (
            <motion.div
              key="quality"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Quality Steps */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Quality (Steps)</label>
                    <p className="text-xs text-muted-foreground">
                      Higher steps = better quality, slower generation
                    </p>
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {settings.steps} steps
                  </span>
                </div>
                <div className="mt-2">
                  <input
                    type="range"
                    min="20"
                    max="50"
                    step="1"
                    value={settings.steps}
                    onChange={(e) => onSettingsChange({ 
                      ...settings, 
                      steps: parseInt(e.target.value) 
                    })}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Faster
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Better
                    </span>
                  </div>
                </div>
              </div>

              {/* Guidance Scale */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Prompt Strength</label>
                    <p className="text-xs text-muted-foreground">
                      How closely to follow your prompt
                    </p>
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {settings.guidance}
                  </span>
                </div>
                <div className="mt-2">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.1"
                    value={settings.guidance}
                    onChange={(e) => onSettingsChange({ 
                      ...settings, 
                      guidance: parseFloat(e.target.value) 
                    })}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Palette className="h-3 w-3" />
                      Creative
                    </span>
                    <span className="flex items-center gap-1">
                      <Fingerprint className="h-3 w-3" />
                      Precise
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Advanced Settings */}
          {activeSection === "advanced" && (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Sampler Selection */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Sampling Method</label>
                  <button
                    onClick={() => setShowTooltip("samplers")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 grid gap-2">
                  {samplers.map((sampler) => (
                    <motion.div
                      key={sampler.id}
                      className="relative group"
                      onHoverStart={() => setShowTooltip(sampler.id)}
                      onHoverEnd={() => setShowTooltip(null)}
                    >
                      <motion.button
                        onClick={() => onSettingsChange({ 
                          ...settings, 
                          sampler: sampler.id 
                        })}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                          "w-full flex items-center gap-3 rounded-lg p-3",
                          "border border-border/50 transition-all",
                          settings.sampler === sampler.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50 hover:bg-secondary/50"
                        )}
                      >
                        <div className={cn(
                          "rounded-lg p-2",
                          "bg-primary/10"
                        )}>
                          <sampler.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{sampler.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {sampler.description}
                          </div>
                        </div>
                      </motion.button>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {showTooltip === sampler.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className={cn(
                              "absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50",
                              "w-64 p-3 rounded-lg",
                              "bg-popover border shadow-lg",
                              "text-sm"
                            )}
                          >
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-primary mt-0.5" />
                              <div>
                                <p className="font-medium">{sampler.name}</p>
                                <p className="text-muted-foreground">
                                  {sampler.tooltip}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Random Seed Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div>
                  <label className="text-sm font-medium">Random Seed</label>
                  <p className="text-xs text-muted-foreground">
                    Enable for unique results each time
                  </p>
                </div>
                <button
                  onClick={() => onSettingsChange({ 
                    ...settings, 
                    seed: settings.seed === -1 ? Math.floor(Math.random() * 1000000) : -1 
                  })}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    settings.seed === -1
                      ? "bg-primary"
                      : "bg-border"
                  )}
                >
                  <div className={cn(
                    "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                    settings.seed === -1 && "translate-x-5"
                  )} />
                </button>
              </div>

              {/* Seed Input when not random */}
              {settings.seed !== -1 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom Seed</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={settings.seed}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        seed: parseInt(e.target.value)
                      })}
                      className={cn(
                        "flex-1 rounded-lg px-3 py-2",
                        "border border-border/50",
                        "bg-background",
                        "focus:border-primary focus:ring-1 focus:ring-primary"
                      )}
                    />
                    <button
                      onClick={() => onSettingsChange({
                        ...settings,
                        seed: Math.floor(Math.random() * 1000000)
                      })}
                      className={cn(
                        "p-2 rounded-lg",
                        "border border-border/50",
                        "hover:bg-secondary/50",
                        "transition-colors"
                      )}
                    >
                      <Dices className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use the same seed to recreate similar images
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
} 