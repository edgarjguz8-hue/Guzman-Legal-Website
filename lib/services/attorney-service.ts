import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Attorney, AttorneyMatchResult } from "@/types"

/**
 * Attorney matching service.
 *
 * Centralizes the two-step lookup that the `/api/find-attorney` route used to
 * perform inline:
 *   1. Resolve a ZIP code to its county via the `zip_counties` table.
 *   2. Find approved attorneys in that county for the requested category.
 *
 * Behavior (messages, empty-result semantics, approved filter) is preserved
 * exactly so existing callers and the UI keep working.
 */

const EXPANDING_MESSAGE =
  "We are currently expanding in your area. Please check back soon."
const MATCH_FOUND_MESSAGE = "Attorney match found."

/** Resolve a ZIP code to its county, or `null` if unknown. */
export async function getCountyForZip(
  zipCode: string,
): Promise<string | null> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("zip_counties")
    .select("county")
    .eq("zip_code", zipCode.trim())
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  const county = data?.county ? String(data.county).trim() : null
  return county || null
}

/** Fetch approved attorneys for a county + category. */
export async function getApprovedAttorneys(
  county: string,
  category: string,
): Promise<Attorney[]> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("attorneys")
    .select("*")
    .eq("approved", true)
    .eq("county", county.trim())
    .eq("category", category.trim())

  if (error) {
    throw new Error(error.message)
  }

  return (data as Attorney[]) ?? []
}

/**
 * Full match flow: ZIP -> county -> approved attorneys.
 *
 * Returns a serializable result mirroring the previous API response shape.
 */
export async function findAttorneys(
  zipCode: string,
  category: string,
): Promise<AttorneyMatchResult> {
  const county = await getCountyForZip(zipCode)

  if (!county) {
    return { county: null, attorneys: [], message: EXPANDING_MESSAGE }
  }

  const attorneys = await getApprovedAttorneys(county, category)

  return {
    county,
    attorneys,
    message: attorneys.length > 0 ? MATCH_FOUND_MESSAGE : EXPANDING_MESSAGE,
  }
}
