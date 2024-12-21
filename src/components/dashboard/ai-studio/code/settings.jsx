"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Settings, Sliders, Cpu, Gauge,
  Sparkles, Zap, Brain, Terminal,
  Code2, FileCode, Braces, Layout,
  Info, HelpCircle, ChevronDown,
  ChevronUp, Lightbulb, Dices,
  RefreshCcw, Maximize2, Minimize2
} from "lucide-react"
import { cn } from "@/lib/utils"

const models = [
  {
    id: "gpt-4",
    name: "GPT-4 Turbo",
    description: "Most capable model, best code quality",
    icon: Brain,
    features: ["Highest accuracy", "Complex logic", "Best practices"],
    tooltip: "Recommended for production code",
    credits: 8
  },
  {
    id: "gpt-3.5",
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient code generation",
    icon: Zap,
    features: ["Quick results", "Good quality", "Cost effective"],
    tooltip: "Great for prototypes and testing",
    credits: 2
  },
  {
    id: "codex",
    name: "Codex",
    description: "Specialized code generation",
    icon: Code2,
    features: ["Code focused", "Multiple languages", "Efficient"],
    tooltip: "Optimized for code completion",
    credits: 4
  }
]

const frameworks = {
  javascript: ["React", "Vue", "Angular", "Next.js", "Express"],
  python: ["Django", "Flask", "FastAPI", "SQLAlchemy"],
  typescript: ["Next.js", "NestJS", "Express", "Prisma"],
  html: ["TailwindCSS", "Bootstrap", "SASS", "Material UI"],
  php: ["Laravel", "Symfony", "WordPress", "CodeIgniter"]
}

const codeStyles = [
  {
    id: "modern",
    name: "Modern",
    description: "Latest syntax and patterns",
    icon: Sparkles
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional patterns",
    icon: Code2
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple",
    icon: Layout
  },
  {
    id: "robust",
    name: "Robust",
    description: "Production-ready",
    icon: Braces
  }
]

export function CodeSettings({ settings, onSettingsChange }) {
  const [activeSection, setActiveSection] = useState("model")
  const [showTooltip, setShowTooltip] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card overflow-hidden"
    >
      {/* Settings Header */}
      <div className="p-6 border-b border-border/50">
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
              <span className="font-medium text-foreground">24</span>
            </div>
          </div>
        </div>

        {/* Settings Navigation */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => setActiveSection("model")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm",
              "transition-colors",
              activeSection === "model"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Brain className="h-4 w-4" />
            Model
          </button>
          <button
            onClick={() => setActiveSection("framework")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm",
              "transition-colors",
              activeSection === "framework"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Layout className="h-4 w-4" />
            Framework
          </button>
          <button
            onClick={() => setActiveSection("style")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm",
              "transition-colors",
              activeSection === "style"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sparkles className="h-4 w-4" />
            Style
          </button>
          <button
            onClick={() => setActiveSection("advanced")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm",
              "transition-colors",
              activeSection === "advanced"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sliders className="h-4 w-4" />
            Advanced
          </button>
        </div>
      </div>

      {/* Settings Content */}
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
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Select AI Model</h4>
                  <p className="text-sm text-muted-foreground">
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

              <div className="grid gap-3">
                {models.map((model) => (
                  <motion.div
                    key={model.id}
                    className="relative"
                    onHoverStart={() => setShowTooltip(model.id)}
                    onHoverEnd={() => setShowTooltip(null)}
                  >
                    <motion.button
                      onClick={() => onSettingsChange({ ...settings, model: model.id })}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-lg text-left",
                        "border border-border/50 transition-all",
                        "hover:shadow-lg hover:shadow-primary/5",
                        settings.model === model.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "rounded-lg p-2.5",
                        "bg-gradient-to-br from-primary/10 to-primary/5"
                      )}>
                        <model.icon className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{model.name}</span>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs",
                            "bg-primary/10 text-primary"
                          )}>
                            {model.credits} credits
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {model.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {model.features.map((feature, index) => (
                            <span
                              key={index}
                              className={cn(
                                "inline-flex items-center rounded-full",
                                "px-2 py-0.5 text-xs",
                                "bg-secondary text-secondary-foreground"
                              )}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.button>

                    {/* Model Tooltip */}
                    <AnimatePresence>
                      {showTooltip === model.id && (
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
                              <p className="font-medium">{model.name}</p>
                              <p className="text-muted-foreground">
                                {model.tooltip}
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

          {/* Framework Selection */}
          {activeSection === "framework" && (
            <motion.div
              key="framework"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <h4 className="font-medium">Framework Selection</h4>
                <p className="text-sm text-muted-foreground">
                  Choose a framework for your code
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {frameworks[settings.language]?.map((framework) => (
                  <motion.button
                    key={framework}
                    onClick={() => onSettingsChange({ 
                      ...settings, 
                      framework 
                    })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "p-3 rounded-lg text-left",
                      "border border-border/50",
                      "hover:border-primary/50 transition-all",
                      settings.framework === framework && "border-primary bg-primary/5"
                    )}
                  >
                    <span className="font-medium">{framework}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Code Style */}
          {activeSection === "style" && (
            <motion.div
              key="style"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <h4 className="font-medium">Code Style</h4>
                <p className="text-sm text-muted-foreground">
                  Select your preferred coding style
                </p>
              </div>

              <div className="grid gap-3">
                {codeStyles.map((style) => (
                  <motion.button
                    key={style.id}
                    onClick={() => onSettingsChange({ 
                      ...settings, 
                      style: style.id 
                    })}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      "border border-border/50",
                      "hover:border-primary/50 transition-all",
                      settings.style === style.id && "border-primary bg-primary/5"
                    )}
                  >
                    <div className={cn(
                      "rounded-lg p-2",
                      "bg-primary/10"
                    )}>
                      <style.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{style.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {style.description}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Advanced Settings */}
          {activeSection === "advanced" && (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Temperature Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Temperature</label>
                  <span className="text-sm text-muted-foreground">
                    {settings.temperature}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    temperature: parseFloat(e.target.value)
                  })}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Focused</span>
                  <span>Creative</span>
                </div>
              </div>

              {/* Max Tokens */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Maximum Length</label>
                <select
                  value={settings.maxTokens}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    maxTokens: parseInt(e.target.value)
                  })}
                  className={cn(
                    "w-full rounded-lg px-3 py-2",
                    "bg-background border border-border/50",
                    "focus:border-primary focus:ring-1 focus:ring-primary"
                  )}
                >
                  <option value="1000">Short (~500 words)</option>
                  <option value="2000">Medium (~1000 words)</option>
                  <option value="4000">Long (~2000 words)</option>
                </select>
              </div>

              {/* Other Advanced Options */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Additional Options</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.includeComments}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        includeComments: e.target.checked
                      })}
                      className="rounded border-border/50 text-primary"
                    />
                    <span className="text-sm">Include comments</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.formatCode}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        formatCode: e.target.checked
                      })}
                      className="rounded border-border/50 text-primary"
                    />
                    <span className="text-sm">Auto-format code</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
} 