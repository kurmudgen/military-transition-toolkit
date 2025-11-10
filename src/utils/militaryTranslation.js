// Military to Civilian Translation Utilities

/**
 * Common military-to-civilian skill translations
 */
export const SKILL_TRANSLATIONS = {
  // Leadership
  'Squad Leader': 'Team Leader, Project Manager, Supervisor',
  'Platoon Sergeant': 'Department Manager, Operations Manager',
  'Company Commander': 'Director, Senior Manager, Executive',
  'NCO': 'Supervisor, Team Lead, Coordinator',
  'Officer': 'Manager, Director, Executive',

  // Technical Skills
  'IT Specialist': 'Information Technology Specialist, Systems Administrator',
  'Communications': 'Communications Specialist, Network Administrator',
  'Logistics': 'Supply Chain Manager, Logistics Coordinator',
  'Intelligence': 'Intelligence Analyst, Data Analyst',
  'Medical': 'Healthcare Professional, Medical Technician',
  'Aviation': 'Aviation Technician, Aircraft Mechanic',
  'Maintenance': 'Maintenance Technician, Equipment Specialist',

  // Administrative
  'Admin': 'Administrative Specialist, Office Manager',
  'Human Resources': 'HR Specialist, Personnel Manager',
  'Finance': 'Financial Analyst, Accountant',

  // Operations
  'Operations': 'Operations Manager, Program Manager',
  'Training': 'Training Specialist, Instructor, Facilitator',
  'Security': 'Security Manager, Security Specialist',

  // Common Military Phrases
  'Led squad of': 'Managed team of',
  'Conducted reconnaissance': 'Gathered and analyzed intelligence',
  'Maintained accountability': 'Managed inventory and tracked assets',
  'Trained personnel': 'Developed and mentored staff',
  'Ensured mission success': 'Achieved organizational objectives',
  'Tactical operations': 'Strategic planning and execution',
  'Supervised troops': 'Managed team members',
  'Combat operations': 'High-pressure operations',
  'Deployed to': 'Assigned to',
  'Provided security': 'Ensured safety and protection',
  'Coordinated with': 'Collaborated with',
  'Executed missions': 'Completed projects',
  'Managed equipment worth': 'Managed assets valued at',
  'Zero defects': '100% accuracy',
  'Battle drills': 'Emergency procedures',
  'After action review': 'Post-project analysis',
  'Standard operating procedure': 'Best practices and protocols',
  'Chain of command': 'Organizational hierarchy',
  'Force protection': 'Security and safety measures'
}

/**
 * MOS/AFSC/Rate to civilian career translations
 */
