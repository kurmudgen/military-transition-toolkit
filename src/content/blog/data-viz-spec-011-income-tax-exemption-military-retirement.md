---
date: "2026-02-05"
---# Data Visualization Specification #011: State Income Tax Exemption on Military Retirement Pay

## 1. Overview

### Title
**Military Retirement Pay: State-by-State Tax Treatment Comparison (2024-2025)**

### Purpose
This interactive visualization enables transitioning service members and military retirees to quickly identify which states offer the most favorable tax treatment for military retirement income. With only two jurisdictions (California and D.C.) still fully taxing military retirement pay as of 2025, this visualization highlights the dramatic shift toward veteran-friendly tax policies across the United States.

### Target Audience
- Military personnel planning retirement locations (ages 35-60)
- Recently retired service members evaluating relocation options
- Military financial advisors and transition counselors
- Family members involved in retirement planning decisions

### Key Questions Answered
- Which states completely exempt military retirement pay from state income tax?
- Which states have no income tax at all?
- Which states offer partial exemptions and what are the dollar amounts?
- How does my state compare to neighboring states?
- What recent legislative changes have improved veteran tax benefits?

---

## 2. Data Sources

### Primary Sources
1. **Military Officers Association of America (MOAA)**
   - URL: https://www.moaa.org/content/state-report-card/statereportcard/
   - Data Type: Comprehensive state-by-state military retirement tax policies
   - Update Frequency: Quarterly with legislative session updates
   - Last Verified: January 2025

2. **The Military Wallet**
   - URL: https://themilitarywallet.com/military-retirement-pay-tax-exempt/
   - Data Type: Detailed state exemption amounts and eligibility criteria
   - Update Frequency: Annually (January)
   - Last Verified: January 2025

3. **VA News Official Sources**
   - URL: https://news.va.gov/139592/unlocking-veteran-tax-exemptions-across-states-and-u-s-territories/
   - Data Type: Federal perspective on state tax exemptions
   - Update Frequency: Annual
   - Last Verified: 2024

4. **State Department of Revenue Websites**
   - Individual state official sources for tax code verification
   - Update Frequency: Legislative session updates

5. **Military.com State Tax Information**
   - URL: https://www.military.com/money/personal-finance/state-tax-information.html
   - Data Type: Comprehensive tax guidance by state
   - Update Frequency: Annual

### Data Collection Date
January 2025

### Data Validation
All data cross-referenced with at least two independent sources. State-specific exemption amounts verified against official state revenue department publications.

---

## 3. Visualization Type

### Primary Visualization
**Interactive Choropleth Map of the United States**

### Rationale
A choropleth map is ideal for this dataset because:
- Geographic decision-making is central to retirement relocation planning
- Color-coding immediately conveys relative tax favorability
- Users naturally think geographically about "where to retire"
- Allows for quick regional comparisons
- Supports drill-down interactions for detailed state information

### Secondary Visualization
**Sortable Data Table with Filtering Capabilities**

### Rationale
Provides detailed numerical data and exemption criteria that complement the map's visual overview, allowing users to:
- Sort by exemption amount, effective date, or state name
- Filter by exemption category
- Export data for personal financial planning
- Compare multiple states side-by-side

---

## 4. Design Specifications

### Color Palette

**Tax Treatment Categories:**
- **Full Exemption (No Income Tax):** `#1B5E20` (Dark Green)
  - 9 states: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming

- **Full Exemption (With Income Tax):** `#4CAF50` (Medium Green)
  - 29 states: Alabama, Arizona, Arkansas, Connecticut, Hawaii, Illinois, Indiana, Iowa, Kansas, Louisiana, Maine, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Nebraska, New Jersey, New York, North Carolina, North Dakota, Ohio, Oklahoma, Pennsylvania, Rhode Island, South Carolina, West Virginia, Wisconsin

- **Substantial Partial Exemption ($30,000+):** `#8BC34A` (Light Green)
  - States: New Mexico ($30,000), Virginia ($40,000 in 2025), Kentucky ($31,110)

