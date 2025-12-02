---
date: "2026-02-06"
---# Data Visualization Specification: Property Tax Exemptions by Disability Rating Across States

## Document Information
- **Specification ID**: DVS-002
- **Visualization Title**: Property Tax Exemptions by Disability Rating Across States
- **Version**: 1.0
- **Date**: November 11, 2025
- **Author**: Military Transition Toolkit Team
- **Status**: Ready for Development

---

## 1. Executive Overview

### Purpose
This visualization demonstrates how property tax exemptions scale with VA disability ratings (10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%) across different states. It helps veterans understand how their disability rating impacts their property tax benefits and identifies states with the most generous tiered exemption systems.

### Target Audience
- Veterans with any VA disability rating (10%-100%)
- Veterans appealing their disability ratings
- Financial planners specializing in veteran clients
- State legislators considering veteran benefit reforms
- Veteran service organizations advocating for policy changes

### Key Insights to Communicate
1. Only 11 states offer exemptions for ratings below 100%
2. Most states require 100% P&T rating for any property tax benefit
3. Some states offer proportional benefits (exemption scales with rating)
4. Threshold requirements vary widely (10%, 50%, 70%, etc.)
5. Rating increase from 90% to 100% can save $3,000-$8,000 annually in some states

---

## 2. Data Sources and Research

### Primary Data Sources
1. **VA.gov** - Veterans tax exemptions across states and territories (November 2024)
2. **Veterans United** - State-by-state exemption requirements (2024-2025)
3. **VA Claims Insider** - Disability rating exemption analysis (2025 update)
4. **State Tax Assessor Offices** - Specific exemption amounts by rating level
5. **AARP** - Comprehensive state property tax breaks for disabled veterans

### Data Collection Period
October 2024 - November 2025

### Update Frequency
Quarterly updates recommended due to frequent legislative changes affecting disability rating thresholds.

---

## 3. Sample Data

### States with Proportional/Tiered Exemptions

#### Illinois - Full Exemption at 70%+
| Disability Rating | Annual Exemption | Est. Annual Savings |
|------------------|------------------|---------------------|
| 10%-29% | Not eligible | $0 |
| 30%-49% | $2,500 property value reduction | $500-$800 |
| 50%-69% | $5,000 property value reduction | $1,000-$1,600 |
| 70%-100% | Full exemption | $4,200-$9,800 |

#### Minnesota - Two-Tier System
| Disability Rating | Homestead Market Value Exclusion | Est. Annual Savings |
|------------------|----------------------------------|---------------------|
| 10%-69% | Not eligible | $0 |
| 70%-99% | Up to $150,000 exclusion | $1,600-$3,200 |
| 100% P&T | Up to $300,000 exclusion | $3,200-$6,500 |

#### Florida - Entry at 10%
| Disability Rating | Exemption Amount | Est. Annual Savings |
|------------------|------------------|---------------------|
| 10%-99% | $5,000 assessed value reduction | $50-$120 |
| 100% P&T (income <$154,750) | $445,000 assessed value reduction | $2,800-$6,500 |
| 100% P&T (any income) | Full exemption | $2,800-$6,500 |

#### Alaska - Entry at 50%
| Disability Rating | Exemption Amount | Est. Annual Savings |
|------------------|------------------|---------------------|
| 10%-49% | Not eligible | $0 |
| 50%-99% | $150,000 assessed value exemption | $1,200-$2,400 |
| 100% | $150,000 assessed value exemption | $1,200-$2,400 |

#### Massachusetts - Rebate System (50%+)
| Disability Rating | Annual Tax Rebate | Requirements |
|------------------|------------------|--------------|
| 0%-49% | Not eligible | - |
| 50%-99% | Up to 22.5% of property tax | Income <$80,000, home value <$350,000 |
| 100% | Up to 37.5% of property tax | Income <$80,000, home value <$350,000 |

#### Idaho - Income-Based Tiered System
| Disability Rating | Max Reduction (2024) | Income Requirement (2023) |
|------------------|---------------------|---------------------------|
| 10%-99% | $250-$1,500 sliding scale | Income ≤$37,000 |
| 100% P&T | Up to $1,500 | No income limit |

### States Requiring 100% Only

