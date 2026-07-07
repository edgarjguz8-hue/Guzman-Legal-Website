"use client"

import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import type { Article } from "@/app/resources/[slug]/page"

export function ArticleDetail({ article }: { article: Article }) {
  const { language } = useLanguage()
  const isSpanish = language === "es"

  const title = isSpanish && article.title_es ? article.title_es : article.title
  const category =
    isSpanish && article.category_es ? article.category_es : article.category
  const excerpt =
    isSpanish && article.excerpt_es ? article.excerpt_es : article.excerpt
  const content =
    isSpanish && article.content_es ? article.content_es : article.content
  const readTime =
    isSpanish && article.read_time_es
      ? article.read_time_es
      : article.read_time || "5 min read"

  return (
    <article className="px-7 py-16">
      <div className="mx-auto max-w-[900px]">
        <Link href="/resources" className="font-black text-[#0b5fc4]">
          {isSpanish ? "← Volver a Recursos" : "← Back to Resources"}
        </Link>

        {category && (
          <p className="mt-10 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#0b5fc4]">
            {category}
          </p>
        )}

        <h1
          className="mt-6 text-5xl font-black leading-tight md:text-6xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>

        {excerpt && (
          <p className="mt-6 text-xl leading-8 text-slate-600">{excerpt}</p>
        )}

        <div className="mt-8 flex flex-wrap gap-5 text-slate-500">
          <span className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {formatDate(article.published_date, isSpanish)}
          </span>

          <span className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {readTime}
          </span>
        </div>

        {article.image_url && (
          <img
            src={article.image_url}
            alt={title}
            className="mt-10 h-[420px] w-full rounded-2xl object-cover shadow-lg"
          />
        )}

        <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
          <div className="text-lg leading-8 text-slate-700">
            {content
              ?.split(/\n\s*\n/)
              .filter((paragraph) => paragraph.trim() !== "")
              .map((paragraph, index) => (
                <p key={index} className="mb-5 leading-8">
                  {paragraph.trim()}
                </p>
              ))}
          </div>

          <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h3 className="mb-3 text-xl font-black text-[#071226]">
              {isSpanish ? "Aviso legal" : "Disclaimer"}
            </h3>

            <p className="text-base leading-7 text-slate-700">
              <strong>{isSpanish ? "Aviso legal:" : "Disclaimer:"}</strong>{" "}
              {isSpanish
                ? "Este artículo es únicamente para fines informativos y no constituye asesoramiento legal. Cada accidente es diferente, y leer este artículo no crea una relación abogado-cliente. Para recibir asesoramiento sobre su situación específica, considere hablar con un abogado calificado."
                : "This article is for informational purposes only and does not constitute legal advice. Every legal matter is unique, and reading this article does not create an attorney-client relationship. For advice regarding your specific situation, consider speaking with a qualified attorney."}
            </p>
          </div>
        </div>
      </div>
    </article>
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