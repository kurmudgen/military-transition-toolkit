# Data Visualization Specification #024: Cyber Security MOS Salary Ranges

## Overview
**Visualization ID:** DVS-024
**Title:** Cyber/IT MOS to Tech Sector Salary Ranges
**Category:** Salary & Career
**Target Audience:** Military cyber and IT specialists (17C, 25B, 0651, 1B4) transitioning to civilian tech careers
**Purpose:** Display comprehensive salary ranges for cyber/IT MOS veterans across entry, mid, and senior-level civilian positions in the technology sector
**Last Updated:** 2025-11-11

## Executive Summary
This visualization addresses the critical question for military cyber/IT professionals: "What can I actually earn in civilian tech?" Using a multi-dimensional box plot design, this specification shows salary ranges (25th percentile, median, 75th percentile, and top 10%) for three military cyber/IT MOS categories (Cyber Operations, IT Specialist, Network Operations) across six civilian job roles from entry-level to senior positions. Data reveals that Army 17C Cyber Operations specialists can command $78,000-$137,000 in their first year, while those with 15+ years experience can earn $128,000+, with top earners reaching $216,914. The visualization includes security clearance premiums, certification bonuses, and geographic variations to help veterans set realistic salary expectations and negotiate effectively.

## Data Requirements

### Primary Data Points

#### MOS Category 1: Cyber Operations (Army 17C, Air Force 1B4)

**Entry-Level Cybersecurity Analyst (0-2 years)**
- 25th Percentile: $70,000
- Median: $79,500
- 75th Percentile: $99,400
- 90th Percentile: $137,500
- Top 10% Average: $130,269
- With Security Clearance: +$15,000

**Mid-Career Information Security Analyst (3-7 years)**
- 25th Percentile: $92,160
- Median: $124,910
- 75th Percentile: $145,000
- 90th Percentile: $186,420
- With Security Clearance: +$20,000
- With CISSP: +$36,000

**Senior Cybersecurity Engineer (8-15 years)**
- 25th Percentile: $135,520
- Median: $157,248
- 75th Percentile: $189,361
- 90th Percentile: $245,674
- With Security Clearance: +$25,000
- With CISSP + Management: +$45,000

#### MOS Category 2: IT Specialist (Army 25B, Marine Corps 0651)

**Entry-Level IT Support/Help Desk (0-2 years)**
- 25th Percentile: $48,000
- Median: $58,000
- 75th Percentile: $64,000
- 90th Percentile: $77,000
- With Security+: +$8,000

**Mid-Career Network Administrator (3-7 years)**
- 25th Percentile: $77,623
- Median: $96,800
- 75th Percentile: $112,799
- 90th Percentile: $150,320
- With Security Clearance: +$12,000
- With CCNA: +$10,000

**Senior Systems Administrator (8-15 years)**
- 25th Percentile: $89,086
- Median: $98,116
- 75th Percentile: $107,080
- 90th Percentile: $148,680
- With Security Clearance: +$18,000

#### MOS Category 3: Cyber Operations Officer/Manager (O-1 to O-5 experience)

**Cybersecurity Manager (5-10 years management)**
- 25th Percentile: $145,000
- Median: $175,583
- 75th Percentile: $195,000
- 90th Percentile: $248,002
- With Security Clearance: +$30,000

**Director of Information Security (10+ years)**
- 25th Percentile: $180,000
- Median: $192,064
- 75th Percentile: $250,000
- 90th Percentile: $351,478
- With Security Clearance: +$40,000

### Supporting Data (Tooltips/Detail Panels)

**Geographic Premium by Metro Area:**
- San Francisco Bay Area: +35%
- Washington DC Metro: +28%
- New York City: +25%
- Seattle: +22%
- Austin: +15%
- Denver: +12%

**Security Clearance Premiums:**
- Secret: +$10,000 to +$15,000
- Top Secret: +$20,000 to +$30,000
- TS/SCI: +$30,000 to +$50,000

