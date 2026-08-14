/**
 * Lightweight, dependency-free validation helpers.
 *
 * The project has no validation library installed and the architecture task
 * explicitly forbids adding one, so these hand-rolled helpers provide a
 * consistent result shape for server-side validation. All validators return a
 * discriminated `ValidationResult` so callers can branch on `success`.
 */

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export function ok<T>(data: T): ValidationResult<T> {
  return { success: true, data }
}

export function fail<T = never>(error: string): ValidationResult<T> {
  return { success: false, error }
}

/** Trim a value to a string; non-strings become "". */
export function toStr(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export function isNonEmpty(value: unknown): value is string {
  return toStr(value).length > 0
}

/** Basic, permissive email shape check (server-side sanity, not RFC-complete). */
export function isEmail(value: unknown): boolean {
  const v = toStr(value)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

/** US 5-digit ZIP code. */
export function isZip(value: unknown): boolean {
  return /^\d{5}$/.test(toStr(value))
}

/** Has at least 7 digits once non-digits are stripped (permissive phone check). */
export function isPhone(value: unknown): boolean {
  return toStr(value).replace(/\D/g, "").length >= 7
}
