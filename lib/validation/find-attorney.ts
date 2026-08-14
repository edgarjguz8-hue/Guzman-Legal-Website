import { type ValidationResult, ok, fail, isNonEmpty, toStr } from "./shared"

export interface FindAttorneyInput {
  zipCode: string
  category: string
}

/**
 * Validate the /api/find-attorney request body.
 *
 * Presence-only (matching the pre-refactor behavior): an unrecognized ZIP is
 * intentionally NOT rejected here so the flow can return the friendly
 * "expanding in your area" message rather than a hard error.
 */
export function validateFindAttorney(body: unknown): ValidationResult<FindAttorneyInput> {
  const data = (body ?? {}) as Record<string, unknown>

  if (!isNonEmpty(data.zipCode) || !isNonEmpty(data.category)) {
    return fail("ZIP code and category are required.")
  }

  return ok({ zipCode: toStr(data.zipCode), category: toStr(data.category) })
}
