---
date: "2026-02-07"
---# Data Visualization Specification #038: Secondary Condition Connections Network Diagram

## Overview

**Visualization Type:** Interactive Network Graph / Force-Directed Diagram
**Primary Purpose:** Visualize relationships between primary service-connected conditions and common secondary conditions
**Target Audience:** Veterans planning claims, VSOs developing claim strategies, medical professionals, veteran advocates
**Complexity Level:** High
**Estimated Development Time:** 50-60 hours

## Executive Summary

This advanced network visualization maps the complex web of relationships between primary VA disability conditions and their common secondary conditions. Using a force-directed graph layout, the visualization shows how conditions like PTSD, back pain, and knee injuries often lead to secondary conditions such as sleep apnea, depression, and opposite-side joint problems. Based on medical research and VA adjudication data, this tool helps veterans identify potential secondary claims they may not have considered, potentially increasing their overall disability rating significantly.

## Business Objectives

1. **Primary Goal:** Help veterans identify legitimate secondary conditions to maximize their disability rating
2. **Secondary Goal:** Educate about the medical connections between conditions for stronger nexus letters
3. **Tertiary Goal:** Visualize the "ripple effect" of service-connected injuries on overall health
4. **Success Metrics:**
   - 70% of users discover at least one potential secondary condition
   - Average increase in claimed conditions: +2.3 per user
   - 55% of users save or export their personalized connection map
   - Reduced incomplete claims by 40%

## Data Source & Research

### Official Sources
- **38 CFR § 3.310** - Disabilities that are proximately due to or aggravated by service-connected disease
- **VA Board of Appeals Decisions** - Secondary service connection precedents
- **Medical Literature** - Journal articles on condition correlations
- **VA Claims Insider Research** - Top 100 secondary conditions list
- **Berry Law / Hill & Ponton Secondary Condition Guides**

### Primary-Secondary Connection Data

**Connection Strength Metrics:**
- **Very High (>60% correlation):** Thick lines, 4px width
- **High (40-60% correlation):** Medium lines, 3px width
- **Moderate (20-40% correlation):** Standard lines, 2px width
- **Low (10-20% correlation):** Thin lines, 1px width
- **Documented (<10% but VA-recognized):** Dotted lines, 1px

### Sample Data: Top Secondary Condition Networks

**Network 1: PTSD (Primary Condition)**

| Secondary Condition | Connection Strength | Correlation % | Annual Claims |
|---------------------|---------------------|---------------|---------------|
| Sleep Apnea | Very High | 69% | 614,000 |
| Depression | Very High | 62% | 985,000 |
| Anxiety Disorders | Very High | 71% | 698,000 |
| Migraine Headaches | High | 48% | 763,000 |
| Irritable Bowel Syndrome (IBS) | Moderate | 35% | 315,000 |
| Hypertension | Moderate | 28% | 445,000 |
| Gastroesophageal Reflux (GERD) | Moderate | 32% | 508,000 |
| Insomnia (separate from sleep apnea) | High | 58% | 412,000 |
| Chronic Pain Syndrome | Moderate | 38% | 268,000 |
| Erectile Dysfunction | Moderate | 25% | 187,000 |

**Network 2: Lower Back Pain / Lumbosacral Strain (Primary)**

| Secondary Condition | Connection Strength | Correlation % | Annual Claims |
|---------------------|---------------------|---------------|---------------|
| Radiculopathy (Sciatic Nerve) | Very High | 67% | 1,079,000 |
| Hip Pain (Bilateral) | Very High | 64% | 580,000 |
| Knee Pain (Compensatory) | High | 52% | 475,000 |
| Depression (Chronic Pain) | High | 45% | 725,000 |
| Sciatica | Very High | 71% | 892,000 |
| Degenerative Disc Disease | High | 58% | 423,000 |
| Muscle Atrophy | Moderate | 32% | 214,000 |
| Foot Drop | Moderate | 18% | 95,000 |
| Sleep Disturbance | High | 41% | 367,000 |
| Anxiety (Pain-Related) | Moderate | 34% | 285,000 |

**Network 3: Knee Disability (Primary)**

