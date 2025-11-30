---

date: "2026-02-05"
---# Data Visualization Specification #014: State Veteran Home Loan Programs Comparison

## 1. Overview

### Title
**Beyond the VA Loan: State-Specific Home Loan Programs for Veterans (2024-2025)**

### Purpose
This visualization reveals state-run veteran home loan programs that exist alongside the federal VA home loan benefit. Many veterans are unaware that states like California, Texas, and Oregon offer their own specialized mortgage programs with competitive interest rates, reduced fees, and unique benefits. This tool helps veterans compare state programs to make informed homebuying decisions and potentially stack federal and state benefits.

### Target Audience
- Veterans and active-duty service members planning to purchase a home (ages 25-55)
- Military families researching relocation destinations
- Real estate agents specializing in veteran clients
- Mortgage brokers and lenders serving the military community
- Financial counselors at military transition offices
- State veterans affairs offices benchmarking programs

### Key Questions Answered
- Which states offer their own veteran home loan programs?
- How do state programs compare to the federal VA loan?
- Can I use both state and federal VA benefits together?
- What are the interest rates, down payment requirements, and loan limits by state?
- Which states offer below-market interest rates for veterans?
- What additional benefits do state programs provide beyond basic financing?
- Which state offers the best home loan benefits for my situation?

---

## 2. Data Sources

### Primary Sources

1. **State Veterans Affairs Departments**
   - California Department of Veterans Affairs (CalVet Home Loans): https://www.calvet.ca.gov/
   - Texas Veterans Land Board: https://vlb.texas.gov/
   - Oregon Department of Veterans' Affairs: https://www.oregon.gov/odva/home-loans/
   - Alaska Housing Finance Corporation: https://www.ahfc.us/
   - Wisconsin Department of Veterans Affairs: https://dva.wi.gov/
   - Data Type: Loan program details, interest rates, eligibility, application procedures
   - Update Frequency: Quarterly (rates), Annual (program features)

2. **Veteran.com State Loan Program Directory**
   - URL: https://veteran.com/veteran-home-loan-programs/
   - Data Type: Comprehensive state program overview
   - Last Updated: 2024

3. **Military Times - State Home Loan Programs**
   - URL: https://www.militarytimes.com/home-hq/2018/08/21/not-just-va-7-more-states-with-veteran-friendly-home-loan-programs/
   - Data Type: Comparative analysis of state programs
   - Last Updated: 2024

4. **State Housing Finance Agencies (HFAs)**
   - Individual state HFA websites for down payment assistance programs
   - Examples: Connecticut Housing Finance Authority, Florida Housing Finance Corporation, Georgia Dream Program
   - Data Type: Down payment assistance amounts, income limits, program availability

5. **Federal Housing Administration & VA**
   - Baseline data for federal VA loan features (for comparison)
   - 2024-2025 VA loan limits by county
   - URL: https://www.benefits.va.gov/homeloans/

### Data Collection Date
December 2024 - January 2025

### Data Verification
All interest rates and loan limits verified directly with state agencies. Historical rate trends analyzed over 12-month period. Program eligibility criteria cross-referenced with state statutes where publicly available.

---

## 3. Visualization Type

### Primary Visualization
**Interactive Comparison Dashboard with State Map Navigation**

### Rationale
A dashboard approach works best because:
- Home loan decisions require comparing multiple data points simultaneously (rates, limits, fees, features)
- Users need to see their state's program in context of alternatives
- Side-by-side comparison of 2-4 states is essential for decision-making
- Combining map visualization with detailed comparison panels serves both exploratory and analytical needs

### Component 1: Clickable State Map
- Heat map showing: States with programs (colored), states without (gray)
- Intensity indicates "benefit score" (comprehensive programs darker)
- Click state to add to comparison panel (up to 4 states)

### Component 2: Comparison Panel
- Side-by-side display of up to 4 selected states
- Visual metrics: Interest rate gauge, loan limit bar, feature checklist
- "vs. Federal VA Loan" baseline comparison always visible

### Component 3: Feature Matrix (Expandable Table)
- Rows: All states with programs
- Columns: Interest rate, down payment, loan limit, special features, income limits, credit score requirements
- Sortable, filterable

### Component 4: Savings Calculator
- Input home price, state, veteran status
- Calculate: Monthly payment difference, total interest saved vs. conventional loan, total savings vs. federal VA loan (if applicable)

---

## 4. Design Specifications

### Color Palette

**Program Comprehensiveness (Map Heat Colors):**
- **Full State Loan Program (Direct Lending):** `#0D47A1` (Dark Blue)
  - States: California, Oregon, Texas, Wisconsin
- **Substantial Down Payment Assistance ($7,500+):** `#1976D2` (Medium Blue)
  - States: Florida, Georgia, Illinois, Iowa
- **Moderate Assistance ($3,000-$7,499):** `#42A5F5` (Light Blue)
  - States: Connecticut, Delaware, Louisiana, Maine
- **Interest Rate Reduction Only:** `#90CAF9` (Very Light Blue)
  - States: Maryland, Massachusetts, New York
- **No State-Specific Program:** `#EEEEEE` (Light Gray)

**Interest Rate Visualization:**
- Below 3.5%: `#1B5E20` (Dark Green) - Excellent
- 3.5% - 4.5%: `#4CAF50` (Medium Green) - Good
- 4.5% - 5.5%: `#FDD835` (Yellow) - Average
- Above 5.5%: `#FF9800` (Orange) - Market Rate
- Variable Rate: `#9C27B0` (Purple) - Special indicator

**Loan Limit Visualization:**
- $750,000+: `#1B5E20` (Dark Green)
- $500,000 - $749,999: `#66BB6A` (Medium Green)
- $250,000 - $499,999: `#FDD835` (Yellow)
- Under $250,000: `#FF9800` (Orange)

