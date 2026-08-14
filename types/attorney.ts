/**
 * Attorney entity.
 *
 * Mirrors the `attorneys` table in Supabase as it is actually queried across
 * the app (find-attorney, submit-lead, and matched-attorney). Columns are
 * derived from the existing `.select()` calls — do NOT add fields here that do
 * not exist in the database.
 */
export interface Attorney {
  id: string
  name: string | null
  firm_name: string | null
  category: string | null
  county: string | null
  phone: string | null
  email: string | null
  website: string | null
  description: string | null
  spanish_speaking: boolean | null
  approved: boolean | null
}

/**
 * Result of the ZIP -> county -> attorneys match flow. Mirrors the JSON shape
 * returned by `POST /api/find-attorney`.
 */
export interface AttorneyMatchResult {
  county: string | null
  attorneys: Attorney[]
  message: string
}
