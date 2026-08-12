"use client"

import Image from "next/image"
import { MapPin, ArrowRight, Lock, ShieldCheck, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-[#0B3975] text-white">

      {/* Background decorative scales */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-[700px] w-[700px] rounded-full border border-white/[0.06]" />
        <div className="absolute right-[-80px] top-[40px] h-[560px] w-[560px] rounded-full border border-white/[0.05]" />

        <div className="absolute right-[5%] top-[20px] opacity-30">
          <div className="relative h-[430px] w-[430px]">
            <div className="absolute left-1/2 top-0 h-[80px] w-[5px] -translate-x-1/2 bg-white/20" />

            <div className="absolute left-[17%] top-[90px] h-[5px] w-[66%] bg-white/20" />

            <div className="absolute left-[20%] top-[92px] h-[230px] w-[5px] rotate-[20deg] origin-top bg-white/20" />
            <div className="absolute right-[20%] top-[92px] h-[230px] w-[5px] -rotate-[20deg] origin-top bg-white/20" />

            <div className="absolute left-[8%] top-[305px] h-[5px] w-[38%] rounded-full bg-white/20" />
            <div className="absolute right-[8%] top-[305px] h-[5px] w-[38%] rounded-full bg-white/20" />

            <div className="absolute left-1/2 top-[50px] h-[300px] w-[2px] -translate-x-1/2 bg-white/15" />
          </div>
        </div>

        {/* Dot pattern */}
        <div className="absolute right-[4%] top-0 grid grid-cols-8 gap-5 opacity-20">
          {Array.from({ length: 48 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-white"
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 pb-16 pt-16 sm:px-10 lg:px-16 lg:pb-20 lg:pt-20">

        {/* Main hero content */}
        <div className="relative min-h-[650px]">

          {/* Left content */}
          <div className="relative z-20 max-w-[700px] pt-2 lg:pt-8">

            <h1 className="font-[var(--font-heading)] text-6xl font-black leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[92px]">
              {t("hero.title")}
            </h1>

            <p className="mt-8 max-w-[720px] font-[var(--font-heading)] text-xl font-medium leading-relaxed text-white/95 sm:text-2xl lg:text-[25px]">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Attorney image */}
          <div className="pointer-events-none absolute right-[-50px] top-[-45px] z-10 hidden h-[560px] w-[650px] lg:block">
            <Image
              src="/attorney-hero.png"
              alt="Guzman Legal attorney"
              fill
              priority
              className="object-contain object-bottom"
            />
          </div>

          {/* Mobile attorney image */}
          <div className="pointer-events-none relative z-10 mx-auto mt-8 h-[330px] w-full max-w-[500px] lg:hidden">
            <Image
              src="/attorney-hero.png"
              alt="Guzman Legal attorney"
              fill
              priority
              className="object-contain object-bottom"
            />
          </div>

          {/* Attorney matching form */}
          <div className="relative z-30 mt-10 rounded-[28px] bg-white p-5 text-[#0A1830] shadow-2xl sm:p-7 lg:absolute lg:bottom-[25px] lg:left-0 lg:right-0 lg:mt-0 lg:p-7">

            <div className="grid gap-7 lg:grid-cols-[1fr_1fr_auto] lg:items-end">

              {/* ZIP CODE */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#081A36] text-lg font-bold text-white">
                    1
                  </span>

                  <label className="font-[var(--font-heading)] text-lg font-bold">
                    {t("hero.zipLabel")}
                  </label>
                </div>

                <div className="flex h-[72px] items-center rounded-xl border border-[#D9E0EA] px-5">
                  <MapPin className="mr-4 h-6 w-6 text-[#0A1830]" />

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder={t("hero.zipPlaceholder")}
                    className="w-full bg-transparent font-[var(--font-heading)] text-xl font-medium outline-none placeholder:text-[#66758D]"
                  />
                </div>
              </div>

              {/* LEGAL ISSUE */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#081A36] text-lg font-bold text-white">
                    2
                  </span>

                  <label className="font-[var(--font-heading)] text-lg font-bold">
                    {t("hero.issueLabel")}
                  </label>
                </div>

                <button
                  type="button"
                  className="flex h-[72px] w-full items-center justify-between rounded-xl border border-[#D9E0EA] px-6 text-left font-[var(--font-heading)] text-xl font-medium text-[#66758D]"
                >
                  <span>{t("hero.issuePlaceholder")}</span>

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* FIND BUTTON */}
              <button
                type="button"
                className="flex h-[72px] items-center justify-center gap-4 rounded-xl bg-[#061A38] px-8 font-[var(--font-heading)] text-lg font-bold text-white transition-all hover:bg-[#0A2754] lg:min-w-[270px]"
              >
                {t("hero.findButton")}
                <ArrowRight className="h-6 w-6" />
              </button>

            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="relative z-30 mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 text-white sm:gap-x-16">

          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6" />
            <span className="font-[var(--font-heading)] text-base font-semibold">
              {t("howItWorks.confidential")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6" />
            <span className="font-[var(--font-heading)] text-base font-semibold">
              {t("howItWorks.noObligation")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MessageCircle className="h-6 w-6" />
            <span className="font-[var(--font-heading)] text-base font-semibold">
              {t("howItWorks.spanish")}
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}