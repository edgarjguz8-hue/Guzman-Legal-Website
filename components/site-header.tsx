"use client"

import { useState } from "react"
import Link from "next/link"
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
    `flex h-11 items-center justify-center border-b-2 text-sm font-bold ${
      activePage === page ? "border-white" : "border-transparent"
    }`

  const mobileLinkClass = (page: SiteHeaderProps["activePage"]) =>
    `block rounded-lg px-4 py-3 text-base font-bold ${
      activePage === page ? "bg-white/10 text-white" : "text-white"
    }`

  return (
    <header className="relative z-50 mx-auto w-full max-w-[1400px] border-b border-white/12">
      <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center">
        <Link
          href="/"
          className="justify-self-start text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          AttorneyAbogado.com
        </Link>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
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

        <div className="hidden items-center justify-end gap-6 lg:flex">
          <LanguageToggle />

          <Link
            href="/for-attorneys"
            className="inline-flex h-11 items-center rounded-lg bg-[#061a38] px-5 text-sm font-bold text-white shadow-xl"
          >
            {t("nav.forAttorneys")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="justify-self-end inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white lg:hidden"
          aria-label="Open menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-20 z-50 rounded-b-2xl border border-white/10 bg-[#082f63] p-4 shadow-2xl lg:hidden">
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

            <div className="px-4 py-3">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}