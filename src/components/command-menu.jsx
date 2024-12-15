"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Command, Search, X } from "lucide-react"

export function CommandMenu({ isOpen, onClose }) {
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onClose?.()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-24 z-50 mx-auto max-w-2xl overflow-hidden rounded-2xl border bg-background shadow-lg"
          >
            <div className="flex items-center gap-2 border-b p-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                placeholder="Type a command or search..."
              />
              <div className="flex items-center gap-2">
                <kbd className="rounded bg-muted px-2 py-1 text-xs">⌘</kbd>
                <kbd className="rounded bg-muted px-2 py-1 text-xs">K</kbd>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">No results found.</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 