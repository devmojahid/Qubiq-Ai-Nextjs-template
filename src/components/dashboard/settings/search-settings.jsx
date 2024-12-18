"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Command } from "lucide-react"
import { cn } from "@/lib/utils"

export function SearchSettings({ sections, onSelect }) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const allSettings = sections.flatMap(section => 
    section.settings.map(setting => ({
      ...setting,
      section: section.title
    }))
  )

  const filteredSettings = allSettings.filter(setting =>
    setting.title.toLowerCase().includes(query.toLowerCase()) ||
    setting.description.toLowerCase().includes(query.toLowerCase()) ||
    setting.section.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex w-full items-center gap-2 rounded-xl",
          "border border-border/50 px-4 py-2",
          "text-sm text-muted-foreground",
          "hover:border-primary/20 hover:bg-secondary/50",
          "transition-colors group"
        )}
      >
        <Search className="h-4 w-4 group-hover:text-primary transition-colors" />
        <span>Search settings...</span>
        <kbd className="ml-auto hidden rounded bg-secondary px-2 text-xs sm:inline-block">
          <Command className="h-3 w-3 inline-block mr-1" />K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "absolute top-full mt-2 w-full rounded-xl border",
                "bg-background p-2 shadow-lg",
                "z-50 max-h-[300px] overflow-y-auto"
              )}
            >
              <input
                type="text"
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={cn(
                  "w-full rounded-lg border-0 bg-transparent p-2",
                  "text-sm placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20"
                )}
                autoFocus
              />
              
              <div className="mt-2 space-y-1">
                {filteredSettings.map((setting) => (
                  <motion.button
                    key={setting.id}
                    onClick={() => {
                      onSelect(setting)
                      setIsOpen(false)
                      setQuery("")
                    }}
                    className={cn(
                      "w-full rounded-lg p-2 text-left",
                      "hover:bg-secondary/80 transition-colors"
                    )}
                    whileHover={{ x: 4 }}
                  >
                    <div className="font-medium text-sm">{setting.title}</div>
                    <div className="text-xs text-muted-foreground">
                      in {setting.section}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 