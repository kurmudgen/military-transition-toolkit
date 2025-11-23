/**
 * Rank-Based Resume Modifiers
 *
 * Different resume language based on military rank/pay grade.
 * Adjusts tone, action verbs, and scope to match civilian equivalent level.
 *
 * Target audience: E5-E7 (primary focus), with support for E1-E4, E8-E9, and Officer ranks.
 */

export const rankModifiers = {
  // ========================================
  // ENLISTED RANKS
  // ========================================
  "E1-E4": {
    rankGroup: "Junior Enlisted",
    payGrade: "E1-E4",
    civilianEquivalent: "Entry-level / Individual contributor",
    resumeTone: "Action-oriented, team-focused, learning and development emphasis",
    preferredVerbs: [
      "Performed",
      "Completed",
      "Assisted",
      "Supported",
      "Maintained",
      "Operated",
      "Conducted",
      "Participated in",
      "Contributed to",
      "Followed",
      "Executed",
      "Learned",
      "Applied"
    ],
    avoidVerbs: [
      "Directed",
      "Managed",
      "Led",
      "Supervised",
      "Oversaw"
    ],
    teamSizeTypical: "0-3 personnel (buddy team or fire team)",
    focusAreas: [
      "Technical skills execution",
      "Following procedures",
      "Individual contribution",
      "Learning and development",
      "Team support"
    ],
    metricsEmphasis: "Individual output, quality of work, certifications earned",
    example: "Performed preventive maintenance on 15 vehicles, achieving 100% operational readiness"
  },

  "E5-E6": {
    rankGroup: "NCO (Non-Commissioned Officer)",
    payGrade: "E5-E6",
    civilianEquivalent: "Supervisor / Team leader / Specialist",
    resumeTone: "Leadership-focused, results-driven, team management and technical expertise",
    preferredVerbs: [
      "Supervised",
      "Led",
      "Managed",
      "Trained",
      "Coordinated",
      "Directed",
      "Mentored",
      "Oversaw",
      "Implemented",
      "Developed",
      "Improved",
      "Achieved",
      "Ensured",
      "Maintained"
    ],
    avoidVerbs: [
      "Helped",
      "Assisted",
      "Participated"
    ],
    teamSizeTypical: "4-13 personnel (squad or section)",
    focusAreas: [
      "Team leadership and supervision",
      "Technical expertise and problem-solving",
      "Training and mentoring junior personnel",
      "Mission execution and results",
      "Process improvement"
    ],
    metricsEmphasis: "Team performance, efficiency improvements, training completion, operational readiness",
    example: "Led team of 9 technicians maintaining 35 vehicles worth $8M, achieving 98% operational availability and zero safety incidents over 12 months"
  },

  "E7-E9": {
    rankGroup: "Senior NCO",
    payGrade: "E7-E9",
    civilianEquivalent: "Manager / Operations manager / Department head",
    resumeTone: "Strategic leadership, operational management, organizational impact",
    preferredVerbs: [
      "Directed",
      "Managed",
      "Led",
      "Orchestrated",
      "Spearheaded",
      "Championed",
      "Established",
      "Implemented",
      "Optimized",
      "Transformed",
      "Drove",
      "Delivered",
      "Executed",
      "Coordinated"
    ],
    avoidVerbs: [
      "Performed",
      "Completed",
      "Assisted"
    ],
    teamSizeTypical: "30-200+ personnel (platoon to company level)",
    focusAreas: [
      "Multi-team leadership",
      "Strategic planning and execution",
      "Resource management (budget, personnel, equipment)",
      "Policy development and implementation",
      "Organizational improvement",
      "Stakeholder management"
    ],
    metricsEmphasis: "Organizational performance, cost savings, strategic initiatives, large-scale impact",
    example: "Directed operations for 150-person organization with $12M budget, implementing process improvements that reduced costs by 18% while increasing productivity 23%"
  },

  // ========================================
  // WARRANT OFFICER RANKS
  // ========================================
  "W1-W3": {
    rankGroup: "Warrant Officer",
    payGrade: "W1-W3",
    civilianEquivalent: "Technical specialist / Subject matter expert",
    resumeTone: "Technical expertise and specialized knowledge, consultant-level",
    preferredVerbs: [
      "Provided expert guidance on",
      "Specialized in",
      "Advised",
      "Consulted on",
      "Performed advanced",
      "Diagnosed complex",
      "Designed",
      "Optimized",
      "Troubleshot",
      "Evaluated"
    ],
    avoidVerbs: [
      "Basic action verbs"
    ],
    teamSizeTypical: "Variable - often individual contributor or small specialized team",
    focusAreas: [
      "Deep technical expertise",
      "Specialized problem-solving",
      "Technical consultation and advising",
      "Complex system management",
      "Training and knowledge transfer"
    ],
    metricsEmphasis: "Technical complexity, specialized achievements, advisory impact",
    example: "Provided expert technical consultation on avionics systems for 12 aircraft, diagnosing and resolving 47 complex failures with 100% accuracy"
  },

  "W4-W5": {
    rankGroup: "Senior Warrant Officer",
    payGrade: "W4-W5",
    civilianEquivalent: "Senior technical expert / Principal specialist / Technical director",
    resumeTone: "Strategic technical leadership, enterprise-level technical authority",
    preferredVerbs: [
      "Served as technical authority for",
      "Directed technical operations",
      "Established standards for",
      "Provided strategic technical guidance",
      "Led enterprise-wide technical initiatives",
      "Advised senior leadership on"
    ],
    avoidVerbs: [
      "Performed routine",
      "Basic technical tasks"
    ],
    teamSizeTypical: "Organization-wide technical authority",
    focusAreas: [
      "Enterprise technical strategy",
      "Organization-level technical standards",
      "Senior leadership advisory",
      "Technical program management",
      "Subject matter expertise at highest level"
    ],
    metricsEmphasis: "Enterprise impact, technical innovation, strategic technical leadership",
    example: "Served as technical authority for helicopter maintenance across 200-aircraft fleet, establishing standards that improved safety by 35% and reduced costs by $2.3M annually"
  },

  // ========================================
  // COMMISSIONED OFFICER RANKS
  // ========================================
  "O1-O3": {
    rankGroup: "Company Grade Officer",
    payGrade: "O1-O3",
    civilianEquivalent: "Manager / Program manager / Team lead",
    resumeTone: "Leadership and management, project execution, team development",
    preferredVerbs: [
      "Led",
      "Managed",
      "Directed",
      "Planned",
      "Executed",
      "Coordinated",
      "Developed",
      "Implemented",
      "Supervised",
      "Trained",
      "Oversaw"
    ],
    avoidVerbs: [
      "Assisted",
      "Helped",
      "Supported"
    ],
    teamSizeTypical: "30-150 personnel (platoon to company)",
    focusAreas: [
      "Team and unit leadership",
      "Mission planning and execution",
      "Resource management",
      "Personnel development",
      "Tactical operations"
    ],
    metricsEmphasis: "Mission success, team performance, resource management, personnel development",
    example: "Led 42-person team executing complex operations across 3 locations, managing $1.2M budget and achieving 100% mission success rate"
  },

  "O4-O6": {
    rankGroup: "Field Grade Officer",
    payGrade: "O4-O6",
    civilianEquivalent: "Director / Senior manager / VP",
    resumeTone: "Strategic leadership, organizational management, executive-level impact",
    preferredVerbs: [
      "Commanded",
      "Directed",
      "Led",
      "Managed",
      "Oversaw",
      "Established",
      "Implemented",
      "Spearheaded",
      "Transformed",
      "Drove",
      "Executed",
      "Coordinated"
    ],
    avoidVerbs: [
      "Tactical-level verbs"
    ],
    teamSizeTypical: "300-5,000 personnel (battalion to brigade)",
    focusAreas: [
      "Strategic planning and execution",
      "Organizational leadership",
      "Multi-unit operations",
      "Budget and resource management",
      "Policy development",
      "Stakeholder engagement"
    ],
    metricsEmphasis: "Organizational performance, strategic initiatives, budget management, large-scale impact",
    example: "Directed operations for 800-person organization with $45M budget, implementing strategic initiatives that improved efficiency by 28% and reduced costs by $3.2M"
  },

  "O7+": {
    rankGroup: "General Officer / Flag Officer",
    payGrade: "O7+",
    civilianEquivalent: "C-suite executive / SVP / VP",
    resumeTone: "Executive strategic leadership, enterprise transformation, policy and vision",
    preferredVerbs: [
      "Commanded",
      "Directed",
      "Led",
      "Established vision for",
      "Transformed",
      "Drove enterprise-wide",
      "Executed strategic initiatives",
      "Provided executive leadership"
    ],
    avoidVerbs: [
      "Operational or tactical verbs"
    ],
    teamSizeTypical: "5,000+ personnel (brigade to entire service component)",
    focusAreas: [
      "Enterprise strategy and vision",
      "Multi-organizational leadership",
      "Policy development",
      "Strategic partnerships",
      "Organizational transformation"
    ],
    metricsEmphasis: "Enterprise impact, strategic transformation, organizational-level results",
    example: "Commanded 15,000-person organization with $2.1B budget, driving strategic transformation that improved operational capability by 40%"
  }
};

