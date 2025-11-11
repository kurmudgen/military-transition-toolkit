# Data Visualization Specification: Cost of Living Rankings Adjusted for Veteran Benefits

## Document Information
- **Specification ID**: DVS-003
- **Visualization Title**: Best States for Veterans: Cost of Living Adjusted for Benefits
- **Version**: 1.0
- **Date**: November 11, 2025
- **Author**: Military Transition Toolkit Team
- **Status**: Ready for Development

---

## 1. Executive Overview

### Purpose
This visualization ranks all 50 states by effective cost of living for veterans with 100% disability ratings, adjusting standard cost of living indexes to account for property tax exemptions, income tax treatment, and VA disability compensation. It reveals which states offer the best purchasing power when veteran-specific benefits are factored into the equation.

### Target Audience
- Veterans planning relocation after service
- 100% disabled veterans seeking to maximize purchasing power
- Military spouses researching family relocation
- Financial planners advising veteran clients
- State economic development agencies targeting veteran recruitment

### Key Insights to Communicate
1. States with low baseline cost of living may not be best for veterans when benefits are excluded
2. High-cost states with generous veteran benefits can have lower effective cost for veterans
3. $38,313 annual VA disability payment (100% single veteran) has different purchasing power by state
4. Property tax exemptions worth $3,000-$12,000 annually dramatically improve rankings
5. States with no income tax + full property tax exemption offer 15-25% cost advantage

---

## 2. Data Sources and Research

### Primary Data Sources
1. **DataPandas / Missouri Economic Research** - 2025 Cost of Living Index by State
2. **Tax Foundation** - State and local tax burden data (2024)
3. **VA.gov** - 2025 Disability compensation rates
4. **Veterans United / VA Claims Insider** - Property tax exemption values
5. **Bureau of Labor Statistics** - Regional price parities (2024)
6. **Council for Community and Economic Research (C2ER)** - Cost of Living Index methodology

### Data Collection Period
October 2024 - November 2025

### Update Frequency
Annual updates (January) to reflect cost of living changes, tax law updates, and VA compensation adjustments.

---

## 3. Sample Data

### 2025 VA Disability Compensation (100% Rating)
- **Single veteran**: $3,831.30/month = $45,976/year
- **Veteran + spouse**: $4,901.41/month = $58,817/year
- **Veteran + spouse + 1 child**: $5,137.84/month = $61,654/year

### Cost of Living Index Baseline (National Average = 100)

#### Highest Cost States (Unadjusted)
| State | COL Index | Rank | Annual Cost (100% Vet) |
|-------|-----------|------|------------------------|
| Hawaii | 184.0 | 50 | $84,584 |
| Massachusetts | 149.7 | 49 | $68,834 |
| California | 137.6 | 48 | $63,264 |
| New York | 134.5 | 47 | $61,842 |
| Maryland | 124.0 | 46 | $57,024 |

#### Lowest Cost States (Unadjusted)
| State | COL Index | Rank | Annual Cost (100% Vet) |
|-------|-----------|------|------------------------|
| Mississippi | 85.0 | 1 | $39,100 |
| Kansas | 87.3 | 2 | $40,157 |
| Alabama | 88.1 | 3 | $40,526 |
| Oklahoma | 88.5 | 4 | $40,710 |
| Iowa | 89.0 | 5 | $40,940 |

### Veteran Benefit Adjustments

#### Annual Tax Savings (100% Disabled Veteran)
| State | Property Tax Exemption | Income Tax Exemption | Total Annual Benefit |
|-------|----------------------|---------------------|---------------------|
| Texas | $3,500-$8,000 | $0 (no income tax) | $6,500 avg |
| Florida | $2,800-$6,500 | $0 (no income tax) | $5,200 avg |
| New Hampshire | $5,800-$12,000 | $0 (no income tax) | $9,500 avg |
| New Jersey | $9,500-$15,200 | $0 (disability exempt) | $12,800 avg |
| Illinois | $4,200-$9,800 | $0 (disability exempt) | $7,500 avg |
| Pennsylvania | $4,100-$8,300 | $0 (disability exempt) | $6,700 avg |
| Virginia | $3,600-$7,800 | $40,000 exemption (2025) | $7,200 avg |
| South Dakota | Varies by county | $0 (no income tax) | $2,800 avg |
| Tennessee | Limited | $0 (no income tax) | $1,200 avg |
| Wyoming | $2,800-$5,500 | $0 (no income tax) | $4,500 avg |

### Adjusted Cost of Living Rankings for Veterans

