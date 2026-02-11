/**
 * Predatory Lending Data
 *
 * Critical financial protection content for military members,
 * especially junior enlisted. Covers common predatory lending
 * practices found near military installations.
 * Ported from Military Money Coaching (MMC-K10) and expanded for MTT.
 */

export interface PredatoryLendingType {
  id: string
  name: string
  description: string
  typicalAPR: string
  howItWorks: string
  redFlags: string[]
  alternatives: string[]
  militaryProtections: string[]
  realWorldExample: string
}

export interface MilitaryProtection {
  name: string
  description: string
  keyProvisions: string[]
  url: string
}

// ─── Predatory Lending Types ────────────────────────────────────────

export const predatoryLendingTypes: PredatoryLendingType[] = [
  {
    id: 'payday-loans',
    name: 'Payday Loans',
    description: 'Short-term, high-interest loans typically due on your next payday. Lenders target military members because of guaranteed income. Often located near base gates.',
    typicalAPR: '300–500%',
    howItWorks: 'You write a postdated check or authorize an electronic debit for the loan amount plus a fee ($15–$30 per $100 borrowed). On your next payday, the lender cashes the check. Most borrowers can\'t pay in full and "roll over" the loan, paying another fee for an extension. The average payday borrower pays $520 in fees to borrow $375.',
    redFlags: [
      '"No credit check required"',
      '"Cash in 15 minutes" or "instant approval"',
      'Located within 1 mile of a military base gate',
      'Asks for your LES (Leave and Earnings Statement) as proof of income',
      'Loan term is 14 days or less',
      'Fee expressed as flat dollar amount instead of APR',
    ],
    alternatives: [
      'Military relief societies (Army Emergency Relief, Navy-Marine Corps Relief Society, Air Force Aid Society, Coast Guard Mutual Assistance)',
      'Military OneSource financial counseling (free, confidential)',
      'Credit union Payday Alternative Loans (PALs) — max 28% APR by law',
      'Negotiate a payment plan directly with the creditor',
      'Command financial specialist assistance',
    ],
    militaryProtections: [
      'Military Lending Act caps APR at 36% for all covered borrowers (active duty + dependents)',
      'Lenders cannot require allotments as a condition of the loan',
      'Lenders cannot use a check or access to a bank account as security',
      'Cannot require arbitration or waiver of SCRA protections',
    ],
    realWorldExample: 'An E-3 borrows $500 at a payday lender near base, paying a $75 fee for a 2-week loan. Unable to repay in full, they roll it over 8 times over 4 months, paying $600 in fees on a $500 loan. Total repaid: $1,100. Effective APR: 391%.',
  },
  {
    id: 'title-loans',
    name: 'Title Loans',
    description: 'Loans secured by your vehicle title. If you can\'t repay, the lender repossesses your car — even if you owe less than the car is worth. Losing your vehicle can jeopardize your ability to get to base and do your job.',
    typicalAPR: '100–300%',
    howItWorks: 'You hand over your vehicle title as collateral and receive a loan (typically 25-50% of the car\'s value). Loan terms are usually 30 days. If you can\'t repay, you roll over (paying more fees) or lose your vehicle. One in five title loan borrowers has their car repossessed.',
    redFlags: [
      '"Get cash for your car title" advertising near bases',
      'Loan amount is much less than your car\'s value',
      'Must hand over physical vehicle title',
      'Single-payment loan (no installment plan)',
      'Lender installs GPS tracker on your vehicle',
    ],
    alternatives: [
      'Credit union auto loans (typically 3–7% APR)',
      'Negotiate with your current lender for a payment plan',
      'Military relief society interest-free loans',
      'Sell the vehicle privately if you need cash (get full market value)',
    ],
    militaryProtections: [
      'Military Lending Act 36% APR cap applies to title loans',
      'SCRA (Servicemembers Civil Relief Act) caps interest at 6% on pre-service debts',
      'Lenders cannot repossess property without a court order for active duty members under SCRA',
    ],
    realWorldExample: 'An E-4 takes a $2,000 title loan on a truck worth $8,000, paying $500/month in interest alone. After 3 months, they\'ve paid $1,500 in interest and still owe the full $2,000. They miss a payment and lose their truck — a vehicle worth 4x the loan.',
  },
  {
    id: 'pawn-shops',
    name: 'Pawn Shops',
    description: 'You leave a personal item as collateral for a small loan. If you don\'t repay, you lose the item. Common near military bases targeting service members selling gear, electronics, and jewelry.',
    typicalAPR: '100–300%',
    howItWorks: 'You bring in an item (electronics, jewelry, tools, etc.) and receive a loan for a fraction of its value (typically 25-60%). You have 30-90 days to repay the loan plus fees. If you don\'t repay, the pawn shop keeps and sells your item. Some military members pawn items repeatedly, paying more in fees than the item is worth.',
    redFlags: [
      'Offering far less than item is worth',
      'Multiple pawn shops clustered near base gates',
      'High monthly storage/service fees on top of interest',
      'Pressure to pawn items with sentimental value',
    ],
    alternatives: [
      'Sell items directly on marketplace apps (Facebook Marketplace, OfferUp) for full value',
      'Military relief society emergency loans (interest-free)',
      'Base chaplain assistance funds',
      'Community food banks and assistance programs to reduce expenses',
    ],
    militaryProtections: [
      'Military Lending Act 36% APR cap applies',
      'Some states have additional pawn shop regulations',
    ],
    realWorldExample: 'An E-2 pawns a $600 gaming console for $150. Monthly fees are $30. After paying $90 in fees over 3 months without being able to repay the $150, they lose the console. Total loss: $690 (console value) + $90 (fees paid) = $780.',
  },
  {
    id: 'rent-to-own',
    name: 'Rent-to-Own (Furniture, Electronics, Appliances)',
    description: 'Stores that let you "rent" items with an option to own them after making all payments. The total paid is typically 2-3x the retail price. Very common near military bases.',
    typicalAPR: '100–300% (effective rate)',
    howItWorks: 'You select furniture, electronics, or appliances and make weekly or monthly payments. No credit check required. If you miss a payment, the store repossesses the item regardless of how much you\'ve already paid. A $500 TV can end up costing $1,500+ over the rental period.',
    redFlags: [
      '"No credit needed" advertising targeting E-1 to E-4',
      'Weekly payment amounts that seem small but add up',
      'Products available at major retailers for much less',
      'Delivery and "setup fees" added on top',
      'Early buyout price is still above retail',
    ],
    alternatives: [
      'Buy used on Facebook Marketplace, OfferUp, or base yard sales',
      'NEXCOM/AAFES/Exchange layaway programs (no interest)',
      'Save up and buy at retail (even one month of rent-to-own payments could cover a used item)',
      'Credit union personal loans (much lower rates)',
      'Furnishings available through military family services during PCS',
    ],
    militaryProtections: [
      'Military Lending Act may apply depending on contract structure',
      'SCRA protections may apply to rental agreements for deployed members',
    ],
    realWorldExample: 'An E-3 rents a $1,200 living room set at $25/week. Over the 78-week rental period, they pay $1,950 — 63% more than buying outright. If they miss one payment at week 70, the store can repossess everything.',
  },
  {
    id: 'military-car-dealers',
    name: '"E-1 and Above" Car Dealerships',
    description: 'Dealerships near military bases that specifically target junior enlisted with "guaranteed approval" and "military discounts" but charge extremely high interest rates and sell overpriced vehicles.',
    typicalAPR: '18–29% (often higher with add-ons)',
    howItWorks: 'The dealer advertises "military specials" and "E-1 and above approved." Young service members with limited credit history are steered toward overpriced used vehicles with high interest rates, extended warranties, gap insurance, and other add-ons that inflate the total cost. Monthly payments are set to match military pay schedules.',
    redFlags: [
      '"E-1 and above" or "military special" advertising',
      'Located on the main road leading to base',
      'Focus on monthly payment, not total price or interest rate',
      '"Buy here, pay here" signage',
      'Required add-ons like extended warranties or paint protection',
      'Vehicle price significantly above KBB/NADA value',
      'Pressure to decide same-day ("this deal is only good today")',
    ],
    alternatives: [
      'Get pre-approved at a credit union BEFORE shopping (USAA, Navy Federal, PenFed)',
      'Check KBB or NADA value before negotiating',
      'Buy from private sellers (often better prices)',
      'Consider a reliable used car ($5K-$10K) instead of a new car',
      'Use base legal assistance office to review contracts before signing',
    ],
    militaryProtections: [
      'Military Lending Act 36% APR cap on consumer credit',
      'DoD publishes off-limits lists of businesses that exploit service members',
      'Base legal assistance can review auto contracts for free',
      'Lemon law protections vary by state',
    ],
    realWorldExample: 'An E-2 making $2,000/month buys a $25,000 used car at 24% APR for 72 months. Monthly payment: $580 (29% of gross pay). Total paid over 6 years: $41,760 — paying $16,760 in interest alone on a car that\'s worth $5,000 by payoff.',
  },
  {
    id: 'buy-here-pay-here',
    name: 'Buy-Here-Pay-Here Auto Lots',
    description: 'Dealers that both sell and finance vehicles in-house. They profit from both the inflated vehicle price AND the high interest rate. If you miss a payment, they repossess and resell the same car.',
    typicalAPR: '20–30% (plus inflated vehicle price)',
    howItWorks: 'The dealer is also the lender, so there\'s no independent bank evaluating whether the deal is fair. Vehicles are typically priced 30-50% above market value. Interest rates are high. Payments are often required weekly or biweekly to match military pay. GPS trackers are installed for repossession. Some lots have repossessed and resold the same vehicle multiple times.',
    redFlags: [
      '"We finance everyone" or "your job is your credit"',
      'Required weekly or biweekly payments (matching military pay schedule)',
      'GPS tracker installed on the vehicle',
      'No independent lender involved',
      'Cash-only or money order payments (avoiding paper trails)',
      'Vehicle not inspected by independent mechanic',
    ],
    alternatives: [
      'Credit union auto loans with pre-approval',
      'Certified pre-owned vehicles from franchise dealers',
      'Base Auto Skills Center (some bases help with inspections)',
      'Carpool or use base shuttle while saving for a better deal',
    ],
    militaryProtections: [
      'Military Lending Act 36% APR cap',
      'Some states regulate buy-here-pay-here dealers separately',
      'Service members can use base legal to review ANY contract before signing',
    ],
    realWorldExample: 'A buy-here-pay-here lot sells a car with 150K miles for $8,000 (KBB value: $4,500) at 25% APR. The engine fails at month 4. The buyer still owes $7,200 on a now-worthless car. The lot repossesses, "fixes" it, and resells it to the next service member.',
  },
  {
    id: 'military-lending-scams',
    name: 'Military-Targeted Online Lending Scams',
    description: 'Online lenders or scammers who specifically target military email addresses (.mil) or use military-sounding names to appear trustworthy. May be outright fraud or legal-but-predatory operations.',
    typicalAPR: '50–700% (or outright theft)',
    howItWorks: 'Scammers contact service members via email, social media, or ads on military-themed websites. They may impersonate known lenders, offer "military-only" rates, or promise debt consolidation. Some collect fees upfront and never deliver the loan. Others deliver loans at astronomical rates. Some harvest banking information for identity theft.',
    redFlags: [
      'Unsolicited loan offers via email or social media',
      'Requires upfront fees before receiving the loan',
      'Uses a military-sounding name but isn\'t affiliated with DoD',
      'Requests your CAC number, military ID, or LES via email',
      'Pressure to act immediately ("limited time military offer")',
      'No physical address or uses a P.O. box only',
      'Not registered in your state',
    ],
    alternatives: [
      'Only borrow from established credit unions or banks',
      'Verify lender licensing at your state\'s financial regulator website',
      'Military OneSource financial counseling (free, confidential)',
      'Report scams to the FTC and your chain of command',
    ],
    militaryProtections: [
      'Military Lending Act applies to all consumer credit for covered borrowers',
      'FTC actively prosecutes military-targeted scams',
      'Report to your installation\'s Armed Forces Disciplinary Control Board',
    ],
    realWorldExample: 'An E-4 receives an email offering a "military appreciation" debt consolidation loan at 8% APR. They pay a $200 "processing fee" upfront. The loan never materializes. The scammer has their bank account number, SSN, and military ID — leading to months of identity theft recovery.',
  },
  {
    id: 'advance-fee-scams',
    name: 'Advance Fee / Guaranteed Loan Scams',
    description: 'Scammers promise guaranteed loan approval regardless of credit history, but require an upfront fee. The loan never arrives. Military members are targeted because of their steady income and perceived trustworthiness.',
    typicalAPR: 'N/A (complete loss)',
    howItWorks: 'The scammer advertises "guaranteed" loans or claims they can fix bad credit. They request an upfront "processing fee," "insurance deposit," or "first payment" via wire transfer, gift cards, or cryptocurrency. Once paid, they either disappear entirely or continue requesting additional fees. No legitimate lender requires fees before disbursing a loan.',
    redFlags: [
      'Guaranteed approval regardless of credit',
      'Upfront fees before receiving any funds',
      'Payment requested via gift cards, wire transfer, or crypto',
      'Pressure to pay immediately or lose the "deal"',
      'Communication only via text or encrypted messaging',
    ],
    alternatives: [
      'Apply at your credit union in person',
      'If denied, ask about secured credit cards to build credit',
      'Free credit counseling through Military OneSource',
      'Never pay fees before receiving a loan',
    ],
    militaryProtections: [
      'FTC Act makes advance fee scams illegal',
      'Report to FTC at ReportFraud.ftc.gov',
      'Report to your installation inspector general',
    ],
    realWorldExample: 'An E-3 with thin credit finds a "military lending program" on social media. They pay a $350 "origination fee" via Zelle for a promised $5,000 personal loan. The scammer asks for another $200 for "insurance." The service member pays again. No loan ever arrives. Total loss: $550.',
  },
]

