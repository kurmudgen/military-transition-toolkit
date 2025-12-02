---
date: "2026-02-07"
---# Data Visualization Specification 010: Employment Opportunities by State

## Overview

**Visualization ID:** DVS-010
**Category:** State Comparisons
**Title:** Veteran Employment Opportunities and Success Index by State
**Purpose:** Compare veteran employment rates, job opportunities, hiring preferences, and career advancement prospects across all 50 states, helping transitioning service members identify states with the strongest veteran employment ecosystems.

**Target Audience:**
- Transitioning service members seeking employment
- Veterans considering relocation for career opportunities
- Military spouses researching dual-career options
- Career counselors at military installations
- Veteran employment specialists
- State workforce development agencies

## Data Sources

**Primary Sources:**
- Bureau of Labor Statistics (BLS) Employment Situation of Veterans 2024 (Table 6A)
- BLS Unemployment Rate for Veterans by State (2024 annual averages)
- Syracuse University D'Aniello Institute Employment Situation of Veterans (2024)
- Department of Labor Veteran Employment Services
- WalletHub Best States for Military Retirees 2025
- VA Claims Insider Best States for Veterans 2024
- State hiring preference laws and regulations
- Jobs for Veterans State Grants (JVSG) program data

**Data Currency:** 2024 annual averages (published March 2025)

## Visualization Type

**Primary Chart:** Multi-metric dashboard with state rankings
**Secondary View:** Dual-axis line chart (unemployment rate vs. job opportunities)
**Tertiary View:** Geographic heatmap showing employment clusters
**Supplementary:** Industry breakdown by state (stacked bar chart)

## Sample Data Structure

Based on BLS 2024 annual employment data:

### Employment Opportunity Scoring Methodology

**Total Score: 100 Points**
- **Unemployment Rate (30 points):** Lower veteran unemployment = higher score
- **Job Opportunities (25 points):** Number of veteran-friendly job postings per capita
- **Hiring Preferences (20 points):** State employment preference laws, points systems
- **Wage Competitiveness (15 points):** Median veteran wages vs. state cost of living
- **Career Growth (10 points):** Veteran-owned business support, advancement opportunities

### Top 20 States for Veteran Employment

| Rank | State | Total Score | Unemployment Rate | Job Opportunities | Hiring Preferences | Wage Competitiveness | Career Growth | Vet Unemployment % |
|------|-------|-------------|-------------------|-------------------|--------------------|--------------------|---------------|-------------------|
| 1 | New Hampshire | 96 | 30 | 25 | 18 | 14 | 9 | 0.2% |
| 2 | South Dakota | 94 | 29 | 24 | 20 | 13 | 8 | 0.8% |
| 3 | North Dakota | 93 | 29 | 25 | 18 | 13 | 8 | 1.0% |
| 4 | Connecticut | 92 | 28 | 25 | 20 | 12 | 7 | 1.2% |
| 5 | South Carolina | 90 | 29 | 23 | 20 | 11 | 7 | 1.7% |
| 6 | Nebraska | 89 | 29 | 22 | 18 | 13 | 7 | 2.7% |
| 7 | Maryland | 88 | 27 | 24 | 18 | 12 | 7 | 2.3% |
| 8 | Virginia | 88 | 27 | 24 | 17 | 13 | 7 | 2.5% |
| 9 | Minnesota | 87 | 27 | 23 | 17 | 13 | 7 | 2.8% |
| 10 | Massachusetts | 86 | 27 | 22 | 20 | 11 | 6 | 2.9% |
| 11 | Pennsylvania | 85 | 27 | 22 | 20 | 10 | 6 | 2.9% |
| 12 | Iowa | 84 | 27 | 21 | 17 | 13 | 6 | 2.9% |
| 13 | Utah | 83 | 26 | 22 | 16 | 13 | 6 | 3.1% |
| 14 | Vermont | 82 | 26 | 21 | 17 | 12 | 6 | 3.2% |
| 15 | New Jersey | 81 | 26 | 21 | 20 | 8 | 6 | 3.3% |
| 16 | Colorado | 80 | 26 | 22 | 15 | 11 | 6 | 3.3% |
| 17 | Washington | 80 | 26 | 23 | 15 | 10 | 6 | 3.3% |
| 18 | Idaho | 79 | 26 | 20 | 16 | 11 | 6 | 3.4% |
| 19 | Wisconsin | 78 | 25 | 20 | 17 | 10 | 6 | 3.5% |
| 20 | Maine | 77 | 25 | 19 | 17 | 10 | 6 | 3.6% |

