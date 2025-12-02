---
date: "2026-02-09"
---# Data Visualization Specification #031: Total Compensation Breakdown Chart

## Overview

**Visualization Title:** Total Compensation Breakdown by Industry
**Visualization Type:** Stacked Bar Chart with Interactive Breakdown
**Target Audience:** Military service members transitioning to civilian careers
**Primary Goal:** Help veterans understand the full value of compensation packages beyond base salary across different industries

## Purpose & Context

Military compensation includes base pay, housing allowances (BAH), food allowances (BAS), healthcare, and other benefits that total significantly more than base pay alone. However, transitioning service members often focus solely on civilian salary figures when evaluating job offers, potentially undervaluing opportunities with strong benefits packages.

This visualization breaks down total compensation into four key components—base salary, performance bonuses, equity/stock options, and benefits—across six major industries that commonly hire veterans. By showing the complete picture, veterans can make more informed career decisions and negotiate more effectively.

## Data Specifications

### Data Sources
- Bureau of Labor Statistics (BLS) Employer Costs for Employee Compensation, June 2025
- Radford Global Technology Survey 2024
- SullivanCotter Healthcare Management Survey 2024
- Financial services industry compensation reports 2025
- Defense contractor compensation data (CBO Atlas of Military Compensation 2024)

### Sample Data Structure

```json
{
  "industries": [
    {
      "name": "Technology",
      "basesalary": 145000,
      "bonus": 21750,
      "equity": 43500,
      "benefits": 35000,
      "totalCompensation": 245250,
      "bonusPercentage": 15,
      "equityPercentage": 30
    },
    {
      "name": "Financial Services",
      "basesalary": 125000,
      "bonus": 37500,
      "equity": 25000,
      "benefits": 32000,
      "totalCompensation": 219500,
      "bonusPercentage": 30,
      "equityPercentage": 20
    },
    {
      "name": "Healthcare",
      "basesalary": 95000,
      "bonus": 9500,
      "equity": 0,
      "benefits": 28500,
      "totalCompensation": 133000,
      "bonusPercentage": 10,
      "equityPercentage": 0
    },
    {
      "name": "Defense Contracting",
      "basesalary": 110000,
      "bonus": 11000,
      "equity": 5500,
      "benefits": 33000,
      "totalCompensation": 159500,
      "bonusPercentage": 10,
      "equityPercentage": 5
    },
    {
      "name": "Manufacturing",
      "basesalary": 85000,
      "bonus": 6375,
      "equity": 0,
      "benefits": 38250,
      "totalCompensation": 129625,
      "bonusPercentage": 7.5,
      "equityPercentage": 0
    },
    {
      "name": "Government/Federal",
      "basesalary": 95000,
      "bonus": 4750,
      "equity": 0,
      "benefits": 42750,
      "totalCompensation": 142500,
      "bonusPercentage": 5,
      "equityPercentage": 0
    }
  ]
}
```

## Visual Design Specifications

### Layout & Dimensions
- **Canvas Size:** 1200px width × 800px height
- **Chart Area:** 1000px width × 600px height
- **Margins:** Top: 80px, Right: 100px, Bottom: 80px, Left: 150px
- **Bar Width:** 120px with 40px spacing between bars
- **Legend Position:** Top-right corner with 20px padding

### Color Palette

**Compensation Components:**
- Base Salary: `#2C5F8D` (Deep Blue)
- Performance Bonus: `#4A90C8` (Medium Blue)
- Equity/Stock Options: `#7BB3DB` (Light Blue)
- Benefits (Healthcare, Retirement, etc.): `#B8D8E8` (Pale Blue)

**Supporting Colors:**
- Background: `#FFFFFF` (White)
- Grid Lines: `#E5E7EB` (Light Gray)
- Text Primary: `#1F2937` (Dark Gray)
- Text Secondary: `#6B7280` (Medium Gray)
- Accent/Highlight: `#10B981` (Green for hover states)

