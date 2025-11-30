---

date: "2026-02-06"
---# Data Visualization Specification #026: Aviation MOS Pilot Salary Paths

## Overview

**Visualization Type:** Multi-Path Sankey Diagram with Salary Progression Timeline

**Primary Purpose:** Show military pilots (fixed-wing, helicopter, and UAV operators) how their career transitions into commercial aviation, corporate flying, or specialized civilian roles, with clear salary progressions at each stage from military service through civilian career advancement.

**Target Audience:** Active-duty and transitioning military pilots (Air Force, Navy, Marine Corps, Army), aviation warrant officers, and flight officers exploring civilian aviation careers.

**Key Question Answered:** "What salary can I expect when transitioning from military aviation to civilian pilot roles, and how does my career path affect earning potential over time?"

---

## Data Requirements

### Primary Data Sources

1. **Bureau of Labor Statistics (BLS)** - Occupational Employment and Wage Statistics for airline and commercial pilots (May 2024)
2. **ATP Flight School 2025 Pilot Salary Survey** - Regional and major airline compensation data
3. **Simple Flying 2025 Airline Pilot Salary Analysis** - Detailed carrier-specific compensation
4. **Epic Flight Academy 2025 Industry Report** - Corporate and charter pilot salaries
5. **Rotor Pro 2023-2024 Helicopter Pilot Survey** - Rotary-wing civilian compensation
6. **Federal Pay 2024 Military Pay Charts** - Active duty aviation pay by rank and years of service

### Sample Data Structure

```json
{
  "military_starting_point": {
    "fixed_wing_pilot": {
      "rank": "O-1 to O-3",
      "base_salary": "$43,500 - $85,000",
      "flight_pay": "$150 - $1,000/month",
      "total_compensation": "$50,000 - $95,000"
    },
    "helicopter_pilot": {
      "rank": "WO1 to CW3",
      "base_salary": "$39,000 - $75,000",
      "flight_pay": "$150 - $650/month",
      "total_compensation": "$45,000 - $83,000"
    },
    "years_of_service": "4-10 years typical"
  },

  "transition_requirements": {
    "atp_certificate": {
      "military_hours_required": 750,
      "civilian_hours_required": 1500,
      "advantage": "50% reduction in flight hours"
    },
    "training_programs": ["United Aviate", "Envoy Cadet", "Military Competency Airman Certification"]
  },

  "career_paths": {
    "regional_airlines": {
      "first_officer": {
        "year_1": "$90,000 - $120,000",
        "year_3": "$95,000 - $130,000",
        "year_5": "$100,000 - $140,000",
        "signing_bonus": "Up to $150,000 (some carriers)"
      },
      "captain": {
        "year_1": "$120,000 - $160,000",
        "year_3": "$140,000 - $180,000",
        "year_5": "$160,000 - $215,000"
      },
      "time_to_captain": "3-5 years from first officer"
    },

    "major_airlines": {
      "first_officer": {
        "year_1": "$100,000 - $150,000",
        "year_5": "$150,000 - $200,000",
        "year_10": "$180,000 - $250,000",
        "hourly_rate": "$113 - $116/hour starting"
      },
      "captain": {
        "narrow_body": {
          "year_1": "$309,000 - $316,000",
          "year_5": "$320,000 - $360,000",
          "year_10": "$340,000 - $400,000"
        },
        "wide_body": {
          "year_5": "$380,000 - $450,000",
          "year_10": "$420,000 - $500,000",
          "year_15_plus": "$450,000 - $700,000"
        },
        "hourly_rate": "$324 - $329/hour starting"
      },
      "time_to_captain": "5-15 years from first officer",
      "career_earnings": "Up to $10 million lifetime"
    },

    "corporate_aviation": {
      "part_91_corporate": {
        "entry_pilot": "$90,000 - $120,000",
        "experienced_pilot": "$110,000 - $150,000",
        "chief_pilot": "$140,000 - $180,000",
        "ultra_long_range": "$150,000 - $200,000+"
      },
      "part_135_charter": {
        "first_officer": "$70,000 - $100,000",
        "captain": "$110,000 - $180,000",
        "senior_captain": "$150,000 - $250,000",
        "high_demand_markets": "$200,000 - $300,000+"
      }
    },

    "helicopter_civilian": {
      "ems_pilot": {
        "entry": "$60,000 - $70,000",
        "experienced": "$90,000 - $120,000",
        "senior": "$120,000 - $150,000"
      },
      "offshore_oil": {
        "first_officer": "$70,000 - $90,000",
        "captain": "$100,000 - $140,000"
      },
      "corporate_executive": "$95,000 - $137,000",
      "average_civilian": "$93,587 - $106,617"
    }
  },

  "timeline_to_peak": {
    "regional_airlines": "5-8 years to captain",
    "major_airlines": "10-20 years to senior captain wide-body",
    "corporate": "8-12 years to chief pilot",
    "helicopter": "8-15 years to senior EMS pilot"
  }
}
```

