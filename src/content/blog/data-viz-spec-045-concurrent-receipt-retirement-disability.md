---
date: "2026-02-08"
---# Data Visualization Specification #045: Concurrent Receipt of Military Retirement and VA Disability

## 1. Overview

**Visualization ID:** 045
**Title:** Understanding Concurrent Receipt: Military Retirement + VA Disability
**Category:** VA Disability Benefits
**Chart Type:** Interactive Waterfall/Flow Diagram with Scenario Comparison
**Primary Purpose:** Visualize how CRDP and CRSC allow military retirees to receive both retirement pay and VA disability compensation, showing the offset elimination and payment calculations

This visualization demystifies one of the most complex aspects of military retirement benefits: concurrent receipt. It shows military retirees exactly how their payments work when they have both retirement pay and VA disability compensation, illustrating the historical offset, CRDP (Concurrent Retirement and Disability Pay), and CRSC (Combat-Related Special Compensation) programs. Through interactive scenario modeling, retirees can understand which program benefits them most and calculate their actual monthly income.

## 2. Business Context & Use Case

### Target Audience
- Military retirees with VA disability ratings
- Active-duty service members approaching retirement (20+ years)
- Chapter 61 medical retirees
- Financial planners working with military retirees
- Military transition counselors
- Veterans service organizations

### User Questions This Answers
1. Can I receive both military retirement AND VA disability?
2. What is the "VA offset" and does it still apply to me?
3. What's the difference between CRDP and CRSC?
4. Which concurrent receipt program am I eligible for?
5. Which program (CRDP or CRSC) gives me more money?
6. How much total monthly income will I receive?
7. What happens if my disability rating is below 50%?
8. Is any of this money taxable?

### Expected Impact
Concurrent receipt affects nearly 900,000 military retirees (47% of all retirees) receiving approximately $21 billion annually. Despite its significance, it remains poorly understood, leading to confusion and suboptimal benefit elections. This visualization helps retirees understand their options, make informed elections between CRDP and CRSC, and maximize their total monthly income. For many retirees, understanding concurrent receipt means the difference between receiving $1,200 or $3,000 in monthly VA benefits.

## 3. Data Requirements

### Data Source
- DFAS (Defense Finance and Accounting Service) concurrent receipt guidance
- VA disability compensation rates
- Military retirement pay calculations
- CRDP and CRSC eligibility rules (10 U.S.C. §1414 and §1413a)
- Congressional Research Service reports on concurrent receipt

### Sample Data Structure

