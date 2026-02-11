/**
 * Housing Data
 *
 * Housing resources, VA loan info, and buy-vs-rent decision framework
 * for transitioning military members. Ported from SpouseForce (SF-K6)
 * and expanded for MTT.
 *
 * All URLs verified as of February 2026.
 */

export interface HousingResource {
  id: string
  name: string
  url: string
  category: 'va_loan' | 'bah' | 'search' | 'military_housing' | 'assistance' | 'buy_vs_rent'
  description: string
  tags: string[]
}

export interface BuyVsRentFactor {
  factor: string
  buyAdvantage: string
  rentAdvantage: string
  militaryConsideration: string
}

export interface PCSHousingChecklistItem {
  id: string
  text: string
  category: string
  timeframe: 'early' | 'mid' | 'late' | 'arrival'
}

// ─── Housing Resources ──────────────────────────────────────────────

export const housingResources: HousingResource[] = [
  // VA Loan
  {
    id: 'va-loan-eligibility',
    name: 'VA Home Loan Eligibility',
    url: 'https://www.va.gov/housing-assistance/home-loans/eligibility/',
    category: 'va_loan',
    description: 'Check your eligibility for a VA-backed home loan. Most veterans, active duty service members, and some surviving spouses are eligible. No down payment and no PMI required.',
    tags: ['va', 'eligibility', 'no-down-payment'],
  },
  {
    id: 'va-loan-coe',
    name: 'Request a Certificate of Eligibility (COE)',
    url: 'https://www.va.gov/housing-assistance/home-loans/how-to-request-coe/',
    category: 'va_loan',
    description: 'Your COE verifies to lenders that you qualify for a VA-backed loan. You can request it online through VA.gov, through your lender, or by mail.',
    tags: ['va', 'coe', 'first-step'],
  },
  {
    id: 'va-loan-types',
    name: 'VA Home Loan Types',
    url: 'https://www.va.gov/housing-assistance/home-loans/loan-types/',
    category: 'va_loan',
    description: 'Overview of VA loan types: purchase loans, Interest Rate Reduction Refinance Loan (IRRRL), cash-out refinance, and Native American Direct Loan (NADL).',
    tags: ['va', 'purchase', 'refinance'],
  },
  {
    id: 'va-loan-funding-fee',
    name: 'VA Loan Funding Fee',
    url: 'https://www.va.gov/housing-assistance/home-loans/funding-fee/',
    category: 'va_loan',
    description: 'The VA funding fee is a one-time fee that helps reduce the cost of the program for taxpayers. Veterans with service-connected disabilities may be exempt.',
    tags: ['va', 'fees', 'disability-exempt'],
  },
  {
    id: 'va-adapted-housing',
    name: 'Specially Adapted Housing (SAH) Grants',
    url: 'https://www.va.gov/housing-assistance/disability-housing-grants/',
    category: 'va_loan',
    description: 'Grants for veterans with certain service-connected disabilities to buy, build, or modify a home to meet their needs. Includes SAH, SHA, and TRA grants.',
    tags: ['va', 'disability', 'grants', 'accessibility'],
  },

  // BAH
  {
    id: 'bah-calculator',
    name: 'BAH Calculator (Official DoD)',
    url: 'https://www.defensetravel.dod.mil/site/bahCalc.cfm',
    category: 'bah',
    description: 'Official DoD Basic Allowance for Housing calculator. Look up BAH rates by ZIP code, pay grade, and dependency status for the current year.',
    tags: ['bah', 'official', 'calculator'],
  },
  {
    id: 'bah-overview',
    name: 'BAH Overview — Military OneSource',
    url: 'https://www.militaryonesource.mil/financial-legal/personal-finance/housing-costs-and-basic-allowance-for-housing/',
    category: 'bah',
    description: 'Understand how BAH works, how rates are calculated, and what factors affect your allowance. Includes information about BAH during PCS and after separation.',
    tags: ['bah', 'education', 'pcs'],
  },

  // Housing Search
  {
    id: 'ahrn',
    name: 'AHRN (Automated Housing Referral Network)',
    url: 'https://www.ahrn.com/',
    category: 'search',
    description: 'DoD-affiliated housing referral platform for military members. Search for rentals, for-sale homes, and roommates near military installations.',
    tags: ['search', 'dod', 'rentals', 'for-sale'],
  },
  {
    id: 'militarybyowner',
    name: 'MilitaryByOwner',
    url: 'https://www.militarybyowner.com/',
    category: 'search',
    description: 'Listings of homes for sale and rent near military bases, posted by military families. Good for finding housing from other military members during PCS.',
    tags: ['search', 'by-owner', 'pcs', 'military-families'],
  },
  {
    id: 'homes-for-heroes',
    name: 'Homes for Heroes',
    url: 'https://www.homesforheroes.com/',
    category: 'search',
    description: 'Connects military members with real estate agents, lenders, and other professionals who offer savings and discounts to heroes. Average savings of $3,000.',
    tags: ['search', 'discounts', 'real-estate-agents'],
  },

  // Military Housing
  {
    id: 'military-housing-privatized',
    name: 'Military Housing (Privatized) — Military OneSource',
    url: 'https://www.militaryonesource.mil/moving-pcs/plan-your-move/military-housing/',
    category: 'military_housing',
    description: 'Information about privatized military housing, how to apply, tenant rights, and what to expect. Most on-base housing is now managed by private companies.',
    tags: ['on-base', 'privatized', 'tenant-rights'],
  },

  // Assistance Programs
  {
    id: 'hud-vash',
    name: 'HUD-VASH (VA Supportive Housing)',
    url: 'https://www.va.gov/homeless/hud-vash.asp',
    category: 'assistance',
    description: 'HUD-VASH combines Housing Choice Vouchers (Section 8) with VA case management and clinical services for veterans experiencing homelessness or at risk.',
    tags: ['homeless', 'voucher', 'case-management', 'at-risk'],
  },
  {
    id: 'ssvf',
    name: 'Supportive Services for Veteran Families (SSVF)',
    url: 'https://www.va.gov/homeless/ssvf/',
    category: 'assistance',
    description: 'Grants to community organizations to provide supportive services including temporary financial assistance to prevent homelessness among veteran families.',
    tags: ['family', 'financial-assistance', 'prevention'],
  },
  {
    id: 'state-veteran-housing',
    name: 'State Veterans Benefits — Housing',
    url: 'https://www.va.gov/statedva.htm',
    category: 'assistance',
    description: 'Many states offer additional housing benefits for veterans including property tax exemptions, first-time homebuyer programs, and reduced-rate mortgages. Check your state VA office.',
    tags: ['state-specific', 'property-tax', 'first-time-buyer'],
  },
]

