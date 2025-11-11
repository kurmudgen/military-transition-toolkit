# Data Visualization Specification #021: Infantry MOS Salary Progression

## Overview
**Visualization ID:** DVS-021
**Title:** Infantry MOS to Civilian Career Salary Progression
**Category:** Salary & Career
**Target Audience:** Infantry veterans (Army 11B, Marine Corps 0311) transitioning to civilian careers
**Purpose:** Demonstrate salary growth potential across common civilian career paths for infantry veterans over a 10-year period
**Last Updated:** 2025-11-11

## Executive Summary
This visualization showcases salary progression for infantry veterans (Army MOS 11B and Marine Corps MOS 0311) transitioning to five primary civilian career paths: Law Enforcement, Private Security/Contracting, Emergency Services, Security Management, and Federal Law Enforcement. Using real-world 2024-2025 salary data from the Bureau of Labor Statistics and industry sources, this interactive line chart demonstrates earning potential over a 10-year career span, helping infantry veterans make informed decisions about their post-military careers.

## Data Requirements

### Primary Data Points

**Career Path 1: Law Enforcement (Police Officer)**
- Year 0 (Entry): $45,000
- Year 2: $52,000
- Year 5: $62,000
- Year 7: $70,000
- Year 10: $77,270 (BLS median)

**Career Path 2: Private Military Contractor/Security**
- Year 0 (Entry): $60,000
- Year 2: $80,000
- Year 5: $115,000
- Year 7: $130,000
- Year 10: $145,000

**Career Path 3: Emergency Services (Firefighter/EMT)**
- Year 0 (Entry): $42,000
- Year 2: $48,000
- Year 5: $55,000
- Year 7: $60,000
- Year 10: $66,000

**Career Path 4: Security Management**
- Year 0 (Entry): $50,000
- Year 2: $58,000
- Year 5: $70,000
- Year 7: $85,000
- Year 10: $99,446

**Career Path 5: Federal Law Enforcement (FBI/Secret Service)**
- Year 0 (Entry): $52,000
- Year 2: $65,000
- Year 5: $82,000
- Year 7: $95,000
- Year 10: $110,000

### Data Sources
- U.S. Bureau of Labor Statistics (BLS) Occupational Outlook Handbook 2024
- ZipRecruiter Military Contractor Salary Survey 2025
- Glassdoor Security Professional Salary Data 2024-2025
- Military.com Veteran Employment Survey 2024
- Federal Law Enforcement Salary Tables 2024

### Sample Data Structure
```json
{
  "careerPaths": [
    {
      "id": "law-enforcement",
      "name": "Law Enforcement",
      "color": "#1E40AF",
      "dataPoints": [
        {"year": 0, "salary": 45000},
        {"year": 2, "salary": 52000},
        {"year": 5, "salary": 62000},
        {"year": 7, "salary": 70000},
        {"year": 10, "salary": 77270}
      ],
      "additionalInfo": {
        "median": 77270,
        "growthRate": "3%",
        "jobOpenings": 62200
      }
    }
  ]
}
```

## Visual Design Specifications

### Chart Type
Multi-line chart with gradient fills beneath each line

### Dimensions
- **Desktop:** 1200px (width) × 700px (height)
- **Tablet:** 768px (width) × 600px (height)
- **Mobile:** 375px (width) × 500px (height)
- **Aspect Ratio:** 12:7 (maintain for responsive scaling)

### Color Palette
- **Law Enforcement:** #1E40AF (Blue 700) - Primary line
- **Private Military Contractor:** #059669 (Green 600) - High earning line
- **Emergency Services:** #DC2626 (Red 600) - Service line
- **Security Management:** #7C3AED (Purple 600) - Management line
- **Federal Law Enforcement:** #0891B2 (Cyan 600) - Elite service line
- **Grid Lines:** #E5E7EB (Gray 200)
- **Background:** #FFFFFF (White)
- **Text:** #1F2937 (Gray 800)
- **Axis Labels:** #6B7280 (Gray 500)

