---
date: "2026-01-26"
---# BAH Comparison Tool - Build Research

## Overview
This tool allows servicemembers to compare Basic Allowance for Housing (BAH) rates across different duty stations, rank levels, and dependency status. Useful for PCS planning, understanding compensation changes, and evaluating job offers at different installations. Helps answer: "If I move from Fort Bragg to San Diego, how much more BAH will I get?"

## Data Requirements

### BAH Rate Tables by Location
- **Coverage**: ~300 Military Housing Areas (MHAs) in US, Alaska, Hawaii
- **ZIP Codes**: ~2,600 unique ZIP codes
- **Pay Grades**: E-1 through E-9, W-1 through W-5, O-1 through O-10 (39 total)
- **Dependency Status**: With Dependents, Without Dependents
- **Total Data Points**: 2,600 ZIPs × 39 grades × 2 statuses = ~203,000 data points

### Non-Locality BAH Rates (RC/Transit)
- **Usage**: Reservists, members in transit, no permanent duty station
- **E-1 without dependents**: $951/month
- **O-7 with dependents**: $1,416/month
- **Partial BAH**: $24.90 (E-1) to $171.30 (O-7)

### Historical BAH Data (2020-2025)
- **2020**: +2.8% average increase
- **2021**: +2.9% average increase
- **2022**: +5.1% average increase
- **2023**: +12.1% average increase (inflation spike)
- **2024**: +5.4% average increase
- **2025**: +5.4% average increase

### Major Military Installation Examples
| Installation | Location | E-5 With Deps | E-5 Without | Increase 2024→2025 |
|--------------|----------|---------------|-------------|-------------------|
| Fort Liberty (Bragg) | Fayetteville, NC | $1,476 | $1,236 | +1.0% |
| Camp Pendleton | Oceanside, CA | $3,360 | $2,706 | +5.6% |
| Naval Base San Diego | San Diego, CA | $2,943 | $2,370 | +5.4% |
| Joint Base Lewis-McChord | Tacoma, WA | $2,316 | $1,866 | ~5.4% |
| Fort Hood (Cavazos) | Killeen, TX | $1,620 | $1,356 | ~5.4% |

### How BAH is Determined
- **Survey Data**: DoD contracts annual surveys of ~400 rental markets
- **Rental Costs**: Median rents + utilities (NOT homeownership costs)
- **Housing Profiles**: Rank-specific dwelling types (bedrooms, apartment vs house)
- **Coverage**: 95% of calculated housing costs (5% out-of-pocket expected)
- **Adjustment**: Updated annually every January 1
- **Rate Protection**: BAH cannot decrease for individuals with no status change

## Formulas & Logic

### BAH Lookup (Primary Function)
```
BAH_Rate = lookup_table[ZIP_Code][Pay_Grade][Dependency_Status]

Where:
- ZIP_Code: Duty station ZIP
- Pay_Grade: E1-E9, W1-W5, O1-O10
- Dependency_Status: "with" or "without"
```

### Location Comparison
```
Current_BAH = lookup_table[Current_ZIP][Grade][Deps]
New_BAH = lookup_table[New_ZIP][Grade][Deps]

BAH_Difference = New_BAH - Current_BAH
Percent_Change = ((New_BAH - Current_BAH) / Current_BAH) × 100

Annual_Difference = BAH_Difference × 12
```

### Cost of Living Adjustment Impact
```
// Simple purchasing power comparison
Real_Value_Change = (New_BAH / Cost_of_Living_Index_New) - (Current_BAH / Cost_of_Living_Index_Current)

Example:
- Current: $1,500 BAH in low COL area (index 90) = $1,500/90 = $16.67 "real" value
- New: $2,500 BAH in high COL area (index 140) = $2,500/140 = $17.86 "real" value
- Real increase: $1.19 per index point, or 7% actual purchasing power gain
```

### Dependent Premium Calculation
```
Dependent_Premium = BAH_With_Deps - BAH_Without_Deps
Premium_Percentage = (Dependent_Premium / BAH_Without_Deps) × 100

Average Premium: 15-25% depending on location
```

