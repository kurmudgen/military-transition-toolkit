---

date: "2026-02-04"
---# Data Visualization Specification: VA Facility Density and Access Heatmap

## Document Information
- **Specification ID**: DVS-004
- **Visualization Title**: VA Healthcare Facility Access by State - Interactive Heatmap
- **Version**: 1.0
- **Date**: November 11, 2025
- **Author**: Military Transition Toolkit Team
- **Status**: Ready for Development

---

## 1. Executive Overview

### Purpose
This interactive heatmap visualization displays the distribution and density of VA healthcare facilities across all 50 states, showing veterans where they can access medical care most easily. The visualization combines facility counts with veteran population data to reveal facility-per-veteran ratios, highlighting states with the best and worst VA healthcare access.

### Target Audience
- Veterans evaluating relocation based on healthcare access
- 100% disabled veterans requiring frequent VA medical care
- Elderly veterans planning retirement locations
- Veteran caregivers and family members
- Healthcare policy researchers and advocates
- VA facility planners and administrators

### Key Insights to Communicate
1. The VA operates 1,380 healthcare facilities nationwide (170 medical centers + 1,193 outpatient sites)
2. California, Texas, and Florida have the most facilities in absolute numbers (103, 91, 83 respectively)
3. Wyoming, North Dakota, and Montana lead in facilities per 100,000 veterans (best access)
4. California has only 6.75 facilities per 100,000 veterans despite having the most facilities
5. Rural states often have better facility-to-veteran ratios than populous states
6. Average drive time to nearest VA facility varies from 15 minutes to 90+ minutes by state

---

## 2. Data Sources and Research

### Primary Data Sources
1. **VA.gov Facility Locator** - Complete facility database (va.gov/find-locations)
2. **VA Directory** - All state facilities list (va.gov/directory/guide/allstate.asp)
3. **Veterans Health Administration** - 2024 facility statistics
4. **VA National Center for Veterans Analysis and Statistics** - Veteran population by state
5. **U.S. Census Bureau** - 2023 American Community Survey veteran data
6. **Definitive Healthcare** - VA hospital capacity and bed count data

### Data Collection Period
October 2024 - November 2025

### Update Frequency
- **Quarterly updates** for new facility openings/closings
- **Annual veteran population updates** (January)
- **Real-time sync** with VA facility locator API (if available)

---

## 3. Sample Data

### National VA Healthcare System Overview (2024)
- **Total Facilities**: 1,380
- **VA Medical Centers (VAMC)**: 170
- **Community Based Outpatient Clinics (CBOC)**: 1,193
- **Vet Centers**: 300+
- **Total Veterans**: 16.2 million
- **National Average**: 8.5 facilities per 100,000 veterans

### Top States by Absolute Facility Count

| State | Total Facilities | Medical Centers | Outpatient Sites | Vet Centers | Veteran Population |
|-------|-----------------|----------------|-----------------|-------------|-------------------|
| California | 103 | 8 | 85 | 10+ | 1,527,000 |
| Texas | 91 | 8 | 76 | 7+ | 1,417,000 |
| Florida | 83 | 8 | 68 | 7+ | 1,479,000 |
| Pennsylvania | 72 | 6 | 61 | 5 | 728,000 |
| New York | 68 | 9 | 54 | 5 | 689,000 |
| Ohio | 62 | 7 | 51 | 4 | 707,000 |
| North Carolina | 58 | 4 | 50 | 4 | 733,000 |
| Virginia | 56 | 3 | 49 | 4 | 751,000 |
| Georgia | 54 | 4 | 46 | 4 | 698,000 |
| Michigan | 51 | 5 | 43 | 3 | 568,000 |

### Top States by Facility Density (Per 100,000 Veterans)

| Rank | State | Facilities per 100K Vets | Total Facilities | Veteran Pop. | Avg. Drive Time |
|------|-------|-------------------------|-----------------|-------------|----------------|
| 1 | Wyoming | 28.3 | 16 | 56,500 | 45 min |
| 2 | North Dakota | 24.7 | 13 | 52,600 | 35 min |
| 3 | Montana | 21.8 | 22 | 101,000 | 40 min |
| 4 | Vermont | 20.2 | 9 | 44,500 | 25 min |
| 5 | Alaska | 19.4 | 12 | 61,800 | 60 min |
| 6 | South Dakota | 18.9 | 15 | 79,400 | 38 min |
| 7 | New Mexico | 17.2 | 28 | 162,700 | 42 min |
| 8 | West Virginia | 15.8 | 21 | 133,000 | 32 min |
| 9 | Maine | 14.6 | 17 | 116,400 | 28 min |
| 10 | Iowa | 12.4 | 29 | 233,800 | 30 min |

