import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SEOPageContent } from "@/components/seo-page-content"
import { findSEOPage, getAllSEOPages, getRelatedPages } from "@/lib/seo-pages"

interface Props {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = findSEOPage(slug)

  if (!page) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    }
  }

  const locationName = page.isCounty
    ? page.location.label
    : (page.location as any).label

  return {
    title: `${page.practiceArea.label} in ${locationName} | AttorneyAbogado`,
    description: `Find experienced ${page.practiceArea.label.toLowerCase()} in ${locationName}. Local legal services, free consultations, and bilingual support available.`,
    keywords: [
      page.practiceArea.label,
      locationName,
      `${page.practiceArea.label.toLowerCase()} in ${locationName}`,
      `${page.practiceArea.label.toLowerCase()} near me`,
      "legal services",
      "attorney",
      "lawyer",
    ],
    openGraph: {
      title: `${page.practiceArea.label} in ${locationName}`,
      description: `Find the right ${page.practiceArea.label.toLowerCase()} in ${locationName}. Free consultation available.`,
      url: `https://attorneyabogado.com/${page.slug}`,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://attorneyabogado.com/${page.slug}`,
    },
  }
}

// Generate all possible page routes at build time
export async function generateStaticParams() {
  const pages = getAllSEOPages()
  return pages.map((page) => ({
    slug: page.slug,
  }))
}

export default async function SEOPage({ params }: Props) {
  const { slug } = await params
  const page = findSEOPage(slug)

  // Return 404 if page doesn't exist
  if (!page) {
    notFound()
  }

  const relatedPages = getRelatedPages(slug, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `AttorneyAbogado - ${page.practiceArea.label}`,
            description: `Find ${page.practiceArea.label.toLowerCase()} in ${page.isCounty ? page.location.label : (page.location as any).label}`,
            url: `https://attorneyabogado.com/${page.slug}`,
            image: "https://attorneyabogado.com/placeholder.jpg",
            serviceArea: page.isCounty
              ? {
                  "@type": "AdministrativeArea",
                  name: page.location.label,
                }
              : {
                  "@type": "City",
                  name: (page.location as any).label,
                  areaServed: (page.location as any).county,
                },
          }),
        }}
      />
      <SEOPageContent page={page} relatedPages={relatedPages} />
    </>
  )
}
