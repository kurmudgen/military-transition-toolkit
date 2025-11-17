import { useState } from 'react';
import { Link } from 'react-router-dom';
import StateBenefitsComparison from './StateBenefitsComparison';
import PersonalizedCalculator from '../../components/StateBenefits/PersonalizedCalculator';
import MovingCostCalculator from '../../components/StateBenefits/MovingCostCalculator';
import { statesData, stateRankings } from '../../data/stateBenefitsData';

export default function StateBenefitsIndex() {
  const [activeTab, setActiveTab] = useState('comparison');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">State Benefits Comparison Tool</h1>
          <p className="text-2xl text-blue-100 mb-6">
            The most comprehensive veteran state benefits comparison platform. Find the perfect state for your transition.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
              <p className="text-sm text-blue-100">STATES ANALYZED</p>
              <p className="text-3xl font-bold">50</p>
            </div>
            <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
              <p className="text-sm text-blue-100">DATA POINTS</p>
              <p className="text-3xl font-bold">500+</p>
            </div>
            <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
              <p className="text-sm text-blue-100">AVG SAVINGS FOUND</p>
              <p className="text-3xl font-bold">$12K/yr</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b-2 border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-6 py-4 font-semibold border-b-4 ${activeTab === 'comparison' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              📊 Side-by-Side Comparison
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-4 font-semibold border-b-4 ${activeTab === 'calculator' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              🎯 Personalized Calculator
            </button>
            <button
              onClick={() => setActiveTab('moving')}
              className={`px-6 py-4 font-semibold border-b-4 ${activeTab === 'moving' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              🚚 Moving Cost Calculator
            </button>
            <button
              onClick={() => setActiveTab('rankings')}
              className={`px-6 py-4 font-semibold border-b-4 ${activeTab === 'rankings' ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              🏆 State Rankings
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">

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
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-6">🏆 State Rankings for Veterans</h2>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Overall Best States for Veterans</h3>
                <div className="space-y-4">
                  {stateRankings.map((state, index) => (
                    <Link
                      key={state.code}
                      to={`/state-benefits/${state.code.toLowerCase()}`}
                      className="block border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-lg transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl font-bold text-blue-600">#{index + 1}</div>
                          <div>
                            <h4 className="text-xl font-bold">{state.name}</h4>
                            <p className="text-sm text-gray-600">{state.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{state.score}/100</div>
                          <div className="text-yellow-500">{'⭐'.repeat(Math.round(state.score / 20))}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category Leaders */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">🏅 Category Leaders</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-900 mb-2">Best for Tax Savings</h4>
                      <p className="text-lg font-semibold">Texas & Florida</p>
                      <p className="text-sm text-gray-600">No income tax + property tax exemptions</p>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <h4 className="font-bold text-blue-900 mb-2">Best VA Healthcare Access</h4>
                      <p className="text-lg font-semibold">Florida & Texas</p>
                      <p className="text-sm text-gray-600">7-8 VA Medical Centers each</p>
                    </div>

                    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                      <h4 className="font-bold text-purple-900 mb-2">Best Education Benefits</h4>
                      <p className="text-lg font-semibold">Texas (Hazlewood Act)</p>
                      <p className="text-sm text-gray-600">150 credit hours free + transferable</p>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                      <h4 className="font-bold text-yellow-900 mb-2">Most Affordable</h4>
                      <p className="text-lg font-semibold">North Carolina</p>
                      <p className="text-sm text-gray-600">Low cost of living + veteran benefits</p>
                    </div>

                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                      <h4 className="font-bold text-red-900 mb-2">Largest Veteran Population</h4>
                      <p className="text-lg font-semibold">California (1.45M)</p>
                      <p className="text-sm text-gray-600">But expensive with higher taxes</p>
                    </div>

                    <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
                      <h4 className="font-bold text-indigo-900 mb-2">Best Military Connection</h4>
                      <p className="text-lg font-semibold">Virginia & NC</p>
                      <p className="text-sm text-gray-600">Multiple bases + strong vet community</p>
                    </div>
                  </div>
                </div>

                {/* All States Quick View */}
                <div>
                  <h3 className="text-xl font-bold mb-3">📍 View Detailed State Information</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {Object.keys(statesData).map(code => (
                      <Link
                        key={code}
                        to={`/state-benefits/${code.toLowerCase()}`}
                        className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 text-center font-semibold"
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

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect State?</h2>
          <p className="text-xl text-green-100 mb-6">
            Create a free account to save your comparisons, get personalized recommendations, and access all MTT tools.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 font-bold text-lg">
              Create Free Account - 30 Seconds
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 font-bold text-lg">
              Log In
            </button>
          </div>
          <p className="text-sm text-green-100 mt-3">Always free. No credit card. No catch.</p>
        </div>
      </div>
    </div>
  );
}