### Bottom States by Facility Density (Worst Access)

| Rank | State | Facilities per 100K Vets | Total Facilities | Veteran Pop. | Avg. Drive Time |
|------|-------|-------------------------|-----------------|-------------|----------------|
| 50 | Nevada | 5.2 | 12 | 230,500 | 52 min |
| 49 | Arizona | 6.1 | 32 | 524,300 | 48 min |
| 48 | Utah | 6.3 | 11 | 174,500 | 45 min |
| 47 | California | 6.75 | 103 | 1,527,000 | 38 min |
| 46 | Colorado | 7.1 | 28 | 394,300 | 42 min |
| 45 | Idaho | 7.4 | 9 | 121,700 | 50 min |
| 44 | Georgia | 7.7 | 54 | 698,000 | 35 min |
| 43 | Oregon | 7.9 | 27 | 341,600 | 40 min |
| 42 | Washington | 8.0 | 38 | 475,000 | 36 min |
| 41 | Hawaii | 8.2 | 10 | 121,900 | 55 min |

### Facility Type Distribution (Sample States)

#### Texas (91 Total Facilities)
- **VAMCs**: Dallas, Houston, San Antonio, Temple, Amarillo, El Paso, Big Spring, Waco
- **Large Outpatient Clinics**: 24 locations
- **CBOCs**: 52 locations
- **Mobile Clinics**: 5 routes
- **Vet Centers**: 7 locations

#### California (103 Total Facilities)
- **VAMCs**: Palo Alto, San Francisco, Los Angeles (2), Long Beach, San Diego, Loma Linda, Fresno
- **Large Outpatient Clinics**: 28 locations
- **CBOCs**: 57 locations
- **Vet Centers**: 10+ locations

### Geographic Coverage Metrics

| State | Urban Coverage (% in metro areas) | Rural Coverage (% in rural areas) | Underserved Counties |
|-------|----------------------------------|----------------------------------|---------------------|
| California | 85% | 15% | 8 counties |
| Texas | 78% | 22% | 12 counties |
| Montana | 25% | 75% | 15 counties |
| Wyoming | 30% | 70% | 18 counties |
| Florida | 88% | 12% | 5 counties |
| New York | 82% | 18% | 6 counties |

---

## 4. Visual Design Specifications

### Chart Type
**Interactive Choropleth Heatmap with Facility Markers**

### Layout Dimensions
- **Desktop**: 1600px width × 900px height
- **Tablet**: 768px width × 600px height
- **Mobile**: 375px width × 500px height

### Color Palette

#### Heatmap Gradient (Facilities per 100,000 Veterans)
**5-tier color system based on access quality**

1. **Excellent Access (15+ per 100K)**: #006D32 (Dark Green)
2. **Good Access (10-14.9 per 100K)**: #2E7D32 (Medium Green)
3. **Average Access (7.5-9.9 per 100K)**: #FFA726 (Amber)
4. **Below Average (6-7.4 per 100K)**: #FF6F00 (Orange)
5. **Poor Access (<6 per 100K)**: #D32F2F (Red)

#### Facility Markers (by type)
- **VA Medical Centers**: #1565C0 (Navy Blue) - Hospital icon, 12px
- **Large Outpatient Clinics**: #1976D2 (Medium Blue) - Clinic icon, 8px
- **CBOCs**: #42A5F5 (Light Blue) - Small clinic icon, 6px
- **Vet Centers**: #7C4DFF (Purple) - Counseling icon, 6px
- **Mobile Clinics**: #00897B (Teal) - Truck icon with route line

#### Supporting Colors
- **State Borders**: #424242 (Dark Gray), 1.5px solid
- **Hover State Border**: #FFA726 (Amber), 3px solid
- **Selected State**: #FFD700 (Gold), 3px solid with glow
- **Background (water)**: #E3F2FD (Light Blue)
- **Background (land)**: #FFFFFF (White)
- **Grid Overlay**: #E0E0E0 (Light Gray), 0.5px, 20% opacity
- **Legend Background**: #FFFFFF with 95% opacity, subtle shadow

