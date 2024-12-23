"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { 
  Shield, Lock, Eye, FileText, 
  CheckCircle2, AlertCircle, Cookie,
  MessageSquare, Mail, ArrowRight,
  Clock, Globe2, Scale, Users
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const sections = [
  {
    id: "information-collection",
    title: "Information Collection",
    icon: Eye,
    content: `We collect information that you provide directly to us, including:
      • Personal information (name, email, etc.)
      • Usage data and analytics
      • Device and browser information
      • Cookies and tracking technologies`
  },
  {
    id: "data-usage",
    title: "How We Use Your Data",
    icon: FileText,
    content: `Your data helps us to:
      • Provide and maintain our services
      • Improve user experience
      • Send important updates
      • Analyze usage patterns
      • Prevent fraud and abuse`
  },
  {
    id: "data-sharing",
    title: "Information Sharing",
    icon: Users,
    content: `We may share your information with:
      • Service providers
      • Legal authorities when required
      • Business partners (with consent)
      • Analytics providers`
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Shield,
    content: `We implement security measures including:
      • Encryption in transit and at rest
      • Regular security audits
      • Access controls
      • Secure data centers`
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    icon: Cookie,
    content: `We use cookies for:
      • Authentication
      • Preferences
      • Analytics
      • Marketing (with consent)`
  },
  {
    id: "user-rights",
    title: "Your Rights",
    icon: Scale,
    content: `You have the right to:
      • Access your data
      • Request corrections
      • Delete your account
      • Opt-out of marketing
      • Data portability`
  }
]

const updates = [
  {
    date: "February 15, 2024",
    changes: [
      "Updated data retention policies",
      "Added GDPR compliance section",
      "Clarified cookie usage"
    ]
  },
  {
    date: "January 1, 2024",
    changes: [
      "Added CCPA compliance details",
      "Updated third-party sharing policies",
      "Enhanced security measures"
    ]
  }
]

function TableOfContents() {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-sm uppercase text-muted-foreground">
        On This Page
      </h4>
      <nav className="space-y-2">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {section.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}

function PolicySection({ section, index }) {
  return (
    <motion.div
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="scroll-mt-24"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <section.icon className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
      </div>
      <div className="pl-11">
        <div className="prose prose-slate dark:prose-invert">
          {section.content.split('\n').map((line, i) => (
            <p key={i} className="mb-4">
              {line}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function UpdateHistory() {
  return (
    <div className="space-y-6">
      {updates.map((update, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-4"
        >
          <div className="flex-none">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-medium mb-2">{update.date}</div>
            <ul className="space-y-2">
              {update.changes.map((change, idx) => (
                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-none" />
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function PrivacyPolicy() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            className="relative z-10 text-center max-w-3xl mx-auto"
            style={{ opacity, y }}
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Lock className="w-4 h-4" />
              Last Updated: February 15, 2024
            </motion.div>
            
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Privacy Policy
            </motion.h1>
            
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              We care about your privacy and are committed to protecting your personal data.
              Learn how we collect, use, and safeguard your information.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Policy Content */}
            <div className="max-w-3xl space-y-16">
              {sections.map((section, index) => (
                <PolicySection key={section.id} section={section} index={index} />
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="sticky top-24">
                <TableOfContents />

                {/* Contact Card */}
                <div className="mt-8 p-6 rounded-2xl border bg-background/50 backdrop-blur-sm space-y-4">
                  <h4 className="font-semibold">Have Questions?</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact our Data Protection Officer for any privacy-related concerns.
                  </p>
                  <div className="space-y-2">
                    <a
                      href="mailto:privacy@company.com"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      privacy@company.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Update History */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="w-4 h-4" />
                Change Log
              </motion.div>
              
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Recent Updates
              </h2>
              
              <p className="text-lg text-muted-foreground">
                Track the latest changes to our privacy policy
              </p>
            </div>

            <UpdateHistory />
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
                  <MessageSquare className="w-4 h-4" />
                  Get in Touch
                </motion.div>
                
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Still Have Questions?
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Our team is here to help you understand how we protect your privacy
                </p>

                <motion.button
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Support
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