---
date: "2025-12-04"
---# Data Visualization Specification #033: Trade Skills Apprenticeship Earnings Potential

## Overview

**Visualization Title:** Skilled Trades Earnings Trajectory: From Military to Mastery
**Visualization Type:** Multi-Path Line Chart with Milestone Markers
**Target Audience:** Military service members with technical skills considering skilled trades careers
**Primary Goal:** Demonstrate earning potential progression from apprentice through journeyman to master level in high-demand skilled trades accessible to veterans

## Purpose & Context

Approximately 200,000 military members transition annually, many with technical skills directly applicable to skilled trades. Meanwhile, the civilian market faces critical shortages: 2 million unfilled manufacturing jobs, 550,000 plumber shortages, and 30% of electricians projected to retire soon. Despite this alignment, many transitioning service members overlook trades careers due to misconceptions about earning potential.

This visualization shows the complete earnings trajectory for five high-demand skilled trades—electrician, HVAC technician, plumber, welder, and commercial truck driver—from apprentice entry through journeyman certification to master/senior level. By displaying progression timelines, earning milestones, and total lifetime earnings potential, veterans can make informed decisions about trades careers that offer stability, strong wages, and paths to business ownership.

## Data Specifications

### Data Sources
- Bureau of Labor Statistics (BLS) Occupational Employment and Wage Statistics 2024
- Trade union wage scales (UA, IBEW, various locals) 2024-2025
- ZipRecruiter electrician and HVAC salary data 2024-2025
- Industry apprenticeship program data (DOL Registered Apprenticeships)
- Veteran employment outcome data (Military Times, trade advocacy groups)

### Sample Data Structure