// ─── Buy vs Rent Framework ──────────────────────────────────────────

export const buyVsRentFactors: BuyVsRentFactor[] = [
  {
    factor: 'Time at Location',
    buyAdvantage: 'Build equity over time; mortgage payments become investment',
    rentAdvantage: 'Flexibility to leave without selling; no closing costs to recoup',
    militaryConsideration: 'If less than 3 years until next PCS, buying may not recoup closing costs. Use the "break-even" calculator — typically 3-5 years to break even on a purchase.',
  },
  {
    factor: 'Monthly Cost',
    buyAdvantage: 'VA loan: $0 down, no PMI. Mortgage may be less than rent in some markets',
    rentAdvantage: 'No maintenance costs, property taxes, or HOA fees. Predictable monthly cost',
    militaryConsideration: 'Compare BAH to total ownership costs (mortgage + taxes + insurance + maintenance), not just the mortgage payment. Rule of thumb: budget 1-2% of home value/year for maintenance.',
  },
  {
    factor: 'PCS Frequency',
    buyAdvantage: 'Can rent out the property (become a landlord) or use VA loan benefit again at next duty station',
    rentAdvantage: 'Clean break at end of lease; no property management from a distance',
    militaryConsideration: 'Being a long-distance landlord is harder than it sounds. Factor in property management fees (8-10% of rent) if you plan to keep the property after PCS.',
  },
  {
    factor: 'Local Market',
    buyAdvantage: 'In appreciating markets, you build wealth. Some military areas have strong rental demand',
    rentAdvantage: 'In declining or flat markets, renting avoids loss. Some base areas have depressed values',
    militaryConsideration: 'Research the local market near your installation. BRAC (Base Realignment and Closure) can devastate property values. Check DoD BRAC lists before buying.',
  },
  {
    factor: 'VA Loan Benefit',
    buyAdvantage: 'No down payment, no PMI, competitive rates. One of the most valuable military benefits',
    rentAdvantage: 'VA loan benefit doesn\'t expire — can save it for a better market or location',
    militaryConsideration: 'VA loan entitlement can be reused. After selling a VA-financed home, full entitlement is restored. You can also have two VA loans simultaneously if you have remaining entitlement.',
  },
  {
    factor: 'Maintenance Burden',
    buyAdvantage: 'Control your own property; make improvements that add value',
    rentAdvantage: 'Landlord handles repairs; no surprise expenses for a new roof or HVAC',
    militaryConsideration: 'If deployed or on TDY frequently, who handles emergency repairs? Have a plan — trusted neighbor, property manager, or family member.',
  },
  {
    factor: 'Financial Readiness',
    buyAdvantage: 'VA loan requires $0 down, but closing costs still apply (3-5% of purchase price)',
    rentAdvantage: 'Lower upfront costs; security deposit + first month only',
    militaryConsideration: 'Even with $0 down, ensure you have an emergency fund (3-6 months expenses) AND can cover closing costs. Seller can pay up to 4% of closing costs on VA loans.',
  },
]

