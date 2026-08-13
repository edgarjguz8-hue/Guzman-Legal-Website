import { createClient } from "@supabase/supabase-js"
import { ArticleDetail } from "@/components/article-detail"
import Link from "next/link"

export type Article = {
  id: string
  title: string
  title_es: string | null
  slug: string
  category: string | null
  category_es: string | null
  excerpt: string | null
  excerpt_es: string | null
  content: string | null
  content_es: string | null
  image_url: string | null
  read_time: string | null
  read_time_es: string | null
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
    .select(`
      id,
      title,
      title_es,
      slug,
      category,
      category_es,
      excerpt,
      excerpt_es,
      content,
      content_es,
      image_url,
      read_time,
      read_time_es,
      published_date,
      published
    `)
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
        <section className="px-7 py-20">
          <div className="mx-auto max-w-[900px]">
            <Link href="/resources" className="font-black text-[#0b5fc4]">
              ← Back to Resources
            </Link>

            <h1 className="mt-8 text-4xl font-black">Article not found</h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      <ArticleDetail article={article} />
    </main>
  )
}