#### Top 10 States for Veterans (After Benefit Adjustments)
| Rank | State | Base COL Index | Veteran-Adjusted COL | Annual Benefit Value | Effective Savings |
|------|-------|---------------|---------------------|---------------------|------------------|
| 1 | South Dakota | 92.5 | 84.2 | $2,800 | 8.3 points |
| 2 | Wyoming | 93.8 | 85.5 | $4,500 | 8.3 points |
| 3 | Iowa | 89.0 | 81.8 | $3,800 | 7.2 points |
| 4 | Texas | 91.5 | 84.8 | $6,500 | 6.7 points |
| 5 | Tennessee | 88.7 | 83.2 | $1,200 | 5.5 points |
| 6 | Nebraska | 90.2 | 84.8 | $4,200 | 5.4 points |
| 7 | Oklahoma | 88.5 | 83.3 | $3,900 | 5.2 points |
| 8 | Alabama | 88.1 | 83.1 | $3,200 | 5.0 points |
| 9 | Florida | 99.0 | 94.2 | $5,200 | 4.8 points |
| 10 | Michigan | 89.6 | 85.0 | $5,000 | 4.6 points |

#### Notable Ranking Changes (Biggest Improvements)
| State | Unadjusted Rank | Veteran-Adjusted Rank | Rank Improvement | Reason |
|-------|-----------------|---------------------|-----------------|---------|
| New Hampshire | 42 (high cost) | 18 | +24 positions | $9,500 avg property tax exemption |
| New Jersey | 48 (very high cost) | 29 | +19 positions | $12,800 avg combined exemptions |
| Illinois | 37 | 22 | +15 positions | $7,500 avg exemption |
| Pennsylvania | 33 | 19 | +14 positions | $6,700 avg exemption |
| Virginia | 40 | 27 | +13 positions | $7,200 avg combined benefits |

#### States That Drop in Rankings (No Veteran Benefits)
| State | Unadjusted Rank | Veteran-Adjusted Rank | Rank Change | Reason |
|-------|-----------------|---------------------|------------|---------|
| Arizona | 25 | 28 | -3 positions | Limited veteran benefits |
| Oregon | 38 | 40 | -2 positions | No property tax exemption |
| Washington | 31 | 33 | -2 positions | No property tax exemption |
| Colorado | 23 | 24 | -1 position | Partial benefits only |

### Real-World Purchasing Power Examples

#### Annual Budget Comparison: 100% Disabled Veteran ($45,976 VA compensation)
| Location | Base Living Cost | After Tax Savings | Disposable Income | Purchasing Power Rank |
|----------|-----------------|------------------|-------------------|---------------------|
| South Dakota | $42,526 | $39,726 | $6,250 | 1 |
| Texas | $42,069 | $35,569 | $10,407 | 2 |
| Iowa | $40,940 | $37,140 | $8,836 | 3 |
| Florida | $45,524 | $40,324 | $5,652 | 4 |
| New Hampshire | $53,220 | $43,720 | $2,256 | 18 |
| California | $63,264 | $59,764 | -$13,788 | 47 |
| New York | $61,842 | $61,842 | -$15,866 | 48 |
| Hawaii | $84,584 | $84,584 | -$38,608 | 50 |

---

## 4. Visual Design Specifications

### Chart Type
**Interactive Dual-View Visualization**
1. **Primary View**: Horizontal bar chart showing veteran-adjusted rankings
2. **Secondary View**: Before/After scatter plot showing ranking changes

### Layout Dimensions
- **Desktop**: 1400px width × 900px height
- **Tablet**: 768px width × 700px height
- **Mobile**: 375px width × 600px height

### Color Palette

#### Ranking Categories
- **Top Tier (Ranks 1-10)**: #00563B (Forest Green) to #2E7D32 (Medium Green) gradient
- **Upper Middle (Ranks 11-20)**: #66BB6A (Light Green) to #81C784 (Pale Green)
- **Middle (Ranks 21-35)**: #FFA726 (Amber) to #FFB74D (Light Amber)
- **Lower Middle (Ranks 36-45)**: #FF7043 (Orange) to #FF8A65 (Light Orange)
- **Bottom Tier (Ranks 46-50)**: #E53935 (Red) to #EF5350 (Light Red)

#### Ranking Change Indicators
- **Major Improvement (+10 or more)**: #00C853 (Bright Green) with ↑ arrow
- **Moderate Improvement (+5 to +9)**: #64DD17 (Light Green) with ↑ arrow
- **Minor Improvement (+1 to +4)**: #AEEA00 (Yellow-Green) with ↗ arrow
- **No Change**: #9E9E9E (Gray) with — symbol
- **Decline**: #FF6D00 (Orange) with ↓ arrow

