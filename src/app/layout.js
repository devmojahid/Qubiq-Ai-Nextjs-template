import { Geist } from "next/font/google";
import "./globals.css";


const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = {
  title: {
    default: "Qubiq - AI Content Generation Platform",
    template: "%s | Qubiq"
  },
  description: "Next-generation AI platform for content creation and automation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
