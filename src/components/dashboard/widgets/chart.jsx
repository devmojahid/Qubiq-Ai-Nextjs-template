"use client"

import { motion } from "framer-motion"
import { LineChart, BarChart3, ArrowUpRight } from "lucide-react"

export function DashboardChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Usage Analytics</h3>
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 hover:bg-secondary/80 transition-colors">
            <LineChart className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-2 hover:bg-secondary/80 transition-colors">
            <BarChart3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 h-[300px] flex items-center justify-center text-muted-foreground">
        Chart Component Here
      </div>
    </motion.div>
  )
} 