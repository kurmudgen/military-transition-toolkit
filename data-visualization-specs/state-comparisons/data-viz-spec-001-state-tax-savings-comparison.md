# Data Visualization Specification: State Property Tax Savings Comparison for Veterans

## Document Information
- **Specification ID**: DVS-001
- **Visualization Title**: State Property Tax Savings Comparison for Veterans
- **Version**: 1.0
- **Date**: November 11, 2025
- **Author**: Military Transition Toolkit Team
- **Status**: Ready for Development

---

## 1. Executive Overview

### Purpose
This interactive data visualization compares property tax savings available to veterans with 100% disability ratings across all 50 U.S. states and Washington D.C. The visualization empowers transitioning service members and disabled veterans to make informed decisions about where to establish residency based on potential annual tax savings.

### Target Audience
- Veterans with 100% VA disability ratings
- Transitioning service members planning relocation
- Military spouses researching family relocation options
- Financial advisors serving veteran clients
- State veteran affairs offices

### Key Insights to Communicate
1. 20 states offer complete property tax exemptions for 100% disabled veterans
2. Annual savings range from $0 to $15,000+ depending on state and property value
3. Some states combine full exemptions with no state income tax, maximizing veteran benefits
4. Income restrictions apply in 8 states, limiting eligibility for higher earners
5. Exemption amounts vary significantly, from $2,500 to full exemption

---

## 2. Data Sources and Research

### Primary Data Sources
1. **VA.gov** - Official veteran tax exemption data (accessed November 2024)
2. **Tax Foundation** - State property tax rates and median tax bills (2024 data)
3. **Veterans United** - State-by-state exemption amounts (2024-2025 updates)
4. **VA Claims Insider** - 2025 property tax exemption updates
5. **AARP State Property Tax Breaks** - Detailed state requirements and thresholds

### Data Collection Period
October 2024 - November 2025

### Update Frequency
Data should be refreshed annually (January) to capture legislative changes and rate adjustments.

---

## 3. Sample Data

### Full Exemption States (Complete Property Tax Elimination)
Based on 2024-2025 data for veterans with 100% P&T disability ratings:

| State | Exemption Type | Average Annual Savings | Income Restriction | Additional Requirements |
|-------|---------------|----------------------|-------------------|----------------------|
| Texas | Full Exemption | $3,500 - $8,000 | None | Primary residence only |
| Florida | Full Exemption | $2,800 - $6,500 | $154,750 household limit | P&T or unemployable |
| Illinois | Full Exemption (70%+) | $4,200 - $9,800 | None | 70% or higher rating |
| Iowa | Full Exemption | $2,600 - $5,200 | None | 100% P&T rating |
| Louisiana | Full Exemption | $1,800 - $4,200 | None | 100% service-connected |
| Maryland | Full Exemption | $3,200 - $7,500 | None | Total & permanent disability |
| Michigan | Full Exemption | $3,800 - $7,200 | None | Three qualifying criteria |
| Nebraska | Full Exemption | $3,100 - $6,200 | None | 100% P&T rating |
| New Hampshire | Full Exemption | $5,800 - $12,000 | None | 100% P&T rating |
| New Jersey | Full Exemption | $9,500 - $15,200 | None | Permanently & totally disabled |
| New Mexico | Full Exemption | $2,200 - $4,800 | None | Service-connected P&T |
| Oklahoma | Full Exemption | $2,400 - $5,100 | None | Service-connected P&T |
| Pennsylvania | Full Exemption | $4,100 - $8,300 | $95,279+ requires proof of need | 100% P&T rating |
| Texas | Full Exemption | $3,500 - $8,000 | None | Primary homestead |
| Virginia | Full Exemption | $3,600 - $7,800 | None | Permanent & total disability |
| Wyoming | Full Exemption | $2,800 - $5,500 | None | VA certified disability |

### Partial Exemption States (Reduced Tax Burden)
| State | Exemption Amount | Est. Annual Savings | Rating Required | Notes |
|-------|-----------------|--------------------|--------------------|-------|
| California | Up to $169,769 assessed value | $2,000 - $4,500 | 100% or unemployable | Higher limit with income restriction |
| Colorado | 50% of first $200,000 | $900 - $2,200 | 100% P&T | 50% exemption |
| Georgia | $98,492 exemption (2024) | $1,800 - $3,200 | 100% or unemployable | Amount adjusted annually |
| Alaska | $150,000 exemption | $1,200 - $2,400 | 50% or higher | Lower rating accepted |
| Minnesota | $300,000 reduction | $3,200 - $6,500 | 100% P&T | $150,000 for 70%+ |
| Idaho | Up to $1,500 reduction | $1,500 fixed | 100% P&T | Flat amount regardless of value |
| Massachusetts | Partial rebate | $1,200 - $2,800 | 50% or higher | Income & home value limits apply |

