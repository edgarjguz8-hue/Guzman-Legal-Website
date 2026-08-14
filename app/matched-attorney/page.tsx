'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Phone, Globe, ArrowRight } from 'lucide-react'

import { BackButton } from '@/components/back-button'
import { useLanguage } from '@/contexts/language-context'
import { tryGetSupabaseBrowserClient } from '@/lib/supabase/client'
import type { Attorney } from '@/types'

function PageShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#071226]">
      <section className="bg-[#082f63] px-7 pb-8 pt-6 text-white">
        <div className="mx-auto max-w-[1400px]">
          <BackButton />
        </div>
      </section>

      {children}
    </main>
  )
}

function MatchedAttorneyContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()

  const attorneyId = searchParams.get('attorneyId')
  const zipCode = searchParams.get('zip')
  const urlCounty = searchParams.get('county')
  const urlPracticeArea = searchParams.get('area')

  const [attorney, setAttorney] = useState<Attorney | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const copy = (key: string, fallback: string) => {
    const translated = t(key)
    return translated === key ? fallback : translated
  }

  useEffect(() => {
    let active = true

    async function fetchAttorney() {
      setLoading(true)
      setError('')

      if (!attorneyId) {
        if (active) {
          setError(
            copy(
              'matched.invalidRequest',
              'No attorney was selected.'
            )
          )
          setLoading(false)
        }

        return
      }

      const supabase = tryGetSupabaseBrowserClient()

      if (!supabase) {
        if (active) {
          setError(
            copy(
              'matched.loadError',
              'We could not load attorney details. Please try again.'
            )
          )
          setLoading(false)
        }

        return
      }

      const { data, error: attorneyError } = await supabase
        .from('attorneys')
        .select(`
          id,
          name,
          firm_name,
          category,
          county,
          phone,
          email,
          website,
          description,
          spanish_speaking,
          approved
        `)
        .eq('id', attorneyId)
        .eq('approved', true)
        .maybeSingle()

      if (!active) {
        return
      }

      if (attorneyError) {
        console.error(
          'Error loading matched attorney:',
          attorneyError
        )

        setError(
          copy(
            'matched.loadError',
            'We could not load this attorney. Please try again.'
          )
        )

        setLoading(false)
        return
      }

      if (!data) {
        setError(
          copy(
            'matched.notFound',
            'The selected attorney could not be found.'
          )
        )

        setLoading(false)
        return
      }

      setAttorney(data as Attorney)
      setLoading(false)
    }

    fetchAttorney()

    return () => {
      active = false
    }
  }, [attorneyId])

  if (loading) {
    return (
      <PageShell>
        <div className="px-7 py-20">
          <div className="mx-auto max-w-[600px] text-center">
            <p className="text-lg font-semibold text-slate-600">
              {copy(
                'matched.loadingAttorney',
                'Loading your matched attorney...'
              )}
            </p>
          </div>
        </div>
      </PageShell>
    )
  }

  if (error || !attorney) {
    return (
      <PageShell>
        <div className="px-7 py-20">
          <div className="mx-auto max-w-[600px] text-center">
            <h1 className="text-3xl font-black text-[#071226]">
              {copy(
                'matched.error',
                'Attorney Not Found'
              )}
            </h1>

            <p className="mt-4 text-slate-600">
              {error ||
                copy(
                  'matched.invalidRequest',
                  'We could not find the selected attorney.'
                )}
            </p>
          </div>
        </div>
      </PageShell>
    )
  }

  const firmName =
    attorney.firm_name ||
    attorney.name ||
    copy('matched.attorneyFallback', 'Matched Attorney')

  const attorneyName = attorney.name || ''

  const practiceArea =
    attorney.category ||
    urlPracticeArea ||
    ''

  const county =
    attorney.county ||
    urlCounty ||
    ''

  const handleGetConnected = () => {
    const params = new URLSearchParams()

    params.set('attorneyId', attorney.id)

    if (zipCode) {
      params.set('zip', zipCode)
    }

    if (county) {
      params.set('county', county)
    }

    if (practiceArea) {
      params.set('area', practiceArea)
    }

    router.push(`/intake?${params.toString()}`)
  }

  const websiteUrl = attorney.website
    ? attorney.website.startsWith('http://') ||
      attorney.website.startsWith('https://')
      ? attorney.website
      : `https://${attorney.website}`
    : null

  return (
    <PageShell>
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
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1">
                    <div className="h-2 w-2 rounded-full bg-[#0b5fc4]" />

                    <p className="text-xs font-bold uppercase text-[#0b5fc4]">
                      {t('matched.exclusiveBadge')}
                    </p>
                  </div>

                  {attorney.spanish_speaking === true && (
                    <div className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-1">
                      <span className="text-sm font-bold text-green-700">
                        ✓
                      </span>

                      <p className="text-xs font-bold uppercase text-green-700">
                        {copy(
                          'matched.speaksSpanish',
                          'Hablamos Español'
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h2 className="mb-1 text-3xl font-black text-[#071226]">
                    {firmName}
                  </h2>

                  {attorneyName && (
                    <p className="text-lg font-semibold text-slate-700">
                      {t('matched.attorney')} {attorneyName}
                    </p>
                  )}
                </div>

                {attorney.description && (
                  <div className="mb-8 border-b border-slate-100 pb-8">
                    <p className="text-base leading-relaxed text-slate-600">
                      {attorney.description}
                    </p>
                  </div>
                )}

                <div className="mb-8 space-y-4 border-b border-slate-100 pb-8">
                  {practiceArea && (
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase text-slate-500">
                        {t('matched.practiceArea')}
                      </p>

                      <p className="text-base font-semibold text-slate-700">
                        {practiceArea}
                      </p>
                    </div>
                  )}

                  {county && (
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase text-slate-500">
                        {t('matched.countyServed')}
                      </p>

                      <p className="text-base font-semibold text-slate-700">
                        {county}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-8 border-b border-slate-100 pb-8">
                  <p className="mb-4 text-xs font-bold uppercase text-slate-500">
                    {t('matched.contact')}
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {attorney.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 flex-shrink-0 text-[#0b5fc4]" />

                        <a
                          href={`tel:${attorney.phone}`}
                          className="truncate text-sm font-medium text-slate-700 hover:text-[#0b5fc4]"
                        >
                          {attorney.phone}
                        </a>
                      </div>
                    )}

                    {attorney.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 flex-shrink-0 text-[#0b5fc4]" />

                        <a
                          href={`mailto:${attorney.email}`}
                          className="truncate text-sm font-medium text-slate-700 hover:text-[#0b5fc4]"
                        >
                          {t('matched.email')}
                        </a>
                      </div>
                    )}

                    {websiteUrl && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 flex-shrink-0 text-[#0b5fc4]" />

                        <a
                          href={websiteUrl}
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
                        <span className="font-bold text-green-600">
                          ✓
                        </span>

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
                  {county && (
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 font-bold text-green-600">
                        ✓
                      </span>

                      <span className="text-sm text-slate-700">
                        {t('matched.serves')} {county}
                      </span>
                    </div>
                  )}

                  {practiceArea && (
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 font-bold text-green-600">
                        ✓
                      </span>

                      <span className="text-sm text-slate-700">
                        {t('matched.handles')} {practiceArea}{' '}
                        {t('matched.cases')}
                      </span>
                    </div>
                  )}

                  {attorney.spanish_speaking === true && (
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 font-bold text-green-600">
                        ✓
                      </span>

                      <span className="text-sm text-slate-700">
                        {copy(
                          'matched.spanishAvailable',
                          'Spanish-language service available'
                        )}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-green-600">
                      ✓
                    </span>

                    <span className="text-sm text-slate-700">
                      {t('matched.acceptingClients')}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-green-600">
                      ✓
                    </span>

                    <span className="text-sm text-slate-700">
                      {t('matched.localFlorida')}
                    </span>
                  </div>
                </div>
              </div>

              {county && (
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
              )}

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

                      <p className="text-sm font-semibold text-slate-700">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export default function MatchedAttorneyPage() {
  return (
    <Suspense
      fallback={
        <PageShell>
          <div className="px-7 py-20">
            <div className="mx-auto max-w-[600px] text-center">
              <p className="text-lg font-semibold text-slate-600">
                Loading your matched attorney...
              </p>
            </div>
          </div>
        </PageShell>
      }
    >
      <MatchedAttorneyContent />
    </Suspense>
  )
}
