---

date: "2026-02-06"
---# Data Visualization Specification #025: Logistics MOS Supply Chain Salaries

## Overview
**Visualization ID:** DVS-025
**Title:** Logistics MOS Salary Progression in Civilian Supply Chain Careers
**Category:** Salary & Career
**Target Audience:** Military logistics specialists (92A, 88M, 3051, 92Y) transitioning to civilian supply chain management
**Purpose:** Illustrate salary growth paths for logistics MOS veterans across five civilian supply chain career tracks from entry-level coordinator to executive director positions
**Last Updated:** 2025-11-11

## Executive Summary
This visualization transforms complex supply chain career paths into an accessible journey map showing salary progression for veterans with logistics MOS backgrounds. Using an interactive career pathway diagram, this specification demonstrates how Army 92A (Automated Logistical Specialist) and 88M (Motor Transport Operator) veterans can progress from $46,500 entry-level logistics coordinator positions to $130,000+ supply chain management roles within 10-15 years. The visualization includes five distinct career paths (Operations, Procurement, Distribution, Management, and Executive Leadership) with real 2024-2025 salary data from BLS and industry sources, certification impact analysis (CSCP, CPIM, Six Sigma), and industry-specific variations (manufacturing, retail, defense, healthcare).

## Data Requirements

### Primary Data Points

#### Career Path 1: Logistics Operations Track
**Entry: Logistics Coordinator (0-2 years)**
- MOS Background: 92A, 92Y, 3051
- Median Salary: $53,458
- Range: $46,500 - $69,500
- Common Titles: Logistics Coordinator, Operations Coordinator, Supply Coordinator

**Mid-Level: Logistics Analyst (3-5 years)**
- Median Salary: $69,223
- Range: $56,945 - $85,327
- Certification Impact: CSCP +$8,000

**Senior: Logistics Manager (6-10 years)**
- Median Salary: $93,890
- Range: $82,709 - $109,150
- Certification Impact: CSCP + Six Sigma +$15,000

**Executive: Director of Logistics (10+ years)**
- Median Salary: $115,075
- Range: $97,184 - $137,693

#### Career Path 2: Procurement & Sourcing Track
**Entry: Procurement Specialist (0-2 years)**
- MOS Background: 92A, 92Y
- Median Salary: $58,000
- Range: $48,000 - $68,000

**Mid-Level: Senior Buyer (3-5 years)**
- Median Salary: $72,000
- Range: $62,000 - $85,000
- Certification Impact: CPSM +$10,000

**Senior: Procurement Manager (6-10 years)**
- Median Salary: $95,000
- Range: $85,000 - $127,000

**Executive: Director of Procurement (10+ years)**
- Median Salary: $125,000
- Range: $105,000 - $145,000

#### Career Path 3: Transportation & Distribution Track
**Entry: Transportation Coordinator (0-2 years)**
- MOS Background: 88M
- Median Salary: $54,189
- Range: $47,553 - $61,857
- CDL Premium: +$8,000

**Mid-Level: Distribution Manager (3-5 years)**
- Median Salary: $81,047
- Range: $70,000 - $95,000

**Senior: Transportation Manager (6-10 years)**
- Median Salary: $102,010
- Range: $85,000 - $125,000

**Executive: Director of Distribution (10+ years)**
- Median Salary: $124,090
- Range: $109,150 - $180,590

#### Career Path 4: Warehouse & Inventory Management Track
**Entry: Warehouse Supervisor (0-2 years)**
- MOS Background: 92A, 3051, 88M
- Median Salary: $52,000
- Range: $42,000 - $65,000

**Mid-Level: Warehouse Manager (3-5 years)**
- Median Salary: $63,961
- Range: $55,000 - $78,000

**Senior: Operations Manager (6-10 years)**
- Median Salary: $93,890
- Range: $82,000 - $112,000
- Six Sigma Impact: +$12,000

**Executive: VP of Operations (10+ years)**
- Median Salary: $135,000
- Range: $115,000 - $165,000

