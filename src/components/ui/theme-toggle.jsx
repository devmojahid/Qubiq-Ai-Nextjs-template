"use client"

import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"

const themes = [
  { 
    name: "light", 
    icon: Sun,
    gradient: "from-yellow-400 via-orange-400 to-red-400",
    label: "Light Mode"
  },
  { 
    name: "dark", 
    icon: Moon,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    label: "Dark Mode"
  },
  { 
    name: "system", 
    icon: Monitor,
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    label: "System Theme"
  }
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.div 
      className="flex items-center gap-1 p-1.5 rounded-xl bg-gradient-to-br from-muted/50 to-muted border border-border"
      initial={false}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      {themes.map(({ name, icon: Icon, gradient, label }) => (
        <motion.button
          key={name}
          onClick={() => setTheme(name)}
          className="relative p-2 rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          <Icon className={`h-4 w-4 relative z-10 transition-colors duration-200 ${
            theme === name ? "text-white" : "text-muted-foreground"
          }`} />
          <AnimatePresence>
            {theme === name && (
              <motion.div
                layoutId="theme-active"
                className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-lg`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </motion.div>
  )
} 