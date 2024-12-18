"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  GithubIcon as GithubIcon, 
  TwitterIcon as TwitterIcon, 
  ArrowRight, 
  Loader2,
  ChromeIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"

const socialProviders = [
  { 
    id: 'google',
    name: 'Google',
    icon: ChromeIcon, // Using Chrome icon as a replacement for Google
    bgColor: 'hover:bg-red-50 dark:hover:bg-red-950/30',
    textColor: 'group-hover:text-red-600 dark:group-hover:text-red-400'
  },
  { 
    id: 'github',
    name: 'Github',
    icon: GithubIcon,
    bgColor: 'hover:bg-gray-50 dark:hover:bg-gray-950/30',
    textColor: 'group-hover:text-gray-900 dark:group-hover:text-gray-100'
  },
  { 
    id: 'twitter',
    name: 'Twitter',
    icon: TwitterIcon,
    bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-950/30',
    textColor: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
  }
]

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push("/dashboard")
    } catch (error) {
      setErrors({ submit: "Invalid credentials" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (providerId) => {
    setIsLoading(true)
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch (error) {
      setErrors({ submit: `Failed to login with ${providerId}` })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "rounded-2xl border bg-card p-8",
            "shadow-xl shadow-primary/5",
            "backdrop-blur-sm bg-background/95"
          )}
        >
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex justify-center mb-4"
            >
              <Logo className="h-12 w-12" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              Welcome back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.1 } }}
              className="text-sm text-muted-foreground mt-2"
            >
              Enter your credentials to access your account
            </motion.p>
          </div>

          {/* Enhanced Social Login */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {socialProviders.map((provider) => (
              <motion.button
                key={provider.id}
                onClick={() => handleSocialLogin(provider.id)}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group flex items-center justify-center gap-2 rounded-xl p-2",
                  "border border-border/50 bg-background/50",
                  "hover:border-primary/20 transition-all duration-200",
                  provider.bgColor,
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                <provider.icon className={cn(
                  "h-5 w-5 transition-colors",
                  "text-muted-foreground",
                  provider.textColor
                )} />
                <span className="sr-only">Continue with {provider.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Enhanced Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative mt-1 group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      "w-full rounded-xl border px-4 py-2 pl-10",
                      "bg-background/50",
                      "focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "transition-all duration-200",
                      "placeholder:text-muted-foreground/50",
                      errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    )}
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-500 mt-1 block"
                      >
                        {errors.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative mt-1 group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={cn(
                      "w-full rounded-xl border px-4 py-2 pl-10 pr-10",
                      "bg-background/50",
                      "focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "transition-all duration-200",
                      "placeholder:text-muted-foreground/50",
                      errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    )}
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-500 mt-1 block"
                      >
                        {errors.password}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Enhanced Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 group cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className={cn(
                    "rounded border-border text-primary",
                    "focus:ring-2 focus:ring-primary/20",
                    "transition-all duration-200",
                    "cursor-pointer"
                  )}
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className={cn(
                  "text-sm text-primary hover:text-primary/80",
                  "transition-colors duration-200",
                  "hover:underline underline-offset-4"
                )}
              >
                Forgot password?
              </Link>
            </div>

            {/* Enhanced Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full rounded-xl px-4 py-2.5",
                "bg-gradient-to-r from-primary to-primary/90",
                "text-primary-foreground font-medium",
                "shadow-lg shadow-primary/20",
                "hover:shadow-xl hover:shadow-primary/30",
                "transition-all duration-200",
                "flex items-center justify-center gap-2",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>

            {/* Enhanced Error Message */}
            <AnimatePresence>
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "text-sm text-red-500 text-center",
                    "bg-red-50 dark:bg-red-950/30",
                    "border border-red-200 dark:border-red-800",
                    "rounded-lg p-2"
                  )}
                >
                  {errors.submit}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Enhanced Sign Up Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className={cn(
                "text-primary font-medium",
                "hover:text-primary/80 transition-colors duration-200",
                "hover:underline underline-offset-4"
              )}
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
} 