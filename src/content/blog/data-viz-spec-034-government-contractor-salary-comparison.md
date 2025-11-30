---

date: "2026-02-07"
---# Data Visualization Specification #034: Government Contractor Salary Comparison

## Overview

**Visualization Title:** Active Duty → Government Contractor → Private Sector: The Salary Journey
**Visualization Type:** Sankey Diagram (Flow Chart) with Interactive Path Selection
**Target Audience:** Military service members exploring post-military career options, particularly those with security clearances and technical skills
**Primary Goal:** Show salary progression across three career paths: remaining active duty, transitioning to government contracting, or moving to private sector employment

## Purpose & Context

One of the most common questions transitioning service members ask is whether to pursue government contracting or private sector employment. Government contractors often earn significantly more than active duty military—sometimes 50-150% more—but less than private sector roles in high-demand fields. However, contractors lack some military benefits while offering more flexibility and earning potential than active duty service.

This visualization maps the salary journey through three distinct paths: staying in the military through retirement, transitioning to defense/government contracting, or moving to the private sector. By showing salary comparisons at equivalent experience levels and accounting for security clearance premiums, veterans can make informed decisions about which path aligns with their financial goals, lifestyle preferences, and long-term career objectives.

## Data Specifications

### Data Sources
- Defense Finance and Accounting Service (DFAS) 2024 military pay tables
- Congressional Budget Office (CBO) contractor compensation reports 2024
- Office of Federal Procurement Policy (OFPP) contractor compensation cap ($646,000 for 2024)
- ClearanceJobs salary surveys 2024 (security clearance premiums)
- ZipRecruiter defense contractor salary data 2024-2025
- Technology sector compensation reports (comparison for private sector)

### Sample Data Structure

```json
{
  "careerPaths": [
    {
      "pathName": "Active Duty Military",
      "roles": [
        {
          "level": "E-5",
          "yearsOfService": 6,
          "basePay": 42996,
          "allowances": 24000,
          "benefitsValue": 15000,
          "totalCompensation": 81996,
          "taxAdvantage": 7200
        },
        {
          "level": "E-6",
          "yearsOfService": 10,
          "basePay": 49344,
          "allowances": 28000,
          "benefitsValue": 18000,
          "totalCompensation": 95344,
          "taxAdvantage": 8400
        },
        {
          "level": "E-7",
          "yearsOfService": 15,
          "basePay": 56424,
          "allowances": 32000,
          "benefitsValue": 20000,
          "totalCompensation": 108424,
          "taxAdvantage": 9600
        },
        {
          "level": "E-8",
          "yearsOfService": 20,
          "basePay": 62568,
          "allowances": 35000,
          "benefitsValue": 25000,
          "totalCompensation": 122568,
          "pension": "50% base pay for life"
        }
      ]
    },
    {
      "pathName": "Government Contractor",
      "clearanceImpact": {
        "secret": 1.0,
        "topSecret": 1.29,
        "tsSCI": 1.41,
        "tsSCIPoly": 1.58
      },
      "roles": [
        {
          "level": "Junior Contractor (0-2 years)",
          "clearanceLevel": "Secret",
          "baseSalary": 70000,
          "benefits": 8000,
          "totalCompensation": 78000,
          "clearanceBonus": 0
        },
        {
          "level": "Mid-Level Contractor (3-7 years)",
          "clearanceLevel": "Top Secret",
          "baseSalary": 95000,
          "clearanceBonus": 27550,
          "benefits": 12000,
          "totalCompensation": 134550
        },
        {
          "level": "Senior Contractor (8-12 years)",
          "clearanceLevel": "TS/SCI",
          "baseSalary": 120000,
          "clearanceBonus": 49200,
          "benefits": 15000,
          "totalCompensation": 184200
        },
        {
          "level": "Principal Contractor (12+ years)",
          "clearanceLevel": "TS/SCI + Poly",
          "baseSalary": 145000,
          "clearanceBonus": 84100,
          "benefits": 18000,
          "totalCompensation": 247100,
          "capNote": "Subject to $646K OFPP cap"
        }
      ]
    },
    {
      "pathName": "Private Sector",
      "industries": ["Technology", "Financial Services", "Healthcare", "Manufacturing"],
      "roles": [
        {
          "level": "Entry Level (0-2 years)",
          "technologySalary": 85000,
          "financialServicesSalary": 75000,
          "healthcareSalary": 65000,
          "manufacturingSalary": 62000,
          "equity": 10000,
          "bonus": 8500,
          "benefits": 14000
        },
        {
          "level": "Mid-Level (3-7 years)",
          "technologySalary": 135000,
          "financialServicesSalary": 110000,
          "healthcareSalary": 90000,
          "manufacturingSalary": 85000,
          "equity": 30000,
          "bonus": 20250,
          "benefits": 18000
        },
        {
          "level": "Senior (8-12 years)",
          "technologySalary": 180000,
          "financialServicesSalary": 150000,
          "healthcareSalary": 125000,
          "manufacturingSalary": 115000,
          "equity": 50000,
          "bonus": 36000,
          "benefits": 22000
        },
        {
          "level": "Principal/Lead (12+ years)",
          "technologySalary": 225000,
          "financialServicesSalary": 190000,
          "healthcareSalary": 160000,
          "manufacturingSalary": 145000,
          "equity": 75000,
          "bonus": 56250,
          "benefits": 28000
        }
      ]
    }
  ],
  "transitionPoints": [
    {
      "fromPath": "Active Duty E-5 (6 YOS)",
      "toPath": "Junior Government Contractor",
      "salaryIncrease": -3996,
      "increasePercentage": -4.9,
      "note": "Short-term decrease due to loss of allowances, but higher growth potential"
    },
    {
      "fromPath": "Active Duty E-6 (10 YOS)",
      "toPath": "Mid-Level Government Contractor",
      "salaryIncrease": 39206,
      "increasePercentage": 41.1,
      "note": "Significant increase, especially with TS clearance"
    },
    {
      "fromPath": "Active Duty E-5 (6 YOS)",
      "toPath": "Entry Private Sector (Tech)",
      "salaryIncrease": 35504,
      "increasePercentage": 43.3,
      "note": "Includes equity and bonus potential"
    },
    {
      "fromPath": "Active Duty E-7 (15 YOS)",
      "toPath": "Senior Government Contractor",
      "salaryIncrease": 75776,
      "increasePercentage": 69.9,
      "note": "But forfeits pension eligibility at 20 years"
    }
  ]
}
```