- **Moderate Partial Exemption ($12,500-$29,999):** `#FDD835` (Yellow)
  - States: Colorado (age-based: $15,000-$24,000), Delaware (age-based: $2,000-$12,500), Georgia (age-based: $17,500-$65,000), Maryland (age-based: $12,500-$20,000), Montana (50% for 5 years), Oregon (varies), Idaho (varies), Utah (varies), Vermont (income-limited)

- **Limited Partial Exemption (Income-Limited):** `#FF9800` (Orange)
  - California: $20,000 exemption (income limits: $125,000 single/$250,000 joint), sunsets before 2030

- **Full Taxation:** `#D32F2F` (Red)
  - Washington D.C.

**UI Elements:**
- Background: `#FAFAFA` (Off-white)
- Map Border/State Outlines: `#757575` (Medium Gray)
- Hover State Highlight: `#FFFFFF` (White) with `#212121` (Dark Gray) border
- Text Primary: `#212121` (Dark Gray)
- Text Secondary: `#616161` (Medium Gray)
- Accent Color: `#1976D2` (Blue) for interactive elements

### Typography

**Primary Font: Inter** (Modern, highly legible sans-serif)
- Map Title: Inter Bold, 32px, `#212121`
- State Names (on hover): Inter Semibold, 18px, `#212121`
- Legend Labels: Inter Regular, 14px, `#424242`
- Exemption Amount Display: Inter Medium, 20px, `#1976D2`
- Body Text/Descriptions: Inter Regular, 16px, `#616161`
- Data Table Headers: Inter Semibold, 14px, `#212121`
- Data Table Content: Inter Regular, 14px, `#424242`

**Fallback Fonts:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Layout Dimensions

**Desktop (1920×1080)**
- Map Container: 1400px × 800px
- Map Aspect Ratio: 16:9 (maintains geographic accuracy)
- Legend Panel: 300px × 600px (right side)
- Data Table: Full width, 1600px (below map)
- Padding: 40px margins, 24px internal spacing

**Tablet (768×1024)**
- Map Container: 700px × 500px
- Legend Panel: Full width, 700px × 250px (below map)
- Data Table: Full width with horizontal scroll
- Padding: 24px margins, 16px internal spacing

**Mobile (375×667)**
- Map Container: 340px × 400px
- Legend Panel: Full width, stacked vertically
- Data Table: Card-based layout, one state per card
- Padding: 16px margins, 12px internal spacing

### Interactive Elements

**Hover States:**
- State brightens by 10% luminosity
- White border (3px) appears around state
- Tooltip displays with 200ms fade-in transition

**Click/Tap Actions:**
- Opens detailed modal with full state information
- Modal includes exemption amount, effective dates, eligibility criteria, legislative history

**Zoom/Pan:**
- Mousewheel zoom (1x to 3x)
- Click-and-drag panning
- Reset button returns to default view

---

## 5. Sample Data Structure

### Data Schema (JSON Format)