### No Special Exemption States
| State | Standard Property Tax Rate | Average Annual Tax Bill | Veteran Status |
|-------|---------------------------|------------------------|----------------|
| California | 0.74% | $4,200 | Partial exemptions only |
| Arizona | 0.51% | $2,100 | Limited exemptions |
| Oregon | 0.87% | $3,800 | No special veteran exemption |
| Rhode Island | 1.63% | $5,200 | Limited exemptions |
| Washington | 0.92% | $4,100 | No special exemption |

---

## 4. Visual Design Specifications

### Chart Type
**Interactive Choropleth Map with Sortable Data Table**

### Layout Dimensions
- **Desktop**: 1200px width × 800px height
- **Tablet**: 768px width × 600px height
- **Mobile**: 375px width × 500px height (stacked view)

### Color Palette

#### Primary Colors
- **Full Exemption States**: #00563B (Forest Green) - Represents maximum savings
- **High Partial Exemption ($3,000+)**: #2E7D32 (Medium Green)
- **Moderate Partial Exemption ($1,000-$2,999)**: #66BB6A (Light Green)
- **Low Partial Exemption ($100-$999)**: #A5D6A7 (Pale Green)
- **No Special Exemption**: #E0E0E0 (Light Gray)
- **State Borders**: #424242 (Dark Gray) - 1px solid
- **Highlight/Hover**: #FFA726 (Amber) - 2px outline

#### Supporting Colors
- **Text (Primary)**: #212121 (Near Black)
- **Text (Secondary)**: #616161 (Medium Gray)
- **Background**: #FFFFFF (White)
- **Card Background**: #F5F5F5 (Off White)
- **Data Table Headers**: #1565C0 (Navy Blue)
- **Accent/CTA**: #D32F2F (Red) - For warnings about restrictions

### Typography

#### Font Family
- **Primary**: Inter, system-ui, -apple-system, sans-serif
- **Monospace (numbers)**: 'Roboto Mono', monospace

#### Font Sizes
- **Main Title**: 32px / 2rem (Bold, 700 weight)
- **Subtitle**: 18px / 1.125rem (Regular, 400 weight)
- **State Labels**: 14px / 0.875rem (Medium, 500 weight)
- **Data Values**: 16px / 1rem (Bold, 700 weight for amounts)
- **Table Headers**: 14px / 0.875rem (Semi-bold, 600 weight)
- **Table Data**: 14px / 0.875rem (Regular, 400 weight)
- **Tooltips**: 13px / 0.8125rem (Regular, 400 weight)
- **Fine Print/Notes**: 12px / 0.75rem (Regular, 400 weight)

### Map Design Elements

#### State Interaction
- **Default State**: Colored by exemption category, 0.8 opacity
- **Hover State**: 1.0 opacity, 2px amber outline, subtle drop shadow
- **Selected State**: 1.0 opacity, 3px navy outline, elevation effect
- **Cursor**: Pointer on hover

#### Tooltip Design
```
┌─────────────────────────────────┐
│ Texas                      ✕   │
├─────────────────────────────────┤
│ Exemption: Full (100%)         │
│ Avg. Annual Savings: $3,500-$8,000│
│ Income Limit: None             │
│ Requirements: Primary residence│
│ Veteran Population: 1.4M       │
│                                │
│ [View Full Details →]         │
└─────────────────────────────────┘
```
- **Width**: 320px
- **Border**: 1px solid #E0E0E0
- **Shadow**: 0 4px 12px rgba(0,0,0,0.15)
- **Border Radius**: 8px
- **Padding**: 16px
- **Animation**: Fade in 200ms ease

---

## 5. Interactive Features

### Primary Interactions

#### 1. State Selection
- Click any state to view detailed breakdown
- Right panel slides in with comprehensive data
- URL updates with state parameter (?state=TX)
- Shareable links preserve selection

#### 2. Filter Controls
**Location**: Top of visualization
```
[All States ▼] [Full Exemption] [Partial] [None] [Has Income Limit]
```
- Multi-select filter chips
- Real-time map updates
- Filter count badge shows active filters
- "Clear All" option appears when filters active