// ─── Military Lending Act (MLA) ─────────────────────────────────────

export const militaryLendingAct: MilitaryProtection = {
  name: 'Military Lending Act (MLA)',
  description: 'Federal law that protects active duty service members and their dependents from predatory lending practices. Implemented by the Department of Defense under 10 U.S.C. § 987.',
  keyProvisions: [
    '36% Military Annual Percentage Rate (MAPR) cap on most consumer credit products',
    'Covers payday loans, vehicle title loans, refund anticipation loans, deposit advance loans, installment loans, unsecured open-end lines of credit, and credit cards',
    'Prohibits mandatory military allotments as a condition of credit',
    'Prohibits requiring a check or access to a bank account for the credit (except reasonable payment processing)',
    'Prohibits mandatory arbitration clauses',
    'Prohibits penalties for early payoff',
    'Prohibits rolling over or refinancing to extend the loan',
    'Covered borrowers: active duty members of the Army, Navy, Marine Corps, Air Force, Coast Guard, Space Force, and their dependents',
    'Lenders must provide clear disclosures including the MAPR and a statement of borrower rights',
    'Violations can result in the loan being voided',
  ],
  url: 'https://www.consumerfinance.gov/ask-cfpb/what-protections-do-i-have-as-an-active-duty-service-member-en-2183/',
}

