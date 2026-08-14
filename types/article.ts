/**
 * Bilingual blog/resource article.
 *
 * Mirrors the `articles` table as queried by the homepage, resources listing,
 * and article detail pages. Optional fields reflect columns that are only
 * selected in some views.
 */
export interface Article {
  id: string
  title: string
  title_es: string | null
  slug: string
  excerpt: string | null
  excerpt_es: string | null
  content?: string | null
  content_es?: string | null
  category?: string | null
  category_es?: string | null
  image_url?: string | null
  read_time?: string | null
  read_time_es?: string | null
  published_date?: string | null
  featured?: boolean | null
}