**Certification Impact:**
- Security+: +$8,000 to +$15,000
- CISSP: +$25,000 to +$40,000
- CEH: +$15,000 to +$25,000
- AWS Solutions Architect: +$20,000 to +$30,000
- CCNA: +$10,000 to +$18,000

**Industry Variations:**
- Defense Contractors: +15% average
- Financial Services: +20% average
- Healthcare: +8% average
- Government (DoD Civilian): Base rates
- Tech Companies (FAANG): +30-50% average

### Data Sources
- U.S. Bureau of Labor Statistics (BLS) OOH 2024
- Glassdoor Cybersecurity Salary Survey 2024-2025
- ZipRecruiter Military Cyber Salary Report 2025
- ClearanceJobs Compensation Survey 2024
- Salary.com IT Compensation Data 2025
- DoD DCIPS Cyber Excepted Service Pay Charts 2024
- ISC² Cybersecurity Workforce Study 2024

### Sample Data Structure
```json
{
  "mosCategories": [
    {
      "id": "cyber-operations",
      "name": "Cyber Operations (17C, 1B4)",
      "mos": ["17C", "1B4"],
      "positions": [
        {
          "level": "entry",
          "title": "Cybersecurity Analyst",
          "experience": "0-2 years",
          "salaryRange": {
            "p25": 70000,
            "median": 79500,
            "p75": 99400,
            "p90": 137500,
            "top10Avg": 130269
          },
          "bonuses": {
            "clearance": 15000,
            "security+": 8000,
            "dodRequirement": true
          }
        }
      ]
    }
  ]
}
```

## Visual Design Specifications

### Chart Type
Multi-series box plot (quartile visualization) with range indicators and overlay markers for certification/clearance premiums

### Dimensions
- **Desktop:** 1400px (width) × 1000px (height)
- **Tablet:** 900px (width) × 900px (height)
- **Mobile:** 375px (width) × 800px (height)
- **Aspect Ratio:** 7:5 (desktop), flexible for mobile

### Color Palette

**MOS Category Colors:**
- **Cyber Operations (17C, 1B4):** #7C3AED (Purple 600)
- **IT Specialist (25B, 0651):** #2563EB (Blue 600)
- **Cyber Officer/Manager:** #DC2626 (Red 600)

**Salary Range Indicators:**
- **Box (25th-75th percentile):** Category color at 70% opacity
- **Median Line:** Category color at 100%, 4px weight
- **Whiskers (10th-90th):** Category color at 50% opacity, 2px
- **Outliers (Top 10%):** Category color, 8px circles

**Premium Indicators:**
- **Security Clearance:** #059669 (Green 600) - Shield icon
- **Certification:** #F59E0B (Amber 500) - Badge icon
- **Geographic:** #0891B2 (Cyan 600) - Location pin icon

**Supporting Colors:**
- **Grid Lines:** #E5E7EB (Gray 200)
- **Background:** #F9FAFB (Gray 50)
- **Cards Background:** #FFFFFF (White)
- **Text Primary:** #111827 (Gray 900)
- **Text Secondary:** #6B7280 (Gray 500)
- **Highlight:** #FEF3C7 (Amber 100)

### Typography
- **Title:** Inter Bold, 34px, #111827
- **Subtitle:** Inter Regular, 18px, #4B5563
- **MOS Category Labels:** Inter Bold, 16px, respective category color
- **Position Titles:** Inter SemiBold, 14px, #1F2937
- **Salary Labels:** Inter Bold, 15px, #059669
- **Axis Labels:** Inter Medium, 13px, #6B7280
- **Tooltip Headers:** Inter SemiBold, 16px, #111827
- **Tooltip Body:** Inter Regular, 14px, #374151
- **Legend:** Inter Medium, 13px, #4B5563

### Layout Components

#### Title Area (140px height)
- Main title: "Cyber/IT MOS Salary Ranges in Tech Sector"
- Subtitle: "Salary expectations for 17C, 25B, 0651, and 1B4 veterans from entry to senior level"
- Key insight: "Top 10% of Cyber Operations specialists earn $216K+ with TS/SCI clearance"
- Data source: "BLS 2024, Glassdoor 2024-2025, ClearanceJobs 2024"