// ─── Emergency Resources ────────────────────────────────────────────

export interface MilitaryReliefSociety {
  name: string
  branch: string
  url: string
  description: string
  typicalHelp: string[]
}

export const militaryReliefSocieties: MilitaryReliefSociety[] = [
  {
    name: 'Army Emergency Relief (AER)',
    branch: 'Army',
    url: 'https://www.armyemergencyrelief.org/',
    description: 'Interest-free loans and grants for soldiers and their families facing financial emergencies.',
    typicalHelp: ['Emergency travel', 'Rent/mortgage assistance', 'Vehicle repair', 'Medical/dental', 'Food assistance'],
  },
  {
    name: 'Navy-Marine Corps Relief Society (NMCRS)',
    branch: 'Navy / Marines',
    url: 'https://www.nmcrs.org/',
    description: 'Interest-free loans and grants for sailors, marines, and their families in financial need.',
    typicalHelp: ['Emergency travel', 'Rent/utilities assistance', 'Car repair', 'Medical bills', 'Disaster relief'],
  },
  {
    name: 'Air Force Aid Society (AFAS)',
    branch: 'Air Force / Space Force',
    url: 'https://www.afas.org/',
    description: 'Emergency financial assistance through interest-free loans and grants for airmen, guardians, and families.',
    typicalHelp: ['Emergency travel', 'Basic needs', 'Vehicle repair', 'Medical emergencies', 'Spousal career support'],
  },
  {
    name: 'Coast Guard Mutual Assistance (CGMA)',
    branch: 'Coast Guard',
    url: 'https://www.cgmahq.org/',
    description: 'Financial assistance for Coast Guard members and their families through interest-free loans and grants.',
    typicalHelp: ['Emergency travel', 'Housing assistance', 'Medical/dental', 'Education', 'Disaster relief'],
  },
]

// ─── Helper Functions ───────────────────────────────────────────────

export function getPredatoryLendingTypeById(id: string): PredatoryLendingType | undefined {
  return predatoryLendingTypes.find((t) => t.id === id)
}

export function getReliefSocietyByBranch(branch: string): MilitaryReliefSociety | undefined {
  return militaryReliefSocieties.find(
    (s) => s.branch.toLowerCase().includes(branch.toLowerCase())
  )
}
