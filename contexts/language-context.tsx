'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'es'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language)
    }
  }, [language, mounted])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'))
  }

  const t = (key: string): string => {
    const translations = language === 'en' ? englishTranslations : spanishTranslations
    return translations[key as keyof typeof translations] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

const englishTranslations = {
  // Navigation / Header
  'nav.howItWorks': 'How It Works',
  'nav.getConnected': 'Get Connected',
  'nav.forAttorneys': 'For Attorneys',
  'nav.resources': 'Resources',
  'nav.language': 'Español',
  'header.getLegalHelp': 'Get Legal Help',
  'form.zipCode': 'ZIP Code',
  'form.zipPlaceholder': 'Enter your ZIP code',
  'form.legalIssue': 'Legal Issue',
  'form.selectLegalIssue': 'Select a legal issue',
  'form.searching': 'Searching...',
  'form.errorGeneric': 'An error occurred. Please try again later.',

  // Homepage Hero
  'hero.title': 'Find your Attorney.',
  'hero.subtitle': 'Get matched with an attorney who specializes in your legal issue and serves your area.',
  'hero.zipLabel': 'Enter your ZIP code',
  'hero.zipPlaceholder': 'ZIP Code',
  'hero.issueLabel': 'What do you need help with?',
  'hero.issuePlaceholder': 'Select a legal issue',
  'hero.findButton': 'Find My Attorney',
  'hero.notAvailable': 'We are currently expanding in your area. Please check back soon.',

  // Practice Areas
  'practice.carAccidents': 'Personal Injury',
  'practice.criminalDefense': 'Criminal Defense',
  'practice.familyLaw': 'Family Law',
  'practice.immigration': 'Immigration',
  'practice.employmentLaw': 'Employment Law',
  'practice.businessLaw': 'Business Law',
  'practice.estatePlanning': 'Estate Planning & Probate',
  'practice.realEstate': 'Real Estate Law',

  // How It Works Page
  'howItWorks.title': 'How It Works',
  'howItWorks.subtitle': 'Finding legal help is simple.',
  'howItWorks.threeSteps': 'Three Simple Steps',
  'howItWorks.step1Label': 'STEP 1',
  'howItWorks.step1Title': 'Enter Your ZIP Code',
  'howItWorks.step1': "Tell us where you're located so we can find attorneys serving your area.",
  'howItWorks.step2Label': 'STEP 2',
  'howItWorks.step2Title': 'Select Your Legal Issue',
  'howItWorks.step2': 'Choose the type of legal help you need.',
  'howItWorks.step3Label': 'STEP 3',
  'howItWorks.step3Title': 'Get Connected',
  'howItWorks.step3': 'Review your match and submit your information. The attorney will contact you directly.',
  'howItWorks.whyUse': 'Why Use AttorneyAbogado?',
  'howItWorks.localAttorneys': 'Local Attorneys',
  'howItWorks.confidential': '100% Confidential',
  'howItWorks.noObligation': 'No Obligation',
  'howItWorks.spanish': 'Hablamos Español',
  'howItWorks.faqTitle': 'Frequently Asked Questions',
  'howItWorks.faq1Question': 'How much does it cost?',
  'howItWorks.faq1Answer': 'Our service is free for users.',
  'howItWorks.faq2Question': 'Am I required to hire an attorney?',
  'howItWorks.faq2Answer': 'No. There is no obligation.',
  'howItWorks.faq3Question': 'Will my information be private?',
  'howItWorks.faq3Answer': 'Yes. Your information is kept confidential.',
  'howItWorks.faq4Question': 'Can I use the service in Spanish?',
  'howItWorks.faq4Answer': 'Yes. Hablamos Español.',
  'howItWorks.ctaTitle': 'Need Legal Help?',
  'howItWorks.ctaText': 'Start by entering your ZIP code.',
  'howItWorks.ctaButton': 'Find My Attorney',

  // Get Connected Page
  'getConnected.title': 'Get Connected',
  'getConnected.subtitle': 'Start here to find the right attorney for your legal issue.',
  'getConnected.cardTitle': 'Tell Us What You Need Help With',
  'getConnected.cardText': 'Enter your ZIP code and select your legal issue to get started.',
  'getConnected.whatHappens': 'What Happens After You Submit?',
  'getConnected.step1Title': 'We Review Your Request',
  'getConnected.step1Text': 'We use your information to identify the type of attorney that may fit your situation.',
  'getConnected.step2Title': 'You Get Connected',
  'getConnected.step2Text': 'We connect you with an attorney based on your legal issue and location.',
  'getConnected.step3Title': 'The Attorney Contacts You',
  'getConnected.step3Text': 'The attorney can discuss your situation and explain possible next steps.',
  'getConnected.freeMatching': 'Free Matching',
  'getConnected.ctaTitle': 'Ready to Get Started?',
  'getConnected.ctaText': 'Finding the right attorney starts here.',
  'getConnected.ctaButton': 'Find My Attorney',
  'getConnected.form': 'Get Started',

  // For Attorneys Page
  'forAttorneys.title': 'For Attorneys',
  'forAttorneys.heroTitle1': 'Grow Your',
  'forAttorneys.heroTitle2': 'Legal Practice.',
  'forAttorneys.heroTitle3': 'Get Discovered.',
  'forAttorneys.subtitle': 'AttorneyAbogado.com helps attorneys connect with people actively looking for legal help in their area.',
  'forAttorneys.joinNetwork': 'Join Our Attorney Network',
  'forAttorneys.trusted': 'Trusted by attorneys. Focused on results.',
  'forAttorneys.quote': 'AttorneyAbogado.com helps attorneys get discovered by people who are already searching for legal help.',
  'forAttorneys.quoteBottom': 'Built for local legal growth.',
  'forAttorneys.whyJoin': 'Why Join AttorneyAbogado?',
  'forAttorneys.benefit1Title': 'Local & Exclusive',
  'forAttorneys.benefit1Text': 'We protect your area with exclusive territories so you never compete with other attorneys on our platform.',
  'forAttorneys.benefit2Title': 'High-Quality Leads',
  'forAttorneys.benefit2Text': 'Users come to us ready to find an attorney for their legal issue. You get real opportunities, not just clicks.',
  'forAttorneys.benefit3Title': 'Pre-Screened Users',
  'forAttorneys.benefit3Text': 'We collect key information upfront so you can spend time talking to serious, qualified potential clients.',
  'forAttorneys.benefit4Title': 'Grow Your Practice',
  'forAttorneys.benefit4Text': 'More visibility. More cases. More growth. We help you build a stronger, more consistent pipeline.',
  'forAttorneys.partnershipsTitle': 'How Attorney Partnerships Work',
  'forAttorneys.step1Title': 'Create Your Profile',
  'forAttorneys.step1Text': 'Build your attorney profile and tell us the areas and types of cases you handle.',
  'forAttorneys.step2Title': 'Get Matched',
  'forAttorneys.step2Text': 'When users search by ZIP code and legal issue, your firm can be shown to users in your service area.',
  'forAttorneys.step3Title': 'Receive Leads',
  'forAttorneys.step3Text': 'You’ll receive contact information for users who need your services.',
  'forAttorneys.step4Title': 'Connect & Convert',
  'forAttorneys.step4Text': 'Contact the user directly and discuss how you can help with their situation.',
  'forAttorneys.practiceAreasTitle': 'Practice Areas We Support',
  'forAttorneys.personalInjury': 'Personal Injury',
  'forAttorneys.carAccidents': 'Car Accidents',
  'forAttorneys.workersComp': 'Workers’ Compensation',
  'forAttorneys.bankruptcy': 'Bankruptcy',
  'forAttorneys.trafficTickets': 'Traffic Tickets',
  'forAttorneys.andMore': 'And More',
  'forAttorneys.ctaTitle': 'Interested in Partnering?',
  'forAttorneys.ctaText': 'Join AttorneyAbogado.com and start connecting with more clients in your area today.',

  // Resources
  'resources.title': 'Resources',
  'resources.subtitle': 'Learn about your legal rights',

  // Matched Attorney Page
  'matched.title': 'Your Local Attorney Match',
  'matched.subtitle': "We've matched you with the attorney assigned to your area and legal issue.",
  'matched.exclusiveBadge': 'Exclusive Match',
  'matched.attorney': 'Attorney:',
  'matched.practiceArea': 'Practice Area',
  'matched.countyServed': 'County Served',
  'matched.contact': 'Contact',
  'matched.acceptingCases': 'Accepting New Cases',
  'matched.avgResponseTime': 'Average Response Time',
  'matched.withinMinutes': 'Within 15 Minutes',
  'matched.whyTrust': 'Why You Can Trust Us',
  'matched.localAttorney': 'Local Attorney',
  'matched.confidential': 'Confidential Inquiry',
  'matched.noObligation': 'No Obligation',
  'matched.freeConsultation': 'Free Consultation',
  'matched.getConnected': 'Get Connected',
  'matched.disclaimer': 'Submitting your information does not create an attorney-client relationship until confirmed by the attorney.',
  'matched.whyMatched': 'Why We Matched You',
  'matched.serves': 'Serves',
  'matched.handles': 'Handles',
  'matched.acceptingClients': 'Accepting New Clients',
  'matched.localFlorida': 'Local Florida Attorney',
  'matched.serviceArea': 'Service Area',
  'matched.serving': 'Serving',
  'matched.whatNext': 'What Happens Next?',
  'matched.submit': 'Submit Information',
  'matched.attorneyReceives': 'Attorney Receives Your Information',
  'matched.attorneyContacts': 'Attorney Contacts You',

  // Intake Form
  'intake.title': 'Tell Us About Your Legal Issue',
  'intake.subtitle': 'Your information will be sent to your matched attorney.',
  'intake.nameLabel': 'Full Name',
  'intake.namePlaceholder': 'Enter your full name',
  'intake.phoneLabel': 'Phone Number',
  'intake.phonePlaceholder': 'Enter your phone number',
  'intake.emailLabel': 'Email Address',
  'intake.emailPlaceholder': 'Enter your email',
  'intake.issueLabel': 'Tell Us About Your Legal Issue',
  'intake.issuePlaceholder': 'Tell us about your legal issue...',
  'intake.confidentiality': 'Your information is kept confidential and will only be shared with your matched attorney.',
  'intake.submitButton': 'Submit',
  'intake.error': 'Failed to submit lead',

  // Thank You Page
  'thankYou.title': 'Your Connection Has Been Confirmed',
  'thankYou.subtitle': 'The attorney has received your information and will reach out shortly.',
  'thankYou.whatNext': 'What Happens Next',
  'thankYou.step1': 'We forwarded your information to the attorney',
  'thankYou.step2': 'The attorney reviews your information',
  'thankYou.step3': 'The attorney reaches out to discuss your case',
  'thankYou.disclaimer': 'Submitting this form does not create an attorney-client relationship until confirmed by the attorney.',
  'thankYou.questions': "Questions? We're here to help.",
  'thankYou.backHome': 'Back to Home',

  // Buttons
  'button.backHome': 'Back to Home',

  // Resources
  'resources.heroLabel': 'Resources & Information',
  'resources.heroTitle': 'Helpful Legal Information You Can Trust.',
  'resources.heroSubtitle':
    'Explore articles, guides, and FAQs on common legal topics to help you understand your rights and options.',
  'resources.browseArticles': 'Browse Articles',

  'resources.knowledgeFirst': 'Knowledge First',
  'resources.knowledgeText':
    'Learn about legal topics before taking the next step.',
  'resources.legalGuides': 'Legal Guides',
  'resources.helpfulArticles': 'Helpful Articles',
  'resources.faqs': 'Frequently Asked Questions',

  'resources.exploreTopics': 'Explore Legal Topics',
  'resources.learnMore': 'Learn More',

  'resources.featuredArticles': 'Featured Articles',
  'resources.viewAllArticles': 'View All Articles',

  'resources.article1Title':
    'What To Do After a Car Accident in Florida',
  'resources.article1Text':
    'Steps to protect your rights and build a strong personal injury claim.',

  'resources.article2Title':
    'Child Custody in Florida: What You Should Know',
  'resources.article2Text':
    'Understand how custody decisions are made and what factors matter.',

  'resources.article3Title':
    '5 Common Immigration Mistakes to Avoid',
  'resources.article3Text':
    'Avoid delays and protect your case by steering clear of these errors.',

  'resources.fiveMinRead': '5 min read',
  'resources.sixMinRead': '6 min read',
  'resources.fourMinRead': '4 min read',

  'resources.popularTopics': 'Popular Topics',
  'resources.popular1': 'Car Accidents in Florida',
  'resources.popular2': 'Workers’ Compensation',
  'resources.popular3': 'DUI & Traffic Offenses',
  'resources.popular4': 'Divorce & Separation',
  'resources.popular5': 'Visas & Green Cards',
  'resources.popular6': 'Chapter 7 Bankruptcy',

  'resources.browseAllTopics': 'Browse All Topics',

  'resources.spanishInfo': 'Information in Spanish',
  'resources.spanishText':
    'Legal resources in Spanish to help you understand your rights.',
  'resources.viewSpanishResources':
    'View Spanish Resources',

  'resources.faqTitle': 'Frequently Asked Questions',

  'resources.faq1': 'When should I contact an attorney?',
  'resources.faq1Answer':
    "If you're facing a legal issue that could affect your rights, finances, family, business, or future, it's generally best to speak with an attorney as early as possible. Early legal guidance can help you understand your options, protect important deadlines, and avoid mistakes that may impact your case.",

  'resources.faq2': 'What should I bring to my first consultation?',
  'resources.faq2Answer':
    "Bring any documents or information related to your situation, such as contracts, police reports, court documents, medical records, photographs, emails, letters, or insurance information. It's also helpful to prepare a timeline of events and write down any questions you'd like to ask during your consultation.",

  'resources.faq3': 'How much does it cost to hire an attorney?',
  'resources.faq3Answer':
    "Attorney fees vary depending on the type of legal matter, the attorney's experience, and the billing structure. Some attorneys charge hourly rates, while others offer flat fees or work on a contingency basis. During your consultation, ask how fees are calculated and whether there may be additional costs associated with your case.",

  'resources.viewAllFaqs': 'View All FAQs',

  'resources.stayInformed': 'Stay Informed',
  'resources.stayInformedText':
    'Get helpful legal tips and updates delivered to your inbox.',
  'resources.emailPlaceholder': 'Enter your email',
  'resources.subscribe': 'Subscribe',
  'matched.error': 'Error',
  'matched.invalidRequest': 'Invalid request. Please start over.',
  'home.helpTitle': 'How can we help you?',
  'home.helpSubtitle': 'Choose a legal issue to get started.',

  'home.practiceCarDesc': 'Accidents, injuries and more.',
  'home.practiceFamilyDesc': 'Divorce, custody, support and more.',
  'home.practiceCriminalDesc': "Protect your rights. We're here for you.",
  'home.practiceImmigrationDesc': 'Visas, green cards, deportation and more.',
  'home.practiceEmploymentDesc': 'Workplace disputes, termination and more.',
  'home.practiceBusinessDesc': 'Contracts, LLCs, business issues and more.',
  'home.practiceEstateDesc': 'Wills, trusts, probate and estate matters.',
  'home.practiceRealEstateDesc': 'Closings, disputes, property matters and more.',

  'home.whyTitle': 'Why AttorneyAbogado?',
  'home.whySubtitle': 'We make it easier to find the right legal help when you need it most.',

  'home.whyLocalTitle': 'Local Attorneys You Can Trust',
  'home.whyLocalText': 'Connect with qualified attorneys in your area.',

  'home.whySecureTitle': 'Secure & Confidential',
  'home.whySecureText': 'Your information is protected and never shared publicly.',

  'home.whyFastTitle': 'Fast & Simple Process',
  'home.whyFastText': 'Get matched quickly and easily in just a few minutes.',

  'home.whySpanishTitle': 'Hablamos Español',
  'home.whySpanishText': "We're here to help in English and Spanish.",

  'home.resourcesTitle': 'Questions, Blog & Resources',
  'home.resourcesSubtitle': 'Helpful answers, articles, and resources to guide you.',

  'home.faqCardTitle': 'Frequently Asked Questions',
  'home.faq1': 'How do I find the right attorney?',
  'home.faq2': 'How much does it cost to hire an attorney?',
  'home.faq3': 'What information do I need to get started?',
  'home.faq4': 'Is my information confidential?',
  'home.viewAllFaqs': 'View All FAQs',

  'home.blogCardTitle': 'Latest From Our Blog',
  'home.blog1Title': 'What To Do After A Car Accident',
  'home.blog1Text': 'Learn the first steps to protect yourself.',
  'home.blog2Title': 'Questions To Ask Before Hiring An Attorney',
  'home.blog2Text': 'Understand what matters most.',
  'home.blog3Title': 'Understanding Child Custody',
  'home.blog3Text': 'A simple guide for families.',

  'home.helpfulResourcesTitle': 'Helpful Resources',
  'home.resource1': 'Personal Injury Checklist',
  'home.resource2': 'What To Expect During Your Case',
  'home.resource3': 'Legal Terms Explained',
  'home.resource4': 'Understanding Your Rights',
  'home.viewAllResources': 'View All Resources',

  'home.questionsTitle': 'Still have questions?',
  'home.questionsSubtitle': "We're here to help you find the right legal support.",
  'home.contactUs': 'Contact Us',
  'matched.email': 'Email',
  'matched.website': 'Website',
  'matched.cases': 'Cases',
  'matched.serviceAreaMap': 'Service Area Map',
  'footer.description': 'Connecting people with trusted attorneys in their area.',
  'footer.quickLinks': 'Quick Links',
  'footer.practiceAreas': 'Practice Areas',
  'footer.legal': 'Legal',
  'footer.contact': 'Contact',
  'footer.emailUs': 'Email Us',
  'footer.privacyPolicy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.disclaimer': 'Disclaimer',
  'footer.trustedAttorneys': 'Trusted Attorneys',
  'footer.rights': 'All rights reserved.',
  'footer.advertising':
    'Attorney Advertising. Prior results do not guarantee a similar outcome.',

  'matched.speaksSpanish': 'Hablamos Español',
  'matched.spanishAvailable': 'Spanish-language service available',
  'matched.loadingAttorney': 'Loading your matched attorney...',
  'matched.loadError': 'We could not load this attorney. Please try again.',
  'matched.notFound': 'The selected attorney could not be found.',
  'matched.attorneyFallback': 'Matched Attorney',

}

const spanishTranslations = {
  // Navigation / Header
  'nav.howItWorks': 'Cómo Funciona',
  'nav.getConnected': 'Conectarse',
  'nav.forAttorneys': 'Para Abogados',
  'nav.resources': 'Recursos',
  'nav.language': 'English',
  'header.getLegalHelp': 'Obtener Ayuda Legal',
  'form.zipCode': 'Código Postal',
  'form.zipPlaceholder': 'Ingrese su código postal',
  'form.legalIssue': 'Problema Legal',
  'form.selectLegalIssue': 'Seleccione un problema legal',
  'form.searching': 'Buscando...',
  'form.errorGeneric': 'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.',

  // Homepage Hero
  'hero.title': 'Encuentra tu Abogado.',
  'hero.subtitle': 'Obtén un emparejamiento con un abogado que se especializa en tu problema legal y sirve tu área.',
  'hero.zipLabel': 'Ingresa tu código postal',
  'hero.zipPlaceholder': 'Código Postal',
  'hero.issueLabel': '¿Con qué necesitas ayuda?',
  'hero.issuePlaceholder': 'Selecciona un problema legal',
  'hero.findButton': 'Encontrar Mi Abogado',
  'hero.notAvailable': 'Actualmente estamos expandiendo en tu área. Por favor, vuelve pronto.',

  // Practice Areas
  'practice.carAccidents': 'Lesiones Personales',
  'practice.criminalDefense': 'Defensa Penal',
  'practice.familyLaw': 'Derecho Familiar',
  'practice.immigration': 'Inmigración',
  'practice.employmentLaw': 'Derecho Laboral',
  'practice.businessLaw': 'Derecho Comercial',
  'practice.estatePlanning': 'Planificación Patrimonial y Sucesiones',
  'practice.realEstate': 'Derecho Inmobiliario',

  // How It Works Page
  'howItWorks.title': 'Cómo Funciona',
  'howItWorks.subtitle': 'Encontrar ayuda legal es simple.',
  'howItWorks.threeSteps': 'Tres Pasos Simples',
  'howItWorks.step1Label': 'PASO 1',
  'howItWorks.step1Title': 'Ingrese Su Código Postal',
  'howItWorks.step1': 'Díganos dónde se encuentra para que podamos encontrar abogados que atiendan su área.',
  'howItWorks.step2Label': 'PASO 2',
  'howItWorks.step2Title': 'Seleccione Su Problema Legal',
  'howItWorks.step2': 'Elija el tipo de ayuda legal que necesita.',
  'howItWorks.step3Label': 'PASO 3',
  'howItWorks.step3Title': 'Conéctese',
  'howItWorks.step3': 'Revise su abogado asignado y envíe su información. El abogado se comunicará con usted directamente.',
  'howItWorks.whyUse': '¿Por Qué Usar AttorneyAbogado?',
  'howItWorks.localAttorneys': 'Abogados Locales',
  'howItWorks.confidential': '100% Confidencial',
  'howItWorks.noObligation': 'Sin Obligación',
  'howItWorks.spanish': 'Hablamos Español',
  'howItWorks.faqTitle': 'Preguntas Frecuentes',
  'howItWorks.faq1Question': '¿Cuánto cuesta?',
  'howItWorks.faq1Answer': 'Nuestro servicio es gratis para los usuarios.',
  'howItWorks.faq2Question': '¿Estoy obligado a contratar a un abogado?',
  'howItWorks.faq2Answer': 'No. No hay obligación.',
  'howItWorks.faq3Question': '¿Mi información será privada?',
  'howItWorks.faq3Answer': 'Sí. Su información se mantiene confidencial.',
  'howItWorks.faq4Question': '¿Puedo usar el servicio en español?',
  'howItWorks.faq4Answer': 'Sí. Hablamos Español.',
  'howItWorks.ctaTitle': '¿Necesita Ayuda Legal?',
  'howItWorks.ctaText': 'Comience ingresando su código postal.',
  'howItWorks.ctaButton': 'Encontrar Mi Abogado',

  // Get Connected Page
  'getConnected.title': 'Conectarse',
  'getConnected.subtitle': 'Comience aquí para encontrar el abogado adecuado para su problema legal.',
  'getConnected.cardTitle': 'Díganos Con Qué Necesita Ayuda',
  'getConnected.cardText': 'Ingrese su código postal y seleccione su problema legal para comenzar.',
  'getConnected.whatHappens': '¿Qué Sucede Después de Enviar?',
  'getConnected.step1Title': 'Revisamos Su Solicitud',
  'getConnected.step1Text': 'Usamos su información para identificar el tipo de abogado que puede ajustarse a su situación.',
  'getConnected.step2Title': 'Usted Se Conecta',
  'getConnected.step2Text': 'Lo conectamos con un abogado según su problema legal y ubicación.',
  'getConnected.step3Title': 'El Abogado Lo Contacta',
  'getConnected.step3Text': 'El abogado puede hablar sobre su situación y explicar posibles próximos pasos.',
  'getConnected.freeMatching': 'Conexión Gratis',
  'getConnected.ctaTitle': '¿Listo Para Comenzar?',
  'getConnected.ctaText': 'Encontrar el abogado adecuado comienza aquí.',
  'getConnected.ctaButton': 'Encontrar Mi Abogado',
  'getConnected.form': 'Empezar',

  // For Attorneys Page
  'forAttorneys.title': 'Para Abogados',
  'forAttorneys.heroTitle1': 'Haga Crecer Su',
  'forAttorneys.heroTitle2': 'Práctica Legal.',
  'forAttorneys.heroTitle3': 'Sea Encontrado.',
  'forAttorneys.subtitle': 'AttorneyAbogado.com ayuda a los abogados a conectarse con personas que buscan ayuda legal activamente en su área.',
  'forAttorneys.joinNetwork': 'Únase a Nuestra Red de Abogados',
  'forAttorneys.trusted': 'Confiado por abogados. Enfocado en resultados.',
  'forAttorneys.quote': 'AttorneyAbogado.com ayuda a los abogados a ser encontrados por personas que ya están buscando ayuda legal.',
  'forAttorneys.quoteBottom': 'Creado para el crecimiento legal local.',
  'forAttorneys.whyJoin': '¿Por Qué Unirse a AttorneyAbogado?',
  'forAttorneys.benefit1Title': 'Local y Exclusivo',
  'forAttorneys.benefit1Text': 'Protegemos su área con territorios exclusivos para que no compita con otros abogados en nuestra plataforma.',
  'forAttorneys.benefit2Title': 'Clientes Potenciales de Calidad',
  'forAttorneys.benefit2Text': 'Los usuarios llegan listos para encontrar un abogado para su problema legal. Usted recibe oportunidades reales, no solo clics.',
  'forAttorneys.benefit3Title': 'Usuarios Precalificados',
  'forAttorneys.benefit3Text': 'Recopilamos información clave desde el principio para que pueda hablar con clientes potenciales serios y calificados.',
  'forAttorneys.benefit4Title': 'Haga Crecer Su Práctica',
  'forAttorneys.benefit4Text': 'Más visibilidad. Más casos. Más crecimiento. Le ayudamos a construir una fuente de clientes más fuerte y constante.',
  'forAttorneys.partnershipsTitle': 'Cómo Funcionan las Asociaciones con Abogados',
  'forAttorneys.step1Title': 'Cree Su Perfil',
  'forAttorneys.step1Text': 'Cree su perfil de abogado y díganos las áreas y tipos de casos que maneja.',
  'forAttorneys.step2Title': 'Obtenga Coincidencias',
  'forAttorneys.step2Text': 'Cuando los usuarios buscan por código postal y problema legal, su firma puede aparecer para usuarios en su área de servicio.',
  'forAttorneys.step3Title': 'Reciba Clientes Potenciales',
  'forAttorneys.step3Text': 'Recibirá la información de contacto de usuarios que necesitan sus servicios.',
  'forAttorneys.step4Title': 'Conecte y Convierta',
  'forAttorneys.step4Text': 'Contacte al usuario directamente y hable sobre cómo puede ayudar con su situación.',
  'forAttorneys.practiceAreasTitle': 'Áreas de Práctica que Apoyamos',
  'forAttorneys.personalInjury': 'Lesiones Personales',
  'forAttorneys.carAccidents': 'Accidentes de Auto',
  'forAttorneys.workersComp': 'Compensación Laboral',
  'forAttorneys.bankruptcy': 'Bancarrota',
  'forAttorneys.trafficTickets': 'Multas de Tráfico',
  'forAttorneys.andMore': 'Y Más',
  'forAttorneys.ctaTitle': '¿Interesado en Asociarse?',
  'forAttorneys.ctaText': 'Únase a AttorneyAbogado.com y comience a conectarse con más clientes en su área hoy.',

  // Resources
  'resources.title': 'Recursos',
  'resources.subtitle': 'Aprenda sobre sus derechos legales',

  // Matched Attorney Page
  'matched.title': 'Tu Emparejamiento de Abogado Local',
  'matched.subtitle': 'Te hemos emparejado con el abogado asignado a tu área y problema legal.',
  'matched.exclusiveBadge': 'Emparejamiento Exclusivo',
  'matched.attorney': 'Abogado:',
  'matched.practiceArea': 'Área de Práctica',
  'matched.countyServed': 'Condado Servido',
  'matched.contact': 'Contacto',
  'matched.acceptingCases': 'Aceptando Nuevos Casos',
  'matched.avgResponseTime': 'Tiempo Promedio de Respuesta',
  'matched.withinMinutes': 'Dentro de 15 Minutos',
  'matched.whyTrust': 'Por Qué Puedes Confiar en Nosotros',
  'matched.localAttorney': 'Abogado Local',
  'matched.confidential': 'Consulta Confidencial',
  'matched.noObligation': 'Sin Obligación',
  'matched.freeConsultation': 'Consulta Gratuita',
  'matched.getConnected': 'Conectarse',
  'matched.disclaimer': 'Enviar tu información no crea una relación abogado-cliente hasta que sea confirmada por el abogado.',
  'matched.whyMatched': 'Por Qué Te Emparejamos',
  'matched.serves': 'Sirve',
  'matched.handles': 'Maneja',
  'matched.acceptingClients': 'Aceptando Nuevos Clientes',
  'matched.localFlorida': 'Abogado Local de Florida',
  'matched.serviceArea': 'Área de Servicio',
  'matched.serving': 'Sirviendo',
  'matched.whatNext': '¿Qué Sucede Después?',
  'matched.submit': 'Enviar Información',
  'matched.attorneyReceives': 'El Abogado Recibe Tu Información',
  'matched.attorneyContacts': 'El Abogado Te Contacta',

  // Intake Form
  'intake.title': 'Cuéntanos Sobre Tu Problema Legal',
  'intake.subtitle': 'Tu información se enviará a tu abogado emparejado.',
  'intake.nameLabel': 'Nombre Completo',
  'intake.namePlaceholder': 'Ingresa tu nombre completo',
  'intake.phoneLabel': 'Número de Teléfono',
  'intake.phonePlaceholder': 'Ingresa tu número de teléfono',
  'intake.emailLabel': 'Dirección de Correo Electrónico',
  'intake.emailPlaceholder': 'Ingresa tu correo electrónico',
  'intake.issueLabel': 'Cuéntanos Sobre Tu Problema Legal',
  'intake.issuePlaceholder': 'Cuéntanos sobre tu problema legal...',
  'intake.confidentiality': 'Tu información se mantiene confidencial y solo se compartirá con tu abogado emparejado.',
  'intake.submitButton': 'Enviar',
  'intake.error': 'Error al enviar la información',

  // Thank You Page
  'thankYou.title': 'Tu Conexión Ha Sido Confirmada',
  'thankYou.subtitle': 'El abogado ha recibido tu información y se comunicará pronto.',
  'thankYou.whatNext': 'Qué Sucede Después',
  'thankYou.step1': 'Reenviamos tu información al abogado',
  'thankYou.step2': 'El abogado revisa tu información',
  'thankYou.step3': 'El abogado se comunica para discutir tu caso',
  'thankYou.disclaimer': 'Enviar este formulario no crea una relación abogado-cliente hasta que sea confirmada por el abogado.',
  'thankYou.questions': '¿Preguntas? Estamos aquí para ayudarte.',
  'thankYou.backHome': 'Volver a Inicio',

  // Buttons
  'button.backHome': 'Volver a Inicio',

  // Resources
  'resources.heroLabel': 'Recursos e Información',
  'resources.heroTitle': 'Información Legal Útil en la Que Puede Confiar.',
  'resources.heroSubtitle':
    'Explore artículos, guías y preguntas frecuentes sobre temas legales comunes para ayudarle a comprender sus derechos y opciones.',
  'resources.browseArticles': 'Explorar Artículos',

  'resources.knowledgeFirst': 'El Conocimiento es Primero',
  'resources.knowledgeText':
    'Aprenda sobre temas legales antes de dar el siguiente paso.',
  'resources.legalGuides': 'Guías Legales',
  'resources.helpfulArticles': 'Artículos Útiles',
  'resources.faqs': 'Preguntas Frecuentes',

  'resources.exploreTopics': 'Explorar Temas Legales',
  'resources.learnMore': 'Más Información',

  'resources.featuredArticles': 'Artículos Destacados',
  'resources.viewAllArticles': 'Ver Todos los Artículos',

  'resources.article1Title':
    'Qué Hacer Después de un Accidente Automovilístico en Florida',
  'resources.article1Text':
    'Pasos para proteger sus derechos y fortalecer un reclamo por lesiones personales.',

  'resources.article2Title':
    'Custodia de Hijos en Florida: Lo Que Debe Saber',
  'resources.article2Text':
    'Conozca cómo se toman las decisiones de custodia y qué factores son importantes.',

  'resources.article3Title':
    '5 Errores Comunes de Inmigración que Debe Evitar',
  'resources.article3Text':
    'Evite retrasos y proteja su caso evitando estos errores comunes.',

  'resources.fiveMinRead': '5 min de lectura',
  'resources.sixMinRead': '6 min de lectura',
  'resources.fourMinRead': '4 min de lectura',

  'resources.popularTopics': 'Temas Populares',
  'resources.popular1': 'Accidentes Automovilísticos en Florida',
  'resources.popular2': 'Compensación Laboral',
  'resources.popular3': 'DUI y Multas de Tránsito',
  'resources.popular4': 'Divorcio y Separación',
  'resources.popular5': 'Visas y Tarjetas de Residencia',
  'resources.popular6': 'Bancarrota Capítulo 7',

  'resources.browseAllTopics': 'Explorar Todos los Temas',

  'resources.spanishInfo': 'Información en Español',
  'resources.spanishText':
    'Recursos legales en español para ayudarle a comprender sus derechos.',
  'resources.viewSpanishResources':
    'Ver Recursos en Español',

  'resources.faqTitle': 'Preguntas Frecuentes',

  'resources.faq1': '¿Cuándo debo contactar a un abogado?',
  'resources.faq1Answer':
    'Si enfrenta un problema legal que pueda afectar sus derechos, sus finanzas, su familia, su negocio o su futuro, generalmente es recomendable hablar con un abogado lo antes posible. Recibir orientación legal desde el principio puede ayudarle a comprender sus opciones, proteger plazos importantes y evitar errores que puedan afectar su caso.',

  'resources.faq2': '¿Qué debo llevar a mi primera consulta?',
  'resources.faq2Answer':
    'Lleve cualquier documento o información relacionada con su situación, como contratos, informes policiales, documentos judiciales, registros médicos, fotografías, correos electrónicos, cartas o información del seguro. También es útil preparar una cronología de los hechos y escribir cualquier pregunta que desee hacer durante la consulta.',

  'resources.faq3': '¿Cuánto cuesta contratar a un abogado?',
  'resources.faq3Answer':
    'Los honorarios de un abogado varían según el tipo de asunto legal, la experiencia del abogado y la forma en que cobre sus servicios. Algunos abogados cobran por hora, otros ofrecen tarifas fijas y otros trabajan con honorarios por contingencia. Durante su consulta, pregunte cómo se calculan los honorarios y si pueden existir costos adicionales relacionados con su caso.',

  'resources.viewAllFaqs': 'Ver Todas las Preguntas',

  'resources.stayInformed': 'Manténgase Informado',
  'resources.stayInformedText':
    'Reciba consejos legales útiles y novedades directamente en su correo.',
  'resources.emailPlaceholder': 'Ingrese su correo electrónico',
  'resources.subscribe': 'Suscribirse',
  'matched.error': 'Error',
  'matched.invalidRequest': 'Solicitud inválida. Por favor, comience de nuevo.',
  'matched.email': 'Correo',
  'matched.website': 'Sitio Web',
  'matched.cases': 'Casos',
  'matched.serviceAreaMap': 'Mapa del Área de Servicio',
  'home.helpTitle': '¿Cómo podemos ayudarle?',
  'home.helpSubtitle': 'Seleccione un problema legal para comenzar.',

  'home.practiceCarDesc': 'Accidentes, lesiones y más.',
  'home.practiceFamilyDesc': 'Divorcio, custodia, manutención y más.',
  'home.practiceCriminalDesc': 'Protegemos sus derechos. Estamos aquí para ayudarle.',
  'home.practiceImmigrationDesc': 'Visas, residencia, deportación y más.',
  'home.practiceEmploymentDesc': 'Problemas laborales, despidos y más.',
  'home.practiceBusinessDesc': 'Contratos, LLC, asuntos comerciales y más.',
  'home.practiceEstateDesc': 'Testamentos, fideicomisos, sucesiones y más.',
  'home.practiceRealEstateDesc': 'Cierres, disputas y asuntos de propiedad.',

  'home.whyTitle': '¿Por qué AttorneyAbogado?',
  'home.whySubtitle': 'Facilitamos encontrar la ayuda legal adecuada cuando más la necesita.',

  'home.whyLocalTitle': 'Abogados Locales de Confianza',
  'home.whyLocalText': 'Conéctese con abogados calificados en su área.',

  'home.whySecureTitle': 'Seguro y Confidencial',
  'home.whySecureText': 'Su información está protegida y nunca se comparte públicamente.',

  'home.whyFastTitle': 'Proceso Rápido y Fácil',
  'home.whyFastText': 'Encuentre un abogado en solo unos minutos.',

  'home.whySpanishTitle': 'Hablamos Español',
  'home.whySpanishText': 'Estamos aquí para ayudarle en inglés y español.',

  'home.resourcesTitle': 'Preguntas, Blog y Recursos',
  'home.resourcesSubtitle': 'Respuestas útiles, artículos y recursos para guiarle.',

  'home.faqCardTitle': 'Preguntas Frecuentes',
  'home.faq1': '¿Cómo encuentro el abogado adecuado?',
  'home.faq2': '¿Cuánto cuesta contratar un abogado?',
  'home.faq3': '¿Qué información necesito para comenzar?',
  'home.faq4': '¿Mi información es confidencial?',
  'home.viewAllFaqs': 'Ver todas las preguntas',

  'home.blogCardTitle': 'Últimos Artículos',
  'home.blog1Title': 'Qué hacer después de un accidente automovilístico',
  'home.blog1Text': 'Aprenda los primeros pasos para protegerse.',
  'home.blog2Title': 'Preguntas antes de contratar un abogado',
  'home.blog2Text': 'Entienda lo que realmente importa.',
  'home.blog3Title': 'Entendiendo la custodia de menores',
  'home.blog3Text': 'Una guía sencilla para familias.',

  'home.helpfulResourcesTitle': 'Recursos Útiles',
  'home.resource1': 'Lista para casos de lesiones personales',
  'home.resource2': 'Qué esperar durante su caso',
  'home.resource3': 'Términos legales explicados',
  'home.resource4': 'Conozca sus derechos',
  'home.viewAllResources': 'Ver todos los recursos',

  'home.questionsTitle': '¿Todavía tiene preguntas?',
  'home.questionsSubtitle': 'Estamos aquí para ayudarle a encontrar el apoyo legal adecuado.',
  'home.contactUs': 'Contáctenos',
  'footer.description': 'Conectando personas con abogados de confianza en su área.',
  'footer.quickLinks': 'Enlaces Rápidos',
  'footer.practiceAreas': 'Áreas de Práctica',
  'footer.legal': 'Legal',
  'footer.contact': 'Contacto',
  'footer.emailUs': 'Envíanos un correo',
  'footer.privacyPolicy': 'Política de Privacidad',
  'footer.terms': 'Términos del Servicio',
  'footer.disclaimer': 'Descargo de Responsabilidad',
  'footer.trustedAttorneys': 'Abogados de Confianza',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.advertising':
    'Publicidad de abogados. Los resultados anteriores no garantizan resultados similares.',
}