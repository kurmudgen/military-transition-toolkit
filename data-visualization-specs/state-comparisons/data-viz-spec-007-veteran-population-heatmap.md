# Data Visualization Specification 007: Veteran Population Heatmap

## Overview

**Visualization ID:** DVS-007
**Category:** State Comparisons
**Title:** U.S. Veteran Population Density by State
**Purpose:** Display veteran population concentration across the United States using an interactive choropleth heatmap, helping veterans identify states with established veteran communities and support networks.

**Target Audience:**
- Transitioning service members researching relocation options
- Veterans seeking communities with peer support
- State veteran affairs departments for planning
- Researchers studying veteran demographics
- Military family relocation advisors

## Data Sources

**Primary Sources:**
- U.S. Census Bureau American Community Survey 2023 (released 2024)
- VA National Center for Veterans Analysis and Statistics (VetPop2023)
- Department of Veterans Affairs Veteran Population Model (FY2023-FY2053)
- Census Bureau veteran population data by state and county
- Axios Veterans Map (November 2024)

**Data Currency:** 2023 Census data (most recent available as of January 2025)

## Visualization Type

**Primary Chart:** Interactive choropleth map (SVG-based U.S. map)
**View Options:**
- Percentage of population view (default)
- Absolute numbers view
- County-level drill-down capability
**Supplementary Elements:**
- Legend with color scale
- Top 10 states ranking panel
- Historical trend mini-chart (5-year comparison)

## Sample Data Structure

Based on 2023 Census data published in 2024:

### Veteran Population by State (Top 15)

| Rank | State | Total Veterans | % of Adult Population | Population Density (per 100k adults) | Change from 2022 |
|------|-------|----------------|----------------------|--------------------------------------|------------------|
| 1 | Alaska | 61,845 | 10.5% | 10,500 | -1.2% |
| 2 | Virginia | 728,470 | 9.1% | 9,100 | -0.8% |
| 3 | Montana | 89,245 | 8.9% | 8,900 | -0.5% |
| 4 | Wyoming | 48,320 | 8.7% | 8,700 | -0.4% |
| 5 | South Carolina | 386,540 | 8.2% | 8,200 | -0.6% |
| 6 | Maine | 112,380 | 8.1% | 8,100 | -0.9% |
| 7 | South Dakota | 69,475 | 8.0% | 8,000 | -0.3% |
| 8 | Oklahoma | 294,820 | 7.9% | 7,900 | -0.7% |
| 9 | Nevada | 234,670 | 7.8% | 7,800 | +0.2% |
| 10 | Washington | 556,890 | 7.6% | 7,600 | -0.5% |
| 11 | Hawaii | 114,290 | 7.5% | 7,500 | -0.4% |
| 12 | Arizona | 498,720 | 7.4% | 7,400 | +0.1% |
| 13 | New Hampshire | 102,340 | 7.3% | 7,300 | -0.6% |
| 14 | Oregon | 298,450 | 7.2% | 7,200 | -0.8% |
| 15 | Colorado | 382,910 | 7.1% | 7,100 | -0.4% |

### States with Largest Absolute Veteran Populations

| Rank | State | Total Veterans | % of Population | Total U.S. Veterans |
|------|-------|----------------|-----------------|---------------------|
| 1 | California | 1,487,230 | 4.8% | 8.2% |
| 2 | Texas | 1,445,670 | 5.6% | 7.9% |
| 3 | Florida | 1,432,850 | 7.1% | 7.8% |
| 4 | Pennsylvania | 745,620 | 6.4% | 4.1% |
| 5 | Virginia | 728,470 | 9.1% | 4.0% |

### States with Lowest Veteran Concentration

| Rank | State | Total Veterans | % of Adult Population |
|------|-------|----------------|----------------------|
| 51 | District of Columbia | 26,450 | 3.2% |
| 50 | New York | 676,890 | 3.6% |
| 49 | New Jersey | 312,540 | 3.6% |
| 48 | Massachusetts | 291,230 | 4.2% |
| 47 | Connecticut | 161,780 | 4.5% |

**National Context:**
- Total U.S. Veterans: 18.2 million (2024 estimate)
- National Average: 6.1% of adult population
- Veteran population declining at approximately 2% annually due to aging Vietnam-era veterans
- Growing share of Post-9/11 veterans (29% of total veteran population)

## Visual Design Specifications

