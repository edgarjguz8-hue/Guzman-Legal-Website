import { type ValidationResult, ok, fail, isNonEmpty, isEmail, isPhone, toStr } from "./shared"

export interface ContactInput {
  name: string
  email: string
  phone: string
  legalIssue: string
}

/**
 * Validate the /api/contact-attorney request body (contact-page inquiry form).
 * Preserves the original required set and adds permissive email/phone checks.
 */
export function validateContact(body: unknown): ValidationResult<ContactInput> {
  const data = (body ?? {}) as Record<string, unknown>

  if (
    !isNonEmpty(data.name) ||
    !isNonEmpty(data.email) ||
    !isNonEmpty(data.phone) ||
    !isNonEmpty(data.legalIssue)
  ) {
    return fail("Missing required fields")
  }

  if (!isEmail(data.email)) return fail("A valid email address is required")
  if (!isPhone(data.phone)) return fail("A valid phone number is required")

  return ok({
    name: toStr(data.name),
    email: toStr(data.email),
    phone: toStr(data.phone),
    legalIssue: toStr(data.legalIssue),
  })
}