#### Supporting Colors
- **Background**: #FFFFFF (White)
- **Card Background**: #F8F9FA (Off-White)
- **Grid Lines**: #E0E0E0 (Light Gray), 1px
- **Border**: #BDBDBD (Medium Gray)
- **Text Primary**: #212121 (Near Black)
- **Text Secondary**: #616161 (Medium Gray)
- **Accent/Highlight**: #1565C0 (Navy Blue)
- **Data Value Background**: #E3F2FD (Light Blue)

### Typography

#### Font Family
- **Primary**: Inter, system-ui, sans-serif
- **Data/Numbers**: 'Roboto Mono', monospace
- **Headlines**: 'Poppins', sans-serif

#### Font Sizes
- **Main Title**: 36px / 2.25rem (Bold, 700)
- **Section Headers**: 24px / 1.5rem (Semi-bold, 600)
- **State Names**: 16px / 1rem (Medium, 500)
- **Rank Numbers**: 24px / 1.5rem (Bold, 700)
- **Data Values**: 14px / 0.875rem (Regular, 400)
- **Highlighted Savings**: 18px / 1.125rem (Bold, 700)
- **Labels**: 13px / 0.8125rem (Medium, 500)
- **Tooltips**: 13px / 0.8125rem (Regular, 400)
- **Disclaimer**: 11px / 0.6875rem (Regular, 400)

### Bar Chart Design (Primary View)

#### Bar Structure
```
1. South Dakota          ████████████████████████ 84.2    [↑ +8.3]  $6,250 surplus
2. Wyoming              ████████████████████████ 85.5    [↑ +8.3]  $5,980 surplus
3. Iowa                 ████████████████████████ 81.8    [↑ +7.2]  $8,836 surplus
...
48. New York            ██████████████████████████████████ 134.5  [—]     -$15,866 deficit
49. Massachusetts       ███████████████████████████████████ 149.7 [—]     -$22,858 deficit
50. Hawaii              ████████████████████████████████████████ 184.0 [—] -$38,608 deficit
```

#### Bar Elements
- **Bar Height**: 24px with 8px spacing
- **Bar Color**: Gradient based on ranking tier
- **Bar Border**: 1px solid (darker shade of bar color)
- **Rank Badge**: 36px circle, white text on tier color
- **State Label**: Left-aligned, 140px width
- **COL Value**: Right-aligned after bar
- **Change Indicator**: Icon + value, color-coded
- **Surplus/Deficit**: Far right, bold, color-coded

### Scatter Plot Design (Secondary View)

#### Axes
- **X-Axis**: Unadjusted COL Ranking (1-50)
- **Y-Axis**: Veteran-Adjusted COL Ranking (1-50)
- **Diagonal Line**: Perfect equality line (no change)

#### Plot Elements
- **State Dots**: 10px circles, color-coded by improvement
- **Above Line**: States that improved (veteran benefits helped)
- **Below Line**: States that worsened relatively (no veteran benefits)
- **On Line**: States with minimal change
- **Connector Lines**: Show movement from unadjusted to adjusted position

---

## 5. Interactive Features

### Primary Interactions

#### 1. View Toggle
```
[Bar Chart View] / [Scatter Plot View] / [Split View]
```
- Toggle between visualization types
- Split view shows both side-by-side (desktop only)

#### 2. Filter Panel
```
┌────────────────────────────────┐
│ Filter States                  │
├────────────────────────────────┤
│ [✓] Top 10 Improved           │
│ [ ] Full Property Tax Exemption│
│ [ ] No State Income Tax       │
│ [ ] Surplus (disposable income)│
│ [ ] Deficit (insufficient income)│
│                                │
│ Region:                        │
│ [✓] All Regions               │
│ [ ] Northeast [ ] South       │
│ [ ] Midwest   [ ] West        │
│                                │
│ [Apply Filters] [Clear]       │
└────────────────────────────────┘
```

#### 3. State Detail Panel
Click any state to open side panel:
```
┌─────────────────────────────────┐
│ Texas                      ✕   │
├─────────────────────────────────┤
│ Veteran-Adjusted Rank: #4      │
│ Unadjusted Rank: #11 (↑7)     │
│                                │
│ Cost of Living:                │
│ • Base Index: 91.5             │
│ • Adjusted: 84.8               │
│                                │
│ Annual VA Pay (100%): $45,976  │
│                                │
│ Veteran Benefits:              │
│ • Property Tax: $6,500 saved   │
│ • Income Tax: $0 (no tax)      │
│ • Total Benefit: $6,500/year   │
│                                │
│ Your Annual Budget:            │
│ • Income: $45,976              │
│ • Cost of Living: -$42,069     │
│ • Tax Savings: +$6,500         │
│ • Disposable: $10,407          │
│                                │
│ [View Full State Benefits →]  │
│ [Compare with Another State]   │
└─────────────────────────────────┘
```

