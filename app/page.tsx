"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { tryGetSupabaseBrowserClient } from "@/lib/supabase/client"
import { HeroSection } from "@/components/hero-section"
import { useLanguage } from "@/contexts/language-context"
import type { Article } from "@/types"
import {
  ArrowRight,
  Car,
  FileText,
} from "lucide-react"

export default function HomePage() {
  const { t, language } = useLanguage()
  const isSpanish = language === "es"

  const [articles, setArticles] = useState<Article[]>([])

  // Load featured articles
  useEffect(() => {
    async function loadArticles() {
      const supabase = tryGetSupabaseBrowserClient()

      if (!supabase) return

      const { data, error } = await supabase
        .from("articles")
        .select(
          "id, title, title_es, slug, excerpt, excerpt_es"
        )
        .eq("published", true)
        .eq("featured", true)
        .order("published_date", { ascending: false })
        .limit(3)

      if (error) {
        console.error(
          "Homepage article fetch error:",
          error.message
        )
        return
      }

      setArticles(data || [])
    }

    loadArticles()
  }, [])

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
      <section className="bg-[#f8fafc] px-7 py-16 lg:py-20">
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
              {isSpanish ? "RECURSOS" : "RESOURCES"}
            </p>

            <h2
              className="mt-3 text-4xl font-black text-[#071226] md:text-5xl"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              {t("home.resourcesTitle")}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
              {t("home.resourcesSubtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            {/* FAQs */}
            <Link
              href="/resources#faqs"
              className="rounded-2xl border border-slate-200 p-8 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef5ff]">
                  <MessageCircle className="h-7 w-7 text-[#0b5fc4]" />
                </div>

                <h3 className="text-2xl font-bold">
                  {t("home.faqCardTitle")}
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  t("resources.faq1"),
                  t("resources.faq2"),
                  t("resources.faq3"),
                ].map((question) => (
                  <div
                    key={question}
                    className="flex items-center justify-between border-b pb-4 text-sm"
                  >
                    <span>{question}</span>
                    <ArrowRight className="h-4 w-4 text-[#0b5fc4]" />
                  </div>
                ))}
              </div>

              <div className="mt-6 font-bold text-[#0b5fc4]">
                {t("home.viewAllFaqs")} →
              </div>
            </Link>


            {/* Blog */}
            <div className="rounded-2xl border border-slate-200 p-8">

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef5ff]">
                  <FileText className="h-7 w-7 text-[#0b5fc4]" />
                </div>

                <h3 className="text-2xl font-bold">
                  {t("home.blogCardTitle")}
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                {articles.map((article) => {
                  const title =
                    isSpanish && article.title_es
                      ? article.title_es
                      : article.title

                  const excerpt =
                    isSpanish && article.excerpt_es
                      ? article.excerpt_es
                      : article.excerpt

                  return (
                    <Link
                      key={article.id}
                      href={`/resources/${article.slug}`}
                      className="block border-b pb-4"
                    >
                      <h4 className="font-bold">
                        {title}
                      </h4>

                      {excerpt && (
                        <p className="mt-1 text-sm text-slate-500">
                          {excerpt}
                        </p>
                      )}
                    </Link>
                  )
                })}
              </div>

              <Link
                href="/resources#articles"
                className="mt-6 inline-flex font-bold text-[#0b5fc4]"
              >
                {t("resources.viewAllArticles")} →
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="bg-[#082f63] px-7 py-16">
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
