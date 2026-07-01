import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  const { data, error } = await resend.emails.send({
    from: 'AttorneyAbogado <noreply@attorneyabogado.com>',
    to,
    subject,
    text,
    html:
      html ||
      `<div style="font-family:Arial,sans-serif;white-space:pre-line">${text}</div>`,
  })

  if (error) {
    console.error('Resend Error:', error)
    throw error
  }

  return data
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

    // Get attorney information
    const { data: attorneyData, error: attorneyError } = await supabase
      .from('attorneys')
      .select('*')
      .eq('id', attorneyId)
      .single()

    if (attorneyError || !attorneyData) {
      return NextResponse.json(
        { error: 'Attorney not found' },
        { status: 404 }
      )
    }

    // Save lead
    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert([
        {
          attorney_id: attorneyId,
          zip_code: zipCode,
          practice_area: practiceArea,
          full_name: fullName,
          phone,
          email,
          legal_issue: legalIssue,
        },
      ])
      .select()

    if (leadError) {
      console.error(leadError)

      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    //
    // EMAIL TO ATTORNEY
    //
    if (attorneyData.email) {
      await sendEmail(
        attorneyData.email,
        `New Lead - ${fullName}`,
        `
New Lead Received

Client:
${fullName}

Phone:
${phone}

Email:
${email}

Practice Area:
${practiceArea}

ZIP Code:
${zipCode}

County:
${county}

Legal Issue:
${legalIssue}
`,
        `
<h2>New Lead Received</h2>

<p><strong>Client:</strong> ${fullName}</p>

<p><strong>Phone:</strong> ${phone}</p>

<p><strong>Email:</strong> ${email}</p>

<p><strong>Practice Area:</strong> ${practiceArea}</p>

<p><strong>ZIP Code:</strong> ${zipCode}</p>

<p><strong>County:</strong> ${county}</p>

<p><strong>Legal Issue</strong></p>

<p>${legalIssue.replace(/\n/g, '<br>')}</p>
`
      )
    }

    //
    // CONFIRMATION EMAIL
    //
    await sendEmail(
      email,
      'We Received Your Request',
      `
Thank you for contacting AttorneyAbogado.

We've successfully received your information and forwarded it to:

${attorneyData.firm_name || attorneyData.name}

Someone from their office should contact you shortly.

Thank you,

AttorneyAbogado
`,
      `
<h2>Thank You!</h2>

<p>We've successfully received your request.</p>

<p>Your information has been forwarded to:</p>

<p><strong>${attorneyData.firm_name || attorneyData.name}</strong></p>

<p>An attorney should contact you shortly.</p>

<p>Thank you for using AttorneyAbogado.</p>
`
    )

    return NextResponse.json({
      success: true,
      lead: leadData,
    })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      }
    )
  }
}