---

## Visual Design Specifications

### Layout & Dimensions

- **Canvas Size:** 1400px width × 1000px height
- **Aspect Ratio:** 7:5 (responsive, maintains proportions on mobile)
- **Margins:** 60px top, 50px right, 80px bottom, 50px left
- **Title Area:** 120px height at top
- **Legend Area:** 100px height at bottom
- **Interactive Tooltip Offset:** 15px from cursor

### Color Palette

**Primary Colors (Hex Codes):**
- Military Aviation Background: `#1C3F6E` (Navy Blue)
- Regional Airlines Path: `#4A90E2` (Sky Blue)
- Major Airlines Path: `#0B5394` (Deep Blue)
- Corporate Aviation Path: `#7C4DFF` (Purple)
- Helicopter Civilian Path: `#F57C00` (Orange)
- Salary Range Low: `#E8F5E9` (Light Green)
- Salary Range Mid: `#66BB6A` (Medium Green)
- Salary Range High: `#2E7D32` (Dark Green)
- Bonus/Incentive Highlight: `#FFD54F` (Gold)

**Supporting Colors:**
- Text Primary: `#212121` (Near Black)
- Text Secondary: `#757575` (Gray)
- Grid Lines: `#E0E0E0` (Light Gray)
- Background: `#FFFFFF` (White)
- Path Stroke: `#424242` (Dark Gray, 1px)
- Hover Highlight: `#FFF9C4` (Light Yellow)

### Typography

**Font Family:**
- Primary: "Inter", system-ui, -apple-system, sans-serif
- Data/Numbers: "Roboto Mono", monospace

**Font Specifications:**
- Main Title: 32px, Bold (700), `#1C3F6E`
- Subtitle: 16px, Regular (400), `#757575`
- Section Headers: 20px, Semi-Bold (600), `#212121`
- Career Path Labels: 16px, Medium (500), `#424242`
- Salary Data: 18px, Bold (700), `#2E7D32`
- Years/Timeline: 14px, Regular (400), `#757575`
- Tooltips: 14px, Regular (400), `#FFFFFF` on dark background
- Annotations: 13px, Italic (400), `#757575`
- Legend Text: 14px, Regular (400), `#424242`

---

## Visualization Structure

### Main Components

**1. Starting Point Section (Left Side, 0-200px)**
- Military aviation roles displayed as rectangular nodes
- Three primary categories: Fixed-Wing, Rotary-Wing, UAV Operators
- Each shows rank range and current compensation
- Visual icons for aircraft types
- Width: 180px per node
- Height: 120px per node
- Spacing: 30px vertical between nodes

**2. Transition Zone (200-350px)**
- Shows ATP certification requirements
- Military advantage callout (750 vs 1,500 hours)
- Transition program names (semi-transparent badges)
- Timeline indicator: "Typically 6-18 months"
- Certification icons and checkmarks

**3. Career Path Flows (350-1200px)**
- Four major paths represented as colored bands (Sankey-style)
- Band width represents relative number of transitioning pilots
  - Major Airlines: 40% of width (widest)
  - Regional Airlines: 30% of width
  - Corporate Aviation: 20% of width
  - Helicopter Civilian: 10% of width (narrowest)

