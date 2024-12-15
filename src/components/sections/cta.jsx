"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp } from "@/lib/utils/animations"

export function CTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Your Ideas?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join thousands of creators and businesses using our AI platform to bring their ideas to life.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="gap-2">
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 