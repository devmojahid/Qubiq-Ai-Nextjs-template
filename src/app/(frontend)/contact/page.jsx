"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Phone, Mail, MapPin, Clock, 
  MessageSquare, ArrowRight, Globe2,
  Facebook, Twitter, Linkedin, Instagram,
  CheckCircle2, AlertCircle, Send, Users,
  Building2, Headphones
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Talk to our friendly team",
    value: "+1 (555) 123-4567",
    action: "Call now",
    href: "tel:+15551234567",
    color: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "We'll respond within 24 hours",
    value: "hello@company.com",
    action: "Send email",
    href: "mailto:hello@company.com",
    color: "from-purple-500/20 via-pink-500/20 to-rose-500/20"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come say hello at our office",
    value: "123 AI Street, Tech Valley, CA 94103",
    action: "Get directions",
    href: "#",
    color: "from-amber-500/20 via-orange-500/20 to-red-500/20"
  }
]

const offices = [
  {
    city: "San Francisco",
    country: "United States",
    address: "123 Tech Street, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "sf@company.com",
    image: "/images/offices/sf.jpg",
    timezone: "PST (UTC-8)"
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "456 AI Avenue, EC2A 1BE",
    phone: "+44 20 1234 5678",
    email: "london@company.com",
    image: "/images/offices/london.jpg",
    timezone: "GMT (UTC+0)"
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "789 Innovation Way, 018956",
    phone: "+65 6789 0123",
    email: "singapore@company.com",
    image: "/images/offices/singapore.jpg",
    timezone: "SGT (UTC+8)"
  }
]

const supportOptions = [
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance for all your needs",
    color: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
  },
  {
    icon: Users,
    title: "Dedicated Account Team",
    description: "Personal support for enterprise clients",
    color: "from-purple-500/20 via-pink-500/20 to-rose-500/20"
  },
  {
    icon: Building2,
    title: "Enterprise Solutions",
    description: "Customized support for large organizations",
    color: "from-amber-500/20 via-orange-500/20 to-red-500/20"
  }
]

