---
date: "2026-02-07"
---# Data Visualization Specification #030: Benefits Value & Total Compensation

## Overview

**Visualization Type:** Stacked Bar Chart with Interactive Benefits Calculator and Military-to-Civilian Comparison Tool

**Primary Purpose:** Help transitioning service members understand that "salary" is only one component of total compensation by visualizing the complete value of employment benefits (health insurance, retirement contributions, paid time off, education assistance, etc.) and comparing military total compensation packages to civilian job offers.

**Target Audience:** Transitioning service members evaluating civilian job offers, particularly those comparing multiple offers or negotiating compensation packages, and veterans who need to understand the full value proposition beyond base salary.

**Key Question Answered:** "What is this job really worth when I add up salary plus all benefits, and how does it compare to my military compensation or other civilian offers?"

---

## Data Requirements

### Primary Data Sources

1. **Bureau of Labor Statistics - Employer Costs for Employee Compensation (June 2025)** - Benefits as percentage of total compensation
2. **Kaiser Family Foundation (KFF) Employer Health Benefits Survey 2024-2025** - Health insurance costs and coverage
3. **Mercer 2025 Health Benefits Report** - Healthcare cost trends and employer contributions
4. **Sequoia 2025 Total Compensation & Benefits Benchmark Report** - Comprehensive benefits data
5. **Society for Human Resource Management (SHRM) 2024** - Benefits trends and valuations
6. **Federal Pay Tables 2024** - Military compensation components (BAH, BAS, tax advantages)
7. **ADP Benefits Calculators** - Benefits valuation methodologies

### Sample Data Structure

