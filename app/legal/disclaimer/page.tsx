"use client"

import { BackButton } from "@/components/back-button"
import { useLanguage } from "@/contexts/language-context"

export default function DisclaimerPage() {
  const { t } = useLanguage()

  const copy = (key: string, fallback: string) => {
    const translated = t(key)
    return translated === key ? fallback : translated
  }

  return (
    <main className="min-h-screen bg-white text-[#071226]">
      <section className="relative overflow-hidden bg-[#061733] px-7 pb-20 pt-6 text-white">
        <div className="relative z-10 mx-auto max-w-4xl">
          <BackButton />

          <div className="mt-12 text-center">
            <p className="text-sm font-black uppercase tracking-wide text-[#0b6fff]">
              AttorneyAbogado.com
            </p>

            <h1
              className="mt-4 text-5xl font-black"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {copy("disclaimer.title", "Disclaimer")}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-7 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.06)] md:p-12">
          <div className="space-y-8 text-base font-semibold leading-8 text-[#31415f]">
            <p>
              AttorneyAbogado.com is not a law firm and does not provide legal
              advice or legal representation. We are a platform that connects
              individuals with independent attorneys.
            </p>

            <p>
              Using this website or submitting information does not create an
              attorney-client relationship with AttorneyAbogado.com or any
              attorney listed on the platform.
            </p>

            <p>
              Attorneys featured on AttorneyAbogado.com are independent
              professionals. AttorneyAbogado.com does not guarantee their
              qualifications, availability, responsiveness, legal services, or
              the outcome of any legal matter.
            </p>

            <p>
              Please consult a licensed attorney for legal advice specific to
              your situation.
            </p>

            <p>
              Do not submit confidential or highly sensitive information through
              this website until you have spoken directly with an attorney.
            </p>

            <p>
              Questions? Contact us at{" "}
              <a
                href="mailto:info@attorneyabogado.com"
                className="font-black text-[#006dff]"
              >
                info@attorneyabogado.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}