#### Status Indicators
- **Veterans Served**: #00C853 (Bright Green) - checkmark icon
- **Capacity Issues**: #FF6D00 (Orange) - warning icon
- **Limited Access**: #E53935 (Red) - alert icon

### Typography

#### Font Family
- **Primary**: Inter, system-ui, sans-serif
- **Data/Numbers**: 'Roboto Mono', monospace
- **Headers**: 'Poppins', sans-serif

#### Font Sizes
- **Main Title**: 36px / 2.25rem (Bold, 700)
- **Map Legend Title**: 18px / 1.125rem (Semi-bold, 600)
- **State Names on Hover**: 20px / 1.25rem (Bold, 700)
- **Density Values**: 24px / 1.5rem (Bold, 700)
- **Facility Counts**: 16px / 1rem (Medium, 500)
- **Tooltips**: 13px / 0.8125rem (Regular, 400)
- **Legend Labels**: 13px / 0.8125rem (Medium, 500)
- **Data Table**: 14px / 0.875rem (Regular, 400)

### Map Design Elements

#### State Interaction
- **Default**: Colored by density tier, 0.85 opacity, smooth gradient
- **Hover**: 1.0 opacity, 3px amber border, elevation shadow
- **Selected**: 1.0 opacity, 3px gold border, prominent shadow, facility markers appear
- **Cursor**: Pointer on hover

#### Facility Markers
**Appear when state is selected or on zoom level >5**

```
State View (Selected):
┌─────────────────────────────┐
│     ● VAMC (Dallas)         │
│   ○ Clinic (Fort Worth)     │
│ · CBOC (Arlington)          │
│   ○ Clinic (Plano)          │
│     ● VAMC (Houston)        │
│ · CBOC (Katy)               │
└─────────────────────────────┘
```

#### Tooltip Design
```
┌─────────────────────────────────────┐
│ California                     ✕   │
├─────────────────────────────────────┤
│ Access Rating: Poor                │
│ Facilities per 100K Vets: 6.75     │
│                                    │
│ Total Facilities: 103              │
│ • Medical Centers: 8               │
│ • Outpatient Clinics: 85           │
│ • Vet Centers: 10+                 │
│                                    │
│ Veteran Population: 1,527,000      │
│ Avg. Drive Time: 38 minutes        │
│                                    │
│ Coverage:                          │
│ • Urban: 85%                       │
│ • Rural: 15%                       │
│ • Underserved Counties: 8          │
│                                    │
│ [View Facility List →]            │
│ [Find Nearest Facility]           │
└─────────────────────────────────────┘
```
- **Width**: 360px
- **Border**: 1px solid #E0E0E0
- **Shadow**: 0 4px 16px rgba(0,0,0,0.15)
- **Border Radius**: 8px
- **Padding**: 20px
- **Animation**: Fade in 250ms ease

---

## 5. Interactive Features

### Primary Interactions

#### 1. Density View Toggle
```
View by: [Facilities per Veteran ▼]
Options:
• Facilities per 100K Veterans (density)
• Total Facility Count (absolute)
• Medical Centers Only
• Average Drive Time
• Urban vs Rural Coverage
```

#### 2. Facility Type Filter
```
Show Facilities:
[✓] VA Medical Centers
[✓] Outpatient Clinics
[✓] CBOCs
[ ] Vet Centers
[ ] Mobile Clinics

[Select All] [Clear All]
```

#### 3. State Selection & Detail View
- Click state to view all facilities
- Side panel opens with complete facility list
- Facilities sortable by type, distance from center
- Each facility clickable for address, phone, services

#### 4. Find Nearest Facility
```
┌────────────────────────────────┐
│ Find Nearest VA Facility       │
├────────────────────────────────┤
│ Enter Your Location:           │
│ [City, State or ZIP] [Search] │
│                                │
│ Or [Use My Location]           │
│                                │
│ Facility Type:                 │
│ [Medical Center ▼]            │
│                                │
│ Search Radius:                 │
│ [═══|═══════] 50 miles        │
└────────────────────────────────┘
```

**Results Display:**
```
Nearest Facilities:
1. Dallas VA Medical Center
   📍 4500 S Lancaster Rd, Dallas, TX
   🚗 12.4 miles (18 min drive)
   📞 (214) 742-8387
   [Get Directions] [View Details]

2. Fort Worth Outpatient Clinic
   📍 2201 SE Loop 820, Fort Worth, TX
   🚗 8.7 miles (15 min drive)
   📞 (817) 730-0600
   [Get Directions] [View Details]
```

