---
date: "2026-02-05"
---# Data Visualization Specification #015: State Tuition Waiver Programs for Veterans and Dependents

## 1. Overview

### Title
**Free College for Veterans: State-by-State Tuition Waiver & Education Benefits Comparison (2024-2025)**

### Purpose
This visualization reveals which states offer free or reduced tuition at public colleges and universities for veterans, spouses, and dependents. With college costs averaging $50,000+ for a four-year degree, these state benefits can provide six-figure value to military families. Many veterans and military families are unaware that some states offer tuition waivers independently of federal GI Bill® benefits, creating opportunities to save GI Bill benefits for graduate school or transfer to children.

### Target Audience
- Veterans planning to use education benefits (ages 22-40)
- Spouses and dependents of veterans (ages 18-55)
- Military families with children approaching college age
- Disabled veterans (100% P&T) and their families
- Surviving spouses and dependents of deceased or disabled service members
- Military transition counselors and education services officers
- State education agencies benchmarking veteran benefits

### Key Questions Answered
- Which states offer free tuition to veterans at public universities?
- Can my spouse or children get free tuition through my military service?
- What disability rating is required for tuition waivers?
- Do I need to use my GI Bill, or is this a separate benefit?
- Which states have the most comprehensive education benefits?
- What are the age limits and credit/semester caps?
- Can I combine state tuition waivers with federal GI Bill benefits?
- Which state offers the best value for my family's education needs?

---

## 2. Data Sources

### Primary Sources

1. **State Veterans Affairs Departments (All 50 States)**
   - Official state veteran benefit publications
   - Examples:
     - Texas Veterans Commission (Hazlewood Act): https://tvc.texas.gov/education/hazlewood/
     - Illinois IDVA (IVG): https://veterans.illinois.gov/services-benefits/education.html
     - Virginia DVS (VMSDEP): https://www.dvs.virginia.gov/benefits-services/education/
     - California CalVet: https://www.calvet.ca.gov/
     - Wisconsin DVA: https://dva.wi.gov/
   - Data Type: Eligibility, benefit amounts, covered costs, application procedures
   - Update Frequency: Annual (July for fall semester changes)

2. **State Higher Education Agencies**
   - Individual state systems (e.g., University of Texas System, California State University, SUNY)
   - Tuition and fee data for cost savings calculations
   - Credit hour limits and semester caps

3. **VA Claims Insider - State Education Benefits**
   - URL: https://vaclaimsinsider.com/disabled-veterans-education-benefits-by-state/
   - Data Type: Comprehensive state-by-state disabled veteran education benefits
   - Last Updated: 2024

4. **Veteran Education Databases**
   - Veterans Benefits Knowledge Base: https://www.veteransbenefitskb.com/free-tuition
   - College Recon State Guides: https://collegerecon.com/states-offering-free-college-veterans-dependents/
   - Veteran.com State Tuition Guides: https://veteran.com/states-offer-free-tuition-veterans/
   - Data Type: Eligibility criteria, coverage details, application guides

5. **Federal Requirements (Baseline)**
   - Veterans Choice Act Section 702 (in-state tuition requirements)
   - Federal GI Bill benefits (for comparison and stacking analysis)
   - URL: https://www.va.gov/education/

### Data Collection Date
November 2024 - January 2025

### Data Verification Methodology
- Direct contact with state veterans affairs offices (email/phone verification)
- Cross-reference with university financial aid offices
- Verify benefit caps and credit limits with state education departments
- Validate eligibility criteria against state statutes (where publicly available)
- Confirm recent legislative changes affecting 2024-2025 academic year

---

## 3. Visualization Type

### Primary Visualization
**Interactive Choropleth Map with Multi-Layer Filtering**

### Rationale
A choropleth map with sophisticated filtering enables users to:
- Quickly identify states offering benefits relevant to their family situation
- Filter by beneficiary type (veteran, spouse, dependent children)
- Filter by disability rating requirements
- See geographic patterns in benefit generosity
- Compare neighboring states for relocation decisions

### Component 1: Multi-Filter Map
- Base layer: Color-coded by benefit comprehensiveness for veterans
- Toggle filters:
  - ☐ Benefits for Veterans
  - ☐ Benefits for Spouses
  - ☐ Benefits for Dependent Children
  - ☐ Requires 100% P&T Disability
  - ☐ Requires Service-Connected Death
  - ☐ No GI Bill Requirement
- Map updates dynamically as filters applied

### Component 2: Beneficiary-Specific Views
- **Veteran View:** States offering tuition waivers directly to veterans
- **Family View:** States offering benefits to spouses and/or children
- **Disabled Veteran View:** States with specific 100% P&T benefits
- **Survivor View:** States offering benefits to survivors of deceased service members

### Component 3: Value Calculator
- Input: State, degree type (associate/bachelor/graduate), beneficiary type, disability status
- Output: Estimated total value of benefit, years of coverage, credit/semester limits
- Comparison: State benefit value vs. Post-9/11 GI Bill value

### Component 4: Benefit Comparison Matrix
- Sortable table with columns:
  - State
  - Veteran benefits (Y/N/Partial)
  - Spouse benefits (Y/N/Partial)
  - Dependent benefits (Y/N/Partial)
  - Disability requirement
  - Age limits
  - Credit caps
  - Total estimated value
  - Can stack with GI Bill

---

## 4. Design Specifications

### Color Palette

**Benefit Comprehensiveness for Veterans (Map Base Layer):**
- **Comprehensive (Free tuition for veterans, spouses, AND children):** `#1A237E` (Deep Blue)
  - Examples: Texas, Illinois, Wisconsin
- **Extensive (Free tuition for veterans + spouses OR children):** `#283593` (Dark Blue)
  - Examples: Florida, Virginia, California
- **Substantial (Free tuition for veterans only, broad eligibility):** `#3949AB` (Medium Blue)
  - Examples: Connecticut, Maryland, Massachusetts
- **Moderate (Partial tuition waiver or limited eligibility):** `#5C6BC0` (Light Blue)
  - Examples: Delaware, Kentucky, Montana
- **Limited (Reduced fees or specific programs only):** `#9FA8DA` (Very Light Blue)
  - Examples: Arizona, Nevada, Oregon
- **None/Federal Minimum Only (In-state tuition per Choice Act):** `#EEEEEE` (Light Gray)

**Beneficiary Type Indicators (Toggle Filters):**
- Veteran: `#1976D2` (Blue) - Person icon
- Spouse: `#E91E63` (Pink/Magenta) - Two person icon
- Dependent Children: `#4CAF50` (Green) - Family icon
- Survivor Benefits: `#FF9800` (Orange) - Heart icon

**Disability Rating Requirements:**
- No Disability Required: `#66BB6A` (Light Green)
- 10-49% Disability: `#29B6F6` (Sky Blue)
- 50-99% Disability: `#1976D2` (Medium Blue)
- 100% P&T Required: `#0D47A1` (Dark Blue)
- Service-Connected Death: `#FF6F00` (Deep Orange)

**Benefit Value (Dollar Amount Visualization):**
- $100,000+: `#1B5E20` (Dark Green) - Exceptional value
- $50,000-$99,999: `#388E3C` (Medium-Dark Green) - Excellent value
- $25,000-$49,999: `#66BB6A` (Medium Green) - Good value
- $10,000-$24,999: `#AED581` (Light Green) - Moderate value
- Under $10,000: `#FDD835` (Yellow) - Limited value

