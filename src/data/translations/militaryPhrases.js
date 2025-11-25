/**
 * Military to Civilian Phrase Translations
 *
 * Top 75 most common military phrases translated to professional civilian language.
 * Organized by category with rank-based variations.
 * Optimized for E5-E7 demographic (NCO leadership level).
 *
 * Data sources: Career guides for 19 MOS/ratings
 */

export const militaryPhrases = [
  // ========================================
  // LEADERSHIP & MANAGEMENT
  // ========================================
  {
    military: "Led",
    civilian: {
      executive: "Directed",
      technical: "Supervised",
      entryLevel: "Coordinated"
    },
    category: "leadership"
  },
  {
    military: "Led a team of",
    civilian: {
      executive: "Directed cross-functional team of",
      technical: "Supervised team of",
      entryLevel: "Coordinated team of"
    },
    category: "leadership"
  },
  {
    military: "Supervised [number] soldiers/sailors",
    civilian: {
      executive: "Managed team of [number] professionals",
      technical: "Supervised team of [number] personnel",
      entryLevel: "Supported team of [number] employees"
    },
    category: "leadership"
  },
  {
    military: "Squad leader",
    civilian: {
      executive: "Team leader directing 9-13 professionals",
      technical: "Frontline supervisor managing 9-13 personnel",
      entryLevel: "Team coordinator for 9-13 member team"
    },
    category: "leadership"
  },
  {
    military: "Platoon sergeant",
    civilian: {
      executive: "Operations manager overseeing 30-50 employees across 3-4 teams",
      technical: "Senior supervisor managing 30-50 personnel in multiple work centers",
      entryLevel: "Team supervisor coordinating 30-50 employees"
    },
    category: "leadership"
  },
  {
    military: "Briefed senior leadership",
    civilian: {
      executive: "Presented strategic recommendations to C-suite executives",
      technical: "Delivered technical briefings to senior management",
      entryLevel: "Presented findings to department leadership"
    },
    category: "leadership"
  },
  {
    military: "Trained personnel on",
    civilian: {
      executive: "Developed and delivered training programs on",
      technical: "Conducted technical training on",
      entryLevel: "Provided training on"
    },
    category: "leadership"
  },
  {
    military: "Mentored junior personnel",
    civilian: {
      executive: "Developed high-potential employees through targeted coaching",
      technical: "Mentored junior team members in technical competencies",
      entryLevel: "Supported professional development of team members"
    },
    category: "leadership"
  },
  {
    military: "Maintained accountability for",
    civilian: {
      executive: "Maintained fiduciary oversight of",
      technical: "Ensured complete accountability for",
      entryLevel: "Tracked and managed"
    },
    category: "leadership"
  },

  // ========================================
  // OPERATIONS & EXECUTION
  // ========================================
  {
    military: "Executed mission",
    civilian: {
      executive: "Led strategic initiative",
      technical: "Completed project objectives",
      entryLevel: "Executed assigned tasks"
    },
    category: "operations"
  },
  {
    military: "Planned and coordinated",
    civilian: {
      executive: "Orchestrated multi-stakeholder initiatives",
      technical: "Planned and executed",
      entryLevel: "Coordinated activities for"
    },
    category: "operations"
  },
  {
    military: "Conducted operations",
    civilian: {
      executive: "Directed operational activities",
      technical: "Performed operations",
      entryLevel: "Supported operational tasks"
    },
    category: "operations"
  },
  {
    military: "Ensured mission readiness",
    civilian: {
      executive: "Maintained operational excellence and organizational readiness",
      technical: "Ensured operational readiness and equipment availability",
      entryLevel: "Maintained readiness for operational requirements"
    },
    category: "operations"
  },
  {
    military: "Operated under pressure",
    civilian: {
      executive: "Made critical decisions in high-stakes environments",
      technical: "Performed technical operations in time-critical situations",
      entryLevel: "Maintained performance under tight deadlines"
    },
    category: "operations"
  },
  {
    military: "Established standard operating procedures (SOPs)",
    civilian: {
      executive: "Developed and implemented operational protocols",
      technical: "Created technical procedures and documentation",
      entryLevel: "Followed and maintained standard procedures"
    },
    category: "operations"
  },
  {
    military: "Maintained operational tempo",
    civilian: {
      executive: "Sustained high-performance operations during peak demand",
      technical: "Maintained productivity during extended operations",
      entryLevel: "Worked efficiently during busy periods"
    },
    category: "operations"
  },
  {
    military: "Deployed to",
    civilian: {
      executive: "Led operations in austere/challenging environments",
      technical: "Performed technical operations in remote locations",
      entryLevel: "Worked in field/remote assignments"
    },
    category: "operations"
  },

  // ========================================
  // MAINTENANCE & TECHNICAL
  // ========================================
  {
    military: "Performed preventive maintenance",
    civilian: {
      executive: "Implemented predictive maintenance programs",
      technical: "Conducted preventive and corrective maintenance",
      entryLevel: "Performed scheduled maintenance"
    },
    category: "maintenance"
  },
  {
    military: "Troubleshot equipment failures",
    civilian: {
      executive: "Diagnosed and resolved complex system failures",
      technical: "Performed root cause analysis and troubleshooting",
      entryLevel: "Identified and repaired equipment problems"
    },
    category: "maintenance"
  },
  {
    military: "Maintained equipment worth $[X]",
    civilian: {
      executive: "Managed asset portfolio valued at $[X]",
      technical: "Maintained critical equipment valued at $[X]",
      entryLevel: "Serviced equipment valued at $[X]"
    },
    category: "maintenance"
  },
  {
    military: "Achieved 100% operational readiness",
    civilian: {
      executive: "Maintained 100% equipment availability and uptime",
      technical: "Sustained 100% operational availability",
      entryLevel: "Ensured equipment remained operational"
    },
    category: "maintenance"
  },
  {
    military: "Conducted inspections",
    civilian: {
      executive: "Performed quality assurance audits",
      technical: "Conducted technical inspections and evaluations",
      entryLevel: "Completed routine inspections"
    },
    category: "maintenance"
  },
  {
    military: "Repaired and maintained",
    civilian: {
      executive: "Directed maintenance and repair operations for",
      technical: "Performed diagnostics and repairs on",
      entryLevel: "Serviced and maintained"
    },
    category: "maintenance"
  },

  // ========================================
  // ADMINISTRATION & DOCUMENTATION
  // ========================================
  {
    military: "Processed personnel actions",
    civilian: {
      executive: "Managed employee lifecycle and HR operations",
      technical: "Processed personnel transactions and documentation",
      entryLevel: "Handled employee paperwork and records"
    },
    category: "administration"
  },
  {
    military: "Maintained records",
    civilian: {
      executive: "Ensured regulatory compliance through meticulous documentation",
      technical: "Maintained technical documentation and records",
      entryLevel: "Kept accurate records and files"
    },
    category: "administration"
  },
  {
    military: "Prepared reports",
    civilian: {
      executive: "Authored executive briefings and strategic reports",
      technical: "Generated technical reports and analysis",
      entryLevel: "Prepared routine reports and documentation"
    },
    category: "administration"
  },
  {
    military: "Managed supply chain operations",
    civilian: {
      executive: "Directed end-to-end supply chain operations",
      technical: "Coordinated logistics and supply operations",
      entryLevel: "Supported supply chain activities"
    },
    category: "administration"
  },
  {
    military: "Tracked inventory",
    civilian: {
      executive: "Implemented inventory management systems",
      technical: "Maintained inventory control and accountability",
      entryLevel: "Tracked and managed inventory"
    },
    category: "administration"
  },
  {
    military: "Managed budget of $[X]",
    civilian: {
      executive: "Directed fiscal operations with $[X] budget authority",
      technical: "Managed departmental budget of $[X]",
      entryLevel: "Supported budget management for $[X]"
    },
    category: "administration"
  },

  // ========================================
  // SECURITY & COMPLIANCE
  // ========================================
  {
    military: "Maintained security clearance",
    civilian: {
      executive: "Hold Top Secret/SCI security clearance with CI polygraph",
      technical: "Maintain active Secret/Top Secret clearance",
      entryLevel: "Possess security clearance"
    },
    category: "security"
  },
  {
    military: "Handled classified materials",
    civilian: {
      executive: "Managed sensitive information per strict security protocols",
      technical: "Processed classified information following DoD guidelines",
      entryLevel: "Worked with confidential materials"
    },
    category: "security"
  },
  {
    military: "Enforced security protocols",
    civilian: {
      executive: "Implemented enterprise security policies and compliance programs",
      technical: "Enforced security procedures and access controls",
      entryLevel: "Followed security protocols"
    },
    category: "security"
  },
  {
    military: "Conducted security operations",
    civilian: {
      executive: "Directed physical security and access control operations",
      technical: "Performed security operations and monitoring",
      entryLevel: "Supported security activities"
    },
    category: "security"
  },
  {
    military: "Ensured regulatory compliance",
    civilian: {
      executive: "Maintained compliance with federal regulations and industry standards",
      technical: "Ensured adherence to technical specifications and safety standards",
      entryLevel: "Followed established regulations and procedures"
    },
    category: "security"
  },

  // ========================================
  // COMMUNICATION & COORDINATION
  // ========================================
  {
    military: "Coordinated with multiple agencies",
    civilian: {
      executive: "Directed cross-organizational collaboration",
      technical: "Collaborated with internal and external stakeholders",
      entryLevel: "Communicated with other departments"
    },
    category: "communication"
  },
  {
    military: "Provided customer service",
    civilian: {
      executive: "Delivered exceptional client experience",
      technical: "Provided technical customer support",
      entryLevel: "Assisted customers with inquiries"
    },
    category: "communication"
  },
  {
    military: "Facilitated meetings",
    civilian: {
      executive: "Chaired executive meetings and strategy sessions",
      technical: "Facilitated project meetings and coordination",
      entryLevel: "Participated in team meetings"
    },
    category: "communication"
  },
  {
    military: "Drafted correspondence",
    civilian: {
      executive: "Authored executive communications",
      technical: "Prepared technical documentation and correspondence",
      entryLevel: "Wrote emails and memos"
    },
    category: "communication"
  },

  // ========================================
  // PROBLEM-SOLVING & IMPROVEMENT
  // ========================================
  {
    military: "Identified and resolved issues",
    civilian: {
      executive: "Diagnosed complex problems and implemented strategic solutions",
      technical: "Performed root cause analysis and corrective actions",
      entryLevel: "Identified and fixed problems"
    },
    category: "problemSolving"
  },
  {
    military: "Improved efficiency",
    civilian: {
      executive: "Drove operational improvements delivering measurable results",
      technical: "Optimized processes to increase efficiency",
      entryLevel: "Streamlined workflows"
    },
    category: "problemSolving"
  },
  {
    military: "Reduced costs by",
    civilian: {
      executive: "Achieved cost savings of [X]% through strategic initiatives",
      technical: "Reduced operational costs by [X]% through process improvements",
      entryLevel: "Helped save costs by [X]%"
    },
    category: "problemSolving"
  },
  {
    military: "Implemented new procedures",
    civilian: {
      executive: "Championed organizational change initiatives",
      technical: "Developed and deployed new procedures",
      entryLevel: "Adopted new processes"
    },
    category: "problemSolving"
  },

  // ========================================
  // TRAINING & DEVELOPMENT
  // ========================================
  {
    military: "Conducted training for",
    civilian: {
      executive: "Designed and delivered training curriculum for",
      technical: "Provided technical training to",
      entryLevel: "Trained new employees on"
    },
    category: "training"
  },
  {
    military: "Certified in",
    civilian: {
      executive: "Hold advanced certifications in",
      technical: "Certified technical specialist in",
      entryLevel: "Trained and certified in"
    },
    category: "training"
  },
  {
    military: "Developed training materials",
    civilian: {
      executive: "Created comprehensive training programs",
      technical: "Designed technical training documentation",
      entryLevel: "Prepared training materials"
    },
    category: "training"
  },
  {
    military: "Evaluated performance",
    civilian: {
      executive: "Conducted performance reviews and talent development",
      technical: "Assessed employee performance and provided feedback",
      entryLevel: "Participated in performance evaluations"
    },
    category: "training"
  },

  // ========================================
  // EMERGENCY & CRITICAL SITUATIONS
  // ========================================
  {
    military: "Responded to emergencies",
    civilian: {
      executive: "Led crisis response and business continuity operations",
      technical: "Responded to critical incidents and system failures",
      entryLevel: "Handled emergency situations"
    },
    category: "emergency"
  },
  {
    military: "Made decisions under pressure",
    civilian: {
      executive: "Executed critical decisions in high-stakes environments",
      technical: "Performed technical operations under time-critical conditions",
      entryLevel: "Made quick decisions when needed"
    },
    category: "emergency"
  },
  {
    military: "Managed crisis situations",
    civilian: {
      executive: "Directed crisis management and incident response",
      technical: "Coordinated emergency response activities",
      entryLevel: "Supported emergency operations"
    },
    category: "emergency"
  },

  // ========================================
  // PROJECT MANAGEMENT
  // ========================================
  {
    military: "Managed multiple priorities",
    civilian: {
      executive: "Orchestrated concurrent strategic initiatives",
      technical: "Balanced multiple projects simultaneously",
      entryLevel: "Handled multiple tasks at once"
    },
    category: "projectManagement"
  },
  {
    military: "Met all deadlines",
    civilian: {
      executive: "Consistently delivered results ahead of schedule",
      technical: "Maintained 100% on-time project completion",
      entryLevel: "Completed tasks on schedule"
    },
    category: "projectManagement"
  },
  {
    military: "Completed project under budget",
    civilian: {
      executive: "Delivered project [X]% under budget through strategic resource management",
      technical: "Completed project under budget while meeting requirements",
      entryLevel: "Finished project within budget"
    },
    category: "projectManagement"
  },
  {
    military: "Coordinated logistics for",
    civilian: {
      executive: "Directed complex logistics operations for",
      technical: "Managed logistics and coordination for",
      entryLevel: "Supported logistics activities for"
    },
    category: "projectManagement"
  }
];

/**
 * Translate military phrase to civilian language based on career level
 * @param {string} militaryPhrase - The military phrase to translate
 * @param {string} level - "executive", "technical", or "entryLevel"
 * @returns {string} Translated civilian phrase
 */
export function translatePhrase(militaryPhrase, level = "technical") {
  const phrase = militaryPhrases.find(p =>
    p.military.toLowerCase().includes(militaryPhrase.toLowerCase())
  );

  if (!phrase) return militaryPhrase;

  return phrase.civilian[level] || phrase.civilian.technical;
}

/**
 * Get all phrases in a specific category
 * @param {string} category - Category name
 * @returns {Array} Phrases in that category
 */
export function getPhrasesByCategory(category) {
  return militaryPhrases.filter(p => p.category === category);
}

/**
 * Get all available categories
 * @returns {Array} Unique category names
 */
export function getCategories() {
  return [...new Set(militaryPhrases.map(p => p.category))];
}