## Visual Design Specifications

### Layout & Dimensions
- **Canvas Size:** 1600px width × 1100px height
- **Chart Area:** 1400px width × 800px height
- **Margins:** Top: 120px, Right: 100px, Bottom: 120px, Left: 100px
- **Flow Width:** Variable based on volume (salary range)
- **Node Width:** 180px for career stage boxes
- **Node Height:** Variable based on number of roles (40-60px per role)

### Color Palette

**Career Path Colors:**
- Active Duty Military: `#991B1B` (Deep Red)
- Government Contractor: `#1E40AF` (Royal Blue)
- Private Sector - Technology: `#059669` (Emerald Green)
- Private Sector - Financial Services: `#7C3AED` (Purple)
- Private Sector - Healthcare: `#0891B2` (Cyan)
- Private Sector - Manufacturing: `#CA8A04` (Amber)

**Flow/Connection Colors:**
- Use gradient from source path color to destination path color with 40% opacity
- Hover state: Increase opacity to 70% and add glow effect

**Supporting Colors:**
- Background: `#FFFFFF` (White)
- Node Borders: `#E5E7EB` (Light Gray), 2px solid
- Node Background: White with subtle gradient
- Text Primary: `#0F172A` (Very Dark Blue-Gray)
- Text Secondary: `#64748B` (Medium Gray)
- Salary Increase Indicator: `#10B981` (Green for positive)
- Salary Decrease Indicator: `#EF4444` (Red for negative)
- Clearance Star: `#FCD34D` (Gold)

### Typography
- **Title:** Inter Bold, 40px, #0F172A, Letter-spacing: -0.75px
- **Subtitle:** Inter Regular, 18px, #64748B, Line-height: 30px
- **Path Labels:** Inter Bold, 20px, Path-specific colors
- **Role/Level Names:** Inter Semibold, 15px, #1E293B
- **Salary Figures:** Inter Bold, 17px, #059669 (positive) or #EF4444 (negative)
- **Experience Indicators:** Inter Regular, 13px, #64748B
- **Tooltips:** Inter Regular, 15px, #1F2937
- **Comparison Stats:** Inter Medium, 14px, #374151
- **Clearance Badges:** Inter Bold, 11px, #B45309 on gold background

### Interactive Elements

**Hover State - Node (Career Stage):**
- Highlight node with 3px colored border matching path
- Dim all other paths to 20% opacity
- Display detailed breakdown tooltip:
  - Role title and years of experience
  - Base salary breakdown
  - Allowances (military) / bonuses / equity
  - Benefits valuation
  - Total compensation
  - Tax advantages (if applicable)
  - Sample roles/positions at this level
