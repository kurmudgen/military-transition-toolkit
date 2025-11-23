# AdaptHome Calculator Research & Data
**Research Date:** November 23, 2025
**Purpose:** Calculator improvements for adapthome.vet

## Executive Summary

This research compiles data on VA grant home modifications, costs, and regional pricing for Southern California to improve the AdaptHome cost calculator. Data includes 10 most common modifications, regional cost multipliers, detailed cost ranges, and popular modification packages.

## Key Findings

### VA Grant Limits (FY 2025)
- **SAH (Specially Adapted Housing):** $121,812
- **SHA (Special Housing Adaptation):** $23,444
- **HISA (Home Improvements and Structural Alterations):** $6,800

### Regional Cost Differences
- **Coastal Counties** (San Diego, Orange, Los Angeles): 12% premium
- **Inland Counties** (Riverside, San Bernardino): Baseline pricing
- Average coastal construction: $275/sq ft vs. $245/sq ft inland

### Most Common Modifications (by request frequency)
1. Bathroom modifications (ADA remodel)
2. Wheelchair ramps
3. Grab bars installation
4. Door widening
5. Kitchen modifications
6. Stairlifts
7. Non-slip flooring
8. Accessible entry/no-step entry
9. Residential elevators
10. Improved lighting/safety features

## Data Files Included

1. **adapthome-common-modifications.csv** - Top 10 modifications with cost ranges
2. **adapthome-regional-multipliers.csv** - SoCal county cost multipliers
3. **adapthome-detailed-modifications.csv** - Comprehensive modification catalog
4. **adapthome-modification-packages.csv** - Common modification combinations

## Implementation Recommendations

### Calculator Logic
1. **Base Cost Calculation:**
   - Use average costs from detailed modifications CSV
   - Apply regional multiplier based on ZIP code county
   - Provide low/high range for transparency

2. **Grant Matching:**
   - HISA ($6,800): Safety essentials, grab bars, portable ramps
   - SHA ($23,444): Essential bathroom OR basic entry packages
   - SAH ($121,812): Comprehensive packages, elevators, multi-room

3. **Package Suggestions:**
   - Auto-suggest packages based on selected modifications
   - Show which grant type best matches total cost
   - Highlight most popular combinations for similar needs

### User Experience Features
- **Cost Range Display:** Show "typical range" alongside estimate
- **Timeline Estimates:** Include installation time from data
- **Complexity Indicator:** Help set expectations (Low/Medium/High/Very High)
- **Grant Recommendations:** "Your estimated $18,000 project fits within SHA grant limits"

## Data Quality Notes

### High Confidence Data
✅ VA grant amounts (official 2025 figures)
✅ Regional cost differentials (12% coastal premium validated by multiple sources)
✅ Major modification costs (bathroom, ramp, kitchen - extensive data)

### Medium Confidence Data
⚠️ Minor modification costs (grab bars, lighting - ranges vary widely)
⚠️ Package combinations (inferred from common patterns, not hard data)
⚠️ Installation timelines (estimates based on typical projects)

### Recommended Updates
- Validate package pricing with actual SoCal contractor quotes
- Survey CAPS contractors for real-world project combinations
- Track actual AdaptHome projects to refine estimates over time

## Sources

