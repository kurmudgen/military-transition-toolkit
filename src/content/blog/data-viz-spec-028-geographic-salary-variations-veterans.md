---

date: "2026-02-06"
---# Data Visualization Specification #028: Geographic Salary Variations for Veterans

## Overview

**Visualization Type:** Interactive Choropleth Map with Metropolitan Area Overlay and Cost-of-Living Adjustment Calculator

**Primary Purpose:** Show veterans how salaries vary significantly by geographic location across the United States, comparing absolute salary figures with cost-of-living adjusted purchasing power to help transitioning service members make informed relocation decisions that maximize their financial well-being.

**Target Audience:** Transitioning service members and veterans considering relocation for employment, particularly those with location flexibility and interest in optimizing salary-to-cost-of-living ratios.

**Key Question Answered:** "Where in the United States can I earn the highest veteran salary, and after accounting for cost of living, which locations provide the best purchasing power for my family?"

---

## Data Requirements

### Primary Data Sources

1. **U.S. Census Bureau Veteran Employment Outcomes (VEO) 2025** - Geographic earnings data
2. **Bureau of Labor Statistics Consumer Price Index (CPI) 2024** - Regional cost-of-living data
3. **Salary.com Geographic Compensation Data 2025** - City-specific veteran salaries
4. **WalletHub Best Cities for Veterans 2025** - Composite rankings
5. **Federal Pay Locality Tables 2024** - GS locality pay adjustments (proxy for COL)
6. **Redfin Veteran Homebuying Analysis 2025** - Housing affordability by metro

### Sample Data Structure