function ContactMethodCard({ method }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      <motion.div
        className={cn(
          "absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-500",
          `bg-gradient-to-r ${method.color}`,
          "group-hover:opacity-100"
        )}
      />
      <div className={cn(
        "relative rounded-2xl border p-6 backdrop-blur-sm",
        "bg-background/50 hover:bg-background/80",
        "transition-all duration-300"
      )}>
        <div className="flex flex-col items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <method.icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">{method.title}</h3>
            <p className="text-muted-foreground mb-2">{method.description}</p>
            <p className="font-medium">{method.value}</p>
          </div>
          <motion.a
            href={method.href}
            className="inline-flex items-center gap-2 text-primary"
            whileHover={{ x: 5 }}
          >
            {method.action}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

function OfficeCard({ office }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className={cn(
        "relative rounded-2xl border overflow-hidden",
        "bg-background/50 hover:bg-background/80",
        "transition-all duration-300"
      )}>
        <div className="relative aspect-video">
          <Image
            src={office.image}
            alt={office.city}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-2"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Office Location</span>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                {office.city}
              </h3>
              <p className="text-white/90 font-medium">
                {office.country}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-3">
            {[
              { icon: MapPin, value: office.address, label: "Address" },
              { icon: Phone, value: office.phone, label: "Phone" },
              { icon: Mail, value: office.email, label: "Email" },
              { icon: Clock, value: office.timezone, label: "Time Zone" }
            ].map((detail, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 group/item"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary/20 transition-colors duration-200">
                  <detail.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{detail.label}</p>
                  <p className="text-sm font-medium">{detail.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3">
            <motion.button
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Directions
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="inline-flex items-center justify-center rounded-xl bg-secondary/80 p-2.5 text-foreground hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ContactForm() {
  const [formStatus, setFormStatus] = useState("idle") // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus("loading")
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setFormStatus("success")
    
    // Reset after 3 seconds
    setTimeout(() => setFormStatus("idle"), 3000)
  }

  return (
    <div className="relative rounded-2xl border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="relative p-6 sm:p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  "bg-background/50 border",
                  "focus:ring-2 focus:ring-primary focus:border-primary",
                  "transition-all duration-200"
                )}
                placeholder="John"
                disabled={formStatus !== "idle"}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                className={cn(
                  "w-full px-4 py-2 rounded-lg",
                  "bg-background/50 border",
                  "focus:ring-2 focus:ring-primary focus:border-primary",
                  "transition-all duration-200"
                )}
                placeholder="Doe"
                disabled={formStatus !== "idle"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-background/50 border",
                "focus:ring-2 focus:ring-primary focus:border-primary",
                "transition-all duration-200"
              )}
              placeholder="john@example.com"
              disabled={formStatus !== "idle"}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <select
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-background/50 border",
                "focus:ring-2 focus:ring-primary focus:border-primary",
                "transition-all duration-200"
              )}
              disabled={formStatus !== "idle"}
            >
              <option value="">Select a subject</option>
              <option value="support">Technical Support</option>
              <option value="sales">Sales Inquiry</option>
              <option value="billing">Billing Question</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <textarea
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-background/50 border",
                "focus:ring-2 focus:ring-primary focus:border-primary",
                "transition-all duration-200",
                "min-h-[120px] resize-y"
              )}
              placeholder="How can we help?"
              disabled={formStatus !== "idle"}
            />
          </div>

          <motion.button
            type="submit"
            className={cn(
              "w-full inline-flex items-center justify-center gap-2",
              "rounded-xl bg-primary px-6 py-3",
              "text-primary-foreground font-medium",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200"
            )}
            disabled={formStatus !== "idle"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {formStatus === "loading" ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending...
              </>
            ) : formStatus === "success" ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Message Sent!
              </>
            ) : formStatus === "error" ? (
              <>
                <AlertCircle className="w-5 h-5" />
                Error Sending
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  )
}

function MapSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="rounded-2xl border overflow-hidden bg-background/50 backdrop-blur-sm">
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-2 p-6 lg:p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Find Us on Map</h2>
                <p className="text-muted-foreground">
                  Our offices are strategically located in major tech hubs around the world.
                  Visit us at your nearest location.
                </p>
                
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <motion.button
                      key={index}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-secondary text-left transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-medium">{office.city}</h3>
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-3 relative">
              {/* <Image
                src="/images/map.jpg"
                alt="Office Locations Map"
                fill
                className="object-cover"
              /> */}
              <img className="object-cover" src="/images/contact/location.jpg" alt="Office Locations Map" />
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    top: `${30 + index * 20}%`,
                    left: `${20 + index * 30}%`
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="relative">
                    <div className="p-2 rounded-full bg-primary text-primary-foreground">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Contact() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/20" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
          style={{ opacity }}
        />

        <div className="container relative">
          <motion.div
            style={{ scale, opacity }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Us
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6"
            >
              Let's Start a{" "}
              <span className="text-primary">Conversation</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Have questions or want to learn more? We're here to help you find
              the perfect AI solution for your needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <ContactMethodCard key={index} method={method} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Get in Touch with Our Team
              </h2>
              
              <p className="text-lg text-muted-foreground">
                Whether you have a question about features, trials, pricing, or anything else,
                our team is ready to answer all your questions.
              </p>

              <div className="space-y-8 pt-8">
                {supportOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <option.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{option.title}</h3>
                      <p className="text-muted-foreground">{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Instagram, href: "#", label: "Instagram" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Add the new MapSection before the Global Offices section */}
      <MapSection />

      {/* Global Offices */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Globe2 className="w-4 h-4" />
              Global Presence
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our Offices Worldwide
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Visit us at one of our offices around the globe. We'd love to meet you
              in person.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <OfficeCard key={index} office={office} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 