### Typography
- **Title:** Inter Bold, 28px, #1F2937
- **Subtitle:** Inter Regular, 16px, #6B7280
- **Axis Labels:** Inter Medium, 14px, #6B7280
- **Data Labels:** Inter SemiBold, 12px, respective career path color
- **Tooltip Text:** Inter Regular, 14px, #1F2937
- **Legend:** Inter Medium, 14px, #374151

### Layout Components

#### Title Area (120px height)
- Main title: "Infantry MOS Salary Progression: 10-Year Career Outlook"
- Subtitle: "Compare earning potential across five civilian career paths for 11B/0311 veterans"
- Data source citation: "Data: BLS 2024, ZipRecruiter 2025, Glassdoor 2024-2025"

#### Chart Area (500px height)
- X-axis: Years of Experience (0-10 years)
- Y-axis: Annual Salary ($40,000 - $150,000)
- Grid: Horizontal lines every $20,000
- Padding: 60px (left), 40px (right), 20px (top), 60px (bottom)

#### Legend Area (80px height)
- Position: Below chart, horizontal layout
- Format: Colored line segment (20px) + Career name + Current median ($XX,XXX)
- Interactive: Click to highlight/dim corresponding line

## Interactive Elements

### Hover States
- **Line Hover:** Increase line weight from 3px to 5px, show glow effect (box-shadow: 0 0 10px [color])
- **Data Point Hover:** Display circular marker (8px radius) at intersection points
- **Tooltip Display:**
  - Background: #FFFFFF with 2px border matching career path color
  - Content: Career name, Year X, $XX,XXX, "+X% from previous milestone"
  - Position: Above data point with 10px offset
  - Drop shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

### Click Interactions
- **Legend Click:** Toggle visibility of specific career path
- **Line Click:** Highlight selected career path, dim others to 30% opacity
- **Reset Button:** Return to default view showing all career paths

### Responsive Behavior
- **Desktop (1200px+):** Full visualization with all elements visible
- **Tablet (768px-1199px):** Reduce padding, adjust font sizes (-2px)
- **Mobile (375px-767px):** Stack legend vertically below chart, reduce to 4 major grid lines

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
- Color contrast ratio: Minimum 4.5:1 for text, 3:1 for interactive elements
- Alternative text: "Line chart showing salary progression over 10 years for five infantry veteran career paths, with Private Military Contractor reaching $145,000 as the highest earner"
- Keyboard navigation: Tab through legend items, Enter to toggle visibility
- Screen reader support: ARIA labels for all interactive elements
- Focus indicators: 3px solid outline in #2563EB (Blue 600) for keyboard navigation

### Pattern Differentiation (Color Blindness Support)
- **Law Enforcement:** Solid line
- **Private Military Contractor:** Dashed line (8px dash, 4px gap)
- **Emergency Services:** Dotted line (2px dot, 3px gap)
- **Security Management:** Dash-dot line (8px dash, 3px gap, 2px dot, 3px gap)
- **Federal Law Enforcement:** Double line (two parallel 2px lines, 4px apart)

### Data Table Alternative
Provide "View as Table" button that displays same data in accessible HTML table format:
```
| Career Path | Entry | Year 2 | Year 5 | Year 7 | Year 10 |
|-------------|-------|---------|---------|---------|----------|
| Law Enforcement | $45,000 | $52,000 | $62,000 | $70,000 | $77,270 |
[...continues for all career paths]
```

## Technical Implementation Notes

### Recommended Libraries
- **Chart Library:** D3.js v7.x or Chart.js v4.x for rendering
- **Responsive Framework:** ResizeObserver API for dynamic resizing
- **Animation:** CSS transitions (0.3s ease-in-out) for hover states
- **Data Format:** JSON for easy updates and maintenance

