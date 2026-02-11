/**
 * Professional Licensing Data
 *
 * State-by-state professional licensing info for transitioning military
 * members and military spouses. Ported from SpouseForce (SF-K3)
 * and expanded for MTT.
 *
 * Focuses on top 10 military-friendly states first:
 * Texas, Virginia, North Carolina, California, Florida, Washington,
 * Georgia, Colorado, Hawaii, Maryland.
 *
 * URLs are for state licensing boards — verify before relying on them
 * as state websites change frequently.
 */

export interface ProfessionalLicense {
  id: string
  profession: string
  description: string
  typicalRequirements: string[]
  militaryConsiderations: string[]
  states: StateLicenseInfo[]
}

export interface StateLicenseInfo {
  state: string
  stateCode: string
  hasExpedited: boolean
  hasMilitarySpouseProtection: boolean
  transferProcess: string
  estimatedTimeline: string
  url: string
}

// ─── States Covered ─────────────────────────────────────────────────

const TOP_MILITARY_STATES = [
  { state: 'Texas', code: 'TX' },
  { state: 'Virginia', code: 'VA' },
  { state: 'North Carolina', code: 'NC' },
  { state: 'California', code: 'CA' },
  { state: 'Florida', code: 'FL' },
  { state: 'Washington', code: 'WA' },
  { state: 'Georgia', code: 'GA' },
  { state: 'Colorado', code: 'CO' },
  { state: 'Hawaii', code: 'HI' },
  { state: 'Maryland', code: 'MD' },
] as const

// ─── Professional Licenses ──────────────────────────────────────────

