"use client"

import { useLanguage } from "@/contexts/language-context"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#061a38] px-7 py-12 text-white">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-5">
          <div>
            <h3 className="text-xl font-bold">AttorneyAbogado.com</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {t("footer.description")}
            </p>
            <p className="mt-5 text-sm text-white/80">💬 Hablamos Español</p>
          </div>

          <div>
            <h4 className="font-bold">{t("footer.quickLinks")}</h4>
            <div className="mt-2 h-1 w-8 rounded-full bg-[#0b5fc4]" />
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <a href="/how-it-works" className="block hover:text-white">
                {t("nav.howItWorks")}
              </a>
              <a href="/get-connected" className="block hover:text-white">
                {t("nav.getConnected")}
              </a>
              <a href="/resources" className="block hover:text-white">
                {t("nav.resources")}
              </a>
              <a href="/for-attorneys" className="block hover:text-white">
                {t("nav.forAttorneys")}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold">{t("footer.practiceAreas")}</h4>
            <div className="mt-2 h-1 w-8 rounded-full bg-[#0b5fc4]" />
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>{t("practice.carAccidents")}</p>
              <p>{t("practice.criminalDefense")}</p>
              <p>{t("practice.familyLaw")}</p>
              <p>{t("practice.immigration")}</p>
              <p>{t("practice.employmentLaw")}</p>
              <p>{t("practice.businessLaw")}</p>
              <p>{t("practice.estatePlanning")}</p>
              <p>{t("practice.realEstate")}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold">{t("footer.legal")}</h4>
            <div className="mt-2 h-1 w-8 rounded-full bg-[#0b5fc4]" />
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <a href="/legal/privacy" className="block hover:text-white">
                {t("footer.privacyPolicy")}
              </a>
              <a href="/legal/terms" className="block hover:text-white">
                {t("footer.terms")}
              </a>
              <a href="/legal/disclaimer" className="block hover:text-white">
                {t("footer.disclaimer")}
              </a>
              <a href="/legal/accessibility" className="block hover:text-white">
                Accessibility
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold">{t("footer.contact")}</h4>
            <div className="mt-2 h-1 w-8 rounded-full bg-[#0b5fc4]" />
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>{t("footer.emailUs")}</p>
              <p>(800) 123-4567</p>
              <p>Facebook · Instagram · LinkedIn</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="grid gap-4 text-sm font-bold text-white/80 md:grid-cols-4">
            <div className="flex items-center justify-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#061a38]">
                ✓
              </span>
              {t("howItWorks.confidential")}
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#061a38]">
                ✓
              </span>
              {t("howItWorks.noObligation")}
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#061a38]">
                ✓
              </span>
              {t("howItWorks.spanish")}
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#061a38]">
                ✓
              </span>
              {t("footer.trustedAttorneys")}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          <p>© 2026 AttorneyAbogado.com. {t("footer.rights")}</p>

          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href="/legal/privacy" className="hover:text-white">
              {t("footer.privacyPolicy")}
            </a>
            <span>•</span>
            <a href="/legal/terms" className="hover:text-white">
              {t("footer.terms")}
            </a>
            <span>•</span>
            <a href="/legal/disclaimer" className="hover:text-white">
              {t("footer.disclaimer")}
            </a>
            <span>•</span>
            <a href="/legal/accessibility" className="hover:text-white">
              Accessibility
            </a>
          </div>

          <p className="mt-3">{t("footer.advertising")}</p>
        </div>
      </div>
    </footer>
  )
}