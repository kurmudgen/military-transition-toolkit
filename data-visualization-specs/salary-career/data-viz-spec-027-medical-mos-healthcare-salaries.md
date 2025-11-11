# Data Visualization Specification #027: Medical MOS Healthcare Salaries

## Overview

**Visualization Type:** Interactive Career Ladder with Branching Pathways and Credential Progression

**Primary Purpose:** Demonstrate the salary progression for military medics, corpsmen, and healthcare specialists as they transition to civilian healthcare careers, showing multiple credential levels (EMT, LPN, RN, BSN, NP) and specialized healthcare paths (paramedic, respiratory therapy, radiology, surgical tech) with realistic timeframes and education requirements.

**Target Audience:** Active-duty combat medics (68W), Navy Hospital Corpsmen, Air Force Medical Service Specialists (4N0X1), and other military healthcare personnel planning civilian healthcare careers.

**Key Question Answered:** "Starting from my military medical training, what civilian healthcare career paths are available, what additional education/credentials do I need, and what salary can I expect at each level?"

---

## Data Requirements

### Primary Data Sources

1. **Bureau of Labor Statistics (BLS)** - Occupational Employment and Wage Statistics (May 2024)
2. **Nurse.Org 2024-2025 Salary Surveys** - Nursing credential progression data
3. **Nursa 2025 State Salary Report** - Geographic nursing variations
4. **Salary.com Healthcare Compensation Reports** - Allied health salaries
5. **Army COOL (Credentialing Opportunities On-Line)** - Military to civilian credential mapping
6. **Regis College Veterans Healthcare Career Research** - Navy Corpsman equivalencies

### Sample Data Structure

