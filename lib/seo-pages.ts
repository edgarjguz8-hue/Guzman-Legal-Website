// SEO Pages Configuration
// Defines practice areas, cities, and counties for dynamic page generation

export const practiceAreas = [
  { slug: "car-accident-lawyer", label: "Car Accident Lawyer" },
  { slug: "family-lawyer", label: "Family Lawyer" },
  { slug: "criminal-defense-lawyer", label: "Criminal Defense Lawyer" },
  { slug: "immigration-lawyer", label: "Immigration Lawyer" },
  { slug: "employment-lawyer", label: "Employment Lawyer" },
  { slug: "business-lawyer", label: "Business Lawyer" },
  { slug: "estate-planning-lawyer", label: "Estate Planning Lawyer" },
  { slug: "real-estate-lawyer", label: "Real Estate Lawyer" },
  { slug: "personal-injury-lawyer", label: "Personal Injury Lawyer" },
  { slug: "bankruptcy-lawyer", label: "Bankruptcy Lawyer" },
  { slug: "divorce-lawyer", label: "Divorce Lawyer" },
  { slug: "workers-compensation-lawyer", label: "Workers Compensation Lawyer" },
  { slug: "dui-lawyer", label: "DUI Lawyer" },
  { slug: "landlord-tenant-lawyer", label: "Landlord Tenant Lawyer" },
]

export const cities = [
  { slug: "tampa", label: "Tampa", county: "Hillsborough" },
  { slug: "st-petersburg", label: "St. Petersburg", county: "Pinellas" },
  { slug: "clearwater", label: "Clearwater", county: "Pinellas" },
  { slug: "brandon", label: "Brandon", county: "Hillsborough" },
  { slug: "riverview", label: "Riverview", county: "Hillsborough" },
  { slug: "wesley-chapel", label: "Wesley Chapel", county: "Pasco" },
  { slug: "largo", label: "Largo", county: "Pinellas" },
  { slug: "palm-harbor", label: "Palm Harbor", county: "Pinellas" },
  { slug: "dunedin", label: "Dunedin", county: "Pinellas" },
  { slug: "tarpon-springs", label: "Tarpon Springs", county: "Pinellas" },
]

export const counties = [
  { slug: "hillsborough-county", label: "Hillsborough County" },
  { slug: "pinellas-county", label: "Pinellas County" },
  { slug: "pasco-county", label: "Pasco County" },
]

// Type definitions
export interface SEOPage {
  practiceArea: typeof practiceAreas[0]
  location: typeof cities[0] | typeof counties[0]
  isCounty: boolean
  slug: string
  title: string
  description: string
}

// Get all possible SEO page combinations
export function getAllSEOPages(): SEOPage[] {
  const pages: SEOPage[] = []

  // City pages
  for (const area of practiceAreas) {
    for (const city of cities) {
      const slug = `${area.slug}-${city.slug}`
      const title = `${area.label} in ${city.label} | Local Legal Help in ${city.county} County`
      const description = `Find experienced ${area.label.toLowerCase()} in ${city.label}. Local ${area.label.toLowerCase()} serving ${city.county} County. Free consultation available.`

      pages.push({
        practiceArea: area,
        location: city,
        isCounty: false,
        slug,
        title,
        description,
      })
    }
  }

  // County pages
  for (const area of practiceAreas) {
    for (const county of counties) {
      const slug = `${area.slug}-${county.slug}`
      const title = `${area.label} in ${county.label} | Legal Services`
      const description = `Find experienced ${area.label.toLowerCase()} in ${county.label}. Local legal services and consultation.`

      pages.push({
        practiceArea: area,
        location: county,
        isCounty: true,
        slug,
        title,
        description,
      })
    }
  }

  return pages
}

// Find a specific SEO page
export function findSEOPage(slug: string): SEOPage | null {
  const pages = getAllSEOPages()
  return pages.find((page) => page.slug === slug) || null
}

// Get related pages (same practice area, different locations)
export function getRelatedPages(
  slug: string,
  limit: number = 5
): SEOPage[] {
  const page = findSEOPage(slug)
  if (!page) return []

  const pages = getAllSEOPages()
  const related = pages
    .filter(
      (p) =>
        p.practiceArea.slug === page.practiceArea.slug &&
        p.slug !== slug
    )
    .slice(0, limit)

  return related
}

// Get all practice areas for a specific city
export function getAreasInCity(citySlug: string): SEOPage[] {
  const pages = getAllSEOPages()
  return pages.filter((p) => !p.isCounty && p.location.slug === citySlug)
}
