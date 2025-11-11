# Data Visualization Specification #017: State Veteran Employment Preferences

## Overview

**Visualization ID:** DV-017
**Category:** State Comparisons
**Title:** State Government Hiring Preferences for Veterans
**Subtitle:** Understanding veteran employment advantages in civil service across America
**Last Updated:** November 2024
**Data Source:** State Human Resources departments, Department of Labor Veterans' Employment and Training Service (VETS), State Statutes

## Purpose and Goals

### Primary Purpose
To create an interactive comparison showing how each state provides employment preferences to veterans seeking government jobs, helping transitioning service members understand their competitive advantages in civil service positions across different states.

### Key Questions Answered
- Which states offer absolute preference vs. points-based preference systems?
- How many preference points do veterans receive in each state?
- Do disabled veterans receive additional preference points?
- What are the eligibility requirements for veteran preference in each state?
- Which states have the strongest hiring advantages for veterans?

### Target Audience
- Transitioning military personnel seeking government employment
- Disabled veterans exploring career opportunities
- State HR professionals and hiring managers
- Career counselors at Transition Assistance Programs (TAP)
- Military family members researching relocation options

## Visualization Type

**Primary:** Interactive U.S. Choropleth Map with graduated colors
**Secondary:** Comparison table with sortable columns and filtering
**Tertiary:** Icon-based preference type indicators

### Rationale
A map visualization immediately shows geographic patterns in veteran preference policies while color intensity can represent the strength of preference. A companion table allows detailed comparisons of point values, eligibility criteria, and disabled veteran benefits.

## Data Specifications

### Sample Data Structure

```json
{
  "states": [
    {
      "name": "Massachusetts",
      "abbreviation": "MA",
      "preferenceType": "absolute",
      "preferenceStrength": "maximum",
      "standardPoints": 0,
      "disabledPoints": 0,
      "description": "Absolute preference - veterans hired before non-veterans with passing scores",
      "eligibility": "Honorably discharged veterans",
      "disabledVeteranBonus": false,
      "residencyRequired": true,
      "additionalBenefits": ["Hiring priority", "Retention preference"],
      "lastUpdated": "2024-01"
    },
    {
      "name": "New Jersey",
      "abbreviation": "NJ",
      "preferenceType": "absolute",
      "preferenceStrength": "maximum",
      "standardPoints": 0,
      "disabledPoints": 0,
      "description": "Absolute preference in civil service examinations",
      "eligibility": "Veterans with honorable discharge during qualifying periods",
      "disabledVeteranBonus": true,
      "residencyRequired": false,
      "additionalBenefits": ["10 points added to exam scores for eligible disabled veterans"],
      "lastUpdated": "2024-03"
    },
    {
      "name": "Pennsylvania",
      "abbreviation": "PA",
      "preferenceType": "absolute",
      "preferenceStrength": "maximum",
      "standardPoints": 0,
      "disabledPoints": 0,
      "description": "Veterans' preference in hiring, retention, and promotion",
      "eligibility": "Veterans with honorable discharge",
      "disabledVeteranBonus": false,
      "residencyRequired": true,
      "additionalBenefits": ["Promotion preference", "Layoff protection"],
      "lastUpdated": "2024-01"
    },
    {
      "name": "South Dakota",
      "abbreviation": "SD",
      "preferenceType": "absolute",
      "preferenceStrength": "maximum",
      "standardPoints": 0,
      "disabledPoints": 0,
      "description": "Absolute preference for qualifying veterans",
      "eligibility": "Veterans with qualifying service",
      "disabledVeteranBonus": false,
      "residencyRequired": false,
      "additionalBenefits": [],
      "lastUpdated": "2024-01"
    },
    {
      "name": "Minnesota",
      "abbreviation": "MN",
      "preferenceType": "points",
      "preferenceStrength": "high",
      "standardPoints": 10,
      "disabledPoints": 15,
      "description": "10 points for veterans, 15 for disabled veterans",
      "eligibility": "Veterans with passing rating on competitive position",
      "disabledVeteranBonus": true,
      "residencyRequired": false,
      "additionalBenefits": ["Optional to claim preference"],
      "lastUpdated": "2024-02"
    },
    {
      "name": "Washington",
      "abbreviation": "WA",
      "preferenceType": "points",
      "preferenceStrength": "moderate",
      "standardPoints": 10,
      "disabledPoints": 10,
      "description": "10% added to score for wartime veterans",
      "eligibility": "Veterans who served during war or armed conflict",
      "disabledVeteranBonus": false,
      "residencyRequired": false,
      "additionalBenefits": ["5% for non-wartime service veterans"],
      "lastUpdated": "2024-01"
    },
    {
      "name": "California",
      "abbreviation": "CA",
      "preferenceType": "points",
      "preferenceStrength": "moderate",
      "standardPoints": 5,
      "disabledPoints": 10,
      "description": "Veterans ranked in top tier of eligibility lists",
      "eligibility": "Veterans who pass civil service examination",
      "disabledVeteranBonus": true,
      "residencyRequired": true,
      "additionalBenefits": ["Top ranking on eligibility lists"],
      "lastUpdated": "2024-01"
    },
    {
      "name": "Florida",
      "abbreviation": "FL",
      "preferenceType": "conditional",
      "preferenceStrength": "moderate",
      "standardPoints": 0,
      "disabledPoints": 0,
      "description": "Preference in employment, promotions after deployment, and retention",
      "eligibility": "Veterans with honorable discharge",
      "disabledVeteranBonus": false,
      "residencyRequired": true,
      "additionalBenefits": ["Promotion preference", "Retention preference"],
      "lastUpdated": "2024-01"
    },
    {
      "name": "Tennessee",
      "abbreviation": "TN",
      "preferenceType": "conditional",
      "preferenceStrength": "limited",
      "standardPoints": 0,
      "disabledPoints": 0,
      "description": "Preference when qualifications are equal between candidates",
      "eligibility": "Veterans in candidate pool with equal qualifications",
      "disabledVeteranBonus": false,
      "residencyRequired": false,
      "additionalBenefits": ["Interview invitation guarantee"],
      "lastUpdated": "2024-02"
    }
  ]
}
```

