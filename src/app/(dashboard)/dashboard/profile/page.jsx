"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, Mail, Building, MapPin, Link as LinkIcon, 
  Twitter, Github, Linkedin, Camera, 
  Shield, Key, Bell, Smartphone,
  CreditCard, Clock, Activity,
  Briefcase, Award, Calendar, Hash,
  Zap, BookOpen, Coffee, Heart,
  CheckCircle2, XCircle, AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ImageUpload } from "@/components/dashboard/profile/image-upload"

// Add these constants at the top for consistent styling
const buttonStyles = {
  base: cn(
    "rounded-xl transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary/20"
  ),
  primary: cn(
    "bg-gradient-to-r from-primary to-primary/90",
    "text-white shadow-sm",
    "hover:opacity-90 hover:shadow-md hover:shadow-primary/10"
  ),
  secondary: cn(
    "border border-border/50 bg-background/50",
    "hover:bg-secondary/80 hover:border-primary/20"
  ),
  icon: cn(
    "p-2 hover:bg-primary/10 text-muted-foreground hover:text-primary",
    "backdrop-blur-sm"
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-xl border overflow-hidden"
      >
        {/* Cover Image */}
        <div className="h-48 relative overflow-hidden">
          <ImageUpload 
            type="cover"
            currentImage={null}
            onImageChange={(file) => {
              console.log('Cover image:', file)
            }}
          />
        </div>

        <div className="relative px-6 pb-6">
          {/* Profile Image - Positioned to overlap cover */}
          <div className="relative -mt-16 mb-4 flex justify-between items-end">
            <ImageUpload 
              type="profile"
              currentImage={null}
              onImageChange={(file) => {
                console.log('Profile image:', file)
              }}
            />

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(buttonStyles.base, buttonStyles.primary, "px-4 py-2 text-sm font-medium")}
              >
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(buttonStyles.base, buttonStyles.secondary, "px-4 py-2 text-sm font-medium")}
              >
                Share Profile
              </motion.button>
            </div>
          </div>

          {/* Profile Info with enhanced layout */}
          <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">John Doe</h1>
              <p className="mt-1 text-muted-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Senior Frontend Developer at Qubiq AI
              </p>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <MapPin className="h-3 w-3" /> San Francisco, CA
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Mail className="h-3 w-3" /> john@example.com
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Calendar className="h-3 w-3" /> Joined Jan 2024
                </span>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Passionate frontend developer with expertise in React, Next.js, and modern UI frameworks. 
                Building beautiful and functional user interfaces that delight users.
              </p>

              <div className="mt-4 flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "rounded-lg p-2 transition-colors",
                      "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                    )}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <StatsCard 
                  icon={Zap} 
                  label="Projects" 
                  value="28" 
                />
                <StatsCard 
                  icon={BookOpen} 
                  label="Credits" 
                  value="1.2k" 
                />
              </div>
              <div className="rounded-xl border p-4">
                <h4 className="font-medium mb-2">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="font-medium text-primary">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium text-primary">&lt; 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Projects</span>
                    <span className="font-medium text-primary">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Navigation */}
      <div className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <nav className="flex space-x-2 p-2 overflow-x-auto scrollbar-none" aria-label="Profile sections">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                buttonStyles.base,
                "flex items-center gap-2 px-4 py-2.5",
                "text-sm font-medium whitespace-nowrap",
                activeTab === tab.id 
                  ? cn(buttonStyles.primary, "shadow-md shadow-primary/20")
                  : cn(buttonStyles.secondary, "hover:bg-secondary/80")
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
              {tab.badge && (
                <span className={cn(
                  "ml-1.5 flex h-5 items-center rounded-full px-2",
                  "text-[10px] font-medium bg-white/20"
                )}>
                  {tab.badge}
                </span>
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Profile Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "billing" && <BillingSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
      </div>
    </div>
  )
}

const tabs = [
  { id: "general", name: "General", icon: User },
  { id: "security", name: "Security", icon: Shield },
  { id: "billing", name: "Billing", icon: CreditCard },
  { id: "notifications", name: "Notifications", icon: Bell }
]

