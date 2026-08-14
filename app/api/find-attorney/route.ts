import { type NextRequest, NextResponse } from "next/server"
import { findAttorneys } from "@/lib/services/attorney-service"
import { validateFindAttorney } from "@/lib/validation/find-attorney"

/**
 * POST /api/find-attorney
 *
 * Thin controller: validate the request, delegate to the attorney service,
 * and shape the JSON response. The ZIP -> county -> attorneys logic lives in
 * `lib/services/attorney-service.ts`; validation lives in
 * `lib/validation/find-attorney.ts`.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = validateFindAttorney(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    const match = await findAttorneys(result.data.zipCode, result.data.category)

    return NextResponse.json(match)
  } catch (error) {
    console.error("Find attorney error:", error)

    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 },
    )
  }
}