```json
{
  "states": [
    {
      "id": "FL",
      "name": "Florida",
      "category": "no_income_tax",
      "exemption_amount": "Full",
      "exemption_percentage": 100,
      "exemption_details": "No state income tax",
      "effective_date": "N/A - Historical",
      "age_requirements": "None",
      "income_limits": "None",
      "residency_requirements": "Florida resident",
      "recent_changes": "None",
      "veteran_population": 1540000,
      "map_color": "#1B5E20"
    },
    {
      "id": "VA",
      "name": "Virginia",
      "category": "substantial_partial",
      "exemption_amount": "$40,000",
      "exemption_percentage": null,
      "exemption_details": "$30,000 exemption in 2024; $40,000 in 2025 and beyond",
      "effective_date": "2025-01-01",
      "age_requirements": "Age requirement expired in 2024",
      "income_limits": "None",
      "residency_requirements": "Virginia resident",
      "recent_changes": "Increased from $30,000 to $40,000 in 2025; removed age restrictions in 2024",
      "veteran_population": 783000,
      "map_color": "#8BC34A"
    },
    {
      "id": "CA",
      "name": "California",
      "category": "limited_partial",
      "exemption_amount": "$20,000",
      "exemption_percentage": null,
      "exemption_details": "Up to $20,000 exemption for taxpayers with AGI up to $125,000 (single/HOH) or $250,000 (joint)",
      "effective_date": "2025-01-01",
      "age_requirements": "None",
      "income_limits": "AGI: $125,000 single/$250,000 joint",
      "residency_requirements": "California resident",
      "recent_changes": "NEW in 2025! Previously fully taxed. Exemption sunsets before 2030.",
      "veteran_population": 1640000,
      "map_color": "#FF9800",
      "note": "Major policy change - California was one of only two states fully taxing military retirement"
    },
    {
      "id": "GA",
      "name": "Georgia",
      "category": "moderate_partial",
      "exemption_amount": "$17,500-$65,000",
      "exemption_percentage": null,
      "exemption_details": "Age-based exemptions: $17,500 (under 62), $35,000 (62-64), $65,000 (65+). Starting 2026, all ages receive $65,000 exemption.",
      "effective_date": "Current; expanding 2026-01-01",
      "age_requirements": "Age-based tiers through 2025",
      "income_limits": "Must have $17,500+ Georgia earned income for additional exemption (under 62)",
      "residency_requirements": "Georgia resident",
      "recent_changes": "2026 expansion: $65,000 exemption for all ages",
      "veteran_population": 678000,
      "map_color": "#FDD835"
    },
    {
      "id": "DC",
      "name": "District of Columbia",
      "category": "full_taxation",
      "exemption_amount": "$0",
      "exemption_percentage": 0,
      "exemption_details": "Military retirement pay fully taxed as ordinary income",
      "effective_date": "N/A",
      "age_requirements": "N/A",
      "income_limits": "N/A",
      "residency_requirements": "D.C. resident",
      "recent_changes": "None - remains only jurisdiction fully taxing military retirement",
      "veteran_population": 31000,
      "map_color": "#D32F2F"
    }
  ],
  "legend": [
    {
      "category": "no_income_tax",
      "label": "Full Exemption (No Income Tax)",
      "color": "#1B5E20",
      "count": 9,
      "description": "These states have no personal income tax"
    },
    {
      "category": "full_exemption",
      "label": "Full Exemption (With Income Tax)",
      "color": "#4CAF50",
      "count": 29,
      "description": "Military retirement pay completely exempt from state income tax"
    },
    {
      "category": "substantial_partial",
      "label": "Substantial Exemption ($30,000+)",
      "color": "#8BC34A",
      "count": 3,
      "description": "Exemption of $30,000 or more per year"
    },
    {
      "category": "moderate_partial",
      "label": "Moderate Exemption ($12,500-$29,999)",
      "color": "#FDD835",
      "count": 9,
      "description": "Partial exemptions with age or income requirements"
    },
    {
      "category": "limited_partial",
      "label": "Limited Exemption (Income-Restricted)",
      "color": "#FF9800",
      "count": 1,
      "description": "California: $20,000 exemption with AGI limits"
    },
    {
      "category": "full_taxation",
      "label": "Full Taxation",
      "color": "#D32F2F",
      "count": 1,
      "description": "Military retirement pay fully taxed"
    }
  ],
  "summary_statistics": {
    "total_states_territories": 51,
    "full_exemption_count": 38,
    "partial_exemption_count": 12,
    "no_exemption_count": 1,
    "states_with_recent_improvements": 15,
    "average_exemption_amount": 31250,
    "last_updated": "2025-01-15"
  }
}
```

---

## 6. Detailed Mockup Description

### Map Component

**Initial View:**
The United States map is displayed in an orthographic projection centered on Kansas (geographic center). All 50 states plus D.C. are visible without requiring scrolling. Alaska and Hawaii are repositioned and scaled (inset boxes) for compact display while maintaining recognizability.

**Color Application:**
States are filled with solid colors according to their tax treatment category. The gradient from dark green (most favorable) through yellow to red (least favorable) creates an intuitive visual hierarchy. The viewer immediately notices the predominance of green states (favorable tax treatment) and the single red jurisdiction (D.C.).