#### Full Exemption States (100% Required)
| State | Exemption Type | Annual Value | Special Requirements |
|-------|---------------|--------------|---------------------|
| Alabama | Full exemption | $2,600-$4,800 | P&T, up to 160 acres |
| Iowa | Full exemption | $2,600-$5,200 | 100% P&T only |
| Louisiana | Full exemption | $1,800-$4,200 | Service-connected |
| Maryland | Full exemption | $3,200-$7,500 | Total & permanent |
| Michigan | Full exemption | $3,800-$7,200 | Three criteria options |
| Nebraska | Full exemption | $3,100-$6,200 | 100% P&T |
| New Hampshire | Full exemption | $5,800-$12,000 | 100% P&T |
| New Jersey | Full exemption | $9,500-$15,200 | Permanently & totally disabled |
| New Mexico | Full exemption | $2,200-$4,800 | Service-connected P&T |
| Oklahoma | Full exemption | $2,400-$5,100 | Service-connected P&T |
| Pennsylvania | Full exemption | $4,100-$8,300 | Income >$95,279 needs proof |
| Texas | Full exemption | $3,500-$8,000 | Primary homestead |
| Virginia | Full exemption | $3,600-$7,800 | P&T disability |
| Wyoming | Full exemption | $2,800-$5,500 | VA certified |

#### Partial Exemption States (100% Required)
| State | Exemption Amount | Annual Value | Notes |
|-------|-----------------|--------------|-------|
| California | $169,769 assessed value | $2,000-$4,500 | Or unemployable; higher with income limit |
| Colorado | 50% of first $200,000 | $900-$2,200 | 50% reduction |
| Georgia | $98,492 (2024) | $1,800-$3,200 | Adjusted annually |

### States with No Rating-Based Exemptions
**37 states and D.C.** offer no property tax benefits for veterans with ratings below 100%, or no property tax benefits at all for any rating level.

---

## 4. Visual Design Specifications

### Chart Type
**Interactive Multi-Series Area Chart with State Comparison Module**

### Primary Visualization: Stacked Area Chart
Shows exemption value progression across disability ratings for multiple states simultaneously.

### Layout Dimensions
- **Desktop**: 1400px width × 700px height
- **Tablet**: 768px width × 550px height
- **Mobile**: 375px width × 450px height

### Color Palette

#### State-Specific Colors (10 distinct colors for comparison)
1. **Illinois**: #0033A0 (State Blue)
2. **Minnesota**: #0C2340 (Navy)
3. **Florida**: #FF4500 (Orange Red)
4. **Alaska**: #003366 (Midnight Blue)
5. **Massachusetts**: #00247D (Royal Blue)
6. **Idaho**: #3B5998 (Medium Blue)
7. **Texas**: #BF0A30 (Texas Red)
8. **California**: #FDB515 (California Gold)
9. **Georgia**: #BA0C2F (Georgia Red)
10. **Colorado**: #002868 (Colorado Blue)

#### Supporting Colors
- **No Exemption Zone**: #F5F5F5 (Light Gray) with diagonal stripe pattern
- **Grid Lines**: #E0E0E0 (Light Gray), 1px dashed
- **Axis Lines**: #616161 (Medium Gray), 2px solid
- **Background**: #FFFFFF (White)
- **Selected State Highlight**: #FFD700 (Gold), 3px solid line
- **Hover State**: #FFA726 (Amber), glow effect
- **Threshold Markers**: #D32F2F (Red), dashed vertical lines

#### Status Badges
- **Full Exemption**: #00563B (Forest Green)
- **Partial Exemption**: #FFA726 (Amber)
- **No Exemption**: #757575 (Gray)

### Typography

#### Font Family
- **Primary**: Inter, system-ui, sans-serif
- **Data/Numbers**: 'Roboto Mono', monospace
- **Accent**: 'Open Sans', sans-serif

#### Font Sizes
- **Main Title**: 36px / 2.25rem (Bold, 700)
- **Chart Title**: 24px / 1.5rem (Semi-bold, 600)
- **Axis Labels**: 14px / 0.875rem (Medium, 500)
- **Legend Items**: 14px / 0.875rem (Regular, 400)
- **Data Labels**: 16px / 1rem (Semi-bold, 600)
- **Tooltips**: 13px / 0.8125rem (Regular, 400)
- **State Name in Comparison**: 18px / 1.125rem (Bold, 700)
- **Savings Amount**: 28px / 1.75rem (Bold, 700)

### Chart Design Elements

#### X-Axis (Disability Rating)
- **Range**: 0% to 100% in 10% increments
- **Labels**: "0%", "10%", "20%", ... "100%"
- **Tick Marks**: Every 10%
- **Special Markers**: Vertical dashed lines at common thresholds (50%, 70%, 100%)

#### Y-Axis (Annual Savings in USD)
- **Range**: $0 to $15,000
- **Labels**: "$0", "$3,000", "$6,000", "$9,000", "$12,000", "$15,000"
- **Tick Marks**: Every $3,000
- **Grid Lines**: Horizontal dashed lines at each tick

