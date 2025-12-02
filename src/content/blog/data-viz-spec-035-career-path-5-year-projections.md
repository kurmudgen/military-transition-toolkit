---
date: "2026-02-09"
---# Data Visualization Specification #035: Career Path 5-Year Salary Projections

## Overview

**Visualization Title:** 5-Year Salary Projections: Charting Your Career Path from Military Transition
**Visualization Type:** Interactive Multi-Line Projection Chart with Scenario Comparison
**Target Audience:** Military service members planning their transition and evaluating long-term career potential
**Primary Goal:** Project realistic 5-year salary trajectories across different career paths to help veterans choose careers aligned with their financial goals and growth expectations

## Purpose & Context

Transitioning service members often make career decisions based on starting salaries without understanding long-term earning potential and growth trajectories. A technology role starting at $75,000 might reach $150,000 in five years (100% growth), while a government position starting at $85,000 might only reach $105,000 (24% growth). These differences compound significantly over decades.

This visualization projects realistic 5-year salary growth across eight career paths commonly pursued by veterans: Software Engineering, Cybersecurity, Project Management, Healthcare, Skilled Trades, Government (GS Scale), Defense Contracting, and Corporate Management. By showing optimistic, realistic, and conservative scenarios with annual salary milestones, veterans can evaluate which paths offer the growth they need to meet their financial objectives while accounting for factors like performance, certifications, and market conditions.

## Data Specifications

### Data Sources
- Bureau of Labor Statistics (BLS) Employment Projections 2024-2034
- SHRM Salary Increase Projections 2024-2025 (3.9% average)
- Dice Tech Salary Report 2024-2025 (tech-specific growth rates)
- Conference Board Salary Increase Budgets 2024-2025
- PayScale career progression data
- Industry-specific compensation surveys (technology, healthcare, defense)
- Veteran employment outcome data (BLS, Census Bureau)

### Sample Data Structure