```json
{
  "trades": [
    {
      "name": "Electrician",
      "militaryMOS": ["Navy EM, ET", "Army 12R, 12K", "Air Force 3E0X1", "Marines 1141"],
      "timeline": [
        {
          "stage": "Apprentice Year 1",
          "yearsFromStart": 0,
          "hourlyWage": 18.43,
          "annualSalary": 38336,
          "percentOfJourneyman": 50
        },
        {
          "stage": "Apprentice Year 2",
          "yearsFromStart": 1,
          "hourlyWage": 22.12,
          "annualSalary": 46010,
          "percentOfJourneyman": 60
        },
        {
          "stage": "Apprentice Year 3",
          "yearsFromStart": 2,
          "hourlyWage": 25.81,
          "annualSalary": 53685,
          "percentOfJourneyman": 70
        },
        {
          "stage": "Apprentice Year 4",
          "yearsFromStart": 3,
          "hourlyWage": 29.50,
          "annualSalary": 61360,
          "percentOfJourneyman": 80
        },
        {
          "stage": "Journeyman",
          "yearsFromStart": 4,
          "hourlyWage": 33.00,
          "annualSalary": 68640,
          "percentOfJourneyman": 100,
          "certificationRequired": true
        },
        {
          "stage": "Master/Business Owner",
          "yearsFromStart": 8,
          "hourlyWage": 45.00,
          "annualSalary": 93600,
          "percentOfJourneyman": 136,
          "businessOwnerPotential": 150000
        }
      ],
      "apprenticeshipDuration": "4-5 years",
      "totalLifetimeEarnings30Years": 2400000
    },
    {
      "name": "HVAC Technician",
      "militaryMOS": ["Navy EM, GSM", "Army 91D", "Air Force 3E1X1", "Marines 1161"],
      "timeline": [
        {
          "stage": "Apprentice Year 1",
          "yearsFromStart": 0,
          "hourlyWage": 16.38,
          "annualSalary": 34070,
          "percentOfJourneyman": 50
        },
        {
          "stage": "Apprentice Year 2",
          "yearsFromStart": 1,
          "hourlyWage": 19.66,
          "annualSalary": 40893,
          "percentOfJourneyman": 60
        },
        {
          "stage": "Apprentice Year 3",
          "yearsFromStart": 2,
          "hourlyWage": 22.93,
          "annualSalary": 47694,
          "percentOfJourneyman": 70
        },
        {
          "stage": "Apprentice Year 4",
          "yearsFromStart": 3,
          "hourlyWage": 26.21,
          "annualSalary": 54517,
          "percentOfJourneyman": 80
        },
        {
          "stage": "Journeyman",
          "yearsFromStart": 4,
          "hourlyWage": 32.76,
          "annualSalary": 68141,
          "percentOfJourneyman": 100,
          "certificationRequired": true
        },
        {
          "stage": "Master/Business Owner",
          "yearsFromStart": 7,
          "hourlyWage": 42.00,
          "annualSalary": 87360,
          "percentOfJourneyman": 128,
          "businessOwnerPotential": 140000
        }
      ],
      "apprenticeshipDuration": "3-5 years",
      "totalLifetimeEarnings30Years": 2250000
    },
    {
      "name": "Plumber",
      "militaryMOS": ["Navy HT", "Seabees UT", "Army 12K", "Air Force 3E4X1"],
      "timeline": [
        {
          "stage": "Apprentice Year 1",
          "yearsFromStart": 0,
          "hourlyWage": 18.75,
          "annualSalary": 39000,
          "percentOfJourneyman": 50
        },
        {
          "stage": "Apprentice Year 2",
          "yearsFromStart": 1,
          "hourlyWage": 22.50,
          "annualSalary": 46800,
          "percentOfJourneyman": 60
        },
        {
          "stage": "Apprentice Year 3",
          "yearsFromStart": 2,
          "hourlyWage": 26.25,
          "annualSalary": 54600,
          "percentOfJourneyman": 70
        },
        {
          "stage": "Apprentice Year 4",
          "yearsFromStart": 3,
          "hourlyWage": 30.00,
          "annualSalary": 62400,
          "percentOfJourneyman": 80
        },
        {
          "stage": "Journeyman",
          "yearsFromStart": 4,
          "hourlyWage": 37.50,
          "annualSalary": 78000,
          "percentOfJourneyman": 100,
          "certificationRequired": true
        },
        {
          "stage": "Master Plumber",
          "yearsFromStart": 8,
          "hourlyWage": 47.50,
          "annualSalary": 98800,
          "percentOfJourneyman": 127,
          "businessOwnerPotential": 160000
        }
      ],
      "apprenticeshipDuration": "4-5 years",
      "totalLifetimeEarnings30Years": 2650000
    },
    {
      "name": "Welder",
      "militaryMOS": ["Navy HT", "Seabees SW", "Army 12W", "Air Force 3E4X2"],
      "timeline": [
        {
          "stage": "Entry Level",
          "yearsFromStart": 0,
          "hourlyWage": 19.50,
          "annualSalary": 40560,
          "percentOfJourneyman": 50
        },
        {
          "stage": "Certified Welder",
          "yearsFromStart": 2,
          "hourlyWage": 27.30,
          "annualSalary": 56784,
          "percentOfJourneyman": 70,
          "certificationRequired": true
        },
        {
          "stage": "Specialized (Underwater/Pipeline)",
          "yearsFromStart": 5,
          "hourlyWage": 39.00,
          "annualSalary": 81120,
          "percentOfJourneyman": 100
        },
        {
          "stage": "Master/Supervisor",
          "yearsFromStart": 10,
          "hourlyWage": 50.00,
          "annualSalary": 104000,
          "percentOfJourneyman": 128,
          "businessOwnerPotential": 135000
        }
      ],
      "apprenticeshipDuration": "2-3 years",
      "totalLifetimeEarnings30Years": 2550000
    },
    {
      "name": "Commercial Truck Driver",
      "militaryMOS": ["Army 88M", "Marines 3531", "Navy LS", "Air Force 2T1X1"],
      "timeline": [
        {
          "stage": "CDL Training/Entry",
          "yearsFromStart": 0,
          "hourlyWage": 21.50,
          "annualSalary": 44720,
          "percentOfJourneyman": 63
        },
        {
          "stage": "Regional Driver",
          "yearsFromStart": 1,
          "hourlyWage": 26.00,
          "annualSalary": 54080,
          "percentOfJourneyman": 76
        },
        {
          "stage": "Long-Haul Driver",
          "yearsFromStart": 3,
          "hourlyWage": 34.00,
          "annualSalary": 70720,
          "percentOfJourneyman": 100,
          "bonusPotential": 20000
        },
        {
          "stage": "Specialized (Hazmat/Tanker)",
          "yearsFromStart": 5,
          "hourlyWage": 43.00,
          "annualSalary": 89440,
          "percentOfJourneyman": 126,
          "bonusPotential": 30000
        },
        {
          "stage": "Owner-Operator",
          "yearsFromStart": 8,
          "hourlyWage": 50.00,
          "annualSalary": 104000,
          "percentOfJourneyman": 147,
          "businessOwnerPotential": 180000
        }
      ],
      "apprenticeshipDuration": "3-6 months CDL",
      "totalLifetimeEarnings30Years": 2800000
    }
  ],
  "militaryComparison": {
    "E5_10Years": 65700,
    "E6_12Years": 72300,
    "E7_15Years": 85400
  }
}
```