#### Area Fill
- **Opacity**: 0.3 for unselected states
- **Opacity**: 0.7 for selected/hovered state
- **Gradient**: Subtle vertical gradient (darker at bottom)

#### Line Stroke
- **Width**: 3px for selected state
- **Width**: 2px for other visible states
- **Width**: 1px for faded comparison states

---

## 5. Interactive Features

### Primary Interactions

#### 1. State Selection Panel
**Location**: Left sidebar (desktop) or top section (mobile)
```
┌────────────────────────────────┐
│ Compare States (Select up to 5)│
├────────────────────────────────┤
│ [×] Illinois                   │
│ [ ] Minnesota                  │
│ [×] Florida                    │
│ [ ] Alaska                     │
│ [×] Massachusetts              │
│ [ ] Idaho                      │
│ [ ] Show All States            │
│                                │
│ [Clear All] [Add State +]     │
└────────────────────────────────┘
```

#### 2. Your Rating Input
**Interactive Widget**
```
┌────────────────────────────────┐
│ Your VA Disability Rating:     │
│                                │
│  [====|========] 70%           │
│                                │
│ States with benefits at 70%:   │
│ • Illinois (Full exemption)    │
│ • Minnesota ($150K exclusion)  │
│                                │
│ Estimated savings in:          │
│ Illinois: $4,200 - $9,800/yr   │
│ Minnesota: $1,600 - $3,200/yr  │
└────────────────────────────────┘
```
- Range slider: 0% to 100% in 10% increments
- Real-time chart updates as slider moves
- Highlights states with benefits at selected rating
- Shows estimated savings at that rating level

#### 3. Rating Threshold Markers
Clickable vertical lines at key thresholds:
- **10% Line**: Shows states with benefits starting at 10%
- **50% Line**: Shows states with benefits starting at 50%
- **70% Line**: Shows states with benefits starting at 70%
- **100% Line**: Shows all states with 100% benefits

Click to see state list and benefit details at that threshold.

#### 4. Hover Interactions
**On Area Hover**:
```
┌──────────────────────────────┐
│ Illinois @ 70% Rating        │
├──────────────────────────────┤
│ Exemption: Full              │
│ Annual Savings: $4,200-$9,800│
│ Requirements:                │
│ • 70% or higher rating       │
│ • Primary residence          │
│ • No income restrictions     │
│                              │
│ [View State Details →]      │
└──────────────────────────────┘
```

#### 5. Data Table Toggle
Switch between chart view and detailed table view showing exact exemption amounts at each rating level.

### Secondary Interactions

#### Rating Appeal Calculator
```
┌────────────────────────────────┐
│ Calculate Appeal Value         │
├────────────────────────────────┤
│ Current Rating: [70% ▼]       │
│ Potential Rating: [100% ▼]    │
│ Your State: [Illinois ▼]      │
│                                │
│ Additional Annual Savings:     │
│     $0 (already full exemption)│
│                                │
│ OR Select: [Minnesota ▼]      │
│ Additional Savings: $3,300/yr  │
│                                │
│ [Calculate] [Reset]            │
└────────────────────────────────┘
```

---

## 6. Accessibility Guidelines

### WCAG 2.1 Level AA Compliance

#### Color Accessibility
- All state lines distinguishable by pattern as well as color
- Pattern options: Solid, Dashed, Dotted, Dash-dot, Long dash
- Minimum 4.5:1 contrast for all text
- Color-blind safe palette tested with Coblis simulator

#### Keyboard Navigation
- **Tab**: Navigate between controls
- **Arrow keys**: Adjust rating slider (left/right), navigate states (up/down)
- **Enter/Space**: Select state, toggle comparison
- **Escape**: Close tooltips/detail panels
- **Ctrl + F**: Focus search/filter input

#### Screen Reader Support
- Chart described as "Line chart showing property tax exemption amounts from 0% to 100% disability rating for [X] states"
- Data table alternative available via toggle
- ARIA live regions announce rating slider changes
- Each state line labeled: "Illinois exemption line, starts at 30% rating with $500 savings, increases to $4,200 at 70%"

#### Focus Management
- 3px solid #1565C0 focus indicator
- Focus visible on all interactive elements
- Logical tab order maintained
- Focus trapped in modal dialogs

### Alternative Text
**Main Chart Alt Text**:
"Interactive line chart comparing property tax exemptions across states by VA disability rating. Illinois offers full exemption starting at 70% rating worth up to $9,800 annually. Minnesota offers $150,000 exclusion at 70% worth up to $3,200 annually, increasing to $300,000 exclusion at 100%. Florida offers $5,000 reduction starting at 10% rating. Most states require 100% rating for any benefit."

