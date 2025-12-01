---
date: "2026-02-05"
---# Data Visualization Specification #013: State Hunting and Fishing License Benefits for Veterans

## 1. Overview

### Title
**Outdoor Recreation Access: Free and Reduced-Cost Hunting & Fishing Licenses for Veterans by State (2024)**

### Purpose
This visualization helps veterans discover hunting and fishing license benefits across all 50 states, including free licenses, reduced fees, lifetime permits, and disability-based exemptions. With outdoor recreation serving as both recreation and mental health therapy for many veterans, understanding these often-overlooked benefits can significantly enhance quality of life while saving hundreds of dollars annually.

### Target Audience
- Veterans who hunt, fish, or are interested in outdoor recreation (ages 25-75)
- Disabled veterans seeking therapeutic outdoor activities
- Military retirees planning relocation to states with outdoor recreation
- Veteran service organizations promoting outdoor therapy programs
- State wildlife agencies seeking to benchmark veteran benefits

### Key Questions Answered
- Does my state offer free or reduced-cost hunting and fishing licenses for veterans?
- What disability rating is required to qualify?
- Can I get a lifetime license, or is it annual?
- Which states honor licenses for non-resident veterans?
- What's the financial value of these benefits?
- Which states offer the most comprehensive outdoor recreation benefits?

---

## 2. Data Sources

### Primary Sources

1. **State Wildlife/Natural Resources Departments (All 50 States)**
   - Individual verification from official state agencies
   - Examples:
     - Texas Parks & Wildlife: https://tpwd.texas.gov/regulations/outdoor-annual/licenses/
     - Illinois DNR: https://veterans.illinois.gov/services-benefits/permits.html
     - Georgia DNR: https://veterans.georgia.gov/hunting-and-fishing-licenses
     - Virginia DWR: https://dwr.virginia.gov/veterans/
     - Washington DFW: https://wdfw.wa.gov/accessibility/eligibility-requirements-veterans-reduced-fees
   - Data Type: License types, fees, eligibility, application processes
   - Update Frequency: Annual (before hunting/fishing season)

2. **Congressional Sportsmen's Foundation**
   - URL: https://congressionalsportsmen.org/policy/seniors-veterans-and-active-duty-military-hunting-and-angling-privileges/
   - Data Type: Comprehensive state-by-state policy analysis
   - Last Updated: 2024
   - Reliability: Advocacy organization tracking policy nationwide

3. **VA Claims Insider - Non-Resident Veteran Benefits**
   - Hunting: https://vaclaimsinsider.com/non-resident-disabled-veteran-hunting-license-by-state/
   - Fishing: https://vaclaimsinsider.com/non-resident-disabled-veteran-fishing-license-by-state/
   - Data Type: Non-resident privilege analysis
   - Last Updated: 2024

4. **Military Benefits Databases**
   - GI Jobs veteran fishing license guide: https://www.gijobs.com/veteran-fishing-license-discounts-and-exemptions
   - My Military Benefits: https://mymilitarybenefits.com/benefits/military-discounts-on-hunting-and-fishing-licenses-by-state/
   - Data Type: Benefit summaries with annual dollar values

5. **State Veterans Affairs Departments**
   - Official state veteran benefit booklets
   - Application procedures and forms
   - Contact information for licensing assistance

### Data Collection Methodology
- Direct verification with all 50 state wildlife agencies (phone/email verification)
- Cross-reference with at least three independent sources per state
- Disability rating requirements verified against state statutes
- Pricing data collected from 2024 state license fee schedules

### Data Collection Date
November 2024 - January 2025

---

## 3. Visualization Type

### Primary Visualization
**Interactive Choropleth Map with Benefit Category Icons**

### Rationale
A choropleth map colored by benefit level with overlay icons showing specific benefit types provides:
- Immediate geographic overview of veteran-friendly outdoor recreation states
- Color intensity indicating generosity of benefits
- Icons communicating specific benefit types at a glance
- Regional pattern recognition (Northeast particularly veteran-friendly)
- Foundation for relocation decision-making

### Secondary Visualization
**Benefit Value Calculator (Interactive Widget)**

Users input:
- Current state
- Veteran status / disability rating
- Planned hunting/fishing activities
- Years until age 65 (for age-based benefits)

Output:
- Annual savings
- Lifetime savings projection
- Eligibility confirmation
- Application instructions

### Tertiary Visualization
**Multi-Dimensional Comparison Matrix**

Sortable table showing:
- State
- Free hunting? (Y/N)
- Free fishing? (Y/N)
- Lifetime option? (Y/N)
- Disability requirement
- Non-resident benefit? (Y/N)
- Est. annual value

---

## 4. Design Specifications

### Color Palette

**Benefit Level (Choropleth Base):**
- **Comprehensive (Free hunting + fishing + lifetime option):** `#1B5E20` (Dark Green)
- **Extensive (Free hunting + fishing, annual):** `#388E3C` (Medium-Dark Green)
- **Substantial (Free fishing OR hunting + significant discounts):** `#66BB6A` (Medium Green)
- **Moderate (Reduced fees, 50%+ discount):** `#AED581` (Light Green)
- **Limited (Reduced fees, <50% discount):** `#E0F2F1` (Very Light Green/Teal)
- **Minimal/None (No veteran-specific benefits):** `#F5F5F5` (Off-white/Gray)

**Disability Rating Requirements (Icon Border Color):**
- **10%+ Disability:** `#0D47A1` (Dark Blue)
- **30%+ Disability:** `#1976D2` (Medium Blue)
- **50%+ Disability:** `#42A5F5` (Light Blue)
- **100% Disability:** `#01579B` (Navy Blue)
- **Any Veteran (No Disability):** `#4CAF50` (Green)
- **Active Duty/Specific Criteria:** `#FF6F00` (Orange)