```json
{
  "visualizationId": "045",
  "title": "Concurrent Receipt of Military Retirement and VA Disability",
  "effectiveYear": 2025,
  "programs": [
    {
      "programCode": "NO_CONCURRENT",
      "programName": "Traditional Offset (Pre-2004)",
      "description": "Dollar-for-dollar offset: VA disability reduces retirement pay",
      "stillApplies": "Veterans rated below 50% or who don't qualify for CRDP/CRSC",
      "taxStatus": {
        "retirementPay": "Taxable",
        "vaDisability": "Tax-free"
      }
    },
    {
      "programCode": "CRDP",
      "programName": "Concurrent Retirement and Disability Pay",
      "legalCitation": "10 U.S.C. §1414",
      "description": "Eliminates offset for retirees with 50%+ VA rating",
      "eligibility": [
        "Regular retiree with 20+ years of service",
        "Reserve retiree with 20+ qualifying years who has reached retirement age",
        "VA disability rating of 50% or greater"
      ],
      "benefitCalculation": "Receive full retirement pay AND full VA disability",
      "applicationRequired": false,
      "automatic": true,
      "taxStatus": {
        "retirementPay": "Taxable",
        "crdpRestoration": "Taxable (same as retired pay)",
        "vaDisability": "Tax-free"
      },
      "effectiveDate": "January 1, 2014 (fully phased in)"
    },
    {
      "programCode": "CRSC",
      "programName": "Combat-Related Special Compensation",
      "legalCitation": "10 U.S.C. §1413a",
      "description": "Tax-free compensation for combat-related disabilities",
      "eligibility": [
        "20+ years of service OR Chapter 61 medical retirement",
        "VA disability rating of 10% or greater",
        "At least some portion of rating is combat-related"
      ],
      "benefitCalculation": "Retirement pay offset still applies, but CRSC reimburses the offset amount (up to combat-related portion)",
      "applicationRequired": true,
      "applicationTo": "Branch of service, not VA",
      "taxStatus": {
        "retirementPay": "Taxable (reduced by VA offset)",
        "vaDisability": "Tax-free",
        "crscPayment": "Tax-free"
      },
      "advantage": "Tax-free payment, beneficial for combat-related disabilities"
    }
  ],
  "scenarioExamples": [
    {
      "scenarioId": 1,
      "scenarioName": "40% Rating - Offset Still Applies",
      "profile": {
        "yearsOfService": 22,
        "retirementType": "Regular",
        "monthlyRetirementPay": 3000,
        "vaDisabilityRating": 40,
        "vaMonthlyCompensation": 774.16,
        "combatRelatedPercentage": 0
      },
      "calculation": {
        "grossRetirementPay": 3000,
        "vaOffset": -774.16,
        "netRetirementPay": 2225.84,
        "vaDisabilityPay": 774.16,
        "crdpPayment": 0,
        "crscPayment": 0,
        "totalMonthlyIncome": 3000,
        "taxableIncome": 2225.84,
        "taxFreeIncome": 774.16
      },
      "eligibility": {
        "crdp": false,
        "crsc": false
      },
      "note": "Below 50% rating - offset still applies, no concurrent receipt benefit"
    },
    {
      "scenarioId": 2,
      "scenarioName": "60% Rating - CRDP Eligible",
      "profile": {
        "yearsOfService": 22,
        "retirementType": "Regular",
        "monthlyRetirementPay": 3000,
        "vaDisabilityRating": 60,
        "vaMonthlyCompensation": 1395.93,
        "combatRelatedPercentage": 0
      },
      "calculation": {
        "grossRetirementPay": 3000,
        "vaOffset": 0,
        "netRetirementPay": 3000,
        "vaDisabilityPay": 1395.93,
        "crdpPayment": 1395.93,
        "crscPayment": 0,
        "totalMonthlyIncome": 4395.93,
        "taxableIncome": 3000,
        "taxFreeIncome": 1395.93
      },
      "eligibility": {
        "crdp": true,
        "crsc": false
      },
      "note": "CRDP automatically restores full retirement pay + VA disability"
    },
    {
      "scenarioId": 3,
      "scenarioName": "80% Combat-Related - CRDP vs CRSC Choice",
      "profile": {
        "yearsOfService": 22,
        "retirementType": "Regular",
        "monthlyRetirementPay": 3000,
        "vaDisabilityRating": 80,
        "vaMonthlyCompensation": 2044.89,
        "combatRelatedPercentage": 100
      },
      "optionA_CRDP": {
        "grossRetirementPay": 3000,
        "vaOffset": 0,
        "netRetirementPay": 3000,
        "vaDisabilityPay": 2044.89,
        "crdpPayment": 2044.89,
        "totalMonthlyIncome": 5044.89,
        "taxableIncome": 3000,
        "taxFreeIncome": 2044.89
      },
      "optionB_CRSC": {
        "grossRetirementPay": 3000,
        "vaOffset": -2044.89,
        "netRetirementPay": 955.11,
        "vaDisabilityPay": 2044.89,
        "crscPayment": 2044.89,
        "totalMonthlyIncome": 5044.89,
        "taxableIncome": 955.11,
        "taxFreeIncome": 4089.78
      },
      "eligibility": {
        "crdp": true,
        "crsc": true
      },
      "recommendation": "CRSC provides same total but MORE tax-free income ($4,089.78 vs $2,044.89)",
      "note": "Can elect either CRDP or CRSC; CRSC better for tax purposes when combat-related"
    },
    {
      "scenarioId": 4,
      "scenarioName": "100% Rating - Maximum Benefit",
      "profile": {
        "yearsOfService": 24,
        "retirementType": "Regular",
        "monthlyRetirementPay": 3500,
        "vaDisabilityRating": 100,
        "vaMonthlyCompensation": 3831.30,
        "combatRelatedPercentage": 60
      },
      "optionA_CRDP": {
        "grossRetirementPay": 3500,
        "vaOffset": 0,
        "netRetirementPay": 3500,
        "vaDisabilityPay": 3831.30,
        "crdpPayment": 3831.30,
        "totalMonthlyIncome": 7331.30,
        "taxableIncome": 3500,
        "taxFreeIncome": 3831.30
      },
      "optionB_CRSC": {
        "grossRetirementPay": 3500,
        "vaOffset": -3831.30,
        "netRetirementPay": 0,
        "vaDisabilityPay": 3831.30,
        "crscPayment": 2298.78,
        "totalMonthlyIncome": 6130.08,
        "taxableIncome": 0,
        "taxFreeIncome": 6130.08
      },
      "eligibility": {
        "crdp": true,
        "crsc": true
      },
      "recommendation": "CRDP provides more total income ($7,331.30 vs $6,130.08)",
      "note": "CRSC limited by combat-related percentage (60% of 100% = 60% rating = $2,298.78)"
    }
  ],
  "metadata": {
    "lastUpdated": "2024-11-11",
    "sources": ["DFAS", "VA.gov", "10 U.S.C. §1414", "10 U.S.C. §1413a"],
    "notes": "Scenarios use 2025 VA compensation rates. Actual retirement pay varies by rank and years of service."
  }
}
```