---

## 7. Data Table Specifications

### Comparison Table View
**Toggle button**: "Switch to Table View" / "Switch to Chart View"

#### Table Structure
| Rating | State 1 | State 2 | State 3 | State 4 | State 5 |
|--------|---------|---------|---------|---------|---------|
| 10% | $0 | $50 | $0 | $0 | Not eligible |
| 20% | $0 | $50 | $0 | $0 | Not eligible |
| 30% | $500 | $50 | $0 | $0 | Not eligible |
| 40% | $500 | $50 | $0 | $0 | Not eligible |
| 50% | $1,000 | $50 | $1,200 | $0 | $1,200 |
| 60% | $1,000 | $50 | $1,200 | $0 | $1,200 |
| 70% | $4,200 | $50 | $1,200 | $1,600 | $1,200 |
| 80% | $4,200 | $50 | $1,200 | $1,600 | $1,200 |
| 90% | $4,200 | $50 | $1,200 | $1,600 | $1,200 |
| 100% | $9,800 | $6,500 | $2,400 | $6,500 | $2,800 |

#### Table Features
- **Color-coded cells**: Match state colors from chart
- **Bold text**: Current user's rating row (if rating slider set)
- **Highlight**: Threshold rating rows (10%, 50%, 70%, 100%)
- **Export**: CSV, Excel, PDF formats
- **Sort**: Click column headers to sort by state savings at each level
- **Responsive**: Horizontal scroll on mobile with sticky rating column

---

## 8. Technical Requirements

### Frontend Stack
- **Framework**: React 18.3+ with TypeScript
- **Charting Library**: Recharts or D3.js with custom area chart
- **State Management**: Zustand or React Context
- **Animation**: Framer Motion for smooth transitions
- **Styling**: Tailwind CSS + CSS modules for chart styles

### Data Structure
```json
{
  "states": [
    {
      "stateId": "IL",
      "stateName": "Illinois",
      "color": "#0033A0",
      "pattern": "solid",
      "exemptionsByRating": {
        "0": { "exemption": 0, "type": "none" },
        "10": { "exemption": 0, "type": "none" },
        "20": { "exemption": 0, "type": "none" },
        "30": { "exemption": 2500, "type": "partial", "savings": [500, 800] },
        "40": { "exemption": 2500, "type": "partial", "savings": [500, 800] },
        "50": { "exemption": 5000, "type": "partial", "savings": [1000, 1600] },
        "60": { "exemption": 5000, "type": "partial", "savings": [1000, 1600] },
        "70": { "exemption": null, "type": "full", "savings": [4200, 9800] },
        "80": { "exemption": null, "type": "full", "savings": [4200, 9800] },
        "90": { "exemption": null, "type": "full", "savings": [4200, 9800] },
        "100": { "exemption": null, "type": "full", "savings": [4200, 9800] }
      },
      "requirements": {
        "minRating": 30,
        "fullExemptionAt": 70,
        "incomeLimit": null,
        "residencyType": "primary"
      },
      "notes": "Full exemption for 70% or higher rating. Partial exemptions at lower ratings.",
      "source": "Illinois Department of Revenue",
      "lastUpdated": "2024-10-20"
    }
  ],
  "ratingLevels": [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  "metadata": {
    "version": "2025.1",
    "effectiveDate": "2025-01-01"
  }
}
```

### Performance Requirements
- Chart renders <300ms
- State selection updates <100ms
- Slider interaction response <50ms
- Smooth animations at 60fps
- Supports comparison of 5 states simultaneously
- Lazy load state detail data

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome Android 90+

### Responsive Breakpoints
- Mobile: 320px - 767px (stacked layout)
- Tablet: 768px - 1023px (side-by-side)
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

---

## 9. Content Requirements

### Main Headline
"How Your VA Disability Rating Affects Property Tax Exemptions by State"

### Subheadline
"Only 11 states offer property tax benefits for ratings below 100%. See how your rating compares and estimate your potential savings."

### Educational Content Sections

#### "Understanding Rating Thresholds"
Brief explanation:
- Most states require 100% P&T for any exemption
- 11 states offer tiered benefits at lower ratings
- Some states use proportional systems (higher rating = more savings)
- Common threshold ratings: 10%, 50%, 70%, 100%

#### "Should You Appeal Your Rating?"
- Calculate potential property tax savings from rating increase
- Consider annual value over time (example: $3,000/year × 20 years = $60,000)
- Factor in other benefits affected by rating level
- Link to VA disability appeal resources

