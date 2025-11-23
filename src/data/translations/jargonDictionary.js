/**
 * Military Jargon to Civilian Terms Dictionary
 *
 * 60+ most common military jargon terms with civilian equivalents.
 * Organized by type for easy reference.
 *
 * Based on career guide insights for E5-E7 demographic.
 */

export const jargonDictionary = [
  // ========================================
  // PERSONNEL & ORGANIZATIONAL TERMS
  // ========================================
  {
    military: "Soldier",
    civilian: "Employee",
    type: "personnel"
  },
  {
    military: "Sailor",
    civilian: "Employee",
    type: "personnel"
  },
  {
    military: "Service member",
    civilian: "Professional",
    type: "personnel"
  },
  {
    military: "Squad",
    civilian: "Team",
    type: "personnel"
  },
  {
    military: "Platoon",
    civilian: "Department",
    type: "personnel"
  },
  {
    military: "Company",
    civilian: "Division",
    type: "personnel"
  },
  {
    military: "Battalion",
    civilian: "Organization",
    type: "personnel"
  },
  {
    military: "Unit",
    civilian: "Department",
    type: "personnel"
  },
  {
    military: "Chain of command",
    civilian: "Organizational hierarchy",
    type: "personnel"
  },
  {
    military: "Commanding Officer (CO)",
    civilian: "Director / General Manager",
    type: "personnel"
  },
  {
    military: "Executive Officer (XO)",
    civilian: "Deputy Director / Operations Manager",
    type: "personnel"
  },
  {
    military: "Squad leader",
    civilian: "Team leader / Supervisor",
    type: "personnel"
  },
  {
    military: "Platoon sergeant",
    civilian: "Operations manager / Department supervisor",
    type: "personnel"
  },
  {
    military: "First Sergeant",
    civilian: "Senior operations manager",
    type: "personnel"
  },

  // ========================================
  // ACTION VERBS
  // ========================================
  {
    military: "Execute",
    civilian: "Complete / Perform / Accomplish",
    type: "actionVerb"
  },
  {
    military: "Conduct",
    civilian: "Perform / Carry out",
    type: "actionVerb"
  },
  {
    military: "Deploy",
    civilian: "Travel / Relocate / Assign",
    type: "actionVerb"
  },
  {
    military: "Brief",
    civilian: "Present / Inform",
    type: "actionVerb"
  },
  {
    military: "Coordinate",
    civilian: "Organize / Arrange",
    type: "actionVerb"
  },
  {
    military: "Enforce",
    civilian: "Implement / Ensure compliance",
    type: "actionVerb"
  },
  {
    military: "Debrief",
    civilian: "Review / Analyze results",
    type: "actionVerb"
  },
  {
    military: "Mobilize",
    civilian: "Activate / Prepare",
    type: "actionVerb"
  },
  {
    military: "Reconnoiter",
    civilian: "Research / Investigate",
    type: "actionVerb"
  },
  {
    military: "Secure",
    civilian: "Obtain / Protect",
    type: "actionVerb"
  },

  // ========================================
  // OPERATIONAL TERMS
  // ========================================
  {
    military: "Mission",
    civilian: "Project / Objective / Initiative",
    type: "operational"
  },
  {
    military: "Operation",
    civilian: "Activity / Project / Initiative",
    type: "operational"
  },
  {
    military: "Deployment",
    civilian: "Assignment / Project / Field work",
    type: "operational"
  },
  {
    military: "After Action Review (AAR)",
    civilian: "Post-project review / Lessons learned",
    type: "operational"
  },
  {
    military: "Standard Operating Procedure (SOP)",
    civilian: "Operating procedure / Best practice",
    type: "operational"
  },
  {
    military: "Rules of Engagement (ROE)",
    civilian: "Guidelines / Protocols",
    type: "operational"
  },
  {
    military: "Operational tempo (OPTEMPO)",
    civilian: "Work pace / Activity level",
    type: "operational"
  },
  {
    military: "Sustainment",
    civilian: "Ongoing support / Maintenance",
    type: "operational"
  },
  {
    military: "Readiness",
    civilian: "Preparedness / Capability",
    type: "operational"
  },
  {
    military: "Stand down",
    civilian: "Pause operations / Cease activity",
    type: "operational"
  },

  // ========================================
  // ADMINISTRATIVE & HR TERMS
  // ========================================
  {
    military: "Duty station",
    civilian: "Work location / Office",
    type: "administrative"
  },
  {
    military: "Orders",
    civilian: "Assignment / Transfer",
    type: "administrative"
  },
  {
    military: "Leave",
    civilian: "Vacation / Time off",
    type: "administrative"
  },
  {
    military: "Permanent Change of Station (PCS)",
    civilian: "Relocation / Transfer",
    type: "administrative"
  },
  {
    military: "Evaluation / EVAL",
    civilian: "Performance review",
    type: "administrative"
  },
  {
    military: "Counseling statement",
    civilian: "Performance feedback / Coaching session",
    type: "administrative"
  },
  {
    military: "Article 15 / NJP",
    civilian: "Disciplinary action",
    type: "administrative"
  },
  {
    military: "Separation",
    civilian: "Termination / Resignation",
    type: "administrative"
  },
  {
    military: "Re-enlistment",
    civilian: "Contract renewal",
    type: "administrative"
  },
  {
    military: "BAH / BAS",
    civilian: "Housing allowance / Meal stipend",
    type: "administrative"
  },

  // ========================================
  // LOGISTICS & SUPPLY TERMS
  // ========================================
  {
    military: "Supply chain",
    civilian: "Supply chain / Logistics",
    type: "logistics"
  },
  {
    military: "Hand receipt",
    civilian: "Inventory accountability / Asset tracking",
    type: "logistics"
  },
  {
    military: "Property book",
    civilian: "Asset register / Inventory database",
    type: "logistics"
  },
  {
    military: "Requisition",
    civilian: "Purchase order / Request",
    type: "logistics"
  },
  {
    military: "Issue",
    civilian: "Distribute / Provide",
    type: "logistics"
  },
  {
    military: "Turn-in",
    civilian: "Return / Submit",
    type: "logistics"
  },
  {
    military: "Lateral transfer",
    civilian: "Internal transfer / Redistribution",
    type: "logistics"
  },
  {
    military: "Accountability",
    civilian: "Inventory control / Asset management",
    type: "logistics"
  },

  // ========================================
  // TRAINING & QUALIFICATIONS
  // ========================================
  {
    military: "MOS / Rating",
    civilian: "Job specialty / Career field",
    type: "training"
  },
  {
    military: "School",
    civilian: "Training course / Certification program",
    type: "training"
  },
  {
    military: "Qualified",
    civilian: "Certified / Trained",
    type: "training"
  },
  {
    military: "Proficiency",
    civilian: "Competency / Skill level",
    type: "training"
  },
  {
    military: "Expert",
    civilian: "Advanced / Highly proficient",
    type: "training"
  },
  {
    military: "Range qualification",
    civilian: "Weapons certification / Marksmanship qualification",
    type: "training"
  },

  // ========================================
  // MAINTENANCE & TECHNICAL TERMS
  // ========================================
  {
    military: "PMCS (Preventive Maintenance Checks and Services)",
    civilian: "Preventive maintenance inspection",
    type: "maintenance"
  },
  {
    military: "Deadline",
    civilian: "Out of service / Non-operational",
    type: "maintenance"
  },
  {
    military: "Fully Mission Capable (FMC)",
    civilian: "Fully operational / 100% available",
    type: "maintenance"
  },
  {
    military: "Work order",
    civilian: "Maintenance ticket / Service request",
    type: "maintenance"
  },
  {
    military: "Casualty",
    civilian: "System failure / Equipment malfunction",
    type: "maintenance"
  },
  {
    military: "Operator-level maintenance",
    civilian: "Basic maintenance / Routine service",
    type: "maintenance"
  },

  // ========================================
  // SECURITY & CLEARANCE TERMS
  // ========================================
  {
    military: "Classified",
    civilian: "Confidential / Sensitive information",
    type: "security"
  },
  {
    military: "Secret clearance",
    civilian: "Security clearance (Secret level)",
    type: "security"
  },
  {
    military: "Top Secret clearance",
    civilian: "Security clearance (Top Secret level)",
    type: "security"
  },
  {
    military: "TS/SCI",
    civilian: "Top Secret clearance with Sensitive Compartmented Information access",
    type: "security"
  },
  {
    military: "OPSEC",
    civilian: "Information security / Operational security",
    type: "security"
  },
  {
    military: "COMSEC",
    civilian: "Communications security",
    type: "security"
  },
  {
    military: "Need to know",
    civilian: "Information access control / Authorized personnel only",
    type: "security"
  }
];

