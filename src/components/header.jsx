"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Search, Command } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "./ui/theme-toggle"
import { Logo } from "./ui/logo"
import { MegaMenu } from "./header/mega-menu"
import { CommandMenu } from "./command-menu"

const navigation = [
  { 
    name: "Landing", 
    href: "/", 
    hasMega: true, 
    category: "landing",
    // isNew: true
  },
  { 
    name: "User App", 
    href: "/app", 
    hasMega: true, 
    category: "apps",
    // isBeta: true
  },
  { 
    name: "Admin", 
    href: "/admin", 
    hasMega: true, 
    category: "admin"
  },
  { 
    name: "Pages", 
    href: "/pages", 
    hasMega: true, 
    category: "pages"
  }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMega, setActiveMega] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCommandOpen, setIsCommandOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuHover = useCallback((category) => {
    if (category) {
      setHoveredItem(category)
      const timer = setTimeout(() => setActiveMega(category), 100)
      return () => clearTimeout(timer)
    }
    setHoveredItem(null)
    setActiveMega(null)
  }, [])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-xl border-b border-border/40" 
            : "bg-background/50 backdrop-blur-sm"
        }`}
      >
        <div className="container">
          <nav className="flex h-16 items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              <Logo onMouseEnter={() => handleMenuHover(null)} />
              
              {/* Enhanced Search Command */}
              <div className="hidden lg:block relative group">
                <button
                  onClick={() => setIsCommandOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg bg-secondary/20 group-hover:bg-secondary/40 transition-all duration-300"
                >
                  <Search className="w-4 h-4 transition-transform group-hover:scale-110 duration-300" />
                  <span className="transition-colors">Quick search...</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/50 text-xs ml-2">
                    <Command className="w-3 h-3" />
                    <span>K</span>
                  </div>
                </button>
                <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center">
              {navigation.map((item) => (
                <div
                  key={item.href}
                  onMouseEnter={() => handleMenuHover(item.hasMega ? item.category : null)}
                  onMouseLeave={() => handleMenuHover(null)}
                  className="relative px-1"
                >
                  <Link
                    href={item.href}
                    className={`group relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      hoveredItem === item.category
                        ? "text-primary bg-primary/5 scale-[1.02] shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </span>
                    {item.hasMega && (
                      <motion.div
                        animate={{ 
                          rotate: hoveredItem === item.category ? 180 : 0,
                          scale: hoveredItem === item.category ? 1.1 : 1
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Enhanced Theme Toggle */}
              <div className="relative group">
                <ThemeToggle />
                <div className="absolute inset-0 -z-10 rounded-lg bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/sign-in">
                  <motion.button
                    className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg group overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Sign In</span>
                    <div className="absolute inset-0 bg-secondary/30 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                  </motion.button>
                </Link>
                <Link href="/get-started">
                  <motion.button 
                    className="relative px-4 py-2 text-sm font-medium text-primary-foreground rounded-lg overflow-hidden bg-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Get Started</span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatDelay: 0.5
                      }}
                    />
                  </motion.button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 hover:bg-secondary/40 rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMega && (
            <MegaMenu 
              category={activeMega}
              onClose={() => handleMenuHover(null)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
            >
              <div className="container py-4 space-y-4">
                {/* Mobile Search */}
                <button
                  onClick={() => setIsCommandOpen(true)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>Search...</span>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-muted text-xs ml-auto">
                    <Command className="w-3 h-3" />K
                  </div>
                </button>

                {/* Mobile Navigation */}
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        {item.name}
                        {item.isNew && (
                          <span className="flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </span>
                        )}
                        {item.isBeta && (
                          <span className="text-[10px] font-medium text-primary">Beta</span>
                        )}
                      </span>
                      {item.hasMega && <ChevronDown className="h-4 w-4 opacity-50" />}
                    </Link>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-border/40 space-y-2">
                  <Link href="/sign-in" className="block">
                    <button className="w-full p-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/40 transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/get-started" className="block">
                    <button className="w-full p-2 text-sm font-medium text-primary-foreground rounded-lg bg-primary hover:bg-primary/90 transition-colors">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CommandMenu 
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  )
} 