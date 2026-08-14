import type { PracticeArea } from "@/types/practice-area"
import type { Location } from "@/types/location"
import type { SeoEntity, ParsedSeoSlug } from "@/types/seo"
import { practiceAreas, cities, counties } from "./taxonomy"
import { seoPageUrl } from "./urls"

/**
 * SEO entity resolution and content generation.
 *
 * Conceptually: PracticeArea + Location (+ language) => SeoEntity. All title,
 * description, H1, and intro copy is generated here (ported verbatim from the
 * former `lib/seo-data.ts`) so no component hardcodes SEO copy.
 */

// --- Slug parsing -----------------------------------------------------------

/**
 * Parse a combined slug (e.g. "car-accident-lawyer-tampa") into its practice
 * area and location/county parts. Returns null for slugs that do not map to a
 * real, defined combination.
 */
export function parseSeoSlug(slug: string): ParsedSeoSlug | null {
  const parts = slug.split("-")

  // Check for a county suffix first.
  for (let i = parts.length; i > 0; i--) {
    const testSlug = parts.slice(i - 1).join("-")
    const countyMatch = counties.find((c) => c.slug === testSlug)
    if (countyMatch) {
      const practiceAreaMatch = practiceAreas.find(
        (p) => p.slug === parts.slice(0, i - 1).join("-"),
      )
      if (practiceAreaMatch) {
        return { practiceArea: practiceAreaMatch, location: null, county: countyMatch }
      }
    }
  }

  // Then check for a city suffix.
  for (let i = parts.length; i > 0; i--) {
    const testSlug = parts.slice(i - 1).join("-")
    const locationMatch = cities.find((l) => l.slug === testSlug)
    if (locationMatch) {
      const practiceAreaMatch = practiceAreas.find(
        (p) => p.slug === parts.slice(0, i - 1).join("-"),
      )
      if (practiceAreaMatch) {
        return { practiceArea: practiceAreaMatch, location: locationMatch, county: null }
      }
    }
  }

  return null
}

/** Every intentional SEO slug (practice area x city, practice area x county). */
export function generateAllSeoSlugs(): string[] {
  const slugs: string[] = []
  for (const pa of practiceAreas) {
    for (const loc of cities) slugs.push(`${pa.slug}-${loc.slug}`)
  }
  for (const pa of practiceAreas) {
    for (const county of counties) slugs.push(`${pa.slug}-${county.slug}`)
  }
  return slugs
}

// --- Content generators (verbatim output preserved) -------------------------

export function generateMetaTitle(
  practiceArea: string,
  location: string | null,
  county: string | null,
): string {
  const locationOrCounty = location || county || "Florida"
  return `${practiceArea} in ${locationOrCounty}, FL | Guzman Legal`
}

export function generateMetaDescription(
  practiceArea: string,
  location: string | null,
  county: string | null,
): string {
  const locationOrCounty = location || county || "Florida"
  return `Find experienced ${practiceArea.toLowerCase()} in ${locationOrCounty}. Guzman Legal connects you with qualified attorneys near you. Free consultation available.`
}

export function generateH1(
  practiceArea: string,
  location: string | null,
  county: string | null,
): string {
  const locationOrCounty = location || county || "Florida"
  return `${practiceArea} in ${locationOrCounty}, FL`
}

export function generateIntroParagraph(
  practiceArea: string,
  location: string | null,
  county: string | null,
): string {
  const locationOrCounty = location || county || "Florida"
  const article = practiceArea.toLowerCase().startsWith("e") ? "an" : "a"
  return `Looking for ${article} ${practiceArea.toLowerCase()} in ${locationOrCounty}? Guzman Legal helps you find experienced legal professionals who can handle your case. Our network of qualified attorneys specializes in ${practiceArea.toLowerCase()} and is ready to provide you with expert guidance and representation.`
}

// --- Entity resolution ------------------------------------------------------

/** Resolve a slug into a fully-populated SEO entity, or null if invalid. */
export function resolveSeoEntity(
  slug: string,
  language: "en" | "es" = "en",
): SeoEntity | null {
  const parsed = parseSeoSlug(slug)
  if (!parsed) return null

  const paName = parsed.practiceArea.name
  const locName = parsed.location?.name || null
  const countyName = parsed.county?.name || null

  return {
    slug,
    practiceArea: parsed.practiceArea,
    location: parsed.location,
    county: parsed.county,
    title: generateMetaTitle(paName, locName, countyName),
    description: generateMetaDescription(paName, locName, countyName),
    h1: generateH1(paName, locName, countyName),
    intro: generateIntroParagraph(paName, locName, countyName),
    canonical: seoPageUrl(slug),
    language,
    indexable: true,
  }
}

// --- Internal-linking relationships -----------------------------------------

/** Other practice areas for the same location (for related-links sections). */
export function getRelatedPracticeAreas(
  entity: ParsedSeoSlug,
  limit = 5,
): { area: PracticeArea; slug: string }[] {
  const locationSlug = entity.location?.slug ?? entity.county?.slug ?? ""
  return practiceAreas
    .filter((pa) => pa.slug !== entity.practiceArea.slug)
    .slice(0, limit)
    .map((area) => ({ area, slug: `${area.slug}-${locationSlug}` }))
}

/** The same practice area in other cities (for related-links sections). */
export function getRelatedLocations(
  entity: ParsedSeoSlug,
  limit = 5,
): { location: Location; slug: string }[] {
  return cities
    .filter((l) => l.slug !== entity.location?.slug)
    .slice(0, limit)
    .map((location) => ({
      location,
      slug: `${entity.practiceArea.slug}-${location.slug}`,
    }))
}
