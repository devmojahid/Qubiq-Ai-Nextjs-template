"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { LogIn, Sparkles } from "lucide-react"

export function ActionButtons() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link href="/login">
        <motion.button
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-xl hover:bg-muted/50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogIn className="w-4 h-4" />
          Login
        </motion.button>
      </Link>
      
      <Link href="/get-started">
        <motion.button 
          className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Get Started</span>
          
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            animate={{ 
              x: ['-100%', '100%'],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.button>
      </Link>
    </div>
  )
} 