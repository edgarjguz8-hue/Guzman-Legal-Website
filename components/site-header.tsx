"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

type SiteHeaderProps = {
  activePage?:
    | "home"
    | "how-it-works"
    | "get-connected"
    | "for-attorneys"
    | "resources"
}

export function SiteHeader({ activePage }: SiteHeaderProps) {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = (page: SiteHeaderProps["activePage"]) =>
    `flex h-11 items-center justify-center whitespace-nowrap border-b-2 text-sm font-bold ${
      activePage === page ? "border-white" : "border-transparent"
    }`

  const mobileLinkClass = (page: SiteHeaderProps["activePage"]) =>
    `block rounded-xl px-5 py-4 text-lg font-bold ${
      activePage === page ? "bg-white/10 text-white" : "text-white"
    }`

  return (
    <header className="relative z-[9999] mx-auto w-full max-w-[1400px] border-b border-white/12">
      <div className="relative flex h-28 items-center justify-between gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 flex h-28 shrink-0 items-center"
        >
          <Image
            src="/logo-header.png"
            alt="AttorneyAbogado.com"
            width={900}
            height={250}
            priority
            className="h-20 w-auto sm:h-24 lg:h-28"
          />
        </Link>

        {/* Perfectly centered desktop navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-14 lg:flex">
          <Link href="/how-it-works" className={linkClass("how-it-works")}>
            {t("nav.howItWorks")}
          </Link>

          <Link href="/get-connected" className={linkClass("get-connected")}>
            {t("nav.getConnected")}
          </Link>

          <Link href="/resources" className={linkClass("resources")}>
            {t("nav.resources")}
          </Link>
        </nav>

        {/* Right-side desktop buttons */}
        <div className="relative z-10 hidden items-center justify-end gap-6 lg:flex">
          <LanguageToggle />

          <Link
            href="/for-attorneys"
            className="inline-flex h-11 items-center whitespace-nowrap rounded-lg bg-[#061a38] px-5 text-sm font-bold text-white shadow-xl"
          >
            {t("nav.forAttorneys")}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed left-4 right-4 top-32 z-[99999] rounded-2xl border border-white/10 bg-[#061a38] p-5 shadow-2xl lg:hidden">
          <nav className="space-y-2">
            <Link
              href="/how-it-works"
              className={mobileLinkClass("how-it-works")}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.howItWorks")}
            </Link>

            <Link
              href="/get-connected"
              className={mobileLinkClass("get-connected")}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.getConnected")}
            </Link>

            <Link
              href="/resources"
              className={mobileLinkClass("resources")}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.resources")}
            </Link>

            <Link
              href="/for-attorneys"
              className={mobileLinkClass("for-attorneys")}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.forAttorneys")}
            </Link>

            <div className="px-5 py-4">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}