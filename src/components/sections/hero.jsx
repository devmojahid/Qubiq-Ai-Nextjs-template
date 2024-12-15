"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container relative">
        <div className="absolute top-0 right-0 -translate-y-1/2">
          <div className="w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium">v1.4.1</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            AI content generator{" "}
            <span className="text-gradient">Dashboard</span> and{" "}
            <span className="text-primary">User App</span>{" "}
            <span>React Template</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Created with Tailwind CSS and React
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary w-full sm:w-auto">
              Try it for Free
            </button>
            <button className="btn-outline w-full sm:w-auto">
              Check Out
            </button>
          </div>

          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-40 -bottom-10 z-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-card">
                <Image
                  src="/dashboard-preview-1.png"
                  alt="Dashboard Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-card">
                <Image
                  src="/dashboard-preview-2.png"
                  alt="Dashboard Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 translate-y-1/2">
          <div className="w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  )
} 