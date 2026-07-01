import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Merriweather } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { SiteFooter } from "@/components/site-footer"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })

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
  title: "AttorneyAbogado",
  description:
    "Find your attorney. Bilingual legal services in your language, in your community.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
          {children}
          <SiteFooter />
        </LanguageProvider>

        <Analytics />
      </body>
    </html>
  )
}