#### 5. Zoom & Pan
- Mouse wheel or pinch to zoom
- Click and drag to pan
- Zoom levels 1-10
- Level 1-3: State view with density colors
- Level 4-6: State view with major facility markers
- Level 7-10: Detailed view with all facilities and labels

#### 6. Comparison Mode
**Select 2-4 states to compare**
```
┌────────────────────────────────────────────────────┐
│         California  Texas    Florida   Wyoming     │
├────────────────────────────────────────────────────┤
│ Total     103        91       83        16         │
│ Per 100K  6.75       6.42     5.61      28.3       │
│ VAMCs     8          8        8         2          │
│ Drive     38 min     35 min   32 min    45 min     │
│ Rating    Poor       Poor     Poor      Excellent  │
│                                                    │
│ Best Access: Wyoming (28.3 per 100K vets)         │
│ Worst Access: Florida (5.61 per 100K vets)        │
└────────────────────────────────────────────────────┘
```

### Secondary Interactions

#### Healthcare Wait Times (if data available)
Toggle overlay showing average wait times for appointments by state.

#### Service Availability Filter
```
Filter by Services:
[ ] Primary Care
[ ] Mental Health
[ ] Emergency Care
[ ] Specialty Care (Surgery, Cardiology, etc.)
[ ] Women's Health
[ ] Prosthetics
[ ] Pharmacy
```

#### Drive Time Isochrones
**Visual overlay showing 30/60/90-minute drive times from facilities**
- 30 min: Light blue overlay
- 60 min: Medium blue overlay
- 90 min: Dark blue overlay
- White areas: 90+ minutes from nearest facility

---

## 6. Accessibility Guidelines

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- All text meets 4.5:1 contrast minimum
- Heatmap colors tested for color-blind users
- Pattern overlays available as alternative to color-only
- Deuteranopia and protanopia safe palette

#### Keyboard Navigation
- **Tab**: Navigate between map controls, filters, facility list
- **Arrow keys**: Pan map in all directions
- **+/-**: Zoom in/out
- **Enter**: Select state/facility
- **Escape**: Close detail panels
- **Space**: Toggle facility markers on/off

#### Screen Reader Support
- Map described: "Interactive map of United States showing VA healthcare facility density by state, color-coded from dark green (excellent access) to red (poor access)"
- State announcements: "California, 6.75 facilities per 100,000 veterans, poor access rating, 103 total facilities including 8 medical centers"
- Facility markers: "VA Medical Center, Dallas, Texas, phone (214) 742-8387"
- Data table alternative available
- ARIA landmarks for map regions

#### Focus Indicators
- 3px solid #1565C0 outline on all interactive elements
- High contrast focus visible on state boundaries
- Facility marker focus includes glow effect

### Alternative Formats
- **Data Table View**: Complete facility list with sorting/filtering
- **Text List**: States ranked by access with facility counts
- **CSV Export**: All facility data downloadable
- **Print View**: Static map with legend and top 10 lists

---

## 7. Data Table Specifications

### Facility Directory Table
**Toggle**: "Switch to Table View" / "Back to Map View"

#### Table Structure
| State | Density (per 100K) | Total | VAMCs | Clinics | Vet Population | Drive Time | Access Rating |
|-------|-------------------|-------|-------|---------|----------------|------------|--------------|
| Wyoming | 28.3 | 16 | 2 | 12 | 56,500 | 45 min | Excellent |
| California | 6.75 | 103 | 8 | 85 | 1,527,000 | 38 min | Poor |
| ... | ... | ... | ... | ... | ... | ... | ... |

#### Table Features
- **Sortable columns**: Click header to sort
- **Color-coded ratings**: Access rating column uses heatmap colors
- **Expandable rows**: Click state to see full facility list
- **Export**: CSV, Excel, PDF
- **Search**: Filter by state name
- **Pagination**: 10/25/50/All per page
- **Responsive**: Horizontal scroll on mobile

#### Expanded Row Detail
```
California [−]
├─ VA Medical Centers (8):
│  ├─ Palo Alto VA Medical Center - (650) 493-5000
│  ├─ San Francisco VA Medical Center - (415) 221-4810
│  ├─ Greater Los Angeles VA - (310) 478-3711
│  └─ [View all 8 →]
└─ Outpatient Clinics (85):
   ├─ San Diego VA Outpatient - (858) 552-8585
   └─ [View all 85 →]
```

