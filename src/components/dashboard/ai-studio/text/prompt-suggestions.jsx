"use client"

import { motion } from "framer-motion"
import { Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

export function PromptSuggestions({ template, onSelectPrompt }) {
  if (!template?.prompts) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card/50 p-4"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Lightbulb className="h-4 w-4 text-primary" />
        Prompt Suggestions
      </div>
      <div className="flex flex-wrap gap-2">
        {template.prompts.map((prompt, index) => (
          <motion.button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm",
              "bg-secondary/50 hover:bg-secondary",
              "transition-colors"
            )}
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
} 