### Performance Considerations
- Lazy load chart after page content loads (improve First Contentful Paint)
- Use CSS transform for animations instead of position changes
- Debounce window resize events (300ms delay)
- Preload Inter font family to prevent layout shift
- Target: Load and render within 2 seconds on 3G connection

### Animation Specifications
- **Initial Load:** Lines draw from left to right over 1.5 seconds (ease-out timing)
- **Data Point Appearance:** Stagger by 50ms per point after line completes
- **Hover:** Scale transform on markers (scale: 1.2) over 200ms
- **Toggle:** Fade in/out over 300ms

## Content Annotations

### Key Insights (Display as Callout Boxes)
1. **High-Risk, High-Reward:** "Private Military Contractors earn 88% more after 10 years compared to Law Enforcement positions"
2. **Steady Growth:** "Federal Law Enforcement offers the most stable salary progression with consistent 8-10% annual increases"
3. **Entry Advantage:** "Emergency Services provide excellent benefits packages that supplement base salary"

### Contextual Notes
- Badge icon next to Law Enforcement showing "62,200 annual openings (BLS 2024)"
- Shield icon next to Private Military Contractor showing "Requires security clearance"
- Medical cross next to Emergency Services showing "Often includes pension after 20 years"
- Star icon next to Federal Law Enforcement showing "Highly competitive: 3-5% acceptance rate"

## User Story & Use Cases

### Primary User Story
"As an infantry veteran researching civilian careers, I want to compare long-term salary potential across different career paths so that I can make an informed decision that balances earning potential with job satisfaction and work-life balance."

### Use Cases
1. **Career Planning:** Veteran uses chart during TAP/ACAP transition assistance program to identify highest-earning career path
2. **Education Investment:** Veteran compares salary trajectories to determine if additional certifications (e.g., EMT-Paramedic) justify cost and time
3. **Family Discussion:** Veteran shares visualization with spouse to discuss financial implications of career choices
4. **Recruiter Presentation:** Career counselor uses chart in group briefing to show realistic salary expectations

## Production Notes

### Design Deliverables
1. High-fidelity mockup (Figma/Sketch) showing all states: default, hover, clicked, mobile
2. Interactive prototype demonstrating all user interactions
3. Component specification document for developers
4. Asset package: SVG icons, font files, color swatches

### Development Checklist
- [ ] Implement responsive breakpoints
- [ ] Add ARIA labels and keyboard navigation
- [ ] Create data table alternative view
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast ratios with automated tools
- [ ] Performance test on 3G connection
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Add print stylesheet for export functionality

### Testing Requirements
- **Visual Regression:** Compare screenshots across browsers and devices
- **Accessibility Audit:** Run axe DevTools and Lighthouse accessibility scan (target: 100 score)
- **Performance:** Lighthouse performance score target: 90+
- **User Testing:** Conduct testing with 5 veterans, iterate based on feedback

## Time & Cost Estimates

### Design Phase: 16-20 hours
- Research and data gathering: 4 hours
- Wireframing and layout: 3 hours
- High-fidelity design: 6 hours
- Prototype creation: 4 hours
- Design review and iteration: 3 hours

### Development Phase: 24-30 hours
- Chart implementation: 10 hours
- Responsive design: 6 hours
- Interactive elements: 6 hours
- Accessibility implementation: 4 hours
- Testing and bug fixes: 4 hours

### Total Estimated Cost: $4,000 - $5,000
(Based on $100/hour blended rate for designer and developer)

## Version History
- **v1.0** (2025-11-11): Initial specification created with 2024-2025 salary data
- **Future Updates:** Refresh salary data annually each January using updated BLS and industry reports

## Approval & Sign-off
- **Product Owner:** _________________ Date: _______
- **Design Lead:** _________________ Date: _______
- **Development Lead:** _________________ Date: _______

---

**Document prepared by:** Military Transition Toolkit Team
**Contact:** For questions or clarifications, contact the design team
**Classification:** Internal Use - Design Specification
