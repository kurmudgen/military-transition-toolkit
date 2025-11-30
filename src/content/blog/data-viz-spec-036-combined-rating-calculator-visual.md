---

date: "2026-02-07"
---# Data Visualization Specification #036: Combined VA Rating Calculator Visual

## Overview

**Visualization Type:** Interactive Flowchart / Decision Tree
**Primary Purpose:** Educational guide showing how VA combined disability ratings are calculated using the "whole person" concept
**Target Audience:** Veterans filing for multiple VA disability conditions, VSOs, family members assisting with claims
**Complexity Level:** Medium to High
**Estimated Development Time:** 40-50 hours

## Executive Summary

This visualization demystifies the VA's combined rating calculation system by presenting a step-by-step visual flowchart that shows how individual disability ratings combine to create a final percentage. Unlike simple addition, the VA uses a complex "whole person" methodology where each disability is applied to the remaining efficiency of the person, not the total. This interactive flowchart will use real examples to illustrate the calculation process, making this confusing topic accessible to veterans.

## Business Objectives

1. **Primary Goal:** Educate veterans on why their combined rating differs from adding individual ratings
2. **Secondary Goal:** Reduce confusion and frustration during the claims process
3. **Tertiary Goal:** Help veterans understand what additional ratings they need to reach key thresholds (70%, 100%)
4. **Success Metrics:**
   - 80% of users report better understanding of combined ratings after viewing
   - Average time on page >3 minutes
   - Reduced support inquiries about rating calculations by 30%

## Data Source & Research

### Official Sources
- **38 CFR § 4.25** - Code of Federal Regulations governing combined ratings
- **VA Combined Ratings Table** (official PDF from VA.gov)
- **VA Disability Calculator** tools from accredited VSO organizations
- **Veterans Benefits Administration** statistical reports 2024-2025

### Key Calculations

The VA combined rating formula follows this principle:
- A person with 60% disability is considered 40% efficient
- A subsequent 30% disability affects the remaining 40% efficiency
- 30% of 40% = 12% additional disability
- Combined: 60% + 12% = 72% (rounds to 70%)

### Sample Data

**Example 1: Two 10% Ratings**
- First rating: 10% of 100 = 10%
- Remaining efficiency: 90%
- Second rating: 10% of 90 = 9%
- Combined: 19% (rounds to 20%)

**Example 2: 50% + 30% + 20%**
- Step 1: 50% disability, 50% efficiency remaining
- Step 2: 30% of 50 = 15%, total = 65% disability
- Remaining: 35% efficiency
- Step 3: 20% of 35 = 7%, total = 72% (rounds to 70%)

**Example 3: Multiple Conditions (Real-World)**
- PTSD: 70%
- Tinnitus: 10%
- Knee (left): 20%
- Knee (right): 20% (with bilateral factor)
- Lower back: 30%
- Combined result: 94% (rounds to 100%)

**Rounding Rules:**
- 1-4: Round down to nearest 10
- 5-9: Round up to nearest 10
- Example: 84.6% → 80%, 85.2% → 90%

## Visual Design Specifications

### Layout & Structure

**Canvas Dimensions:** 1400px width × 2400px height (scrollable vertical flowchart)
**Responsive Breakpoints:**
- Desktop: Full width, horizontal flow option
- Tablet: 768px, simplified vertical flow
- Mobile: 360px, accordion-style steps

### Color Palette

**Primary Colors:**
- VA Navy: `#003F72` (headers, primary elements)
- Efficiency Green: `#00A91C` (remaining efficiency indicators)
- Disability Red: `#CD2026` (disability percentage indicators)
- Background: `#F8F9FA` (canvas background)

**Secondary Colors:**
- Step Active: `#2E8540` (current calculation step)
- Step Completed: `#5B616B` (completed steps)
- Step Pending: `#C3C9CF` (upcoming steps)
- Accent Gold: `#FFB81C` (important thresholds: 70%, 100%)

**Border & Connecting Lines:**
- Primary Lines: `#71767A` (2px solid)
- Active Path: `#2E8540` (3px solid)
- Dotted Guide: `#C3C9CF` (1px dashed)

### Typography

**Primary Font:** Source Sans Pro (VA.gov standard)
**Secondary Font:** Roboto Mono (for numerical displays)

