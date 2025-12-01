---
date: "2026-02-06"
---# Data Visualization Specification #029: Experience-Based Salary Curves

## Overview

**Visualization Type:** Multi-Line Animated Chart with Interactive Career Trajectory Overlays and Military Experience Credit Calculator

**Primary Purpose:** Illustrate how salaries grow over time based on years of experience across different career fields and education levels, with specific emphasis on how military service years translate to civilian experience credit and affect starting placement on salary curves.

**Target Audience:** Transitioning service members with varying years of military experience (4-20+ years) who want to understand realistic salary expectations throughout their civilian career lifecycle and quantify the value of their military experience.

**Key Question Answered:** "Based on my years of military experience and chosen civilian career path, where will I start on the salary curve, and what can I realistically expect to earn over the next 10-20 years?"

---

## Data Requirements

### Primary Data Sources

1. **Dice Tech Salary Survey 2024** - Experience-based tech compensation progression
2. **Bureau of Labor Statistics (BLS) 2024** - Wage progression data by occupation
3. **Salary.com Veteran Experience Analysis 2025** - Veteran salary by experience bands
4. **PayScale 2024 Salary Reports** - Experience curve data across industries
5. **Federal Pay OPM Guidelines** - Military experience credit for GS positions
6. **Indeed Career Path Analysis 2024** - Industry-specific salary trajectories

### Sample Data Structure

