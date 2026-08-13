"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
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
  // Blog nav item stays active on both the /blog and legacy /resources routes
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
    `flex h-11 items-center justify-center whitespace-nowrap border-b-2 text-[15px] font-medium tracking-wide transition-colors ${
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
      <div className="relative flex h-28 w-full items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-20">

        {/* Guzman Legal Logo */}
        <Link
          href="/"
          className="relative z-10 flex h-28 shrink-0 items-center"
        >
          <Image
            src="/guzman-logo.png"
            alt="Guzman Legal"
            width={300}
            height={100}
            priority
            className="h-16 w-auto sm:h-[72px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-14 lg:flex">

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

        {/* English / Spanish Toggle */}
        <div className="relative z-10 hidden lg:flex items-center">
          <div className="rounded-full border border-white/30 bg-white/5 px-2 py-1">
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute left-4 right-4 top-[112px] z-[99999] rounded-2xl border border-white/10 bg-[#0B3975] p-5 shadow-2xl lg:hidden">
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
