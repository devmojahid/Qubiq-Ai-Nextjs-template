export const documentationData = {
  categories: [
    {
      title: "Getting Started",
      slug: "getting-started",
      icon: "Lightbulb",
      color: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
      items: [
        {
          id: "introduction",
          title: "Introduction",
          description: "Get started with our AI platform",
          slug: "introduction"
        },
        {
          id: "quick-start",
          title: "Quick Start Guide",
          description: "Set up your first AI project",
          slug: "quick-start"
        },
        {
          id: "installation",
          title: "Installation",
          description: "Install and configure the platform",
          slug: "installation"
        }
      ]
    },
    {
      title: "API Reference",
      slug: "api-reference",
      icon: "Code2",
      color: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
      items: [
        {
          id: "authentication",
          title: "Authentication",
          description: "Learn how to authenticate your API requests",
          slug: "authentication"
        },
        {
          id: "endpoints",
          title: "API Endpoints",
          description: "Explore available API endpoints",
          slug: "endpoints"
        },
        {
          id: "error-handling",
          title: "Error Handling",
          description: "Handle API errors properly",
          slug: "error-handling"
        }
      ]
    }
  ],
  articles: {
    "introduction": {
      title: "Introduction to Our AI Platform",
      description: "Get started with our powerful AI platform",
      lastUpdated: "2024-02-21",
      views: "15.2K",
      author: {
        name: "Jane Smith",
        avatar: "/images/team/jane.jpg",
        role: "Product Manager"
      },
      tableOfContents: [
        {
          title: "Overview",
          id: "overview",
          items: []
        },
        {
          title: "Key Features",
          id: "features",
          items: [
            { title: "AI Capabilities", id: "ai-capabilities" },
            { title: "Platform Benefits", id: "benefits" }
          ]
        }
      ],
      content: `
        ## Introduction

        Authentication is crucial for API security. This guide explains how to implement authentication in your application.

        ## Getting Started

        Before you begin, ensure you have your API credentials ready.

        ### API Keys

        API keys are the simplest way to authenticate requests. Here's an example:

        \`\`\`javascript
        const client = new AI.Client({
          apiKey: process.env.AI_API_KEY,
          version: 'v1'
        });

        // Make authenticated request
        try {
          const response = await client.authenticate({
            type: 'bearer',
            token: 'your-jwt-token'
          });
        } catch (error) {
        }
        \`\`\`
      `,
      relatedDocs: [
        {
          title: "Quick Start Guide",
          description: "Start building with AI",
          slug: "quick-start"
        }
      ]
    },
    "quick-start": {
      // Add quick start guide content
    },
    "installation": {
      // Add installation guide content
    },
    "authentication": {
      title: "Authentication Guide",
      description: "Learn how to authenticate your API requests and secure your application",
      lastUpdated: "2024-02-20",
      views: "12.5K",
      author: {
        name: "John Doe",
        avatar: "/images/team/john.jpg",
        role: "Lead Developer"
      },
      tableOfContents: [
        {
          title: "Introduction",
          id: "introduction",
          items: []
        },
        {
          title: "Getting Started",
          id: "getting-started",
          items: [
            { title: "API Keys", id: "api-keys" },
            { title: "Authentication Methods", id: "auth-methods" }
          ]
        }
      ],
      content: `
        ## Introduction

        Authentication is crucial for API security. This guide explains how to implement authentication in your application.

        ## Getting Started

        Before you begin, ensure you have your API credentials ready.

        ### API Keys

        API keys are the simplest way to authenticate requests. Here's an example:

        \`\`\`javascript
        const client = new AI.Client({
          apiKey: process.env.AI_API_KEY,
          version: 'v1'
        });

        // Make authenticated request
        try {
          const response = await client.authenticate({
            type: 'bearer',
            token: 'your-jwt-token'
          });
          
        } catch (error) {
        }
        \`\`\`
      `,
      relatedDocs: [
        {
          title: "Error Handling",
          description: "Learn about error codes and handling",
          slug: "error-handling"
        },
        {
          title: "Rate Limiting",
          description: "Understanding API rate limits",
          slug: "rate-limiting"
        }
      ]
    },
    "endpoints": {
      title: "API Endpoints",
      description: "Complete reference of all available API endpoints",
      lastUpdated: "2024-02-19",
      views: "8.3K",
      author: {
        name: "Alex Johnson",
        avatar: "/images/team/alex.jpg",
        role: "API Engineer"
      },
      tableOfContents: [
        {
          title: "REST API",
          id: "rest-api",
          items: [
            { title: "Base URL", id: "base-url" },
            { title: "Endpoints List", id: "endpoints-list" }
          ]
        }
      ],
      content: `
        ## API Endpoints

        This section provides a complete reference of all available API endpoints.

        ### REST API

        The REST API is the primary way to interact with our platform. Below are the base URL and a list of available endpoints.

        \`\`\`
        const client = new AI.Client({
          apiKey: process.env.AI_API_KEY,
          version: 'v1'
        });

        // Make authenticated request
        try {
          const response = await client.authenticate({
            type: 'bearer',
            token: 'your-jwt-token'
          });
          
        } catch (error) {
        }
        \`\`\`
      `,
      relatedDocs: [
        {
          title: "Authentication",
          description: "Learn about API authentication",
          slug: "authentication"
        }
      ]
    },
    "error-handling": {
      // Add error handling content
    }
  }
} 