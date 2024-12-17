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
  Languages
} from "lucide-react"

export const dashboardConfig = {
  mainNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Get a bird's eye view of your AI projects"
    }
  ],
  sidebarNav: [
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
          title: "Language Tools",
          href: "/dashboard/language",
          icon: Languages,
          description: "Translation and language processing"
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
} 