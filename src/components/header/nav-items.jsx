"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronDown, Star } from "lucide-react"

export function NavItems({ item, isHovered, onHover }) {
  return (
    <div
      onMouseEnter={() => onHover(item.hasMega ? item.category : null)}
      onMouseLeave={() => onHover(null)}
      className="relative"
    >
      <Link
        href={item.href}
        className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          isHovered
            ? "text-primary bg-primary/5 scale-105"
            : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
        }`}
      >
        {item.featured && (
          <Star className="w-4 h-4 text-amber-400 fill-amber-400/50" />
        )}
        <span>{item.name}</span>
        {item.badge && (
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full">
            {item.badge}
          </span>
        )}
        {item.hasMega && (
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-muted-foreground group-hover:text-foreground"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        )}

        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          layoutId={`nav-hover-${item.category}`}
        />
      </Link>
    </div>
  )
} 