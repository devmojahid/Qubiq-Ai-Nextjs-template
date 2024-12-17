"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`
          const isLast = index === segments.length - 1
          
          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                href={href}
                className={cn(
                  "ml-2 capitalize",
                  isLast 
                    ? "font-medium text-foreground" 
                    : "text-muted-foreground hover:text-foreground transition-colors"
                )}
              >
                {segment.replace(/-/g, ' ')}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
} 