export const professionalLicenses: ProfessionalLicense[] = [
  {
    id: 'rn',
    profession: 'Registered Nurse (RN)',
    description: 'Registered nurses provide patient care, educate patients about health conditions, and coordinate treatment plans. One of the most portable careers for military families.',
    typicalRequirements: [
      'Graduate from an accredited nursing program (ADN or BSN)',
      'Pass the NCLEX-RN examination',
      'Background check and fingerprinting',
      'State-specific continuing education requirements',
    ],
    militaryConsiderations: [
      'The Nurse Licensure Compact (NLC) allows RNs to practice in 40+ member states with one license',
      'Military medics/corpsmen may have accelerated pathways to RN in some states',
      'VA hospitals accept RN licenses from any state',
      'Many states waive fees or expedite applications for military spouses',
    ],
    states: [
      { state: 'Texas', stateCode: 'TX', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state — multistate license valid. If single-state, apply for endorsement. Military spouse temporary permit available.', estimatedTimeline: '2-4 weeks', url: 'https://www.bon.texas.gov/' },
      { state: 'Virginia', stateCode: 'VA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Expedited processing for military and spouses. Temporary license available while permanent processes.', estimatedTimeline: '2-4 weeks', url: 'https://www.dhp.virginia.gov/nursing/' },
      { state: 'North Carolina', stateCode: 'NC', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Military spouse temporary license available for up to 1 year.', estimatedTimeline: '2-4 weeks', url: 'https://www.ncbon.com/' },
      { state: 'California', stateCode: 'CA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NOT an NLC member — requires CA-specific license. Expedited processing for military spouses. Temporary license available.', estimatedTimeline: '4-8 weeks', url: 'https://www.rn.ca.gov/' },
      { state: 'Florida', stateCode: 'FL', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Automatic temporary license for military spouses. Fast-track endorsement available.', estimatedTimeline: '1-3 weeks', url: 'https://floridasnursing.gov/' },
      { state: 'Washington', stateCode: 'WA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Military spouse expedited licensing. Accepts substantially similar education.', estimatedTimeline: '2-4 weeks', url: 'https://www.doh.wa.gov/LicensesPermitsandCertificates/NursingCommission' },
      { state: 'Georgia', stateCode: 'GA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Military spouse temporary permit. Expedited review for military applicants.', estimatedTimeline: '2-4 weeks', url: 'https://sos.ga.gov/georgia-board-nursing' },
      { state: 'Colorado', stateCode: 'CO', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Military spouse temporary authorization. Fee waivers available.', estimatedTimeline: '1-3 weeks', url: 'https://dpo.colorado.gov/Nursing' },
      { state: 'Hawaii', stateCode: 'HI', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NOT an NLC member. Expedited licensing for military spouses. Temporary permit while application processes.', estimatedTimeline: '4-6 weeks', url: 'https://cca.hawaii.gov/pvl/boards/nursing/' },
      { state: 'Maryland', stateCode: 'MD', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Temporary license for military spouses. Expedited processing.', estimatedTimeline: '2-4 weeks', url: 'https://mbon.maryland.gov/' },
    ],
  },
  {
    id: 'lpn',
    profession: 'Licensed Practical Nurse (LPN)',
    description: 'LPNs provide basic nursing care under the direction of RNs and doctors. A good entry point into healthcare that requires less education than an RN.',
    typicalRequirements: [
      'Complete an accredited LPN program (typically 12-18 months)',
      'Pass the NCLEX-PN examination',
      'Background check and fingerprinting',
      'State-specific continuing education',
    ],
    militaryConsiderations: [
      'Military medics/corpsmen often have skills that translate directly',
      'NLC compact covers LPNs in member states',
      'Many military training programs are accepted as qualifying education',
      'VA healthcare system is a major employer of LPNs',
    ],
    states: [
      { state: 'Texas', stateCode: 'TX', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Same board as RN. Military spouse provisions apply.', estimatedTimeline: '2-4 weeks', url: 'https://www.bon.texas.gov/' },
      { state: 'Virginia', stateCode: 'VA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Expedited for military families.', estimatedTimeline: '2-4 weeks', url: 'https://www.dhp.virginia.gov/nursing/' },
      { state: 'North Carolina', stateCode: 'NC', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Temporary permit for military spouses.', estimatedTimeline: '2-4 weeks', url: 'https://www.ncbon.com/' },
      { state: 'California', stateCode: 'CA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Separate Board of Vocational Nursing. Expedited for military spouses.', estimatedTimeline: '4-8 weeks', url: 'https://www.bvnpt.ca.gov/' },
      { state: 'Florida', stateCode: 'FL', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Same fast-track as RN.', estimatedTimeline: '1-3 weeks', url: 'https://floridasnursing.gov/' },
      { state: 'Washington', stateCode: 'WA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Military spouse expedited processing.', estimatedTimeline: '2-4 weeks', url: 'https://www.doh.wa.gov/LicensesPermitsandCertificates/NursingCommission' },
      { state: 'Georgia', stateCode: 'GA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Military spouse temporary permit available.', estimatedTimeline: '2-4 weeks', url: 'https://sos.ga.gov/georgia-board-nursing' },
      { state: 'Colorado', stateCode: 'CO', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Fee waivers for military spouses.', estimatedTimeline: '1-3 weeks', url: 'https://dpo.colorado.gov/Nursing' },
      { state: 'Hawaii', stateCode: 'HI', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Not NLC member. Expedited for military spouses. Temp permit available.', estimatedTimeline: '4-6 weeks', url: 'https://cca.hawaii.gov/pvl/boards/nursing/' },
      { state: 'Maryland', stateCode: 'MD', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'NLC member state. Temporary license for military spouses.', estimatedTimeline: '2-4 weeks', url: 'https://mbon.maryland.gov/' },
    ],
  },
  {
    id: 'teacher',
    profession: 'Teacher (K-12)',
    description: 'K-12 teachers require state-specific certification. Teaching is one of the most affected professions for military spouses who PCS frequently, as each state has different requirements.',
    typicalRequirements: [
      'Bachelor\'s degree (minimum)',
      'Completion of a teacher preparation program',
      'Pass state-specific certification exams (Praxis, state tests)',
      'Background check and fingerprinting',
      'Student teaching or classroom experience',
    ],
    militaryConsiderations: [
      'Interstate Teacher Mobility Compact is being adopted by states to ease transfers',
      'TEACH Grant may help cover education costs',
      'DoDEA schools (on base) accept teaching licenses from any state',
      'Many states now offer temporary permits for military spouses while completing state-specific requirements',
      'Troops to Teachers program assists military members entering education',
    ],
    states: [
      { state: 'Texas', stateCode: 'TX', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'One-year temporary certificate for military spouses with valid out-of-state cert. Must complete TX requirements within 1 year.', estimatedTimeline: '2-6 weeks', url: 'https://tea.texas.gov/texas-educators/certification' },
      { state: 'Virginia', stateCode: 'VA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Provisional license for out-of-state teachers. Military spouse exemptions for some requirements. Expedited review.', estimatedTimeline: '4-8 weeks', url: 'https://www.doe.virginia.gov/teaching/licensure/' },
      { state: 'North Carolina', stateCode: 'NC', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Lateral entry option for career changers. Military spouse temporary license. Reciprocity with many states.', estimatedTimeline: '4-8 weeks', url: 'https://www.dpi.nc.gov/educators/educator-licensure' },
      { state: 'California', stateCode: 'CA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Expedited processing for military spouses. Preliminary credential based on out-of-state credential. May need CA-specific tests.', estimatedTimeline: '6-12 weeks', url: 'https://www.ctc.ca.gov/' },
      { state: 'Florida', stateCode: 'FL', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Temporary certificate for out-of-state teachers. Military spouse fee waiver. 3-year temporary cert while completing FL requirements.', estimatedTimeline: '2-6 weeks', url: 'https://www.fldoe.org/teaching/certification/' },
      { state: 'Washington', stateCode: 'WA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Expedited processing for military spouses. Substitute certificate available immediately while full cert processes.', estimatedTimeline: '4-8 weeks', url: 'https://www.pesb.wa.gov/' },
      { state: 'Georgia', stateCode: 'GA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Expedited review for military spouses. Non-renewable certificate for 1 year while completing GA-specific requirements.', estimatedTimeline: '4-8 weeks', url: 'https://www.gapsc.com/' },
      { state: 'Colorado', stateCode: 'CO', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Expedited processing. Military spouse temporary authorization to teach. Accepts out-of-state certification as basis.', estimatedTimeline: '2-6 weeks', url: 'https://www.cde.state.co.us/cdeprof/licensure' },
      { state: 'Hawaii', stateCode: 'HI', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Emergency hire option available. Military spouse expedited processing. May need Hawaii-specific assessment.', estimatedTimeline: '6-10 weeks', url: 'https://www.hawaiipublicschools.org/TeachingInHawaii/Licensing' },
      { state: 'Maryland', stateCode: 'MD', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Expedited processing for military spouses. Conditional certificate based on out-of-state credentials.', estimatedTimeline: '4-8 weeks', url: 'https://marylandpublicschools.org/about/Pages/DEE/Certification/index.aspx' },
    ],
  },
  {
    id: 'attorney',
    profession: 'Attorney',
    description: 'Attorneys must be licensed in each state where they practice. Military JAG officers and legal professionals face unique challenges when transitioning to civilian practice.',
    typicalRequirements: [
      'Juris Doctor (JD) from an ABA-accredited law school',
      'Pass the state bar exam',
      'Pass the Multistate Professional Responsibility Examination (MPRE)',
      'Character and fitness evaluation',
      'Continuing Legal Education (CLE) requirements',
    ],
    militaryConsiderations: [
      'Military JAG experience counts toward practice requirements in most states',
      'Some states allow military spouses to practice under supervision without full bar admission',
      'Uniform Bar Exam (UBE) is accepted in 40+ jurisdictions, making transfer easier',
      'Military Spouse JD Network provides support and resources',
    ],
    states: [
      { state: 'Texas', stateCode: 'TX', hasExpedited: false, hasMilitarySpouseProtection: true, transferProcess: 'UBE state. Military spouse temporary practice rule allows limited practice. Must pass TX bar or transfer UBE score.', estimatedTimeline: '3-6 months', url: 'https://www.txcourts.gov/ble/' },
      { state: 'Virginia', stateCode: 'VA', hasExpedited: false, hasMilitarySpouseProtection: true, transferProcess: 'UBE state. Military spouse provision for temporary practice under supervision. UBE score transfer accepted.', estimatedTimeline: '3-6 months', url: 'https://barexam.virginia.gov/' },
      { state: 'North Carolina', stateCode: 'NC', hasExpedited: false, hasMilitarySpouseProtection: true, transferProcess: 'UBE state. Military spouse temporary practice rule. Comity admission for experienced attorneys.', estimatedTimeline: '3-6 months', url: 'https://www.ncble.org/' },
      { state: 'California', stateCode: 'CA', hasExpedited: false, hasMilitarySpouseProtection: true, transferProcess: 'NOT a UBE state — must pass CA bar exam (one of the hardest). Military spouse registered legal services attorneys rule.', estimatedTimeline: '6-12 months', url: 'https://www.calbar.ca.gov/' },
      { state: 'Florida', stateCode: 'FL', hasExpedited: false, hasMilitarySpouseProtection: true, transferProcess: 'NOT a UBE state — must pass FL bar. Military spouse authorized house counsel rule. Relatively difficult transfer.', estimatedTimeline: '6-12 months', url: 'https://www.floridabar.org/' },
      { state: 'Washington', stateCode: 'WA', hasExpedited: false, hasMilitarySpouseProtection: true, transferProcess: 'UBE state. Military spouse limited license to practice. APR 8 — limited practice rule for military spouses.', estimatedTimeline: '3-6 months', url: 'https://www.wsba.org/' },
      { state: 'Georgia', stateCode: 'GA', hasExpedited: false, hasMilitarySpouseProtection: true, transferProcess: 'NOT a UBE state — must pass GA bar. Military spouse temporary practice provisions under court rules.', estimatedTimeline: '6-12 months', url: 'https://www.gabaradmissions.org/' },
      { state: 'Colorado', stateCode: 'CO', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'UBE state. Military spouse temporary practice. UBE score transfer. Expedited application review for military.', estimatedTimeline: '2-4 months', url: 'https://coloradosupremecourt.com/Future%20Lawyers/Admissions.asp' },
      { state: 'Hawaii', stateCode: 'HI', hasExpedited: false, hasMilitarySpouseProtection: true, transferProcess: 'UBE state. Military spouse rule for limited practice. UBE score transfer accepted.', estimatedTimeline: '3-6 months', url: 'https://www.courts.state.hi.us/courts/supreme/bbe' },
      { state: 'Maryland', stateCode: 'MD', hasExpedited: false, hasMilitarySpouseProtection: true, transferProcess: 'UBE state. Military spouse special authorization to practice. UBE score transfer. Comity for experienced attorneys.', estimatedTimeline: '3-6 months', url: 'https://mdcourts.gov/ble' },
    ],
  },
  {
    id: 'cpa',
    profession: 'CPA / Accountant',
    description: 'Certified Public Accountants must be licensed by state to perform audits and certain other accounting services. Military finance and comptroller experience provides strong preparation.',
    typicalRequirements: [
      '150 semester hours of college education (typically bachelor\'s + 30 additional hours)',
      'Pass all four sections of the Uniform CPA Examination',
      '1-2 years of supervised experience (varies by state)',
      'Ethics exam (in most states)',
      'Continuing Professional Education (CPE) requirements',
    ],
    militaryConsiderations: [
      'CPA Exam is uniform across all states — pass once, transfer anywhere',
      'Military finance, comptroller, and budget experience may count toward experience requirements',
      'GI Bill can cover the 150-hour education requirement',
      'Many firms actively recruit veterans for their discipline and security clearances',
    ],
    states: [
      { state: 'Texas', stateCode: 'TX', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'CPA mobility — practice privilege for out-of-state CPAs. Military spouse provisions. Accepts exam scores from other states.', estimatedTimeline: '4-8 weeks', url: 'https://www.tsbpa.texas.gov/' },
      { state: 'Virginia', stateCode: 'VA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Reciprocal licensing for licensed CPAs. Military spouse expedited review. Accepts uniform exam.', estimatedTimeline: '4-8 weeks', url: 'https://www.boa.virginia.gov/' },
      { state: 'North Carolina', stateCode: 'NC', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Reciprocity for out-of-state CPAs. Military spouse temporary practice privilege.', estimatedTimeline: '4-8 weeks', url: 'https://nccpaboard.gov/' },
      { state: 'California', stateCode: 'CA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Practice privilege for out-of-state CPAs. Military spouse temporary license. May need CA-specific ethics course.', estimatedTimeline: '6-10 weeks', url: 'https://www.dca.ca.gov/cba/' },
      { state: 'Florida', stateCode: 'FL', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Endorsement for out-of-state CPAs. Military spouse temporary license. Fee waivers available.', estimatedTimeline: '4-8 weeks', url: 'https://myfloridalicense.com/dbpr/certified-public-accounting/' },
      { state: 'Washington', stateCode: 'WA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Interstate mobility. Military spouse expedited processing. Reciprocity with all states.', estimatedTimeline: '4-6 weeks', url: 'https://acb.wa.gov/' },
      { state: 'Georgia', stateCode: 'GA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Reciprocity for licensed CPAs. Military spouse provisions. Accepts uniform exam.', estimatedTimeline: '4-8 weeks', url: 'https://gsba.georgia.gov/' },
      { state: 'Colorado', stateCode: 'CO', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Practice mobility for out-of-state CPAs. Military spouse expedited processing. Fee waivers.', estimatedTimeline: '2-4 weeks', url: 'https://dpo.colorado.gov/Accountancy' },
      { state: 'Hawaii', stateCode: 'HI', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Reciprocity based on uniform exam. Military spouse temporary practice. May need HI ethics course.', estimatedTimeline: '6-8 weeks', url: 'https://cca.hawaii.gov/pvl/boards/accountancy/' },
      { state: 'Maryland', stateCode: 'MD', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Reciprocity for out-of-state CPAs. Military spouse expedited licensing.', estimatedTimeline: '4-8 weeks', url: 'https://www.dllr.state.md.us/license/cpa/' },
    ],
  },
  {
    id: 'real-estate',
    profession: 'Real Estate Agent',
    description: 'Real estate agents must be licensed by state to help clients buy, sell, or rent properties. Popular career for military spouses due to flexibility and earning potential.',
    typicalRequirements: [
      'Complete pre-licensing education (60-180 hours depending on state)',
      'Pass state real estate exam',
      'Background check',
      'Work under a licensed broker',
      'Continuing education for renewal',
    ],
    militaryConsiderations: [
      'Many states offer expedited licensing for military spouses',
      'Some states allow temporary practice permits while transferring',
      'Knowledge of BAH, VA loans, and military housing is a competitive advantage',
      'Remote work possible for some tasks (client communication, marketing)',
      'Income resets with each PCS move — need to rebuild client base',
    ],
    states: [
      { state: 'Texas', stateCode: 'TX', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary license. Reciprocity for active license holders. Must complete TX-specific modules.', estimatedTimeline: '2-4 weeks', url: 'https://www.trec.texas.gov/' },
      { state: 'Virginia', stateCode: 'VA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Expedited for military spouses. May waive some pre-licensing hours with equivalent experience.', estimatedTimeline: '2-4 weeks', url: 'https://www.dpor.virginia.gov/Boards/Real-Estate' },
      { state: 'North Carolina', stateCode: 'NC', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary practice permit. Must pass NC exam portion. Expedited processing.', estimatedTimeline: '2-6 weeks', url: 'https://www.ncrec.gov/' },
      { state: 'California', stateCode: 'CA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Temporary practice for military spouses with out-of-state license. Must complete CA requirements within 12 months.', estimatedTimeline: '4-8 weeks', url: 'https://www.dre.ca.gov/' },
      { state: 'Florida', stateCode: 'FL', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Mutual recognition for active license holders. Military spouse fee waivers. Must pass FL law portion.', estimatedTimeline: '2-4 weeks', url: 'https://www.myfloridalicense.com/dbpr/real-estate-commission/' },
      { state: 'Washington', stateCode: 'WA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary practice. Expedited licensing. Some education reciprocity.', estimatedTimeline: '2-4 weeks', url: 'https://www.dol.wa.gov/business/realestate/' },
      { state: 'Georgia', stateCode: 'GA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary license. Must pass GA exam. Expedited processing.', estimatedTimeline: '2-6 weeks', url: 'https://grec.state.ga.us/' },
      { state: 'Colorado', stateCode: 'CO', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Expedited for military. Temporary license available. Some education waivers.', estimatedTimeline: '1-3 weeks', url: 'https://dpo.colorado.gov/RealEstate' },
      { state: 'Hawaii', stateCode: 'HI', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary license. Must complete HI pre-license education. Expedited review.', estimatedTimeline: '4-8 weeks', url: 'https://cca.hawaii.gov/reb/' },
      { state: 'Maryland', stateCode: 'MD', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary license. Reciprocity for active license holders. Must pass MD exam.', estimatedTimeline: '2-6 weeks', url: 'https://www.dllr.state.md.us/license/mrec/' },
    ],
  },
  {
    id: 'cosmetologist',
    profession: 'Cosmetologist / Barber',
    description: 'Cosmetologists and barbers must be licensed by state. Education hour requirements vary significantly (1000-2100 hours). Military spouse career that requires re-licensing at each duty station.',
    typicalRequirements: [
      'Complete cosmetology or barber school (1000-2100 hours depending on state)',
      'Pass written and practical exams',
      'Background check',
      'Continuing education for renewal',
    ],
    militaryConsiderations: [
      'Hour requirements vary dramatically between states — check before PCS',
      'Some states accept partial hours from other states',
      'On-base salons may have different licensing requirements',
      'Military spouse licensing reforms are actively being passed in many states',
      'Can be self-employed or work for a salon (flexible)',
    ],
    states: [
      { state: 'Texas', stateCode: 'TX', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary permit. Reciprocity for 1500+ hour programs. Expedited review.', estimatedTimeline: '2-4 weeks', url: 'https://www.tdlr.texas.gov/cosmet/cosmet.htm' },
      { state: 'Virginia', stateCode: 'VA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse expedited licensing. Accepts substantially equivalent training. Temporary permit available.', estimatedTimeline: '2-4 weeks', url: 'https://www.dpor.virginia.gov/Boards/Barbers-Cosmetology' },
      { state: 'North Carolina', stateCode: 'NC', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary permit. Must meet NC hour requirements (1500 hours) or demonstrate equivalence.', estimatedTimeline: '2-6 weeks', url: 'https://www.nccosmeticarts.com/' },
      { state: 'California', stateCode: 'CA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary license. Requires 1600 hours. Some reciprocity for equivalent programs.', estimatedTimeline: '4-8 weeks', url: 'https://www.barbercosmo.ca.gov/' },
      { state: 'Florida', stateCode: 'FL', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse fee waiver and expedited processing. 1200 hours required. Endorsement for out-of-state licensees.', estimatedTimeline: '2-4 weeks', url: 'https://www.myfloridalicense.com/dbpr/cosmetology/' },
      { state: 'Washington', stateCode: 'WA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse expedited licensing. 1600 hours required. Accepts equivalent training.', estimatedTimeline: '2-4 weeks', url: 'https://www.dol.wa.gov/business/cosmetology/' },
      { state: 'Georgia', stateCode: 'GA', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary permit. 1500 hours required. Expedited review for military families.', estimatedTimeline: '2-6 weeks', url: 'https://sos.ga.gov/georgia-board-cosmetology-and-barbers' },
      { state: 'Colorado', stateCode: 'CO', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Deregulated in 2020 — no state license required for most cosmetology services. Barbers still licensed.', estimatedTimeline: 'Immediate (cosmetology)', url: 'https://dpo.colorado.gov/OfficeOfBarberCosmetology' },
      { state: 'Hawaii', stateCode: 'HI', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary permit. 1800 hours required. Expedited processing.', estimatedTimeline: '4-8 weeks', url: 'https://cca.hawaii.gov/pvl/boards/barber/' },
      { state: 'Maryland', stateCode: 'MD', hasExpedited: true, hasMilitarySpouseProtection: true, transferProcess: 'Military spouse temporary license. 1500 hours required. Expedited processing.', estimatedTimeline: '2-6 weeks', url: 'https://www.dllr.state.md.us/license/cosmet/' },
    ],
  },
  {
    id: 'cdl',
    profession: 'Commercial Driver\'s License (CDL)',
    description: 'CDL is required to operate commercial motor vehicles. Military vehicle operators often have directly transferable skills and may qualify for expedited or waived testing.',
    typicalRequirements: [
      'Be at least 18 (intrastate) or 21 (interstate)',
      'Hold a valid driver\'s license',
      'Pass medical examination (DOT physical)',
      'Complete CDL training program (Entry Level Driver Training - ELDT)',
      'Pass written knowledge and skills (driving) tests',
    ],
    militaryConsiderations: [
      'Federal law exempts military CMV operators from the skills test (driving portion) in most cases',
      'Military vehicle operation experience counts toward CDL requirements',
      'Many states waive the skills test entirely for military with qualifying MOS/rating',
      'FMCSA Military Skills Test Waiver program streamlines the process',
      'Trucking companies actively recruit veterans — many offer sign-on bonuses',
      'GI Bill covers CDL training programs',
    ],
    states: [
      { state: 'Texas', stateCode: 'TX', hasExpedited: true, hasMilitarySpouseProtection: false, transferProcess: 'Military skills test waiver for qualifying military vehicle operators. Must pass knowledge test. Expedited processing.', estimatedTimeline: '1-2 weeks', url: 'https://www.dps.texas.gov/section/driver-license/commercial-driver-license-cdl' },
      { state: 'Virginia', stateCode: 'VA', hasExpedited: true, hasMilitarySpouseProtection: false, transferProcess: 'Military skills test waiver. Accepts military training as ELDT. Expedited processing for veterans.', estimatedTimeline: '1-2 weeks', url: 'https://www.dmv.virginia.gov/drivers/cdl.html' },
      { state: 'North Carolina', stateCode: 'NC', hasExpedited: true, hasMilitarySpouseProtection: false, transferProcess: 'Military skills test waiver. Must pass knowledge test. Fee waiver for veterans.', estimatedTimeline: '1-2 weeks', url: 'https://www.ncdot.gov/dmv/license-id/commercial/Pages/default.aspx' },
      { state: 'California', stateCode: 'CA', hasExpedited: true, hasMilitarySpouseProtection: false, transferProcess: 'Military skills test waiver. Must pass CA knowledge test. Expedited appointment scheduling for military.', estimatedTimeline: '2-4 weeks', url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/commercial-driver-license/' },
      { state: 'Florida', stateCode: 'FL', hasExpedited: true, hasMilitarySpouseProtection: false, transferProcess: 'Military skills test waiver. Expedited processing. Fee waiver for active duty.', estimatedTimeline: '1-2 weeks', url: 'https://www.flhsmv.gov/driver-licenses-id-cards/commercial-motor-vehicle-drivers/' },
      { state: 'Washington', stateCode: 'WA', hasExpedited: true, hasMilitarySpouseProtection: false, transferProcess: 'Military skills test waiver. Expedited licensing for military. Must pass knowledge test.', estimatedTimeline: '1-2 weeks', url: 'https://www.dol.wa.gov/driver/cdl.html' },
      { state: 'Georgia', stateCode: 'GA', hasExpedited: true, hasMilitarySpouseProtection: false, transferProcess: 'Military skills test waiver. Must pass knowledge test. No additional fees for military.', estimatedTimeline: '1-2 weeks', url: 'https://dds.georgia.gov/commercial-drivers-license' },
      { state: 'Colorado', stateCode: 'CO', hasExpedited: true, hasMilitarySpouseProtection: false, transferProcess: 'Military skills test waiver. Expedited processing. Must pass CO knowledge test.', estimatedTimeline: '1-2 weeks', url: 'https://dmv.colorado.gov/commercial-drivers-license' },
      { state: 'Hawaii', stateCode: 'HI', hasExpedited: true, hasMilitarySpouseProtection: false, transferProcess: 'Military skills test waiver. Must pass knowledge test. Limited CDL demand on islands.', estimatedTimeline: '2-4 weeks', url: 'https://hidot.hawaii.gov/highways/motor-vehicle-safety-office/' },
      { state: 'Maryland', stateCode: 'MD', hasExpedited: true, hasMilitarySpouseProtection: false, transferProcess: 'Military skills test waiver. Must pass knowledge test. Expedited appointments for military.', estimatedTimeline: '1-2 weeks', url: 'https://mva.maryland.gov/Pages/cdl.aspx' },
    ],
  },
]

// ─── General Licensing Resources ────────────────────────────────────

export interface LicensingResource {
  name: string
  url: string
  description: string
}

export const generalLicensingResources: LicensingResource[] = [
  {
    name: 'DOL Veterans License & Certification Finder',
    url: 'https://www.veterans.gov/careers-employment/skills-translator/',
    description: 'Department of Labor tool to translate military skills to civilian credentials and find licensing requirements by state.',
  },
  {
    name: 'Military Spouse Licensing Map — DOD',
    url: 'https://myseco.militaryonesource.mil/portal/article/professional-license-and-certification',
    description: 'DoD resource tracking state-by-state military spouse licensing laws and protections.',
  },
  {
    name: 'National Conference of State Legislatures — Military Spouse Licensing',
    url: 'https://www.ncsl.org/labor-and-employment/military-spouse-licensure',
    description: 'Tracks legislation across all 50 states related to military spouse occupational licensing portability.',
  },
  // TODO: Verify URL is still active — NCSL restructures URLs periodically
  {
    name: 'Hiring Our Heroes — Military Spouse Employment',
    url: 'https://www.hiringourheroes.org/military-spouses/',
    description: 'U.S. Chamber of Commerce Foundation resources for military spouse employment and licensing challenges.',
  },
]

// ─── Helper Functions ───────────────────────────────────────────────

export function getLicenseByProfession(professionId: string): ProfessionalLicense | undefined {
  return professionalLicenses.find((l) => l.id === professionId)
}

export function getStateInfo(
  professionId: string,
  stateCode: string
): StateLicenseInfo | undefined {
  const license = getLicenseByProfession(professionId)
  if (!license) return undefined
  return license.states.find((s) => s.stateCode === stateCode)
}

export function getStatesWithExpedited(professionId: string): StateLicenseInfo[] {
  const license = getLicenseByProfession(professionId)
  if (!license) return []
  return license.states.filter((s) => s.hasExpedited)
}

export function getStatesWithSpouseProtection(professionId: string): StateLicenseInfo[] {
  const license = getLicenseByProfession(professionId)
  if (!license) return []
  return license.states.filter((s) => s.hasMilitarySpouseProtection)
}

export function getAllProfessions(): Array<{ id: string; profession: string }> {
  return professionalLicenses.map((l) => ({ id: l.id, profession: l.profession }))
}