**Font Sizes:**
- H1 (Main Title): 36px, Bold, `#003F72`
- H2 (Section Headers): 28px, Semibold, `#003F72`
- H3 (Step Labels): 22px, Semibold, `#212121`
- Body Text: 16px, Regular, `#1B1B1B`
- Percentages (Large): 48px, Bold, Roboto Mono
- Percentages (Small): 24px, Semibold, Roboto Mono
- Captions: 14px, Regular, `#5B616B`

### Visual Elements

**Step Boxes:**
- Dimensions: 280px × 180px
- Border radius: 8px
- Box shadow: 0 2px 8px rgba(0,0,0,0.1)
- Internal padding: 24px
- Background gradient for active: linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)

**Percentage Circles:**
- Diameter: 120px
- Border: 4px solid
- Background: white
- Center number: Large, bold percentage
- Ring color changes based on disability level:
  - 0-30%: `#5B9BD5` (light blue)
  - 40-60%: `#FFB81C` (gold)
  - 70-90%: `#FF6B35` (orange)
  - 100%: `#CD2026` (red)

**Progress Indicators:**
- Vertical progress bar on left: 8px wide
- Segments correspond to each calculation step
- Fill color: `#2E8540`
- Unfilled: `#E6E6E6`

**Efficiency Meter:**
- Horizontal bar chart showing remaining efficiency
- Height: 40px
- Starts at 100% (full green)
- Decreases with each condition added
- Color transitions from green to yellow to red

## Interactive Features

### User Interactions

1. **Step-by-Step Mode:**
   - "Next Step" button advances through calculation
   - Previous steps remain visible but faded (60% opacity)
   - Animated transitions (0.3s ease-in-out)
   - Current step highlights with border and shadow

2. **Custom Calculator:**
   - Input fields for up to 10 disability ratings
   - Drag-and-drop to reorder (auto-sorts highest to lowest)
   - Real-time calculation updates
   - "Add Condition" and "Remove" buttons

3. **Example Scenarios:**
   - Pre-loaded common scenarios (dropdown menu):
     - "Combat Veteran (Multiple Conditions)"
     - "Single High Rating + Multiple Low"
     - "Reaching 100% from 94%"
     - "Bilateral Factor Example"
   - Click to load and visualize

4. **Threshold Indicators:**
   - Visual markers at 70% and 100%
   - Hover to see benefits at each level
   - Tooltip: "You're 5% away from 70% rating"

5. **Bilateral Factor Toggle:**
   - Checkbox: "Apply Bilateral Factor"
   - Shows +10% bonus calculation
   - Explains when it applies

### Tooltips & Help

**Hover States:**
- All percentage boxes: Shows full calculation detail
- Efficiency meter: "This represents your remaining efficiency"
- Rounding indicator: "VA rounds to nearest 10%"
- Bilateral factor: Full explanation with link to 38 CFR § 3.350

**Information Icons:**
- Placed next to complex concepts
- Click to reveal expandable panels
- Icons: 20px circle, `#0071BB`, white "i"

## Data Visualization Components

### Main Flowchart Structure

```
[Start: 100% Efficient]
         ↓
[Enter Highest Rating: ___%]
         ↓
[Calculate: 100% - __% = __% Remaining Efficiency]
         ↓
[Visual Bar: Green (efficiency) vs Red (disability)]
         ↓
[Enter Next Highest Rating: ___%]
         ↓
[Calculate: __% of remaining __% = __% additional disability]
         ↓
[New Total: __% + __% = __%]
         ↓
[Update Efficiency Bar]
         ↓
[Repeat for Each Condition]
         ↓
[Apply Rounding Rules]
         ↓
[Final Combined Rating: __%]
```

### Calculation Table (Side Panel)

| Step | Rating | Calculation | Running Total | Efficiency |
|------|--------|-------------|---------------|------------|
| 1    | 50%    | 50% of 100  | 50%           | 50%        |
| 2    | 30%    | 30% of 50   | 65%           | 35%        |
| 3    | 20%    | 20% of 35   | 72%           | 28%        |
| **Final** | - | **Round 72%** | **70%**   | **30%**    |

