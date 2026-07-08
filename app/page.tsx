"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import {
  Shield,
  Lock,
  MessageCircle,
  MapPin,
  ArrowRight,
  ChevronDown,
  Car,
  Heart,
  Globe,
  FileText,
} from "lucide-react"

type Article = {
  id: string
  title: string
  title_es: string | null
  slug: string
  excerpt: string | null
  excerpt_es: string | null
}

export default function HomePage() {
  const { t, language } = useLanguage()
  const isSpanish = language === "es"

  const [zipCode, setZipCode] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notAvailableMessage, setNotAvailableMessage] = useState("")
  const [articles, setArticles] = useState<Article[]>([])
  const router = useRouter()

  useEffect(() => {
    async function loadArticles() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) return

      const supabase = createClient(supabaseUrl, supabaseKey)

      const { data, error } = await supabase
        .from("articles")
        .select("id, title, title_es, slug, excerpt, excerpt_es")
        .eq("published", true)
        .eq("featured", true)
        .order("published_date", { ascending: false })
        .limit(3)

      if (error) {
        console.error("Homepage article fetch error:", error.message)
        return
      }

      setArticles(data || [])
    }

    loadArticles()
  }, [])

  const practiceAreas = [
    { icon: Car, value: "Car Accidents & Injury", title: t("practice.carAccidents"), text: t("home.practiceCarDesc") },
    { icon: Heart, value: "Family Law", title: t("practice.familyLaw"), text: t("home.practiceFamilyDesc") },
    { icon: Shield, value: "Criminal Defense", title: t("practice.criminalDefense"), text: t("home.practiceCriminalDesc") },
    { icon: Globe, value: "Immigration", title: t("practice.immigration"), text: t("home.practiceImmigrationDesc") },
    { icon: Shield, value: "Employment Law", title: t("practice.employmentLaw"), text: t("home.practiceEmploymentDesc") },
    { icon: FileText, value: "Business Law", title: t("practice.businessLaw"), text: t("home.practiceBusinessDesc") },
    { icon: FileText, value: "Estate Planning & Probate", title: t("practice.estatePlanning"), text: t("home.practiceEstateDesc") },
    { icon: Shield, value: "Real Estate Law", title: t("practice.realEstate"), text: t("home.practiceRealEstateDesc") },
  ]

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
        body: JSON.stringify({ zipCode, category: selectedArea }),
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
      setNotAvailableMessage(t("form.errorGeneric"))
    } finally {
      setLoading(false)
    }
  }

  const selectedAreaLabel =
    practiceAreas.find((area) => area.value === selectedArea)?.title || ""

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
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

        <SiteHeader activePage="home" />

        <div className="relative z-10 mx-auto mt-16 max-w-[950px]">
          <div className="max-w-[550px]">
            <h2
              className="text-5xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("hero.title")}
            </h2>

            <p className="mt-6 max-w-[550px] text-base leading-relaxed text-white md:text-lg">
              {t("hero.subtitle")}
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 max-w-[950px] rounded-2xl bg-white p-6 text-[#071226] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
          >
            <div className="grid items-end gap-5 lg:grid-cols-[1fr_50px_1fr_240px]">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071226] text-sm font-black text-white">
                    1
                  </span>
                  <p className="text-sm font-black">{t("hero.zipLabel")}</p>
                </div>

                <div className="flex h-14 items-center gap-3 rounded-lg border border-slate-200 px-5">
                  <MapPin className="h-6 w-6 text-[#071226]" />
                  <input
                    type="text"
                    placeholder={t("hero.zipPlaceholder")}
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
                  <p className="text-sm font-black">{t("hero.issueLabel")}</p>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex h-14 w-full items-center justify-between rounded-lg border border-slate-200 px-5 text-left text-lg text-slate-600"
                  >
                    {selectedAreaLabel || t("hero.issuePlaceholder")}
                    <ChevronDown className="h-5 w-5 text-[#071226]" />
                  </button>

                  {showDropdown && (
                    <div className="absolute left-0 right-0 top-full z-[9999] mt-1 max-h-96 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                      {practiceAreas.map((area) => (
                        <button
                          key={area.value}
                          type="button"
                          onClick={() => {
                            setSelectedArea(area.value)
                            setShowDropdown(false)
                          }}
                          className="block w-full px-5 py-3 text-left text-lg hover:bg-slate-100 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {area.title}
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
                {loading ? t("form.searching") : t("hero.findButton")}
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
              {t("howItWorks.confidential")}
            </div>

            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t("howItWorks.noObligation")}
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {t("howItWorks.spanish")}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-7 py-14">
        <div className="mx-auto max-w-[1400px] text-center">
          <h3 className="text-3xl font-black text-[#071226]">
            {t("home.helpTitle")}
          </h3>
          <p className="mt-2 text-base text-slate-500">
            {t("home.helpSubtitle")}
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {practiceAreas.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.value}
                  className="rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                >
                  <Icon className="mx-auto mb-5 h-12 w-12 text-[#0b5fc4]" />

                  <h4 className="text-base font-black text-[#071226]">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-7 py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-5 h-1 w-10 rounded-full bg-[#0b5fc4]" />

            <h3 className="text-4xl font-black text-[#071226]">
              {t("home.whyTitle")}
            </h3>

            <p className="mt-4 text-lg text-slate-600">
              {t("home.whySubtitle")}
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef5ff]">
                  <MapPin className="h-6 w-6 text-[#0b5fc4]" />
                </div>
                <div>
                  <h4 className="font-black">{t("home.whyLocalTitle")}</h4>
                  <p className="mt-1 text-slate-600">
                    {t("home.whyLocalText")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef5ff]">
                  <Shield className="h-6 w-6 text-[#0b5fc4]" />
                </div>
                <div>
                  <h4 className="font-black">{t("home.whySecureTitle")}</h4>
                  <p className="mt-1 text-slate-600">
                    {t("home.whySecureText")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef5ff]">
                  <Lock className="h-6 w-6 text-[#0b5fc4]" />
                </div>
                <div>
                  <h4 className="font-black">{t("home.whyFastTitle")}</h4>
                  <p className="mt-1 text-slate-600">
                    {t("home.whyFastText")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef5ff]">
                  <MessageCircle className="h-6 w-6 text-[#0b5fc4]" />
                </div>
                <div>
                  <h4 className="font-black">{t("home.whySpanishTitle")}</h4>
                  <p className="mt-1 text-slate-600">
                    {t("home.whySpanishText")}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/get-connected"
              className="mt-8 inline-flex items-center gap-4 rounded-lg bg-[#061a38] px-7 py-4 font-black text-white shadow-xl"
            >
              {t("hero.findButton")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/attorney-client-meeting.jpg"
              alt="Attorney meeting with client"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-7 py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <h2
              className="text-4xl font-black text-[#071226] md:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("home.resourcesTitle")}
            </h2>

            <p className="mt-3 text-lg text-slate-600">
              {t("home.resourcesSubtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Link
              href="/resources#faqs"
              className="group rounded-3xl bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5ff]">
                  <MessageCircle className="h-8 w-8 text-[#0b5fc4]" />
                </div>

                <h3 className="text-2xl font-black text-[#071226]">
                  {t("home.faqCardTitle")}
                </h3>
              </div>

              <div className="space-y-5">
                {[t("resources.faq1"), t("resources.faq2"), t("resources.faq3")].map(
                  (question) => (
                    <div
                      key={question}
                      className="flex items-center justify-between border-b pb-4 text-[#071226]"
                    >
                      <span>{question}</span>
                      <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#0b5fc4]" />
                    </div>
                  )
                )}
              </div>

              <div className="mt-8 inline-flex items-center gap-2 font-black text-[#0b5fc4]">
                {t("home.viewAllFaqs")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            <div className="rounded-3xl bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              <Link href="/resources#articles" className="group block">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5ff]">
                    <FileText className="h-8 w-8 text-[#0b5fc4]" />
                  </div>

                  <h3 className="text-2xl font-black text-[#071226]">
                    {t("home.blogCardTitle")}
                  </h3>
                </div>
              </Link>

              <div className="space-y-5">
                {articles.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    {isSpanish
                      ? "No hay artículos publicados todavía."
                      : "No articles are published yet."}
                  </p>
                ) : (
                  articles.map((article, index) => {
                    const title =
                      isSpanish && article.title_es ? article.title_es : article.title

                    const excerpt =
                      isSpanish && article.excerpt_es
                        ? article.excerpt_es
                        : article.excerpt

                    return (
                      <Link
                        key={article.id}
                        href={`/resources/${article.slug}`}
                        className={`block ${index !== articles.length - 1 ? "border-b pb-4" : ""
                          }`}
                      >
                        <h4 className="font-semibold text-[#071226]">
                          {title}
                        </h4>

                        {excerpt && (
                          <p className="mt-1 text-sm text-slate-500">
                            {excerpt}
                          </p>
                        )}
                      </Link>
                    )
                  })
                )}
              </div>

              <Link
                href="/resources#articles"
                className="mt-8 inline-flex items-center gap-2 font-black text-[#0b5fc4]"
              >
                {t("resources.viewAllArticles")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-[#082f63] p-10">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div>
                <h3 className="text-3xl font-black text-white">
                  {t("home.questionsTitle")}
                </h3>

                <p className="mt-2 text-white/80">
                  {t("home.questionsSubtitle")}
                </p>
              </div>

              <a
                href="mailto:edgar@attorneyabogado.com?subject=Attorney%20Abogado%20Inquiry&body=Hello,%0D%0A%0D%0AI%20would%20like%20more%20information%20about..."
                className="rounded-xl bg-white px-8 py-4 font-black text-[#071226] transition hover:bg-slate-100"
              >
                {t("home.contactUs")} →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}