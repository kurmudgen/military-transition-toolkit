---

date: "2026-03-08"
---# SEO Internal Linking Strategy

## Overview
Strategic internal linking map for 1,600+ pages using hub-and-spoke model to distribute link equity, improve crawlability, and enhance user experience.

---

## Internal Linking Philosophy

### Goals
1. **Distribute PageRank** - Flow authority from high-traffic pages to new content
2. **Improve Crawlability** - Help Google discover and index all 1,600 pages
3. **Enhance User Experience** - Guide visitors to relevant content
4. **Boost Conversions** - Link to high-value pages (tools, resources)
5. **Support Topic Clusters** - Connect related content within clusters

### Core Principles
- Every page should have **3-5 internal links** minimum
- Every page should be **no more than 3 clicks** from homepage
- Use **descriptive anchor text** (no "click here" or generic text)
- Link to **relevant, contextually related** content
- **Prioritize deep linking** (not just homepage links)
- **Update old content** to link to new content as published

---

## Site Architecture (Hub and Spoke Model)

```
Homepage (Hub 0)
├─ Career Guides Hub (Hub 1)
│  ├─ Army Careers Hub (Hub 2)
│  │  ├─ 11B Infantry Guide (Spoke)
│  │  ├─ 68W Combat Medic Guide (Spoke)
│  │  └─ [78 more Army MOSs] (Spokes)
│  ├─ Navy Careers Hub (Hub 2)
│  │  ├─ HM Hospital Corpsman Guide (Spoke)
│  │  └─ [40 more Navy ratings] (Spokes)
│  ├─ Marines Careers Hub (Hub 2)
│  ├─ Air Force Careers Hub (Hub 2)
│  └─ Coast Guard Careers Hub (Hub 2)
│
├─ State Benefits Hub (Hub 1)
│  ├─ California Benefits Guide (Spoke)
│  ├─ Texas Benefits Guide (Spoke)
│  └─ [48 more states] (Spokes)
│
├─ VA Claims Hub (Hub 1)
│  ├─ How to File VA Claim (Spoke)
│  ├─ VA Nexus Letter Guide (Spoke)
│  └─ [12 more VA guides] (Spokes)
│
└─ Transition Resources Hub (Hub 1)
   ├─ Military Resume Guide (Spoke)
   ├─ SkillBridge Programs (Spoke)
   └─ [50+ resources] (Spokes)
```

---

## Hub Pages Strategy

### Hub 0: Homepage

**Purpose:** Central navigation, distribute link equity to all Hub 1 pages

**Links Out (8-12 links):**
1. Career Guides Hub
2. State Benefits Hub
3. VA Claims Hub
4. Transition Resources Hub
5. Tools Page (calculator, translator)
6. Blog Homepage
7. About/Mission
8. Top 3-5 most popular career guides (based on search volume)

**Optimization:**
- Homepage gets most external backlinks → Distribute that equity
- Link to top performers in each cluster
- Update monthly with trending content
- Feature new high-value content

**Example HTML:**
```html
<section class="popular-career-guides">
  <h2>Popular Career Transition Guides</h2>
  <ul>
    <li><a href="/career-guides/army/68w-combat-medic">68W Combat Medic Career Guide</a></li>
    <li><a href="/career-guides/navy/hm-hospital-corpsman">Hospital Corpsman Career Guide</a></li>
    <li><a href="/career-guides/army/11b-infantry">11B Infantry Career Guide</a></li>
  </ul>
</section>
```

---

### Hub 1: Career Guides Hub

**URL:** `/career-guides`

**Purpose:** Central hub for all 278 career guides, organized by branch

