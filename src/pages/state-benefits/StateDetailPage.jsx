import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/Layout';
import { statesData } from '../../data/stateBenefitsData';

export default function StateDetailPage() {
  const { user } = useAuth();
  const { stateCode } = useParams();
  const state = statesData[stateCode?.toUpperCase()];

  // Debug logging
  console.log('StateDetailPage - stateCode:', stateCode);
  console.log('StateDetailPage - statesData loaded:', !!statesData);
  console.log('StateDetailPage - state found:', !!state);
  console.log('StateDetailPage - available states:', Object.keys(statesData).length);

  // "State Not Found" content
  const NotFoundContent = () => (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">State Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">The state you're looking for doesn't exist in our database yet.</p>
      <Link
        to="/state-benefits"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
      >
        ← Back to Comparison
      </Link>
    </div>
  );

  if (!state) {
    // If user is logged in, use Layout
    if (user) {
      return (
        <Layout>
          <NotFoundContent />
        </Layout>
      );
    }

    // If not logged in, use public navigation
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
                Military Transition Toolkit
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/state-benefits" className="text-blue-400 font-semibold">State Benefits</Link>
                <Link to="/login" className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-white rounded-lg transition-colors">Log In</Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">Sign Up</Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="dark">
          <NotFoundContent />
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    if (amount >= 999999) return 'Full Exemption';
    return `$${amount.toLocaleString()}`;
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.min(5, Math.round(rating)));
  };

  // Main state detail content component (reused for both authenticated and public views)
  const StateDetailContent = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            to="/state-benefits"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 inline-block font-semibold"
          >
            ← Back to Comparison
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {state.name} Veteran Benefits - Complete Guide 2025
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-2xl">{renderStars(Math.round(state.overallRating / 20))}</div>
            <div className="text-xl text-gray-700 dark:text-gray-300">
              Overall Rating: <span className="font-bold text-blue-600 dark:text-blue-400">{state.overallRating}/100</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">📊 Quick Stats at a Glance</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-600 mb-1">Veteran Population</p>
              <p className="text-2xl font-bold text-blue-600">{state.veteranPopulation.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{state.veteranPercentage}% of state</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Overall MTT Rating</p>
              <p className="text-2xl font-bold text-blue-600">{state.overallRating}/100</p>
              <p className="text-sm text-gray-500">{renderStars(Math.round(state.overallRating / 20))}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">20-Year Tax Savings</p>
              <p className="text-2xl font-bold text-green-600">
                {state.taxes.twentyYearSavings > 0 ? `$${state.taxes.twentyYearSavings.toLocaleString()}` : 'N/A'}
              </p>
              <p className="text-sm text-gray-500">vs national average</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">VA Medical Centers</p>
              <p className="text-2xl font-bold text-blue-600">{state.healthcare.length}</p>
              <p className="text-sm text-gray-500">facilities statewide</p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">📋 Table of Contents</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <a href="#taxes" className="text-blue-600 hover:underline">💰 Tax Benefits & Financial Savings</a>
            <a href="#healthcare" className="text-blue-600 hover:underline">🏥 VA Healthcare Facilities</a>
            <a href="#education" className="text-blue-600 hover:underline">🎓 Education Benefits</a>
            <a href="#cities" className="text-blue-600 hover:underline">🏘️ Best Cities for Veterans</a>
            <a href="#cost-of-living" className="text-blue-600 hover:underline">💵 Cost of Living Analysis</a>
            <a href="#faq" className="text-blue-600 hover:underline">❓ Frequently Asked Questions</a>
          </div>
        </div>

        {/* Taxes Section */}
        <div id="taxes" className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-6">💰 Tax Benefits & Financial Savings</h2>

          <div className="space-y-6">
            {/* Property Tax */}
            <div>
              <h3 className="text-2xl font-bold mb-3">Property Tax Exemptions</h3>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-2">Disability Rating Breakdown:</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">0-9% disabled:</span> {formatCurrency(state.taxes.propertyTax0Pct)} exemption</p>
                  <p><span className="font-semibold">10-29% disabled:</span> {formatCurrency(state.taxes.propertyTax10Pct)} exemption</p>
                  <p><span className="font-semibold">30-49% disabled:</span> {formatCurrency(state.taxes.propertyTax30Pct)} exemption</p>
                  <p><span className="font-semibold">50-69% disabled:</span> {formatCurrency(state.taxes.propertyTax50Pct)} exemption</p>
                  <p><span className="font-semibold">70-99% disabled:</span> {formatCurrency(state.taxes.propertyTax70Pct)} exemption</p>
                  <p className="text-lg font-bold text-green-600">
                    <span>100% disabled:</span> {state.taxes.propertyTax100Pct >= 999999 ? '✅ FULL EXEMPTION (Pay $0 forever!)' : formatCurrency(state.taxes.propertyTax100Pct)}
                  </p>
                </div>
              </div>

              {state.taxes.propertyTax100Pct >= 999999 && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                  <h4 className="font-bold mb-2">Example Savings (100% Disabled):</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold">$300,000 home:</p>
                      <p>Annual savings: ${(300000 * (state.taxes.propertyTaxRate / 100)).toLocaleString()}</p>
                      <p className="text-green-600 font-bold">20-year savings: ${(300000 * (state.taxes.propertyTaxRate / 100) * 20).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-semibold">$400,000 home:</p>
                      <p>Annual savings: ${(400000 * (state.taxes.propertyTaxRate / 100)).toLocaleString()}</p>
                      <p className="text-green-600 font-bold">20-year savings: ${(400000 * (state.taxes.propertyTaxRate / 100) * 20).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-semibold">$500,000 home:</p>
                      <p>Annual savings: ${(500000 * (state.taxes.propertyTaxRate / 100)).toLocaleString()}</p>
                      <p className="text-green-600 font-bold">20-year savings: ${(500000 * (state.taxes.propertyTaxRate / 100) * 20).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Income Tax */}
            <div>
              <h3 className="text-2xl font-bold mb-3">Income Tax Treatment for Veterans</h3>

              <div className={`${state.taxes.incomeTaxRate === 0 ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-200'} border-2 rounded-lg p-4`}>
                <h4 className="font-bold text-lg mb-2">
                  {state.taxes.incomeTaxRate === 0 ? '✅ NO STATE INCOME TAX' : 'Income Tax Status'}
                </h4>
                <p className="mb-2">{state.taxes.incomeTaxRetirement}</p>

                {state.taxes.incomeTaxRate === 0 ? (
                  <div className="mt-3">
                    <p className="font-semibold mb-2">What this means for you:</p>
                    <ul className="space-y-1 text-sm">
                      <li>✅ Military retirement pay: Keep 100%</li>
                      <li>✅ VA disability compensation: Keep 100% (federally tax-free too)</li>
                      <li>✅ TSP/401(k) withdrawals: No state tax</li>
                      <li>✅ Social Security: No state tax</li>
                      <li>✅ Investment income: No state tax</li>
                    </ul>

                    <div className="mt-4 p-3 bg-white rounded">
                      <p className="font-semibold mb-2">Annual Savings Examples:</p>
                      <p className="text-sm">$30,000 military pension: Save ~$1,500/year (vs 5% state tax)</p>
                      <p className="text-sm">$50,000 military pension: Save ~$2,500/year (vs 5% state tax)</p>
                      <p className="text-green-600 font-bold text-sm mt-2">Over 20 years: Save $30,000-$50,000+</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <p className="text-sm">State income tax rate: {state.taxes.incomeTaxRate}%</p>
                    {state.taxes.retirementExemptAmount >= 999999 && (
                      <p className="text-green-600 font-semibold">Military retirement is fully exempt!</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Registration */}
            <div>
              <h3 className="text-2xl font-bold mb-3">Vehicle Registration</h3>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                <p>Standard registration fee: ${state.taxes.vehicleRegistrationFee}/year</p>
                <p className="text-green-600 font-semibold">
                  Disabled veteran discount: ${state.taxes.vehicleVeteranDiscount}/year savings
                </p>
                {state.taxes.vehicleVeteranDiscount >= 40 && (
                  <p className="text-sm mt-2">
                    DV plates often include free parking at metered spaces and other benefits!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Healthcare Section */}
        <div id="healthcare" className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-6">🏥 VA Healthcare Facilities</h2>

          <p className="text-gray-600 mb-6">
            {state.name} has {state.healthcare.length} VA Medical Center{state.healthcare.length > 1 ? 's' : ''} providing comprehensive healthcare services to veterans statewide.
          </p>

          <div className="space-y-6">
            {state.healthcare.map((facility, index) => (
              <div key={index} className="border-2 border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{facility.name}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold">{facility.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quality Rating</p>
                    <p className="font-semibold">
                      {facility.qualityRating}/5.0 {renderStars(Math.round(facility.qualityRating))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-semibold">{facility.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-blue-600">
                      <a href={`tel:${facility.phone}`}>{facility.phone}</a>
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1">Specialties</p>
                  <p className="text-sm">{facility.specialties}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div id="education" className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-6">🎓 Education Benefits</h2>

          <div className="space-y-6">
            {state.education.map((program, index) => (
              <div key={index} className="border-2 border-purple-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-2">{program.programName}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Program Type</p>
                    <p className="font-semibold">{program.programType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">4-Year Value</p>
                    <p className="font-semibold text-green-600">
                      {program.fourYearValue > 0 ? `$${program.fourYearValue.toLocaleString()}` : 'Varies'}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1">Eligibility</p>
                  <p className="text-sm">{program.eligibility}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Cities Section */}
        <div id="cities" className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-6">🏘️ Best Cities for Veterans in {state.name}</h2>

          <div className="space-y-6">
            {state.cities.map((city, index) => (
              <div key={index} className="border-2 border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-green-900">
                    #{city.rank}. {city.name}
                  </h3>
                  <div className="text-yellow-500 text-xl">
                    {renderStars(5 - Math.floor(index / 2))} {/* Rough rating based on rank */}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Median Home Price</p>
                    <p className="font-semibold text-lg">${city.medianHomePrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Veteran Population</p>
                    <p className="font-semibold text-lg">{city.veteranPopulationPct}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cost of Living Index</p>
                    <p className="font-semibold text-lg">{city.costOfLivingIndex}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">VA Facility Distance</p>
                    <p className="font-semibold">
                      {city.vaFacilityDistance === 0 ? 'VA Medical Center on-site' : `${city.vaFacilityDistance} miles`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Military Base Nearby</p>
                    <p className="font-semibold">{city.militaryBaseNearby ? '✅ Yes' : '❌ No'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Unemployment Rate</p>
                    <p className="font-semibold">{city.unemployment}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Crime Rate</p>
                    <p className="font-semibold">{city.crimeRate}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Climate</p>
                    <p className="text-sm">{city.climateSummary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Major Employers</p>
                    <p className="text-sm">{city.majorEmployers}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-semibold text-green-700 mb-1">Pros:</p>
                    <p className="text-sm">{city.pros}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-700 mb-1">Cons:</p>
                    <p className="text-sm">{city.cons}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost of Living */}
        <div id="cost-of-living" className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-6">💵 Cost of Living Analysis</h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">City</th>
                  <th className="px-4 py-2 text-right">Median Home Price</th>
                  <th className="px-4 py-2 text-right">COL Index</th>
                  <th className="px-4 py-2 text-right">2BR Rent</th>
                </tr>
              </thead>
              <tbody>
                {state.cities.map((city, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">{city.name}</td>
                    <td className="px-4 py-2 text-right">${city.medianHomePrice.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">{city.costOfLivingIndex}</td>
                    <td className="px-4 py-2 text-right">${city.rent2br?.toLocaleString() || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-6">❓ Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">Q: Is VA disability compensation taxed in {state.name}?</h3>
              <p className="text-gray-700">A: No. VA disability is tax-free at both federal AND state level (all states).</p>
            </div>

            {state.taxes.incomeTaxRate === 0 && (
              <div>
                <h3 className="font-bold text-lg mb-2">Q: Does {state.name} tax military retirement pay?</h3>
                <p className="text-gray-700">A: No. {state.name} has no state income tax, so military retirement pay is not taxed.</p>
              </div>
            )}

            {state.taxes.propertyTax100Pct >= 999999 && (
              <div>
                <h3 className="font-bold text-lg mb-2">Q: Do I really pay ZERO property tax if I'm 100% disabled?</h3>
                <p className="text-gray-700">A: Yes! If you're 100% VA disability rating, you pay $0 property tax in {state.name} on your primary residence.</p>
              </div>
            )}

            <div>
              <h3 className="font-bold text-lg mb-2">Q: How many VA medical facilities are in {state.name}?</h3>
              <p className="text-gray-700">A: {state.name} has {state.healthcare.length} VA Medical Center{state.healthcare.length > 1 ? 's' : ''} providing full-service healthcare.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/state-benefits"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-center font-semibold"
            >
              Compare {state.name} with Other States
            </Link>
            <button className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 font-semibold">
              Calculate My Savings in {state.name}
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 font-semibold">
              📄 Download {state.name} Benefits Guide PDF
              <span className="text-xs block mt-1 text-gray-600">🔒 Sign up free</span>
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-semibold">
              ⭐ Save {state.name} to Favorites
              <span className="text-xs block mt-1 text-gray-600">🔒 Sign up free</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  // If user is logged in, use Layout.jsx for consistent navigation
  if (user) {
    return (
      <Layout>
        <StateDetailContent />
      </Layout>
    );
  }

  // If not logged in, use public marketing navigation
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              Military Transition Toolkit
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <Link to="/resources" className="text-slate-300 hover:text-white transition-colors">
                Resources
              </Link>
              <Link to="/blog" className="text-slate-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/state-benefits" className="text-blue-400 font-semibold">
                State Benefits
              </Link>
              <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">
                FAQ
              </Link>

              {/* Auth buttons */}
              <Link
                to="/login"
                className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-white rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-white text-sm rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Use dark mode wrapper for public view */}
      <div className="dark">
        <StateDetailContent />
      </div>
    </div>
  );
}
