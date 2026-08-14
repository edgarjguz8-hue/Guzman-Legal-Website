import { type NextRequest, NextResponse } from "next/server"
import {
  createLead,
  AttorneyNotFoundError,
  LeadPersistError,
} from "@/lib/services/lead-service"
import { validateLead } from "@/lib/validation/lead"

/**
 * POST /api/submit-lead
 *
 * Thin controller: validate the request, delegate to the lead service (which
 * persists the lead and sends the attorney + client emails), and map service
 * errors to HTTP responses. Persistence, email assembly, and templates live
 * under `lib/services/`.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = validateLead(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    const leadData = await createLead(result.data)

    return NextResponse.json({ success: true, data: leadData }, { status: 200 })
  } catch (error) {
    if (error instanceof AttorneyNotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    if (error instanceof LeadPersistError) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.error("API Error:", error)

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