```json
{
  "national_compensation_breakdown": {
    "private_sector": {
      "total_compensation_per_hour": "$45.65",
      "wages_and_salaries": {
        "amount_per_hour": "$32.07",
        "percentage_of_total": "70.2%"
      },
      "benefits": {
        "amount_per_hour": "$13.58",
        "percentage_of_total": "29.8%"
      },
      "annual_equivalent_full_time": {
        "total_compensation": "$94,952",
        "base_salary": "$66,706",
        "benefits_value": "$28,246"
      }
    },
    "state_local_government": {
      "total_compensation_per_hour": "$63.95",
      "wages_and_salaries": {
        "amount_per_hour": "$39.32",
        "percentage_of_total": "61.5%"
      },
      "benefits": {
        "amount_per_hour": "$24.63",
        "percentage_of_total": "38.5%"
      },
      "annual_equivalent_full_time": {
        "total_compensation": "$133,016",
        "base_salary": "$81,786",
        "benefits_value": "$51,230"
      }
    }
  },

  "benefits_components_breakdown": {
    "health_insurance": {
      "employer_contribution_2024": {
        "single_coverage_monthly": "$632",
        "single_coverage_annual": "$7,583",
        "family_coverage_monthly": "$1,606",
        "family_coverage_annual": "$19,276"
      },
      "2025_projected": {
        "single_coverage_annual": "$7,850",
        "family_coverage_annual": "$20,143"
      },
      "employee_contribution_2024": {
        "single_coverage_annual": "$1,368",
        "family_coverage_annual": "$6,296",
        "percentage_of_premium": "16% single, 21% family"
      },
      "total_premium_cost_2024": {
        "single_coverage": "$8,951",
        "family_coverage": "$25,572"
      },
      "2025_increase": "6-7% year-over-year",
      "out_of_pocket_typical": "$2,000 - $7,000 annually"
    },
    "retirement_contributions": {
      "401k_match_typical": "3-6% of salary",
      "401k_match_range": "0-8%",
      "average_employer_contribution": "4.5% of salary",
      "annual_limit_2025": "$23,500 employee contribution",
      "example_calculation": {
        "salary": "$80,000",
        "match_1_percent": "$4,500 over 5 years",
        "match_6_percent": "$27,000 over 5 years",
        "difference": "+$22,500"
      },
      "employer_contribution_value_annual": {
        "50k_salary_3_percent_match": "$1,500",
        "80k_salary_6_percent_match": "$4,800",
        "120k_salary_6_percent_match": "$7,200"
      }
    },
    "paid_time_off": {
      "vacation_days_average": "10-15 days year 1, up to 20-25 days at 10+ years",
      "sick_leave_average": "5-10 days annually",
      "holidays_average": "10-12 days",
      "total_pto_typical": "25-40 days",
      "valuation_method": "(daily_salary × PTO_days)",
      "example_values": {
        "60k_salary_25_days": "$5,769",
        "80k_salary_30_days": "$9,231",
        "100k_salary_35_days": "$13,462"
      }
    },
    "other_benefits": {
      "life_insurance": {
        "typical_coverage": "1-2× annual salary",
        "employer_paid_value": "$300 - $1,000 annually"
      },
      "disability_insurance": {
        "short_term": "$200 - $600 annually",
        "long_term": "$400 - $1,200 annually"
      },
      "dental_insurance": {
        "employer_contribution": "$300 - $800 annually"
      },
      "vision_insurance": {
        "employer_contribution": "$100 - $300 annually"
      },
      "education_assistance": {
        "tuition_reimbursement_cap": "$5,250 tax-free annually (IRS limit)",
        "typical_programs": "$2,000 - $5,250 annually"
      },
      "professional_development": {
        "training_budget": "$1,000 - $3,000 annually"
      },
      "wellness_programs": {
        "gym_membership": "$300 - $600 annually",
        "wellness_incentives": "$100 - $500 annually"
      },
      "commuter_benefits": {
        "transit_parking": "$300 per month tax-free (IRS limit)",
        "annual_max": "$3,600"
      },
      "flexible_spending_accounts": {
        "fsa_healthcare": "$3,200 limit (2024)",
        "dependent_care_fsa": "$5,000 limit"
      }
    }
  },

  "military_compensation_components": {
    "active_duty_example_e5_8_years": {
      "base_pay_monthly": "$3,373",
      "base_pay_annual": "$40,476",
      "basic_allowance_housing_bah": {
        "with_dependents_average": "$1,800/month",
        "annual": "$21,600",
        "note": "Tax-free, varies by location"
      },
      "basic_allowance_subsistence_bas": {
        "monthly": "$460.25",
        "annual": "$5,523",
        "note": "Tax-free"
      },
      "tax_advantage": {
        "non_taxable_amount": "$27,123 (BAH + BAS)",
        "estimated_tax_savings": "$4,000 - $6,000 annually",
        "effective_value_boost": "10-15%"
      },
      "healthcare_tricare": {
        "monthly_premium_active": "$0",
        "out_of_pocket_annual": "$0 - $500",
        "civilian_equivalent_value": "$15,000 - $20,000 for family",
        "note": "Comprehensive coverage with minimal costs"
      },
      "retirement_pension": {
        "blended_retirement_system": {
          "tsp_match": "Up to 5% of base pay",
          "annual_match_value": "$2,024",
          "pension_at_20_years": "40% of base pay (vs 50% legacy system)"
        },
        "note": "Pension vests at 20 years"
      },
      "pto_equivalent": {
        "leave_days": "30 days annually",
        "value": "$4,948 (based on daily base pay)",
        "note": "Plus federal holidays"
      },
      "education_benefits_gi_bill": {
        "post_911_gi_bill_value": "$80,000 - $150,000",
        "tuition_assistance_active": "$4,500 annually",
        "note": "GI Bill transfers after 10 years service"
      },
      "other_benefits": {
        "commissary_exchange_savings": "$1,500 - $3,000 annually",
        "moving_expenses": "Fully covered PCS",
        "life_insurance_sgli": "$400,000 coverage for $29/month"
      },
      "total_compensation_annual": "$78,000 - $95,000",
      "note": "Varies significantly by location (BAH) and family status"
    },
    "reserve_guard_comparison": {
      "drill_pay_monthly": "$400 - $600 typical",
      "tricare_reserve_select": {
        "single_premium": "$51.95/month ($623/year)",
        "family_premium": "$256.87/month ($3,082/year)",
        "vs_civilian": "Savings of $5,000 - $17,000 annually"
      },
      "note": "Significantly lower than active duty but still valuable healthcare"
    }
  },

  "sample_job_offer_scenarios": {
    "scenario_1_tech_startup": {
      "base_salary": "$95,000",
      "health_insurance_single": "$7,500 (employer pays 90%)",
      "401k_match": "$4,750 (5% match)",
      "pto_15_days": "$5,481",
      "stock_options": "$10,000 estimated annual vesting",
      "other_perks": "$2,000 (gym, meals, commuter)",
      "total_compensation": "$124,731",
      "benefits_percentage": "31.3%"
    },
    "scenario_2_fortune_500": {
      "base_salary": "$85,000",
      "health_insurance_family": "$19,000 (employer pays 80%)",
      "401k_match": "$5,100 (6% match)",
      "pension_contribution": "$2,550 (3% defined benefit)",
      "pto_20_days": "$6,538",
      "education_reimbursement": "$5,000",
      "other_benefits": "$3,500 (life, disability, dental, vision)",
      "total_compensation": "$126,688",
      "benefits_percentage": "49.0%"
    },
    "scenario_3_federal_government_gs11": {
      "base_salary": "$75,000",
      "health_insurance_family": "$19,000 (employer pays 72%)",
      "retirement_fers": "$5,625 (7.5% employer contribution)",
      "tsp_match": "$3,750 (5% match)",
      "pto_26_days": "$7,500 (includes federal holidays)",
      "pension_defined_benefit": "1% × years × high-3 average (significant long-term value)",
      "job_security_premium": "Estimated $5,000 (low termination risk)",
      "total_compensation": "$115,875+",
      "benefits_percentage": "54.5%",
      "note": "Pension value increases dramatically over career"
    },
    "scenario_4_defense_contractor": {
      "base_salary": "$105,000",
      "health_insurance_family": "$18,500 (employer pays 85%)",
      "401k_match": "$6,300 (6% match)",
      "pto_25_days": "$10,096",
      "clearance_premium": "Included in base (adds $15K-$25K market value)",
      "bonuses_performance": "$8,000 average",
      "other_benefits": "$4,000",
      "total_compensation": "$151,896",
      "benefits_percentage": "44.6%"
    }
  },

  "benefits_calculator_inputs": {
    "user_selections": [
      "base_salary",
      "coverage_type (single/family)",
      "employer_health_contribution_percentage",
      "401k_match_percentage",
      "pension_yes_no",
      "pto_days",
      "education_benefits_amount",
      "other_perks (checkboxes with typical values)"
    ],
    "output": "total_compensation_value with visual breakdown"
  }
}
```