/**
 * Get resume modifier recommendations for a specific rank
 * @param {string} rank - Military rank or pay grade (e.g., "E5", "E6", "O3")
 * @returns {Object} Rank modifier data
 */
export function getRankModifier(rank) {
  const upperRank = rank.toUpperCase();

  // Map individual ranks to rank groups
  if (["E1", "E2", "E3", "E4"].includes(upperRank)) {
    return rankModifiers["E1-E4"];
  }
  if (["E5", "E6"].includes(upperRank)) {
    return rankModifiers["E5-E6"];
  }
  if (["E7", "E8", "E9"].includes(upperRank)) {
    return rankModifiers["E7-E9"];
  }
  if (["W1", "W2", "W3"].includes(upperRank)) {
    return rankModifiers["W1-W3"];
  }
  if (["W4", "W5"].includes(upperRank)) {
    return rankModifiers["W4-W5"];
  }
  if (["O1", "O2", "O3"].includes(upperRank)) {
    return rankModifiers["O1-O3"];
  }
  if (["O4", "O5", "O6"].includes(upperRank)) {
    return rankModifiers["O4-O6"];
  }
  if (["O7", "O8", "O9", "O10"].includes(upperRank)) {
    return rankModifiers["O7+"];
  }

  // Default to E5-E6 (target demographic) if rank not recognized
  return rankModifiers["E5-E6"];
}

