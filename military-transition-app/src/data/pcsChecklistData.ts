/**
 * PCS Career Prep Checklist Data
 *
 * Timeline-based checklists for career preparation during a PCS
 * (Permanent Change of Station) move. Organized by timeframe relative
 * to the move date.
 */

export interface PCSChecklistItem {
  id: string
  text: string
  description: string
  category: PCSCategory
  timeframe: PCSTimeframe
  priority: 'critical' | 'important' | 'recommended'
  spouseRelevant: boolean
  resources: string[]
}

export type PCSTimeframe =
  | '6-months-before'
  | '3-months-before'
  | '1-month-before'
  | 'during-move'
  | 'first-30-days'

export type PCSCategory =
  | 'career'
  | 'licensing'
  | 'education'
  | 'networking'
  | 'financial'
  | 'benefits'

export const TIMEFRAME_LABELS: Record<PCSTimeframe, string> = {
  '6-months-before': '6+ Months Before PCS',
  '3-months-before': '3 Months Before PCS',
  '1-month-before': '1 Month Before PCS',
  'during-move': 'During the Move',
  'first-30-days': 'First 30 Days at New Station',
}

export const CATEGORY_LABELS: Record<PCSCategory, string> = {
  career: 'Career Planning',
  licensing: 'Licensing & Credentials',
  education: 'Education',
  networking: 'Networking',
  financial: 'Financial',
  benefits: 'Benefits & Programs',
}

