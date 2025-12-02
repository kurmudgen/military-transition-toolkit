---
date: "2026-02-07"
---# Data Visualization Specification 009: Healthcare Access Scores

## Overview

**Visualization ID:** DVS-009
**Category:** State Comparisons
**Title:** Veteran Healthcare Accessibility Index by State
**Purpose:** Provide a comprehensive scoring system that evaluates and compares veteran healthcare accessibility across all 50 states, considering VA facility density, wait times, quality ratings, community care options, and state-supplemental healthcare programs.

**Target Audience:**
- Veterans with chronic health conditions planning relocation
- Transitioning service members with service-connected disabilities
- Aging veterans requiring regular medical care
- Military families with special healthcare needs
- VA healthcare advocates and policymakers
- Veteran service organizations

## Data Sources

**Primary Sources:**
- VA.gov Access to Care data (accesstocare.va.gov, 2024)
- Centers for Medicare & Medicaid Services (CMS) Hospital Star Ratings (2024)
- VA National Center for Veterans Analysis and Statistics
- Benefits.com Most Accessible States for Veteran Healthcare (2024)
- LendingTree Best and Worst States for Veterans Study (November 2024)
- VA Press Release on Wait Time Improvements (April 2024)
- Rural Health Information Hub Veteran Healthcare Access Data

**Data Currency:** Q4 2024 (October-December 2024)

## Visualization Type

**Primary Chart:** Interactive scorecard matrix with state rankings
**Secondary View:** Multi-axis radar chart showing category performance
**Tertiary View:** Geographic heatmap overlay
**Supplementary:** Detailed facility map per state (drill-down)

## Sample Data Structure

Based on 2024 VA healthcare access research:

### Healthcare Access Scoring Methodology

**Total Score: 100 Points**
- **Facility Access (30 points):** VA medical centers, CBOCs, vet centers per veteran population
- **Wait Times (25 points):** Average days for new patient appointments (primary care, mental health, specialty)
- **Quality of Care (20 points):** CMS star ratings, patient satisfaction, trust scores
- **Geographic Coverage (15 points):** Rural access, distance to nearest facility, mobile clinics
- **Community Care (10 points):** Community Care Network adequacy, approval rates, choice options

### Top 15 States for Veteran Healthcare Access

| Rank | State | Total Score | Facility Access | Wait Times | Quality | Geographic Coverage | Community Care | VA Facilities |
|------|-------|-------------|-----------------|------------|---------|---------------------|----------------|---------------|
| 1 | California | 94 | 30 | 24 | 19 | 13 | 9 | 106+ |
| 2 | Texas | 92 | 29 | 24 | 20 | 12 | 7 | 87+ |
| 3 | Ohio | 89 | 27 | 23 | 20 | 12 | 7 | 42+ |
| 4 | Pennsylvania | 88 | 27 | 23 | 19 | 12 | 7 | 38+ |
| 5 | Florida | 87 | 28 | 22 | 18 | 12 | 7 | 85+ |
| 6 | New York | 86 | 26 | 22 | 19 | 12 | 7 | 35+ |
| 7 | North Carolina | 85 | 26 | 22 | 19 | 11 | 7 | 28+ |
| 8 | Virginia | 85 | 27 | 22 | 18 | 11 | 7 | 31+ |
| 9 | Illinois | 84 | 25 | 22 | 19 | 11 | 7 | 25+ |
| 10 | Washington | 83 | 25 | 21 | 18 | 12 | 7 | 24+ |
| 11 | Michigan | 82 | 24 | 21 | 19 | 11 | 7 | 22+ |
| 12 | Georgia | 81 | 24 | 21 | 18 | 11 | 7 | 21+ |
| 13 | Tennessee | 80 | 24 | 20 | 18 | 11 | 7 | 20+ |
| 14 | Massachusetts | 79 | 23 | 20 | 19 | 10 | 7 | 18+ |
| 15 | Arizona | 78 | 24 | 20 | 17 | 10 | 7 | 23+ |

### Detailed Healthcare Metrics (Top 5 States)