---

## Visual Design Specifications

### Layout & Dimensions

- **Canvas Size:** 1600px width × 1000px height (desktop)
- **Main Chart Area:** 1200px width × 600px height
- **Calculator Panel (Left):** 350px width × full height (collapsible)
- **Comparison Panel (Right):** 400px width (slides in when comparing)
- **Legend Area:** Bottom, 1600px width × 60px
- **Aspect Ratio:** 8:5 (responsive, stacks on mobile)

### Color Palette

**Benefits Category Colors:**
- Base Salary: `#2196F3` (Blue) - Foundation color
- Health Insurance: `#E91E63` (Pink/Red) - Critical benefit
- Retirement/401k: `#4CAF50` (Green) - Long-term wealth
- Paid Time Off: `#FF9800` (Orange) - Work-life balance
- Education Benefits: `#9C27B0` (Purple) - Career development
- Other Benefits: `#00BCD4` (Cyan) - Miscellaneous perks
- Tax Advantages: `#CDDC39` (Lime) - Military-specific

**Sector-Specific Colors:**
- Military Compensation: `#1B5E20` (Dark Green) with camo pattern overlay
- Private Sector: `#1976D2` (Blue)
- Government (Federal/State): `#D32F2F` (Red)
- Non-Profit: `#7B1FA2` (Purple)

**Supporting Colors:**
- Background: `#FAFAFA` (Off-white)
- Card Backgrounds: `#FFFFFF` (White)
- Borders: `#E0E0E0` (Light Gray)
- Text Primary: `#212121` (Near Black)
- Text Secondary: `#757575` (Gray)
- Accent/Interactive: `#FF5722` (Deep Orange)
- Success/Positive: `#4CAF50` (Green)
- Warning/Note: `#FFC107` (Amber)
- Hover Highlight: `#FFEB3B` (Yellow, 40% opacity)

### Typography

**Font Family:**
- Primary: "Roboto", system-ui, sans-serif
- Headers: "Roboto Slab", serif
- Data/Numbers: "Roboto Mono", monospace

**Font Specifications:**
- Main Title: 34px, Bold (700), `#212121`
- Subtitle: 17px, Regular (400), `#757575`
- Section Headers: 22px, Semi-Bold (600), `#424242`
- Bar Labels (Benefits): 15px, Medium (500), `#FFFFFF` (on colored background)
- Compensation Values (Large): 32px, Bold (700), `#2196F3`
- Compensation Values (Medium): 24px, Bold (700), respective category color
- Input Labels: 14px, Medium (500), `#616161`
- Input Values: 16px, Regular (400), `#212121`
- Tooltips: 14px, Regular (400), `#FFFFFF` on `#424242`
- Percentage Labels: 18px, Bold (700), `#FFFFFF`
- Comparison Text: 16px, Regular (400), `#424242`
- Footnotes: 12px, Italic (400), `#9E9E9E`

---

## Visualization Structure

### Main Components

**1. Left Calculator Panel (0-350px width, collapsible)**

