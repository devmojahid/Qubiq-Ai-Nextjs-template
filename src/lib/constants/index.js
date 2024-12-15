// Site configuration and constants
export const siteConfig = {
  name: "Qubiq AI",
  description: "Next Generation AI Platform",
  url: "https://qubiq.ai",
  ogImage: "/og.jpg",
}

export const menuItems = {
  apps: [
    {
      title: "AI Tools",
      icon: "Sparkles",
      items: [
        { 
          name: "Text Generator", 
          href: "/apps/text", 
          description: "Create engaging content with AI",
          icon: "Type"
        },
        { 
          name: "Image Generator", 
          href: "/apps/image", 
          description: "Generate stunning visuals",
          icon: "Image"
        },
        { 
          name: "Code Generator", 
          href: "/apps/code", 
          description: "AI-powered code generation",
          icon: "Code2"
        }
      ]
    },
    {
      title: "Productivity",
      icon: "Zap",
      items: [
        { 
          name: "Document Editor", 
          href: "/apps/editor", 
          description: "Advanced document editing",
          icon: "FileEdit"
        },
        { 
          name: "Template Library", 
          href: "/apps/templates", 
          description: "Ready-to-use templates",
          icon: "Library"
        }
      ]
    }
  ],
  solutions: [
    {
      title: "By Industry",
      icon: "Building2",
      items: [
        { 
          name: "Enterprise", 
          href: "/solutions/enterprise",
          description: "For large organizations",
          icon: "Building"
        },
        { 
          name: "Startups", 
          href: "/solutions/startups",
          description: "For growing companies",
          icon: "Rocket"
        }
      ]
    },
    {
      title: "By Team",
      icon: "Users",
      items: [
        { 
          name: "Developers", 
          href: "/solutions/developers",
          description: "Tools for developers",
          icon: "Code"
        },
        { 
          name: "Content Teams", 
          href: "/solutions/content",
          description: "For content creators",
          icon: "PenTool"
        }
      ]
    }
  ],
  admin: [
    {
      title: "Dashboard",
      icon: "LayoutDashboard",
      items: [
        { 
          name: "Analytics", 
          href: "/admin/analytics", 
          description: "Track your app's performance",
          icon: "LineChart"
        },
        { 
          name: "Users", 
          href: "/admin/users", 
          description: "Manage user accounts",
          icon: "Users"
        },
        { 
          name: "Settings", 
          href: "/admin/settings", 
          description: "Configure your application",
          icon: "Settings"
        }
      ]
    },
    {
      title: "Content",
      icon: "FileText",
      items: [
        { 
          name: "Pages", 
          href: "/admin/pages", 
          description: "Manage website pages",
          icon: "File"
        },
        { 
          name: "Media", 
          href: "/admin/media", 
          description: "Manage media files",
          icon: "Image"
        },
        { 
          name: "Blog", 
          href: "/admin/blog", 
          description: "Manage blog posts",
          icon: "PenTool"
        }
      ]
    }
  ],
  landing: [
    {
      title: "Features",
      icon: "Sparkles",
      items: [
        { 
          name: "Overview", 
          href: "/features", 
          description: "Explore all features",
          icon: "Layers"
        },
        { 
          name: "Integrations", 
          href: "/integrations", 
          description: "Connect with other tools",
          icon: "Plug"
        }
      ]
    },
    {
      title: "Resources",
      icon: "BookOpen",
      items: [
        { 
          name: "Documentation", 
          href: "/docs", 
          description: "Learn how to use",
          icon: "FileText"
        },
        { 
          name: "Blog", 
          href: "/blog", 
          description: "Latest updates",
          icon: "Newspaper"
        }
      ]
    }
  ]
}

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" }
  ],
  footer: {
    solutions: [
      { name: "Text Generator", href: "/solutions/text" },
      { name: "Image Generator", href: "/solutions/image" },
      { name: "Code Generator", href: "/solutions/code" },
      { name: "Speech to Text", href: "/solutions/speech" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" }
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Contact", href: "/contact" }
    ],
    legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" }
    ]
  },
  social: {
    twitter: "https://twitter.com/qubiq",
    github: "https://github.com/qubiq",
    linkedin: "https://linkedin.com/company/qubiq",
    discord: "https://discord.gg/qubiq"
  }
} 