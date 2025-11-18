import { useState } from 'react';
import { Link } from 'react-router-dom';
import { statesData } from '../../data/stateBenefitsData';

export default function StateBenefitsComparison() {
  const [selectedStates, setSelectedStates] = useState(['FL', 'TX', 'CA', 'VA']);
  const [expandedSections, setExpandedSections] = useState({
    taxes: true,
    healthcare: false,
    education: false,
    housing: false
  });

  const availableStates = Object.keys(statesData);

  const handleStateChange = (index, newState) => {
    const newSelected = [...selectedStates];
    newSelected[index] = newState;
    setSelectedStates(newSelected);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const compareData = selectedStates.map(code => statesData[code]);

  const formatCurrency = (amount) => {
    if (amount >= 999999) return 'Full Exemption';
    return `$${amount.toLocaleString()}`;
  };

  const formatSavings = (amount) => {
    if (amount > 0) return `+$${amount.toLocaleString()}`;
    if (amount < 0) return `-$${Math.abs(amount).toLocaleString()}`;
    return `$${amount}`;
  };

  // Safety check for data
  if (!statesData || availableStates.length === 0) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-900 dark:text-red-200 mb-4">⚠️ Data Loading Error</h2>
        <p className="text-red-700 dark:text-red-300 mb-4">
          State benefits data failed to load. This might be a temporary issue.
        </p>
        <p className="text-sm text-red-600 dark:text-red-400">
          Available states: {availableStates.length} | Data loaded: {statesData ? 'Yes' : 'No'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* State Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Select States to Compare (Up to 4)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedStates.map((stateCode, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State {index + 1}
              </label>
              <select
                value={stateCode}
                onChange={(e) => handleStateChange(index, e.target.value)}
                className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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

      {/* Overall Rating - Always Visible */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          Overall Rating
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {compareData.map((state, idx) => state && (
            <div key={idx} className="text-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {state.name}
              </div>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {state.overallRating}/100
              </div>
              <div className="text-2xl">
                {'⭐'.repeat(Math.round(state.overallRating / 20))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TAXES Section - Collapsible */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('taxes')}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">TAX BENEFITS</span>
          </div>
          <span className="text-2xl text-gray-600 dark:text-gray-400">
            {expandedSections.taxes ? '−' : '+'}
          </span>
        </button>

        {expandedSections.taxes && (
          <div className="mt-4 space-y-4">
            {/* Property Tax */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Property Tax (100% Disabled)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {compareData.map((state, idx) => state && (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border-2 ${
                      state.taxes.propertyTax100Pct >= 999999
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                        : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {state.taxes.propertyTax100Pct >= 999999 && (
                        <span className="text-green-600 dark:text-green-400">✓</span>
                      )}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {state.taxes.propertyTax100Pct >= 999999 ? '100% Exempt' : formatCurrency(state.taxes.propertyTax100Pct)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {state.taxes.propertyTax100Pct >= 999999 ? 'Pay $0 forever' : 'Partial exemption'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Income Tax */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Income Tax on Military Retirement
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {compareData.map((state, idx) => state && (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border-2 ${
                      state.taxes.incomeTaxRate === 0
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                        : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                      {state.taxes.incomeTaxRetirement || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {state.taxes.incomeTaxRate === 0 ? 'No state income tax' : 'Partial exemption'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 20-Year Savings */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800 p-4">
              <div className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-3">
                💰 20-Year Tax Savings
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {compareData.map((state, idx) => state && (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                      {formatSavings(state.taxes.twentyYearSavings)}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      vs national average
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* HEALTHCARE Section - Collapsible */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('healthcare')}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏥</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">HEALTHCARE</span>
          </div>
          <span className="text-2xl text-gray-600 dark:text-gray-400">
            {expandedSections.healthcare ? '−' : '+'}
          </span>
        </button>

        {expandedSections.healthcare && (
          <div className="mt-4 space-y-4">
            {/* VA Medical Centers */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                VA Medical Centers
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {compareData.map((state, idx) => state && (
                  <div key={idx} className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {state.healthcare.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">facilities</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Facility */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Top-Rated Facility
              </div>
              <div className="space-y-3">
                {compareData.map((state, idx) => {
                  if (!state) return null;
                  const bestFacility = state.healthcare.sort((a, b) => (b.qualityRating || 0) - (a.qualityRating || 0))[0];
                  return (
                    <div key={idx} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">
                        {state.name}: {bestFacility?.name || 'N/A'}
                      </div>
                      {bestFacility && (
                        <>
                          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                            ☎ {bestFacility.phone}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {bestFacility.city}, {state.code}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* EDUCATION Section - Collapsible */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('education')}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎓</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">EDUCATION</span>
          </div>
          <span className="text-2xl text-gray-600 dark:text-gray-400">
            {expandedSections.education ? '−' : '+'}
          </span>
        </button>

        {expandedSections.education && (
          <div className="mt-4 space-y-4">
            {/* Top Education Program */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Top Education Program
              </div>
              <div className="space-y-3">
                {compareData.map((state, idx) => {
                  if (!state) return null;
                  const topProgram = state.education.sort((a, b) => (b.fourYearValue || 0) - (a.fourYearValue || 0))[0];
                  return (
                    <div key={idx} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">
                        {state.name}: {topProgram?.programName || 'N/A'}
                      </div>
                      {topProgram && (
                        <>
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            {topProgram.description}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                              ${topProgram.fourYearValue.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">4-year value</span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* HOUSING Section - Collapsible */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('housing')}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏘️</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">HOUSING & COST OF LIVING</span>
          </div>
          <span className="text-2xl text-gray-600 dark:text-gray-400">
            {expandedSections.housing ? '−' : '+'}
          </span>
        </button>

        {expandedSections.housing && (
          <div className="mt-4 space-y-4">
            {/* Best City */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Best City for Veterans
              </div>
              <div className="space-y-3">
                {compareData.map((state, idx) => {
                  if (!state || !state.cities.length) return null;
                  const bestCity = state.cities[0];
                  return (
                    <div key={idx} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="font-semibold text-gray-900 dark:text-white mb-2">
                        {state.name}: {bestCity.name}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-gray-600 dark:text-gray-400">Median Home</div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            ${bestCity.medianHomePrice / 1000}K
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 dark:text-gray-400">Veteran Pop</div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {bestCity.veteranPopulationPct}%
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Veteran Population */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                State Veteran Population
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {compareData.map((state, idx) => state && (
                  <div key={idx} className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {(state.veteranPopulation / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {state.veteranPercentage}% of population
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Detail Links */}
      <div className="mt-8 space-y-4">
        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          View Full State Details
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {compareData.map((state, idx) => state && (
            <Link
              key={idx}
              to={`/state-benefits/${state.code.toLowerCase()}`}
              className="block p-4 bg-blue-600 dark:bg-blue-700 text-white text-center rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              View {state.name} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