**Header:**
- "Benefits Calculator" (20px, bold)
- Collapse/Expand icon (top-right)

**Section A: Base Information**
- Input: "Annual Base Salary"
  - Prefix: "$"
  - Format: Currency with thousands separator
  - Default: $75,000
  - Range: $30,000 - $300,000

**Section B: Health Insurance**
- Radio buttons: "Coverage Type"
  - ⚪ Single
  - ⚪ Family (selected default)
- Dropdown: "Employer Contribution"
  - Options: 0%, 25%, 50%, 75%, 80%, 85%, 90%, 100%
  - Default: 80%
- Display (auto-calculated): "Employer Value: $15,200/year"
- Display: "Your Cost: $3,800/year"

**Section C: Retirement Benefits**
- Checkbox: "☑ 401(k) or 403(b)"
  - Sub-input: Slider "Employer Match: 0% - 10%"
  - Default: 5%
  - Display: "Annual Employer Contribution: $3,750"
- Checkbox: "☐ Pension (Defined Benefit)"
  - Sub-input: "Employer Contribution %"
  - Display: "Estimated Annual Value: $X,XXX"

**Section D: Paid Time Off**
- Slider: "Vacation Days: 0 - 30"
  - Default: 15
- Slider: "Sick/Personal Days: 0 - 15"
  - Default: 5
- Display: "Federal Holidays: 10" (fixed)
- Display: "Total PTO Value: $X,XXX"

**Section E: Other Benefits (Checkboxes)**
- ☐ Education Reimbursement ($3,000 typical)
- ☐ Life Insurance ($500)
- ☐ Disability Insurance ($800)
- ☐ Dental/Vision ($600)
- ☐ Gym/Wellness ($400)
- ☐ Commuter Benefits ($2,000)
- ☐ Stock Options/RSUs (custom input)
- ☐ Performance Bonuses (custom input)

**Section F: Action Buttons**
- "Calculate Total Compensation" (full width, blue button)
- "Compare with Military" (full width, green button)
- "Compare Multiple Offers" (full width, orange button)
- "Reset to Defaults" (text link, center)

**2. Main Visualization Area (350-1550px width, 150-750px height)**

**Stacked Horizontal Bar Chart:**

The primary visualization is a **stacked horizontal bar** showing total compensation breakdown.

**Bar Structure:**
- Total width: 1000px (represents 100% of total compensation)
- Height: 120px
- Rounded corners: 8px radius
- Each segment represents a benefits category, width proportional to dollar value

**Segment Order (Left to Right):**
1. Base Salary (Blue) - Always leftmost, typically 60-75% of total
2. Health Insurance (Pink) - Next largest, typically 10-20%
3. Retirement (Green) - 5-10%
4. Paid Time Off (Orange) - 5-8%
5. Education Benefits (Purple) - 2-5% (if applicable)
6. Other Benefits (Cyan) - 3-8%

**Segment Labels:**
- Inside each segment (if width > 80px):
  - Benefit name (15px, white)
  - Dollar value (18px, bold, white)
  - Percentage of total (14px, white)
- Outside small segments:
  - Leader line pointing to segment
  - Label positioned above bar

**Total Compensation Display:**
- Large number above bar (right-aligned)
- "$XXX,XXX Total Compensation"
- 32px, bold, blue

**Percentage Breakdown Display:**
- Below bar, centered
- "70% Salary | 30% Benefits" (or actual calculated split)
- Visual dividing line between salary and benefits portions

**Interactive Elements:**
- Hover over segment:
  - Segment brightens (lighten by 20%)
  - Tooltip appears showing:
    - Benefit category name
    - Detailed breakdown (if applicable)
    - Dollar value
    - Percentage of total
    - "Click for details"
- Click on segment:
  - Expands to show sub-components
  - Example: Click "Other Benefits" → Shows breakout of dental, vision, gym, etc.

**Comparison Mode (When Active):**

When user clicks "Compare with Military" or "Compare Multiple Offers":
- Chart area expands to show multiple bars vertically stacked
- Each bar represents one compensation package
- Bars aligned left, labels on left showing:
  - "Your Offer: [Company Name]"
  - "Military E-5 with Dependents"
  - "Offer 2: [Company Name]"
- Visual alignment makes comparison easy
- Highest total compensation highlighted with gold star
- Difference callouts:
  - Green arrows: Higher value
  - Red arrows: Lower value
  - Dollar difference displayed

**3. Detailed Breakout Panel (Appears on Click)**

When user clicks a benefits segment, a panel slides in from the right:

