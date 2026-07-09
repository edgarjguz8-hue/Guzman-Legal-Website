import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { zipCode, category } = body

    if (!zipCode || !category) {
      return NextResponse.json(
        { error: "ZIP code and category are required." },
        { status: 400 }
      )
    }

    const cleanZipCode = String(zipCode).trim()
    const cleanCategory = String(category).trim()

    const { data: zipMatch, error: zipError } = await supabase
      .from("zip_counties")
      .select("county")
      .eq("zip_code", cleanZipCode)
      .maybeSingle()

    if (zipError) {
      return NextResponse.json({ error: zipError.message }, { status: 500 })
    }

    if (!zipMatch?.county) {
      return NextResponse.json({
        county: null,
        attorneys: [],
        message:
          "We are currently expanding in your area. Please check back soon.",
      })
    }

    const county = String(zipMatch.county).trim()

    const { data: attorneys, error: attorneyError } = await supabase
      .from("attorneys")
      .select("*")
      .eq("approved", true)
      .eq("county", county)
      .eq("category", cleanCategory)

    if (attorneyError) {
      return NextResponse.json(
        { error: attorneyError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      county,
      attorneys: attorneys || [],
      message:
        attorneys && attorneys.length > 0
          ? "Attorney match found."
          : "We are currently expanding in your area. Please check back soon.",
    })
  } catch (error) {
    console.error("Find attorney error:", error)

    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    )
  }
}