### Preference Strength Categories
- **Maximum:** Absolute preference (hired ahead of all non-veterans)
- **High:** 10+ preference points or equivalent significant advantage
- **Moderate:** 5-9 preference points or conditional strong preference
- **Limited:** <5 preference points or preference only when candidates are equal
- **Standard:** Federal minimum only (5/10 points for federal positions)

### Data Fields
- State name and abbreviation
- Preference type (absolute/points/conditional/standard)
- Preference strength level
- Standard veteran points (if applicable)
- Disabled veteran points (if higher)
- Detailed description of preference
- Eligibility requirements
- Disabled veteran bonus (yes/no)
- Residency requirement (yes/no)
- Additional benefits (array)
- Last updated date

## Visual Design Specifications

### Color Palette

**Map Colors (Preference Strength):**
- Maximum (Absolute): `#0f4c27` (Deep Forest Green)
- High (10+ points): `#2d6a4f` (Dark Green)
- Moderate (5-9 points): `#52b788` (Medium Green)
- Limited (<5 points): `#95d5b2` (Light Green)
- Standard (Federal only): `#d8f3dc` (Very Light Green)
- No Data: `#e8e8e8` (Light Gray)
- Hover State: `#ff6b35` (Orange) border, 3px

**Category Icons:**
- Absolute Preference: `#0f4c27` shield icon
- Points-Based: `#2d6a4f` star icon with number
- Conditional: `#52b788` checkmark icon
- Disabled Veteran Bonus: `#b5179e` (Purple) plus icon

**UI Colors:**
- Primary Background: `#ffffff` (White)
- Secondary Background: `#f8f9fa` (Off-White)
- Text Primary: `#212529` (Nearly Black)
- Text Secondary: `#6c757d` (Gray)
- Accent: `#0066cc` (Blue)
- Success: `#28a745` (Green)
- Info: `#17a2b8` (Teal)

### Typography