```json
{
  "national_baseline": {
    "veteran_median_household_income": "$85,955",
    "veteran_median_individual_income": "$54,200",
    "non_veteran_median_household_income": "$81,078",
    "veteran_premium": "+$4,877 (6%)",
    "year": 2025
  },

  "top_paying_cities": [
    {
      "city": "San Mateo",
      "state": "CA",
      "veteran_avg_salary": "$67,771",
      "rank": 1,
      "cost_of_living_index": 194,
      "adjusted_salary": "$34,933",
      "housing_cost_median": "$1,200,000",
      "unemployment_rate": "2.8%",
      "veteran_population": "8,450"
    },
    {
      "city": "Juneau",
      "state": "AK",
      "veteran_avg_salary": "$66,416",
      "rank": 2,
      "cost_of_living_index": 128,
      "adjusted_salary": "$51,888",
      "housing_cost_median": "$425,000",
      "unemployment_rate": "3.4%",
      "veteran_population": "3,120"
    },
    {
      "city": "Boston",
      "state": "MA",
      "veteran_avg_salary": "$66,231",
      "rank": 3,
      "cost_of_living_index": 162,
      "adjusted_salary": "$40,883",
      "housing_cost_median": "$750,000",
      "unemployment_rate": "2.9%",
      "veteran_population": "28,500"
    },
    {
      "city": "Santa Monica",
      "state": "CA",
      "veteran_avg_salary": "$65,456",
      "rank": 4,
      "cost_of_living_index": 177,
      "adjusted_salary": "$36,980",
      "housing_cost_median": "$1,100,000",
      "unemployment_rate": "3.1%",
      "veteran_population": "5,200"
    },
    {
      "city": "Quincy",
      "state": "MA",
      "veteran_avg_salary": "$65,453",
      "rank": 5,
      "cost_of_living_index": 156,
      "adjusted_salary": "$41,956",
      "housing_cost_median": "$680,000",
      "unemployment_rate": "2.7%",
      "veteran_population": "6,800"
    }
  ],

  "best_value_cities": [
    {
      "city": "Austin",
      "state": "TX",
      "veteran_median_income": "$59,000 - $62,000",
      "rank_income": 9,
      "cost_of_living_index": 119,
      "adjusted_salary": "$49,580 - $52,101",
      "unemployment_rate": "2.8%",
      "quality_of_life_score": 92,
      "veteran_unemployment": "2.4%",
      "veteran_population": "42,000",
      "year_over_year_growth": "+9%",
      "best_for": ["Tech jobs", "No state income tax", "Veteran programs"]
    },
    {
      "city": "Raleigh",
      "state": "NC",
      "veteran_median_income": "$56,700",
      "rank_income": 15,
      "cost_of_living_index": 102,
      "adjusted_salary": "$55,588",
      "unemployment_rate": "2.5%",
      "quality_of_life_score": 89,
      "veteran_population": "35,000",
      "best_for": ["Military-friendly", "Research Triangle jobs", "Affordable housing"]
    },
    {
      "city": "Orlando",
      "state": "FL",
      "veteran_median_income": "$51,000 - $54,000",
      "income_growth_rate": "+9% annually",
      "cost_of_living_index": 100,
      "adjusted_salary": "$51,000 - $54,000",
      "unemployment_rate": "3.1%",
      "quality_of_life_score": 85,
      "veteran_population": "48,000",
      "best_for": ["Rapid salary growth", "No state income tax", "Hospitality/tourism"]
    },
    {
      "city": "San Antonio",
      "state": "TX",
      "veteran_median_income": "$52,000 - $56,000",
      "cost_of_living_index": 91,
      "adjusted_salary": "$57,143 - $61,538",
      "unemployment_rate": "3.0%",
      "quality_of_life_score": 87,
      "veteran_population": "92,000",
      "largest_veteran_population": true,
      "best_for": ["Military community", "Low cost", "Defense contractors"]
    },
    {
      "city": "Nashville",
      "state": "TN",
      "veteran_median_income": "$54,000 - $58,000",
      "cost_of_living_index": 103,
      "adjusted_salary": "$52,427 - $56,311",
      "unemployment_rate": "2.6%",
      "quality_of_life_score": 88,
      "veteran_population": "31,000",
      "best_for": ["Healthcare jobs", "No state income tax", "Growing tech scene"]
    }
  ],

  "state_level_data": {
    "highest_paying_states_2019": [
      {"state": "DC", "avg_salary": "$102,900", "rank": 1},
      {"state": "CT", "avg_salary": "$101,000", "rank": 2},
      {"state": "NJ", "avg_salary": "$98,000", "rank": 3},
      {"state": "MA", "avg_salary": "$92,000", "rank": 4},
      {"state": "MI", "avg_salary": "$82,900", "rank": 5}
    ],
    "cost_of_living_leaders": [
      {"state": "HI", "col_index": 184, "rank": 1},
      {"state": "CA", "col_index": 151, "rank": 2},
      {"state": "NY", "col_index": 148, "rank": 3},
      {"state": "MA", "col_index": 147, "rank": 4},
      {"state": "AK", "col_index": 125, "rank": 5}
    ],
    "lowest_cost_states": [
      {"state": "MS", "col_index": 86, "rank": 1},
      {"state": "OK", "col_index": 87, "rank": 2},
      {"state": "AR", "col_index": 88, "rank": 3},
      {"state": "AL", "col_index": 89, "rank": 4},
      {"state": "KS", "col_index": 90, "rank": 5}
    ]
  },

  "metropolitan_areas": [
    {
      "metro": "Washington-Arlington-Alexandria, DC-VA-MD-WV",
      "veteran_median_income": "$78,500",
      "cost_of_living_index": 152,
      "adjusted_income": "$51,645",
      "gs_locality_pay": "+34.79%",
      "federal_jobs": "High concentration",
      "veteran_population": "285,000"
    },
    {
      "metro": "San Francisco-Oakland-Berkeley, CA",
      "veteran_median_income": "$72,000",
      "cost_of_living_index": 194,
      "adjusted_income": "$37,113",
      "housing_challenge": "Extreme",
      "tech_jobs": "Abundant",
      "veteran_population": "95,000"
    },
    {
      "metro": "Seattle-Tacoma-Bellevue, WA",
      "veteran_median_income": "$68,000",
      "cost_of_living_index": 145,
      "adjusted_income": "$46,897",
      "tech_jobs": "High",
      "veteran_population": "112,000"
    },
    {
      "metro": "Dallas-Fort Worth-Arlington, TX",
      "veteran_median_income": "$58,000",
      "cost_of_living_index": 104,
      "adjusted_income": "$55,769",
      "job_growth": "Rapid",
      "veteran_population": "178,000"
    },
    {
      "metro": "Phoenix-Mesa-Chandler, AZ",
      "veteran_median_income": "$56,000",
      "cost_of_living_index": 108,
      "adjusted_income": "$51,852",
      "retiree_friendly": true,
      "veteran_population": "142,000"
    }
  ],

  "salary_calculator_factors": {
    "housing_percentage": 33,
    "transportation_percentage": 15,
    "food_percentage": 13,
    "healthcare_percentage": 8,
    "utilities_percentage": 7,
    "taxes_percentage": 15,
    "other_percentage": 9,
    "baseline_location": "National Average (100)",
    "formula": "adjusted_salary = nominal_salary / (COL_index / 100)"
  }
}
```

