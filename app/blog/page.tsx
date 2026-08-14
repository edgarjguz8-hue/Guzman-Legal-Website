import { ResourcesContent } from "@/components/resources-content"
import { getPublishedArticles } from "@/lib/services/article-service"

export const revalidate = 300

export default async function BlogPage() {
  const articles = await getPublishedArticles()

  return <ResourcesContent articles={articles} />
}
