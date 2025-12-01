---
date: "2026-02-01"
---# Cost of Living Calculator - Build Research

## Overview
This calculator helps transitioning servicemembers compare cost of living between their current location and potential new civilian job locations. Adjusts salary offers to show equivalent purchasing power, accounts for state taxes (including military exemptions), and optionally factors in military-specific savings like commissary access. Answers: "A $75K offer in San Francisco vs $60K in Austin - which is really better?"

## Data Requirements

### Cost of Living Index Data

**Primary Data Source Options:**

**Option 1: C2ER COLI (Council for Community and Economic Research)**
- **Coverage**: 300+ metro areas
- **History**: Data since 1990
- **Granularity**: City/county level
- **Categories**: 60 goods/services across 6 categories
- **Status**: ⚠️ **PAID SUBSCRIPTION REQUIRED** (Copyrighted data)
- **API**: Available through Lightcast (paid)
- **Cost**: Unknown, contact C2ER for pricing

**Option 2: BLS CPI (Bureau of Labor Statistics)**
- **Coverage**: Major metropolitan areas
- **Limitation**: ❌ Does NOT provide city-to-city comparisons
- **Purpose**: Tracks inflation/price changes over time within each area
- **Status**: ✅ FREE, official government data
- **API**: Yes, free BLS API
- **Note**: Cannot be used for "NYC vs SF" comparisons (BLS explicitly warns against this)

**Option 3: Free Alternatives**
- **Numbeo**: Crowd-sourced COL data, free API available
- **BestPlaces**: Free COL comparison tool
- **MIT Living Wage Calculator**: Living wage by location (free)
- **Expatistan**: User-contributed COL data

**Recommended Approach**: Use Numbeo API (free) or hard-code static data from C2ER/BestPlaces

### Cost of Living Categories

**Standard Categories (6 main):**
1. **Housing** (35-40% of budget)
   - Rent/mortgage
   - Property taxes
   - Insurance
   - Utilities

2. **Food/Groceries** (10-15% of budget)
   - Groceries
   - Dining out
   - Household essentials

3. **Transportation** (15-20% of budget)
   - Gas prices
   - Car maintenance
   - Public transit
   - Tolls/parking
   - Vehicle registration

4. **Healthcare** (5-10% of budget)
   - Insurance premiums
   - Medical services
   - Prescriptions
   - Hospital visits

5. **Utilities** (5-8% of budget)
   - Electric
   - Gas/Heat
   - Water
   - Internet/Cable

6. **Miscellaneous** (15-20% of budget)
   - Childcare
   - Entertainment
   - Clothing
   - Personal care

### State Income Tax Data (2025)

**No Income Tax States (9):**
- Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming
- New Hampshire (joined 2025)

**Military Retirement Tax Treatment:**

**Fully Exempt (25 states):**
Alabama, Arizona, Arkansas, Connecticut, Hawaii, Illinois, Indiana, Iowa, Kansas, Louisiana, Maine, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Nebraska, New Jersey, New York, North Carolina, North Dakota, Ohio, Oklahoma, Pennsylvania, Wisconsin

**Partial Exemptions (11 states):**
Colorado, Delaware, Georgia, Idaho, Kentucky, Maryland, New Mexico, Oregon, South Carolina, Virginia, West Virginia

**Fully Taxed (2):**
California ($20K exemption starting 2025), Washington D.C.

**Active Duty Pay:**
- Taxed by state of legal residence (not duty station)
- Soldiers' and Sailors' Civil Relief Act protections

### Military-Specific Cost Factors

**Commissary Savings:**
- **Official Estimate**: 17.7% - 23.7% savings vs civilian stores
- **High Estimate**: Up to 42% in some regions
- **Real-World**: ~20% average savings
- **Example**: Milk $2.50 vs $3.60, Bread $1.50 vs $2.40
- **Surcharge**: 5% added at checkout
- **Availability**: Must have base access

**Other Military Benefits:**
- Exchange savings (~15% on goods)
- On-base gas (varies, sometimes cheaper)
- Free/subsidized childcare (CDC)
- MWR facilities (gyms, pools, etc.)
- Healthcare via Tricare (significant savings)

### Sample Cost of Living Indices (2025 Estimates)

