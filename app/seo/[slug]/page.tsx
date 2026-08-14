"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, MapPin, ChevronDown, Lock, Shield, MessageCircle } from "lucide-react"
import {
  parseSeoSlug,
  generateMetaTitle,
  generateMetaDescription,
  generateH1,
  generateIntroParagraph,
  practiceAreas,
  cities as locations,
  seoPagePath,
} from "@/lib/seo"

export default function SeoPage({ params }: { params: { slug: string } }) {
  const parsed = parseSeoSlug(params.slug)
  const router = useRouter()
  const [zipCode, setZipCode] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notAvailableMessage, setNotAvailableMessage] = useState("")

  // If slug is invalid, show 404
  if (!parsed) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#071226]">Page Not Found</h1>
          <p className="mt-2 text-slate-600">This attorney services page does not exist.</p>
          <a href="/" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#061a38] px-6 py-3 font-black text-white">
            Back to Home <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    )
  }

  const practiceAreaName = parsed.practiceArea.name
  const locationName = parsed.location?.name || parsed.county?.name || "Florida"
  const pageTitle = generateMetaTitle(practiceAreaName, parsed.location?.name || null, parsed.county?.name || null)
  const pageDescription = generateMetaDescription(practiceAreaName, parsed.location?.name || null, parsed.county?.name || null)
  const h1 = generateH1(practiceAreaName, parsed.location?.name || null, parsed.county?.name || null)
  const introParagraph = generateIntroParagraph(practiceAreaName, parsed.location?.name || null, parsed.county?.name || null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setNotAvailableMessage("")

    if (!zipCode || !selectedArea) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/find-attorney", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zipCode,
          category: selectedArea,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setNotAvailableMessage(data.error || "An error occurred. Please try again.")
        return
      }

      if (data.attorneys && data.attorneys.length > 0) {
        const attorney = data.attorneys[0]

        const params = new URLSearchParams({
          attorneyId: attorney.id || "",
          firmName: attorney.firm_name || attorney.name || "",
          attorneyName: attorney.name || "",
          area: attorney.category || selectedArea,
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
      setNotAvailableMessage("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const relatedAreas = practiceAreas.filter(pa => pa.slug !== parsed.practiceArea.slug).slice(0, 5)
  const relatedLocations = parsed.location 
    ? locations.filter(l => l.slug !== parsed.location.slug).slice(0, 5)
    : locations.slice(0, 5)

  // Generate FAQ content based on practice area
  const faqs = [
    {
      question: `How do I find a qualified ${practiceAreaName.toLowerCase()} in ${locationName}?`,
      answer: `Guzman Legal simplifies the process by connecting you with experienced ${practiceAreaName.toLowerCase()}s in ${locationName}. Simply enter your ZIP code and practice area, and we'll match you with qualified attorneys.`,
    },
    {
      question: `What experience do your ${practiceAreaName.toLowerCase()}s have?`,
      answer: `Our network includes highly experienced ${practiceAreaName.toLowerCase()}s with years of practice in ${locationName}. Each attorney is vetted to ensure they meet our standards for excellence and client service.`,
    },
    {
      question: "Is there a cost to use Guzman Legal?",
      answer: "Using Guzman Legal is free! There's no cost to find an attorney or get connected. Any fees would be between you and the attorney you choose to work with.",
    },
    {
      question: "Do you offer services in Spanish?",
      answer: "Yes! We serve Spanish-speaking clients and have bilingual attorneys available to help.",
    },
  ]

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      {/* SEO Meta Tags - rendered as hidden content for proper indexing */}
      <div className="sr-only">
        <h1>{pageTitle}</h1>
        <meta name="description" content={pageDescription} />
      </div>

      <section className="relative overflow-visible bg-[#082f63] px-7 pb-32 pt-6 text-white">
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

        <div className="relative z-10 mx-auto mt-16 max-w-[950px]">
          <div className="max-w-[550px]">
            <h2 className="text-5xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl" style={{ fontFamily: "var(--font-heading)" }}>
              {h1}
            </h2>

            <p className="mt-6 max-w-[550px] text-base leading-relaxed text-white md:text-lg">
              {introParagraph}
            </p>
          </div>

          <form onSubmit={handleSearch} className="mx-auto mt-10 max-w-[950px] rounded-2xl bg-white p-6 text-[#071226] shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <div className="grid items-end gap-5 lg:grid-cols-[1fr_50px_1fr_240px]">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071226] text-sm font-black text-white">
                    1
                  </span>
                  <p className="text-sm font-black">ZIP Code</p>
                </div>

                <div className="flex h-14 items-center gap-3 rounded-lg border border-slate-200 px-5">
                  <MapPin className="h-6 w-6 text-[#071226]" />
                  <input
                    type="text"
                    placeholder="Enter ZIP code"
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

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071226] text-sm font-black text-white">
                    2
                  </span>
                  <p className="text-sm font-black">Practice Area</p>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex h-14 w-full items-center justify-between rounded-lg border border-slate-200 px-5 text-left text-lg text-slate-600"
                  >
                    {selectedArea || "Select practice area"}
                    <ChevronDown className="h-5 w-5 text-[#071226]" />
                  </button>

                  {showDropdown && (
                    <div className="absolute left-0 right-0 top-full z-[9999] mt-1 max-h-96 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                      {practiceAreas.map((area) => (
                        <button
                          key={area.slug}
                          type="button"
                          onClick={() => {
                            setSelectedArea(area.name)
                            setShowDropdown(false)
                          }}
                          className="block w-full px-5 py-3 text-left text-lg hover:bg-slate-100 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {area.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !zipCode || !selectedArea}
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

          <div className="mt-6 flex flex-wrap justify-center gap-12 text-sm font-semibold text-white">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Confidential
            </div>

            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              No Obligation
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Spanish Available
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white px-7 py-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-black text-[#071226]">How Guzman Legal Works</h2>
          <p className="mt-2 text-lg text-slate-600">Simple steps to find your {practiceAreaName.toLowerCase()} in {locationName}</p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-[#eef5ff] p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0b5fc4]">
                <span className="text-lg font-black text-white">1</span>
              </div>
              <h3 className="text-xl font-black text-[#071226]">Enter Your Details</h3>
              <p className="mt-3 text-slate-600">
                Provide your ZIP code and describe your legal needs. The more details you share, the better we can match you.
              </p>
            </div>

            <div className="rounded-xl bg-[#eef5ff] p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0b5fc4]">
                <span className="text-lg font-black text-white">2</span>
              </div>
              <h3 className="text-xl font-black text-[#071226]">Get Matched</h3>
              <p className="mt-3 text-slate-600">
                We connect you with qualified {practiceAreaName.toLowerCase()}s in your area who can handle your case.
              </p>
            </div>

            <div className="rounded-xl bg-[#eef5ff] p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0b5fc4]">
                <span className="text-lg font-black text-white">3</span>
              </div>
              <h3 className="text-xl font-black text-[#071226]">Connect Directly</h3>
              <p className="mt-3 text-slate-600">
                Get attorney contact information and reach out directly. There's no obligation to proceed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f8fafc] px-7 py-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-4xl font-black text-[#071226]">Frequently Asked Questions</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                <h3 className="text-lg font-black text-[#071226]">{faq.question}</h3>
                <p className="mt-3 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Practice Areas */}
      {relatedAreas.length > 0 && (
        <section className="bg-white px-7 py-20">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="text-3xl font-black text-[#071226]">Other Practice Areas in {locationName}</h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedAreas.map((area) => {
                const relatedSlug = parsed.location
                  ? `${area.slug}-${parsed.location.slug}`
                  : `${area.slug}-${parsed.county?.slug}`
                return (
                  <a
                    key={area.slug}
                    href={seoPagePath(relatedSlug)}
                    className="rounded-lg bg-[#eef5ff] p-4 text-[#0b5fc4] hover:bg-[#ddeeff] transition font-semibold"
                  >
                    {area.name}
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Locations */}
      {relatedLocations.length > 0 && (
        <section className="bg-[#f8fafc] px-7 py-20">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="text-3xl font-black text-[#071226]">{practiceAreaName} in Nearby Areas</h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedLocations.map((loc) => (
                <a
                  key={loc.slug}
                  href={seoPagePath(`${parsed.practiceArea.slug}-${loc.slug}`)}
                  className="rounded-lg bg-white p-4 text-[#0b5fc4] hover:bg-slate-50 transition font-semibold shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                >
                  {loc.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