**UI Foundation:**
- Background: `#FAFAFA` (Off-white)
- Card Background: `#FFFFFF` (White)
- Borders: `#E0E0E0` (Light Gray, 1px)
- Shadows: `rgba(0,0,0,0.08)` for card depth
- Text Primary: `#212121` (Dark Gray)
- Text Secondary: `#757575` (Medium Gray)
- Accent: `#1565C0` (Deep Blue) - Reflects trust, stability (mortgage context)
- Success: `#2E7D32` (Dark Green)
- Warning: `#F57C00` (Orange)
- Error: `#C62828` (Red)

**Status Indicators:**
- Available: Green dot `#4CAF50`
- Limited Availability: Yellow dot `#FDD835`
- Not Available: Gray dot `#9E9E9E`
- Coming Soon: Blue dot `#2196F3`

### Typography

**Primary Font: Open Sans** (Highly legible, professional, excellent for financial information)

- Dashboard Title: Open Sans Bold, 32px, `#212121`
- Section Headers: Open Sans Semibold, 24px, `#212121`
- State Names (comparison cards): Open Sans Bold, 20px, `#212121`
- Metric Labels: Open Sans Semibold, 14px, `#757575`
- Metric Values: Open Sans Bold, 28px, `#212121` (or color-coded)
- Body Text: Open Sans Regular, 16px, `#424242`
- Fine Print (disclaimers): Open Sans Regular, 13px, `#9E9E9E`
- Button Labels: Open Sans Semibold, 16px, `#FFFFFF`
- Data Table Headers: Open Sans Semibold, 14px, `#212121`
- Data Table Content: Open Sans Regular, 14px, `#424242`