#### Career Path 5: Supply Chain Management Track
**Entry: Supply Chain Analyst (0-2 years)**
- MOS Background: 92A, 92Y
- Median Salary: $60,464
- Range: $49,803 - $69,500

**Mid-Level: Supply Chain Planner (3-5 years)**
- Median Salary: $77,413
- Range: $65,000 - $92,000
- Certification Impact: APICS CPIM +$9,000

**Senior: Supply Chain Manager (6-10 years)**
- Median Salary: $100,942
- Range: $88,000 - $122,390
- Certification Impact: CSCP +$12,000

**Executive: Director of Supply Chain (10+ years)**
- Median Salary: $130,000
- Range: $112,000 - $155,000
- MBA Premium: +$20,000

### Industry-Specific Salary Variations

**Manufacturing:**
- Entry: Base salary
- Mid-level: +5%
- Senior: +8%
- Executive: +10%

**Retail/E-commerce:**
- Entry: +3%
- Mid-level: +8%
- Senior: +12%
- Executive: +15%

**Defense Contracting:**
- Entry: +7%
- Mid-level: +10%
- Senior: +15%
- Executive: +18%
- Security Clearance: Additional +$10K-$15K

**Healthcare:**
- Entry: +2%
- Mid-level: +4%
- Senior: +6%
- Executive: +8%

**Technology:**
- Entry: +10%
- Mid-level: +15%
- Senior: +20%
- Executive: +25%

### Certification Impact Data

**APICS CSCP (Certified Supply Chain Professional):**
- Investment: $1,200
- Salary Increase: $8,000 - $15,000
- ROI: 6-18 months

**APICS CPIM (Certified in Production and Inventory Management):**
- Investment: $1,500
- Salary Increase: $9,000 - $12,000
- ROI: 8-20 months

**Six Sigma Green Belt:**
- Investment: $1,800
- Salary Increase: $12,000 - $18,000
- ROI: 7-18 months

**ISM CPSM (Certified Professional in Supply Management):**
- Investment: $1,000
- Salary Increase: $10,000 - $15,000
- ROI: 6-12 months

**PMP (for logistics managers):**
- Investment: $1,000
- Salary Increase: $15,000 - $20,000
- ROI: 4-8 months

### Data Sources
- U.S. Bureau of Labor Statistics (BLS) Occupational Employment Statistics 2024
- Society for Human Resource Management (SHRM) Compensation Survey 2024
- APICS (Association for Supply Chain Management) Salary Survey 2024
- Salary.com Supply Chain Compensation Report 2025
- PayScale Logistics Salary Data 2024-2025
- Glassdoor Supply Chain Salary Intelligence 2024-2025
- ZipRecruiter Military Logistics Transition Report 2025

### Sample Data Structure
```json
{
  "careerPaths": [
    {
      "id": "logistics-operations",
      "name": "Logistics Operations Track",
      "mosBackground": ["92A", "92Y", "3051"],
      "positions": [
        {
          "level": "entry",
          "title": "Logistics Coordinator",
          "experience": "0-2 years",
          "salary": {
            "median": 53458,
            "range": { "min": 46500, "max": 69500 },
            "p25": 46500,
            "p75": 69500
          },
          "certifications": [],
          "industryPremiums": {
            "manufacturing": 0,
            "retail": 0.03,
            "defense": 0.07,
            "healthcare": 0.02,
            "technology": 0.10
          }
        }
      ]
    }
  ],
  "certifications": [
    {
      "id": "cscp",
      "name": "APICS CSCP",
      "cost": 1200,
      "salaryImpact": { "min": 8000, "max": 15000 },
      "roiMonths": { "min": 6, "max": 18 }
    }
  ]
}
```

## Visual Design Specifications

### Chart Type
Interactive career pathway diagram (node-link visualization) with branching paths, showing progression from entry to executive positions with salary nodes

