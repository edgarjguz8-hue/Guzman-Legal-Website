"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { ArrowRight } from "lucide-react"

export default function AttorneyPage() {
  const { language } = useLanguage()
  const isSpanish = language === "es"

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">

      {/* Page Hero */}
      <section className="bg-[#082f63] px-4 py-16 sm:px-7 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#7fb0ee]">
            {isSpanish ? "CONOZCA A SU ABOGADO" : "MEET YOUR ATTORNEY"}
          </p>

          <h1
            className="mt-3 text-4xl font-black leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Edgar J. Guzman
          </h1>

          <p className="mt-3 text-xl font-semibold text-[#7fb0ee]">
            ATTORNEY &nbsp; | &nbsp; ABOGADO
          </p>
        </div>
      </section>

      {/* Main Biography */}
      <section className="px-4 py-16 sm:px-7 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">

          {/* Attorney Photo */}
          <div className="overflow-hidden rounded-xl bg-slate-100">
            <Image
              src="/attorney-client-meeting.jpg"
              alt="Edgar J. Guzman, Attorney at Guzman Legal"
              width={700}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Biography */}
          <div>
            <h2
              className="text-3xl font-black text-[#071226] md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isSpanish
                ? "Edgar J. Guzman"
                : "Edgar J. Guzman"}
            </h2>

            <p className="mt-6 leading-relaxed text-slate-600">
              Attorney Edgar J. Guzman created Guzman Legal, P.A. on
              September 1, 2004 to help people solve their personal and
              professional legal struggles.
            </p>

            <p className="mt-5 leading-relaxed text-slate-600">
              In twenty years of law practice and counting, Edgar has
              represented countless individuals, corporations, non-profit
              organizations, and even a major insurance company. These
              experiences have provided him with the wisdom and broad
              understanding necessary to aggressively protect his clients'
              legal rights from wrongful and damaging acts committed against
              them.
            </p>

            <p className="mt-5 leading-relaxed text-slate-600">
              Edgar is a proud Tampa native. He graduated from Christ the King
              Catholic School, Jesuit High School, the University of South
              Florida, the University of Tampa, and Thomas M. Cooley Law
              School in Lansing, Michigan.
            </p>

            <p className="mt-5 leading-relaxed text-slate-600">
              While growing up in Tampa, Edgar played baseball and created
              unforgettable bonds with family and friends at West Tampa Little
              League.
            </p>

            <p className="mt-5 leading-relaxed text-slate-600">
              While in college, Edgar was blessed when he met his wife on a
              blind date. Edgar and his wife have also been blessed with six
              children and three dogs.
            </p>

            <p className="mt-5 leading-relaxed text-slate-600">
              Edgar is a first-generation American who personally understands
              the struggles a family can face in a new country. His father,
              Gerardo L. Guzman, came to Tampa in 1969 from Venezuela seeking
              a higher education, while his mother, Maria A. Pi, came from
              Cuba in 1961 with her widowed mother seeking new opportunities.
            </p>

            <p className="mt-5 leading-relaxed text-slate-600">
              Listening to the stories of the land left behind, observing the
              challenges his family faced, and growing up with the consistent
              principles of integrity, loyalty, honesty, hard work, and an
              unwavering faith in God all helped define Edgar.
            </p>

            <p className="mt-5 leading-relaxed font-medium text-[#071226]">
              Guzman Legal, P.A. is founded on these same beliefs and
              principles.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#061a38] px-7 py-4 font-bold text-white transition hover:bg-[#0b2850]"
            >
              {isSpanish
                ? "CONTACTAR A GUZMAN LEGAL"
                : "CONTACT GUZMAN LEGAL"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Associations */}
      <section className="bg-white px-4 py-16 sm:px-7 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 md:grid-cols-2">

            {/* Associations */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b5fc4]">
                PROFESSIONAL ASSOCIATIONS
              </p>

              <h2
                className="mt-3 text-3xl font-black text-[#071226]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Professional Memberships
              </h2>

              <div className="mt-7 space-y-4">
                <div className="border-b border-slate-200 pb-4 text-lg font-semibold">
                  The Florida Bar
                </div>

                <div className="border-b border-slate-200 pb-4 text-lg font-semibold">
                  Hillsborough County Bar Association
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b5fc4]">
                EDUCATION
              </p>

              <h2
                className="mt-3 text-3xl font-black text-[#071226]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Education
              </h2>

              <div className="mt-7 space-y-5">
                <div>
                  <p className="font-bold">
                    The University of South Florida
                  </p>
                  <p className="mt-1 text-slate-600">
                    1993 — Bachelor of Arts in Political Science
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    The University of Tampa
                  </p>
                  <p className="mt-1 text-slate-600">
                    1998 — Master of Business Administration (MBA)
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Thomas M. Cooley Law School
                  </p>
                  <p className="mt-1 text-slate-600">
                    2001 — Juris Doctor (JD)
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Published Works */}
      <section className="bg-[#f8fafc] px-4 py-16 sm:px-7 lg:py-20">
        <div className="mx-auto max-w-[1200px]">

          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b5fc4]">
            PUBLISHED WORKS
          </p>

          <h2
            className="mt-3 text-3xl font-black text-[#071226] md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Publications & Legal Writing
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-bold">
                Developments in Commercial Litigation
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Co-Author, Florida Bar, 2000–2001
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-bold">
                What to Consider Before Filing a Personal Injury Protection
                (PIP) Lawsuit
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Audible Release — Official Publication of the Pinellas County
                Chiropractic Society, 2003
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-bold">
                Las Americas Herald Newspaper
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Author of Legal News Column, 2004–2006
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-bold">
                CENTRO Tampa Newspaper
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Author of Legal News Column, 2006–2011
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-bold">
                Edgar J. Guzman Personal Blog
              </p>
              <p className="mt-2 text-sm text-slate-600">
                EdgarJGuzman.com
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-bold">
                Guzman Legal, P.A. Law Blog
              </p>
              <p className="mt-2 text-sm text-slate-600">
                GuzmanLegal.com
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#082f63] px-4 py-16 sm:px-7 text-white">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

          <div>
            <h2
              className="text-3xl font-black md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isSpanish
                ? "¿Necesita asistencia legal?"
                : "Need legal assistance?"}
            </h2>

            <p className="mt-2 text-white/80">
              {isSpanish
                ? "Comuníquese con Guzman Legal."
                : "Contact Guzman Legal to discuss your situation."}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-lg bg-white px-7 py-4 font-bold text-[#071226] transition hover:bg-slate-100"
          >
            {isSpanish ? "CONTÁCTENOS" : "CONTACT GUZMAN LEGAL"}
            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>
      </section>

    </main>
  )
}
