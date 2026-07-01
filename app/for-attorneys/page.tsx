"use client"

import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  DollarSign,
  MapPin,
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
            className="max-w-[850px] text-5xl font-black leading-[0.95] tracking-tight md:text-7xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {copy("forAttorneys.heroTitle1", "Grow Your")}
            <br />
            {copy("forAttorneys.heroTitle2", "Legal Practice.")}
            <br />
            <span className="text-[#006dff]">
              {copy("forAttorneys.heroTitle3", "For Attorneys.")}
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

      <section className="px-7 py-12">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto h-[300px] w-full max-w-[500px]">
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2978ff] bg-white shadow-[0_0_24px_rgba(41,120,255,0.18)]">
              <Users className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-[#071226]" />
            </div>

            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300" />

            <IconBubble
              className="left-0 top-4"
              icon={Search}
              text={copy(
                "forAttorneys.visual1",
                "People search for legal help",
              )}
            />
            <IconBubble
              className="right-0 top-4"
              icon={MapPin}
              text={copy(
                "forAttorneys.visual2",
                "We connect them in your area",
              )}
            />
            <IconBubble
              className="bottom-4 left-0"
              icon={Shield}
              text={copy(
                "forAttorneys.visual3",
                "You get exclusive rights to that market",
              )}
            />
            <IconBubble
              className="bottom-4 right-0"
              icon={TrendingUp}
              text={copy("forAttorneys.visual4", "You grow your practice")}
            />
          </div>

          <div>
            <h2
              className="text-4xl font-black"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {copy("forAttorneys.whatWeDoTitle", "What We Do")}
            </h2>

            <div className="mt-3 h-1 w-9 bg-[#006dff]" />

            <h3 className="mt-5 max-w-[720px] text-2xl font-black leading-snug">
              {copy(
                "forAttorneys.whatWeDoHeadline",
                "We connect attorneys with people actively looking for legal help and give you the exclusive rights to your market.",
              )}
            </h3>

            <p className="mt-7 max-w-[760px] text-base font-semibold leading-relaxed text-[#31415f]">
              {copy(
                "forAttorneys.whatWeDoText1",
                "Our platform gives you exclusive rights to a ZIP code and practice area, so you never compete with other attorneys on our platform in your territory.",
              )}
            </p>

            <p className="mt-5 max-w-[760px] text-base font-semibold leading-relaxed text-[#31415f]">
              {copy(
                "forAttorneys.whatWeDoText2",
                "You’ll receive high-quality leads from real people in your community who need your help — so you can focus on what you do best: practicing law.",
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 px-7 py-10">
        <div className="mx-auto max-w-[1180px] text-center">
          <h2
            className="text-4xl font-black"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {copy(
              "forAttorneys.whyChooseTitle",
              "Why Attorneys Choose AttorneyAbogado",
            )}
          </h2>

          <div className="mx-auto mt-3 h-1 w-9 bg-[#006dff]" />

          <p className="mt-3 text-lg font-black text-[#071226]">
            {copy(
              "forAttorneys.whyChooseSubtitle",
              "More visibility. More qualified leads. Less competition.",
            )}
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className={`px-7 text-center ${
                    index !== 0 ? "lg:border-l lg:border-slate-200" : ""
                  }`}
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5ff]">
                    <Icon className="h-8 w-8 text-[#006dff]" />
                  </div>

                  <h3 className="mt-6 text-lg font-black">{item.title}</h3>

                  <p className="mt-4 text-sm font-semibold leading-relaxed text-[#31415f]">
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
        className="border-t border-slate-200 px-7 pb-16 pt-6"
      >
        <div className="mx-auto max-w-[850px] text-center">
          <h2
            className="text-3xl font-black"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {copy("forAttorneys.pricingTitle", "Simple, Transparent Pricing")}
          </h2>

          <div className="mx-auto mt-3 h-1 w-9 bg-[#006dff]" />

          <div className="mt-5 grid gap-7 md:grid-cols-2">
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

function IconBubble({
  icon: Icon,
  text,
  className,
}: {
  icon: any
  text: string
  className?: string
}) {
  return (
    <div
      className={`absolute flex w-[150px] flex-col items-center text-center ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(15,23,42,0.12)] ring-1 ring-slate-200">
        <Icon className="h-7 w-7 text-[#071226]" />
      </div>

      <p className="mt-3 text-xs font-black leading-tight text-[#071226]">
        {text}
      </p>
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
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-left shadow-[0_8px_30px_rgba(15,23,42,0.10)]">
      <div className="flex items-center justify-center gap-3 text-sm font-black uppercase text-[#006dff]">
        <Icon className="h-5 w-5" />
        {title}
      </div>

      <div className="mt-4 text-center">
        <p className="text-5xl font-black tracking-tight text-[#071226]">
          {price}
        </p>
        <p className="mt-1 text-sm font-black text-[#071226]">{period}</p>
      </div>

      <div className="my-6 h-px bg-slate-200" />

      <div className="space-y-4">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex gap-3 text-sm font-bold leading-snug text-[#071226]"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 fill-[#071226] text-white" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}