| Secondary Condition | Connection Strength | Correlation % | Annual Claims |
|---------------------|---------------------|---------------|---------------|
| Opposite Knee Pain | Very High | 68% | 705,000 |
| Lower Back Pain | Very High | 61% | 632,000 |
| Hip Pain (Same Side) | High | 54% | 445,000 |
| Ankle Pain/Instability | High | 47% | 387,000 |
| Plantar Fasciitis | Moderate | 38% | 312,000 |
| Degenerative Arthritis | High | 56% | 403,000 |
| Depression | Moderate | 31% | 320,000 |
| Foot Pain | High | 43% | 355,000 |
| GERD (from NSAIDs) | Moderate | 22% | 181,000 |
| IBS (from pain medications) | Low | 15% | 123,000 |

**Network 4: Diabetes Mellitus Type II (Primary)**

| Secondary Condition | Connection Strength | Correlation % | Annual Claims |
|---------------------|---------------------|---------------|---------------|
| Peripheral Neuropathy | Very High | 78% | 452,000 |
| Hypertension | Very High | 65% | 377,000 |
| Kidney Disease | High | 42% | 244,000 |
| Erectile Dysfunction | High | 51% | 296,000 |
| Retinopathy | High | 48% | 278,000 |
| Stroke | Moderate | 28% | 162,000 |
| Heart Disease | High | 45% | 261,000 |
| Foot Ulcers | Moderate | 35% | 203,000 |
| Depression | Moderate | 38% | 220,000 |
| Gastroparesis | Low | 12% | 70,000 |

**Network 5: Tinnitus/Hearing Loss (Primary)**

| Secondary Condition | Connection Strength | Correlation % | Annual Claims |
|---------------------|---------------------|---------------|---------------|
| Migraine Headaches | Moderate | 36% | 1,152,000 |
| Vertigo | High | 44% | 701,000 |
| Sleep Disturbance | Moderate | 38% | 608,000 |
| Depression | Moderate | 31% | 496,000 |
| Anxiety | Moderate | 34% | 544,000 |
| TMJ (Temporomandibular Joint) | Moderate | 28% | 448,000 |
| Meniere's Disease | Low | 15% | 240,000 |

**Network 6: Neck Pain / Cervical Strain (Primary)**

| Secondary Condition | Connection Strength | Correlation % | Annual Claims |
|---------------------|---------------------|---------------|---------------|
| Cervical Radiculopathy | Very High | 72% | 432,000 |
| Migraine Headaches | Very High | 63% | 378,000 |
| Shoulder Pain (Bilateral) | High | 57% | 342,000 |
| TMJ Disorder | Moderate | 35% | 210,000 |
| Upper Back Pain | High | 59% | 354,000 |
| Arm Weakness/Numbness | High | 48% | 288,000 |
| Depression | Moderate | 37% | 222,000 |
| Sleep Apnea | Moderate | 29% | 174,000 |
| Vertigo | Moderate | 26% | 156,000 |

### Evidence Requirements for Secondary Claims

| Evidence Type | Strength | Required for Claim | Typical Success Rate |
|---------------|----------|-------------------|---------------------|
| Medical Nexus Letter | Very Strong | Highly Recommended | 72% |
| VA C&P Examiner Opinion | Very Strong | VA-Initiated | 78% |
| Medical Records (Treatment History) | Strong | Required | 65% |
| Scientific/Medical Literature | Moderate | Supporting | 58% |
| Buddy Statements | Moderate | Supporting | 45% |
| Personal Statement | Weak | Supporting | 38% |

## Visual Design Specifications

### Layout & Structure

**Canvas Dimensions:** 1600px width × 1200px height (interactive, zoomable canvas)
**Graph Area:** Full canvas with 40px margin on all sides
**Zoom Range:** 50% to 300%
**Responsive Breakpoints:**
- Desktop (1600px+): Full interactive network
- Laptop (1024px-1599px): Scaled down network
- Tablet (768px-1023px): Simplified hierarchical tree view
- Mobile (<768px): List view with expandable sections

### Color Palette

**Node Colors by Condition Category:**
- Musculoskeletal (Primary): `#E74C3C` (red)
- Mental Health (Primary): `#9B59B6` (purple)
- Neurological (Primary): `#3498DB` (blue)
- Metabolic/Endocrine (Primary): `#E67E22` (orange)
- Auditory (Primary): `#F39C12` (gold)
- Cardiovascular (Primary): `#C0392B` (dark red)

