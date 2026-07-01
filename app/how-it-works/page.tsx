"use client"

import { BackButton } from "@/components/back-button"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/language-context"

export default function HowItWorksPage() {
  const { t } = useLanguage()

  const trustItems = [
    t("howItWorks.localAttorneys"),
    t("howItWorks.confidential"),
    t("howItWorks.noObligation"),
    t("howItWorks.spanish"),
  ]

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      <section className="bg-[#082f63] px-7 pb-12 pt-6 text-white">
        <div className="mx-auto max-w-[1400px]">
          <BackButton />
        </div>

        <SiteHeader activePage="how-it-works" />

        <div className="mx-auto max-w-[950px] py-12 text-center">
          <h2
            className="text-5xl font-black md:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("howItWorks.title")}
          </h2>

          <p className="mt-5 text-xl text-white/90">
            {t("howItWorks.subtitle")}
          </p>
        </div>
      </section>

      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1150px]">
          <div className="text-center">
            <h3 className="text-3xl font-black">
              {t("howItWorks.threeSteps")}
            </h3>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#0b5fc4]" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-black text-[#0b5fc4]">
                {t("howItWorks.step1Label")}
              </p>
              <h4 className="mt-3 text-2xl font-black">
                {t("howItWorks.step1Title")}
              </h4>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {t("howItWorks.step1")}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-black text-[#0b5fc4]">
                {t("howItWorks.step2Label")}
              </p>
              <h4 className="mt-3 text-2xl font-black">
                {t("howItWorks.step2Title")}
              </h4>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {t("howItWorks.step2")}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-black text-[#0b5fc4]">
                {t("howItWorks.step3Label")}
              </p>
              <h4 className="mt-3 text-2xl font-black">
                {t("howItWorks.step3Title")}
              </h4>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {t("howItWorks.step3")}
              </p>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-3xl font-black">
              {t("howItWorks.whyUse")}
            </h3>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#0b5fc4]" />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {trustItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white p-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
              >
                <p className="text-lg font-black">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <h3 className="text-center text-3xl font-black">
              {t("howItWorks.faqTitle")}
            </h3>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#0b5fc4]" />

            <div className="mt-10 space-y-4">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="font-black">
                  {t("howItWorks.faq1Question")}
                </h4>
                <p className="mt-2 text-slate-600">
                  {t("howItWorks.faq1Answer")}
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="font-black">
                  {t("howItWorks.faq2Question")}
                </h4>
                <p className="mt-2 text-slate-600">
                  {t("howItWorks.faq2Answer")}
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="font-black">
                  {t("howItWorks.faq3Question")}
                </h4>
                <p className="mt-2 text-slate-600">
                  {t("howItWorks.faq3Answer")}
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h4 className="font-black">
                  {t("howItWorks.faq4Question")}
                </h4>
                <p className="mt-2 text-slate-600">
                  {t("howItWorks.faq4Answer")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 rounded-2xl bg-[#082f63] p-10 text-center text-white">
            <h3 className="text-3xl font-black">
              {t("howItWorks.ctaTitle")}
            </h3>

            <p className="mt-3 text-white/80">
              {t("howItWorks.ctaText")}
            </p>

            <a
              href="/"
              className="mt-6 inline-flex rounded-lg bg-white px-8 py-4 font-black text-[#071226]"
            >
              {t("howItWorks.ctaButton")}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}