"use client"

import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useLanguage } from "@/contexts/language-context"
import type { Article } from "@/types"

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
    <article className="px-4 py-12 sm:px-7 sm:py-16">
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
          className="mt-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl"
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

        {article.image_url ? (
          <img
            src={article.image_url}
            alt={title}
            className="mt-10 h-64 w-full rounded-2xl object-cover shadow-lg sm:h-[420px]"
          />
        ) : (
          <div
            aria-label={isSpanish ? "Imagen del artículo" : "Article image"}
            className="mt-10 flex h-64 w-full items-center justify-center rounded-2xl bg-[#061a38] p-6 text-center shadow-lg sm:h-[420px]"
          >
            <span className="text-sm font-black uppercase tracking-[0.18em] text-white/90">
              Guzman Legal
            </span>
          </div>
        )}

        <div className="mt-12 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          <div className="text-lg leading-8 text-slate-700">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="mb-5 mt-10 text-3xl font-black leading-tight text-[#071226] first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-4 mt-8 text-2xl font-black leading-tight text-[#071226]">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-5 leading-8">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-5 list-disc space-y-2 pl-6">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-5 list-decimal space-y-2 pl-6">{children}</ol>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-[#071226]">{children}</strong>
                ),
              }}
            >
              {content || ""}
            </ReactMarkdown>
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

function formatDate(date: string | null | undefined, isSpanish: boolean) {
  if (!date) return ""

  return new Date(date).toLocaleDateString(isSpanish ? "es-US" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
