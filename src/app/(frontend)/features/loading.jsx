import { Sparkles, MessageSquare, FileCode, Wand2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="w-full space-y-16 md:space-y-24">
      {/* Hero Section Loading */}
      <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-primary/10 rounded-full mx-auto mb-6" />
              <div className="h-16 bg-secondary/30 rounded-2xl mb-4" />
              <div className="h-20 bg-secondary/30 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Loading */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="relative rounded-2xl border p-6 bg-background/50 animate-pulse"
              >
                <div className="aspect-video rounded-xl bg-secondary/30 mb-6" />
                <div className="space-y-3">
                  <div className="h-6 w-2/3 bg-secondary/30 rounded-lg" />
                  <div className="h-4 w-full bg-secondary/30 rounded-lg" />
                  <div className="h-4 w-5/6 bg-secondary/30 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features Loading */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-pulse">
            <div className="h-8 w-32 bg-primary/10 rounded-full mx-auto mb-6" />
            <div className="h-10 bg-secondary/30 rounded-2xl mb-4" />
            <div className="h-6 bg-secondary/30 rounded-2xl" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="rounded-2xl border p-6 bg-background/50 animate-pulse space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/30" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-secondary/30 rounded-lg" />
                    <div className="h-4 w-3/4 bg-secondary/30 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 bg-secondary/30 rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Loading */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-pulse">
            <div className="h-8 w-32 bg-primary/10 rounded-full mx-auto mb-6" />
            <div className="h-10 bg-secondary/30 rounded-2xl mb-4" />
            <div className="h-6 bg-secondary/30 rounded-2xl" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, label: "Content" },
              { icon: FileCode, label: "Development" },
              { icon: Wand2, label: "Design" }
            ].map((item, i) => (
              <div 
                key={i} 
                className="rounded-2xl border overflow-hidden bg-background/50 animate-pulse"
              >
                <div className="aspect-[16/10] bg-secondary/30" />
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <item.icon className="w-6 h-6 text-primary/50" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-secondary/30 rounded-lg" />
                      <div className="h-4 w-3/4 bg-secondary/30 rounded-lg" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-4 bg-secondary/30 rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Loading */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="rounded-3xl border overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="max-w-2xl mx-auto text-center animate-pulse space-y-6">
                <div className="h-8 w-32 bg-primary/10 rounded-full mx-auto" />
                <div className="h-10 bg-secondary/30 rounded-2xl" />
                <div className="h-6 bg-secondary/30 rounded-2xl w-3/4 mx-auto" />
                <div className="flex justify-center gap-4">
                  <div className="h-12 w-32 bg-primary/10 rounded-xl" />
                  <div className="h-12 w-32 bg-secondary rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 