#### Chart Area (740px height)
- Y-axis: Annual Salary ($40,000 - $360,000), logarithmic scale
- X-axis: Position levels grouped by MOS category
- Grid: Horizontal lines at $50K, $75K, $100K, $150K, $200K, $250K, $300K
- Padding: 100px (left), 80px (right), 40px (top), 120px (bottom)

#### Legend & Filters Area (120px height)
- MOS category selector with checkboxes
- Filters: Security clearance level, Certification, Geographic location
- View options: "Range View" | "Comparison View" | "Premium Calculator"
- Toggle: "Show percentiles" | "Show outliers"

## Interactive Elements

### Hover States
- **Box Plot Hover:**
  - Highlight entire box plot
  - Display detailed tooltip with breakdown:
    - Position title
    - Experience range
    - 25th, 50th, 75th, 90th percentiles
    - Number of data points
    - Job openings (if available)
  - Dim other MOS categories to 40% opacity

- **Median Line Hover:**
  - Emphasize line (6px weight)
  - Show median value in large font
  - Display "This is the median salary for [position]"

- **Premium Icon Hover:**
  - Expand icon (scale 1.3)
  - Show premium breakdown:
    - Clearance type and premium
    - Certification name and bonus
    - Geographic location and adjustment

### Click Interactions
- **Box Plot Click:**
  - Expand detail panel showing:
    - Full salary distribution histogram
    - Common job titles
    - Required skills and qualifications
    - Typical benefits packages
    - Career progression path
    - Sample job postings (3-5)

- **Premium Calculator:**
  - Interactive tool allowing users to:
    1. Select base MOS category
    2. Choose experience level
    3. Add security clearance level
    4. Add certifications (multiple select)
    5. Select geographic location
    6. View calculated salary range with adjustments

- **Comparison Mode:**
  - Select two position levels to compare side-by-side
  - Show percentage difference
  - Highlight skills gap between levels

### Drag Interactions
- **Salary Range Slider:**
  - Filter visible positions by salary expectation
  - Two-handle slider: minimum and maximum
  - Real-time update of visible data

### Responsive Behavior
- **Desktop (1400px+):** Full grid layout, all positions visible
- **Tablet (900px-1399px):** Two-column layout, scrollable
- **Mobile (375px-899px):**
  - Single column, vertical stack
  - Accordion-style for MOS categories
  - Simplified box plots (remove outliers)
  - Swipe to navigate between categories

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
- Color contrast: Minimum 4.5:1 for text, 3:1 for interactive elements
- Alternative text: "Box plot chart showing salary ranges for cyber and IT MOS veterans across six position levels, with Cyber Operations specialists earning $70,000 to $137,500 at entry level and up to $351,478 in director positions"
- Keyboard navigation:
  - Tab through position boxes
  - Arrow keys to navigate within categories
  - Enter to expand detail panels
  - Escape to close modals
- Screen reader support:
  - ARIA labels: "Salary range for [position], median $XXX, range $XXX to $XXX"
  - Live region announcements for filter changes
  - Table alternative with full numeric data
- Focus indicators: 4px solid #2563EB outline

### Pattern Differentiation (Color Blindness Support)
- **Cyber Operations:** Diagonal stripe pattern (45°, 2px, 4px spacing)
- **IT Specialist:** Horizontal stripe pattern (2px, 4px spacing)
- **Cyber Officer:** Vertical stripe pattern (2px, 4px spacing)
- **Median lines:** Dashed across all (8px dash, 4px gap)

### Data Table Alternative
```html
<table>
  <caption>Cyber/IT MOS Salary Ranges by Position Level</caption>
  <thead>
    <tr>
      <th scope="col">MOS Category</th>
      <th scope="col">Position</th>
      <th scope="col">Experience</th>
      <th scope="col">25th %ile</th>
      <th scope="col">Median</th>
      <th scope="col">75th %ile</th>
      <th scope="col">90th %ile</th>
    </tr>
  </thead>
  <tbody>
    [Rows for each position]
  </tbody>
</table>
```