**State Boundaries:**
Medium gray borders (1px) separate states. Coastal boundaries are clearly defined against the off-white background.

### Interactive Tooltip

**Trigger:** Mouse hover (desktop) or tap (mobile)

**Appearance:**
A white card with subtle shadow (`box-shadow: 0 4px 12px rgba(0,0,0,0.15)`) appears 20px above the cursor. The tooltip uses the following structure:

```
┌─────────────────────────────────────┐
│ [State Flag Icon] FLORIDA           │
│─────────────────────────────────────│
│ Tax Treatment: Full Exemption       │
│ Reason: No State Income Tax         │
│                                     │
│ ✓ 100% of retirement pay tax-free  │
│ ✓ No age restrictions              │
│ ✓ No income limits                 │
│                                     │
│ Veteran Population: 1.54 million   │
│                                     │
│ [Click for full details]           │
└─────────────────────────────────────┘
```

### Legend Panel (Desktop)

**Position:** Fixed right side of screen, vertically centered

**Structure:**
```
┌───────────────────────────────────┐
│    TAX TREATMENT CATEGORIES       │
├───────────────────────────────────┤
│                                   │
│ [██] Full Exemption (No Tax)      │
│      9 states                     │
│                                   │
│ [██] Full Exemption               │
│      29 states                    │
│                                   │
│ [██] Substantial ($30K+)          │
│      3 states                     │
│                                   │
│ [██] Moderate ($12K-$30K)         │
│      9 states                     │
│                                   │
│ [██] Limited (Income Restricted)  │
│      1 state                      │
│                                   │
│ [██] Full Taxation                │
│      1 jurisdiction               │
│                                   │
├───────────────────────────────────┤
│ 2025 UPDATES                      │
│ • California adds $20K exemption  │
│ • Virginia increases to $40K      │
│ • Georgia expanding in 2026       │
├───────────────────────────────────┤
│ [Download Data] [Print View]      │
└───────────────────────────────────┘
```

### Detail Modal (Click/Tap)

**Trigger:** Click or tap on any state

**Size:** 600px × 700px (desktop), full-screen (mobile)

**Content Structure:**
- **Header:** State name, flag, overall rating (5-star system)
- **Quick Stats:** Exemption amount, effective date, veteran population
- **Detailed Breakdown:** Eligibility criteria with checkmarks/X marks
- **Recent Changes:** Timeline of legislative improvements
- **Financial Impact Calculator:** Input annual retirement pay, see tax savings
- **Related Resources:** Links to state Department of Revenue, MOAA state report card
- **Nearby States:** Quick comparison with bordering states
- **Action Buttons:** "Add to Comparison," "Share," "Download PDF"

### Data Table Component

**Position:** Below map, full width

**Columns:**
1. State (sortable, searchable)
2. Tax Treatment (filterable dropdown)
3. Exemption Amount (sortable)
4. Income Limits (Yes/No filter)
5. Age Requirements (Yes/No filter)
6. Effective Date (sortable)
7. Recent Changes (indicator icon)
8. Actions (Compare, Details)

**Features:**
- Sticky header on scroll
- Alternating row colors for readability
- Responsive collapse to card view on mobile
- Export to CSV, PDF, Excel
- Print-friendly formatting

---

## 7. Accessibility Guidelines

### WCAG 2.1 Level AA Compliance

**Color Contrast:**
- All text meets minimum 4.5:1 contrast ratio
- Large text (24px+) meets 3:1 ratio
- Map colors tested with colorblind simulation (Deuteranopia, Protanopia, Tritanopia)
- Alternative pattern fills available for colorblind users (toggle in settings)

**Keyboard Navigation:**
- Tab order: Map → Legend → Table → Footer
- States focusable via keyboard (Tab to cycle through alphabetically)
- Enter key opens detail modal
- Escape key closes modal
- Arrow keys navigate within table
- Space bar activates buttons

**Screen Reader Support:**
- Semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, `<table>`)
- ARIA labels for all interactive elements
  ```html
  <path aria-label="Florida: Full exemption, no state income tax. Click for details." role="button" tabindex="0">
  ```