export const MOS_TRANSLATIONS = {
  // Army
  '11B': { title: 'Infantry', civilian: 'Security Specialist, Law Enforcement, Emergency Management' },
  '12B': { title: 'Combat Engineer', civilian: 'Civil Engineer, Construction Manager, Project Manager' },
  '13F': { title: 'Fire Support Specialist', civilian: 'Operations Coordinator, Logistics Analyst' },
  '15T': { title: 'UH-60 Helicopter Repairer', civilian: 'Aircraft Mechanic, Aviation Maintenance Technician' },
  '25B': { title: 'IT Specialist', civilian: 'Network Administrator, Systems Administrator, IT Support' },
  '31B': { title: 'Military Police', civilian: 'Law Enforcement Officer, Security Manager, Corrections Officer' },
  '35F': { title: 'Intelligence Analyst', civilian: 'Intelligence Analyst, Data Analyst, Research Analyst' },
  '42A': { title: 'Human Resources Specialist', civilian: 'HR Manager, Personnel Specialist, Recruiter' },
  '68W': { title: 'Combat Medic', civilian: 'EMT, Paramedic, Healthcare Technician' },
  '88M': { title: 'Motor Transport Operator', civilian: 'Truck Driver, Logistics Coordinator, Transportation Manager' },
  '92Y': { title: 'Supply Specialist', civilian: 'Supply Chain Manager, Inventory Specialist, Warehouse Manager' },

  // Air Force
  '3D0X2': { title: 'Cyber Systems Operations', civilian: 'Network Engineer, Systems Administrator, IT Security' },
  '3D1X2': { title: 'Cyber Transport Systems', civilian: 'Network Administrator, Telecommunications Specialist' },
  '2A6X1': { title: 'Aerospace Propulsion', civilian: 'Aircraft Engine Mechanic, Propulsion Engineer' },
  '1N0X1': { title: 'Operations Intelligence', civilian: 'Intelligence Analyst, Geospatial Analyst' },
  '4N0X1': { title: 'Aerospace Medical Service', civilian: 'Medical Technician, Healthcare Administrator' },

  // Navy
  'IT': { title: 'Information Systems Technician', civilian: 'IT Specialist, Network Administrator, Systems Analyst' },
  'HM': { title: 'Hospital Corpsman', civilian: 'Medical Technician, Nurse, Healthcare Provider' },
  'CTN': { title: 'Cryptologic Technician Networks', civilian: 'Cybersecurity Analyst, Network Security Engineer' },
  'LS': { title: 'Logistics Specialist', civilian: 'Supply Chain Manager, Logistics Coordinator' },
  'MA': { title: 'Master-at-Arms', civilian: 'Law Enforcement Officer, Security Manager' },

  // Marines
  '0311': { title: 'Rifleman', civilian: 'Security Specialist, Law Enforcement, Emergency Response' },
  '0621': { title: 'Radio Operator', civilian: 'Communications Specialist, Network Technician' },
  '0811': { title: 'Field Artillery', civilian: 'Operations Coordinator, Project Manager' },
  '6531': { title: 'Aviation Ordnance Technician', civilian: 'Weapons Systems Technician, Quality Control Inspector' },

  // Additional Army MOS
  '19D': { title: 'Cavalry Scout', civilian: 'Intelligence Analyst, Reconnaissance Specialist, Security Analyst' },
  '25U': { title: 'Signal Support Systems Specialist', civilian: 'IT Support Specialist, Network Technician, Communications Engineer' },
  '27D': { title: 'Paralegal Specialist', civilian: 'Paralegal, Legal Assistant, Compliance Specialist' },
  '36B': { title: 'Financial Management Technician', civilian: 'Accountant, Financial Analyst, Budget Analyst' },
  '74D': { title: 'Chemical, Biological, Radiological, and Nuclear Specialist', civilian: 'HAZMAT Specialist, Environmental Health & Safety Officer, Emergency Response Coordinator' },
  '89B': { title: 'Ammunition Specialist', civilian: 'Inventory Manager, Warehouse Manager, Logistics Coordinator' },
  '91B': { title: 'Wheeled Vehicle Mechanic', civilian: 'Automotive Technician, Fleet Maintenance Manager, Mechanic' },

  // Additional Air Force AFSC
  '2T2X1': { title: 'Air Transportation', civilian: 'Logistics Manager, Transportation Coordinator, Supply Chain Specialist' },
  '3E0X1': { title: 'Electrical Systems', civilian: 'Electrician, Electrical Engineer, Facilities Manager' },
  '6C0X1': { title: 'Contracting', civilian: 'Contract Specialist, Procurement Manager, Acquisition Specialist' },
  '3F2X1': { title: 'Education and Training', civilian: 'Training Manager, Instructional Designer, Learning & Development Specialist' },
  '2R1X1': { title: 'Maintenance Management Analysis', civilian: 'Operations Analyst, Logistics Manager, Quality Assurance Manager' },

  // Additional Navy Ratings
  'YN': { title: 'Yeoman', civilian: 'Administrative Manager, Executive Assistant, Office Manager' },
  'FC': { title: 'Fire Controlman', civilian: 'Systems Engineer, Technical Specialist, Quality Control Inspector' },
  'GM': { title: 'Gunner\'s Mate', civilian: 'Weapons Systems Technician, Ordnance Specialist, Quality Control Inspector' },
  'ET': { title: 'Electronics Technician', civilian: 'Electronics Engineer, Systems Technician, Technical Support Specialist' },
  'BM': { title: 'Boatswain\'s Mate', civilian: 'Operations Supervisor, Facilities Manager, Team Lead' },

  // Coast Guard
  'MK': { title: 'Machinery Technician', civilian: 'Mechanical Engineer, Maintenance Technician, Equipment Specialist' },
  'OS': { title: 'Operations Specialist', civilian: 'Operations Coordinator, Logistics Analyst, Air Traffic Controller' }
}

