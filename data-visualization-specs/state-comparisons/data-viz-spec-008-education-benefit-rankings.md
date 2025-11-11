# Data Visualization Specification 008: Education Benefit Rankings

## Overview

**Visualization ID:** DVS-008
**Category:** State Comparisons
**Title:** State-by-State Veteran Education Benefit Rankings
**Purpose:** Rank and compare state-level education benefits for veterans across all 50 states, helping transitioning service members identify the best states for pursuing higher education using both federal GI Bill benefits and state-supplemental programs.

**Target Audience:**
- Transitioning service members planning to attend college
- Veterans with remaining GI Bill benefits
- Military spouses and dependents researching education options
- Education counselors at military installations
- VA education benefit specialists

## Data Sources

**Primary Sources:**
- Military.com State Veteran Benefits Directory (2024-2025)
- VA Claims Insider Disabled Veterans Education Benefits by State (2024)
- CollegeRecon State Veterans Benefits Database (2024)
- Veterans Benefits Knowledge Base Free Tuition Programs (2024)
- State Department of Veterans Affairs education program websites
- Individual state legislation on veteran education benefits

**Data Currency:** November-December 2024 (academic year 2024-2025)

## Visualization Type

**Primary Chart:** Ranked scorecard with multi-metric visualization
**Secondary View:** Category comparison radar chart
**Tertiary View:** Detailed benefit comparison matrix (table)
**Supplementary:** Geographic distribution map overlay

## Sample Data Structure

Based on 2024-2025 state education benefit research:

### State Education Benefit Scoring Methodology

**Total Score: 100 Points**
- **Tuition Coverage (40 points):** Free tuition, credit hours covered, dependent benefits
- **Program Scope (25 points):** Public/private institutions, graduate programs, vocational training
- **Eligibility Requirements (15 points):** Disability rating minimums, residency requirements, service length
- **Additional Benefits (10 points):** Books, fees, stipends, housing assistance
- **Application Ease (10 points):** Process simplicity, documentation requirements, processing time

### Top 15 States for Veteran Education Benefits

| Rank | State | Total Score | Tuition Coverage | Program Scope | Eligibility | Additional Benefits | Key Program |
|------|-------|-------------|------------------|---------------|-------------|---------------------|-------------|
| 1 | Texas | 95 | 40 | 25 | 14 | 9 | 7 | Hazlewood Act |
| 2 | Illinois | 93 | 39 | 24 | 15 | 9 | 6 | IL Veterans Grant |
| 3 | Florida | 91 | 38 | 23 | 15 | 9 | 6 | C.W. Bill Young Waiver |
| 4 | Wisconsin | 88 | 37 | 22 | 14 | 9 | 6 | Wisconsin GI Bill |
| 5 | Massachusetts | 87 | 36 | 22 | 14 | 9 | 6 | MA Tuition Waiver |
| 6 | Connecticut | 85 | 35 | 22 | 13 | 9 | 6 | CT Tuition Waiver |
| 7 | South Dakota | 84 | 35 | 21 | 14 | 8 | 6 | SD Free Tuition |
| 8 | Maryland | 82 | 34 | 21 | 13 | 8 | 6 | MD Veterans Grant |
| 9 | New York | 81 | 33 | 21 | 13 | 8 | 6 | Veterans Tuition Award |
| 10 | Montana | 79 | 32 | 20 | 13 | 8 | 6 | MT Free Tuition |
| 11 | Alabama | 77 | 31 | 20 | 13 | 7 | 6 | AL GI Dependents |
| 12 | Alaska | 76 | 31 | 19 | 13 | 7 | 6 | AK Education Benefits |
| 13 | New Mexico | 75 | 30 | 19 | 13 | 7 | 6 | NM Tuition Waiver |
| 14 | Arizona | 73 | 29 | 19 | 12 | 7 | 6 | AZ Tuition Waiver |
| 15 | Missouri | 72 | 28 | 18 | 13 | 7 | 6 | MO Wartime Veteran |

### Detailed Program Information (Top 5 States)

