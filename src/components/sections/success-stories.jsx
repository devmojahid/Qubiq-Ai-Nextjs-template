"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Trophy, ArrowRight, BarChart } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const stories = [
  {
    company: "TechCorp Solutions",
    logo: "/images/success-stories/techcorp.svg",
    industry: "Software Development",
    challenge: "Manual code review bottlenecks",
    solution: "AI-powered code analysis",
    results: {
      "Productivity Increase": "300%",
      "Bug Detection": "95%",
      "Time Saved": "20hrs/week"
    },
    image: "/images/success-stories/techcorp-dashboard.jpg",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
  },
  // Add more success stories...
]

function StoryCard({ story, index }) {
  const cardRef = useRef(null)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="relative group"
    >
      <div className="relative rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm p-6 lg:p-8 overflow-hidden">
        {/* Company Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative h-12 w-12">
            <Image
              src={story.logo}
              alt={story.company}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm text-muted-foreground">{story.industry}</span>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">{story.company}</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-primary">Challenge:</span>
                <p className="text-muted-foreground">{story.challenge}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-primary">Solution:</span>
                <p className="text-muted-foreground">{story.solution}</p>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(story.results).map(([key, value], idx) => (
              <motion.div
                key={idx}
                className="p-3 rounded-xl bg-secondary/50 text-center"
                whileHover={{ y: -2 }}
              >
                <div className="text-xl font-bold text-primary">{value}</div>
                <div className="text-xs text-muted-foreground">{key}</div>
              </motion.div>
            ))}
          </div>

          {/* Preview Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={story.image}
              alt="Dashboard Preview"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function SuccessStories() {
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
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/20" />
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
      />

      <div className="container relative">
        <motion.div
          style={{ scale, opacity }}
          className="mx-auto max-w-2xl text-center mb-16 lg:mb-24"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <Trophy className="h-4 w-4" />
            <span>Success Stories</span>
          </motion.div>
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Real Results, Real Impact
          </h2>
          <p className="text-lg text-muted-foreground">
            See how leading companies are transforming their operations with our AI solutions.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <StoryCard key={index} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 