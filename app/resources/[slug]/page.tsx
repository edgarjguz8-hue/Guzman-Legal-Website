import { createClient } from "@supabase/supabase-js"
import { SiteHeader } from "@/components/site-header"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

type Article = {
  id: string
  title: string
  slug: string
  category: string | null
  excerpt: string | null
  content: string | null
  image_url: string | null
  read_time: string | null
  published_date: string | null
}

async function getArticle(slug: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase keys")
    return null
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const cleanSlug = decodeURIComponent(slug).trim()

  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, title, slug, category, excerpt, content, image_url, read_time, published_date, published"
    )
    .eq("slug", cleanSlug)
    .eq("published", true)
    .maybeSingle()

  if (error) {
    console.error("Article fetch error:", error.message)
    return null
  }

  return data as Article | null
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
        <section className="bg-[#082f63] px-7 py-6 text-white">
          <div className="mx-auto max-w-[1400px]">
            <SiteHeader activePage="resources" />
          </div>
        </section>

        <section className="px-7 py-20">
          <div className="mx-auto max-w-[900px]">
            <Link href="/resources" className="font-black text-[#0b5fc4]">
              ← Back to Resources
            </Link>

            <h1 className="mt-8 text-4xl font-black">
              Article not found
            </h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      <section className="bg-[#082f63] px-7 py-6 text-white">
        <div className="mx-auto max-w-[1400px]">
          <SiteHeader activePage="resources" />
        </div>
      </section>

      <article className="px-7 py-16">
        <div className="mx-auto max-w-[900px]">
          <Link href="/resources" className="font-black text-[#0b5fc4]">
            ← Back to Resources
          </Link>

          {article.category && (
            <p className="mt-10 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-[#0b5fc4]">
              {article.category}
            </p>
          )}

          <h1
            className="mt-6 text-5xl font-black leading-tight md:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-6 text-xl leading-8 text-slate-600">
              {article.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-5 text-slate-500">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {formatDate(article.published_date)}
            </span>

            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {article.read_time || "5 min read"}
            </span>
          </div>

          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="mt-10 h-[420px] w-full rounded-2xl object-cover shadow-lg"
            />
          )}

          {/* Article */}
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
            <div className="text-lg leading-8 text-slate-700">
              {article.content
                ?.split(/\n\s*\n/)
                .filter((paragraph) => paragraph.trim() !== "")
                .map((paragraph, index) => (
                  <p
                    key={index}
                   className="mb-5 leading-8"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <h3 className="mb-3 text-xl font-black text-[#071226]">
                Disclaimer
              </h3>

              <p className="text-base leading-7 text-slate-700">
                <strong>Disclaimer:</strong> This article is for informational
                purposes only and does not constitute legal advice. Every legal
                matter is unique, and reading this article does not create an
                attorney-client relationship. For advice regarding your specific
                situation, consider speaking with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

function formatDate(date: string | null) {
  if (!date) return ""

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}