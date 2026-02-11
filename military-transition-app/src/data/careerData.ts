/**
 * Career Data for Military Transition Toolkit
 *
 * 30+ career profiles mapped to military experience and skills.
 * Each profile includes salary ranges, growth outlook, required
 * certifications, and which military backgrounds are the best fit.
 */

export interface CareerProfile {
  id: string
  title: string
  category: CareerCategory
  description: string
  avgSalary: number          // median annual salary
  salaryRange: [number, number]
  growthOutlook: GrowthOutlook
  growthPercent: number      // projected 10-year growth %
  education: EducationLevel
  certifications: string[]
  relatedMOS: string[]       // military occupational specialties / AFSCs / ratings
  skillsRequired: string[]
  transitionDifficulty: TransitionDifficulty
  veteranAdvantage: string   // why military experience helps
  resources: string[]        // links or program names
}

export type CareerCategory =
  | 'technology'
  | 'healthcare'
  | 'trades'
  | 'business'
  | 'government'
  | 'education'
  | 'logistics'
  | 'security'
  | 'finance'

export type GrowthOutlook = 'high' | 'moderate' | 'stable' | 'declining'
export type EducationLevel = 'high-school' | 'associate' | 'bachelor' | 'master' | 'doctorate' | 'certification'
export type TransitionDifficulty = 'easy' | 'moderate' | 'challenging'

export interface AssessmentQuestion {
  id: string
  text: string
  category: string
  options: AssessmentOption[]
}

export interface AssessmentOption {
  label: string
  value: string
  careerWeights: Record<CareerCategory, number>  // -1 to 3 weight
}

// ─── Career Profiles ──────────────────────────────────────────────

