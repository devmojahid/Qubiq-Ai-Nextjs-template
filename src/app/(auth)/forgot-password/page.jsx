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
  GithubIcon,
  TwitterIcon,
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
    icon: ChromeIcon,
    bgColor: 'hover:bg-red-50 dark:hover:bg-red-950/30',
    textColor: 'group-hover:text-red-600 dark:group-hover:text-red-400',
    borderHover: 'hover:border-red-200 dark:hover:border-red-800'
  },
  { 
    id: 'github',
    name: 'Github',
    icon: GithubIcon,
    bgColor: 'hover:bg-gray-50 dark:hover:bg-gray-950/30',
    textColor: 'group-hover:text-gray-900 dark:group-hover:text-gray-100',
    borderHover: 'hover:border-gray-200 dark:hover:border-gray-800'
  },
  { 
    id: 'twitter',
    name: 'Twitter',
    icon: TwitterIcon,
    bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-950/30',
    textColor: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    borderHover: 'hover:border-blue-200 dark:hover:border-blue-800'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

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
    <div className={cn(
      "min-h-[100dvh] flex items-center justify-center p-4",
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
      "from-primary/10 via-background to-background"
    )}>
      <motion.div 
        className="w-full max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className={cn(
            "rounded-2xl border bg-card/50 p-8",
            "shadow-2xl shadow-primary/5",
            "backdrop-blur-xl",
            "relative overflow-hidden"
          )}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          </div>

          {/* Logo and Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8 relative"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <Logo className="h-12 w-12" />
            </motion.div>
            <h1 className={cn(
              "text-3xl font-bold tracking-tight",
              "bg-gradient-to-b from-foreground to-foreground/80",
              "bg-clip-text text-transparent"
            )}>
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your credentials to access your account
            </p>
          </motion.div>

          {/* Enhanced Social Login */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            {socialProviders.map((provider) => {
              const Icon = provider.icon
              return (
                <motion.button
                  key={provider.id}
                  onClick={() => handleSocialLogin(provider.id)}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "group relative flex items-center justify-center gap-2",
                    "rounded-xl p-2.5 border border-border/50",
                    "bg-card/50 backdrop-blur-sm",
                    provider.borderHover,
                    "transition-all duration-200 ease-in-out",
                    provider.bgColor,
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    "text-muted-foreground",
                    provider.textColor
                  )} />
                  <span className="sr-only">Continue with {provider.name}</span>
                </motion.button>
              )
            })}
          </motion.div>

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

        {/* Footer Links */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors duration-200"
          >
            Terms of Service
          </Link>
          <span className="mx-2">·</span>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
} 