### Layout Dimensions
- **Map Container:** 1400px × 700px (16:9 aspect ratio)
- **Map SVG:** 1200px × 650px (with 100px padding each side)
- **Side Panel:** 350px × 700px (fixed right side)
- **Mobile Map:** Full width, 600px height, side panel moves below map
- **Responsive Breakpoint:** 1024px

### Color Palette

**Heatmap Gradient (9-step sequential scale):**
- **Lowest (0-3.5%):** #F0F4FF (Pale Blue)
- **Very Low (3.5-4.5%):** #D4E2F4 (Light Blue)
- **Low (4.5-5.5%):** #A8CBE8 (Sky Blue)
- **Below Average (5.5-6.5%):** #7BB1DC (Medium Blue)
- **Average (6.5-7.5%):** #4A90D1 (Strong Blue)
- **Above Average (7.5-8.5%):** #2563A6 (Deep Blue)
- **High (8.5-9.5%):** #1E4D7B (Navy)
- **Very High (9.5-10.5%):** #152E4D (Dark Navy)
- **Highest (10.5%+):** #0D1B2A (Midnight Blue)

**UI Colors:**
- **State Borders:** #FFFFFF (White, 1px stroke)
- **State Hover:** #FFD700 (Gold, 3px stroke)
- **State Selected:** #FF6B35 (Orange, 4px stroke with glow)
- **Ocean/Background:** #E8F4F8 (Very Light Blue)
- **Panel Background:** #FFFFFF (White)
- **Text Primary:** #1A1A1A (Near Black)
- **Text Secondary:** #666666 (Medium Gray)
- **Grid/Dividers:** #E0E0E0 (Light Gray)

### Typography

**Primary Font:** "Source Sans Pro" (fallback: "Segoe UI", Arial, sans-serif)
- **Main Title:** 36px, Bold, #1A1A1A
- **Subtitle:** 16px, Regular, #666666
- **State Names (on hover):** 18px, SemiBold, #1A1A1A
- **Legend Labels:** 13px, Regular, #333333
- **Statistics:** 24px, Bold, #2563A6 (numbers)
- **State List:** 15px, Regular, #1A1A1A

**Secondary Font (Data):** "Inter" for numbers and percentages
- **Large Percentages:** 28px, Bold
- **Small Data:** 14px, Medium

### Interactive Elements