## 4. Visual Specifications

### Chart Dimensions
- **Desktop:** 1100px width × 700px height (main diagram)
- **Tablet:** 768px width × 900px height (vertical layout)
- **Mobile:** 100% width (responsive) × auto height (vertical scroll)
- **Scenario cards:** 320px width × 400px height each

### Color Palette

**Program Colors:**
- **Traditional Offset:** #6B7280 (Gray) - Historical/legacy
- **CRDP:** #3B82F6 (Blue) - Automatic benefit
- **CRSC:** #10B981 (Green) - Combat-related benefit
- **Taxable Income:** #F59E0B (Amber)
- **Tax-Free Income:** #10B981 (Green)

**Payment Flow Colors:**
- **Retirement Pay:** #3B82F6 (Blue)
- **VA Disability:** #8B5CF6 (Purple)
- **Offset (Negative):** #EF4444 (Red)
- **CRDP Restoration:** #06B6D4 (Cyan)
- **CRSC Payment:** #10B981 (Green)

**Additional Elements:**
- **Background:** #F9FAFB (Very Light Gray)
- **Card backgrounds:** #FFFFFF (White)
- **Borders:** #E5E7EB (Light Gray, 2px)
- **Success/Benefit:** #D1FAE5 (Light Green background)
- **Warning/Offset:** #FEE2E2 (Light Red background)
- **Info:** #DBEAFE (Light Blue background)
- **Text Primary:** #111827 (Dark Gray)
- **Text Secondary:** #6B7280 (Medium Gray)

### Typography

**Font Family:**
- Primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- Monospace (amounts): "Roboto Mono", monospace

**Font Sizes:**
- Page Title: 32px, font-weight: 700 (bold)
- Subtitle: 16px, font-weight: 400 (regular)
- Section Headers: 24px, font-weight: 700 (bold)
- Scenario Titles: 20px, font-weight: 600 (semi-bold)
- Payment amounts (large): 32px, font-weight: 700 (bold), monospace
- Payment amounts (regular): 18px, font-weight: 600 (semi-bold), monospace
- Labels: 14px, font-weight: 500 (medium)
- Descriptions: 14px, font-weight: 400 (regular)
- Notes/Footnotes: 12px, font-weight: 400 (regular), italic

### Layout Components

**Title Area:**
```
"Understanding Concurrent Receipt: Military Retirement + VA Disability"
Subtitle: "How CRDP and CRSC allow retirees to receive both retirement pay and VA disability compensation"
```

**Three Main Sections:**
1. **Concept Explainer** - Visual diagram showing payment flows
2. **Interactive Calculator** - User inputs their scenario
3. **Comparison Examples** - Pre-built scenario cards

## 5. Detailed Mockup Description

### Section 1: Concept Explainer (Payment Flow Diagram)

This section uses a Sankey-style flow diagram to show three scenarios side-by-side:

**Scenario A: Traditional Offset (40% Rating)**
```
┌─────────────────┐
│ Retirement Pay  │────────┐
│   $3,000/mo     │        │
└─────────────────┘        ▼
                    ┌──────────────┐
                    │ VA Offset    │
                    │  -$774.16    │  (Red)
                    └──────────────┘
                           │
                           ▼
┌─────────────────┐  ┌──────────────┐
│ Net Retirement  │  │ VA Disability│
│  $2,225.84      │+│   $774.16    │
│  (Taxable)      │  │  (Tax-free)  │
└─────────────────┘  └──────────────┘
         │                  │
         └────────┬─────────┘
                  ▼
          ┌──────────────┐
          │ Total Income │
          │  $3,000/mo   │
          └──────────────┘
```