- Example tooltip: "E-6 with 10 Years of Service\nBase Pay: $49,344\nAllowances (BAH + BAS): $28,000\nBenefits Value: $18,000\nTotal Compensation: $95,344\nTax Advantage: ~$8,400 (allowances non-taxable)\nCommon Roles: Squad Leader, Section Chief, Technical Expert"

**Hover State - Flow Connection:**
- Brighten hovered flow to 80% opacity
- Show transition statistics popup at midpoint:
  - Starting salary (from node)
  - Ending salary (to node)
  - Dollar amount increase/decrease
  - Percentage change
  - Transition considerations (pros/cons)
  - Typical transition timeline
- Example: "E-6 (10 YOS) → Mid-Level Contractor\n$95,344 → $134,550 (+$39,206)\n+41.1% salary increase\nPros: Higher pay, career flexibility\nCons: No pension, must obtain/maintain security clearance\nTypical timeline: 3-6 months for clearance transfer"

**Click Interaction - Path Selection:**
- Click on starting military rank to trace potential career paths
- Highlight all possible transitions from that starting point
- Display side-by-side comparison panel showing:
  - 10-year earnings projection for each path
  - Benefits comparison (healthcare, retirement, stability)
  - Lifestyle considerations (deployment, work-life balance, location flexibility)
  - Risk assessment (job security, market volatility)

**Filter & Comparison Options:**
- Toggle security clearance level (Secret, Top Secret, TS/SCI, TS/SCI+Poly) to see contractor salary adjustments
- Select private sector industry focus (Technology, Financial Services, Healthcare, Manufacturing)
- Toggle benefits visualization (show/hide benefits as part of total comp)
- Compare 2-3 paths side-by-side with cumulative earnings over 20 years

**Clearance Calculator:**
- Interactive slider to adjust clearance level for contractor roles
- Real-time update of contractor salaries based on clearance premium
- Show clearance premium as percentage and dollar amount

### Responsive Behavior
- **Mobile (< 768px):** Vertical flow with collapsible sections, one path visible at a time, swipe between paths
- **Tablet (768px - 1024px):** Simplified Sankey with fewer intermediate nodes, reduce to 2 major paths displayed
- **Desktop (> 1024px):** Full specifications as listed

## Detailed Mockup Description

### Main Sankey Flow Structure
The visualization flows from left to right, showing career progression over time (0-20 years). Three primary vertical columns represent the three main career paths:

**Left Column - Active Duty Military (Red):**
Vertical stack of nodes representing military ranks:
- Top: E-5 (6 YOS) - $81,996 total
- Second: E-6 (10 YOS) - $95,344 total
- Third: E-7 (15 YOS) - $108,424 total
- Bottom: E-8 (20 YOS) - $122,568 total + pension

**Middle Column - Government Contractor (Blue):**
Vertical stack representing contractor experience levels:
- Top: Junior (0-2 years) - $78,000 total
- Second: Mid-Level (3-7 years) - $134,550 total (with TS clearance)
- Third: Senior (8-12 years) - $184,200 total (with TS/SCI clearance)
- Bottom: Principal (12+ years) - $247,100 total (with TS/SCI + Poly)

Each contractor node displays a small gold star icon indicating clearance level, with number of stars representing level (1 star = Secret, 2 stars = TS, 3 stars = TS/SCI, 4 stars = Poly).

**Right Column - Private Sector (Multiple Colors):**
Stacked nodes for four industries (color-coded):
- Technology (Green): Entry $117,500 → Principal $384,250
- Financial Services (Purple): Entry $97,500 → Principal $302,250
- Healthcare (Cyan): Entry $87,500 → Principal $238,000
- Manufacturing (Amber): Entry $84,500 → Principal $221,750

### Flow Connections
Curved flow lines (Sankey style) connect nodes between columns, with width proportional to typical transition volume:

**Military → Contractor Transitions:**
- E-5/E-6 → Junior/Mid-Level Contractor: Thickest flow (most common transition)
- E-6/E-7 → Mid-Level/Senior Contractor: Medium flow
- E-7/E-8 → Senior/Principal Contractor: Thinner flow (less common after 15+ YOS)

**Military → Private Sector Transitions:**
- E-5/E-6 → Entry/Mid-Level Private Sector: Thick flow
- E-6/E-7 → Mid-Level/Senior Private Sector: Medium flow
- Technical MOSs flow more toward Technology sector

