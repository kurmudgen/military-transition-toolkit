/**
 * Partners / Recommended Resources Data
 *
 * Real URLs to free veteran-focused resources and services.
 * Each partner is tagged by context so the RecommendedPartners component
 * can show relevant suggestions on different pages.
 *
 * NO affiliate tracking — these are genuine, curated resources.
 */

export interface Partner {
  id: string
  name: string
  description: string
  url: string
  category: PartnerCategory
  contexts: PartnerContext[]
  badge?: string
  isFree: boolean
}

export type PartnerCategory =
  | 'career'
  | 'finance'
  | 'education'
  | 'benefits'
  | 'health'
  | 'legal'
  | 'housing'

export type PartnerContext =
  | 'career'
  | 'resume'
  | 'job_search'
  | 'budget'
  | 'debt'
  | 'savings'
  | 'tsp'
  | 'education'
  | 'va_claims'
  | 'pcs'
  | 'licensing'
  | 'home'
  | 'cost_of_living'

export const PARTNER_CATEGORIES: Record<PartnerCategory, { label: string; icon: string }> = {
  career: { label: 'Career & Employment', icon: '💼' },
  finance: { label: 'Financial Services', icon: '💰' },
  education: { label: 'Education & Training', icon: '🎓' },
  benefits: { label: 'VA & Military Benefits', icon: '🏥' },
  health: { label: 'Health & Wellness', icon: '🩺' },
  legal: { label: 'Legal Assistance', icon: '⚖️' },
  housing: { label: 'Housing & Relocation', icon: '🏠' },
}

