# Bilingual English/Spanish Implementation Guide

## ✅ Completed

### Core Infrastructure
- **Language Context Provider** (`/contexts/language-context.tsx`)
  - Manages language state (en/es)
  - Saves language preference to localStorage
  - Provides `useLanguage()` hook for components
  - All translations hardcoded (no API calls)

- **Language Toggle Component** (`/components/language-toggle.tsx`)
  - Click to toggle between English and Spanish
  - Shows "Español" in English mode, "English" in Spanish mode
  - No page reload needed

- **Layout Wrapper** (`/app/layout.tsx`)
  - LanguageProvider wraps entire app
  - Language preference persists across page navigations

### Homepage Translations (`/app/page.tsx`)
✅ Fully translated:
- Navigation menu (How It Works, Get Connected, etc.)
- Hero title and subtitle
- ZIP code input label and placeholder
- Practice area dropdown label and placeholder
- "Find My Attorney" button
- Language toggle button

## 🔄 Translation Keys Available

All translation keys are defined in `/contexts/language-context.tsx`. To use translations in any component:

```tsx
'use client'
import { useLanguage } from '@/contexts/language-context'

export function MyComponent() {
  const { t } = useLanguage()
  return <h1>{t('hero.title')}</h1>
}
```

## 📝 How to Translate Remaining Pages

### 1. Import Language Hook
```tsx
'use client'
import { useLanguage } from '@/contexts/language-context'
```

### 2. Add Language Toggle to Navigation
Replace hardcoded "🌐 Español" link with:
```tsx
<LanguageToggle />
```

### 3. Translate Text Using t() Function
Replace hardcoded strings with translation keys:

**Before:**
```tsx
<h1>How It Works</h1>
```

**After:**
```tsx
const { t } = useLanguage()
<h1>{t('howItWorks.title')}</h1>
```

### 4. DO NOT Translate These Items
- Attorney names (e.g., "Edgar Guzman")
- Firm names (e.g., "Guzman Legal")
- Email addresses
- Phone numbers
- URLs
- Database values (except practice area labels)

### 5. DO Translate These Items
- Page titles and headings
- Button labels
- Form labels and placeholders
- Navigation links
- Instructional text
- Help text and descriptions
- Error messages
- Confirmation messages

## 📄 Pages to Translate

### Pages Already Translated
- ✅ `/app/page.tsx` (Homepage) - COMPLETE

### Pages Needing Translation
- [ ] `/app/intake/page.tsx` - Intake form
- [ ] `/app/matched-attorney/page.tsx` - Attorney profile
- [ ] `/app/thank-you/page.tsx` - Confirmation page
- [ ] `/app/how-it-works/page.tsx` - How it works page
- [ ] `/app/get-connected/page.tsx` - Get connected page
- [ ] `/app/for-attorneys/page.tsx` - For attorneys page
- [ ] `/app/resources/page.tsx` - Resources page

### Layout/Footer
- [ ] `/app/layout.tsx` - Footer text needs translation

## 🔑 Key Translation Keys

### Navigation
- `nav.howItWorks` - "How It Works"
- `nav.getConnected` - "Get Connected"
- `nav.forAttorneys` - "For Attorneys"
- `nav.resources` - "Resources"
- `nav.language` - "Español" (English) / "English" (Spanish)

### Homepage Hero
- `hero.title` - Main heading
- `hero.subtitle` - Subheading
- `hero.zipLabel` - "Enter your ZIP code"
- `hero.issueLabel` - "What do you need help with?"
- `hero.findButton` - "Find My Attorney"

### Matched Attorney
- `matched.title` - "Your Local Attorney Match"
- `matched.getConnected` - "Get Connected" button
- `matched.disclaimer` - Legal disclaimer
- *And many more* - see context file

### Intake Form
- `intake.title` - Form title
- `intake.nameLabel`, `intake.phoneLabel`, etc. - Form labels
- `intake.submitButton` - "Submit" button

### Thank You
- `thankYou.title` - "Your Connection Has Been Confirmed"
- `thankYou.whatNext` - "What Happens Next"
- `thankYou.step1`, `thankYou.step2`, etc. - Steps

## 🛠️ Quick Translation Checklist

For each page:
1. [ ] Add `'use client'` directive (if not present)
2. [ ] Import `useLanguage` from context
3. [ ] Call `const { t } = useLanguage()` in component
4. [ ] Import `LanguageToggle` component
5. [ ] Replace `<a href="#">🌐 Español</a>` with `<LanguageToggle />`
6. [ ] Replace all text strings with `t('key.name')` calls
7. [ ] Test in browser: click toggle, verify translations and localStorage persistence
8. [ ] Test on page navigation: language selection should persist

## 🧪 Testing

After translating a page:
1. Open in browser
2. Click language toggle button
3. Verify all text changes to Spanish
4. Click toggle again, verify back to English
5. Refresh page - language should persist
6. Navigate to another page - language should stay selected
7. Check localStorage: `localStorage.getItem('language')` should show 'en' or 'es'

## 📚 Additional Translation Keys

Complete list available in `/contexts/language-context.tsx`:
- Practice areas (carAccidents, familyLaw, etc.)
- Attorney profile fields
- Form fields and validation
- Success/error messages
- Step descriptions
- Trust indicators

## 🚀 Deployment Notes

- All translations are hardcoded - no performance impact
- Language preference stored in browser localStorage
- No external APIs or services required
- Works offline
- Client-side only - no server-side translation needed
- Fully compatible with all existing functionality