### Detailed Employment Metrics (Top 5 States)

**New Hampshire (Score: 96)**
- **Veteran Unemployment Rate:** 0.2% (lowest in nation)
- **Non-Veteran Unemployment:** 1.8%
- **Veteran Labor Force Participation:** 68.5%
- **Median Veteran Wage:** $72,400
- **Cost of Living Index:** 108 (8% above national average)
- **Adjusted Wage Score:** $67,037 (COL-adjusted)
- **Veteran-Friendly Employers:** 450+ certified companies
- **Job Postings (Veteran-Specific):** 2,847 (Q4 2024)
- **Hiring Preference Law:** Points-based preference system
- **State Employment Program:** NH Veteran Temporary Hiring Program
- **Industries:** Healthcare, technology, manufacturing, education
- **Veteran-Owned Businesses:** 12,500+ (8.2% of all businesses)

**South Dakota (Score: 94)**
- **Veteran Unemployment Rate:** 0.8%
- **Non-Veteran Unemployment:** 2.0%
- **Veteran Labor Force Participation:** 72.3%
- **Median Veteran Wage:** $58,200
- **Cost of Living Index:** 88 (12% below national average)
- **Adjusted Wage Score:** $66,136 (COL-adjusted)
- **Veteran-Friendly Employers:** 280+ certified
- **Job Postings (Veteran-Specific):** 1,245 (Q4 2024)
- **Hiring Preference Law:** Absolute preference for state jobs
- **State Employment Program:** SD Veterans Bonus Program
- **Industries:** Agriculture, healthcare, tourism, finance
- **Veteran-Owned Businesses:** 6,800+ (9.1% of all businesses)

**North Dakota (Score: 93)**
- **Veteran Unemployment Rate:** 1.0%
- **Non-Veteran Unemployment:** 2.2%
- **Veteran Labor Force Participation:** 74.1%
- **Median Veteran Wage:** $65,300
- **Cost of Living Index:** 93 (7% below national average)
- **Adjusted Wage Score:** $70,215 (COL-adjusted)
- **Veteran-Friendly Employers:** 320+ certified
- **Job Postings (Veteran-Specific):** 1,567 (Q4 2024)
- **Hiring Preference Law:** Absolute preference for qualifying veterans
- **State Employment Program:** ND Veterans' Employment Services
- **Industries:** Energy, agriculture, technology, healthcare
- **Veteran-Owned Businesses:** 5,200+ (8.7% of all businesses)

**Connecticut (Score: 92)**
- **Veteran Unemployment Rate:** 1.2%
- **Non-Veteran Unemployment:** 3.8%
- **Veteran Labor Force Participation:** 63.4%
- **Median Veteran Wage:** $78,900
- **Cost of Living Index:** 114 (14% above national average)
- **Adjusted Wage Score:** $69,211 (COL-adjusted)
- **Veteran-Friendly Employers:** 550+ certified
- **Job Postings (Veteran-Specific):** 3,124 (Q4 2024)
- **Hiring Preference Law:** Absolute preference (passing score)
- **State Employment Program:** CT Veteran Employment Services
- **Industries:** Insurance, finance, aerospace, healthcare, education
- **Veteran-Owned Businesses:** 16,700+ (7.9% of all businesses)

**South Carolina (Score: 90)**
- **Veteran Unemployment Rate:** 1.7%
- **Non-Veteran Unemployment:** 3.1%
- **Veteran Labor Force Participation:** 65.8%
- **Median Veteran Wage:** $56,800
- **Cost of Living Index:** 92 (8% below national average)
- **Adjusted Wage Score:** $61,739 (COL-adjusted)
- **Veteran-Friendly Employers:** 620+ certified
- **Job Postings (Veteran-Specific):** 4,238 (Q4 2024)
- **Hiring Preference Law:** Absolute preference for state employment
- **State Employment Program:** SC Veteran Employment Preference
- **Industries:** Manufacturing, healthcare, tourism, military contracting
- **Veteran-Owned Businesses:** 34,500+ (10.2% of all businesses)