**Scenario B: CRDP (60% Rating)**
```
┌─────────────────┐
│ Retirement Pay  │────────┐
│   $3,000/mo     │        │
└─────────────────┘        │
                           │
                           ▼
┌─────────────────┐  ┌──────────────┐
│ Full Retirement │  │ VA Disability│
│    $3,000       │+│  $1,395.93   │
│  (Taxable)      │  │  (Tax-free)  │
└─────────────────┘  └──────────────┘
         │                  │
         └────────┬─────────┘
                  ▼
          ┌──────────────┐
          │ Total Income │
          │ $4,395.93/mo │  ← $1,395.93 MORE
          └──────────────┘
```

**Scenario C: CRSC (80% Combat)**
```
┌─────────────────┐
│ Retirement Pay  │────────┐
│   $3,000/mo     │        │
└─────────────────┘        ▼
                    ┌──────────────┐
                    │ VA Offset    │
                    │ -$2,044.89   │  (Red)
                    └──────────────┘
                           │
                           ▼
┌─────────────────┐  ┌──────────────┐  ┌──────────────┐
│ Net Retirement  │  │ VA Disability│  │ CRSC Payment │
│   $955.11       │+│  $2,044.89   │+│  $2,044.89   │
│  (Taxable)      │  │  (Tax-free)  │  │  (Tax-free)  │
└─────────────────┘  └──────────────┘  └──────────────┘
         │                  │                  │
         └────────┬─────────┴──────────────────┘
                  ▼
          ┌──────────────────────────┐
          │ Total Income: $5,044.89  │
          │ Tax-free: $4,089.78      │  ← Better tax situation
          └──────────────────────────┘
```

Flows are animated with smooth transitions showing money flowing from source to destination. User can hover over any flow to see exact calculation.

### Section 2: Interactive Calculator

A form-based calculator where users input their information:

```
┌─────────────────────────────────────────────────┐
│  Calculate Your Concurrent Receipt Benefits     │
├─────────────────────────────────────────────────┤
│                                                 │
│  Years of Service:  [  22  ] years             │
│                                                 │
│  Monthly Retirement Pay:  $[ 3,000 ]           │
│                                                 │
│  VA Disability Rating:  [ 60 ]%                │
│                                                 │
│  Combat-Related Percentage:  [ 0 ]%            │
│  (Leave 0 if unsure or not applicable)         │
│                                                 │
│  Retirement Type:                              │
│  ⦿ Regular (20+ years)                         │
│  ○ Chapter 61 (Medical)                        │
│  ○ Reserve (at retirement age)                 │
│                                                 │
│        [ Calculate My Benefits ]                │
│                                                 │
└─────────────────────────────────────────────────┘
```

Upon clicking "Calculate," results appear below:

```
┌─────────────────────────────────────────────────┐
│  Your Concurrent Receipt Analysis               │
├─────────────────────────────────────────────────┤
│                                                 │
│  ✓ You ARE eligible for CRDP                   │
│  ✗ You are NOT eligible for CRSC               │
│                                                 │
│  ────────────────────────────────────────       │
│                                                 │
│  Monthly Payment Breakdown:                     │
│                                                 │
│  Retirement Pay:           $3,000.00            │
│  VA Disability:           +$1,395.93            │
│  ──────────────────────────────────             │
│  Total Monthly Income:     $4,395.93            │
│                                                 │
│  Taxable: $3,000.00 | Tax-Free: $1,395.93      │
│                                                 │
│  Annual Total:            $52,751.16            │
│                                                 │
│  ────────────────────────────────────────       │
│                                                 │
│  💡 Because your VA rating is 50% or higher,   │
│  CRDP automatically eliminates the offset.     │
│  You receive FULL retirement pay AND FULL VA   │
│  disability with no reduction.                 │
│                                                 │
│  No application required - this is automatic!  │
│                                                 │
└─────────────────────────────────────────────────┘
```

If user qualifies for both CRDP and CRSC, a comparison table appears:

```
┌───────────────────────────────────────────────────────┐
│  You qualify for BOTH CRDP and CRSC                  │
│  Here's which program is better for you:             │
├───────────────────────────────────────────────────────┤
│                                                       │
│           │    CRDP    │    CRSC    │ Difference     │
│  ─────────┼────────────┼────────────┼───────────     │
│  Total    │  $5,044.89 │ $5,044.89  │  Same         │
│  ─────────┼────────────┼────────────┼───────────     │
│  Taxable  │  $3,000.00 │   $955.11  │ $2,044.89 ↓   │
│  ─────────┼────────────┼────────────┼───────────     │
│  Tax-Free │  $2,044.89 │ $4,089.78  │ $2,044.89 ↑   │
│  ─────────┴────────────┴────────────┴───────────     │
│                                                       │
│  ✓ RECOMMENDED: CRSC                                 │
│                                                       │
│  While both programs provide the same total monthly  │
│  income, CRSC provides MORE tax-free income,         │
│  resulting in lower tax burden and higher            │
│  after-tax income.                                   │
│                                                       │
│  Estimated annual tax savings: ~$500-$800            │
│                                                       │
│  [ Learn How to Apply for CRSC ]                     │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### Section 3: Pre-Built Scenario Examples

Four scenario cards displayed in a grid (2×2 on desktop, vertical on mobile):

**Card 1: "40% Rating - Offset Applies"**
```
┌─────────────────────────────────────┐
│  40% Rating - Offset Still Applies  │
├─────────────────────────────────────┤
│                                     │
│  Profile:                           │
│  • 22 years service                 │
│  • $3,000/mo retirement             │
│  • 40% VA rating                    │
│  • Not combat-related               │
│                                     │
│  ───────────────────────────────    │
│                                     │
│  Retirement Pay:      $3,000.00     │
│  VA Offset:            -$774.16     │
│  Net Retirement:      $2,225.84     │
│  VA Disability:       +$774.16      │
│  ───────────────────────────────    │
│  Total Monthly:       $3,000.00     │
│                                     │
│  CRDP Eligible?  ✗ No (need 50%+)  │
│  CRSC Eligible?  ✗ No               │
│                                     │
│  ⚠️  The offset still applies.     │
│  Consider pursuing rating increase  │
│  to 50% to eliminate offset.        │
│                                     │
└─────────────────────────────────────┘
```

**Card 2: "60% Rating - CRDP Benefit"**
(Similar format showing CRDP eliminates offset)

**Card 3: "80% Combat - Choose Wisely"**
(Shows side-by-side CRDP vs CRSC comparison)

**Card 4: "100% P&T - Maximum Benefit"**
(Shows maximum concurrent receipt scenario)

Each card is clickable to expand for detailed calculation breakdown.

### Interactive Elements

**Hover on Payment Flows:**
- Flow path highlights
- Tooltip shows: "Retirement pay reduced by VA disability amount"
- Arrow thickens
- Associated boxes glow

**Calculator Auto-Updates:**
- Real-time calculation as user types
- Validation: "VA rating must be 10-100%"
- Warning messages: "⚠️ You need 50%+ rating for CRDP"
- Success messages: "✓ You qualify for concurrent receipt!"

**Scenario Card Interactions:**
- Click to expand full calculation details
- "Use this in calculator" button pre-fills calculator
- Compare button: Select 2 cards to see side-by-side difference

**Comparison Tool:**
Drag slider to adjust VA rating from 0% to 100%, watch total income update in real-time across three models (Offset, CRDP, CRSC).

### Responsive Behavior

**Desktop (1100px+):**
- Three-column flow diagram
- Calculator and results side-by-side
- Scenario cards in 2×2 grid

**Tablet (768px):**
- Flow diagram stacks vertically
- Calculator full width, results below
- Scenario cards in 2×1 grid

**Mobile (<768px):**
- Single column layout
- Simplified flow diagrams (text-based)
- Calculator accordion (collapse sections)
- Scenario cards stack vertically
- Swipe between scenarios

### Key Information Callouts

**Eligibility Box:**
```
┌──────────────────────────────────────────┐
│  📋 Quick Eligibility Check               │
├──────────────────────────────────────────┤
│                                          │
│  CRDP (Automatic):                       │
│  ✓ 20+ years service (or Reserve at age) │
│  ✓ 50%+ VA disability rating             │
│  ✓ No application needed                 │
│                                          │
│  CRSC (Application Required):            │
│  ✓ 20+ years OR Chapter 61 retirement    │
│  ✓ 10%+ VA rating (combat-related)       │
│  ✓ Must apply to your service branch     │
│                                          │
│  You can receive EITHER CRDP OR CRSC,    │
│  but not both. Choose whichever is best. │
│                                          │
└──────────────────────────────────────────┘
```

**Tax Advantages Box:**
```
┌──────────────────────────────────────────┐
│  💰 Understanding the Tax Benefit         │
├──────────────────────────────────────────┤
│                                          │
│  VA Disability:   Tax-free ✓             │
│  CRSC Payment:    Tax-free ✓             │
│  CRDP Restoration: Taxable ⚠️             │
│  Retirement Pay:  Taxable ⚠️              │
│                                          │
│  CRSC can provide the same total income  │
│  with less tax burden because the CRSC   │
│  payment itself is tax-free.             │
│                                          │
│  Example: $2,000/mo tax-free is worth    │
│  more than $2,000/mo taxable.            │
│                                          │
└──────────────────────────────────────────┘
```

### Footer Information

```
Important Information:
• CRDP is automatic for eligible retirees; no application required (processed by DFAS)
• CRSC requires application to your military service branch (not VA)
• You can switch between CRDP and CRSC during annual open season
• Combat-related disabilities include: combat, training simulating combat, hazardous duty, instrumentality of war
• Current statistics: ~900,000 retirees receive CRDP or CRSC (~47% of all military retirees)
• Total annual program cost: Approximately $21 billion