| City | Overall Index | Housing | Food | Transport | Healthcare |
|------|---------------|---------|------|-----------|------------|
| National Average | 100 | 100 | 100 | 100 | 100 |
| San Francisco, CA | 189 | 285 | 110 | 145 | 105 |
| New York City, NY | 175 | 265 | 115 | 130 | 110 |
| San Diego, CA | 152 | 232 | 108 | 125 | 102 |
| Seattle, WA | 145 | 215 | 105 | 130 | 98 |
| Boston, MA | 140 | 205 | 110 | 125 | 108 |
| Austin, TX | 112 | 135 | 98 | 105 | 95 |
| Denver, CO | 118 | 155 | 102 | 110 | 100 |
| Fort Worth, TX | 95 | 88 | 98 | 100 | 92 |
| Oklahoma City, OK | 87 | 75 | 95 | 98 | 88 |

*(Note: Actual 2025 indices would need to be sourced from C2ER, Numbeo, or similar)*

## Formulas & Logic

### Basic Salary Adjustment
```
Equivalent_Salary = Current_Salary × (New_Location_Index / Current_Location_Index)

Example:
Current: $60,000 in Austin (index 112)
New: Moving to San Francisco (index 189)
Equivalent_Salary = $60,000 × (189 / 112) = $101,250

Result: Need $101,250 in SF to maintain Austin lifestyle
```

### Category-Specific Adjustment
```
// More accurate: weight by actual spending in each category
Weighted_Index = Σ(Category_Index[i] × Category_Weight[i])

Where Category_Weight based on budget:
- Housing: 35%
- Food: 12%
- Transportation: 18%
- Healthcare: 8%
- Utilities: 7%
- Misc: 20%

Custom_Index = (Housing × 0.35) + (Food × 0.12) + (Transport × 0.18) +
                (Healthcare × 0.08) + (Utilities × 0.07) + (Misc × 0.20)
```

### After-Tax Comparison
```
Current_After_Tax = Current_Salary × (1 - Current_State_Tax_Rate)
New_After_Tax = New_Salary × (1 - New_State_Tax_Rate)

Purchasing_Power_Current = Current_After_Tax / Current_COL_Index
Purchasing_Power_New = New_After_Tax / New_COL_Index

Real_Value_Change = Purchasing_Power_New - Purchasing_Power_Current
```

### Military Benefit Adjustment
```
Effective_Savings = 0

if (Has_Base_Access) {
  Commissary_Savings = Annual_Grocery_Budget × 0.20  // 20% savings
  Exchange_Savings = Annual_Goods_Budget × 0.15  // 15% savings
  Effective_Savings += Commissary_Savings + Exchange_Savings
}

if (Has_Tricare) {
  Healthcare_Savings = Civilian_Healthcare_Cost - Tricare_Cost
  Effective_Savings += Healthcare_Savings
}

Adjusted_Salary = Required_Salary - Effective_Savings
```

### Complete Comparison Formula
```
// Step 1: Calculate base COL adjustment
Base_Equivalent = Current_Salary × (New_COL / Current_COL)

// Step 2: Adjust for state taxes
Tax_Adjustment = (Base_Equivalent × New_Tax_Rate) - (Current_Salary × Current_Tax_Rate)
After_Tax_Equivalent = Base_Equivalent + Tax_Adjustment

// Step 3: Factor in military benefits (if applicable)
if (Military_Benefits_Available) {
  Military_Savings = Calculate_Military_Savings(location)
  Final_Equivalent = After_Tax_Equivalent - Military_Savings
} else {
  Final_Equivalent = After_Tax_Equivalent
}

// Step 4: Compare to actual offer
Real_Value = Actual_Offer - Final_Equivalent
Better_Deal = (Real_Value > 0) ? "New location is better" : "Current location is better"
```

## Data Sources

| Data | Source | URL | Update Frequency | Cost |
|------|--------|-----|------------------|------|
| C2ER Cost of Living Index | C2ER | https://www.c2er.org/cost-of-living-index/ | Quarterly | 💰 PAID |
| Numbeo COL Data | Numbeo API | https://www.numbeo.com/api/ | Continuous | ✅ FREE |
| BLS CPI Data | BLS API | https://www.bls.gov/cpi/ | Monthly | ✅ FREE |
| State Tax Rates | Tax Foundation | https://taxfoundation.org/data/all/state/state-income-tax-rates/ | Annually | ✅ FREE |
| Military Tax Exemptions | Military.com | https://www.military.com/money/personal-finance/state-tax-information.html | As needed | ✅ FREE |
| MIT Living Wage | MIT | https://livingwage.mit.edu/ | Annually | ✅ FREE |
| BestPlaces COL | BestPlaces | https://www.bestplaces.net/cost-of-living/ | Continuously | ✅ FREE |