### States with Employment Challenges

| Rank | State | Total Score | Vet Unemployment % | Primary Challenge |
|------|-------|-------------|-------------------|-------------------|
| 51 | Kansas | 42 | 7.2% | Highest veteran unemployment rate nationally |
| 50 | Nevada | 48 | 5.8% | Limited veteran hiring preferences, economic volatility |
| 49 | New Mexico | 51 | 5.6% | Rural employment gaps, limited opportunity diversity |
| 48 | Alaska | 54 | 5.2% | Geographic isolation, seasonal employment |
| 47 | Michigan | 57 | 4.9% | Manufacturing decline, economic transition |

### National Context (2024)

- **National Veteran Unemployment Rate:** 3.0% (vs. 3.9% for non-veterans)
- **Gulf War II Veterans Unemployment:** 3.2%
- **Veterans in Labor Force:** 9.2 million
- **Veteran Labor Force Participation:** 46.8%
- **Median Veteran Earnings:** $63,750
- **Veterans with Disability in Labor Force:** 74.5% (60%+ disability rating)
- **Veterans in Government Jobs:** 36.5% (with service-connected disability)
- **Veteran-Owned Businesses:** 2.0 million nationwide

### State Hiring Preference Systems

**Absolute Preference States (Top Tier):**
- Massachusetts, New Jersey, Pennsylvania, South Dakota
- Veterans with passing civil service scores hired before all non-veterans

**Strong Points-Based Preference:**
- Connecticut (10 points), New Hampshire (5-10 points), Maryland (10 points)
- Significant advantage in competitive hiring

**Standard Preference:**
- Most states provide some hiring preference for state government jobs
- Typically 5-10 point advantage on civil service exams

## Visual Design Specifications

### Layout Dimensions
- **Container Width:** 1400px (responsive to 320px)
- **Dashboard Grid:** 2-column layout (main chart + side panel)
- **Main Chart Area:** 900px × 800px
- **State Detail Panel:** 480px × 800px
- **Comparison Chart:** 1200px × 500px
- **Mobile:** Single column, stacked layout

### Color Palette

**Performance Tier Colors:**
- **Excellent (90-100):** #1B5E20 (Dark Green)
- **Very Good (80-89):** #43A047 (Green)
- **Good (70-79):** #7CB342 (Light Green)
- **Fair (60-69):** #FFB300 (Amber)
- **Poor (50-59):** #FB8C00 (Orange)
- **Critical (<50):** #E53935 (Red)

**Category Colors:**
- **Unemployment Rate:** #1976D2 (Blue)
- **Job Opportunities:** #7B1FA2 (Purple)
- **Hiring Preferences:** #00897B (Teal)
- **Wage Competitiveness:** #F57C00 (Orange)
- **Career Growth:** #C2185B (Pink)

**Trend Indicators:**
- **Improving:** #4CAF50 (Green) with ↑ arrow
- **Stable:** #FFC107 (Yellow) with → arrow
- **Declining:** #F44336 (Red) with ↓ arrow

**UI Colors:**
- **Background Primary:** #FAFAFA (Light Gray)
- **Background Secondary:** #FFFFFF (White)
- **Card Border:** #E0E0E0 (Medium Gray)
- **Text Primary:** #212121 (Charcoal)
- **Text Secondary:** #757575 (Gray)
- **Highlight:** #E3F2FD (Light Blue)
- **Selection:** #1976D2 (Blue)

### Typography

**Primary Font:** "Poppins" (fallback: system-ui, sans-serif)
- **Page Title:** 44px, Bold, #212121
- **State Name:** 26px, SemiBold, #212121
- **Section Headers:** 22px, SemiBold, #424242
- **Score Display:** 60px, Bold, tier-based color
- **Metric Labels:** 14px, Medium, #616161
- **Metric Values:** 20px, SemiBold, #212121
- **Body Text:** 16px, Regular, #424242
- **Caption Text:** 13px, Regular, #757575

**Secondary Font (Data):** "Inter"
- **Percentages:** 28px, Bold
- **Rankings:** 18px, SemiBold
- **Table Data:** 15px, Regular