For More Information:
• DFAS Concurrent Receipt: https://www.dfas.mil/retiredmilitary/disability/crdp/
• CRSC Application: Contact your service branch's personnel center
• VA Disability: https://www.va.gov/disability/

Legal Citations: 10 U.S.C. §1414 (CRDP) | 10 U.S.C. §1413a (CRSC)
Last Updated: November 2024 | Next Review: December 2024
```

## 6. Accessibility Requirements

### WCAG 2.1 Level AA Compliance

**Color & Contrast:**
- All text meets 4.5:1 contrast ratio minimum
- Color used with icons, patterns, and text labels (never color alone)
- Payment flows include text labels in addition to colors
- High contrast mode: Bold borders, solid colors, no gradients

**Keyboard Navigation:**
- Tab through calculator form fields
- Arrow keys navigate scenario cards
- Enter/Space to expand cards
- Escape to collapse
- Focus indicators: 3px solid blue outline
- Skip links: "Skip to calculator", "Skip to scenarios"

**Screen Reader Support:**

```html
<section aria-labelledby="concurrent-receipt-calculator">
  <h2 id="concurrent-receipt-calculator">Concurrent Receipt Calculator</h2>

  <form aria-label="Calculate your concurrent receipt benefits">
    <label for="retirement-pay">Monthly Retirement Pay</label>
    <input
      id="retirement-pay"
      type="number"
      aria-describedby="retirement-pay-help"
      aria-required="true"
    />
    <span id="retirement-pay-help">Enter your monthly retirement pay in dollars</span>

    <!-- Additional form fields... -->

    <button type="submit">Calculate My Benefits</button>
  </form>

  <div role="region" aria-live="polite" aria-label="Calculation results">
    <!-- Results appear here and are announced to screen readers -->
  </div>
</section>

<section aria-label="Payment flow diagram">
  <h2>How Concurrent Receipt Works</h2>
  <!-- SVG with proper ARIA labels and descriptions -->
  <svg role="img" aria-labelledby="flow-title flow-desc">
    <title id="flow-title">Payment flow for concurrent receipt</title>
    <desc id="flow-desc">
      Diagram showing three scenarios: Traditional offset, CRDP, and CRSC.
      In traditional offset, retirement pay of $3,000 is reduced by $774.16 VA disability,
      resulting in net $2,225.84 retirement plus $774.16 VA for total $3,000.
      With CRDP, full $3,000 retirement plus $1,395.93 VA disability equals $4,395.93 total.
      With CRSC, $3,000 retirement reduced by $2,044.89, plus $2,044.89 VA, plus $2,044.89 CRSC
      equals $5,044.89 total with more tax-free income.
    </desc>
  </svg>