**Content Structure:**
```markdown
# Military to Civilian Career Guides

Complete transition guides for every military job (MOS, AFSC, rating, NEC).
Discover civilian career paths, salary ranges, required certifications, and
top employers hiring veterans.

## Career Guides by Branch

### Army Career Guides (80 MOSs)
Transitioning from the Army? Explore career guides organized by job series:
- [Infantry (11 Series)](/career-guides/army/infantry)
- [Special Forces (18 Series)](/career-guides/army/special-forces)
- [Medical (68 Series)](/career-guides/army/medical)
- [View all Army career guides →](/career-guides/army)

### Navy Career Guides (41 ratings)
- [Hospital Corpsman (HM)](/career-guides/navy/hm-hospital-corpsman)
- [Information Systems Technician (IT)](/career-guides/navy/it-information-systems)
- [View all Navy career guides →](/career-guides/navy)

[Continue for all branches...]

## Popular Career Guides
1. [68W Combat Medic](/career-guides/army/68w-combat-medic)
2. [11B Infantry](/career-guides/army/11b-infantry)
3. [HM Hospital Corpsman](/career-guides/navy/hm-hospital-corpsman)
[List top 20 by traffic]

## Career Tools
- [Military Skills Translator](/tools/skills-translator)
- [Salary Comparison Tool](/tools/salary-comparison)
- [Certification Finder](/tools/certification-finder)
```

**Links Out (50-100 links):**
- Link to all Hub 2 pages (5 branch hubs)
- Link to top 20 individual career guides
- Link to related tools
- Link to transition resources

---

### Hub 2: Army Career Guides Hub

**URL:** `/career-guides/army`

**Purpose:** Organize all 80 Army MOS guides

**Content Structure:**
```markdown
# Army Career Transition Guides

Complete civilian career guides for all 80 Army MOSs. Find your MOS, discover
civilian job matches, salary expectations, and certification requirements.

## Army Career Guides by Series

### Infantry (11 Series)
- [11B Infantry](/career-guides/army/11b-infantry)
- [11C Indirect Fire Infantryman](/career-guides/army/11c-indirect-fire)
- [12B Combat Engineer](/career-guides/army/12b-combat-engineer)

### Special Forces (18 Series)
- [18A Special Forces Officer](/career-guides/army/18a-special-forces-officer)
- [18B Special Forces Weapons Sergeant](/career-guides/army/18b-weapons-sergeant)

### Medical (68 Series)
- [68W Combat Medic](/career-guides/army/68w-combat-medic)
- [68K Medical Laboratory Specialist](/career-guides/army/68k-lab-specialist)

[Continue for all series...]

## Most Popular Army Guides
[List top 15 Army guides by traffic]

## Related Resources
- [Army to Civilian Resume Guide](/resources/army-resume)
- [Army SkillBridge Programs](/resources/army-skillbridge)
- [State Veteran Benefits](/veteran-benefits)
```

**Links Out (100-120 links):**
- Link to ALL 80 Army MOS guides
- Link to related resources (resume, SkillBridge)
- Link to state benefits hub
- Link back to Career Guides Hub (breadcrumb)

**Repeat this pattern for:**
- `/career-guides/navy` (41 ratings)
- `/career-guides/marines` (120+ MOSs)
- `/career-guides/air-force` (30+ AFSCs)
- `/career-guides/coast-guard` (25+ ratings)

---

### Hub 1: State Benefits Hub

**URL:** `/veteran-benefits`

**Content Structure:**
```markdown
# State Veteran Benefits Guide

Comprehensive guide to veteran benefits in all 50 states. Discover property
tax exemptions, education waivers, healthcare programs, and employment resources.

## Benefits by State

### Top States for Veterans
- [California Veteran Benefits](/veteran-benefits/california) - $12,000+ in annual savings
- [Texas Veteran Benefits](/veteran-benefits/texas) - Property tax exemptions
- [Florida Veteran Benefits](/veteran-benefits/florida) - No state income tax

### All 50 States (Alphabetical)
[A-Z list of all state benefit guides]

## Types of State Benefits
- Property Tax Exemptions (50 states compared)
- Education Benefits (state GI Bills)
- Healthcare Programs
- Employment Preferences
- Housing Assistance

## Regional Comparisons
- [Northeast States Comparison](/blog/northeast-veteran-benefits)
- [Southern States Comparison](/blog/southern-veteran-benefits)
- [West Coast Comparison](/blog/west-coast-veteran-benefits)

## Related Resources
- [VA Federal Benefits](/va-claims)
- [Military Retirement Calculator](/tools/retirement-calculator)
```