**Panel Structure:**
- Width: 400px
- Background: White with shadow
- Close button (X) in top-right

**Content (Example for Health Insurance):**
- Header: "Health Insurance Benefits" (22px, bold)
- Icon: Medical cross

**Details:**
- Total Annual Premium: $25,572
- Employer Pays: $20,458 (80%)
- You Pay: $5,114 (20%)

**Coverage Details:**
- Type: Family coverage
- Deductible: $1,500
- Out-of-Pocket Max: $6,000
- Co-pay: $30 primary / $50 specialist

**Comparison to Average:**
- Bar chart comparing to national average employer contribution
- Text: "Your employer pays 80%, above the national average of 75%"

**Military Comparison (If Applicable):**
- "Active Duty TRICARE: $0 premium, minimal out-of-pocket"
- "Your Savings: $5,114 annually vs. civilian"
- "Civilian Equivalent Value: $20,000+ for family"

**Link:** "Learn more about maximizing health benefits"

**4. Military Comparison View**

When user clicks "Compare with Military":

**Left Bar:** User's Civilian Offer (as calculated)

**Right Bar:** Military Compensation (Pre-populated or customizable)

**User Selects Military Details:**
- Rank: Dropdown (E-1 to E-9, O-1 to O-10, W-1 to W-5)
- Years of Service: Slider (0-30)
- Dependents: Radio (Single, Married, Married with Children)
- Location: Dropdown (for BAH calculation) - Top 50 duty stations

**Military Bar Shows:**
- Base Pay (Blue)
- BAH - Tax Free (Green with pattern)
- BAS - Tax Free (Green with pattern)
- Healthcare (TRICARE) - Valued at civilian equivalent (Pink)
- Retirement (TSP Match) (Green)
- Leave (30 days) (Orange)
- Tax Advantage (Lime) - Calculated savings
- Other (Commissary, GI Bill amortized) (Cyan)

**Comparison Insights (Auto-Generated):**
- "Your civilian offer: $124,000 total"
- "Military total value: $87,000"
- "Difference: +$37,000 in favor of civilian (+42%)"
- OR if military is higher:
- "Military total value: $95,000 equivalent"
- "Civilian offer: $87,000"
- "Military provides +$8,000 more value (+9%)"
- "Key advantages: Tax-free BAH ($21,600), $0 healthcare"

**Notes Section:**
- "Military advantages not captured in this calculation:"
  - Job security (very low risk of termination)
  - Geographic flexibility (PCS moves paid)
  - Post-service GI Bill ($100,000+ value)
  - VA home loan benefit (no down payment)
  - 20-year pension (40-50% of base pay for life)
  - Commissary/Exchange savings (~$2,000/year)

**5. Multiple Offers Comparison**

When user clicks "Compare Multiple Offers":
- Opens modal overlay (1200px × 800px)
- Three-column layout
- Each column has mini calculator
- User inputs details for up to 3 job offers
- Real-time bar chart comparison updates
- Sortable by:
  - Total Compensation (default)
  - Base Salary
  - Benefits Value
  - Benefits Percentage
- Winner highlighted in each category

**Export Feature:**
- "Download Comparison" button
- Generates PDF report with:
  - Summary table
  - Bar chart visualization
  - Side-by-side benefit details
  - Notes section for user annotations

---

## Detailed Mockup Description

**Initial Load State:**

User sees clean interface with calculator panel on left showing default values ($75K salary, family health coverage, 5% 401k match, 15 vacation days).

Main chart area shows placeholder state: "Enter your compensation details and click 'Calculate Total Compensation' to see your benefits breakdown."

**User Interaction Flow:**

**1. User enters salary: $95,000**
   - Input updates
   - Related calculations update in real-time below

**2. User adjusts health insurance:**
   - Selects "Family"
   - Sets employer contribution to 85%
   - Display shows: "Employer Value: $17,236/year" | "Your Cost: $2,886/year"

**3. User sets 401k match to 6%**
   - Display: "Annual Employer Contribution: $5,700"

**4. User sets PTO:**
   - Vacation: 20 days
   - Sick: 5 days
   - Display: "Total PTO Value: $9,135"

**5. User checks additional benefits:**
   - ☑ Education Reimbursement ($5,000)
   - ☑ Life Insurance ($500)
   - ☑ Dental/Vision ($800)
   - ☑ Performance Bonuses (enters $8,000)

**6. User clicks "Calculate Total Compensation":**

