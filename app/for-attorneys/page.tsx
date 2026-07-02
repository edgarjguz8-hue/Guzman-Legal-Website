"use client"

import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  DollarSign,
  Lock,
  MapPin,
  MessageCircle,
  Search,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react"
import { BackButton } from "@/components/back-button"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/language-context"

export default function ForAttorneysPage() {
  const { t } = useLanguage()

  const copy = (key: string, fallback: string) => {
    const translated = t(key)
    return translated === key ? fallback : translated
  }

  const benefits = [
    {
      icon: Shield,
      title: copy("forAttorneys.exclusiveTerritory", "Exclusive Territory"),
      text: copy(
        "forAttorneys.exclusiveTerritoryText",
        "You get exclusive rights to your ZIP code and practice area. No other attorneys on our platform in your territory.",
      ),
    },
    {
      icon: Users,
      title: copy("forAttorneys.qualifiedLeads", "Qualified Leads"),
      text: copy(
        "forAttorneys.qualifiedLeadsText",
        "We connect you with people who are actively searching for legal help in your area.",
      ),
    },
    {
      icon: TrendingUp,
      title: copy("forAttorneys.predictableGrowth", "Predictable Growth"),
      text: copy(
        "forAttorneys.predictableGrowthText",
        "Build a consistent pipeline of new clients every month and grow your practice in your local market.",
      ),
    },
    {
      icon: DollarSign,
      title: copy("forAttorneys.simplePricing", "Simple Pricing"),
      text: copy(
        "forAttorneys.simplePricingText",
        "Transparent pricing with no long-term contracts or hidden fees.",
      ),
    },
  ]

  const monthlyFeatures = [
    copy(
      "forAttorneys.priceFeature1",
      "Exclusive rights to your ZIP code & practice area",
    ),
    copy("forAttorneys.priceFeature2", "High-quality, pre-qualified leads"),
    copy(
      "forAttorneys.priceFeature3",
      "Direct connections with people actively seeking legal help",
    ),
    copy("forAttorneys.priceFeature4", "Cancel anytime"),
  ]

  const yearlyFeatures = [
    copy(
      "forAttorneys.priceFeature1",
      "Exclusive rights to your ZIP code & practice area",
    ),
    copy("forAttorneys.priceFeature2", "High-quality, pre-qualified leads"),
    copy(
      "forAttorneys.priceFeature3",
      "Direct connections with people actively seeking legal help",
    ),
  ]

  return (
    <main className="min-h-screen bg-white text-[#071226]">
      <section className="relative overflow-hidden bg-[#061733] px-7 pb-20 pt-6 text-white">
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <BackButton />
        </div>

        <div className="relative z-10">
          <SiteHeader activePage="for-attorneys" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1050px] flex-col items-center py-20 text-center">
          <p className="mb-5 text-sm font-black uppercase tracking-wide text-[#0b6fff] md:text-lg">
            {copy("forAttorneys.heroSmall", "For Attorneys")}
          </p>

          <h1
            className="max-w-[900px] text-4xl font-black leading-[0.95] tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {copy("forAttorneys.heroTitle1", "Grow Your")}
            <br />
            {copy("forAttorneys.heroTitle2", "Legal Practice.")}
            <br />
            <span className="mt-3 block text-6xl text-white md:text-7xl">
              {copy("forAttorneys.heroTitle3", "Get Discovered.")}
            </span>
          </h1>

          <p className="mt-9 max-w-[720px] text-lg font-semibold leading-relaxed text-white/90 md:text-xl">
            {copy(
              "forAttorneys.subtitle",
              "AttorneyAbogado.com helps attorneys connect with people actively looking for legal help in their area.",
            )}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a
              href="mailto:info@attorneyabogado.com"
              className="inline-flex min-w-[220px] items-center justify-center gap-4 rounded-md bg-white px-8 py-4 font-black text-[#071226] shadow-xl"
            >
              {copy("forAttorneys.getListed", "Get Listed")}
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#pricing"
              className="inline-flex min-w-[220px] items-center justify-center rounded-md border border-white/50 px-8 py-4 font-black text-white"
            >
              {copy("forAttorneys.viewPricing", "View Pricing")}
            </a>
          </div>

          <p className="mt-9 flex items-center justify-center gap-3 text-sm font-bold text-white/85 md:text-base">
            <Shield className="h-5 w-5" />
            {copy(
              "forAttorneys.noCompetition",
              "Exclusive territories. No competition from other attorneys.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-[#f8fbff] px-7 py-16">
        <div className="mx-auto max-w-[1250px] rounded-3xl border border-[#dbe7f7] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-12 lg:p-16">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#006dff]">
                {copy("forAttorneys.whatWeDoLabel", "What We Do")}
              </p>
              <div className="mt-3 h-1 w-12 bg-[#006dff]" />

              <h2
                className="mt-7 text-4xl font-black md:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copy("forAttorneys.whatWeDoTitle", "What We Do")}
              </h2>

              <div className="mt-10">
                <ProcessGraphic copy={copy} />
              </div>
            </div>

            <div className="lg:pl-8">
              <h3
                className="max-w-[620px] text-3xl font-black leading-tight md:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copy(
                  "forAttorneys.whatWeDoHeadline",
                  "We connect attorneys with people actively looking for legal help and give you the exclusive rights to your market.",
                )}
              </h3>

              <div className="my-8 h-px w-full bg-slate-200" />

              <p className="max-w-[660px] text-lg font-semibold leading-8 text-[#31415f]">
                {copy(
                  "forAttorneys.whatWeDoText1",
                  "Our platform gives you exclusive rights to a ZIP code and practice area, so you never compete with other attorneys on our platform in your territory.",
                )}
              </p>

              <p className="mt-7 max-w-[660px] text-lg font-semibold leading-8 text-[#31415f]">
                {copy(
                  "forAttorneys.whatWeDoText2",
                  "You’ll receive high-quality leads from real people in your community who need your help — so you can focus on what you do best: practicing law.",
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1000px] gap-4 rounded-2xl bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)] md:grid-cols-3">
          <TrustItem icon={Lock} text={copy("forAttorneys.confidential", "100% Confidential")} />
          <TrustItem icon={Shield} text={copy("forAttorneys.noObligation", "No Obligation")} />
          <TrustItem icon={MessageCircle} text={copy("forAttorneys.spanish", "Hablamos Español")} />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-7 py-16">
        <div className="mx-auto max-w-[1250px] text-center">
          <p className="text-sm font-black uppercase tracking-wide text-[#006dff]">
            {copy("forAttorneys.whyChooseLabel", "Why Attorneys Choose")}
          </p>
          <div className="mx-auto mt-3 h-1 w-12 bg-[#006dff]" />

          <h2
            className="mt-7 text-4xl font-black md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {copy(
              "forAttorneys.whyChooseTitle",
              "Why Attorneys Choose AttorneyAbogado",
            )}
          </h2>

          <p className="mt-5 text-lg font-semibold text-[#31415f]">
            {copy(
              "forAttorneys.whyChooseSubtitle",
              "More visibility. More qualified leads. Less competition.",
            )}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-[0_16px_45px_rgba(15,23,42,0.06)]"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eef5ff]">
                    <Icon className="h-10 w-10 text-[#006dff]" />
                  </div>

                  <h3
                    className="mt-7 text-2xl font-black"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>

                  <div className="mx-auto mt-5 h-1 w-10 bg-[#006dff]" />

                  <p className="mx-auto mt-6 max-w-[230px] text-base font-semibold leading-7 text-[#31415f]">
                    {item.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="border-t border-slate-200 bg-[#f8fbff] px-7 pb-16 pt-10"
      >
        <div className="mx-auto max-w-[950px] text-center">
          <h2
            className="text-3xl font-black md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {copy("forAttorneys.pricingTitle", "Simple, Transparent Pricing")}
          </h2>

          <div className="mx-auto mt-3 h-1 w-12 bg-[#006dff]" />

          <div className="mt-8 grid gap-7 md:grid-cols-2">
            <PricingCard
              icon={Calendar}
              title={copy("forAttorneys.monthly", "Monthly")}
              price="$800"
              period="/mo"
              features={monthlyFeatures}
            />

            <PricingCard
              icon={DollarSign}
              title={copy("forAttorneys.yearly", "Yearly")}
              price="$8,000"
              period="/yr"
              features={yearlyFeatures}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function ProcessGraphic({
  copy,
}: {
  copy: (key: string, fallback: string) => string
}) {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[520px]">
      <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#b9d3fb]" />

      <div className="absolute left-1/2 top-1/2 flex h-[155px] w-[155px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_18px_50px_rgba(0,109,255,0.12)] ring-1 ring-[#dbe7f7]">
        <Users className="h-16 w-16 text-[#006dff]" />
      </div>

      <GraphicPoint
        className="left-0 top-0"
        icon={Search}
        text={copy("forAttorneys.visual1", "People search for legal help")}
      />
      <GraphicPoint
        className="right-0 top-0"
        icon={MapPin}
        text={copy("forAttorneys.visual2", "We connect them in your area")}
      />
      <GraphicPoint
        className="bottom-0 left-0"
        icon={Shield}
        text={copy("forAttorneys.visual3", "You get exclusive rights to that market")}
      />
      <GraphicPoint
        className="bottom-0 right-0"
        icon={TrendingUp}
        text={copy("forAttorneys.visual4", "You grow your practice")}
      />
    </div>
  )
}