**Links Out (70-100 links):**
- All 50 state guides
- Regional comparison articles
- Related federal benefits (VA claims)
- Tools (calculators)

---

### Hub 1: VA Claims Hub

**URL:** `/va-claims`

**Content Structure:**
```markdown
# VA Disability Claims Guide

Complete guide to VA disability claims: how to file, maximize your rating,
appeal denials, and understand the process. Free checklists and templates.

## Essential VA Claims Guides
- [How to File a VA Disability Claim](/va-claims/how-to-file)
- [VA Disability Rates 2025](/va-claims/disability-rates-2025)
- [VA Nexus Letter Guide](/va-claims/nexus-letter-guide)
- [VA Secondary Conditions List](/va-claims/secondary-conditions)
- [How to Increase Your VA Rating](/va-claims/increase-rating)

## VA Claims by Condition
- [VA Claim for Tinnitus](/va-claims/tinnitus)
- [VA Claim for PTSD](/va-claims/ptsd)
- [VA Claim for Back Pain](/va-claims/back-pain)
- [VA Claim for Sleep Apnea](/va-claims/sleep-apnea)
[30+ condition-specific guides]

## VA Claims Process
- [BDD (Benefits Delivery at Discharge)](/va-claims/bdd-program)
- [C&P Exam Tips](/va-claims/cp-exam-tips)
- [VA Appeals Process](/va-claims/appeals)
- [Common VA Claim Mistakes](/blog/va-claim-mistakes)

## Tools and Resources
- [VA Rating Calculator](/tools/va-rating-calculator)
- [VA Claims Checklist](/downloads/va-claims-checklist)
- [Find a VSO](/resources/vso-locator)
```

**Links Out (50-70 links):**
- All 14 VA claims guides
- 30+ condition-specific guides
- Tools and calculators
- External resources (VA.gov, eBenefits)

---

## Spoke Pages (Individual Content) Linking Rules

### Career Guide Spoke Pages (278 pages)

**Example:** `/career-guides/army/68w-combat-medic`

**Required Internal Links (5-8 per page):**

1. **Breadcrumb navigation** (3 links)
   ```html
   <nav>
     <a href="/">Home</a> >
     <a href="/career-guides">Career Guides</a> >
     <a href="/career-guides/army">Army</a> >
     68W Combat Medic
   </nav>
   ```

2. **Related MOS Guides** (2-3 links)
   - Link to similar MOSs in same series
   - Link to MOSs with similar civilian paths
   ```markdown
   ## Related Career Guides
   If you're exploring healthcare careers, also check out:
   - [68K Medical Laboratory Specialist](/career-guides/army/68k-lab-specialist)
   - [HM Hospital Corpsman (Navy)](/career-guides/navy/hm-hospital-corpsman)
   - [4N0X1 Aerospace Medical Service (Air Force)](/career-guides/air-force/4n0x1-medical)
   ```

3. **State Benefits Link** (1 link)
   ```markdown
   After landing your civilian job, explore [veteran benefits in your state]
   (/veteran-benefits) to maximize your compensation through property tax
   exemptions and education programs.
   ```

4. **VA Claims Link** (1 link, if relevant)
   ```markdown
   Before separating, file your [VA disability claim](/va-claims/how-to-file)
   to ensure you receive benefits for service-connected conditions like
   hearing loss or back pain.
   ```

5. **Tools Link** (1 link)
   ```markdown
   Use our [Military Skills Translator](/tools/skills-translator) to convert
   your 68W experience into civilian job titles for your resume.
   ```

6. **Resource Link** (1 link)
   ```markdown
   Download our free [military resume template](/resources/resume-template)
   optimized for ATS systems and civilian hiring managers.
   ```

**Contextual Anchor Text Examples:**

✅ **Good (Descriptive):**
- "Learn how to [file your VA disability claim](/va-claims/how-to-file)"
- "Explore [California veteran benefits](/veteran-benefits/california)"
- "Former 11B Infantry also transition well to [law enforcement careers](/career-guides/army/11b-infantry)"

