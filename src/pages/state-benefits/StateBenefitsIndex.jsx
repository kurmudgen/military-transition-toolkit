import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StateBenefitsComparison from './StateBenefitsComparison';
import PersonalizedCalculator from '../../components/StateBenefits/PersonalizedCalculator';
import MovingCostCalculator from '../../components/StateBenefits/MovingCostCalculator';
import { statesData, stateRankings } from '../../data/stateBenefitsData';

export default function StateBenefitsIndex() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('comparison');

  // Main content component (reused for both authenticated and public views)
  const StateBenefitsContent = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            State Benefits Comparison
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Compare veteran benefits across all 50 states. Find the perfect place for your transition.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">STATES</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">50</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">DATA POINTS</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">500+</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-3 rounded-lg text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">AVG SAVINGS</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$12K/yr</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 rounded-t-lg mb-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap border-b-4 transition-colors ${activeTab === 'comparison' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
            >
              📊 Compare
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap border-b-4 transition-colors ${activeTab === 'calculator' ? 'border-green-600 text-green-600 dark:text-green-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
            >
              🎯 Calculator
            </button>
            <button
              onClick={() => setActiveTab('moving')}
              className={`px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap border-b-4 transition-colors ${activeTab === 'moving' ? 'border-purple-600 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
            >
              🚚 Moving
            </button>
            <button
              onClick={() => setActiveTab('rankings')}
              className={`px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap border-b-4 transition-colors ${activeTab === 'rankings' ? 'border-yellow-600 text-yellow-600 dark:text-yellow-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
            >
              🏆 Rankings
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div>

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div>
            <StateBenefitsComparison />
          </div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div>
            <PersonalizedCalculator />
          </div>
        )}

        {/* Moving Calculator Tab */}
        {activeTab === 'moving' && (
          <div>
            <MovingCostCalculator />
          </div>
        )}

        {/* Rankings Tab */}
        {activeTab === 'rankings' && (
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🏆 State Rankings for Veterans</h2>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Overall Best States for Veterans</h3>
                <div className="space-y-4">
                  {stateRankings.map((state, index) => (
                    <Link
                      key={state.code}
                      to={`/state-benefits/${state.code.toLowerCase()}`}
                      className="block border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">#{index + 1}</div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{state.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{state.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{state.score}/100</div>
                          <div className="text-yellow-500 dark:text-yellow-400">{'⭐'.repeat(Math.round(state.score / 20))}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category Leaders */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">🏅 Category Leaders</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-lg p-4">
                      <h4 className="font-bold text-green-900 dark:text-green-300 mb-2">Best for Tax Savings</h4>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">Texas & Florida</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">No income tax + property tax exemptions</p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-4">
                      <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Best VA Healthcare Access</h4>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">Florida & Texas</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">7-8 VA Medical Centers each</p>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-4">
                      <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Best Education Benefits</h4>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">Texas (Hazlewood Act)</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">150 credit hours free + transferable</p>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                      <h4 className="font-bold text-yellow-900 dark:text-yellow-300 mb-2">Most Affordable</h4>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">North Carolina</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Low cost of living + veteran benefits</p>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-lg p-4">
                      <h4 className="font-bold text-red-900 dark:text-red-300 mb-2">Largest Veteran Population</h4>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">California (1.45M)</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">But expensive with higher taxes</p>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-700 rounded-lg p-4">
                      <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Best Military Connection</h4>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">Virginia & NC</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Multiple bases + strong vet community</p>
                    </div>
                  </div>
                </div>

                {/* All States Quick View */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">📍 View Detailed State Information</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {Object.keys(statesData).map(code => (
                      <Link
                        key={code}
                        to={`/state-benefits/${code.toLowerCase()}`}
                        className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 text-center font-semibold"
                      >
                        {statesData[code].name} →
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Use same public navigation for EVERYONE (logged in or out)
  // This avoids Layout.jsx issues with dark mode and content visibility
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

              {/* Show Dashboard or Auth buttons based on login */}
              {user ? (
                <Link
                  to="/app"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Dashboard →
                </Link>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {user ? (
                <Link
                  to="/app"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  Dashboard →
                </Link>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Use dark mode wrapper for content */}
      <div className="dark">
        <StateBenefitsContent />
      </div>
    </div>
  );
}