```json
{
  "military_starting_point": {
    "68w_combat_medic": {
      "active_duty_salary": "$42,437 - $52,719",
      "rank_range": "E-3 to E-5",
      "typical_experience": "3-6 years",
      "transferable_skills": ["Emergency care", "Trauma response", "Patient assessment", "Medical documentation"],
      "existing_certifications": ["EMT-B equivalent", "ACLS", "PALS", "TCCC"]
    },
    "navy_corpsman": {
      "active_duty_salary": "$38,000 - $55,000",
      "rank_range": "E-3 to E-6",
      "typical_experience": "3-8 years",
      "transferable_skills": ["Emergency medicine", "Patient care", "Medical procedures", "Pharmacy assistance"],
      "skill_overlap_emt": "80%",
      "skill_overlap_rn": "40%"
    },
    "af_medical_specialist": {
      "active_duty_salary": "$40,000 - $54,000",
      "rank_range": "E-3 to E-5",
      "typical_experience": "3-6 years"
    }
  },

  "immediate_transition_careers": {
    "emt_basic": {
      "additional_training": "0-3 months (often direct conversion)",
      "certification_cost": "$0 - $1,500",
      "starting_salary": "$35,000 - $45,000",
      "median_salary": "$44,780",
      "experienced_salary": "$50,000 - $60,000",
      "time_to_experienced": "3-5 years"
    },
    "paramedic": {
      "additional_training": "6-18 months",
      "certification_cost": "$3,000 - $8,000",
      "prerequisites": "EMT-B certification",
      "starting_salary": "$45,000 - $55,000",
      "median_salary": "$58,410",
      "experienced_salary": "$65,000 - $82,420",
      "top_10_percent": "$82,420+",
      "time_to_peak": "8-12 years"
    },
    "medical_assistant": {
      "additional_training": "3-9 months",
      "certification_cost": "$1,200 - $4,500",
      "starting_salary": "$32,000 - $38,000",
      "median_salary": "$42,000",
      "experienced_salary": "$45,000 - $52,000"
    }
  },

  "nursing_pathway": {
    "lpn_lvn": {
      "additional_education": "12-18 months (certificate/diploma)",
      "typical_cost": "$8,000 - $20,000",
      "gi_bill_coverage": "100% (most programs)",
      "starting_salary": "$45,000 - $52,000",
      "median_salary": "$62,340",
      "experienced_salary": "$66,000 - $79,970",
      "top_states": {
        "washington": "$79,970",
        "california": "$79,090",
        "oregon": "$78,160"
      },
      "time_to_complete": "1-1.5 years from military"
    },
    "rn_adn": {
      "additional_education": "2 years (Associate Degree in Nursing)",
      "typical_cost": "$15,000 - $35,000",
      "gi_bill_coverage": "100% public schools",
      "nclex_pass_rate": "88% first-time (veterans)",
      "starting_salary": "$61,250 - $70,000",
      "median_salary": "$93,600",
      "experienced_salary": "$110,000 - $135,320",
      "time_to_complete": "2-2.5 years from military",
      "time_to_experienced": "10+ years"
    },
    "rn_bsn": {
      "additional_education": "4 years BSN or 2 years RN-to-BSN",
      "typical_cost": "$40,000 - $80,000 (4-year) or $20,000 - $35,000 (RN-to-BSN)",
      "gi_bill_coverage": "Substantial (varies by institution)",
      "starting_salary": "$68,000 - $78,000",
      "median_salary": "$99,820",
      "experienced_salary": "$115,000 - $145,000",
      "salary_premium_vs_adn": "5-15% higher",
      "career_advantages": ["Management opportunities", "Advanced practice prerequisites", "Higher hiring preference"]
    },
    "nurse_practitioner": {
      "additional_education": "2-3 years MSN post-BSN",
      "typical_cost": "$50,000 - $120,000",
      "prerequisites": "BSN + 1-2 years RN experience",
      "median_salary": "$125,900",
      "starting_salary": "$95,000 - $110,000",
      "experienced_salary": "$130,000 - $160,000",
      "specialization_premium": {
        "acute_care_np": "$135,000 - $170,000",
        "psychiatric_np": "$120,000 - $155,000",
        "family_np": "$110,000 - $140,000"
      },
      "total_time_from_military": "7-10 years"
    }
  },

  "allied_health_pathways": {
    "respiratory_therapist": {
      "additional_education": "2 years (Associate Degree)",
      "typical_cost": "$15,000 - $35,000",
      "starting_salary": "$55,000 - $65,000",
      "median_salary": "$80,450",
      "experienced_salary": "$90,000 - $105,000",
      "time_to_complete": "2 years from military"
    },
    "radiologic_technologist": {
      "additional_education": "2 years (Associate Degree)",
      "typical_cost": "$15,000 - $40,000",
      "starting_salary": "$55,000 - $65,000",
      "median_salary": "$78,980",
      "experienced_salary": "$85,000 - $100,000",
      "advanced_specializations": {
        "ct_technologist": "$87,785",
        "mri_technologist": "$85,000 - $95,000",
        "mammography": "$88,468"
      },
      "time_to_complete": "2 years from military"
    },
    "surgical_technologist": {
      "additional_education": "12-24 months",
      "typical_cost": "$8,000 - $25,000",
      "starting_salary": "$42,000 - $50,000",
      "median_salary": "$60,370",
      "experienced_salary": "$68,000 - $78,000",
      "time_to_complete": "1-2 years from military"
    },
    "physician_assistant": {
      "additional_education": "2-3 years (Master's degree)",
      "prerequisites": "Bachelor's degree + 2,000+ hours patient care experience",
      "typical_cost": "$80,000 - $150,000",
      "median_salary": "$130,020",
      "starting_salary": "$95,000 - $110,000",
      "experienced_salary": "$140,000 - $170,000",
      "job_growth_projection": "+28% by 2031",
      "total_time_from_military": "5-8 years (if bachelor's needed)"
    }
  },

  "salary_comparison_summary": {
    "immediate_transition": "$35K - $58K",
    "short_term_education_1_2_years": "$60K - $80K",
    "bachelors_degree_pathway": "$80K - $100K",
    "advanced_practice_masters": "$120K - $170K",
    "lifetime_earnings_difference": {
      "paramedic_career": "$1.5M - $2M (30 years)",
      "rn_career": "$2.8M - $4M (30 years)",
      "np_career": "$3.5M - $5M (30 years)"
    }
  }
}
```