**4. Salary Progression Timeline (350-1200px horizontal)**
- X-axis represents years post-transition (0, 5, 10, 15, 20)
- Each career path splits into sub-paths (First Officer → Captain)
- Salary ranges displayed as graduated color bands
- Key milestones marked with circular nodes
- Salary labels positioned above nodes

**5. Peak Earnings Zone (Right Side, 1150-1350px)**
- Final destination nodes showing peak salary ranges
- Time to reach peak earnings
- Total career earnings potential (lifetime)
- Crown icons for highest-earning positions

### Detailed Mockup Description

**Visual Flow (Left to Right):**

1. **Military Starting Block (Far Left)**
   - Three stacked rectangles with subtle gradients
   - Top: "Fixed-Wing Military Pilot" with fighter jet icon
     - "O-1 to O-3 | 4-10 Years Service"
     - "$50K - $95K total comp"
   - Middle: "Rotary-Wing Military Pilot" with helicopter icon
     - "WO1 to CW3 | 4-10 Years Service"
     - "$45K - $83K total comp"
   - Bottom: "UAV/Drone Operator" with drone icon
     - "O-1 to O-3 | 3-8 Years Service"
     - "$48K - $88K total comp"

2. **Transition Bridge**
   - Curved flowing lines connecting military roles to civilian paths
   - Semi-transparent overlay box showing:
     - ATP Certificate icon with checkmark
     - "750 hours (vs 1,500 civilian)" in emphasized text
     - "50% Time Advantage" badge in gold
   - Three small program badges below: "United Aviate", "Envoy Cadet", "Military Comp"

