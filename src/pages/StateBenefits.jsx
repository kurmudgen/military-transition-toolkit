import { useState, useEffect } from 'react'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import {
  STATE_BENEFITS_DATABASE,
  BENEFIT_CATEGORIES,
  getAllStates,
  compareStates
} from '../data/stateBenefitsDatabase'

export default function StateBenefits({ publicMode = false }) {
  const [selectedState, setSelectedState] = useState(null)
  const [comparisonStates, setComparisonStates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [vetPopRange, setVetPopRange] = useState('all')
  const [noIncomeTax, setNoIncomeTax] = useState(false)
  const [fullPropertyTaxExemption, setFullPropertyTaxExemption] = useState(false)
  const [freeHunting, setFreeHunting] = useState(false)

  useEffect(() => {
    trackPageView('/app/state-benefits')
  }, [])

  // Load comparison states from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('stateComparison')
    if (saved) {
      try {
        setComparisonStates(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading comparison:', e)
      }
    }
  }, [])

  // Save comparison states to localStorage
  useEffect(() => {
    localStorage.setItem('stateComparison', JSON.stringify(comparisonStates))
  }, [comparisonStates])

  const handleStateClick = (stateCode) => {
    trackButtonClick(`View State - ${stateCode}`)
    setSelectedState(stateCode)
  }

  const addToComparison = (stateCode) => {
    trackButtonClick('Add State to Comparison')
    if (!comparisonStates.includes(stateCode) && comparisonStates.length < 5) {
      setComparisonStates([...comparisonStates, stateCode])
    }
  }

  const removeFromComparison = (stateCode) => {
    setComparisonStates(comparisonStates.filter(s => s !== stateCode))
  }

  const clearComparison = () => {
    if (window.confirm('Clear all states from comparison?')) {
      setComparisonStates([])
    }
  }

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'bg-green-500'
    if (score >= 4.0) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  const getRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>⭐</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half">⭐</span>)
    }
    return stars
  }

  // Parse veteran population string to number
  const parseVetPop = (vetPopString) => {
    return parseInt(vetPopString.replace(/,/g, ''))
  }

  // Check if state has no income tax
  const hasNoIncomeTax = (state) => {
    const description = state.benefits.incomeTax.description.toLowerCase()
    return description.includes('no state income tax') || description.includes('no income tax')
  }

  // Check if state has full property tax exemption
  const hasFullPropertyTaxExemption = (state) => {
    const description = state.benefits.propertyTax.description.toLowerCase()
    return description.includes('full') && description.includes('exemption')
  }

  // Check if state has free hunting/fishing
  const hasFreeHunting = (state) => {
    const description = state.benefits.hunting.description.toLowerCase()
    return description.includes('free') && state.benefits.hunting.available
  }

  // Toggle category selection
  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  // Filter and search states
  const getFilteredStates = () => {
    const allStates = getAllStates()
    return allStates.filter(abbr => {
      const state = STATE_BENEFITS_DATABASE[abbr]

      // Search filter
      if (searchTerm && !state.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Minimum rating filter
      if (state.rating < minRating) {
        return false
      }

      // Category filter (legacy single category)
      if (filterCategory !== 'all' && !state.benefits[filterCategory]?.available) {
        return false
      }

      // Multiple categories filter (all selected categories must be available)
      if (selectedCategories.length > 0) {
        const hasAllCategories = selectedCategories.every(catId =>
          state.benefits[catId]?.available
        )
        if (!hasAllCategories) {
          return false
        }
      }

      // Veteran population range filter
      if (vetPopRange !== 'all') {
        const vetPop = parseVetPop(state.vetPopulation)
        if (vetPopRange === 'small' && vetPop >= 100000) return false
        if (vetPopRange === 'medium' && (vetPop < 100000 || vetPop >= 500000)) return false
        if (vetPopRange === 'large' && vetPop < 500000) return false
      }

      // No income tax filter
      if (noIncomeTax && !hasNoIncomeTax(state)) {
        return false
      }

      // Full property tax exemption filter
      if (fullPropertyTaxExemption && !hasFullPropertyTaxExemption(state)) {
        return false
      }

      // Free hunting/fishing filter
      if (freeHunting && !hasFreeHunting(state)) {
        return false
      }

      return true
    })
  }

  // Export comparison as text
  const exportComparison = () => {
    trackButtonClick('Export Comparison')
    const states = compareStates(comparisonStates)
    let text = `STATE VETERAN BENEFITS COMPARISON\n`
    text += `Generated: ${new Date().toLocaleDateString()}\n`
    text += `${'='.repeat(80)}\n\n`

    states.forEach(state => {
      text += `${state.name} (${state.abbreviation})\n`
      text += `${''.repeat(state.name.length + state.abbreviation.length + 3)}\n`
      text += `Rating: ${state.rating}/5.0\n`
      text += `Veteran Population: ${state.vetPopulation}\n\n`

      text += `PROPERTY TAX BENEFITS:\n`
      text += `${state.benefits.propertyTax.description}\n`
      text += `Details: ${state.benefits.propertyTax.details}\n\n`

      text += `INCOME TAX BENEFITS:\n`
      text += `${state.benefits.incomeTax.description}\n`
      text += `Details: ${state.benefits.incomeTax.details}\n\n`

      text += `EDUCATION BENEFITS:\n`
      text += `${state.benefits.education.description}\n`
      text += `Details: ${state.benefits.education.details}\n\n`

      text += `VEHICLE REGISTRATION:\n`
      text += `${state.benefits.vehicleRegistration.description}\n`
      text += `Details: ${state.benefits.vehicleRegistration.details}\n\n`

      text += `HUNTING & FISHING:\n`
      text += `${state.benefits.hunting.description}\n`
      text += `Details: ${state.benefits.hunting.details}\n\n`

      text += `${'='.repeat(80)}\n\n`
    })

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `state-benefits-comparison-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredStates = getFilteredStates()

  // PUBLIC MODE: Show simplified view with signup CTA
  if (publicMode) {
    const allStates = getAllStates()
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Signup CTA Banner */}
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Explore State Veteran Benefits</h2>
            <p className="text-xl text-blue-100 mb-6">
              See basic state information below. Sign up for free to access advanced comparison tools, filtering, and detailed benefit breakdowns!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/signup"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-xl"
              >
                Sign Up Free - Compare States
              </a>
              <a
                href="/login"
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Log In
              </a>
            </div>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-3">
              State Veteran Benefits Preview
            </h1>
            <p className="text-slate-300 text-lg">
              Browse all 50 states + DC. Create a free account to compare benefits, filter by category, and export your analysis.
            </p>
          </div>

          {/* Simple State Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allStates.map(stateCode => {
              const state = STATE_BENEFITS_DATABASE[stateCode]
              return (
                <div
                  key={stateCode}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{state.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-slate-400">
                          Rating: {state.rating.toFixed(1)}/5.0
                        </span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-full ${state.rating >= 4.5 ? 'bg-green-500' : state.rating >= 4.0 ? 'bg-yellow-500' : 'bg-orange-500'} flex items-center justify-center text-white font-bold`}>
                      {state.rating.toFixed(1)}
                    </div>
                  </div>

                  <div className="text-sm text-slate-300 mb-4">
                    <p>Veteran Population: {state.vetPopulation}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-sm text-slate-400 mb-3">
                      Sign up to see detailed benefits for:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {state.benefits.propertyTax.available && (
                        <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs">
                          Property Tax
                        </span>
                      )}
                      {state.benefits.incomeTax.available && (
                        <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs">
                          Income Tax
                        </span>
                      )}
                      {state.benefits.education.available && (
                        <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs">
                          Education
                        </span>
                      )}
                      {state.benefits.vehicleRegistration.available && (
                        <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 rounded text-xs">
                          Vehicle
                        </span>
                      )}
                      {state.benefits.hunting.available && (
                        <span className="px-2 py-1 bg-red-900/50 text-red-300 rounded text-xs">
                          Hunting/Fishing
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to find your perfect state?</h3>
            <p className="text-lg text-blue-100 mb-6">
              Sign up free to unlock comparison tools, advanced filtering, and personalized recommendations
            </p>
            <a
              href="/signup"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-xl inline-block"
            >
              Create Free Account
            </a>
          </div>
        </div>
      </div>
    )
  }

  // AUTHENTICATED MODE: Show full comparison tool
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          State Veteran Benefits Comparison
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Compare veteran benefits across all 50 states + DC to find the best fit for your transition
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Search & Filter</h2>

        {/* Row 1: Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search States
            </label>
            <input
              type="text"
              placeholder="e.g., Texas, California..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Minimum Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5+ Stars</option>
              <option value={4.0}>4.0+ Stars</option>
              <option value={3.5}>3.5+ Stars</option>
            </select>
          </div>

          {/* Veteran Population Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Veteran Population
            </label>
            <select
              value={vetPopRange}
              onChange={(e) => setVetPopRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Sizes</option>
              <option value="small">Small (&lt;100k)</option>
              <option value="medium">Medium (100k-500k)</option>
              <option value="large">Large (500k+)</option>
            </select>
          </div>

          {/* Legacy Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Single Benefit
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Any Benefit</option>
              {BENEFIT_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Multiple Categories */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Must Have ALL Selected Benefits (Multi-select)
          </label>
          <div className="flex flex-wrap gap-2">
            {BENEFIT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategories.includes(cat.id)
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Special Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* No Income Tax */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={noIncomeTax}
                onChange={(e) => setNoIncomeTax(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                💰 No State Income Tax
              </span>
            </label>
          </div>

          {/* Full Property Tax Exemption */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={fullPropertyTaxExemption}
                onChange={(e) => setFullPropertyTaxExemption(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                🏠 Full Property Tax Exemption
              </span>
            </label>
          </div>

          {/* Free Hunting/Fishing */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={freeHunting}
                onChange={(e) => setFreeHunting(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                🎣 Free Hunting & Fishing
              </span>
            </label>
          </div>

          {/* Reset Button */}
          <div className="flex items-start">
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterCategory('all')
                setMinRating(0)
                setSelectedCategories([])
                setVetPopRange('all')
                setNoIncomeTax(false)
                setFullPropertyTaxExemption(false)
                setFreeHunting(false)
              }}
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Showing {filteredStates.length} of 51 states/territories</span>
          {(selectedCategories.length > 0 || noIncomeTax || fullPropertyTaxExemption || freeHunting) && (
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {selectedCategories.length + (noIncomeTax ? 1 : 0) + (fullPropertyTaxExemption ? 1 : 0) + (freeHunting ? 1 : 0)} active filter(s)
            </span>
          )}
        </div>
      </div>

      {/* Comparison Bar */}
      {comparisonStates.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Comparing States ({comparisonStates.length}/5):
            </h3>
            <div className="flex gap-2">
              {comparisonStates.length >= 2 && (
                <button
                  onClick={exportComparison}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  📥 Export
                </button>
              )}
              <button
                onClick={clearComparison}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {comparisonStates.map(stateCode => {
              const state = STATE_BENEFITS_DATABASE[stateCode]
              return (
                <div
                  key={stateCode}
                  className="flex items-center bg-white dark:bg-gray-700 px-3 py-1 rounded-full border border-blue-300 dark:border-blue-600"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {state.name}
                  </span>
                  <button
                    onClick={() => removeFromComparison(stateCode)}
                    className="ml-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
          {comparisonStates.length >= 2 && (
            <a
              href="#comparison"
              className="mt-3 inline-block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View Detailed Comparison Below ↓
            </a>
          )}
        </div>
      )}

      {/* State Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStates.map(stateCode => {
          const state = STATE_BENEFITS_DATABASE[stateCode]
          return (
            <div
              key={stateCode}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleStateClick(stateCode)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{state.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {getRatingStars(state.rating)} {state.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full ${getScoreColor(state.rating)} flex items-center justify-center text-white font-bold`}>
                  {state.rating.toFixed(1)}
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-start text-gray-600 dark:text-gray-400">
                  <span className="mr-1">🏠</span>
                  <span className="flex-1">{state.benefits.propertyTax.description.substring(0, 60)}...</span>
                </div>
                <div className="flex items-start text-gray-600 dark:text-gray-400">
                  <span className="mr-1">💰</span>
                  <span className="flex-1">{state.benefits.incomeTax.description.substring(0, 60)}...</span>
                </div>
                <div className="flex items-start text-gray-600 dark:text-gray-400">
                  <span className="mr-1">🎓</span>
                  <span className="flex-1">{state.benefits.education.description.substring(0, 60)}...</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                Veteran Population: {state.vetPopulation}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  addToComparison(stateCode)
                }}
                disabled={comparisonStates.includes(stateCode) || comparisonStates.length >= 5}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  comparisonStates.includes(stateCode)
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {comparisonStates.includes(stateCode) ? '✓ Added' : '+ Add to Compare'}
              </button>
            </div>
          )
        })}
      </div>

      {/* State Detail Modal */}
      {selectedState && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedState(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {STATE_BENEFITS_DATABASE[selectedState].name}
                </h2>
                <div className="flex items-center mt-2">
                  <span className="text-lg">
                    {getRatingStars(STATE_BENEFITS_DATABASE[selectedState].rating)}
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {STATE_BENEFITS_DATABASE[selectedState].rating.toFixed(1)} out of 5.0
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedState(null)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {BENEFIT_CATEGORIES.map(category => {
                  const benefit = STATE_BENEFITS_DATABASE[selectedState].benefits[category.id]
                  if (!benefit) return null

                  return (
                    <div
                      key={category.id}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2">{category.icon}</span>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {category.label}
                        </h3>
                      </div>

                      {benefit.available ? (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {benefit.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            <strong>Details:</strong> {benefit.details}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                          {benefit.description || 'Not available'}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Veteran Population: {STATE_BENEFITS_DATABASE[selectedState].vetPopulation}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Total veterans living in {STATE_BENEFITS_DATABASE[selectedState].name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {comparisonStates.length >= 2 && (
        <div id="comparison" className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Detailed Side-by-Side Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                    Benefit
                  </th>
                  {comparisonStates.map(stateCode => {
                    const state = STATE_BENEFITS_DATABASE[stateCode]
                    return (
                      <th
                        key={stateCode}
                        className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold text-gray-900 dark:text-white"
                      >
                        <div>{state.name}</div>
                        <div className="text-xs font-normal text-gray-600 dark:text-gray-400 mt-1">
                          {getRatingStars(state.rating)} {state.rating.toFixed(1)}
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                    Veteran Population
                  </td>
                  {comparisonStates.map(stateCode => (
                    <td
                      key={stateCode}
                      className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-700 dark:text-gray-300"
                    >
                      {STATE_BENEFITS_DATABASE[stateCode].vetPopulation}
                    </td>
                  ))}
                </tr>

                {BENEFIT_CATEGORIES.map(category => (
                  <tr key={category.id}>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                      {category.icon} {category.label}
                    </td>
                    {comparisonStates.map(stateCode => {
                      const benefit = STATE_BENEFITS_DATABASE[stateCode].benefits[category.id]
                      return (
                        <td
                          key={stateCode}
                          className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300"
                        >
                          {benefit.available ? (
                            <div className="space-y-1">
                              <div className="font-medium">{benefit.description}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {benefit.details}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400 italic">
                              Not available
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={exportComparison}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              📥 Export Comparison as Text File
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
