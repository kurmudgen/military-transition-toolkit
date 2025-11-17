import { useState } from 'react';
import { Link } from 'react-router-dom';
import { statesData, stateRankings } from '../../data/stateBenefitsData';

export default function StateBenefitsComparison() {
  const [selectedStates, setSelectedStates] = useState(['FL', 'TX', 'CA', 'VA']);
  const [showCalculator, setShowCalculator] = useState(false);

  const availableStates = Object.keys(statesData);

  const handleStateChange = (index, newState) => {
    const newSelected = [...selectedStates];
    newSelected[index] = newState;
    setSelectedStates(newSelected);
  };

  const compareData = selectedStates.map(code => statesData[code]);

  // Calculate category ratings
  const getTaxRating = (state) => {
    if (!state) return 0;
    if (state.taxes.incomeTaxRate === 0 && state.taxes.propertyTax100Pct >= 999999) return 5;
    if (state.taxes.incomeTaxRate === 0) return 4;
    if (state.taxes.retirementExemptAmount >= 999999) return 4;
    if (state.taxes.twentyYearSavings > 50000) return 4;
    if (state.taxes.twentyYearSavings > 20000) return 3;
    return 2;
  };

  const getHealthcareRating = (state) => {
    if (!state) return 0;
    const facilityCount = state.healthcare.length;
    const avgQuality = state.healthcare.reduce((sum, f) => sum + (f.qualityRating || 0), 0) / facilityCount;
    if (facilityCount >= 7 && avgQuality >= 4.0) return 5;
    if (facilityCount >= 5 && avgQuality >= 3.8) return 4;
    if (facilityCount >= 3) return 3;
    return 2;
  };

  const getEducationRating = (state) => {
    if (!state) return 0;
    const hasTransferableProgram = state.education.some(e => e.programType.includes('depend') || e.programType.includes('Transfer'));
    const maxValue = Math.max(...state.education.map(e => e.fourYearValue || 0));
    if (maxValue >= 40000 && hasTransferableProgram) return 5;
    if (maxValue >= 30000) return 4;
    if (maxValue >= 15000) return 3;
    return 2;
  };

  const getHousingRating = (state) => {
    if (!state || !state.cities.length) return 0;
    const avgPrice = state.cities.reduce((sum, c) => sum + c.medianHomePrice, 0) / state.cities.length;
    const avgCOL = state.cities.reduce((sum, c) => sum + (c.costOfLivingIndex || 100), 0) / state.cities.length;
    if (avgPrice < 300000 && avgCOL < 95) return 5;
    if (avgPrice < 400000 && avgCOL < 105) return 4;
    if (avgPrice < 500000) return 3;
    return 2;
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  const formatCurrency = (amount) => {
    if (amount >= 999999) return 'Full Exemption';
    return `$${amount.toLocaleString()}`;
  };

  const formatSavings = (amount) => {
    if (amount > 0) return `💰 $${amount.toLocaleString()}`;
    if (amount < 0) return `❌ -$${Math.abs(amount).toLocaleString()}`;
    return `$${amount}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Compare Veteran Benefits Across All States</h1>
          <p className="text-xl text-blue-100">
            Find the best state for your transition with real data on taxes, healthcare, education, and cost of living.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">🎯 Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowCalculator(true)}
              className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 font-semibold"
            >
              📊 Use Personalized Calculator
            </button>
            <Link
              to="/state-benefits/map"
              className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 font-semibold text-center"
            >
              🗺️ View Interactive Map
            </Link>
            <button className="bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 font-semibold">
              🔍 Advanced Filters
            </button>
          </div>
        </div>

        {/* State Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Select States to Compare (Up to 4)</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {selectedStates.map((stateCode, index) => (
              <div key={index}>
                <label className="block text-sm font-medium mb-2">State {index + 1}</label>
                <select
                  value={stateCode}
                  onChange={(e) => handleStateChange(index, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {availableStates.map(code => (
                    <option key={code} value={code}>
                      {statesData[code].name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                {compareData.map((state, idx) => (
                  <th key={idx} className="px-4 py-3 text-center font-semibold">
                    {state?.name || 'N/A'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>

              {/* Overall Rating */}
              <tr className="border-b">
                <td className="px-4 py-3 font-semibold bg-gray-50">Overall Rating</td>
                {compareData.map((state, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">{state?.overallRating}/100</div>
                    <div className="text-yellow-500">{renderStars(Math.round((state?.overallRating || 0) / 20))}</div>
                  </td>
                ))}
              </tr>

              {/* Taxes Section */}
              <tr className="bg-blue-50">
                <td colSpan={compareData.length + 1} className="px-4 py-3 font-bold text-lg">
                  💰 TAXES
                </td>
              </tr>

              <tr className="border-b">
                <td className="px-4 py-3 font-semibold">Tax Rating</td>
                {compareData.map((state, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    <div className="text-yellow-500 text-xl">{renderStars(getTaxRating(state))}</div>
                  </td>
                ))}
              </tr>

              <tr className="border-b bg-gray-50">
                <td className="px-4 py-3">Property Tax (100% Disabled)</td>
                {compareData.map((state, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    <div className="font-semibold text-green-600">
                      {state && state.taxes.propertyTax100Pct >= 999999 ? (
                        <span className="text-green-700">✅ 100% Exempt</span>
                      ) : (
                        formatCurrency(state?.taxes.propertyTax100Pct || 0)
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      {state && state.taxes.propertyTax100Pct >= 999999 && (
                        <span>Pay $0 forever</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b">
                <td className="px-4 py-3">Income Tax on Military Retirement</td>
                {compareData.map((state, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    <div className={`font-semibold ${state?.taxes.incomeTaxRate === 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {state?.taxes.incomeTaxRetirement || 'N/A'}
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b bg-gray-50">
                <td className="px-4 py-3">20-Year Tax Savings</td>
                {compareData.map((state, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    <div className="font-bold text-lg">
                      {formatSavings(state?.taxes.twentyYearSavings || 0)}
                    </div>
                    <div className="text-xs text-gray-600">vs national average</div>
                  </td>
                ))}
              </tr>

              {/* Healthcare Section */}
              <tr className="bg-blue-50">
                <td colSpan={compareData.length + 1} className="px-4 py-3 font-bold text-lg">
                  🏥 HEALTHCARE
                </td>
              </tr>

              <tr className="border-b">
                <td className="px-4 py-3 font-semibold">Healthcare Rating</td>
                {compareData.map((state, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    <div className="text-yellow-500 text-xl">{renderStars(getHealthcareRating(state))}</div>
                  </td>
                ))}
              </tr>

              <tr className="border-b bg-gray-50">
                <td className="px-4 py-3">VA Medical Centers</td>
                {compareData.map((state, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    <div className="font-bold text-blue-600">{state?.healthcare.length || 0} facilities</div>
                  </td>
                ))}
              </tr>

              <tr className="border-b">
                <td className="px-4 py-3">Best Facility</td>
                {compareData.map((state, idx) => {
                  const bestFacility = state?.healthcare.sort((a, b) => (b.qualityRating || 0) - (a.qualityRating || 0))[0];
                  return (
                    <td key={idx} className="px-4 py-3 text-center">
                      <div className="font-semibold text-sm">{bestFacility?.name || 'N/A'}</div>
                      <div className="text-xs text-gray-600">{bestFacility?.phone || ''}</div>
                    </td>
                  );
                })}
              </tr>

              {/* Education Section */}
              <tr className="bg-blue-50">
                <td colSpan={compareData.length + 1} className="px-4 py-3 font-bold text-lg">
                  🎓 EDUCATION
                </td>
              </tr>

              <tr className="border-b">
                <td className="px-4 py-3 font-semibold">Education Rating</td>
                {compareData.map((state, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    <div className="text-yellow-500 text-xl">{renderStars(getEducationRating(state))}</div>
                  </td>
                ))}
              </tr>

              <tr className="border-b bg-gray-50">
                <td className="px-4 py-3">Top Education Program</td>
                {compareData.map((state, idx) => {
                  const topProgram = state?.education.sort((a, b) => (b.fourYearValue || 0) - (a.fourYearValue || 0))[0];
                  return (
                    <td key={idx} className="px-4 py-3 text-center">
                      <div className="font-semibold text-sm">{topProgram?.programName || 'N/A'}</div>
                      <div className="text-xs text-gray-600">{topProgram?.programType || ''}</div>
                      <div className="font-bold text-green-600 mt-1">
                        {topProgram?.fourYearValue ? `$${topProgram.fourYearValue.toLocaleString()}` : 'N/A'}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Housing Section */}
              <tr className="bg-blue-50">
                <td colSpan={compareData.length + 1} className="px-4 py-3 font-bold text-lg">
                  🏘️ HOUSING & COST OF LIVING
                </td>
              </tr>

              <tr className="border-b">
                <td className="px-4 py-3 font-semibold">Housing Rating</td>
                {compareData.map((state, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    <div className="text-yellow-500 text-xl">{renderStars(getHousingRating(state))}</div>
                  </td>
                ))}
              </tr>

              <tr className="border-b bg-gray-50">
                <td className="px-4 py-3">Best City</td>
                {compareData.map((state, idx) => {
                  const bestCity = state?.cities[0];
                  return (
                    <td key={idx} className="px-4 py-3 text-center">
                      <div className="font-semibold">{bestCity?.name || 'N/A'}</div>
                      <div className="text-sm text-gray-600">
                        ${(bestCity?.medianHomePrice || 0).toLocaleString()} median
                      </div>
                      <div className="text-xs text-gray-500">
                        {bestCity?.veteranPopulationPct}% veterans
                      </div>
                    </td>
                  );
                })}
              </tr>

              <tr className="border-b">
                <td className="px-4 py-3">Veteran Population</td>
                {compareData.map((state, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    <div className="font-bold">{(state?.veteranPopulation || 0).toLocaleString()}</div>
                    <div className="text-xs text-gray-600">{state?.veteranPercentage}% of population</div>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-semibold">
              📄 Download Full Comparison PDF
              <div className="text-xs mt-1 text-gray-600">🔒 Sign up free</div>
            </button>
            <button className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 font-semibold">
              ✉️ Email Me This Comparison
              <div className="text-xs mt-1 text-gray-600">🔒 Sign up free</div>
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 font-semibold">
              ⭐ Save to My Favorites
              <div className="text-xs mt-1 text-gray-600">🔒 Sign up free</div>
            </button>
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:underline">
              🔗 Share This Comparison (Copy link - works without account)
            </button>
          </div>
        </div>

        {/* View Detailed State Pages */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">View Detailed State Information</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {compareData.map((state, idx) => state && (
              <Link
                key={idx}
                to={`/state-benefits/${state.code.toLowerCase()}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-center font-semibold"
              >
                View Full {state.name} Details →
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