---

## Visual Design Specifications

### Layout & Dimensions

- **Canvas Size:** 1800px width × 1100px height (desktop)
- **Map Area:** 1400px × 800px (main interactive map)
- **Control Panel (Left):** 350px width × full height
- **Detail Panel (Right):** Variable width, slides in at 450px × full height
- **Aspect Ratio:** 16:9 (responsive with breakpoints at 1440px, 1024px, 768px)
- **Mobile:** Stacked layout with map on top, controls below, swipe-up detail sheet

### Color Palette

**Choropleth Map Color Scale (Salary Gradient):**
- Lowest Quartile (<$45K): `#FFEBEE` (Pale Red)
- Below Median ($45K-$55K): `#FFE0B2` (Pale Orange)
- Median Range ($55K-$65K): `#FFF9C4` (Pale Yellow)
- Above Median ($65K-$75K): `#C8E6C9` (Pale Green)
- High ($75K-$85K): `#81C784` (Medium Green)
- Very High ($85K-$100K): `#4CAF50` (Green)
- Highest (>$100K): `#2E7D32` (Dark Green)

**Adjusted Purchasing Power Scale:**
- Low Value (<$40K adjusted): `#EF5350` (Red)
- Below Average ($40K-$48K): `#FF9800` (Orange)
- Average ($48K-$56K): `#FDD835` (Yellow)
- Good Value ($56K-$64K): `#8BC34A` (Light Green)
- Excellent Value ($64K-$72K): `#4CAF50` (Green)
- Outstanding Value (>$72K): `#1B5E20` (Forest Green)

**Supporting Colors:**
- Map Background (ocean/unpopulated): `#E3F2FD` (Light Blue)
- State Borders: `#90A4AE` (Blue Gray, 1px)
- Selected State/City: `#1976D2` (Blue, 3px stroke)
- Hover State: `#FFEB3B` (Yellow highlight, 40% opacity overlay)
- Metro Area Markers: `#D32F2F` (Red circles)
- Top 10 Cities Markers: `#FFD700` (Gold stars)
- Control Panel Background: `#FAFAFA` (Off-white)
- Detail Panel Background: `#FFFFFF` (White)
- Text Primary: `#212121` (Near Black)
- Text Secondary: `#757575` (Gray)
- Accent/Interactive: `#1976D2` (Blue)

### Typography

**Font Family:**
- Primary: "Open Sans", system-ui, sans-serif
- Headers: "Raleway", sans-serif
- Data/Numbers: "Roboto Mono", monospace

