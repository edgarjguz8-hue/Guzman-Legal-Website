import { MetadataRoute } from "next"
import { absoluteUrl, seoPageUrl, generateAllSeoSlugs } from "@/lib/seo"

/**
 * Sitemap.
 *
 * Uses the shared SEO taxonomy + canonical URL helpers so every URL here
 * matches the actual `/seo/[slug]` route and the canonical tags. Only real,
 * indexable routes are listed — no intake/thank-you/matched states, no query
 * params, and no development routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static, indexable pages that actually exist in the app router.
  const staticPaths: {
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    priority: number
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/practice-areas", changeFrequency: "monthly", priority: 0.8 },
    { path: "/attorney", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/resources", changeFrequency: "weekly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  ]

  const routes: MetadataRoute.Sitemap = staticPaths.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))

  // Dynamic SEO pages (practice area x location/county) at their canonical URL.
  for (const slug of generateAllSeoSlugs()) {
    routes.push({
      url: seoPageUrl(slug),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  }

  return routes
}
