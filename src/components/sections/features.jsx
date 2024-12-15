import { Code, Image, MessageSquare, Music } from "lucide-react"

const features = [
  {
    name: "Text Generation",
    description: "Generate human-like text for articles, stories, and more.",
    icon: MessageSquare,
  },
  {
    name: "Code Generation",
    description: "Transform natural language into working code across languages.",
    icon: Code,
  },
  {
    name: "Image Generation",
    description: "Create stunning images from textual descriptions.",
    icon: Image,
  },
  {
    name: "Audio Processing",
    description: "Convert speech to text and text to natural-sounding speech.",
    icon: Music,
  },
]

export function Features() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful AI Solutions
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our platform offers a comprehensive suite of AI-powered tools to help you
            create, innovate, and transform your ideas into reality.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative rounded-2xl border bg-card p-6 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.name}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 