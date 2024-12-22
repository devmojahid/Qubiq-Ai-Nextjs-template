"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Bot, Sliders, Languages, Sparkles,
  MessageSquare, Zap, Brain, Gauge
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ChatSettings({ settings, onSettingsChange, isVisible }) {
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
            <h3 className="font-semibold">Chat Settings</h3>
            <p className="text-sm text-muted-foreground">
              Customize your chat experience
            </p>
          </div>

          <div className="p-4 space-y-6">
            {/* Model Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">AI Model</label>
              <div className="grid grid-cols-2 gap-2">
                {["gpt-4", "gpt-3.5-turbo"].map((model) => (
                  <button
                    key={model}
                    onClick={() => handleChange("model", model)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg p-3",
                      "border-2 text-sm transition-colors",
                      settings.model === model
                        ? "border-primary bg-primary/10"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <Bot className="h-4 w-4" />
                    <span>{model}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-3">
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
                onChange={(e) => handleChange("temperature", e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Precise</span>
                <span>Balanced</span>
                <span>Creative</span>
              </div>
            </div>

            {/* Tone Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Conversation Tone</label>
              <div className="grid grid-cols-2 gap-2">
                {["Professional", "Casual", "Friendly", "Technical"].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => handleChange("tone", tone)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg p-3",
                      "border-2 text-sm transition-colors",
                      settings.tone === tone
                        ? "border-primary bg-primary/10"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{tone}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className={cn(
                  "w-full rounded-lg bg-secondary/50 px-4 py-2",
                  "text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                )}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>

            {/* System Prompt */}
            <div className="space-y-3">
              <label className="text-sm font-medium">System Prompt</label>
              <textarea
                value={settings.systemPrompt}
                onChange={(e) => handleChange("systemPrompt", e.target.value)}
                placeholder="Set the AI's behavior and context..."
                rows={3}
                className={cn(
                  "w-full rounded-lg bg-secondary/50 px-4 py-2",
                  "text-sm placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20"
                )}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 