---

## Visual Design Specifications

### Layout & Dimensions

- **Canvas Size:** 1600px width × 1200px height
- **Aspect Ratio:** 4:3 (optimized for desktop viewing, responsive breakpoints at 1024px and 768px)
- **Margins:** 50px all sides
- **Title Area:** 100px height at top
- **Main Visualization Area:** 1500px × 950px
- **Legend & Controls Area:** 150px height at bottom
- **Mobile View:** Vertical scrolling layout with collapsible sections

### Color Palette

**Primary Colors (Hex Codes):**
- Military Medical Background: `#8B0000` (Dark Red - medical cross association)
- Quick Transition Path (EMT/Paramedic): `#FF6B6B` (Coral Red)
- Nursing Pathway: `#4ECDC4` (Turquoise - traditional nursing color)
- Allied Health Pathway: `#95E1D3` (Mint Green)
- Advanced Practice: `#6C5CE7` (Purple - denotes advanced credentials)
- Physician Assistant: `#A29BFE` (Light Purple)

**Salary Gradient Scale:**
- Entry Level (<$50K): `#FFF3E0` (Light Peach)
- Mid Level ($50K-$75K): `#FFB74D` (Orange)
- Good ($75K-$100K): `#66BB6A` (Green)
- Excellent ($100K-$130K): `#2E7D32` (Dark Green)
- Outstanding ($130K+): `#1B5E20` (Forest Green)

**Supporting Colors:**
- Education Time Indicator: `#3498DB` (Blue)
- Cost Indicator: `#E74C3C` (Red)
- GI Bill Covered: `#27AE60` (Green checkmark)
- Credential Badge: `#F39C12` (Gold)
- Text Primary: `#2C3E50` (Dark Slate)
- Text Secondary: `#7F8C8D` (Gray)
- Background: `#FAFAFA` (Off-white)
- Divider Lines: `#BDC3C7` (Light Gray)

### Typography

**Font Family:**
- Primary: "Source Sans Pro", system-ui, sans-serif
- Headers: "Montserrat", sans-serif
- Data/Credentials: "Roboto", sans-serif

**Font Specifications:**
- Main Title: 36px, Bold (700), `#2C3E50`
- Subtitle: 18px, Regular (400), `#7F8C8D`
- Career Path Headers: 22px, Semi-Bold (600), `#2C3E50`
- Position Titles: 18px, Medium (500), `#34495E`
- Salary Numbers: 20px, Bold (700), respective path color
- Education Requirements: 15px, Regular (400), `#3498DB`
- Timeline Labels: 14px, Regular (400), `#7F8C8D`
- Credential Badges: 13px, Bold (700), `#FFFFFF` on gold background
- Tooltips: 14px, Regular (400), `#FFFFFF` on `#34495E`
- Footnotes: 12px, Italic (400), `#95A5A6`

---

## Visualization Structure

### Main Components

**1. Starting Point Block (Top Center, 700-900px horizontal)**
- Central node: "Military Medical Personnel"
- Three sub-nodes branching down:
  - Left: "68W Combat Medic | $42K-$52K"
  - Center: "Navy Corpsman | $38K-$55K"
  - Right: "AF Medical Specialist | $40K-$54K"
- Each shows rank range and years of service
- Medical cross icon in center
- Current salary in red badge

**2. Transition Timeline (Vertical, Left Side)**
- Vertical axis showing time progression from top to bottom
- Markers at: 0, 1, 2, 3, 5, 7, 10 years
- Label: "Years Since Military Separation"
- Subtle dotted lines connecting to career milestones

