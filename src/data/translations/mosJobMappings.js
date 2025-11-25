/**
 * MOS to Civilian Job Mappings
 *
 * Maps Military Occupational Specialties (MOS) and Navy ratings to civilian job titles.
 * Data extracted from career guides in src/content/blog/
 *
 * Total: 19 MOS/ratings (10 Army, 9 Navy)
 * Priority: MN (Mineman) - user's rating included
 */

export const mosJobMappings = [
  // ========================================
  // ARMY MOS
  // ========================================
  {
    code: "11B",
    title: "Infantry",
    branch: "Army",
    civilianJobs: [
      "Police Officer",
      "Deputy Sheriff",
      "State Trooper",
      "Federal Law Enforcement Agent",
      "Game Warden",
      "Armed Security Officer",
      "Executive Protection Specialist"
    ]
  },
  {
    code: "25B",
    title: "Information Technology Specialist",
    branch: "Army",
    civilianJobs: [
      "Network Administrator",
      "Systems Administrator",
      "Cybersecurity Analyst",
      "IT Support Specialist",
      "Database Administrator",
      "SOC Analyst",
      "Security Engineer"
    ]
  },
  {
    code: "31B",
    title: "Military Police",
    branch: "Army",
    civilianJobs: [
      "CBP Border Patrol Agent",
      "ICE Officer",
      "DEA Special Agent",
      "US Marshal",
      "Police Officer",
      "Sheriff's Deputy",
      "Corporate Security Manager"
    ]
  },
  {
    code: "35F",
    title: "Intelligence Analyst",
    branch: "Army",
    civilianJobs: [
      "Intelligence Analyst (CIA/DIA/NSA/FBI)",
      "Defense Contractor Intelligence Analyst",
      "Targeting Analyst",
      "Threat Analyst",
      "All-Source Analyst",
      "Counterterrorism Analyst",
      "Geopolitical Analyst"
    ]
  },
  {
    code: "42A",
    title: "Human Resources Specialist",
    branch: "Army",
    civilianJobs: [
      "HR Generalist",
      "Recruiter",
      "Talent Acquisition Specialist",
      "HR Coordinator",
      "Benefits Administrator",
      "HRIS Analyst",
      "HR Manager"
    ]
  },
  {
    code: "68W",
    title: "Combat Medic",
    branch: "Army",
    civilianJobs: [
      "Emergency Medical Technician (EMT)",
      "Paramedic",
      "Registered Nurse (RN)",
      "Flight Paramedic",
      "Critical Care Paramedic",
      "Emergency Department Technician",
      "Firefighter-Paramedic"
    ]
  },
  {
    code: "88M",
    title: "Motor Transport Operator",
    branch: "Army",
    civilianJobs: [
      "CDL Class A Truck Driver",
      "Local/Regional Delivery Driver",
      "Tanker Driver",
      "Flatbed Driver",
      "Owner-Operator",
      "Transportation Coordinator",
      "Fleet Manager"
    ]
  },
  {
    code: "91B",
    title: "Wheeled Vehicle Mechanic",
    branch: "Army",
    civilianJobs: [
      "Fleet Diesel Mechanic",
      "Truck Dealership Technician",
      "Mobile Fleet Mechanic",
      "Fleet Maintenance Supervisor",
      "Heavy-Duty Truck Mechanic",
      "ASE Master Technician"
    ]
  },
  {
    code: "92Y",
    title: "Unit Supply Specialist",
    branch: "Army",
    civilianJobs: [
      "Warehouse Supervisor",
      "Supply Chain Coordinator",
      "Logistics Coordinator",
      "Warehouse Manager",
      "Inventory Control Supervisor",
      "Materials Coordinator",
      "Procurement Specialist"
    ]
  },
  {
    code: "15T",
    title: "UH-60 Black Hawk Helicopter Repairer",
    branch: "Army",
    civilianJobs: [
      "UH-60 Black Hawk Maintenance Technician",
      "Black Hawk Field Service Representative",
      "S-76 Helicopter Mechanic",
      "Offshore Helicopter Mechanic",
      "Corporate Helicopter Mechanic",
      "Aviation Maintenance Technician"
    ]
  },

  // ========================================
  // NAVY RATINGS
  // ========================================
  {
    code: "MN",
    title: "Mineman",
    branch: "Navy",
    civilianJobs: [
      "Underwater Systems Technician",
      "UUV/ROV Operator and Maintainer",
      "Mine Warfare Systems Specialist",
      "Sonar Systems Analyst",
      "Explosive Ordnance Support Technician",
      "Maritime Systems Engineer"
    ]
  },
  {
    code: "IT",
    title: "Information Systems Technician",
    branch: "Navy",
    civilianJobs: [
      "Network Administrator",
      "Systems Administrator",
      "Cybersecurity Analyst",
      "SOC Analyst",
      "Network Engineer",
      "Infrastructure Engineer",
      "IT Support Specialist"
    ]
  },
  {
    code: "HM",
    title: "Hospital Corpsman",
    branch: "Navy",
    civilianJobs: [
      "Emergency Medical Technician (EMT)",
      "Paramedic",
      "Registered Nurse (RN)",
      "Physician Assistant (PA)",
      "Flight Paramedic",
      "Critical Care Nurse",
      "Respiratory Therapist"
    ]
  },
  {
    code: "ET",
    title: "Electronics Technician",
    branch: "Navy",
    civilianJobs: [
      "Defense Electronics Technician",
      "Radar Systems Technician",
      "Telecommunications Technician",
      "RF Technician",
      "Field Service Technician",
      "Calibration Technician",
      "Biomedical Equipment Technician"
    ]
  },
  {
    code: "FC",
    title: "Fire Controlman",
    branch: "Navy",
    civilianJobs: [
      "Weapons Systems Technician",
      "Fire Control Systems Technician",
      "AEGIS Systems Technician",
      "Radar Systems Technician",
      "Combat Systems Technician",
      "Field Service Engineer"
    ]
  },
  {
    code: "GM",
    title: "Gunner's Mate",
    branch: "Navy",
    civilianJobs: [
      "Weapons Systems Technician",
      "Ordnance Technician",
      "Police Officer",
      "Federal Law Enforcement Agent",
      "Firearms Instructor",
      "Range Master",
      "Corporate Armorer"
    ]
  },
  {
    code: "MM",
    title: "Machinist's Mate",
    branch: "Navy",
    civilianJobs: [
      "Industrial Maintenance Technician",
      "HVAC/R Technician",
      "Stationary Engineer",
      "Boiler Operator",
      "Power Plant Operator",
      "Equipment Maintenance Specialist",
      "Building Engineer"
    ]
  },
  {
    code: "YN",
    title: "Yeoman",
    branch: "Navy",
    civilianJobs: [
      "Administrative Assistant",
      "Executive Assistant",
      "Office Manager",
      "Operations Coordinator",
      "Administrative Specialist",
      "Legal Secretary",
      "Executive Secretary"
    ]
  },
  {
    code: "CT",
    title: "Cryptologic Technician",
    branch: "Navy",
    civilianJobs: [
      "SIGINT Analyst",
      "Cybersecurity Analyst",
      "Linguist",
      "Intelligence Analyst",
      "SOC Analyst",
      "Penetration Tester",
      "Cyber Threat Intelligence Analyst"
    ]
  }
];

/**
 * Get civilian job recommendations for a specific MOS
 * @param {string} mosCode - The MOS code (e.g., "11B", "MN")
 * @returns {Object|null} MOS data with civilian jobs
 */
export function getCivilianJobs(mosCode) {
  const upperCode = mosCode.toUpperCase();
  return mosJobMappings.find(mos => mos.code.toUpperCase() === upperCode) || null;
}

/**
 * Search for MOS by title keyword
 * @param {string} keyword - Search term
 * @returns {Array} Matching MOS entries
 */
export function searchMOSByTitle(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  return mosJobMappings.filter(mos =>
    mos.title.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * Get all MOS for a specific branch
 * @param {string} branch - "Army" or "Navy"
 * @returns {Array} MOS entries for that branch
 */
export function getMOSByBranch(branch) {
  return mosJobMappings.filter(mos =>
    mos.branch.toLowerCase() === branch.toLowerCase()
  );
}
