import { Geist } from "next/font/google";
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Testimonials } from "@/components/sections/testimonials"
import { Pricing } from "@/components/sections/pricing"
import { CTA } from "@/components/sections/cta"
import { AIShowcase } from "@/components/sections/ai-showcase"
import { SuccessStories } from "@/components/sections/success-stories"
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default function Home() {
  return (
    <>
      <div className={`${geist.variable} min-h-screen bg-background antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
              <Hero />
              <Features />
              <Testimonials />
              <AIShowcase />
              <SuccessStories />
              <Pricing />
              <CTA />
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </div>
    </>
  )
} 