### Interactive Elements

**State Card Interaction:**
- **Hover:** Background changes to light blue (#E3F2FD), shadow deepens, scale(1.02)
- **Click:** Border becomes blue (4px solid), detail panel updates
- **Selected:** Persistent blue border, checkmark icon appears
- **Transition:** 250ms ease-in-out

**Score Gauge:**
- Circular progress gauge showing total score
- Animated fill on page load (1200ms ease-out)
- Gradient fill based on score tier
- Center displays score number
- Ring thickness: 12px
- Diameter: 180px

**Comparison Mode:**
- Select up to 4 states via checkboxes
- "Compare Selected" button (floating, bottom-right)
- Opens side-by-side comparison table
- Highlights differences with colored indicators
- Export comparison as PDF

**Filter Controls:**
- **Industry Focus:** Dropdown (Healthcare, Tech, Manufacturing, Government, All)
- **Minimum Wage:** Slider ($40k-$100k+)
- **Unemployment Threshold:** Slider (0-7%)
- **Hiring Preference:** Checkbox (Absolute preference states only)
- **Region:** Multi-select (Northeast, Southeast, Midwest, Southwest, West, All)

**Sort Options:**
- Total Score (default)
- Unemployment Rate (ascending)
- Job Opportunities (descending)
- Wage Competitiveness
- Alphabetical

**Trend Visualization:**
- Toggle "Show 5-Year Trend" checkbox
- Mini sparkline appears below each state card
- Shows unemployment rate trajectory 2020-2024
- Hover shows year-by-year values

## Detailed Mockup Description

### Hero Dashboard

The visualization opens with a bold statement: "Where Are the Best Jobs for Veterans?" in 44px Poppins Bold. Below, a concise subtitle: "Compare veteran employment rates, job opportunities, and career prospects across all 50 states. Based on 2024 Bureau of Labor Statistics data."

A key statistics banner displays national context:
- "3.0% Veteran Unemployment" (green, with ↓ indicator)
- "9.2M Veterans in Labor Force"
- "2.0M Veteran-Owned Businesses"
- "$63,750 Median Veteran Earnings"

Each stat includes a small sparkline showing 5-year trend.

### Main Ranking Display

The primary view shows state cards in a 3-column grid. Each card (360px × 440px) contains:

**Card Design (New Hampshire example):**
- Top section: Circular score gauge showing "96" in dark green
- State name "New Hampshire" in 26px SemiBold below gauge
- Large "#1" rank badge in top-left corner (gold color)
- "Excellent" tier label in green pill badge

**Five Key Metrics (icon + value):**
- 📉 Unemployment: 0.2% (lowest in nation!)
- 💼 Job Postings: 2,847
- ⭐ Hiring Preference: Absolute
- 💵 Median Wage: $72,400 (COL-adjusted: $67,037)
- 📈 5-Year Trend: ↑ Improving

**Bottom Section:**
- Top industries: Healthcare, Tech, Manufacturing
- "View Details" button (blue, full width)

Lower-ranked states like Kansas (#51, score 42) display in red tier coloring, with concerning metrics highlighted (7.2% unemployment with red ↑ arrow).

### State Detail Panel (Right Side)

When New Hampshire is selected, the detail panel loads:

**Header:**
- New Hampshire state flag (60px × 60px)
- "New Hampshire" (28px bold)
- Score gauge (96, large)
- Rank badge (#1 of 51)

**Quick Stats Grid:**
Two-column layout showing:
- Vet Unemployment: 0.2%
- Non-Vet Unemployment: 1.8%
- Labor Force Participation: 68.5%
- Veteran-Friendly Employers: 450+
- Median Wage: $72,400
- Cost of Living: 108 (above avg)
- Adjusted Wage: $67,037
- Vet-Owned Businesses: 12,500+

**Employment Programs:**
- NH Veteran Temporary Hiring Program
- Points-based hiring preference
- Job counseling services
- Link to NH DVETS website

**Top Industries for Veterans:**
Horizontal bar chart showing:
1. Healthcare (32%)
2. Technology (24%)
3. Manufacturing (18%)
4. Education (14%)
5. Government (12%)

**Featured Employers:**
List of top 5 veteran-friendly employers with logos and "Now Hiring" badges.

**Actions:**
- "Compare to Another State"
- "Find Jobs in NH"
- "Connect with NH Employment Services"
- "See Veteran Testimonials"

### Comparison View

Clicking "Compare" with 4 states selected opens a modal (1200px × 700px):

**Table Layout:**
Rows showing all metrics, columns for each selected state:

|  | New Hampshire | South Dakota | Connecticut | South Carolina |
|---|---|---|---|---|
| Score | 96 ⭐ | 94 | 92 | 90 |
| Unemployment | 0.2% 🏆 | 0.8% | 1.2% | 1.7% |
| Job Opportunities | 2,847 | 1,245 | 3,124 🏆 | 4,238 |
| Hiring Preference | Points | Absolute 🏆 | Absolute 🏆 | Absolute 🏆 |
| Median Wage | $72,400 🏆 | $58,200 | $78,900 | $56,800 |
| COL-Adjusted Wage | $67,037 | $66,136 | $69,211 🏆 | $61,739 |

Best in category marked with 🏆 trophy icon and gold highlight.

### Geographic Heatmap View

Toggle button switches to map view. U.S. map displays with states colored by employment score:
- Dark green: 90-100
- Green: 80-89
- Light green: 70-79
- Amber: 60-69
- Orange: 50-59
- Red: <50

Clear geographic patterns emerge:
- Northeast cluster (NH, MA, CT, PA, NJ) shows strong performance
- Upper Midwest (SD, ND, MN, NE) excels
- Some Southern states (SC, VA, MD) perform well
- Mountain West shows mixed results
- A few outlier states (KS, NV, NM) show challenges

Hovering any state shows tooltip with score and unemployment rate.

### Industry Breakdown Chart

Below the map, a stacked bar chart shows "Top Industries Hiring Veterans by State":

Each state has a horizontal bar divided by industry sectors:
- Blue: Government/Defense
- Purple: Healthcare
- Teal: Technology
- Orange: Manufacturing
- Pink: Construction
- Gray: Other

Users can click an industry to filter states by that sector's strength.

### Trend Analysis Chart

A section titled "Veteran Unemployment Trends 2020-2024" displays:
- Line chart with 50 states (each state a thin line in gray)
- National average in bold blue line
- Selected state highlighted in bright green (thick line)
- X-axis: Years 2020-2024
- Y-axis: Unemployment percentage 0-10%
- Shows COVID-19 spike in 2020, recovery through 2024

Interactive: hover any line to identify state and see specific values.

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

**Color and Contrast:**
- All text meets 4.5:1 contrast ratio minimum
- Large text (18px+) meets 3:1 ratio
- Tier colors tested for sufficient contrast
- Patterns supplement color coding (stripes, dots, hatching available)
- Colorblind-safe palette (deuteranopia and protanopia tested)

**Keyboard Navigation:**
- Tab cycles through state cards in rank order
- Enter/Space selects state
- Arrow keys navigate grid
- 'C' key opens comparison mode
- 'M' key toggles map view
- Escape closes modals
- Focus indicators: 3px solid blue outline (#1976D2)

**Screen Reader Support:**
- State cards have comprehensive aria-labels: "New Hampshire, ranked #1, score 96, excellent employment opportunities, veteran unemployment rate 0.2%"
- Charts have text alternatives via aria-describedby
- Data tables included as hidden alternatives to visual charts
- ARIA live regions announce sort/filter changes
- Progress gauges include aria-valuenow, valuemin, valuemax
- Modal dialogs use role="dialog" with aria-modal="true"

**Alternative Content:**
- Data table view toggle (shows all data in sortable table)
- CSV export of all state data
- Print stylesheet for offline reference
- Screen reader-only descriptive text for complex visualizations

**Zoom and Reflow:**
- Functional at 200% zoom without horizontal scroll
- Text remains readable at 400% zoom
- Grid reflows to fewer columns as needed
- No fixed positioning that blocks content

**Motion Preferences:**
- Respects prefers-reduced-motion media query
- Animations disabled for users who prefer reduced motion
- All transitions optional and can be turned off
- No auto-playing content

**Focus Management:**
- Modals trap focus appropriately
- Focus returns to trigger element on modal close
- Focus order follows visual layout
- Skip links: "Skip to state rankings," "Skip to comparison tool"

## Technical Implementation Notes

### Data Format (JSON)

```json
{
  "states": [
    {
      "id": "NH",
      "name": "New Hampshire",
      "rank": 1,
      "totalScore": 96,
      "tier": "excellent",
      "scores": {
        "unemploymentRate": 30,
        "jobOpportunities": 25,
        "hiringPreferences": 18,
        "wageCompetitiveness": 14,
        "careerGrowth": 9
      },
      "metrics": {
        "veteranUnemployment": 0.2,
        "nonVeteranUnemployment": 1.8,
        "laborForceParticipation": 68.5,
        "medianVeteranWage": 72400,
        "costOfLivingIndex": 108,
        "adjustedWage": 67037,
        "veteranFriendlyEmployers": 450,
        "jobPostings": 2847,
        "hiringPreference": "Points-based",
        "veteranOwnedBusinesses": 12500,
        "businessOwnershipPct": 8.2
      },
      "industries": [
        {"name": "Healthcare", "percentage": 32},
        {"name": "Technology", "percentage": 24},
        {"name": "Manufacturing", "percentage": 18},
        {"name": "Education", "percentage": 14},
        {"name": "Government", "percentage": 12}
      ],
      "trend": {
        "2020": 3.8,
        "2021": 2.9,
        "2022": 1.5,
        "2023": 0.6,
        "2024": 0.2
      },
      "programs": [
        {
          "name": "NH Veteran Temporary Hiring Program",
          "description": "Temporary state employment for veterans",
          "link": "https://www.nhvr.nh.gov/"
        }
      ]
    }
  ],
  "nationalAverages": {
    "veteranUnemployment": 3.0,
    "nonVeteranUnemployment": 3.9,
    "medianVeteranWage": 63750
  },
  "metadata": {
    "lastUpdated": "2025-03-20",
    "dataYear": 2024,
    "source": "Bureau of Labor Statistics"
  }
}
```

### Score Calculation Algorithm

```javascript
// Unemployment Rate Score (30 points) - lower is better
const unemploymentScore = Math.max(0, 30 - (veteranUnemployment * 4));

// Job Opportunities (25 points)
const jobScore = Math.min(25, (jobPostings / veteranPopulation) * 100000);

// Hiring Preferences (20 points)
const hiringScore = {
  'Absolute': 20,
  'Strong Points': 16,
  'Standard Points': 12,
  'Minimal': 8,
  'None': 4
}[hiringPreferenceType];

// Wage Competitiveness (15 points)
const wageScore = Math.min(15, (adjustedWage / 50000) * 10);

// Career Growth (10 points)
const careerScore = Math.min(10, (veteranBusinessOwnershipPct * 1.2));

const totalScore = unemploymentScore + jobScore + hiringScore + wageScore + careerScore;
```

### Responsive Breakpoints

- **Desktop (1400px+):** 3-column grid, side panel visible
- **Large Tablet (1024px-1399px):** 2-column grid, collapsible side panel
- **Tablet (768px-1023px):** 2-column grid, drawer-style detail panel
- **Mobile (320px-767px):** 1-column list, bottom sheet for details

### Performance Optimization

- **Virtual Scrolling:** For state list on mobile
- **Lazy Loading:** Detail panel data loads on demand
- **Code Splitting:** Chart libraries loaded separately
- **Image Optimization:** State flags SVG (< 5KB), lazy loaded
- **Data Caching:** LocalStorage for repeat visits (24-hour TTL)
- **Debouncing:** Filter inputs debounced 300ms

### Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+
- Progressive enhancement for older browsers

## Production Specifications

### Development Time Estimate

- **Design Phase:** 14 hours
  - Research and wireframes (3 hours)
  - High-fidelity mockups (6 hours)
  - Interactive prototype (4 hours)
  - Design review and iteration (1 hour)
- **Data Collection & Processing:** 18 hours
  - BLS data extraction for all states (6 hours)
  - Additional metrics research (6 hours)
  - Score calculation and validation (4 hours)
  - Trend data compilation (2 hours)
- **Frontend Development:** 44 hours
  - Component architecture (6 hours)
  - State card grid system (8 hours)
  - Detail panel and modals (8 hours)
  - Comparison tool (6 hours)
  - Charts and visualizations (8 hours)
  - Filters and sorting (4 hours)
  - Responsive design (4 hours)
- **Testing & QA:** 12 hours
  - Functional testing (4 hours)
  - Accessibility audit (4 hours)
  - Cross-browser testing (2 hours)
  - Performance testing (2 hours)
- **Documentation:** 6 hours
- **Total:** 94 hours (12 business days)

### Team Requirements

- **UI/UX Designer:** 1 (dashboard and data viz experience)
- **Frontend Developer:** 1-2 (React/Vue + Chart.js)
- **Data Analyst:** 1 (employment statistics expertise)
- **QA Engineer:** 1 (accessibility specialist)
- **Content Writer:** 1 (employment program descriptions)

### Technical Dependencies

- **React 18+ or Vue 3+** for framework
- **Recharts or Chart.js** for data visualization
- **D3.js v7+** for custom gauges and complex charts
- **React Table or TanStack Table** for comparison table
- **Framer Motion** for animations
- **Axios** for API calls (if live data)
- **Lodash** for data manipulation
- **date-fns** for date handling

### Deliverables

1. Complete Figma design system
2. Interactive clickable prototype
3. All 50 states scored and validated (JSON)
4. 5-year trend data for all states
5. Production-ready React/Vue components
6. Unit test suite (Jest, >85% coverage)
7. E2E test suite (Playwright/Cypress, critical paths)
8. WCAG 2.1 Level AA accessibility audit report
9. Scoring methodology documentation
10. User guide and FAQ document
11. Data source citations and methodology

### Data Update Schedule

- **Monthly (BLS releases):** Update unemployment rates
- **Quarterly:** Update job postings, employer data
- **Annual (March):** Complete refresh with new BLS annual data
- **As-Needed:** State law changes affecting hiring preferences

## Success Metrics

**User Engagement:**
- Average session duration: >4 minutes
- State detail views: >65% of users
- Comparison tool usage: >35% of users
- Filter interactions: >70% of users
- External link clicks (job sites): >20%

**Task Completion:**
- Find state employment data: >95% success
- Understand scoring system: >80% success
- Compare multiple states: >70% success
- Identify hiring preference: >90% success

**Accessibility:**
- Zero critical WCAG violations
- Keyboard navigation: 100% functional
- Screen reader task success: >90%

**Performance:**
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 100
- Core Web Vitals: All "Good"
- First Contentful Paint: <1.5s
- Time to Interactive: <3.0s

## Additional Notes

Employment is consistently ranked as the #1 concern for transitioning service members. This visualization addresses that concern by providing comprehensive, data-driven comparisons of veteran employment opportunities across all states.

Key insights from 2024 data:
- Veterans have lower unemployment (3.0%) than non-veterans (3.9%)
- Wide state variation: from 0.2% (NH) to 7.2% (KS)
- States with absolute hiring preferences show better outcomes
- Cost-of-living adjustment dramatically affects wage competitiveness
- States with strong military presence tend to have better veteran employment (exceptions exist)

The 5-year trend data (2020-2024) shows interesting patterns:
- COVID-19 spike in 2020 affected veterans less severely than general population
- Steady recovery through 2024
- Some states (NH, SD, ND) maintained consistently low veteran unemployment
- A few states (KS, NV) show persistent challenges

Future enhancements to consider:
- Real-time job board integration (Indeed, LinkedIn, USAJOBS)
- Skill matching tool (military MOS to civilian job)
- Salary negotiation calculator
- Veteran testimonials by state
- Employer reviews from veteran employees
- Professional networking connections
- Resume translation services (military to civilian language)
- Interview preparation resources

This tool should empower veterans to make strategic employment decisions, considering not just current opportunities but long-term career growth potential. The combination of hard data (unemployment rates) and qualitative factors (hiring preferences, industry diversity) provides a holistic view of each state's veteran employment ecosystem.

---

**Document Version:** 1.0
**Created:** January 2025
**Last Updated:** January 11, 2025
**Author:** Military Transition Toolkit Team
**Review Status:** Ready for Design Review
