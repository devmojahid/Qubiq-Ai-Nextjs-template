import { Hero } from "@/components/marketing/sections/hero"
import { Features } from "@/components/marketing/sections/features"
import { Testimonials } from "@/components/marketing/sections/testimonials"
import { Pricing } from "@/components/marketing/sections/pricing"
import { CTA } from "@/components/marketing/sections/cta"
import { AIShowcase } from "@/components/marketing/sections/ai-showcase"
import { SuccessStories } from "@/components/marketing/sections/success-stories"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <AIShowcase />
      <SuccessStories />
      <Pricing />
      <CTA />
    </>
  )
} 