**Animation Sequence (2 seconds):**
- Bar grows from left to right
- Segments appear sequentially:
  1. Blue (Base Salary) extends to 70% width → "$95,000"
  2. Pink (Health Insurance) adds next → "+$17,236"
  3. Green (Retirement) adds → "+$5,700"
  4. Orange (PTO) adds → "+$9,135"
  5. Purple (Education) adds → "+$5,000"
  6. Cyan (Other) adds → "+$9,300"
- Total counter counts up: "$95,000... $112,236... $141,371"
- Final display: "$141,371 Total Compensation"
- Below: "67% Salary | 33% Benefits"

**Visual Result:**
- Colorful stacked bar with clear segments
- Each segment labeled with benefit name and value
- Segments proportional to value (Salary dominates, health insurance is second-largest visible segment)

**7. User hovers over Health Insurance (Pink) segment:**
- Segment lightens
- Tooltip appears:
  - "Health Insurance"
  - "Family Coverage"
  - "$17,236 employer contribution"
  - "12% of total compensation"
  - "Click for details"

**8. User clicks Health Insurance segment:**
- Right panel slides in (350ms animation)
- Shows detailed breakout (as described above)
- Rest of chart dims slightly (focus effect)

**9. User closes detail panel and clicks "Compare with Military":**

**Transition:**
- Chart area expands vertically
- Calculator panel collapses (can re-expand)
- Two bars appear:

**Top Bar:** "Your Civilian Offer: $141,371"
- Same colorful stacked segments

**Bottom Bar:** "Military E-5, 8 years, Family: $92,500"
- Different segment proportions:
  - Base Pay: $40,476 (smaller blue segment)
  - BAH (Tax-Free): $21,600 (green with diagonal stripe pattern)
  - BAS (Tax-Free): $5,523 (green with pattern)
  - Healthcare: $20,000 equivalent (pink - much larger than civilian out-of-pocket)
  - TSP Match: $2,024 (green)
  - Leave (30 days): $4,948 (orange)

**Visual Comparison:**
- Civilian bar is 53% longer than military bar
- Annotation: "Civilian offer provides $48,871 more (+52%)"
- Green arrow pointing to civilian bar

**But also notes:**
- "Military advantages not shown: GI Bill ($100K+), 20-year pension, job security"
- "Military healthcare: $0 premium vs. your $2,886"

**10. User clicks "Download Comparison":**
- Generates PDF
- Shows both bars
- Includes table with line-by-line comparison
- User can add notes

---

## Accessibility Specifications

### WCAG 2.1 AA Compliance

**Color Contrast:**
- All text on colored backgrounds: Minimum 4.5:1 contrast
- White text on benefit segment colors: Tested and compliant
- Alternative high-contrast mode: Black background, brighter segment colors

**Colorblind Accessibility:**
- Patterns/textures available as overlay option for each segment
- Base Salary: Solid
- Health: Vertical stripes
- Retirement: Horizontal stripes
- PTO: Dots
- Education: Crosshatch
- Other: Diagonal stripes

**Keyboard Navigation:**
- Tab order: Calculator inputs (top to bottom) → Calculate button → Chart segments (left to right) → Detail panel elements
- Arrow keys: Navigate between bar segments
- Enter/Space: Open detail panel for focused segment
- Escape: Close detail panel or modal
- Focus indicators: 3px solid `#1976D2` outline with 2px white offset

**Screen Reader Support:**
- Chart described: "Stacked bar chart showing total compensation of [amount] broken into [N] categories"
- Each segment: "Button: [Category Name], value [amount], [percentage] of total. Press Enter for details."
- Alternative table view: "View as Data Table" button converts to accessible table
- Live region announces: "Total compensation calculated: $141,371. Base salary 67%, benefits 33%."
- Calculator input changes announced: "Salary updated to $95,000. Recalculate to see new total."

**Alternative Views:**
- "Table View": All data in sortable table format
  - Columns: Benefit Category, Annual Value, Monthly Value, Percentage
  - Sortable by any column
  - Export to CSV
- "Text Summary": Paragraph format describing compensation package
- "Print View": Simplified black-and-white bar chart with data table

**Touch Accessibility:**
- All interactive elements: 44×44px minimum
- Calculator inputs: Touch-optimized (larger tap targets)
- Segments: Tappable across full height of bar
- Pinch to zoom on chart (mobile)
- Swipe to navigate between comparison bars

---

## Technical Implementation Notes

### Technology Stack Recommendation

- **Charting Library:** Recharts (React) for stacked bar charts, or D3.js for custom rendering
- **Framework:** React 18+ with TypeScript for type-safe calculations
- **State Management:** Zustand or Redux for calculator state and comparison data
- **Form Management:** React Hook Form for calculator inputs with validation
- **Animation:** Framer Motion for panel transitions and bar growth animations
- **PDF Generation:** jsPDF or react-pdf for comparison reports
- **Styling:** Tailwind CSS with custom theme for benefits colors
- **Testing:** Jest, React Testing Library, Cypress for E2E calculator testing

