import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Testimonials } from "@/components/sections/testimonials"
import { Pricing } from "@/components/sections/pricing"
import { CTA } from "@/components/sections/cta"
import { AIShowcase } from "@/components/sections/ai-showcase"
import { SuccessStories } from "@/components/sections/success-stories"


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