## Visual Design Specifications

### Layout & Dimensions
- **Canvas Size:** 1600px width × 1000px height
- **Chart Area:** 1400px width × 700px height
- **Margins:** Top: 120px, Right: 100px, Bottom: 120px, Left: 150px
- **Line Thickness:** 3px for trajectory lines
- **Milestone Markers:** 10px radius circles at each career stage
- **Legend Position:** Top-left corner, vertical stack

### Color Palette

**Trade Line Colors:**
- Electrician: `#EAB308` (Amber/Yellow - represents electricity)
- HVAC Technician: `#06B6D4` (Cyan - represents cooling)
- Plumber: `#3B82F6` (Blue - represents water)
- Welder: `#F97316` (Orange - represents fire/heat)
- Commercial Truck Driver: `#8B5CF6` (Purple - represents roads/logistics)

**Supporting Colors:**
- Background: `#FFFFFF` (White)
- Grid Lines: `#E5E7EB` (Light Gray)
- Milestone Markers: Same as line color with white center (donut style)
- Certification Stars: `#FCD34D` (Gold)
- Military Pay Reference Line: `#DC2626` (Red, dashed)
- Text Primary: `#0F172A` (Very Dark Blue-Gray)
- Text Secondary: `#64748B` (Medium Gray)

**Gradient Overlays:**
- Apprentice Zone (0-4 years): Light yellow gradient overlay at 5% opacity
- Journeyman Zone (4-8 years): Light green gradient at 5% opacity
- Master/Business Owner Zone (8+ years): Light gold gradient at 5% opacity

### Typography
- **Title:** Inter Bold, 38px, #0F172A, Letter-spacing: -0.75px
- **Subtitle:** Inter Regular, 18px, #64748B, Line-height: 28px
- **Axis Labels:** Inter Medium, 15px, #334155
- **Legend Items:** Inter Semibold, 16px, Trade-specific colors
- **Milestone Labels:** Inter Medium, 13px, #1E293B
- **Salary Callouts:** Inter Bold, 18px, Trade-specific colors
- **Military Comparison:** Inter Semibold, 14px, #DC2626
- **Tooltips:** Inter Regular, 15px, #1F2937
- **Stage Labels:** Inter Medium, 12px, #475569

### Interactive Elements

**Hover State - Line:**
- Brighten hovered trade line to 120% brightness
- Dim all other lines to 40% opacity
- Display milestone markers along the hovered line
- Show salary progression tooltip at cursor position
- Example tooltip: "HVAC Technician - Year 3 Apprentice\n$47,694/year ($22.93/hr)\n70% of journeyman wage\nNext milestone: Journeyman certification in 1 year"

**Hover State - Milestone Marker:**
- Enlarge marker to 16px radius
- Display detailed career stage information panel to the right:
  - Stage name and duration
  - Exact salary (annual and hourly)
  - Percentage of journeyman wage
  - Certification requirements (if applicable)
  - Typical responsibilities
  - Military MOS equivalencies
