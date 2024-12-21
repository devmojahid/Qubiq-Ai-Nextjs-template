"use client"

import { motion } from "framer-motion"
import { Settings, Zap, Clock, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

export function GenerationSettings({ settings, onSettingsChange }) {
  const models = [
    { id: "gpt-4", name: "GPT-4", description: "Most capable, slower", icon: Brain },
    { id: "gpt-3.5", name: "GPT-3.5", description: "Fast, efficient", icon: Zap }
  ]

  const tones = [
    "Professional", "Casual", "Friendly", "Formal",
    "Technical", "Creative", "Persuasive", "Informative"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl border bg-card p-6 space-y-6"
    >
      <h3 className="font-semibold flex items-center gap-2">
        <Settings className="h-4 w-4 text-primary" />
        Generation Settings
      </h3>

      <div className="space-y-6">
        {/* Model Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">AI Model</label>
          <div className="grid gap-3">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => onSettingsChange({ ...settings, model: model.id })}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-3 text-left",
                  "border border-border/50 transition-all",
                  settings.model === model.id 
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "rounded-lg p-2",
                  "bg-primary/10"
                )}>
                  <model.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {model.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Writing Tone */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Writing Tone</label>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <button
                key={tone}
                onClick={() => onSettingsChange({ ...settings, tone })}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm",
                  "border border-border/50 transition-all",
                  settings.tone === tone 
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                )}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Creativity Level</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => onSettingsChange({ 
                ...settings, 
                temperature: parseFloat(e.target.value) 
              })}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Focused</span>
              <span>Creative</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Output Length</label>
            <select
              value={settings.maxTokens}
              onChange={(e) => onSettingsChange({ 
                ...settings, 
                maxTokens: parseInt(e.target.value) 
              })}
              className={cn(
                "mt-1.5 w-full rounded-lg border border-border/50",
                "bg-background px-3 py-2 text-sm",
                "focus:border-primary focus:ring-1 focus:ring-primary"
              )}
            >
              <option value="250">Short (~250 words)</option>
              <option value="500">Medium (~500 words)</option>
              <option value="1000">Long (~1000 words)</option>
              <option value="2000">Very Long (~2000 words)</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Response Time</label>
            <div className="flex items-center gap-2 mt-1.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                ~{settings.model === "gpt-4" ? "20-30" : "5-10"} seconds
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 