/**
 * Translate military acronyms to civilian terms
 */
export const translateAcronym = (acronym) => {
  const translations = {
    'NCO': 'Non-Commissioned Officer (Supervisor)',
    'SNCO': 'Senior Non-Commissioned Officer (Manager)',
    'CO': 'Commanding Officer (Executive)',
    'XO': 'Executive Officer (Deputy Director)',
    'OIC': 'Officer in Charge (Manager)',
    'NCOIC': 'Non-Commissioned Officer in Charge (Supervisor)',
    'MOS': 'Military Occupational Specialty (Job Role)',
    'AFSC': 'Air Force Specialty Code (Job Role)',
    'PCS': 'Permanent Change of Station (Relocation)',
    'TDY': 'Temporary Duty (Business Travel)',
    'DD-214': 'Certificate of Release or Discharge from Active Duty',
    'VA': 'Department of Veterans Affairs',
    'DOD': 'Department of Defense',
    'TRADOC': 'Training and Doctrine Command',
    'SOP': 'Standard Operating Procedure',
    'ROE': 'Rules of Engagement (Operating Guidelines)',
    'SITREP': 'Situation Report (Status Update)',
    'AAR': 'After Action Review (Post-Project Analysis)',
    'POC': 'Point of Contact',
    'SME': 'Subject Matter Expert',
    'QA/QC': 'Quality Assurance/Quality Control',
    'OPSEC': 'Operations Security (Information Security)',
    'PERSEC': 'Personnel Security',
    'COMSEC': 'Communications Security',
    'INFOSEC': 'Information Security'
  }

  return translations[acronym.toUpperCase()] || acronym
}

/**
 * Action verbs for accomplishments - civilian-friendly
 */
export const ACTION_VERBS = {
  leadership: [
    'Led', 'Managed', 'Supervised', 'Directed', 'Coordinated', 'Spearheaded',
    'Mentored', 'Trained', 'Developed', 'Guided', 'Championed', 'Orchestrated'
  ],
  achievement: [
    'Achieved', 'Exceeded', 'Improved', 'Increased', 'Reduced', 'Streamlined',
    'Enhanced', 'Optimized', 'Maximized', 'Boosted', 'Accelerated', 'Strengthened'
  ],
  technical: [
    'Implemented', 'Designed', 'Engineered', 'Developed', 'Programmed', 'Configured',
    'Maintained', 'Troubleshot', 'Installed', 'Upgraded', 'Integrated', 'Automated'
  ],
  analysis: [
    'Analyzed', 'Evaluated', 'Assessed', 'Researched', 'Identified', 'Investigated',
    'Forecasted', 'Measured', 'Monitored', 'Tracked', 'Audited', 'Calculated'
  ],
  communication: [
    'Presented', 'Briefed', 'Communicated', 'Negotiated', 'Collaborated', 'Facilitated',
    'Authored', 'Documented', 'Reported', 'Articulated', 'Conveyed', 'Interfaced'
  ],
  organization: [
    'Organized', 'Planned', 'Scheduled', 'Prioritized', 'Allocated', 'Coordinated',
    'Streamlined', 'Systematized', 'Restructured', 'Consolidated', 'Standardized'
  ]
}

/**
 * Translate military accomplishment to civilian format
 */
export const translateAccomplishment = (militaryText) => {
  let civilian = militaryText

  // Replace common military terms
  const replacements = {
    'troops': 'team members',
    'soldiers': 'personnel',
    'Marines': 'team members',
    'sailors': 'personnel',
    'airmen': 'personnel',
    'personnel': 'staff members',
    'mission': 'project',
    'deployment': 'assignment',
    'combat': 'high-pressure',
    'tactical': 'strategic',
    'operational': 'operational',
    'readiness': 'preparedness',
    'platoon': 'team',
    'squad': 'team',
    'company': 'department',
    'battalion': 'organization',
    'unit': 'department'
  }

  Object.entries(replacements).forEach(([military, civ]) => {
    const regex = new RegExp(`\\b${military}\\b`, 'gi')
    civilian = civilian.replace(regex, civ)
  })

  return civilian
}