**Font Specifications:**
- Main Title: 34px, Bold (700), `#212121`
- Subtitle: 16px, Regular (400), `#757575`
- Section Headers: 20px, Semi-Bold (600), `#424242`
- City/State Labels: 15px, Medium (500), `#212121`
- Salary Data (large): 28px, Bold (700), gradient green
- Salary Data (standard): 18px, Bold (700), respective scale color
- COL Index: 16px, Regular (400), `#757575`
- Adjusted Salary: 18px, Bold (700), `#1B5E20`
- Control Labels: 14px, Regular (400), `#616161`
- Tooltips: 14px, Regular (400), `#FFFFFF` on `#424242`
- Legend Text: 13px, Regular (400), `#757575`
- Annotations: 12px, Italic (400), `#9E9E9E`
- Button Text: 15px, Medium (500), `#FFFFFF`

---

## Visualization Structure

### Main Components

**1. Left Control Panel (0-350px)**

**Section A: View Mode Toggle (Top)**
- Radio button group (horizontal):
  - ⚪ "Absolute Salary" (default)
  - ⚪ "Cost-of-Living Adjusted"
  - ⚪ "Purchasing Power Ranking"
- Selected button: Blue `#1976D2` background, white text
- Unselected: White background, gray border

**Section B: Geographic Scope**
- Dropdown: "View: [National | By State | By Metro Area]"
- Default: National
- Width: 300px, height: 40px

**Section C: Filters**
- "Veteran Population Minimum"
  - Slider: 0 to 100,000+
  - Shows count of visible locations
- "Unemployment Rate Maximum"
  - Slider: 0% to 6%
- "Cost of Living Maximum"
  - Slider: 80 (lowest) to 200 (highest)
- "Show Only:"
  - ☐ Tech job markets
  - ☐ Federal job concentrations
  - ☐ No state income tax
  - ☐ Military-friendly rated

**Section D: Search**
- Input field: "Search city or state..."
- Auto-complete dropdown
- Clear button (X icon)

**Section E: Legend**
- Color scale with labels
- Updates based on view mode
- Example: "$45K" (pale orange) to "$100K+" (dark green)

**Section F: Quick Stats (Bottom of Panel)**
- "National Median: $54,200"
- "Top City: San Mateo, CA ($67,771)"
- "Best Value: San Antonio, TX (adj. $61,538)"
- Last updated date

**2. Main Map Area (350-1750px width, full height)**

**U.S. Map (Albers USA Projection)**
- Displays all 50 states + DC
- Alaska and Hawaii scaled and repositioned (standard practice)
- State fill color based on veteran median income
- Smooth color transitions between states
- State abbreviation labels (centered, auto-sized)

**Metro Area Overlays**
- Top 25 metro areas marked with circular markers
- Marker size proportional to veteran population (5px-25px radius)
- Color: Red `#D32F2F` with 60% opacity
- White border (2px)
- On hover: Expands 20%, shows name in tooltip

**Top 10 Cities Stars**
- Gold star icons (⭐) at exact city coordinates
- Size: 20px × 20px
- Animated subtle pulse (scale 1.0 to 1.1, 2s loop)
- Click to show detail panel

**Interactive Elements:**
- **Hover over state:**
  - State highlights with yellow overlay (40% opacity)
  - Tooltip appears showing:
    - State name
    - Veteran median income
    - Rank (out of 50)
    - Cost of living index
    - Adjusted income
    - Veteran population
    - Unemployment rate
- **Click on state:**
  - Zooms map to state (3x zoom with smooth transition)
  - Shows all cities within state with veteran data
  - City markers appear (circles, sized by population)
  - Detail panel slides in from right
- **Hover over metro marker:**
  - Marker scales up 20%
  - Shows metro area name and quick stats
- **Click on metro marker:**
  - Opens detailed comparison panel

**3. Right Detail Panel (Slides in, 450px width)**

**Header:**
- City/Metro name (24px, bold)
- State name (16px, regular)
- Close button (X, top right)

**Content Sections:**

**A. Salary Overview**
- Large number display: "$XX,XXX"
- Label: "Veteran Median Salary"
- Visual bar: Position relative to national median
- Percentile: "Top 15% nationally"