**Secondary Node Colors:**
- Same Category: 20% opacity of primary color
- Different Category: `#95A5A6` (gray) with colored border
- High Correlation (>60%): Solid fill
- Medium Correlation (30-60%): 70% opacity
- Low Correlation (<30%): 40% opacity

**Connection Line Colors:**
- Very High Strength: `#27AE60` (green) - 4px
- High Strength: `#2ECC71` (light green) - 3px
- Moderate Strength: `#F1C40F` (yellow) - 2px
- Low Strength: `#E67E22` (orange) - 1px
- Documented/Research-Based: `#95A5A6` (gray) - 1px dotted

**UI Elements:**
- Background: `#1A1A2E` (dark blue-gray, for better contrast)
- Canvas Grid: `#2A2A3E` (1px dotted, subtle)
- Selected Node Highlight: `#00D9FF` (cyan) with glow
- Hover State: `#FFD700` (gold) border, 3px
- Tooltip Background: `rgba(255, 255, 255, 0.98)`
- Panel Background: `#FFFFFF`

### Typography

**Primary Font:** Inter
**Accent Font:** Poppins (for statistics)

**Font Specifications:**
- Title: 36px, Bold, `#FFFFFF`
- Subtitle: 18px, Regular, `#B0B0B0`
- Node Labels (Primary): 14px, Semibold, `#FFFFFF`
- Node Labels (Secondary): 12px, Regular, `#E0E0E0`
- Tooltip Headers: 16px, Semibold, `#1A1A2E`
- Tooltip Body: 14px, Regular, `#333333`
- Statistics: 20px, Bold, Poppins, `#00D9FF`
- Legend Text: 12px, Regular, `#CCCCCC`
- Panel Headers: 24px, Semibold, `#1A1A2E`

### Node Design

**Primary Condition Nodes:**
- Shape: Circle
- Diameter: 80-120px (scales with number of connections)
- Border: 4px solid (condition category color)
- Background: Gradient (darker shade to lighter)
- Shadow: `0 4px 16px rgba(0, 0, 0, 0.4)`
- Icon: Condition-specific medical icon (white, 32px)
- Label: Below circle, white text

**Secondary Condition Nodes:**
- Shape: Circle
- Diameter: 50-70px (scales with correlation strength)
- Border: 2px solid
- Background: Solid or gradient based on correlation
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.3)`
- Icon: Optional, 20px
- Label: Below circle, light gray text

**Node States:**
- **Default:** Standard styling
- **Hover:** Border increases to 4px, glow effect, label brightens
- **Selected:** Cyan border with pulsing animation, connections highlight
- **Faded:** 30% opacity (when other node selected)
- **Highlighted:** 100% opacity with connection path traced

**Connection Lines:**
- Curved paths (quadratic Bezier curves)
- Animated flow particles for selected connections (1s loop)
- Width varies by strength (1-4px)
- Opacity: 0.7 default, 1.0 on hover
- Dotted for research-only connections (no direct medical evidence)

### Legend Design

**Position:** Bottom-left corner, 400px × 300px panel

**Connection Strength:**
```
Connection Strength
━━━━ Very High (>60%)    Common, well-documented
━━━  High (40-60%)       Frequently seen
━━   Moderate (20-40%)   Possible connection
━    Low (10-20%)        Occasional link
┄┄┄  Research-Based      Documented but rare
```

**Condition Categories:**
```
Primary Conditions
● Musculoskeletal    ● Mental Health
● Neurological       ● Metabolic/Endocrine
● Auditory           ● Cardiovascular
```

**Interactive Guide:**
```
How to Use
• Click primary condition to see all connections
• Hover over line to see correlation strength
• Double-click secondary to make it primary
• Use search to find specific conditions
• Filter by correlation strength
```

## Interactive Features

### Primary Interactions

1. **Node Selection:**
   - Click primary node → Highlight all connected secondaries
   - Fade out unconnected nodes to 30% opacity
   - Display statistics panel on right side
   - Animate connections with flowing particles
   - Secondary nodes pulse slightly

2. **Focus Mode:**
   - Double-click any secondary condition
   - Transforms it into a new primary condition
   - Reorganizes graph to show its secondary connections
   - Breadcrumb trail shows navigation history
   - "Back" button returns to previous view

3. **Connection Exploration:**
   - Hover over connection line
   - Tooltip shows correlation percentage and claim count
   - Line thickness increases by 1px
   - Both connected nodes highlight
   - Shows required evidence for claim

4. **Multi-Select Comparison:**
   - Ctrl/Cmd + Click to select multiple primary conditions
   - Shows overlapping secondary conditions with special highlight
   - Venn diagram view option for overlaps
   - "My Conditions" saved list

5. **Evidence Explorer:**
   - Click on secondary node
   - Opens side panel (500px wide)
   - Shows required evidence types
   - Sample nexus letter language
   - Related CFR references
   - Typical processing time
   - Success rate percentage

### Filtering & Controls

**Top Control Bar:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Search Conditions...]  [Filter ▼]  [Zoom: 100% ±]  [Reset]     │
│                                                                   │
│ Show Connections: ☑ Very High  ☑ High  ☑ Moderate  ☐ Low        │
└─────────────────────────────────────────────────────────────────┘
```