**License Type Icons (On Map):**
- Hunting: Deer silhouette icon, `#8D6E63` (Brown)
- Fishing: Fish silhouette icon, `#0288D1` (Blue)
- Combo: Overlapping icons
- Lifetime: Gold star in corner, `#FFA000` (Gold)
- Non-Resident Honor: Flag icon, `#7B1FA2` (Purple)

**UI Foundation:**
- Background: `#FAFAFA` (Off-white)
- Water Bodies: `#B3E5FC` (Light Blue)
- State Borders: `#9E9E9E` (Medium Gray, 1px)
- Text Primary: `#212121` (Dark Gray)
- Text Secondary: `#757575` (Medium Gray)
- Accent/Links: `#1565C0` (Deep Blue)
- Success/Positive: `#2E7D32` (Dark Green)
- Warning: `#F57C00` (Orange)

### Typography

**Primary Font: Source Sans Pro** (Designed for readability at small sizes, excellent for data-heavy interfaces)

- Map Title: Source Sans Pro Bold, 36px, `#212121`
- Section Headers: Source Sans Pro Semibold, 24px, `#212121`
- State Names (on map, zoom level 2+): Source Sans Pro Regular, 10px, `#424242`
- Legend Labels: Source Sans Pro Regular, 14px, `#616161`
- Benefit Values: Source Sans Pro Semibold, 18px, `#2E7D32`
- Detail Panel Headers: Source Sans Pro Bold, 22px, `#212121`
- Detail Panel Body: Source Sans Pro Regular, 16px, `#424242`
- Data Table Headers: Source Sans Pro Semibold, 14px, `#212121`
- Data Table Content: Source Sans Pro Regular, 14px, `#424242`
- Calculator Widget: Source Sans Pro Regular, 16px, `#424242`
- Disclaimer Text: Source Sans Pro Light, 12px, `#9E9E9E`

**Fallback Stack:**
```css
font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

### Icon System

**Hunting Icon (Deer):**
```svg
<svg viewBox="0 0 24 24">
  <path fill="#8D6E63" d="M12,2C12,2..."/> <!-- Stylized deer silhouette -->
</svg>
```
Size: 20×20px on map, 32×32px in legend

**Fishing Icon (Fish):**
```svg
<svg viewBox="0 0 24 24">
  <path fill="#0288D1" d="M12,8C12,8..."/> <!-- Stylized fish silhouette -->
