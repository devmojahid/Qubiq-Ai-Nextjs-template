"use client"

import { motion } from "framer-motion"
import { Sliders, Sparkles, Zap, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

export function GenerationSettings({ settings, onSettingsChange, isVisible, isMobile, onClose }) {
  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  return (
    <motion.div
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className={cn(
        "rounded-xl border bg-card overflow-hidden",
        "transition-all duration-200",
        isMobile ? "h-[calc(100vh-16rem)] overflow-y-auto" : ""
      )}
    >
      <div className="border-b p-3 sm:p-4">
        <h3 className="font-medium sm:font-semibold flex items-center gap-2 text-sm sm:text-base">
          <Sliders className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          Generation Settings
        </h3>
      </div>

      <div className="p-3 sm:p-4 space-y-4">
        {/* Model Selection */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Model</label>
          <div className="grid grid-cols-2 gap-2">
            {["gpt-4", "gpt-3.5"].map((model) => (
              <button
                key={model}
                onClick={() => handleSettingChange("model", model)}
                className={cn(
                  "flex items-center gap-2 p-2 sm:p-2.5 rounded-lg text-xs sm:text-sm",
                  "transition-colors duration-200",
                  settings.model === model
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 hover:bg-secondary"
                )}
              >
                <Cpu className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {model}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-medium">Temperature</label>
            <span className="text-xs text-muted-foreground">
              {settings.temperature.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            step={0.1}
            value={settings.temperature}
            onChange={(e) => handleSettingChange("temperature", parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Max Tokens Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-medium">Maximum Length</label>
            <span className="text-xs text-muted-foreground">
              {settings.maxTokens} tokens
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={4000}
            step={100}
            value={settings.maxTokens}
            onChange={(e) => handleSettingChange("maxTokens", parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>

        {/* Top P Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-medium">Top P</label>
            <span className="text-xs text-muted-foreground">
              {settings.topP.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={settings.topP}
            onChange={(e) => handleSettingChange("topP", parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span>Focused</span>
            <span>Diverse</span>
          </div>
        </div>

        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={onClose}
            className={cn(
              "w-full mt-4 inline-flex items-center justify-center gap-2",
              "bg-primary text-primary-foreground",
              "px-4 py-2 rounded-lg text-sm font-medium",
              "transition-colors hover:bg-primary/90"
            )}
          >
            Apply Settings
          </button>
        )}
      </div>
    </motion.div>
  )
} 