### Dimensions
- **Desktop:** 1600px (width) × 1100px (height)
- **Tablet:** 1024px (width) × 1000px (height)
- **Mobile:** 375px (width) × 900px (height) - vertical scrolling
- **Aspect Ratio:** 16:11 (desktop), flexible for mobile

### Color Palette

**Career Track Colors:**
- **Logistics Operations:** #2563EB (Blue 600)
- **Procurement & Sourcing:** #059669 (Green 600)
- **Transportation & Distribution:** #F59E0B (Amber 500)
- **Warehouse & Inventory:** #7C3AED (Purple 600)
- **Supply Chain Management:** #DC2626 (Red 600)

**Salary Range Indicators:**
- **Entry Level (< $70K):** #10B981 (Green 500) - Light shade
- **Mid Level ($70K - $100K):** #3B82F6 (Blue 500) - Medium shade
- **Senior ($100K - $130K):** #F59E0B (Amber 500) - Warm shade
- **Executive ($130K+):** #DC2626 (Red 600) - Bold shade

**Supporting Elements:**
- **Connection Lines:** #9CA3AF (Gray 400) - 2px solid
- **Active Path:** Career track color - 4px solid
- **Certification Badges:** #F59E0B (Amber 500) with white icon
- **MOS Tags:** #6B7280 (Gray 500) background with white text

**Background:**
- **Canvas:** #F9FAFB (Gray 50)
- **Node Background:** #FFFFFF (White)
- **Node Border:** #E5E7EB (Gray 200)
- **Hover Highlight:** #FEF3C7 (Amber 100)

### Typography
- **Title:** Inter Bold, 36px, #111827
- **Subtitle:** Inter Regular, 18px, #4B5563
- **Career Track Labels:** Inter Bold, 20px, respective track color
- **Position Titles:** Inter SemiBold, 16px, #1F2937
- **Salary Values:** Inter Bold, 18px, #059669
- **Experience Labels:** Inter Medium, 13px, #6B7280
- **MOS Tags:** Inter SemiBold, 11px, #FFFFFF
- **Tooltip Headers:** Inter Bold, 16px, #111827
- **Tooltip Body:** Inter Regular, 14px, #374151
- **Certification Labels:** Inter Medium, 12px, #92400E

### Layout Components

#### Title Area (120px height)
- Main title: "Logistics MOS Career Pathways in Supply Chain"
- Subtitle: "Map your transition from military logistics to civilian supply chain leadership"
- Quick stats: "5 career tracks | 17% job growth (BLS) | $132K max at 10 years"
- Filter bar: MOS selector (92A, 88M, 3051, 92Y, All)

#### Career Pathway Canvas (880px height)
- Left column: Entry-level positions (Year 0-2)
- Center-left: Mid-level positions (Year 3-5)
- Center-right: Senior positions (Year 6-10)
- Right column: Executive positions (Year 10+)
- Vertical spacing: 150px between track groups
- Node size: 160px (width) × 100px (height)
- Connection curves: Bezier curves with 40px control point offset

#### Information Panel (100px height)
- Left section: Selected path summary
- Center: Certification impact calculator
- Right: Industry comparison toggle
- Background: #FFFFFF with subtle shadow

## Interactive Elements

### Node Hover States
- **Position Node Hover:**
  - Scale: 1.05 transform
  - Box shadow: 0 8px 16px rgba(0, 0, 0, 0.15)
  - Border: 3px solid track color
  - Show quick stats overlay:
    - Median salary (large)
    - Salary range (small)
    - Experience required
    - Common MOS backgrounds

- **Detailed Tooltip:**
  ```
  [Position Title]
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Median Salary: $XX,XXX
  Range: $XX,XXX - $XX,XXX
  Experience: X-X years
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MOS Background: 92A, 92Y
  Required Skills:
  • Inventory management
  • ERP systems (SAP, Oracle)
  • Data analysis
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Certifications:
  🏆 CSCP: +$12,000
  🏆 Six Sigma: +$15,000
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [View X similar jobs]
  ```

