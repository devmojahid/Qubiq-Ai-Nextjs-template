"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSettings } from "./use-settings"

export function SettingItem({ setting }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const { settings, updateSetting } = useSettings()

  const handleChange = (value) => {
    updateSetting(setting.id, value)
  }

  const renderSettingControl = () => {
    switch (setting.type) {
      case "theme-selector":
        return (
          <div className="flex flex-wrap gap-2">
            {setting.options.map((option) => {
              const isSelected = settings.theme === option.id
              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleChange(option.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2",
                    "border transition-all duration-200",
                    "group relative",
                    isSelected ? [
                      "border-primary bg-primary/10",
                      "text-primary font-medium"
                    ] : [
                      "border-border/50 bg-background/50",
                      "hover:bg-secondary/80 hover:border-primary/20"
                    ]
                  )}
                >
                  <option.icon className={cn(
                    "h-4 w-4 transition-colors",
                    isSelected ? "text-primary" : "group-hover:text-primary"
                  )} />
                  <span className="text-sm">{option.label}</span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1 -top-1 rounded-full bg-primary p-1"
                    >
                      <Check className="h-3 w-3 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>
        )
      
      case "toggle":
        return (
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={settings[setting.id]}
              onChange={(e) => handleChange(e.target.checked)}
              className="peer sr-only"
            />
            <div className={cn(
              "h-6 w-11 rounded-full",
              "bg-gray-200 dark:bg-gray-700",
              "peer-focus:ring-2 peer-focus:ring-primary/20",
              "peer-checked:bg-primary",
              "after:absolute after:left-[2px] after:top-[2px]",
              "after:h-5 after:w-5 after:rounded-full",
              "after:border after:border-gray-300 after:bg-white",
              "after:transition-all after:content-['']",
              "peer-checked:after:translate-x-full",
              "peer-checked:after:border-white",
              "dark:border-gray-600",
              "dark:peer-checked:after:border-gray-700",
              "hover:bg-gray-300 dark:hover:bg-gray-600",
              "transition-colors duration-200"
            )}></div>
          </label>
        )
      
      case "slider":
        return (
          <div className="w-full max-w-xs space-y-2">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={setting.min}
                max={setting.max}
                value={settings[setting.id]}
                onChange={(e) => handleChange(Number(e.target.value))}
                className={cn(
                  "w-full h-2 rounded-lg appearance-none cursor-pointer",
                  "bg-gray-200 dark:bg-gray-700",
                  "accent-primary",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20",
                  "[&::-webkit-slider-thumb]:appearance-none",
                  "[&::-webkit-slider-thumb]:h-4",
                  "[&::-webkit-slider-thumb]:w-4",
                  "[&::-webkit-slider-thumb]:rounded-full",
                  "[&::-webkit-slider-thumb]:bg-primary",
                  "[&::-webkit-slider-thumb]:transition-all",
                  "hover:[&::-webkit-slider-thumb]:scale-110"
                )}
              />
              <span className="w-12 text-sm font-medium">
                {settings[setting.id]}px
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{setting.min}px</span>
              <span>{setting.max}px</span>
            </div>
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between",
        "rounded-xl border p-4 gap-4",
        "hover:bg-secondary/5 transition-colors",
        "group relative"
      )}
    >
      <div className="space-y-0.5">
        <div className="font-medium flex items-center gap-2">
          {setting.title}
          {setting.description && (
            <div 
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 bottom-full mb-2",
                      "w-48 p-2 rounded-lg text-xs",
                      "bg-foreground/90 text-background",
                      "shadow-lg backdrop-blur-sm z-50"
                    )}
                  >
                    {setting.description}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-foreground/90" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {setting.description}
        </div>
      </div>
      {renderSettingControl()}
    </motion.div>
  )
} 