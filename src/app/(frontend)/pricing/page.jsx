"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Check, Sparkles, Zap, Building2, 
  ArrowRight, Shield, Users, Globe2,
  MessageSquare, Cpu, Database, Cloud,
  Lock, Clock, HelpCircle, Star
} from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    price: {
      monthly: "$0",
      yearly: "$0"
    },
    features: [
      "1,000 AI generations per month",
      "Basic templates",
      "Community support",
      "API access (100 calls/day)",
      "Basic analytics",
      "1 user seat"
    ],
    limitations: [
      "No custom models",
      "Standard response time",
      "Basic integrations"
    ],
    badge: "Popular",
    icon: Sparkles,
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    cta: "Get Started"
  },
  {
    name: "Pro",
    description: "Ideal for professionals and growing teams",
    price: {
      monthly: "$49",
      yearly: "$470"
    },
    features: [
      "50,000 AI generations per month",
      "Advanced templates",
      "Priority support",
      "API access (unlimited)",
      "Advanced analytics",
      "Custom model fine-tuning",
      "Team collaboration",
      "Advanced integrations",
      "Up to 10 user seats"
    ],
    badge: "Recommended",
    icon: Zap,
    gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    highlight: true,
    cta: "Start Free Trial"
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: {
      monthly: "Custom",
      yearly: "Custom"
    },
    features: [
      "Unlimited AI generations",
      "Custom model development",
      "24/7 premium support",
      "Dedicated account manager",
      "Custom analytics dashboard",
      "Enterprise API access",
      "Advanced security features",
      "Custom integrations",
      "Unlimited user seats",
      "SLA guarantees"
    ],
    badge: "Enterprise",
    icon: Building2,
    gradient: "from-rose-500/20 via-pink-500/20 to-purple-500/20",
    enterprise: true,
    cta: "Contact Sales"
  }
]

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and security protocols"
  },
  {
    icon: Globe2,
    title: "Global CDN",
    description: "Lightning-fast delivery worldwide"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Built for teams of all sizes"
  },
  {
    icon: Cpu,
    title: "Advanced AI Models",
    description: "Access to cutting-edge AI technology"
  },
  {
    icon: Database,
    title: "Scalable Infrastructure",
    description: "Grows with your needs"
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Seamless cloud service integration"
  }
]

const faqs = [
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and wire transfers for enterprise customers."
  },
  {
    q: "Can I change plans later?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
  },
  {
    q: "Is there a free trial?",
    a: "Yes, all paid plans come with a 14-day free trial. No credit card required."
  },
  {
    q: "What happens if I exceed my plan limits?",
    a: "We'll notify you when you're close to your limits. You can upgrade your plan or pay for additional usage."
  }
]

function PricingCard({ plan, isYearly }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Enhanced gradient background */}
      <motion.div
        className={cn(
          "absolute -inset-px rounded-3xl opacity-0 blur-xl transition-opacity duration-500",
          `bg-gradient-to-r ${plan.gradient}`,
          plan.highlight ? "group-hover:opacity-100" : "group-hover:opacity-70"
        )}
      />

      <div className={cn(
        "relative rounded-2xl border p-6 lg:p-8 backdrop-blur-sm",
        "bg-background/50 hover:bg-background/80",
        plan.highlight ? "border-primary/50" : "border-border",
        "transition-all duration-300"
      )}>
        {/* Plan Badge */}
        {plan.badge && (
          <motion.div
            className={cn(
              "absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-medium",
              "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
              "flex items-center gap-1.5"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Star className="w-3.5 h-3.5" />
            {plan.badge}
          </motion.div>
        )}

        {/* Plan Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-xl",
              plan.highlight ? "bg-primary/20" : "bg-primary/10",
              "text-primary"
            )}>
              <plan.icon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold">{plan.name}</h3>
          </div>
          <p className="text-muted-foreground">{plan.description}</p>
        </div>

        {/* Plan Pricing */}
        <div className="mt-6">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">
              {isYearly ? plan.price.yearly : plan.price.monthly}
            </span>
            {plan.price.monthly !== "Custom" && (
              <span className="text-muted-foreground mb-1">
                /{isYearly ? "year" : "month"}
              </span>
            )}
          </div>
          {isYearly && plan.price.monthly !== "Custom" && (
            <p className="mt-1 text-sm text-primary">
              Save {Math.round((1 - (parseInt(plan.price.yearly.slice(1)) / (parseInt(plan.price.monthly.slice(1)) * 12))) * 100)}% with yearly billing
            </p>
          )}
        </div>

        {/* Plan Features */}
        <div className="mt-8 space-y-4">
          <p className="text-sm font-medium">Included features:</p>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 text-sm"
              >
                <div className={cn(
                  "mt-1 p-1 rounded-full",
                  plan.highlight ? "bg-primary/20" : "bg-primary/10"
                )}>
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {plan.limitations && (
            <div className="pt-4 space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Limitations:</p>
              <ul className="space-y-3">
                {plan.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Plan CTA */}
        <motion.button
          className={cn(
            "mt-8 w-full inline-flex items-center justify-center gap-2",
            "rounded-xl px-6 py-3 text-sm font-medium",
            plan.highlight
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : plan.enterprise
              ? "bg-primary/10 hover:bg-primary/20"
              : "bg-secondary hover:bg-secondary/80",
            "transition-colors duration-200"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {plan.cta}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

function FeatureCard({ feature }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className={cn(
        "relative rounded-2xl border p-6",
        "bg-background/50 hover:bg-background/80",
        "transition-all duration-300"
      )}>
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <feature.icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const containerRef = useRef(null)
  const [isYearly, setIsYearly] = useState(true)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/20" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
          style={{ opacity }}
        />

        <div className="container relative">
          <motion.div
            style={{ scale, opacity }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
            >
              <Zap className="w-4 h-4" />
              Simple Pricing
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6"
            >
              Choose the Perfect Plan for Your{" "}
              <span className="text-primary">AI Journey</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Start with our free tier and scale as you grow. All plans include core AI
              features with flexible upgrade options.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 inline-flex items-center gap-4 rounded-full border p-1 bg-background/50"
            >
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                  !isYearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                  isYearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )}
              >
                Yearly
                <span className="ml-1 text-[10px] font-normal">(-20%)</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} isYearly={isYearly} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Cpu className="w-4 h-4" />
              Features
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Everything You Need
            </h2>
            
            <p className="text-lg text-muted-foreground">
              All plans include these powerful features to help you succeed
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Got questions? We've got answers
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border bg-background/50 backdrop-blur-sm space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{faq.q}</h3>
                    <p className="mt-2 text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="relative rounded-3xl border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 opacity-50" />
            
            <div className="relative p-8 lg:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock className="w-4 h-4" />
                  Limited Time Offer
                </motion.div>
                
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Start Your Free Trial Today
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Try any plan free for 14 days. No credit card required.
                </p>

                <motion.button
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started Now
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 