**B. Cost of Living Breakdown**
- COL Index: 119 (large number)
- Label: "vs. National Average (100)"
- Pie chart showing expense categories:
  - Housing: 33%
  - Transportation: 15%
  - Food: 13%
  - Healthcare: 8%
  - Utilities: 7%
  - Taxes: 15%
  - Other: 9%
- Each slice color-coded and labeled

**C. Adjusted Purchasing Power**
- Large number: "$XX,XXX"
- Label: "After Cost-of-Living Adjustment"
- Icon: Shopping cart or dollar with magnifying glass
- Comparison bar: vs. raw salary
- Text: "Equivalent to $XX,XXX in [baseline city]"

**D. Key Metrics Grid (2 columns)**
- Unemployment Rate: 2.8% (with trend arrow)
- Veteran Population: 42,000
- Job Growth: +3.5% annually
- Housing Median: $385,000
- Vet Unemployment: 2.4%
- Quality of Life: 92/100

**E. Best For (Tags)**
- Rounded tag pills: "Tech Jobs" | "No State Tax" | "Military-Friendly"
- Color: Blue `#1976D2` background, white text
- Max 5 tags

**F. Top Employers**
- Bulleted list of 5-7 major employers hiring veterans
- Icons for company types (tech, federal, healthcare, etc.)

**G. Compare Button**
- "Compare with Another City" (full-width button)
- Opens comparison modal

**H. Resources**
- "View Housing Data" (link)
- "Find Veteran Services" (link)
- "Job Search in [City]" (link)

**4. Comparison Modal (Overlay)**

When user clicks "Compare":
- Dims background (black, 60% opacity)
- Center modal: 1000px × 700px
- White background with shadow

**Modal Content:**
- Title: "City Comparison"
- Two-column layout
- Left column: Current city (auto-populated)
- Right column: Dropdown to select comparison city
- Comparison table rows:
  - Veteran Median Salary
  - Cost of Living Index
  - Adjusted Purchasing Power
  - Housing Cost Median
  - Unemployment Rate
  - Veteran Population
  - Quality of Life Score
  - State Income Tax
- Winner highlighted in each row (green background)
- Bottom: "Difference in Purchasing Power: +$X,XXX in favor of [City]"
- Close button

---

## Detailed Mockup Description

**Initial Load State:**

User sees full U.S. map with all states colored according to veteran salary. Darker greens (Northeast, California, Alaska) immediately stand out. Mid-tones (Texas, Southeast) visible. Lightest colors (some Southern states) also apparent.

**Visual Hierarchy:**

1. **Eye is drawn to dark green states** - DC, Connecticut, New Jersey, Massachusetts (highest salaries)
2. **Gold stars pop against map** - Top 10 cities marked prominently
3. **Red metro circles** create secondary focus points
4. **Left panel** provides context and controls

**Interaction Flow Example:**

1. User hovers over California
   - Tooltip: "California | Veteran Median: $62,000 | COL Index: 151 | Adjusted: $41,059 | Rank: 8"
   - State highlights with yellow glow

2. User clicks California
   - Map smoothly zooms to California (fills 70% of map area)
   - Major metros appear: San Francisco, Los Angeles, San Diego, Sacramento
   - San Mateo gold star pulses
   - Detail panel slides in from right showing California state data

3. User clicks San Mateo gold star
   - Detail panel updates to San Mateo city data
   - Shows $67,771 salary (largest number)
   - COL index 194 (red warning icon: "Very High")
   - Adjusted salary $34,933 (much smaller, orange color)
   - Visual comparison: Bar chart showing raw salary (tall green bar) vs adjusted (shorter orange bar)
   - Tags: "Tech Jobs" | "Highest Nominal Salary" | "High Housing Costs"

4. User toggles to "Cost-of-Living Adjusted" view mode
   - Map smoothly re-colors
   - California fades from dark green to light orange
   - Texas brightens to medium green
   - DC remains dark green (high salary AND moderate COL)
   - Legend updates to show adjusted salary ranges
   - San Mateo star changes from #1 to showing lower adjusted rank