**Primary Font:** Roboto (sans-serif)
- Title: 36px, Bold (700), Letter-spacing: -0.8px
- Subtitle: 20px, Regular (400), Line-height: 1.6
- Section Headers: 26px, Medium (500)
- Body Text: 16px, Regular (400), Line-height: 1.7
- Labels: 14px, Medium (500)
- Captions/Fine Print: 12px, Regular (400)

**Monospace Font:** Roboto Mono - For point values
- Point Numbers: 28px, Bold (700)
- Point Labels: 14px, Regular (400)

### Layout Dimensions

**Desktop (>1200px):**
- Container Width: 1400px max
- Map Height: 650px
- Detail Panel Width: 400px (slide-in from right)
- Card Padding: 24px
- Grid Gap: 32px

**Tablet (768px-1199px):**
- Container Width: 100% with 32px horizontal padding
- Map Height: 550px
- Detail Panel: Full-screen modal
- Card Padding: 20px
- Grid Gap: 24px

**Mobile (<768px):**
- Container Width: 100% with 16px horizontal padding
- Map Height: 450px
- Detail Panel: Full-screen modal
- Card Padding: 16px
- Grid Gap: 16px

## Interactive Features

### Map Interactions

1. **Hover State:**
   - Highlight state with orange border
   - Display tooltip showing:
     - State name
     - Preference type
     - Point value (if applicable)
     - "Click for details"

2. **Click State:**
   - Open detailed panel with:
     - State name with icon
     - Large preference type badge
     - Point values (standard vs. disabled) in large monospace numbers
     - Eligibility requirements (bulleted list)
     - Additional benefits (icon list)
     - Residency requirement badge
     - "View State Jobs" button (links to state employment portal)
     - "Compare with Other States" button

3. **Mobile Tap:**
   - Full-screen modal with state details
   - Swipe left/right to navigate between states
   - Close button in top-right corner

### Filter Controls

**Location:** Horizontal bar above map
**Filter Options:**
1. **Preference Type:**
   - All Types (default)
   - Absolute Preference Only (4 states)
   - High Points (10+)
   - Any Points-Based

2. **Veteran Status:**
   - All Veterans
   - Disabled Veterans (show states with bonus)
   - Wartime Service Veterans

3. **Requirements:**
   - No Residency Required
   - Any State

**Filter Display:** Multi-select chips with count badges

### Comparison Feature

**"Compare States" Tool:**
- Select up to 4 states from dropdown
- Display side-by-side comparison cards showing:
  - Preference type
  - Point values
  - Eligibility
  - Additional benefits
- Export comparison as PDF

### Additional Features

1. **Legend:**
   - Fixed position, bottom-left of map
   - Expandable/collapsible
   - Shows all preference strength levels with counts
   - Icon legend for symbols used

2. **View Toggle:**
   - Map View (default)
   - Table View (sortable data table)
   - Comparison View (selected states)

3. **Sorting (Table View):**
   - By state name (A-Z)
   - By preference strength (strongest first)
   - By point value (highest first)
   - By disabled veteran points (highest first)

4. **Search:**
   - Type state name to jump to state
   - Predictive search dropdown

## Mockup Description

### Desktop Layout

The page opens with a bold header: "State Government Hiring Preferences for Veterans" in 36px Roboto Bold. The subtitle below reads "46 states use points systems, 4 states offer absolute preference" in lighter gray text.

A prominent statistics bar spans below the header with three large metrics:
- "4 States" with shield icon - "Offer Absolute Preference"
- "15 Points MAX" with star icon - "Maximum Bonus (MN Disabled Veterans)"
- "46 States" with checkmark icon - "Points-Based Systems"

Below the stats, a filter bar displays chips: "All Preference Types ▼" | "All Veterans ▼" | "No Residency Required ☐". An active filter count shows "(Showing 50 states)."

The main map fills the center, displaying the continental U.S. with Alaska and Hawaii in inset boxes. Four states (MA, NJ, PA, SD) appear in the deepest green (absolute preference). Minnesota and several other states show in dark green (high points). Most states display in medium to light green (moderate to limited).

