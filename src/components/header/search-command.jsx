"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Command } from "lucide-react"

export function SearchCommand() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative group">
      <div className="relative flex items-center">
        <Search className={`absolute left-3 h-4 w-4 transition-colors duration-200 ${
          isFocused ? "text-primary" : "text-muted-foreground"
        }`} />
        <input 
          type="text"
          placeholder="Quick search..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-64 pl-9 pr-12 py-2 text-sm bg-muted/50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 group-hover:bg-muted/80"
        />
        <div className="absolute right-3 flex items-center gap-1">
          <Command className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">K</span>
        </div>
      </div>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 p-2 bg-background/95 backdrop-blur-xl rounded-xl border border-border shadow-lg"
          >
            <div className="text-xs text-muted-foreground p-2">
              Start typing to search...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 