- Add pulse animation (subtle, 1-second duration)

**Click Interaction:**
- Click on any trade line to "pin" it and view detailed progression
- Pinned trade displays full career path information panel:
  - Complete salary progression table
  - Total estimated 30-year lifetime earnings
  - Business ownership potential at master level
  - Required certifications and timeline
  - Military skills that transfer
  - VA education benefits applicability
  - Union vs. non-union wage differences
- Click outside or press Escape to unpin

**Filter & Comparison:**
- Toggle military pay reference lines (E-5, E-6, E-7)
- Filter by military MOS/rating to highlight relevant trades
- Compare up to 2 trades side-by-side
- Toggle between union and non-union wage scales

### Responsive Behavior
- **Mobile (< 768px):** Vertical scrollable view, one trade at a time with swipe navigation, simplified milestone markers
- **Tablet (768px - 1024px):** Display 3 trades with toggle to show others, reduce chart height to 600px
- **Desktop (> 1024px):** Full specifications as listed

## Detailed Mockup Description

### Main Chart Area
The visualization displays five colored trajectory lines representing career earnings progression over time (0-12 years on X-axis, $30K-$110K on Y-axis). Lines start at the bottom-left (apprentice entry wages) and progress upward and rightward, showing salary growth over time.

**X-Axis (Time):**
- Range: 0 to 12 years from career start
- Major gridlines every 2 years (vertical, light gray)
- Minor gridlines every 1 year (dashed, lighter gray)
- Labels: "Year 0", "Year 2", "Year 4", etc.
- Stage zone labels at bottom: "Apprenticeship" (0-4), "Journeyman" (4-8), "Master/Business Owner" (8-12)

**Y-Axis (Annual Salary):**
- Range: $30,000 to $110,000
- Major gridlines every $10,000 (horizontal, light gray)
- Labels aligned right: "$30K", "$40K", "$50K", etc., "$110K"
- Secondary axis on right showing hourly wage equivalents

### Trade Trajectory Lines
Each trade follows a distinct upward path with milestone markers at key career stages:

**Electrician (Yellow/Amber):** Starts at $38,336 (Year 0), progresses through 4 apprentice stages with steady upward slope, reaches journeyman at $68,640 (Year 4) with certification star marker, continues to master level $93,600 (Year 8) with steeper slope showing business ownership potential.

**HVAC (Cyan):** Similar progression starting at $34,070, journeyman at $68,141 (Year 4), master at $87,360 (Year 7).

**Plumber (Blue):** Starts at $39,000, highest journeyman wage at $78,000 (Year 4), master plumber at $98,800 (Year 8).

**Welder (Orange):** Shorter apprentice period, certified welder at $56,784 (Year 2), specialized welder at $81,120 (Year 5), master/supervisor at $104,000 (Year 10).

**Commercial Truck Driver (Purple):** Fastest initial progression, CDL entry at $44,720 (Year 0), long-haul at $70,720 (Year 3), owner-operator at $104,000 (Year 8) with steepest final slope.

### Milestone Markers
Each career stage is marked with a circular donut-style marker (10px radius, 3px stroke in trade color, white fill). Certification milestones display an additional gold star icon (12px) overlaid on the marker.

### Military Pay Reference
Three horizontal dashed red lines span the chart at:
- **E-5 (10 years):** $65,700 with label "E-5 w/ 10 YOS"
- **E-6 (12 years):** $72,300 with label "E-6 w/ 12 YOS"
- **E-7 (15 years):** $85,400 with label "E-7 w/ 15 YOS"

These lines help veterans compare civilian trade earnings to military equivalent at various stages.