### Typography
- **Title:** Inter Bold, 32px, #1F2937, Letter-spacing: -0.5px
- **Subtitle:** Inter Regular, 16px, #6B7280, Line-height: 24px
- **Axis Labels:** Inter Medium, 14px, #374151
- **Data Labels:** Inter Semibold, 13px, #FFFFFF (on bars)
- **Tooltips:** Inter Regular, 14px, #1F2937
- **Legend:** Inter Medium, 14px, #374151

### Interactive Elements

**Hover State:**
- Darken hovered segment by 10%
- Display detailed tooltip showing:
  - Industry name
  - Component type
  - Dollar amount
  - Percentage of total compensation
  - Comparison to military equivalent (if applicable)
- Example tooltip: "Technology - Base Salary: $145,000 (59% of total)"

**Click Interaction:**
- Click on any bar segment to expand detailed breakdown panel on the right
- Panel shows:
  - Full compensation breakdown with precise figures
  - Year-over-year growth trends
  - Typical experience level for these figures
  - Military skill equivalencies

**Responsive Behavior:**
- Mobile (< 768px): Switch to vertical scrollable view with stacked bars displayed one at a time
- Tablet (768px - 1024px): Reduce bar width to 90px, maintain horizontal layout
- Desktop (> 1024px): Full specifications as listed

## Detailed Mockup Description

### Main Chart Area
The visualization presents six vertical bars arranged horizontally across the chart, each representing one industry. Industries are ordered from highest to lowest total compensation (left to right): Technology, Financial Services, Defense Contracting, Government/Federal, Healthcare, and Manufacturing.

Each bar is divided into four stacked segments with clear boundaries (2px white separator lines):
1. Bottom segment (darkest blue): Base Salary
2. Second segment (medium blue): Performance Bonus
3. Third segment (light blue): Equity/Stock Options (if applicable)
4. Top segment (pale blue): Benefits

Above each complete bar, display the total compensation figure in bold Inter Semibold 18px: "$245,250" for Technology, "$219,500" for Financial Services, etc.

