"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, Bell, Shield, Palette, Globe, 
  Laptop, Moon, Sun, Zap, Sliders,
  Keyboard, Eye, Monitor, Volume2,
  MessageSquare, Mail, BellRing, Clock,
  Lock, Key, CreditCard, Receipt, 
  Trash2, AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SettingItem } from "@/components/dashboard/settings/setting-item"
import { SectionHeader } from "@/components/dashboard/settings/section-header"
import { SearchSettings } from "@/components/dashboard/settings/search-settings"
import { useSettings } from "@/components/dashboard/settings/use-settings"

const settingsSections = [
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    description: "Customize the look and feel of the application",
    settings: [
      {
        id: "theme",
        title: "Theme",
        description: "Select your preferred theme",
        type: "theme-selector",
        options: [
          { id: "light", icon: Sun, label: "Light" },
          { id: "dark", icon: Moon, label: "Dark" },
          { id: "system", icon: Laptop, label: "System" }
        ]
      },
      {
        id: "animations",
        title: "Interface Animations",
        description: "Enable or disable interface animations",
        type: "toggle",
        defaultValue: true
      },
      {
        id: "reducedMotion",
        title: "Reduced Motion",
        description: "Minimize non-essential animations",
        type: "toggle",
        defaultValue: false
      }
    ]
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Manage your notification preferences",
    settings: [
      {
        id: "emailNotifications",
        title: "Email Notifications",
        description: "Receive updates via email",
        type: "toggle",
        defaultValue: true
      },
      {
        id: "pushNotifications",
        title: "Push Notifications",
        description: "Get real-time updates in your browser",
        type: "toggle",
        defaultValue: true
      },
      {
        id: "notificationSound",
        title: "Notification Sound",
        description: "Play a sound for notifications",
        type: "toggle",
        defaultValue: true
      }
    ]
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: Shield,
    description: "Manage your privacy and security settings",
    settings: [
      {
        id: "twoFactor",
        title: "Two-Factor Authentication",
        description: "Add an extra layer of security",
        type: "toggle",
        defaultValue: false
      },
      {
        id: "activityLog",
        title: "Activity Log",
        description: "Track your account activity",
        type: "button",
        action: "View Log"
      },
      {
        id: "dataExport",
        title: "Export Data",
        description: "Download a copy of your data",
        type: "button",
        action: "Export"
      }
    ]
  },
  {
    id: "accessibility",
    title: "Accessibility",
    icon: Eye,
    description: "Customize accessibility settings",
    settings: [
      {
        id: "screenReader",
        title: "Screen Reader",
        description: "Optimize for screen readers",
        type: "toggle",
        defaultValue: false
      },
      {
        id: "highContrast",
        title: "High Contrast",
        description: "Increase contrast for better visibility",
        type: "toggle",
        defaultValue: false
      },
      {
        id: "fontSize",
        title: "Font Size",
        description: "Adjust the text size",
        type: "slider",
        min: 12,
        max: 24,
        defaultValue: 16
      }
    ]
  }
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("appearance")
  const { unsavedChanges, saveChanges, resetChanges } = useSettings()

  return (
    <div className="container max-w-6xl space-y-8 p-6 lg:p-8">
      {/* Enhanced Header */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="flex items-center gap-4">
            {unsavedChanges && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground"
              >
                You have unsaved changes
              </motion.span>
            )}
            <div className="flex gap-2">
              {unsavedChanges && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetChanges}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-medium",
                    "border border-border/50",
                    "hover:bg-secondary/80 transition-colors"
                  )}
                >
                  Reset
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={saveChanges}
                disabled={!unsavedChanges}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl",
                  "bg-primary px-4 py-2 text-sm font-medium",
                  "text-primary-foreground shadow-sm",
                  "transition-all duration-200",
                  !unsavedChanges && "opacity-50 cursor-not-allowed"
                )}
              >
                <Shield className="h-4 w-4" />
                Save Changes
              </motion.button>
            </div>
          </div>
        </motion.div>

        <SearchSettings 
          sections={settingsSections}
          onSelect={(setting) => {
            const section = settingsSections.find(s => 
              s.settings.some(s => s.id === setting.id)
            )
            setActiveSection(section.id)
            // Add scroll into view logic
          }}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px,1fr]">
        {/* Enhanced Navigation */}
        <nav className="space-y-2 lg:sticky lg:top-8 lg:self-start">
          {settingsSections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl p-3 text-sm",
                "transition-all duration-200",
                activeSection === section.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
              )}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <section.icon className="h-4 w-4" />
              <span className="font-medium">{section.title}</span>
            </motion.button>
          ))}
        </nav>

        {/* Enhanced Content */}
        <div className="space-y-8">
          {settingsSections.map((section) => (
            activeSection === section.id && (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <SectionHeader 
                  icon={section.icon}
                  title={section.title}
                  description={section.description}
                />

                <div className="grid gap-6">
                  {section.settings.map((setting) => (
                    <SettingItem 
                      key={setting.id} 
                      setting={setting} 
                    />
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </div>
  )
} 