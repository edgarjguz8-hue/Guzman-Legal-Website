import { HomePageContent } from "@/components/home-page-content"
import { getRecentPublishedArticles } from "@/lib/services/article-service"
import type { Article } from "@/types"

export const revalidate = 300

export default async function HomePage() {
  let articles: Article[] = []

  try {
    articles = await getRecentPublishedArticles()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    if (!message.includes("Supabase server reader is not configured")) {
      throw error
    }
  }

  return <HomePageContent articles={articles} />
}