**Texas (Score: 95)**
- **Hazlewood Act:** Up to 150 credit hours free tuition at public institutions
- **Coverage:** Undergraduate and graduate programs
- **Transferable:** Unused hours transfer to children
- **Residency:** Must establish Texas residency
- **Additional:** Waives most enrollment fees
- **Institutions:** 40+ public universities and colleges
- **Annual Value:** $25,000-$50,000 (depending on institution)

**Illinois (Score: 93)**
- **Illinois Veterans Grant (IVG):** Full tuition and fees waiver
- **Coverage:** All state-supported colleges and universities
- **Service Requirement:** At least 1 year active duty
- **Additional:** Covers mandatory fees
- **Institutions:** 60+ public institutions
- **Graduate Programs:** Included
- **Annual Value:** $14,000-$28,000

**Florida (Score: 91)**
- **C.W. Bill Young Veteran Tuition Waiver:** 110% in-state tuition waiver
- **Eligibility:** Honorably discharged veterans (FL residents)
- **Coverage:** Undergraduate and graduate
- **Institutions:** All state universities and colleges
- **Disability Rating:** Any percentage service-connected disability
- **Additional:** Waives out-of-state tuition fees
- **Annual Value:** $6,300-$21,000

**Wisconsin (Score: 88)**
- **Wisconsin GI Bill:** 100% tuition remission
- **Coverage:** Up to 8 semesters (128 credits)
- **Dependents:** Includes veteran's children
- **Service Requirement:** Qualified veteran status
- **Institutions:** UW System and technical colleges
- **Additional:** Can be used for vocational training
- **Annual Value:** $10,500-$24,000

**Massachusetts (Score: 87)**
- **Massachusetts Tuition Waiver:** 100% tuition waiver
- **Eligibility:** Permanent MA residents
- **Service:** Minimum 90 days active duty
- **Coverage:** State colleges and universities
- **Combination:** Can combine with federal GI Bill
- **Additional:** Includes active-duty service members
- **Annual Value:** $11,000-$32,000

### States with Limited/No Education Benefits

| State | Score | Primary Limitation |
|-------|-------|--------------------|
| Wyoming | 35 | No state-specific veteran education benefits |
| Utah | 38 | Limited to National Guard members only |
| Nevada | 42 | Minimal tuition assistance, income restrictions |
| Delaware | 45 | Small scholarship amounts, competitive process |
| Rhode Island | 47 | Limited to specific institutions, high barriers |

## Visual Design Specifications

### Layout Dimensions
- **Container Width:** 1300px (responsive to 320px)
- **Card Grid:** 3 columns desktop, 2 tablet, 1 mobile
- **Card Dimensions:** 380px × 520px each
- **Ranking List Height:** 1200px (scrollable)
- **Comparison Table:** Full width, sticky header

### Color Palette

**Tier-Based Color System:**
- **Tier 1 (90-100 points):** #2E7D32 (Green) - Excellent
- **Tier 2 (80-89 points):** #66BB6A (Light Green) - Great
- **Tier 3 (70-79 points):** #FDD835 (Yellow) - Good
- **Tier 4 (60-69 points):** #FFA726 (Orange) - Fair
- **Tier 5 (<60 points):** #EF5350 (Red) - Limited

**Category Colors:**
- **Tuition Coverage:** #1976D2 (Blue)
- **Program Scope:** #7B1FA2 (Purple)
- **Eligibility:** #00897B (Teal)
- **Additional Benefits:** #F57C00 (Orange)
- **Application Ease:** #C2185B (Pink)

**UI Colors:**
- **Background Primary:** #FAFAFA (Off-White)
- **Background Secondary:** #FFFFFF (White)
- **Card Shadow:** rgba(0, 0, 0, 0.08)
- **Border:** #E0E0E0 (Light Gray)
- **Text Primary:** #212121 (Charcoal)
- **Text Secondary:** #757575 (Gray)
- **Accent:** #1565C0 (Dark Blue)

### Typography