export const CAREER_PROFILES: CareerProfile[] = [
  // ── Technology ──
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'technology',
    description: 'Protect organizations from cyber threats by monitoring networks, investigating breaches, and implementing security measures.',
    avgSalary: 112000,
    salaryRange: [75000, 160000],
    growthOutlook: 'high',
    growthPercent: 32,
    education: 'bachelor',
    certifications: ['Security+', 'CISSP', 'CEH', 'CISM'],
    relatedMOS: ['25D', '17C', '35Q', '1B4X1', 'CTN'],
    skillsRequired: ['Network security', 'Threat analysis', 'Incident response', 'Risk assessment'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military cyber and signals intelligence experience translates directly. Security clearances are highly valued.',
    resources: ['VET TEC', 'DoD Cyber Workforce', 'SANS VetSuccess'],
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'technology',
    description: 'Design, build, and maintain software applications. One of the highest-demand career fields with strong remote work options.',
    avgSalary: 124000,
    salaryRange: [65000, 200000],
    growthOutlook: 'high',
    growthPercent: 25,
    education: 'bachelor',
    certifications: ['AWS Certified', 'Azure Fundamentals', 'Google Cloud'],
    relatedMOS: ['25B', '17C', '0671', '3D0X4'],
    skillsRequired: ['Programming', 'Problem solving', 'System design', 'Version control'],
    transitionDifficulty: 'moderate',
    veteranAdvantage: 'Military discipline and mission-driven mindset valued in tech. Many coding bootcamps offer vet scholarships.',
    resources: ['VET TEC', 'Operation Code', 'Code Platoon', 'Galvanize Veterans'],
  },
  {
    id: 'it-project-manager',
    title: 'IT Project Manager',
    category: 'technology',
    description: 'Lead technology projects from planning through delivery. Military leadership experience is a strong advantage.',
    avgSalary: 98000,
    salaryRange: [70000, 145000],
    growthOutlook: 'moderate',
    growthPercent: 15,
    education: 'bachelor',
    certifications: ['PMP', 'CAPM', 'Agile/Scrum Master', 'ITIL'],
    relatedMOS: ['25A', '255A', '0602', '17D'],
    skillsRequired: ['Project planning', 'Stakeholder management', 'Budgeting', 'Agile methodology'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military officers and senior NCOs have extensive project/mission planning experience that maps directly to PM roles.',
    resources: ['PMP Exam Prep (GI Bill)', 'PMI Military Discount', 'Hiring Our Heroes'],
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'technology',
    description: 'Design, deploy, and manage cloud infrastructure. Rapidly growing field with excellent compensation.',
    avgSalary: 118000,
    salaryRange: [80000, 175000],
    growthOutlook: 'high',
    growthPercent: 28,
    education: 'bachelor',
    certifications: ['AWS Solutions Architect', 'Azure Administrator', 'Google Cloud Engineer'],
    relatedMOS: ['25B', '25N', '3D1X1', '0631'],
    skillsRequired: ['Cloud platforms', 'Networking', 'Automation', 'Infrastructure as Code'],
    transitionDifficulty: 'moderate',
    veteranAdvantage: 'Military IT and communications specialists have strong infrastructure foundations. VET TEC covers cloud training.',
    resources: ['VET TEC', 'AWS re/Start', 'Microsoft MSSA'],
  },

  // ── Healthcare ──
  {
    id: 'registered-nurse',
    title: 'Registered Nurse',
    category: 'healthcare',
    description: 'Provide patient care in hospitals, clinics, and community settings. High demand with many specialization paths.',
    avgSalary: 81000,
    salaryRange: [60000, 120000],
    growthOutlook: 'high',
    growthPercent: 6,
    education: 'associate',
    certifications: ['NCLEX-RN', 'BLS', 'ACLS'],
    relatedMOS: ['68C', '66H', 'HM', '4N0X1'],
    skillsRequired: ['Patient assessment', 'Clinical skills', 'Critical thinking', 'Communication'],
    transitionDifficulty: 'moderate',
    veteranAdvantage: 'Military medics and corpsmen have hands-on clinical experience. Many bridge programs exist for military medical personnel.',
    resources: ['USMAP', 'VA Nursing Academy', 'GI Bill Nursing Programs'],
  },
  {
    id: 'physician-assistant',
    title: 'Physician Assistant',
    category: 'healthcare',
    description: 'Diagnose illness, develop treatment plans, and prescribe medication under physician supervision.',
    avgSalary: 126000,
    salaryRange: [90000, 170000],
    growthOutlook: 'high',
    growthPercent: 28,
    education: 'master',
    certifications: ['PANCE', 'NCCPA'],
    relatedMOS: ['68W', '18D', 'HM-8404', 'IDMT'],
    skillsRequired: ['Clinical medicine', 'Diagnostics', 'Patient management', 'Pharmacology'],
    transitionDifficulty: 'challenging',
    veteranAdvantage: 'Special Forces medics and experienced corpsmen have advanced clinical experience that strengthens PA school applications.',
    resources: ['IPAP (military PA program)', 'GI Bill', 'HPSP'],
  },
  {
    id: 'healthcare-administrator',
    title: 'Healthcare Administrator',
    category: 'healthcare',
    description: 'Manage operations of healthcare facilities including budgets, staff, compliance, and quality improvement.',
    avgSalary: 104000,
    salaryRange: [65000, 155000],
    growthOutlook: 'high',
    growthPercent: 28,
    education: 'bachelor',
    certifications: ['FACHE', 'CPHQ'],
    relatedMOS: ['70A', '67J', 'HCA', '4A0X1'],
    skillsRequired: ['Healthcare operations', 'Budgeting', 'Regulatory compliance', 'Leadership'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military healthcare administrators manage complex medical operations and budgets — directly transferable skills.',
    resources: ['ACHE Military Program', 'GI Bill MHA Programs'],
  },

  // ── Trades ──
  {
    id: 'electrician',
    title: 'Electrician',
    category: 'trades',
    description: 'Install, maintain, and repair electrical systems in buildings and infrastructure. Strong job security and earning potential.',
    avgSalary: 61000,
    salaryRange: [38000, 100000],
    growthOutlook: 'moderate',
    growthPercent: 11,
    education: 'high-school',
    certifications: ['Journeyman License', 'Master Electrician'],
    relatedMOS: ['12R', '1141', '3E0X1'],
    skillsRequired: ['Electrical systems', 'Blueprint reading', 'NEC codes', 'Troubleshooting'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military electrical specialists often qualify for accelerated apprenticeship credit through USMAP.',
    resources: ['USMAP', 'HELMETS to HARDHATS', 'IBEW Veterans Program'],
  },
  {
    id: 'hvac-technician',
    title: 'HVAC Technician',
    category: 'trades',
    description: 'Install and repair heating, ventilation, air conditioning, and refrigeration systems.',
    avgSalary: 51000,
    salaryRange: [34000, 80000],
    growthOutlook: 'moderate',
    growthPercent: 9,
    education: 'high-school',
    certifications: ['EPA 608', 'NATE Certification', 'R-410A'],
    relatedMOS: ['91C', '1161', '3E1X1'],
    skillsRequired: ['Mechanical systems', 'Refrigerant handling', 'Electrical fundamentals', 'Customer service'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military HVAC and utilities specialists have direct experience. USMAP apprenticeships count toward journeyman hours.',
    resources: ['USMAP', 'HELMETS to HARDHATS', 'UA Veterans Program'],
  },
  {
    id: 'commercial-driver',
    title: 'Commercial Driver (CDL)',
    category: 'trades',
    description: 'Operate commercial vehicles for freight transport. High demand with relatively quick entry.',
    avgSalary: 49000,
    salaryRange: [35000, 85000],
    growthOutlook: 'moderate',
    growthPercent: 6,
    education: 'high-school',
    certifications: ['CDL Class A', 'HazMat Endorsement', 'TWIC Card'],
    relatedMOS: ['88M', '3531', '2T1X1'],
    skillsRequired: ['Vehicle operation', 'Logistics', 'Route planning', 'DOT regulations'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military truck drivers can often waive CDL skills test. Many states have military CDL reciprocity.',
    resources: ['Military CDL Waiver Program', 'Troops to Trucks', 'GI Bill CDL Training'],
  },
  {
    id: 'welder',
    title: 'Welder / Fabricator',
    category: 'trades',
    description: 'Join metal parts using various welding techniques for construction, manufacturing, and repair.',
    avgSalary: 47000,
    salaryRange: [33000, 75000],
    growthOutlook: 'stable',
    growthPercent: 2,
    education: 'high-school',
    certifications: ['AWS Certified Welder', 'CWI'],
    relatedMOS: ['91E', '1316', '3E1X1'],
    skillsRequired: ['Welding techniques', 'Blueprint reading', 'Metal fabrication', 'Quality inspection'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military welders and metal workers have hands-on experience. USMAP provides apprenticeship credit.',
    resources: ['USMAP', 'HELMETS to HARDHATS', 'AWS Foundation'],
  },

  // ── Business ──
  {
    id: 'operations-manager',
    title: 'Operations Manager',
    category: 'business',
    description: 'Oversee daily business operations, streamline processes, and manage teams to meet organizational goals.',
    avgSalary: 97000,
    salaryRange: [55000, 150000],
    growthOutlook: 'stable',
    growthPercent: 4,
    education: 'bachelor',
    certifications: ['Six Sigma', 'PMP', 'CSCP'],
    relatedMOS: ['90A', '0402', '21M'],
    skillsRequired: ['Process improvement', 'Team leadership', 'Budget management', 'Strategic planning'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military officers and senior NCOs have extensive leadership and operational planning experience.',
    resources: ['Hiring Our Heroes', 'American Corporate Partners', 'Veterati'],
  },
  {
    id: 'supply-chain-manager',
    title: 'Supply Chain Manager',
    category: 'business',
    description: 'Manage procurement, logistics, and distribution to optimize supply chain efficiency.',
    avgSalary: 93000,
    salaryRange: [55000, 140000],
    growthOutlook: 'high',
    growthPercent: 18,
    education: 'bachelor',
    certifications: ['CSCP', 'CPSM', 'CPIM'],
    relatedMOS: ['92A', '0431', '2G0X1', '3002'],
    skillsRequired: ['Logistics planning', 'Inventory management', 'Vendor relations', 'Data analysis'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military logistics and supply chain roles translate directly. DoD supply management experience is highly valued.',
    resources: ['APICS Military Scholarship', 'Hiring Our Heroes', 'FourBlock'],
  },
  {
    id: 'human-resources-manager',
    title: 'Human Resources Manager',
    category: 'business',
    description: 'Manage recruiting, employee relations, benefits administration, and organizational development.',
    avgSalary: 81000,
    salaryRange: [52000, 130000],
    growthOutlook: 'moderate',
    growthPercent: 5,
    education: 'bachelor',
    certifications: ['PHR', 'SPHR', 'SHRM-CP'],
    relatedMOS: ['42A', '0111', '3F0X1'],
    skillsRequired: ['Talent management', 'Employment law', 'Conflict resolution', 'Benefits administration'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military HR and personnel specialists have direct experience in workforce management, compliance, and administration.',
    resources: ['SHRM Military Transition', 'Hiring Our Heroes'],
  },

  // ── Government ──
  {
    id: 'federal-law-enforcement',
    title: 'Federal Law Enforcement',
    category: 'government',
    description: 'Serve as a federal agent or officer with agencies like CBP, FBI, Secret Service, or federal police.',
    avgSalary: 87000,
    salaryRange: [55000, 135000],
    growthOutlook: 'stable',
    growthPercent: 3,
    education: 'bachelor',
    certifications: ['FLETC Training', 'Agency-specific certs'],
    relatedMOS: ['31B', '5811', '3P0X1', 'MA'],
    skillsRequired: ['Law enforcement', 'Investigation', 'Physical fitness', 'Legal knowledge'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Veterans receive hiring preference. Military police and security forces have directly applicable experience and clearances.',
    resources: ['Veterans Preference', 'USAJOBS', 'FedsHireVets'],
  },
  {
    id: 'intelligence-analyst',
    title: 'Intelligence Analyst (Government)',
    category: 'government',
    description: 'Analyze intelligence data for government agencies to support national security decisions.',
    avgSalary: 94000,
    salaryRange: [60000, 140000],
    growthOutlook: 'moderate',
    growthPercent: 8,
    education: 'bachelor',
    certifications: ['TS/SCI Clearance', 'GEOINT Cert', 'SIGINT Cert'],
    relatedMOS: ['35F', '35N', '0231', '1N0X1', 'IS'],
    skillsRequired: ['Intelligence analysis', 'Report writing', 'Geospatial tools', 'Critical thinking'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military intelligence analysts have active clearances and direct analytical experience. Clearances alone are worth $15-30K in salary premium.',
    resources: ['USAJOBS', 'Intelligence Community Centers', 'ClearanceJobs'],
  },
  {
    id: 'emergency-manager',
    title: 'Emergency Management Director',
    category: 'government',
    description: 'Plan and coordinate disaster response for government agencies and organizations.',
    avgSalary: 79000,
    salaryRange: [50000, 120000],
    growthOutlook: 'moderate',
    growthPercent: 3,
    education: 'bachelor',
    certifications: ['CEM', 'AEM', 'FEMA ICS certs'],
    relatedMOS: ['57A', 'CBRN', '3E9X1'],
    skillsRequired: ['Disaster planning', 'Incident command', 'Resource coordination', 'Public communication'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military CBRN, logistics, and command experience directly translates. ICS/NIMS training often completed during service.',
    resources: ['FEMA Emergency Management Institute', 'IAEM Military Division'],
  },

  // ── Education ──
  {
    id: 'k12-teacher',
    title: 'K-12 Teacher',
    category: 'education',
    description: 'Teach subjects in public or private schools. Many states offer alternative certification for veterans.',
    avgSalary: 62000,
    salaryRange: [40000, 85000],
    growthOutlook: 'stable',
    growthPercent: 1,
    education: 'bachelor',
    certifications: ['State Teaching License', 'Praxis Exams'],
    relatedMOS: ['Instructor billets', '0930', '8T000'],
    skillsRequired: ['Subject expertise', 'Classroom management', 'Curriculum design', 'Communication'],
    transitionDifficulty: 'moderate',
    veteranAdvantage: 'Many states offer expedited or alternative teacher certification for veterans. Military instructors have strong training backgrounds.',
    resources: ['Troops to Teachers', 'Teach For America Veterans', 'GI Bill'],
  },
  {
    id: 'corporate-trainer',
    title: 'Corporate Trainer',
    category: 'education',
    description: 'Design and deliver training programs for organizations. Strong fit for military instructors and leaders.',
    avgSalary: 63000,
    salaryRange: [42000, 95000],
    growthOutlook: 'moderate',
    growthPercent: 6,
    education: 'bachelor',
    certifications: ['CPTD', 'ATD Master Trainer'],
    relatedMOS: ['Drill Instructor', 'Instructor billets', '0913', '8B000'],
    skillsRequired: ['Instructional design', 'Facilitation', 'Needs assessment', 'LMS administration'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military instructors, drill sergeants, and training NCOs have extensive training development and delivery experience.',
    resources: ['ATD Veterans Membership', 'Hiring Our Heroes'],
  },

  // ── Logistics ──
  {
    id: 'logistics-manager',
    title: 'Logistics Manager',
    category: 'logistics',
    description: 'Plan and coordinate the movement and storage of goods for organizations.',
    avgSalary: 77000,
    salaryRange: [50000, 120000],
    growthOutlook: 'high',
    growthPercent: 18,
    education: 'bachelor',
    certifications: ['CSCP', 'CTL', 'CLP'],
    relatedMOS: ['90A', '0402', '2G0X1', '3002'],
    skillsRequired: ['Transportation management', 'Warehousing', 'Distribution planning', 'ERP systems'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military logistics experience is highly valued. The military runs one of the world\'s largest logistics operations.',
    resources: ['SOLE Military Program', 'Hiring Our Heroes', 'APICS'],
  },
  {
    id: 'fleet-manager',
    title: 'Fleet Manager',
    category: 'logistics',
    description: 'Manage vehicle fleets including maintenance, compliance, and route optimization.',
    avgSalary: 65000,
    salaryRange: [42000, 100000],
    growthOutlook: 'stable',
    growthPercent: 5,
    education: 'associate',
    certifications: ['CAFM', 'ASE Certifications'],
    relatedMOS: ['91B', '3521', '2T3X1'],
    skillsRequired: ['Fleet maintenance', 'DOT compliance', 'Budget management', 'Telematics'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military motor transport and maintenance experience directly translates to civilian fleet management.',
    resources: ['NAFA Military Partnership', 'Hiring Our Heroes'],
  },

  // ── Security ──
  {
    id: 'security-manager',
    title: 'Corporate Security Manager',
    category: 'security',
    description: 'Oversee physical security, risk management, and protective operations for organizations.',
    avgSalary: 83000,
    salaryRange: [52000, 130000],
    growthOutlook: 'moderate',
    growthPercent: 6,
    education: 'bachelor',
    certifications: ['CPP', 'PSP', 'PCI'],
    relatedMOS: ['31A', '5811', '3P0X1', 'MA'],
    skillsRequired: ['Risk assessment', 'Security planning', 'Team management', 'Regulatory compliance'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military security and law enforcement experience translates directly. Clearances and leadership experience are key assets.',
    resources: ['ASIS Military Membership', 'Hiring Our Heroes'],
  },
  {
    id: 'private-security-contractor',
    title: 'Private Security Contractor',
    category: 'security',
    description: 'Provide security services for private clients, facilities, events, or overseas operations.',
    avgSalary: 72000,
    salaryRange: [40000, 180000],
    growthOutlook: 'moderate',
    growthPercent: 6,
    education: 'high-school',
    certifications: ['Armed Guard License', 'CPP', 'First Aid/CPR'],
    relatedMOS: ['11B', '0311', '3P0X1', 'SO'],
    skillsRequired: ['Tactical skills', 'Threat assessment', 'Communication', 'Physical fitness'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Combat arms and security forces veterans have directly applicable skills. Top-secret clearances command premium rates.',
    resources: ['ClearanceJobs', 'MilitaryHire'],
  },

  // ── Finance ──
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    category: 'finance',
    description: 'Analyze financial data and trends to help organizations make investment and business decisions.',
    avgSalary: 90000,
    salaryRange: [55000, 145000],
    growthOutlook: 'moderate',
    growthPercent: 9,
    education: 'bachelor',
    certifications: ['CFA', 'CFP', 'Series 7/66'],
    relatedMOS: ['36A', '3404', '6F0X1'],
    skillsRequired: ['Financial modeling', 'Data analysis', 'Reporting', 'Risk assessment'],
    transitionDifficulty: 'moderate',
    veteranAdvantage: 'Military finance and comptroller professionals have budgeting and analysis experience. Detail orientation and analytical rigor are valued.',
    resources: ['CFA Institute Veterans Scholarship', 'Wall Street Veterans'],
  },
  {
    id: 'financial-advisor',
    title: 'Financial Advisor',
    category: 'finance',
    description: 'Help individuals and families plan for financial goals including retirement, investments, and insurance.',
    avgSalary: 95000,
    salaryRange: [45000, 200000],
    growthOutlook: 'moderate',
    growthPercent: 13,
    education: 'bachelor',
    certifications: ['CFP', 'ChFC', 'Series 7/66'],
    relatedMOS: ['36B', '3451', '6F0X1'],
    skillsRequired: ['Financial planning', 'Client relations', 'Investment knowledge', 'Regulatory compliance'],
    transitionDifficulty: 'moderate',
    veteranAdvantage: 'Veterans understand military benefits (TSP, VA loans, TRICARE) and can serve the military community as specialized advisors.',
    resources: ['FPA Veterans Initiative', 'FINRA Military Center'],
  },
  {
    id: 'accountant',
    title: 'Accountant / CPA',
    category: 'finance',
    description: 'Prepare and examine financial records, ensure tax compliance, and provide financial advice.',
    avgSalary: 78000,
    salaryRange: [50000, 125000],
    growthOutlook: 'stable',
    growthPercent: 4,
    education: 'bachelor',
    certifications: ['CPA', 'CMA', 'EA'],
    relatedMOS: ['36B', '3432', '6F0X1'],
    skillsRequired: ['Accounting principles', 'Tax law', 'Auditing', 'Financial reporting'],
    transitionDifficulty: 'moderate',
    veteranAdvantage: 'Military finance and disbursing specialists have relevant accounting experience. CPA exam prep available via GI Bill.',
    resources: ['AICPA Veterans Resources', 'GI Bill CPA Prep'],
  },

  // ── Additional Technology ──
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'technology',
    description: 'Collect, process, and analyze data to help organizations make informed decisions.',
    avgSalary: 82000,
    salaryRange: [50000, 120000],
    growthOutlook: 'high',
    growthPercent: 35,
    education: 'bachelor',
    certifications: ['Google Data Analytics', 'Tableau Desktop Specialist', 'SQL Certification'],
    relatedMOS: ['35F', '0231', '1N0X1', '3D0X3'],
    skillsRequired: ['SQL', 'Statistical analysis', 'Data visualization', 'Python/R'],
    transitionDifficulty: 'moderate',
    veteranAdvantage: 'Intelligence analysts and operations research specialists have strong analytical foundations that translate to data roles.',
    resources: ['VET TEC', 'Google Career Certificates', 'Coursera for Veterans'],
  },
  {
    id: 'network-engineer',
    title: 'Network Engineer',
    category: 'technology',
    description: 'Design, implement, and manage computer networks for organizations.',
    avgSalary: 88000,
    salaryRange: [55000, 135000],
    growthOutlook: 'moderate',
    growthPercent: 4,
    education: 'bachelor',
    certifications: ['CCNA', 'CCNP', 'CompTIA Network+'],
    relatedMOS: ['25N', '0651', '3D1X2', 'IT'],
    skillsRequired: ['Network protocols', 'Router/switch configuration', 'Troubleshooting', 'Network security'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military signal and IT specialists manage complex networks in demanding environments. Certifications earned in service are widely recognized.',
    resources: ['VET TEC', 'Cisco Veterans Program', 'Microsoft MSSA'],
  },

  // ── Additional Government ──
  {
    id: 'defense-contractor',
    title: 'Defense Contractor Analyst',
    category: 'government',
    description: 'Work for defense industry companies supporting military programs, acquisitions, and technology.',
    avgSalary: 95000,
    salaryRange: [60000, 155000],
    growthOutlook: 'moderate',
    growthPercent: 8,
    education: 'bachelor',
    certifications: ['TS/SCI Clearance', 'DAWIA Certification', 'PMP'],
    relatedMOS: ['Any with clearance', 'Acquisition officers', 'Program managers'],
    skillsRequired: ['Program management', 'Defense acquisition', 'Technical writing', 'Stakeholder management'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Active clearances, understanding of military requirements, and existing relationships with DoD customers are enormous advantages.',
    resources: ['ClearanceJobs', 'Military.com', 'Bradley-Morris'],
  },

  // ── Additional Healthcare ──
  {
    id: 'paramedic-emt',
    title: 'Paramedic / EMT',
    category: 'healthcare',
    description: 'Provide emergency medical care and transport patients. Fast entry path for military medics.',
    avgSalary: 44000,
    salaryRange: [30000, 65000],
    growthOutlook: 'moderate',
    growthPercent: 5,
    education: 'certification',
    certifications: ['NREMT', 'State EMS License', 'ACLS', 'PHTLS'],
    relatedMOS: ['68W', 'HM', '4N0X1', 'HS'],
    skillsRequired: ['Emergency medicine', 'Patient assessment', 'Trauma care', 'Vehicle operations'],
    transitionDifficulty: 'easy',
    veteranAdvantage: 'Military medics and corpsmen have extensive emergency medical experience. Many states accept military training for EMT/Paramedic certification.',
    resources: ['USMAP', 'National Registry Military Pathway', 'GI Bill'],
  },
]

// ─── Assessment Questions ─────────────────────────────────────────

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'work-environment',
    text: 'What type of work environment do you prefer?',
    category: 'environment',
    options: [
      {
        label: 'Office / Remote',
        value: 'office',
        careerWeights: { technology: 3, business: 2, finance: 2, government: 1, healthcare: 0, trades: -1, education: 1, logistics: 0, security: 0 },
      },
      {
        label: 'Hands-on / Physical',
        value: 'hands-on',
        careerWeights: { technology: -1, business: -1, finance: -1, government: 0, healthcare: 1, trades: 3, education: 0, logistics: 2, security: 2 },
      },
      {
        label: 'Clinical / Medical',
        value: 'clinical',
        careerWeights: { technology: 0, business: -1, finance: -1, government: 0, healthcare: 3, trades: 0, education: 0, logistics: 0, security: 0 },
      },
      {
        label: 'Mixed / Variety',
        value: 'mixed',
        careerWeights: { technology: 1, business: 1, finance: 0, government: 1, healthcare: 1, trades: 1, education: 1, logistics: 1, security: 1 },
      },
    ],
  },
  {
    id: 'education-willingness',
    text: 'How much additional education are you willing to pursue?',
    category: 'education',
    options: [
      {
        label: 'None — ready to work now',
        value: 'none',
        careerWeights: { technology: 0, business: 0, finance: -1, government: 0, healthcare: -1, trades: 3, education: -1, logistics: 1, security: 2 },
      },
      {
        label: 'Short certifications (< 6 months)',
        value: 'short-cert',
        careerWeights: { technology: 2, business: 1, finance: 1, government: 1, healthcare: 0, trades: 2, education: 0, logistics: 1, security: 1 },
      },
      {
        label: 'Associate or Bachelor\'s degree',
        value: 'degree',
        careerWeights: { technology: 2, business: 2, finance: 2, government: 2, healthcare: 1, trades: 0, education: 2, logistics: 1, security: 0 },
      },
      {
        label: 'Graduate degree or professional program',
        value: 'graduate',
        careerWeights: { technology: 1, business: 1, finance: 2, government: 1, healthcare: 3, trades: -1, education: 2, logistics: 0, security: 0 },
      },
    ],
  },
  {
    id: 'salary-priority',
    text: 'What is your salary expectation?',
    category: 'compensation',
    options: [
      {
        label: 'Under $50K is fine to start',
        value: 'low',
        careerWeights: { technology: -1, business: -1, finance: -1, government: 0, healthcare: 0, trades: 2, education: 1, logistics: 1, security: 1 },
      },
      {
        label: '$50K – $80K',
        value: 'mid',
        careerWeights: { technology: 1, business: 1, finance: 1, government: 2, healthcare: 1, trades: 1, education: 2, logistics: 2, security: 1 },
      },
      {
        label: '$80K – $120K',
        value: 'high',
        careerWeights: { technology: 2, business: 2, finance: 2, government: 1, healthcare: 2, trades: 0, education: 0, logistics: 1, security: 1 },
      },
      {
        label: '$120K+',
        value: 'very-high',
        careerWeights: { technology: 3, business: 1, finance: 2, government: 0, healthcare: 2, trades: -1, education: -1, logistics: 0, security: 0 },
      },
    ],
  },
  {
    id: 'leadership-style',
    text: 'What role do you see yourself in?',
    category: 'role',
    options: [
      {
        label: 'Individual contributor / specialist',
        value: 'individual',
        careerWeights: { technology: 2, business: 0, finance: 1, government: 1, healthcare: 1, trades: 3, education: 0, logistics: 0, security: 1 },
      },
      {
        label: 'Team lead / supervisor',
        value: 'lead',
        careerWeights: { technology: 1, business: 2, finance: 1, government: 1, healthcare: 1, trades: 1, education: 1, logistics: 2, security: 2 },
      },
      {
        label: 'Manager / director',
        value: 'manager',
        careerWeights: { technology: 1, business: 3, finance: 1, government: 2, healthcare: 2, trades: 0, education: 1, logistics: 2, security: 1 },
      },
      {
        label: 'Entrepreneur / self-employed',
        value: 'entrepreneur',
        careerWeights: { technology: 1, business: 2, finance: 2, government: -2, healthcare: 0, trades: 2, education: 0, logistics: 1, security: 1 },
      },
    ],
  },
  {
    id: 'military-skills',
    text: 'Which military skill set best describes your experience?',
    category: 'background',
    options: [
      {
        label: 'Combat Arms / Infantry',
        value: 'combat',
        careerWeights: { technology: 0, business: 1, finance: 0, government: 2, healthcare: 0, trades: 1, education: 0, logistics: 1, security: 3 },
      },
      {
        label: 'Technical / Signal / Cyber',
        value: 'technical',
        careerWeights: { technology: 3, business: 1, finance: 0, government: 1, healthcare: 0, trades: 1, education: 0, logistics: 0, security: 1 },
      },
      {
        label: 'Medical / Healthcare',
        value: 'medical',
        careerWeights: { technology: 0, business: 0, finance: 0, government: 0, healthcare: 3, trades: 0, education: 1, logistics: 0, security: 0 },
      },
      {
        label: 'Logistics / Admin / Support',
        value: 'support',
        careerWeights: { technology: 0, business: 2, finance: 1, government: 1, healthcare: 0, trades: 0, education: 1, logistics: 3, security: 0 },
      },
    ],
  },
  {
    id: 'work-life-balance',
    text: 'How important is work-life balance vs. high earning potential?',
    category: 'lifestyle',
    options: [
      {
        label: 'Prioritize balance and predictable hours',
        value: 'balance',
        careerWeights: { technology: 1, business: 0, finance: 0, government: 3, healthcare: 0, trades: 1, education: 3, logistics: 1, security: 0 },
      },
      {
        label: 'Willing to work hard for higher pay',
        value: 'hustle',
        careerWeights: { technology: 2, business: 2, finance: 3, government: -1, healthcare: 1, trades: 1, education: -1, logistics: 1, security: 2 },
      },
      {
        label: 'Looking for flexibility and autonomy',
        value: 'flexibility',
        careerWeights: { technology: 3, business: 1, finance: 1, government: -1, healthcare: 0, trades: 2, education: 1, logistics: 0, security: 1 },
      },
    ],
  },
  {
    id: 'security-clearance',
    text: 'Do you currently hold a security clearance?',
    category: 'clearance',
    options: [
      {
        label: 'TS/SCI',
        value: 'ts-sci',
        careerWeights: { technology: 2, business: 0, finance: 0, government: 3, healthcare: 0, trades: 0, education: 0, logistics: 0, security: 2 },
      },
      {
        label: 'Secret',
        value: 'secret',
        careerWeights: { technology: 1, business: 0, finance: 0, government: 2, healthcare: 0, trades: 0, education: 0, logistics: 0, security: 1 },
      },
      {
        label: 'None / Expired',
        value: 'none',
        careerWeights: { technology: 0, business: 0, finance: 0, government: 0, healthcare: 0, trades: 0, education: 0, logistics: 0, security: 0 },
      },
    ],
  },
]

// ─── Helper Functions ─────────────────────────────────────────────

export function getCareersByCategory(category: CareerCategory): CareerProfile[] {
  return CAREER_PROFILES.filter((c) => c.category === category)
}

export function getCareerById(id: string): CareerProfile | undefined {
  return CAREER_PROFILES.find((c) => c.id === id)
}

export function getAllCategories(): CareerCategory[] {
  return [...new Set(CAREER_PROFILES.map((c) => c.category))]
}

export function getCategoryLabel(category: CareerCategory): string {
  const labels: Record<CareerCategory, string> = {
    technology: 'Technology',
    healthcare: 'Healthcare',
    trades: 'Skilled Trades',
    business: 'Business & Management',
    government: 'Government & Public Service',
    education: 'Education & Training',
    logistics: 'Logistics & Transportation',
    security: 'Security & Law Enforcement',
    finance: 'Finance & Accounting',
  }
  return labels[category]
}

export function getGrowthLabel(outlook: GrowthOutlook): string {
  const labels: Record<GrowthOutlook, string> = {
    high: 'High Growth',
    moderate: 'Moderate Growth',
    stable: 'Stable',
    declining: 'Declining',
  }
  return labels[outlook]
}

export function getDifficultyLabel(difficulty: TransitionDifficulty): string {
  const labels: Record<TransitionDifficulty, string> = {
    easy: 'Easy Transition',
    moderate: 'Moderate Effort',
    challenging: 'Challenging',
  }
  return labels[difficulty]
}

/**
 * Score career categories based on assessment answers.
 * Returns categories sorted by total score descending.
 */
export function scoreAssessment(
  answers: Record<string, string>
): { category: CareerCategory; score: number }[] {
  const scores: Record<CareerCategory, number> = {
    technology: 0,
    healthcare: 0,
    trades: 0,
    business: 0,
    government: 0,
    education: 0,
    logistics: 0,
    security: 0,
    finance: 0,
  }

  for (const [questionId, answerValue] of Object.entries(answers)) {
    const question = ASSESSMENT_QUESTIONS.find((q) => q.id === questionId)
    if (!question) continue
    const option = question.options.find((o) => o.value === answerValue)
    if (!option) continue

    for (const [cat, weight] of Object.entries(option.careerWeights)) {
      scores[cat as CareerCategory] += weight
    }
  }

  return Object.entries(scores)
    .map(([category, score]) => ({ category: category as CareerCategory, score }))
    .sort((a, b) => b.score - a.score)
}