export const PCS_CHECKLIST_ITEMS: PCSChecklistItem[] = [
  // ── 6+ Months Before ────────────────────────────────────────────
  {
    id: 'research-job-market',
    text: 'Research job market at new duty station',
    description: 'Look up major employers, industries, unemployment rate, and average salaries in your new area. Check job boards for postings in your field.',
    category: 'career',
    timeframe: '6-months-before',
    priority: 'critical',
    spouseRelevant: true,
    resources: ['BLS Local Area Unemployment Statistics', 'Indeed', 'LinkedIn Jobs'],
  },
  {
    id: 'check-licensing-requirements',
    text: 'Check licensing requirements in new state',
    description: 'If you or your spouse hold professional licenses, research the new state\'s requirements. Many states have expedited processes for military families.',
    category: 'licensing',
    timeframe: '6-months-before',
    priority: 'critical',
    spouseRelevant: true,
    resources: ['MTT Licensing Navigator', 'State licensing boards'],
  },
  {
    id: 'start-license-transfer',
    text: 'Begin license transfer applications',
    description: 'Start the transfer process early — some states take weeks or months to process. Apply for temporary practice permits if available.',
    category: 'licensing',
    timeframe: '6-months-before',
    priority: 'critical',
    spouseRelevant: true,
    resources: ['State licensing boards', 'Military OneSource SECO'],
  },
  {
    id: 'update-resume',
    text: 'Update resume and LinkedIn profile',
    description: 'Refresh your resume with latest military experience translated to civilian terms. Update LinkedIn with new location (or "relocating to" note).',
    category: 'career',
    timeframe: '6-months-before',
    priority: 'important',
    spouseRelevant: true,
    resources: ['Hiring Our Heroes resume tools', 'MTT Resume Builder'],
  },
  {
    id: 'research-education-options',
    text: 'Research education programs at new location',
    description: 'Look up colleges, universities, and trade schools near your new station. Check for military-friendly programs and GI Bill acceptance.',
    category: 'education',
    timeframe: '6-months-before',
    priority: 'recommended',
    spouseRelevant: true,
    resources: ['VA GI Bill School Search', 'MyCAA (spouse)'],
  },
  {
    id: 'identify-veteran-orgs',
    text: 'Identify veteran organizations at new location',
    description: 'Research VFW, American Legion, Team Red White & Blue, and other veteran service organizations in your new area.',
    category: 'networking',
    timeframe: '6-months-before',
    priority: 'recommended',
    spouseRelevant: false,
    resources: ['Team RWB', 'VFW Post Locator', 'American Legion'],
  },
  {
    id: 'research-spouse-employment',
    text: 'Research spouse employment programs',
    description: 'Military OneSource SECO, MyCAA, and installation family support centers offer employment assistance for military spouses.',
    category: 'career',
    timeframe: '6-months-before',
    priority: 'important',
    spouseRelevant: true,
    resources: ['Military OneSource SECO', 'MyCAA', 'Blue Star Families'],
  },

  // ── 3 Months Before ─────────────────────────────────────────────
  {
    id: 'start-applying-jobs',
    text: 'Begin applying for jobs at new location',
    description: 'Start submitting applications and scheduling virtual interviews. Mention your PCS date and expected arrival.',
    category: 'career',
    timeframe: '3-months-before',
    priority: 'critical',
    spouseRelevant: true,
    resources: ['USAJobs', 'LinkedIn', 'Military-friendly employers'],
  },
  {
    id: 'request-letters-recommendation',
    text: 'Request letters of recommendation',
    description: 'Ask supervisors and colleagues for written recommendations before you PCS. These are harder to get after you leave.',
    category: 'career',
    timeframe: '3-months-before',
    priority: 'important',
    spouseRelevant: true,
    resources: [],
  },
  {
    id: 'collect-training-records',
    text: 'Collect training records and certificates',
    description: 'Get copies of all military training records, certificates, transcripts, and awards. Request your Joint Services Transcript (JST).',
    category: 'education',
    timeframe: '3-months-before',
    priority: 'critical',
    spouseRelevant: false,
    resources: ['Joint Services Transcript', 'Army/Navy/AF training portals'],
  },
  {
    id: 'connect-installation-acs',
    text: 'Connect with ACS/FFSC at new installation',
    description: 'Contact Army Community Service (ACS), Fleet & Family Support Center (FFSC), or Airman & Family Readiness Center at your gaining installation for employment resources.',
    category: 'networking',
    timeframe: '3-months-before',
    priority: 'important',
    spouseRelevant: true,
    resources: ['Military installations website', 'Military OneSource'],
  },
  {
    id: 'review-mycaa-eligibility',
    text: 'Check MyCAA eligibility (spouses)',
    description: 'My Career Advancement Account provides up to $4,000 for military spouse education, training, and certifications. Must apply before PCS.',
    category: 'benefits',
    timeframe: '3-months-before',
    priority: 'important',
    spouseRelevant: true,
    resources: ['MyCAA Portal'],
  },
  {
    id: 'network-online-new-area',
    text: 'Join online networking groups for new area',
    description: 'Join LinkedIn groups, Facebook groups, and professional associations in your new area. Start building connections before you arrive.',
    category: 'networking',
    timeframe: '3-months-before',
    priority: 'recommended',
    spouseRelevant: true,
    resources: ['LinkedIn Groups', 'Meetup.com'],
  },
  {
    id: 'schedule-tap-class',
    text: 'Attend TAP/TAPS class (if separating)',
    description: 'If you\'re separating, attend the Transition Assistance Program. It\'s mandatory and should be completed before your last PCS.',
    category: 'benefits',
    timeframe: '3-months-before',
    priority: 'critical',
    spouseRelevant: false,
    resources: ['TAP/TAPS', 'Installation transition office'],
  },

  // ── 1 Month Before ──────────────────────────────────────────────
  {
    id: 'finalize-applications',
    text: 'Follow up on pending job applications',
    description: 'Check status of all submitted applications. Send follow-up emails. Confirm any scheduled interviews at the new location.',
    category: 'career',
    timeframe: '1-month-before',
    priority: 'important',
    spouseRelevant: true,
    resources: [],
  },
  {
    id: 'gather-professional-docs',
    text: 'Organize professional documents for the move',
    description: 'Pack in a carry-on (not in HHG): licenses, transcripts, certificates, DD-214, resume copies, reference letters, and security clearance documentation.',
    category: 'career',
    timeframe: '1-month-before',
    priority: 'critical',
    spouseRelevant: true,
    resources: [],
  },
  {
    id: 'set-up-gi-bill-transfer',
    text: 'Verify GI Bill / education benefits transfer',
    description: 'If transferring schools, ensure GI Bill enrollment is updated. Contact the VA school certifying official at your new institution.',
    category: 'education',
    timeframe: '1-month-before',
    priority: 'important',
    spouseRelevant: false,
    resources: ['VA Education Benefits Hotline', 'eBenefits'],
  },
  {
    id: 'update-tsp-address',
    text: 'Update TSP and financial account addresses',
    description: 'Update address on TSP, bank accounts, investment accounts, and insurance policies. Set up mail forwarding.',
    category: 'financial',
    timeframe: '1-month-before',
    priority: 'important',
    spouseRelevant: true,
    resources: ['TSP.gov', 'USPS mail forwarding'],
  },
  {
    id: 'review-bah-rates',
    text: 'Review BAH rates at new location',
    description: 'Check BAH rates for your pay grade at the new duty station. Plan your housing budget accordingly.',
    category: 'financial',
    timeframe: '1-month-before',
    priority: 'important',
    spouseRelevant: true,
    resources: ['MTT Pay Calculator', 'DoD BAH Calculator'],
  },

  // ── During the Move ─────────────────────────────────────────────
  {
    id: 'keep-docs-accessible',
    text: 'Keep career documents accessible during travel',
    description: 'Ensure all professional documents are in your carry-on or personal vehicle — not packed with household goods.',
    category: 'career',
    timeframe: 'during-move',
    priority: 'critical',
    spouseRelevant: true,
    resources: [],
  },
  {
    id: 'attend-virtual-interviews',
    text: 'Continue virtual interviews during transit',
    description: 'If you have pending interviews, have a quiet space and professional background ready. Let employers know your travel timeline.',
    category: 'career',
    timeframe: 'during-move',
    priority: 'important',
    spouseRelevant: true,
    resources: [],
  },

  // ── First 30 Days ───────────────────────────────────────────────
  {
    id: 'visit-acs-ffsc',
    text: 'Visit ACS / FFSC / AFRC on installation',
    description: 'Check in with your installation\'s family support center. They offer employment workshops, resume help, and local job fairs.',
    category: 'networking',
    timeframe: 'first-30-days',
    priority: 'important',
    spouseRelevant: true,
    resources: ['Installation family support center'],
  },
  {
    id: 'register-state-employment',
    text: 'Register with state employment office',
    description: 'Register with your new state\'s workforce development / employment agency. Many offer veteran priority services.',
    category: 'career',
    timeframe: 'first-30-days',
    priority: 'important',
    spouseRelevant: true,
    resources: ['CareerOneStop', 'State workforce agency'],
  },
  {
    id: 'attend-local-networking',
    text: 'Attend a local networking event or job fair',
    description: 'Go to at least one local career event, veteran hiring fair, or professional meetup within your first month.',
    category: 'networking',
    timeframe: 'first-30-days',
    priority: 'recommended',
    spouseRelevant: true,
    resources: ['Hiring Our Heroes hiring events', 'RecruitMilitary'],
  },
  {
    id: 'complete-license-transfer',
    text: 'Complete license transfer / new state application',
    description: 'Follow up on license transfer applications. Visit the state licensing board if needed. Pick up any required state-specific testing materials.',
    category: 'licensing',
    timeframe: 'first-30-days',
    priority: 'critical',
    spouseRelevant: true,
    resources: ['State licensing boards'],
  },
  {
    id: 'enroll-education-program',
    text: 'Enroll in education or certification programs',
    description: 'If planning to attend school or earn certifications, complete enrollment and verify benefits processing.',
    category: 'education',
    timeframe: 'first-30-days',
    priority: 'recommended',
    spouseRelevant: true,
    resources: ['VA GI Bill', 'MyCAA', 'VET TEC'],
  },
  {
    id: 'update-va-address',
    text: 'Update VA records with new address',
    description: 'Update your address with the VA for healthcare, benefits, and correspondence. This is separate from USPS mail forwarding.',
    category: 'benefits',
    timeframe: 'first-30-days',
    priority: 'important',
    spouseRelevant: false,
    resources: ['VA.gov', 'eBenefits'],
  },
  {
    id: 'review-state-vet-benefits',
    text: 'Research state-specific veteran benefits',
    description: 'Each state offers different veteran benefits (tax exemptions, education grants, hiring preferences). Research what your new state provides.',
    category: 'benefits',
    timeframe: 'first-30-days',
    priority: 'recommended',
    spouseRelevant: false,
    resources: ['VA State Benefits', 'State veteran affairs office'],
  },
]

// ─── Helper Functions ─────────────────────────────────────────────

export function getItemsByTimeframe(timeframe: PCSTimeframe): PCSChecklistItem[] {
  return PCS_CHECKLIST_ITEMS.filter((item) => item.timeframe === timeframe)
}

export function getItemsByCategory(category: PCSCategory): PCSChecklistItem[] {
  return PCS_CHECKLIST_ITEMS.filter((item) => item.category === category)
}

export function getSpouseRelevantItems(): PCSChecklistItem[] {
  return PCS_CHECKLIST_ITEMS.filter((item) => item.spouseRelevant)
}

export function getTimeframes(): PCSTimeframe[] {
  return ['6-months-before', '3-months-before', '1-month-before', 'during-move', 'first-30-days']
}