A legend in the bottom-left corner shows:
```
█ Absolute (4)
█ High 10+ pts (8)
█ Moderate 5-9 pts (24)
█ Limited <5 pts (12)
█ Standard (2)
```

When hovering over Minnesota, a tooltip appears: "Minnesota - High Preference: 10 points (15 for disabled veterans). Click for details."

Clicking Minnesota triggers a slide-in panel from the right (400px wide) with:
- "Minnesota" header with state flag icon
- "POINTS-BASED PREFERENCE" badge in dark green
- Large numbers in Roboto Mono: "10 pts" | "15 pts" with labels "Standard" and "Disabled"
- Eligibility section with checkmarks
- "Additional Benefits" with icons for "Optional to claim"
- Blue button: "View Minnesota State Jobs"
- Gray button: "Add to Comparison"

Below the map, a data table (in table view mode) shows all states with sortable columns: State | Type | Standard Points | Disabled Points | Residency Required | Additional Benefits.

### Mobile Layout

On mobile, the title reduces to 24px over two lines. The statistics become stacked cards. Filters convert to a single "Filters (3) ▼" dropdown. The map fills the width at 450px height. Tapping a state opens a full-screen modal with state details. Swipe gestures navigate between adjacent states alphabetically. The comparison tool becomes a full-screen view with vertically stacked state cards.

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

**Color Contrast:**
- All text meets 4.5:1 contrast ratio minimum
- Map colors distinguishable by pattern fills in addition to color:
  - Absolute: Solid fill
  - High: Diagonal stripe pattern
  - Moderate: Dot pattern
  - Limited: Light dot pattern
  - Standard: Cross-hatch pattern
- Pattern mode toggle: "Enable Pattern Mode" for colorblind users

**Keyboard Navigation:**
- Tab through all states in alphabetical order
- Enter/Space to select state and open detail panel
- Arrow keys to navigate map (north/south/east/west)
- Tab through detail panel elements
- Escape to close panels
- Filter dropdowns fully keyboard-accessible
- Skip link to bypass map and jump to table

**Screen Reader Support:**
- ARIA labels for each state: `aria-label="Massachusetts: Absolute preference. Veterans hired before all non-veterans with passing scores"`
- ARIA live region announces filter changes: "Showing 4 states with absolute preference"
- Role="application" on map with usage instructions
- Alt text for all icons: Shield, star, checkmark, plus icons
- Table view uses semantic HTML table with proper headers

**Focus Indicators:**
- High-contrast focus ring: 3px solid `#0066cc`, 2px white offset
- Focus visible on all interactive elements including map states
- Focus trap within modals

**Motion and Animation:**
- Respect prefers-reduced-motion setting
- Disable panel slide animations for reduced motion
- Disable hover effects that rely on motion

### Additional Accessibility Features

- Minimum touch target size: 44x44px on mobile
- Error messages and instructions clearly labeled
- Form labels explicitly associated
- Heading hierarchy follows logical order (H1, H2, H3)
- Downloadable accessible PDF comparison reports
- Text alternatives for all data visualizations
- No time limits on interactions

## Data Sources and Updates

### Primary Sources
1. **State Human Resources Departments** - Official hiring policies (all 50 states)
2. **State Civil Service Commissions** - Examination and scoring rules
3. **Department of Labor VETS** - Federal standards and state compliance
4. **State Statutes** - Legal codification of veteran preference laws
5. **National Veterans' Training Institute** - State preference law compilation

### Update Frequency
- **Monthly:** Review state HR department policy updates
- **Quarterly:** Comprehensive audit of all state data (January, April, July, October)
- **Immediate:** Updates when new legislation passes (track state legislatures)
- **Annual:** Full verification with each state's veterans affairs office (January)

### Data Validation Process
1. Cross-reference state statute with current HR policy
2. Verify with state veterans affairs liaison
3. Confirm with veteran service organizations (DAV, VFW)
4. Test with sample civil service examination announcements
5. Validate against recent veteran hiring experiences (when available)