### Zone Backgrounds
Three subtle gradient overlays differentiate career stages:
- **Apprentice Zone (Years 0-4):** Light yellow (#FEF3C7) at 5% opacity
- **Journeyman Zone (Years 4-8):** Light green (#D1FAE5) at 5% opacity
- **Master Zone (Years 8-12):** Light gold (#FDE68A) at 5% opacity

Vertical zone boundary lines (1px dashed #94A3B8) at Year 4 and Year 8.

### Legend
Top-left corner with rounded white panel (12px border-radius, 3px border #E5E7EB, drop shadow):
- Title: "Skilled Trades" (16px semibold)
- Five rows with colored line samples (20px wide, 3px thick) and trade names
- Military reference toggle checkbox
- "Compare Trades" button

### Key Insights Annotations
Three callout boxes with leader lines pointing to specific chart areas:

1. **Journeyman Milestone:** Arrow to Year 4 cluster: "After 4-5 years, all trades reach journeyman level earning $68K-$78K annually—comparable to or exceeding E-6 military pay"

2. **Business Ownership:** Arrow to Master zone: "Master-level tradespeople can earn $90K-$105K as employees or $135K-$180K as business owners"

3. **Lifetime Earnings:** Bracket across all lines: "30-year career lifetime earnings potential: $2.25M - $2.8M depending on trade and career path"

### Bottom Info Panel
Below X-axis, display comparative data:
- **Fastest to Journeyman:** Commercial Truck Driver (3 months - 1 year)
- **Highest Peak Earnings:** Commercial Truck Driver (Owner-Operator: $180K potential)
- **Best Union Benefits:** Plumber (strong pension and healthcare)
- **Most Military Transferable:** Electrician & HVAC (direct MOS alignment)

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
- Color contrast ratios:
  - Text on white background: 10:1 (AAA)
  - Trade lines on white: 7:1 minimum
  - Milestone markers: 4.5:1 minimum with pattern overlays for colorblind users
- Pattern/texture option for lines (solid, dashed, dotted, dash-dot, dash-dot-dot for 5 trades)
- Focus indicators: 3px solid outline (#059669) with 2px offset

### Screen Reader Support
- Full ARIA labels for all chart elements
- Data table alternative view (toggle with keyboard shortcut Alt+T)
- Example alt text: "Multi-line chart showing earnings progression for five skilled trades over 12 years. Electricians start at $38,336 and reach $93,600 at master level. HVAC technicians start at $34,070 and reach $87,360. Plumbers start at $39,000 and reach $98,800. Welders start at $40,560 and reach $104,000. Commercial truck drivers start at $44,720 and reach $104,000 as owner-operators. All trades surpass military E-6 pay within 4-7 years."
- Live region announcements for filter changes and trade comparisons

### Keyboard Navigation
- Tab through legend items to toggle trade visibility
- Arrow keys to move between milestone markers along a selected trade line
- Enter/Space to pin selected trade for detailed view
- Shift+Arrow to compare two trades
- M to toggle military pay reference lines
- Escape to reset view

### Cognitive Accessibility
- Clear visual hierarchy with distinct colors and progressive disclosure
- Consistent marker styles across all trades
- Optional simplified view showing only salary start, journeyman, and master levels
- Step-by-step career progression explainer mode
- Dyslexia-friendly font option (OpenDyslexic toggle)
- Print version with high-contrast colors and larger text

## Technical Implementation Notes

### Recommended Libraries/Frameworks
- **Primary:** D3.js v7.8+ for multi-line chart, SVG manipulation, and data binding
- **Alternative:** Recharts (React) or Chart.js with line chart plugin
- **Animation:** GSAP v3.12+ or Framer Motion for line drawing and milestone reveals
- **Accessibility:** @react-aria/visually-hidden, @react-aria/focus, @react-aria/table
- **Data Management:** React Query or SWR for data fetching and caching

### Animation Specifications
**Initial Load:**
1. Draw trade lines sequentially from left to right (1500ms per line, ease-in-out, staggered 300ms delay)
2. Reveal milestone markers along each line as it draws (fade-in + scale 0.5 to 1.0, 400ms)
3. Fade in zone backgrounds (800ms after last line completes)
4. Fade in annotations and military reference lines (600ms after zones)

**Interaction:**
- Hover: 250ms color/opacity transitions
- Pin/unpin: 500ms panel slide-in from right
- Filter toggle: 600ms trade line fade in/out
- Milestone pulse: 1000ms infinite subtle pulse on hover

### Data Updates
- Update quarterly with latest BLS wage data and trade union agreements
- Include data freshness timestamp: "Data current as of Q4 2024"
- API endpoint: `/api/v1/trade-earnings-progression`
- Historical comparison feature (compare 2020 vs 2024 earnings)
- Cache strategy: Browser cache for 48 hours, revalidate on page focus

### Performance Optimization
- Use CSS transforms for all animations (GPU-accelerated)
- Lazy load detailed career progression panels
- Debounce hover events (200ms delay)
- Optimize SVG paths (reduce decimal precision, combine paths where possible)
- Virtual scrolling for mobile trade list
- Target metrics: < 200ms time to interactive, < 500KB total size
- Lighthouse performance score: 90+

### Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions (test line chart rendering extensively)
- Mobile Safari iOS: 15+
- Chrome Android: Last 2 versions
- Graceful degradation: Static image + data table for older browsers

## Content Requirements

### Title & Subtitle
**Title:** "Skilled Trades Earnings Trajectory: From Military to Mastery"

**Subtitle:** "See how military technical skills translate to strong earning potential in five high-demand skilled trades. Veterans can earn $68K-$78K within 4-5 years and $90K-$180K at master/business owner level while addressing critical national workforce shortages."

### Educational Context Panel
Include expandable information panel (?) with:

**Why Skilled Trades for Veterans:**
- **Skills Transfer:** Military technical training (electricians mate, HVAC, hull technicians, welders, vehicle operators) directly applies to civilian trades with minimal additional training
- **Earn While Learning:** Apprenticeships pay wages from day one—$35K-$45K starting, increasing every 6-12 months
- **VA Benefits:** Use GI Bill benefits for apprenticeship programs while earning full apprentice wages
- **Job Security:** Critical shortages (2M manufacturing jobs, 550K plumbers, 30% electrician retirements) ensure strong demand
- **Business Ownership:** Master-level tradespeople can start their own companies, with earning potential 50-100% higher than employee wages

**Understanding the Chart:**
- **X-Axis:** Years from career start (0 = apprentice entry, 4-5 = journeyman, 8-12 = master level)
- **Y-Axis:** Annual salary (includes base wages and typical overtime; bonus potential shown separately)
- **Milestone Markers:** Career stages requiring certification or significant experience milestones
- **Gold Stars:** Certification requirements (journeyman license, specialized certifications, master license)
- **Military Reference Lines:** Equivalent military pay for comparison (E-5/E-6/E-7 with years of service)

**Military Skills Translation:**
- **Navy EM/ET/GSM, Marines 1141/1161:** Direct transfer to Electrician or HVAC apprenticeships
- **Navy HT, Seabees UT/SW:** Direct transfer to Plumber or Welder apprenticeships
- **Army 88M, Marines 3531:** Immediate CDL eligibility, fast-track to Commercial Truck Driver
- **Construction trades (Seabees, Army 12-series):** Multiple trade options with accelerated apprenticeships

**Union vs. Non-Union:**
- Union apprenticeships typically pay 10-20% higher wages with stronger benefits
- Non-union apprenticeships may offer more flexibility in location and schedule
- Data shown represents union scale averages; non-union wages vary by region

**Maximizing Earnings:**
- **Certifications:** Specialized certifications (master electrician, underwater welding, hazmat CDL) command 20-50% wage premiums
- **Overtime:** Trades work typically includes overtime opportunities, adding 15-30% to annual earnings
- **Business Ownership:** After 8-12 years, starting a trade business can increase earnings by 50-100%
- **Location:** Wages vary by region; urban/high-cost-of-living areas pay 25-40% more than shown averages

### Contextual Notes
**Footnotes:**
- *Salaries shown are national averages for union scale workers in mid-range cost-of-living areas (2024-2025 data)
- *Apprentice progression assumes satisfactory performance and timely certification completion
- *Business owner earnings represent potential gross revenue minus equipment/overhead; net income varies
- *Military pay comparison includes base pay, BAH, and BAS for E-5/E-6/E-7 at indicated years of service
- *Lifetime earnings calculated over 30-year career with 3% annual wage growth and typical work patterns

## Production Notes

### Design Phase (Estimated: 16 hours)
- Research and validate trade wage progression data from union sources (3 hours)
- Create high-fidelity mockups with all five trade trajectories (8 hours)
- Design interactive states, tooltips, and detail panels (3 hours)
- Accessibility review with WCAG AA checklist (2 hours)

### Development Phase (Estimated: 32 hours)
- Set up multi-line chart framework with D3.js (5 hours)
- Implement five trade trajectory lines with milestone markers (8 hours)
- Build interactive hover states and tooltips (5 hours)
- Create pinned detail panels and comparison mode (6 hours)
- Add military pay reference overlays and zone backgrounds (3 hours)
- Implement animations (line drawing, milestone reveals) (3 hours)
- Add accessibility features (keyboard nav, ARIA, screen reader support) (2 hours)

### Content & QA Phase (Estimated: 12 hours)
- Research and validate wage data from BLS, union locals, and industry sources (4 hours)
- Write educational content, tooltips, and MOS translations (3 hours)
- Trade skills SME review (union representative or master tradesperson) (2 hours)
- Accessibility testing with keyboard-only and screen readers (2 hours)
- User testing with 5-8 veterans with technical MOSs (1 hour)

### Total Estimated Time: 60 hours (7.5 days)

### Dependencies
- BLS Occupational Employment and Wage Statistics API access
- Trade union wage scales (UA, IBEW, local union contacts)
- Military MOS/rating to civilian occupation crosswalk data
- Veteran apprenticeship program data (Helmets to Hardhats, SkillBridge)
- Trade skills subject matter expert for review
- Veteran user testing participants with technical backgrounds

### Technical Dependencies
- D3.js v7.8+ library
- GSAP or Framer Motion for animations
- React/Vue framework (specify based on project stack)
- Accessibility testing tools (axe DevTools, WAVE, NVDA/JAWS screen readers)
- API for real-time wage data updates

### Future Enhancements
- Add 10-15 additional trades (carpentry, machining, auto mechanics, telecommunications)
- Regional salary adjustments by state/metro area
- SkillBridge program integration showing direct military-to-apprenticeship pathways
- GI Bill benefits calculator showing how much veterans can save/earn during apprenticeship
- Employer partner map showing trade companies actively hiring veterans
- Success stories: Video interviews with veterans in trades careers
- Retirement calculator comparing trades career + pension to other paths
- Women in trades section highlighting opportunities and support programs
- Union finder tool by location and trade interest
- Certification roadmap tool showing all required licenses and costs by trade

## Success Metrics

### Primary Metrics
- 70%+ of users interact with chart (hover over lines or markers)
- Average engagement time > 100 seconds
- < 10% bounce rate from this visualization
- 45%+ of users explore at least one detailed trade panel (pin interaction)

### Secondary Metrics
- 30%+ of users toggle military pay reference lines
- 25%+ of users use trade comparison feature
- 20%+ of users access educational context panel
- Positive veteran user testing feedback (> 4.0/5.0 rating)
- 15%+ click-through to apprenticeship program information

### Accessibility Metrics
- 100% keyboard navigable without mouse
- Zero critical or serious accessibility issues in automated testing
- Successful completion of navigation tasks by screen reader users (85%+ success rate)
- Alternative data table view accessible and functional

### Business Impact Metrics
- Increased veteran interest in skilled trades careers (survey-based)
- Higher enrollment in veteran apprenticeship programs (Helmets to Hardhats, SkillBridge)
- Improved veteran understanding of trades earning potential (pre/post-view surveys)
- Increased employer engagement with veteran trades hiring

---

**Version:** 1.0
**Last Updated:** November 11, 2025
**Author:** Military Transition Toolkit Team
**Reviewed By:** [Pending] Trade Union Representative, Veteran Employment Specialist
**Status:** Ready for Design Phase