```json
{
  "military_experience_baseline": {
    "enlisted_service": {
      "4_years": {
        "rank_typical": "E-4",
        "total_compensation": "$45,000 - $55,000",
        "civilian_experience_credit": "2-4 years",
        "education_equivalent": "Some college"
      },
      "8_years": {
        "rank_typical": "E-5 to E-6",
        "total_compensation": "$55,000 - $70,000",
        "civilian_experience_credit": "4-6 years",
        "education_equivalent": "Associate degree or specialized training"
      },
      "12_years": {
        "rank_typical": "E-6 to E-7",
        "total_compensation": "$65,000 - $85,000",
        "civilian_experience_credit": "6-10 years",
        "leadership_premium": "Management-level entry"
      },
      "20_plus_years": {
        "rank_typical": "E-7 to E-9",
        "total_compensation": "$75,000 - $100,000",
        "civilian_experience_credit": "10-15 years",
        "leadership_premium": "Senior management potential",
        "retirement_benefit": "Pension + 50% base pay"
      }
    },
    "officer_service": {
      "4_years": {
        "rank_typical": "O-2 to O-3",
        "total_compensation": "$65,000 - $85,000",
        "civilian_experience_credit": "3-5 years",
        "education": "Bachelor's degree"
      },
      "8_years": {
        "rank_typical": "O-3 to O-4",
        "total_compensation": "$85,000 - $115,000",
        "civilian_experience_credit": "6-10 years",
        "leadership_roles": "Mid-level management"
      },
      "12_years": {
        "rank_typical": "O-4 to O-5",
        "total_compensation": "$105,000 - $140,000",
        "civilian_experience_credit": "10-15 years",
        "leadership_roles": "Senior management"
      },
      "20_plus_years": {
        "rank_typical": "O-5 to O-6",
        "total_compensation": "$130,000 - $180,000",
        "civilian_experience_credit": "15-20 years",
        "leadership_roles": "Executive potential"
      }
    }
  },

  "tech_industry_curve": {
    "data_points": [
      {"years_experience": 0, "percentile_25": "$42,000", "median": "$50,321", "percentile_75": "$58,000"},
      {"years_experience": 1, "percentile_25": "$52,000", "median": "$62,517", "percentile_75": "$72,000"},
      {"years_experience": 3, "percentile_25": "$58,000", "median": "$68,040", "percentile_75": "$78,000"},
      {"years_experience": 5, "percentile_25": "$68,000", "median": "$78,000", "percentile_75": "$90,000"},
      {"years_experience": 8, "percentile_25": "$73,000", "median": "$83,143", "percentile_75": "$95,000"},
      {"years_experience": 10, "percentile_25": "$78,000", "median": "$88,000", "percentile_75": "$102,000"},
      {"years_experience": 12, "percentile_25": "$85,000", "median": "$96,792", "percentile_75": "$112,000"},
      {"years_experience": 15, "percentile_25": "$95,000", "median": "$108,000", "percentile_75": "$125,000"},
      {"years_experience": 18, "percentile_25": "$105,000", "median": "$115,399", "percentile_75": "$135,000"},
      {"years_experience": 20, "percentile_25": "$110,000", "median": "$120,000", "percentile_75": "$145,000"}
    ],
    "management_track_multiplier": 1.3,
    "specialization_premium": 1.15
  },

  "general_veteran_curve": {
    "by_age_proxy": [
      {"age_range": "20-29", "median_income": "$38,700", "experience_years": "0-5"},
      {"age_range": "30-39", "median_income": "$58,200", "experience_years": "5-10"},
      {"age_range": "40-49", "median_income": "$68,400", "experience_years": "10-15"},
      {"age_range": "50-59", "median_income": "$77,600", "experience_years": "15-20+"}
    ],
    "by_direct_experience": [
      {"experience": "<1 year", "median": "$87,666"},
      {"experience": "1-2 years", "median": "$88,125"},
      {"experience": "2-4 years", "median": "$89,653"},
      {"experience": "5-8 years", "median": "$91,488"},
      {"experience": "8+ years", "median": "$94,555"}
    ]
  },

  "experience_level_benchmarks": {
    "entry_level": {
      "years": "0-2",
      "salary_range": "$45,000 - $60,000",
      "annual_growth_rate": "8-12%",
      "typical_titles": ["Analyst", "Associate", "Specialist"]
    },
    "early_career": {
      "years": "3-5",
      "salary_range": "$55,000 - $75,000",
      "annual_growth_rate": "5-8%",
      "typical_titles": ["Senior Analyst", "Specialist II", "Consultant"]
    },
    "mid_level": {
      "years": "5-10",
      "salary_range": "$70,000 - $100,000",
      "annual_growth_rate": "4-7%",
      "typical_titles": ["Senior Consultant", "Manager", "Lead Specialist"]
    },
    "experienced": {
      "years": "10-15",
      "salary_range": "$90,000 - $130,000",
      "annual_growth_rate": "3-5%",
      "typical_titles": ["Senior Manager", "Director", "Principal"]
    },
    "senior_expert": {
      "years": "15-20",
      "salary_range": "$110,000 - $160,000",
      "annual_growth_rate": "2-4%",
      "typical_titles": ["Senior Director", "VP", "Distinguished Engineer"]
    },
    "executive": {
      "years": "20+",
      "salary_range": "$140,000 - $250,000+",
      "annual_growth_rate": "1-3%",
      "typical_titles": ["SVP", "EVP", "C-Suite"]
    }
  },

  "industry_specific_curves": {
    "federal_government_gs": {
      "entry_gs7": {"starting": "$50,000", "top_step": "$65,000", "years_to_top": "18"},
      "mid_gs11": {"starting": "$65,000", "top_step": "$85,000", "years_to_top": "18"},
      "senior_gs13": {"starting": "$85,000", "top_step": "$110,000", "years_to_top": "18"},
      "supervisory_gs14": {"starting": "$100,000", "top_step": "$130,000", "years_to_top": "18"},
      "senior_gs15": {"starting": "$120,000", "top_step": "$155,000", "years_to_top": "18"},
      "locality_bonus": "10-35% depending on location",
      "military_credit": "Full credit for leave accrual, discretionary for step placement"
    },
    "healthcare": {
      "rn_progression": [
        {"years": 0, "salary": "$61,250"},
        {"years": 3, "salary": "$75,000"},
        {"years": 5, "salary": "$85,000"},
        {"years": 10, "salary": "$100,000"},
        {"years": 15, "salary": "$113,600"},
        {"years": 20, "salary": "$125,000"}
      ],
      "specialization_bump": "+$10,000 to $20,000",
      "management_track": "+30-40% at director level"
    },
    "defense_contracting": {
      "entry_analyst": "$65,000 - $80,000",
      "mid_level_5_years": "$85,000 - $105,000",
      "senior_10_years": "$110,000 - $140,000",
      "clearance_premium": "+15-25%",
      "military_experience_highly_valued": true
    }
  },

  "salary_growth_projections": {
    "2024_2025_trends": {
      "overall_increase": "3.8-3.9%",
      "entry_level": "+4.5%",
      "mid_career": "+4.2%",
      "senior_level": "+3.2%",
      "executive": "-2.5% (declining due to cost cutting)"
    },
    "industry_variations": {
      "tech": "3.5-4.0%",
      "healthcare": "4.0-4.5%",
      "finance": "3.0-3.5%",
      "federal": "1.7% (2025), 4.7% (2024)",
      "manufacturing": "3.8-4.2%"
    }
  }
}
```

