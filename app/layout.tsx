import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Merriweather } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const merriweather = Merriweather({
  variable: "--font-heading",
  weight: ["700", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Guzman Legal",
  description:
    "Guzman Legal represents individuals, families, and businesses throughout Tampa Bay.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#082f63",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable}`}
      >
        <LanguageProvider>
          <SiteHeader />

          {children}

          <SiteFooter />
        </LanguageProvider>

        <Analytics />
      </body>
    </html>
  )
}