**Filter Options:**
- **By Correlation:** Slider (0-100%)
- **By Category:** Checkbox list of condition types
- **By Evidence Strength:** Nexus required, C&P sufficient, etc.
- **By Claims Volume:** Show only >100K annual claims

**Zoom & Pan:**
- Mouse wheel to zoom in/out
- Click and drag canvas to pan
- Minimap in bottom-right corner (150px × 100px)
- Reset view button returns to default layout

### Side Panel (Evidence Details)

**Panel Sections:**

**1. Condition Overview**
```
Sleep Apnea Secondary to PTSD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Correlation: 69% (Very High)
Annual Claims: 614,000
Typical Rating: 50% (with CPAP)
Diagnostic Code: 6847
```

**2. Medical Connection**
```
Scientific Basis:
Studies show Iraq/Afghanistan veterans with PTSD
have 69% prevalence of obstructive sleep apnea.
PTSD-related hyperarousal, nightmares, and anxiety
contribute to sleep fragmentation and airway
obstruction.

[View Research Sources ↗]
```

**3. Evidence Checklist**
```
Required Evidence:
☑ Sleep study (polysomnography)
☑ PTSD diagnosis (already service-connected)
☑ Nexus letter from doctor
☐ Buddy statements (optional but helpful)
☐ Treatment records showing timeline

Evidence Strength: Strong
Typical Approval Rate: 72%
```

**4. Sample Nexus Language**
```
"In my professional medical opinion, it is at
least as likely as not that the veteran's
obstructive sleep apnea is secondary to and
aggravated by their service-connected PTSD."

[Copy to Clipboard] [Download Full Template]
```

**5. Related Resources**
```
• How to Get a Sleep Study
• Finding a Doctor for Nexus Letters
• VA Form 21-0995 (Supplemental Claim)
• Sleep Apnea Rating Schedule Guide
```

### Tooltips

**Primary Node Tooltip:**
```
┌────────────────────────────────────────┐
│ PTSD (Post-Traumatic Stress Disorder)  │
│────────────────────────────────────────│
│ Service-Connected Recipients: 1.59M    │
│ Most Common Rating: 70%                │
│ Secondary Conditions: 10 shown         │
│                                        │
│ [Click to explore connections]         │
└────────────────────────────────────────┘
```

**Secondary Node Tooltip:**
```
┌────────────────────────────────────────┐
│ Sleep Apnea                            │
│────────────────────────────────────────│
│ Secondary to: PTSD                     │
│ Correlation: 69% (Very High)           │
│ Annual Secondary Claims: 614,000       │
│ Typical Rating: 50% (with CPAP)        │
│ Evidence Required: Nexus + Sleep Study │
│                                        │
│ [Click for evidence details]           │
└────────────────────────────────────────┘
```

**Connection Line Tooltip:**
```
┌─────────────────────────────────────┐
│ PTSD → Sleep Apnea                  │
│─────────────────────────────────────│
│ Connection Strength: 69%            │
│ Veterans Affected: ~1.1 million     │
│ VA Recognition: Well-Established    │
│ CFR: 38 CFR § 3.310                 │
│                                     │
│ Typical Evidence:                   │
│ • Medical nexus letter (required)   │
│ • Sleep study results (required)    │
│ • Treatment records (recommended)   │
└─────────────────────────────────────┘
```