**UI Foundation:**
- Background: `#FAFAFA` (Off-white)
- Card Background: `#FFFFFF` (White)
- Borders: `#E0E0E0` (Light Gray, 1px)
- Shadows: `0 2px 8px rgba(0,0,0,0.1)` for depth
- Text Primary: `#212121` (Dark Gray)
- Text Secondary: `#757575` (Medium Gray)
- Accent: `#1565C0` (Deep Blue) - Education theme
- Success: `#2E7D32` (Dark Green)
- Warning: `#F57C00` (Orange)
- Information: `#0288D1` (Light Blue)

### Typography

**Primary Font: Lato** (Friendly, professional, excellent readability for educational content)

- Page Title: Lato Bold, 36px, `#212121`
- Section Headers: Lato Bold, 26px, `#212121`
- Subsection Headers: Lato Semibold, 20px, `#424242`
- State Names (on map): Lato Bold, 11px, `#212121`
- State Names (detail cards): Lato Bold, 24px, `#212121`
- Benefit Labels: Lato Semibold, 14px, `#757575`
- Benefit Values: Lato Bold, 22px, color-coded by value
- Body Text: Lato Regular, 16px, `#424242`
- Fine Print (eligibility details): Lato Regular, 14px, `#757575`
- Data Table Headers: Lato Bold, 14px, `#212121`
- Data Table Content: Lato Regular, 14px, `#424242`
- Button Text: Lato Bold, 16px, `#FFFFFF`
- Disclaimers: Lato Italic, 13px, `#9E9E9E`

**Fallback Stack:**
```css
font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

**Number Formatting:**
- Dollar Values: $150,000 (no decimals, comma separators)
- Percentages: 100% (no decimals unless needed)
- Credit Hours: 150 credit hours (spelled out)
- Semesters: 8 semesters (spelled out)

### Icon System

**Beneficiary Icons:**
- Veteran: Silhouette with military cap (24×24px)
- Spouse: Two interlocking rings (24×24px)
- Children: Parent and child silhouette (24×24px)
- Survivor: Respectful memorial icon (24×24px)

**Education Level Icons:**
- Associate Degree: Square cap with "A" (20×20px)
- Bachelor's Degree: Square cap with "B" (20×20px)
- Graduate Degree: Square cap with "G" (20×20px)
- Technical/Certificate: Tools icon (20×20px)

**Status Icons:**
- Fully Covered: Green checkmark circle `#4CAF50`
- Partially Covered: Yellow circle with "~" `#FDD835`
- Not Covered: Gray X circle `#9E9E9E`
- Information: Blue info circle `#2196F3`

### Layout Dimensions

**Desktop (1920×1080)**
- Map Container: 900px × 700px (left side, 60% width)
- Control Panel: 600px × 700px (right side, 40% width)
  - Filter toggles
  - Quick stats
  - Calculator widget
  - Legend
- Detail Panel (modal): 800px × 850px overlay
- Comparison Matrix: Full width, 1800px × variable (below map)
- Margins: 40px outer, 24px internal

**Tablet (768×1024)**
- Map Container: 100% width, 450px height
- Control Panel: 100% width, accordion sections below map
- Detail Panel: Full-screen overlay
- Comparison Matrix: Full width with horizontal scroll
- Margins: 24px outer, 16px internal

**Mobile (375×667)**
- Map Container: 100% width, 400px height
- Control Panel: Collapsible sections (filters closed by default)
- Filter button: Opens modal with all filter options
- Detail Panel: Full-screen slide-up
- Comparison Matrix: Vertical card layout
- Margins: 16px outer, 12px internal

### Interactive Elements

**Map Interactions:**
- Hover: State outline glows (white 2px border), tooltip shows program name and key stats
- Click: Opens detailed state modal with full benefit breakdown
- Filter Toggle: Map dynamically grays out states not meeting filter criteria (30% opacity)

**Filter System:**
```
┌─────────────────────────────────────────┐
│  SHOW BENEFITS FOR:                     │
├─────────────────────────────────────────┤
│  ☑ Veterans                             │
│  ☑ Spouses                              │
│  ☑ Dependent Children                   │
│  ☐ Survivors Only                       │
├─────────────────────────────────────────┤
│  DISABILITY REQUIREMENTS:               │
├─────────────────────────────────────────┤
│  ☑ No Disability Required               │
│  ☑ Any Disability (10%+)                │
│  ☑ 50%+ Disability                      │
│  ☑ 100% P&T Only                        │
├─────────────────────────────────────────┤
│  OTHER FILTERS:                         │
├─────────────────────────────────────────┤
│  ☐ No Age Limits                        │
│  ☐ Can Stack with GI Bill              │
│  ☐ Covers Graduate School               │
│  ☐ $50,000+ Value                       │
├─────────────────────────────────────────┤
│  [Clear All]  [Apply Filters]           │
└─────────────────────────────────────────┘

States Matching: 18 of 50
```

**Value Calculator:**
```
┌─────────────────────────────────────────┐
│  CALCULATE BENEFIT VALUE                │
├─────────────────────────────────────────┤
│  Your State: [Select ▼]                 │
│  Beneficiary:                           │
│    ○ Veteran                            │
│    ○ Spouse                             │
│    ● Child/Dependent                    │
│  Disability Status:                     │
│    [Select ▼]                           │
│  Degree Type:                           │
│    ○ Associate (2-year)                 │
│    ● Bachelor's (4-year)                │
│    ○ Graduate                           │
│  Institution:                           │
│    ● Public University                  │
│    ○ Community College                  │
├─────────────────────────────────────────┤
│  ESTIMATED BENEFIT VALUE:               │
│                                         │
│  Tuition Waived:  $68,400               │
│  Fees Covered:    $6,800                │
│  ─────────────────────────────          │
│  Total 4-Year Value:  $75,200           │
│                                         │
│  Coverage: 150 credit hours             │
│  (Enough for bachelor's degree)         │
│                                         │
│  ☑ Can stack with GI Bill for          │
│    housing allowance                    │
│                                         │
│  [Download Eligibility Guide]           │
│  [See Application Process]              │
└─────────────────────────────────────────┘
```

**State Detail Modal:**

**Size:** 850px × 900px (desktop), full-screen (mobile)

**Structure:**
```
┌───────────────────────────────────────────────┐
│  [X]    TEXAS EDUCATION BENEFITS              │
│         (Hazlewood Act)                       │
├───────────────────────────────────────────────┤
│                                               │
│  ⭐⭐⭐⭐⭐  Comprehensive Benefits              │
│                                               │
│  Estimated Value: $150,000                    │
│  (150 credit hours at public universities)   │
│                                               │
│  ───────────────────────────────────          │
│                                               │
│  WHO'S ELIGIBLE:                              │
│                                               │
│  ✓ Veterans (Texas residents)                │
│    • Up to 150 credit hours                  │
│    • Tuition + most fees covered             │
│    • No disability rating required           │
│    • Can be used for bachelor's + graduate   │
│                                               │
│  ✓ Spouses of Veterans                       │
│    • If veteran 100% disabled OR             │
│    • If veteran killed in action             │
│    • Up to 150 credit hours                  │
│                                               │
│  ✓ Children of Veterans                      │
│    • If parent 100% disabled OR              │
│    • If parent killed in action              │
│    • Must be under 26 years old              │
│    • Up to 150 credit hours                  │
│                                               │
│  ▼ ELIGIBLE SERVICE REQUIREMENTS              │
│  ▼ COVERED INSTITUTIONS                       │
│  ▼ APPLICATION PROCESS                        │
│  ▼ DOCUMENTATION NEEDED                       │
│  ▼ FREQUENTLY ASKED QUESTIONS                 │
│  ▼ STACKING WITH GI BILL                      │
│  ▼ RECENT LEGISLATIVE CHANGES                 │
│                                               │
│  [Calculate My Benefit Value]                 │
│  [Download Application Form]                  │
│  [Contact Texas Veterans Commission]          │
│                                               │
└───────────────────────────────────────────────┘
```