---

## Visual Design Specifications

### Layout & Dimensions

- **Canvas Size:** 1600px width × 900px height (desktop)
- **Chart Area:** 1200px width × 600px height
- **Left Sidebar (Input Panel):** 350px width × full height
- **Legend Area:** Bottom, 1600px width × 80px height
- **Annotation Overlay:** Floating callouts positioned dynamically
- **Aspect Ratio:** 16:9 (responsive, stacks vertically on mobile)

### Color Palette

**Primary Curve Colors:**
- Entry-Level Track (0-5 years): `#64B5F6` (Light Blue)
- Mid-Career Track (5-10 years): `#42A5F5` (Blue)
- Experienced Track (10-15 years): `#1E88E5` (Dark Blue)
- Senior Track (15-20 years): `#1565C0` (Navy Blue)
- Executive Track (20+ years): `#0D47A1` (Midnight Blue)

**Industry-Specific Curves:**
- Tech Industry: `#7C4DFF` (Purple)
- Healthcare: `#4CAF50` (Green)
- Federal Government: `#FF6F00` (Orange)
- Defense Contracting: `#D32F2F` (Red)
- Finance: `#00897B` (Teal)

**Experience Range Bands:**
- 25th Percentile Band: `#E3F2FD` (Pale Blue, 30% opacity)
- 75th Percentile Band: `#BBDEFB` (Light Blue, 30% opacity)
- Median Line: Solid, 3px width, respective color

**Military Experience Indicator:**
- Starting Point Marker: `#FF9800` (Orange circle, 12px radius)
- Military Credit Range: `#FFECB3` (Yellow highlight band)
- Projection Line (personal): `#F44336` (Red, 2px dashed)

**Supporting Colors:**
- Background: `#FAFAFA` (Off-white)
- Grid Lines: `#E0E0E0` (Light Gray, 1px)
- Axis Lines: `#9E9E9E` (Gray, 2px)
- Text Primary: `#212121` (Near Black)
- Text Secondary: `#757575` (Gray)
- Highlight/Hover: `#FFEB3B` (Yellow, 50% opacity overlay)
- Tooltip Background: `#424242` (Dark Gray)
- Tooltip Text: `#FFFFFF` (White)

### Typography

**Font Family:**
- Primary: "Lato", system-ui, sans-serif
- Data/Numbers: "Roboto Mono", monospace
- Headers: "Montserrat", sans-serif

**Font Specifications:**
- Main Title: 32px, Bold (700), `#212121`
- Subtitle: 16px, Regular (400), `#757575`
- Axis Labels: 14px, Regular (400), `#616161`
- Axis Values: 13px, Mono, `#757575`
- Curve Labels: 16px, Semi-Bold (600), respective curve color
- Salary Callouts: 20px, Bold (700), `#2E7D32` (green)
- Experience Input Labels: 15px, Medium (500), `#424242`
- Tooltips: 14px, Regular (400), `#FFFFFF`
- Annotations: 13px, Italic (400), `#616161`
- Legend Text: 14px, Regular (400), `#424242`
- Help Text: 12px, Regular (400), `#9E9E9E`

---

## Visualization Structure

### Main Components

**1. Left Input Panel (0-350px width)**

**Section A: Military Experience Input**
- Header: "Your Military Background" (18px, semi-bold)
- Dropdown: "Service Branch"
  - Options: Army, Navy, Air Force, Marines, Coast Guard, Space Force
- Dropdown: "Category"
  - Options: Enlisted, Officer, Warrant Officer
- Slider: "Years of Military Service"
  - Range: 0 to 30 years
  - Current value displayed: Large (24px)
  - Tick marks at: 4, 8, 12, 16, 20, 25, 30
- Display: "Equivalent Civilian Experience"
  - Calculated value: "Approximately X-Y years"
  - Info icon with tooltip explaining credit calculation

**Section B: Career Field Selection**
- Dropdown: "Target Civilian Industry"
  - Options: Technology, Healthcare, Federal Government, Defense Contracting, Finance, Manufacturing, General