### Performance Requirements

- **Initial Render:** <1 second
- **Calculation Response:** <100ms after user clicks "Calculate"
- **Animation:** 60fps for bar growth (2-second duration)
- **Panel Slide:** 350ms smooth transition
- **Comparison Mode:** <500ms to render multiple bars
- **PDF Generation:** <2 seconds for standard 2-page report
- **Mobile:** Optimized rendering for touch devices, <100ms interaction latency

### Data Update Strategy

- **Annual Major Update:** January (BLS releases prior year data)
- **Semi-Annual:** July (health insurance mid-year adjustments)
- **Quarterly:** Review typical benefit values (401k match trends, PTO standards)
- **Military Pay:** Update within 1 week of DOD announcements (usually January and July)
- **Healthcare Premiums:** Update annually after KFF survey release (usually October)
- **User Feedback:** "Report Outdated Info" link → flagged for review

---

## Production Timeline & Resource Estimates

### Phase 1: Data Collection & Calculations (Weeks 1-2)
- **Hours:** 40 hours
- Gather benefits valuation data from BLS, KFF, Mercer, SHRM
- Build calculation models for total compensation
- Validate military compensation formulas (BAH, BAS, tax advantages)
- Create benefits valuation methodology documentation
- Peer review with HR professionals and military pay experts

### Phase 2: Design & Prototyping (Weeks 2-3)
- **Hours:** 35 hours
- High-fidelity Figma mockups (calculator, chart, comparison views)
- Interactive prototype for usability testing
- Color accessibility testing (colorblind simulations)
- User testing with 10 transitioning veterans
- Iterate based on feedback

### Phase 3: Calculator Development (Weeks 4-5)
- **Hours:** 60 hours
- Form inputs with validation
- Real-time calculation logic
- Benefits valuation algorithms
- State management for calculator data
- Responsive layout for calculator panel
- Input persistence (localStorage)

### Phase 4: Chart Visualization (Week 6)
- **Hours:** 50 hours
- Stacked bar chart with Recharts/D3
- Segment rendering with labels
- Animation: bar growth and segment appearance
- Hover and click interactions
- Tooltip implementation
- Detail panel slide-in

### Phase 5: Comparison Features (Week 7)
- **Hours:** 45 hours
- Military comparison calculator
- Multiple offers comparison modal
- Side-by-side bar rendering
- Difference calculations and highlights
- Export functionality
- PDF generation

### Phase 6: Accessibility & Alternative Views (Week 8)
- **Hours:** 35 hours
- Keyboard navigation implementation
- ARIA labels and semantic structure
- Screen reader testing
- Table view alternative
- Pattern overlays for colorblind users
- High-contrast mode
- Automated accessibility testing

### Phase 7: Testing & Deployment (Week 9)
- **Hours:** 30 hours
- Comprehensive testing: unit, integration, E2E
- Cross-browser testing
- Mobile device testing
- Performance optimization
- Analytics integration (track calculation usage, popular comparisons)
- User guide and help documentation
- Production deployment

**Total Estimated Hours:** 295 hours (9 weeks with one full-time developer, or 7 weeks with 1.5 FTE)

**Maintenance:** 8 hours/quarter for data updates (benefits costs, military pay tables)

---

## Success Metrics

### User Engagement
- **Target:** 60% of visitors use the calculator (enter at least 3 inputs)
- **Target:** 40% click "Calculate Total Compensation"
- **Target:** 25% use comparison feature (military or multiple offers)
- **Target:** 15% export comparison PDF
- **Target:** Average session duration >5 minutes
- **Measurement:** Event tracking, Google Analytics, heatmaps

### Information Comprehension
- **Survey:** "Do you now understand the value of benefits beyond base salary?"
  - **Target:** 95% respond "Yes" or "Strongly Yes"
- **Survey:** "Did this tool help you evaluate job offers more effectively?"
  - **Target:** 85% respond positively
- **Survey:** "Can you estimate the total value of a compensation package?"
  - **Target:** 80% demonstrate understanding in follow-up question

### Behavior Change
- **A/B Test:** Users who use calculator negotiate higher compensation or make better-informed job decisions
  - **Target:** 30% report asking for better benefits after using tool
- **Career Counselor Feedback:** Reduction in "should I take this job?" questions
  - **Target:** 25% reduction in counselors feeling veterans don't understand total comp

