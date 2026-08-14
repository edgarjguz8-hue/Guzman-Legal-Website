"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#061a38] px-7 py-12 text-white">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-5">
          <div>
            <Image
              src="/guzman-logo.png"
              alt="Guzman Legal"
              width={220}
              height={55}
              className="h-auto w-[220px]"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Providing trusted legal representation to individuals, families, and businesses throughout Tampa Bay.
            </p>
            <p className="mt-5 text-sm text-white/80">Hablamos Español</p>
          </div>

          <div>
            <h4 className="font-bold">{t("footer.quickLinks")}</h4>
            <div className="mt-2 h-1 w-8 rounded-full bg-[#0b5fc4]" />
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <a href="/practice-areas" className="block hover:text-white">
                {t("nav.practiceAreas")}
              </a>
              <a href="/attorney" className="block hover:text-white">
                {t("nav.attorney")}
              </a>
              <a href="/blog" className="block hover:text-white">
                {t("nav.blog")}
              </a>
              <a href="/contact" className="block hover:text-white">
                {t("nav.contact")}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold">{t("footer.practiceAreas")}</h4>
            <div className="mt-2 h-1 w-8 rounded-full bg-[#0b5fc4]" />
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>{t("practice.carAccidents")}</p>
              <p>{t("practice.criminalDefense")}</p>
              <p>{t("practice.businessLaw")}</p>
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
              <a href="mailto:info@guzmanlegal.com" className="block hover:text-white">
                {t("footer.emailUs")} → info@guzmanlegal.com
              </a>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <a
                  href="https://www.facebook.com/GuzmanLawGroup/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/guzmanlegal/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href="https://x.com/YourLegalVoice"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          <p>© 2026 Guzman Legal. {t("footer.rights")}</p>

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
