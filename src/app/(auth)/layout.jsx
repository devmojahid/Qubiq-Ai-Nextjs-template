import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

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
            {children}
        </ThemeProvider>
      </div>
    </>
  )
} 