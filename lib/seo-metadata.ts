import { Metadata } from "next"
import { parseSeoSlug, generateMetaTitle, generateMetaDescription } from "./seo-data"

export function generateSeoMetadata(slug: string): Metadata {
  const parsed = parseSeoSlug(slug)

  if (!parsed) {
    return {
      title: "Page Not Found",
      description: "This page does not exist",
    }
  }

  const practiceAreaName = parsed.practiceArea.name
  const locationName = parsed.location?.name || parsed.county?.name || "Florida"

  const title = generateMetaTitle(practiceAreaName, parsed.location?.name || null, parsed.county?.name || null)
  const description = generateMetaDescription(practiceAreaName, parsed.location?.name || null, parsed.county?.name || null)

  return {
    title,
    description,
    keywords: [
      `${practiceAreaName.toLowerCase()} ${locationName}`,
      `${practiceAreaName.toLowerCase()} lawyer ${locationName}`,
      `find ${practiceAreaName.toLowerCase()} ${locationName}`,
      `${locationName} ${practiceAreaName.toLowerCase()}`,
      "attorney",
      "legal services",
      "AttorneyAbogado",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://attorneyabogado.com/seo/${slug}`,
      siteName: "AttorneyAbogado",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: `https://attorneyabogado.com/seo/${slug}`,
    },
  }
}
