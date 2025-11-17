import { useState } from 'react';
import { statesData, calculateSavings } from '../../data/stateBenefitsData';

export default function PersonalizedCalculator() {
  const [profile, setProfile] = useState({
    disabilityRating: 0,
    hasRetirement: false,
    monthlyRetirement: 0,
    currentState: 'CA',
    planningToBuy: false,
    homeValue: 400000,
    currentRent: 2000,
    married: false,
    kidsInCollege: 0,
    spouseNeedsWork: false,
    priorities: {
      taxSavings: true,
      education: false,
      healthcare: false,
      lowCost: true,
      warmClimate: false,
      fourSeasons: false,
      jobMarket: false,
      vetCommunity: false,
      nearBase: false,
      lowCrime: false,
      goodSchools: false,
      outdoors: false,
      majorCity: false,
      ruralSuburban: false,
    },
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePriorityChange = (priority) => {
    setProfile(prev => ({
      ...prev,
      priorities: {
        ...prev.priorities,
        [priority]: !prev.priorities[priority],
      },
    }));
  };

  const calculateRecommendations = () => {
    const allStates = Object.keys(statesData);
    const scoredStates = allStates.map(stateCode => {
      const state = statesData[stateCode];
      let score = 0;
      let reasons = [];

      // Calculate annual savings
      let annualSavings = 0;

      // Property tax savings
      if (profile.planningToBuy && profile.disabilityRating >= 100 && state.taxes.propertyTax100Pct >= 999999) {
        const propertyTaxSaved = profile.homeValue * (state.taxes.propertyTaxRate / 100);
        annualSavings += propertyTaxSaved;
        score += 20;
        reasons.push(`Property tax savings: $${Math.round(propertyTaxSaved).toLocaleString()}/year (100% exemption)`);
      } else if (profile.planningToBuy && profile.disabilityRating >= 70) {
        const exemption = state.taxes.propertyTax70Pct || 0;
        const propertyTaxSaved = exemption * (state.taxes.propertyTaxRate / 100);
        annualSavings += propertyTaxSaved;
        score += 10;
        reasons.push(`Property tax savings: $${Math.round(propertyTaxSaved).toLocaleString()}/year`);
      }

      // Income tax savings
      if (profile.hasRetirement && state.taxes.incomeTaxRate === 0) {
        const yearlyRetirement = profile.monthlyRetirement * 12;
        const incomeTaxSaved = yearlyRetirement * 0.05; // vs 5% state tax
        annualSavings += incomeTaxSaved;
        score += 15;
        reasons.push(`Income tax savings: $${Math.round(incomeTaxSaved).toLocaleString()}/year (no state income tax)`);
      } else if (profile.hasRetirement && state.taxes.retirementExemptAmount >= 999999) {
        const yearlyRetirement = profile.monthlyRetirement * 12;
        const incomeTaxSaved = yearlyRetirement * 0.04; // partial vs full state tax
        annualSavings += incomeTaxSaved;
        score += 10;
        reasons.push(`Income tax savings: $${Math.round(incomeTaxSaved).toLocaleString()}/year (retirement fully exempt)`);
      }

      // Cost of living
      if (profile.priorities.lowCost) {
        const avgCityIndex = state.cities.reduce((sum, c) => sum + (c.costOfLivingIndex || 100), 0) / state.cities.length;
        if (avgCityIndex < 95) {
          score += 15;
          reasons.push(`Cost of living ${100 - avgCityIndex}% below national average`);
        } else if (avgCityIndex > 120) {
          score -= 10;
        }
      }

      // Education benefits
      if (profile.kidsInCollege > 0 || profile.priorities.education) {
        const topEducationValue = Math.max(...state.education.map(e => e.fourYearValue || 0));
        if (topEducationValue >= 30000) {
          score += 15;
          annualSavings += (topEducationValue / 4) * profile.kidsInCollege;
          reasons.push(`Education value: $${topEducationValue.toLocaleString()} (4 years) per child`);
        }
      }

      // Healthcare
      if (profile.priorities.healthcare) {
        const facilityCount = state.healthcare.length;
        if (facilityCount >= 5) {
          score += 10;
          reasons.push(`${facilityCount} VA Medical Centers statewide`);
        }
      }

      // Veteran community
      if (profile.priorities.vetCommunity) {
        if (state.veteranPercentage >= 6.0) {
          score += 10;
          reasons.push(`Large veteran community: ${state.veteranPercentage}% of population`);
        }
      }

      // Military base proximity
      if (profile.priorities.nearBase) {
        const citiesNearBase = state.cities.filter(c => c.militaryBaseNearby).length;
        if (citiesNearBase > 0) {
          score += 10;
          reasons.push(`${citiesNearBase} cities near military bases`);
        }
      }

      // Climate preferences
      if (profile.priorities.warmClimate) {
        if (['FL', 'AZ', 'TX'].includes(stateCode)) {
          score += 8;
          reasons.push('Year-round warm climate');
        }
      }

      if (profile.priorities.fourSeasons) {
        if (['VA', 'NC'].includes(stateCode)) {
          score += 8;
          reasons.push('Four distinct seasons');
        }
      }

      // Job market
      if (profile.priorities.jobMarket || profile.spouseNeedsWork) {
        const avgUnemployment = state.cities.reduce((sum, c) => sum + (c.unemployment || 4.0), 0) / state.cities.length;
        if (avgUnemployment < 3.5) {
          score += 10;
          reasons.push(`Strong job market: ${avgUnemployment.toFixed(1)}% unemployment`);
        }
      }

      return {
        stateCode,
        state,
        score,
        annualSavings,
        reasons,
      };
    });

    // Sort by score
    scoredStates.sort((a, b) => b.score - a.score);

    // Calculate vs current state
    const currentStateData = scoredStates.find(s => s.stateCode === profile.currentState);
    const currentStateSavings = currentStateData?.annualSavings || 0;

    scoredStates.forEach(s => {
      s.savingsVsCurrent = s.annualSavings - currentStateSavings;
    });

    setResults(scoredStates.slice(0, 10)); // Top 10
    setShowResults(true);
  };

  const formatCurrency = (amount) => {
    return `$${Math.round(amount).toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">🎯 Personalized State Recommendations</h2>
        <p className="text-gray-600 mb-6">
          Tell us about yourself to see which states save you the most money:
        </p>

        {!showResults ? (
          <div className="space-y-6">
            {/* Veteran Profile */}
            <div>
              <h3 className="text-xl font-bold mb-3">Veteran Profile</h3>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Disability Rating</label>
                  <select
                    value={profile.disabilityRating}
                    onChange={(e) => handleProfileChange('disabilityRating', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="0">0%</option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                    <option value="40">40%</option>
                    <option value="50">50%</option>
                    <option value="60">60%</option>
                    <option value="70">70%</option>
                    <option value="80">80%</option>
                    <option value="90">90%</option>
                    <option value="100">100%</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profile.hasRetirement}
                      onChange={(e) => handleProfileChange('hasRetirement', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">Military Retirement</span>
                  </label>
                  {profile.hasRetirement && (
                    <div className="mt-2">
                      <label className="block text-sm mb-1">Monthly Retirement Pay</label>
                      <input
                        type="number"
                        value={profile.monthlyRetirement}
                        onChange={(e) => handleProfileChange('monthlyRetirement', parseInt(e.target.value))}
                        placeholder="e.g., 2400"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-medium mb-2">Current State</label>
                  <select
                    value={profile.currentState}
                    onChange={(e) => handleProfileChange('currentState', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.keys(statesData).map(code => (
                      <option key={code} value={code}>{statesData[code].name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Housing Plans */}
            <div>
              <h3 className="text-xl font-bold mb-3">Housing Plans</h3>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profile.planningToBuy}
                      onChange={(e) => handleProfileChange('planningToBuy', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">Planning to buy home</span>
                  </label>
                  {profile.planningToBuy && (
                    <div className="mt-2">
                      <label className="block text-sm mb-1">Expected Home Value</label>
                      <input
                        type="number"
                        value={profile.homeValue}
                        onChange={(e) => handleProfileChange('homeValue', parseInt(e.target.value))}
                        placeholder="e.g., 400000"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-medium mb-2">Current rent/mortgage ($/month)</label>
                  <input
                    type="number"
                    value={profile.currentRent}
                    onChange={(e) => handleProfileChange('currentRent', parseInt(e.target.value))}
                    placeholder="e.g., 2000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Family */}
            <div>
              <h3 className="text-xl font-bold mb-3">Family</h3>

              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={profile.married}
                    onChange={(e) => handleProfileChange('married', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Married</span>
                </label>

                <div>
                  <label className="block font-medium mb-2">Kids in college (or will be)</label>
                  <select
                    value={profile.kidsInCollege}
                    onChange={(e) => handleProfileChange('kidsInCollege', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={profile.spouseNeedsWork}
                    onChange={(e) => handleProfileChange('spouseNeedsWork', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Spouse needs employment</span>
                </label>
              </div>
            </div>

            {/* Priorities */}
            <div>
              <h3 className="text-xl font-bold mb-3">Priorities (Select all that apply)</h3>

              <div className="grid md:grid-cols-2 gap-3">
                {Object.keys(profile.priorities).map(priority => (
                  <label key={priority} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profile.priorities[priority]}
                      onChange={() => handlePriorityChange(priority)}
                      className="w-4 h-4"
                    />
                    <span>{priority.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="pt-4">
              <button
                onClick={calculateRecommendations}
                className="w-full bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 font-bold text-lg"
              >
                Calculate My Best States
              </button>
              <p className="text-center text-sm text-gray-600 mt-2">
                Works without account - Sign up free to save results
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">Your Profile:</h3>
              <div className="text-sm space-y-1">
                <p>{profile.disabilityRating}% Disabled Veteran</p>
                {profile.hasRetirement && <p>${profile.monthlyRetirement}/month Military Retirement (${profile.monthlyRetirement * 12}/year)</p>}
                {profile.planningToBuy && <p>Planning to buy ${profile.homeValue.toLocaleString()} home</p>}
                {profile.kidsInCollege > 0 && <p>{profile.kidsInCollege} kids in college</p>}
                <p>Current state: {statesData[profile.currentState].name}</p>
              </div>
            </div>

            {/* Top Results */}
            {results && results.slice(0, 3).map((result, index) => (
              <div key={result.stateCode} className="border-2 border-gray-300 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {index === 0 && '🥇 '}
                      {index === 1 && '🥈 '}
                      {index === 2 && '🥉 '}
                      #{index + 1} RECOMMENDED: {result.state.name}
                    </h3>
                    <p className="text-gray-600">Overall Score: {result.score}/100 {'⭐'.repeat(Math.min(5, Math.round(result.score / 20)))}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-lg mb-2">💰 YOUR FINANCIAL IMPACT:</h4>
                    <p className="text-2xl font-bold text-green-600">
                      Annual Savings vs {statesData[profile.currentState].name}: {formatCurrency(result.savingsVsCurrent)}
                    </p>
                  </div>

                  {result.reasons.length > 0 && (
                    <div>
                      <h4 className="font-bold mb-2">Why {result.state.name} ranked #{index + 1} for you:</h4>
                      <ul className="space-y-1">
                        {result.reasons.map((reason, idx) => (
                          <li key={idx} className="text-sm">✅ {reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-4 pt-4 text-sm">
                    <div>
                      <p className="font-semibold">5-Year Savings:</p>
                      <p className="text-green-600 font-bold">{formatCurrency(result.savingsVsCurrent * 5)}</p>
                    </div>
                    <div>
                      <p className="font-semibold">10-Year Savings:</p>
                      <p className="text-green-600 font-bold">{formatCurrency(result.savingsVsCurrent * 10)}</p>
                    </div>
                    <div>
                      <p className="font-semibold">20-Year Savings:</p>
                      <p className="text-green-600 font-bold">{formatCurrency(result.savingsVsCurrent * 20)}</p>
                    </div>
                  </div>

                  {result.state.cities.length > 0 && (
                    <div>
                      <h4 className="font-bold mb-2">Best {result.state.name} Cities for Your Profile:</h4>
                      <div className="space-y-1 text-sm">
                        {result.state.cities.slice(0, 3).map((city, idx) => (
                          <p key={idx}>
                            • <span className="font-semibold">{city.name}</span> - ${city.medianHomePrice.toLocaleString()} median, {city.veteranPopulationPct}% veterans
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                      See Full {result.state.name} Details
                    </button>
                    <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 text-sm">
                      Compare vs #{index === 0 ? 2 : 1}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* All Results */}
            <div>
              <h3 className="text-xl font-bold mb-4">Complete 50-State Ranking for Your Profile:</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Rank</th>
                      <th className="px-4 py-2 text-left">State</th>
                      <th className="px-4 py-2 text-right">Score</th>
                      <th className="px-4 py-2 text-right">Annual Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results && results.map((result, index) => (
                      <tr key={result.stateCode} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2 font-semibold">{result.state.name}</td>
                        <td className="px-4 py-2 text-right">{result.score}</td>
                        <td className="px-4 py-2 text-right font-bold text-green-600">
                          {formatCurrency(result.savingsVsCurrent)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-semibold">
                📄 Download Full Report PDF
                <span className="text-xs ml-2 text-gray-600">🔒 Sign up free</span>
              </button>
              <button className="w-full border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 font-semibold">
                ✉️ Email Me These Results
                <span className="text-xs ml-2 text-gray-600">🔒 Sign up free</span>
              </button>
              <button className="w-full border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 font-semibold">
                💾 Save and Track Over Time
                <span className="text-xs ml-2 text-gray-600">🔒 Sign up free</span>
              </button>
              <button
                onClick={() => setShowResults(false)}
                className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-semibold"
              >
                ← Start Over
              </button>
            </div>

            {/* CTA for Account */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Create a free account to:</h3>
              <ul className="text-left inline-block space-y-1 mb-4">
                <li>✅ Save these results and revisit anytime</li>
                <li>✅ Track changes as laws update</li>
                <li>✅ Export detailed PDF reports</li>
                <li>✅ Compare different scenarios</li>
                <li>✅ Access VA Claims Builder</li>
                <li>✅ Use all MTT tools</li>
              </ul>
              <div className="space-x-3">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-bold">
                  Create Free Account - 30 Seconds
                </button>
                <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 font-bold">
                  Log In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