**Contractor → Private Sector Lateral Moves:**
- Mid-Level Contractor → Mid-Level Private Sector: Medium flow
- Senior Contractor → Senior Private Sector: Thinner flow

Each flow line uses a gradient from source color to destination color, creating visual continuity.

### Transition Indicators
At each flow line midpoint, display a small badge showing salary change:
- Green upward arrow badge: "+$39K (+41%)" for significant increases
- Red downward arrow badge: "-$4K (-5%)" for decreases
- Neutral badge: "Similar" for transitions with <5% change

### Key Decision Points
Three annotated callout boxes highlighting critical decision nodes:

1. **6-10 Year Decision Point:** Large callout near E-6 level: "Critical Career Decision: E-6 with 10 years of service faces choice between continuing toward 20-year pension ($31K/year for life at E-8) or transitioning for immediate 41% salary increase"

2. **Clearance Value:** Callout pointing to contractor clearance stars: "Security clearance adds 29-58% to contractor salary: Secret (baseline), TS (+29%), TS/SCI (+41%), TS/SCI+Poly (+58%)"

3. **Private Sector Peak:** Callout at top-right: "Private sector technology roles offer highest peak earnings ($384K at principal level), but contractor roles provide steadier demand and value military clearances"

### Legend & Controls
Top-right corner panel with rounded white background:
- **Path Legend:** Color-coded paths with line samples
- **Clearance Level Selector:** Radio buttons for Secret, TS, TS/SCI, TS/SCI+Poly
- **Industry Filter:** Checkboxes for private sector industries
- **Compare Mode:** Toggle button to activate side-by-side comparison
- **View Options:** Toggle for showing/hiding benefits in total comp

### Bottom Information Panel
Below the main chart, display comparison metrics:
- **20-Year Cumulative Earnings:**
  - Active Duty (E-5 to retirement): $2.1M + pension ($620K value over 30 years)
  - Government Contractor: $3.2M (no pension)
  - Private Sector (Tech): $4.5M (no pension, includes equity growth)

- **Benefits Comparison Table:**
  | Benefit | Active Duty | Gov Contractor | Private Sector |
  |---------|-------------|----------------|----------------|
  | Healthcare | Tricare (low-cost) | Self-insured | Employer provided |
  | Retirement | 20-year pension | 401(k) only | 401(k) + equity |
  | Job Security | High | Medium | Variable |
  | Location Flexibility | Low (PCS orders) | Medium | High (remote options) |

### Timeline Visualization
At the bottom, a horizontal timeline bar (0-20 years) shows typical transition points:
- Red markers at common military transition points (6, 10, 15, 20 years)
- Blue markers for contractor experience milestones (2, 7, 12 years)
- Annotations for key events: "Eligible for retirement" at 20 years, "Peak contractor earnings" at 12+ years

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
- Color contrast ratios:
  - Text on white background: 10:1 (AAA)
  - Salary figures: 7:1 minimum
  - Flow lines distinguishable by pattern in addition to color (solid, dashed, dotted, double)
