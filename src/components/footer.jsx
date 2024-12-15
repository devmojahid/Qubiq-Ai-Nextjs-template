"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { navigation, siteConfig } from "@/lib/constants"
import { Twitter, Github, Linkedin, MessageCircle, Mail, ExternalLink } from "lucide-react"
import { Logo } from "./ui/logo"

const socialIcons = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  discord: MessageCircle,
  email: Mail,
  website: ExternalLink
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
      
      {/* Content */}
      <div className="container relative py-12 md:py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {/* Brand Section */}
          <motion.div variants={item} className="col-span-2 md:col-span-1">
            <Logo />
            
            <p className="mt-4 text-sm text-muted-foreground/90 max-w-xs leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {Object.entries(navigation.social).map(([name, href]) => {
                const Icon = socialIcons[name]
                return (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="sr-only">{name}</span>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Navigation Sections */}
          {Object.entries(navigation.footer).map(([title, items]) => (
            <motion.div variants={item} key={title} className="flex flex-col gap-4">
              <h3 className="font-semibold capitalize text-foreground/80">
                {title}
              </h3>
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {navigation.footer.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
    </footer>
  )
} 