- Dropdown: "Career Track"
  - Options: Individual Contributor, Management, Executive
- Checkbox: "I have security clearance" (adds premium if applicable)
- Checkbox: "I have advanced degree (Master's+)" (adjusts starting point)

**Section C: Personalization**
- Input: "Starting Salary (if known)"
  - Optional field
  - If filled, places user's starting point on chart
- Button: "Calculate My Trajectory" (full width, blue)
  - On click: Highlights user's curve, animates from current point

**Section D: Quick Presets (Buttons)**
- "4-Year Enlisted → Tech"
- "8-Year NCO → Federal"
- "12-Year Officer → Management"
- "20-Year Retiree → Defense Contractor"

**2. Main Chart Area (350-1550px width, 100-700px height)**

**X-Axis (Horizontal - Bottom)**
- Label: "Years of Civilian Career Experience"
- Range: 0 to 25 years
- Major ticks every 5 years (0, 5, 10, 15, 20, 25)
- Minor ticks every 1 year
- Grid lines: Vertical, light gray, dashed at major ticks

**Y-Axis (Vertical - Left)**
- Label: "Annual Salary (USD)" (rotated 90°)
- Range: $30,000 to $200,000
- Major ticks every $25,000
- Minor ticks every $10,000
- Grid lines: Horizontal, light gray, dashed at major ticks
- Values formatted: "$50K", "$75K", "$100K", etc.

**Salary Curves (5 Primary Lines):**

Each curve is a smooth Bezier spline connecting experience/salary data points:

**Curve 1: Entry-Level → Early Career (Light Blue `#64B5F6`)**
- Starts at Year 0, $45K
- Steep initial slope (rapid early career growth)
- Plateaus around Year 5, $75K
- Shaded confidence band showing 25th-75th percentile range

**Curve 2: Mid-Level (Blue `#42A5F5`)**
- Starts at Year 5, $70K
- Moderate slope
- Reaches Year 10 at $100K

**Curve 3: Experienced (Dark Blue `#1E88E5`)**
- Starts at Year 10, $90K
- Gentler slope (slower growth)
- Reaches Year 15 at $130K

**Curve 4: Senior (Navy `#1565C0`)**
- Starts at Year 15, $110K
- Shallow slope
- Reaches Year 20 at $160K

**Curve 5: Executive (Midnight Blue `#0D47A1`)**
- Starts at Year 20, $140K
- Nearly flat (minimal growth, high base)
- Reaches Year 25 at $170K

**Industry Overlay Curves (Toggle On/Off):**

Users can toggle specific industry curves on/off via legend checkboxes:

- **Tech Industry** (Purple): Starts higher, steeper growth, peaks earlier
  - Y0: $50K → Y5: $78K → Y10: $88K → Y15: $108K → Y20: $120K

- **Healthcare** (Green): Steady linear growth
  - Y0: $61K → Y5: $85K → Y10: $100K → Y15: $114K → Y20: $125K

- **Federal Government GS** (Orange): Step-wise increments, slower but stable
  - Shows discrete steps within grades
  - Y0 (GS-7): $50K → Y5 (GS-9): $58K → Y10 (GS-11): $75K → Y15 (GS-13): $95K → Y20 (GS-14): $115K

- **Defense Contracting** (Red): Premium for military experience, clearance
  - Y0: $65K → Y5: $95K → Y10: $120K → Y15: $140K → Y20: $155K

**Military Experience Starting Point Overlay:**

When user enters military years:
1. An orange circle (12px radius) appears on the chart at the calculated entry point
2. Example: 8 years military service → Places marker at Year 4-6 civilian equivalent, at industry-appropriate salary
3. A dashed red line extends from this point, following the user's selected career track
4. This "personal trajectory" line animates from the starting point over 2 seconds
5. Tooltip on marker shows:
   - "Your Starting Point"
   - "8 years military = ~5 years civilian credit"
   - "Estimated starting salary: $72,000"
   - "Projected 10-year salary: $108,000 (+$36K)"

**Confidence Bands (Shaded Areas):**

Each major curve has a shaded band representing salary range:
- Upper boundary: 75th percentile
- Lower boundary: 25th percentile
- Fill: Curve color at 30% opacity
- Creates "river" effect showing salary variability

**3. Annotations & Callouts (Floating)**

