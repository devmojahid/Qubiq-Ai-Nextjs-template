"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function SectionHeader({ icon: Icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative space-y-2 pb-6"
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "rounded-xl p-2.5",
          "bg-gradient-to-br from-primary/10 to-transparent"
        )}>
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        {description}
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-border via-border/80 to-transparent" />
    </motion.div>
  )
} 