- ARIA live region announces state data when hovering/focusing
- Table markup uses proper `<thead>`, `<tbody>`, `<th scope="col">` structure
- Skip link to bypass map and jump to table

**Visual Accommodations:**
- Zoom up to 200% without horizontal scrolling
- High contrast mode available (toggle)
- Reduced motion option (disables transitions for users who prefer reduced motion)
- Adjustable text size (browser controls supported)

**Alternative Text:**
- All icons include descriptive alt text
- Map has textual description of overall trends
- Complex information available in both visual and tabular formats

### Inclusive Design Considerations

**Mobile-First Approach:**
Touch targets minimum 44×44px (iOS HIG standard)

**Cognitive Load Reduction:**
- Progressive disclosure (simple map first, details on demand)
- Consistent color meanings throughout
- Clear visual hierarchy with size and weight

**Internationalization:**
- Dollar amounts formatted with commas (e.g., $40,000)
- Dates in ISO format (YYYY-MM-DD) with localized display
- State abbreviations include full names on hover

---

## 8. Technical Implementation Notes

### Technology Stack Recommendations

**Frontend:**
- **D3.js v7** for map rendering and interactivity
- **Leaflet.js** (alternative) if pan/zoom needed
- **React** or **Vue.js** for component management
- **Tailwind CSS** for responsive styling

**Data Storage:**
- JSON files for state data (update annually)
- SQLite or PostgreSQL for query capabilities
- Redis for caching frequent queries

**Performance:**
- Lazy load data table until user scrolls to it
- Use SVG for map (scalable, accessible)
- Implement service worker for offline capability
- CDN delivery for fast global access

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Android 90+

### Update Process

**Annual Review Cycle:**
- January: Review all state legislative changes from previous year
- February: Update data and publish revised version
- Throughout year: Monitor MOAA alerts for mid-year changes

**Version Control:**
Data file includes `version` and `last_updated` fields. Archive historical versions for trend analysis.

### Testing Requirements

**Usability Testing:**
- Test with 10+ military retirees (ages 45-70)
- Validate with colorblind users
- Screen reader testing with JAWS, NVDA, VoiceOver

**Cross-Device Testing:**
- iPhone 12/13/14 (Safari)
- Samsung Galaxy S21/S22 (Chrome)
- iPad Pro (Safari)
- Desktop Windows (Chrome, Edge)
- Desktop macOS (Safari, Chrome)

**Performance Metrics:**
- Initial load < 2 seconds (3G connection)
- Interaction response < 100ms
- Time to Interactive < 3 seconds

---

## 9. Content Requirements

### Introductory Text

**Headline:**
"Where Does Your Military Retirement Pay Go Further? Compare State Tax Treatment"

**Subheadline:**
"38 states now fully exempt military retirement pay from income tax—up from just 21 states a decade ago. Find the best state for your retirement."

**Context Paragraph:**
"Planning where to retire is one of the most important financial decisions military personnel make. State income tax treatment of military retirement pay can impact your annual budget by thousands of dollars. As of 2025, only Washington D.C. fully taxes military retirement income, while California has introduced a limited exemption. This interactive tool helps you compare all 50 states and the District of Columbia to make an informed decision about your retirement location."

### Educational Sidebar

**Title:** "Understanding Your Tax Savings"

**Content:**
- Explanation of how state tax exemptions work
- Example calculation: $50,000 retirement pay in 5% tax state = $2,500 annual savings
- Note about VA disability compensation (always tax-free federally and in all states)
- Reminder that federal income tax still applies to military retirement pay

### Call-to-Action

**Primary CTA:** "Download State Tax Comparison Guide (PDF)"
**Secondary CTA:** "Calculate Your Retirement Tax Savings"
**Tertiary CTA:** "Subscribe to Tax Law Updates"

---

## 10. Success Metrics

### User Engagement
- Average time on page: Target 3+ minutes
- Interaction rate: Target 75%+ users interact with map
- Modal opens: Target 2+ states viewed per session
- Table sorting/filtering: Target 50%+ users engage with table