### Path Highlighting
- **Track Selection:**
  - Click track label or any node in track
  - Highlight entire path from entry to executive
  - Emphasize connection lines (4px, animated dash)
  - Dim other tracks to 35% opacity
  - Show cumulative salary growth summary

- **Path Comparison Mode:**
  - Select up to 3 tracks simultaneously
  - Color-coded parallel paths
  - Show salary differential at each level
  - Display "comparison table" at bottom

### Certification Impact Explorer
- **Interactive Overlay:**
  - Toggle switch: "Show Certification Impact"
  - When enabled, display badge icons on nodes
  - Hover badge to see:
    - Certification name
    - Cost
    - Salary increase
    - ROI period
    - Study time
    - Exam pass rate

- **Certification Calculator:**
  - Side panel tool
  - Select base position
  - Add certifications (checkboxes)
  - Choose industry
  - View updated salary projection with breakdown

### Industry Comparison Toggle
- **Toggle Button:** "Compare Industries"
- **Expanded View:**
  - Each node splits into 5 mini-bars
  - One bar per industry (Manufacturing, Retail, Defense, Healthcare, Tech)
  - Color-coded by industry
  - Show percentage difference from base

### MOS Filter
- **Dropdown Selector:**
  - Options: All, 92A, 88M, 3051, 92Y
  - Filter highlights matching career paths
  - Dims non-matching paths
  - Updates "Best Fit" indicator

### Responsive Behavior
- **Desktop (1600px+):** Full horizontal layout with all paths visible
- **Tablet (1024px-1599px):** Reduce node spacing, smaller fonts
- **Mobile (375px-1023px):**
  - Vertical layout (top to bottom)
  - One track at a time with navigation
  - Swipe between tracks
  - Collapse certification badges into count indicator
  - Simplified tooltips

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
- Color contrast: Minimum 4.5:1 for all text
- Alternative text: "Career pathway diagram showing five logistics career tracks from entry-level coordinator positions ($46,500-$60,000) to executive director roles ($115,000-$155,000) over a 10-15 year progression"
- Keyboard navigation:
  - Tab through position nodes (left to right, top to bottom)
  - Arrow keys to navigate connections
  - Enter to select/highlight path
  - Space to open detail panel
  - Escape to clear selection/close modals
- Screen reader:
  - ARIA landmarks for major sections
  - Role="button" for interactive nodes
  - Live region for path selection announcements
  - Descriptive labels: "Logistics Coordinator, entry level, median salary $53,458, leads to Logistics Analyst"
- Focus indicators: 4px solid #2563EB outline with 2px offset

### Pattern Differentiation (Color Blindness Support)
- **In addition to color, use symbols:**
  - Logistics Operations: Circle ●
  - Procurement: Square ■
  - Transportation: Triangle ▲
  - Warehouse: Diamond ◆
  - Supply Chain: Pentagon ⬟
- **Connection line styles:**
  - Solid, dashed, dotted, dash-dot, double
  - Differentiate career tracks without relying on color

### Data Table Alternative
Provide "Table View" toggle displaying hierarchical table:
```html
<table>
  <caption>Logistics MOS Career Progression by Track</caption>
  <thead>
    <tr>
      <th scope="col">Career Track</th>
      <th scope="col">Entry (0-2y)</th>
      <th scope="col">Mid (3-5y)</th>
      <th scope="col">Senior (6-10y)</th>
      <th scope="col">Executive (10+y)</th>
    </tr>
  </thead>
  <tbody>
    [Rows for each track with salary data]
  </tbody>
</table>
```

## Technical Implementation Notes

### Recommended Libraries
- **Visualization:** D3.js v7.x (force-directed layout with fixed positions)
- **UI Framework:** React 18+ with TypeScript
- **State Management:** Zustand or Jotai (lightweight)
- **Animation:** Framer Motion or React Spring
- **Gesture Support:** use-gesture for mobile interactions
- **Tooltips:** Floating UI (Popper.js v3)
- **Icons:** Lucide React or Heroicons v2