**3. Career Pathway Ladder Structure (Main Area)**

The visualization uses a "ladder with branches" metaphor, where:
- Main vertical tracks represent major career families
- Horizontal rungs represent credential/education levels
- Diagonal branches show specialty options
- Node size indicates relative salary level

**Four Primary Tracks (Left to Right):**

**Track 1: Emergency Medical Services (Position: 200-400px)**
- Color: Coral Red `#FF6B6B`
- Rung 1 (Year 0-0.5): "EMT-Basic"
  - Node: 120px × 80px rounded rectangle
  - "$35K - $45K"
  - Education badge: "0-3 months" (blue)
  - GI Bill: "Covered" (green checkmark)
  - Ambulance icon
- Rung 2 (Year 1-1.5): "Paramedic"
  - Node: 140px × 90px
  - "$58,410 median"
  - Education badge: "6-18 months"
  - Cost badge: "$3K-$8K"
  - Advanced ambulance icon
- Peak (Year 8-12): "Senior Paramedic/Supervisor"
  - Node: 150px × 95px
  - "$65K - $82K"
  - Star icon for peak
- Side branch at Year 3: "Flight Paramedic" → "$75K-$95K"
- Side branch at Year 2: "Critical Care Paramedic" → "$70K-$90K"

**Track 2: Nursing Pathway (Position: 450-750px)**
- Color: Turquoise `#4ECDC4`
- Rung 1 (Year 1-1.5): "LPN/LVN"
  - Node: 140px × 90px
  - "$62,340 median"
  - Education badge: "12-18 months"
  - Nursing cap icon
- Rung 2 (Year 2-2.5): "RN (ADN)"
  - Node: 160px × 100px
  - "$93,600 median"
  - Education badge: "2 years"
  - RN badge icon
  - Highlight: "Most popular path"
- Rung 2.5 (Year 4): "RN (BSN)"
  - Node: 165px × 100px
  - "$99,820 median"
  - Education badge: "2 more years"
  - BSN credential badge
  - Arrow from ADN: "RN-to-BSN Bridge"
- Rung 3 (Year 7-10): "Nurse Practitioner (MSN)"
  - Node: 180px × 110px (largest in track)
  - "$125,900 median"
  - Education badge: "2-3 years post-BSN"
  - NP credential badge
  - Three specialty branches:
    - "Acute Care NP" → "$135K-$170K" (top)
    - "Psychiatric NP" → "$120K-$155K" (middle)
    - "Family NP" → "$110K-$140K" (bottom)

**Track 3: Allied Health Professions (Position: 800-1100px)**
- Color: Mint Green `#95E1D3`
- Four parallel entry points (all at Year 2):

  - Path A: "Respiratory Therapist"
    - Node: 145px × 90px
    - "$80,450 median"
    - Education: "2 years (Associate)"
    - Lungs icon
    - Growth to "$90K-$105K" at Year 7

  - Path B: "Radiologic Technologist"
    - Node: 145px × 90px
    - "$78,980 median"
    - Education: "2 years (Associate)"
    - X-ray icon
    - Specialty branches at Year 4:
      - "CT Tech" → "$87,785"
      - "MRI Tech" → "$85K-$95K"
      - "Mammography" → "$88,468"

  - Path C: "Surgical Technologist"
    - Node: 140px × 85px
    - "$60,370 median"
    - Education: "12-24 months"
    - Surgical tools icon
    - Growth to "$68K-$78K" at Year 7

  - Path D: "Cardiovascular Technologist"
    - Node: 140px × 85px
    - "$67,080 median"
    - Education: "2 years (Associate)"
    - Heart monitor icon

