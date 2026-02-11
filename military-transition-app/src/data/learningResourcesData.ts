/**
 * Learning Resources Data
 *
 * Curated learning platforms and certification paths for military members
 * transitioning to civilian careers. Ported from SpouseForce (SF-K5)
 * and expanded for MTT's broader audience.
 *
 * All URLs verified as of February 2026.
 */

export interface LearningResource {
  id: string
  name: string
  url: string
  category: 'certification' | 'degree' | 'skills_training' | 'free_course' | 'military_specific'
  cost: 'free' | 'paid' | 'gi_bill' | 'mycaa' | 'scholarship'
  costDetails?: string
  description: string
  careerFields: string[]
  certifications?: string[]
  militaryFriendly: boolean
  tags: string[]
}

export const learningResources: LearningResource[] = [
  // ─── Google Career Certificates ─────────────────────────────────
  {
    id: 'google-it-support',
    name: 'Google IT Support Professional Certificate',
    url: 'https://grow.google/certificates/it-support/',
    category: 'certification',
    cost: 'paid',
    costDetails: '$49/month on Coursera; financial aid available; free for veterans through Grow with Google',
    description: 'Entry-level IT support skills including troubleshooting, networking, operating systems, system administration, and security. No prior experience required. Prepares for CompTIA A+ exam.',
    careerFields: ['IT', 'help_desk', 'system_administration'],
    certifications: ['Google IT Support Professional Certificate'],
    militaryFriendly: true,
    tags: ['entry-level', 'no-experience', 'remote-friendly', 'google'],
  },
  {
    id: 'google-cybersecurity',
    name: 'Google Cybersecurity Professional Certificate',
    url: 'https://grow.google/certificates/cybersecurity/',
    category: 'certification',
    cost: 'paid',
    costDetails: '$49/month on Coursera; financial aid available',
    description: 'Learn to identify common risks, threats, and vulnerabilities. Gain hands-on experience with Python, Linux, SQL, SIEM tools, and IDS. Prepares for CompTIA Security+ exam.',
    careerFields: ['cybersecurity', 'IT', 'information_security'],
    certifications: ['Google Cybersecurity Professional Certificate'],
    militaryFriendly: true,
    tags: ['high-demand', 'security-clearance-helpful', 'remote-friendly', 'google'],
  },
  {
    id: 'google-data-analytics',
    name: 'Google Data Analytics Professional Certificate',
    url: 'https://grow.google/certificates/data-analytics/',
    category: 'certification',
    cost: 'paid',
    costDetails: '$49/month on Coursera; financial aid available',
    description: 'Learn data cleaning, analysis, and visualization using spreadsheets, SQL, R, and Tableau. No prior experience required.',
    careerFields: ['data_analytics', 'business_intelligence', 'IT'],
    certifications: ['Google Data Analytics Professional Certificate'],
    militaryFriendly: true,
    tags: ['entry-level', 'no-experience', 'remote-friendly', 'google'],
  },
  {
    id: 'google-project-management',
    name: 'Google Project Management Professional Certificate',
    url: 'https://grow.google/certificates/project-management/',
    category: 'certification',
    cost: 'paid',
    costDetails: '$49/month on Coursera; financial aid available',
    description: 'Learn project management fundamentals including Agile methodologies. Military leadership experience translates well. Prepares for CAPM certification.',
    careerFields: ['project_management', 'operations', 'leadership'],
    certifications: ['Google Project Management Professional Certificate'],
    militaryFriendly: true,
    tags: ['leadership-transition', 'remote-friendly', 'google'],
  },
  {
    id: 'google-ux-design',
    name: 'Google UX Design Professional Certificate',
    url: 'https://grow.google/certificates/ux-design/',
    category: 'certification',
    cost: 'paid',
    costDetails: '$49/month on Coursera; financial aid available',
    description: 'Learn the UX design process including user research, wireframing, prototyping, and usability testing using Figma and Adobe XD.',
    careerFields: ['ux_design', 'product_design', 'IT'],
    certifications: ['Google UX Design Professional Certificate'],
    militaryFriendly: true,
    tags: ['creative', 'remote-friendly', 'google'],
  },

  // ─── AWS Certifications ─────────────────────────────────────────
  {
    id: 'aws-cloud-practitioner',
    name: 'AWS Certified Cloud Practitioner',
    url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    category: 'certification',
    cost: 'paid',
    costDetails: '$100 exam fee; free training on AWS Skill Builder; discounts for veterans',
    description: 'Foundational understanding of AWS Cloud, services, pricing, and support. Good first step into cloud computing careers.',
    careerFields: ['cloud_computing', 'IT', 'devops'],
    certifications: ['AWS Certified Cloud Practitioner'],
    militaryFriendly: true,
    tags: ['entry-level', 'cloud', 'high-demand'],
  },
  {
    id: 'aws-solutions-architect',
    name: 'AWS Certified Solutions Architect - Associate',
    url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    category: 'certification',
    cost: 'paid',
    costDetails: '$150 exam fee; free training on AWS Skill Builder',
    description: 'Design and deploy scalable, fault-tolerant systems on AWS. One of the most in-demand cloud certifications. Requires some cloud experience.',
    careerFields: ['cloud_computing', 'IT', 'software_architecture'],
    certifications: ['AWS Solutions Architect Associate'],
    militaryFriendly: true,
    tags: ['intermediate', 'cloud', 'high-demand', 'high-salary'],
  },

  // ─── CompTIA Certifications ─────────────────────────────────────
  {
    id: 'comptia-a-plus',
    name: 'CompTIA A+',
    url: 'https://www.comptia.org/certifications/a',
    category: 'certification',
    cost: 'paid',
    costDetails: '$246 per exam (two exams required); DoD 8570/8140 approved; GI Bill eligible at many training providers',
    description: 'Industry-standard entry-level IT certification. Covers hardware, networking, mobile devices, OS troubleshooting, and security. Required for many DoD IT positions.',
    careerFields: ['IT', 'help_desk', 'system_administration'],
    certifications: ['CompTIA A+'],
    militaryFriendly: true,
    tags: ['entry-level', 'dod-approved', 'widely-recognized'],
  },
  {
    id: 'comptia-security-plus',
    name: 'CompTIA Security+',
    url: 'https://www.comptia.org/certifications/security',
    category: 'certification',
    cost: 'paid',
    costDetails: '$392 exam fee; DoD 8570/8140 approved; GI Bill eligible at many training providers',
    description: 'Globally recognized cybersecurity certification. Covers network security, compliance, threats/vulnerabilities, identity management, and cryptography. Baseline requirement for many DoD cyber roles.',
    careerFields: ['cybersecurity', 'IT', 'information_security'],
    certifications: ['CompTIA Security+'],
    militaryFriendly: true,
    tags: ['high-demand', 'dod-approved', 'security-clearance-helpful', 'widely-recognized'],
  },
  {
    id: 'comptia-network-plus',
    name: 'CompTIA Network+',
    url: 'https://www.comptia.org/certifications/network',
    category: 'certification',
    cost: 'paid',
    costDetails: '$348 exam fee; DoD 8570/8140 approved',
    description: 'Validates networking skills including troubleshooting, configuring, and managing wired and wireless networks. Good stepping stone between A+ and Security+.',
    careerFields: ['IT', 'networking', 'system_administration'],
    certifications: ['CompTIA Network+'],
    militaryFriendly: true,
    tags: ['intermediate', 'dod-approved', 'networking'],
  },

  // ─── Project Management ─────────────────────────────────────────
  {
    id: 'pmi-pmp',
    name: 'Project Management Professional (PMP)',
    url: 'https://www.pmi.org/certifications/project-management-pmp',
    category: 'certification',
    cost: 'paid',
    costDetails: '$405 (PMI member) or $555 (non-member); requires 36 months project leadership experience (military counts)',
    description: 'Gold-standard project management certification. Military officers and NCOs often already have qualifying experience from leading operations, training, and deployments.',
    careerFields: ['project_management', 'operations', 'leadership', 'consulting'],
    certifications: ['PMP'],
    militaryFriendly: true,
    tags: ['leadership-transition', 'high-salary', 'widely-recognized'],
  },
  {
    id: 'pmi-capm',
    name: 'Certified Associate in Project Management (CAPM)',
    url: 'https://www.pmi.org/certifications/certified-associate-capm',
    category: 'certification',
    cost: 'paid',
    costDetails: '$225 (PMI member) or $300 (non-member); no experience required',
    description: 'Entry-level project management certification. Good stepping stone to PMP. Requires 23 hours of PM education (Google PM cert counts).',
    careerFields: ['project_management', 'operations'],
    certifications: ['CAPM'],
    militaryFriendly: true,
    tags: ['entry-level', 'leadership-transition'],
  },

  // ─── Cybersecurity ──────────────────────────────────────────────
  {
    id: 'sans-giac',
    name: 'SANS Institute / GIAC Certifications',
    url: 'https://www.sans.org/cyber-security-courses/',
    category: 'certification',
    cost: 'paid',
    costDetails: '$7,000-$9,000 per course; GI Bill accepted at SANS; scholarships available for veterans',
    description: 'Premier cybersecurity training. GIAC certifications are highly respected in the industry. SANS offers veteran-specific scholarships and GI Bill-funded training.',
    careerFields: ['cybersecurity', 'information_security', 'incident_response', 'penetration_testing'],
    certifications: ['GIAC Security Essentials (GSEC)', 'GIAC Certified Incident Handler (GCIH)', 'GIAC Certified Enterprise Defender (GCED)'],
    militaryFriendly: true,
    tags: ['advanced', 'high-salary', 'security-clearance-helpful', 'gi-bill-eligible'],
  },

  // ─── Salesforce ─────────────────────────────────────────────────
  {
    id: 'salesforce-trailhead',
    name: 'Salesforce Trailhead',
    url: 'https://trailhead.salesforce.com/',
    category: 'free_course',
    cost: 'free',
    costDetails: 'All learning content is free; certification exams $200 each; Salesforce Military program offers free vouchers',
    description: 'Free, gamified learning platform for Salesforce skills. Salesforce is one of the most in-demand enterprise platforms. The Salesforce Military program specifically supports veterans.',
    careerFields: ['salesforce_admin', 'salesforce_developer', 'CRM', 'IT'],
    certifications: ['Salesforce Administrator', 'Salesforce Platform Developer I'],
    militaryFriendly: true,
    tags: ['free', 'high-demand', 'remote-friendly', 'veteran-program'],
  },

  // ─── Free Learning Platforms ────────────────────────────────────
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/',
    category: 'free_course',
    cost: 'free',
    description: 'Completely free, self-paced coding curriculum. Covers web development, JavaScript, Python, data science, and machine learning. Includes portfolio projects.',
    careerFields: ['software_development', 'web_development', 'data_science'],
    certifications: ['freeCodeCamp certifications (not industry-recognized but good for portfolios)'],
    militaryFriendly: false,
    tags: ['free', 'self-paced', 'coding', 'beginner-friendly'],
  },
  {
    id: 'coursera',
    name: 'Coursera',
    url: 'https://www.coursera.org/',
    category: 'skills_training',
    cost: 'paid',
    costDetails: 'Free to audit most courses; $49-$79/month for certificates; financial aid available; some courses GI Bill eligible through partner universities',
    description: 'Online learning platform with courses from top universities and companies. Hosts Google, IBM, and Meta professional certificates. Many courses free to audit.',
    careerFields: ['IT', 'business', 'data_science', 'healthcare', 'leadership'],
    militaryFriendly: true,
    tags: ['flexible', 'university-backed', 'wide-selection'],
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    url: 'https://www.linkedin.com/learning/',
    category: 'skills_training',
    cost: 'paid',
    costDetails: '$29.99/month; free with many library cards; free for active duty through DOD MWR libraries',
    description: 'Video courses on business, technology, and creative skills. Integrates with LinkedIn profile for professional visibility. Many military installations provide free access.',
    careerFields: ['IT', 'business', 'leadership', 'project_management', 'data_analytics'],
    militaryFriendly: true,
    tags: ['professional-development', 'linkedin-integration', 'library-access'],
  },

  // ─── Microsoft Certifications ───────────────────────────────────
  {
    id: 'microsoft-azure-fundamentals',
    name: 'Microsoft Azure Fundamentals (AZ-900)',
    url: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/',
    category: 'certification',
    cost: 'paid',
    costDetails: '$99 exam fee; free training on Microsoft Learn; Microsoft Software and Systems Academy (MSSA) for transitioning military is free',
    description: 'Entry-level Azure cloud certification. Microsoft Learn provides free training materials. The MSSA program specifically helps transitioning service members get certified.',
    careerFields: ['cloud_computing', 'IT', 'system_administration'],
    certifications: ['Microsoft Certified: Azure Fundamentals'],
    militaryFriendly: true,
    tags: ['entry-level', 'cloud', 'free-training', 'mssa'],
  },

  // ─── Military-Specific Programs ─────────────────────────────────
  {
    id: 'mycaa',
    name: 'My Career Advancement Account (MyCAA)',
    url: 'https://myseco.militaryonesource.mil/portal/article/my-career-advancement-account',
    category: 'military_specific',
    cost: 'scholarship',
    costDetails: 'Up to $4,000 (max $2,000/year) for military spouses; covers licenses, certifications, and associate degrees',
    description: 'DoD scholarship for military spouses to pursue licenses, certifications, or associate degrees in portable career fields. Covers tuition, fees, and some exam costs.',
    careerFields: ['healthcare', 'IT', 'education', 'business', 'financial_services'],
    militaryFriendly: true,
    tags: ['spouse-program', 'scholarship', 'free-funding'],
  },
  {
    id: 'vet-tec',
    name: 'VET TEC (Veteran Employment Through Technology Education Courses)',
    url: 'https://www.va.gov/education/about-gi-bill-benefits/how-to-use-benefits/vet-tec/',
    category: 'military_specific',
    cost: 'gi_bill',
    costDetails: 'No GI Bill entitlement used; VA pays tuition directly to training provider plus housing allowance',
    description: 'VA program that pays for high-tech training programs (coding bootcamps, IT, data science) without using GI Bill benefits. Includes housing allowance during training.',
    careerFields: ['software_development', 'IT', 'data_science', 'cybersecurity', 'computer_programming'],
    militaryFriendly: true,
    tags: ['free', 'no-gi-bill-cost', 'bootcamp', 'housing-allowance', 'high-demand'],
  },
  {
    id: 'onward-to-opportunity',
    name: 'Onward to Opportunity (O2O) — Syracuse IVMF',
    url: 'https://ivmf.syracuse.edu/onward-to-opportunity/',
    category: 'military_specific',
    cost: 'free',
    description: 'Free career training for transitioning service members, veterans, and military spouses. Offers industry-recognized certifications in IT, business, and customer service. Includes career coaching and job placement support.',
    careerFields: ['IT', 'business', 'project_management', 'customer_service', 'cybersecurity'],
    certifications: ['CompTIA certifications', 'SHRM', 'PMP prep', 'Google certificates'],
    militaryFriendly: true,
    tags: ['free', 'career-coaching', 'job-placement', 'veteran-program'],
  },
  {
    id: 'hiring-our-heroes',
    name: 'Hiring Our Heroes Corporate Fellowship',
    url: 'https://www.hiringourheroes.org/fellowships/',
    category: 'military_specific',
    cost: 'free',
    costDetails: 'Free 12-week fellowship during last 6 months of service; participants remain on military pay',
    description: 'U.S. Chamber of Commerce Foundation program that places transitioning service members in 12-week fellowships with top companies. Many fellowships convert to full-time offers.',
    careerFields: ['business', 'operations', 'IT', 'leadership', 'project_management'],
    militaryFriendly: true,
    tags: ['fellowship', 'hands-on', 'job-placement', 'top-companies'],
  },
  {
    id: 'skillbridge',
    name: 'DoD SkillBridge',
    url: 'https://skillbridge.osd.mil/',
    category: 'military_specific',
    cost: 'free',
    costDetails: 'Free; participants remain on active duty pay and benefits during training/internship',
    description: 'DoD program allowing service members to participate in civilian job training, internships, or apprenticeships during their last 180 days of service. Over 3,000 partner organizations.',
    careerFields: ['IT', 'trades', 'business', 'healthcare', 'manufacturing', 'logistics'],
    militaryFriendly: true,
    tags: ['internship', 'last-180-days', 'on-active-duty-pay', 'wide-selection'],
  },
  {
    id: 'mssa',
    name: 'Microsoft Software and Systems Academy (MSSA)',
    url: 'https://military.microsoft.com/mssa/',
    category: 'military_specific',
    cost: 'free',
    costDetails: 'Free 17-week program for transitioning service members; includes Microsoft certification and job placement',
    description: 'Free 17-week training program for transitioning service members. Covers cloud development, cloud administration, cybersecurity, or database/business intelligence. Graduates get Microsoft certifications and interview at Microsoft and partners.',
    careerFields: ['cloud_computing', 'IT', 'cybersecurity', 'data_analytics', 'software_development'],
    certifications: ['Microsoft Azure certifications'],
    militaryFriendly: true,
    tags: ['free', 'microsoft', 'job-placement', 'certification-included'],
  },
]

/**
 * Get resources filtered by category.
 */
export function getResourcesByCategory(
  category: LearningResource['category']
): LearningResource[] {
  return learningResources.filter((r) => r.category === category)
}

/**
 * Get resources filtered by career field.
 */
export function getResourcesByCareerField(field: string): LearningResource[] {
  return learningResources.filter((r) =>
    r.careerFields.some((f) => f.toLowerCase() === field.toLowerCase())
  )
}

/**
 * Get only free resources.
 */
export function getFreeResources(): LearningResource[] {
  return learningResources.filter(
    (r) => r.cost === 'free' || r.cost === 'scholarship'
  )
}

/**
 * Get military-specific programs.
 */
export function getMilitaryPrograms(): LearningResource[] {
  return learningResources.filter((r) => r.category === 'military_specific')
}