```json
{
  "careerPaths": [
    {
      "name": "Software Engineering",
      "militaryMOS": ["Navy IT, ET", "Army 25B, 17C", "Air Force 3D0X2, 1B4X1", "Marines 0651, 0689"],
      "startingSalary": 75000,
      "scenarios": {
        "optimistic": {
          "growthRate": 0.20,
          "description": "Top performer, rapid promotions, hot market",
          "yearlyProjections": [75000, 95000, 120000, 150000, 180000, 215000]
        },
        "realistic": {
          "growthRate": 0.12,
          "description": "Solid performer, normal career progression",
          "yearlyProjections": [75000, 85000, 96000, 108000, 122000, 138000]
        },
        "conservative": {
          "growthRate": 0.06,
          "description": "Slower market, limited advancement",
          "yearlyProjections": [75000, 80000, 85000, 91000, 97000, 103000]
        }
      },
      "fiveYearTotalEarnings": {
        "optimistic": 760000,
        "realistic": 511000,
        "conservative": 436000
      },
      "keyMilestones": [
        "Year 1: Junior Developer",
        "Year 2-3: Mid-Level Engineer",
        "Year 4-5: Senior Engineer or Tech Lead"
      ],
      "certifications": ["AWS Certified", "Google Cloud Professional", "Security+ for defense roles"]
    },
    {
      "name": "Cybersecurity",
      "militaryMOS": ["Navy CTN, IT", "Army 17C, 35Q", "Air Force 1B4X1, 3D0X3", "Marines 0689"],
      "startingSalary": 80000,
      "scenarios": {
        "optimistic": {
          "growthRate": 0.18,
          "description": "High-demand specialization, security clearance",
          "yearlyProjections": [80000, 100000, 125000, 155000, 185000, 220000]
        },
        "realistic": {
          "growthRate": 0.11,
          "description": "Steady career growth with certifications",
          "yearlyProjections": [80000, 90000, 101000, 113000, 126000, 141000]
        },
        "conservative": {
          "growthRate": 0.055,
          "description": "Limited specialization, competitive market",
          "yearlyProjections": [80000, 85000, 90000, 95000, 101000, 107000]
        }
      },
      "fiveYearTotalEarnings": {
        "optimistic": 845000,
        "realistic": 530000,
        "conservative": 461000
      },
      "keyMilestones": [
        "Year 1: Security Analyst",
        "Year 2-3: Security Engineer",
        "Year 4-5: Senior Security Engineer or Architect"
      ],
      "certifications": ["CISSP", "CEH", "Security+ (required for DoD)", "OSCP for advanced roles"]
    },
    {
      "name": "Project Management",
      "militaryMOS": ["Any leadership MOS", "Officers O-3+", "Senior NCOs E-7+"],
      "startingSalary": 72000,
      "scenarios": {
        "optimistic": {
          "growthRate": 0.15,
          "description": "PMP certified, enterprise clients, strong results",
          "yearlyProjections": [72000, 85000, 100000, 118000, 138000, 160000]
        },
        "realistic": {
          "growthRate": 0.09,
          "description": "Typical progression with certifications",
          "yearlyProjections": [72000, 79000, 87000, 96000, 105000, 115000]
        },
        "conservative": {
          "growthRate": 0.05,
          "description": "Limited advancement, smaller organizations",
          "yearlyProjections": [72000, 76000, 80000, 84000, 89000, 94000]
        }
      },
      "fiveYearTotalEarnings": {
        "optimistic": 601000,
        "realistic": 469000,
        "conservative": 401000
      },
      "keyMilestones": [
        "Year 1: Associate/Junior PM",
        "Year 2-3: Project Manager (PMP certification)",
        "Year 4-5: Senior PM or Program Manager"
      ],
      "certifications": ["PMP", "Agile/Scrum Master", "PMI-ACP"]
    },
    {
      "name": "Healthcare (Nursing/Allied Health)",
      "militaryMOS": ["Navy HM", "Army 68-series", "Air Force 4N0X1, 4A0X1"],
      "startingSalary": 65000,
      "scenarios": {
        "optimistic": {
          "growthRate": 0.10,
          "description": "Advanced certifications, specialty nursing",
          "yearlyProjections": [65000, 73000, 82000, 92000, 103000, 115000]
        },
        "realistic": {
          "growthRate": 0.06,
          "description": "Normal career advancement with experience",
          "yearlyProjections": [65000, 69000, 73000, 78000, 83000, 88000]
        },
        "conservative": {
          "growthRate": 0.03,
          "description": "Limited specialization, rural/lower-cost areas",
          "yearlyProjections": [65000, 67000, 69000, 71000, 73000, 76000]
        }
      },
      "fiveYearTotalEarnings": {
        "optimistic": 465000,
        "realistic": 388000,
        "conservative": 356000
      },
      "keyMilestones": [
        "Year 1: RN or Licensed Allied Health Professional",
        "Year 2-3: Specialized certification (ICU, ER, etc.)",
        "Year 4-5: Charge Nurse or Department Lead"
      ],
      "certifications": ["BSN", "Specialty certifications (CCRN, CEN)", "Nurse Practitioner for advanced growth"]
    },
    {
      "name": "Skilled Trades (Electrician)",
      "militaryMOS": ["Navy EM, ET", "Army 12R", "Air Force 3E0X1", "Seabees"],
      "startingSalary": 42000,
      "scenarios": {
        "optimistic": {
          "growthRate": 0.14,
          "description": "Union journeyman, business ownership path",
          "yearlyProjections": [42000, 50000, 60000, 72000, 86000, 102000]
        },
        "realistic": {
          "growthRate": 0.10,
          "description": "Journeyman certification, steady advancement",
          "yearlyProjections": [42000, 47000, 53000, 60000, 67000, 75000]
        },
        "conservative": {
          "growthRate": 0.06,
          "description": "Non-union, limited specialization",
          "yearlyProjections": [42000, 45000, 48000, 51000, 54000, 58000]
        }
      },
      "fiveYearTotalEarnings": {
        "optimistic": 370000,
        "realistic": 289000,
        "conservative": 256000
      },
      "keyMilestones": [
        "Year 0-4: Apprentice (40-90% journeyman wage)",
        "Year 4: Journeyman certification",
        "Year 5+: Master electrician or business owner"
      ],
      "certifications": ["Journeyman License", "Master Electrician", "Specialized certifications (industrial, solar)"]
    },
    {
      "name": "Federal Government (GS Scale)",
      "militaryMOS": ["All veterans receive preference"],
      "startingSalary": 68000,
      "scenarios": {
        "optimistic": {
          "growthRate": 0.08,
          "description": "Rapid step/grade increases, promotions",
          "yearlyProjections": [68000, 75000, 83000, 92000, 101000, 111000]
        },
        "realistic": {
          "growthRate": 0.045,
          "description": "Standard step increases, normal progression",
          "yearlyProjections": [68000, 71000, 75000, 78000, 82000, 86000]
        },
        "conservative": {
          "growthRate": 0.025,
          "description": "Slow advancement, hiring freezes",
          "yearlyProjections": [68000, 70000, 72000, 74000, 76000, 78000]
        }
      },
      "fiveYearTotalEarnings": {
        "optimistic": 462000,
        "realistic": 386000,
        "conservative": 370000
      },
      "keyMilestones": [
        "Year 1: GS-9/11 entry with veteran preference",
        "Year 2-3: GS-12/13 specialist",
        "Year 4-5: GS-13/14 senior specialist or supervisor"
      ],
      "certifications": ["Security clearance", "Professional certifications in specialty area"]
    },
    {
      "name": "Defense Contracting",
      "militaryMOS": ["All, especially with security clearances"],
      "startingSalary": 85000,
      "scenarios": {
        "optimistic": {
          "growthRate": 0.13,
          "description": "TS/SCI clearance, high-demand skills",
          "yearlyProjections": [85000, 100000, 118000, 138000, 161000, 187000]
        },
        "realistic": {
          "growthRate": 0.08,
          "description": "Stable contracts, normal progression",
          "yearlyProjections": [85000, 92000, 100000, 109000, 118000, 128000]
        },
        "conservative": {
          "growthRate": 0.04,
          "description": "Contract instability, limited advancement",
          "yearlyProjections": [85000, 89000, 93000, 97000, 101000, 105000]
        }
      },
      "fiveYearTotalEarnings": {
        "optimistic": 704000,
        "realistic": 527000,
        "conservative": 485000
      },
      "keyMilestones": [
        "Year 1-2: Junior/Mid-Level Contractor",
        "Year 3-4: Senior Contractor",
        "Year 5+: Principal Contractor or Technical Lead"
      ],
      "certifications": ["Active security clearance (critical)", "Technical certifications in specialty"]
    },
    {
      "name": "Corporate Management",
      "militaryMOS": ["Officers and senior NCOs with leadership experience"],
      "startingSalary": 78000,
      "scenarios": {
        "optimistic": {
          "growthRate": 0.16,
          "description": "Strong performance, executive track",
          "yearlyProjections": [78000, 93000, 110000, 130000, 153000, 180000]
        },
        "realistic": {
          "growthRate": 0.10,
          "description": "Steady management progression",
          "yearlyProjections": [78000, 87000, 97000, 108000, 120000, 133000]
        },
        "conservative": {
          "growthRate": 0.05,
          "description": "Limited advancement opportunities",
          "yearlyProjections": [78000, 82000, 87000, 91000, 96000, 101000]
        }
      },
      "fiveYearTotalEarnings": {
        "optimistic": 666000,
        "realistic": 510000,
        "conservative": 456000
      },
      "keyMilestones": [
        "Year 1: Manager/Supervisor",
        "Year 2-3: Department Manager or Senior Manager",
        "Year 4-5: Director or VP track"
      ],
      "certifications": ["MBA (significant boost)", "Industry-specific management certifications"]
    }
  ],
  "averageAnnualGrowthRates": {
    "optimistic": 0.14,
    "realistic": 0.084,
    "conservative": 0.046
  },
  "marketFactors": {
    "overallSalaryIncreaseBudget2025": 0.039,
    "techSectorGrowth": 0.06,
    "healthcareGrowth": 0.04,
    "governmentGrowth": 0.031
  }
}
```

