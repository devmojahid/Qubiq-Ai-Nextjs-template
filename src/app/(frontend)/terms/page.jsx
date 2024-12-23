"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { 
  Scale, FileText, Shield, Clock,
  CheckCircle2, AlertCircle, MessageSquare,
  Mail, ArrowRight, Lock, Globe2,
  FileCheck, ScrollText, Gavel,
  Ban, CreditCard, HelpCircle
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: FileCheck,
    content: `By accessing and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.

    These terms apply to all users, visitors, and others who access or use our service.`
  },
  {
    id: "account-terms",
    title: "Account Terms",
    icon: Lock,
    content: `When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.

    You are responsible for safeguarding the password and for all activities that occur under your account.

    You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.`
  },
  {
    id: "service-rules",
    title: "Service Rules & Restrictions",
    icon: Ban,
    content: `You agree not to engage in any of the following prohibited activities:
      • Copying, distributing, or disclosing any part of the service
      • Using any automated system to access the service
      • Transmitting spam, chain letters, or other unsolicited email
      • Attempting to interfere with or compromise the system integrity
      • Collecting or tracking personal information of other users`
  },
  {
    id: "payment-terms",
    title: "Payment Terms",
    icon: CreditCard,
    content: `For paid services:
      • Fees are payable in advance and non-refundable
      • Automatic renewal unless cancelled
      • Price changes with 30 days notice
      • Taxes may apply based on your location`
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    icon: Shield,
    content: `The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

    You may not modify, reproduce, or create derivative works based on our service or its content.`
  },
  {
    id: "termination",
    title: "Termination",
    icon: Ban,
    content: `We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.

    Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service.`
  }
]

const updates = [
  {
    date: "March 1, 2024",
    changes: [
      "Updated payment processing terms",
      "Added cryptocurrency payment options",
      "Clarified service limitations"
    ]
  },
  {
    date: "January 15, 2024",
    changes: [
      "Added AI usage guidelines",
      "Updated data processing terms",
      "Enhanced user protection policies"
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

function TermsSection({ section, index }) {
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
          {section.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">
              {paragraph.trim().startsWith('•') ? (
                <ul className="list-disc pl-4">
                  {paragraph.split('•').filter(Boolean).map((item, j) => (
                    <li key={j}>{item.trim()}</li>
                  ))}
                </ul>
              ) : (
                paragraph
              )}
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

export default function TermsOfService() {
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
              <Gavel className="w-4 h-4" />
              Last Updated: March 1, 2024
            </motion.div>
            
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Terms of Service
            </motion.h1>
            
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Please read these terms carefully before using our services.
              By using our platform, you agree to these terms.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Terms Content */}
            <div className="max-w-3xl space-y-16">
              {sections.map((section, index) => (
                <TermsSection key={section.id} section={section} index={index} />
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="sticky top-24">
                <TableOfContents />

                {/* Contact Card */}
                <div className="mt-8 p-6 rounded-2xl border bg-background/50 backdrop-blur-sm space-y-4">
                  <h4 className="font-semibold">Legal Questions?</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact our legal team for any questions about these terms.
                  </p>
                  <div className="space-y-2">
                    <a
                      href="mailto:legal@company.com"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      legal@company.com
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
                Track the latest changes to our terms of service
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
                  <HelpCircle className="w-4 h-4" />
                  Need Help?
                </motion.div>
                
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Have Questions About Our Terms?
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Our legal team is here to help you understand our terms of service
                </p>

                <motion.button
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Legal Team
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