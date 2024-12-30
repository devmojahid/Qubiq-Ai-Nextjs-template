"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const dropdownContent = {
  pages: [
    { 
      name: "About Us", 
      href: "/about", 
      description: "Learn more about our company",
      icon: "🏢"
    },
    { 
      name: "Features", 
      href: "/features", 
      description: "Explore our features",
      icon: "⚡"
    },
    { 
      name: "Privacy Policy", 
      href: "/privacy", 
      description: "Learn more about our privacy policy",
      icon: "🔒"
    },
    { 
      name: "Terms & Conditions", 
      href: "/terms", 
      description: "Learn more about our terms and conditions",
      icon: "📜"
    },
    {
      name: "Pricing",
      href: "/pricing",
      description: "Learn more about our pricing",
      icon: "💰"
    },
    {
      name: "Contact Us",
      href: "/contact",
      description: "Get in touch with us",
      icon: "📞"
    }
  ]
}

export function DropdownMenu({ category, onClose, isMobile = false }) {
  const items = dropdownContent[category]
  if (!items) return null

  if (isMobile) {
    return (
      <div className="bg-secondary/30 rounded-lg mx-2 my-1 overflow-hidden">
        <div className="p-2 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 active:bg-secondary/70 transition-colors group"
            >
              <span className="text-xl opacity-80 group-hover:opacity-100">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate group-hover:text-foreground transition-colors">
                  {item.name}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/80 transition-colors">
                  {item.description}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-50 transition-all transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ type: "spring", bounce: 0.15 }}
      className="absolute top-full pt-2 min-w-[288px] z-50"
      style={{
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div className="relative">
        <div className="absolute -top-2 left-0 right-0 h-2 bg-gradient-to-b from-background/0 to-background/5" />
        <div className="relative rounded-xl border border-border/40 bg-background/95 p-2 shadow-lg backdrop-blur-xl">
          <div className="relative space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="group flex items-start gap-3 rounded-lg p-3 hover:bg-secondary/50 transition-all"
              >
                <span className="text-xl mt-0.5 opacity-80 group-hover:opacity-100">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium group-hover:text-foreground transition-colors">
                      {item.name}
                    </span>
                    <motion.div
                      initial={false}
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                    </motion.div>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/80 transition-colors">
                    {item.description}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 