"use client"

import {
  MapPin,
  Users,
  Shield,
  TrendingUp,
  IdCard,
  Mail,
  Phone,
  User,
  Car,
  Globe,
  HardHat,
  DollarSign,
  Ticket,
  Building2,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react"
import { BackButton } from "@/components/back-button"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/language-context"

export default function ForAttorneysPage() {
  const { t } = useLanguage()

  const benefits = [
    {
      icon: MapPin,
      title: t("forAttorneys.benefit1Title"),
      text: t("forAttorneys.benefit1Text"),
    },
    {
      icon: Users,
      title: t("forAttorneys.benefit2Title"),
      text: t("forAttorneys.benefit2Text"),
    },
    {
      icon: Shield,
      title: t("forAttorneys.benefit3Title"),
      text: t("forAttorneys.benefit3Text"),
    },
    {
      icon: TrendingUp,
      title: t("forAttorneys.benefit4Title"),
      text: t("forAttorneys.benefit4Text"),
    },
  ]

  const steps = [
    {
      icon: IdCard,
      title: t("forAttorneys.step1Title"),
      text: t("forAttorneys.step1Text"),
    },
    {
      icon: Users,
      title: t("forAttorneys.step2Title"),
      text: t("forAttorneys.step2Text"),
    },
    {
      icon: Mail,
      title: t("forAttorneys.step3Title"),
      text: t("forAttorneys.step3Text"),
    },
    {
      icon: Phone,
      title: t("forAttorneys.step4Title"),
      text: t("forAttorneys.step4Text"),
    },
  ]

  const practiceAreas = [
    { icon: User, title: t("forAttorneys.personalInjury") },
    { icon: Car, title: t("forAttorneys.carAccidents") },
    { icon: Users, title: t("practice.familyLaw") },
    { icon: Shield, title: t("practice.criminalDefense") },
    { icon: Globe, title: t("practice.immigration") },
    { icon: HardHat, title: t("forAttorneys.workersComp") },
    { icon: DollarSign, title: t("forAttorneys.bankruptcy") },
    { icon: Ticket, title: t("forAttorneys.trafficTickets") },
  ]

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      <section className="relative overflow-hidden bg-[#082f63] px-7 pb-20 pt-6 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute right-[-160px] top-[-130px] h-[520px] w-[520px] rounded-full bg-[#1d6fd1] blur-[150px]" />
          <div className="absolute left-[220px] top-[180px] h-[360px] w-[360px] rounded-full bg-[#0b4fa3] blur-[130px]" />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
          <div className="absolute right-[-40px] top-28 h-[420px] w-[760px] rounded-full border border-white/30" />
          <div className="absolute right-[-120px] top-40 h-[420px] w-[760px] rounded-full border border-white/20" />
          <div className="absolute right-[-220px] top-52 h-[420px] w-[760px] rounded-full border border-white/10" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <BackButton />
        </div>

        <div className="relative z-10">
          <SiteHeader activePage="for-attorneys" />
        </div>

        <div className="relative z-10 mx-auto mt-20 grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h1
              className="max-w-[620px] text-5xl font-black leading-tight tracking-tight md:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("forAttorneys.heroTitle1")} <br />
              {t("forAttorneys.heroTitle2")} <br />
              <span className="text-[#2f7df6]">
                {t("forAttorneys.heroTitle3")}
              </span>
            </h1>

            <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-white/90">
              {t("forAttorneys.subtitle")}
            </p>

            <a
              href="mailto:info@attorneyabogado.com"
              className="mt-8 inline-flex items-center gap-4 rounded-lg bg-white px-7 py-4 font-black text-[#071226] shadow-xl"
            >
              {t("forAttorneys.joinNetwork")}
              <ArrowRight className="h-5 w-5" />
            </a>

            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-white/90">
              <Shield className="h-5 w-5" />
              {t("forAttorneys.trusted")}
            </p>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="relative h-[360px] w-full max-w-[520px] rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />

              <div className="relative z-10 rounded-2xl bg-white p-8 text-[#071226] shadow-xl">
                <p className="text-5xl font-black text-[#0b5fc4]">“</p>
                <p className="mt-2 text-base font-semibold leading-relaxed">
                  {t("forAttorneys.quote")}
                </p>
                <p className="mt-5 text-sm font-black">
                  {t("forAttorneys.quoteBottom")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-7 py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h2 className="text-3xl font-black">
              {t("forAttorneys.whyJoin")}
            </h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#0b5fc4]" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5ff]">
                    <Icon className="h-8 w-8 text-[#0b5fc4]" />
                  </div>

                  <h3 className="mt-5 text-lg font-black">{item.title}</h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-7 pb-16">
        <div className="mx-auto max-w-[1400px] rounded-2xl bg-white p-10 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="text-center">
            <h2 className="text-3xl font-black">
              {t("forAttorneys.partnershipsTitle")}
            </h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#0b5fc4]" />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-4">
            {steps.map((item, index) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5ff]">
                    <Icon className="h-8 w-8 text-[#0b5fc4]" />
                  </div>

                  <div className="mx-auto -mt-16 mb-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#0b5fc4] text-xs font-black text-white">
                    {index + 1}
                  </div>

                  <h3 className="mt-5 text-lg font-black">{item.title}</h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-7 pb-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h2 className="text-3xl font-black">
              {t("forAttorneys.practiceAreasTitle")}
            </h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#0b5fc4]" />
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {practiceAreas.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold shadow-sm"
                >
                  <Icon className="h-6 w-6 text-[#0b5fc4]" />
                  {item.title}
                </div>
              )
            })}

            <div className="flex items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold shadow-sm lg:col-span-4">
              <MoreHorizontal className="h-6 w-6 text-[#0b5fc4]" />
              {t("forAttorneys.andMore")}
            </div>
          </div>
        </div>
      </section>

      <section className="px-7 pb-20">
        <div className="mx-auto max-w-[1400px] rounded-2xl bg-[#082f63] p-10 text-white shadow-xl">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-6">
              <div className="hidden h-20 w-20 items-center justify-center rounded-full border border-white/25 md:flex">
                <Building2 className="h-10 w-10 text-white" />
              </div>

              <div>
                <h2
                  className="text-3xl font-black"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("forAttorneys.ctaTitle")}
                </h2>

                <p className="mt-3 max-w-[650px] text-white/80">
                  {t("forAttorneys.ctaText")}
                </p>
              </div>
            </div>

            <a
              href="mailto:info@attorneyabogado.com"
              className="inline-flex items-center justify-center gap-4 rounded-lg bg-white px-8 py-4 font-black text-[#071226]"
            >
              {t("forAttorneys.joinNetwork")}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}