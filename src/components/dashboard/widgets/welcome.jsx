"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Zap, History, Settings, Plus } from "lucide-react"

export function DashboardWelcome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl border bg-gradient-to-br from-primary/10 via-transparent to-primary/10 p-6 sm:p-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, John! 👋
            </h1>
            <p className="mt-2 text-muted-foreground">
              You have 3 pending tasks and 5 new AI generations today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-sm bg-primary/10 rounded-full text-primary">
              Pro Plan
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            New Project
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-secondary/50 px-4 py-2.5 text-sm font-medium hover:bg-secondary/80 transition-colors">
            <Zap className="h-4 w-4" />
            Quick Gen
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-secondary/80 transition-colors">
            <History className="h-4 w-4" />
            History
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-secondary/80 transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Enhanced Background Elements */}
      <div className="absolute right-0 top-0 h-full w-1/3">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20">
          <div className="relative">
            <Sparkles className="h-24 w-24 text-primary animate-pulse" />
            <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  )
} 