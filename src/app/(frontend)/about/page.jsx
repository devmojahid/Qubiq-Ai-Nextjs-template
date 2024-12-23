"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { 
  Users, Sparkles, Target, 
  Award, BarChart, Globe2, 
  Rocket, Heart, Zap,
  ArrowRight, MessageSquare,
  Clock, Trophy, Handshake, Play, MapPin,
  Newspaper, BookOpen, GraduationCap, 
  Building, Phone, Mail, Calendar,
  CheckCircle2, ArrowUpRight, Github
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Company stats
const stats = [
  { label: "Active Users", value: "100K+", icon: Users },
  { label: "Countries", value: "150+", icon: Globe2 },
  { label: "AI Models", value: "20+", icon: Sparkles },
  { label: "Success Rate", value: "99%", icon: Target }
]

// Company values
const values = [
  {
    title: "Innovation First",
    description: "Pushing boundaries with cutting-edge AI technology",
    icon: Rocket,
    color: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
  },
  {
    title: "User Focused",
    description: "Building products that solve real user problems",
    icon: Heart,
    color: "from-rose-500/20 via-pink-500/20 to-purple-500/20"
  },
  {
    title: "Quality Driven",
    description: "Maintaining highest standards in everything we do",
    icon: Award,
    color: "from-amber-500/20 via-orange-500/20 to-red-500/20"
  },
  {
    title: "Global Impact",
    description: "Making AI accessible to everyone worldwide",
    icon: Globe2,
    color: "from-green-500/20 via-emerald-500/20 to-teal-500/20"
  }
]

// Team members
const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-founder",
    image: "/images/team/sarah.jpg",
    social: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-founder",
    image: "/images/team/michael.jpg",
    social: {
      twitter: "#",
      linkedin: "#"
    }
  },
  // Add more team members as needed
]

function StatsCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className={cn(
        "relative rounded-2xl border p-6 backdrop-blur-sm",
        "bg-background/50 hover:bg-background/80",
        "transition-all duration-300"
      )}>
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 rounded-xl bg-primary/10 text-primary"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <stat.icon className="w-6 h-6" />
          </motion.div>
          <div>
            <motion.h3 
              className="text-3xl font-bold"
              animate={{
                color: ["var(--primary)", "var(--foreground)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {stat.value}
            </motion.h3>
            <p className="text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ValueCard({ value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <motion.div
        className={cn(
          "absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-500",
          `bg-gradient-to-r ${value.color}`,
          "group-hover:opacity-100"
        )}
      />
      <div className={cn(
        "relative rounded-2xl border p-6 backdrop-blur-sm",
        "bg-background/50 hover:bg-background/80",
        "transition-all duration-300"
      )}>
        <motion.div
          className="p-3 rounded-xl bg-primary/10 text-primary w-fit"
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <value.icon className="w-6 h-6" />
        </motion.div>
        <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
        <p className="mt-2 text-muted-foreground">{value.description}</p>
      </div>
    </motion.div>
  )
}

function TeamMember({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className={cn(
        "relative rounded-2xl border overflow-hidden",
        "bg-background/50 hover:bg-background/80",
        "transition-all duration-300"
      )}>
        <div className="relative aspect-square">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

function ErrorBoundary({ children }) {
  return (
    <div className="rounded-2xl border border-destructive/50 p-6 bg-destructive/10">
      <p className="text-destructive">Something went wrong. Please try again later.</p>
    </div>
  )
}

export default function About() {
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
              <Users className="w-4 h-4" />
              Our Story
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6"
            >
              Empowering the Future with{" "}
              <span className="text-primary">AI Innovation</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              We're on a mission to democratize AI technology and make it accessible
              to everyone. Join us in shaping the future of artificial intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                whileHover={{ scale: 1.05 }}
              >
                <Target className="w-4 h-4" />
                Our Mission
              </motion.div>
              
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Building the Future of AI Technology
              </h2>
              
              <p className="text-lg text-muted-foreground">
                We believe in a future where AI enhances human capabilities rather than
                replacing them. Our mission is to develop AI solutions that are
                accessible, ethical, and beneficial to society.
              </p>

              <motion.button
                className="inline-flex items-center gap-2 text-primary"
                whileHover={{ x: 5 }}
              >
                Learn more about our vision
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/images/about/mission.jpg"
                alt="Our Mission"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-4 h-4" />
              Our Values
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Drives Us Forward
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Our core values shape everything we do, from product development to
              customer service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-4 h-4" />
              Our Team
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Meet the Innovators
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Our diverse team of experts is passionate about pushing the boundaries
              of what's possible with AI.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <TeamMember key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Press & Media Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Newspaper className="w-4 h-4" />
              Press & Media
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              In the News
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Read what leading publications are saying about our AI innovations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                source: "TechCrunch",
                title: "AI Platform Revolutionizes Content Creation",
                date: "Dec 2023",
                link: "#"
              },
              {
                source: "Forbes",
                title: "Top AI Startups to Watch in 2024",
                date: "Jan 2024",
                link: "#"
              },
              {
                source: "VentureBeat",
                title: "The Future of AI Content Generation",
                date: "Feb 2024",
                link: "#"
              }
            ].map((article, index) => (
              <motion.a
                key={index}
                href={article.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="group relative p-6 rounded-2xl border bg-background/50 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-primary">{article.source}</span>
                  <span className="text-sm text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <motion.div
                  className="mt-4 flex items-center gap-2 text-sm text-primary"
                  whileHover={{ x: 5 }}
                >
                  Read More
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Development Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                whileHover={{ scale: 1.05 }}
              >
                <BookOpen className="w-4 h-4" />
                R&D
              </motion.div>
              
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Advancing AI Research
              </h2>
              
              <p className="text-lg text-muted-foreground">
                Our dedicated research team works on pushing the boundaries of AI technology,
                publishing papers and contributing to open-source projects.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Research Papers", value: "50+" },
                  { label: "Patents Filed", value: "25+" },
                  { label: "Open Source Projects", value: "100+" },
                  { label: "Research Partners", value: "30+" }
                ].map((stat, index) => (
                  <div key={index} className="p-4 rounded-xl bg-background/50 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  <GraduationCap className="w-4 h-4" />
                  View Publications
                </motion.a>
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  <Github className="w-4 h-4" />
                  Open Source
                </motion.a>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {[
                "AI Research Lab",
                "Team Collaboration",
                "Data Analysis",
                "Innovation Hub"
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-square rounded-2xl overflow-hidden group"
                >
                  <Image
                    src={`/images/research/${image.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                    alt={image}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </motion.div>
              
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Get in Touch
              </h2>
              
              <p className="text-lg text-muted-foreground">
                Have questions? Our team is here to help. Reach out to us through any
                of these channels.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { icon: Mail, label: "Email", value: "hello@company.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: MapPin, label: "Address", value: "123 AI Street, Tech Valley, CA" },
                  { icon: Calendar, label: "Business Hours", value: "Mon-Fri: 9AM-6PM PST" }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{contact.label}</div>
                      <div className="font-medium">{contact.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="relative rounded-2xl border overflow-hidden">
              <div className="p-6 space-y-6">
                <h3 className="text-xl font-semibold">Send us a Message</h3>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border bg-background/50"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border bg-background/50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg border bg-background/50"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      className="w-full px-4 py-2 rounded-lg border bg-background/50 min-h-[120px]"
                      placeholder="How can we help?"
                    />
                  </div>
                  <motion.button
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <MessageSquare className="w-4 h-4" />
              FAQs
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our company and AI solutions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What makes your AI technology unique?",
                a: "Our AI technology combines cutting-edge algorithms with user-friendly interfaces, making advanced AI accessible to everyone."
              },
              {
                q: "How do you ensure data privacy?",
                a: "We implement enterprise-grade security measures and follow strict data protection protocols to ensure your information is always safe."
              },
              {
                q: "Can I integrate your AI with my existing systems?",
                a: "Yes, our AI platform offers robust API integration capabilities, allowing seamless connection with your current tech stack."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border bg-background/50 backdrop-blur-sm space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{faq.q}</h3>
                    <p className="mt-2 text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            className="relative rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm p-8 lg:p-12 overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute -inset-40 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-full blur-3xl"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="relative text-center max-w-2xl mx-auto">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <MessageSquare className="w-4 h-4" />
                Get in Touch
              </motion.div>
              
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Ready to Start Your AI Journey?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how our AI solutions can transform your business.
              </p>

              <motion.button
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 