function GraphicPoint({
  icon: Icon,
  text,
  className,
}: {
  icon: any
  text: string
  className?: string
}) {
  return (
    <div className={`absolute flex w-[150px] flex-col items-center text-center ${className}`}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(15,23,42,0.10)] ring-1 ring-slate-200">
        <Icon className="h-8 w-8 text-[#006dff]" />
      </div>
      <p className="mt-4 text-sm font-black leading-snug text-[#071226]">
        {text}
      </p>
    </div>
  )
}

function TrustItem({
  icon: Icon,
  text,
}: {
  icon: any
  text: string
}) {
  return (
    <div className="flex items-center justify-center gap-4 border-slate-200 py-2 md:border-r md:last:border-r-0">
      <Icon className="h-7 w-7 text-[#006dff]" />
      <p className="text-base font-black text-[#071226]">{text}</p>
    </div>
  )
}

function PricingCard({
  icon: Icon,
  title,
  price,
  period,
  features,
}: {
  icon: any
  title: string
  price: string
  period: string
  features: string[]
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-center gap-3 text-sm font-black uppercase text-[#006dff]">
        <Icon className="h-5 w-5" />
        {title}
      </div>

      <div className="mt-5 text-center">
        <p
          className="text-6xl font-black tracking-tight text-[#071226]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {price}
        </p>
        <p className="mt-1 text-lg font-black text-[#071226]">{period}</p>
      </div>

      <div className="my-8 h-px bg-slate-200" />

      <div className="space-y-5">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex gap-3 text-base font-bold leading-snug text-[#071226]"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 fill-[#071226] text-white" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}