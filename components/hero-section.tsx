"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Lock, MessageCircle, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const { language } = useLanguage()
  const isSpanish = language === "es"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    legalIssue: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const content = {
    en: {
      title: "Your Attorney.\nIn Your Corner.",
      subtitle:
        "For over 25 years, Guzman Legal has represented individuals, families, and businesses throughout Tampa Bay.",
      formTitle: "Tell us how we can help.",
      name: "First Name *",
      email: "Email Address *",
      phone: "Phone Number *",
      issue: "How can we help you? *",
      button: "CONTACT GUZMAN LEGAL",
      confidential: "25+ YEARS EXPERIENCE",
      spanish: "HABLAMOS ESPAÑOL",
      tampa: "PROUDLY SERVING TAMPA BAY",
      success:
        "Thank you. Your inquiry has been sent to Guzman Legal.",
    },
    es: {
      title: "Su Abogado.\nDe Su Lado.",
      subtitle:
        "Por más de 25 años, Guzman Legal ha representado a individuos, familias y empresas en toda el área de Tampa Bay.",
      formTitle: "Díganos cómo podemos ayudarle.",
      name: "Nombre *",
      email: "Correo Electrónico *",
      phone: "Número de Teléfono *",
      issue: "¿Cómo podemos ayudarle? *",
      button: "CONTACTAR A GUZMAN LEGAL",
      confidential: "MÁS DE 25 AÑOS DE EXPERIENCIA",
      spanish: "HABLAMOS ESPAÑOL",
      tampa: "SIRVIENDO CON ORGULLO A TAMPA BAY",
      success:
        "Gracias. Su consulta ha sido enviada a Guzman Legal.",
    },
  }

  const text = isSpanish ? content.es : content.en

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    try {
      const response = await fetch("/api/contact-attorney", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit inquiry")
      }

      setSubmitted(true)

      setFormData({
        name: "",
        email: "",
        phone: "",
        legalIssue: "",
      })
    } catch (error) {
      console.error("Contact form error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#082f63] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-120px] top-[-100px] h-[600px] w-[600px] rounded-full bg-[#174f96] opacity-30 blur-[150px]" />

        <div className="absolute right-[-80px] top-[40px] h-[600px] w-[850px] rounded-full border border-white/[0.06]" />

        <div className="absolute right-[-40px] top-[100px] h-[500px] w-[760px] rounded-full border border-white/[0.05]" />
      </div>

      {/* Attorney headshot */}
      <div className="pointer-events-none absolute right-[calc(50%-175px)] top-[-62px] z-10 hidden h-[440px] w-[350px] lg:right-[calc(2%+100px)] lg:top-[-154px] lg:block lg:h-[590px] lg:w-[470px]">
        <Image
          src="/attorney-headshot.png"
          alt="Guzman Legal attorney"
          fill
          priority
          sizes="(max-width: 1023px) 0px, 470px"
          className="object-contain object-bottom"
        />
      </div>

      {/* Dot pattern */}
      <div className="pointer-events-none absolute right-[4%] top-0 hidden grid-cols-8 gap-5 opacity-30 lg:grid">
        {Array.from({ length: 64 }).map((_, index) => (
          <span
            key={index}
            className="h-1 w-1 rounded-full bg-white"
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-8 sm:px-10 sm:pb-12 sm:pt-10 lg:px-14 lg:pb-14 lg:pt-14">

        {/* Main Hero */}
        <div className="relative lg:min-h-[590px]">

          {/* Mobile split composition; desktop remains unchanged */}
          <div className="grid grid-cols-[55%_45%] items-center gap-0 lg:contents">
          {/* Copy */}
          <div className="relative z-20 max-w-[600px] pt-4 lg:pt-8">
            <h1
              className="whitespace-pre-line text-[32px] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl md:text-7xl lg:text-[76px]"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              {text.title}
            </h1>

            <p
              className="mt-4 max-w-[510px] text-xs leading-relaxed text-white/90 sm:mt-6 sm:text-lg"
              style={{
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              {text.subtitle}
            </p>
          </div>

          {/* Mobile attorney portrait */}
          <div className="relative z-10 h-[330px] w-full max-w-none lg:hidden">
            <Image
              src="/attorney-headshot.png"
              alt="Guzman Legal attorney"
              fill
              sizes="(max-width: 639px) 300px, 360px"
              className="object-contain object-bottom"
            />
          </div>
          </div>

          {/* Inquiry Form */}
          <form
            onSubmit={handleSubmit}
            className="relative z-30 mt-2 rounded-[18px] bg-white p-4 text-[#071226] shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:mt-8 sm:p-6 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:mt-0"
          >
            <h2
              className="mb-5 text-xl font-bold"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              {text.formTitle}
            </h2>

            <div className="grid gap-3 lg:grid-cols-2">

              {/* Name */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={text.name}
                className="h-[54px] rounded-lg border border-slate-200 bg-white px-4 text-sm text-[#071226] outline-none transition focus:border-[#174f96]"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={text.email}
                className="h-[54px] rounded-lg border border-slate-200 bg-white px-4 text-sm text-[#071226] outline-none transition focus:border-[#174f96]"
              />

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder={text.phone}
                className="h-[54px] rounded-lg border border-slate-200 bg-white px-4 text-sm text-[#071226] outline-none transition focus:border-[#174f96]"
              />

              {/* Legal Issue */}
              <textarea
                name="legalIssue"
                value={formData.legalIssue}
                onChange={handleChange}
                required
                placeholder={text.issue}
                rows={3}
                className="min-h-[54px] resize-none rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm text-[#071226] outline-none transition focus:border-[#174f96] lg:row-span-2"
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-[54px] items-center justify-center gap-3 rounded-lg bg-[#061a38] px-6 text-sm font-bold text-white transition hover:bg-[#0b2850] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? isSpanish
                    ? "ENVIANDO..."
                    : "SENDING..."
                  : text.button}

                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>

            </div>

            {submitted && (
              <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-800">
                {text.success}
              </div>
            )}
          </form>
        </div>

        {/* Trust Indicators */}
        <div className="relative z-30 mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-semibold sm:gap-x-14">

          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            {text.confidential}
          </div>

          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {text.spanish}
          </div>

          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {text.tampa}
          </div>

        </div>
      </div>
    </section>
  )
}