### Y-Axis
- Range: $0 to $275,000
- Intervals: $25,000 increments
- Grid lines at each interval (1px solid #E5E7EB)
- Labels aligned right, 10px from axis line
- Format: "$0", "$25K", "$50K", etc.

### X-Axis
- Industry names centered below each bar
- Two-line layout for longer names (e.g., "Defense\nContracting")
- 40px vertical spacing from bottom of bars to labels

### Legend
Position in top-right with rounded rectangle background (#F9FAFB, 10px border-radius):
- Four rows, one per compensation component
- Color square (16px × 16px) followed by label
- 12px spacing between rows
- 20px padding on all sides

### Annotation Callouts
Add two educational callouts with leader lines:
1. Arrow pointing to Technology equity segment: "Tech companies often provide 30%+ of total comp as equity, which can grow significantly with company performance"
2. Arrow pointing to Manufacturing benefits segment: "Manufacturing offers strongest benefits packages at 30% of total comp, including pension plans"

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
- Color contrast ratios:
  - Text on white background: 7:1 (AAA compliant)
  - Data labels on colored bars: 4.5:1 minimum
- All information conveyed by color is also represented through patterns/textures (toggle available)
- Focus indicators: 3px solid outline (#10B981) for keyboard navigation

### Screen Reader Support
- ARIA labels for all chart elements
- Data table alternative available via toggle button
- Semantic HTML structure with proper heading hierarchy
- Example alt text: "Stacked bar chart showing Technology sector leads with $245,250 total compensation: $145,000 base salary, $21,750 bonus, $43,500 equity, and $35,000 benefits"

### Keyboard Navigation
- Tab through industries left to right
- Enter/Space to expand detailed view
- Arrow keys to navigate between compensation segments within a bar
- Escape to close expanded panels

### Cognitive Accessibility
- Consistent visual patterns across all bars
- Clear labels with no jargon (or jargon explained in tooltips)
- Optional simplified view that shows only base salary vs. total compensation
- Print-friendly version available

## Technical Implementation Notes

### Recommended Libraries/Frameworks
- **Primary:** D3.js v7.8+ for chart rendering
- **Alternative:** Recharts (React) or Chart.js with stacked bar plugin
- **Accessibility:** @react-aria/visually-hidden for screen reader text
- **Animation:** Framer Motion or D3 transitions (800ms ease-in-out)

### Data Updates
- Data should be refreshed quarterly from BLS and industry survey sources
- Include timestamp on visualization: "Data as of Q4 2024"
- API endpoint should return data in specified JSON structure
- Cache data client-side for 24 hours to reduce server load

### Performance Optimization
- Lazy load expanded detail panels
- Debounce hover events (100ms)
- Use CSS transforms for animations (GPU acceleration)
- Optimize SVG paths for smaller file size
- Target: < 100ms time to interactive, < 500KB total asset size

### Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari iOS: 14+
- Chrome Android: Last 2 versions

## Content Requirements

### Title & Subtitle
**Title:** "Total Compensation Breakdown by Industry"

**Subtitle:** "Understanding your complete compensation package beyond base salary—including bonuses, equity, and benefits valued at fair market rates (Mid-level professional with 5-8 years experience, 2024 data)"

### Educational Context Panel
Include an expandable information panel (?) with:

**Military Comparison:**
"As an E-6 with 10 years of service, your total military compensation (including BAH, BAS, healthcare, and tax advantages) equals approximately $85,000-$95,000. Use this chart to compare civilian opportunities on an apples-to-apples basis."

**Reading the Chart:**
- Base Salary: Regular paycheck amount before taxes
- Performance Bonus: Annual or quarterly bonus tied to individual/company performance (shown as % of base salary)
- Equity/Stock Options: Company stock grants that vest over time (typically 4 years)
- Benefits: Health insurance, retirement matching, PTO, continuing education (valued at employer cost)

**Important Notes:**
- Figures represent mid-level professionals (5-8 years experience)
- Equity values can fluctuate significantly with company performance
- Benefits valuation based on BLS employer cost data
- Geographic location significantly impacts these figures (shown data is for major metro areas)

## Production Notes

### Design Phase (Estimated: 12 hours)
- Create high-fidelity mockups in Figma (6 hours)
- Design interactive states and transitions (3 hours)
- Accessibility review and adjustments (2 hours)
- Stakeholder review and iteration (1 hour)

### Development Phase (Estimated: 24 hours)
- Set up chart framework and data structure (4 hours)
- Implement base chart with D3.js (8 hours)
- Add interactive features and tooltips (6 hours)
- Implement accessibility features (4 hours)
- Cross-browser testing and fixes (2 hours)

### Content & QA Phase (Estimated: 8 hours)
- Research and validate salary data (3 hours)
- Write educational content and tooltips (2 hours)
- Accessibility testing with screen readers (2 hours)
- User testing with veteran focus group (1 hour)

### Total Estimated Time: 44 hours (5.5 days)

### Dependencies
- Access to BLS API or data exports
- Industry compensation survey subscriptions (Radford, SullivanCotter)
- Veteran user testing group for validation
- Content review by career counselor or compensation specialist

### Future Enhancements
- Add regional cost-of-living adjustments
- Include experience level slider (entry/mid/senior/executive)
- Compare to current military compensation calculator
- Export feature to save personalized comparison
- Integration with job board data to show real-time market rates
- Add filtering by specific military MOS/rating

## Success Metrics

### Primary Metrics
- 70%+ of users interact with chart (hover or click)
- Average engagement time > 90 seconds
- < 5% bounce rate from this visualization

### Secondary Metrics
- 40%+ of users expand detailed breakdown panel
- 25%+ of users access educational context panel
- Positive feedback from veteran user testing (> 4.0/5.0 rating)

### Accessibility Metrics
- 100% keyboard navigable
- Zero critical accessibility issues in automated testing
- Successful screen reader navigation in user testing

---

**Version:** 1.0
**Last Updated:** November 11, 2025
**Author:** Military Transition Toolkit Team
**Status:** Ready for Design Phase