## Visual Design Specifications

### Layout & Dimensions
- **Canvas Size:** 1600px width × 1000px height
- **Chart Area:** 1400px width × 700px height
- **Margins:** Top: 120px, Right: 120px, Bottom: 120px, Left: 130px
- **Line Thickness:** 3px for career path lines
- **Data Point Markers:** 8px radius circles at each year
- **Scenario Variation:** Shaded confidence bands between optimistic and conservative

### Color Palette

**Career Path Colors:**
- Software Engineering: `#10B981` (Emerald Green - tech growth)
- Cybersecurity: `#8B5CF6` (Purple - security)
- Project Management: `#F59E0B` (Amber - coordination)
- Healthcare: `#06B6D4` (Cyan - medical)
- Skilled Trades: `#F97316` (Orange - hands-on work)
- Federal Government: `#DC2626` (Red - government)
- Defense Contracting: `#1E40AF` (Royal Blue - defense)
- Corporate Management: `#7C3AED` (Violet - business)

**Scenario Indicators:**
- Optimistic Line: Solid 3px with brighter tint (+30% brightness)
- Realistic Line: Solid 3px standard color
- Conservative Line: Dashed 2px with darker tint (-20% brightness)
- Confidence Band: Gradient fill between optimistic and conservative at 10% opacity