## Technical Implementation Notes

### Recommended Libraries
- **Chart Library:** D3.js v7.x (recommended for custom box plots)
- **UI Components:** Radix UI or Headless UI for accessible controls
- **State Management:** Zustand or Redux Toolkit
- **Data Processing:** Lodash for statistical calculations
- **Icons:** Lucide React or Heroicons
- **Tooltips:** Floating UI (Popper.js successor)

### Performance Considerations
- Lazy render detail panels (mount on click)
- Virtualize position list for mobile
- Debounce filter changes (300ms)
- Use CSS containment for box plots
- Optimize SVG with viewBox and minimal paths
- Implement request animation frame for smooth scrolling
- Target: Time to Interactive < 3s on 3G

### Statistical Calculations
```javascript
// Calculate quartiles using linear interpolation
const calculateQuartiles = (data) => {
  const sorted = [...data].sort((a, b) => a - b);
  const q1 = quantile(sorted, 0.25);
  const median = quantile(sorted, 0.5);
  const q3 = quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const lowerWhisker = Math.max(min(sorted), q1 - 1.5 * iqr);
  const upperWhisker = Math.min(max(sorted), q3 + 1.5 * iqr);
  return { q1, median, q3, lowerWhisker, upperWhisker };
};
```

### Animation Specifications
- **Initial Load:**
  - Y-axis draws up: 600ms
  - Box plots grow from median: 800ms, stagger 100ms per box
  - Whiskers extend: 400ms after box appears
  - Outliers fade in: 300ms

- **Filter Transitions:**
  - Fade out removed items: 300ms
  - Reposition remaining items: 400ms with ease-in-out
  - Fade in new items: 300ms

- **Hover:**
  - Box highlight: 200ms
  - Tooltip appearance: 250ms with slight scale (0.95 to 1.0)

### State Management
```javascript
const [selectedMOS, setSelectedMOS] = useState(['all']);
const [filters, setFilters] = useState({
  clearance: null,
  certifications: [],
  location: null,
  experienceRange: [0, 20]
});
const [viewMode, setViewMode] = useState('range');
const [comparisonItems, setComparisonItems] = useState([]);
const [premiumCalculator, setPremiumCalculator] = useState({
  base: null,
  clearance: null,
  certs: [],
  location: null
});
```

## Content Annotations

### Key Insights (Display as Callout Cards)

1. **"DoD 8570 Requirement"** (Above entry-level positions)
   - "Security+ required for all DoD IT positions - add $8K-$15K"
   - Icon: Shield with checkmark
   - Color: #059669
   - Position: Spans entry-level Cyber and IT categories

2. **"Clearance Premium"** (Top-right corner)
   - "TS/SCI clearance adds $30K-$50K to senior positions"
   - Icon: Classified document
   - Color: #7C3AED
   - Link to: Clearance maintenance resources

3. **"Geographic Variation"** (Bottom-right)
   - "DC Metro area pays 28% above national average"
   - Icon: Location pin
   - Color: #0891B2
   - Interactive: Click to see all metros

4. **"Career Path"** (Connecting lines between levels)
   - "Average time from entry to senior: 8-12 years"
   - Icon: Arrow path
   - Color: #F59E0B
   - Link to: Career progression guide

### Contextual Help Tooltips

- **"What is a box plot?"** - Visual explanation with example
- **"Why use median instead of average?"** - Statistical reasoning
- **"How accurate is this data?"** - Methodology and sample size
- **"What if I have multiple certifications?"** - Stacking premium calculator

## User Story & Use Cases

### Primary User Story
"As a cyber MOS veteran preparing for transition, I want to understand realistic salary ranges for my skill level and see how certifications and clearances impact my earning potential so that I can set appropriate salary expectations and negotiate confidently."