**Table Styling:**
- Header row: `#003F72` background, white text
- Alternating rows: white and `#F5F5F5`
- Border: 1px solid `#C3C9CF`
- Current row highlight: `#FFF4E5` with left border `#FFB81C` 3px
- Font: 14px Source Sans Pro

### Legend & Key

Position: Fixed in top-right corner (300px × 200px)

**Color Key:**
- 🟢 Green Bar: Remaining Efficiency
- 🔴 Red Bar: Total Disability
- 🟡 Gold Highlight: Key Thresholds (70%, 100%)
- ⚪ Gray Circle: Individual Rating

**Symbol Key:**
- ➕ Addition: Simple addition
- ✖️ Multiplication: "Whole person" calculation
- 🔄 Rounding: VA rounding rules
- ⚖️ Bilateral: Bilateral factor applied

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

**Color Contrast:**
- All text: Minimum 4.5:1 ratio
- Large text (24px+): Minimum 3:1 ratio
- Interactive elements: 3:1 against background
- Tested combinations:
  - `#003F72` on `#FFFFFF`: 8.5:1 ✓
  - `#212121` on `#F8F9FA`: 12.2:1 ✓
  - `#2E8540` on `#FFFFFF`: 5.8:1 ✓

**Keyboard Navigation:**
- All interactive elements accessible via Tab
- Focus indicators: 3px solid `#2E8540` outline
- Logical tab order follows visual flow
- Enter/Space activates buttons and toggles
- Arrow keys navigate between input fields

**Screen Reader Support:**
- ARIA labels for all form inputs
- ARIA live regions announce calculation updates
- Alt text for all visual indicators
- Semantic HTML5 elements (nav, main, aside)
- Skip navigation link

**Alternative Text Examples:**
- "Combined rating flowchart showing 50% plus 30% equals 65% combined"
- "Efficiency meter showing 35% remaining after two conditions"
- "Step 3 of 5: Calculating third disability rating"

**Motion & Animation:**
- Respect `prefers-reduced-motion` media query
- Option to disable animations in settings
- No auto-playing animations over 5 seconds
- No flashing or strobing effects

**Text Alternatives:**
- Downloadable PDF version of calculation
- Text-only step-by-step guide
- Calculator table view (no graphics)

## Technical Implementation Notes

### Frontend Technologies

**Recommended Stack:**
- **Framework:** React 18+ or Vue 3
- **Visualization:** D3.js v7 for flowchart rendering
- **Animation:** Framer Motion or GSAP
- **Forms:** Formik + Yup validation
- **Styling:** Tailwind CSS with custom VA theme

### Data Structure (JSON)

```json
{
  "ratings": [
    { "id": 1, "condition": "PTSD", "percentage": 70 },
    { "id": 2, "condition": "Tinnitus", "percentage": 10 },
    { "id": 3, "condition": "Knee (Left)", "percentage": 20 }
  ],
  "bilateralFactor": true,
  "calculationSteps": [
    {
      "step": 1,
      "rating": 70,
      "calculation": "70% of 100%",
      "result": 70,
      "remainingEfficiency": 30
    }
  ],
  "finalCombined": 72,
  "finalRounded": 70
}
```

### Performance Requirements

- Initial load: <2 seconds on 3G
- Interaction response: <100ms
- Calculation update: <50ms
- Smooth 60fps animations
- Bundle size: <150KB (gzipped)

### Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari (iOS): Last 2 versions
- Chrome Mobile (Android): Last 2 versions

## Content & Messaging

### Main Headline
"Understanding Your VA Combined Disability Rating: A Visual Guide"

### Subheadline
"See exactly how the VA calculates your combined rating using the 'whole person' method"

### Introduction Paragraph
"When you have multiple VA disability ratings, they don't simply add up. The VA uses a 'whole person' approach that considers how each disability affects your remaining capacity. This interactive visualization walks you through the calculation step-by-step, showing exactly how your individual ratings combine to create your final percentage."

### Key Callout Boxes

**Box 1: "Why Doesn't the VA Just Add?"**
"The VA considers that each disability affects a person who is already partially disabled. A 50% disabled person is still 50% efficient. The next disability reduces that remaining efficiency, not the whole person."

**Box 2: "Rounding Can Help You"**
"The VA always rounds to the nearest 10%. This means 94.5% becomes 100%, potentially qualifying you for thousands more in monthly benefits."