</svg>
```
Size: 20×20px on map, 32×32px in legend

**Lifetime Badge:**
Gold star (12×12px) positioned top-right corner of state

**Non-Resident Badge:**
Small flag icon (10×10px) positioned bottom-right corner

**Icon Positioning:**
Icons arranged in 2×2 grid within each state boundary (when multiple types present)

### Layout Dimensions

**Desktop (1920×1080)**
- Map Container: 1200px × 900px (primary focus, left 2/3 of screen)
- Right Sidebar: 400px × 900px (legend, calculator, filters)
- Comparison Matrix: Full width, 1600px × 600px (below map, collapsible)
- Margins: 40px outer, 24px internal

**Tablet (768×1024)**
- Map Container: 720px × 550px
- Sidebar: Full width, 720px (below map, collapsible sections)
- Comparison Matrix: Full width with horizontal scroll
- Margins: 24px outer, 16px internal

**Mobile (375×667)**
- Map Container: 350px × 450px (vertical scroll to see full map)
- Sidebar: Full width, accordion sections (collapsed by default)
- Calculator: Simplified, 1-column layout
- Comparison Matrix: Card-based layout, vertical scroll
- Margins: 16px outer, 12px internal

### Interactive Elements

**State Hover:**
- State brightens by 15% luminosity
- White border (2px) highlights state boundary
- Tooltip appears with 150ms fade-in

**State Click/Tap:**
- Detail panel slides in from right (desktop) or up from bottom (mobile)
- Map slightly dims (overlay: `rgba(0,0,0,0.3)`)
- Breadcrumb shows: Home > [State Name] > Hunting & Fishing Benefits

**Icon Hover (Desktop):**
- Icon scales to 120% with smooth transition
- Descriptive label appears below icon

**Filter Interactions:**
- Toggle switches for: Hunting, Fishing, Lifetime, Non-Resident
- Slider for disability rating (0%, 10%, 30%, 50%, 100%)
- States not matching filter fade to 30% opacity
- Active filter count badge shows number of states matching

**Calculator Widget:**
- Real-time calculation as user adjusts inputs
- Results animate on change (count-up animation for dollar amounts)
- "See My State's Details" button (scrolls to map and highlights state)

---

## 5. Sample Data Structure

### Data Schema (JSON)

```json
{
  "states": [
    {
      "id": "TX",
      "name": "Texas",
      "benefit_level": "comprehensive",
      "map_color": "#1B5E20",
      "veteran_population": 1560000,
      "hunting_benefits": {
        "free_license": true,
        "license_type": "Super Combo Package",
        "disability_requirement": "50% or limb loss/use",
        "includes": [
          "All-game hunting",
          "All-water fishing",
          "Freshwater fishing",
          "Saltwater fishing"
        ],
        "resident_only": false,
        "non_resident_eligible": true,
        "lifetime_option": false,
        "regular_license_cost": 315.00,
        "annual_savings": 315.00,
        "application_process": "Present VA disability letter to TPWD",
        "effective_date": "Historical",
        "recent_changes": "None"
      },
      "fishing_benefits": {
        "free_license": true,
        "license_type": "Included in Super Combo",
        "disability_requirement": "50% or limb loss/use",
        "includes": [
          "All-water fishing",
          "Freshwater fishing",
          "Saltwater fishing"
        ],
        "resident_only": false,
        "non_resident_eligible": true,
        "lifetime_option": false,
        "regular_license_cost": 68.00,
        "annual_savings": "Included in combo",
        "application_process": "Same as hunting"
      },
      "icons": {
        "hunting": true,
        "fishing": true,
        "combo": true,
        "lifetime": false,
        "non_resident": true
      },
      "total_annual_value": 315.00,
      "lifetime_value_estimate": 7875.00,
      "eligibility": {
        "minimum_disability": 50,
        "alternative_criteria": "Loss of use of foot or leg",
        "residency_required": false,
        "age_restrictions": "None",
        "documentation": [
          "VA disability rating letter (50%+)",
          "OR medical certification of limb loss/use"
        ]
      },
      "application_info": {
        "how_to_apply": "Present documentation to Texas Parks & Wildlife Department or authorized retailer",
        "processing_time": "Immediate",
        "renewal_required": true,
        "renewal_frequency": "Annual",
        "agency": "Texas Parks & Wildlife Department",
        "website": "https://tpwd.texas.gov/",
        "phone": "1-800-792-1112"
      },
      "additional_notes": [
        "One of the most comprehensive veteran hunting/fishing benefits in the nation",
        "Covers both residents and non-residents",
        "Includes all hunting and fishing privileges statewide"
      ]
    },
    {
      "id": "IL",
      "name": "Illinois",
      "benefit_level": "comprehensive",
      "map_color": "#1B5E20",
      "veteran_population": 628000,
      "hunting_benefits": {
        "free_license": true,
        "license_type": "Combination Hunting & Fishing",
        "disability_requirement": "10% or total disability pension",
        "includes": [
          "Resident hunting",
          "Habitat stamp",
          "State waterfowl stamp"
        ],
        "resident_only": true,
        "non_resident_eligible": false,
        "lifetime_option": false,
        "regular_license_cost": 45.00,
        "annual_savings": 45.00,
        "application_process": "Apply online or at IDNR office with VA documentation",
        "effective_date": "Historical",
        "recent_changes": "Expanded to include 10%+ disability (previously 50%+)"
      },
      "fishing_benefits": {
        "free_license": true,
        "license_type": "Included in combination license",
        "disability_requirement": "10% or total disability pension",
        "includes": [
          "Resident fishing",
          "All species"
        ],
        "resident_only": true,
        "non_resident_eligible": false,
        "lifetime_option": false,
        "regular_license_cost": 31.50,
        "annual_savings": "Included in combo"
      },
      "icons": {
        "hunting": true,
        "fishing": true,
        "combo": true,
        "lifetime": false,
        "non_resident": false
      },
      "total_annual_value": 76.50,
      "lifetime_value_estimate": 1912.50,
      "eligibility": {
        "minimum_disability": 10,
        "alternative_criteria": "OR receiving total disability pension benefits",
        "residency_required": true,
        "age_restrictions": "None",
        "documentation": [
          "VA disability compensation letter (10%+)",
          "OR total disability pension documentation"
        ]
      },
      "application_info": {
        "how_to_apply": "Online at Illinois DNR website or at any IDNR office",
        "processing_time": "Immediate (online) or same-day (in-person)",
        "renewal_required": true,
        "renewal_frequency": "Annual",
        "agency": "Illinois Department of Natural Resources",
        "website": "https://www.dnr.illinois.gov/",
        "phone": "217-782-6384"
      },
      "additional_notes": [
        "One of the lowest disability thresholds nationwide (10%)",
        "Regardless of state of residency for eligibility - means non-Illinois residents with 10%+ disability also qualify if they reside in Illinois"
      ]
    },
    {
      "id": "CO",
      "name": "Colorado",
      "benefit_level": "substantial",
      "map_color": "#66BB6A",
      "veteran_population": 401000,
      "hunting_benefits": {
        "free_license": false,
        "lifetime_option": true,
        "license_type": "Lifetime Small Game + Fish Combination",
        "disability_requirement": "50% or greater",
        "includes": [
          "Small game hunting",
          "Fishing (all types)",
          "Lifetime validity"
        ],
        "resident_only": true,
        "non_resident_eligible": false,
        "regular_license_cost": 56.83,
        "lifetime_regular_cost": 1500.00,
        "one_time_veteran_cost": 0.00,
        "lifetime_savings": 1500.00,
        "annual_equivalent_savings": 56.83,
        "application_process": "Apply through Colorado Parks & Wildlife with VA documentation",
        "effective_date": "Historical",
        "recent_changes": "None"
      },
      "fishing_benefits": {
        "free_license": false,
        "lifetime_option": true,
        "license_type": "Included in lifetime combination",
        "disability_requirement": "50% or greater",
        "includes": [
          "All fishing types",
          "Lifetime validity"
        ],
        "resident_only": true,
        "non_resident_eligible": false,
        "regular_license_cost": 40.18,
        "annual_savings": "Included in combo"
      },
      "icons": {
        "hunting": true,
        "fishing": true,
        "combo": true,
        "lifetime": true,
        "non_resident": false
      },
      "total_annual_value": 96.00,
      "lifetime_value_estimate": 1500.00,
      "eligibility": {
        "minimum_disability": 50,
        "alternative_criteria": "None",
        "residency_required": true,
        "age_restrictions": "None",
        "documentation": [
          "VA disability rating letter (50%+)",
          "Colorado driver's license or ID"
        ]
      },
      "application_info": {
        "how_to_apply": "Apply in-person at CPW office or authorized agent",
        "processing_time": "Same-day",
        "renewal_required": false,
        "renewal_frequency": "Lifetime",
        "agency": "Colorado Parks & Wildlife",
        "website": "https://cpw.state.co.us/",
        "phone": "303-297-1192"
      },
      "additional_notes": [
        "Lifetime license is a one-time benefit with exceptional long-term value",
        "Does not include big game hunting (elk, deer) - separate tags required"
      ]
    },
    {
      "id": "WY",
      "name": "Wyoming",
      "benefit_level": "limited",
      "map_color": "#E0F2F1",
      "veteran_population": 46000,
      "hunting_benefits": {
        "free_license": false,
        "reduced_fee": false,
        "veteran_specific_benefit": false,
        "notes": "No veteran-specific hunting license benefits"
      },
      "fishing_benefits": {
        "free_license": false,
        "reduced_fee": false,
        "veteran_specific_benefit": false,
        "notes": "No veteran-specific fishing license benefits"
      },
      "icons": {
        "hunting": false,
        "fishing": false,
        "combo": false,
        "lifetime": false,
        "non_resident": false
      },
      "total_annual_value": 0.00,
      "alternative_benefits": {
        "description": "Wyoming offers property tax exemptions for combat veterans applicable to vehicle registration",
        "see_also": "Vehicle Registration Exemptions (Spec #012)"
      },
      "application_info": {
        "agency": "Wyoming Game and Fish Department",
        "website": "https://wgfd.wyo.gov/",
        "phone": "307-777-4600"
      }
    }
  ],
  "benefit_categories": {
    "free_hunting": {
      "state_count": 26,
      "average_annual_value": 180.00,
      "states": ["TX", "IL", "FL", "GA", "MO", "OH", "PA", "SC", "..."]
    },
    "free_fishing": {
      "state_count": 30,
      "average_annual_value": 85.00,
      "states": ["TX", "IL", "FL", "GA", "MO", "OH", "PA", "SC", "..."]
    },
    "lifetime_option": {
      "state_count": 22,
      "average_one_time_value": 1200.00,
      "states": ["CO", "AR", "AL", "CT", "GA", "MD", "..."]
    },
    "non_resident_benefits": {
      "state_count": 13,
      "states": ["TX", "AL", "CA", "GA", "ME", "MO", "MT", "NM", "NC", "RI", "VT", "WA", "WI"]
    },
    "reduced_fee": {
      "state_count": 12,
      "average_discount": "50-75%",
      "states": ["CA", "WA", "ID", "NV", "..."]
    }
  },
  "disability_requirements": {
    "10_percent": {
      "state_count": 3,
      "states": ["IL", "..."],
      "note": "Most accessible threshold"
    },
    "30_percent": {
      "state_count": 2,
      "states": ["WA", "..."]
    },
    "50_percent": {
      "state_count": 15,
      "states": ["TX", "CO", "CA", "ME", "LA", "..."]
    },
    "100_percent": {
      "state_count": 8,
      "states": ["FL", "RI", "AK", "..."]
    },
    "any_veteran": {
      "state_count": 5,
      "states": ["GA", "..."],
      "note": "No disability required"
    }
  },
  "summary_statistics": {
    "states_with_benefits": 43,
    "states_without_benefits": 7,
    "average_annual_savings": 165.00,
    "maximum_annual_savings": 400.00,
    "total_veteran_hunters_fishers_estimate": 3500000,
    "aggregate_benefit_value_nationwide": "577 million annually",
    "last_updated": "2025-01-15"
  }
}
```

---

## 6. Detailed Mockup Description

### Map Component

**Initial View:**
United States map in Albers USA projection, showing all 50 states with Alaska and Hawaii repositioned as insets. States are colored in green gradient from dark (comprehensive benefits) to light (limited benefits), with gray states having no veteran-specific outdoor recreation benefits.

**Visual Pattern Recognition:**
- **Dark Green Concentration:** Texas, Illinois, Georgia, Florida, Pennsylvania, Ohio stand out as comprehensive benefit states
- **Regional Trends:**
  - Northeast: Good fishing benefits, moderate hunting benefits
  - South: Excellent comprehensive benefits (TX, GA, FL, SC)
  - Midwest: Mixed (IL excellent, but WI, IA moderate)
  - West: Mostly reduced-fee rather than free (CO lifetime is exception)
  - Mountain West: Sparse benefits

**Icon Overlay:**
Small icons appear on states indicating benefit types:
- Brown deer icon = hunting benefits
- Blue fish icon = fishing benefits
- Gold star corner badge = lifetime option available
- Purple flag corner badge = non-resident veterans eligible

Example: Texas shows both deer and fish icons with a purple flag (comprehensive, non-resident eligible)

### Legend Panel (Right Sidebar)

**Structure:**

```
╔══════════════════════════════════════════╗
║         BENEFIT LEVELS                   ║
╠══════════════════════════════════════════╣
║                                          ║
║ [███] Comprehensive (Free both)          ║
║       26 states                          ║
║       Avg. savings: $265/year            ║
║                                          ║
║ [███] Extensive (Free one + discount)    ║
║       9 states                           ║
║       Avg. savings: $180/year            ║
║                                          ║
║ [███] Substantial (Reduced fees)         ║
║       8 states                           ║
║       Avg. savings: $95/year             ║
║                                          ║
║ [███] Limited/None                       ║
║       7 states                           ║
║                                          ║
╠══════════════════════════════════════════╣
║         LICENSE TYPES                    ║
╠══════════════════════════════════════════╣
║  [🦌] Hunting Benefits (26 states)       ║
║  [🐟] Fishing Benefits (30 states)       ║
║  [⭐] Lifetime Option (22 states)        ║
║  [🚩] Non-Resident (13 states)           ║
║                                          ║
╠══════════════════════════════════════════╣
║    DISABILITY REQUIREMENTS               ║
╠══════════════════════════════════════════╣
║  ● 10%+ (3 states) - Most accessible     ║
║  ● 30%+ (2 states)                       ║
║  ● 50%+ (15 states) - Most common        ║
║  ● 100% (8 states)                       ║
║  ● Any Veteran (5 states) - No rating    ║
║                                          ║
╠══════════════════════════════════════════╣
║      FILTER BY:                          ║
╠══════════════════════════════════════════╣
║  ☐ Free Hunting                          ║
║  ☐ Free Fishing                          ║
║  ☐ Lifetime Option                       ║
║  ☐ Non-Resident Eligible                 ║
║                                          ║
║  Disability Rating: [==●=====] 50%       ║
║                                          ║
║  [Clear Filters] [Apply]                 ║
║                                          ║
╠══════════════════════════════════════════╣
║   📊 CALCULATOR                          ║
╠══════════════════════════════════════════╣
║  Your State: [Select ▼]                  ║
║  Disability Rating: [Select ▼]           ║
║  Activity:                               ║
║   ☐ Hunting  ☐ Fishing  ☐ Both          ║
║                                          ║
║  ────────────────────────────────        ║
║  Annual Savings:    $___                 ║
║  Lifetime Savings:  $____                ║
║  ────────────────────────────────        ║
║                                          ║
║  [See My State's Details]                ║
║  [Compare States]                        ║
║                                          ║
╠══════════════════════════════════════════╣
║  [Download State Guide (PDF)]            ║
║  [Print Friendly View]                   ║
╚══════════════════════════════════════════╝
```

### Hover Tooltip

**Trigger:** Mouse over state

**Design:** White card, left blue border (4px), subtle shadow

**Example (Texas):**

```
┌────────────────────────────────────────┐
│ ▓ TEXAS                                │
├────────────────────────────────────────┤
│ Benefit Level: Comprehensive           │
│                                        │
│ 🦌 FREE Super Combo Hunting Package    │
│ 🐟 FREE All-Water Fishing              │
│ 🚩 Non-residents eligible              │
│                                        │
│ Disability Required: 50% or limb loss  │
│ Annual Value: $315                     │
│                                        │
│ [Click for full details]               │
└────────────────────────────────────────┘
```

### Detail Panel (Click/Tap)

**Size:** 700px × 900px (desktop modal), full-screen (mobile)

**Content Sections:**

**1. Header**
- State name with outline silhouette
- Overall benefit rating (5 stars)
- "Comprehensive," "Extensive," "Substantial," or "Limited" badge
- Estimated annual savings (large, prominent)

**2. Quick Summary**
Visual icons with checkmarks/X marks:
```
✓ Free Hunting License
✓ Free Fishing License
✗ Lifetime Option Not Available
✓ Non-Resident Veterans Eligible
```

**3. Hunting Benefits (Expandable)**
```
▼ Hunting License Details
  License Type: Super Combo Package
  Cost for Veterans: FREE (Regular: $315)
  Includes:
    • All-game hunting license
    • All hunting stamps
    • Archery endorsement
    • Freshwater/saltwater fishing

  Eligibility:
    • 50%+ VA disability rating
    • OR loss of use of foot or leg
    • Residents AND non-residents

  How to Obtain:
    1. Obtain VA disability letter (50%+)
    2. Present to Texas Parks & Wildlife or retailer
    3. License issued immediately
    4. Renew annually (no fee)
```

**4. Fishing Benefits (Expandable)**
Similar structure to hunting

**5. Application Process (Step-by-Step)**
Visual timeline with numbered steps and icons

**6. Required Documentation Checklist**
Interactive checklist users can check off:
```
☐ VA disability rating letter (dated within 12 months)
☐ Photo ID (driver's license or state ID)
☐ Proof of residency (if resident benefit)
☐ Previous year's license (for renewal)
```

**7. Contact Information**
- Agency name, address, phone, email, website
- Office hours
- Map to nearest office (if location services enabled)

**8. FAQs (Accordion)**
- Do I need to renew annually?
- What happens if my disability rating changes?
- Can my spouse get a discount?
- Are there age-based benefits in addition to veteran benefits?

**9. Action Buttons**
- [Download Application Form (PDF)]
- [Print This Page]
- [Email Me Details]
- [Compare with Other States]
- [Calculate My Savings]

### Comparison Matrix (Below Map)

**Collapsible Section:** "Compare All States" (expanded on click)

**Table Structure:**
56 columns × 50 rows (horizontal scroll on smaller screens)

**Columns:**
1. State (sticky, sortable)
2. Free Hunting (✓/✗, filterable)
3. Free Fishing (✓/✗, filterable)
4. Lifetime Option (✓/✗, filterable)
5. Non-Resident (✓/✗, filterable)
6. Disability % Required (sortable)
7. Annual Savings (sortable, $ format)
8. Lifetime Savings (sortable, $ format)
9. Actions (View Details, Calculate)

**Features:**
- Multi-column sort (e.g., sort by Free Hunting, then by Annual Savings)
- Column show/hide toggle
- Export to CSV, Excel, PDF
- Print-friendly view (landscape orientation)
- Mobile: Switches to card-based layout

**Visual Encoding:**
- Green checkmarks for "Yes"
- Red X for "No"
- Dollar amounts color-coded (green gradient, darker = higher value)
- Disability % in blue gradient (darker = higher requirement)

---

## 7. Accessibility Guidelines

### WCAG 2.1 Level AA Compliance

**Color & Contrast:**
- All text meets 4.5:1 minimum contrast ratio
- Large text (18pt+) meets 3:1 ratio
- Green color palette tested with Deuteranopia, Protanopia, Tritanopia simulations
- Alternative patterns available for colorblind mode:
  - Comprehensive = Solid fill
  - Extensive = Horizontal lines
  - Substantial = Diagonal lines
  - Limited = Dots
  - None = Empty/white

**Keyboard Navigation:**
- Tab order: Title → Filters → Map (states in alphabetical order) → Legend → Calculator → Matrix → Footer
- Arrow keys navigate between states on map
- Enter opens detail panel
- Escape closes modals
- Space toggles checkboxes/filters
- Focus indicators: 3px solid blue outline with 2px white inner border

**Screen Reader Support:**
- Map has textual alternative: "Interactive map showing veteran hunting and fishing license benefits by state. 26 states offer free hunting licenses, 30 offer free fishing licenses. Use arrow keys to navigate states alphabetically, or skip to data table for complete information."
- Each state has ARIA label:
  ```html
  <path aria-label="Texas. Comprehensive benefits. Free hunting and fishing licenses available. 50 percent disability rating required. Non-residents eligible. Annual savings $315. Press Enter for details." role="button" tabindex="0">
  ```
- Table properly structured with `<thead>`, `<th scope="col">`, `<caption>`
- ARIA live region announces filter changes: "Filtered to 15 states with free hunting licenses"
- Calculator results announced when calculated

**Touch Target Size:**
- Minimum 44×44px for all interactive elements (iOS standard)
- States on mobile view: Minimum 48px tap target (Android standard)
- Adequate spacing: 8px minimum between interactive elements

**Motor Impairment:**
- No time-limited interactions
- Sticky positioning for critical controls (legend, filters)
- Click/tap targets don't require precision (generous hit areas with forgiveness zones)
- Voice control tested (Dragon NaturallySpeaking)

**Cognitive Accessibility:**
- Consistent icon meanings throughout
- Progressive disclosure (summary first, details on demand)
- Clear visual hierarchy with size, weight, color
- Plain language (Flesch Reading Ease: 60+, Grade Level: 8-10)
- Key information presented in multiple formats (map, table, text)
- Breadcrumbs show navigation path
- Confirmation messages for actions ("Filter applied: 15 states shown")

**Visual Accommodations:**
- Support browser zoom up to 200% without horizontal scrolling
- High contrast mode toggle (increases contrast ratios to AAA level)
- Respect prefers-reduced-motion for users sensitive to animations
- Adjustable text size via browser controls

### Internationalization Considerations

**Number Formatting:**
- Currency: $315.00 (US dollars, standard formatting)
- Percentages: 50% (no spaces)

**Date Formatting:**
- ISO 8601 for data: 2024-01-15
- Display format: January 15, 2024 (spelled out for clarity)

---

## 8. Technical Implementation Notes

### Technology Stack

**Frontend:**
- **Mapping:** D3.js with TopoJSON for state boundaries (precise control over interactivity)
- **Alternative:** Mapbox GL JS if planning to add satellite imagery layers later
- **Data Viz:** D3.js for comparison matrix and calculator visualizations
- **Framework:** Vue.js 3 with Composition API (reactive calculator, filters)
- **State Management:** Pinia (for filter states, user selections, comparison basket)
- **Styling:** SCSS with BEM methodology for component organization
- **Icons:** Custom SVG icon library (hunting, fishing, lifetime, non-resident symbols)

**Data Management:**
- Master JSON file (~150KB) for all state data
- Individual state detail JSONs loaded on-demand (code splitting)
- IndexedDB for client-side caching (offline capability for previously viewed states)
- Service worker for progressive web app functionality

**Performance Optimizations:**
- Lazy load comparison matrix until user scrolls to it or clicks "Compare States"
- Intersection Observer to defer rendering of below-the-fold content
- Debounce calculator inputs (300ms delay) to avoid excessive re-renders
- Virtual scrolling for comparison matrix (only render visible rows)
- WebP images with PNG fallback for state flags and icons

**Calculator Logic:**
```javascript
function calculateSavings(state, disabilityRating, activities) {
  const stateData = getStateData(state);
  let annualSavings = 0;

  if (activities.includes('hunting') && stateData.hunting_benefits.free_license) {
    if (disabilityRating >= stateData.hunting_benefits.disability_requirement) {
      annualSavings += stateData.hunting_benefits.annual_savings;
    }
  }

  if (activities.includes('fishing') && stateData.fishing_benefits.free_license) {
    if (disabilityRating >= stateData.fishing_benefits.disability_requirement) {
      annualSavings += stateData.fishing_benefits.annual_savings;
    }
  }

  const yearsToAge65 = Math.max(0, 65 - currentAge);
  const lifetimeSavings = annualSavings * (yearsToAge65 + 20); // Estimate 20 years post-65

  return {
    annual: annualSavings,
    lifetime: lifetimeSavings,
    eligible: annualSavings > 0
  };
}
```

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

### SEO Optimization
- Server-side rendering (SSR) for initial page load
- Semantic HTML5 structure
- Structured data (JSON-LD) for rich snippets:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "State Hunting and Fishing License Benefits for Veterans",
  "description": "Interactive map showing which states offer free or reduced-cost hunting and fishing licenses for veterans and disabled veterans."
}
```
- Open Graph tags for social media sharing
- Twitter Card tags

### Analytics Tracking

**Events to Track:**
- Map interactions (state hover, state click)
- Filter usage (which filters applied)
- Calculator usage (inputs, results viewed)
- Detail panel views (which states most popular)
- Matrix sorting/filtering
- PDF downloads
- External link clicks (to state agency websites)
- Non-resident benefit searches (indicates relocation research)

**Custom Dimensions:**
- User's state (if detectable/provided)
- Disability rating range (if entered in calculator)
- Activities selected (hunting, fishing, both)

---

## 9. Content Requirements

### Page Header

**Headline:**
"Free Hunting & Fishing Licenses for Veterans: Which States Offer Them?"

**Subheadline:**
"43 states offer free or discounted outdoor recreation licenses for veterans. Discover benefits worth up to $400 annually in your state."

**Hero Statistics (Prominent):**
- 26 states: Free hunting
- 30 states: Free fishing
- 22 states: Lifetime options
- Average savings: $165/year

### Introduction Paragraph

"Hunting and fishing aren't just recreational activities—for many veterans, they're therapeutic. Getting outdoors helps manage PTSD, reduces stress, and provides connection with nature and community. Recognizing this, 43 states offer free or reduced-cost hunting and fishing licenses to veterans, especially those with service-connected disabilities. These benefits can save hundreds of dollars annually, yet many eligible veterans never apply simply because they don't know the benefits exist. Use this interactive tool to discover what's available in your state and neighboring states."

### Educational Sidebar

**Title:** "Why States Offer These Benefits"

"State wildlife agencies recognize that:
• Outdoor recreation supports veteran mental health and wellness
• Veterans are conservation-minded hunters and anglers
• License fee waivers are a tangible 'thank you' for military service
• Connecting veterans with nature combats isolation and suicide risk

If your state doesn't offer veteran-specific hunting/fishing benefits, consider contacting your state legislators or wildlife commission to advocate for these programs."

### Callout Box: "Non-Resident Benefits"

"13 states extend hunting and/or fishing benefits to non-resident disabled veterans. This is particularly valuable if you:
• Travel frequently and want to hunt/fish in multiple states
• Live near state borders and want to access neighboring state's outdoor resources
• Haven't yet relocated but want to explore a state before moving

States offering non-resident benefits: Alabama, California, Georgia, Maine, Missouri, Montana, New Mexico, North Carolina, Rhode Island, Texas, Vermont, Washington, Wisconsin."

### FAQ Section

**Q: Do I need to apply every year?**
A: Most benefits require annual renewal, even if there's no fee. However, 22 states offer lifetime licenses that never expire. Check your state's specific requirements.

**Q: What if I have less than 50% disability?**
A: Several states offer benefits at lower disability thresholds. Illinois offers free licenses starting at 10% disability—one of the lowest in the nation. Georgia offers benefits to any honorably discharged veteran regardless of disability status.

**Q: Can my family members get discounts too?**
A: Some states offer discounted licenses for spouses and dependents of disabled veterans. This isn't tracked in this visualization but is worth asking your state wildlife agency about.

**Q: Are there any limits on what I can hunt/fish?**
A: Free licenses typically cover basic hunting and fishing privileges. However, you may still need to purchase additional stamps, tags, or permits for specific species (e.g., waterfowl stamp, deer tag, trophy fish endorsement). Check your state's regulations.

**Q: What documentation do I need?**
A: Almost all states require a VA disability rating letter dated within the past 12 months. Bring photo ID and proof of residency (if applicable). Some states have specific application forms available on their wildlife agency website.

### Call-to-Action Elements

**Primary CTA:**
"Find Your State's Benefits" (scrolls to map or filters to user's state if location detected)

**Secondary CTA:**
"Calculate Your Savings" (scrolls to calculator widget)

**Tertiary CTA:**
"Download Complete State Guide (PDF)" - 50-state reference document

**Footer CTA:**
"Planning to relocate? See which states offer the best overall veteran benefits" [Link to comprehensive state comparison]

---

## 10. Success Metrics

### Engagement Metrics
- Map interaction rate: Target 85%+ of visitors
- Calculator usage: Target 40%+ of visitors
- Detail panel opens: Target 2.8 states viewed per session
- Comparison matrix engagement: Target 35%+ of visitors
- Average time on page: Target 5+ minutes (indicates thorough exploration)

### Task Completion Metrics
- Users can identify if their state offers benefits: 95%+ success
- Users can determine eligibility (disability requirement): 90%+ success
- Users can calculate potential savings: 85%+ success
- Users can find application process: 90%+ success

### Conversion Metrics
- Application form downloads: Target 20%+ of eligible users
- State agency website clicks: Target 30%+ of users viewing detail panels
- PDF guide downloads: Target 15%+ of visitors
- "Share" actions: Target 5%+ of visitors

### User Satisfaction
- Post-interaction survey: "Did you find this tool helpful?" - Target 90%+ "Yes"
- "Did you discover a benefit you didn't know about?" - Target 50%+ "Yes"
- Net Promoter Score: Target 50+ (would recommend to other veterans)

---

## 11. Production Timeline & Resources

### Phase 1: Research & Data Collection (3 weeks)

**Weeks 1-2: Primary Data Collection**
- Contact all 50 state wildlife agencies
- Verify license costs, disability requirements, application processes
- Collect 2024-2025 fee schedules
- Document recent legislative changes
- **Resources:** 2 Research Analysts, 80 hours total

**Week 3: Data Validation & Structuring**
- Cross-reference with veteran advocacy organizations
- Verify non-resident benefit claims
- Calculate estimated savings by state
- Build JSON data structures
- Create data dictionary
- **Resources:** 1 Research Analyst, 1 Data Specialist, 60 hours total

### Phase 2: Design (2 weeks)

**Week 4: UX/Visual Design**
- Create icon set (hunting, fishing, lifetime, non-resident)
- Design map color palette (colorblind-safe)
- Mockup detail panels and modals
- Design calculator widget UI
- **Resources:** 1 UI/UX Designer, 50 hours

**Week 5: Responsive & Interactive Design**
- Design tablet and mobile layouts
- Create interaction specifications
- Component library documentation
- Design system in Figma
- **Resources:** 1 UI/UX Designer, 40 hours

### Phase 3: Development (5 weeks)

**Week 6: Map Component**
- Set up D3.js + TopoJSON
- Implement state geometries
- Color coding by benefit level
- Icon overlay system
- **Resources:** 1 Frontend Developer, 40 hours

**Week 7: Interactivity & Filters**
- Hover tooltips
- Click handlers
- Filter system (disability, benefit type)
- State highlighting
- **Resources:** 1 Frontend Developer, 40 hours

**Week 8: Detail Panels & Calculator**
- Build modal components
- Calculator logic and UI
- Form validation
- Real-time calculation updates
- **Resources:** 1 Frontend Developer, 40 hours

**Week 9: Comparison Matrix**
- Build sortable/filterable table
- Virtual scrolling implementation
- Export functionality (CSV, PDF)
- Responsive card layout (mobile)
- **Resources:** 1 Frontend Developer, 40 hours

**Week 10: Integration & Polish**
- Connect all components
- State management
- Animations and transitions
- Performance optimization
- Cross-browser testing
- **Resources:** 1 Frontend Developer, 1 Backend Developer, 60 hours total

### Phase 4: Testing & Launch (2 weeks)

**Week 11: QA & Accessibility**
- Functional testing across devices/browsers
- WCAG 2.1 AA audit
- Screen reader testing (JAWS, NVDA, VoiceOver)
- Keyboard navigation verification
- Performance testing (Lighthouse)
- **Resources:** 1 QA Tester, 1 Accessibility Specialist, 60 hours total

**Week 12: User Testing & Refinement**
- Usability testing with 10 veterans (various ages, tech comfort levels)
- Calculator accuracy verification
- Bug fixes and refinements
- Final documentation
- Launch preparation
- **Resources:** 1 UX Researcher, 1 QA Tester, 1 Frontend Developer, 70 hours total

### Total Timeline: 12 weeks

### Resource Summary
- Research Analysts: 140 hours
- Data Specialist: 30 hours
- UI/UX Designer: 90 hours
- Frontend Developers: 200 hours
- Backend Developer: 20 hours
- QA Tester: 60 hours
- Accessibility Specialist: 30 hours
- UX Researcher: 30 hours
- **Total: 600 person-hours**

### Budget Estimate
- Research Analysts: 140 hrs × $50/hr = $7,000
- Data Specialist: 30 hrs × $55/hr = $1,650
- UI/UX Designer: 90 hrs × $75/hr = $6,750
- Frontend Developers: 200 hrs × $85/hr = $17,000
- Backend Developer: 20 hrs × $80/hr = $1,600
- QA Tester: 60 hrs × $60/hr = $3,600
- Accessibility Specialist: 30 hrs × $70/hr = $2,100
- UX Researcher: 30 hrs × $65/hr = $1,950
- **Total: $41,650**

### Ongoing Maintenance
- Annual data updates (contact all 50 states): 40 hours ($2,000/year)
- Legislative monitoring: 6 hours/quarter ($1,200/year)
- Content updates and bug fixes: 20 hours/year ($1,700/year)
- **Annual maintenance: $4,900**

---

## 12. Future Enhancements

### Phase 2 Features

1. **State Park Access Benefits**
   - Add layer showing state park annual pass discounts for veterans
   - Many states offer free or reduced-cost park access
   - Integrate with outdoor recreation benefits

2. **Federal Public Lands Pass**
   - Information about America the Beautiful Pass (free for disabled veterans, $80 regular)
   - National park, national forest, BLM land access
   - Hunting and fishing on federal lands

3. **Outdoor Recreation Therapy Programs**
   - Directory of veteran-specific outdoor therapy programs
   - Wounded Warrior Project, Project Healing Waters, etc.
   - Filter by activity type and state

4. **Community Reviews**
   - Verified veterans can rate ease of application process
   - Share tips for successful license applications
   - Crowdsource processing times

5. **Buddy Finder**
   - Optional feature to connect veterans who hunt/fish in same areas
   - Combat isolation by facilitating outdoor recreation partnerships
   - Privacy-focused (opt-in only)

6. **Species-Specific Regulations**
   - Deeper dive into what species are covered
   - Tag/stamp requirements beyond basic license
   - Season dates and bag limits

7. **Equipment Discounts**
   - Catalog of outdoor retailers offering veteran discounts
   - Hunting/fishing equipment manufacturers with military discounts
   - Local outfitters with veteran-specific programs

8. **Mobile App**
   - Offline access to license information
   - GPS-based: automatically show benefits in current state
   - Store digital copies of VA disability letter and licenses
   - Renewal reminders

---

## 13. Related Visualizations

This visualization pairs well with:
- **Spec #011:** Income Tax Exemption on Military Retirement Pay (State comparison context)
- **Spec #012:** Vehicle Registration Fee Exemptions (Relocation decision-making)
- **Spec #014:** State Veteran Home Loan Programs (Comprehensive state comparison)
- **Spec #015:** Tuition Waiver Programs (Education benefits for families)
- **Future:** State Park Access Benefits for Veterans
- **Future:** Comprehensive State Veteran Benefits Dashboard

---

## Document Metadata

**Specification Number:** 013
**Version:** 1.0
**Date Created:** January 15, 2025
**Author:** Military Transition Toolkit Team
**Status:** Ready for Development
**Next Review Date:** January 2026 (before hunting/fishing license renewal season)
**Dependencies:** None
**Related Specs:** 011, 012, 014, 015
**Data Sensitivity:** Public information (no PII collected)