### Performance Considerations
- Use SVG for pathways (better scaling)
- Canvas fallback for mobile (better performance with many nodes)
- Lazy load detailed panel content
- Debounce filter changes (300ms)
- Virtual scrolling for mobile track list
- Optimize bezier curve calculations (memoize)
- Use CSS transforms for animations
- Target: 60fps animations, < 50ms interaction latency

### Pathway Calculation Algorithm
```javascript
// Calculate optimal path layout
const calculatePathPositions = (tracks, levels) => {
  const nodeWidth = 160;
  const nodeHeight = 100;
  const horizontalSpacing = 280;
  const verticalSpacing = 150;

  return tracks.flatMap((track, trackIndex) =>
    levels.map((level, levelIndex) => ({
      x: levelIndex * horizontalSpacing + 100,
      y: trackIndex * verticalSpacing + 120,
      width: nodeWidth,
      height: nodeHeight,
      track: track.id,
      level: level.id
    }))
  );
};

// Generate bezier curve connections
const createConnectionPath = (source, target) => {
  const controlPoint1X = source.x + (target.x - source.x) * 0.4;
  const controlPoint2X = source.x + (target.x - source.x) * 0.6;

  return `M ${source.x + source.width} ${source.y + source.height / 2}
          C ${controlPoint1X} ${source.y + source.height / 2},
            ${controlPoint2X} ${target.y + target.height / 2},
            ${target.x} ${target.y + target.height / 2}`;
};
```

### Animation Specifications
- **Initial Load:**
  - Fade in title area: 300ms
  - Nodes appear level by level: 600ms total, stagger 150ms per level
  - Connection lines draw from left: 800ms with ease-out
  - Certification badges fade in: 400ms after nodes

- **Path Highlight:**
  - Selected path brightens: 250ms
  - Other paths dim: 250ms
  - Connection animation: Dashed line travels along path (2s loop)

- **Node Interaction:**
  - Scale on hover: 200ms with ease-out
  - Tooltip appearance: 150ms with slight upward motion
  - Detail panel slide: 350ms with ease-in-out

### State Management
```typescript
interface PathwayState {
  selectedTracks: string[];
  hoveredNode: string | null;
  comparisonMode: boolean;
  showCertifications: boolean;
  industryView: boolean;
  mosFilter: string;
  calculatorOpen: boolean;
  calculatorData: {
    basePosition: string;
    certifications: string[];
    industry: string;
  };
}
```

## Content Annotations

### Key Insights (Display as Info Bubbles)

1. **"Fastest Growing"** (Supply Chain Management track)
   - "Supply chain careers growing 17% (BLS 2024-2034)"
   - Icon: Trending up arrow
   - Position: Above Supply Chain Management label

2. **"Top Certification ROI"** (Multiple positions)
   - "Six Sigma delivers $12K-$18K salary increase"
   - Icon: Award badge
   - Position: Connects mid to senior levels

3. **"Defense Premium"** (All tracks)
   - "Defense contractors pay 15-18% above average"
   - Icon: Shield
   - Position: Top-right corner of canvas

4. **"MOS Advantage"** (Entry level)
   - "92A veterans start 15% above non-military hires"
   - Icon: Star
   - Position: Entry level cluster

### Contextual Help
- **Career Navigation Tips:**
  - "Lateral moves possible between tracks at same level"
  - "Most promotions occur at 3-year and 7-year marks"
  - "MBA common for executive track (adds $20K)"

- **Getting Started Guidance:**
  - Click your MOS to see best-fit paths
  - Hover any position to see requirements
  - Compare paths to find your ideal route

## User Story & Use Cases

### Primary User Story
"As a logistics MOS veteran, I want to visualize potential career paths in civilian supply chain so that I can choose a track aligned with my interests, see realistic salary expectations, and plan certification investments strategically."

### Use Cases
1. **Path Selection:** 92A veteran explores five tracks, selects Supply Chain Management, sees $130K+ potential
2. **Certification Planning:** Warehouse manager calculates CSCP + Six Sigma impact ($27K increase)
3. **Industry Comparison:** 88M veteran compares defense (high pay) vs retail (more jobs) opportunities
4. **Lateral Move:** Mid-career professional sees options to switch from operations to procurement
5. **Salary Negotiation:** Veteran with 5 years uses senior-level data to negotiate $95K offer