### Use Cases
1. **Job Offer Evaluation:** 25B veteran receives $85K offer for network admin, confirms it's above median
2. **Certification Planning:** 17C analyst uses premium calculator to decide between Security+ and CISSP
3. **Geographic Relocation:** Veteran compares DC vs Austin salaries for information security role
4. **Career Progression:** Entry-level cyber analyst views senior engineer salary to set 10-year goal
5. **Salary Negotiation:** Veteran with TS/SCI uses clearance premium data to negotiate $25K increase

## Production Notes

### Design Deliverables
1. High-fidelity Figma design with component library
2. Interactive prototype demonstrating all interactions
3. Responsive designs for all breakpoints
4. Premium calculator mockup and logic flow
5. Icon set (SVG) for clearance, certification, location
6. Animation specification document
7. Content strategy for tooltips and help text
8. Data validation and update procedure document

### Development Checklist
- [ ] Implement D3.js box plot rendering
- [ ] Build statistical calculation engine
- [ ] Create premium calculator tool
- [ ] Implement responsive layout system
- [ ] Add filter and sort functionality
- [ ] Build detail panel system
- [ ] Create comparison mode
- [ ] Implement keyboard navigation
- [ ] Add ARIA labels and live regions
- [ ] Create accessible table view
- [ ] Test with screen readers
- [ ] Verify color contrast
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Print stylesheet
- [ ] Analytics integration

### Testing Requirements
- **Functional Testing:**
  - All filters work correctly
  - Premium calculator produces accurate results
  - Comparison mode displays correctly
  - Responsive behavior on all devices

- **Visual Regression:**
  - Screenshot comparison across browsers
  - Responsive breakpoint validation

- **Accessibility Audit:**
  - Automated: axe DevTools, Lighthouse (target: 100)
  - Manual: Keyboard navigation, screen reader testing
  - Color blindness simulation (all types)

- **Performance:**
  - Lighthouse score: 95+
  - Time to Interactive: < 3s
  - First Contentful Paint: < 1.5s
  - Total Blocking Time: < 300ms

- **User Testing:**
  - 10 cyber/IT veterans (mix of 17C, 25B, 0651)
  - Task: Find appropriate salary range and use calculator
  - Success criteria: 90% task completion, SUS score 80+

## Time & Cost Estimates

### Design Phase: 28-32 hours
- Research and data collection: 8 hours
- Competitive analysis: 3 hours
- Information architecture: 4 hours
- Wireframing: 4 hours
- High-fidelity design: 8 hours
- Premium calculator design: 3 hours
- Interactive prototype: 4 hours
- Design review and iteration: 3 hours

### Development Phase: 48-56 hours
- Box plot chart implementation: 16 hours
- Premium calculator logic: 8 hours
- Filter and sort system: 8 hours
- Detail panels and modals: 8 hours
- Responsive implementation: 8 hours
- Accessibility features: 6 hours
- Testing and bug fixes: 10 hours

### Total Estimated Cost: $7,600 - $8,800
(Based on $100/hour blended rate)

## Version History
- **v1.0** (2025-11-11): Initial specification with 2024-2025 salary data
- **Planned v1.1** (2026-01): Add Navy CTN and Air Force 3D0X2 MOS data
- **Planned v1.2** (2026-03): Add industry-specific salary breakdowns
- **Planned v2.0** (2026-06): Add AI/ML role salary data for cyber MOS

## Approval & Sign-off
- **Product Owner:** _________________ Date: _______
- **Design Lead:** _________________ Date: _______
- **Development Lead:** _________________ Date: _______
- **SME (Cyber Career Counselor):** _________________ Date: _______
- **Data Analyst:** _________________ Date: _______

---

**Document prepared by:** Military Transition Toolkit Team
**Classification:** Internal Use - Design Specification
**Review Cycle:** Quarterly update with latest BLS and industry salary data
**Related Documents:** DVS-023 (Certification ROI), DVS-021 (Career Progression)
