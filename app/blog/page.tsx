import { ResourcesContent } from "@/components/resources-content"
import { getPublishedArticles } from "@/lib/services/article-service"
import type { Article } from "@/types"

export const revalidate = 300

export default async function BlogPage() {
  let articles: Article[] = []

  try {
    articles = await getPublishedArticles()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    if (!message.includes("Supabase server reader is not configured")) {
      throw error
    }
  }

  return <ResourcesContent articles={articles} />
}