**Track 4: Advanced Practice (Position: 1150-1400px)**
- Color: Purple `#6C5CE7`
- Single path: "Physician Assistant"
  - Starting Node (Year 5-8): "PA Student"
    - Education: "2-3 years (Master's)"
    - Prerequisites box: "Bachelor's + 2,000 hrs patient care"
    - Cost: "$80K-$150K" (red badge)
    - Hourglass icon (longer timeline)
  - Career Node (Year 8-11): "Physician Assistant"
    - Node: 180px × 110px (equal to NP)
    - "$130,020 median"
    - Starting: "$95K-$110K"
    - Peak: "$140K-$170K"
    - PA-C credential badge
    - Stethoscope icon
  - Growth indicator: "+28% job growth by 2031"

**4. Connecting Paths & Flow Lines**
- Solid lines: Direct progression (e.g., EMT → Paramedic)
- Dashed lines: Bridge programs (e.g., LPN → RN, ADN → BSN)
- Dotted lines: Alternative pathways
- Arrow thickness: 3px for main paths, 2px for branches
- Path glow effect on hover: 5px blur, 50% opacity of path color

**5. Education & Cost Indicators (Floating Badges)**
Each node displays 2-3 compact badges:
- **Time Badge** (blue `#3498DB`): "2 years" with clock icon
- **Cost Badge** (red `#E74C3C`): "$15K-$35K" with dollar sign
- **GI Bill Badge** (green `#27AE60`): "100% Covered" with checkmark
- Badge size: 90px × 24px, rounded corners (12px radius)
- Positioned below node, stacked vertically

**6. Salary Progression Indicators**
- Within each node: Large salary number
- Below node: Small upward arrow with "→ $XXK in Y years" for growth projections
- Color of arrow matches salary gradient scale
- Lifetime earnings callout for each major path (Track 2-4)

**7. Interactive Detail Panels (Hover/Click)**
When user hovers over or clicks a career node, a side panel (350px × 500px) appears showing:
- **Header:** Position title with icon
- **Salary Details:** Starting, median, experienced (with source citation)
- **Education Requirements:** Detailed program info, typical schools
- **Certifications Needed:** List with links to certification bodies
- **Time Investment:** From military separation to career start
- **Financial Investment:** Total cost with GI Bill notes
- **Day in the Life:** 3-4 bullet points about typical duties
- **Military Credential Recognition:** Which military training counts
- **Top Employers:** Common healthcare systems hiring this role
- **Job Outlook:** Growth percentage and demand level
- **Next Steps Button:** Links to application resources

**8. Comparison Tool (Bottom Right Corner)**
- Floating button: "Compare Paths" (120px × 40px, purple `#6C5CE7`)
- Opens overlay allowing user to select 2-3 paths
- Shows side-by-side comparison table:
  - Total education time
  - Total cost
  - Starting salary
  - Peak salary
  - 10-year earnings
  - 30-year lifetime earnings
  - Work-life balance rating
  - Job stress level
  - Job satisfaction score
  - Physical demands

---

## Detailed Mockup Description

**Visual Hierarchy (Top to Bottom, Left to Right):**

**Header Section:**
- Title: "Military Medical Career Pathways: From Medic to Healthcare Professional"
- Subtitle: "Explore salary progression and education requirements for 12+ civilian healthcare careers"
- Filter buttons: "Show Quick Start Careers (<2 years)" | "Show High Earning Paths ($100K+)" | "Show All"

**Main Visualization Area:**

The layout resembles an underground subway map or genealogy tree, with the military starting point at the top center branching downward and outward into multiple pathways.

**Starting Node (Top Center):**
- Large octagon shape (200px × 200px)
- Deep red background `#8B0000`
- White text: "MILITARY MEDICAL PERSONNEL"
- Three descending lines (like roots) connecting to:
  - 68W Combat Medic [left, 150px down]
  - Navy Corpsman [center, 150px down]
  - AF Medical Specialist [right, 150px down]

**Pathway Visualization:**

Each career track flows downward like a river, with wider sections indicating higher salaries and branching tributaries showing specializations.

