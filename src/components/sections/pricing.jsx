"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Check, Sparkles, Zap, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    price: "Free",
    duration: "forever",
    features: [
      "1,000 AI generations per month",
      "Basic templates",
      "Standard support",
      "Community access",
      "Basic analytics",
      "1 user seat"
    ],
    badge: "Popular",
    icon: Sparkles,
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
  },
  {
    name: "Pro",
    description: "Ideal for professionals and growing teams",
    price: "$49",
    duration: "per month",
    features: [
      "50,000 AI generations per month",
      "Advanced templates",
      "Priority support",
      "Team collaboration",
      "Advanced analytics",
      "Custom API access",
      "Dedicated account manager",
      "Up to 10 user seats"
    ],
    badge: "Recommended",
    icon: Zap,
    gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    highlight: true
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    duration: "per month",
    features: [
      "Unlimited AI generations",
      "Custom model fine-tuning",
      "24/7 premium support",
      "Advanced team management",
      "Custom analytics dashboard",
      "Enterprise API access",
      "Dedicated success team",
      "Custom integrations",
      "Unlimited user seats"
    ],
    badge: "Enterprise",
    icon: Building2,
    gradient: "from-rose-500/20 via-pink-500/20 to-purple-500/20",
    enterprise: true
  }
]

function PricingCard({ plan, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  const Icon = plan.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Background Glow */}
      <motion.div
        className={cn(
          "absolute -inset-px rounded-3xl opacity-0 blur-xl transition-opacity duration-500",
          `bg-gradient-to-r ${plan.gradient}`,
          plan.highlight ? "group-hover:opacity-100" : "group-hover:opacity-70"
        )}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className={cn(
        "relative rounded-2xl border p-6 lg:p-8 backdrop-blur-sm transition-all duration-300",
        "bg-background/50 hover:bg-background/80",
        plan.highlight ? "border-primary/50" : "border-border",
        plan.enterprise ? "border-primary/30" : ""
      )}>
        {/* Enhanced Badge */}
        {plan.badge && (
          <motion.div
            className={cn(
              "absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-medium",
              "bg-primary text-primary-foreground",
              "flex items-center gap-1.5 shadow-lg shadow-primary/20"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -1 }}
          >
            <Icon className="h-3.5 w-3.5" />
            {plan.badge}
          </motion.div>
        )}

        {/* Plan Content */}
        <div className="space-y-2 relative">
          <motion.h3 
            className="text-2xl font-bold"
            animate={{
              color: isHovered ? "var(--primary)" : "var(--foreground)",
            }}
          >
            {plan.name}
          </motion.h3>
          <p className="text-muted-foreground">{plan.description}</p>
        </div>

        {/* Enhanced Pricing Display */}
        <motion.div 
          className="mt-6 flex items-baseline gap-1"
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {plan.price}
          </span>
          <span className="text-sm text-muted-foreground">/{plan.duration}</span>
        </motion.div>

        {/* Enhanced Features List */}
        <ul className="mt-8 space-y-3">
          {plan.features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <motion.div
                className={cn(
                  "rounded-full p-1",
                  plan.highlight || plan.enterprise 
                    ? "bg-primary/20" 
                    : "bg-primary/10"
                )}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Check className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="text-muted-foreground">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Enhanced CTA Button */}
        <motion.button
          className={cn(
            "mt-8 w-full rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300",
            "hover:shadow-lg",
            plan.highlight 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20"
              : plan.enterprise
              ? "bg-primary/10 hover:bg-primary/20 hover:shadow-primary/10"
              : "bg-secondary hover:bg-secondary/80 hover:shadow-secondary/20"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {plan.enterprise ? "Contact Sales" : "Get Started"}
        </motion.button>
      </div>
    </motion.div>
  )
}

export function Pricing() {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your AI needs. Scale as you grow.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 