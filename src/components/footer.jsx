"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Logo } from "./ui/logo"
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Github,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Heart,
  Zap,
  Lock,
  Users,
  X,
  Check
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
}

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "AI Models", href: "/models" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" }
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press Kit", href: "/press" },
    { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" }
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" },
    { name: "Cookies", href: "/cookies" }
  ]
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "GitHub", icon: Github, href: "https://github.com" }
]

const contactInfo = {
  email: "hello@qubiq.ai",
  phone: "+1 (555) 123-4567",
  address: "123 AI Street, Tech Valley, CA 94103"
}

function FooterLink({ href, children }) {
  return (
    <Link href={href}>
      <motion.span
        className="group relative inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        whileHover={{ x: 4 }}
      >
        {children}
        <motion.span
          className="inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ArrowUpRight className="w-3 h-3" />
        </motion.span>
      </motion.span>
    </Link>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setStatus("success")
    setEmail("")
    
    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-2xl" />
      <div className="relative p-6 rounded-2xl border border-border/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-2">Join Our AI Community</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Get weekly insights on AI advancements, exclusive beta access, and special offers.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={cn(
                "w-full px-4 py-3 text-sm rounded-xl",
                "bg-background/50 border border-border/50",
                "focus:border-primary focus:ring-1 focus:ring-primary",
                "outline-none transition-all duration-200",
                "placeholder:text-muted-foreground/70"
              )}
              disabled={status === "loading" || status === "success"}
            />
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              animate={status === "loading" ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              {status === "loading" && (
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full" />
              )}
            </motion.div>
          </div>

          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full px-4 py-3 text-sm font-medium rounded-xl",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "relative overflow-hidden"
            )}
            disabled={status === "loading" || status === "success"}
          >
            {status === "success" ? (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Subscribed!
              </motion.span>
            ) : (
              <>
                <span className="relative z-10">Subscribe Now</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </>
            )}
          </motion.button>
        </form>

        {/* Benefits */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { icon: Zap, text: "Weekly AI Updates" },
            { icon: Lock, text: "No Spam Promise" },
            { icon: Users, text: "Join 10k+ Members" },
            { icon: X, text: "Unsubscribe Anytime" }
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
              <benefit.icon className="w-3 h-3 text-primary" />
              {benefit.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Column 1: Logo & Social */}
          <div className="col-span-2 lg:col-span-1">
            <Logo className="h-8 w-auto" />
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering the future with AI-driven solutions for modern businesses.
            </p>
            
            {/* Enhanced Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-full",
                    "bg-secondary/50 hover:bg-secondary",
                    "text-muted-foreground hover:text-foreground",
                    "transition-all duration-200"
                  )}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Enhanced Contact Info */}
            <div className="mt-8 space-y-3">
              <motion.a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                whileHover={{ x: 4 }}
              >
                <Mail className="w-4 h-4" />
                {contactInfo.email}
              </motion.a>
              <motion.a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                whileHover={{ x: 4 }}
              >
                <Phone className="w-4 h-4" />
                {contactInfo.phone}
              </motion.a>
              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground"
                whileHover={{ x: 4 }}
              >
                <MapPin className="w-4 h-4" />
                {contactInfo.address}
              </motion.div>
            </div>
          </div>

          {/* Column 2-3: Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Enhanced Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <NewsletterSection />
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Qubiq.AI. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <FooterLink key={link.name} href={link.href}>
                  {link.name}
                </FooterLink>
              ))}
            </div>
            <motion.div 
              className="text-sm text-muted-foreground flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Qubiq Team
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
} 