export const SITE_URL = 'https://clearmindfinance.com.au'
export const OG_IMAGE = `${SITE_URL}/assets/banner-wide.webp`

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "ClearMind Finance",
  "url": SITE_URL,
  "email": "hello@clearmindfinance.com.au",
  "description": "Asset finance broker helping Australians secure vehicle, equipment and personal finance with automated lender matching and fast approvals.",
  "slogan": "Educate. Navigate. Elevate.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Thornlands",
    "addressRegion": "QLD",
    "postalCode": "4164",
    "addressCountry": "AU"
  },
  "areaServed": "AU",
  "priceRange": "Free consultation"
}

export function webPageSchema(name, description, url) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    "isPartOf": { "@type": "WebSite", "name": "ClearMind Finance", "url": SITE_URL },
  }
}

const RAW_PAGES = {
  '/': {
    title: 'ClearMind Finance | Educate. Navigate. Elevate.',
    description: 'ClearMind Finance — asset finance broker using smart automation to get you approved faster. Vehicle, equipment and bad credit finance, Australia-wide.',
    jsonLd: businessSchema,
  },
  '/about': {
    title: 'About ClearMind Finance | Brisbane Asset Finance Broker',
    description: 'Meet Josh — asset finance broker with 5+ years experience helping Australians secure vehicle, equipment and business finance. Based in Brisbane, QLD.',
    jsonLd: webPageSchema(
      'About ClearMind Finance',
      'Meet Josh — asset finance broker helping Australians secure vehicle, equipment and business finance.',
      `${SITE_URL}/about`
    ),
  },
  '/apply': {
    title: 'Apply for Finance | ClearMind Finance',
    description: 'Start your finance application with ClearMind Finance. Free assessment, no obligation, no credit check to get started. Vehicle, equipment and personal finance.',
    jsonLd: webPageSchema(
      'Apply for Finance',
      'Start a finance application with ClearMind Finance — free assessment, no obligation, no credit check to get started.',
      `${SITE_URL}/apply`
    ),
  },
  '/calculator': {
    title: 'Loan Repayment Calculator | ClearMind Finance',
    description: 'Calculate your estimated monthly repayments for a car loan, equipment finance or personal loan. Free calculator from ClearMind Finance.',
    jsonLd: webPageSchema(
      'Loan Repayment Calculator',
      'Calculate estimated monthly repayments for a car loan, equipment finance or personal loan.',
      `${SITE_URL}/calculator`
    ),
  },
  '/privacy': {
    title: 'Privacy Policy | ClearMind Finance',
    description: 'ClearMind Finance privacy policy. How we collect, use and protect your personal information.',
    jsonLd: webPageSchema(
      'Privacy Policy',
      'ClearMind Finance privacy policy — how we collect, use and protect your personal information.',
      `${SITE_URL}/privacy`
    ),
  },
  '/terms': {
    title: 'Terms of Use | ClearMind Finance',
    description: 'ClearMind Finance terms of use and service conditions.',
    jsonLd: webPageSchema(
      'Terms of Use',
      'ClearMind Finance terms of use and service conditions.',
      `${SITE_URL}/terms`
    ),
  },
}

export const PAGES = Object.fromEntries(
  Object.entries(RAW_PAGES).map(([route, page]) => [
    route,
    { ...page, canonical: `${SITE_URL}${route === '/' ? '/' : route}` },
  ])
)