### Saved Conditions Feature

**My Conditions Panel (Left Side):**

```
┌──────────────────────────────┐
│ My Conditions (3)            │
│──────────────────────────────│
│ ☑ PTSD (Primary)             │
│   └─ Sleep Apnea             │
│   └─ Depression              │
│   └─ Migraines               │
│                              │
│ ☑ Lower Back Pain (Primary)  │
│   └─ Sciatica                │
│   └─ Hip Pain                │
│                              │
│ ☑ Knee Injury (Primary)      │
│   └─ Opposite Knee           │
│                              │
│ Potential Combined: 84%      │
│                              │
│ [Export List] [Print Guide]  │
└──────────────────────────────┘
```

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

**Color Independence:**
- All connection strengths use both color AND line style
- Very High: Thick solid line
- High: Medium solid line
- Moderate: Thin solid line
- Low: Thin dashed line
- Research: Thin dotted line

**Keyboard Navigation:**
- Tab through all nodes in logical order (primary → secondary)
- Arrow keys to navigate between connected nodes
- Enter to select/deselect nodes
- Space to open evidence panel
- Escape to close panels and deselect
- "/" to focus search
- +/- to zoom

**Screen Reader Support:**
- Semantic HTML structure with ARIA landmarks
- ARIA live regions announce graph changes
- Detailed alt text for node relationships
- Table view alternative (accessible fallback)

**Screen Reader Announcements:**
```
"PTSD node, primary condition, 10 secondary connections"
"Connection to Sleep Apnea, very high correlation at 69%"
"Secondary condition node selected: Depression, connection to PTSD"
"Evidence panel opened for Sleep Apnea secondary to PTSD"
```

**Alternative Views:**
- **List View:** Hierarchical expandable list
- **Table View:** Sortable data table
- **Text-Only:** Semantic HTML description
- **High Contrast Mode:** Increased contrast, simplified colors

**Focus Indicators:**
- All interactive elements: 3px solid `#00D9FF` outline
- 2px offset from element
- High contrast against dark background
- Visible in both light and dark modes

### Motion Sensitivity

- Respect `prefers-reduced-motion`
- Disable particle animations
- Instant transitions instead of animated
- Static layout option (no force-directed movement)

## Technical Implementation Notes

### Frontend Technologies

**Recommended Stack:**
- **Framework:** React 18+ with TypeScript
- **Graph Library:** D3.js v7 (force simulation) or Cytoscape.js
- **State Management:** Zustand
- **Styling:** Styled Components + CSS Modules
- **Animation:** Framer Motion (with motion sensitivity checks)
- **Canvas Rendering:** SVG for small graphs, Canvas for >50 nodes

### Force-Directed Graph Algorithm

**D3 Force Simulation Settings:**

```javascript
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links)
    .id(d => d.id)
    .distance(d => {
      // Distance based on correlation (closer = stronger)
      return 200 - (d.correlation * 1.5);
    })
  )
  .force("charge", d3.forceManyBody()
    .strength(-500) // Repulsion between nodes
  )
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(60));
```

### Data Structure (TypeScript)

```typescript
interface ConditionNode {
  id: string;
  name: string;
  category: ConditionCategory;
  isPrimary: boolean;
  recipients: number;
  mostCommonRating: number;
  diagnosticCode: string;
  x?: number; // Position set by force simulation
  y?: number;
}

interface ConditionConnection {
  source: string; // Node ID
  target: string; // Node ID
  correlation: number; // 0-100
  claimVolume: number;
  evidenceRequired: EvidenceType[];
  strengthLevel: 'very-high' | 'high' | 'moderate' | 'low' | 'research';
  nexusLanguage?: string;
  cfrReference?: string;
}

interface NetworkGraph {
  nodes: ConditionNode[];
  connections: ConditionConnection[];
  metadata: {
    lastUpdated: string;
    dataSource: string;
    totalPrimaryConditions: number;
    totalSecondaryMappings: number;
  };
}
```

### Performance Optimization

**Rendering Strategy:**
- Use Canvas for graphs with >50 nodes
- SVG for smaller, more interactive graphs
- Virtual viewport rendering (only render visible nodes)
- Quadtree for efficient collision detection
- Web Workers for force simulation calculations

