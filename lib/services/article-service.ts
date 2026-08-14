import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Article } from "@/types"

/**
 * Article service: centralizes reads from the `articles` table.
 *
 * The detail and listing queries were previously inline in
 * `app/resources/[slug]/page.tsx` and the homepage. Both only need public
 * (published) rows, so they use the anon-key server client. Behavior is
 * preserved: the same column selections, `published = true` filter, slug
 * normalization, and ordering.
 */

const LISTING_COLUMNS = `
  id,
  title,
  title_es,
  slug,
  category,
  category_es,
  excerpt,
  excerpt_es,
  image_url,
  read_time,
  read_time_es,
  published_date,
  featured
`

const DETAIL_COLUMNS = `
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
`

/** Fetch a single published article by slug, or `null` if not found. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  let supabase
  try {
    supabase = getSupabaseServerClient()
  } catch (e) {
    console.error((e as Error).message)
    return null
  }

  const cleanSlug = decodeURIComponent(slug).trim()

  const { data, error } = await supabase
    .from("articles")
    .select(DETAIL_COLUMNS)
    .eq("slug", cleanSlug)
    .eq("published", true)
    .maybeSingle()

  if (error) {
    console.error("Article fetch error:", error.message)
    return null
  }

  return (data as Article | null) ?? null
}

/** Fetch all published articles, newest first. */
export async function getPublishedArticles(): Promise<Article[]> {
  let supabase
  try {
    supabase = getSupabaseServerClient()
  } catch (e) {
    throw e
  }

  const { data, error } = await supabase
    .from("articles")
    .select(LISTING_COLUMNS)
    .eq("published", true)
    .order("published_date", { ascending: false })

  if (error) {
    throw new Error(
      `Article fetch error: ${error.message}; code: ${error.code ?? "unknown"}; details: ${error.details ?? "none"}; hint: ${error.hint ?? "none"}`
    )
  }

  return (data as Article[]) ?? []
}