## API Options

### Numbeo API (Recommended)
- **URL**: https://www.numbeo.com/api/
- **Cost**: Free tier available, paid plans for commercial use
- **Coverage**: Global cities
- **Data**: COL indices, prices for specific items
- **Rate Limits**: Varies by plan
- **Format**: JSON
- **Example Endpoint**: `https://www.numbeo.com/api/city_prices?api_key=XXX&query=San+Francisco`

### BLS API
- **URL**: https://www.bls.gov/developers/
- **Cost**: FREE
- **Registration**: Required (free)
- **Limitation**: CPI data only (not direct COL comparison)
- **Use Case**: Inflation tracking, not city comparison
- **Rate Limits**: 500 queries/day (v1), 500 queries/day with higher limits (v2)

### Lightcast API (C2ER Data)
- **URL**: https://docs.lightcast.dev/data-sets/us-cost-of-living-index
- **Cost**: 💰 PAID (commercial)
- **Coverage**: Official C2ER data
- **Granularity**: Nation, state, MSA, county
- **Best For**: Enterprise/commercial applications

### Recommended Approach
1. **MVP**: Hard-code top 100 cities with static COL indices
2. **V2**: Integrate Numbeo API (free tier)
3. **V3**: Licensed C2ER data for accuracy (if budget allows)

## Sample Calculations

### Scenario 1: Military to Civilian Career (With Benefits Loss)

**Current Situation:**
- Location: Fort Liberty (Fayetteville, NC)
- Salary: $55,000 (E-6 base pay)
- COL Index: 88 (low cost area)
- State Tax: 4.75% (NC)
- Commissary Access: Yes (~$2,400/year savings)
- Tricare: Yes (~$5,000/year savings vs civilian insurance)

**Job Offer:**
- Location: San Francisco, CA
- Salary: $90,000
- COL Index: 189 (very high cost)
- State Tax: 9.3% (CA)
- Benefits: Standard civilian health insurance (~$8,000/year cost)

**Calculation:**
```
// Step 1: COL adjustment
Base_Equivalent = $55,000 × (189 / 88) = $118,068

// Step 2: Tax adjustment
NC_Tax = $55,000 × 0.0475 = $2,613
CA_Tax = $118,068 × 0.093 = $10,980
Tax_Difference = $10,980 - $2,613 = $8,367
After_Tax_Equivalent = $118,068 + $8,367 = $126,435

// Step 3: Lost military benefits
Commissary_Loss = $2,400
Healthcare_Cost_Increase = $8,000 - $1,200 (Tricare) = $6,800
Total_Benefit_Loss = $2,400 + $6,800 = $9,200

Final_Needed = $126,435 + $9,200 = $135,635

// Comparison
Actual_Offer = $90,000
Shortfall = $135,635 - $90,000 = $45,635

Result: $90K offer is actually WORSE than current $55K military salary
Real purchasing power: $90K feels like $44,365 compared to current situation
```

### Scenario 2: Civilian Job Comparison (Two Offers)

**Offer A: Austin, TX**
- Salary: $85,000
- COL Index: 112
- State Tax: 0% (Texas)

**Offer B: Denver, CO**
- Salary: $95,000
- COL Index: 118
- State Tax: 4.55%

**Comparison:**
```
// Normalize both to national average (index 100)
Austin_Normalized = $85,000 × (100 / 112) = $75,893
Denver_Normalized = $95,000 × (100 / 118) = $80,508

// After-tax
Austin_After_Tax = $85,000 (no state tax)
Denver_After_Tax = $95,000 × (1 - 0.0455) = $90,678

// Purchasing power (after-tax ÷ COL index)
Austin_Power = ($85,000 / 112) = $758.93 per index point
Denver_Power = ($90,678 / 118) = $768.46 per index point

Result: Denver offer is slightly better (+$947/year in purchasing power)
```

### Scenario 3: Retiree Moving Analysis

**Current:** Norfolk, VA
- Military Retirement: $30,000/year
- COL Index: 105
- VA State Tax: Partial exemption (first $10K exempt)
- Tax on Retirement: $30K - $10K = $20K × 5.75% = $1,150

