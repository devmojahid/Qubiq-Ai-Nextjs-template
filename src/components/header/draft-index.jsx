"use client"

import { useState, useCallback, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "../ui/theme-toggle"
import { Logo } from "../ui/logo"
import { MegaMenu } from "./mega-menu"
import { NavItems } from "./nav-items"
import { SearchCommand } from "./search-command"
import { ActionButtons } from "./action-buttons"

const navigation = [
  { 
    name: "Landing", 
    href: "/", 
    hasMega: true, 
    category: "landing",
    featured: true,
    badge: "New"
  },
  { 
    name: "User App", 
    href: "/app", 
    hasMega: true, 
    category: "apps",
    featured: true,
    badge: "Beta"
  },
  { 
    name: "Admin", 
    href: "/admin", 
    hasMega: true, 
    category: "admin",
    featured: true
  },
  { 
    name: "Pages", 
    href: "/pages", 
    hasMega: true, 
    category: "pages",
    featured: false
  }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMega, setActiveMega] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuHover = useCallback((category) => {
    if (category) {
      setHoveredItem(category)
      const timer = setTimeout(() => {
        setActiveMega(category)
      }, 100)
      return () => clearTimeout(timer)
    }
    setHoveredItem(null)
    setActiveMega(null)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-xl shadow-sm" 
          : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      {/* Decorative gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-border/0 via-border to-border/0" />
      
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Left section: Logo and Search */}
          <div className="flex items-center gap-8">
            <Logo onMouseEnter={() => handleMenuHover(null)} />
            <SearchCommand />
          </div>

          {/* Center section: Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <NavItems
                key={item.href}
                item={item}
                isHovered={hoveredItem === item.category}
                onHover={handleMenuHover}
              />
            ))}
          </nav>

          {/* Right section: Theme toggle and Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ActionButtons />

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden p-2 hover:bg-muted/50 rounded-xl transition-colors"
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
        </div>
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
            className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="container py-4 space-y-4">
              <SearchCommand />
              
              <div className="space-y-1">
                {navigation.map((item) => (
                  <NavItems
                    key={item.href}
                    item={item}
                    isHovered={hoveredItem === item.category}
                    onHover={handleMenuHover}
                  />
                ))}
              </div>

              <div className="pt-4 border-t border-border/50 space-y-3">
                <ActionButtons />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 