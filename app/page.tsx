"use client"

import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      <SiteHeader />

      <HeroSection />

      {/* Practice Areas */}
      {/* Attorney */}
      {/* Testimonials */}
      {/* Contact */}
    </main>
  )
}