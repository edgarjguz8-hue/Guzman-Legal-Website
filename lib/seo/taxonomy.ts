import type { PracticeArea } from "@/types/practice-area"
import type { Location } from "@/types/location"

/**
 * SINGLE SOURCE OF TRUTH for SEO taxonomy (practice areas, cities, counties).
 *
 * This replaces the two former, divergent definitions in `lib/seo-data.ts`
 * (which drove the /seo/[slug] route) and `lib/seo-pages.ts` (which drove the
 * sitemap). The set below matches the dataset that the live route actually
 * renders, so the sitemap and the route can no longer disagree.
 *
 * To add/remove an SEO page, edit these lists — do not hardcode areas or
 * locations anywhere else.
 */

export const practiceAreas: PracticeArea[] = [
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

/** Cities. `county` is accurate parent-county metadata for internal linking. */
export const cities: Location[] = [
  { name: "Tampa", slug: "tampa", county: "Hillsborough" },
  { name: "South Tampa", slug: "south-tampa", county: "Hillsborough" },
  { name: "Brandon", slug: "brandon", county: "Hillsborough" },
  { name: "Riverview", slug: "riverview", county: "Hillsborough" },
  { name: "Temple Terrace", slug: "temple-terrace", county: "Hillsborough" },
  { name: "Plant City", slug: "plant-city", county: "Hillsborough" },
  { name: "Apollo Beach", slug: "apollo-beach", county: "Hillsborough" },
  { name: "Wesley Chapel", slug: "wesley-chapel", county: "Pasco" },
  { name: "St. Petersburg", slug: "st-petersburg", county: "Pinellas" },
  { name: "Clearwater", slug: "clearwater", county: "Pinellas" },
  { name: "Largo", slug: "largo", county: "Pinellas" },
  { name: "Palm Harbor", slug: "palm-harbor", county: "Pinellas" },
  { name: "Dunedin", slug: "dunedin", county: "Pinellas" },
  { name: "Tarpon Springs", slug: "tarpon-springs", county: "Pinellas" },
  { name: "New Port Richey", slug: "new-port-richey", county: "Pasco" },
  { name: "Spring Hill", slug: "spring-hill", county: "Hernando" },
]

export const counties: Location[] = [
  { name: "Hillsborough County", slug: "hillsborough-county" },
  { name: "Pinellas County", slug: "pinellas-county" },
  { name: "Pasco County", slug: "pasco-county" },
  { name: "Hernando County", slug: "hernando-county" },
  { name: "Polk County", slug: "polk-county" },
  { name: "Manatee County", slug: "manatee-county" },
  { name: "Sarasota County", slug: "sarasota-county" },
]