❌ **Bad (Generic):**
- "Click here for more information"
- "Read more"
- "Check this out"

---

### State Benefits Spoke Pages (150 pages)

**Example:** `/veteran-benefits/california`

**Required Internal Links (5-8 per page):**

1. **Breadcrumb navigation** (2 links)
   ```html
   <a href="/">Home</a> > <a href="/veteran-benefits">Veteran Benefits</a> > California
   ```

2. **Related State Guides** (2-3 links)
   - Geographic neighbors
   - Similar benefit structures
   ```markdown
   ## Compare with Nearby States
   - [Nevada Veteran Benefits](/veteran-benefits/nevada)
   - [Oregon Veteran Benefits](/veteran-benefits/oregon)
   - [Arizona Veteran Benefits](/veteran-benefits/arizona)
   ```

3. **Career Guides for State Industries** (2 links)
   ```markdown
   California has strong demand for:
   - [Tech professionals (25B, IT ratings)](/career-guides/army/25b-it-specialist)
   - [Healthcare workers (68W, HM)](/career-guides/army/68w-combat-medic)
   ```

4. **VA Claims Link** (1 link)
   ```markdown
   California veterans should also file for [federal VA disability benefits]
   (/va-claims) in addition to state benefits.
   ```

5. **Tools Link** (1 link)
   ```markdown
   Calculate your total benefits with our [Benefits Calculator]
   (/tools/benefits-calculator).
   ```

---

### VA Claims Spoke Pages (14 pages)

**Example:** `/va-claims/nexus-letter-guide`

**Required Internal Links (5-8 per page):**

1. **Breadcrumb navigation** (2 links)
2. **Related VA Claims Guides** (3 links)
   ```markdown
   ## Related VA Claims Resources
   - [How to File a VA Disability Claim](/va-claims/how-to-file)
   - [VA Secondary Conditions](/va-claims/secondary-conditions)
   - [VA Appeals Process](/va-claims/appeals)
   ```

3. **Condition-Specific Guides** (2 links)
   ```markdown
   Common conditions requiring nexus letters:
   - [VA Claim for PTSD](/va-claims/ptsd)
   - [VA Claim for Back Pain](/va-claims/back-pain)
   ```

4. **Tools Link** (1 link)
5. **Career or State Benefits Context** (1 link, if relevant)

---

## Content Cluster Internal Linking

### Cluster Strategy

Each of the 10 content clusters (see `seo-content-clusters.md`) should be **heavily interlinked**:

**Example: Army Career Transition Cluster (80 pieces)**

**Pillar Page:** `/career-guides/army` (Hub 2)
**Cluster Content:** 80 Army MOS guides

**Linking Pattern:**
- Pillar page links to ALL 80 spokes
- Each spoke links back to pillar page (breadcrumb)
- Each spoke links to 2-3 related spokes within cluster
- Each spoke links to 1-2 pieces outside cluster (state benefits, VA claims, tools)

**Visual:**
```
                    [Army Hub]
                   /    |    \
                  /     |     \
              [11B]  [68W]  [25B]
               / \    / \    / \
            [12B][19D][68K][31B][35F][91B]
```

---

## Link Equity Distribution

### High-Authority Pages (Link FROM These Frequently)

**Tier 1 - Homepage**
- Most external backlinks
- Highest authority
- Link to top Hub 1 pages

**Tier 2 - Hub 1 Pages**
- Career Guides Hub
- State Benefits Hub
- VA Claims Hub
- Transition Resources Hub

**Strategy:** As new content is published, add links FROM high-authority hub pages TO new content to pass link equity.

**Update Schedule:**
- Update homepage monthly (add links to top performers)
- Update Hub 1 pages weekly (add links to new content)
- Update Hub 2 pages as new cluster content is added

---

## Automated Internal Linking

### Contextual Link Opportunities (Automated)

Use plugins/scripts to auto-suggest internal links based on:
1. **Keyword matching** - Link when target keyword mentioned
2. **Semantic similarity** - Link topically related content
3. **User behavior** - Link to pages users typically visit next