### VA Grant Information
- [SAH, SHA & HISA Benefits: Veterans Assistance for Home Modifications](https://www.payingforseniorcare.com/home-modifications/veterans-sah-sha-hisa-grants)
- [VA Housing Grants for Disabled Veterans](https://homesforveterans.us/pages/resources)
- [VA Disability Home Renovation Grants And Programs](https://homepropertygrants.com/2025/03/va-home-renovation-grants.html)
- [VA Adaptive Housing Grants: A Complete Guide](https://valoannetwork.com/va-adaptive-housing-grants/)
- [Specially Adapted Housing Details](https://www.military.com/benefits/veteran-benefits/specially-adapted-housing-faqs.html)

### Modification Costs
- [Cost of Making a Home Wheelchair Accessible in 2025 | Angi](https://www.angi.com/articles/how-much-does-it-cost-make-my-home-handicap-accessible.htm)
- [Cost to Remodel to Adapt for a Disability | Fixr.com](https://www.fixr.com/costs/disability-remodeling)
- [Understanding the Cost of Handicap Modifications](https://thrivehomesllc.com/blog/understanding-the-cost-of-handicap-modifications-a-detailed-breakdown)
- [2025 Disability Accomodation Costs | HomeAdvisor](https://www.homeadvisor.com/cost/disability-accommodation/)
- [How Much Does It Cost to Add Accessible Features to Your Home?](https://www.elocal.com/resources/home-improvement/renovation/cost-guide/handicap-accessible-costs/)
- [Understanding the Cost of Handicap Modifications - CAPS Remodeling](https://www.capsremodeling.com/cost-of-handicap-modifications/)
- [Understanding the Costs of Making a Home Wheelchair Accessible](https://www.foundationfinishes.com/understanding-the-costs-of-making-a-home-wheelchair-accessible)

### Regional Cost Data
- [DGS California Construction Cost Index CCCI](https://www.dgs.ca.gov/RESD/Resources/Page-Content/Real-Estate-Services-Division-Resources-List-Folder/DGS-California-Construction-Cost-Index-CCCI)
- [Home Construction Costs in Orange County | GreatBuildz](https://www.greatbuildz.com/blog/home-construction-costs-in-orange-county/)
- [Cost to build ADUs | Socal - Adupros](https://www.socal-adupros.com/cost-to-build-adus)
- [RSMeans City Cost Index](https://www.rsmeans.com/rsmeans-city-cost-index)
- [Los Angeles construction costs jump 5.9%](https://www.dailynews.com/2025/03/20/los-angeles-construction-costs-jump-5-9-another-fire-rebuilding-hurdle/)

### CAPS Certifications & Common Modifications
- [What is a CAPS-Certified Contractor? | Lifeway Mobility](https://www.lifewaymobility.com/blog/what-is-a-caps-certified-contractor/)
- [Certified Aging-in-Place Contractor (CAPS)](https://finehomecontracting.com/caps/)
- [CAPS Remodeling - Accessible Remodeling](https://www.capsremodeling.com/)

---

## Quick Reference Tables

### Grant Capacity by Project Type

| Project Type | Estimated Cost | Best Grant | Fits Within Limit? |
|--------------|----------------|------------|-------------------|
| Safety Essentials | $2,800-$13,000 | HISA/SHA | ✅ Yes |
| Basic Entry | $3,200-$10,500 | SHA | ✅ Yes |
| Essential Bathroom | $7,100-$23,500 | SHA | ⚠️ Tight fit |
| Full Bathroom | $11,500-$48,500 | SAH | ⚠️ May exceed SHA |
| Kitchen Basic | $2,700-$12,500 | SHA | ✅ Yes |
| Bathroom + Entry | $12,200-$52,500 | SAH | ❌ Exceeds SHA |
| First Floor Suite | $18,000-$75,000 | SAH | ❌ Exceeds SHA |
| Comprehensive | $26,200-$95,500 | SAH | ❌ Requires SAH |

### Regional Pricing Examples

**Example: Full ADA Bathroom Remodel**
- Base Average Cost: $20,000
- San Diego (1.12x): $22,400
- Orange County (1.12x): $22,400
- Riverside (1.00x): $20,000
- **Savings moving inland:** $2,400

**Example: Bathroom + Entry Package**
- Base Average Cost: $28,500
- Coastal Counties: $31,920
- Inland Counties: $28,500
- **Savings moving inland:** $3,420

## Next Steps for Implementation

1. ✅ Import CSV files into calculator database
2. ⬜ Build cost calculation engine with regional multipliers
3. ⬜ Create package suggestion algorithm
4. ⬜ Add grant recommendation logic
5. ⬜ Validate pricing with 3-5 SoCal CAPS contractors
6. ⬜ A/B test calculator accuracy with real veteran inquiries
7. ⬜ Refine based on actual project data from first 25 leads

---

*Data compiled by Formation Labs LLC for AdaptHome (adapthome.vet)*
*Last updated: November 23, 2025*