---

## 8. Technical Requirements

### Frontend Stack
- **Framework**: React 18.3+ with TypeScript
- **Mapping Library**: Mapbox GL JS or Leaflet with custom tiles
- **Geospatial Data**: TopoJSON for state boundaries
- **Markers**: React-Leaflet or custom SVG markers
- **State Management**: Zustand for filters, selections
- **Styling**: Tailwind CSS + Mapbox/Leaflet CSS

### Data Structure
```json
{
  "states": [
    {
      "stateId": "TX",
      "stateName": "Texas",
      "veteranPopulation": 1417311,
      "totalFacilities": 91,
      "facilitiesPerCapita": 6.42,
      "averageDriveTime": 35,
      "accessRating": "poor",
      "coverage": {
        "urban": 78,
        "rural": 22,
        "underservedCounties": 12
      },
      "facilities": {
        "medicalCenters": [
          {
            "id": "vha_549",
            "name": "Dallas VA Medical Center",
            "type": "VAMC",
            "address": {
              "street": "4500 S Lancaster Rd",
              "city": "Dallas",
              "state": "TX",
              "zip": "75216"
            },
            "coordinates": {
              "lat": 32.7174,
              "lng": -96.8021
            },
            "phone": "(214) 742-8387",
            "services": ["primary_care", "emergency", "surgery", "mental_health"],
            "beds": 824,
            "website": "https://www.va.gov/dallas-health-care"
          }
        ],
        "outpatientClinics": [],
        "cbocs": [],
        "vetCenters": []
      },
      "centroid": {
        "lat": 31.9686,
        "lng": -99.9018
      }
    }
  ],
  "nationalStats": {
    "totalFacilities": 1380,
    "totalMedicalCenters": 170,
    "totalVeterans": 16200000,
    "averageDensity": 8.5
  },
  "metadata": {
    "version": "2025.1",
    "lastUpdated": "2025-01-15",
    "dataSource": "VA.gov Facility Locator"
  }
}
```

### API Integration
- **VA Facility Locator API**: Real-time facility data (if available)
- **Geocoding API**: Convert addresses to coordinates
- **Routing API**: Calculate drive times (Google Maps/Mapbox)

### Performance Requirements
- Map initial render: <2.5 seconds
- State selection: <100ms
- Facility marker rendering: <200ms (for 100+ markers)
- Zoom/pan: Smooth 60fps
- Search response: <500ms
- Supports 2000+ concurrent users

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome Android 90+

### Responsive Breakpoints
- Mobile: 320px - 767px (simplified view)
- Tablet: 768px - 1023px (moderate detail)
- Desktop: 1024px - 1599px (full detail)
- Large Desktop: 1600px+ (maximum detail)

---

## 9. Content Requirements

### Main Headline
"VA Healthcare Facility Access: Find Medical Centers and Clinics by State"

### Subheadline
"Explore the distribution of 1,380 VA healthcare facilities nationwide. See which states offer the best access to VA medical care."

### Key Statistics Callouts
- "1,380 Total VA Healthcare Facilities"
- "170 Full-Service Medical Centers"
- "Average 8.5 Facilities per 100,000 Veterans"
- "Wyoming Leads with 28.3 Facilities per 100K Vets"

### Educational Content

#### "Understanding VA Facility Types"
- **VA Medical Centers (VAMCs)**: Full-service hospitals with emergency care, surgery, specialty services
- **Outpatient Clinics**: Primary care, mental health, routine services
- **CBOCs**: Community-based clinics in rural/underserved areas
- **Vet Centers**: Counseling and readjustment services
- **Mobile Clinics**: Traveling services to remote areas

#### "Why Density Matters"
Explanation of how facilities-per-veteran ratio indicates access quality, wait times, and convenience better than total facility count alone.

### Disclaimer
"Facility data current as of January 2025. Facility types, addresses, and services subject to change. Drive times are estimates based on geographic distance and may vary by traffic conditions. For most current information, contact facilities directly or visit VA.gov/find-locations. Not all facilities offer all services. Check with specific locations for service availability."

### CTAs
- Primary: "Find Nearest VA Facility"
- Secondary: "Compare States"
- Tertiary: "Download Facility Directory (PDF)"

---

## 10. Production Notes