**WordPress Plugins:**
- Link Whisper (paid, $77/yr) - AI-powered suggestions
- Internal Link Juicer (free) - Auto-link by keywords
- Yoast SEO Premium (paid) - Link suggestions

**Manual Implementation:**
Create a spreadsheet with:
- Column A: Page URL
- Column B: Target keyword
- Column C: Suggested internal links (3-5 per page)

As you write/edit content, reference spreadsheet to add links consistently.

---

## Anchor Text Strategy

### Anchor Text Distribution

**Target Mix:**
- 40% - Exact match ("68W civilian jobs")
- 30% - Partial match ("civilian jobs for 68W Combat Medics")
- 20% - Branded ("Military Transition Toolkit")
- 10% - Generic ("learn more", "see guide")

**Exact Match Examples:**
- "California veteran benefits"
- "VA nexus letter guide"
- "military to civilian resume"

**Partial Match Examples:**
- "How to file a VA disability claim"
- "Complete guide to California veteran benefits"
- "Best civilian careers for 11B Infantry"

**Branded Examples:**
- "Use the Military Transition Toolkit"
- "Our career planning tools"

**Avoid:**
- ❌ Over-optimization (100% exact match = spam signal)
- ❌ Generic anchor text only ("click here" provides no context)

---

## Link Placement Best Practices

### Where to Place Internal Links

**1. Within Body Content (Contextual)**
- Most valuable for SEO
- Most natural for users
- Place in first 300 words when relevant
- Place in conclusion/CTA section

**Example:**
```markdown
As a 68W Combat Medic, you've developed critical medical skills. Before
transitioning, [file your VA disability claim](/va-claims/how-to-file) to
receive benefits for hearing loss, back pain, or other service-connected
conditions.
```

**2. Related Posts Section (End of Article)**
- Keeps users engaged
- Reduces bounce rate
- Passes link equity

**Example:**
```markdown
## Related Career Guides
- [68K Medical Laboratory Specialist](/career-guides/army/68k-lab-specialist)
- [HM Hospital Corpsman (Navy)](/career-guides/navy/hm-hospital-corpsman)
- [31B Military Police Transition Guide](/career-guides/army/31b-military-police)
```

**3. Sidebar (Secondary)**
- "Popular Guides"
- "Recently Published"
- "Tools and Resources"

**4. Navigation (Header/Footer)**
- Main navigation: Hub 1 pages only
- Footer: Links to major hubs + legal pages

---

## Link Depth Strategy

### No Page Should Be More Than 3 Clicks from Homepage

**Click Depth Example:**

**Good (3 clicks):**
```
Homepage → Career Guides Hub → Army Hub → 68W Guide
```

**Bad (5 clicks):**
```
Homepage → Blog → Article → Career Guides → Army → Medical → 68W Guide
```

**Solution:** Every spoke page should link back to its hub pages via breadcrumbs.

---

## Internal Linking Workflow (For Publishing)

### Before Publishing ANY Page

1. **Identify 5-8 relevant internal link targets**
   - 1-2 hub pages (breadcrumbs)
   - 2-3 related spoke pages
   - 1-2 tool/resource pages
   - 1 high-authority page (if relevant)

2. **Write natural anchor text**
   - Mix exact, partial, branded
   - Descriptive and contextual

3. **Add links in body content**
   - At least 2 in main body
   - 2-3 in "Related Content" section
   - 1 in CTA section

4. **Update related pages to link BACK**
   - Find 3-5 existing pages that should link to new page
   - Add contextual links from those pages

### Monthly Linking Maintenance

**Week 1 of each month:**
- Review top 20 performing pages
- Add links from those pages to new content
- Update hub pages with new content links

**Quarter 1 (every 3 months):**
- Audit all hub pages
- Ensure all spoke pages are linked from hubs
- Fix broken links
- Update outdated links

---

## Internal Linking Metrics to Track

### Key Metrics

1. **Average Click Depth**
   - Target: <3 clicks for all pages
   - Tool: Screaming Frog, Google Analytics

