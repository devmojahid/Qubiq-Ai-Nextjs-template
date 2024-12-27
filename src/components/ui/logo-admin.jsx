"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/constants"

export function Logo({ className = "", onMouseEnter }) {
  return (
    <Link 
      href="/dashboard" 
      className={`group inline-flex items-center gap-2.5 ${className}`}
      onMouseEnter={onMouseEnter}
    >
      <motion.div
        className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent opacity-20 animate-gradient" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 animate-gradient" style={{ animationDelay: '-1.5s' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
        
        {/* Logo letter with 3D effect */}
        <div className="relative flex items-center justify-center w-full h-full">
          <motion.span 
            className="text-2xl font-bold"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
          >
            <span className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              Q
            </span>
          </motion.span>
        </div>
      </motion.div>

      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.1 
        }}
      >
        <motion.span 
          className="text-xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Qubiq
        </motion.span>
        <motion.span 
          className="text-xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent ml-0.5"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          .AI
        </motion.span>
      </motion.div>

    </Link>
  )
} 