5. User selects "Compare with Another City"
   - Modal opens
   - Left column: San Mateo, CA auto-filled
   - User types "Austin" in right column search
   - Selects "Austin, TX"
   - Table populates:
     - Salary: $67,771 vs $62,000 (San Mateo wins, +$5,771)
     - COL: 194 vs 119 (Austin wins, much lower)
     - Adjusted: $34,933 vs $52,101 (Austin wins, +$17,168)
     - Housing: $1.2M vs $465K (Austin wins dramatically)
   - Bottom banner: "Austin provides $17,168 MORE in purchasing power despite lower salary"
   - Color coding: Green highlights Austin's wins, red highlights losses

**Mobile Experience:**

- Map occupies top 60% of screen (vertical orientation)
- Pinch to zoom functionality
- Tap state to highlight, double-tap to zoom
- Control panel becomes bottom sheet (swipe up to expand)
- Detail panel becomes full-screen modal (slides up from bottom)
- Comparison mode uses full-screen overlay with vertical stacking

---

## Accessibility Specifications

### WCAG 2.1 AA Compliance

**Color Contrast:**
- All text minimum 4.5:1 ratio against backgrounds
- Map colors tested for colorblind users (deuteranopia, protanopia)
- Alternative high-contrast mode: Black background, high-contrast scale (pure yellow to pure blue gradient)

**Keyboard Navigation:**
- Tab through: Control panel inputs → Map states (alphabetical) → Metro markers → Detail panel elements
- Arrow keys: Navigate between adjacent states on map
- Enter/Space: Select state or city
- Escape: Close detail panel or modal
- '/' key: Focus search input
- Focus indicators: 3px solid blue outline with 2px white inner border

**Screen Reader Support:**
- Map regions marked with ARIA labels: "Interactive map of United States veteran salaries"
- Each state: "Button: [State Name], Veteran median income [amount], Cost of living index [number], Adjusted income [amount], Press Enter for details"
- Metro markers: "Point of interest: [Metro Name], Press Enter to view details"
- Alternative table view available: "View as Data Table" button converts map to sortable table
- Live region announces changes: "Map view changed to Cost-of-Living Adjusted"

**Alternative Views:**
- "Table View" button: Shows all data in sortable, filterable table
  - Columns: Location, Salary, COL Index, Adjusted Salary, Unemployment, Veteran Pop
  - Sort by any column
  - Filter by state or metro
- "List View" button: Ranked list of cities with expandable details
- "Print View": Static map with key data table, optimized for printing

**Touch Accessibility:**
- Minimum touch target: 44×44px for all interactive elements
- Map tappable areas: States have minimum target of 60px in smallest dimension
- Pinch-to-zoom enabled on map
- Swipe gestures for panel navigation
- Double-tap to activate (prevents accidental taps)

---

## Technical Implementation Notes

### Technology Stack Recommendation

- **Mapping Library:** D3.js v7 with TopoJSON for optimized US map rendering
- **Alternative:** Mapbox GL JS (for more advanced tile-based rendering, if budget allows)
- **Framework:** React 18+ with TypeScript
- **State Management:** Zustand for filter and view state
- **Animation:** Framer Motion for panel transitions, D3 transitions for map updates
- **Data Processing:** D3-array, D3-scale for color scales
- **Responsive:** Tailwind CSS with custom breakpoints
- **Search:** Fuse.js for fuzzy city/state search
- **Charts:** Recharts for pie charts in detail panel
- **Testing:** Jest, React Testing Library, Axe for accessibility

### Performance Requirements

- **Initial Load:** <2 seconds including map render and data
- **Map Interaction:** <50ms response to hover, <200ms for zoom animation
- **Color Scale Update:** <300ms when switching view modes
- **Detail Panel:** Slide in/out in 350ms
- **TopoJSON Size:** <100KB (compressed US map data)
- **Total Bundle:** <500KB (gzipped)
- **60fps Animations:** Maintained on modern devices
- **Mobile:** Optimized touch latency <100ms