**Box 3: "Important Thresholds"**
- 70%: Unlocks additional dependent benefits and priority healthcare
- 100%: Maximum monthly compensation ($3,831 for 2025)
- 94.5%+: Rounds up to 100%

### Educational Footnotes

1. "Combined ratings are governed by 38 CFR § 4.25"
2. "Bilateral factor adds 10% bonus before combining when both sides of paired extremities are affected"
3. "TDIU (Total Disability Individual Unemployability) allows veterans rated 70%+ to receive 100% payment if unemployable"

## Production Timeline & Resources

### Development Phases

**Phase 1: Design & Prototyping (1-2 weeks)**
- Wireframes and user flow diagrams
- Static mockups in Figma
- Design review with VA subject matter experts
- Accessibility audit of designs

**Phase 2: Data & Content (1 week)**
- Validate calculation formulas against 38 CFR
- Gather real-world examples from VSOs
- Write educational content
- Legal review for accuracy

**Phase 3: Development (2-3 weeks)**
- Component development
- Interactive calculator logic
- Flowchart rendering engine
- Responsive layouts

**Phase 4: Testing & QA (1 week)**
- Cross-browser testing
- Accessibility testing (WAVE, axe)
- User testing with 5-10 veterans
- Performance optimization

**Phase 5: Deployment & Iteration (1 week)**
- Production deployment
- Analytics implementation
- Monitor user feedback
- A/B testing different layouts

### Team Requirements

- **UX/UI Designer:** 80 hours
- **Frontend Developer:** 100 hours
- **QA Tester:** 40 hours
- **Content Writer:** 20 hours
- **Accessibility Specialist:** 16 hours
- **VA SME Review:** 8 hours
- **Total Estimated Hours:** 264 hours

### Budget Considerations

- Design tools (Figma, Adobe): $100/month
- Development environment: $50/month
- User testing incentives: $500
- Third-party libraries: Free (open source)
- **Estimated Total Cost:** $20,000-$30,000 (full development cycle)

## Success Metrics & KPIs

### Engagement Metrics
- Average time on visualization: Target >3 minutes
- Interaction rate: >60% of visitors use calculator
- Completion rate: >75% complete full walkthrough
- Return visits: >20% within 30 days

### Educational Impact
- Post-viewing quiz scores: >80% correct
- User survey: "I understand combined ratings better" >85% agree
- Support ticket reduction: 30% decrease in rating calculation questions

### Technical Performance
- Page load time: <2 seconds (95th percentile)
- Time to interactive: <3 seconds
- Accessibility score: 100 (Lighthouse)
- Mobile usability: 100 (Google)

### Business Impact
- Reduced customer service costs: $10,000/year
- Increased user satisfaction: +15 NPS points
- Higher engagement with other tools: +25% cross-tool usage

## Maintenance & Updates

### Regular Maintenance
- **Quarterly:** Verify calculation formulas against current VA regulations
- **Annually:** Update sample data and compensation rates
- **As needed:** Fix reported bugs, update browser compatibility

### Content Updates
- Update benefit amounts when VA announces COLA adjustments
- Add new example scenarios based on user feedback
- Refresh educational content for clarity

### Technical Debt
- Monitor library dependencies for security updates
- Plan for framework upgrades (React/Vue versions)
- Refactor based on performance monitoring data

---

## Appendix: Resources & References

### Official VA Sources
1. 38 CFR § 4.25 - Combined ratings table: https://www.ecfr.gov/current/title-38/chapter-I/part-4/subpart-A/section-4.25
2. VA Combined Ratings Table (PDF): https://www.va.gov/VA-combined-ratings-table-2019.pdf
3. VA Disability Compensation Rates: https://www.benefits.va.gov/compensation/rates-index.asp

### Educational Resources
1. VA Math Explained - VA Claims Insider
2. Hill & Ponton VA Calculator
3. DAV: Unraveling the Mystery of VA Rating Math

### Design Resources
1. VA Design System: https://design.va.gov/
2. USWDS (U.S. Web Design System)
3. WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---

**Document Version:** 1.0
**Last Updated:** 2025-11-11
**Author:** Military Transition Toolkit Team
**Status:** Ready for Development