---

## 5. Sample Data Structure

### Data Schema (JSON)

```json
{
  "states": [
    {
      "id": "TX",
      "name": "Texas",
      "program_name": "Hazlewood Act",
      "benefit_level": "comprehensive",
      "overall_rating": 5,
      "map_color": "#1A237E",
      "veteran_population": 1560000,
      "veteran_benefits": {
        "available": true,
        "coverage": "full_tuition_fees",
        "credit_hour_limit": 150,
        "semester_limit": null,
        "dollar_limit": null,
        "time_limit_years": null,
        "disability_requirement": "none",
        "age_limit": null,
        "institutions_covered": [
          "Public universities",
          "State colleges",
          "Community colleges",
          "Technical schools"
        ],
        "covers_tuition": true,
        "covers_fees": true,
        "covers_books": false,
        "covers_housing": false,
        "degree_levels": ["Associate", "Bachelor", "Graduate", "Certificate"],
        "estimated_value_4yr_degree": 150000,
        "can_stack_with_gi_bill": true,
        "residency_requirement": "Texas resident",
        "eligibility_details": {
          "service_requirements": "Must be Texas veteran with honorable discharge",
          "minimum_service_days": "181 days active duty (peacetime) or any active duty wartime",
          "discharge_status": "Honorable discharge required",
          "additional_criteria": [
            "Designated as Texas resident for purposes of the Hazlewood Act",
            "Enrolled in public institution of higher education in Texas"
          ]
        },
        "transferability": {
          "can_transfer_to_spouse": true,
          "can_transfer_to_children": true,
          "conditions": "If veteran has unused hours and doesn't plan to use them"
        }
      },
      "spouse_benefits": {
        "available": true,
        "coverage": "full_tuition_fees",
        "credit_hour_limit": 150,
        "eligibility": {
          "veteran_must_be": "100% disabled OR killed in action/line of duty",
          "disability_must_be": "Service-connected, rated 100% by VA",
          "marriage_timing": "Must be married to veteran during service OR at time of death/disability determination"
        },
        "institutions_covered": ["Public universities", "State colleges", "Community colleges"],
        "estimated_value_4yr_degree": 150000,
        "age_limit": null,
        "time_limit": null
      },
      "dependent_benefits": {
        "available": true,
        "coverage": "full_tuition_fees",
        "credit_hour_limit": 150,
        "eligibility": {
          "parent_must_be": "Texas veteran with 100% disability OR killed in action/line of duty",
          "age_limit": 26,
          "biological_adopted_stepchild": "Yes",
          "relationship_timing": "Child of veteran at time of death OR before disability determination"
        },
        "institutions_covered": ["Public universities", "State colleges", "Community colleges"],
        "estimated_value_4yr_degree": 150000,
        "time_limit": "Must use before 26th birthday"
      },
      "application_process": {
        "how_to_apply": "Submit Hazlewood Act Certificate to institution's registrar or financial aid office",
        "required_documents": [
          "DD-214 (Certificate of Release or Discharge from Active Duty)",
          "Texas driver's license or ID showing residency",
          "VA disability rating letter (if applicable for dependent/spouse benefits)",
          "Birth certificate or marriage certificate (for dependent/spouse benefits)"
        ],
        "where_to_apply": "Texas Veterans Commission website or institution's veterans services office",
        "processing_time": "Varies by institution; apply before semester starts",
        "renewal_required": true,
        "renewal_frequency": "Each semester",
        "contact": {
          "agency": "Texas Veterans Commission",
          "website": "https://tvc.texas.gov/education/hazlewood/",
          "phone": "1-800-252-8387",
          "email": "hazlewood@tvc.texas.gov"
        }
      },
      "gi_bill_interaction": {
        "can_stack": true,
        "stacking_details": "Can use Hazlewood for tuition/fees and GI Bill for housing allowance and books",
        "optimal_strategy": "Use Hazlewood first (saves GI Bill months for graduate school or transfer to dependents)",
        "restrictions": "Cannot receive BAH from GI Bill while using Hazlewood for tuition"
      },
      "pros_cons": {
        "pros": [
          "One of the most generous state education benefits in the nation",
          "150 credit hours covers bachelor's degree + significant graduate coursework",
          "No disability rating required for veteran's own use",
          "Transferable to spouse and children under certain conditions",
          "Can be used at any public institution in Texas",
          "No time limit for veterans to use benefit"
        ],
        "cons": [
          "Texas residency required",
          "Dependent/spouse benefits require 100% disability or death",
          "Children must use benefit before age 26",
          "Does not cover books or housing costs",
          "Some fees not covered (e.g., parking, student org fees)"
        ]
      },
      "recent_changes": [
        {
          "date": "2023-09-01",
          "description": "Expanded to cover adopted and stepchildren",
          "impact": "More families now eligible for dependent benefits"
        }
      ],
      "additional_resources": [
        {
          "title": "Hazlewood Act Fact Sheet",
          "url": "https://tvc.texas.gov/wp-content/uploads/2023/04/Hazlewood-Act-Fact-Sheet.pdf",
          "type": "PDF"
        }
      ],
      "success_stories": {
        "annual_recipients": 35000,
        "total_value_disbursed_annually": "Approximately $169 million"
      }
    },
    {
      "id": "IL",
      "name": "Illinois",
      "program_name": "Illinois Veteran Grant (IVG)",
      "benefit_level": "comprehensive",
      "overall_rating": 5,
      "map_color": "#1A237E",
      "veteran_population": 628000,
      "veteran_benefits": {
        "available": true,
        "coverage": "full_tuition_fees",
        "credit_hour_limit": null,
        "semester_limit": 8,
        "dollar_limit": null,
        "time_limit_years": null,
        "disability_requirement": "none",
        "age_limit": null,
        "institutions_covered": [
          "University of Illinois campuses",
          "Illinois State University",
          "All Illinois public universities",
          "Illinois community colleges"
        ],
        "covers_tuition": true,
        "covers_fees": "Some mandatory fees",
        "covers_books": false,
        "covers_housing": false,
        "degree_levels": ["Associate", "Bachelor", "Graduate"],
        "estimated_value_4yr_degree": 76000,
        "can_stack_with_gi_bill": true,
        "residency_requirement": "Illinois resident for 6 months prior to enrollment",
        "eligibility_details": {
          "service_requirements": "Veteran with qualifying service (1 year active duty OR active duty during eligible period of hostilities)",
          "discharge_status": "Other than dishonorable",
          "additional_criteria": [
            "Illinois resident for 6+ months before term starts",
            "Cannot have received undergraduate degree in past (for undergrad IVG)"
          ]
        }
      },
      "spouse_benefits": {
        "available": false,
        "notes": "Illinois does not extend IVG to spouses"
      },
      "dependent_benefits": {
        "available": true,
        "program_name": "Illinois MIA/POW Scholarship",
        "coverage": "full_tuition_fees",
        "eligibility": {
          "parent_must_be": "Illinois veteran who is MIA, POW, died in service, or 100% service-connected disability",
          "age_limit": null,
          "specific_requirements": "Must be child of qualifying Illinois veteran"
        },
        "institutions_covered": ["All Illinois state-supported colleges and universities"],
        "estimated_value": 76000,
        "note": "This is a separate program from IVG"
      },
      "application_process": {
        "how_to_apply": "Apply through Illinois Department of Veterans' Affairs",
        "required_documents": [
          "DD-214",
          "Illinois driver's license or state ID",
          "Proof of residency (6+ months)",
          "IVG application form"
        ],
        "where_to_apply": "Illinois Department of Veterans' Affairs website or regional offices",
        "processing_time": "4-6 weeks before semester",
        "renewal_required": true,
        "renewal_frequency": "Each academic year",
        "contact": {
          "agency": "Illinois Department of Veterans' Affairs",
          "website": "https://veterans.illinois.gov/",
          "phone": "1-800-437-9824",
          "email": "dva.seo@illinois.gov"
        }
      },
      "gi_bill_interaction": {
        "can_stack": true,
        "stacking_details": "Use IVG for tuition/fees, GI Bill for housing and books",
        "optimal_strategy": "Maximize IVG first (4 years undergrad), save GI Bill for graduate school"
      },
      "pros_cons": {
        "pros": [
          "Full tuition coverage at all Illinois public institutions",
          "No disability rating required for veteran's use",
          "Can be used for graduate school after undergrad",
          "8-semester limit provides full 4-year degree coverage",
          "Covers significant portion of mandatory fees"
        ],
        "cons": [
          "Illinois residency required (6+ months)",
          "8-semester cap (may not cover some 5-year programs)",
          "Does not cover books or housing",
          "Cannot receive housing allowance from GI Bill while using IVG for tuition",
          "No spouse benefits"
        ]
      },
      "recent_changes": [],
      "success_stories": {
        "annual_recipients": 5000
      }
    },
    {
      "id": "CA",
      "name": "California",
      "program_name": "College Fee Waiver for Veteran Dependents",
      "benefit_level": "extensive",
      "overall_rating": 4,
      "map_color": "#283593",
      "veteran_population": 1640000,
      "veteran_benefits": {
        "available": false,
        "notes": "California's waiver is specifically for veteran dependents, not veterans themselves. Veterans should use federal GI Bill."
      },
      "spouse_benefits": {
        "available": true,
        "coverage": "full_tuition_fees",
        "eligibility": {
          "plans": [
            {
              "plan": "Plan A",
              "veteran_must_be": "Service-connected death OR service-connected total disability (100% P&T)",
              "additional": "Surviving spouse or registered domestic partner of veteran who died of service-connected cause"
            },
            {
              "plan": "Plan B",
              "veteran_must_be": "Died as a result of military service during peacetime",
              "additional": "Death during active duty in peacetime"
            }
          ],
          "age_limit": null
        },
        "institutions_covered": [
          "California Community Colleges",
          "California State University (CSU) system",
          "University of California (UC) system"
        ],
        "estimated_value_4yr_degree": 68000
      },
      "dependent_benefits": {
        "available": true,
        "coverage": "full_tuition_fees",
        "eligibility": {
          "plans": ["Plan A", "Plan B", "Plan C", "Plan D"],
          "age_limit": 27,
          "minimum_age": 14,
          "parent_conditions": "Dependent of veteran with service-connected disability/death under various plan criteria"
        },
        "institutions_covered": [
          "California Community Colleges",
          "California State University (CSU) system",
          "University of California (UC) system"
        ],
        "estimated_value_4yr_degree": 68000,
        "time_limit": "Must use before 27th birthday"
      },
      "application_process": {
        "how_to_apply": "Apply through California Department of Veterans Affairs",
        "required_documents": [
          "CalVet application form",
          "VA disability rating letter or death certificate",
          "Birth certificate or marriage certificate",
          "California residency documentation"
        ],
        "where_to_apply": "CalVet regional offices or online",
        "processing_time": "6-8 weeks",
        "renewal_required": true,
        "renewal_frequency": "Annually",
        "contact": {
          "agency": "California Department of Veterans Affairs",
          "website": "https://www.calvet.ca.gov/",
          "phone": "1-800-952-5626"
        }
      },
      "gi_bill_interaction": {
        "can_stack": false,
        "stacking_details": "Fee waiver cannot be used simultaneously with federal GI Bill benefits for same costs",
        "optimal_strategy": "Choose fee waiver (allows veteran to save GI Bill benefits)"
      },
      "pros_cons": {
        "pros": [
          "Full tuition waiver at all California public colleges/universities",
          "Includes prestigious UC and CSU systems",
          "No cost for associate's, bachelor's, or graduate degrees",
          "Multiple eligibility plans increase access"
        ],
        "cons": [
          "Only for dependents, not veterans themselves",
          "Requires 100% P&T disability or service-connected death",
          "Age limit of 27 for dependent children",
          "Cannot stack with GI Bill benefits",
          "Does not cover books, housing, or some fees"
        ]
      },
      "recent_changes": [],
      "success_stories": {
        "annual_recipients": 4200
      }
    },
    {
      "id": "WY",
      "name": "Wyoming",
      "program_name": "Wyoming Veteran Tuition Benefit",
      "benefit_level": "substantial",
      "overall_rating": 4,
      "map_color": "#3949AB",
      "veteran_population": 46000,
      "veteran_benefits": {
        "available": true,
        "coverage": "full_tuition_fees",
        "credit_hour_limit": null,
        "semester_limit": 8,
        "disability_requirement": "Honorably discharged Wyoming veteran",
        "age_limit": null,
        "institutions_covered": [
          "University of Wyoming",
          "Wyoming community colleges"
        ],
        "covers_tuition": true,
        "covers_fees": true,
        "covers_books": false,
        "covers_housing": false,
        "degree_levels": ["Associate", "Bachelor", "Graduate"],
        "estimated_value_4yr_degree": 42000,
        "can_stack_with_gi_bill": true,
        "residency_requirement": "Wyoming resident",
        "eligibility_details": {
          "service_requirements": "Honorably discharged veteran",
          "discharge_status": "Honorable",
          "residency_length": "One year Wyoming residency prior to application"
        }
      },
      "spouse_benefits": {
        "available": false
      },
      "dependent_benefits": {
        "available": false
      },
      "application_process": {
        "how_to_apply": "Apply through institution's veterans services office",
        "required_documents": [
          "DD-214",
          "Wyoming driver's license (showing 1+ year residency)",
          "Application form from institution"
        ],
        "processing_time": "Varies by institution",
        "contact": {
          "agency": "Wyoming Department of Workforce Services",
          "website": "https://dws.wyo.gov/",
          "phone": "307-777-7671"
        }
      },
      "gi_bill_interaction": {
        "can_stack": true,
        "stacking_details": "Use Wyoming benefit for tuition, GI Bill for housing and books"
      },
      "pros_cons": {
        "pros": [
          "Full tuition and fee coverage",
          "8 semesters covers full 4-year degree",
          "No disability rating required",
          "Covers University of Wyoming and community colleges"
        ],
        "cons": [
          "Wyoming residency required (1 year prior)",
          "No spouse or dependent benefits",
          "Limited to Wyoming institutions only",
          "Does not cover housing or books"
        ]
      },
      "success_stories": {
        "annual_recipients": 800
      }
    },
    {
      "id": "AK",
      "name": "Alaska",
      "program_name": "Alaska Veteran Education Benefit",
      "benefit_level": "limited",
      "overall_rating": 2,
      "map_color": "#9FA8DA",
      "veteran_population": 71000,
      "veteran_benefits": {
        "available": true,
        "coverage": "reduced_tuition",
        "discount_amount": "50% tuition reduction",
        "institutions_covered": ["Alaska public colleges and universities"],
        "estimated_annual_savings": 4000,
        "estimated_value_4yr_degree": 16000,
        "eligibility": "Alaska veteran"
      },
      "spouse_benefits": {
        "available": false
      },
      "dependent_benefits": {
        "available": false
      },
      "pros_cons": {
        "pros": [
          "Helpful discount for Alaska veterans",
          "No disability requirement"
        ],
        "cons": [
          "Only 50% reduction, not full waiver",
          "No spouse or dependent benefits",
          "Limited institutions"
        ]
      }
    }
  ],
  "benefit_categories": {
    "full_tuition_veterans": {
      "state_count": 15,
      "average_value": 75000,
      "states": ["TX", "IL", "FL", "VA", "WI", "..."]
    },
    "full_tuition_dependents": {
      "state_count": 22,
      "average_value": 75000,
      "states": ["TX", "CA", "FL", "VA", "IL", "SC", "WA", "..."]
    },
    "partial_tuition": {
      "state_count": 8,
      "average_value": 25000,
      "states": ["AK", "OR", "KY", "DE", "..."]
    },
    "requires_100_disability": {
      "state_count": 12,
      "states": ["CA (dependents)", "FL (dependents)", "SC", "VA (dependents)", "..."]
    },
    "no_disability_required": {
      "state_count": 11,
      "states": ["TX", "IL", "WI", "CT", "MA", "..."]
    },
    "stackable_with_gi_bill": {
      "state_count": 18,
      "states": ["TX", "IL", "FL", "WI", "WY", "..."]
    }
  },
  "summary_statistics": {
    "states_with_veteran_benefits": 28,
    "states_with_dependent_benefits": 22,
    "states_with_spouse_benefits": 18,
    "average_benefit_value_4yr": 68500,
    "maximum_benefit_value": 150000,
    "total_potential_beneficiaries_nationwide": 12000000,
    "estimated_annual_recipients": 85000,
    "last_updated": "2025-01-15"
  }
}
```