#### 3. Sort Options
**Sortable Data Table Columns**:
- State Name (A-Z, Z-A)
- Estimated Annual Savings (High to Low, Low to High)
- Exemption Type (Categorical)
- Veteran Population (High to Low)
- Property Tax Rate (High to Low, Low to High)

#### 4. Search Function
- Type-ahead search for state names
- Auto-highlights matching state on map
- Search history (last 3 searches)

#### 5. Comparison Mode
- "Add to Compare" button on each state detail panel
- Compare up to 4 states side-by-side
- Comparison table includes all key metrics
- Export comparison as PDF or image

### Secondary Interactions

#### Calculate Your Savings
**Interactive Calculator Widget**
```
┌──────────────────────────────────┐
│ Calculate Your Potential Savings │
├──────────────────────────────────┤
│ Select State: [Texas        ▼]  │
│ Home Value: [$________]          │
│ Current State: [California  ▼]  │
│                                  │
│ Potential Annual Savings:        │
│      $6,240                      │
│                                  │
│ [Calculate] [Reset]              │
└──────────────────────────────────┘
```

---

## 6. Accessibility Guidelines

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- All text meets minimum 4.5:1 contrast ratio
- Large text (18pt+) meets 3:1 ratio
- Green color scheme tested with ColorOracle for color blindness
- Alternative pattern fills available for colorblind users

#### Keyboard Navigation
- Tab order: Filters → Map → Table → Detail panels
- Arrow keys navigate between states on map
- Enter/Space selects state
- Escape closes detail panels/tooltips
- Skip links: "Skip to data table" | "Skip to map"

#### Screen Reader Support
- ARIA labels on all interactive elements
- State role="button" with descriptive labels
- Table uses proper semantic HTML with scope attributes
- Live regions announce filter changes
- Alt text: "Map of United States showing property tax exemptions for veterans by state, color-coded by exemption level"

#### Focus Indicators
- 2px solid #1565C0 outline on focus
- Visible on all interactive elements
- Never removed or hidden

#### Text Alternatives
- SVG map includes title and desc elements
- Complex data available in accessible data table
- Screen reader only text provides context

### Internationalization
- All currency formatted with locale settings
- Number separators respect user locale
- Date formats use ISO 8601 with locale display

---

## 7. Data Table Specifications

### Table Layout
**Responsive design collapses to cards on mobile**

#### Desktop View (≥768px)
| Column | Width | Alignment | Format |
|--------|-------|-----------|--------|
| State | 15% | Left | Text |
| Exemption Type | 20% | Left | Badge component |
| Est. Annual Savings | 20% | Right | Currency (range) |
| Rating Required | 15% | Center | Percentage badge |
| Income Limit | 15% | Right | Currency or "None" |
| Veteran Pop. | 15% | Right | Formatted number |

#### Mobile View (<768px)
Cards with collapsed data:
```
┌─────────────────────────────┐
│ Texas              [⋮]      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Full Exemption              │
│ $3,500 - $8,000/year        │
│ No income limit             │
│ 1.4M veterans               │
└─────────────────────────────┘
```