### Accessibility Performance
- **Target:** 100% WCAG 2.1 AA compliance
- **Target:** 95% task completion rate for keyboard-only users (n=5)
- **Target:** 90% task completion rate for screen reader users (n=5)
- **Measurement:** Automated axe scans, moderated usability testing

### Business Impact
- **Target:** 30% increase in compensation-related content engagement
- **Target:** 50+ user testimonials in first 6 months
- **Target:** Featured in 5+ veteran job search / transition publications
- **Target:** 10,000+ calculations performed in first year
- **Measurement:** Analytics, media tracking, counselor surveys

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-11-11 | Military Transition Toolkit Team | Initial specification with 2024-2025 benefits data |

---

## Appendix: Benefits Valuation Methodology

### Data Sources & Credibility

1. **Bureau of Labor Statistics - Employer Costs for Employee Compensation (June 2025)**
   - URL: bls.gov/news.release/ecec.nr0.htm
   - Credibility: **Highest** - Official government source
   - Data: Total compensation $45.65/hr, benefits 29.8% of total (private sector)

2. **Kaiser Family Foundation (KFF) Employer Health Benefits Survey 2024**
   - URL: kff.org/health-costs/2024-employer-health-benefits-survey/
   - Credibility: **Highest** - Gold standard for health benefits data
   - Data: Family coverage $25,572 (2024), employer pays $19,276 (75%)

3. **Mercer 2025 Health Benefits Report**
   - Credibility: **High** - Leading benefits consulting firm
   - Data: 2025 cost increase projections (5.8%)

4. **Sequoia 2025 Total Compensation & Benefits Benchmark**
   - Credibility: **Medium-High** - HR benefits platform with large dataset
   - Data: Comprehensive benefits trends across industries

5. **Federal Pay Tables (OPM, DOD)**
   - URL: federalpay.org/military, opm.gov
   - Credibility: **Highest** - Official government pay data
   - Data: Military base pay, BAH, BAS by rank and location

### Valuation Formulas

**Health Insurance:**
```
Employer_Value = Total_Premium × Employer_Contribution_Percentage
User_Cost = Total_Premium - Employer_Value
Civilian_Equivalent (Military) = Average_Family_Premium ($25,572)
```

**Retirement (401k):**
```
Annual_Employer_Contribution = Base_Salary × Match_Percentage
(Typically capped at 6% of salary, with match rates 50-100% of employee contribution up to 3-6%)
```

**Paid Time Off:**
```
Daily_Salary = Annual_Salary / 260 (working days)
PTO_Value = Daily_Salary × (Vacation_Days + Sick_Days + Holidays)
```

**Military Tax Advantage:**
```
Non_Taxable_Income = BAH + BAS
Federal_Tax_Rate = 12-22% (typical E-5 to E-7 range)
State_Tax_Rate = 0-10% (varies by state)
Tax_Savings = Non_Taxable_Income × (Federal_Rate + State_Rate)
Effective_Value_Boost = Tax_Savings / Total_Compensation
```

### Military Healthcare Valuation

TRICARE costs for active duty: $0 premium, minimal out-of-pocket

Civilian equivalent value:
- Family coverage: $25,572 average premium
- Active duty essentially receives this as a benefit
- Additional value: Very low deductibles and out-of-pocket maximums
- Total equivalent value: $20,000 - $25,000 for families

### Known Limitations

- **Individual variation:** Tool uses national averages; actual benefits vary significantly by employer, industry, and location
- **Pension valuation:** Defined benefit pensions (military, federal) have lifetime value that's difficult to capture in annual numbers
- **Stock options:** RSUs and stock options valued at vesting schedule; actual value depends on company performance
- **Quality of benefits:** Tool values benefits by cost, not quality (e.g., PPO vs. HMO networks)
- **Long-term benefits:** GI Bill, VA home loan, and military pension are "back-end loaded" and not fully captured
- **Geographic differences:** Healthcare costs, housing costs (BAH), and living expenses vary dramatically by location
- **Tax implications:** Individual tax situations affect true value; tool uses simplified tax models

**Disclaimer:** This calculator provides estimates based on typical benefits packages and national averages. Your actual compensation value may differ based on your specific situation, employer, location, and benefit choices. Consult with a financial advisor for personalized analysis. This tool is for educational and planning purposes only.

---

**Specification Status:** Ready for Design & Development
**Priority:** Critical - Understanding total compensation is essential for veterans evaluating civilian offers
**Next Steps:** Validate calculation models with HR experts → Design mockups → User testing → Development