### Historical Trend Analysis
```
Years = [2020, 2021, 2022, 2023, 2024, 2025]
Rates = [rate_2020, rate_2021, ..., rate_2025]

YoY_Change[year] = ((Rates[year] - Rates[year-1]) / Rates[year-1]) × 100
Total_Growth = ((rate_2025 - rate_2020) / rate_2020) × 100
CAGR = ((rate_2025 / rate_2020)^(1/5) - 1) × 100
```

## Data Sources

| Data | Source | URL | Update Frequency |
|------|--------|-----|------------------|
| 2025 BAH Rates (All Locations/Grades) | DTMO | https://www.travel.dod.mil/Portals/119/Documents/BAH/BAH_Rates_All_Locations_All_Pay_Grades/PDF-Excel/2025_BAH_Rates.pdf | Annually (Jan 1) |
| BAH Rate Lookup Tool | DTMO | https://www.travel.dod.mil/Allowances/Basic-Allowance-for-Housing/BAH-Rate-Lookup/ | Live (updated annually) |
| Non-Locality BAH Rates | DTMO | https://www.travel.dod.mil/Portals/119/Documents/BAH/PDF_Non-Locality-BAH-Rates/2025a-Non-Locality-BAH-Rates.pdf | Annually (Jan 1) |
| Historical BAH Data | DTMO Archives | https://www.travel.dod.mil/Allowances/Basic-Allowance-for-Housing/ | Archived annually |
| BAH Policy/Primer | Military Pay | https://militarypay.defense.gov/pay/allowances/bah.aspx | As needed |

## API Options

**No Official API Available**
- DTMO does not provide a public API
- Data available only as PDF/Excel downloads
- BAH Calculator is web-based (no API endpoint)

**Recommended Approach:**
1. Download annual PDF file from DTMO
2. Parse PDF or Excel to extract all rates
3. Import to database with structure:
   ```sql
   bah_rates (
     id, year, zip_code, location_name, state,
     pay_grade, dependency_status, monthly_rate,
     created_at, updated_at
   )
   ```
4. Index on: year, zip_code, pay_grade, dependency_status
5. Admin panel for annual data updates

**Third-Party Options:**
- Military.com has BAH calculator (likely scraped DTMO)
- Veterans United has BAH tool (source unknown)
- Not recommended to rely on third-party data

## Sample Calculations

### Scenario 1: PCS from Fort Liberty to San Diego

**Current Location:** Fort Liberty (Fort Bragg), NC
- ZIP: 28310
- Grade: E-6
- Dependency: With Dependents
- Current BAH: $1,560/month (2025)

**New Location:** San Diego, CA
- ZIP: 92101
- Grade: E-6
- Dependency: With Dependents
- New BAH: $3,042/month (2025)

**Comparison:**
```
Monthly Increase: $3,042 - $1,560 = $1,482
Percent Increase: ($1,482 / $1,560) × 100 = 95%
Annual Increase: $1,482 × 12 = $17,784

Result: San Diego BAH is 95% higher, +$17,784 annually
```

### Scenario 2: Promotion Impact (Same Location)

**Location:** Camp Pendleton, CA (ZIP: 92055)
**Dependency:** With Dependents

**Current Rank:** E-5
- BAH: $3,360/month

**After Promotion:** E-6
- BAH: $3,570/month

**Comparison:**
```
Monthly Increase: $3,570 - $3,360 = $210
Percent Increase: ($210 / $3,360) × 100 = 6.25%
Annual Increase: $210 × 12 = $2,520

Result: E-6 promotion adds $2,520/year in BAH at Camp Pendleton
```

### Scenario 3: Adding Dependents

**Location:** Fort Hood (Cavazos), TX (ZIP: 76544)
**Rank:** E-4

**Without Dependents:** $1,143/month
**With Dependents:** $1,368/month

**Comparison:**
```
Monthly Increase: $1,368 - $1,143 = $225
Percent Increase: ($225 / $1,143) × 100 = 19.7%
Annual Increase: $225 × 12 = $2,700

Result: Adding dependents increases BAH by $2,700/year
```

### Scenario 4: Historical Trend Analysis

**Location:** Norfolk, VA
**Rank:** E-5 with Dependents

