"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { HeroSection } from "@/components/hero-section"
import { useLanguage } from "@/contexts/language-context"
import type { Article } from "@/types"
import {
  ArrowRight,
  Car,
  FileText,
  Shield,
} from "lucide-react"

export function HomePageContent({ articles }: { articles: Article[] }) {
  const { t, language } = useLanguage()
  const isSpanish = language === "es"

  const recentArticles = articles.slice(0, 3)

  const formatPublishedDate = (date: string | null | undefined) => {
    if (!date) return ""

    return new Intl.DateTimeFormat(isSpanish ? "es-US" : "en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date))
  }

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

      {/* =========================
          HERO (homepage only)
      ========================= */}
      <HeroSection />

      {/* =========================
          PRACTICE AREAS
      ========================= */}
      <section className="bg-[#f8fafc] px-4 py-16 sm:px-7 lg:py-20">
        <div className="mx-auto max-w-[1200px]">

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b5fc4]">
              {isSpanish ? "ÁREAS DE PRÁCTICA" : "PRACTICE AREAS"}
            </p>

            <h2
              className="mt-3 text-4xl font-black text-[#071226] md:text-5xl"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              {t("home.helpTitle")}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500">
              {t("home.helpSubtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#061a38]">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#071226]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>

                  <Link
                    href="/practice-areas"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0b5fc4]"
                  >
                    {isSpanish ? "VER MÁS" : "LEARN MORE"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/practice-areas"
              className="inline-flex items-center gap-3 rounded-lg bg-[#061a38] px-7 py-4 font-bold text-white transition hover:bg-[#0b2850]"
            >
              {isSpanish ? "VER TODAS LAS ÁREAS DE PRÁCTICA" : "VIEW ALL PRACTICE AREAS"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>


      {/* =========================
          ATTORNEY
      ========================= */}
      <section className="bg-white px-7 py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2">

          <div className="overflow-hidden rounded-xl">
            <Image
              src="/attorney-client-meeting.jpg"
              alt="Edgar J. Guzman, Esq. of Guzman Legal"
              width={700}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b5fc4]">
              {isSpanish ? "CONOZCA A SU ABOGADO" : "MEET YOUR ATTORNEY"}
            </p>

            <h2
              className="mt-3 text-4xl font-black text-[#071226] md:text-5xl"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              Edgar J. Guzman, Esq.
            </h2>

            <p className="mt-3 text-xl font-semibold text-[#0b5fc4]">
              25+ Years of Experience.
            </p>

            <p className="mt-5 leading-relaxed text-slate-600">
              {isSpanish
                ? "Edgar J. Guzman ha dedicado su carrera a defender los derechos de individuos, familias y empresas en Tampa Bay."
                : "Edgar J. Guzman has dedicated his career to representing individuals, families, and businesses throughout Tampa Bay."}
            </p>

            <p className="mt-4 leading-relaxed text-slate-600">
              {isSpanish
                ? "Con experiencia, dedicación y un enfoque personalizado, Guzman Legal está aquí para ayudarle."
                : "With experience, dedication, and a personalized approach, Guzman Legal is here to help."}
            </p>

            <Link
              href="/attorney"
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#061a38] px-7 py-4 font-bold text-white transition hover:bg-[#0b2850]"
            >
              {isSpanish ? "CONOZCA A EDGAR" : "MEET EDGAR"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>



      {/* =========================
          RESOURCES
      ========================= */}
      <section className="bg-white px-7 py-20">
        <div className="mx-auto max-w-[1100px]">

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b5fc4]">
              {isSpanish ? "DEL BLOG DE GUZMAN LEGAL" : "FROM THE GUZMAN LEGAL BLOG"}
            </p>

            <h2
              className="mt-3 text-4xl font-black text-[#071226] md:text-5xl"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              {isSpanish ? "Del Blog de Guzman Legal" : "From the Guzman Legal Blog"}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
              {t("home.resourcesSubtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentArticles.map((article) => {
              const title =
                isSpanish && article.title_es ? article.title_es : article.title
              const excerpt = article.excerpt
              const category =
                isSpanish && article.category_es
                  ? article.category_es
                  : article.category

              return (
                <article
                  key={article.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <Link href={`/resources/${article.slug}`} className="block">
                    {article.image_url ? (
                      <Image
                        src={article.image_url}
                        alt={title}
                        width={640}
                        height={360}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div
                        aria-label={isSpanish ? "Imagen del artículo" : "Article image"}
                        className="flex h-48 items-center justify-center bg-[#061a38] p-6 text-center"
                      >
                        <span className="text-sm font-black uppercase tracking-[0.18em] text-white/90">
                          Guzman Legal
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      {category && (
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0b5fc4]">
                          {category}
                        </p>
                      )}
                      <h3 className="mt-3 text-xl font-bold text-[#071226]">
                        {title}
                      </h3>
                      {excerpt && (
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                          {excerpt}
                        </p>
                      )}
                      {article.published_date && (
                        <time
                          dateTime={article.published_date}
                          className="mt-5 block text-xs font-semibold text-slate-500"
                        >
                          {formatPublishedDate(article.published_date)}
                        </time>
                      )}
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/resources#articles"
              className="inline-flex font-bold text-[#0b5fc4]"
            >
              {t("resources.viewAllArticles")} →
            </Link>
          </div>

        </div>
      </section>


      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="bg-[#082f63] px-4 py-16 sm:px-7">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

          <div>
            <h2
              className="text-3xl font-black text-white md:text-4xl"
              style={{
                fontFamily: "var(--font-heading)",
              }}
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