/**
 * Translate military jargon to civilian term
 * @param {string} militaryTerm - The military jargon
 * @returns {string} Civilian equivalent
 */
export function translateJargon(militaryTerm) {
  const entry = jargonDictionary.find(item =>
    item.military.toLowerCase() === militaryTerm.toLowerCase()
  );

  return entry ? entry.civilian : militaryTerm;
}

/**
 * Get all jargon terms by type
 * @param {string} type - Type of jargon
 * @returns {Array} Jargon entries of that type
 */
export function getJargonByType(type) {
  return jargonDictionary.filter(item => item.type === type);
}

/**
 * Search for jargon term (partial match)
 * @param {string} searchTerm - Term to search for
 * @returns {Array} Matching jargon entries
 */
export function searchJargon(searchTerm) {
  const lowerSearch = searchTerm.toLowerCase();
  return jargonDictionary.filter(item =>
    item.military.toLowerCase().includes(lowerSearch) ||
    item.civilian.toLowerCase().includes(lowerSearch)
  );
}

/**
 * Get all jargon types
 * @returns {Array} Unique type names
 */
export function getJargonTypes() {
  return [...new Set(jargonDictionary.map(item => item.type))];
}

/**
 * Replace military jargon in a text string with civilian terms
 * @param {string} text - Text containing military jargon
 * @returns {string} Text with jargon replaced
 */
export function replaceJargonInText(text) {
  let result = text;

  jargonDictionary.forEach(({ military, civilian }) => {
    const regex = new RegExp(`\\b${military}\\b`, 'gi');
    result = result.replace(regex, civilian);
  });

  return result;
}
