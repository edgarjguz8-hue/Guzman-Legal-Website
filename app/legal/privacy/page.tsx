"use client"

import { BackButton } from "@/components/back-button"
import { useLanguage } from "@/contexts/language-context"

export default function PrivacyPolicyPage() {
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
              {copy("privacy.title", "Privacy Policy")}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-7 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_16px_45px_rgba(15,23,42,0.06)] md:p-12">
          <div className="space-y-8 text-base font-semibold leading-8 text-[#31415f]">
            <p>
              AttorneyAbogado.com may collect your name, email address, phone
              number, ZIP code, legal matter, and any information you
              voluntarily submit through our forms.
            </p>

            <p>
              We use this information to connect users with independent
              attorneys, respond to inquiries, improve our website, and
              communicate about requested services.
            </p>

            <p>
              We may share your information with the attorney assigned to your
              selected area or legal matter. We do not sell your personal
              information to third parties.
            </p>

            <p>
              We may use cookies or analytics tools to improve website
              performance and user experience.
            </p>

            <p>
              We take reasonable steps to protect submitted information, but no
              online system is completely secure.
            </p>

            <p>
              This website is not intended for children under 13.
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