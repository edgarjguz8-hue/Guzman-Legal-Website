"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { ArrowRight, Car, Shield, FileText } from "lucide-react"

export default function PracticeAreasPage() {
  const { t, language } = useLanguage()
  const isSpanish = language === "es"

  const practiceAreas = [
    {
      icon: Car,
      title: t("practice.carAccidents"),
      text: t("home.practiceCarDesc"),
    },
    {
      icon: Shield,
      title: t("practice.criminalDefense"),
      text: t("home.practiceCriminalDesc"),
    },
    {
      icon: FileText,
      title: t("practice.businessLaw"),
      text: t("home.practiceBusinessDesc"),
    },
  ]

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      {/* Page hero */}
      <section className="bg-[#082f63] px-4 py-16 sm:px-7 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#7fb0ee]">
            {isSpanish ? "ÁREAS DE PRÁCTICA" : "PRACTICE AREAS"}
          </p>

          <h1
            className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isSpanish
              ? "Representación legal para lo que importa."
              : "Legal representation for what matters."}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {t("home.helpSubtitle")}
          </p>
        </div>
      </section>

      {/* Practice area cards */}
      <section className="px-4 py-16 sm:px-7 lg:py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-6 lg:grid-cols-3">
            {practiceAreas.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#061a38]">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#071226]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>

                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0b5fc4]"
                  >
                    {isSpanish ? "CONTÁCTENOS" : "GET HELP"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#082f63] px-4 py-16 sm:px-7">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <h2
              className="text-3xl font-black text-white md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isSpanish
                ? "¿Tiene preguntas sobre su caso?"
                : "Have questions about your case?"}
            </h2>

            <p className="mt-2 text-white/80">
              {isSpanish
                ? "Estamos aquí para ayudar."
                : "We're here to help."}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-lg bg-white px-7 py-4 font-bold text-[#071226] transition hover:bg-slate-100"
          >
            {isSpanish ? "CONTÁCTENOS" : "CONTACT US"}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