</section>
```

**Alternative Formats:**
- Text-based calculation breakdown
- Data table view of all scenarios
- Downloadable PDF guide
- Plain text summary option

### Additional Accessibility Features

- Calculation results announced to screen readers
- Error messages clearly associated with form fields
- Calculation steps explained in logical order
- All interactive elements have clear labels
- Reduced motion option: Disables flow animations
- Text scaling: Supports up to 200% without loss

## 7. Technical Implementation Notes

### Recommended Libraries
- **React** for component architecture
- **D3.js** or **React Flow** for payment flow diagrams
- **Formik** or **React Hook Form** for calculator form
- **Chart.js** for simple comparison charts
- **jsPDF** for PDF export functionality

### Performance Considerations
- Memoize calculation functions
- Debounce calculator inputs (300ms)
- Lazy load scenario card details
- Progressive enhancement: Show static examples first, add interactivity
- Target: <50ms calculation response time

### Calculation Functions

```javascript
function calculateConcurrentReceipt({
  retirementPay,
  vaRating,
  combatRelatedPercentage,
  yearsOfService
}) {
  const vaCompensation = getVACompensationRate(vaRating);

  // CRDP Eligibility
  const crdpEligible = vaRating >= 50 && yearsOfService >= 20;

  // CRSC Eligibility
  const crscEligible = vaRating >= 10 && yearsOfService >= 20 && combatRelatedPercentage > 0;

  // Traditional Offset Calculation
  const offsetAmount = vaCompensation;
  const netRetirement = Math.max(0, retirementPay - offsetAmount);
  const totalWithOffset = netRetirement + vaCompensation;

  // CRDP Calculation
  let crdpTotal = 0;
  let crdpTaxable = 0;
  let crdpTaxFree = 0;

  if (crdpEligible) {
    crdpTotal = retirementPay + vaCompensation;
    crdpTaxable = retirementPay;
    crdpTaxFree = vaCompensation;
  }

  // CRSC Calculation
  let crscTotal = 0;
  let crscTaxable = 0;
  let crscTaxFree = 0;

  if (crscEligible) {
    const combatRelatedRating = Math.floor(vaRating * (combatRelatedPercentage / 100));
    const crscPayment = getVACompensationRate(combatRelatedRating);
    const actualCRSC = Math.min(crscPayment, offsetAmount);

    crscTotal = retirementPay + vaCompensation;
    crscTaxable = Math.max(0, retirementPay - offsetAmount);
    crscTaxFree = vaCompensation + actualCRSC;
  }

  return {
    traditional: {
      total: totalWithOffset,
      taxable: netRetirement,
      taxFree: vaCompensation
    },
    crdp: crdpEligible ? {
      total: crdpTotal,
      taxable: crdpTaxable,
      taxFree: crdpTaxFree,
      eligible: true
    } : { eligible: false },
    crsc: crscEligible ? {
      total: crscTotal,
      taxable: crscTaxable,
      taxFree: crscTaxFree,
      eligible: true
    } : { eligible: false },
    recommendation: determineRecommendation(crdpTotal, crscTotal, crdpTaxFree, crscTaxFree)
  };
}

function getVACompensationRate(rating) {
  const rates = {
    0: 0, 10: 175.51, 20: 346.95, 30: 537.42, 40: 774.16,
    50: 1102.04, 60: 1395.93, 70: 1759.19, 80: 2044.89,
    90: 2297.96, 100: 3831.30
  };
  return rates[rating] || 0;
}

