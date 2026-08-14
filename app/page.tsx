import { HomePageContent } from "@/components/home-page-content"
import { getPublishedArticles } from "@/lib/services/article-service"

export const revalidate = 300

export default async function HomePage() {
  const articles = await getPublishedArticles()

  return <HomePageContent articles={articles} />
}
