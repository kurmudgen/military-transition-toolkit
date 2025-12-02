---
date: "2026-02-18"
---# Military Jobs Database - Implementation Guide

## Overview

This database provides **45 military jobs** (MOS codes, AFSC codes, and Navy ratings) across all five branches with **314 civilian job equivalents** mapped for each.

**Branches Covered:**
- Army: 13 MOS codes
- Navy: 20 Ratings  
- Marine Corps: 4 MOS codes
- Air Force: 4 AFSC codes
- Coast Guard: 4 Ratings

---

## Quick Start

### JavaScript Import

```javascript
import { militaryJobsDatabase, getCivilianJobs, searchMilitaryJob } from './military-jobs-db.js';

// Get a specific military job
const infantryman = militaryJobsDatabase.army["11B"];
console.log(infantryman.title); // "Infantryman"
console.log(infantryman.civilianJobs); // Array of 8 civilian careers

// Use helper functions
const jobs = getCivilianJobs("25B", "army"); // Army IT Specialist civilian jobs
const result = searchMilitaryJob("11B"); // Search across all branches
```

### Data Structure

Each military job entry contains:
```javascript
{
  code: "11B",
  title: "Infantryman",
  branch: "Army",
  civilianJobs: [
    "Police Officer",
    "Security Manager",
    "Federal Agent (FBI, DEA, ATF)",
    "Correctional Officer",
    "Training and Development Specialist",
    "Private Security Consultant",
    "Emergency Response Coordinator",
    "Tactical Training Instructor"
  ]
}
```

---

## Available Military Jobs

### Army (13 MOS)
- **11B** - Infantryman
- **11C** - Indirect Fire Infantryman
- **12B** - Combat Engineer
- **12D** - Diver
- **12K** - Plumber
- **12M** - Firefighter
- **12R** - Interior Electrician
- **13B** - Cannon Crewmember
- **13F** - Fire Support Specialist
- **25B** - Information Technology Specialist
- **25U** - Signal Support Systems Specialist
- **68W** - Combat Medic
- **68X** - Behavioral Health Specialist

### Navy (20 Ratings)
- **AB** - Able Seaman
- **AC** - Air Controlman
- **AD** - Aviation Structural Mechanic
- **AE** - Aviation Electrician's Mate
- **AG** - Aerographer's Mate
- **BM** - Boatswain's Mate
- **CS** - Culinary Specialist
- **CT** - Cryptologic Technician
- **EM** - Electrician's Mate
- **EN** - Engineman
- **ET** - Electronics Technician
- **FC** - Fire Controlman
- **GM** - Gunner's Mate
- **HM** - Hospital Corpsman
- **IS** - Intelligence Specialist
- **IT** - Information Systems Technician
- **MK** - Machinist's Mate
- **OS** - Operations Specialist
- **QM** - Quartermaster
- **YN** - Yeoman

### Marine Corps (4 MOS)
- **0311** - Rifleman
- **0331** - Machine Gunner
- **0341** - Mortarman
- **0612** - Combat Communications

### Air Force (4 AFSC)
- **1A3X1** - Airborne Operations Specialist
- **2A2X1** - Aerospace Maintenance Technician
- **3D1X2** - Network & Systems Administrator
- **4B0X1** - Bioenvironmental Engineer

### Coast Guard (4 Ratings)
- **BM** - Boatswain's Mate
- **MK** - Machinery Technician
- **ME** - Maritime Enforcement
- **IT** - Information Technology Specialist

---

## Implementation Ideas for Military Transition Toolkit

### 1. Job Search Tool
Create a search interface where veterans can:
- Enter their military code
- View their military job title
- See 5-8 related civilian careers
- Click through to job boards with these careers

### 2. Resume Generator
- Pull military skills from job data
- Translate them to civilian language
- Suggest civilian job titles to include in resume

### 3. Comparison View
- Show military job vs. civilian equivalents side-by-side
- Include salary ranges (source from BLS API)
- Show job growth trends

### 4. Interactive Career Path
- Filter by branch
- Sort by demand/growth
- Create transition roadmaps
- Link to training resources

### 5. Integration Points
- Link to O*NET for detailed job descriptions
- Connect to military-to-civilian skills translators
- Integrate job boards (Indeed, LinkedIn, CiviliansJobs.com)
- Add certification requirements (COOL programs)

---

## Next Steps to Expand Database

### Phase 1: Add Core Certifications
For each job, add 3-5 relevant certifications:
- **25B IT Specialist**: CompTIA A+, Security+, CCNA, CEH
- **68W Combat Medic**: EMT-B, Paramedic, Nursing prerequisites
- **11B Infantryman**: POST (Peace Officer Standards), CPP, PSP

### Phase 2: Add Salary Data
From BLS 2024-2025 data:
- Entry-level salary range
- Mid-career salary range
- Senior-level salary range

### Phase 3: Add Industry Demand
- High/Medium/Low demand rating
- Growing/Stable/Declining trend
- Top 3 hiring industries

### Phase 4: Add Military Skills
Transferable skills for each MOS:
- Technical skills
- Leadership abilities
- Soft skills
- Industry-standard competencies

---

## Data Sources & Accuracy Notes

**Sources Used:**
- O*NET OnLine Military-to-Civilian Crosswalk
- Military.com Skills Translator
- Bureau of Labor Statistics (BLS) Occupational Outlook Handbook
- COOL (Credentialing Opportunities On-Line) Programs
- Official Military Websites (GoArmy.com, Navy.mil, Marines.mil, etc.)

**Limitations:**
- This is a **curated sample database** with 45 popular military jobs
- Complete all 280+ jobs would require extensive individual research
- Civilian jobs listed are **common equivalents**, not exhaustive
- Data reflects 2024-2025 market conditions

**For Complete Coverage:**
Use the O*NET Military Crosswalk API for all military codes:
```
https://services.onetcenter.org/v1.9/reference/veterans/military
```

---

## CSV Export

For spreadsheet use, all data is available in CSV format:

```
Code,Title,Branch,Civilian Job 1,Civilian Job 2,Civilian Job 3,Civilian Job 4,Civilian Job 5
11B,Infantryman,Army,Police Officer,Security Manager,Federal Agent,Correctional Officer,Training Specialist
25B,Information Technology Specialist,Army,Network Administrator,Systems Administrator,Cybersecurity Analyst,IT Support Specialist,Database Administrator
...
```

---

## Contact & Updates

This database should be updated annually with:
- New military job codes
- Emerging civilian career paths
- Current salary data
- Updated demand metrics

**Questions about specific military jobs?**
- Search O*NET: https://www.onetonline.org
- Military.com Skills Translator: https://www.military.com/hiring-veterans/military-to-civilian
- My Next Move for Veterans: https://www.mynextmove.org/vets/

---

**Last Updated:** November 2025
**Created for:** Military Transition Toolkit
**Format:** JavaScript ES6 Module