### Data Quality Indicators
- Each state record includes "Last Verified" date
- Confidence level: High (statute-based) / Medium (policy-based) / Low (needs verification)
- Change log tracks all updates with dates and sources

### Citations
Complete source list available via "Data Sources" link in footer with:
- State statute citations
- HR policy document links
- Contact information for state verification
- Last verification date for each state

## Technical Implementation Notes

### Technology Stack
- **Mapping:** D3.js v7 with U.S. TopoJSON
- **Framework:** React 18.3+ with TypeScript
- **State Management:** Redux Toolkit or Zustand
- **Data Format:** JSON with GeoJSON for map boundaries
- **API:** RESTful API for state data with caching
- **Charts:** Recharts for supplementary visualizations
- **Icons:** Font Awesome 6 or custom SVG icon set

### Performance Considerations
- Lazy load state detail data on click (don't load all 50 state details upfront)
- Memoize map rendering to prevent unnecessary re-renders
- Debounce search input (300ms)
- Throttle map hover events (100ms)
- Implement virtual scrolling for table view (if >50 rows)
- Compress TopoJSON file (typical size <50KB)
- Cache API responses for 6 hours
- Service Worker for offline map view

### Browser Support
- **Primary Support:**
  - Chrome/Edge 90+
  - Firefox 88+
  - Safari 14+

- **Mobile Support:**
  - iOS Safari 14+
  - Chrome Mobile 90+

- **Graceful Degradation:**
  - Table view available without JavaScript
  - Static map fallback for older browsers

### Responsive Breakpoints
```css
$mobile: 320px - 767px;
$tablet: 768px - 1199px;
$desktop: 1200px - 1599px;
$large-desktop: 1600px+;
```

### API Endpoints
```
GET /api/veteran-preferences/states - All state data
GET /api/veteran-preferences/states/:abbreviation - Single state detail
GET /api/veteran-preferences/compare?states=MA,NJ,PA - Compare states
GET /api/veteran-preferences/metadata - Last updated, sources
```

## Production Timeline

### Phase 1: Research & Design (Week 1-2)
- Complete data collection for all 50 states
- Verify current statutes and policies
- Create comprehensive dataset with sources
- Design high-fidelity mockups in Figma
- Design pattern mode for accessibility
- Stakeholder review and approval

**Deliverables:** Complete dataset (CSV/JSON), Figma design files, approved mockups

### Phase 2: Core Development (Week 3-5)
- Set up React project with TypeScript
- Build map component with D3.js
- Implement state selection and detail panel
- Create filter system
- Develop table view
- Build comparison tool
- Responsive layout implementation

**Deliverables:** Functional map visualization, filtering, responsive layouts

### Phase 3: Advanced Features (Week 6)
- Implement search functionality
- Add pattern mode for colorblind accessibility
- Build export/share features
- Create comparison PDF generation
- Integrate with state job portals (external links)
- Add analytics tracking

**Deliverables:** Complete feature set, analytics integration

### Phase 4: Testing & Accessibility (Week 7)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing (iOS, Android)
- Accessibility audit with axe DevTools
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard navigation testing
- User acceptance testing with 8-10 veterans
- Performance optimization
- Bug fixes

**Deliverables:** Test reports, accessibility audit results, bug-free implementation

### Phase 5: Launch & Documentation (Week 8)
- Final QA and stakeholder sign-off
- Production deployment
- Create user guide and FAQ
- Write technical documentation
- Train support team
- Set up monitoring and analytics
- Launch announcement

**Deliverables:** Live application, documentation, support materials, analytics dashboard

### Estimated Effort
- **Research & Data Collection:** 32 hours
- **UX/UI Design:** 24 hours
- **Frontend Development:** 60 hours
- **Backend/API Development:** 16 hours
- **Accessibility Implementation:** 20 hours
- **Testing & QA:** 24 hours
- **Documentation:** 12 hours
- **Project Management:** 12 hours
- **Total:** 200 hours (approximately 5 weeks with 1 full-time developer)

## Success Metrics

### User Engagement
- **Page Views:** Target 10,000+ monthly views
- **Average Time on Page:** Target 3+ minutes
- **Interaction Rate:** 70%+ users interact with map
- **Filter Usage:** 45%+ use at least one filter
- **State Detail Views:** 50%+ click at least one state
- **Comparison Tool Usage:** 15%+ use comparison feature
- **Table View Usage:** 25%+ toggle to table view

### User Outcomes
- **Job Application Increase:** 30% increase in state government applications by veterans
- **User Satisfaction:** 4.6/5.0 average rating
- **Helpfulness Rating:** 85%+ find information helpful
- **Share Rate:** 12% of visitors share with others

### Technical Performance
- **Page Load Time:** <2.5 seconds (desktop, broadband)
- **Time to Interactive:** <4 seconds
- **Mobile Performance Score:** 85+ (Lighthouse)
- **Accessibility Score:** 100 (WAVE/axe)
- **Zero Critical Bugs:** Within 30 days of launch
- **Uptime:** 99.5%+

### Business Impact
- **Referrals to State Job Portals:** Track click-throughs to state employment sites
- **State Government Partnerships:** 5+ states request to feature this tool
- **Press Mentions:** 3+ articles in military/veteran publications
- **Veterans Affairs Adoption:** Used by 10+ state VA offices

## Notes and Considerations

### Known Limitations
- **Federal vs. State:** This visualization covers state government jobs only, not federal positions (which have separate preference rules under 5 USC § 3309)
- **Local Governments:** City and county preference policies not included
- **Private Sector:** Does not cover private employer veteran hiring initiatives
- **Policy Complexity:** Some states have nuanced rules that vary by position type (law enforcement, firefighter, etc.)
- **Frequent Changes:** State legislation may change preference policies; quarterly updates needed

### State-Specific Nuances Not Fully Captured
- Some states (e.g., California) have different preference rules for different exam types
- Certain positions may be exempt from veteran preference laws
- Some states have "peacetime" vs. "wartime" service distinctions
- Gold Star family member preferences vary by state
- National Guard preferences may differ from veteran preferences

### Future Enhancements
**Phase 2 Features (6-12 months):**
- Add federal job preferences for comparison
- Include local government (city/county) data for major metros
- Integrate real-time job postings with veteran preference indicators
- Create "Job Match" tool based on MOS/rate and state preferences
- Add success stories/testimonials from veterans hired in each state
- Mobile app with push notifications for new job postings
- API for career counselors and TAP facilitators

**Phase 3 Features (12-24 months):**
- Machine learning recommendations: "Best states for your profile"
- Integration with USAJobs and state job portals
- Salary comparison by state for veteran-friendly positions
- Cost of living adjustments in recommendations
- Community forum for veterans to share hiring experiences
- Resume builder optimized for veteran preference applications

### Related Visualizations
- **DV-016:** Business License Fee Waivers (entrepreneurship alternative)
- **DV-020:** Top 10 States for Overall Veteran Benefits (holistic comparison)
- **DV-008:** Civilian Career Salary Comparisons (career planning)

### Legal Disclaimer
"This visualization provides general information about state veteran employment preferences. Eligibility requirements and preference provisions may vary by position and agency. Veterans should verify current policies with the specific state agency and review official job announcements for exact preference provisions. This tool is for informational purposes only and does not constitute legal or employment advice."

### Stakeholder Engagement
- **State VA Offices:** Provide data verification and feedback
- **Department of Labor VETS:** Ensure alignment with federal standards
- **Veteran Service Organizations:** User testing and promotion
- **State HR Associations:** Data partnerships
- **Military Transition Programs:** Integration into TAP curriculum

### Contact Information
**Product Owner:** Veterans Employment Programs Manager
**Data Steward:** State Employment Policy Analyst
**Technical Lead:** Senior Full-Stack Developer
**Accessibility Specialist:** WCAG Compliance Officer
**Last Review:** November 2024
**Next Scheduled Review:** February 2025

---

**Document Version:** 1.0
**Status:** Final Specification
**Approval Required:** Product Manager, Veterans Employment Lead, UX Director, Legal Review