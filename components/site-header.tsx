"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

type SiteHeaderProps = {
  activePage?: "practice-areas" | "attorney" | "blog" | "contact"
}

export function SiteHeader({ activePage }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = (page: SiteHeaderProps["activePage"]) =>
    `flex h-11 items-center justify-center whitespace-nowrap border-b-2 text-[15px] font-medium tracking-wide transition-colors ${
      activePage === page
        ? "border-white text-white"
        : "border-transparent text-white hover:border-white"
    }`

  const mobileLinkClass = (page: SiteHeaderProps["activePage"]) =>
    `block rounded-xl px-5 py-4 text-lg font-medium transition-colors ${
      activePage === page
        ? "bg-white/10 text-white"
        : "text-white hover:bg-white/5"
    }`

  return (
    <header className="relative z-[9999] mx-auto w-full border-b border-white/10 bg-[#0B3975]">
      <div className="relative mx-auto flex h-28 max-w-[1400px] items-center justify-between px-8 sm:px-10 lg:px-14">

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
        <nav className="hidden items-center gap-16 lg:flex">

          <Link
            href="/practice-areas"
            className={linkClass("practice-areas")}
          >
            PRACTICE AREAS
          </Link>

          <Link
            href="/attorney"
            className={linkClass("attorney")}
          >
            ATTORNEY
          </Link>

          <Link
            href="/blog"
            className={linkClass("blog")}
          >
            BLOG
          </Link>

          <Link
            href="/contact"
            className={linkClass("contact")}
          >
            CONTACT
          </Link>

        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white lg:hidden"
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
              PRACTICE AREAS
            </Link>

            <Link
              href="/attorney"
              className={mobileLinkClass("attorney")}
              onClick={() => setMenuOpen(false)}
            >
              ATTORNEY
            </Link>

            <Link
              href="/blog"
              className={mobileLinkClass("blog")}
              onClick={() => setMenuOpen(false)}
            >
              BLOG
            </Link>

            <Link
              href="/contact"
              className={mobileLinkClass("contact")}
              onClick={() => setMenuOpen(false)}
            >
              CONTACT
            </Link>

          </nav>
        </div>
      )}
    </header>
  )
}