**Supporting Colors:**
- Background: `#FFFFFF` (White)
- Grid Lines: `#E5E7EB` (Light Gray)
- Text Primary: `#0F172A` (Very Dark Blue-Gray)
- Text Secondary: `#64748B` (Medium Gray)
- Milestone Markers: `#FCD34D` (Gold stars)
- Growth Rate Indicators: `#10B981` (Green for positive)

### Typography
- **Title:** Inter Bold, 40px, #0F172A, Letter-spacing: -0.75px
- **Subtitle:** Inter Regular, 18px, #64748B, Line-height: 30px
- **Career Path Labels:** Inter Semibold, 16px, Path-specific colors
- **Axis Labels:** Inter Medium, 15px, #334155
- **Salary Values:** Inter Bold, 17px, #059669
- **Year Labels:** Inter Medium, 14px, #475569
- **Scenario Labels:** Inter Regular, 13px, #64748B, Italic
- **Tooltips:** Inter Regular, 15px, #1F2937
- **Growth Rate:** Inter Bold, 16px, #10B981
- **Legend:** Inter Medium, 14px, matching path colors

### Interactive Elements

**Hover State - Career Path Line:**
- Brighten hovered line to 130% brightness
- Dim all other lines to 25% opacity
- Show confidence band for hovered path
- Display data markers at each year along the line
- Present comprehensive tooltip at cursor year:
  - Career path name
  - Current year salary (optimistic/realistic/conservative)
  - Year-over-year growth percentage
  - Cumulative earnings to date
  - Key milestone for this year
  - Certifications recommended
- Example tooltip: "Software Engineering - Year 3\nOptimistic: $120,000 (+26% YoY)\nRealistic: $96,000 (+13% YoY)\nConservative: $85,000 (+6% YoY)\nCumulative: $290K (realistic)\nMilestone: Mid-Level Engineer\nRecommend: AWS Certified Solutions Architect"

**Hover State - Data Point Marker:**
- Enlarge marker to 14px radius with pulse animation
- Display exact salary and year
- Show comparison to military pay at equivalent experience level
- Example: "Year 3 - $96,000\nVs. E-6 (8 YOS): $72,300 (+33%)"

**Click Interaction - Career Path Selection:**
- Click on any career path line to "pin" it for detailed comparison
- Pin up to 3 paths simultaneously for side-by-side analysis
- Display comparison panel showing:
  - Starting salary vs. Year 5 salary for each pinned path
  - Total 5-year earnings (realistic scenario)
  - Average annual growth rate
  - Key certifications and milestones
  - Pros/cons summary
- Pinned paths remain highlighted while others are dimmed

**Scenario Toggle:**
- Radio button or slider control to switch between:
  - "Show All Scenarios" (default): Display optimistic, realistic, conservative with confidence bands
  - "Realistic Only": Show only realistic projections for cleaner comparison
  - "Range View": Show only confidence bands without individual lines

**Comparison Mode:**
- Toggle button to activate "Military Pay Comparison"
- Adds dashed horizontal reference lines for military pay:
  - E-6 progression (Years 8-12): $72K → $85K
  - E-7 progression (Years 13-17): $85K → $95K
  - Shows civilian paths relative to staying active duty

**Filter Options:**
- Security Clearance: Filter to paths that value/require clearances (Cybersecurity, Defense Contracting)
- Technical vs. Non-Technical: Group by role type
- Starting Salary Range: Filter paths by starting salary ($40K-$60K, $60K-$80K, $80K+)

### Responsive Behavior
- **Mobile (< 768px):** Display one career path at a time with dropdown selection, vertical scrollable milestones, swipe between paths
- **Tablet (768px - 1024px):** Show 4 paths with toggle to see others, reduce chart height to 600px, simplified scenario view
- **Desktop (> 1024px):** Full specifications as listed

## Detailed Mockup Description

### Main Chart Area
The visualization displays eight colored trajectory lines representing 5-year salary projections (Year 0-5 on X-axis, $40K-$220K on Y-axis). Lines start at their respective starting salaries on the left (Year 0) and progress rightward, showing salary growth over five years.

