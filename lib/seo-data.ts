// Practice areas with normalized names for URL slugs
export const practiceAreas = [
  { name: "Car Accident Lawyer", slug: "car-accident-lawyer" },
  { name: "Personal Injury Lawyer", slug: "personal-injury-lawyer" },
  { name: "Criminal Defense Lawyer", slug: "criminal-defense-lawyer" },
  { name: "DUI Lawyer", slug: "dui-lawyer" },
  { name: "Family Lawyer", slug: "family-lawyer" },
  { name: "Divorce Lawyer", slug: "divorce-lawyer" },
  { name: "Child Custody Lawyer", slug: "child-custody-lawyer" },
  { name: "Immigration Lawyer", slug: "immigration-lawyer" },
  { name: "Employment Lawyer", slug: "employment-lawyer" },
  { name: "Business Lawyer", slug: "business-lawyer" },
  { name: "Estate Planning Lawyer", slug: "estate-planning-lawyer" },
  { name: "Probate Lawyer", slug: "probate-lawyer" },
  { name: "Real Estate Lawyer", slug: "real-estate-lawyer" },
  { name: "Landlord Tenant Lawyer", slug: "landlord-tenant-lawyer" },
]

// Locations with normalized names
export const locations = [
  { name: "Tampa", slug: "tampa" },
  { name: "South Tampa", slug: "south-tampa" },
  { name: "Brandon", slug: "brandon" },
  { name: "Riverview", slug: "riverview" },
  { name: "Temple Terrace", slug: "temple-terrace" },
  { name: "Plant City", slug: "plant-city" },
  { name: "Apollo Beach", slug: "apollo-beach" },
  { name: "Wesley Chapel", slug: "wesley-chapel" },
  { name: "St. Petersburg", slug: "st-petersburg" },
  { name: "Clearwater", slug: "clearwater" },
  { name: "Largo", slug: "largo" },
  { name: "Palm Harbor", slug: "palm-harbor" },
  { name: "Dunedin", slug: "dunedin" },
  { name: "Tarpon Springs", slug: "tarpon-springs" },
  { name: "New Port Richey", slug: "new-port-richey" },
  { name: "Spring Hill", slug: "spring-hill" },
]

// Counties
export const counties = [
  { name: "Hillsborough County", slug: "hillsborough-county" },
  { name: "Pinellas County", slug: "pinellas-county" },
  { name: "Pasco County", slug: "pasco-county" },
  { name: "Hernando County", slug: "hernando-county" },
  { name: "Polk County", slug: "polk-county" },
  { name: "Manatee County", slug: "manatee-county" },
  { name: "Sarasota County", slug: "sarasota-county" },
]

// Helper function to parse SEO page slug
export function parseSeoSlug(slug: string) {
  const parts = slug.split("-")
  
  // Try to identify the structure by checking if the last part is a location or county
  let locationMatch = null
  let countyMatch = null
  let practiceAreaMatch = null

  // Check for county at the end
  for (let i = parts.length; i > 0; i--) {
    const testSlug = parts.slice(i - 1).join("-")
    countyMatch = counties.find(c => c.slug === testSlug)
    if (countyMatch) {
      practiceAreaMatch = practiceAreas.find(p => p.slug === parts.slice(0, i - 1).join("-"))
      if (practiceAreaMatch) {
        return { practiceArea: practiceAreaMatch, location: null, county: countyMatch }
      }
    }
  }

  // Check for location at the end
  for (let i = parts.length; i > 0; i--) {
    const testSlug = parts.slice(i - 1).join("-")
    locationMatch = locations.find(l => l.slug === testSlug)
    if (locationMatch) {
      practiceAreaMatch = practiceAreas.find(p => p.slug === parts.slice(0, i - 1).join("-"))
      if (practiceAreaMatch) {
        return { practiceArea: practiceAreaMatch, location: locationMatch, county: null }
      }
    }
  }

  return null
}

// Generate all valid SEO page slugs
export function generateAllSeoSlugs() {
  const slugs: string[] = []

  // Practice area + location combinations
  for (const pa of practiceAreas) {
    for (const loc of locations) {
      slugs.push(`${pa.slug}-${loc.slug}`)
    }
  }

  // Practice area + county combinations
  for (const pa of practiceAreas) {
    for (const county of counties) {
      slugs.push(`${pa.slug}-${county.slug}`)
    }
  }

  return slugs
}

// Generate meta title
export function generateMetaTitle(practiceArea: string, location: string | null, county: string | null): string {
  const location_or_county = location || county || "Florida"
  return `${practiceArea} in ${location_or_county}, FL | AttorneyAbogado`
}

// Generate meta description
export function generateMetaDescription(practiceArea: string, location: string | null, county: string | null): string {
  const location_or_county = location || county || "Florida"
  return `Find experienced ${practiceArea.toLowerCase()} in ${location_or_county}. AttorneyAbogado connects you with qualified attorneys near you. Free consultation available.`
}

// Generate H1
export function generateH1(practiceArea: string, location: string | null, county: string | null): string {
  const location_or_county = location || county || "Florida"
  return `${practiceArea} in ${location_or_county}, FL`
}

// Generate intro paragraph
export function generateIntroParagraph(practiceArea: string, location: string | null, county: string | null): string {
  const location_or_county = location || county || "Florida"
  const article = practiceArea.toLowerCase().startsWith('e') ? 'an' : 'a'
  return `Looking for ${article} ${practiceArea.toLowerCase()} in ${location_or_county}? AttorneyAbogado helps you find experienced legal professionals who can handle your case. Our network of qualified attorneys specializes in ${practiceArea.toLowerCase()} and is ready to provide you with expert guidance and representation.`
}
