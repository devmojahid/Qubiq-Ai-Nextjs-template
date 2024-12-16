"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Sparkles, ArrowRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const glowVariants = {
  initial: { opacity: 0.5, scale: 0.8 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "linear"
    }
  }
}

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export function CTA() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/20" />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
        style={{ opacity }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/40" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="relative rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm p-8 lg:p-12 overflow-hidden"
            style={{ scale, opacity }}
          >
            {/* Enhanced Background Glow Effect */}
            <motion.div
              className="absolute -inset-40 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-full blur-3xl"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />

            {/* Enhanced Floating Icons */}
            <motion.div 
              className="absolute top-4 right-4 text-primary/20"
              variants={floatVariants}
              initial="initial"
              animate="animate"
            >
              <Sparkles className="h-24 w-24 filter blur-[1px]" />
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-full blur-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>

            <motion.div 
              className="absolute bottom-4 left-4 text-primary/10"
              variants={floatVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "1s" }}
            >
              <Zap className="h-20 w-20 filter blur-[1px]" />
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-full blur-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* Enhanced Content */}
            <div className="relative space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-4 text-center">
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>AI-Powered Platform</span>
                  </motion.div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                    Ready to transform your workflow with{" "}
                    <span className="relative">
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                        AI power
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-primary/20 blur-xl"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </span>
                    ?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Join thousands of professionals who are already leveraging our AI platform
                    to enhance their productivity and creativity.
                  </p>
                </div>

                {/* Enhanced CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
                >
                  <motion.button
                    className={cn(
                      "group relative flex items-center gap-2 rounded-xl px-8 py-4",
                      "bg-primary text-primary-foreground",
                      "hover:bg-primary/90 transition-all duration-300",
                      "hover:shadow-lg hover:shadow-primary/20",
                      "text-sm font-medium overflow-hidden"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                      animate={{
                        x: ["100%", "-100%"],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10">Get Started Now</span>
                    <motion.div
                      className="relative z-10"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </motion.button>

                  <motion.button
                    className={cn(
                      "group relative flex items-center gap-2 rounded-xl px-8 py-4",
                      "bg-secondary text-foreground",
                      "hover:bg-secondary/80 transition-all duration-300",
                      "hover:shadow-lg hover:shadow-secondary/20",
                      "text-sm font-medium"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Contact Sales</span>
                    <motion.div
                      animate={{
                        rotate: [0, 180, 360],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="h-4 w-4 text-primary" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 