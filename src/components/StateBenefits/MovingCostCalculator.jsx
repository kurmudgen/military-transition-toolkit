import { useState } from 'react';
import { statesData } from '../../data/stateBenefitsData';

export default function MovingCostCalculator() {
  const [moveData, setMoveData] = useState({
    fromState: 'CA',
    toState: 'TX',
    ownOrRent: 'own',
    currentHomeValue: 500000,
    currentRent: 2500,
    homeSize: '3br',
    movingApproach: 'hybrid',
    distance: 1500,
    disabilityRating: 70,
    monthlyRetirement: 2400,
    homeValueTarget: 400000,
  });

  const [results, setResults] = useState(null);

  const handleChange = (field, value) => {
    setMoveData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateMove = () => {
    // Moving costs by approach
    const movingCosts = {
      diy: {
        truckRental: 1400 + (moveData.distance / 1000) * 200, // Base + per 1000 miles
        gas: (moveData.distance / 8) * 4, // 8 mpg, $4/gallon for truck
        tolls: moveData.distance > 2000 ? 150 : 50,
        travel: 450 + (Math.ceil(moveData.distance / 500) * 150), // Hotels
        meals: 350,
        setup: 1200,
      },
      hybrid: {
        container: 2800 + (moveData.distance / 1000) * 400,
        travel: 450 + (Math.ceil(moveData.distance / 500) * 150),
        setup: 1200,
      },
      fullService: {
        movers: 4200 + (moveData.distance / 1000) * 800,
        packing: 1200,
        insurance: 300,
        tip: 500,
        travel: 450 + (Math.ceil(moveData.distance / 500) * 150),
        setup: 1200,
      },
    };

    const diyTotal = Object.values(movingCosts.diy).reduce((a, b) => a + b, 0);
    const hybridTotal = Object.values(movingCosts.hybrid).reduce((a, b) => a + b, 0);
    const fullServiceTotal = Object.values(movingCosts.fullService).reduce((a, b) => a + b, 0);

    // Calculate annual savings
    const fromState = statesData[moveData.fromState];
    const toState = statesData[moveData.toState];

    let annualSavings = 0;

    // Property tax savings
    const fromPropertyTax = moveData.homeValueTarget * (fromState.taxes.propertyTaxRate / 100);
    let toPropertyTax = moveData.homeValueTarget * (toState.taxes.propertyTaxRate / 100);

    if (moveData.disabilityRating >= 100 && toState.taxes.propertyTax100Pct >= 999999) {
      toPropertyTax = 0;
    } else if (moveData.disabilityRating >= 70) {
      const exemption = toState.taxes.propertyTax70Pct || 0;
      toPropertyTax = (moveData.homeValueTarget - exemption) * (toState.taxes.propertyTaxRate / 100);
    }

    const propertyTaxSavings = fromPropertyTax - toPropertyTax;
    annualSavings += propertyTaxSavings;

    // Income tax savings
    const yearlyRetirement = moveData.monthlyRetirement * 12;
    const fromIncomeTax = fromState.taxes.incomeTaxRate > 0 ? yearlyRetirement * (fromState.taxes.incomeTaxRate / 100) : 0;
    const toIncomeTax = toState.taxes.incomeTaxRate > 0 ? yearlyRetirement * (toState.taxes.incomeTaxRate / 100) : 0;
    const incomeTaxSavings = fromIncomeTax - toIncomeTax;
    annualSavings += incomeTaxSavings;

    // Cost of living difference
    const fromCOL = fromState.cities[0]?.costOfLivingIndex || 100;
    const toCOL = toState.cities[0]?.costOfLivingIndex || 100;
    const colSavings = ((fromCOL - toCOL) / 100) * 50000; // Estimated $50K annual spending
    annualSavings += colSavings;

    // Insurance savings (estimated)
    const insuranceSavings = 800; // Rough estimate lower in TX vs CA
    annualSavings += insuranceSavings;

    // Break-even calculations
    const diyBreakEven = diyTotal / annualSavings * 12; // months
    const hybridBreakEven = hybridTotal / annualSavings * 12;
    const fullServiceBreakEven = fullServiceTotal / annualSavings * 12;

    setResults({
      movingCosts: {
        diy: { costs: movingCosts.diy, total: diyTotal },
        hybrid: { costs: movingCosts.hybrid, total: hybridTotal },
        fullService: { costs: movingCosts.fullService, total: fullServiceTotal },
      },
      savings: {
        propertyTax: propertyTaxSavings,
        incomeTax: incomeTaxSavings,
        costOfLiving: colSavings,
        insurance: insuranceSavings,
        total: annualSavings,
      },
      breakEven: {
        diy: diyBreakEven,
        hybrid: hybridBreakEven,
        fullService: fullServiceBreakEven,
      },
      netBenefit: {
        year1Diy: annualSavings - diyTotal,
        year1Hybrid: annualSavings - hybridTotal,
        year1FullService: annualSavings - fullServiceTotal,
        year3: annualSavings * 3 - hybridTotal,
        year5: annualSavings * 5 - hybridTotal,
        year10: annualSavings * 10 - hybridTotal,
      },
    });
  };

  const formatCurrency = (amount) => {
    return `$${Math.round(amount).toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-lg">
        <h2 className="text-3xl font-bold mb-2">🚚 Moving Cost vs Benefit Calculator</h2>
        <p className="text-purple-100">Compare the cost of moving against long-term savings</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">From State</label>
            <select
              value={moveData.fromState}
              onChange={(e) => handleChange('fromState', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            >
              {Object.keys(statesData).map(code => (
                <option key={code} value={code}>{statesData[code].name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">To State</label>
            <select
              value={moveData.toState}
              onChange={(e) => handleChange('toState', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            >
              {Object.keys(statesData).map(code => (
                <option key={code} value={code}>{statesData[code].name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Disability Rating</label>
            <select
              value={moveData.disabilityRating}
              onChange={(e) => handleChange('disabilityRating', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            >
              <option value="0">0%</option>
              <option value="50">50%</option>
              <option value="70">70%</option>
              <option value="100">100%</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Monthly Military Retirement</label>
            <input
              type="number"
              value={moveData.monthlyRetirement}
              onChange={(e) => handleChange('monthlyRetirement', parseInt(e.target.value))}
              placeholder="e.g., 2400"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Target Home Value</label>
            <input
              type="number"
              value={moveData.homeValueTarget}
              onChange={(e) => handleChange('homeValueTarget', parseInt(e.target.value))}
              placeholder="e.g., 400000"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Distance (miles)</label>
            <input
              type="number"
              value={moveData.distance}
              onChange={(e) => handleChange('distance', parseInt(e.target.value))}
              placeholder="e.g., 1500"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <button
          onClick={calculateMove}
          className="w-full bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 font-bold text-lg"
        >
          Calculate Moving Costs & Break-Even
        </button>

        {/* Results */}
        {results && (
          <div className="space-y-6 mt-8">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">
                MOVING FROM {statesData[moveData.fromState].name} TO {statesData[moveData.toState].name}
              </h3>
            </div>

            {/* Moving Cost Breakdown */}
            <div>
              <h3 className="text-xl font-bold mb-4">📊 MOVING COST BREAKDOWN:</h3>

              <div className="space-y-4">
                {/* DIY */}
                <div className="border-2 border-gray-300 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-2">OPTION 1: DIY Moving (Rent Truck)</h4>
                  <div className="text-sm space-y-1 mb-2">
                    <p>Truck rental ({Math.ceil(moveData.distance / 200)} days): {formatCurrency(results.movingCosts.diy.costs.truckRental)}</p>
                    <p>Gas (~{moveData.distance} miles): {formatCurrency(results.movingCosts.diy.costs.gas)}</p>
                    <p>Tolls: {formatCurrency(results.movingCosts.diy.costs.tolls)}</p>
                    <p>Travel costs: {formatCurrency(results.movingCosts.diy.costs.travel)}</p>
                    <p>Meals on road: {formatCurrency(results.movingCosts.diy.costs.meals)}</p>
                    <p>New home setup: {formatCurrency(results.movingCosts.diy.costs.setup)}</p>
                  </div>
                  <p className="font-bold text-xl text-green-600">TOTAL DIY COST: {formatCurrency(results.movingCosts.diy.total)}</p>
                </div>

                {/* Hybrid */}
                <div className="border-2 border-gray-300 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-2">OPTION 2: Hybrid (Pack Yourself, Pros Move Container)</h4>
                  <div className="text-sm space-y-1 mb-2">
                    <p>PODS or ABF Container: {formatCurrency(results.movingCosts.hybrid.costs.container)}</p>
                    <p>Travel costs: {formatCurrency(results.movingCosts.hybrid.costs.travel)}</p>
                    <p>New home setup: {formatCurrency(results.movingCosts.hybrid.costs.setup)}</p>
                  </div>
                  <p className="font-bold text-xl text-green-600">TOTAL HYBRID COST: {formatCurrency(results.movingCosts.hybrid.total)}</p>
                </div>

                {/* Full Service */}
                <div className="border-2 border-gray-300 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-2">OPTION 3: Full-Service Professional Movers</h4>
                  <div className="text-sm space-y-1 mb-2">
                    <p>Packing service: {formatCurrency(results.movingCosts.fullService.costs.packing)}</p>
                    <p>Loading/transport: {formatCurrency(results.movingCosts.fullService.costs.movers)}</p>
                    <p>Insurance: {formatCurrency(results.movingCosts.fullService.costs.insurance)}</p>
                    <p>Tip for movers: {formatCurrency(results.movingCosts.fullService.costs.tip)}</p>
                    <p>Travel costs: {formatCurrency(results.movingCosts.fullService.costs.travel)}</p>
                    <p>New home setup: {formatCurrency(results.movingCosts.fullService.costs.setup)}</p>
                  </div>
                  <p className="font-bold text-xl text-green-600">TOTAL FULL-SERVICE COST: {formatCurrency(results.movingCosts.fullService.total)}</p>
                </div>
              </div>
            </div>

            {/* Benefit Analysis */}
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">💰 BENEFIT ANALYSIS (Based on Your Profile):</h3>
              <h4 className="font-bold mb-2">ANNUAL SAVINGS in {statesData[moveData.toState].name} vs {statesData[moveData.fromState].name}:</h4>
              <div className="space-y-1 mb-3">
                <p>Property Tax Savings: {formatCurrency(results.savings.propertyTax)} ({moveData.disabilityRating}% disabled, ${moveData.homeValueTarget.toLocaleString()} home)</p>
                <p>Income Tax Savings: {formatCurrency(results.savings.incomeTax)} (military retirement)</p>
                <p>Lower Cost of Living: {formatCurrency(results.savings.costOfLiving)}</p>
                <p>Lower Insurance Costs: {formatCurrency(results.savings.insurance)}</p>
              </div>
              <p className="font-bold text-2xl text-green-700">TOTAL ANNUAL SAVINGS: {formatCurrency(results.savings.total)}/year</p>
            </div>

            {/* Break-Even Analysis */}
            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">BREAK-EVEN ANALYSIS:</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">DIY Move ({formatCurrency(results.movingCosts.diy.total)}):</h4>
                  <p className="text-green-700 font-bold">Break-Even: {results.breakEven.diy.toFixed(1)} months ✅ HIGHLY RECOMMENDED</p>
                  <p>Year 1 Net Benefit: {formatCurrency(results.netBenefit.year1Diy)}</p>
                  <p>5-Year Net Benefit: {formatCurrency(results.netBenefit.year5 + (results.movingCosts.hybrid.total - results.movingCosts.diy.total))}</p>
                </div>

                <div>
                  <h4 className="font-bold">Hybrid Move ({formatCurrency(results.movingCosts.hybrid.total)}):</h4>
                  <p className="text-green-700 font-bold">Break-Even: {results.breakEven.hybrid.toFixed(1)} months ✅ RECOMMENDED</p>
                  <p>Year 1 Net Benefit: {formatCurrency(results.netBenefit.year1Hybrid)}</p>
                  <p>5-Year Net Benefit: {formatCurrency(results.netBenefit.year5)}</p>
                </div>

                <div>
                  <h4 className="font-bold">Full-Service Move ({formatCurrency(results.movingCosts.fullService.total)}):</h4>
                  <p className="text-green-700 font-bold">Break-Even: {results.breakEven.fullService.toFixed(1)} months ✅ WORTH IT</p>
                  <p>Year 1 Net Benefit: {formatCurrency(results.netBenefit.year1FullService)}</p>
                  <p>5-Year Net Benefit: {formatCurrency(results.netBenefit.year5 - (results.movingCosts.fullService.total - results.movingCosts.hybrid.total))}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-purple-300">
                <h4 className="font-bold text-lg mb-2">LONG-TERM SAVINGS:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-semibold">3-Year Savings:</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(results.netBenefit.year3)}</p>
                  </div>
                  <div>
                    <p className="font-semibold">5-Year Savings:</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(results.netBenefit.year5)}</p>
                  </div>
                  <div>
                    <p className="font-semibold">10-Year Savings:</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(results.netBenefit.year10)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">FINANCIAL RECOMMENDATION:</h3>
              <p className="text-lg">
                ✅ <span className="font-bold">HIGHLY RECOMMENDED</span>
              </p>
              <p className="mt-2">
                Even with full-service movers ({formatCurrency(results.movingCosts.fullService.total)}),
                you'll break even in {results.breakEven.fullService.toFixed(1)} months and save{' '}
                {formatCurrency(results.netBenefit.year10)} over 10 years. The move pays for itself quickly
                and provides long-term financial benefit.
              </p>
              <p className="mt-2 font-semibold">
                If budget-conscious: DIY move breaks even in just {results.breakEven.diy.toFixed(1)} months.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <button className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 font-semibold">
                📄 Download Full Moving Plan PDF
                <span className="text-xs block mt-1 text-gray-600">🔒 Sign up free</span>
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-semibold">
                💾 Save This Analysis
                <span className="text-xs block mt-1 text-gray-600">🔒 Sign up free</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