**California (Score: 94)**
- **VA Medical Centers:** 9 VAMCs
- **Outpatient Clinics:** 97+ CBOCs
- **Veterans Served:** 1,200,000+ enrolled
- **Facilities per 100k Veterans:** 7.1
- **Average Wait Time (Primary Care):** 8.2 days
- **Average Wait Time (Mental Health):** 6.5 days
- **Hospital Star Rating:** 4.2/5 average
- **Patient Trust Score:** 92.1%
- **Rural Coverage:** Mobile clinics in 15+ counties
- **Community Care Network:** Excellent (9/10)
- **Distance to Care:** 88% within 30 miles
- **Telehealth Availability:** Comprehensive

**Texas (Score: 92)**
- **VA Medical Centers:** 8 VAMCs (includes 5-star Temple VAMC)
- **Outpatient Clinics:** 79+ CBOCs
- **Veterans Served:** 980,000+ enrolled
- **Facilities per 100k Veterans:** 6.0
- **Average Wait Time (Primary Care):** 8.5 days
- **Average Wait Time (Mental Health):** 7.1 days
- **Hospital Star Rating:** 4.4/5 average
- **Patient Trust Score:** 91.5%
- **Rural Coverage:** Extensive, 22 rural clinics
- **Community Care Network:** Very Good (7/10)
- **Distance to Care:** 82% within 30 miles
- **Telehealth Availability:** Comprehensive

**Ohio (Score: 89)**
- **VA Medical Centers:** 7 VAMCs
- **Outpatient Clinics:** 35+ CBOCs
- **Veterans Served:** 360,000+ enrolled
- **Facilities per 100k Veterans:** 11.7
- **Average Wait Time (Primary Care):** 9.1 days
- **Average Wait Time (Mental Health):** 7.8 days
- **Hospital Star Rating:** 4.3/5 average
- **Patient Trust Score:** 93.2%
- **Rural Coverage:** Good, mobile services
- **Community Care Network:** Good (7/10)
- **Distance to Care:** 85% within 30 miles
- **Telehealth Availability:** Comprehensive

**Pennsylvania (Score: 88)**
- **VA Medical Centers:** 5 VAMCs
- **Outpatient Clinics:** 33+ CBOCs
- **Veterans Served:** 425,000+ enrolled
- **Facilities per 100k Veterans:** 8.9
- **Average Wait Time (Primary Care):** 9.3 days
- **Average Wait Time (Mental Health):** 8.2 days
- **Hospital Star Rating:** 4.1/5 average
- **Patient Trust Score:** 91.8%
- **Rural Coverage:** Adequate, improving
- **Community Care Network:** Good (7/10)
- **Distance to Care:** 83% within 30 miles
- **Telehealth Availability:** Comprehensive

**Florida (Score: 87)**
- **VA Medical Centers:** 8 VAMCs
- **Outpatient Clinics:** 77+ CBOCs
- **Veterans Served:** 1,150,000+ enrolled
- **Facilities per 100k Veterans:** 5.9
- **Average Wait Time (Primary Care):** 10.2 days
- **Average Wait Time (Mental Health):** 8.5 days
- **Hospital Star Rating:** 3.9/5 average
- **Patient Trust Score:** 90.7%
- **Rural Coverage:** Good in most areas
- **Community Care Network:** Good (7/10)
- **Distance to Care:** 79% within 30 miles
- **Telehealth Availability:** Comprehensive

### States with Lowest Healthcare Access

| Rank | State | Total Score | Primary Challenge |
|------|-------|-------------|-------------------|
| 51 | Wyoming | 52 | Low facility density, long distances to care |
| 50 | Montana | 55 | Geographic isolation, rural coverage gaps |
| 49 | Alaska | 58 | Remote locations, limited facilities |
| 48 | Nevada | 61 | Rapid veteran population growth, facility shortage |
| 47 | Utah | 63 | Underserved rural areas, wait time issues |

**Note:** Even lower-scoring states maintain VA facilities and community care options. Scores reflect relative accessibility compared to other states, not absence of care.

### National Healthcare Context (2024)