**Considering:** Florida
- Military Retirement: $30,000/year
- COL Index: 98 (slightly lower)
- State Tax: 0% (Florida)
- Tax Savings: $1,150/year

**Analysis:**
```
Norfolk_After_Tax = $30,000 - $1,150 = $28,850
Florida_After_Tax = $30,000 (no tax)

Norfolk_Purchasing_Power = $28,850 / 105 = $274.76 per index point
Florida_Purchasing_Power = $30,000 / 98 = $306.12 per index point

Real Gain = ($306.12 - $274.76) × 100 = $3,136/year
Percentage Improvement = ($3,136 / $28,850) = 10.9% better off

Result: Moving to Florida provides 10.9% more purchasing power
```

## UI/UX Recommendations

### Input Fields

**Step 1: Current Location**
- Current city/state (type-ahead)
- Current salary (annual)
- Are you currently active duty military? (Yes/No)
  - If Yes: Do you have base access? (Yes/No)
  - If Yes: Are you using Tricare? (Yes/No)

**Step 2: New Location(s)**
- New city/state (type-ahead, allow multiple)
- Salary offer (or "Calculate what I need")
- Will you have base access nearby? (Yes/No - if veteran)

**Step 3: Optional Details (Collapsible)**
- Annual grocery budget (for commissary savings calc)
- Current health insurance cost
- Housing preference (rent vs buy)
- Family size (for living wage comparison)

### Output Display

**Primary Comparison Card:**
```
┌──────────────────────────────────────────────────┐
│ $85,000 in Austin, TX                            │
│ equals                                           │
│ $101,250 in San Francisco, CA                    │
│                                                  │
│ Your Offer: $90,000                              │
│ Shortfall: -$11,250 (11% below equivalent)       │
│                                                  │
│ Real Purchasing Power: Feels like $75,214        │
└──────────────────────────────────────────────────┘
```

**Detailed Breakdown:**
| Category | Austin (Index 112) | San Francisco (Index 189) | Difference |
|----------|-------------------|--------------------------|------------|
| Housing | $1,500/mo | $2,531/mo | +$1,031 |
| Food | $450/mo | $495/mo | +$45 |
| Transportation | $525/mo | $724/mo | +$199 |
| Healthcare | $400/mo | $420/mo | +$20 |
| Utilities | $175/mo | $148/mo | -$27 |
| Misc | $1,000/mo | $1,688/mo | +$688 |
| **Total** | **$4,050/mo** | **$6,006/mo** | **+$1,956** |

**Visual Elements:**
- Bar chart: Side-by-side salary comparison
- Pie chart: Category breakdown of COL difference
- Map view: Color-coded US map by COL
- Gauge: "Your offer vs what you need" (red/yellow/green)

**Interactive Features:**
- Slider: Adjust salary offer to see when it breaks even
- Toggle: Include/exclude military benefits
- Multi-compare: Up to 5 locations simultaneously
- Category weights: Customize budget allocation

## Edge Cases to Handle

1. **City Not in Database**
   - Use state average as fallback
   - Suggest nearby cities

2. **Extremely High/Low Salaries**
   - Tax brackets change at different income levels
   - Progressive taxation not linear

3. **Multiple State Tax Situations**
   - Active duty: Residence state vs duty station
   - Remote work: Work state vs living state

4. **Partial-Year Calculations**
   - Mid-year moves
   - Prorate benefits/taxes

5. **Military Retirement + Civilian Job**
   - Combined income tax treatment
   - Different state exemptions for each

6. **Dual-Income Households**
   - Both salaries change
   - Combined tax brackets

7. **OCONUS to CONUS**
   - Overseas to stateside moves
   - Currency considerations (if applicable)

8. **Cost of Moving**
   - PCS allowance vs civilian moving costs
   - Not included in COL but affects decision

## Implementation Priority

**Difficulty**: Medium

**Estimated Effort**: 25-35 hours

**Breakdown:**
- Data Research/Sourcing: 6 hours
- Database Schema: 3 hours
- API Integration (Numbeo): 5 hours
- Tax Logic: 6 hours
- Military Benefits Calc: 4 hours
- UI/Form Design: 5 hours
- Results/Charts: 4 hours
- Testing: 4 hours