## Production Notes

### Design Deliverables
1. High-fidelity Figma design with interactive prototype
2. Node component library (5 track variations × 4 levels)
3. Icon set for MOS, certifications, industries
4. Connection line pattern library
5. Mobile-optimized designs (portrait and landscape)
6. Animation specification with timing curves
7. Content matrix for all tooltips and labels
8. Certification calculator mockup and logic
9. Data schema documentation

### Development Checklist
- [ ] Implement D3.js pathway layout
- [ ] Create node component system
- [ ] Build path highlighting logic
- [ ] Implement certification impact overlay
- [ ] Create industry comparison toggle
- [ ] Build certification calculator
- [ ] Add MOS filtering
- [ ] Implement responsive layouts
- [ ] Add touch gestures for mobile
- [ ] Create keyboard navigation
- [ ] Implement ARIA labels and roles
- [ ] Build table view alternative
- [ ] Test with screen readers
- [ ] Verify color contrast
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Analytics integration

### Testing Requirements
- **Functional:**
  - All interactions work correctly
  - Path highlighting accurate
  - Calculator produces correct results
  - Filters work properly

- **Visual Regression:**
  - Screenshot comparison for all states
  - Responsive breakpoint validation

- **Accessibility:**
  - Automated: axe DevTools, Lighthouse (target: 100)
  - Manual: Keyboard navigation, screen reader testing
  - Color blindness simulation

- **Performance:**
  - Lighthouse: 95+ score
  - Time to Interactive: < 2.5s
  - FCP: < 1.5s
  - Animation: 60fps

- **User Testing:**
  - 10 logistics MOS veterans
  - Tasks: Find career path, use calculator, compare industries
  - Success: 90%+ task completion, SUS 80+

### Analytics Tracking
- Track selection frequency by MOS
- Most viewed career tracks
- Certification calculator usage
- Industry comparison engagement
- Path comparison frequency
- Average time on visualization
- Detail panel open rate

## Time & Cost Estimates

### Design Phase: 30-36 hours
- Research and data validation: 8 hours
- Information architecture: 4 hours
- Pathway layout design: 6 hours
- Node and connection design: 5 hours
- High-fidelity design: 8 hours
- Calculator and controls design: 4 hours
- Interactive prototype: 6 hours
- Design review: 3 hours

### Development Phase: 50-60 hours
- D3.js pathway implementation: 18 hours
- Node interaction system: 10 hours
- Path highlighting and comparison: 8 hours
- Certification calculator: 6 hours
- Industry toggle and filters: 6 hours
- Responsive implementation: 8 hours
- Accessibility: 7 hours
- Testing and bug fixes: 10 hours

### Total Estimated Cost: $8,000 - $9,600
(Based on $100/hour blended rate)

## Version History
- **v1.0** (2025-11-11): Initial specification with 2024-2025 data
- **Planned v1.1** (2026-01): Add Navy LS and Aviation Ordnance MOS data
- **Planned v1.2** (2026-04): Add cost-of-living adjustments by metro area
- **Planned v2.0** (2026-09): Add "Career Simulator" with year-by-year progression tool

## Approval & Sign-off
- **Product Owner:** _________________ Date: _______
- **Design Lead:** _________________ Date: _______
- **Development Lead:** _________________ Date: _______
- **SME (Supply Chain Professional):** _________________ Date: _______
- **Logistics Transition Counselor:** _________________ Date: _______

---

**Document prepared by:** Military Transition Toolkit Team
**Classification:** Internal Use - Design Specification
**Review Cycle:** Annual update each January with BLS data refresh
**Related Documents:** DVS-023 (Certification ROI), DVS-021 (Infantry Progression)
**Data Update Process:** Supply chain salary data refreshed quarterly from industry sources