**Key Insight Boxes:**
- Positioned near relevant curve sections
- White background, subtle shadow
- Small arrow pointing to curve
- Examples:
  - Near Year 0-5: "Steepest growth period: Avg +8-12% annually"
  - Near Year 10: "Mid-career plateau: Growth slows to +4-7%"
  - Near Year 20: "Senior level: Pay tied to leadership roles"

**Milestone Markers:**
- Small circular nodes on curves at significant points
- Hoverable for details
- Examples:
  - "Typical promotion to Manager" (Year 7, ~$85K)
  - "Transition to Senior IC or Management" (Year 10-12)
  - "Peak earning potential" (Year 18-22, varies by track)

**4. Legend (Bottom Section, 100px height)**

**Interactive Legend Toggles:**
- Checkbox for each curve: "☑ Entry-Level Track"
- Color-coded squares next to labels
- Checkboxes allow showing/hiding specific curves
- "Show All" and "Clear All" buttons

**Industry Overlay Toggles:**
- "Industry Comparisons:" label
- Checkboxes: ☐ Tech | ☐ Healthcare | ☐ Federal | ☐ Defense | ☐ Finance
- Only one can be primary, others shown as dotted lines

**Additional Info:**
- Small icon links:
  - ℹ️ "Methodology" - opens modal explaining data sources
  - 📊 "Download Data" - exports CSV
  - 🖨️ "Print Chart" - print-friendly version

**5. Interactive Features**

**Hover Effects:**
- Cursor changes to crosshair when over chart area
- Vertical line follows cursor showing Year value
- Horizontal line shows Salary value
- Intersection point of lines shows tooltip:
  - "Year 8 | $83,000"
  - Displays nearest curve value
  - If user has personal trajectory, shows: "Your projected salary: $XX,XXX"

**Click on Curve:**
- Opens side panel with detailed breakdown
- Shows year-by-year progression table
- Displays percentile ranges
- Lists typical job titles at each level
- "Compare with other tracks" button

**Zoom & Pan:**
- Scroll wheel: Zoom in/out on salary range
- Click and drag: Pan view
- Reset button: Returns to full view

**6. Personal Trajectory Highlight**

When user clicks "Calculate My Trajectory":
1. All curves fade to 40% opacity except user's track
2. User's path highlights with thicker line (4px) and slight glow
3. Starting point pulses (scale animation 1.0 to 1.2)
4. Animated marker travels along user's curve from start to 10-year point (2-second animation)
5. Salary callouts appear at key milestones:
   - Starting: "$XX,XXX"
   - 5 years: "+$XX,XXX (YY% growth)"
   - 10 years: "+$XX,XXX (Total ZZ% growth)"
6. Comparison box appears in top-right corner:
   - "Your 10-Year Projection"
   - "Starting: $72K → Year 10: $108K"
   - "Total increase: +$36K (+50%)"
   - "Beats national average by: +$12K"

---

## Detailed Mockup Description

**Initial Load State:**

User sees a clean line chart with five smooth curves in shades of blue, progressing from light (entry-level) to dark (executive). The curves start at different points on the Y-axis (left) and extend rightward, showing characteristic shapes:
- Entry curve: Steep initial rise, then flattens
- Mid and Experienced curves: Moderate, steady climbs
- Senior and Executive curves: Gentler slopes, higher base

Shaded "confidence bands" around each curve create a "river" effect, showing the 25th-75th percentile salary ranges.

The left sidebar shows input fields prompting the user to enter their military background.

**User Interaction Flow:**

1. **User enters data:**
   - Selects "Army" from Service Branch
   - Selects "Enlisted" from Category
   - Drags slider to "8 years"
   - Display updates: "Equivalent Civilian Experience: Approximately 4-6 years"

2. **User selects career field:**
   - Chooses "Technology" from Industry dropdown
   - Selects "Individual Contributor" for Career Track
   - Checks "I have security clearance"

3. **User clicks "Calculate My Trajectory":**
   - Animation begins:
     - All curves fade to 40% opacity
     - An orange circle appears at Year 5 (civilian equivalent), $75K (tech industry entry for veterans)
     - A bright red dashed line extends from this point
     - The line follows the "Tech Industry" curve (purple)
     - Animated marker travels along the line from Year 5 to Year 15 over 2 seconds
   - Salary callouts pop up:
     - At starting point: "$75,000 (Year 5)"
     - At Year 10: "$95,000 (+$20K)"
     - At Year 15: "$118,000 (+$43K total, 57% growth)"
   - Top-right comparison box appears with summary

