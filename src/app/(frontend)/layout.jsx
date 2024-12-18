import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default function FrontendLayout({ children }) {
  return (
    <>
      <div className={`${geist.variable} min-h-screen bg-background antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
                {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </div>
    </>
  )
} 