function GeneralSettings() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-6 space-y-6"
      >
        <h3 className="font-semibold">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input 
              type="text" 
              defaultValue="John Doe"
              className="mt-1 block w-full rounded-lg border border-border/50 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              defaultValue="john@example.com"
              className="mt-1 block w-full rounded-lg border border-border/50 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea 
              rows={3}
              defaultValue="Senior Frontend Developer passionate about creating beautiful and functional user interfaces."
              className="mt-1 block w-full rounded-lg border border-border/50 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border p-6 space-y-6"
      >
        <h3 className="font-semibold">Social Links</h3>
        <div className="space-y-4">
          {socialLinks.map((social) => (
            <div key={social.name} className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary/80 p-2">
                <social.icon className="h-4 w-4" />
              </div>
              <input 
                type="url" 
                placeholder={`Enter your ${social.name} profile URL`}
                className="flex-1 rounded-lg border border-border/50 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/johndoe",
    icon: Twitter
  },
  {
    name: "GitHub",
    href: "https://github.com/johndoe",
    icon: Github
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/johndoe",
    icon: Linkedin
  }
]

function SecuritySettings() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-6 space-y-6"
      >
        <h3 className="font-semibold">Password</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Current Password</label>
            <input 
              type="password" 
              className="mt-1 block w-full rounded-lg border border-border/50 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium">New Password</label>
            <input 
              type="password" 
              className="mt-1 block w-full rounded-lg border border-border/50 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Confirm New Password</label>
            <input 
              type="password" 
              className="mt-1 block w-full rounded-lg border border-border/50 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border p-6 space-y-6"
      >
        <h3 className="font-semibold">Two-Factor Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary/80 p-2">
                <Smartphone className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Authenticator App</div>
                <div className="text-sm text-muted-foreground">
                  Use an authenticator app to generate one-time codes
                </div>
              </div>
            </div>
            <button className="rounded-lg border px-3 py-1 text-sm hover:bg-secondary/80 transition-colors">
              Setup
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

function BillingSettings() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-6 space-y-6"
      >
        <h3 className="font-semibold">Payment Method</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary/80 p-2">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">Visa ending in 4242</div>
                <div className="text-sm text-muted-foreground">
                  Expires 12/24
                </div>
              </div>
            </div>
            <button className="rounded-lg border px-3 py-1 text-sm hover:bg-secondary/80 transition-colors">
              Edit
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border p-6 space-y-6"
      >
        <h3 className="font-semibold">Billing History</h3>
        <div className="space-y-4">
          {billingHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary/80 p-2">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{item.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.date}
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium">{item.amount}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

const billingHistory = [
  { id: 1, description: "Pro Plan - Monthly", date: "Jan 1, 2024", amount: "$29.00" },
  { id: 2, description: "Pro Plan - Monthly", date: "Dec 1, 2023", amount: "$29.00" }
]

function NotificationSettings() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-6 space-y-6"
      >
        <h3 className="font-semibold">Email Notifications</h3>
        <div className="space-y-4">
          {emailNotifications.map((notification) => (
            <div key={notification.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary/80 p-2">
                  <notification.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {notification.description}
                  </div>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  defaultChecked={notification.enabled}
                  className="peer sr-only"
                />
                <div className="h-5 w-9 rounded-full bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] dark:border-gray-600 dark:peer-checked:after:border-gray-700"></div>
              </label>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

const emailNotifications = [
  { 
    id: 1, 
    title: "Project Updates", 
    description: "Get notified when a project is updated",
    icon: Activity,
    enabled: true
  },
  { 
    id: 2, 
    title: "Security Alerts", 
    description: "Receive security alerts and notifications",
    icon: Shield,
    enabled: true
  },
  { 
    id: 3, 
    title: "Billing Updates", 
    description: "Get notified about billing and subscription updates",
    icon: CreditCard,
    enabled: false
  }
] 

function StatsCard({ icon: Icon, label, value, trend }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "rounded-xl border p-4 group",
        "bg-gradient-to-br from-primary/5 via-transparent to-transparent",
        "hover:shadow-md hover:shadow-primary/5 transition-all duration-200"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "rounded-xl p-2.5 transition-all duration-200",
          "bg-primary/10 group-hover:bg-primary/20",
          "group-hover:scale-110"
        )}>
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold text-primary">{value}</div>
          <div className="text-sm text-muted-foreground group-hover:text-foreground">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 