### Data Update Strategy

- **Annual Major Update:** March (after Census Bureau releases prior year data)
- **Semi-Annual:** July and January for BLS COL updates
- **Quarterly Review:** Major metro areas checked for significant changes
- **Real-Time Flags:** Users can report outdated data → generates review ticket
- **Versioning:** Data version displayed in footer, changelog available

---

## Production Timeline & Resource Estimates

### Phase 1: Data Collection & Validation (Weeks 1-2)
- **Hours:** 45 hours
- Aggregate veteran salary data from Census VEO database
- Compile cost-of-living indices from BLS and third-party sources
- Validate metro area boundaries and coordinates
- Cross-reference salary data with minimum 2 sources
- Create structured JSON datasets
- Stakeholder review of data accuracy

### Phase 2: Design & Prototyping (Weeks 2-3)
- **Hours:** 40 hours
- High-fidelity Figma mockups (desktop, tablet, mobile)
- Color accessibility testing for choropleth scales
- User flow documentation
- Interactive prototype for user testing
- Test with 8-10 veterans (usability study)
- Iterate based on feedback

### Phase 3: Core Map Development (Weeks 4-5)
- **Hours:** 70 hours
- D3 map setup with Albers USA projection
- TopoJSON integration and optimization
- Choropleth coloring with dynamic scales
- State and metro interaction handlers
- Zoom and pan functionality
- Tooltip implementation
- Responsive breakpoints

### Phase 4: Control Panel & Filtering (Week 6)
- **Hours:** 35 hours
- Filter UI components (sliders, checkboxes, dropdowns)
- Search functionality with autocomplete
- View mode toggle with map re-rendering
- Legend component with dynamic updates
- State management for filters

### Phase 5: Detail Panel & Comparison (Week 7)
- **Hours:** 40 hours
- Detail panel slide animation
- Data visualization components (pie charts, bar comparisons)
- Comparison modal
- Side-by-side comparison logic
- Link integration to external resources

### Phase 6: Accessibility & QA (Week 8)
- **Hours:** 35 hours
- Keyboard navigation implementation
- ARIA labels and semantic HTML
- Screen reader testing (NVDA, JAWS)
- Alternative view creation (table, list)
- High-contrast mode
- Automated accessibility testing (axe, Pa11y)
- Cross-browser testing
- Mobile device testing

### Phase 7: Polish & Deployment (Week 9)
- **Hours:** 25 hours
- Animation refinement
- Performance optimization (code splitting, lazy loading)
- Analytics integration
- Documentation creation
- User guide ("How to Use This Tool")
- Production deployment
- Monitoring setup (error tracking, performance)

**Total Estimated Hours:** 290 hours (9 weeks with one full-time developer, or 7 weeks with 1.5 FTE)

**Maintenance:** 12 hours/quarter for data updates and minor bug fixes

---

## Success Metrics

### User Engagement
- **Target:** 55% of users interact with the map (hover or click)
- **Target:** 35% open at least one detail panel
- **Target:** 20% use the comparison feature
- **Target:** Average session duration >3 minutes
- **Measurement:** Event tracking, heatmaps, session recordings

### Information Comprehension
- **Survey:** "Do you understand how cost of living affects salary purchasing power?"
  - **Target:** 85% respond "Yes"
- **Survey:** "Can you identify 3 cities with the best value for veterans?"
  - **Target:** 75% can identify correctly from tool
- **A/B Test:** Users with COL-adjusted view make different relocation decisions than those with nominal salary only
  - **Target:** 40% difference in city preference

### Accessibility Performance
- **Target:** 100% WCAG 2.1 AA compliance (automated tests)
- **Target:** 90% task completion rate for keyboard-only users (5 participants)
- **Target:** 85% task completion rate for screen reader users (5 participants)
- **Target:** All interactive elements accessible via touch (minimum 44px targets)
- **Measurement:** Automated scans (axe-core), moderated usability testing

