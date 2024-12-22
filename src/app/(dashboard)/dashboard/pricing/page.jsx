"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CreditCard, Check, X, Star, 
  Zap, Shield, Award, Crown,
  Sparkles, Rocket, Lightning,
  ArrowRight, Info, HelpCircle,
  Zap as ZapIcon, Star as StarIcon,
  Crown as CrownIcon,
  Sliders
} from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for trying out our services",
    price: {
      monthly: 29,
      yearly: 290,
    },
    features: [
      "5,000 AI Credits/month",
      "Basic AI Models",
      "Standard Support",
      "1 Team Member",
      "Basic Analytics",
      "24/7 Support",
    ],
    limitations: [
      "Advanced AI Models",
      "Custom Branding",
      "API Access",
      "Priority Support"
    ],
    icon: Zap,
    popular: false
  },
  {
    id: "pro",
    name: "Professional",
    description: "For professionals and growing teams",
    price: {
      monthly: 99,
      yearly: 990,
    },
    features: [
      "25,000 AI Credits/month",
      "Advanced AI Models",
      "Priority Support",
      "5 Team Members",
      "Advanced Analytics",
      "Custom Branding",
      "API Access",
      "24/7 Priority Support",
    ],
    icon: Star,
    popular: true,
    highlight: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations and teams",
    price: {
      monthly: 299,
      yearly: 2990,
    },
    features: [
      "Unlimited AI Credits",
      "All AI Models",
      "Dedicated Support",
      "Unlimited Team Members",
      "Custom Analytics",
      "White Labeling",
      "Full API Access",
      "Custom Integration",
      "24/7 VIP Support",
      "Custom Training"
    ],
    icon: Crown,
    popular: false,
    enterprise: true
  }
]