#### 4. Comparison Mode
**Select 2-4 states to compare side-by-side**
```
┌──────────────────────────────────────────────────────┐
│           Texas    Florida    California   New York  │
├──────────────────────────────────────────────────────┤
│ Vet Rank     4         9          47          48    │
│ Base Rank   11        15          48          47    │
│ COL Index   91.5      99.0       137.6       134.5  │
│ Tax Savings $6,500    $5,200     $3,000       $0    │
│ Disposable  $10,407   $5,652    -$14,288   -$15,866│
│                                                      │
│ Best for you: Texas (most disposable income)        │
└──────────────────────────────────────────────────────┘
```

#### 5. Personal Calculator
```
┌────────────────────────────────┐
│ Calculate Your Situation       │
├────────────────────────────────┤
│ VA Rating: [100% ▼]           │
│ Dependents:                    │
│ • [✓] Spouse                  │
│ • [ ] Children: [0 ▼]         │
│                                │
│ Your Annual VA Pay: $58,817   │
│                                │
│ Select State: [Texas ▼]       │
│                                │
│ Your Effective COL: 84.8      │
│ Annual Tax Savings: $6,500    │
│ Disposable Income: $17,248    │
│                                │
│ [Recalculate] [Compare States]│
└────────────────────────────────┘
```

### Secondary Interactions

#### Hover Effects
- **Bar Hover**: Highlight bar, show full detail tooltip
- **Scatter Dot Hover**: Enlarge dot, show state name and ranking change
- **Sort Options**: Click column headers to re-sort

#### Search & Filter
- Type-ahead search for state names
- Multi-select filters (combine multiple criteria)
- Filter count badges
- URL parameters preserve filter state

---

## 6. Accessibility Guidelines

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- All text meets 4.5:1 minimum contrast
- Color is never the only indicator (icons + patterns supplement)
- Green/red color blindness addressed with blue/orange alternatives

#### Keyboard Navigation
- Tab through all interactive elements
- Arrow keys navigate state list
- Enter/Space selects states
- Escape closes panels
- Skip links available

#### Screen Reader Support
- Chart described: "Horizontal bar chart ranking 50 states by cost of living adjusted for veteran benefits. South Dakota ranks first with effective COL index of 84.2."
- Each bar announces: "Texas, rank 4, cost of living index 84.8, improved 7 positions with veteran benefits, $10,407 annual disposable income"
- Live regions announce filter changes
- Accessible data table available

#### Focus Indicators
- 3px solid #1565C0 focus outline
- High contrast focus states
- Never removed

### Alternative Formats
- Downloadable CSV with all data
- Printer-friendly version
- Screen reader optimized data table
- Text summary of top findings

---

## 7. Technical Requirements

### Frontend Stack
- **Framework**: React 18.3+ with TypeScript
- **Charts**: D3.js for custom bar chart and scatter plot
- **State Management**: Zustand for filters and comparison
- **Styling**: Tailwind CSS + custom CSS modules
- **Animation**: Framer Motion for transitions

### Data Structure
```json
{
  "states": [
    {
      "stateId": "TX",
      "stateName": "Texas",
      "unadjustedRank": 11,
      "veteranAdjustedRank": 4,
      "baseCOLIndex": 91.5,
      "adjustedCOLIndex": 84.8,
      "rankImprovement": 7,
      "annualBenefits": {
        "propertyTaxSavings": {
          "min": 3500,
          "max": 8000,
          "average": 6500
        },
        "incomeTaxSavings": 0,
        "totalAnnualBenefit": 6500
      },
      "budgetCalculation": {
        "vaCompensationSingle": 45976,
        "annualCostOfLiving": 42069,
        "taxSavings": 6500,
        "disposableIncome": 10407
      },
      "hasFullPropertyExemption": true,
      "hasNoIncomeTax": true,
      "region": "South",
      "veteranPopulation": 1417311
    }
  ],
  "vaCompensationRates2025": {
    "100_single": 45976,
    "100_spouse": 58817,
    "100_spouse_1child": 61654
  },
  "metadata": {
    "version": "2025.1",
    "dataDate": "2025-01-01",
    "sources": ["DataPandas", "Tax Foundation", "VA.gov"]
  }
}
```