4. **User hovers over Year 12:**
   - Crosshair appears
   - Tooltip shows: "Year 12 | Your projected salary: $105,000"
   - "Typical titles: Senior Software Engineer, Tech Lead"

5. **User toggles "Healthcare" overlay:**
   - Green dotted line appears overlaying the chart
   - Shows healthcare progression: slower start but steady growth
   - User can visually compare: Tech has higher initial and mid-career pay, Healthcare catches up slightly at senior levels

6. **User clicks on a curve:**
   - Right-side panel slides in
   - Shows detailed table:
     | Year | 25th %ile | Median | 75th %ile | Typical Titles |
     |------|-----------|--------|-----------|----------------|
     | 0    | $42K      | $50K   | $58K      | Analyst, Associate |
     | 5    | $68K      | $78K   | $90K      | Senior Analyst, Specialist II |
     | 10   | $78K      | $88K   | $102K     | Lead, Manager |
     | 15   | $95K      | $108K  | $125K     | Senior Manager, Director |
     | 20   | $110K     | $120K  | $145K     | Senior Director, VP |

**Mobile Experience:**

- Input panel moves to top (full width)
- Collapsible sections: "Military Background" | "Career Selection"
- Chart rotates to portrait (800px height)
- Horizontal scrolling enabled for timeline
- Pinch-to-zoom for salary scale
- Legend becomes bottom sheet (swipe up to expand)
- Personal trajectory calculation triggers full-screen overlay with animated result

---

## Accessibility Specifications

### WCAG 2.1 AA Compliance

**Color Contrast:**
- All text: Minimum 4.5:1 contrast ratio
- Curve colors: Distinct in colorblind simulations (deuteranopia, protanopia tested)
- Alternative high-contrast mode: Black background, neon curves (yellow, cyan, magenta, white)

**Keyboard Navigation:**
- Tab order: Input panel (top to bottom) → Chart interactive elements → Legend toggles
- Arrow keys: Navigate between curve data points
- Enter/Space: Toggle curve visibility, activate buttons
- '+' / '-' keys: Zoom in/out
- Arrow keys (in chart): Move focus marker along timeline
- Escape: Close side panels or modals
- Focus indicators: 3px solid blue outline

**Screen Reader Support:**
- Chart described via ARIA label: "Interactive line chart showing salary progression by years of experience across five career levels"
- Each curve: "Button: [Curve Name], showing salary from [start] at year 0 to [end] at year [X]. Press Enter for detailed data."
- Data table alternative: "View as Table" button provides accessible table with all data points
- Live region announces: "Your starting point calculated: Year 5, $75,000. Projected 10-year salary: $108,000"
- Input changes announced: "Military experience set to 8 years. Civilian equivalent: 4-6 years."

**Alternative Views:**
- "Table Mode": Complete data table, sortable by any column, filterable by career level
- "Text Summary": Paragraph format describing salary progression for user's selections
- "Simplified Chart": Shows only user's personal trajectory with min/median/max bands
- "Print View": Static PDF with user's inputs and trajectory chart

**Touch Accessibility:**
- All interactive elements: Minimum 44×44px touch targets
- Slider handles: 48px diameter
- Curve selection: Tap anywhere on curve (tolerance: 20px)
- Pinch-to-zoom enabled
- Double-tap curve: Opens detail panel

---

## Technical Implementation Notes

### Technology Stack Recommendation

- **Charting Library:** D3.js v7 for full customization and smooth Bezier curves
- **Alternative:** Recharts (React) with custom line interpolation for faster development
- **Framework:** React 18+ with TypeScript
- **State Management:** React Context API (lightweight needs) or Zustand
- **Animation:** D3 transitions + Framer Motion for UI elements
- **Responsive:** CSS Grid, Flexbox, custom breakpoints
- **Data Processing:** D3-scale, D3-shape for curve interpolation
- **Testing:** Jest, React Testing Library, Axe for accessibility

### Performance Requirements

- **Initial Render:** <1.5 seconds including data load and curve drawing
- **Interaction Latency:** <50ms for hover effects, <100ms for trajectory calculation
- **Animation FPS:** 60fps for smooth line drawing and marker movement
- **Curve Rendering:** <200ms for adding/removing industry overlays
- **Data Size:** ~30KB JSON (all curve data points)
- **Zoom/Pan:** Smooth 60fps performance, <16ms per frame
- **Mobile:** Optimized touch latency <100ms

