"use client"

import Link from "next/link"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

type SiteHeaderProps = {
  activePage?: "home" | "how-it-works" | "get-connected" | "for-attorneys" | "resources"
}

export function SiteHeader({ activePage }: SiteHeaderProps) {
  const { t } = useLanguage()

  const linkClass = (page: SiteHeaderProps["activePage"]) =>
    `flex h-11 min-w-[118px] items-center justify-center border-b-2 text-sm font-bold ${activePage === page ? "border-white" : "border-transparent"
    }`

  return (
    <header className="relative z-50 mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between border-b border-white/12">
      <Link href="/" className="w-[260px] shrink-0 text-2xl font-bold tracking-tight text-white">
        AttorneyAbogado.com
      </Link>

      <nav className="hidden items-center justify-center gap-4 lg:flex">
        <Link href="/how-it-works" className={linkClass("how-it-works")}>
          {t("nav.howItWorks")}
        </Link>

        <Link href="/get-connected" className={linkClass("get-connected")}>
          {t("nav.getConnected")}
        </Link>


        <Link href="/resources" className={linkClass("resources")}>
          {t("nav.resources")}
        </Link>

        <div className="flex h-11 min-w-[100px] items-center justify-center">
          <LanguageToggle />
        </div>
      </nav>

      <div className="flex w-[260px] shrink-0 justify-end">
        <Link
          href="/for-attorneys"
          className="inline-flex h-11 items-center rounded-lg bg-[#061a38] px-5 text-sm font-bold text-white shadow-xl"
        >
          {t("nav.forAttorneys")}
        </Link>
      </div>
    </header>
  )
}