**Fallback Stack:**
```css
font-family: 'Open Sans', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Number Formatting:**
- Interest Rates: 3.75% (2 decimal places, always show %)
- Dollar Amounts: $766,550 (comma separators, no decimals unless cents relevant)
- Loan Terms: 30 years, 15 years (spelled out for clarity)

### Layout Dimensions

**Desktop (1920×1080)**
- Map Panel: 600px × 700px (left side, fixed)
- Comparison Panel: 1200px × 700px (right side, scrollable)
- Comparison Cards: 280px × 650px each (4-column grid when all selected)
- Feature Matrix: Full width below, 1800px × variable height
- Calculator Widget: 400px × 500px (sidebar or modal)
- Margins: 32px outer, 20px internal

**Tablet (768×1024)**
- Map Panel: 100% width, 400px height (top)
- Comparison Panel: 100% width, 2-column grid (2 states visible at once)
- Comparison Cards: 340px × 600px each
- Feature Matrix: Full width with horizontal scroll
- Calculator: Full width panel
- Margins: 20px outer, 16px internal

**Mobile (375×667)**
- Map Panel: 100% width, 350px height
- Comparison Panel: 100% width, single column (swipe between states)
- Comparison Cards: 340px × 700px (one at a time, horizontal carousel)
- Feature Matrix: Card-based vertical layout
- Calculator: Full screen modal
- Margins: 16px outer, 12px internal

### Interactive Elements

**Map Interactions:**
- Hover: State highlights with white border (2px), tooltip shows program name
- Click: State added to comparison panel (max 4), blue checkmark appears on state
- Click again: Removes from comparison
- "Compare All Programs" button: Opens feature matrix view

**Comparison Cards:**
- Expandable sections: "Eligibility," "Features," "Pros & Cons"
- "Remove from Comparison" X button (top right)
- "Apply Now" CTA button (links to state agency)
- "Calculate Payment" button (opens calculator with state pre-selected)

**Interest Rate Gauges:**
- Animated semi-circular gauge showing rate on 0-8% scale
- Needle points to current rate
- Color-coded zones (green < 4%, yellow 4-5%, orange 5%+)
- Federal VA loan baseline marked with dashed line

**Feature Checklists:**
- Green checkmarks for included features
- Red X for not available
- Orange "Partial" indicator for conditional features
- Info icon (hover) shows feature details

**Savings Calculator:**
- Real-time updates as user adjusts sliders
- Input fields: Home price, down payment %, state, veteran disability %
- Output: Monthly payment, total interest, lifetime savings vs. conventional
- "Download Amortization Schedule" button

### Card Structure (Comparison Panel)

```
┌─────────────────────────────────────────┐
│  [X]      CALIFORNIA  (CalVet)          │
├─────────────────────────────────────────┤
│                                         │
│    Interest Rate:  3.875%               │
│    ┌─────────────────────┐              │
│    │  [Gauge Visual]     │              │
│    │  ◀───●───────▶      │              │
│    └─────────────────────┘              │
│    Below market average                 │
│                                         │
│    Max Loan Amount: $766,550            │
│    ██████████████████░░  (High limit)   │
│                                         │
│    Down Payment: 0% available           │
│    Loan Terms: 30-year fixed            │
│                                         │
│    ───────────────────────────          │
│                                         │
│    ✓ No PMI required                    │
│    ✓ Below-market rates                 │
│    ✓ No VA funding fee                  │
│    ✓ Interest rate subsidy              │
│    ✗ California residents only          │
│                                         │
│    ▼ Eligibility Requirements           │
│    ▼ Application Process                │
│    ▼ Pros & Cons                        │
│                                         │
│    [Calculate My Payment]               │
│    [Apply Now →]                        │
│                                         │
└─────────────────────────────────────────┘
```

---

## 5. Sample Data Structure

### Data Schema (JSON)

```json
{
  "states": [
    {
      "id": "CA",
      "name": "California",
      "has_program": true,
      "program_name": "CalVet Home Loan Program",
      "program_type": "direct_lender",
      "benefit_score": 95,
      "map_color": "#0D47A1",
      "loan_details": {
        "interest_rate": {
          "current": 3.875,
          "type": "fixed",
          "term_years": 30,
          "as_of_date": "2025-01-15",
          "rate_history_12mo": [4.125, 4.05, 3.975, 3.90, 3.875],
          "comparison_to_market": "below_market",
          "comparison_to_va": "similar_or_better"
        },
        "down_payment": {
          "minimum_percent": 0,
          "zero_down_available": true,
          "maximum_ltv": 100,
          "requirements": "Available for eligible veterans"
        },
        "loan_limits": {
          "maximum": 766550,
          "minimum": 50000,
          "varies_by_county": true,
          "note": "Follows federal VA loan limits"
        },
        "fees": {
          "origination_fee": 0,
          "funding_fee": 0,
          "closing_costs": "Competitive",
          "no_pmi": true,
          "estimate_savings_vs_conventional": 5000
        },
        "unique_features": [
          {
            "feature": "Interest rate subsidy",
            "description": "State subsidizes interest rates to below-market levels"
          },
          {
            "feature": "Direct lending",
            "description": "State is the lender, not just loan guarantee"
          },
          {
            "feature": "Loan assumption",
            "description": "Assumable by qualified buyers at same rate"
          },
          {
            "feature": "No VA funding fee",
            "description": "State program doesn't charge VA funding fee equivalent"
          }
        ]
      },
      "eligibility": {
        "veteran_status": "Honorably discharged veterans and active-duty service members",
        "service_requirements": "90 days active wartime OR 181 days active peacetime",
        "residency": "Must become California resident (but home can be purchased before establishing residency)",
        "credit_score_minimum": 620,
        "income_limits": "None",
        "first_time_buyer_only": false,
        "disability_rating_required": false,
        "additional_criteria": [
          "Certificate of Eligibility (COE) from VA required",
          "Property must be owner-occupied primary residence"
        ]
      },
      "property_requirements": {
        "property_types": ["Single-family home", "Condo", "Townhouse", "Manufactured home (on permanent foundation)"],
        "geographic_restrictions": "California only",
        "occupancy": "Primary residence required",
        "restrictions": ["No investment properties", "No second homes"]
      },
      "application_process": {
        "how_to_apply": "Pre-qualification through CalVet, then formal application after finding property",
        "required_documents": [
          "DD-214 (Certificate of Release from Active Duty)",
          "VA Certificate of Eligibility",
          "Recent pay stubs and W-2s",
          "Tax returns (2 years)",
          "Bank statements (2 months)",
          "Credit report authorization"
        ],
        "processing_time": "30-45 days average",
        "approval_rate": "Approximately 75% of qualified applicants",
        "contact": {
          "agency": "California Department of Veterans Affairs",
          "website": "https://www.calvet.ca.gov/",
          "phone": "1-800-952-5626",
          "email": "CalVetHomeLoans@calvet.ca.gov"
        }
      },
      "pros_cons": {
        "pros": [
          "Below-market interest rates due to state subsidy",
          "Zero down payment option",
          "No PMI or VA funding fee",
          "Loan assumability (valuable in rising rate environment)",
          "State handles entire loan process (simplified)"
        ],
        "cons": [
          "California residents only",
          "Slower processing than some conventional lenders",
          "Limited to primary residences (no investment/vacation homes)",
          "State loan availability can be limited during high-demand periods"
        ]
      },
      "veteran_population": 1640000,
      "loans_funded_annually": 2500,
      "total_loans_outstanding": 45000,
      "program_history": {
        "established": 1921,
        "description": "One of the oldest and most successful state veteran home loan programs in the nation"
      },
      "recent_changes": [
        {
          "date": "2024-01-01",
          "description": "Increased maximum loan limit to match federal VA loan limits"
        }
      ],
      "additional_resources": [
        {
          "title": "CalVet Home Loan Comparison Guide",
          "url": "https://www.calvet.ca.gov/Files/CalVet-Home-Loan-Brochure.pdf",
          "type": "PDF"
        }
      ],
      "related_state_programs": [
        {
          "program": "CalVet Home Improvement Loan",
          "description": "Up to $25,000 for home improvements, repairs, or energy efficiency upgrades"
        }
      ]
    },
    {
      "id": "TX",
      "name": "Texas",
      "has_program": true,
      "program_name": "Texas Veterans Land Board (VLB) Home Loan Program",
      "program_type": "direct_lender",
      "benefit_score": 92,
      "map_color": "#0D47A1",
      "loan_details": {
        "interest_rate": {
          "current": 4.25,
          "type": "fixed",
          "term_years": [15, 20, 25, 30],
          "as_of_date": "2025-01-15",
          "rate_history_12mo": [4.50, 4.45, 4.35, 4.30, 4.25],
          "comparison_to_market": "competitive",
          "comparison_to_va": "similar",
          "special_rates": {
            "disabled_veterans_30_plus": {
              "discount": 0.25,
              "effective_rate": 4.00,
              "description": "Veterans with 30%+ VA disability rating receive 0.25% rate reduction"
            }
          }
        },
        "down_payment": {
          "minimum_percent": 0,
          "zero_down_available": true,
          "maximum_ltv": 100,
          "requirements": "Low or no down payment for eligible veterans"
        },
        "loan_limits": {
          "maximum": 726200,
          "minimum": 45000,
          "varies_by_county": false,
          "note": "Statewide limit"
        },
        "fees": {
          "origination_fee": "1% of loan amount",
          "funding_fee": 0,
          "closing_costs": "Competitive",
          "no_pmi": true,
          "estimate_savings_vs_conventional": 3500
        },
        "unique_features": [
          {
            "feature": "Disability rate reduction",
            "description": "0.25% interest rate discount for veterans with 30%+ disability"
          },
          {
            "feature": "Multiple loan term options",
            "description": "Choose 15, 20, 25, or 30-year terms"
          },
          {
            "feature": "Land loans also available",
            "description": "Texas VLB also offers land purchase loans (separate program)"
          }
        ]
      },
      "eligibility": {
        "veteran_status": "Texas veterans who served on active duty and received honorable discharge",
        "service_requirements": "Service requirements vary by era; generally 90+ days",
        "residency": "Texas resident",
        "credit_score_minimum": 620,
        "income_limits": "None",
        "first_time_buyer_only": false,
        "disability_rating_required": false,
        "additional_criteria": [
          "Must not have been dishonorably discharged",
          "Cannot have had a VLB loan foreclosed in past 2 years"
        ]
      },
      "property_requirements": {
        "property_types": ["Single-family home", "Condo", "Townhouse", "New construction"],
        "geographic_restrictions": "Texas only",
        "occupancy": "Primary residence required",
        "restrictions": []
      },
      "application_process": {
        "how_to_apply": "Apply online or through approved VLB lender",
        "required_documents": [
          "DD-214",
          "Texas driver's license or ID",
          "Proof of income",
          "Credit report authorization",
          "Purchase agreement (once home identified)"
        ],
        "processing_time": "30-45 days",
        "approval_rate": "Approximately 70%",
        "contact": {
          "agency": "Texas Veterans Land Board",
          "website": "https://vlb.texas.gov/",
          "phone": "1-800-252-8387",
          "email": "vlbinfo@glo.texas.gov"
        }
      },
      "pros_cons": {
        "pros": [
          "Competitive interest rates",
          "Extra discount for disabled veterans (30%+)",
          "Zero down payment option",
          "Texas residents have strong program history",
          "Multiple loan term options"
        ],
        "cons": [
          "Texas residents only",
          "1% origination fee (though competitive overall)",
          "Limited to primary residences",
          "Slightly slower than some conventional lenders"
        ]
      },
      "veteran_population": 1560000,
      "loans_funded_annually": 4000,
      "total_loans_outstanding": 68000,
      "program_history": {
        "established": 1946,
        "description": "One of the first state veteran loan programs established after WWII"
      },
      "related_state_programs": [
        {
          "program": "Veterans Land Loan Program",
          "description": "Purchase Texas land with competitive financing"
        },
        {
          "program": "Veterans Home Improvement Loan Program",
          "description": "Finance home improvements and repairs"
        }
      ]
    },
    {
      "id": "FL",
      "name": "Florida",
      "has_program": true,
      "program_name": "Florida Homebuyer Programs (FHA Statewide)",
      "program_type": "down_payment_assistance",
      "benefit_score": 78,
      "map_color": "#1976D2",
      "loan_details": {
        "interest_rate": {
          "current": 5.25,
          "type": "fixed",
          "term_years": 30,
          "as_of_date": "2025-01-15",
          "comparison_to_market": "market_rate",
          "comparison_to_va": "higher",
          "note": "Uses standard market rates; benefit is down payment assistance, not rate reduction"
        },
        "down_payment": {
          "assistance_amount": 10000,
          "assistance_type": "forgivable_loan",
          "forgiveness_period_years": 5,
          "requirements": "Active-duty service members and eligible veterans",
          "standard_down_payment": "3.5% FHA minimum"
        },
        "loan_limits": {
          "maximum": 766550,
          "minimum": 0,
          "varies_by_county": true,
          "note": "Follows FHA limits"
        },
        "fees": {
          "origination_fee": "Standard FHA",
          "funding_fee": "Standard FHA MIP",
          "no_pmi": false,
          "note": "Uses conventional FHA structure"
        },
        "unique_features": [
          {
            "feature": "Salute Our Soldiers program",
            "description": "$10,000 down payment and closing cost assistance"
          },
          {
            "feature": "Forgivable loan",
            "description": "Assistance loan forgiven after 5 years of occupancy"
          }
        ]
      },
      "eligibility": {
        "veteran_status": "Active-duty service members or veterans",
        "service_requirements": "Standard VA eligibility",
        "residency": "Florida resident",
        "credit_score_minimum": 640,
        "income_limits": "Varies by county",
        "first_time_buyer_only": false,
        "disability_rating_required": false
      },
      "property_requirements": {
        "property_types": ["Single-family home", "Condo", "Townhouse"],
        "geographic_restrictions": "Florida only",
        "occupancy": "Primary residence required"
      },
      "application_process": {
        "how_to_apply": "Through participating lenders in Florida",
        "processing_time": "Standard FHA timeline",
        "contact": {
          "agency": "Florida Housing Finance Corporation",
          "website": "https://www.floridahousing.org/",
          "phone": "850-488-4197"
        }
      },
      "pros_cons": {
        "pros": [
          "$10,000 assistance for down payment and closing costs",
          "Forgivable loan (no repayment after 5 years)",
          "Can be combined with federal VA loan",
          "No disability rating required"
        ],
        "cons": [
          "Standard market interest rates (no rate reduction)",
          "Income limits apply",
          "Must use participating lenders",
          "5-year occupancy requirement for forgiveness"
        ]
      },
      "veteran_population": 1540000,
      "program_history": {
        "established": 2010,
        "description": "Part of Florida's broader first-time homebuyer initiatives"
      }
    },
    {
      "id": "WY",
      "name": "Wyoming",
      "has_program": false,
      "benefit_score": 0,
      "map_color": "#EEEEEE",
      "loan_details": null,
      "alternative_programs": {
        "description": "Wyoming does not have a state-specific veteran home loan program. Veterans should use the federal VA home loan.",
        "federal_va_available": true,
        "state_benefits_note": "Wyoming offers other veteran benefits including property tax exemptions and free tuition at state universities"
      },
      "veteran_population": 46000
    }
  ],
  "federal_va_baseline": {
    "name": "Federal VA Home Loan",
    "interest_rate": {
      "current": 5.75,
      "type": "fixed",
      "term_years": 30,
      "as_of_date": "2025-01-15",
      "note": "Varies by lender; this is national average"
    },
    "down_payment": {
      "minimum_percent": 0,
      "zero_down_available": true
    },
    "loan_limits": {
      "standard": 766550,
      "high_cost_areas": 1149850,
      "note": "2025 limits"
    },
    "fees": {
      "funding_fee": {
        "first_time": 2.15,
        "subsequent": 3.3,
        "disabled_veterans": 0
      },
      "no_pmi": true
    },
    "availability": "All 50 states"
  },
  "summary_statistics": {
    "states_with_programs": 21,
    "states_without_programs": 29,
    "direct_lender_states": 4,
    "down_payment_assistance_states": 17,
    "average_interest_rate_state_programs": 4.35,
    "average_down_payment_assistance": 6200,
    "total_veteran_homeowners_nationwide": 4700000,
    "last_updated": "2025-01-15"
  }
}
```

---

## 6. Detailed Mockup Description

### Dashboard Layout (Desktop)

**Left Panel: Interactive Map (600px width)**

United States map showing state-level color coding:
- Dark blue: Full loan programs (CA, OR, TX, WI)
- Medium blue: Substantial DPA programs (FL, GA, IL, IA, etc.)
- Light blue: Moderate assistance
- Very light blue: Interest rate reductions only
- Gray: No state program

Instruction text above map: "Click up to 4 states to compare their veteran home loan programs"

Selected states show blue checkmark overlay

**Right Panel: Comparison Display (1200px width)**

**Header Section:**
"Comparing [2-4] State Programs vs. Federal VA Loan"

**Baseline Card (Always Visible):**
```
┌─────────────────────────────────────┐
│  FEDERAL VA LOAN (Baseline)         │
├─────────────────────────────────────┤
│  Interest Rate: 5.75% (avg)         │
│  Down Payment: $0                   │
│  Max Loan: $766,550                 │
│  Funding Fee: 2.15% - 3.3%          │
│  (waived for disabled vets)         │
│  Available: All 50 states           │
└─────────────────────────────────────┘
```

**State Comparison Cards (2-4 cards, equal width):**
Each card follows structure shown in Section 4 (Design Specifications)

**Below Comparison Cards:**
- "Add Another State" button (if fewer than 4 selected)
- "View Full Feature Matrix" button (opens table view)
- "Calculate My Payment" button (opens calculator)

### Feature Matrix View (Expandable/Collapsible)

**Triggered by:** "View Full Feature Matrix" button

**Layout:** Full-width table below map and comparison panels

**Structure:**
- Fixed first column (state names) that stays visible during horizontal scroll
- Sticky header row
- Alternating row colors for readability

**Columns:**
1. State (fixed left, sortable alphabetically)
2. Program Type (Direct Lender / Down Payment Assistance / Rate Reduction)
3. Interest Rate (sortable, color-coded gauge)
4. Max Loan Amount (sortable, bar chart)
5. Down Payment Required (sortable, shows % or $ assistance)
6. Closing Cost Assistance (Y/N with amount)
7. No PMI (✓/✗)
8. No Funding Fee (✓/✗)
9. Disability Discount (✓/✗ with % if yes)
10. Income Limits (Y/N)
11. First-Time Buyer Only (Y/N)
12. Residency Required (Y/N)
13. Actions (Add to Compare, Details, Apply)

**Filters (Above Table):**
- Program Type (checkboxes)
- Interest Rate Range (slider)
- Max Loan Amount (slider)
- Down Payment Assistance (checkbox: only show states offering)
- No Residency Requirement (checkbox)

**Sort Indicator:**
Upward/downward arrow in header shows current sort direction

**Export Options:**
- Download as CSV
- Download as PDF
- Print view

### Savings Calculator (Modal or Sidebar)

**Size:** 450px × 650px (modal), 400px × 600px (sidebar)

**Input Section:**
```
╔═══════════════════════════════════════════╗
║    CALCULATE YOUR HOME LOAN SAVINGS       ║
╠═══════════════════════════════════════════╣
║                                           ║
║  Home Purchase Price:                     ║
║  [$_______] or [Slider: $100k - $1M]      ║
║                                           ║
║  Down Payment Amount:                     ║
║  [$_______] or [____%]                    ║
║                                           ║
║  Your State:                              ║
║  [Select State ▼]                         ║
║                                           ║
║  Veteran Status:                          ║
║  ○ Veteran (no disability)                ║
║  ○ Disabled veteran (specify %): [__]%    ║
║  ○ Active duty                            ║
║                                           ║
║  Loan Term:                               ║
║  ○ 15 years  ● 30 years                   ║
║                                           ║
║  [Calculate Savings]                      ║
║                                           ║
╠═══════════════════════════════════════════╣
║             RESULTS                       ║
╠═══════════════════════════════════════════╣
║                                           ║
║  STATE PROGRAM vs. FEDERAL VA LOAN:       ║
║                                           ║
║  Monthly Payment:                         ║
║  $2,485  ←→  $2,620                       ║
║  (Save $135/month)                        ║
║                                           ║
║  Total Interest Over 30 Years:            ║
║  $394,600  vs.  $443,200                  ║
║  (Save $48,600)                           ║
║                                           ║
║  Upfront Costs:                           ║
║  $3,200  vs.  $8,450                      ║
║  (Save $5,250 in closing costs)           ║
║                                           ║
║  ═══════════════════════════════════      ║
║  TOTAL LIFETIME SAVINGS: $53,850          ║
║  ═══════════════════════════════════      ║
║                                           ║
║  STATE PROGRAM vs. CONVENTIONAL LOAN:     ║
║  (5.5% rate, 20% down, PMI)               ║
║                                           ║
║  Monthly Payment:                         ║
║  $2,485  vs.  $3,125                      ║
║  (Save $640/month = $7,680/year)          ║
║                                           ║
║  Total Lifetime Savings: $152,400         ║
║                                           ║
╠═══════════════════════════════════════════╣
║  [Download Detailed Report (PDF)]         ║
║  [Email Results to Me]                    ║
║  [View State Program Details]             ║
╚═══════════════════════════════════════════╝
```

**Visual Enhancements:**
- Animated count-up when savings calculated
- Green highlighting for savings amounts
- Side-by-side bar charts for visual comparison
- Pie chart showing interest vs. principal over loan life

### Mobile Optimization (375px width)

**Collapsed View:**
- Map at top (350px height)
- "Compare Programs" button
- Tap state to see quick summary tooltip
- "Add to Comparison" button in tooltip

**Comparison View:**
- One state card at a time
- Horizontal swipe to navigate between selected states
- Dots indicator showing which card (e.g., ● ○ ○ for 1 of 3)
- Floating "Add State" button

**Feature Matrix:**
- Converts to vertical card layout
- One state per card
- Expandable sections for detailed features
- Sticky filter bar at top

**Calculator:**
- Full-screen modal overlay
- Simplified inputs (dropdowns instead of sliders)
- Results shown below inputs (vertical scroll)
- Collapsible detailed breakdown sections

---

## 7. Accessibility Guidelines

### WCAG 2.1 Level AA Compliance

**Color Contrast:**
- All text meets 4.5:1 minimum contrast
- Large text (18pt+) meets 3:1
- Interactive elements have 3:1 contrast against backgrounds
- Heat map colors tested with colorblind simulations
- Pattern alternatives for colorblind users (toggleable)

**Keyboard Navigation:**
- Tab order: Header → Map → Comparison Panel → Matrix → Calculator → Footer
- Map states navigable via Tab (alphabetical order) or Arrow keys (geographic)
- Enter selects/deselects state for comparison
- Escape closes modals
- Space toggles checkboxes
- Focus indicators: 3px blue outline + 1px white inner border

**Screen Reader:**
- Map has text alternative describing available programs
- Each state has ARIA label: "California. Full home loan program. Interest rate 3.875%. Max loan $766,550. Press Enter to add to comparison or Escape for details."
- Comparison cards use semantic HTML (`<article>`, `<section>`, `<h3>`)
- Calculator has ARIA live region announcing calculation results
- Table has proper structure (`<caption>`, `<thead>`, `<th scope="col">`)
- All icons have descriptive alt text

**Touch Targets:**
- Minimum 44×44px (iOS guideline)
- Map states: 48×48px tap area on mobile (Android guideline)
- Buttons: Minimum 48px height
- Adequate spacing: 8px minimum between touch targets

**Forms (Calculator):**
- Clear, descriptive labels for all inputs
- Error messages specific and actionable
- Inline validation (don't wait until submission)
- Success confirmation (ARIA announcement)

**Motor Impairments:**
- No hover-only interactions (always have click/tap alternative)
- Sticky scroll (comparison panel remains visible)
- No time limits
- Undo capability for state selections

**Cognitive Load:**
- Progressive disclosure (details hidden until requested)
- Consistent layout and terminology
- Clear visual hierarchy
- Glossary tooltips for mortgage terms (APR, LTV, PMI, etc.)
- Plain language (avoid jargon where possible)
- Summary before details

**Visual Accommodations:**
- Zoom to 200% without horizontal scroll
- High contrast mode toggle
- Respect `prefers-reduced-motion`
- Adjustable text size

---

## 8. Technical Implementation Notes

### Technology Stack

**Frontend:**
- **Framework:** React 18+ with TypeScript (type safety for complex financial data)
- **State Management:** Redux Toolkit (manage selected states, filter states, calculator inputs)
- **Mapping:** D3.js with TopoJSON for US map
- **Charts/Gauges:** Chart.js or Recharts (interest rate gauges, loan limit bars)
- **Styling:** Styled Components or Tailwind CSS
- **Forms:** React Hook Form (calculator validation)
- **Data Fetching:** React Query (cache state program data, refetch on stale)

**Backend (Optional):**
- **API:** Node.js + Express (if building API for real-time rate updates)
- **Database:** PostgreSQL (store historical rate data, user comparisons)
- **Alternative:** Static JSON files updated quarterly

**Calculations:**
```javascript
// Monthly payment calculation (principal + interest)
function calculateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  const monthlyPayment =
    principal *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  return monthlyPayment;
}