**Track 1 (Emergency Medical - Far Left):**
- Starts narrow (indicating lower salary)
- EMT node: Small circle with ambulance emoji, "$35K-$45K" in coral
- Connects down to Paramedic node: Larger circle, "$58K median"
- Branches right to specialty paramedics (Flight, Critical Care)
- Ends at "Peak Paramedic" with star icon

**Track 2 (Nursing - Center-Left to Center):**
- Starts medium width
- LPN node: First rung, nursing cap emoji
- Fork symbol between LPN and RN indicating "2 paths: ADN or Direct BSN"
- RN (ADN) node: Larger, with badge "Most Popular Choice"
- Bridge arrow from ADN to BSN (dashed line, labeled "RN-to-BSN")
- BSN node: Slightly larger than ADN
- Large ascending arrow to NP node at top
- NP node: One of the largest (indicating high salary)
- Three branches from NP for specializations

**Track 3 (Allied Health - Center-Right):**
- Four parallel starting points at same level (Year 2)
- Each profession starts as similar-sized nodes
- Respiratory and Radiology tracks show upward growth
- Radiology branches into three specialties (CT, MRI, Mammo)
- Surgical Tech and Cardiovascular have modest upward growth

**Track 4 (Physician Assistant - Far Right):**
- Starts lower (Year 5-8) indicating longer education
- Large "Prerequisites" box with warning icon
- PA Student phase (semi-transparent node)
- PA Career node: Largest in this track, equal to NP
- Growth arrow showing $140K-$170K peak

**Connecting Elements:**
- Subtle background gradient from red (top/military) fading to blue-green (bottom/civilian)
- Grid lines at year markers (horizontal, light gray, dashed)
- Salary bands in background (vertical color zones for $0-$50K, $50-$75K, $75-$100K, $100K+)

**Legend (Bottom):**
- Color key for four tracks
- Icon legend: Education time, Cost, GI Bill, Credentials, Peak Earnings
- Salary color scale: "$35K to $170K+"
- Line type legend: Direct path, Bridge program, Specialty branch
- Note: "All salaries represent 2024-2025 national medians. Actual salaries vary by location, experience, and employer."

**Interactive Hotspots:**
- Each career node: Hover cursor changes to pointer
- Tooltip on hover shows quick stats (salary range, time, cost)
- Click opens detailed side panel
- "Compare" checkboxes appear on hover for each node

---

## Accessibility Specifications

### WCAG 2.1 AAA Compliance

**Color Contrast:**
- All text on colored backgrounds: Minimum 7:1 contrast ratio
- Track colors tested for deuteranopia, protanopia, tritanopia
- Alternative high-contrast mode available: Black background, yellow/white/cyan tracks

**Patterns & Textures:**
- Optional overlay mode adds distinct patterns to each track:
  - Track 1 (EMS): Diagonal stripes
  - Track 2 (Nursing): Crosshatch
  - Track 3 (Allied Health): Dots
  - Track 4 (PA): Horizontal lines

**Keyboard Navigation:**
- Tab order: Left to right, top to bottom through all nodes
- Arrow keys: Navigate between connected nodes (up = prerequisites, down = progressions, left/right = alternatives at same level)
- Enter: Open detailed panel
- Escape: Close panel
- 'C' key: Activate comparison mode
- '/' key: Open search function to find specific career

**Screen Reader Support:**
- Semantic HTML structure with proper heading hierarchy
- ARIA labels: "Career node: [Title], Median salary [amount], Education required [time], Path from military [description]"
- ARIA live regions announce salary changes when filtering
- Alternative text for all icons
- Table view alternative: "View as Data Table" button provides sortable table with all career data

**Focus Indicators:**
- Visible focus ring: 4px solid `#0066CC` with 2px white offset
- Focus ring surrounds entire node (not just text)
- Current focus path: Dimmed other paths to 40% opacity