---

## 6. Detailed Mockup Description

### Dashboard Layout (Desktop)

**Left Section: Interactive Map (900px width)**

United States map with color gradient:
- Deep blue: Comprehensive (TX, IL, WI)
- Dark blue: Extensive (FL, CA, VA)
- Medium blue: Substantial (CT, MA, MD)
- Light blue: Moderate (DE, KY, MT)
- Very light blue: Limited (AK, NV)
- Gray: None/Federal minimum only

**Above Map: Active Filters Display**
```
Showing benefits for: [Veterans ✓] [Spouses ✓] [Children ✓]
18 states match your filters | [Edit Filters] [Clear All]
```

**Right Section: Control Panel (600px width)**

**Quick Stats Card:**
```
┌─────────────────────────────────────┐
│  📊 EDUCATION BENEFITS OVERVIEW     │
├─────────────────────────────────────┤
│  28 states: Veteran benefits        │
│  22 states: Dependent benefits      │
│  18 states: Spouse benefits         │
│                                     │
│  Average 4-year value: $68,500      │
│  Maximum value: $150,000            │
└─────────────────────────────────────┘
```

**Filter Panel:**
(Structure shown in Section 4 Interactive Elements)

**Value Calculator Widget:**
(Structure shown in Section 4 Interactive Elements)