const comparisonFeatures = [
  {
    category: "AI Generation",
    features: [
      { name: "Text Generation", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
      { name: "Image Creation", starter: "Limited", pro: "Full Access", enterprise: "Custom Models" },
      { name: "Code Generation", starter: "Basic", pro: "Advanced", enterprise: "Enterprise" },
      { name: "Chat Bot", starter: "5k msgs/mo", pro: "50k msgs/mo", enterprise: "Unlimited" },
      { name: "Audio Generation", starter: "Basic", pro: "Advanced", enterprise: "Custom" }
    ]
  },
  {
    category: "Features",
    features: [
      { name: "API Access", starter: false, pro: true, enterprise: "Custom" },
      { name: "Team Members", starter: "1", pro: "5", enterprise: "Unlimited" },
      { name: "Custom Models", starter: false, pro: "Limited", enterprise: true },
      { name: "White Labeling", starter: false, pro: false, enterprise: true },
      { name: "Priority Support", starter: false, pro: true, enterprise: "24/7 VIP" }
    ]
  }
]

const faqItems = [
  {
    question: "How do AI credits work?",
    answer: "AI credits are used for generating content. Different operations consume different amounts of credits. For example, generating a high-quality image might use more credits than generating a short text."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time. When upgrading, you'll be prorated for the remainder of your billing period. When downgrading, the new rate will apply to your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and wire transfers for enterprise customers. All payments are processed securely through Stripe."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial on our Pro plan. No credit card required. You can test all features before making a decision."
  }
]

const FeatureTooltip = ({ feature }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const descriptions = {
    "Text Generation": "Generate high-quality text content with advanced AI models",
    "Image Creation": "Create stunning images from text descriptions",
    "Code Generation": "Generate code in multiple programming languages",
    "Chat Bot": "Build interactive chatbots with natural language processing",
    "Audio Generation": "Create high-quality audio content with AI",
    "API Access": "Access our AI services through RESTful APIs",
    "Team Members": "Add team members to collaborate on projects",
    "Custom Models": "Train and customize AI models for your needs",
    "White Labeling": "Remove our branding and use your own",
    "Priority Support": "Get faster response times and dedicated support"
  };

  return (
    <div className="relative inline-flex items-center">
      <HelpCircle 
        className={cn(
          "h-4 w-4 text-muted-foreground cursor-help transition-colors",
          showTooltip && "text-primary"
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className={cn(
              "absolute left-6 z-50 w-64 p-3 rounded-lg",
              "bg-popover text-popover-foreground shadow-lg",
              "border border-border/50 text-xs"
            )}
          >
            {descriptions[feature] || feature}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="container max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Choose the perfect plan for your needs. Always know what you'll pay.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className={cn(
              "text-sm font-medium",
              !isYearly && "text-primary"
            )}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full",
                "transition-colors",
                isYearly ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 rounded-full bg-white",
                  "transform transition-transform",
                  isYearly ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className={cn(
              "text-sm font-medium inline-flex items-center gap-1.5",
              isYearly && "text-primary"
            )}>
              Yearly
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Save 20%
              </span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto mt-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className={cn(
                "relative rounded-2xl border bg-card p-6 sm:p-8",
                "transition-all duration-200",
                plan.highlight && "border-primary shadow-lg",
                selectedPlan === plan.id && "ring-2 ring-primary"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <Star className="h-3.5 w-3.5" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <plan.icon className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                {/* Plan Price */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  {isYearly && (
                    <p className="text-xs text-primary">
                      Save ${(plan.price.monthly * 12) - plan.price.yearly} yearly
                    </p>
                  )}
                </div>

                {/* Plan Features */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations && (
                    <div className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-2",
                    "rounded-xl px-4 py-2.5",
                    "text-sm font-medium",
                    "transition-all duration-200",
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  {plan.enterprise ? "Contact Sales" : "Get Started"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-5xl mx-auto px-4"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Compare Plans</h2>
            <p className="text-muted-foreground">Detailed comparison of all features</p>
          </div>

          <div className="overflow-x-auto rounded-xl border bg-card">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 min-w-[200px] bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-primary" />
                      <span>Features</span>
                    </div>
                  </th>
                  <th className="p-4 text-center min-w-[140px] bg-muted/20">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <ZapIcon className="h-4 w-4 text-primary" />
                        <span>Starter</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${isYearly ? "290" : "29"}/{isYearly ? "year" : "month"}
                      </div>
                    </div>
                  </th>
                  <th className="p-4 text-center min-w-[140px] bg-primary/5 relative">
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        <StarIcon className="h-3.5 w-3.5" />
                        Most Popular
                      </span>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="flex items-center justify-center gap-2">
                        <StarIcon className="h-4 w-4 text-primary" />
                        <span>Professional</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${isYearly ? "990" : "99"}/{isYearly ? "year" : "month"}
                      </div>
                    </div>
                  </th>
                  <th className="p-4 text-center min-w-[140px] bg-muted/20">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <CrownIcon className="h-4 w-4 text-primary" />
                        <span>Enterprise</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Custom Pricing
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category, categoryIndex) => (
                  <React.Fragment key={`category-${categoryIndex}`}>
                    <tr className="border-t border-b border-border/50 bg-muted/30">
                      <td colSpan={4} className="p-4">
                        <div className="flex items-center gap-2">
                          {categoryIndex === 0 ? (
                            <Sparkles className="h-4 w-4 text-primary" />
                          ) : (
                            <Shield className="h-4 w-4 text-primary" />
                          )}
                          <span className="font-medium">{category.category}</span>
                        </div>
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <motion.tr 
                        key={`feature-${categoryIndex}-${featureIndex}`}
                        whileHover={{ backgroundColor: "rgba(var(--muted), 0.3)" }}
                        className={cn(
                          "border-b border-border/50 transition-colors",
                          featureIndex % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                        )}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <FeatureTooltip feature={feature.name} />
                            <span>{feature.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          {typeof feature.starter === 'boolean' ? (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="flex justify-center"
                            >
                              {feature.starter ? (
                                <div className="p-1 rounded-full bg-primary/10">
                                  <Check className="h-4 w-4 text-primary" />
                                </div>
                              ) : (
                                <div className="p-1 rounded-full bg-muted/20">
                                  <X className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </motion.div>
                          ) : (
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className={cn(
                                "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
                                "bg-secondary/50 hover:bg-secondary/80 transition-colors"
                              )}
                            >
                              {feature.starter}
                            </motion.span>
                          )}
                        </td>
                        <td className="p-4 text-center bg-primary/5">
                          {typeof feature.pro === 'boolean' ? (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="flex justify-center"
                            >
                              {feature.pro ? (
                                <div className="p-1 rounded-full bg-primary/10">
                                  <Check className="h-4 w-4 text-primary" />
                                </div>
                              ) : (
                                <div className="p-1 rounded-full bg-muted/20">
                                  <X className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </motion.div>
                          ) : (
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className={cn(
                                "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
                                "bg-primary/20 hover:bg-primary/30 transition-colors"
                              )}
                            >
                              {feature.pro}
                            </motion.span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof feature.enterprise === 'boolean' ? (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="flex justify-center"
                            >
                              {feature.enterprise ? (
                                <div className="p-1 rounded-full bg-primary/10">
                                  <Check className="h-4 w-4 text-primary" />
                                </div>
                              ) : (
                                <div className="p-1 rounded-full bg-muted/20">
                                  <X className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </motion.div>
                          ) : (
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className={cn(
                                "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
                                "bg-secondary/50 hover:bg-secondary/80 transition-colors"
                              )}
                            >
                              {feature.enterprise}
                            </motion.span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 max-w-3xl mx-auto px-4"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="rounded-xl border bg-card p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center max-w-2xl mx-auto px-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of satisfied customers using our AI tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition-all"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3 font-medium hover:bg-secondary/80 transition-all"
            >
              Contact Sales
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        {isMobileView && (
          <div className="mt-2 flex justify-center items-center gap-2 text-xs text-muted-foreground">
            <ArrowRight className="h-3 w-3 animate-pulse" />
            <span>Scroll to see more</span>
          </div>
        )}
      </div>
    </div>
  )
} 