### Table Features
- Sticky header on scroll
- Row striping for readability (#FAFAFA alternating)
- 10, 25, 50, All rows per page options
- Export options: CSV, PDF, Excel
- Print-optimized view

---

## 8. Technical Requirements

### Frontend Stack
- **Framework**: React 18.3+ with TypeScript
- **Mapping Library**: D3.js v7 or Leaflet.js with TopoJSON
- **Charts**: Recharts or Victory for supporting visualizations
- **State Management**: React Context API or Zustand
- **Styling**: Tailwind CSS with custom configuration

### Data Format
```json
{
  "states": [
    {
      "id": "TX",
      "name": "Texas",
      "exemptionType": "full",
      "savingsRange": {
        "min": 3500,
        "max": 8000
      },
      "requirements": {
        "ratingRequired": 100,
        "incomeLimit": null,
        "residencyType": "primary",
        "additionalNotes": "Must be primary homestead"
      },
      "veteranPopulation": 1417311,
      "propertyTaxRate": 1.60,
      "medianHomeValue": 238000,
      "dataSource": "Texas State Comptroller",
      "lastUpdated": "2024-10-15"
    }
  ],
  "metadata": {
    "version": "2025.1",
    "effectiveDate": "2025-01-01",
    "updateFrequency": "annual"
  }
}
```

### Performance Requirements
- Initial load: <2 seconds on 3G connection
- Map interaction response: <100ms
- Supports 1000+ concurrent users
- Lazy load state detail data
- Image optimization for map tiles

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome Android 90+

### Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

---

## 9. Content Requirements

### Main Headline
"Compare Property Tax Savings for Veterans Across All 50 States"

### Subheadline
"Discover how much you could save annually with veteran property tax exemptions. 20 states offer complete tax elimination for 100% disabled veterans."

### Disclaimer Text
"Property tax exemptions vary by state, county, and municipality. Savings estimates are based on state averages and median home values. Actual savings depend on your specific property value, location, and eligibility. Income restrictions may apply in some states. Contact your local tax assessor's office for exact calculations. Data current as of January 2025."

### Call-to-Action Buttons
- Primary CTA: "Find Your State's Benefits"
- Secondary CTA: "Calculate Your Savings"
- Tertiary CTA: "Download Complete Guide (PDF)"

---

## 10. Production Notes

### Design Assets Required
- U.S. state boundary GeoJSON/TopoJSON file
- State abbreviation labels positioned at geographic centers
- High-contrast pattern overlays for accessibility mode
- Printable PDF template for comparison reports
- Social share preview images (1200×630px)

### Development Phases

#### Phase 1: Core Visualization (Week 1-2)
- Implement base map with D3.js/Leaflet
- Color coding by exemption type
- Basic tooltip functionality
- Responsive layout foundations

#### Phase 2: Interactive Features (Week 2-3)
- State selection and detail panels
- Filter and sort functionality
- Search implementation
- Data table with sorting

#### Phase 3: Advanced Features (Week 3-4)
- Savings calculator widget
- Comparison mode (up to 4 states)
- Export functionality (PDF, CSV)
- URL state management

#### Phase 4: Polish & Accessibility (Week 4-5)
- Accessibility audit and fixes
- Performance optimization
- Cross-browser testing
- Mobile UX refinements

#### Phase 5: QA & Launch (Week 5-6)
- User testing with veterans
- Content review by veteran affairs experts
- Analytics implementation
- Production deployment

### Testing Requirements
- Unit tests for calculation logic
- Integration tests for map interactions
- Accessibility testing with screen readers
- User testing with 5-10 veterans
- Cross-browser compatibility testing
- Mobile device testing (iOS and Android)

### Analytics Events to Track
- Map state hover count
- State detail view count
- Filter usage patterns
- Calculator interactions
- Comparison feature usage
- Export/download actions
- Time spent on visualization
- Mobile vs desktop usage

---

## 11. Time & Resource Estimates

### Development Time
- **UI/UX Design**: 40 hours
- **Frontend Development**: 120 hours
- **Data Integration**: 24 hours
- **Testing & QA**: 32 hours
- **Documentation**: 16 hours
- **Total**: 232 hours (approximately 6 weeks with 1 developer)

### Ongoing Maintenance
- **Annual Data Updates**: 16 hours/year
- **Quarterly Content Review**: 8 hours/quarter
- **Bug fixes & minor updates**: 4 hours/month

### Required Resources
- 1 Frontend Developer (React/D3.js experience)
- 1 UI/UX Designer
- 1 QA Tester
- 1 Content Strategist (veteran benefits expertise)
- Access to veteran focus group for testing

---

## 12. Success Metrics

### Key Performance Indicators
- **User Engagement**: Average time on page >3 minutes
- **Interaction Rate**: >60% of visitors interact with map or filters
- **Calculator Usage**: >30% of visitors use savings calculator
- **Comparison Feature**: >15% compare 2+ states
- **Mobile Usage**: Responsive design supports >40% mobile traffic
- **Accessibility**: 100% WCAG 2.1 AA compliance
- **User Satisfaction**: >4.5/5 rating from veteran users

### Business Impact
- Increased engagement with state benefit content
- Higher conversion to relocation planning tools
- Reduced support inquiries about tax exemptions
- Improved SEO rankings for veteran benefit searches

---

## 13. Related Visualizations
- DVS-002: Property Tax by Disability Rating
- DVS-003: Cost of Living Rankings for Veterans
- DVS-005: Best States for Veterans Scorecard

## 14. Approval & Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | | | |
| Lead Designer | | | |
| Development Lead | | | |
| Accessibility Lead | | | |

---

*Document Version History*
- v1.0 (2025-11-11): Initial specification created
