import type { Metadata } from "next"
import { siteConfig } from "@/lib/config/site"
import { resolveSeoEntity } from "./entities"

/**
 * Build Next.js Metadata for an SEO page from its slug.
 *
 * Canonical + OG URLs come from the shared URL util (via `resolveSeoEntity`),
 * so they always match the route and sitemap. Previously this lived in
 * `lib/seo-metadata.ts`, was unused, and hardcoded the domain/siteName.
 */
export function generateSeoMetadata(slug: string): Metadata {
  const entity = resolveSeoEntity(slug)

  if (!entity) {
    return {
      title: "Page Not Found",
      description: "This page does not exist",
      robots: { index: false, follow: false },
    }
  }

  const locationName =
    entity.location?.name || entity.county?.name || "Florida"
  const paLower = entity.practiceArea.name.toLowerCase()

  return {
    title: entity.title,
    description: entity.description,
    keywords: [
      `${paLower} ${locationName}`,
      `${paLower} lawyer ${locationName}`,
      `find ${paLower} ${locationName}`,
      `${locationName} ${paLower}`,
      "attorney",
      "legal services",
      siteConfig.name,
    ],
    openGraph: {
      title: entity.title,
      description: entity.description,
      type: "website",
      url: entity.canonical,
      siteName: siteConfig.ogSiteName,
    },
    twitter: {
      card: "summary_large_image",
      title: entity.title,
      description: entity.description,
    },
    robots: {
      index: entity.indexable,
      follow: true,
      googleBot: {
        index: entity.indexable,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: entity.canonical,
    },
  }
}