**Complexity Factors:**
✅ Formulas are straightforward (multiplication/division)
⚠️ Data sourcing challenge (C2ER is paid, free alternatives less accurate)
⚠️ State tax logic complex (exemptions vary)
⚠️ Military benefit calculations add complexity
❌ Multiple calculation paths depending on user type
❌ No free, authoritative API (must use Numbeo or hard-code)

**Dependencies:**
- COL data (Numbeo API or static data)
- State tax tables (static, update annually)
- Chart library (Recharts)
- City/state database for type-ahead
- Possibly existing state benefits data from main app

**Why Medium:**
✅ Basic formula is simple
✅ Static data (updates annually)
⚠️ Data licensing issues (C2ER is copyrighted)
❌ Military-specific logic adds complexity
❌ Tax calculations with exemptions
❌ Multiple user scenarios to handle

**Build Order Recommendation**: 4th (most complex, build last)

## Raw Data Files

### To Download/Create:

**1. Top 100 US Cities COL Indices (Manual Compilation)**
- Source: BestPlaces, Numbeo, public sources
- Format: CSV
- Columns: City, State, Overall, Housing, Food, Transport, Healthcare, Utilities, Misc
- Save To: `S:/Military-Toolkit-Content-Library/Calculator-Research/data/col-indices-2025.csv`
- Note: Create manually from free sources since C2ER is paid

**2. State Income Tax Rates 2025**
- Source: Tax Foundation
- URL: https://taxfoundation.org/data/all/state/state-income-tax-rates/
- Format: Copy to CSV
- Columns: State, Top Rate, Brackets
- Save To: `S:/Military-Toolkit-Content-Library/Calculator-Research/data/state-tax-rates-2025.csv`

**3. Military Tax Exemptions by State**
- Source: Military.com, MOAA
- Format: Manual CSV creation
- Columns: State, Active Duty Status, Retirement Full/Partial/None, Exemption Amount
- Save To: `S:/Military-Toolkit-Content-Library/Calculator-Research/data/military-tax-exemptions-2025.csv`

**4. Major Military Installation Locations**
- Could leverage existing state benefits tool data
- Adds context for "nearby base" calculations

## Additional Notes

**Legal Disclaimer Required:**
"This calculator provides estimates for educational and comparison purposes only. Actual cost of living varies based on individual circumstances, lifestyle choices, and specific neighborhoods within cities. State tax calculations are simplified and may not account for all deductions, credits, or individual situations. Consult a tax professional and financial advisor before making major relocation decisions. Cost of living data sourced from [Numbeo/BestPlaces/etc.] and may not reflect current market conditions."

**Data Update Schedule:**
- **COL Indices**: Quarterly (if using Numbeo API) or annually (if static)
- **State Tax Rates**: Annually (January)
- **Military Exemptions**: As legislation changes (monitor MOAA updates)

**Accuracy Considerations:**
- COL indices are averages; neighborhoods vary widely
- Housing costs change rapidly in some markets
- Remote work complicates state tax calculations
- Military benefits value varies by usage patterns

**Future Enhancements:**
- Housing cost breakdown (rent vs buy)
- Childcare costs by location
- School quality integration
- Crime rate comparison
- Integration with job search tool
- "Best value" city rankings for retirees
- Currency conversion for OCONUS

**Alternative Approaches:**
If C2ER data is cost-prohibitive:
1. Use MIT Living Wage as baseline
2. Supplement with Numbeo for specific cities
3. Crowdsource data from users over time
4. Partner with C2ER for non-profit/veteran discount

## Sources

- [BLS Consumer Price Index](https://www.bls.gov/cpi/)
- [C2ER Cost of Living Index](https://www.c2er.org/cost-of-living-index/)
- [Numbeo Cost of Living](https://www.numbeo.com/cost-of-living/)
- [Tax Foundation State Tax Rates](https://taxfoundation.org/data/all/state/state-income-tax-rates/)
- [Military.com State Tax Information](https://www.military.com/money/personal-finance/state-tax-information.html)
- [States That Don't Tax Military Retirement](https://www.realpha.com/blog/states-that-dont-tax-military-retirement)
- [Military Wallet Commissary Benefits](https://themilitarywallet.com/commissary-benefits/)
- [NerdWallet COL Calculator](https://www.nerdwallet.com/cost-of-living-calculator)
- [Salary.com COL Comparison](https://www.salary.com/research/cost-of-living)
- [MIT Living Wage Calculator](https://livingwage.mit.edu/)
