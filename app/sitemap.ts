import { MetadataRoute } from "next"
import { getAllSEOPages } from "@/lib/seo-pages"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://attorneyabogado.com"
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/intake`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/for-attorneys`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/get-connected`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Add all SEO pages (practice area + location/county combinations)
  const seoPages = getAllSEOPages()
  for (const page of seoPages) {
    routes.push({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })
  }

  return routes
}