**Primary Font:** "Inter" (fallback: system-ui, sans-serif)
- **Page Title:** 42px, Bold, #212121
- **Section Headers:** 28px, SemiBold, #424242
- **State Names:** 22px, Bold, #212121
- **Score Numbers:** 48px, Bold, tier-based color
- **Category Labels:** 14px, Medium, #616161
- **Body Text:** 16px, Regular, #424242
- **Fine Print:** 13px, Regular, #757575

**Secondary Font (Numbers):** "Roboto Mono"
- **Scores:** 36px, Bold
- **Sub-scores:** 18px, Medium

### Interactive Elements

**State Card Hover:**
- Elevate with shadow: 0 8px 24px rgba(0, 0, 0, 0.12)
- Scale slightly: transform(1.02)
- Border highlight in tier color (4px)
- Transition: 250ms cubic-bezier(0.4, 0, 0.2, 1)

**State Card Click:**
- Opens modal with full program details
- Shows eligibility checklist
- Displays nearby institutions
- Links to application process
- Compare button activates

**Score Breakdown:**
- Animated progress bars for each category
- Bars fill on scroll-into-view
- Animation duration: 800ms ease-out
- Staggered delay: 100ms between bars

**Compare Mode:**
- Select up to 3 states via checkbox
- "Compare Selected" button appears (floating, bottom-right)
- Opens side-by-side comparison table
- Highlights differences

**Filter & Sort:**
- Filter by minimum score, specific benefits, region
- Sort by total score, specific category, alphabetical
- Real-time results update
- Active filters show as removable chips

## Detailed Mockup Description

### Hero Section

The page opens with a bold headline: "Where Can Veterans Get Free College?" in 42px Inter Bold. Below, a concise subheading explains: "Compare state education benefits across all 50 states. Find out which states offer free tuition, fee waivers, and additional support for veterans pursuing higher education."

A search bar spans the width (max 600px, centered), allowing users to search by state name or program type. To the right, filter pills display: "All Tiers," "Free Tuition Only," "Includes Dependents," "Graduate Programs."

### Ranking Dashboard

Below the hero, the main ranking view displays in a clean card grid. The #1 card (Texas) commands attention:

**Card Design:**
- White background with subtle shadow
- Green left border (8px, #2E7D32) indicating Tier 1
- Top-right corner shows large "95" score in green
- Texas state flag icon (48px × 48px)
- "Texas" in 22px bold
- "Hazlewood Act" in 16px gray below
- Four horizontal progress bars showing:
  - Tuition Coverage: 40/40 (100% fill, blue)
  - Program Scope: 25/25 (100% fill, purple)
  - Eligibility: 14/15 (93% fill, teal)
  - Additional Benefits: 9/10 (90% fill, orange)
- Bottom section: "Up to 150 credit hours FREE"
- "Learn More" button (blue, full width)

Cards for Illinois (#2, score 93) and Florida (#3, score 91) follow in similar design, maintaining visual consistency while showing their unique score breakdowns.

Lower-ranked states like Wyoming (#51, score 35) display in red tier coloring, with progress bars showing significant gaps in tuition coverage and program scope, providing honest transparency.

### Comparison View

Clicking "Compare" on 3 states opens a modal overlay (1100px × 700px):

**Left Column (State 1):**
- State name header
- Total score (large)
- All category scores
- Program details list
- Eligibility requirements

**Middle Column (State 2):**
- Mirrored layout

**Right Column (State 3):**
- Mirrored layout

Differences highlight in yellow background, making it easy to spot which state offers better benefits in specific areas.

### Detail Modal

Clicking any state card opens a comprehensive detail modal:

**Header:**
- State flag and name
- Overall score badge
- Tier label

**Tabs:**
1. **Overview:** Program summary, key benefits
2. **Eligibility:** Requirements checklist with yes/no indicators
3. **Coverage:** What's included/excluded table
4. **Institutions:** List of participating schools (searchable)
5. **Application:** Step-by-step process, required documents
6. **Contact:** State VA education office information

**Footer:**
- "Add to Compare" button
- "Visit State Website" external link
- "Calculate My Benefits" tool link

### Data Table View

Toggle button switches from cards to sortable table:

| Rank | State | Score | Tuition | Scope | Eligibility | Additional | Key Program | Details |
|------|-------|-------|---------|-------|-------------|------------|-------------|---------|
| 1 | Texas | 95 | 40 | 25 | 14 | 9 | Hazlewood Act | [View] |
| 2 | Illinois | 93 | 39 | 24 | 15 | 9 | IVG | [View] |

Column headers are sortable (with up/down arrow indicators). Clicking any header re-sorts the table. Rows highlight on hover (light blue background).

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

**Color and Contrast:**
- All tier colors meet 4.5:1 contrast with white background
- Text on colored backgrounds verified for readability
- Color is not the only indicator (icons and labels supplement)
- Colorblind-safe palette (verified with Coblis simulator)

**Keyboard Navigation:**
- Tab through all cards in ranking order
- Enter/Space opens detail modal
- Arrow keys navigate between cards in grid
- Escape closes modals
- Focus visible with 3px solid blue outline (#1565C0)
- Focus never trapped

**Screen Reader Support:**
- Cards have semantic structure: `<article>` with `aria-label`
- Score announced as "95 out of 100 points"
- Progress bars have `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Table has proper `<thead>`, `<tbody>`, `scope` attributes
- ARIA live region announces sort/filter changes
- Modal uses `role="dialog"` with `aria-modal="true"`

**Text and Zoom:**
- All text remains readable at 200% zoom
- Layout doesn't break at 400% zoom
- Text spacing adjustable (WCAG 2.1 1.4.12)
- Line height minimum 1.5x font size
- No information conveyed by text shape alone

**Focus Management:**
- Modal opening moves focus to modal title
- Modal closing returns focus to trigger element
- Focus order follows visual order
- Skip links available: "Skip to rankings," "Skip to filters"

**Alternative Formats:**
- Data table view as alternative to card grid
- Export to CSV/PDF for offline access
- Print stylesheet for printer-friendly version

## Technical Implementation Notes

### Data Format (JSON)

```json
{
  "states": [
    {
      "id": "TX",
      "name": "Texas",
      "rank": 1,
      "totalScore": 95,
      "scores": {
        "tuitionCoverage": 40,
        "programScope": 25,
        "eligibility": 14,
        "additionalBenefits": 9,
        "applicationEase": 7
      },
      "tier": 1,
      "program": {
        "name": "Hazlewood Act",
        "summary": "Up to 150 credit hours free tuition",
        "website": "https://www.tvc.texas.gov/hazlewood-act/",
        "coverage": {
          "tuitionFree": true,
          "feesCovered": true,
          "maxCredits": 150,
          "undergraduate": true,
          "graduate": true,
          "vocational": true,
          "privateSchools": false
        },
        "eligibility": {
          "minService": "181 days active duty",
          "residency": "Texas resident",
          "disabilityRating": "Not required",
          "discharge": "Honorable"
        },
        "transferable": true,
        "dependentBenefits": true,
        "annualValue": {
          "min": 25000,
          "max": 50000
        }
      }
    }
  ],
  "metadata": {
    "lastUpdated": "2024-12-15",
    "academicYear": "2024-2025",
    "scoringVersion": "1.0"
  }
}
```

### Responsive Breakpoints

- **Desktop (1200px+):** 3-column card grid, full table view
- **Tablet (768px-1199px):** 2-column grid, horizontal scroll table
- **Mobile (320px-767px):** 1-column stack, vertical card list, simplified table

### Animation Details

**Card Reveal (on scroll):**
- Fade in: opacity 0 to 1
- Slide up: translateY(20px) to translateY(0)
- Duration: 400ms
- Stagger: 80ms per card
- Easing: ease-out

**Progress Bar Fill:**
- Width animates from 0% to final value
- Duration: 800ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Delay based on bar position (0ms, 100ms, 200ms, 300ms, 400ms)

**Score Counter:**
- Number counts from 0 to final score
- Duration: 1200ms
- Updates every 16ms (60fps)
- Easing: ease-out

### Performance Targets

- **First Contentful Paint:** <1.8s
- **Largest Contentful Paint:** <2.5s
- **Time to Interactive:** <3.5s
- **Cumulative Layout Shift:** <0.1
- **First Input Delay:** <100ms

### Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+
- Progressive enhancement for older browsers

## Production Specifications

### Development Time Estimate

- **Design Phase:** 14 hours
  - Wireframes and user flow (3 hours)
  - High-fidelity mockups (5 hours)
  - Interactive prototype (4 hours)
  - Design system documentation (2 hours)
- **Data Collection:** 16 hours
  - Research all 50 states (8 hours)
  - Verify program details (4 hours)
  - Calculate scores (2 hours)
  - Structure JSON data (2 hours)
- **Frontend Development:** 40 hours
  - Component architecture (6 hours)
  - Card grid and ranking system (10 hours)
  - Detail modals and comparison view (8 hours)
  - Filters, sorting, search (8 hours)
  - Animations and interactions (4 hours)
  - Responsive design (4 hours)
- **Testing & QA:** 12 hours
  - Functional testing (4 hours)
  - Accessibility audit (4 hours)
  - Cross-browser testing (2 hours)
  - User acceptance testing (2 hours)
- **Documentation:** 6 hours
- **Total:** 88 hours (11 business days)

### Team Requirements

- **UI/UX Designer:** 1 (experienced with data visualization)
- **Frontend Developer:** 1 (React/Vue expert)
- **Data Researcher:** 1 (familiar with veteran benefits)
- **Content Writer:** 1 (for program descriptions)
- **QA Engineer:** 1 (accessibility focus)

### Technical Dependencies

- **React 18+ or Vue 3+** for component framework
- **Framer Motion or React Spring** for animations
- **TanStack Table** for data table functionality
- **Fuse.js** for fuzzy search
- **Chart.js or Recharts** for radar chart visualization
- **Tailwind CSS** for styling (optional)

### Deliverables

1. Design system in Figma with all components
2. Interactive Figma prototype (clickable)
3. All 50 states researched and scored (JSON file)
4. Production-ready React/Vue components
5. Comprehensive unit test suite (Jest, >85% coverage)
6. E2E test suite (Playwright/Cypress)
7. WCAG 2.1 Level AA audit report
8. User guide (how to use filters, interpret scores)
9. Data update procedure documentation

### Update Schedule

- **Semester Updates (Aug, Jan):** Review for program changes
- **Annual Review (July):** Complete rescoring of all states
- **As-Needed:** When major legislation affects state benefits

## Success Metrics

**User Engagement:**
- Average session duration: >4 minutes
- State detail views: >60% of users
- Comparison feature usage: >35% of users
- Filter/sort interactions: >70% of users

**Conversion Goals:**
- Click-through to state websites: >25%
- "Calculate My Benefits" tool usage: >15%
- PDF export/save: >10%

**Accessibility:**
- Zero critical WCAG violations
- Keyboard task completion: 100%
- Screen reader user success rate: >95%

**Performance:**
- Lighthouse Performance Score: 90+
- Lighthouse Accessibility Score: 100
- Core Web Vitals: All "Good"

## Additional Notes

State education benefits represent some of the most valuable resources available to transitioning service members. The total value of a state education benefit program can exceed $100,000 when used for undergraduate and graduate degrees. States like Texas (Hazlewood Act with 150 credit hours) provide benefits that can cover a bachelor's degree, a master's degree, and still have credits remaining.

Many veterans are unaware that state benefits can be combined with federal GI Bill benefits, effectively stacking benefits to cover tuition, fees, housing, and books simultaneously. This visualization should clearly communicate this possibility.

The scoring methodology prioritizes generosity (tuition coverage) while also rewarding ease of access (simple eligibility). States that offer broad benefits but make them difficult to obtain receive lower scores than states with slightly less generous but more accessible programs.

Future enhancements to consider:
- Benefit calculator (input your situation, get personalized ranking)
- Institution finder (search schools, see which state benefits apply)
- Success stories (testimonials from veterans who used state benefits)
- Legislative tracker (upcoming changes to state programs)
- Mobile app version for on-the-go research

---

**Document Version:** 1.0
**Created:** January 2025
**Last Updated:** January 11, 2025
**Author:** Military Transition Toolkit Team
**Review Status:** Ready for Design Review
