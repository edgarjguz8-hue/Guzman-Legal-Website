"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/language-context"
import {
  ArrowRight,
  Calendar,
  Clock,
  Mail,
  ChevronDown,
} from "lucide-react"

type Article = {
  id: string
  title: string
  title_es: string | null
  slug: string
  category: string | null
  category_es: string | null
  excerpt: string | null
  excerpt_es: string | null
  image_url: string | null
  read_time: string | null
  read_time_es: string | null
  published_date: string | null
}

type Topic = {
  category: string
  category_es: string | null
}

export default function ResourcesPage() {
  const { t, language } = useLanguage()
  const isSpanish = language === "es"

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [articles, setArticles] = useState<Article[]>([])
  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    async function loadResources() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        console.error("Missing Supabase keys")
        return
      }

      const supabase = createClient(supabaseUrl, supabaseKey)

      const { data: articleData, error: articleError } = await supabase
        .from("articles")
        .select(`
          id,
          title,
          title_es,
          slug,
          category,
          category_es,
          excerpt,
          excerpt_es,
          image_url,
          read_time,
          read_time_es,
          published_date
        `)
        .eq("published", true)
        .eq("featured", true)
        .order("published_date", { ascending: false })
        .limit(3)

      if (articleError) {
        console.error("Article fetch error:", articleError.message)
        return
      }

      setArticles(articleData || [])

      const { data: topicData, error: topicError } = await supabase
        .from("articles")
        .select("category, category_es")
        .eq("published", true)
        .not("category", "is", null)

      if (topicError) {
        console.error("Topic fetch error:", topicError.message)
        return
      }

      const uniqueTopics = Array.from(
        new Map(
          (topicData || [])
            .filter((item) => item.category)
            .map((item) => [
              item.category,
              {
                category: item.category as string,
                category_es: item.category_es,
              },
            ])
        ).values()
      )

      setTopics(uniqueTopics)
    }

    loadResources()
  }, [])

  const faqs = [
    {
      question: t("resources.faq1"),
      answer: t("resources.faq1Answer"),
    },
    {
      question: t("resources.faq2"),
      answer: t("resources.faq2Answer"),
    },
    {
      question: t("resources.faq3"),
      answer: t("resources.faq3Answer"),
    },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-[#071226]">
      <section className="bg-[#082f63] px-5 pt-6 text-white sm:px-7">
        <div className="mx-auto max-w-[1400px]">
          <SiteHeader activePage="resources" />
        </div>

        <div className="relative mx-auto mt-6 max-w-[1400px] overflow-hidden px-1 pb-14 pt-8 sm:mt-8 sm:pb-16 sm:pt-12 md:mt-12 md:px-0 md:pb-24 md:pt-20">
          <div className="pointer-events-none absolute right-12 top-6 hidden text-[180px] font-black text-white/10 md:block md:text-[220px]">
            ⚖
          </div>

          <div className="relative z-10">
            <h1
              className="max-w-[320px] text-5xl font-black leading-none tracking-tight sm:max-w-full sm:text-6xl md:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("resources.title")}
            </h1>

            <div className="mt-4 h-1 w-12 rounded-full bg-[#0b5fc4]" />

            <p className="mt-5 max-w-2xl text-lg leading-7 text-white/90 sm:text-xl">
              {t("resources.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section id="articles" className="scroll-mt-24 px-5 py-12 sm:px-7 sm:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionTitle title={t("resources.helpfulArticles")} />

            <div className="mt-7 space-y-6">
              {articles.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
                  {isSpanish
                    ? "No hay artículos publicados todavía."
                    : "No articles are published yet."}
                </div>
              )}

              {articles.map((article) => {
                const title =
                  isSpanish && article.title_es ? article.title_es : article.title

                const category =
                  isSpanish && article.category_es
                    ? article.category_es
                    : article.category

                const excerpt =
                  isSpanish && article.excerpt_es
                    ? article.excerpt_es
                    : article.excerpt

                const readTime =
                  isSpanish && article.read_time_es
                    ? article.read_time_es
                    : article.read_time || "5 min read"

                return (
                  <a
                    key={article.id}
                    href={`/resources/${article.slug}`}
                    className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md md:grid-cols-[250px_1fr]"
                  >
                    <img
                      src={article.image_url || "/placeholder.jpg"}
                      alt={title}
                      className="h-52 w-full object-cover md:h-full"
                    />

                    <div className="p-6 sm:p-7">
                      {category && (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0b5fc4]">
                          {category}
                        </span>
                      )}

                      <h3 className="mt-4 text-2xl font-black leading-tight text-[#071226]">
                        {title}
                      </h3>

                      {excerpt && (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                          {excerpt}
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(article.published_date, isSpanish)}
                        </span>

                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {readTime}
                        </span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>

            <a
              href="/resources"
              className="mt-7 inline-flex items-center gap-3 font-black text-[#0b5fc4]"
            >
              {t("resources.viewAllArticles")}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <aside>
            <SectionTitle title={t("resources.popularTopics")} />

            <div className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {topics.length === 0 && (
                <div className="px-7 py-6 text-slate-600">
                  {isSpanish ? "No hay temas todavía." : "No topics yet."}
                </div>
              )}

              {topics.map((topic) => {
                const topicLabel =
                  isSpanish && topic.category_es
                    ? topic.category_es
                    : topic.category

                return (
                  <a
                    key={topic.category}
                    href={`/resources?category=${encodeURIComponent(topic.category)}`}
                    className="flex items-center justify-between border-b border-slate-200 px-7 py-6 font-black last:border-b-0"
                  >
                    {topicLabel}
                    <ArrowRight className="h-5 w-5 text-[#0b5fc4]" />
                  </a>
                )
              })}

              <a
                href="/resources"
                className="flex items-center gap-3 border-t border-slate-200 px-7 py-6 font-black text-[#0b5fc4]"
              >
                {t("resources.browseAllTopics")}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section id="faqs" className="scroll-mt-24 px-5 pb-14 sm:px-7">
        <div className="mx-auto max-w-[1400px] border-t border-slate-200 pt-12">
          <SectionTitle title={t("resources.faqTitle")} />

          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-7 py-5 text-left transition hover:bg-slate-50"
                  >
                    <span className="text-lg font-black text-[#071226]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 text-[#0b5fc4] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-7 py-6">
                      <p className="max-w-4xl text-[16px] leading-8 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <a
            href="#faqs"
            className="mt-7 inline-flex items-center gap-3 font-black text-[#0b5fc4]"
          >
            {t("resources.viewAllFaqs")}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-7">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 rounded-2xl bg-[#eef5ff] p-6 sm:p-8 md:flex-row">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white">
              <Mail className="h-8 w-8 text-[#0b5fc4]" />
            </div>

            <div>
              <h3 className="text-2xl font-black sm:text-3xl">
                {t("resources.stayInformed")}
              </h3>

              <p className="mt-1 text-slate-600">
                {t("resources.stayInformedText")}
              </p>
            </div>
          </div>

          <form className="flex w-full flex-col gap-4 sm:flex-row md:max-w-[620px]">
            <input
              type="email"
              placeholder={t("resources.emailPlaceholder")}
              className="h-14 flex-1 rounded-lg border border-slate-200 px-5 outline-none"
            />

            <button
              type="submit"
              className="h-14 rounded-lg bg-[#0b5fc4] px-8 font-black text-white"
            >
              {t("resources.subscribe")}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div>
      <h2
        className="text-3xl font-black text-[#071226] sm:text-4xl"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>

      <div className="mt-4 h-1 w-12 rounded-full bg-[#0b5fc4]" />
    </div>
  )
}

function formatDate(date: string | null, isSpanish: boolean) {
  if (!date) return ""

  return new Date(date).toLocaleDateString(isSpanish ? "es-US" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}