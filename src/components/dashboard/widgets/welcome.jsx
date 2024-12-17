"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

export function DashboardWelcome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl border bg-gradient-to-br from-primary/10 via-transparent to-primary/10 p-6 overflow-hidden"
    >
      <div className="relative z-10">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, John! 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here's what's happening with your AI projects today.
        </p>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Sparkles className="h-4 w-4" />
            New Project
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors">
            View Reports
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute right-0 top-0 h-full w-1/3">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <Sparkles className="h-24 w-24 text-primary/20" />
        </div>
      </div>
    </motion.div>
  )
} 