### Data Update Strategy

- **Annual Major Update:** January (following BLS release and annual salary surveys)
- **Semi-Annual:** July (mid-year market corrections, new survey data)
- **Industry-Specific:** Quarterly reviews for high-volatility sectors (tech, finance)
- **User Contribution:** "Share Your Salary" button collects anonymized data for validation
- **Version Control:** Data version displayed, changelog available
- **Notification:** Users who bookmarked can opt-in to email when data updates significantly

---

## Production Timeline & Resource Estimates

### Phase 1: Data Collection & Model Building (Weeks 1-2)
- **Hours:** 50 hours
- Aggregate salary data from BLS, Dice, Salary.com, PayScale
- Build mathematical models for curve interpolation
- Validate military experience credit calculations with OPM guidelines
- Create industry-specific adjustment factors
- Peer review data accuracy with career counselors
- Stakeholder approval

### Phase 2: Design & Prototyping (Weeks 2-3)
- **Hours:** 40 hours
- High-fidelity Figma mockups (desktop, tablet, mobile)
- Interactive prototype for usability testing
- Color accessibility testing (colorblind simulations)
- User testing with 8-10 veterans (varying experience levels)
- Iterate based on feedback

### Phase 3: Core Chart Development (Weeks 4-5)
- **Hours:** 70 hours
- D3 setup: scales, axes, grid
- Bezier curve rendering with smooth interpolation
- Confidence band shading (25th-75th percentile)
- Axis labels, tick marks, formatting
- Responsive container with breakpoints
- Zoom and pan functionality

### Phase 4: Interactive Features (Week 6)
- **Hours:** 45 hours
- Hover effects: crosshair, tooltips, value display
- Click handlers: curve selection, detail panels
- Legend toggles: show/hide curves
- Industry overlay toggles
- Personal trajectory calculation logic
- Animation: marker movement, line drawing

### Phase 5: Input Panel & Personalization (Week 7)
- **Hours:** 40 hours
- Form components: dropdowns, sliders, checkboxes
- Military experience calculator
- Career field selection and filtering
- "Calculate My Trajectory" functionality
- Personal projection visualization
- Comparison box

### Phase 6: Accessibility & Alternative Views (Week 8)
- **Hours:** 35 hours
- Keyboard navigation implementation
- ARIA labels and semantic structure
- Screen reader testing (NVDA, JAWS)
- Table view alternative
- Print and PDF export
- High-contrast mode
- Automated accessibility testing (axe-core)

### Phase 7: Polish & Deployment (Week 9)
- **Hours:** 30 hours
- Animation refinement and timing
- Performance optimization (code splitting, memoization)
- Cross-browser testing
- Mobile device testing (iOS, Android)
- Analytics integration (track curve interactions, popular careers)
- Documentation and user guide
- Production deployment

**Total Estimated Hours:** 310 hours (9-10 weeks with one full-time developer, or 7-8 weeks with 1.5 FTE)

**Maintenance:** 10 hours/quarter for data updates and minor enhancements

---

## Success Metrics

### User Engagement
- **Target:** 70% of users interact with at least one curve (hover or click)
- **Target:** 50% enter military experience and calculate personal trajectory
- **Target:** 30% toggle at least one industry comparison
- **Target:** Average session duration >4 minutes
- **Measurement:** Event tracking, heatmaps, Google Analytics

### Information Comprehension
- **Survey:** "Do you understand how your military experience translates to civilian salary expectations?"
  - **Target:** 90% respond "Yes" or "Strongly Yes"
- **Survey:** "Can you estimate your salary 5 and 10 years into your civilian career?"
  - **Target:** 80% provide estimates within ±15% of tool's projection
- **A/B Test:** Users who view experience curves have more realistic salary expectations in career counseling
  - **Target:** 50% improvement in expectation alignment

### Accessibility Performance
- **Target:** 100% WCAG 2.1 AA compliance (automated tests)
- **Target:** 95% task completion rate for keyboard-only users (n=5)
- **Target:** 90% task completion rate for screen reader users (n=5)
- **Measurement:** Automated axe scans, moderated usability testing

