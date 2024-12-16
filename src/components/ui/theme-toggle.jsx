"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

const themes = [
  {
    name: "light",
    icon: Sun,
    gradient: "from-yellow-400/80 via-orange-400/80 to-red-400/80",
    label: "Light Mode"
  },
  {
    name: "dark",
    icon: Moon,
    gradient: "from-indigo-400/80 via-purple-400/80 to-pink-400/80",
    label: "Dark Mode"
  },
  {
    name: "system",
    icon: Monitor,
    gradient: "from-primary/60 via-primary/40 to-primary/20",
    label: "System Theme"
  }
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.div 
      className="flex items-center gap-0.5 p-1 rounded-full bg-secondary/50 border border-border/40"
      initial={false}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      {themes.map(({ name, icon: Icon, gradient, label }) => (
        <motion.button
          key={name}
          onClick={() => setTheme(name)}
          className="relative p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          <Icon className={`h-4 w-4 relative z-10 transition-colors duration-200 ${
            theme === name 
              ? "text-white" 
              : "text-muted-foreground/70 hover:text-foreground/90"
          }`} />
          
          <AnimatePresence mode="wait">
            {theme === name && (
              <motion.div
                layoutId="theme-active"
                className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full opacity-90 backdrop-blur-sm`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.2 }
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 0.15 }
                }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </motion.div>
  )
}