### Business Impact
- **Target:** 25% increase in geographic-based content page views
- **Target:** 40% of users who view tool subsequently visit job search or relocation resources
- **Target:** Reduction in "best cities for veterans" questions to career counselors by 30%
- **Target:** 100+ user testimonials collected in first year
- **Target:** Featured in 5+ veteran-focused publications/podcasts
- **Measurement:** Google Analytics, UTM tracking, counselor surveys, media mentions

### Technical Performance
- **Target:** <2s average load time (75th percentile)
- **Target:** <0.1% error rate
- **Target:** 95%+ mobile usability score (Google)
- **Measurement:** Lighthouse, Real User Monitoring (RUM), Sentry error tracking

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-11-11 | Military Transition Toolkit Team | Initial specification with 2024-2025 geographic salary data |

---

## Appendix: Data Sources & Validation

### Source URLs & Credibility

1. **U.S. Census Bureau - Veteran Employment Outcomes (2025)**
   - URL: census.gov/topics/population/veterans.html
   - Credibility: **Highest** - Official government source
   - Data: Geographic earnings, employment by metro area

2. **Salary.com Geographic Compensation (2025)**
   - Credibility: **High** - Aggregates employer-reported data
   - Data: City-specific veteran salaries (San Mateo $67,771, Juneau $66,416, etc.)

3. **WalletHub Best Cities for Veterans (2025)**
   - Credibility: **Medium-High** - Composite methodology using government data
   - Data: Rankings for Austin (#1), Orlando (#2), Raleigh (#3)

4. **Bureau of Labor Statistics - Consumer Price Index (2024)**
   - URL: bls.gov/cpi/
   - Credibility: **Highest** - Official government COL data
   - Data: Regional price indices

5. **Federal Pay - GS Locality Tables (2024)**
   - URL: federalpay.org/gs/locality
   - Credibility: **Highest** - Official OPM data republished
   - Data: 53 locality pay areas with adjustment percentages (proxy for COL)

6. **Redfin Veteran Homebuying Analysis (2025)**
   - Credibility: **Medium-High** - Real estate data platform
   - Data: Median household income ($85,955), housing affordability

### Data Validation Methodology

- **Geographic Coverage:** 50 states + DC, 50+ metro areas with veteran populations >5,000
- **Salary Data:** Cross-referenced Census, Salary.com, and BLS data (±5% variance acceptable)
- **Cost of Living:** BLS CPI used as primary source, augmented by C2ER Cost of Living Index
- **Veteran Population:** Census ACS 5-year estimates (most recent available)
- **Adjustment Formula:** Standard economic formula: Adjusted = Nominal / (COL Index / 100)
- **Quality Checks:** Outliers (>2 standard deviations) manually verified
- **Update Frequency:** Annual for core data, quarterly reviews for anomalies

### Known Limitations & Disclaimers

- **Salary data represents medians**: Individual salaries vary significantly by occupation, education, and employer
- **Cost of Living indices are estimates**: Actual costs depend on individual lifestyle and family size
- **Geographic data at metro level**: City-level data available for top 100 cities only
- **Veteran-specific data**: Some locations use general population COL data (veteran-specific unavailable)
- **Housing costs**: Median home prices; rentals may differ significantly
- **Temporal lag**: Most recent complete data typically 12-18 months old
- **Income definition**: "Median income" may include various sources (wages, benefits, pensions, disability)

**Important Note for Users:** This tool provides general guidance for relocation decisions. Individual circumstances, family needs, career field, and personal preferences should all factor into any relocation decision. Consult with financial advisors and career counselors for personalized advice.

---

**Specification Status:** Ready for Design & Development
**Priority:** High - Geographic considerations are top factor in veteran relocation decisions
**Next Steps:** Data aggregation → Design mockups → Stakeholder approval → Development sprint