**Legend:**
```
┌─────────────────────────────────────┐
│  BENEFIT LEVELS                     │
├─────────────────────────────────────┤
│  [███] Comprehensive ($100K+)       │
│  [███] Extensive ($50K-$100K)       │
│  [███] Substantial ($25K-$50K)      │
│  [███] Moderate ($10K-$25K)         │
│  [███] Limited (Under $10K)         │
│  [░░░] None/Federal Minimum         │
└─────────────────────────────────────┘
```

### State Detail Modal

(Full structure shown in Section 4 Interactive Elements)

Key sections include:
1. Program name and overall rating
2. Total estimated value
3. Beneficiary-specific breakdowns (veteran, spouse, children)
4. Eligibility requirements (expandable)
5. Application process (step-by-step)
6. GI Bill stacking information
7. Pros and cons
8. Recent legislative changes
9. Success stories/statistics
10. Action buttons (calculate, apply, contact)

### Comparison Matrix (Below Map)

**Trigger:** "Compare All States" button or scroll down

**Table Structure:** Horizontal scroll on smaller screens

**Columns:**
1. State (sticky left, sortable)
2. Veteran Benefits (✓/✗/Partial)
3. Spouse Benefits (✓/✗/Partial)
4. Dependent Benefits (✓/✗/Partial)
5. Disability Required (None/10%+/50%+/100%)
6. Credit/Semester Cap (number or "Unlimited")
7. Age Limit (number or "None")
8. Est. 4-Year Value (sortable, color-coded)
9. Stack with GI Bill? (✓/✗)
10. Graduate School? (✓/✗)
11. Actions (View Details)

**Features:**
- Multi-select states to compare side-by-side
- Export to CSV/PDF
- Print-friendly view
- Mobile: Card layout with swipe navigation

**Sort & Filter:**
- Default sort: Benefit value (high to low)
- Filter by beneficiary type
- Filter by disability requirement
- Filter by minimum benefit value

---

## 7. Accessibility Guidelines

### WCAG 2.1 Level AA Compliance

**Color Contrast:**
- All text: 4.5:1 minimum contrast
- Large text: 3:1 minimum
- Interactive elements: 3:1 against backgrounds
- Blue color palette tested with colorblind simulations (Deuteranopia, Protanopia)
- Pattern alternatives available (toggleable): Comprehensive = solid, Extensive = horizontal lines, Substantial = diagonal, Moderate = dots, Limited = stipple, None = empty

**Keyboard Navigation:**
- Tab order: Header → Filters → Map → Calculator → Matrix → Footer
- Arrow keys navigate between states on map (alphabetically or geographically)
- Enter selects state (opens detail modal)
- Escape closes modals
- Space bar toggles filter checkboxes
- Focus indicators: 3px solid blue outline with 2px white inset

**Screen Reader Support:**
- Map has text alternative: "Interactive map showing veteran education benefits by state. 28 states offer benefits to veterans, 22 to dependents. Use Tab to navigate states or skip to comparison table."
- Each state has ARIA label:
  ```html
  <path aria-label="Texas. Comprehensive benefits. Hazlewood Act. Veterans, spouses, and children eligible. 150 credit hours. Estimated value $150,000. Press Enter for full details." role="button" tabindex="0">
  ```
- Filter changes announced via ARIA live region: "Filters applied. 18 states match your criteria."
- Calculator results announced when calculated
- Table properly structured with `<caption>`, `<thead>`, `<th scope="col">`
- Modal has `role="dialog"`, `aria-labelledby`, proper focus management

**Touch Targets:**
- Minimum 44×44px for all interactive elements
- Map states: 48×48px tap area on mobile
- Filter checkboxes: 48×48px including label
- Adequate spacing: 8px minimum between elements

