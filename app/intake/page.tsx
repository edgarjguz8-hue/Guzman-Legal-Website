'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { BackButton } from '@/components/back-button'

function IntakeFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const attorneyId = searchParams.get('attorneyId')
  const zipCode = searchParams.get('zip')
  const county = searchParams.get('county')
  const practiceArea = searchParams.get('area')

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    legalIssue: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!attorneyId || !zipCode || !county || !practiceArea) {
    return (
      <main className="min-h-screen bg-[#f8fafc] px-7 py-20">
        <div className="mx-auto max-w-[600px] text-center">
          <h1 className="text-3xl font-black text-[#071226]">Error</h1>
          <p className="mt-4 text-slate-600">
            Invalid request. Please start over.
          </p>
        </div>
      </main>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attorneyId,
          zipCode,
          county,
          practiceArea,
          ...formData,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit form')
      }

      router.push('/thank-you')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="bg-[#082f63] px-7 pt-6 text-white">
        <div className="mx-auto max-w-[1400px]">
          <BackButton />
        </div>
      </section>
      <div className="px-7 py-20">
        <div className="mx-auto max-w-[600px]">
          <h1 className="text-4xl font-black text-[#071226]">
          Tell us more about your case
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          We&apos;ve found a qualified attorney in your area. Please provide
          some details about your legal issue.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="block text-sm font-black text-[#071226] mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 px-5 py-3 text-lg text-black placeholder:text-slate-500 outline-none focus:border-[#0b5fc4]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-[#071226] mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 px-5 py-3 text-lg text-black placeholder:text-slate-500 outline-none focus:border-[#0b5fc4]"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-[#071226] mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 px-5 py-3 text-lg text-black placeholder:text-slate-500 outline-none focus:border-[#0b5fc4]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-[#071226] mb-2">
              Describe your legal issue *
            </label>
            <textarea
              name="legalIssue"
              value={formData.legalIssue}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-lg border border-slate-200 px-5 py-3 text-lg text-black placeholder:text-slate-500 outline-none focus:border-[#0b5fc4]"
              placeholder="Tell us about your legal issue..."
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-4 rounded-lg bg-[#061a38] py-4 font-black text-white shadow-xl disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
            {!loading && <ArrowRight className="h-5 w-5" />}
          </button>

          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
            ✓ 100% Confidential - Your information will never be shared publicly
          </div>
        </form>
        </div>
      </div>
    </main>
  )
}

export default function IntakePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f8fafc] px-7 py-20">
          <div className="mx-auto max-w-[600px] text-center">
            <p>Loading...</p>
          </div>
        </main>
      }
    >
      <IntakeFormContent />
    </Suspense>
  )
}