### Design Assets Required
- High-resolution U.S. state boundary GeoJSON/TopoJSON
- Custom facility marker icons (6 types): VAMC, clinic, CBOC, vet center, mobile, specialty
- State flag icons (optional enhancement)
- Heatmap color gradient legend
- Printable map template
- Social share graphics

### Development Phases

#### Phase 1: Data Collection & Processing (Week 1-2)
- Aggregate all VA facility data from official sources
- Geocode all facility addresses
- Calculate density metrics for all states
- Build comprehensive facility database
- Create GeoJSON state boundaries

#### Phase 2: Map Foundation (Week 2-3)
- Implement base map with Mapbox/Leaflet
- State choropleth with density coloring
- Basic zoom and pan
- Tooltip functionality

#### Phase 3: Facility Markers & Details (Week 3-4)
- Custom facility markers by type
- Marker clustering at lower zoom levels
- Click handlers for facility details
- State selection and side panel

#### Phase 4: Search & Filters (Week 4-5)
- Location-based facility search
- Drive time calculations
- Facility type filters
- Comparison mode
- Data table view

#### Phase 5: Polish & Optimization (Week 5-6)
- Performance optimization (marker rendering)
- Mobile responsive refinements
- Accessibility implementation
- Cross-browser testing
- Analytics integration

#### Phase 6: QA & Launch (Week 6-7)
- User testing with veterans
- Data validation
- Load testing
- Production deployment

### Testing Requirements
- Test with veterans in various locations (urban, rural, remote)
- Verify facility data accuracy with VA.gov
- Test performance with 1000+ markers visible
- Mobile device testing (iOS and Android)
- Accessibility audit with screen readers
- Load testing with simulated traffic

### Data Maintenance
- **Monthly**: Check VA.gov for new facility openings
- **Quarterly**: Refresh all facility contact information
- **Annual**: Recalculate veteran population and density metrics
- **Real-time**: Integrate with VA API for live data (if available)

### Analytics Events
- Map zoom level distribution
- States most viewed
- Facility searches performed
- Search radius preferences
- "Find Nearest" usage rate
- Comparison feature usage
- Filter application patterns
- Time spent on map vs table view
- Mobile vs desktop usage

---

## 11. Time & Resource Estimates

### Development Time
- **Data Collection & Processing**: 40 hours
- **UI/UX Design**: 56 hours
- **Map Development**: 120 hours
- **Facility Markers & Clustering**: 40 hours
- **Search & Filters**: 48 hours
- **Data Table View**: 32 hours
- **Testing & QA**: 48 hours
- **Documentation**: 24 hours
- **Total**: 408 hours (10 weeks with 1 developer)

### Ongoing Maintenance
- **Monthly Facility Updates**: 8 hours/month
- **Quarterly Data Refresh**: 16 hours/quarter
- **Annual Population Update**: 24 hours/year
- **Bug fixes**: 6 hours/month

### Required Resources
- 1 Frontend Developer (React, Mapbox/Leaflet experience)
- 1 UI/UX Designer (mapping expertise)
- 1 Data Engineer (geospatial data processing)
- 1 QA Tester
- Access to veteran focus group for testing
- VA facility data coordinator (validation)

---

## 12. Success Metrics

### Key Performance Indicators
- **User Engagement**: Average time on page >6 minutes
- **Search Usage**: >60% of visitors use facility search
- **State Exploration**: >50% click on 3+ states
- **Comparison**: >35% compare states
- **Facility Details**: >40% view individual facility information
- **Mobile Usage**: >45% of traffic (location-based searches)
- **Accessibility**: 100% WCAG 2.1 AA compliance
- **User Satisfaction**: >4.7/5 from veterans

### Business Impact
- Reduced calls to VA facility locator helpline
- Increased awareness of rural VA services
- Improved understanding of facility distribution
- Higher engagement with VA healthcare enrollment
- Valuable insights into access gaps for policy advocates
- SEO authority for "VA facility near me" searches

---

## 13. Related Visualizations
- DVS-001: State Property Tax Savings Comparison
- DVS-003: Cost of Living Rankings for Veterans
- DVS-005: Best States for Veterans Scorecard

## 14. Approval & Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | | | |
| Lead Designer | | | |
| Development Lead | | | |
| Data Engineer | | | |
| VA Healthcare Consultant | | | |

---

*Document Version History*
- v1.0 (2025-11-11): Initial specification created