export const PARTNERS: Partner[] = [
  // Career & Employment
  {
    id: 'hiring-our-heroes',
    name: 'Hiring Our Heroes',
    description: 'U.S. Chamber of Commerce program connecting transitioning service members with employers through fellowships and career events.',
    url: 'https://www.hiringourheroes.org',
    category: 'career',
    contexts: ['career', 'job_search', 'resume', 'home'],
    badge: '🏆',
    isFree: true,
  },
  {
    id: 'american-corporate-partners',
    name: 'American Corporate Partners',
    description: 'Free mentoring program pairing veterans with corporate professionals for career guidance and networking.',
    url: 'https://www.acp-usa.org',
    category: 'career',
    contexts: ['career', 'job_search'],
    isFree: true,
  },
  {
    id: 'vetjobs',
    name: 'VetJobs',
    description: 'Military-friendly job board with employers actively recruiting veterans. Resume posting and job alerts.',
    url: 'https://www.vetjobs.com',
    category: 'career',
    contexts: ['job_search', 'resume'],
    isFree: true,
  },
  {
    id: 'onward-to-opportunity',
    name: 'Onward to Opportunity (O2O)',
    description: 'Free career training and industry certifications for transitioning service members and spouses through Syracuse University.',
    url: 'https://ivmf.syracuse.edu/programs/career-training/',
    category: 'career',
    contexts: ['career', 'licensing', 'education'],
    badge: '🎓',
    isFree: true,
  },
  {
    id: 'skillbridge',
    name: 'DoD SkillBridge',
    description: 'Department of Defense program allowing service members to gain civilian work experience during their last 180 days of service.',
    url: 'https://skillbridge.osd.mil',
    category: 'career',
    contexts: ['career', 'job_search', 'home'],
    badge: '⭐',
    isFree: true,
  },

  // Finance
  {
    id: 'military-onesource-financial',
    name: 'Military OneSource Financial Counseling',
    description: 'Free, confidential financial counseling for service members and families. Available 24/7 by phone or in person.',
    url: 'https://www.militaryonesource.mil/financial-legal/financial-planning/',
    category: 'finance',
    contexts: ['budget', 'debt', 'savings', 'home'],
    badge: '🆓',
    isFree: true,
  },
  {
    id: 'tsp-gov',
    name: 'TSP.gov',
    description: 'Official Thrift Savings Plan website. Manage your account, review fund performance, and plan contributions.',
    url: 'https://www.tsp.gov',
    category: 'finance',
    contexts: ['tsp', 'savings'],
    isFree: true,
  },
  {
    id: 'cfpb-military',
    name: 'CFPB Office of Servicemember Affairs',
    description: 'Consumer Financial Protection Bureau resources for military families — complaint filing, financial guides, and scam alerts.',
    url: 'https://www.consumerfinance.gov/consumer-tools/military-financial-lifecycle/',
    category: 'finance',
    contexts: ['budget', 'debt', 'savings', 'home'],
    isFree: true,
  },
  {
    id: 'saveandinvest',
    name: 'SaveAndInvest.org',
    description: 'FINRA Foundation resource with free, unbiased tools and calculators for saving, investing, and military financial readiness.',
    url: 'https://www.saveandinvest.org/military',
    category: 'finance',
    contexts: ['savings', 'tsp', 'education'],
    isFree: true,
  },

  // Education
  {
    id: 'gi-bill-comparison',
    name: 'VA GI Bill Comparison Tool',
    description: 'Compare GI Bill benefits across schools. See estimated housing allowance, tuition, and school ratings.',
    url: 'https://www.va.gov/education/gi-bill-comparison-tool/',
    category: 'education',
    contexts: ['education', 'home'],
    isFree: true,
  },
  {
    id: 'cool-army',
    name: 'Army COOL (Credentialing Opportunities)',
    description: 'Find civilian credentials related to your MOS. Includes funding information for certifications and licenses.',
    url: 'https://www.cool.osd.mil/army/',
    category: 'education',
    contexts: ['licensing', 'career', 'education'],
    isFree: true,
  },
  {
    id: 'vet-tec',
    name: 'VET TEC Program',
    description: 'VA program covering tuition for high-tech training programs in computer programming, data processing, and IT.',
    url: 'https://www.va.gov/education/about-gi-bill-benefits/how-to-use-benefits/vettec-high-tech-program/',
    category: 'education',
    contexts: ['education', 'career'],
    isFree: true,
  },

  // VA & Military Benefits
  {
    id: 'va-benefits',
    name: 'VA.gov Benefits',
    description: 'Central hub for all VA benefits — disability compensation, health care, education, home loans, and more.',
    url: 'https://www.va.gov/benefits/',
    category: 'benefits',
    contexts: ['va_claims', 'home', 'education'],
    badge: '🇺🇸',
    isFree: true,
  },
  {
    id: 'ebenefits',
    name: 'eBenefits',
    description: 'Access your VA and DoD benefits online — disability claims status, letters, and benefit records.',
    url: 'https://www.ebenefits.va.gov',
    category: 'benefits',
    contexts: ['va_claims'],
    isFree: true,
  },
  {
    id: 'dav',
    name: 'Disabled American Veterans (DAV)',
    description: 'Free claims assistance from trained service officers. Help filing VA disability claims and appeals.',
    url: 'https://www.dav.org/veterans/i-need-help/',
    category: 'benefits',
    contexts: ['va_claims', 'home'],
    badge: '⭐',
    isFree: true,
  },
  {
    id: 'vfw',
    name: 'Veterans of Foreign Wars (VFW)',
    description: 'Free VA claims assistance, community support, and advocacy for veterans and their families.',
    url: 'https://www.vfw.org/assistance/va-claims-separation-benefits',
    category: 'benefits',
    contexts: ['va_claims'],
    isFree: true,
  },

  // Health & Wellness
  {
    id: 'veterans-crisis-line',
    name: 'Veterans Crisis Line',
    description: 'Free, confidential support for veterans in crisis. Call 988 (press 1), text 838255, or chat online 24/7.',
    url: 'https://www.veteranscrisisline.net',
    category: 'health',
    contexts: ['home'],
    badge: '🆘',
    isFree: true,
  },
  {
    id: 'maketheconnection',
    name: 'Make the Connection',
    description: 'VA resource for mental health support. Real veteran stories, local resources, and treatment information.',
    url: 'https://www.maketheconnection.net',
    category: 'health',
    contexts: ['home'],
    isFree: true,
  },

  // Legal
  {
    id: 'stateside-legal',
    name: 'Stateside Legal',
    description: 'Free legal assistance for military members and veterans. Find legal aid by state and issue type.',
    url: 'https://statesidelegal.org',
    category: 'legal',
    contexts: ['pcs', 'home'],
    isFree: true,
  },

  // Housing
  {
    id: 'va-home-loans',
    name: 'VA Home Loans',
    description: 'VA-backed home loans with no down payment, competitive rates, and limited closing costs for eligible veterans.',
    url: 'https://www.va.gov/housing-assistance/home-loans/',
    category: 'housing',
    contexts: ['pcs', 'cost_of_living', 'home'],
    isFree: true,
  },
  {
    id: 'military-installations',
    name: 'Military Installations',
    description: 'Find information about military installations including housing, PCS resources, and local area guides.',
    url: 'https://installations.militaryonesource.mil',
    category: 'housing',
    contexts: ['pcs', 'cost_of_living'],
    isFree: true,
  },
]

/** Get partners relevant to a specific page context */
export function getPartnersByContext(context: PartnerContext): Partner[] {
  return PARTNERS.filter((p) => p.contexts.includes(context))
}

/** Get partners by category */
export function getPartnersByCategory(category: PartnerCategory): Partner[] {
  return PARTNERS.filter((p) => p.category === category)
}
