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
        ? "border-[#061a38] text-[#061a38]"
        : "border-transparent text-[#061a38] hover:border-[#061a38]"
    }`

  const mobileLinkClass = (page: SiteHeaderProps["activePage"]) =>
    `block rounded-xl px-5 py-4 text-lg font-medium ${
      activePage === page
        ? "bg-[#061a38]/10 text-[#061a38]"
        : "text-[#061a38]"
    }`

  return (
    <header className="relative z-[9999] mx-auto w-full border-b border-[#061a38]/10 bg-[#faf9f6]">
      <div className="relative mx-auto flex h-24 max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12">

        {/* Guzman Legal Logo */}
        <Link
          href="/"
          className="relative z-10 flex h-20 shrink-0 items-center"
        >
          <Image
            src="/guzman-logo.png"
            alt="Guzman Legal"
            width={300}
            height={100}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-12 lg:flex">
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#061a38] lg:hidden"
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
        <div className="absolute left-4 right-4 top-[88px] z-[99999] rounded-2xl border border-[#061a38]/10 bg-[#faf9f6] p-5 shadow-2xl lg:hidden">
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