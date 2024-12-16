"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Trophy, ArrowRight, BarChart, Users, 
  Zap, Target, TrendingUp, LineChart 
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Add animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
}

// Add more stories with real-world AI use cases
const stories = [
  {
    company: "TechCorp Solutions",
    logo: "/images/success-stories/techcorp.svg",
    industry: "Software Development",
    challenge: "Manual code review bottlenecks",
    solution: "AI-powered code analysis",
    results: [
      {
        label: "Productivity",
        value: "300%",
        icon: Zap,
        color: "from-blue-500 to-cyan-500"
      },
      {
        label: "Code Quality",
        value: "95%",
        icon: Target,
        color: "from-green-500 to-emerald-500"
      },
      {
        label: "Time Saved",
        value: "80%",
        icon: TrendingUp,
        color: "from-violet-500 to-purple-500"
      }
    ],
    impact: {
      monthly: "50K+",
      description: "Lines of code analyzed",
      savings: "$200K",
      period: "Annual cost savings"
    },
    quote: {
      text: "The AI-powered code analysis has transformed our development workflow completely.",
      author: "John Smith",
      role: "CTO"
    }
  },
  {
    company: "ContentAI Pro",
    logo: "/images/success-stories/contentai.svg",
    industry: "Digital Marketing",
    challenge: "Scaling content creation while maintaining quality",
    solution: "AI content generation and optimization",
    results: [
      {
        label: "Output",
        value: "10x",
        icon: Zap,
        color: "from-pink-500 to-rose-500"
      },
      {
        label: "Engagement",
        value: "85%",
        icon: Users,
        color: "from-orange-500 to-red-500"
      },
      {
        label: "ROI",
        value: "250%",
        icon: TrendingUp,
        color: "from-yellow-500 to-amber-500"
      }
    ],
    impact: {
      monthly: "1M+",
      description: "Words generated",
      savings: "$150K",
      period: "Monthly revenue increase"
    },
    quote: {
      text: "Our content team now focuses on strategy while AI handles the heavy lifting of content creation.",
      author: "Emily Chen",
      role: "Marketing Director"
    }
  },
  {
    company: "VisionAI Labs",
    logo: "/images/success-stories/visionai.svg",
    industry: "Computer Vision",
    challenge: "Complex image analysis at scale",
    solution: "AI-powered visual recognition system",
    results: [
      {
        label: "Accuracy",
        value: "99.9%",
        icon: Target,
        color: "from-violet-500 to-purple-500"
      },
      {
        label: "Speed",
        value: "100x",
        icon: Zap,
        color: "from-indigo-500 to-blue-500"
      },
      {
        label: "Scale",
        value: "1B+",
        icon: TrendingUp,
        color: "from-sky-500 to-cyan-500"
      }
    ],
    impact: {
      monthly: "5B+",
      description: "Images processed",
      savings: "$500K",
      period: "Processing costs saved"
    },
    quote: {
      text: "Our AI vision system has revolutionized how we handle visual data processing.",
      author: "Alex Rivera",
      role: "Lead Engineer"
    }
  }
]

// Add hover effect variants
const hoverVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

function StoryCard({ story, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced card with better hover effects */}
      <motion.div
        variants={hoverVariants}
        initial="initial"
        whileHover="hover"
        className={cn(
          "relative rounded-xl border bg-background p-6",
          "transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary/5",
          "hover:border-primary/20"
        )}
      >
        {/* Company Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-lg bg-secondary/50 p-2">
              <Image
                src={story.logo}
                alt={story.company}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{story.company}</h3>
              <span className="text-sm text-muted-foreground">{story.industry}</span>
            </div>
          </div>
        </div>

        {/* Challenge & Solution */}
        <div className="space-y-6 mb-8">
          <div className="grid gap-4">
            {/* Challenge */}
            <motion.div 
              className="relative overflow-hidden rounded-lg bg-secondary/30 p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-medium">The Challenge</span>
              </div>
              <p className="text-sm text-muted-foreground">{story.challenge}</p>
            </motion.div>

            {/* Solution */}
            <motion.div 
              className="relative overflow-hidden rounded-lg bg-secondary/30 p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="font-medium">Our Solution</span>
              </div>
              <p className="text-sm text-muted-foreground">{story.solution}</p>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Results Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium">Key Results</h4>
            <div className="h-px flex-1 bg-gradient-to-r from-border/0 via-border to-border/0" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {story.results.map((result, idx) => (
              <motion.div
                key={idx}
                className={cn(
                  "relative overflow-hidden rounded-lg p-4",
                  "bg-secondary/30 hover:bg-secondary/50",
                  "transition-colors duration-300"
                )}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                {/* Enhanced gradient background */}
                <div 
                  className="absolute inset-0 opacity-10 bg-gradient-to-br" 
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${result.color})`
                  }} 
                />
                
                <motion.div
                  animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <result.icon className="w-5 h-5 text-primary mb-3" />
                </motion.div>
                
                <div className="space-y-1">
                  <motion.div 
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${result.color})`
                    }}
                    animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {result.value}
                  </motion.div>
                  <div className="text-xs text-muted-foreground">
                    {result.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-lg bg-secondary/20">
            <div className="text-2xl font-bold text-primary">{story.impact.monthly}</div>
            <div className="text-xs text-muted-foreground">{story.impact.description}</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-secondary/20">
            <div className="text-2xl font-bold text-primary">{story.impact.savings}</div>
            <div className="text-xs text-muted-foreground">{story.impact.period}</div>
          </div>
        </div>

        {/* Quote */}
        <motion.blockquote 
          className="mt-8 p-4 rounded-lg bg-primary/5 border-l-2 border-primary"
          whileHover={{ x: 4 }}
        >
          <p className="text-sm italic text-muted-foreground mb-2">"{story.quote.text}"</p>
          <footer className="text-xs">
            <strong className="font-medium">{story.quote.author}</strong>
            <span className="text-muted-foreground"> — {story.quote.role}</span>
          </footer>
        </motion.blockquote>
      </motion.div>
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