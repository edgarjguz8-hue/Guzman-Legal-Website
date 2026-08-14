"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import {
  ArrowRight,
  CheckCircle,
  HelpCircle,
  MapPin,
  ChevronDown,
} from "lucide-react"
import type { SEOPage } from "@/lib/seo-pages"

interface SEOPageContentProps {
  page: SEOPage
  relatedPages: SEOPage[]
}

export function SEOPageContent({
  page,
  relatedPages,
}: SEOPageContentProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [zipCode, setZipCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [notAvailableMessage, setNotAvailableMessage] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const locationName = page.isCounty
    ? (page.location as any).label
    : (page.location as any).label

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setNotAvailableMessage("")

    if (!zipCode) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/find-attorney", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zipCode,
          category: page.practiceArea.label,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setNotAvailableMessage(data.error || t("form.errorGeneric"))
        return
      }

      if (data.attorneys && data.attorneys.length > 0) {
        const attorney = data.attorneys[0]

        const params = new URLSearchParams({
          attorneyId: attorney.id || "",
          firmName: attorney.firm_name || attorney.name || "",
          attorneyName: attorney.name || "",
          area: attorney.category || page.practiceArea.label,
          county: attorney.county || data.county || "",
          phone: attorney.phone || "",
          email: attorney.email || "",
          website: attorney.website || "",
          bio: attorney.description || attorney.bio || "",
          zip: zipCode,
        })

        router.push(`/matched-attorney?${params.toString()}`)
      } else {
        setNotAvailableMessage(
          data.message || "We are currently expanding in your area. Please check back soon."
        )
      }
    } catch (error) {
      console.error("[v0] Search error:", error)
      setNotAvailableMessage(t("form.errorGeneric"))
    } finally {
      setLoading(false)
    }
  }

  const faqs = [
    {
      question: `How do I find a ${page.practiceArea.label.toLowerCase()} in ${locationName}?`,
      answer: `Use our search tool above to find qualified ${page.practiceArea.label.toLowerCase()} in ${locationName}. Enter your ZIP code and we'll match you with experienced lawyers in your area.`,
    },
    {
      question: `What should I ask a ${page.practiceArea.label.toLowerCase()}?`,
      answer: `Ask about their experience with cases like yours, their fees, their approach, and how they communicate. Most lawyers offer free initial consultations.`,
    },
    {
      question: `How much does a ${page.practiceArea.label.toLowerCase()} cost?`,
      answer: `Costs vary. Many ${page.practiceArea.label.toLowerCase()} work on hourly rates, contingency fees, or flat fees. Discuss pricing during your consultation.`,
    },
    {
      question: `Can I get a free consultation?`,
      answer: `Yes! Many ${page.practiceArea.label.toLowerCase()} offer free initial consultations. Use our service to find lawyers offering free consultations in your area.`,
    },
  ]

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      <section className="relative overflow-visible bg-[#082f63] px-7 pb-16 pt-6 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute right-[-160px] top-[-130px] h-[520px] w-[520px] rounded-full bg-[#1d6fd1] blur-[150px]" />
          <div className="absolute left-[220px] top-[180px] h-[360px] w-[360px] rounded-full bg-[#0b4fa3] blur-[130px]" />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
          <div className="absolute right-0 top-32 h-[420px] w-[760px] rounded-full border border-white/30" />
          <div className="absolute right-[-80px] top-44 h-[420px] w-[760px] rounded-full border border-white/20" />
          <div className="absolute right-[-180px] top-56 h-[420px] w-[760px] rounded-full border border-white/10" />
        </div>

        <div className="pointer-events-none absolute right-16 top-36 grid grid-cols-8 gap-5 opacity-40">
          {Array.from({ length: 64 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-white" />
          ))}
        </div>

        <div className="relative z-10 mx-auto mt-12 max-w-[950px]">
          <div className="max-w-[550px]">
            <h1
              className="text-5xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {page.practiceArea.label} in {locationName}
            </h1>

            <p className="mt-6 max-w-[550px] text-base leading-relaxed text-white md:text-lg">
              Connect with experienced {page.practiceArea.label.toLowerCase()} serving {locationName}. Get the legal help you need, when you need it.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 max-w-[950px] rounded-2xl bg-white p-6 text-[#071226] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
          >
            <div className="grid items-end gap-5 lg:grid-cols-[1fr_50px_160px]">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071226] text-sm font-black text-white">
                    1
                  </span>
                  <p className="text-sm font-black">Enter Your ZIP Code</p>
                </div>

                <div className="flex h-14 items-center gap-3 rounded-lg border border-slate-200 px-5">
                  <MapPin className="h-6 w-6 text-[#071226]" />
                  <input
                    type="text"
                    placeholder="e.g., 33602"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    maxLength={5}
                    className="w-full bg-transparent text-lg outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white lg:flex">
                <ArrowRight className="h-5 w-5" />
              </div>

              <button
                type="submit"
                disabled={loading || !zipCode}
                className="flex h-14 items-center justify-center gap-4 rounded-lg bg-[#061a38] text-base font-black text-white shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Searching..." : "Find Attorney"}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>
            </div>

            {notAvailableMessage && (
              <div className="mt-4 rounded-lg bg-amber-50 p-4 text-center text-amber-800">
                {notAvailableMessage}
              </div>
            )}
          </form>
        </div>
      </section>

      <section className="bg-white px-7 py-20">
        <div className="mx-auto max-w-[950px]">
          <h2 className="text-4xl font-black text-[#071226]">
            How Guzman Legal Works
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-lg font-black text-[#0b5fc4]">
                1
              </div>
              <div>
                <h3 className="font-black text-[#071226]">Enter Your Details</h3>
                <p className="mt-2 text-slate-600">
                  Tell us your legal issue and location. Our system matches you with qualified lawyers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-lg font-black text-[#0b5fc4]">
                2
              </div>
              <div>
                <h3 className="font-black text-[#071226]">Get Matched</h3>
                <p className="mt-2 text-slate-600">
                  We connect you with the best attorney for your case in just minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-lg font-black text-[#0b5fc4]">
                3
              </div>
              <div>
                <h3 className="font-black text-[#071226]">Consult & Solve</h3>
                <p className="mt-2 text-slate-600">
                  Connect with your attorney for a consultation and get started on your case.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="flex gap-3 rounded-lg bg-[#f0f7ff] p-6">
              <CheckCircle className="h-6 w-6 shrink-0 text-[#0b5fc4]" />
              <div>
                <h4 className="font-black text-[#071226]">100% Confidential</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Your information is secure and private.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg bg-[#f0f7ff] p-6">
              <CheckCircle className="h-6 w-6 shrink-0 text-[#0b5fc4]" />
              <div>
                <h4 className="font-black text-[#071226]">No Obligation</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Free to use, no hidden fees.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg bg-[#f0f7ff] p-6">
              <CheckCircle className="h-6 w-6 shrink-0 text-[#0b5fc4]" />
              <div>
                <h4 className="font-black text-[#071226]">Spanish Available</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Bilingual legal services available.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg bg-[#f0f7ff] p-6">
              <CheckCircle className="h-6 w-6 shrink-0 text-[#0b5fc4]" />
              <div>
                <h4 className="font-black text-[#071226]">Fast & Easy</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Get connected in just a few minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-7 py-20">
        <div className="mx-auto max-w-[950px]">
          <h2 className="text-4xl font-black text-[#071226]">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="flex w-full items-center justify-between bg-white px-6 py-4 text-left hover:bg-slate-50"
                >
                  <span className="flex items-center gap-3 font-black text-[#071226]">
                    <HelpCircle className="h-5 w-5 text-[#0b5fc4]" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedFaq === index && (
                  <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
                    <p className="text-slate-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-7 py-20">
        <div className="mx-auto max-w-[950px]">
          <h2 className="text-4xl font-black text-[#071226]">
            Related Practice Areas
          </h2>

          <div className="mt-10 grid gap-4">
            {relatedPages.slice(0, 6).map((related) => (
              <Link
                key={related.slug}
                href={`/${related.slug}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 hover:border-[#0b5fc4] hover:bg-[#f0f7ff]"
              >
                <span className="font-semibold text-[#071226]">
                  {related.practiceArea.label} in {related.isCounty ? related.location.label : (related.location as any).label}
                </span>
                <ArrowRight className="h-5 w-5 text-[#0b5fc4]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
