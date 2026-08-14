import { siteConfig } from "@/lib/config/site"

/**
 * Canonical URL generation — the ONLY place URLs are constructed.
 *
 * The dynamic SEO route lives at `/seo/[slug]`, so that prefix is canonical.
 * Page rendering, generateMetadata, canonical tags, the sitemap, internal
 * links, and breadcrumbs must all consume these helpers so they can never
 * drift apart again.
 *
 * Historic bug this fixes: the sitemap emitted `/{slug}` (no `/seo/` prefix),
 * producing 404s that disagreed with the route and the canonical tags.
 */

/** Base path segment for dynamic SEO pages. */
export const SEO_BASE_PATH = "/seo"

/** Relative path for an SEO page, e.g. "/seo/car-accident-lawyer-tampa". */
export function seoPagePath(slug: string): string {
  return `${SEO_BASE_PATH}/${slug}`
}

/** Turn any absolute-from-root path into a fully-qualified URL. */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${siteConfig.url}${normalized}`
}

/** Absolute canonical URL for an SEO page. */
export function seoPageUrl(slug: string): string {
  return absoluteUrl(seoPagePath(slug))
}