**Historical Rates:**
- 2020: $1,623
- 2021: $1,671 (+3.0%)
- 2022: $1,755 (+5.0%)
- 2023: $1,968 (+12.1%)
- 2024: $2,073 (+5.3%)
- 2025: $2,184 (+5.4%)

**Analysis:**
```
Total Growth (2020-2025): ($2,184 - $1,623) / $1,623 = 34.6%
CAGR: ((2,184 / 1,623)^(1/5) - 1) = 6.1% per year
Peak Year: 2023 (12.1% increase due to inflation)
```

## UI/UX Recommendations

### Input Fields

**Comparison Mode Selection:**
- [ ] Compare Two Locations (default)
- [ ] Compare Ranks at Same Location
- [ ] Compare With/Without Dependents
- [ ] View Historical Trends

**Location Inputs:**
- Current/Location A: ZIP code or installation name (type-ahead)
- New/Location B: ZIP code or installation name
- Pay Grade: Dropdown (E-1 through O-10)
- Dependency Status: Toggle (With/Without)
- Year: Dropdown (2020-2025)

**Advanced Options (Collapsible):**
- Show Cost of Living adjustment
- Include historical chart
- Compare multiple locations (up to 5)

### Output Display

**Primary Comparison Card:**
```
┌─────────────────────────────────────────┐
│ Location A          vs    Location B     │
│ Fort Liberty, NC         San Diego, CA   │
│ ──────────────────────────────────────── │
│ $1,560/month            $3,042/month     │
│                                          │
│ Difference: +$1,482/mo (+95%)            │
│ Annual Impact: +$17,784/year             │
│                                          │
│ [View Breakdown] [Add to Comparison]     │
└─────────────────────────────────────────┘
```

**Detailed Breakdown Table:**
| Metric | Location A | Location B | Difference |
|--------|-----------|-----------|------------|
| Monthly BAH | $1,560 | $3,042 | +$1,482 |
| Annual BAH | $18,720 | $36,504 | +$17,784 |
| BAH as % of E-6 Base Pay | 34% | 66% | +32 pts |
| Dependent Premium | $324 | $336 | +$12 |

**Visual Elements:**
- Bar chart: Side-by-side BAH comparison
- Map view: Color-coded BAH rates by state/region
- Trend line: Historical BAH growth for location
- Heat map: Highest/lowest BAH installations

**Interactive Features:**
- Slider: Adjust year to see historical rates
- Toggle: Switch dependency status instantly
- Dropdown: Change rank to see different rates
- Multi-select: Compare up to 5 locations

## Edge Cases to Handle

1. **ZIP Code Not Found**
   - Some military ZIPs not in database
   - Fallback: Use nearest MHA or suggest alternatives
   - "ZIP 12345 not found. Did you mean: Norfolk (23551)?"

2. **Historical Data Unavailable**
   - Older years may not have all locations
   - Display: "Historical data for this location starts in 2022"

3. **Non-Locality BAH**
   - Reservists/Transit members get fixed rates
   - Different display: "RC/Transit Rate: $1,169 (E-5 with deps)"

4. **Partial BAH**
   - Members living in government quarters
   - Rare use case, low priority

5. **OCONUS Assignments**
   - Overseas Cost of Living Allowance (OHA), not BAH
   - Out of scope for this calculator
   - Display warning: "For overseas assignments, use OHA calculator"

6. **Rate Protection Scenarios**
   - Individual's rate may differ from published rate if protected
   - Disclaimer: "Rates shown are standard 2025 rates. Individual rates may vary due to rate protection."

7. **Installation Name Changes**
   - Fort Bragg → Fort Liberty
   - Fort Hood → Fort Cavazos
   - Database should include aliases

8. **Multiple ZIPs per Installation**
   - Large bases may have multiple ZIP codes
   - Group by installation name, show all ZIPs

## Implementation Priority

**Difficulty**: Easy

**Estimated Effort**: 15-20 hours

**Breakdown:**
- Data Download/Parse: 4 hours
- Database Import: 3 hours
- ZIP Lookup Logic: 2 hours
- Comparison Engine: 3 hours
- UI/Charts: 5 hours
- Testing: 3 hours

**Complexity Factors:**
✅ Simple lookup operations (no complex formulas)
✅ Static data (updated annually)
✅ No API dependencies
✅ Straightforward UI (comparison table + charts)
⚠️ Large dataset to import (~203k rows)
⚠️ PDF parsing required (convert to usable format)