**X-Axis (Time):**
- Range: Year 0 to Year 5
- Major gridlines at each year (vertical, 1px solid #E5E7EB)
- Labels: "Year 0" (Transition), "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"
- Below axis, add experience context: "0 = Transition | 1 = 1st civilian year | 5 = Established professional"

**Y-Axis (Annual Salary):**
- Range: $40,000 to $220,000
- Major gridlines every $20,000 (horizontal, 1px solid #E5E7EB)
- Labels aligned right: "$40K", "$60K", "$80K", ..., "$220K"
- Secondary axis on right showing cumulative 5-year earnings

### Career Path Lines
Each career path displays three scenario lines (optimistic, realistic, conservative) with confidence band:

**Software Engineering (Emerald Green):** Starts at $75K, realistic path reaches $138K (Year 5), optimistic reaches $215K, conservative reaches $103K. Steepest growth in Years 2-3 representing mid-level promotion.

**Cybersecurity (Purple):** Starts at $80K, realistic reaches $141K, optimistic reaches $220K (highest growth potential). Clear acceleration in Years 3-4 with advanced certifications.

**Project Management (Amber):** Starts at $72K, realistic reaches $115K, optimistic reaches $160K. Steady upward progression, PMP certification milestone at Year 2 marked with gold star.

**Healthcare (Cyan):** Starts at $65K, realistic reaches $88K, optimistic reaches $115K. Most gradual progression, specialty certification milestone at Year 2-3.

**Skilled Trades (Orange):** Starts lowest at $42K, realistic reaches $75K, optimistic reaches $102K. Notable inflection point at Year 4 (journeyman certification) marked with gold star.

**Federal Government (Red):** Starts at $68K, realistic reaches $86K, optimistic reaches $111K. Most consistent/predictable progression, smallest variance between scenarios.

**Defense Contracting (Royal Blue):** Starts at $85K (highest starting), realistic reaches $128K, optimistic reaches $187K. Clearance level upgrades marked with gold stars at Years 2 and 4.

**Corporate Management (Violet):** Starts at $78K, realistic reaches $133K, optimistic reaches $180K. MBA milestone potential at Year 2-3 marked with gold star.

### Confidence Bands
Each career path has a shaded area between optimistic and conservative lines at 10% opacity in the path's color, visually representing the salary range based on performance, market conditions, and individual factors.

### Data Point Markers
Small circular markers (8px radius) at each year on the realistic projection line, styled as donut charts (3px stroke in path color, white fill). On hover, markers enlarge and display year-specific data.

### Milestone Markers
Gold star icons (12px) positioned above relevant years indicating key career milestones:
- Certification achievements (PMP, CISSP, Journeyman License)
- Typical promotion points (Junior → Mid-Level → Senior)
- Clearance upgrades (Secret → TS → TS/SCI)

### Military Pay Reference (Toggle Option)
When activated, display two dashed horizontal reference lines:
- **E-6 Range (8-12 YOS):** Starting at $72K (Year 0) gradually increasing to $85K (Year 5)
- **E-7 Range (13-17 YOS):** Starting at $85K (Year 0) gradually increasing to $95K (Year 5)

These lines help veterans compare civilian growth to staying in military, with annotation: "Military pay includes base + BAH + BAS (taxable equivalent ~$85K-$115K over 5 years)"

### Key Insights Callouts
Three annotated callout boxes:

1. **Highest Growth:** Arrow to Software Engineering optimistic line: "Software Engineering offers 187% growth potential over 5 years, from $75K to $215K in optimistic scenario—ideal for technically skilled veterans"

2. **Steady Growth:** Arrow to Federal Government: "Federal Government provides most predictable growth (±15% variance) with strong job security and benefits—best for stability seekers"

3. **Clearance Value:** Arrow to Defense Contracting and Cybersecurity: "Security clearances add 20-40% premium—veterans with TS/SCI clearances see accelerated growth in these paths"

### Legend & Controls
Top-right corner panel with rounded white background (#F9FAFB, 12px border-radius, subtle shadow):
- **Career Path Colors:** 8 rows with color line samples (25px wide, 3px thick) and path names
- **Scenario Legend:**
  - Solid bright line = Optimistic
  - Solid standard line = Realistic (default)
  - Dashed dark line = Conservative
  - Shaded band = Salary range
- **Controls:**
  - Scenario view toggle (All / Realistic Only / Range)
  - Military comparison toggle checkbox
  - Path comparison mode button ("Compare Up to 3")

### Bottom Comparison Panel
Below chart, display summary statistics table:

| Career Path | Starting | Year 5 (Realistic) | 5-Year Total | Avg Growth | Key Certification |
|-------------|----------|-------------------|--------------|------------|------------------|
| Software Eng | $75K | $138K | $511K | 12%/yr | AWS Certified |
| Cybersecurity | $80K | $141K | $530K | 11%/yr | CISSP |
| Project Mgmt | $72K | $115K | $469K | 9%/yr | PMP |
| Healthcare | $65K | $88K | $388K | 6%/yr | BSN |
| Skilled Trades | $42K | $75K | $289K | 10%/yr | Journeyman |
| Federal Gov | $68K | $86K | $386K | 4.5%/yr | Clearance |
| Defense Contr | $85K | $128K | $527K | 8%/yr | TS/SCI |
| Corp Mgmt | $78K | $133K | $510K | 10%/yr | MBA |

### Timeline Annotations
Along bottom X-axis, add context markers for typical career milestones:
- Year 0: "Transition from military"
- Year 1: "Establish civilian credibility"
- Year 2: "First major certification/promotion"
- Year 3: "Mid-career advancement"
- Year 4: "Specialization/leadership track"
- Year 5: "Established professional, clear trajectory"

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
- Color contrast ratios:
  - Text on white: 10:1 (AAA)
  - Career path lines: 7:1 minimum, supplemented with line patterns
- Pattern overlay option: Each path uses distinct line pattern (solid, dashed, dotted, dash-dot, double) in addition to color
- Focus indicators: 4px solid outline (#10B981) with 2px white offset
- All data represented visually is also available in text alternative

### Screen Reader Support
- Full ARIA labels for all chart elements
- Data table alternative view (keyboard shortcut: Alt+T)
- Example alt text: "Line chart showing 5-year salary projections for eight career paths. Software Engineering starts at $75,000 and reaches $138,000 in year 5 under realistic scenario (12% annual growth). Cybersecurity starts at $80,000 and reaches $141,000 (11% annual growth). Federal Government starts at $68,000 and reaches $86,000 (4.5% annual growth), offering most predictable trajectory."
- Live region announcements for scenario changes and path selections

### Keyboard Navigation
- Tab through career paths top to bottom in legend
- Enter/Space to select/pin path for comparison (up to 3)
- Arrow keys to move between years along selected path
- S to cycle through scenario views (All / Realistic / Range)
- M to toggle military pay comparison
- C to enter comparison mode
- Number keys 1-8 to quickly select corresponding career path
- Escape to reset all selections
- ? to open keyboard shortcut help overlay

### Cognitive Accessibility
- Clear visual hierarchy with distinct colors and progressive disclosure
- Consistent upward-sloping lines (positive growth reinforcement)
- Option to view simplified chart (realistic scenario only, 4 paths maximum)
- Step-by-step tutorial mode explaining how to read projections
- Milestone markers provide clear progression context
- Dyslexia-friendly font option (OpenDyslexic toggle)
- Print-friendly version with high-contrast colors and data table

## Technical Implementation Notes

### Recommended Libraries/Frameworks
- **Primary:** D3.js v7.8+ for multi-line chart with confidence bands
- **Alternative:** Recharts (React) or Chart.js with line chart plugin
- **Animation:** GSAP v3.12+ for line drawing and interactive transitions
- **Accessibility:** @react-aria/visually-hidden, @react-aria/focus, @react-aria/table
- **Data Management:** React Query or SWR for caching projection data

### Animation Specifications
**Initial Load:**
1. Axes and gridlines fade in (400ms ease-out)
2. Career path lines draw from left to right sequentially (1500ms per line, ease-in-out, staggered 150ms delay)
3. Confidence bands fade in as lines complete (600ms ease-out)
4. Data point markers appear with scale-in animation (300ms, staggered 50ms)
5. Milestone stars pop in last (400ms bounce ease-out)

**Interaction:**
- Hover: 250ms color and opacity transitions
- Pin/select: 500ms highlight with pulse animation
- Scenario toggle: 700ms cross-fade between views
- Military comparison: 600ms slide-in for reference lines

### Data Updates
- Annual update with latest salary survey data (BLS, industry reports)
- Quarterly review of growth rate assumptions based on market conditions
- Include data timestamp: "Projections based on 2024-2025 market data"
- API endpoint: `/api/v1/career-salary-projections`
- Cache strategy: Browser cache for 30 days, revalidate on new session

### Performance Optimization
- Use Canvas rendering for confidence bands (performance)
- SVG for lines, markers, and text (accessibility and quality)
- Lazy load comparison panels and detailed tooltips
- Debounce hover events (200ms delay)
- Memoize projection calculations (recalculate only on scenario change)
- Optimize for 8 concurrent paths without performance degradation
- Target metrics: < 200ms time to interactive, < 550KB total asset size
- Lighthouse performance score: 90+

### Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions (test line rendering and gradients extensively)
- Mobile Safari iOS: 15+
- Chrome Android: Last 2 versions
- Graceful degradation: Simplified bar chart showing starting vs. Year 5 salary for older browsers

## Content Requirements

### Title & Subtitle
**Title:** "5-Year Salary Projections: Charting Your Career Path from Military Transition"

**Subtitle:** "See realistic salary growth trajectories for eight career paths commonly pursued by veterans. Understand optimistic, realistic, and conservative scenarios to choose a path aligned with your financial goals. Most civilian careers offer 6-12% annual growth, compared to 4.5% in federal government or military advancement."

### Educational Context Panel
Include expandable information panel (?) with:

**Understanding the Projections:**

**Three Scenarios Explained:**
- **Optimistic (20-80th percentile):** Strong performer in hot market. Rapid promotions, sought-after skills, ideal conditions. Includes: bonuses, equity growth, fast-track advancement, high-demand specializations.

- **Realistic (50th percentile - median):** Solid performer with normal career progression. Represents typical advancement for competent professionals. Accounts for: standard promotions, normal market conditions, steady skill development, typical certification timeline.

- **Conservative (20-40th percentile):** Slower market, limited advancement, or geographic constraints. Represents: competitive markets, slower skill development, limited specialization, economic downturns.

**Growth Rate Factors:**
What determines your trajectory:
1. **Performance:** Top 20% of performers see 2-3x faster salary growth
2. **Certifications:** Key certifications add 15-25% salary premium (PMP, CISSP, AWS, etc.)
3. **Market Demand:** High-demand skills (cybersecurity, software engineering) command premium growth
4. **Location:** Major tech hubs offer 30-40% higher salaries than national averages
5. **Company Size:** Large enterprises typically offer more structured advancement but slower initial growth than startups

**Military to Civilian Translation:**
- Year 0-1: Equivalent to E-4/E-5 transitioning (~6-8 years service)
- Year 2-3: Comparable growth to E-6 advancement (10-12 years service)
- Year 4-5: Approaching E-7/O-3 compensation (14-16 years service) but without pension eligibility

**Cumulative Earnings:**
5-year total earnings (realistic scenarios):
- Software Engineering: $511,000
- Cybersecurity: $530,000
- Defense Contracting: $527,000
- Corporate Management: $510,000
- Project Management: $469,000
- Healthcare: $388,000
- Federal Government: $386,000
- Skilled Trades: $289,000 (but lowest cost of entry, fastest to journeyman)

**Key Decision Factors:**

**Choose High-Growth Paths (Software/Cyber/Defense) if:**
- You have or can quickly develop technical skills
- You're willing to continuously learn and certify
- You value maximum earning potential over stability
- You have security clearance (major advantage for defense/cyber)

**Choose Steady Paths (Government/Healthcare) if:**
- You prioritize job security and work-life balance
- You value predictable advancement and pension eligibility (federal)
- You prefer structured career ladder over market-driven growth
- You want to serve public mission vs. private sector profit

**Choose Skilled Trades if:**
- You have hands-on technical aptitude from military
- You prefer tangible work over desk-based roles
- You want fastest path to self-employment/business ownership
- You live in area with strong union presence (higher wages)

**Maximizing Your Trajectory:**
- **Year 1:** Focus on establishing credibility, learn civilian workplace norms, identify skill gaps
- **Year 2:** Pursue first major certification in your field (PMP, CISSP, AWS, etc.)
- **Year 3:** Seek promotion or job change for 15-25% raise (job hoppers earn 20-30% more)
- **Year 4:** Develop specialization or move into leadership track
- **Year 5:** Reassess trajectory, consider MBA/advanced degree, evaluate company/industry change

### Contextual Notes
**Footnotes:**
- *Projections based on 2024-2025 market data: BLS, SHRM, Dice Tech Salary Report, PayScale
- *Growth rates assume competent performance and typical career advancement; individual results vary
- *Starting salaries represent national averages for mid-cost living areas; adjust ±20-30% for location
- *Optimistic scenarios assume top 20% performance; conservative assumes bottom 40%
- *Military comparison lines include base pay + BAH + BAS (taxable equivalent value)
- *5-year totals use realistic scenario; actual earnings influenced by bonuses, equity, overtime
- *Certifications significantly impact trajectory; shown milestones are recommended not required
- *Market conditions can accelerate or slow projections by ±2-4% annually

## Production Notes

### Design Phase (Estimated: 16 hours)
- Research and validate salary projection data from BLS, industry reports (4 hours)
- Create high-fidelity mockups with 8 career path projections (8 hours)
- Design interactive states, confidence bands, and scenario views (3 hours)
- Accessibility review with WCAG AA checklist (1 hour)

### Development Phase (Estimated: 32 hours)
- Set up multi-line chart framework with D3.js (4 hours)
- Implement 8 career path projection lines with scenarios (10 hours)
- Build confidence bands and shaded areas (4 hours)
- Create interactive hover states and detailed tooltips (5 hours)
- Implement scenario toggle and comparison mode (4 hours)
- Add milestone markers and military pay reference lines (3 hours)
- Accessibility features (keyboard nav, ARIA, screen reader support) (2 hours)

### Content & QA Phase (Estimated: 12 hours)
- Research and validate salary growth data from multiple sources (4 hours)
- Calculate realistic projections with growth rate assumptions (2 hours)
- Write educational content explaining scenarios and decision factors (3 hours)
- Subject matter expert review (career counselor, compensation analyst) (1 hour)
- Accessibility testing with keyboard-only and screen readers (1 hour)
- User testing with 6-8 transitioning veterans at different stages (1 hour)

### Total Estimated Time: 60 hours (7.5 days)

### Dependencies
- BLS Employment Projections data (updated every 2 years, most recent 2024-2034)
- Industry salary surveys (SHRM, Conference Board, Dice, PayScale)
- Military pay tables for comparison (DFAS)
- Veteran employment outcome data (Census Bureau)
- Career counselor or compensation specialist for review
- Veteran user testing participants at transition stage

### Technical Dependencies
- D3.js v7.8+ library
- GSAP or Framer Motion for animations
- React/Vue framework (specify based on project)
- Accessibility testing tools (axe DevTools, WAVE, NVDA/JAWS)
- API for real-time projection updates

### Future Enhancements
- Add 10-year and 20-year projection views
- Include cost-of-living adjustments by geographic region
- Add "personaliz projection" tool: input your MOS, experience, and goals
- Compare multiple paths side-by-side with detailed trade-off analysis
- Show impact of advanced degrees (MBA, Master's, PhD) on trajectory
- Add industry-switching scenarios (e.g., start in defense, move to tech at Year 3)
- Include retirement planning: show nest egg potential at Year 20/30
- Add "life events" scenarios: impact of career breaks, family, education
- Integration with job board data showing real-time market demand
- Success stories: veteran profiles who followed each path

## Success Metrics

### Primary Metrics
- 70%+ of users interact with chart (hover or select paths)
- Average engagement time > 120 seconds (indicates thorough exploration)
- < 10% bounce rate from this visualization
- 50%+ of users explore multiple career paths (3+ paths)

### Secondary Metrics
- 40%+ of users toggle between scenario views
- 30%+ of users activate military pay comparison
- 25%+ of users access educational context panel
- Positive veteran user testing feedback (> 4.2/5.0 rating)
- 20%+ of users pin paths for comparison

### Accessibility Metrics
- 100% keyboard navigable without mouse
- Zero critical or serious accessibility issues in automated testing
- Successful navigation by screen reader users (85%+ task completion rate)
- Alternative data table view accessible and understandable

### Business Impact Metrics
- Increased veteran confidence in career planning (pre/post survey)
- Better alignment between chosen career paths and financial goals
- Higher engagement with career counseling services
- Increased usage of certification/training programs (GI Bill utilization)

---

**Version:** 1.0
**Last Updated:** November 11, 2025
**Author:** Military Transition Toolkit Team
**Reviewed By:** [Pending] Career Counselor, Compensation Analyst, Veteran Employment Specialist
**Status:** Ready for Design Phase