function determineRecommendation(crdpTotal, crscTotal, crdpTaxFree, crscTaxFree) {
  if (crdpTotal === 0 && crscTotal === 0) return "Neither program available";
  if (crdpTotal === 0) return "CRSC (only option)";
  if (crscTotal === 0) return "CRDP (only option)";

  if (crdpTotal > crscTotal) return "CRDP (higher total income)";
  if (crscTotal > crdpTotal) return "CRSC (higher total income)";

  // Same total - compare tax-free amounts
  if (crscTaxFree > crdpTaxFree) return "CRSC (more tax-free income)";
  return "CRDP (simpler, automatic)";
}
```

### Data Update Workflow
1. Annual VA rate update (December)
2. Update VA compensation rate table
3. Test calculations with new rates
4. Update all scenario examples
5. Review DFAS guidance for policy changes
6. Update footer with current year

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## 8. Production Timeline

### Research & SME Consultation (1.5 weeks)
- **Day 1-3:** Deep dive into CRDP and CRSC regulations
- **Day 4-5:** Consult with DFAS and military finance experts
- **Day 6-7:** Validate calculation logic with test cases
- **Day 8-10:** User research with military retirees

### Design Phase (2 weeks)
- **Day 1-3:** Wireframes for flow diagrams and calculator
- **Day 4-6:** Visual design (colors, typography, layouts)
- **Day 7-8:** Interactive prototype in Figma
- **Day 9-11:** Stakeholder review and iterations
- **Day 12-14:** Final design approval

### Development Phase (3.5 weeks)
- **Week 1:**
  - Days 1-2: Component architecture setup
  - Days 3-4: Payment flow diagram with D3.js/React Flow
  - Day 5: Calculation engine development
- **Week 2:**
  - Days 1-3: Interactive calculator form
  - Days 4-5: Results display and comparison
- **Week 3:**
  - Days 1-2: Scenario cards and examples
  - Days 3-4: Responsive layouts and mobile optimization
  - Day 5: Animation and transitions
- **Week 4 (partial):**
  - Days 1-2: Accessibility implementation
  - Day 3: PDF export functionality

### Testing & QA (2 weeks)
- **Day 1-3:** Functional testing all calculations
- **Day 4-5:** Calculation accuracy verification with DFAS data
- **Day 6-7:** Accessibility audit (WCAG 2.1 AA)
- **Day 8-9:** Cross-browser and device testing
- **Day 10-12:** User acceptance testing with military retirees
- **Day 13-14:** Bug fixes and final QA

### Total Estimated Time
**9 weeks from kickoff to production-ready**

### Ongoing Maintenance
- Annual update (December): 8 hours (VA rates + policy review)
- Quarterly calculation testing: 2 hours
- Ad-hoc policy updates: 6 hours per year
- Estimated annual maintenance: 20 hours

## 9. Success Metrics

### User Engagement
- Time spent on visualization: Target >2 minutes
- Calculator usage: Target >60% of visitors
- Scenario card interactions: Target >3 cards viewed
- PDF downloads: Track for offline planning

### Comprehension
- User testing: 90% can explain concurrent receipt concept
- User testing: 85% can identify which program they're eligible for
- User testing: 80% can calculate their own benefit correctly
- Reduced confusion: "Can I get both retirement and disability?"

### Technical Performance
- Calculation response time: <50ms
- Initial page load: <2 seconds
- Total resource size: <400KB
- Mobile performance score: 85+ (Lighthouse)

### Business Impact
- Increased CRSC applications (when advantageous)
- Better-informed benefit elections
- Reduced support questions about concurrent receipt
- Positive feedback from military retirees
- Integration into military retirement counseling
- Financial advisors reference this tool
- Fewer lost benefits due to misunderstanding

## 10. Future Enhancements

### Version 1.1 (Planned)
- **Survivor Benefits:** Show SBP interaction with concurrent receipt
- **State Tax Calculator:** Estimate state tax impact on different options
- **Historical View:** Show how concurrent receipt has evolved since 2004
- **Mobile App:** Native iOS/Android app for on-the-go calculations

### Version 2.0 (Considerations)
- **DFAS Integration:** Auto-fill retirement pay from DFAS login (if API available)
- **VA Integration:** Auto-fill disability rating from VA.gov login
- **Tax Filing Helper:** Generate tax form guidance based on election
- **Scenario Saving:** Save and compare multiple personal scenarios
- **Family Planning:** Show impact on survivor benefits and spouse income
- **Retirement Planning:** Integrate with broader retirement calculators

### Version 3.0 (Vision)
- **AI Advisor:** Chatbot answering complex concurrent receipt questions
- **Document Upload:** Scan LES and VA letters to auto-populate calculator
- **Personalized Recommendations:** ML-based optimization of CRDP vs CRSC choice
- **Community Forum:** Retirees share experiences and advice
- **Legislative Tracker:** Alert users to proposed changes in concurrent receipt laws
- **Appeals Advisor:** Guidance on combat-related determinations for CRSC

---

**Document Version:** 1.0
**Author:** Military Transition Toolkit Team
**Last Updated:** November 2024
**Next Review:** December 2024 (Annual VA rate update)
**Word Count:** ~1,520 words
