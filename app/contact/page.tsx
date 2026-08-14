"use client"

import { useState } from "react"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
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
  const [error, setError] = useState("")

  const content = {
    en: {
      label: "CONTACT US",
      title: "Get in touch with Guzman Legal.",
      subtitle:
        "Tell us how we can help. Someone from our team will reach out to you shortly.",
      formTitle: "Tell us how we can help.",
      name: "First Name *",
      email: "Email Address *",
      phone: "Phone Number *",
      issue: "How can we help you? *",
      button: "CONTACT GUZMAN LEGAL",
      sending: "SENDING...",
      success: "Thank you. Your inquiry has been sent to Guzman Legal.",
      error: "Something went wrong. Please try again.",
      spanish: "Hablamos Español",
      tampa: "Proudly serving Tampa Bay",
    },
    es: {
      label: "CONTÁCTENOS",
      title: "Comuníquese con Guzman Legal.",
      subtitle:
        "Díganos cómo podemos ayudarle. Alguien de nuestro equipo se comunicará con usted en breve.",
      formTitle: "Díganos cómo podemos ayudarle.",
      name: "Nombre *",
      email: "Correo Electrónico *",
      phone: "Número de Teléfono *",
      issue: "¿Cómo podemos ayudarle? *",
      button: "CONTACTAR A GUZMAN LEGAL",
      sending: "ENVIANDO...",
      success: "Gracias. Su consulta ha sido enviada a Guzman Legal.",
      error: "Algo salió mal. Por favor, inténtelo de nuevo.",
      spanish: "Hablamos Español",
      tampa: "Sirviendo con orgullo a Tampa Bay",
    },
  }

  const text = isSpanish ? content.es : content.en

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact-attorney", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit inquiry")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", legalIssue: "" })
    } catch (err) {
      console.error("Contact form error:", err)
      setError(text.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      {/* Page hero */}
      <section className="bg-[#082f63] px-4 py-16 sm:px-7 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#7fb0ee]">
            {text.label}
          </p>

          <h1
            className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {text.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {text.subtitle}
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="px-4 py-16 sm:px-7 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#061a38]">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#071226]">
                  {isSpanish ? "Correo Electrónico" : "Email"}
                </h3>
                <p className="mt-1 text-slate-600">info@guzmanlegal.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#061a38]">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#071226]">
                  {isSpanish ? "Teléfono" : "Phone"}
                </h3>
                <p className="mt-1 text-slate-600">(813) 555-0000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#061a38]">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#071226]">{text.tampa}</h3>
                <p className="mt-1 text-slate-600">{text.spanish}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[18px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)] sm:p-8"
          >
            <h2
              className="mb-5 text-xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {text.formTitle}
            </h2>

            <div className="grid gap-3 lg:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={text.name}
                className="h-[54px] rounded-lg border border-slate-200 bg-white px-4 text-sm text-[#071226] outline-none transition focus:border-[#174f96]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={text.email}
                className="h-[54px] rounded-lg border border-slate-200 bg-white px-4 text-sm text-[#071226] outline-none transition focus:border-[#174f96]"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder={text.phone}
                className="h-[54px] rounded-lg border border-slate-200 bg-white px-4 text-sm text-[#071226] outline-none transition focus:border-[#174f96]"
              />

              <textarea
                name="legalIssue"
                value={formData.legalIssue}
                onChange={handleChange}
                required
                placeholder={text.issue}
                rows={3}
                className="min-h-[54px] resize-none rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm text-[#071226] outline-none transition focus:border-[#174f96] lg:row-span-2"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex h-[54px] items-center justify-center gap-3 rounded-lg bg-[#061a38] px-6 text-sm font-bold text-white transition hover:bg-[#0b2850] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? text.sending : text.button}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>
            </div>

            {submitted && (
              <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-800">
                {text.success}
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
                {error}
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  )
}