### Disclaimer
"Property tax exemptions vary by state, county, and municipality. Disability rating requirements may include additional criteria such as 'Permanent and Total' (P&T) designation, service-connected disability, or specific medical conditions. Income restrictions and primary residence requirements may apply. Savings estimates based on state median home values and property tax rates. Consult your local tax assessor for specific eligibility. Data current as of January 2025."

### Call-to-Action Buttons
- Primary: "Find Your State's Requirements"
- Secondary: "Calculate Appeal Value"
- Tertiary: "Download Rating Guide (PDF)"

---

## 10. Production Notes

### Design Assets Required
- 10 distinct line patterns for state differentiation (accessibility)
- Threshold marker icons (shield icons at 10%, 50%, 70%, 100%)
- State flag icons for comparison panel (optional enhancement)
- Printable comparison report template
- Social share graphics with key findings

### Development Phases

#### Phase 1: Data Structure & Core Chart (Week 1-2)
- Implement data model for all states and rating levels
- Build basic area/line chart with Recharts or D3
- X/Y axes with proper scaling
- Basic color coding

#### Phase 2: Interactivity (Week 2-3)
- State selection/deselection
- Hover tooltips
- Rating slider with real-time updates
- Threshold markers

#### Phase 3: Comparison Features (Week 3-4)
- Multi-state comparison (up to 5)
- Data table view toggle
- Appeal value calculator
- Export functionality

#### Phase 4: Accessibility & Polish (Week 4-5)
- Pattern overlays for color-blind accessibility
- Keyboard navigation
- Screen reader optimization
- Mobile responsive refinements

#### Phase 5: Testing & Launch (Week 5-6)
- Cross-browser testing
- User testing with veterans at various rating levels
- Performance optimization
- Analytics implementation

### Testing Requirements
- Test with veterans at each rating threshold (10%, 50%, 70%, 100%)
- Verify calculations against official state sources
- Accessibility testing with screen readers and keyboard only
- Color blind testing with simulation tools
- Mobile device testing across iOS/Android

### Data Maintenance
- **Quarterly reviews**: Check for legislative changes affecting rating thresholds
- **Annual updates**: Refresh all exemption amounts and savings estimates
- **Event-driven updates**: Monitor state legislative sessions for veteran benefit changes

### Analytics Events to Track
- Rating slider usage and most common ratings checked
- States most frequently compared
- Appeal calculator usage
- Threshold marker clicks
- Time spent on visualization
- Conversion to state detail pages
- Export/download actions

---

## 11. Time & Resource Estimates

### Development Time
- **Data Research & Structuring**: 32 hours
- **UI/UX Design**: 48 hours
- **Frontend Development**: 140 hours
- **Testing & QA**: 40 hours
- **Documentation**: 20 hours
- **Total**: 280 hours (approximately 7 weeks with 1 developer)

### Ongoing Maintenance
- **Quarterly Legislative Review**: 8 hours/quarter
- **Annual Data Updates**: 24 hours/year
- **Bug fixes**: 4 hours/month
- **Content updates**: 4 hours/quarter

### Required Resources
- 1 Frontend Developer (React, D3.js/Recharts experience)
- 1 UI/UX Designer (data visualization expertise)
- 1 Data Researcher (veteran benefits knowledge)
- 1 QA Tester
- Access to veterans at various rating levels for testing

---

## 12. Success Metrics

### Key Performance Indicators
- **User Engagement**: Average time on page >4 minutes
- **Interaction Rate**: >70% of visitors interact with rating slider or state selection
- **Calculator Usage**: >40% use appeal value calculator
- **Comparison Feature**: >25% compare 2+ states
- **Table View Toggle**: >35% switch to table view
- **Educational Content**: >50% expand "Understanding Rating Thresholds" section
- **Accessibility**: 100% WCAG 2.1 AA compliance
- **User Satisfaction**: >4.7/5 rating from veteran users

### Business Impact
- Increased understanding of rating-based benefits
- Higher engagement with VA disability appeal resources
- Reduced confusion about rating requirements
- Improved SEO for "VA disability rating property tax" searches
- Valuable insights into which states veterans research most

---

## 13. Related Visualizations
- DVS-001: State Property Tax Savings Comparison
- DVS-003: Cost of Living Rankings for Veterans
- DVS-005: Best States for Veterans Scorecard

## 14. Approval & Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | | | |
| Lead Designer | | | |
| Development Lead | | | |
| Accessibility Lead | | | |
| Veteran Affairs SME | | | |

---

*Document Version History*
- v1.0 (2025-11-11): Initial specification created
