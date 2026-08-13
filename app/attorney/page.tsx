"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { ArrowRight, MapPin, Shield, Lock, MessageCircle } from "lucide-react"

export default function AttorneyPage() {
  const { t, language } = useLanguage()
  const isSpanish = language === "es"

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      {/* Page hero */}
      <section className="bg-[#082f63] px-7 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#7fb0ee]">
            {isSpanish ? "CONOZCA A SU ABOGADO" : "MEET YOUR ATTORNEY"}
          </p>

          <h1
            className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Edgar J. Guzman, Esq.
          </h1>

          <p className="mt-4 text-xl font-semibold text-[#7fb0ee]">
            {isSpanish ? "Más de 25 años de experiencia." : "25+ Years of Experience."}
          </p>
        </div>
      </section>

      {/* Attorney bio */}
      <section className="px-7 py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/attorney-client-meeting.jpg"
              alt="Edgar J. Guzman, Esq. of Guzman Legal"
              width={700}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <h2
              className="text-3xl font-black text-[#071226] md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isSpanish
                ? "Dedicado a defender sus derechos."
                : "Dedicated to protecting your rights."}
            </h2>

            <p className="mt-5 leading-relaxed text-slate-600">
              {isSpanish
                ? "Edgar J. Guzman ha dedicado su carrera a defender los derechos de individuos, familias y empresas en Tampa Bay."
                : "Edgar J. Guzman has dedicated his career to representing individuals, families, and businesses throughout Tampa Bay."}
            </p>

            <p className="mt-4 leading-relaxed text-slate-600">
              {isSpanish
                ? "Con experiencia, dedicación y un enfoque personalizado, Guzman Legal está aquí para ayudarle en cada paso de su caso."
                : "With experience, dedication, and a personalized approach, Guzman Legal is here to help you at every step of your case."}
            </p>

            <p className="mt-4 leading-relaxed text-slate-600">
              {isSpanish
                ? "Guzman Legal atiende con orgullo a la comunidad de Tampa Bay en inglés y español."
                : "Guzman Legal proudly serves the Tampa Bay community in both English and Spanish."}
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#061a38] px-7 py-4 font-bold text-white transition hover:bg-[#0b2850]"
            >
              {isSpanish ? "CONTACTAR A GUZMAN LEGAL" : "CONTACT GUZMAN LEGAL"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust highlights */}
      <section className="bg-white px-7 py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-[#f8fafc] p-7">
            <MapPin className="h-7 w-7 text-[#0b5fc4]" />
            <h3 className="mt-4 font-bold">{t("home.whyLocalTitle")}</h3>
            <p className="mt-2 text-slate-600">{t("home.whyLocalText")}</p>
          </div>

          <div className="rounded-xl bg-[#f8fafc] p-7">
            <Shield className="h-7 w-7 text-[#0b5fc4]" />
            <h3 className="mt-4 font-bold">{t("home.whySecureTitle")}</h3>
            <p className="mt-2 text-slate-600">{t("home.whySecureText")}</p>
          </div>

          <div className="rounded-xl bg-[#f8fafc] p-7">
            <Lock className="h-7 w-7 text-[#0b5fc4]" />
            <h3 className="mt-4 font-bold">{t("home.whyFastTitle")}</h3>
            <p className="mt-2 text-slate-600">{t("home.whyFastText")}</p>
          </div>

          <div className="rounded-xl bg-[#f8fafc] p-7">
            <MessageCircle className="h-7 w-7 text-[#0b5fc4]" />
            <h3 className="mt-4 font-bold">{t("home.whySpanishTitle")}</h3>
            <p className="mt-2 text-slate-600">{t("home.whySpanishText")}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
