"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerChildren } from "@/lib/utils/animations"

const plans = [
  {
    name: "Starter",
    price: "29",
    description: "Perfect for individuals and small projects",
    features: [
      "1,000 AI generations per month",
      "Basic text and code generation",
      "Standard image resolution",
      "Email support",
      "1 user"
    ]
  },
  {
    name: "Pro",
    price: "99",
    description: "Ideal for professionals and growing teams",
    features: [
      "10,000 AI generations per month",
      "Advanced text and code generation",
      "High-resolution images",
      "Priority support",
      "5 team members"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "299",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited AI generations",
      "Custom AI model training",
      "4K image resolution",
      "24/7 dedicated support",
      "Unlimited team members"
    ]
  }
]

export function Pricing() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Choose the perfect plan for your needs. All plans include our core AI features.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              className={`relative rounded-2xl border bg-card p-8 shadow-lg ${
                plan.popular ? "border-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0">
                  <div className="mx-auto w-fit rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-muted-foreground">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                variant={plan.popular ? "default" : "outline"}
                className="w-full"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 