2. **Orphan Pages**
   - Pages with 0 internal links pointing to them
   - Target: 0 orphan pages
   - Tool: Google Search Console, Screaming Frog

3. **Pages with Few Internal Links**
   - Pages with <3 internal links
   - Target: 100% of pages have 5+ internal links
   - Tool: Screaming Frog

4. **Most Linked-To Pages**
   - Identify high-authority pages
   - Use to distribute link equity
   - Tool: Ahrefs, Screaming Frog

5. **Internal Link Click-Through Rate**
   - Which internal links get clicked most
   - Optimize anchor text and placement
   - Tool: Google Analytics (Event Tracking)

---

## Scaling Internal Linking for 1,600 Pages

### Spreadsheet System

**Create: `internal-linking-master.xlsx`**

| Page URL | Target Keyword | Hub 1 Link | Hub 2 Link | Related Page 1 | Related Page 2 | Related Page 3 | Tool/Resource | Total Links |
|----------|---------------|------------|------------|----------------|----------------|----------------|---------------|-------------|
| /career-guides/army/68w-combat-medic | 68w civilian jobs | /career-guides | /career-guides/army | /career-guides/army/68k-lab | /career-guides/navy/hm-hospital-corpsman | /va-claims/how-to-file | /tools/skills-translator | 7 |

**Use this spreadsheet to:**
- Pre-plan all internal links before publishing
- Ensure consistency across all 1,600 pages
- Track linking completion
- Identify linking opportunities

### Automation Opportunities

**Use WordPress (or CMS) plugins to:**
1. Auto-add breadcrumb links (all pages)
2. Auto-suggest related posts (by category/tag)
3. Auto-link keywords (predefined list)

**Manual Tasks (Can't Automate):**
- Contextual body links (require editorial judgment)
- Strategic high-value links (require SEO knowledge)
- Updating old content to link to new content

---

## Internal Linking Red Flags

### Avoid These Mistakes

❌ **Too Many Links Per Page**
- Problem: >100 links dilutes link equity
- Solution: Keep to 20-50 internal links per page max

❌ **Reciprocal Linking Only**
- Problem: Page A links to Page B, Page B links to Page A, no other links
- Solution: Diversify linking patterns

❌ **Orphan Pages**
- Problem: Pages with no internal links pointing to them
- Solution: Ensure every page has at least 3 internal links

❌ **Broken Internal Links**
- Problem: Links to 404 pages or redirects
- Solution: Monthly audits with Screaming Frog

❌ **Generic Anchor Text**
- Problem: All links say "click here" or "read more"
- Solution: Descriptive anchor text

---

## Internal Linking by Priority Tier

### Tier 1 Content (Week 1-2: 50 pieces)

**Linking Intensity: HIGH**
- 8-10 internal links per page
- Add links FROM existing high-authority pages TO these new pages
- Interlink heavily within Tier 1 content

**Why:** Tier 1 content has highest traffic potential → Needs fastest indexing and ranking boost

### Tier 2 Content (Week 3-4: 100 pieces)

**Linking Intensity: MEDIUM**
- 5-7 internal links per page
- Link to Tier 1 content (pass authority upward)
- Link from hub pages

### Tier 3 Content (Month 2-3: 1,450 pieces)

**Linking Intensity: STANDARD**
- 3-5 internal links per page
- Focus on hub-to-spoke links
- Automated related post links

---

## Next Steps

1. ✅ Create internal linking spreadsheet for all 1,600 pages
2. ✅ Identify 5-8 internal link targets for each page before publishing
3. ✅ Set up automated breadcrumb navigation
4. ✅ Schedule monthly hub page updates (add links to new content)
5. ✅ Use Screaming Frog monthly to audit for orphan pages and broken links
6. ✅ Track average click depth in Google Search Console

**Goal:** Every page has 5+ internal links, no page is >3 clicks from homepage, 0 orphan pages.

---

**Pro Tip:** Internal linking is an ongoing process. As you publish new content, continuously update old content to link to it. This keeps your site interconnected and maximizes SEO value.
