"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard/layout/sidebar"
import { DashboardHeader } from "@/components/dashboard/layout/header"
import { CommandMenu } from "@/components/command-menu"
import { Breadcrumb } from "@/components/dashboard/navigation/breadcrumb"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative min-h-screen bg-gradient-to-b from-background via-background/98 to-background/95">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
        
        {/* Main Layout */}
        <div className="relative flex min-h-screen">
          {/* Sidebar */}
          <DashboardSidebar 
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            isMobile={isMobile}
          />

          {/* Main Content */}
          <div className={cn(
            "flex-1 flex flex-col transition-all duration-300",
            isSidebarOpen ? "lg:pl-72" : "lg:pl-20"
          )}>
            {/* Header */}
            <DashboardHeader 
              isSidebarOpen={isSidebarOpen}
              onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
              isMobile={isMobile}
            />
            
            {/* Content Area */}
            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              {/* Breadcrumb */}
              <div className="mb-4">
                {/* <Breadcrumb /> */}
              </div>

              {/* Page Content */}
              <div className="relative space-y-4">
                {children}
              </div>
            </main>
          </div>
        </div>

        {/* Command Menu */}
        <CommandMenu />

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobile && isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
} 