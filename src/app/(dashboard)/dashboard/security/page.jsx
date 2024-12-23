"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Shield, Key, Smartphone, Lock,
  Mail, AlertTriangle, CheckCircle2,
  Clock, Activity, Eye, EyeOff,
  RefreshCcw, LogOut, AlertCircle,
  Fingerprint, QrCode, KeyRound,
  History, Globe, MonitorCheck,
  MessageSquare, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const securitySections = [
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account",
    icon: Shield,
    status: "disabled",
    methods: [
      {
        id: "authenticator",
        name: "Authenticator App",
        description: "Use Google Authenticator or similar apps",
        icon: Smartphone,
        enabled: false,
        recommended: true
      },
      {
        id: "sms",
        name: "SMS Authentication",
        description: "Receive codes via text message",
        icon: MessageSquare,
        enabled: false
      },
      {
        id: "email",
        name: "Email Authentication",
        description: "Receive codes via email",
        icon: Mail,
        enabled: false
      }
    ]
  },
  {
    id: "password",
    title: "Password Settings",
    description: "Manage your password and security preferences",
    icon: Lock,
    lastChanged: "2024-02-15T10:30:00Z",
    strength: "strong"
  },
  {
    id: "sessions",
    title: "Active Sessions",
    description: "Manage your active login sessions",
    icon: Globe,
    sessions: [
      {
        id: 1,
        device: "MacBook Pro",
        browser: "Chrome",
        location: "London, UK",
        lastActive: "2024-03-15T14:30:00Z",
        current: true,
        icon: MonitorCheck
      }
    ]
  },
  {
    id: "activity",
    title: "Security Activity",
    description: "Review your recent security events",
    icon: Activity,
    events: [
      {
        id: 1,
        type: "login",
        description: "Successful login from new device",
        timestamp: "2024-03-15T10:30:00Z",
        location: "London, UK",
        device: "Chrome on MacBook Pro"
      }
    ]
  }
]

export default function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading2FA, setLoading2FA] = useState(false)

  return (
    <div className="ssNfull min-h-screen bg-background">
      <div className="container max-w-[1000px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Account Security</h1>
          <p className="text-muted-foreground">
            Manage your account security settings and preferences
          </p>
        </div>

        {/* Security Score */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="font-semibold">Security Score</h2>
              <p className="text-sm text-muted-foreground">
                Your account security status
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">85%</div>
                <div className="text-xs text-muted-foreground">Good</div>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-2 rounded-full bg-secondary">
            <div 
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: "85%" }}
            />
          </div>

          {/* Recommendations */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span>Enable two-factor authentication for better security</span>
            </div>
          </div>
        </div>

        {/* Security Sections */}
        <div className="grid gap-6">
          {securitySections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <div className="border-b p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2.5">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {section.id === "2fa" && (
                  <div className="space-y-6">
                    {section.methods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "rounded-lg p-2",
                            "bg-secondary/50"
                          )}>
                            <method.icon className="h-4 w-4 text-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{method.name}</h4>
                              {method.recommended && (
                                <span className="text-xs text-primary">Recommended</span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {}}
                          className={cn(
                            "rounded-lg px-3 py-1 text-sm",
                            "border border-border/50",
                            "hover:bg-secondary/80 transition-colors"
                          )}
                        >
                          {method.enabled ? "Disable" : "Enable"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {section.id === "password" && (
                  <div className="space-y-6">
                    {/* Password Strength Indicator */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Password Strength</h4>
                        <span className="text-xs text-green-500 font-medium">Strong</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary">
                        <div className="h-full w-[85%] rounded-full bg-green-500 transition-all" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                        <span>Your password meets all security requirements</span>
                      </div>
                    </div>

                    {/* Password Last Changed */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Last Changed</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(section.lastChanged).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {}}
                        className="text-xs text-primary hover:underline"
                      >
                        View History
                      </button>
                    </div>

                    {/* Change Password Form */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Change Password</h4>
                      
                      {/* Current Password */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className={cn(
                              "w-full rounded-lg px-4 py-2 pr-10",
                              "bg-secondary/50 border border-border/50",
                              "focus:outline-none focus:ring-2 focus:ring-primary/20"
                            )}
                            placeholder="Enter current password"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={cn(
                              "w-full rounded-lg px-4 py-2 pr-10",
                              "bg-secondary/50 border border-border/50",
                              "focus:outline-none focus:ring-2 focus:ring-primary/20"
                            )}
                            placeholder="Enter new password"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Password Requirements */}
                      <div className="space-y-2 p-3 rounded-lg bg-secondary/50">
                        <div className="text-sm font-medium">Password Requirements</div>
                        <div className="grid gap-2">
                          {[
                            { text: "At least 8 characters", met: true },
                            { text: "At least one uppercase letter", met: true },
                            { text: "At least one number", met: true },
                            { text: "At least one special character", met: false }
                          ].map((req, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              {req.met ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                              ) : (
                                <AlertCircle className="h-3.5 w-3.5 text-yellow-500" />
                              )}
                              <span className={req.met ? "text-muted-foreground" : "text-yellow-500"}>
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => {}}
                          className={cn(
                            "flex-1 sm:flex-none rounded-lg px-4 py-2",
                            "bg-primary text-primary-foreground",
                            "text-sm font-medium",
                            "hover:opacity-90 transition-opacity"
                          )}
                        >
                          Update Password
                        </button>
                        <button
                          onClick={() => {
                            setCurrentPassword("")
                            setNewPassword("")
                          }}
                          className={cn(
                            "rounded-lg px-4 py-2",
                            "border border-border/50",
                            "text-sm font-medium",
                            "hover:bg-secondary/80 transition-colors"
                          )}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                    {/* Additional Security Options */}
                    <div className="space-y-3 pt-4 border-t">
                      <h4 className="font-medium">Additional Options</h4>
                      <div className="space-y-3">
                        <button
                          onClick={() => {}}
                          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <RefreshCcw className="h-4 w-4 text-primary" />
                            <div className="text-left">
                              <div className="text-sm font-medium">Reset Password</div>
                              <div className="text-xs text-muted-foreground">
                                Send a password reset link to your email
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>

                        <button
                          onClick={() => {}}
                          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <LogOut className="h-4 w-4 text-red-500" />
                            <div className="text-left">
                              <div className="text-sm font-medium text-red-500">Sign Out Everywhere</div>
                              <div className="text-xs text-muted-foreground">
                                Log out from all devices except this one
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {section.id === "sessions" && (
                  <div className="space-y-4">
                    {section.sessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between gap-4 p-4 rounded-lg bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <session.icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{session.device}</div>
                            <div className="text-sm text-muted-foreground">
                              {session.browser} • {session.location}
                            </div>
                          </div>
                        </div>
                        {session.current ? (
                          <span className="text-xs text-primary">Current Session</span>
                        ) : (
                          <button
                            className="text-sm text-red-500 hover:text-red-600"
                          >
                            End Session
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.id === "activity" && (
                  <div className="space-y-4">
                    {section.events.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50"
                      >
                        <Activity className="h-4 w-4 mt-1" />
                        <div className="flex-1">
                          <div className="font-medium">{event.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.device} • {event.location}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(event.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 