import { ArticleDetail } from "@/components/article-detail"
import Link from "next/link"
import { getArticleBySlug } from "@/lib/services/article-service"

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

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