**Bundle Optimization:**
- Code splitting by route
- Lazy load evidence panels
- Compress SVG assets
- Tree-shake D3 (import only needed modules)
- Target bundle size: <250KB gzipped

### API Endpoints

```
GET /api/secondary-conditions/network
GET /api/secondary-conditions/primary/{id}
GET /api/secondary-conditions/connection/{primaryId}/{secondaryId}
GET /api/secondary-conditions/evidence-requirements/{conditionId}
POST /api/secondary-conditions/user-conditions (save list)
```

### Browser Support

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- No IE11 (due to D3.js v7 requirements)

## Content & Messaging

### Main Title
"VA Disability Secondary Conditions Network: Maximize Your Rating"

### Subtitle
"Explore medical connections between conditions to identify legitimate secondary claims"

### Introduction
"Many veterans leave disability benefits on the table by not claiming secondary conditions—disabilities caused or aggravated by service-connected conditions. This interactive network visualization shows scientifically-documented connections between primary and secondary conditions, helping you build a more complete and accurate claim."

### Educational Callouts

**Callout 1: "What Are Secondary Conditions?"**
"According to 38 CFR § 3.310, disabilities that are 'proximately due to or aggravated by' a service-connected condition can be rated as secondary. For example, if service-connected PTSD causes sleep apnea, the sleep apnea can be rated as a secondary condition."

**Callout 2: "Why Secondary Claims Matter"**
"Adding legitimate secondary conditions can significantly increase your combined VA rating. A veteran with PTSD at 70% who adds secondary sleep apnea (50%) and depression (50%) could reach a combined rating of 100%, increasing monthly compensation from $1,716 to $3,831."

**Callout 3: "You Need Medical Evidence"**
"While this visualization shows documented connections, the VA requires medical evidence linking YOUR specific conditions. Work with your doctor to obtain a nexus letter stating the secondary condition is 'at least as likely as not' caused by your primary condition."

**Callout 4: "Legitimate Claims Only"**
"This tool is designed to help you identify conditions you may genuinely have. Filing false claims is illegal and can result in penalties. Only claim conditions you actually experience and can document with medical evidence."

### Disclaimers

1. "This visualization represents general medical correlations and VA adjudication patterns. Individual results vary based on specific medical evidence and circumstances."
2. "Correlation percentages derived from medical research studies and VA claims data analysis, not official VA statistics."
3. "Always consult with a VA-accredited representative or attorney before filing secondary condition claims."
4. "The presence of a connection in this visualization does not guarantee VA approval. Medical nexus evidence is required."

## Production Timeline & Resources

### Development Phases

**Phase 1: Data Research & Validation (2 weeks)**
- Compile secondary condition research from medical journals
- Analyze VA Board decisions for precedents
- Calculate correlation percentages from available data
- Create master database of connections
- Legal review of medical claims

**Phase 2: Design & Prototyping (1.5 weeks)**
- Graph layout experimentation
- Node and connection design
- Panel and tooltip design
- Mobile responsive strategy
- Accessibility considerations

**Phase 3: Core Development (3 weeks)**
- D3.js force simulation setup
- Node and edge rendering
- Interactive features (selection, filtering)
- Zoom and pan controls
- Performance optimization

**Phase 4: Panel & Detail Development (1 week)**
- Evidence requirement panels
- Nexus letter templates
- Search and filter functionality
- Saved conditions feature
- Export functionality

**Phase 5: Accessibility & Alternative Views (1 week)**
- Keyboard navigation
- Screen reader support
- Table view alternative
- High contrast mode
- Testing with assistive technologies

**Phase 6: Content & Documentation (0.5 weeks)**
- Educational content writing
- Tooltip text creation
- Help documentation
- Video tutorial creation

**Phase 7: Testing & QA (1.5 weeks)**
- Cross-browser testing
- Performance profiling
- Accessibility audit (WAVE, axe, NVDA testing)
- User acceptance testing with veterans
- Load testing with full dataset

**Phase 8: Deployment & Monitoring (0.5 weeks)**
- Production deployment
- Analytics implementation
- Error monitoring setup
- Performance monitoring
- User feedback collection

### Team Requirements