**Dependencies:**
- PDF parser (pdf-parse or manual Excel conversion)
- Database (for efficient lookups)
- Chart library (Recharts)
- ZIP code validation
- Installation name database (optional enhancement)

**Why Easy:**
✅ No calculations beyond subtraction/percentage
✅ Pure lookup operations
✅ Data rarely changes
✅ Similar to existing BAH calculators (proven UI patterns)
✅ No financial modeling or tax implications

**Build Order Recommendation**: 1st (EASIEST - should build first)

## Raw Data Files

### To Download:

**1. 2025 BAH Rates (Primary Data)**
- URL: https://www.travel.dod.mil/Portals/119/Documents/BAH/BAH_Rates_All_Locations_All_Pay_Grades/PDF-Excel/2025_BAH_Rates.pdf
- Format: PDF (may have Excel option)
- Size: ~2,600 locations × 39 pay grades × 2 statuses
- Columns: MHA Name, ZIP, E-1 through O-10 (With/Without Deps)
- Save To: `S:/Military-Toolkit-Content-Library/Calculator-Research/data/bah-rates-2025.pdf`

**2. Historical BAH Rates (2020-2024)**
- URL Pattern: Same as above, change year in filename
- 2024: `/2024_BAH_Rates.pdf`
- 2023: `/2023_BAH_Rates.pdf`
- etc.
- Purpose: Historical trend analysis

**3. Non-Locality BAH Rates**
- URL: https://www.travel.dod.mil/Portals/119/Documents/BAH/PDF_Non-Locality-BAH-Rates/2025a-Non-Locality-BAH-Rates.pdf
- Format: PDF
- Purpose: RC/Transit rates

**4. Major Military Installation Database (Optional)**
- Source: Manual compilation or web scraping
- Content: Installation name, branch, state, primary ZIP
- Format: CSV
- Example: "Fort Liberty,Army,NC,28310"

## Additional Notes

**Legal Disclaimer Required:**
"BAH rates shown are official DoD rates for the selected year. Actual BAH received may vary based on individual circumstances, rate protection, partial BAH, or other factors. This tool is for comparison purposes only. Consult your finance office for official BAH determination."

**Data Update Schedule:**
- **Annual**: January 1 (DoD releases new rates)
- **Recommended**: Update calculator within 7 days of release
- **Historical**: Archive previous year's data before updating

**Accuracy Considerations:**
- Use exact rates from DTMO (no rounding)
- Preserve ZIP code leading zeros (e.g., "02134" not "2134")
- Handle multiple ZIPs per MHA correctly
- Test edge cases with known installations

**Future Enhancements:**
- OHA (Overseas Housing Allowance) calculator
- Integration with Cost of Living calculator
- PCS cost estimator (BAH + move costs + COL)
- Interactive map with clickable regions
- "Best value" ranking (BAH ÷ COL index)
- Email alerts when new rates released

**Performance Considerations:**
- Index database on ZIP, grade, year
- Cache common lookups (E-5 San Diego, E-6 Fort Bragg, etc.)
- Preload installation type-ahead data
- Optimize for mobile (large dataset)

## Sources

- [DTMO 2025 BAH Rates (All Locations)](https://www.travel.dod.mil/Portals/119/Documents/BAH/BAH_Rates_All_Locations_All_Pay_Grades/PDF-Excel/2025_BAH_Rates.pdf)
- [DTMO BAH Rate Lookup](https://www.travel.dod.mil/Allowances/Basic-Allowance-for-Housing/BAH-Rate-Lookup/)
- [Military Pay BAH Information](https://militarypay.defense.gov/pay/allowances/bah.aspx)
- [Military.com 2025 BAH](https://www.military.com/benefits/military-pay/basic-allowance-for-housing)
- [How BAH Is Calculated](https://www.military.com/paycheck-chronicles/2015/12/01/how-bah-is-calculated)
- [2025 Non-Locality BAH Rates](https://www.travel.dod.mil/Portals/119/Documents/BAH/PDF_Non-Locality-BAH-Rates/2025a-Non-Locality-BAH-Rates.pdf)