### Business Impact
- **Target:** 35% increase in career planning tool usage
- **Target:** 25% reduction in "salary expectations" questions to counselors
- **Target:** 40% of users who view tool subsequently explore specific career guides
- **Target:** 200+ user testimonials collected in first year
- **Target:** Featured in 3+ veteran career publications
- **Measurement:** Analytics, counselor surveys, UTM tracking, media mentions

### Data Quality & Trust
- **Target:** <3% of users report data feeling "inaccurate"
- **Target:** 85%+ users rate tool as "very helpful" or "extremely helpful"
- **Target:** 500+ voluntary salary data submissions in first year (for validation)
- **Measurement:** Feedback surveys, user submissions

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-11-11 | Military Transition Toolkit Team | Initial specification with 2024-2025 salary progression data |

---

## Appendix: Data Sources & Methodology

### Source URLs & Credibility

1. **Dice Tech Salary Survey 2024**
   - URL: dice.com/technologists/ebooks/tech-salary-report/
   - Credibility: **High** - Industry-leading tech recruitment platform
   - Data: Experience-based progression ($50,321 at <1 year to $115,399 at 15+ years)

2. **U.S. Bureau of Labor Statistics (2024)**
   - URL: bls.gov/oes/
   - Credibility: **Highest** - Primary government source
   - Data: Occupational wage data by experience proxy (age)

3. **Salary.com Veteran Analysis (2025)**
   - Credibility: **Medium-High** - Large employer-reported database
   - Data: Veteran salaries by age cohort (20s: $38,700 to 50s: $77,600)

4. **PayScale 2024 Salary Reports**
   - Credibility: **High** - Individual salary reports, large sample size
   - Data: Experience curves across industries

5. **Federal OPM Guidelines**
   - URL: opm.gov/policy-data-oversight/
   - Credibility: **Highest** - Official federal policy
   - Data: Military experience credit for GS positions (leave accrual, discretionary step placement)

### Military Experience Credit Calculation Methodology

**Conservative Approach:**
- Military experience credit = 0.5 to 0.75 × years served (depends on relevance)
- Example: 8 years military → 4-6 years civilian credit
- Leadership roles get higher credit (0.75-1.0×)
- Technical specialties with direct civilian equivalents: up to 1.0× credit
- General military service: 0.5× credit

**Industry Variations:**
- Federal Government: Full credit for leave accrual, discretionary for pay step
- Defense Contracting: 0.75-1.0× credit (high military experience value)
- Tech Industry: 0.25-0.5× credit (less direct transferability, but leadership valued)
- Healthcare: 0.5-0.75× credit (clinical experience counts more)

**Sources:**
- OPM Qualification Standards
- Interviews with 50+ HR professionals at veteran-friendly employers
- Analysis of veteran starting salaries vs. experience (regression analysis)

### Curve Interpolation Methodology

- **Base Data:** Salary survey medians at 0, 1, 3, 5, 8, 10, 12, 15, 18, 20 years
- **Interpolation:** Monotonic cubic spline (ensures no unrealistic dips)
- **Confidence Bands:** Calculated from 25th and 75th percentile survey data
- **Smoothing:** Applied to prevent jagged transitions between data points
- **Validation:** Curves reviewed by career counselors and economists for realism

### Known Limitations

- **Individual variation is high:** Tool shows medians and ranges, but personal circumstances (education, location, negotiation skills) cause significant deviation
- **Industry differences:** Even within "Tech" or "Healthcare," sub-fields vary dramatically
- **Economic cycles:** Salary growth rates reflect 2020-2024 trends (post-pandemic, high inflation); future growth may differ
- **Military credit is not guaranteed:** Civilian employers have full discretion; tool shows typical credit, not guaranteed
- **Geographic adjustment not included:** Curves show national data; COL adjustments not applied (see separate geographic tool)
- **Promotion timing unpredictable:** Curves assume steady progression; actual careers have plateaus, jumps, and lateral moves

**Disclaimer for Users:** This tool provides general guidance based on aggregate data. Your individual experience will vary based on many factors including education, location, industry, employer, negotiation, and economic conditions. Use as a planning tool, not a guarantee.

---

**Specification Status:** Ready for Design & Development
**Priority:** High - Experience-to-salary mapping is critical for setting realistic veteran expectations
**Next Steps:** Data model finalization → Design mockups → User testing → Development sprint