- **Medical/VA Subject Matter Expert:** 60 hours
- **Data Analyst/Researcher:** 80 hours
- **UX/UI Designer:** 70 hours
- **Senior Frontend Developer:** 120 hours
- **Accessibility Specialist:** 24 hours
- **Content Writer:** 30 hours
- **QA Engineer:** 40 hours
- **Total Estimated Hours:** 424 hours

### Budget Estimate

- **Research & SME:** $6,000 (140 hrs × $43/hr avg)
- **Design:** $7,000 (70 hrs × $100/hr)
- **Development:** $15,000 (120 hrs × $125/hr)
- **Content & Accessibility:** $3,240 (54 hrs × $60/hr)
- **QA & Testing:** $2,400 (40 hrs × $60/hr)
- **Tools & Services:** $800
- **Contingency (15%):** $5,166
- **Total Estimated Budget:** $39,606

## Success Metrics & KPIs

### User Engagement
- **Daily Active Users:** 1,000+
- **Average Session Duration:** >6 minutes
- **Node Interactions:** Average 8+ clicks per session
- **Evidence Panel Opens:** >50% of users
- **Conditions Saved:** Average 3.5 per active user
- **Export Rate:** >30% export or print

### Educational Outcomes
- **Discovery:** 70% identify new potential secondary condition
- **Comprehension:** 80% understand what secondary conditions are (post-quiz)
- **Actionability:** 65% plan to file for newly identified condition
- **Evidence Understanding:** 75% know they need nexus letter

### Technical Performance
- **Initial Load:** <3 seconds (median)
- **Graph Rendering:** <1.5 seconds for 50 nodes
- **Interaction Responsiveness:** <100ms
- **Lighthouse Score:** >85 (Performance, Accessibility, Best Practices)
- **Error Rate:** <1% of sessions

### Business Impact
- **Increased Claims:** 40% more secondary conditions claimed by users
- **Higher Ratings:** Average combined rating increase of 12%
- **User Satisfaction:** >85% find tool helpful (survey)
- **Return Usage:** 45% return within 60 days
- **VSO Adoption:** Used by 25+ VSO organizations

## Maintenance Plan

### Regular Updates

**Monthly:**
- Review user feedback and bug reports
- Monitor performance metrics
- Update correlation data if new research available

**Quarterly:**
- Add new primary-secondary connections based on emerging research
- Refresh nexus letter templates
- Update CFR references if regulations change
- Performance optimization review

**Annually:**
- Comprehensive data audit
- Update all medical research citations
- Accessibility audit and remediation
- Major UX improvements based on user feedback
- Graph algorithm optimization

### Content Maintenance

- Monitor VA Board decisions for new secondary precedents
- Update evidence requirements if VA policy changes
- Refresh educational content for clarity
- Add new conditions as they become recognized

### Technical Debt

- D3.js updates every 6 months
- React/TypeScript updates quarterly
- Security patches within 72 hours
- Browser compatibility testing quarterly
- Performance profiling semi-annually

---

## Appendix: Data Sources & References

### Official VA Regulations
1. 38 CFR § 3.310 - Disabilities that are proximately due to or aggravated by service-connected disease
2. 38 CFR Part 4 - Schedule for Rating Disabilities
3. VA Board of Appeals Decisions Database

### Medical Research
1. "Sleep Apnea and PTSD in Veterans" - Journal of Clinical Sleep Medicine
2. "Secondary Conditions in Veterans with Musculoskeletal Injuries" - Military Medicine
3. "Mental Health Secondary to Chronic Pain" - Pain Medicine Journal

### VA Claims Resources
1. VA Claims Insider - Top 100 Secondary Conditions: https://vaclaimsinsider.com/va-disability-list-of-secondary-conditions/
2. Berry Law - Secondary Conditions Guide: https://ptsdlawyers.com/va-disability-list-of-secondary-conditions/
3. Hill & Ponton - Filing Secondary Claims: https://www.hillandponton.com/filing-secondary-conditions/

### Technical Resources
1. D3.js Force Directed Graph Documentation
2. Cytoscape.js Network Visualization
3. Web Accessibility Initiative - Complex Images

---

**Document Version:** 1.0
**Last Updated:** 2025-11-11
**Author:** Military Transition Toolkit Team
**Status:** Ready for Development