// ─── PCS Housing Checklist ──────────────────────────────────────────

export const pcsHousingChecklist: PCSHousingChecklistItem[] = [
  // Early (2-3 months before)
  {
    id: 'pcs-h-1',
    text: 'Research housing options at new duty station (on-base, off-base, buy vs rent)',
    category: 'Research',
    timeframe: 'early',
  },
  {
    id: 'pcs-h-2',
    text: 'Look up BAH rates for new location using the DoD BAH calculator',
    category: 'Financial',
    timeframe: 'early',
  },
  {
    id: 'pcs-h-3',
    text: 'Check school district ratings if you have children',
    category: 'Family',
    timeframe: 'early',
  },
  {
    id: 'pcs-h-4',
    text: 'Request VA Certificate of Eligibility (COE) if planning to buy',
    category: 'VA Loan',
    timeframe: 'early',
  },
  {
    id: 'pcs-h-5',
    text: 'Get pre-approved for a VA loan if planning to buy',
    category: 'VA Loan',
    timeframe: 'early',
  },
  {
    id: 'pcs-h-6',
    text: 'Give notice to current landlord (check lease for required notice period)',
    category: 'Current Housing',
    timeframe: 'early',
  },

  // Mid (1-2 months before)
  {
    id: 'pcs-h-7',
    text: 'Schedule a house-hunting trip or virtual tour of prospective homes',
    category: 'Search',
    timeframe: 'mid',
  },
  {
    id: 'pcs-h-8',
    text: 'Apply for on-base housing if desired (waitlists can be long)',
    category: 'Military Housing',
    timeframe: 'mid',
  },
  {
    id: 'pcs-h-9',
    text: 'Document condition of current rental (photos/video for security deposit)',
    category: 'Current Housing',
    timeframe: 'mid',
  },
  {
    id: 'pcs-h-10',
    text: 'Set up mail forwarding with USPS',
    category: 'Admin',
    timeframe: 'mid',
  },
  {
    id: 'pcs-h-11',
    text: 'Research utility providers at new location and compare rates',
    category: 'Utilities',
    timeframe: 'mid',
  },

  // Late (2-4 weeks before)
  {
    id: 'pcs-h-12',
    text: 'Sign lease or close on home purchase at new location',
    category: 'Housing',
    timeframe: 'late',
  },
  {
    id: 'pcs-h-13',
    text: 'Set up utilities at new address (electric, gas, water, internet)',
    category: 'Utilities',
    timeframe: 'late',
  },
  {
    id: 'pcs-h-14',
    text: 'Schedule final walkthrough and cleaning of current residence',
    category: 'Current Housing',
    timeframe: 'late',
  },
  {
    id: 'pcs-h-15',
    text: 'Confirm renters or homeowners insurance for new property',
    category: 'Insurance',
    timeframe: 'late',
  },

  // Arrival
  {
    id: 'pcs-h-16',
    text: 'Complete move-in inspection and document existing condition (photos/video)',
    category: 'New Housing',
    timeframe: 'arrival',
  },
  {
    id: 'pcs-h-17',
    text: 'Update address with DEERS, TSP, VA, banks, and insurance',
    category: 'Admin',
    timeframe: 'arrival',
  },
  {
    id: 'pcs-h-18',
    text: 'Register vehicles and update driver license (check state deadlines)',
    category: 'Admin',
    timeframe: 'arrival',
  },
  {
    id: 'pcs-h-19',
    text: 'File travel voucher for PCS reimbursement',
    category: 'Financial',
    timeframe: 'arrival',
  },
]

// ─── Helper Functions ───────────────────────────────────────────────

export function getResourcesByCategory(
  category: HousingResource['category']
): HousingResource[] {
  return housingResources.filter((r) => r.category === category)
}

export function getChecklistByTimeframe(
  timeframe: PCSHousingChecklistItem['timeframe']
): PCSHousingChecklistItem[] {
  return pcsHousingChecklist.filter((item) => item.timeframe === timeframe)
}
