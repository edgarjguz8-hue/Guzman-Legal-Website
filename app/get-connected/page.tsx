"use client"

import { BackButton } from "@/components/back-button"
import { GetConnectedForm } from "@/components/get-connected-form"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/language-context"

export default function GetConnectedPage() {
  const { t } = useLanguage()

  const trustItems = [
    t("howItWorks.confidential"),
    t("howItWorks.noObligation"),
    t("getConnected.freeMatching"),
    t("howItWorks.spanish"),
  ]

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      <section className="bg-[#082f63] px-7 pb-24 pt-6 text-white">
        <div className="mx-auto max-w-[1400px]">
          <BackButton />
        </div>

        <SiteHeader activePage="get-connected" />

        <div className="mx-auto max-w-[900px] py-20 text-center">
          <h2
            className="text-5xl font-black md:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("getConnected.title")}
          </h2>

          <p className="mt-6 text-xl text-white/90">
            {t("getConnected.subtitle")}
          </p>
        </div>
      </section>

      <section className="-mt-12 px-7">
        <div className="mx-auto max-w-[900px] rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
          <h3 className="text-center text-3xl font-black">
            {t("getConnected.cardTitle")}
          </h3>

          <p className="mt-3 text-center text-slate-600">
            {t("getConnected.cardText")}
          </p>

          <GetConnectedForm />
        </div>
      </section>

      <section className="px-7 py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <h3 className="text-3xl font-black">
              {t("getConnected.whatHappens")}
            </h3>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#0b5fc4]" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-black text-[#0b5fc4]">01</p>

              <h4 className="mt-3 text-xl font-black">
                {t("getConnected.step1Title")}
              </h4>

              <p className="mt-3 text-slate-600">
                {t("getConnected.step1Text")}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-black text-[#0b5fc4]">02</p>

              <h4 className="mt-3 text-xl font-black">
                {t("getConnected.step2Title")}
              </h4>

              <p className="mt-3 text-slate-600">
                {t("getConnected.step2Text")}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-black text-[#0b5fc4]">03</p>

              <h4 className="mt-3 text-xl font-black">
                {t("getConnected.step3Title")}
              </h4>

              <p className="mt-3 text-slate-600">
                {t("getConnected.step3Text")}
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-4">
            {trustItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white p-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
              >
                <p className="font-black">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-[#082f63] p-10 text-center text-white">
            <h3 className="text-3xl font-black">
              {t("getConnected.ctaTitle")}
            </h3>

            <p className="mt-3 text-white/80">
              {t("getConnected.ctaText")}
            </p>

            <a
              href="/"
              className="mt-6 inline-flex rounded-lg bg-white px-8 py-4 font-black text-[#071226]"
            >
              {t("getConnected.ctaButton")}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}