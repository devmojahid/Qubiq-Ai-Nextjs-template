"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const megaMenuContent = {
  dashboard: {
    featured: [
      {
        title: "Dashboard",
        description: "Manage your dashboard",
        href: "/dashboard",
        icon: "🏠"
      },
      {
        title: "Analytics Usage",
        description: "Get detailed insights and analytics",
        href: "/dashboard/analytics/usage",
        icon: "📈"
      }
    ],
    categories: [
      {
        title: "Ai Tools",
        items: [
          { name: "Text Generator", href: "/dashboard/text", icon: "💬" },
          { name: "Image Generator", href: "/dashboard/image", icon: "🖼️" },
          { name: "Video Generator", href: "/dashboard/video", icon: "🎥" },
          { name: "Audio Generator", href: "/dashboard/audio", icon: "🎧" },
          { name: "Code Generator", href: "/dashboard/code", icon: "💻" }
        ]
      },
      {
        title: "Billing",
        items: [
          { name: "Pricing", href: "/dashboard/pricing", icon: "💰" },
          { name: "Billing History", href: "/dashboard/billing/history", icon: "💳" },
          { name: "Payment Methods", href: "/dashboard/billing/payment-methods", icon: "💳" },
          { name: "Subscription", href: "/dashboard/billing/subscription", icon: "💳" },
          { name: "Help & Support", href: "/dashboard/help", icon: "🆘" }
        ]
      }
    ]
  }
}

export function MegaMenu({ category, onClose, isMobile = false }) {
  const content = megaMenuContent[category]
  if (!content) return null

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-secondary/30 rounded-lg mx-2 my-1 overflow-hidden"
      >
        <div className="space-y-4 p-4">
          {/* Featured Section */}
          <div className="space-y-3">
            {content.featured.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary/50 active:bg-secondary/70 transition-colors"
              >
                <span className="text-xl mt-0.5 opacity-80">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{item.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.categories.map((category) => (
              <div key={category.title} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground px-2">{category.title}</h3>
                <div className="space-y-1">
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-2 p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 active:bg-secondary/70 rounded-lg transition-colors"
                    >
                      <span className="opacity-80">{item.icon}</span>
                      <span className="flex-1 truncate">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ type: "spring", bounce: 0.15 }}
      className="absolute left-0 right-0 top-full pt-2 w-full"
    >
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="absolute -top-2 left-0 right-0 h-2 bg-gradient-to-b from-background/0 to-background/5" />
        <div className="relative rounded-xl border border-border/40 bg-background/95 p-6 shadow-lg backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,1px,1fr]">
            {/* Featured Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Featured</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {content.featured.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={onClose}
                    className="group relative rounded-lg border border-border/40 bg-secondary/30 p-4 hover:bg-secondary/50 hover:border-border/60 transition-all duration-200"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <h4 className="text-sm font-medium">{item.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <motion.div
                      className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100"
                      initial={false}
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-border/40" />

            {/* Categories Section */}
            <div className="grid grid-cols-2 gap-6">
              {content.categories.map((category) => (
                <div key={category.title} className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <span>{item.name}</span>
                          <motion.div
                            initial={false}
                            animate={{ x: 0 }}
                            whileHover={{ x: 3 }}
                          >
                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 