import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Code2,
  MessageSquare,
  Settings,
  Users,
  CreditCard,
  LineChart,
  Database,
  Shield,
  Webhook,
  Boxes,
  Key as KeyIcon,
  Sparkles,
  BrainCircuit,
  Bot,
  Palette,
  Video,
  Music,
  Languages,
  Home,
  Mic,
  User as UserIcon,
  Zap,
  Wand2,
  MicVocal
} from "lucide-react"

export const mainNav = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    external: true
  }
]

export const dashboardNav = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Get a bird's eye view of your AI projects"
  }
]

export const sidebarNav = [
  {
    title: "AI Studio",
    icon: BrainCircuit,
    items: [
      {
        title: "Text Generation",
        href: "/dashboard/text",
        icon: FileText,
        badge: "New",
        description: "Generate human-like text content"
      },
      {
        title: "Image Creation",
        href: "/dashboard/image",
        icon: Palette,
        description: "Create stunning AI-generated images"
      },
      {
        title: "Code Assistant",
        href: "/dashboard/code",
        icon: Code2,
        description: "AI-powered code generation"
      },
      {
        title: "Chat Bot",
        href: "/dashboard/chat",
        icon: MessageSquare,
        description: "Interactive AI chat assistant"
      },
      {
        title: "Video Generator",
        href: "/dashboard/video",
        icon: Video,
        badge: "Beta",
        description: "Create AI-powered videos"
      },
      {
        title: "Audio Studio",
        href: "/dashboard/audio",
        icon: Music,
        description: "Text-to-speech and audio generation"
      },
      {
        title: "Website Builder",
        href: "/dashboard/website",
        icon: Languages,
        description: "Create stunning websites with AI"
      },
      {
        title: "Speech to Text",
        href: "/dashboard/speech",
        icon: Mic,
        description: "Convert speech to text"
      },
      {
        title: "Text to Speech",
        href: "/dashboard/text-to-speech",
        icon: MicVocal,
        description: "Convert text to speech"
      }
    ]
  },
  {
    title: "Workspace",
    icon: Boxes,
    items: [
      {
        title: "Projects",
        href: "/dashboard/projects",
        icon: Sparkles,
        description: "Manage your AI projects"
      },
      {
        title: "Team",
        href: "/dashboard/team",
        icon: Users,
        description: "Collaborate with team members"
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: LineChart,
        description: "Track usage and performance"
      },
      {
        title: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard,
        description: "Manage subscriptions and payments"
      }
    ]
  },
  {
    title: "Developer",
    icon: Bot,
    items: [
      {
        title: "API Keys",
        href: "/dashboard/api-keys",
        icon: KeyIcon,
        description: "Manage your API credentials"
      },
      {
        title: "Webhooks",
        href: "/dashboard/webhooks",
        icon: Webhook,
        description: "Configure webhook integrations"
      },
      {
        title: "Database",
        href: "/dashboard/database",
        icon: Database,
        description: "Manage your data storage"
      },
      {
        title: "Security",
        href: "/dashboard/security",
        icon: Shield,
        description: "Configure security settings"
      }
    ]
  }
]

export const userNav = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserIcon,
    description: "Manage your account settings"
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Configure your preferences"
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
    description: "Manage your subscription"
  }
] 