// Total interest calculation
function calculateTotalInterest(monthlyPayment, principal, years) {
  const totalPaid = monthlyPayment * years * 12;
  const totalInterest = totalPaid - principal;
  return totalInterest;
}

// PMI calculation (for conventional loan comparison)
function calculatePMI(loanAmount, downPaymentPercent) {
  if (downPaymentPercent >= 20) return 0;
  const annualPMI = loanAmount * 0.005; // 0.5% typical PMI rate
  return annualPMI / 12;
}
```

**Data Updates:**
- Quarterly review of interest rates (rates change frequently)
- Annual review of program features, eligibility
- Automated scraping (if feasible) from state agency websites
- Manual verification before publishing updates
- Version control with changelog

**Performance:**
- Lazy load state detail data (code splitting by state)
- Memoize expensive calculations
- Virtualize feature matrix (only render visible rows)
- Debounce calculator inputs (prevent excessive re-renders)
- Image optimization (SVG for map, icons)
- CDN for static assets

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

### Analytics Tracking

**Events:**
- States selected for comparison
- Comparison panel views
- Calculator usage (inputs entered, results viewed)
- "Apply Now" clicks (track which states drive applications)
- Feature matrix interactions (sorting, filtering)
- PDF downloads
- State agency link clicks

**Custom Dimensions:**
- User's state (if provided/detected)
- States compared (track popular combinations)
- Home price range entered
- Veteran disability status (if entered)

**Goal Tracking:**
- Application starts (clicks to state agency)
- Calculator completion
- Comparison of 3+ states (indicates serious research)

---

## 9. Content Requirements

### Page Header

**Headline:**
"State Veteran Home Loan Programs: Rates, Benefits & Comparison (2024-2025)"

**Subheadline:**
"21 states offer home loan programs for veterans with below-market rates, zero down payment, and thousands in savings. Compare programs to find the best option for your home purchase."

**Key Statistics (Prominent):**
- 21 states with programs
- Rates as low as 3.875%
- Up to $10,000 down payment assistance
- Average savings: $45,000 over loan life

### Introduction

"Most veterans know about the federal VA home loan—and it's an excellent benefit with zero down payment and no PMI. But did you know that 21 states offer their own veteran home loan programs? States like California, Texas, and Oregon operate their own lending programs with competitive (and sometimes better) interest rates, while states like Florida and Georgia provide substantial down payment assistance. Some veterans can even combine state and federal benefits. This interactive tool helps you compare state programs side-by-side and calculate your potential savings."

### Educational Sidebar: "State vs. Federal VA Loans"

```
FEDERAL VA LOAN
✓ Available in all 50 states
✓ No down payment required
✓ No PMI
✓ Competitive interest rates
✗ 2.15%-3.3% funding fee (waived if disabled)
✗ Rates vary by lender