### Task Completion
- Users can identify their state's tax treatment: 95% success rate
- Users can compare 2-3 states: 85% success rate
- Users can identify recent legislative changes: 70% success rate

### Accessibility
- Keyboard-only navigation success: 100%
- Screen reader task completion: 90%+
- Mobile usability score: 85+/100 (Google Mobile-Friendly Test)

---

## 11. Production Timeline & Resources

### Phase 1: Design & Data (2 weeks)
- **Week 1:** Data collection and validation
  - Research all 50 states + D.C. tax policies
  - Verify exemption amounts with state sources
  - Document recent legislative changes
  - Create master data spreadsheet
  - **Resources:** 1 Research Analyst (40 hours)

- **Week 2:** Visual design
  - Create high-fidelity mockups (Figma)
  - Design component library
  - Establish responsive breakpoints
  - User flow documentation
  - **Resources:** 1 UI/UX Designer (40 hours)

### Phase 2: Development (3 weeks)
- **Week 3:** Map component
  - Set up D3.js framework
  - Implement state geometries
  - Color coding and legend
  - Hover interactions
  - **Resources:** 1 Frontend Developer (40 hours)

- **Week 4:** Data table and modals
  - Build sortable/filterable table
  - Implement detail modals
  - Responsive card views
  - Export functionality
  - **Resources:** 1 Frontend Developer (40 hours)

- **Week 5:** Integration and interactivity
  - Connect map and table interactions
  - Implement state management
  - Add animations and transitions
  - Cross-browser testing
  - **Resources:** 1 Frontend Developer (40 hours)

### Phase 3: Testing & Launch (1 week)
- **Week 6:** QA and accessibility
  - Accessibility audit
  - Usability testing (5 participants)
  - Performance optimization
  - Bug fixes and refinement
  - Documentation
  - **Resources:** 1 QA Tester (20 hours), 1 Accessibility Specialist (20 hours)

### Total Estimated Time
**6 weeks (240 person-hours)**

### Budget Estimate
- Research Analyst: 40 hours × $50/hr = $2,000
- UI/UX Designer: 40 hours × $75/hr = $3,000
- Frontend Developer: 120 hours × $85/hr = $10,200
- QA Tester: 20 hours × $60/hr = $1,200
- Accessibility Specialist: 20 hours × $70/hr = $1,400
- **Total: $17,800**

### Ongoing Maintenance
- Annual data updates: 16 hours ($800/year)
- Legislative monitoring: 8 hours/quarter ($1,600/year)
- **Annual maintenance: $2,400**

---

## 12. Future Enhancements

### Phase 2 Features (Future Development)
1. **Cost of Living Integration**
   - Overlay cost of living index data
   - Calculate real purchasing power of retirement pay
   - Compare housing costs, healthcare, utilities

2. **Spouse Income Considerations**
   - Factor in spouse employment opportunities
   - Dual-income household tax implications
   - Job market data by state

3. **Healthcare Access Layer**
   - VA facility locations and ratings
   - State-specific veteran healthcare benefits
   - TRICARE provider density

4. **Personal Tax Calculator**
   - Input retirement pay amount
   - Add other income sources
   - Calculate side-by-side tax comparison for multiple states

5. **Trend Analysis (Historical Data)**
   - Show legislative improvements over past 10 years
   - Predict future policy trends
   - Identify states with pending legislation

6. **Community Insights**
   - User ratings and reviews of states
   - Veteran population density heatmap
   - Military-friendly employer concentration

---

## 13. Related Visualizations

This visualization pairs well with:
- **Property Tax Exemptions for Veterans** (Spec #013 in development)
- **State Veteran Healthcare Benefits** (Future spec)
- **Cost of Living Comparison for Military Retirees** (Future spec)
- **VA Disability Ratings and State Benefits** (Future spec)

Consider creating a "Retirement Planning Dashboard" that combines multiple state comparison visualizations in a unified interface.

---

## Document Version

**Version:** 1.0
**Date:** January 15, 2025
**Author:** Military Transition Toolkit Team
**Next Review:** January 2026
**Status:** Ready for Development