- **Total VA Medical Centers:** 170 nationwide
- **Total Outpatient Sites:** 1,193 (CBOCs, vet centers, mobile clinics)
- **Enrolled Veterans:** 9.1 million
- **Average New Patient Wait Time (Primary Care):** 11 days (FY2024)
- **Average New Patient Wait Time (Mental Health):** 9 days (FY2024)
- **Improvement:** 11% reduction in primary care wait times (YoY)
- **Improvement:** 7% reduction in mental health wait times (YoY)
- **Hospital Star Ratings:** 67% of VA hospitals rated 4-5 stars vs. 41% non-VA
- **Patient Trust:** 91.8% (all-time high)
- **Community Care:** 44% of services delivered via community providers

## Visual Design Specifications

### Layout Dimensions
- **Container Width:** 1400px (responsive to 320px)
- **Main Scorecard:** 1000px × 900px
- **State Detail Panel:** 380px × 900px (right sidebar)
- **Radar Chart:** 400px × 400px
- **Map Overlay:** Full width, 600px height

### Color Palette

**Score-Based Gradient:**
- **Excellent (90-100):** #1B5E20 (Dark Green)
- **Very Good (80-89):** #388E3C (Green)
- **Good (70-79):** #66BB6A (Light Green)
- **Fair (60-69):** #FBC02D (Amber)
- **Poor (50-59):** #F57C00 (Orange)
- **Critical (<50):** #D32F2F (Red)

**Category Colors:**
- **Facility Access:** #1976D2 (Blue)
- **Wait Times:** #7B1FA2 (Purple)
- **Quality of Care:** #00897B (Teal)
- **Geographic Coverage:** #F57C00 (Orange)
- **Community Care:** #C2185B (Pink)

**Quality Rating Colors:**
- **5 Stars:** #FFD700 (Gold)
- **4 Stars:** #C0C0C0 (Silver)
- **3 Stars:** #CD7F32 (Bronze)
- **2 Stars:** #90A4AE (Gray)
- **1 Star:** #BDBDBD (Light Gray)

**UI Colors:**
- **Background:** #F5F5F5 (Light Gray)
- **Card Background:** #FFFFFF (White)
- **Border:** #E0E0E0 (Medium Gray)
- **Text Primary:** #212121 (Charcoal)
- **Text Secondary:** #757575 (Gray)
- **Hover:** #E3F2FD (Light Blue)
- **Selected:** #1976D2 (Blue)

### Typography

**Primary Font:** "Open Sans" (fallback: system-ui, sans-serif)
- **Page Title:** 40px, Bold, #212121
- **State Name:** 24px, Bold, #212121
- **Section Headers:** 20px, SemiBold, #424242
- **Score Display:** 56px, Bold, score-based color
- **Category Labels:** 14px, Medium, #616161
- **Metric Values:** 18px, SemiBold, #212121
- **Body Text:** 16px, Regular, #424242
- **Helper Text:** 13px, Regular, #757575

**Secondary Font (Data):** "Roboto Mono"
- **Large Numbers:** 32px, Bold
- **Small Numbers:** 16px, Medium
- **Percentages:** 20px, Bold

### Interactive Elements