### Performance Requirements
- Initial render <2 seconds
- Filter/sort operations <150ms
- Smooth 60fps animations
- Lazy load state details
- Optimized for 1000+ concurrent users

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

## 8. Content Requirements

### Main Headline
"True Cost of Living: Best States for Veterans After Benefits"

### Subheadline
"Standard cost of living rankings don't tell the whole story. See which states offer the best purchasing power when veteran benefits are included."

### Key Findings Section
- "South Dakota offers lowest effective cost of living for veterans"
- "New Hampshire jumps 24 positions when veteran benefits are factored in"
- "Texas veterans keep $10,400+ annually in disposable income"
- "High-cost states with generous benefits can outperform low-cost states without them"

### Educational Content

#### "Why Standard Rankings Miss the Mark"
Explanation of how traditional COL indexes don't account for veteran-specific benefits like property tax exemptions and income tax treatment.

#### "How We Calculate Adjusted Rankings"
Methodology: Base COL index + average veteran benefit value converted to COL points.

### Disclaimer
"Rankings based on 2025 data for veterans with 100% disability rating, single, no dependents. Actual costs vary by city, county, and individual circumstances. Property tax savings based on state median home values. Income tax treatment based on VA disability compensation. Additional state benefits not included. Consult a financial advisor for personalized guidance."

### CTAs
- Primary: "Calculate Your Cost of Living"
- Secondary: "Compare States Side-by-Side"
- Tertiary: "Download Full Rankings Report (PDF)"

---

## 9. Production Notes

### Development Phases

#### Phase 1: Data Collection & Modeling (Week 1-2)
- Aggregate COL data for all states
- Calculate veteran benefit adjustments
- Build data models and APIs
- Validate calculations

#### Phase 2: Core Visualizations (Week 2-3)
- Build bar chart with D3.js
- Implement scatter plot
- Basic interactivity (hover, click)
- Responsive layouts

#### Phase 3: Interactive Features (Week 3-4)
- Filter and search
- State comparison mode
- Personal calculator
- Detail panels

#### Phase 4: Polish & Optimization (Week 4-5)
- Animations and transitions
- Accessibility implementation
- Performance optimization
- Mobile UX refinements

#### Phase 5: Testing & Launch (Week 5-6)
- Cross-browser testing
- User testing with veterans
- Analytics setup
- Production deployment

### Testing Requirements
- Test with veterans in different locations
- Verify calculations with financial planners
- Accessibility audit with screen readers
- Mobile device testing
- Performance testing under load

### Analytics Events
- View toggle usage (bar vs scatter)
- Filter application patterns
- State comparison frequency
- Calculator usage rate
- Most researched states
- Time on page
- Conversion to state detail pages

---

## 10. Time & Resource Estimates

### Development Time
- **Data Research & Modeling**: 40 hours
- **UI/UX Design**: 48 hours
- **Frontend Development**: 160 hours
- **Calculator Logic**: 24 hours
- **Testing & QA**: 40 hours
- **Documentation**: 16 hours
- **Total**: 328 hours (8 weeks with 1 developer)

### Ongoing Maintenance
- **Annual COL Updates**: 24 hours/year
- **Quarterly Benefit Review**: 12 hours/quarter
- **Monthly Content Updates**: 4 hours/month

### Required Resources
- 1 Frontend Developer (React, D3.js)
- 1 UI/UX Designer
- 1 Data Analyst
- 1 QA Tester
- Financial planning consultant (review)
- Veteran focus group (testing)

---

## 11. Success Metrics

### KPIs
- **Engagement**: >5 minutes average time
- **Interaction**: >75% use filters or comparison
- **Calculator**: >45% use personal calculator
- **Comparison**: >30% compare states
- **Downloads**: >20% download full report
- **Accessibility**: 100% WCAG 2.1 AA
- **User Satisfaction**: >4.8/5 from veterans

### Business Impact
- Increased understanding of true veteran benefits
- Higher engagement with relocation planning
- Reduced confusion about cost of living
- Improved SEO for veteran relocation searches
- Authority content for veteran financial planning

---

## 12. Related Visualizations
- DVS-001: State Property Tax Savings Comparison
- DVS-002: Property Tax by Disability Rating
- DVS-005: Best States for Veterans Scorecard

## 13. Approval & Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | | | |
| Lead Designer | | | |
| Development Lead | | | |
| Data Analyst | | | |
| Financial Advisor (Consultant) | | | |

---

*Document Version History*
- v1.0 (2025-11-11): Initial specification created