**Motion & Animation:**
- Reduced motion mode: Disables all transitions, shows instant state changes
- Animation duration: 400ms for path highlighting, 250ms for node hover
- No auto-playing animations
- User control: "Pause animations" toggle in legend area

**Text Alternatives:**
- Downloadable PDF version with text-only career pathways
- CSV export of all salary and education data
- Audio description script available for screen reader users
- Print-friendly version (grayscale, simplified layout)

---

## Technical Implementation Notes

### Technology Stack Recommendation

- **Visualization Library:** D3.js v7 for custom network diagram, force-directed layout
- **Framework:** React 18+ with TypeScript for type safety
- **State Management:** Zustand (lightweight) for filter/comparison states
- **Animation:** React Spring for smooth transitions
- **Responsive:** Custom hooks with breakpoints (1600px, 1024px, 768px, 480px)
- **Data Fetching:** SWR for client-side data caching
- **Accessibility Testing:** axe-core, jest-axe, Pa11y CI
- **Search Function:** Fuse.js for fuzzy career searching

### Performance Requirements

- **Initial Render:** <1.5 seconds (including data fetch)
- **Interaction Latency:** <50ms for hover effects, <150ms for panel open
- **Animation FPS:** Maintain 60fps on modern devices, 30fps minimum on older hardware
- **Data Size:** ~50KB JSON (compressed), loaded once and cached
- **Image Assets:** SVG icons only (scalable, ~2KB each)
- **Mobile Optimization:** Touch targets minimum 48×48px, swipe gestures for track navigation
- **Progressive Enhancement:** Works without JavaScript (static image with links)

### Data Update Strategy

- **Annual Major Update:** January (BLS releases May data of previous year)
- **Quarterly Reviews:** Check for major salary shifts in nursing/allied health
- **Credential Updates:** Monitor changes to military-civilian credential conversion policies
- **User Feedback:** "Report Outdated Info" link on each career node → flags for review
- **Version Control:** Track data changes in git, display "Last Updated: [Date]" in footer

---

## Production Timeline & Resource Estimates

### Phase 1: Data Validation & Design (Weeks 1-2)
- **Hours:** 50 hours
- Validate all salary data across minimum 3 sources per career
- Complete high-fidelity Figma mockups (desktop, tablet, mobile)
- User testing with 8-10 transitioning medics/corpsmen
- Accessibility audit with screen reader users
- Stakeholder review and approval

### Phase 2: Core Development (Weeks 3-5)
- **Hours:** 90 hours
- React component architecture setup
- D3 network diagram implementation
- Node and path rendering with SVG
- Interactive detail panels
- Filter and comparison functionality
- Responsive breakpoints

### Phase 3: Data Integration & Interactions (Week 6)
- **Hours:** 35 hours
- JSON data structure finalization
- API endpoint creation (if dynamic data needed)
- Tooltip and hover state polish
- Animation timing refinement
- Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Phase 4: Accessibility & QA (Week 7)
- **Hours:** 40 hours
- WCAG AAA compliance testing and fixes
- Keyboard navigation implementation
- Screen reader testing with NVDA and JAWS
- Alternative view creation (table, print, PDF)
- Pattern overlay mode for colorblind users
- Performance optimization (code splitting, lazy loading)

### Phase 5: Polish & Deployment (Week 8)
- **Hours:** 25 hours
- Final visual polish and micro-interactions
- Documentation for content updates
- User guide creation ("How to use this tool")
- Analytics integration (track most-viewed careers, comparison usage)
- Production deployment
- Monitoring setup

**Total Estimated Hours:** 240 hours (8 weeks with one full-time designer-developer, or 6 weeks with 1.5 FTE)

**Maintenance:** 15 hours/quarter for data updates, user feedback integration, and accessibility monitoring

---

## Success Metrics