**State Card Hover:**
- Background transitions to light blue (#E3F2FD)
- Score badge pulses slightly (scale 1.05)
- Border appears in category color (3px)
- Shadow deepens: 0 4px 12px rgba(0,0,0,0.15)
- Transition: 200ms ease-out
- Cursor: pointer

**State Selection:**
- Card border becomes solid blue (4px, #1976D2)
- Checkmark icon appears in top-right
- Detail panel loads state information
- Radar chart animates to show state performance
- Map highlights selected state

**Radar Chart Interaction:**
- Hover over data point shows category score
- Click category label to sort states by that metric
- Compare mode overlays up to 3 states
- Toggle to show/hide national average line

**Facility Map (Drill-Down):**
- Clicking "View Facilities" opens state map
- VA medical centers shown as large blue markers
- CBOCs shown as smaller green markers
- Vet centers shown as purple markers
- Click marker for facility details (name, address, phone, services, star rating)
- Distance calculator: "Find nearest facility to your location"

**Filter Controls:**
- Minimum score slider (0-100)
- Category importance weights (adjust scoring)
- Facility type checkboxes (VAMCs, CBOCs, Vet Centers)
- Geographic region selection (Northeast, Southeast, Midwest, Southwest, West)
- Rural/Urban toggle

**Sort Options:**
- Total Score (default)
- Any individual category
- Alphabetical by state
- Veteran population
- Number of facilities

## Detailed Mockup Description

### Header Section

Bold title at top: "Veteran Healthcare Accessibility Index" in 40px Open Sans Bold. Subtitle below in gray: "Comprehensive scoring of VA healthcare access across all 50 states. Updated quarterly with latest wait times and quality metrics."

Below, a statistics banner displays national averages:
- "170 VA Medical Centers"
- "1,193 Outpatient Sites"
- "9.1M Enrolled Veterans"
- "91.8% Patient Trust"

Each stat animates counting up on page load, creating engagement.

### Main Scorecard View

The visualization displays states in a multi-column grid (4 columns on desktop). Each state card (240px × 320px) contains:

**Card Structure (California example):**
- Top-right corner: Large "94" score in dark green
- State flag (64px × 64px, centered)
- "California" in 24px bold below flag
- Five horizontal bars showing category scores:
  - Facility Access: 30/30 (100% filled, blue)
  - Wait Times: 24/25 (96% filled, purple)
  - Quality: 19/20 (95% filled, teal)
  - Geographic Coverage: 13/15 (87% filled, orange)
  - Community Care: 9/10 (90% filled, pink)
- Bottom badge: "106+ Facilities"
- Hover reveals "Click for details"

Lower-ranked state cards (e.g., Wyoming with score 52) show orange coloring and shorter progress bars, creating visual contrast.

### State Detail Panel (Right Sidebar)

When California is selected, the right panel displays:

**Header:**
- California flag (80px × 80px)
- "California" (28px bold)
- Score badge (94, large, green)
- "Rank #1 of 51"

**Quick Facts:**
- VA Medical Centers: 9
- Outpatient Clinics: 97+
- Veterans Served: 1.2M+
- Average Wait Time: 8.2 days
- Hospital Rating: 4.2 ★
- Trust Score: 92.1%

**Category Breakdown:**
Detailed score explanation for each of five categories, showing how points were awarded.

**Nearby Facilities:**
List of closest VA medical centers with distances, ratings, and "Get Directions" links.

**Actions:**
- "View All Facilities" (opens map modal)
- "Compare to Another State"
- "See Wait Times"
- "Read Patient Reviews"

### Radar Chart Comparison

Below the scorecard grid, a section titled "Compare States" displays a pentagonal radar chart. Five axes extend from center:
- Facility Access (top)
- Wait Times (upper right)
- Quality (lower right)
- Geographic Coverage (lower left)
- Community Care (upper left)

California's data plots as a large blue polygon nearly filling the chart. Hovering over Wyoming overlays its data in orange, showing a much smaller polygon, particularly weak in Facility Access and Geographic Coverage.

Users can select up to 3 states simultaneously, each rendering in a different color with 50% opacity for overlap visibility.

### Map Overlay Toggle

A button labeled "Map View" switches visualization to choropleth heatmap mode. The U.S. map appears with states colored according to their healthcare access scores:
- Dark green: 90-100
- Green: 80-89
- Light green: 70-79
- Amber: 60-69
- Orange: 50-59
- Red: <50

Hovering over any state shows tooltip with score and rank. Clicking opens the detail panel without leaving map view.

### Facility Detail Modal

Clicking "View All Facilities" on California opens a full-screen modal (1200px × 800px):

**Left Side (Map):**
- Interactive Google/Mapbox map of California
- 9 large blue markers (VAMCs)
- 97+ small green markers (CBOCs)
- Cluster numbers when zoomed out
- Click marker for popup with facility details

**Right Side (List):**
- Searchable/filterable list of all facilities
- Each entry shows:
  - Facility name
  - City, address
  - Phone number
  - Star rating
  - Services offered (primary care, mental health, specialty)
  - Current wait times
  - "Get Directions" button

Search bar: "Find facility by name or city"
Filter: "VAMCs Only" | "All Facilities"

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

**Color Contrast:**
- All text meets 4.5:1 contrast minimum
- Score colors tested against white background
- Category colors meet 3:1 contrast for graphics
- Pattern alternatives available for colorblind users (stripes/dots/hatching)

**Keyboard Navigation:**
- Tab cycles through state cards in rank order
- Arrow keys navigate grid spatially
- Enter/Space selects state and opens detail panel
- Escape closes modals and detail panels
- All interactive elements have 3px blue focus indicator
- Focus order follows visual layout

**Screen Reader Support:**
- Each card has aria-label: "California, ranked #1, score 94 out of 100, excellent healthcare access"
- Progress bars include aria-valuenow, aria-valuemin, aria-valuemax
- Radar chart has text alternative describing data
- Map has table alternative with all state data
- ARIA live regions announce filter/sort changes
- Modal uses role="dialog" with aria-modal="true"

**Alternative Content:**
- Data table view available (toggle from card view)
- Text descriptions of all visualizations
- Export to CSV for external analysis
- Print-friendly stylesheet

**Zoom and Reflow:**
- Usable at 200% zoom without horizontal scroll
- Text remains readable at 400% zoom
- Grid reflows to fewer columns as needed
- No fixed positioning that blocks content

**Motion and Animation:**
- Respects prefers-reduced-motion media query
- All animations can be disabled in settings
- No auto-playing content
- Transitions are enhancement, not requirement

## Technical Implementation Notes

### Data Format (JSON)

```json
{
  "states": [
    {
      "id": "CA",
      "name": "California",
      "rank": 1,
      "totalScore": 94,
      "scores": {
        "facilityAccess": 30,
        "waitTimes": 24,
        "qualityOfCare": 19,
        "geographicCoverage": 13,
        "communityCare": 9
      },
      "metrics": {
        "vaMedicalCenters": 9,
        "cbocs": 97,
        "veteransServed": 1200000,
        "facilitiesPerCapita": 7.1,
        "avgWaitPrimary": 8.2,
        "avgWaitMentalHealth": 6.5,
        "hospitalStarRating": 4.2,
        "patientTrust": 92.1,
        "ruralCoverage": "Mobile clinics in 15+ counties",
        "communityNetwork": 9,
        "distanceToCarePct": 88
      },
      "facilities": [
        {
          "name": "VA Palo Alto Health Care System",
          "type": "VAMC",
          "lat": 37.4024,
          "lng": -122.1386,
          "rating": 4,
          "phone": "(650) 493-5000",
          "services": ["Primary Care", "Mental Health", "Surgery", "Emergency"]
        }
      ]
    }
  ],
  "nationalAverages": {
    "totalScore": 73,
    "facilityAccess": 22,
    "waitTimes": 18,
    "qualityOfCare": 15,
    "geographicCoverage": 11,
    "communityCare": 7
  },
  "metadata": {
    "lastUpdated": "2024-12-15",
    "quarter": "Q4 2024",
    "dataVersion": "2.0"
  }
}
```

### Scoring Algorithm

```javascript
// Facility Access (30 points)
const facilityScore = Math.min(30, (
  (vaMedicalCenters * 3) +
  (cbocs * 0.2) +
  (facilitiesPerCapita * 2)
));

// Wait Times (25 points) - lower is better
const waitScore = Math.max(0, 25 - (
  (avgWaitPrimary - 5) * 1.5 +
  (avgWaitMentalHealth - 5) * 1.5
));

// Quality (20 points)
const qualityScore = (
  (hospitalStarRating / 5 * 12) +
  (patientTrust / 100 * 8)
);

// Geographic Coverage (15 points)
const geoScore = (
  (distanceToCarePct / 100 * 10) +
  (ruralCoverageRating * 5)
);

// Community Care (10 points)
const communityScore = communityNetwork;

const totalScore = facilityScore + waitScore + qualityScore + geoScore + communityScore;
```

### Responsive Breakpoints

- **Desktop (1400px+):** 4-column grid, full sidebar
- **Large Tablet (1024px-1399px):** 3-column grid, narrow sidebar
- **Tablet (768px-1023px):** 2-column grid, collapsible sidebar
- **Mobile (320px-767px):** 1-column list, sidebar becomes drawer

### Performance Optimization

- **Virtual Scrolling:** For 50+ state cards on mobile
- **Lazy Loading:** Facility details load on demand
- **Image Optimization:** State flags as SVG (< 5KB each)
- **Data Caching:** LocalStorage for repeat visits
- **Code Splitting:** Map components loaded separately
- **CDN:** All static assets on CDN

### Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+
- Graceful degradation for IE11 (static table view)

## Production Specifications

### Development Time Estimate

- **Design Phase:** 16 hours
  - Research and wireframes (4 hours)
  - High-fidelity mockups (6 hours)
  - Interactive prototype (4 hours)
  - Design system updates (2 hours)
- **Data Collection & Analysis:** 20 hours
  - Gather facility data for all states (8 hours)
  - Collect wait time and quality metrics (6 hours)
  - Calculate scores and rankings (4 hours)
  - Validate data accuracy (2 hours)
- **Frontend Development:** 48 hours
  - Component architecture (6 hours)
  - Scorecard grid system (10 hours)
  - Detail panel and modals (8 hours)
  - Radar chart integration (6 hours)
  - Map integration (8 hours)
  - Filters and sorting (6 hours)
  - Responsive design (4 hours)
- **Testing & QA:** 12 hours
  - Functional testing (4 hours)
  - Accessibility audit (4 hours)
  - Cross-browser testing (2 hours)
  - Performance testing (2 hours)
- **Documentation:** 6 hours
- **Total:** 102 hours (13 business days)

### Team Requirements

- **UI/UX Designer:** 1 (data viz experience)
- **Frontend Developer:** 1-2 (React/Vue + D3.js/Chart.js)
- **Data Analyst:** 1 (VA healthcare expertise)
- **QA Engineer:** 1 (accessibility specialist)
- **Content Writer:** 1 (healthcare terminology)

### Technical Dependencies

- **React 18+ or Vue 3+** for framework
- **Recharts or Chart.js** for radar chart
- **Leaflet or Mapbox GL JS** for facility maps
- **D3.js v7+** for custom visualizations
- **React Query or SWR** for data fetching
- **Tailwind CSS or Material-UI** for styling
- **Lodash** for data manipulation

### Deliverables

1. Complete design system (Figma)
2. Interactive prototype (clickable mockups)
3. All 50 states scored and validated (JSON)
4. Facility location data (GeoJSON)
5. Production React/Vue components
6. Unit tests (Jest, >85% coverage)
7. E2E tests (Playwright/Cypress)
8. WCAG 2.1 Level AA audit report
9. Data methodology documentation
10. User guide and FAQ

### Data Update Schedule

- **Quarterly (Jan, Apr, Jul, Oct):** Update wait times, quality ratings, scores
- **Annual (January):** Comprehensive facility audit
- **As-Needed:** When new facilities open or close

## Success Metrics

**User Engagement:**
- Session duration: >5 minutes average
- State detail views: >70% of users
- Facility map usage: >40% of users
- Comparison tool: >30% of users

**Task Completion:**
- Finding state score: >95% success
- Identifying nearby facilities: >85% success
- Understanding score methodology: >75% success

**Accessibility:**
- Zero critical WCAG violations
- Keyboard navigation: 100% functional
- Screen reader success: >90%

**Performance:**
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 100
- Core Web Vitals: All "Good"

## Additional Notes

Healthcare access is often the primary concern for veterans with service-connected disabilities when choosing where to live. This visualization provides critical decision-making information by combining multiple data sources into a single, easy-to-understand score.

The 2024 data shows significant improvements in VA healthcare access:
- Wait times down 11% for primary care
- 67% of VA hospitals rated 4-5 stars (vs. 41% non-VA)
- Patient trust at all-time high (91.8%)

However, geographic disparities remain. Rural veterans in states like Wyoming, Montana, and Alaska face longer travel distances and fewer facility options. The Community Care Network helps bridge these gaps, but challenges persist.

Future enhancements:
- Individual facility ratings and reviews
- Wait time predictions based on seasonal patterns
- Specialty care availability matrix (cardiology, orthopedics, etc.)
- Mental health resource density
- Emergency care access for veterans
- Telehealth capability scoring
- Caregiver support program availability

This tool should empower veterans to make informed relocation decisions while also highlighting areas where VA healthcare access needs improvement.

---

**Document Version:** 1.0
**Created:** January 2025
**Last Updated:** January 11, 2025
**Author:** Military Transition Toolkit Team
**Review Status:** Ready for Design Review