3. **Four Career Paths (Color-Coded Bands)**

   **Path A: Major Airlines (Deep Blue #0B5394)**
   - Starts wider, representing largest opportunity
   - First node (Year 1): "First Officer - Major Carrier"
     - "$100K - $150K"
     - Small airplane icon
   - Splits at Year 5:
     - Upper sub-path: "Continue as First Officer" → "$180K - $250K" at Year 10
     - Lower sub-path: "Upgrade to Captain" → "$309K - $316K" at Year 5
   - Captain path continues and splits at Year 10:
     - Upper: "Narrow-Body Captain" → "$340K - $400K"
     - Lower: "Wide-Body Captain" → "$420K - $500K"
   - Peak node at Year 20: "Senior Wide-Body Captain"
     - "$450K - $700K+"
     - Crown icon
     - "Lifetime: $10M+"

   **Path B: Regional Airlines (Sky Blue #4A90E2)**
   - Medium width band
   - First node (Year 1): "First Officer - Regional"
     - "$90K - $120K"
     - Bonus badge: "+$150K signing bonus (some carriers)"
   - Node at Year 3: "Senior First Officer"
     - "$100K - $140K"
   - Split at Year 5:
     - Upper: "Upgrade to Captain" → "$160K - $215K" peak
     - Lower: "Transition to Majors" → connects to Major Airlines path

   **Path C: Corporate Aviation (Purple #7C4DFF)**
   - Narrower band
   - First node (Year 1): "Corporate Pilot (Part 91)"
     - "$90K - $120K"
   - Split at Year 3:
     - Upper: Part 91 continues → "Experienced Corporate" → "$110K - $150K" → "Chief Pilot" → "$140K - $180K"
     - Lower: "Charter (Part 135)" → "$110K - $180K" → "Senior Charter Captain" → "$200K - $300K+"
   - Peak nodes show aircraft type: "Ultra Long-Range Jets" with private jet icon

   **Path D: Helicopter Civilian (Orange #F57C00)**
   - Narrowest band
   - First node (Year 1): "Entry Helicopter Pilot"
     - "$60K - $90K"
   - Split at Year 3:
     - Upper: "EMS Pilot" → "$90K - $120K" → "Senior EMS" → "$120K - $150K"
     - Lower: "Offshore Oil & Gas" → "$100K - $140K"
     - Third option: "Corporate Executive Heli" → "$95K - $137K"
   - Medical helicopter icon for EMS path

4. **Timeline X-Axis (Bottom)**
   - Year markers: 0, 5, 10, 15, 20
   - Subtle vertical grid lines at each year
   - Label: "Years Since Civilian Transition"
   - Additional markers for "Time to Captain" ranges for each path

5. **Salary Y-Axis (Right Side)**
   - Range: $0 - $750K
   - Major tick marks every $100K
   - Gradient background showing low (green-white) to high (dark green) salary zones
   - Label: "Annual Compensation"

6. **Interactive Elements**
   - Hover over any node: Tooltip displays
     - Position title
     - Salary range
     - Years of experience required
     - Additional benefits (if applicable)
     - Path to next level
   - Hover over path band: Entire career path highlights, others fade to 30% opacity
   - Click on path: Shows detailed breakout panel with:
     - Month-by-month first year expectations
     - Benefits package typical for that path
     - Required ratings/certifications
     - Major employers hiring
     - QOL factors (schedule, time away from home)

7. **Legend (Bottom Section)**
   - Color-coded boxes with path names
   - Flow band width indicator: "Band width = relative opportunity size"
   - Salary color gradient scale
   - Icons legend: Rank insignia, aircraft types, certification badges
   - Note: "Salaries based on 2024-2025 industry data. Actual compensation varies by employer, location, and individual qualifications."

### Data Callouts (Floating Annotations)

- Near Regional path Year 1: "546% salary increase since 2000"
- Near Major Airlines Captain node: "84% of pilots reach captain within 15 years"
- Near transition zone: "Military pilots save 2-3 years on certification requirements"
- Near Corporate path: "NYC and CA markets pay 20-40% above average"
- At helicopter EMS peak: "Highest job satisfaction rating among civilian helicopter pilots"

---

## Accessibility Specifications

### WCAG 2.1 AA Compliance

**Color Contrast:**
- All text maintains minimum 4.5:1 contrast ratio against backgrounds
- Path colors distinguishable for colorblind users (tested with Deuteranopia and Protanopia filters)
- Alternative patterns/textures available as overlay option for each path

**Keyboard Navigation:**
- Tab order: Left to right, top to bottom through all interactive elements
- Enter key activates selected node/path for detail view
- Arrow keys navigate between nodes on same level
- Escape key closes detail panels
- Focus indicators: 3px solid outline in `#2962FF` (blue) with 2px white inner border

**Screen Reader Support:**
- ARIA labels for all interactive elements
- Structured heading hierarchy (H1 for title, H2 for sections, H3 for paths)
- Alt text for all icons: "[Icon type] icon representing [meaning]"
- Table-based data alternative available via button: "View as data table"
- Path descriptions read as: "[Career Path Name]: Starting at [Military Role] with salary [range], progressing through [positions] to peak of [final range] in [years] years"

**Text Scalability:**
- Layout remains functional at 200% zoom
- Text remains readable at 400% zoom without horizontal scrolling
- SVG elements scale proportionally
- Minimum touch target size: 44×44px for all interactive elements

**Alternative Views:**
- "Simplified View" option: Shows only major paths without sub-branches
- "High Contrast Mode": Black background with yellow/white paths
- "Data Table View": All salary data in sortable, filterable table format
- "Print-Friendly Version": Grayscale-optimized, single-page layout

---

## Technical Implementation Notes

### Technology Stack Recommendation

- **Visualization Library:** D3.js v7+ for Sankey diagram and custom path rendering
- **Framework:** React 18+ for component structure and state management
- **Animation:** Framer Motion for smooth transitions
- **Responsive Design:** CSS Grid and Flexbox with Tailwind CSS
- **Data Fetching:** React Query for caching salary data API calls
- **Testing:** Jest and React Testing Library for accessibility and interaction testing

### Performance Requirements

- **Initial Load:** <2 seconds for full visualization render
- **Interaction Response:** <100ms for hover effects and tooltips
- **Animation Duration:** 300ms for path highlighting, 500ms for view transitions
- **Data Updates:** Real-time salary data refreshable without page reload
- **Mobile Optimization:** Touch-optimized with horizontal scrolling for timeline, vertical stacking of paths on screens <768px
- **Browser Support:** Chrome, Firefox, Safari, Edge (last 2 versions)

### Data Update Cadence

- Annual full refresh (January) to incorporate new BLS and industry salary data
- Quarterly updates for airline-specific changes (hiring bonuses, contract updates)
- Monthly validation of peak salary ranges for accuracy
- User feedback integration via "Report Outdated Info" button

---

## Production Timeline & Resource Estimates

### Phase 1: Research & Design (Week 1-2)
- **Hours:** 40 hours
- Finalize all data source integration
- Complete high-fidelity mockups in Figma
- User testing with 10 transitioning military pilots
- Accessibility audit and revisions

### Phase 2: Development (Week 3-5)
- **Hours:** 80 hours
- Component development and D3 integration
- Interactive features implementation
- Responsive design and mobile optimization
- Cross-browser testing

### Phase 3: Data Integration & QA (Week 6)
- **Hours:** 30 hours
- API integration for real-time data
- Automated testing suite
- Performance optimization
- Final accessibility compliance testing

### Phase 4: Deployment & Documentation (Week 7)
- **Hours:** 20 hours
- Production deployment
- Documentation for content updates
- Training materials for stakeholders
- Monitoring and analytics setup

**Total Estimated Hours:** 170 hours (4-5 weeks with one full-time designer-developer)

**Maintenance:** 10 hours/quarter for data updates and minor revisions

---

## Success Metrics

### User Engagement
- **Target:** 70% of users interact with at least 2 career paths
- **Measurement:** Click-through rate on paths and nodes
- Time on visualization: Target >3 minutes average

### Information Comprehension
- **Survey Question:** "After viewing this visualization, do you understand salary expectations for your target civilian aviation career?"
- **Target:** 85% respond "Yes" or "Strongly Yes"

### Accessibility Performance
- **Target:** 100% WCAG 2.1 AA compliance
- **Measurement:** Automated Axe and manual testing
- Screen reader testing with 5 users: Target 90% task completion rate

### Business Impact
- Increase in aviation transition resource page views: Target +25%
- Reduction in salary-related questions to career counselors: Target -30%
- User testimonials: Target 20 positive mentions in first quarter

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-11-11 | Military Transition Toolkit Team | Initial specification based on 2024-2025 aviation salary research |

---

## Appendix: Data Sources Documentation

### Source URLs & Credibility Assessment

1. **Simple Flying (2025)** - Aviation industry analysis
   - URL: simpleflying.com/salaries-airline-pilots-us-2025/
   - Credibility: High - Industry-focused publication with verified data

2. **ATP Flight School (2025)** - Commercial pilot salary research
   - URL: atpflightschool.com/become-a-pilot/airline-career/
   - Credibility: High - Leading flight training organization with industry partnerships

3. **Bureau of Labor Statistics (May 2024)** - Official government wage data
   - Median salary: $226,600 for airline pilots
   - Credibility: Highest - Primary government source

4. **Aviation A2Z (2024-2025)** - Carrier-specific salary breakdowns
   - American Airlines, United Airlines pilot pay scales
   - Credibility: Medium-High - Industry tracking site

5. **Rotor Pro Survey (2023-2024)** - Helicopter pilot compensation
   - Credibility: High - Annual industry survey with broad participation

6. **Federal Pay (2024)** - Military pay charts
   - URL: federalpay.org/military
   - Credibility: Highest - Official DOD data republished

### Research Methodology Note

All salary ranges represent 2024-2025 data and include base pay plus typical flight pay, per diem, and bonuses where applicable. Ranges account for geographic variation and carrier differences. Data validated across minimum 3 independent sources per career path. Peak earnings include overtime and profit-sharing where commonly available.

---

**Specification Status:** Ready for Design & Development
**Next Steps:** Stakeholder review → Figma mockup creation → Development sprint planning
