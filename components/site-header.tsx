"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

type ActivePage =
  | "practice-areas"
  | "attorney"
  | "blog"
  | "contact"
  | "home"
  | null

function getActivePage(pathname: string): ActivePage {
  if (pathname === "/") return "home"
  if (pathname.startsWith("/practice-areas")) return "practice-areas"
  if (pathname.startsWith("/attorney")) return "attorney"
  if (pathname.startsWith("/blog") || pathname.startsWith("/resources"))
    return "blog"
  if (pathname.startsWith("/contact")) return "contact"
  return null
}

export function SiteHeader() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const activePage = getActivePage(pathname ?? "")
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = (page: ActivePage) =>
    `flex h-12 items-center justify-center whitespace-nowrap border-b-2 text-[16px] font-medium tracking-wide transition-colors ${
      activePage === page
        ? "border-white text-white"
        : "border-transparent text-white hover:border-white"
    }`

  const mobileLinkClass = (page: ActivePage) =>
    `block rounded-xl px-5 py-4 text-lg font-medium transition-colors ${
      activePage === page
        ? "bg-white/10 text-white"
        : "text-white hover:bg-white/5"
    }`

  return (
    <header className="relative z-[9999] w-full border-b border-white/10 bg-[#0B3975]">

      {/* Main Header */}
      <div className="relative flex min-h-[88px] w-full items-center justify-between px-4 sm:px-8 lg:min-h-[132px] lg:px-12 xl:px-16">

        {/* Guzman Legal Logo */}
        <Link
          href="/"
          className="relative z-10 flex h-auto w-auto shrink-0 items-center justify-center lg:h-[100px] lg:w-[300px]"
        >
          <Image
            src="/guzman-logo.png"
            alt="Guzman Legal"
            width={360}
            height={120}
            priority
            className="h-20 w-auto sm:h-24 lg:h-[80px] lg:w-[240px]"
          />
        </Link>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-7">

          {/* Contact Information */}
          <div className="flex items-center gap-5 text-xs font-normal tracking-wide text-white/70">

            <a
              href="tel:8139331234"
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <Phone className="h-4 w-4" />
              <span>(813) 933-1234</span>
            </a>

            <a
              href="mailto:info@guzmanlegal.com"
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <Mail className="h-4 w-4" />
              <span>info@guzmanlegal.com</span>
            </a>

          </div>

          {/* Navigation + Language */}
          <div className="flex items-center gap-7">

            <nav className="flex items-center gap-7">

              <Link
                href="/practice-areas"
                className={linkClass("practice-areas")}
              >
                {t("nav.practiceAreas")}
              </Link>

              <Link
                href="/attorney"
                className={linkClass("attorney")}
              >
                {t("nav.attorney")}
              </Link>

              <Link
                href="/blog"
                className={linkClass("blog")}
              >
                {t("nav.blog")}
              </Link>

              <Link
                href="/contact"
                className={linkClass("contact")}
              >
                {t("nav.contact")}
              </Link>

            </nav>

            {/* Language Toggle */}
            <div className="relative z-10 flex items-center">
              <div className="rounded-full border border-white/30 bg-white/5 px-2 py-1">
                <LanguageToggle />
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute left-4 right-4 top-[88px] z-[99999] rounded-2xl border border-white/10 bg-[#0B3975] p-5 shadow-2xl lg:hidden">

          {/* Mobile Contact Information */}
          <div className="mb-4 space-y-3 border-b border-white/10 px-5 pb-5">

            <a
              href="tel:8139331234"
              className="flex items-center gap-3 text-white"
            >
              <Phone className="h-5 w-5" />
              <span>(813) 933-1234</span>
            </a>

            <a
              href="mailto:info@guzmanlegal.com"
              className="flex items-center gap-3 text-white"
            >
              <Mail className="h-5 w-5" />
              <span>info@guzmanlegal.com</span>
            </a>

          </div>

          <nav className="space-y-2">

            <Link
              href="/practice-areas"
              className={mobileLinkClass("practice-areas")}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.practiceAreas")}
            </Link>

            <Link
              href="/attorney"
              className={mobileLinkClass("attorney")}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.attorney")}
            </Link>

            <Link
              href="/blog"
              className={mobileLinkClass("blog")}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.blog")}
            </Link>

            <Link
              href="/contact"
              className={mobileLinkClass("contact")}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>

            {/* Language Toggle */}
            <div className="mt-3 flex justify-center border-t border-white/10 px-5 pt-5">
              <div className="rounded-full border border-white/30 bg-white/5 px-2 py-1">
                <LanguageToggle />
              </div>
            </div>

          </nav>
        </div>
      )}
    </header>
  )
}