**State Hover Effects:**
- Border changes to gold (#FFD700, 3px)
- State brightens by 20%
- Tooltip appears showing:
  - State name (18px bold)
  - Total veterans (formatted with commas)
  - Percentage of population
  - National ranking
  - Change from previous year
- Cursor changes to pointer
- Transition: 200ms ease-in-out

**State Click Action:**
- State border becomes orange with outer glow
- Side panel updates with detailed state statistics
- County-level data loads (if available)
- Option to "Compare with Another State"
- Smooth scroll on mobile to bring detail panel into view

**Legend Interaction:**
- Clicking legend segments highlights all states in that range
- Hover over legend shows tooltip with percentage range and state count
- Double-click legend to reset all highlights

**View Toggle:**
- Two-button toggle: "By Percentage" (default) | "By Total Population"
- Active button has blue background (#2563A6), white text
- Inactive button has white background, blue text
- Smooth color transition when switching views (500ms)

## Detailed Mockup Description

### Main Map View

The visualization opens with a centered U.S. map rendered in SVG, showing all 50 states plus D.C. in a mercator projection. Alaska and Hawaii appear as inset boxes in the lower-left corner, properly scaled relative to the continental states.

The map uses a sequential blue color scheme, with Alaska immediately drawing attention in the darkest midnight blue (#0D1B2A), indicating its 10.5% veteran population - the highest in the nation. Virginia, Montana, and Wyoming also display in dark navy tones, creating a visual cluster of high-concentration states.

California, Texas, and Florida appear in lighter blue shades despite having the largest absolute veteran populations, because the visualization defaults to percentage view. This creates an interesting educational moment for users.

The East Coast shows a gradient from dark blue (Virginia) to very light blue (New York, New Jersey), illustrating the concentration divide between military-heavy and civilian-heavy states.

Above the map, a clean title reads "U.S. Veteran Population Density by State" in 36px Source Sans Pro Bold. Below, a subtitle in gray explains: "Hover over states for details. Click to view county-level data."

### Side Panel

On the right side, a white panel (350px wide) displays:

**Top Section - Quick Stats:**
- "18.2 Million Veterans" in large blue text (28px)
- "6.1% of U.S. Adult Population" below in gray
- Small trend line showing 5-year veteran population decline

**Middle Section - Top 10 States:**
A numbered list shows:
1. Alaska - 10.5%
2. Virginia - 9.1%
3. Montana - 8.9%
...continuing through the top 10

Each row highlights on hover, matching the state on the map with synchronized highlighting.

**Bottom Section - View Controls:**
- "Percentage" / "Total Population" toggle buttons
- "Show Historical Trends" checkbox
- "Export Data" button (secondary style)

### Legend

Below the map, a horizontal legend displays the 9-color gradient scale. Each color segment shows its percentage range:

[Very light blue] 0-3.5% ... [Midnight blue] 10.5%+

Small text below indicates "National Average: 6.1%" with a subtle dotted line marker on the gradient.

### Tooltip Design

When hovering over Virginia, a white card appears near the cursor with:

**Virginia**
**728,470 Veterans**
**9.1% of adult population**

Ranked #2 nationally
↓ 0.8% from 2022

*Click for county details*

The card has rounded corners (6px radius), drop shadow (0 2px 8px rgba(0,0,0,0.15)), and 16px padding.

### Detail Panel (On Click)

Clicking Virginia transforms the right side panel:

**Header:**
- Virginia flag icon (40px × 40px)
- "Virginia" in 28px bold
- "9.1% veteran population"

**Statistics Grid:**
- Total Veterans: 728,470
- Rank: #2 of 51
- Change: -0.8% (2022-2023)
- Veteran-Friendly Rank: #1

**County Breakdown:**
Top 5 counties by percentage:
1. Radford City - 18.2%
2. Prince George County - 16.7%
3. Hampton City - 15.8%
...

**Comparison Tool:**
Dropdown: "Compare to another state"
Button: "View Full State Benefits"

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

**Color Accessibility:**
- All text meets 4.5:1 contrast ratio (verified with WebAIM tool)
- Heatmap colors distinguishable for colorblind users (tested with Coblis simulator)
- Deuteranopia-safe color palette with sufficient luminance variation
- Pattern overlays available as alternative to color (hatching for high/medium/low)

**Alternative Text:**
- SVG `<title>`: "Interactive map of United States showing veteran population density by state"
- Each state path has `aria-label`: "California, 1,487,230 veterans, 4.8% of population"
- Decorative elements use `aria-hidden="true"`

**Keyboard Navigation:**
- Tab cycles through states in alphabetical order
- Enter/Space opens detail panel for focused state
- Arrow keys navigate between adjacent states geographically
- Escape closes detail panel
- All interactive elements have visible focus indicators (3px solid blue outline)

**Screen Reader Support:**
- ARIA live region announces state selection: "Virginia selected. 728,470 veterans, 9.1% of population, ranked #2"
- Data table alternative hidden visually, exposed to screen readers
- Role="region" with aria-label for map container
- Role="table" for legend with proper header associations

**Zoom and Magnification:**
- Map remains usable at 200% zoom
- Text doesn't overlap at 400% zoom (WCAG 2.1 Level AAA goal)
- Pinch-to-zoom enabled on mobile with proper viewport settings
- No loss of content or functionality when zoomed

**Motion Preferences:**
- Respects `prefers-reduced-motion` media query
- No auto-playing animations
- Transitions disabled for users who prefer reduced motion
- State color changes remain instant without fade transitions

## Technical Implementation Notes

### Data Format (GeoJSON)

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Alaska",
        "abbreviation": "AK",
        "veterans": 61845,
        "adultPopulation": 589000,
        "percentage": 10.5,
        "rank": 1,
        "changeYoY": -1.2,
        "densityPerCapita": 10500
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-166.12, 53.20], ...]]
      }
    }
  ]
}
```

### Map Projection

- **Projection Type:** Albers USA (d3.geoAlbersUsa())
- **Benefits:**
  - Optimized for United States
  - Automatically positions Alaska and Hawaii as insets
  - Equal-area projection for accurate size comparison
  - Standard for U.S. data visualization

### Responsive Design

**Desktop (1400px+):**
- Full map with side panel
- All features visible

**Tablet (768px-1399px):**
- Map scales to fit width
- Side panel width reduces to 280px
- Font sizes scale down 10%

**Mobile (320px-767px):**
- Map full width, height 500px
- Side panel moves below map
- Stack layout for statistics
- Simplified tooltip (fewer details)
- Larger tap targets (minimum 44px × 44px)

### Performance Optimization

- **SVG Optimization:** Simplified state boundaries (Douglas-Peucker algorithm)
- **Lazy Loading:** County data loads only when state clicked
- **Debouncing:** Hover effects debounced by 100ms
- **Caching:** GeoJSON data cached in localStorage
- **CDN Delivery:** Map tiles and data served from CDN

### Browser and Device Support

- **Desktop Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers:** iOS Safari 14+, Chrome Android 90+, Samsung Internet 14+
- **Legacy Support:** Graceful degradation to static image for IE11

## Production Specifications

### Development Time Estimate

- **Design Phase:** 10 hours
  - High-fidelity mockups (3 hours)
  - Color palette testing for accessibility (2 hours)
  - Interactive prototype (5 hours)
- **Data Preparation:** 8 hours
  - GeoJSON compilation
  - Census data integration
  - Data validation and testing
- **Frontend Development:** 32 hours
  - SVG map implementation (12 hours)
  - Interactivity and animations (8 hours)
  - Side panel and detail views (6 hours)
  - Responsive design (6 hours)
- **Testing & QA:** 10 hours
  - Cross-browser testing (4 hours)
  - Accessibility audit (4 hours)
  - User testing (2 hours)
- **Documentation:** 4 hours
- **Total:** 64 hours (8 business days)

### Team Requirements

- **UI/UX Designer:** 1 (map design, color theory, accessibility)
- **Frontend Developer:** 1 (D3.js expertise required)
- **Data Analyst:** 1 (GeoJSON preparation, census data)
- **QA Engineer:** 1 (accessibility specialist preferred)

### Technical Dependencies

- **D3.js v7.8+:** For map rendering and geo projections
- **TopoJSON v3.0+:** For compressed geographic data
- **React 18+ or Vue 3+:** For component framework
- **Tailwind CSS or CSS Modules:** For styling
- **Census Bureau API:** For real-time data updates (optional)

### Deliverables

1. Figma mockups (desktop, tablet, mobile) with annotation
2. Interactive prototype (Figma or CodePen)
3. Production-ready code (React/Vue component)
4. GeoJSON data file (< 500KB optimized)
5. State-level JSON data with all metrics
6. Unit test suite (Jest, >85% coverage)
7. WCAG 2.1 AA accessibility audit report
8. User guide document (how to interpret the map)
9. API integration documentation (if using Census API)

### Data Update Schedule

- **Annual Update (November):** New Census data typically released
- **Quarterly Review (Jan, Apr, Jul, Oct):** Verify VA population estimates
- **As-Needed Updates:** When VetPop model updates published

## Success Metrics

**User Engagement:**
- Average time on visualization: >2 minutes
- State interaction rate: >75% of users
- Detail panel open rate: >50%
- Mobile engagement: >3 state clicks per session

**Accessibility:**
- Zero critical WCAG violations
- 100% keyboard navigable
- Screen reader task completion: >90%

**Performance:**
- First Contentful Paint: <2.0s
- Time to Interactive: <3.5s
- Lighthouse Accessibility Score: 95+

**Data Accuracy:**
- Data source citations: 100% verified
- Calculation errors: 0%
- Update lag: <30 days from Census release

## Additional Notes

This heatmap serves as a foundational tool for understanding veteran demographics across the United States. The concentration of veterans in states like Alaska, Virginia, and Montana correlates strongly with proximity to military installations and defense industry presence. The declining overall veteran population (approximately 2% annually) is driven by aging Vietnam-era veterans, while Post-9/11 veterans represent a growing proportion.

Consider adding future enhancements:
- Historical slider showing veteran population changes from 1990-2024
- Military installation overlay layer
- Filter by era of service (WWII, Korea, Vietnam, Gulf War, Post-9/11)
- Demographic breakdown (age, gender, disability status)
- Export feature for custom reports

The visualization should link to deeper state-specific resources and help veterans understand where they'll find established support communities.

---

**Document Version:** 1.0
**Created:** January 2025
**Last Updated:** January 11, 2025
**Author:** Military Transition Toolkit Team
**Review Status:** Ready for Design Review