**Forms (Calculator):**
- Clear, descriptive labels for all inputs
- Fieldset/legend for radio button groups
- Error messages specific and actionable
- Inline validation
- Success confirmation with ARIA announcement

**Motor Impairments:**
- No hover-only functionality (always have click alternative)
- No time limits
- Sticky navigation (calculator/filters remain accessible)
- Large click targets
- Undo capability (remove filters easily)

**Cognitive Accessibility:**
- Progressive disclosure (details hidden until requested)
- Consistent icon meanings and colors
- Clear visual hierarchy (size, weight, color, spacing)
- Plain language (Flesch Reading Ease: 65+, Grade Level: 9-10)
- Glossary tooltips for education terms (credit hours, semester, tuition vs. fees)
- Key information in multiple formats (visual map, table, text descriptions)
- Breadcrumbs for navigation
- Confirmation for major actions

**Visual Accommodations:**
- Browser zoom to 200% without horizontal scroll
- High contrast mode toggle
- Respect `prefers-reduced-motion` (disable animations)
- Adjustable text size
- Resizable text inputs

---

## 8. Technical Implementation Notes

### Technology Stack

**Frontend:**
- **Framework:** React 18+ with TypeScript
- **State Management:** Redux Toolkit or Zustand (manage filters, selected states, calculator inputs)
- **Mapping:** D3.js + TopoJSON for US map
- **Data Visualization:** Recharts for value charts
- **Styling:** Tailwind CSS with custom extensions
- **Forms:** React Hook Form (calculator validation)
- **Data Fetching:** React Query (cache state data, handle stale data)

**Data Management:**
- JSON files for state education data (~200KB total)
- Separate JSON for each state's detailed information (loaded on-demand)
- Master index with summary statistics
- Version control with changelog

**Calculator Logic:**
```javascript
function calculateBenefitValue(state, degreeType, beneficiary, disabilityStatus) {
  const stateData = getStateEducationData(state);
  const beneficiaryData = getBeneficiaryData(stateData, beneficiary);

  if (!beneficiaryData.available) {
    return { eligible: false, value: 0, message: "Benefit not available for this beneficiary type" };
  }

  // Check disability requirement
  if (beneficiaryData.disability_requirement &&
      disabilityStatus < beneficiaryData.disability_requirement) {
    return { eligible: false, value: 0, message: "Does not meet disability requirement" };
  }

  // Calculate based on degree type
  let creditHoursNeeded;
  switch(degreeType) {
    case 'associate':
      creditHoursNeeded = 60;
      break;
    case 'bachelor':
      creditHoursNeeded = 120;
      break;
    case 'graduate':
      creditHoursNeeded = 30; // typical master's
      break;
  }

  // Check credit limit
  if (beneficiaryData.credit_hour_limit &&
      creditHoursNeeded > beneficiaryData.credit_hour_limit) {
    // Partial coverage
    const percentCovered = beneficiaryData.credit_hour_limit / creditHoursNeeded;
    const value = beneficiaryData.estimated_value_4yr_degree * percentCovered;
    return {
      eligible: true,
      value,
      partial: true,
      message: `Covers ${beneficiaryData.credit_hour_limit} of ${creditHoursNeeded} needed credit hours`
    };
  }

  // Full coverage
  const value = degreeType === 'associate'
    ? beneficiaryData.estimated_value_4yr_degree * 0.5
    : beneficiaryData.estimated_value_4yr_degree;

  return {
    eligible: true,
    value,
    partial: false,
    canStackWithGIBill: beneficiaryData.can_stack_with_gi_bill,
    coversTuition: beneficiaryData.covers_tuition,
    coversFees: beneficiaryData.covers_fees,
    coversBooks: beneficiaryData.covers_books
  };
}
```

**Performance:**
- Lazy load state detail data (code splitting)
- Memoize expensive filter operations
- Virtualize comparison table (only render visible rows)
- Debounce calculator inputs (prevent excessive re-renders)
- Service worker for offline access to previously viewed states
- CDN for static assets

**Data Updates:**
- Annual review (July) before fall semester
- Mid-year check (January) for legislative changes
- Version tracking with effective dates
- Changelog for users to see what's changed

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

### SEO & Social Sharing

**Meta Tags:**
```html
<title>Free College Tuition for Veterans by State | Education Benefits Comparison 2025</title>
<meta name="description" content="Compare state tuition waiver programs for veterans, spouses, and dependents across all 50 states. Find free college opportunities worth up to $150,000.">
```

**Open Graph:**
```html
<meta property="og:title" content="State Tuition Waivers: Free College for Veterans & Families">
<meta property="og:description" content="28 states offer free tuition to veterans. 22 states offer benefits to dependents. Discover your state's education benefits.">
<meta property="og:image" content="/images/state-education-benefits-map-og.png">
```

**Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "name": "State Veteran Education Benefits",
  "description": "Interactive comparison of state tuition waiver programs for military veterans and their families",
  "provider": {
    "@type": "Organization",
    "name": "Military Transition Toolkit"
  }
}
```

### Analytics Tracking

**Events:**
- Filter applications (which filters used)
- State selections (which states most viewed)
- Calculator usage (inputs, results)
- Modal opens (which states)
- Comparison matrix interactions
- Application form link clicks
- PDF downloads
- External links to state agencies

**Custom Dimensions:**
- User's state (if provided/detected)
- Beneficiary type selected (veteran/spouse/child)
- Disability status entered
- Degree type interest

**Goal Tracking:**
- State application link clicks (indicates serious interest)
- Calculator completions
- PDF guide downloads
- Email inquiries to state agencies (if trackable)

---

## 9. Content Requirements

### Page Header

**Headline:**
"Free College for Veterans: State Tuition Waiver Programs by State (2024-2025)"

**Subheadline:**
"28 states offer free tuition to veterans. 22 states extend benefits to children and spouses. Discover education benefits worth up to $150,000 for your family—separate from GI Bill®."

**Key Statistics (Hero Section):**
- 28 states: Free tuition for veterans
- 22 states: Benefits for children
- 18 states: Benefits for spouses
- Values up to $150,000 per beneficiary
- 85,000+ veterans and families benefit annually

### Introduction

"College costs average $50,000+ for a four-year degree—but many veterans and military families can attend public universities for free through state tuition waiver programs. Unlike the federal GI Bill®, which most veterans already know about, these state programs are lesser-known but incredibly valuable. Texas's Hazlewood Act provides up to 150 credit hours free (covering bachelor's + graduate school). Illinois offers free tuition for 8 semesters with no disability requirement. Wisconsin, Florida, Virginia, and many other states have comprehensive programs. Best of all: many of these benefits can be used alongside GI Bill® benefits, and some can be transferred to spouses and children. Use this interactive tool to discover what your state offers."

### Educational Sidebar: "State Benefits vs. GI Bill®"

```
FEDERAL POST-9/11 GI BILL®
✓ Available to eligible veterans nationwide
✓ Covers tuition + housing + books
✓ 36 months of benefits
✓ Transferable to spouse/children (conditions apply)
✗ Exhaustible (once used, it's gone)
✗ Housing allowance often needed to cover living costs

STATE TUITION WAIVERS (Select States)
✓ Free tuition at public universities
✓ Often stackable with GI Bill® (use GI Bill® for housing/books)
✓ Some have no credit/semester limits
✓ Some don't require disability ratings
✓ Some extend to spouses and children automatically
✗ Limited to state residents
✗ Only covers tuition/fees (not housing/books)
✗ Some require 100% disability or service-connected death

OPTIMAL STRATEGY:
If your state offers comprehensive tuition waivers, use them for tuition and save your GI Bill® months for:
• Graduate school
• Out-of-state programs
• Private universities
• Housing allowance (if state benefit doesn't stack)
• Transferring remaining months to children
```

### Glossary (Tooltips)

**Tuition:** The cost of instruction/classes, typically charged per credit hour or semester.

**Fees:** Additional costs beyond tuition (student activity fees, technology fees, lab fees, etc.). State waivers may or may not cover fees.

**Credit Hour:** Unit of measurement for coursework. Typical bachelor's degree = 120 credit hours.

**Semester:** Academic term, usually 15-16 weeks. Most degrees require 8 semesters.

**100% P&T:** Permanent and Total disability rating from VA (highest disability level).

**Service-Connected:** Disability or death caused by military service.

**Surviving Spouse:** Spouse of a veteran who died due to service-connected causes.

**Dependent:** Child, stepchild, or adopted child of a veteran.

**Stacking:** Using multiple benefits together (e.g., state waiver for tuition + GI Bill® for housing).

**In-State Tuition:** Lower tuition rate for state residents (typically 50-70% less than out-of-state tuition).

### FAQ Section

**Q: Can I use both a state tuition waiver and my GI Bill® at the same time?**
A: It depends on the state. Many states allow "stacking"—you can use the state waiver for tuition and the GI Bill® for housing allowance and books. However, you typically cannot receive duplicate benefits for the same expense (e.g., tuition covered by both). Check your state's specific rules in the detail panel.

**Q: If my state has a tuition waiver, should I use it or my GI Bill®?**
A: Generally, use the state waiver first (if eligible) because:
• It saves your GI Bill® months for graduate school or other needs
• State waivers often have no time limit, while GI Bill® has 36-month cap
• You can transfer unused GI Bill® months to your kids
• You can use GI Bill® housing allowance (BAH) alongside some state waivers

**Q: My state doesn't offer veteran tuition waivers. What are my options?**
A: You still have the federal Post-9/11 GI Bill®, which is excellent and works nationwide. Additionally:
• Check if neighboring states offer benefits to non-residents
• Some states offer benefits to spouses/children even if not to veterans directly
• Consider states with robust benefits if you're open to relocating
• Look into federal scholarships and VA vocational rehabilitation

**Q: I'm 100% disabled. What extra benefits might my family qualify for?**
A: Many states extend tuition waivers to spouses and children of 100% P&T disabled veterans. States with particularly strong dependent benefits include:
• Texas: Hazlewood Act for spouses and children
• California: Fee waiver for dependents
• Florida: CSDDV scholarship for dependents
• Illinois: MIA/POW scholarship for children
• South Carolina: Free tuition for children
• Wisconsin: Wisconsin GI Bill® for children

**Q: Are there age limits for using these benefits?**
A: It varies by state:
• Veterans: Usually no age limit
• Spouses: Usually no age limit (but may have time limits after veteran's death)
• Children: Often must use before age 26-27 (similar to Dependent GI Bill®)
Always check your specific state's rules.

**Q: Do these benefits cover graduate school?**
A: Many do! States like Texas, Illinois, and Wisconsin cover graduate school. Check each state's "Degree Levels" in the detail panel.

**Q: What if I already have a degree? Can I get a second one using a state waiver?**
A: It depends. Some states allow multiple degrees (e.g., bachelor's then master's). Others limit to one undergraduate degree. Check specific state restrictions.

**Q: Do I need to live in the state while attending college?**
A: Most states require residency before and during attendance. However, residency requirements vary (some require 6 months, others 1 year). Check your state's residency requirement in the detail panel.

### Call-to-Action Elements

**Primary CTA:**
"Find Your State's Benefits" (scrolls to map or highlights user's state)

**Secondary CTA:**
"Calculate Your Benefit Value" (opens calculator widget)

**Tertiary CTA:**
"Download Complete State Guide (PDF)" - 50-state reference booklet

**Per-State CTAs (in modals):**
- "Calculate My Value for This State"
- "Download Application Form"
- "Contact [State Agency Name]"
- "Visit [State Agency Website]"
- "Email State Education Office"

### Disclaimers

"Education benefit information is current as of [date]. State programs, eligibility requirements, and benefit amounts are subject to change based on state budgets and legislation. GI Bill® is a registered trademark of the U.S. Department of Veterans Affairs (VA). This tool is for informational purposes only and does not guarantee eligibility or benefits. Always verify current requirements and benefits with your state veterans affairs office and institution's financial aid office before making enrollment decisions. Consult with a VA-certified education counselor for personalized guidance."

---

## 10. Success Metrics

### Engagement Metrics
- Map interaction rate: Target 85%+ of visitors
- Filter usage: Target 60%+ of visitors
- Calculator usage: Target 55%+ of visitors
- Detail modal opens: Target 2.8 states viewed per session
- Comparison matrix engagement: Target 40%+ of visitors
- Average time on page: Target 7+ minutes (education decisions are complex)

### Task Completion
- Users can identify if their state offers benefits: 95%+ success
- Users can determine beneficiary eligibility (veteran/spouse/child): 92%+ success
- Users can calculate potential benefit value: 88%+ success
- Users can find application process: 93%+ success
- Users can determine GI Bill® stacking rules: 85%+ success

### Conversion Metrics
- State agency website clicks: Target 30%+ of detail panel viewers
- Application form downloads: Target 20%+ of eligible users
- Calculator completions: Target 70%+ of users who open calculator
- PDF guide downloads: Target 25%+ of visitors
- "Contact state agency" clicks: Target 15%+ of interested users

### User Satisfaction
- Post-visit survey: "Did this tool help you understand state education benefits?" Target 94%+ "Yes"
- "Did you discover a benefit you didn't know existed?" Target 65%+ "Yes" (high discovery rate expected)
- "Will this benefit influence your college or relocation decisions?" Target 55%+ "Yes"
- Net Promoter Score: Target 60+

### Impact Metrics
- Track conversions to actual benefit applications (if state agencies can share data)
- User-reported outcomes: "I applied for benefits based on this tool" (6-month follow-up survey)
- Estimated total benefit value realized by users (if reportable)

---

## 11. Production Timeline & Resources

### Phase 1: Research & Data Collection (4 weeks)

**Weeks 1-2: State Program Research**
- Contact all 50 state veterans affairs offices
- Verify tuition waiver programs, eligibility criteria
- Collect benefit amounts, credit/semester caps, age limits
- Document application processes
- **Resources:** 2 Research Analysts, 80 hours total

**Week 3: Dependent & Spouse Benefit Research**
- Verify dependent and spouse eligibility rules
- Collect age limits, relationship requirements
- Document 100% P&T requirements
- Research surviving spouse benefits
- **Resources:** 2 Research Analysts, 80 hours total

**Week 4: Data Validation & Value Calculations**
- Cross-reference with university financial aid offices
- Calculate estimated benefit values (tuition × credit hours)
- Verify GI Bill® stacking rules with VA
- Structure JSON data files
- Create data dictionary
- **Resources:** 1 Research Analyst, 1 Education Policy Specialist, 60 hours total

### Phase 2: Design (2.5 weeks)

**Weeks 5-6: UX/UI Design**
- Wireframe multi-filter map interface
- Design state detail modals
- Create beneficiary icons (veteran/spouse/child)
- Design calculator interface
- Mockup comparison matrix
- **Resources:** 1 UI/UX Designer, 80 hours

**Week 7 (partial): Responsive & Accessibility Design**
- Design tablet/mobile layouts
- Create component library
- Design system documentation (Figma)
- Accessibility annotations
- **Resources:** 1 UI/UX Designer, 20 hours

### Phase 3: Development (6 weeks)

**Week 7 (continued) - Week 8: Map & Filter System**
- Set up React + TypeScript project
- Implement D3.js map
- Build multi-layer filter system
- Dynamic state coloring based on filters
- **Resources:** 1 Senior Frontend Developer, 60 hours

**Week 9: State Detail Modals**
- Build modal components
- Expandable sections (eligibility, application, etc.)
- Connect to state JSON data
- Beneficiary-specific views (veteran/spouse/child tabs)
- **Resources:** 1 Frontend Developer, 40 hours

**Week 10: Calculator & Value Estimation**
- Build calculator UI
- Implement benefit calculation logic
- Real-time updates and validation
- Results display with visual indicators
- PDF generation for results
- **Resources:** 1 Frontend Developer, 40 hours

**Week 11: Comparison Matrix**
- Sortable/filterable table
- Virtual scrolling (performance optimization)
- Multi-select states for side-by-side comparison
- Export functionality (CSV, PDF, Excel)
- Mobile card view
- **Resources:** 1 Frontend Developer, 40 hours

**Week 12: Integration & Polish**
- Connect all components
- State management (filters, selections)
- Routing and deep linking
- Loading states, error handling
- Animations and transitions
- Performance optimization (code splitting, lazy loading)
- **Resources:** 1 Senior Frontend Developer, 40 hours

**Week 13 (partial): Cross-Browser Testing**
- Test on Chrome, Firefox, Safari, Edge
- Test on iOS Safari, Android Chrome
- Fix compatibility issues
- **Resources:** 1 Frontend Developer, 20 hours

### Phase 4: Testing & Launch (2.5 weeks)

**Week 13 (continued) - Week 14: QA & Accessibility**
- Functional testing (all features, filters, calculations)
- WCAG 2.1 AA audit
- Screen reader testing (JAWS, NVDA, VoiceOver)
- Keyboard navigation verification
- Performance testing (Lighthouse, WebPageTest)
- Calculation accuracy verification
- **Resources:** 1 QA Tester, 1 Accessibility Specialist, 80 hours total

**Week 15: User Testing & Refinement**
- Usability testing with 12 participants:
  - 4 veterans
  - 4 spouses
  - 4 dependents/young adults
- Calculator accuracy validation with education counselors
- Filter usability verification
- Bug fixes and refinements
- Content review (legal disclaimers, accuracy)
- Final documentation
- Launch preparation
- **Resources:** 1 UX Researcher, 1 QA Tester, 1 Frontend Developer, 1 Education Policy Specialist, 100 hours total

### Total Timeline: 15 weeks

### Resource Summary
- Research Analysts: 220 hours
- Education Policy Specialist: 90 hours
- UI/UX Designer: 100 hours
- Senior Frontend Developer: 100 hours
- Frontend Developers: 140 hours
- QA Tester: 80 hours
- Accessibility Specialist: 40 hours
- UX Researcher: 40 hours
- **Total: 810 person-hours**

### Budget Estimate
- Research Analysts: 220 hrs × $50/hr = $11,000
- Education Policy Specialist: 90 hrs × $65/hr = $5,850
- UI/UX Designer: 100 hrs × $75/hr = $7,500
- Senior Frontend Developer: 100 hrs × $95/hr = $9,500
- Frontend Developers: 140 hrs × $85/hr = $11,900
- QA Tester: 80 hrs × $60/hr = $4,800
- Accessibility Specialist: 40 hrs × $70/hr = $2,800
- UX Researcher: 40 hrs × $65/hr = $2,600
- **Total: $55,950**

### Ongoing Maintenance
- Annual data updates (contact all 50 states): 60 hours ($3,000/year)
- Legislative monitoring: 8 hours/quarter ($1,600/year)
- Mid-year benefit updates: 20 hours ($1,000/year)
- Calculator accuracy updates: 12 hours/year ($1,000/year)
- **Annual maintenance: $6,600**

---

## 12. Future Enhancements

### Phase 2 Features

1. **School-Specific Lookup**
   - Search by specific university/college name
   - See which state programs apply at that institution
   - Link to school's veterans services office

2. **Career ROI Calculator**
   - Combine education benefit value with expected post-graduation salary
   - Calculate return on investment for different degree programs
   - Factor in GI Bill® housing allowance if applicable

3. **Multi-State Comparison**
   - Compare benefits across 2-4 states side-by-side
   - Useful for families considering relocation
   - Show total family benefit value if multiple beneficiaries

4. **GI Bill® Optimization Tool**
   - Model scenarios: Use state benefit vs. use GI Bill®
   - Calculate optimal strategy for family
   - Consider transferability to children

5. **Community Reviews & Tips**
   - Verified beneficiaries share application experiences
   - Rate ease of application process
   - Crowdsource processing times
   - Success tips for each state

6. **Legislative Tracker**
   - Track pending legislation affecting veteran education benefits
   - Email alerts when user's state proposes changes
   - Historical trend: Are benefits expanding or contracting?

7. **Surviving Spouse/Gold Star Family View**
   - Dedicated interface for families of deceased service members
   - Highlight survivor-specific benefits
   - Resources for Gold Star families

8. **Mobile App**
   - Save favorite states
   - Application document checklist
   - Deadline reminders
   - Offline access to state information

9. **Integration with School Search**
   - Connect to college/university databases
   - Filter schools by acceptance of state benefits
   - Link to VA-approved schools database

---

## 13. Related Visualizations

This visualization pairs excellently with:
- **Spec #011:** Income Tax Exemption on Military Retirement Pay (Relocation decisions for families)
- **Spec #012:** Vehicle Registration Fee Exemptions (Additional cost-of-living factors)
- **Spec #013:** Hunting/Fishing License Benefits (Quality of life for families)
- **Spec #014:** State Veteran Home Loan Programs (Overall financial planning)
- **Future:** K-12 Education Benefits for Military Children
- **Future:** Comprehensive State Relocation Decision Tool for Military Families
- **Future:** Federal vs. State Education Benefits Comparison
- **Future:** Career Outcomes by Degree Program for Veterans

### Dashboard Integration Opportunity

Consider creating a "Military Family Education Planning Dashboard" that combines:
- This state tuition waiver tool
- GI Bill® calculator
- School search (VA-approved programs)
- Career outcome data by degree
- ROI analysis
Creating a comprehensive education decision-making platform for military families.

---

## Document Metadata

**Specification Number:** 015
**Version:** 1.0
**Date Created:** January 15, 2025
**Author:** Military Transition Toolkit Team
**Status:** Ready for Development
**Next Review Date:** July 2025 (before fall semester)
**Dependencies:** None
**Related Specs:** 011, 012, 013, 014
**Data Sensitivity:** No PII; public program information
**Legal Review Required:** Yes (GI Bill® trademark usage, benefit accuracy disclaimers)
**Education Policy Review Recommended:** Yes (verify benefit descriptions with education professionals)