/**
 * Generate resume bullet points from military experience
 */
export const generateBulletPoint = (action, task, result, metrics = '') => {
  let bullet = `${action} ${task}`

  if (result) {
    bullet += `, resulting in ${result}`
  }

  if (metrics) {
    bullet += ` (${metrics})`
  }

  return bullet
}

/**
 * Get civilian job titles from military rank/role
 */
export const getCivilianTitles = (rank, role) => {
  const rankLevels = {
    'E1-E4': ['Team Member', 'Specialist', 'Technician', 'Associate'],
    'E5-E6': ['Team Leader', 'Supervisor', 'Coordinator', 'Senior Specialist'],
    'E7-E8': ['Manager', 'Operations Manager', 'Senior Supervisor', 'Department Lead'],
    'E9': ['Senior Manager', 'Director', 'Operations Director'],
    'O1-O3': ['Manager', 'Program Manager', 'Project Manager', 'Operations Manager'],
    'O4-O6': ['Senior Manager', 'Director', 'Executive', 'Department Head'],
    'O7+': ['Senior Executive', 'Vice President', 'Chief Officer', 'Executive Director']
  }

  // Determine rank level
  let level = 'E1-E4'
  if (rank) {
    const rankNum = parseInt(rank.match(/\d+/)?.[0])
    if (rank.startsWith('E')) {
      if (rankNum >= 9) level = 'E9'
      else if (rankNum >= 7) level = 'E7-E8'
      else if (rankNum >= 5) level = 'E5-E6'
    } else if (rank.startsWith('O')) {
      if (rankNum >= 7) level = 'O7+'
      else if (rankNum >= 4) level = 'O4-O6'
      else level = 'O1-O3'
    } else if (rank.startsWith('W')) {
      level = 'E7-E8' // Warrant officers typically supervisor/manager level
    }
  }

  return rankLevels[level] || rankLevels['E1-E4']
}

/**
 * Example resume bullets for different MOS categories
 */
export const EXAMPLE_BULLETS = {
  leadership: [
    'Led team of 15 personnel in high-pressure operations, achieving 100% mission success rate',
    'Supervised daily operations for 40+ staff members across multiple departments',
    'Mentored and trained 25+ junior team members, resulting in 95% retention rate',
    'Managed $2M+ in equipment and resources with zero loss or damage',
    'Coordinated logistics for 200+ person organization during complex operations'
  ],
  technical: [
    'Maintained and repaired complex electronic systems with 98% uptime',
    'Implemented new procedures that reduced maintenance time by 30%',
    'Configured and maintained network infrastructure supporting 500+ users',
    'Troubleshot and resolved 100+ technical issues monthly with 95% first-call resolution',
    'Developed training materials that improved team proficiency by 40%'
  ],
  administrative: [
    'Processed 500+ personnel actions with 100% accuracy and zero errors',
    'Managed budget of $500K+ with zero discrepancies or audit findings',
    'Streamlined administrative processes, reducing processing time by 25%',
    'Maintained personnel records for 200+ individuals in compliance with regulations',
    'Coordinated travel and logistics for 50+ personnel quarterly'
  ],
  medical: [
    'Provided emergency medical care to 1000+ patients in challenging environments',
    'Maintained medical readiness for 300+ person organization',
    'Trained 20+ personnel in emergency medical procedures and life-saving techniques',
    'Managed medical supply inventory worth $100K+ with zero waste',
    'Coordinated patient care and evacuation for critical medical emergencies'
  ],
  operations: [
    'Planned and executed 50+ complex operations with 100% success rate',
    'Coordinated resources for multi-team projects involving 100+ personnel',
    'Developed standard operating procedures adopted organization-wide',
    'Analyzed operational data to improve efficiency by 35%',
    'Managed concurrent projects with competing priorities and tight deadlines'
  ]
}
