"use client"

import { BackButton } from "@/components/back-button"
import { useLanguage } from "@/contexts/language-context"

export default function TermsPage() {
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
              {copy("terms.title", "Terms of Service")}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-7 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.06)] md:p-12">
          <div className="space-y-8 text-base font-semibold leading-8 text-[#31415f]">
            <p>
              AttorneyAbogado.com is a platform that helps connect individuals
              with independent attorneys. We are not a law firm and do not
              provide legal advice or legal representation.
            </p>

            <p>
              Using this website does not create an attorney-client relationship
              with AttorneyAbogado.com or any attorney listed on the platform.
            </p>

            <p>
              Attorneys listed on AttorneyAbogado.com are independent
              professionals and are solely responsible for their own services,
              advice, communication, and representation.
            </p>

            <p>
              We do not guarantee attorney availability, qualifications,
              responsiveness, legal outcomes, or results.
            </p>

            <p>
              Users agree to provide accurate information and not misuse the
              website or submit false, harmful, or unlawful content.
            </p>

            <p>
              Attorneys featured on AttorneyAbogado.com may participate through
              paid marketing or exclusive territory agreements. This does not
              constitute an endorsement or guarantee of legal services.
            </p>

            <p>
              By using this website, you agree that AttorneyAbogado.com is not
              liable for disputes, losses, damages, or outcomes related to your
              use of the platform or your interactions with any attorney.
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