/**
 * Get appropriate action verb for rank and context
 * @param {string} rank - Military rank
 * @param {string} context - "leadership", "technical", "administrative"
 * @returns {Array} Recommended verbs
 */
export function getRecommendedVerbs(rank, context = "leadership") {
  const modifier = getRankModifier(rank);
  return modifier.preferredVerbs;
}

/**
 * Check if a verb is appropriate for a given rank
 * @param {string} verb - Action verb to check
 * @param {string} rank - Military rank
 * @returns {Object} {appropriate: boolean, suggestion: string}
 */
export function checkVerbForRank(verb, rank) {
  const modifier = getRankModifier(rank);

  if (modifier.avoidVerbs.some(av => av.toLowerCase() === verb.toLowerCase())) {
    const suggestion = modifier.preferredVerbs[0];
    return {
      appropriate: false,
      suggestion,
      reason: `"${verb}" is too ${modifier.rankGroup === "Junior Enlisted" ? "senior" : "junior"} for ${modifier.rankGroup} level. Consider "${suggestion}" instead.`
    };
  }

  return { appropriate: true, suggestion: null, reason: null };
}

/**
 * Get all rank groups
 * @returns {Array} All rank group keys
 */
export function getRankGroups() {
  return Object.keys(rankModifiers);
}
