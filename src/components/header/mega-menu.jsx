"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import * as Icons from "lucide-react"
import { menuItems } from "@/lib/constants"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
}

export function MegaMenu({ category, onClose }) {
  const items = menuItems[category]
  if (!items) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 z-50"
      onMouseLeave={onClose}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/85 backdrop-blur-lg border-b border-border shadow-lg" />
      <div className="container relative py-8">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {items.map((section, idx) => {
            const SectionIcon = Icons[section.icon]
            return (
              <motion.div key={idx} variants={item} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
                    <SectionIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                </div>
                <div className="grid gap-2">
                  {section.items.map((item, itemIdx) => {
                    const ItemIcon = Icons[item.icon]
                    return (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        className="group relative p-3 rounded-xl hover:bg-muted/50 transition-all duration-300"
                      >
                        <motion.div
                          initial={false}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="grid grid-cols-[auto,1fr] gap-4"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent group-hover:from-primary/20 group-hover:via-primary/10 transition-colors">
                            <ItemIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
} 