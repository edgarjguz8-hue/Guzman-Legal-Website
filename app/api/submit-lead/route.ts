import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function sendEmail(to: string, subject: string, text: string, html?: string) {
  // If email service is configured, send here
  // For now, just log it
  console.log(`[Email] To: ${to}`)
  console.log(`[Email] Subject: ${subject}`)
  console.log(`[Email] Text: ${text}`)
  if (html) {
    console.log(`[Email] HTML: ${html}`)
  }
  
  // Placeholder for actual email service integration
  // Could use: SendGrid, AWS SES, Resend, etc.
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      attorneyId,
      zipCode,
      county,
      practiceArea,
      fullName,
      phone,
      email,
      legalIssue,
    } = body

    // Validate required fields
    if (
      !attorneyId ||
      !zipCode ||
      !practiceArea ||
      !fullName ||
      !phone ||
      !email ||
      !legalIssue
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get attorney details for email
    const { data: attorneyData } = await supabase
      .from('attorneys')
      .select('*')
      .eq('id', attorneyId)
      .single()

    // Insert lead into database
    const { data: leadData, error: leadError } = await supabase.from('leads').insert([
      {
        attorney_id: attorneyId,
        zip_code: zipCode,
        practice_area: practiceArea,
        full_name: fullName,
        phone,
        email,
        legal_issue: legalIssue,
      },
    ]).select()

    if (leadError) {
      console.error('Supabase error:', leadError)
      return NextResponse.json(
        { error: 'Failed to submit lead' },
        { status: 500 }
      )
    }

    // Send email to attorney
    if (attorneyData?.email) {
      const attorneyEmailText = `
New Lead Received

Client Name: ${fullName}
Phone: ${phone}
Email: ${email}
Practice Area: ${practiceArea}
ZIP Code: ${zipCode}
County: ${county}

Legal Issue:
${legalIssue}

Please reach out to the client at your earliest convenience.
      `.trim()

      await sendEmail(
        attorneyData.email,
        `New Lead: ${fullName} - ${practiceArea}`,
        attorneyEmailText
      )
    }

    // Send confirmation email to user
    const userEmailText = `
Thank you for connecting with us!

Your information has been received and forwarded to ${attorneyData?.firm_name || attorneyData?.name || 'your attorney'}.

We will be in touch shortly. The attorney will reach out to you soon to confirm next steps.

Best regards,
AttorneyAbogado
      `.trim()

    await sendEmail(
      email,
      'Connection Confirmed - AttorneyAbogado',
      userEmailText
    )

    return NextResponse.json({ success: true, data: leadData }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
