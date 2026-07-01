'use client'

import { useLanguage } from '@/contexts/language-context'

export function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm font-semibold text-white hover:text-white/80 transition-colors"
    >
      🌐 {t('nav.language')}
    </button>
  )
}
