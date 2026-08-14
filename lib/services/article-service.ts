import { unstable_cache } from "next/cache"
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
async function getArticleBySlugUncached(slug: string): Promise<Article | null> {
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
async function getPublishedArticlesUncached(): Promise<Article[]> {
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

const getPublishedArticlesCached = unstable_cache(
  getPublishedArticlesUncached,
  ["published-articles"],
  { revalidate: 300 }
)

async function getRecentPublishedArticlesUncached(): Promise<Article[]> {
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
    .limit(3)

  if (error) {
    throw new Error(
      `Article fetch error: ${error.message}; code: ${error.code ?? "unknown"}; details: ${error.details ?? "none"}; hint: ${error.hint ?? "none"}`
    )
  }

  return (data as Article[]) ?? []
}

const getRecentPublishedArticlesCached = unstable_cache(
  getRecentPublishedArticlesUncached,
  ["recent-published-articles"],
  { revalidate: 300 }
)

export function getPublishedArticles(): Promise<Article[]> {
  return getPublishedArticlesCached()
}

export function getRecentPublishedArticles(): Promise<Article[]> {
  return getRecentPublishedArticlesCached()
}

export function getArticleBySlug(slug: string): Promise<Article | null> {
  return unstable_cache(
    () => getArticleBySlugUncached(slug),
    ["published-article", slug],
    { revalidate: 300 }
  )()
}
