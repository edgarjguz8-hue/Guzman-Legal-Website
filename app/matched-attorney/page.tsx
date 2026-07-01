'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { BackButton } from '@/components/back-button'
import { SiteHeader } from '@/components/site-header'
import { useLanguage } from '@/contexts/language-context'
import { Mail, Phone, Globe, ArrowRight } from 'lucide-react'

function MatchedAttorneyContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()

  const attorneyId = searchParams.get('attorneyId')
  const firmName = searchParams.get('firmName')
  const attorneyName = searchParams.get('attorneyName')
  const practiceArea = searchParams.get('area')
  const county = searchParams.get('county')
  const phone = searchParams.get('phone')
  const email = searchParams.get('email')
  const website = searchParams.get('website')
  const bio = searchParams.get('bio')
  const zipCode = searchParams.get('zip')

  if (!attorneyId || !firmName) {
    return (
      <main className="min-h-screen bg-[#f8fafc]">
        <section className="bg-[#082f63] px-7 pt-6 text-white">
          <div className="mx-auto max-w-[1400px]">
            <BackButton />
          </div>
          <SiteHeader />
        </section>

        <div className="px-7 py-20">
          <div className="mx-auto max-w-[600px] text-center">
            <h1 className="text-3xl font-black text-[#071226]">
              {t('matched.error')}
            </h1>
            <p className="mt-4 text-slate-600">
              {t('matched.invalidRequest')}
            </p>
          </div>
        </div>
      </main>
    )
  }

  const handleGetConnected = () => {
    router.push(
      `/intake?attorneyId=${attorneyId}&zip=${zipCode}&county=${encodeURIComponent(
        county || ''
      )}&area=${encodeURIComponent(practiceArea || '')}`
    )
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      <section className="bg-[#082f63] px-7 pb-8 pt-6 text-white">
        <div className="mx-auto max-w-[1400px]">
          <BackButton />
        </div>
        <SiteHeader />
      </section>

      <div className="px-7 py-16">
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-12">
            <h1 className="mb-2 text-4xl font-black text-[#071226]">
              {t('matched.title')}
            </h1>
            <p className="text-lg text-slate-600">
              {t('matched.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
                <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-[#0b5fc4]" />
                  <p className="text-xs font-bold uppercase text-[#0b5fc4]">
                    {t('matched.exclusiveBadge')}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="mb-1 text-3xl font-black text-[#071226]">
                    {firmName}
                  </h2>
                  <p className="text-lg font-semibold text-slate-700">
                    {t('matched.attorney')} {attorneyName}
                  </p>
                </div>

                {bio && (
                  <div className="mb-8 border-b border-slate-100 pb-8">
                    <p className="text-base leading-relaxed text-slate-600">
                      {bio}
                    </p>
                  </div>
                )}

                <div className="mb-8 space-y-4 border-b border-slate-100 pb-8">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-slate-500">
                      {t('matched.practiceArea')}
                    </p>
                    <p className="text-base font-semibold text-slate-700">
                      {practiceArea}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-slate-500">
                      {t('matched.countyServed')}
                    </p>
                    <p className="text-base font-semibold text-slate-700">
                      {county}
                    </p>
                  </div>
                </div>

                <div className="mb-8 border-b border-slate-100 pb-8">
                  <p className="mb-4 text-xs font-bold uppercase text-slate-500">
                    {t('matched.contact')}
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 flex-shrink-0 text-[#0b5fc4]" />
                      <a
                        href={`tel:${phone}`}
                        className="truncate text-sm font-medium text-slate-700 hover:text-[#0b5fc4]"
                      >
                        {phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 flex-shrink-0 text-[#0b5fc4]" />
                      <a
                        href={`mailto:${email}`}
                        className="truncate text-sm font-medium text-slate-700 hover:text-[#0b5fc4]"
                      >
                        {t('matched.email')}
                      </a>
                    </div>

                    {website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 flex-shrink-0 text-[#0b5fc4]" />
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate text-sm font-medium text-slate-700 hover:text-[#0b5fc4]"
                        >
                          {t('matched.website')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8 border-b border-slate-100 pb-8">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2">
                    <p className="text-sm font-bold text-green-700">
                      ✓ {t('matched.acceptingCases')}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="mb-1 text-xs font-bold uppercase text-slate-500">
                      {t('matched.avgResponseTime')}
                    </p>
                    <p className="text-sm font-semibold text-slate-700">
                      {t('matched.withinMinutes')}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="mb-3 text-xs font-bold uppercase text-slate-500">
                    {t('matched.whyTrust')}
                  </p>

                  <div className="space-y-2">
                    {[
                      t('matched.localAttorney'),
                      t('matched.confidential'),
                      t('matched.noObligation'),
                      t('matched.freeConsultation'),
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <span className="font-bold text-green-600">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGetConnected}
                  className="mb-4 flex w-full items-center justify-center gap-3 rounded-lg bg-[#061a38] px-6 py-4 font-black text-white transition-colors hover:bg-[#082f63]"
                >
                  {t('matched.getConnected')}
                  <ArrowRight className="h-5 w-5" />
                </button>

                <p className="text-center text-xs leading-relaxed text-slate-500">
                  {t('matched.disclaimer')}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-black text-[#071226]">
                  {t('matched.whyMatched')}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-green-600">✓</span>
                    <span className="text-sm text-slate-700">
                      {t('matched.serves')} {county}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-green-600">✓</span>
                    <span className="text-sm text-slate-700">
                      {t('matched.handles')} {practiceArea} {t('matched.cases')}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-green-600">✓</span>
                    <span className="text-sm text-slate-700">
                      {t('matched.acceptingClients')}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-green-600">✓</span>
                    <span className="text-sm text-slate-700">
                      {t('matched.localFlorida')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-slate-50 p-6 shadow-sm">
                <div className="text-center">
                  <p className="mb-2 text-sm font-bold text-slate-600">
                    {t('matched.serviceArea')}
                  </p>
                  <h4 className="text-lg font-black text-[#071226]">
                    {t('matched.serving')} {county}, FL
                  </h4>
                  <div className="mt-4 flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-white">
                    <p className="text-xs text-slate-500">
                      {t('matched.serviceAreaMap')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-black text-[#071226]">
                  {t('matched.whatNext')}
                </h3>

                <div className="space-y-3">
                  {[
                    t('matched.submit'),
                    t('matched.attorneyReceives'),
                    t('matched.attorneyContacts'),
                  ].map((step, index) => (
                    <div key={step} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0b5fc4] text-xs font-bold text-white">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function MatchedAttorneyPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f8fafc]">
          <section className="bg-[#082f63] px-7 pb-8 pt-6 text-white">
            <div className="mx-auto max-w-[1400px]">
              <BackButton />
            </div>
            <SiteHeader />
          </section>

          <div className="px-7 py-20">
            <div className="mx-auto max-w-[600px] text-center">
              <p className="text-slate-600">Loading...</p>
            </div>
          </div>
        </main>
      }
    >
      <MatchedAttorneyContent />
    </Suspense>
  )
}