### User Engagement
- **Target:** 65% of users interact with at least 3 career nodes
- **Target:** 40% use comparison tool
- **Target:** Average time on visualization >4 minutes
- **Measurement:** Heatmaps, click tracking, session duration

### Information Comprehension
- **Survey:** "Did this tool help you understand healthcare career options?"
  - **Target:** 90% respond positively
- **Survey:** "Can you estimate the education time and cost for your chosen path?"
  - **Target:** 85% answer correctly in follow-up

### Accessibility Performance
- **Target:** 100% WCAG 2.1 AAA compliance (automated)
- **Target:** 95% task completion rate with keyboard-only users (5 participants)
- **Target:** 90% task completion rate with screen reader users (5 participants)
- **Measurement:** Automated axe scans, moderated usability testing

### Business Impact
- **Target:** 30% increase in healthcare career guide page views
- **Target:** 20% increase in education benefit inquiries
- **Target:** Reduction in "salary questions" to career counselors by 35%
- **Target:** 50+ veteran testimonials collected in first 6 months
- **Measurement:** Google Analytics, counselor feedback surveys, testimonial collection

### Data Quality
- **Target:** <5% of career data flagged as outdated by users per quarter
- **Target:** Update all flagged data within 2 weeks
- **Measurement:** User feedback form submissions, data version tracking

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-11-11 | Military Transition Toolkit Team | Initial specification with 2024-2025 BLS and industry salary data |

---

## Appendix: Data Sources & Validation

### Source URLs & Credibility

1. **U.S. Bureau of Labor Statistics (May 2024)**
   - Occupational Employment and Wage Statistics
   - Credibility: **Highest** - Primary government source
   - Data Points: Median salaries for RN ($93,600), Paramedic ($58,410), RT ($80,450), Rad Tech ($78,980)

2. **Nurse.Org (2024-2025)**
   - Annual nursing salary surveys
   - Credibility: **High** - Industry-leading nursing resource
   - Data Points: LPN ($62,340), BSN premium (5-15%), NP ($125,900)

3. **Nursa 2025 State Salary Report**
   - Geographic nursing variations
   - Credibility: **High** - Healthcare staffing platform with access to pay data
   - Data Points: Top-paying states (WA $79,970, CA $79,090)

4. **Salary.com Healthcare Reports**
   - Credibility: **Medium-High** - Aggregates employer-reported data
   - Data Points: Combat Medic ($42,437-$52,719), Hospital Corpsman ranges

5. **Regis College Veterans Research**
   - Navy Corpsman civilian equivalencies
   - Credibility: **Medium-High** - Academic institution with veteran focus
   - Data Points: 80% skill overlap EMT/Paramedic, 40% RN

6. **Army COOL (Credentialing Opportunities On-Line)**
   - Official military credential mapping
   - Credibility: **Highest** - Official DOD resource
   - Data Points: Certification equivalencies, recommended transition paths

### Data Validation Methodology

- All salary figures cross-referenced with minimum 3 independent sources
- BLS data used as baseline "truth" where available
- Private survey data validated against government sources within ±10% margin
- Geographic variations noted but national medians used for primary display
- Education costs: Average of public institution tuition (representative of GI Bill coverage)
- Time estimates: Conservative (longer side) to avoid misleading users
- All credential paths verified against current licensing board requirements

### Known Limitations

- Salary data represents **national medians**; geographic variation significant (up to 40% in some markets)
- Military training recognition varies by state licensing boards
- GI Bill coverage estimates; actual benefits depend on individual eligibility and institution
- Healthcare salaries particularly volatile 2020-2024 due to pandemic; recent increases may not persist
- Time estimates assume full-time education; part-time extends timelines significantly
- Cost estimates exclude living expenses, only direct educational costs

---

**Specification Status:** Ready for Design & Development
**Priority:** High - Healthcare is #1 transition field for military medical personnel
**Next Steps:** Stakeholder approval → Figma mockups → Development sprint kickoff
