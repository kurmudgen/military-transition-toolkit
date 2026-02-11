/**
 * Financial Education Hub Data
 *
 * Structured lesson content for military members transitioning to civilian life.
 * Each lesson is self-contained with key concepts, action steps, and military context.
 */

export interface Lesson {
  id: string
  title: string
  category: 'basics' | 'military' | 'debt' | 'investing' | 'transition' | 'protection'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedMinutes: number
  description: string
  keyPoints: string[]
  actionSteps: string[]
  militaryContext?: string   // why this matters specifically for service members
  relatedTool?: string      // route path to a related MTT tool
}

export const LESSON_CATEGORIES: Record<string, { label: string; description: string }> = {
  basics: { label: 'Money Basics', description: 'Foundational financial literacy' },
  military: { label: 'Military Finance', description: 'Pay, benefits, and military-specific topics' },
  debt: { label: 'Debt Management', description: 'Getting out and staying out of debt' },
  investing: { label: 'Investing & Retirement', description: 'Growing your wealth over time' },
  transition: { label: 'Transition Planning', description: 'Financial prep for civilian life' },
  protection: { label: 'Financial Protection', description: 'Avoiding scams and protecting your money' },
}

export const LESSONS: Lesson[] = [
  // ─── Basics ────────────────────────────────────────────────────────
  {
    id: 'budgeting-101',
    title: 'Budgeting 101: The 50/30/20 Rule',
    category: 'basics',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    description: 'Learn the simplest framework for managing your money: 50% needs, 30% wants, 20% savings.',
    keyPoints: [
      'Needs (50%): Housing, food, utilities, insurance, minimum debt payments, childcare',
      'Wants (30%): Dining out, entertainment, subscriptions, shopping, hobbies',
      'Savings (20%): Emergency fund, TSP/retirement, extra debt payments, savings goals',
      'Track every dollar for one month to understand where your money actually goes',
      'Adjust the percentages to fit your situation — the rule is a starting framework, not law',
    ],
    actionSteps: [
      'Calculate your after-tax monthly income (base pay + BAH + BAS minus deductions)',
      'List all your monthly expenses and categorize them as need, want, or saving',
      'Compare your actual spending to the 50/30/20 targets',
      'Identify one area where you can cut back this month',
    ],
    militaryContext: 'Military members have unique advantages: BAH covers housing, BAS covers food, and TRICARE covers healthcare. This means your "needs" bucket may be smaller, freeing more for savings and wants.',
    relatedTool: '/app/budget',
  },
  {
    id: 'emergency-fund',
    title: 'Building Your Emergency Fund',
    category: 'basics',
    difficulty: 'beginner',
    estimatedMinutes: 6,
    description: 'Why every service member needs an emergency fund and how to build one from zero.',
    keyPoints: [
      'Start with a $1,000 starter fund — even $25/paycheck adds up',
      'Target 3-6 months of essential expenses (housing, food, utilities, insurance)',
      'Keep it in a high-yield savings account — not checking, not invested',
      'This is for true emergencies only: job loss, medical emergency, major car repair',
      'Replenish immediately after using it',
    ],
    actionSteps: [
      'Open a separate high-yield savings account (don\'t mix with checking)',
      'Set up an automatic allotment through myPay for at least $50/paycheck',
      'Calculate your target: monthly expenses × 6 months',
      'Don\'t touch it for non-emergencies (a sale is not an emergency)',
    ],
    militaryContext: 'While active duty provides job security, PCS moves, vehicle breakdowns, and family emergencies still happen. When transitioning, 6+ months is critical — civilian job searches average 3-6 months.',
    relatedTool: '/app/savings',
  },
  {
    id: 'understanding-fico',
    title: 'Understanding Your Credit Score',
    category: 'basics',
    difficulty: 'beginner',
    estimatedMinutes: 7,
    description: 'How your credit score works, why it matters, and how to build or rebuild it.',
    keyPoints: [
      'FICO scores range from 300-850. 670+ is "good," 740+ is "very good"',
      'Payment history (35%): Pay everything on time — even one late payment hurts',
      'Credit utilization (30%): Keep credit card balances below 30% of limits',
      'Length of history (15%): Keep old accounts open even if unused',
      'Credit mix (10%): Installment loans + revolving credit is better than one type',
      'New credit (10%): Hard inquiries drop your score temporarily',
    ],
    actionSteps: [
      'Get your free credit reports at annualcreditreport.com (free weekly)',
      'Set up autopay for at least minimum payments on all accounts',
      'Check for errors on your reports and dispute any inaccuracies',
      'If rebuilding, consider a secured credit card with a small limit',
    ],
    militaryContext: 'Your credit score affects security clearance reviews, rental applications after military, and civilian loan rates. A poor score can even impact your military career. SCRA provides some credit protections while on active duty.',
  },

  // ─── Military Finance ──────────────────────────────────────────────
  {
    id: 'military-pay-breakdown',
    title: 'Understanding Your Military Pay',
    category: 'military',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    description: 'A complete breakdown of base pay, BAH, BAS, special pays, and deductions on your LES.',
    keyPoints: [
      'Base Pay: Determined by rank and years of service, taxable',
      'BAH (Basic Allowance for Housing): Tax-free, based on duty station and dependents',
      'BAS (Basic Allowance for Subsistence): Tax-free, $452.56 enlisted / $311.68 officer (2025)',
      'Special pays: Flight pay, hazardous duty, combat zone (tax-free), dive pay, etc.',
      'Deductions: Federal tax, FICA (6.2% SS + 1.45% Medicare), SGLI, TSP, state tax (if applicable)',
      'Your LES (Leave and Earnings Statement) shows everything — learn to read it',
    ],
    actionSteps: [
      'Log into myPay and review your current LES line by line',
      'Verify your BAH rate matches your duty station and dependency status',
      'Check that your TSP contribution percentage is correct',
      'Ensure SGLI coverage is what you want ($400K max, $25/month)',
    ],
    militaryContext: 'Many service members don\'t realize that BAH and BAS are tax-free — this means your effective pay is higher than your "base pay" suggests. Understanding your full compensation helps with budgeting and civilian salary comparisons.',
    relatedTool: '/app/pay-calculator',
  },
  {
    id: 'tsp-fundamentals',
    title: 'TSP: Your Military 401(k)',
    category: 'military',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    description: 'Everything you need to know about the Thrift Savings Plan — the best retirement benefit in the military.',
    keyPoints: [
      'TSP has the lowest expense ratios of any retirement plan (~0.04% vs ~0.50% average)',
      'BRS members get 1% automatic + up to 4% matching = 5% free from DoD',
      'Traditional (pre-tax) vs Roth (after-tax) — Roth is often better for military due to low tax brackets',
      'Five individual funds (G, F, C, S, I) and Lifecycle (L) funds that auto-rebalance',
      '2025 contribution limit: $23,500/year ($7,500 additional catch-up for age 50+)',
      'Combat zone contributions can go up to $70,000/year total',
    ],
    actionSteps: [
      'If BRS, contribute at least 5% to get full DoD matching',
      'Consider Roth TSP if you\'re in a low tax bracket (most E-1 through E-5)',
      'Choose a Lifecycle fund if unsure — L2050 or L2055 for younger members',
      'Increase contribution by 1% each time you get a raise or promotion',
    ],
    militaryContext: 'The TSP is genuinely one of the best retirement plans available to anyone. The expense ratios are 10-15x lower than typical civilian 401(k) plans. Even if you leave the military, you can keep your TSP or roll it into a civilian employer\'s plan.',
    relatedTool: '/app/tsp-calculator',
  },
  {
    id: 'brs-vs-legacy',
    title: 'BRS vs. Legacy Retirement: Which Is Better?',
    category: 'military',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    description: 'Compare the Blended Retirement System with the legacy High-3 system and understand what this means for your career decisions.',
    keyPoints: [
      'Legacy High-3: 2.5% × years of service × high-3 average. Must serve 20+ years or get $0.',
      'BRS: 2.0% × years × high-3 average + TSP matching + continuation pay. Portable — you keep TSP even if you separate before 20.',
      'Only ~17% of service members reach 20 years. BRS benefits the other 83%.',
      'BRS continuation pay: 2.5-13× monthly base pay between 8-12 years of service (must commit to 4 more years)',
      'If you\'re staying 20+, legacy pension is slightly higher. If uncertain, BRS is usually safer.',
    ],
    actionSteps: [
      'Run the numbers: Use a TSP calculator to compare your projected retirement income under both systems',
      'If under BRS, verify you\'re contributing at least 5% to maximize the match',
      'Factor in the probability of reaching 20 years — be realistic about career plans',
      'Talk to a military financial counselor (free) at your installation\'s PFM office',
    ],
    militaryContext: 'This is one of the most consequential financial decisions in your military career. If you opted into BRS, ensure you\'re maximizing the match. If you\'re legacy, understand that your entire retirement benefit hinges on reaching 20 years.',
    relatedTool: '/app/tsp-calculator',
  },

  // ─── Debt ──────────────────────────────────────────────────────────
  {
    id: 'debt-snowball-avalanche',
    title: 'Snowball vs. Avalanche: Debt Payoff Strategies',
    category: 'debt',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    description: 'Two proven methods to eliminate debt — choose the one that fits your personality.',
    keyPoints: [
      'Avalanche: Pay minimums on all debts, throw extra money at highest interest rate first. Saves the most money.',
      'Snowball: Pay minimums on all, throw extra at smallest balance first. Builds momentum with quick wins.',
      'Both work — the best method is the one you stick with',
      'As you pay off each debt, its minimum payment rolls into the next debt ("snowball effect")',
      'Even $50-100/month extra can save thousands in interest and years of payments',
    ],
    actionSteps: [
      'List all debts with balance, interest rate, and minimum payment',
      'Choose a strategy: avalanche if you\'re disciplined, snowball if you need motivation',
      'Find extra money: cut one subscription, pick up extra duty, sell unused items',
      'Automate payments and track progress monthly',
    ],
    militaryContext: 'Excessive debt can put your security clearance at risk. The DoD views financial irresponsibility as a security concern. Getting debt under control protects both your finances and your career.',
    relatedTool: '/app/debt-manager',
  },
  {
    id: 'good-debt-bad-debt',
    title: 'Good Debt vs. Bad Debt',
    category: 'debt',
    difficulty: 'beginner',
    estimatedMinutes: 6,
    description: 'Not all debt is equal. Learn which debts build wealth and which destroy it.',
    keyPoints: [
      'Good debt: Builds wealth or increases earning potential. Low interest, tax-deductible.',
      'Examples of good debt: Mortgage (builds equity), student loans for high-demand fields, business loans',
      'Bad debt: Loses value immediately, high interest, no long-term benefit.',
      'Examples of bad debt: Credit cards at 20%+, payday loans, car loans on depreciating luxury vehicles',
      'The line is blurry: A reasonable auto loan (under 6%) for reliable transportation can be smart',
    ],
    actionSteps: [
      'Categorize all your current debts as "building" (wealth/income) or "draining"',
      'Prioritize paying off draining debts first',
      'Before taking on new debt, ask: "Does this increase my net worth or earning potential?"',
      'Avoid financing depreciating assets whenever possible',
    ],
    militaryContext: 'Junior enlisted are heavily targeted by lenders offering "military discounts" on high-interest auto loans and store credit. The car lots outside the gate are not your friends. Use your installation\'s financial counselor before any major purchase.',
  },

  // ─── Investing ─────────────────────────────────────────────────────
  {
    id: 'investing-basics',
    title: 'Investing 101: Start With What You Have',
    category: 'investing',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    description: 'The fundamentals of investing — compound interest, diversification, and why starting early matters more than starting big.',
    keyPoints: [
      'Compound interest: Your money earns money on its money. Time is the most powerful factor.',
      '$200/month at 7% for 30 years = ~$227,000. For 20 years = ~$104,000. Starting early doubles your result.',
      'Diversification: Don\'t put all eggs in one basket. Index funds spread risk across hundreds of companies.',
      'Dollar-cost averaging: Invest the same amount regularly regardless of market conditions',
      'You don\'t need to pick stocks. Low-cost index funds (like TSP C fund) outperform most professionals.',
      'Don\'t try to time the market. Time IN the market beats timing the market.',
    ],
    actionSteps: [
      'If you haven\'t started, open your TSP and contribute at least 5% (or enough for full match)',
      'Pick a target-date lifecycle fund if you\'re unsure about asset allocation',
      'After TSP, consider a Roth IRA ($7,000/year limit in 2025)',
      'Set up automatic contributions and don\'t look at your balance daily',
    ],
    militaryContext: 'Military members have a unique advantage: TSP has the lowest fees anywhere, Roth TSP contributions grow tax-free, and combat zone pay can be contributed tax-free. An E-5 contributing 10% from age 22 to 42 could have $200K+ in TSP alone.',
    relatedTool: '/app/tsp-calculator',
  },
  {
    id: 'roth-vs-traditional',
    title: 'Roth vs. Traditional: Which Account Type?',
    category: 'investing',
    difficulty: 'intermediate',
    estimatedMinutes: 8,
    description: 'Understand the tax implications of Roth vs. Traditional retirement accounts and when each makes sense.',
    keyPoints: [
      'Traditional: Tax deduction now, pay taxes when you withdraw in retirement',
      'Roth: No tax break now, but all growth and withdrawals in retirement are tax-free',
      'Choose Roth when your current tax rate is LOW (most junior military members)',
      'Choose Traditional when your current tax rate is HIGH (senior officers, high-earning civilians)',
      'Military advantage: BAH and BAS are tax-free, making your taxable income even lower',
      'You can split contributions between Roth and Traditional TSP',
    ],
    actionSteps: [
      'Check your current federal tax bracket (most E-1 to E-5 are in the 12% or lower bracket)',
      'If in 12% bracket or lower, strongly consider Roth TSP',
      'If in 22%+ bracket, consider Traditional or a mix',
      'Combat zone? Roth is a no-brainer — tax-free contributions that grow tax-free forever',
    ],
    militaryContext: 'This is one of the biggest advantages military members have. An E-4 in a combat zone contributing to Roth TSP is getting triple tax-free treatment: no tax going in, no tax on growth, no tax coming out. Civilians can\'t get this.',
  },

  // ─── Transition ────────────────────────────────────────────────────
  {
    id: 'transition-financial-prep',
    title: 'Financial Preparation for Military Transition',
    category: 'transition',
    difficulty: 'intermediate',
    estimatedMinutes: 12,
    description: 'A comprehensive financial checklist for the 12 months before you separate or retire from the military.',
    keyPoints: [
      '12 months out: Build 6+ months of expenses in savings, eliminate high-interest debt',
      '9 months out: Research civilian salary ranges for your target career/location. Use Cost of Living tool.',
      '6 months out: Create a civilian budget (include healthcare costs — TRICARE goes away)',
      '3 months out: Understand VA benefits, GI Bill, disability claims timeline',
      'Separation day: Terminal leave strategy, final paycheck timing, SGLI conversion',
      'Hidden costs: COBRA/marketplace health insurance ($400-1500/mo for family), renters insurance, car insurance may increase',
    ],
    actionSteps: [
      'Calculate your full civilian budget including healthcare, housing, and state taxes',
      'Apply for VA benefits and disability claims before separation',
      'Build your emergency fund to 6+ months — longer if relocating to expensive area',
      'Don\'t leave TSP matching money on the table — maximize contributions until separation',
    ],
    militaryContext: 'The biggest financial shock for most transitioning members is healthcare costs. Going from free TRICARE to $1,200/month for a family marketplace plan is real. Budget for this before you separate.',
    relatedTool: '/app/cost-of-living',
  },
  {
    id: 'civilian-salary-negotiation',
    title: 'Negotiating Your First Civilian Salary',
    category: 'transition',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    description: 'How to compare military compensation to civilian offers and negotiate effectively.',
    keyPoints: [
      'Your military compensation is more than base pay. Add BAH, BAS, tax advantages, TRICARE value.',
      'An E-7 with 14 years may earn $85-95K in total compensation — but their base pay shows $60K',
      'Civilian "equivalent" salary must cover: healthcare premiums, retirement contributions, state taxes, housing',
      'Research salary ranges on Glassdoor, levels.fyi, and the Bureau of Labor Statistics',
      'Never give the first number in a negotiation. Ask for the range first.',
      'Benefits matter as much as salary: 401k match, PTO, remote work, education reimbursement',
    ],
    actionSteps: [
      'Calculate your true military compensation (base + BAH + BAS + TRICARE value + TSP match)',
      'Research 3-5 target companies and their salary ranges for your role',
      'Factor in cost of living differences between duty station and new location',
      'Practice your negotiation pitch: emphasize transferable leadership, security clearance, reliability',
    ],
    militaryContext: 'Veterans often undervalue themselves because they only look at base pay. An E-6 in San Diego with dependents has ~$78K in total compensation. Factor in TRICARE ($0 premiums), TSP matching, and tax-free allowances to get the real number.',
    relatedTool: '/app/cost-of-living',
  },
  {
    id: 'gi-bill-financial',
    title: 'GI Bill: Financial Strategy Guide',
    category: 'transition',
    difficulty: 'intermediate',
    estimatedMinutes: 8,
    description: 'Maximize the financial value of your GI Bill — it\'s worth over $100K if used wisely.',
    keyPoints: [
      'Post-9/11 GI Bill covers tuition at public schools (or up to ~$27K/year at private), housing allowance, and book stipend',
      'BAH-equivalent housing allowance is based on school zip code, not where you live',
      'You get 36 months of benefits — plan carefully to not waste months on prerequisites you could test out of',
      'VET TEC: Free tech training program that still pays BAH. Separate from your 36 months.',
      'Yellow Ribbon: Some schools cover the gap between GI Bill cap and actual tuition for private schools',
      'Don\'t use GI Bill for schools that have high veteran dropout rates or poor outcomes',
    ],
    actionSteps: [
      'Compare schools using the VA\'s GI Bill Comparison Tool',
      'CLEP/DSST out of basic courses to save GI Bill months for upper-level classes',
      'Choose a school in a high-BAH zip code to maximize your housing allowance',
      'Consider VET TEC for tech careers — it doesn\'t use your GI Bill months',
    ],
    militaryContext: 'Your GI Bill is potentially worth $100K-250K. Treat it like the massive financial asset it is. Don\'t waste it on a school with poor outcomes or a degree with no market demand.',
  },

  // ─── Protection ────────────────────────────────────────────────────
  {
    id: 'predatory-lending',
    title: 'Predatory Lending: Protecting Your Paycheck',
    category: 'protection',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    description: 'How to recognize and avoid predatory lenders that specifically target military members.',
    keyPoints: [
      'Military Lending Act (MLA): Caps interest at 36% APR for active duty. But enforcement isn\'t perfect.',
      'Payday loans: $15/$100 fee for 2 weeks = 391% APR. Average borrower pays $520 to borrow $375.',
      'Title loans: You risk losing your vehicle. APRs average 300%.',
      'Rent-to-own: A $500 TV can cost $1,500+. Always compare the total cost.',
      'Red flags: "No credit check," "guaranteed approval," "E-1 and up," located near base gates',
      'SCRA protections: 6% interest rate cap on pre-service debts, protection from repossession',
    ],
    actionSteps: [
      'Never borrow from lenders near the base gate offering "military specials"',
      'If you need emergency cash, visit your AER (Army), NMCRS (Navy/Marine), AFAS (Air Force) first — they offer 0% loans',
      'Check any lender\'s APR against the 36% MLA cap before signing',
      'Report predatory lenders to your JAG office and the CFPB',
    ],
    militaryContext: 'Military installations are surrounded by predatory lenders for a reason — guaranteed paychecks. Your chain of command needs to know if soldiers are trapped in payday loan cycles. Financial counseling is free and confidential through Military OneSource.',
    relatedTool: '/app/debt-manager',
  },
  {
    id: 'scams-targeting-military',
    title: 'Scams That Target Service Members',
    category: 'protection',
    difficulty: 'beginner',
    estimatedMinutes: 7,
    description: 'Common scams aimed at military families and how to protect yourself.',
    keyPoints: [
      'Deployment scams: Fake charities, "investment opportunities" targeting deployed members\' spouses',
      'VA impersonation: Scammers calling about "VA benefits" to steal personal info',
      'Rental scams: PCSing families targeted with fake listings in their new duty station city',
      'Auto dealer tricks: "Military discount" with hidden fees, inflated prices, or GAP insurance padding',
      'Identity theft: Military members are 76% more likely to be identity theft victims (FTC)',
      'Romance scams: Impersonating military members on dating apps to scam civilians (but also targeting service members)',
    ],
    actionSteps: [
      'Freeze your credit with all three bureaus (Equifax, Experian, TransUnion) — it\'s free',
      'Never give personal info to unsolicited callers, even if they claim to be VA',
      'Before PCSing, verify rental listings in person or through trusted referral services',
      'Use free identity monitoring from the DoD through IdentityTheft.gov',
    ],
    militaryContext: 'Deployments create vulnerability — military members can\'t easily monitor accounts or meet with banks while overseas. Set up trusted POAs, freeze credit, and alert your bank before deployments.',
  },
  {
    id: 'insurance-basics',
    title: 'Insurance: What You Actually Need',
    category: 'protection',
    difficulty: 'intermediate',
    estimatedMinutes: 9,
    description: 'Navigate military and civilian insurance options — what\'s covered, what\'s not, and what to buy.',
    keyPoints: [
      'SGLI: $400K max for $25/month. Convert to VGLI within 240 days of separation (no health exam).',
      'TRICARE: Free while active duty. Goes away at separation (except retirees and VA-eligible)',
      'Renter\'s insurance: $15-25/month. Covers your belongings if housing is damaged. BAH doesn\'t cover this.',
      'Auto insurance: Rates may change with PCS. Some states are much more expensive.',
      'Umbrella insurance: Cheap extra liability coverage ($1M for ~$200/year). Consider if you have assets.',
      'Avoid: Most extended warranties, "military special" whole life insurance from base salespeople',
    ],
    actionSteps: [
      'Review your SGLI coverage and beneficiaries',
      'Get renter\'s insurance if you live off-base (most landlords require it anyway)',
      'Shop auto insurance before every PCS — rates vary dramatically by state',
      'Decline the whole life insurance pitch from the "financial advisor" at the welcome center',
    ],
    militaryContext: 'The person in the welcome center selling "financial plans" is usually selling whole life insurance with high commissions. SGLI + term life insurance is almost always better and cheaper for military families.',
  },
]