STATE PROGRAMS (select states)
✓ Often below-market interest rates
✓ No down payment (most programs)
✓ No PMI
✓ No funding fee (some programs)
✓ Down payment assistance (some)
✗ Limited to state residents
✗ May have income limits

CAN I USE BOTH?
In some cases, yes! For example, you might use a state down payment assistance program with a federal VA loan. Check with your state program for details.
```

### Glossary (Tooltips/Expandable)

**APR (Annual Percentage Rate):** The yearly cost of a loan including interest and fees, expressed as a percentage.

**LTV (Loan-to-Value Ratio):** The loan amount divided by the home's value. A 95% LTV means a 5% down payment.

**PMI (Private Mortgage Insurance):** Insurance that conventional loans require if down payment is less than 20%. VA loans don't require PMI.

**Funding Fee:** A one-time fee charged by the VA (2.15%-3.3% of loan amount). Waived for veterans with service-connected disabilities.

**Down Payment Assistance (DPA):** Grant or forgivable loan to help with down payment and closing costs.

**Forgivable Loan:** A loan that doesn't require repayment if certain conditions are met (e.g., living in home for 5 years).

**Assumable Loan:** A loan that can be transferred to a new buyer at the same interest rate (valuable in rising-rate environments).

### FAQ Section

**Q: How do I know if my state has a veteran home loan program?**
A: Use the interactive map above. States colored dark blue, medium blue, or light blue have programs. Gray states currently don't offer state-specific veteran home loan programs (but federal VA loans are still available).

**Q: Can I use both a state program and the federal VA loan?**
A: It depends. Direct lender states (CA, OR, TX, WI) are alternatives to the VA loan—you choose one or the other. However, down payment assistance programs (FL, GA, IL) can often be combined with a federal VA loan. Check specific state requirements.

**Q: Which is better: State program or federal VA loan?**
A: It depends on your situation. Use the comparison tool and calculator to see actual numbers. Generally:
- If you're in CA, OR, TX, WI: Compare the state direct loan to federal VA
- If your state offers DPA: Consider using it with federal VA loan
- If no state program: Federal VA loan is your best veteran-specific option

**Q: Do I have to be a first-time homebuyer?**
A: Most state programs do NOT require first-time homebuyer status (exceptions noted in program details). This is a major advantage over many general first-time homebuyer programs.

**Q: What if I'm a disabled veteran?**
A: You may qualify for extra benefits:
- Federal VA loan: Funding fee waived (save $6,000-$12,000)
- Texas VLB: 0.25% interest rate discount if 30%+ disability
- Always mention your disability rating when applying

**Q: How do interest rates change?**
A: State program rates are updated periodically (monthly or quarterly). The rates shown here are current as of the "Last Updated" date. Contact the state agency for today's rate or check their website.

### Call-to-Action Elements

**Primary CTA:**
"Compare Programs in Your State" (highlights user's state on map if location detected)

**Secondary CTA:**
"Calculate Your Savings" (opens calculator)

**Tertiary CTA:**
"Download State Program Guide (PDF)" - comprehensive reference document

**Per-State CTAs (in comparison cards):**
- "Apply Now" → Links to state agency application page
- "Contact [State Agency]" → Phone number, email, website
- "Download Application Checklist" → PDF of required documents

### Disclaimers

"Interest rates, loan limits, and program features shown are current as of [date]. Rates change frequently—contact the state agency or check their website for today's rates. Eligibility requirements may vary. This tool is for informational purposes only and does not constitute financial advice. Consult with a mortgage professional and your state veterans affairs office for personalized guidance."

---

## 10. Success Metrics

### Engagement Metrics
- Map interaction rate: Target 80%+ of visitors
- States selected for comparison: Target 2.5 average per user
- Calculator usage: Target 50%+ of visitors
- Feature matrix views: Target 35%+ of visitors
- Average time on page: Target 6+ minutes (complex financial decision)

### Task Completion
- Users can identify if their state has a program: 95%+ success
- Users can compare programs across states: 90%+ success
- Users can calculate potential savings: 85%+ success
- Users can find application process: 90%+ success

### Conversion Metrics
- "Apply Now" clicks: Target 15%+ of users who view a state program
- State agency contact clicks: Target 25%+ of comparison panel viewers
- Calculator completions: Target 60%+ of users who open calculator
- PDF guide downloads: Target 20%+ of visitors

### User Satisfaction
- Post-visit survey: "Did this tool help you understand state veteran home loan programs?" Target 92%+ "Yes"
- "Did you discover a program you didn't know about?" Target 60%+ "Yes"
- Net Promoter Score: Target 55+

### Impact Metrics
- Track conversions to actual loan applications (if state agencies can share data)
- User-reported benefit: "I used a state program based on this tool" (follow-up survey)

---

## 11. Production Timeline & Resources

### Phase 1: Research & Data Collection (3 weeks)

**Weeks 1-2: State Program Research**
- Contact 21 state agencies with programs
- Verify current interest rates, fees, loan limits
- Collect eligibility criteria
- Document application processes
- **Resources:** 2 Research Analysts, 80 hours total

**Week 3: Federal VA Baseline Data & Validation**
- Collect federal VA loan data for comparison baseline
- Cross-reference state data with veteran advocacy orgs
- Calculate sample savings scenarios
- Structure JSON data files
- **Resources:** 1 Research Analyst, 1 Financial Analyst, 60 hours total

### Phase 2: Design (2.5 weeks)

**Weeks 4-5: UX/UI Design**
- Wireframe dashboard layout
- Design comparison cards
- Create interest rate gauges and visual metaphors
- Design calculator interface
- Mockup feature matrix
- **Resources:** 1 UI/UX Designer, 80 hours

**Week 6 (partial): Responsive Design**
- Design tablet layouts
- Design mobile experience (cards, carousel)
- Create component library
- Design system documentation
- **Resources:** 1 UI/UX Designer, 20 hours

### Phase 3: Development (6 weeks)

**Week 6 (continued) - Week 7: Map & Core UI**
- Set up React + TypeScript project
- Implement D3.js map
- Build state selection system
- Create comparison card components
- **Resources:** 1 Senior Frontend Developer, 60 hours

**Week 8: Comparison Panel Logic**
- State management (Redux Toolkit)
- Add/remove state functionality
- Data fetching and caching
- Expandable sections (eligibility, pros/cons)
- **Resources:** 1 Frontend Developer, 40 hours

**Week 9: Calculator**
- Build calculator UI (forms, sliders)
- Implement financial calculations (mortgage formulas)
- Results display with animations
- PDF generation for results
- **Resources:** 1 Frontend Developer, 40 hours

**Week 10: Feature Matrix**
- Sortable/filterable table
- Virtual scrolling (performance)
- Export functionality (CSV, PDF)
- Mobile card view
- **Resources:** 1 Frontend Developer, 40 hours

**Week 11: Integration & Polish**
- Connect all components
- Implement routing
- Loading states, error handling
- Animations and transitions
- Performance optimization
- **Resources:** 1 Senior Frontend Developer, 40 hours

**Week 12 (partial): Cross-Browser Testing**
- Test on Chrome, Firefox, Safari, Edge
- Test on iOS, Android
- Fix compatibility issues
- **Resources:** 1 Frontend Developer, 20 hours

### Phase 4: Testing & Launch (2.5 weeks)

**Week 12 (continued) - Week 13: QA & Accessibility**
- Functional testing (all features)
- WCAG 2.1 AA audit
- Screen reader testing
- Keyboard navigation verification
- Performance testing (Lighthouse)
- Financial calculation verification
- **Resources:** 1 QA Tester, 1 Accessibility Specialist, 80 hours total

**Week 14: User Testing & Refinement**
- Usability testing with 10 veterans (varied backgrounds)
- Calculator accuracy validation with mortgage professionals
- Bug fixes
- Content review (legal, disclaimers)
- Final documentation
- Launch preparation
- **Resources:** 1 UX Researcher, 1 QA Tester, 1 Frontend Developer, 80 hours total

### Total Timeline: 14 weeks

### Resource Summary
- Research Analysts: 140 hours
- Financial Analyst: 30 hours
- UI/UX Designer: 100 hours
- Senior Frontend Developer: 100 hours
- Frontend Developers: 140 hours
- QA Tester: 80 hours
- Accessibility Specialist: 40 hours
- UX Researcher: 40 hours
- **Total: 670 person-hours**

### Budget Estimate
- Research Analysts: 140 hrs × $50/hr = $7,000
- Financial Analyst: 30 hrs × $70/hr = $2,100
- UI/UX Designer: 100 hrs × $75/hr = $7,500
- Senior Frontend Developer: 100 hrs × $95/hr = $9,500
- Frontend Developers: 140 hrs × $85/hr = $11,900
- QA Tester: 80 hrs × $60/hr = $4,800
- Accessibility Specialist: 40 hrs × $70/hr = $2,800
- UX Researcher: 40 hrs × $65/hr = $2,600
- **Total: $48,200**

### Ongoing Maintenance
- Quarterly interest rate updates: 20 hours/quarter ($4,000/year)
- Annual program feature updates: 40 hours ($2,000/year)
- Bug fixes and minor enhancements: 24 hours/year ($2,000/year)
- **Annual maintenance: $8,000**

---

## 12. Future Enhancements

### Phase 2 Features

1. **Historical Rate Trends**
   - Line charts showing state program rate changes over time
   - Predict best time to lock in rate
   - Historical comparison: "If you'd locked in 6 months ago..."

2. **Refinance Calculator**
   - Compare refinancing from conventional to state/VA loan
   - Break-even analysis
   - When does it make sense to refinance?

3. **County-Level Drill-Down**
   - Some states have county-specific loan limits
   - Show precise limits for user's specific county
   - Local real estate market data integration

4. **Veteran Community Reviews**
   - Verified veterans rate application process ease
   - Share tips for successful applications
   - Estimated processing times (crowdsourced)
   - Lender recommendations

5. **Pre-Qualification Estimator**
   - Input income, debts, credit score range
   - Estimate eligibility for various programs
   - "Likely to qualify" vs. "May need to improve" feedback

6. **Combined Benefits Calculator**
   - Model scenarios using state DPA + federal VA loan
   - Show optimal combination of benefits
   - Stacking opportunities

7. **Mobile App**
   - Save favorite state comparisons
   - Get notified when rates drop
   - Store required documents for applications
   - Integration with state agency portals (if APIs available)

8. **Real Estate Agent Portal**
   - Tools for agents working with veteran clients
   - Printable comparison sheets
   - Client collaboration features (share comparisons)

---

## 13. Related Visualizations

This visualization pairs excellently with:
- **Spec #011:** Income Tax Exemption on Military Retirement Pay (Relocation decisions)
- **Spec #012:** Vehicle Registration Fee Exemptions (Additional cost-of-living factors)
- **Spec #013:** Hunting/Fishing License Benefits (Quality of life factors)
- **Spec #015:** Tuition Waiver Programs (Family education, long-term planning)
- **Future:** Property Tax Exemptions for Veterans
- **Future:** Overall Cost of Living Comparison for Military Retirees
- **Future:** Comprehensive State Relocation Decision Tool

---

## Document Metadata

**Specification Number:** 014
**Version:** 1.0
**Date Created:** January 15, 2025
**Author:** Military Transition Toolkit Team
**Status:** Ready for Development
**Next Review Date:** April 2025 (quarterly rate review)
**Dependencies:** None
**Related Specs:** 011, 012, 013, 015
**Data Sensitivity:** No PII; public program information; financial calculations are estimates
**Legal Review Required:** Yes (for disclaimers, financial accuracy statements)
