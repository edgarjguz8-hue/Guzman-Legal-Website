"use client"

import { useEffect, useState } from "react"
import { tryGetSupabaseBrowserClient } from "@/lib/supabase/client"
import { useLanguage } from "@/contexts/language-context"
import {
  ArrowRight,
  Calendar,
  Clock,
  Mail,
  ChevronDown,
} from "lucide-react"

import type { Article } from "@/types"

type Topic = {
  category: string
  category_es: string | null
}

type ArticleView = "featured" | "category" | "all"

export function ResourcesContent() {
  const { t, language } = useLanguage()
  const isSpanish = language === "es"

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [articles, setArticles] = useState<Article[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [articleView, setArticleView] = useState<ArticleView>("featured")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadResources() {
      setLoading(true)

      const supabase = tryGetSupabaseBrowserClient()

      if (!supabase) {
        console.error("Missing Supabase keys")
        setLoading(false)
        return
      }

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
          published_date,
          featured
        `)
        .eq("published", true)
        .order("published_date", { ascending: false })

      if (articleError) {
        console.error("Article fetch error:", articleError.message)
        setLoading(false)
        return
      }

      const loadedArticles = articleData || []
      setArticles(loadedArticles)

      const uniqueTopics = Array.from(
        new Map(
          loadedArticles
            .filter((article) => article.category?.trim())
            .map((article) => [
              article.category!.trim().toLowerCase(),
              {
                category: article.category!.trim(),
                category_es: article.category_es?.trim() || null,
              },
            ])
        ).values()
      )

      setTopics(uniqueTopics)
      setLoading(false)
    }

    loadResources()
  }, [])

  const featuredArticles = articles
    .filter((article) => article.featured === true)
    .slice(0, 3)

  const categoryArticles = articles.filter(
    (article) =>
      article.category?.trim().toLowerCase() ===
      selectedCategory.trim().toLowerCase()
  )

  const displayedArticles =
    articleView === "featured"
      ? featuredArticles
      : articleView === "category"
        ? categoryArticles
        : articles

  const scrollToArticles = () => {
    window.setTimeout(() => {
      document
        .getElementById("articles")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setArticleView("category")
    scrollToArticles()
  }

  const handleViewAll = () => {
    setSelectedCategory("")
    setArticleView("all")
    scrollToArticles()
  }

  const handleBackToFeatured = () => {
    setSelectedCategory("")
    setArticleView("featured")
    scrollToArticles()
  }

  const selectedTopicLabel =
    topics.find(
      (topic) =>
        topic.category.trim().toLowerCase() ===
        selectedCategory.trim().toLowerCase()
    ) || null

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
      <section className="bg-[#082f63] px-5 py-14 text-white sm:px-7 sm:py-16 md:py-20">
        <div className="relative mx-auto max-w-[1400px]">
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

      <section
        id="articles"
        className="scroll-mt-24 px-4 py-12 sm:px-7 sm:py-16"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 xl:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionTitle title={t("resources.helpfulArticles")} />

            {articleView === "category" && selectedTopicLabel && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-slate-500">
                  {isSpanish ? "Mostrando:" : "Showing:"}
                </span>

                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#0b5fc4]">
                  {isSpanish && selectedTopicLabel.category_es
                    ? selectedTopicLabel.category_es
                    : selectedTopicLabel.category}
                </span>

                <button
                  type="button"
                  onClick={handleViewAll}
                  className="text-sm font-black text-[#0b5fc4] underline"
                >
                  {isSpanish ? "Mostrar todos" : "Show all"}
                </button>
              </div>
            )}

            {articleView === "all" && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#0b5fc4]">
                  {isSpanish ? "Todos los artículos" : "All Articles"}
                </span>

                <button
                  type="button"
                  onClick={handleBackToFeatured}
                  className="text-sm font-black text-[#0b5fc4] underline"
                >
                  {isSpanish
                    ? "Volver a artículos destacados"
                    : "Back to featured articles"}
                </button>
              </div>
            )}

            <div className="mt-7 space-y-6">
              {loading && (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
                  {isSpanish ? "Cargando artículos..." : "Loading articles..."}
                </div>
              )}

              {!loading && displayedArticles.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
                  {articleView === "category"
                    ? isSpanish
                      ? "No hay artículos en esta categoría."
                      : "No articles were found in this category."
                    : articleView === "featured"
                      ? isSpanish
                        ? "No hay artículos destacados todavía."
                        : "No featured articles are available yet."
                      : isSpanish
                        ? "No hay artículos publicados todavía."
                        : "No articles are published yet."}
                </div>
              )}

              {!loading &&
                displayedArticles.map((article) => {
                  const title =
                    isSpanish && article.title_es
                      ? article.title_es
                      : article.title

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

            {articleView === "featured" && articles.length > 0 && (
              <button
                type="button"
                onClick={handleViewAll}
                className="mt-7 inline-flex items-center gap-3 font-black text-[#0b5fc4]"
              >
                {t("resources.viewAllArticles")}
                <ArrowRight className="h-5 w-5" />
              </button>
            )}

            {articleView === "category" && (
              <button
                type="button"
                onClick={handleViewAll}
                className="mt-7 inline-flex items-center gap-3 font-black text-[#0b5fc4]"
              >
                {t("resources.viewAllArticles")}
                <ArrowRight className="h-5 w-5" />
              </button>
            )}

            {articleView === "all" && (
              <button
                type="button"
                onClick={handleBackToFeatured}
                className="mt-7 inline-flex items-center gap-3 font-black text-[#0b5fc4]"
              >
                {isSpanish
                  ? "Ver artículos destacados"
                  : "View Featured Articles"}
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>

          <aside>
            <SectionTitle title={t("resources.popularTopics")} />

            <div className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {!loading && topics.length === 0 && (
                <div className="px-7 py-6 text-slate-600">
                  {isSpanish ? "No hay temas todavía." : "No topics yet."}
                </div>
              )}

              {topics.map((topic) => {
                const topicLabel =
                  isSpanish && topic.category_es
                    ? topic.category_es
                    : topic.category

                const isSelected =
                  articleView === "category" &&
                  selectedCategory.trim().toLowerCase() ===
                    topic.category.trim().toLowerCase()

                return (
                  <button
                    key={topic.category}
                    type="button"
                    onClick={() => handleCategoryClick(topic.category)}
                    className={`flex w-full items-center justify-between border-b border-slate-200 px-7 py-6 text-left font-black transition last:border-b-0 ${
                      isSelected
                        ? "bg-blue-50 text-[#0b5fc4]"
                        : "bg-white text-[#071226] hover:bg-slate-50"
                    }`}
                  >
                    {topicLabel}
                    <ArrowRight className="h-5 w-5 text-[#0b5fc4]" />
                  </button>
                )
              })}

              <button
                type="button"
                onClick={handleViewAll}
                className={`flex w-full items-center gap-3 border-t border-slate-200 px-7 py-6 text-left font-black transition ${
                  articleView === "all"
                    ? "bg-blue-50 text-[#0b5fc4]"
                    : "bg-white text-[#0b5fc4] hover:bg-slate-50"
                }`}
              >
                {t("resources.browseAllTopics")}
                <ArrowRight className="h-5 w-5" />
              </button>
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

function formatDate(date: string | null | undefined, isSpanish: boolean) {
  if (!date) return ""

  return new Date(`${date}T12:00:00`).toLocaleDateString(
    isSpanish ? "es-US" : "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  )
}