- Focus indicators: 4px solid outline (#059669) with 2px white offset
- All flows labeled with accessible text alternatives

### Screen Reader Support
- Full ARIA labels for all nodes and flows
- Data table alternative view (keyboard shortcut: Alt+T)
- Example alt text: "Sankey diagram showing three career paths from military service. Active duty E-6 with 10 years earns $95,344 total compensation. Transitioning to mid-level government contractor with Top Secret clearance increases compensation to $134,550, a 41% increase. Private sector technology roles offer $203,250 at comparable experience levels."
- Live region announcements for filter changes and path selections

### Keyboard Navigation
- Tab through nodes left to right, top to bottom
- Enter/Space to select starting node and trace paths
- Arrow keys to navigate between connected nodes along flows
- C to cycle through clearance levels
- I to cycle through private sector industries
- Escape to reset selection
- ? to open keyboard shortcut help

### Cognitive Accessibility
- Clear visual hierarchy with left-to-right flow representing time progression
- Consistent node sizes and spacing
- Progressive disclosure: core data visible, details on demand
- Simplified view option showing only three direct paths (military → contractor → private)
- Comparison mode limits to 2-3 paths to avoid cognitive overload
- Dyslexia-friendly font option (OpenDyslexic toggle)
- Print-friendly version with high-contrast colors

## Technical Implementation Notes

### Recommended Libraries/Frameworks
- **Primary:** D3.js v7.8+ with d3-sankey plugin for flow visualization
- **Alternative:** Recharts (React) or Highcharts with Sankey module
- **Animation:** GSAP v3.12+ for flow animations and node transitions
- **Accessibility:** @react-aria/visually-hidden, @react-aria/focus, @radix-ui/react-tooltip
- **Data Management:** React Query or SWR for caching salary data

### Animation Specifications
**Initial Load:**
1. Nodes fade in sequentially left to right (400ms per column, ease-out)
2. Flow lines draw from left to right (1200ms total, staggered 200ms per path, ease-in-out)
3. Transition badges fade in after flows complete (600ms, ease-out)
4. Callouts and annotations fade in last (500ms)

**Interaction:**
- Node hover: 250ms border highlight and opacity changes
- Flow hover: 300ms opacity and glow transitions
- Path selection: 700ms highlight animation with sequential node emphasis
- Filter changes: 800ms cross-fade between states

### Data Updates
- Update quarterly with latest military pay tables (DFAS)
- Annual update for contractor compensation cap (OFPP)
- Semi-annual update for private sector salary data (industry surveys)
- Include data timestamp: "Data current as of Q4 2024"
- API endpoint: `/api/v1/career-path-salary-comparison`
- Cache strategy: Browser cache for 7 days, revalidate on focus

### Performance Optimization
- Use Canvas rendering for flow lines (better performance than SVG for complex flows)
- SVG for nodes and text (better accessibility)
- Lazy load comparison panels and detailed breakdowns
- Debounce hover events (200ms)
- Optimize Sankey path calculations (memoize calculations)
- Target: < 250ms time to interactive, < 600KB total asset size
- Lighthouse performance score: 90+

### Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions (test Sankey rendering thoroughly)
- Mobile Safari iOS: 15+
- Chrome Android: Last 2 versions
- Graceful degradation: Simplified vertical bar chart comparison for older browsers

## Content Requirements

### Title & Subtitle
**Title:** "Active Duty → Government Contractor → Private Sector: The Salary Journey"

**Subtitle:** "Explore three distinct career paths from military service. Government contractors with security clearances earn 41-70% more than comparable active duty roles, while private sector technology positions can double military compensation—but without pension benefits or military healthcare."

### Educational Context Panel
Include expandable information panel (?) with:

**Understanding the Three Paths:**

**Active Duty Military:**
- Compensation includes base pay + tax-free allowances (BAH, BAS) + benefits
- 20-year pension (50% of base pay for life) after retirement
- Comprehensive healthcare (Tricare) for family
- Guaranteed employment but limited location/career control
- Best for: Long-term stability, pension benefits, structured environment

**Government Contractor:**
- Requires active security clearance (Secret, TS, TS/SCI, or Poly)
- 29-58% salary premium for higher clearances vs. Secret baseline
- Subject to $646K annual compensation cap (OFPP 2024)
- Contract-based employment (less stable than military, more than private sector)
- Typically work on DoD, intelligence, or federal projects
- 401(k) retirement savings (no pension)
- Must obtain own health insurance
- Best for: Veterans with clearances, DoD mission focus, higher pay without military obligations

**Private Sector:**
- Highest peak earning potential, especially in technology sector
- Compensation includes base salary + bonus + equity/stock options
- Employer-provided benefits (healthcare, 401(k) matching)
- Greater location flexibility (many remote options)
- More market volatility and competition
- Security clearances less commonly required (but valuable if held)
- Best for: Maximum earnings, career flexibility, entrepreneurial opportunities

**Security Clearance Value:**
Military members transitioning with active clearances have significant advantage:
- Secret clearance: Baseline contractor salary
- Top Secret: +29% salary premium ($27,550 more at mid-level)
- TS/SCI: +41% salary premium ($49,200 more at senior level)
- TS/SCI + Polygraph: +58% salary premium ($84,100 more at principal level)

Clearances cost employers $3,000-$15,000 and take 6-18 months to obtain. Military members with active clearances are immediately employable.

**Critical Decision Points:**
- **6-10 Years:** First opportunity to leave with valuable experience but far from pension eligibility
- **15 Years:** Leaving forfeits pension just 5 years away—requires very high salary to compensate
- **20 Years:** Retire with pension, then pursue contractor or private sector as "second career"

**Financial Considerations:**
- Military pension at 20 years (E-8): $31K/year for life = $620K value over 20-year retirement
- Contractor at 15+ years must earn $620K more to compensate for lost pension
- Private sector equity can grow significantly if company succeeds (IPO, acquisition)
- Tax advantages: Military allowances are non-taxable, saving $7K-$10K annually

### Contextual Notes
**Footnotes:**
- *Salaries shown are national averages for major metro areas (2024-2025 data)
- *Military compensation includes base pay, BAH (E-6 rate, mid-cost area), BAS, and benefits valuation
- *Contractor salaries based on cleared positions (Secret baseline) with premiums shown for higher clearances
- *Private sector salaries represent mid-range of industry standards; actual offers vary by company size, location, and demand
- *OFPP contractor compensation cap of $646K applies to government contract billing, limiting top earners
- *Pension valuation assumes E-8 retirement at 20 years, 50% base pay, living 20 years post-retirement

## Production Notes

### Design Phase (Estimated: 18 hours)
- Research and validate salary data from military pay tables, contractor surveys, and private sector reports (4 hours)
- Create high-fidelity Sankey diagram mockups with all paths (9 hours)
- Design interactive states, tooltips, and comparison modes (3 hours)
- Accessibility review with WCAG AA checklist (2 hours)

### Development Phase (Estimated: 36 hours)
- Set up D3.js Sankey framework with responsive container (5 hours)
- Implement three primary career path flows with nodes (10 hours)
- Build transition flows with gradient coloring and width scaling (6 hours)
- Create interactive hover states and detailed tooltips (6 hours)
- Implement clearance calculator and industry filters (4 hours)
- Build comparison mode and side-by-side panels (3 hours)
- Add accessibility features (keyboard navigation, ARIA labels, screen reader support) (2 hours)

### Content & QA Phase (Estimated: 14 hours)
- Research and validate military pay, contractor compensation, and private sector salary data (5 hours)
- Write educational content explaining each path and decision points (3 hours)
- Subject matter expert review (HR specialist, military transition counselor) (2 hours)
- Accessibility testing with keyboard-only and screen readers (2 hours)
- User testing with 8-10 transitioning service members at various ranks (2 hours)

### Total Estimated Time: 68 hours (8.5 days)

### Dependencies
- DFAS military pay tables (updated annually)
- OFPP contractor compensation cap data
- ClearanceJobs salary survey data
- BLS wage data for private sector comparisons
- Security clearance subject matter expert for validation
- Military transition counselor for review
- Veteran user testing participants at different career stages (6-20 YOS)

### Technical Dependencies
- D3.js v7.8+ with d3-sankey plugin
- GSAP or Framer Motion for animations
- React/Vue framework (specify based on project)
- Accessibility testing tools (axe DevTools, WAVE, NVDA/JAWS)
- API for real-time salary data updates

### Future Enhancements
- Add officer career paths (O-1 through O-6)
- Include federal civil service path (GS scale)
- Add state-by-state salary adjustments (cost of living)
- Integrate pension calculator showing 20-year pension value vs. immediate salary increase
- Add "life event" scenarios: family size impact on healthcare costs, education benefits usage
- Create "optimal transition point" calculator based on personal financial goals
- Show historical salary trends (how paths have changed 2015-2024)
- Add company-specific data for major defense contractors (Lockheed, Northrop, Raytheon, etc.)
- Include "dual compensation" path: military reserve/guard + contractor/private sector jobs
- Build "skills matcher" showing which path best values your specific MOS/rating

## Success Metrics

### Primary Metrics
- 75%+ of users interact with chart (hover over nodes or flows)
- Average engagement time > 150 seconds (indicates thorough exploration)
- < 8% bounce rate from this visualization
- 50%+ of users trace at least one complete path from military to civilian career

### Secondary Metrics
- 40%+ of users adjust clearance level selector to see contractor salary changes
- 30%+ of users explore comparison mode
- 25%+ of users access educational context panel
- Positive veteran user testing feedback (> 4.3/5.0 rating)
- 20%+ of users toggle between multiple private sector industries

### Accessibility Metrics
- 100% keyboard navigable without mouse
- Zero critical or serious accessibility issues in automated testing
- Successful navigation by screen reader users (90%+ task completion)
- Alternative data table view functional and accessible

### Business Impact Metrics
- Increased veteran understanding of compensation trade-offs (pre/post survey)
- Better informed career transition decisions (survey-based)
- Higher satisfaction with transition counseling using this tool
- Increased engagement with military transition programs

---

**Version:** 1.0
**Last Updated:** November 11, 2025
**Author:** Military Transition Toolkit Team
**Reviewed By:** [Pending] Military Transition Counselor, Compensation Specialist, Security Clearance SME
**Status:** Ready for Design Phase
