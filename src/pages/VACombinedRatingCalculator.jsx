import { useState, useEffect } from 'react'
import PublicNav from '../components/Navigation/PublicNav'

// Common conditions for quick-add
const COMMON_CONDITIONS = [
  { name: 'PTSD', defaultRating: 50 },
  { name: 'Tinnitus', defaultRating: 10, maxRating: 10 },
  { name: 'Hearing Loss', defaultRating: 10 },
  { name: 'Lower Back Pain', defaultRating: 20 },
  { name: 'Sleep Apnea', defaultRating: 50 },
  { name: 'Migraines', defaultRating: 30 },
  { name: 'Knee (Right)', defaultRating: 10, bilateral: 'leg' },
  { name: 'Knee (Left)', defaultRating: 10, bilateral: 'leg' },
  { name: 'Shoulder (Right)', defaultRating: 20, bilateral: 'arm' },
  { name: 'Shoulder (Left)', defaultRating: 20, bilateral: 'arm' },
  { name: 'Ankle (Right)', defaultRating: 10, bilateral: 'leg' },
  { name: 'Ankle (Left)', defaultRating: 10, bilateral: 'leg' },
  { name: 'Hip (Right)', defaultRating: 10, bilateral: 'leg' },
  { name: 'Hip (Left)', defaultRating: 10, bilateral: 'leg' },
  { name: 'Depression', defaultRating: 30 },
  { name: 'Anxiety', defaultRating: 30 },
  { name: 'Radiculopathy (Right Leg)', defaultRating: 20, bilateral: 'leg' },
  { name: 'Radiculopathy (Left Leg)', defaultRating: 20, bilateral: 'leg' },
  { name: 'Carpal Tunnel (Right)', defaultRating: 10, bilateral: 'arm' },
  { name: 'Carpal Tunnel (Left)', defaultRating: 10, bilateral: 'arm' },
  { name: 'Hypertension', defaultRating: 10 },
  { name: 'GERD', defaultRating: 10 },
  { name: 'IBS', defaultRating: 10 },
  { name: 'Diabetes Type 2', defaultRating: 20 },
  { name: 'TBI', defaultRating: 40 },
]

// Valid VA rating percentages
const VALID_RATINGS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

// 2025 VA Disability Rates (monthly, veteran alone)
const VA_RATES_2025 = {
  0: 0,
  10: 171,
  20: 338,
  30: 524,
  40: 755,
  50: 1075,
  60: 1361,
  70: 1716,
  80: 1995,
  90: 2241,
  100: 3737
}

export default function VACombinedRatingCalculator() {
  const [conditions, setConditions] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customRating, setCustomRating] = useState(10)
  const [customBilateral, setCustomBilateral] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    document.title = 'VA Combined Rating Calculator - VA Math Explained | Military Transition Toolkit'
  }, [])

  // Calculate combined rating using VA math
  const calculateCombinedRating = (ratings) => {
    if (ratings.length === 0) return { combined: 0, rounded: 0, steps: [] }
    if (ratings.length === 1) return {
      combined: ratings[0],
      rounded: ratings[0],
      steps: [{ rating: ratings[0], remaining: 100 - ratings[0], combined: ratings[0] }]
    }

    // Sort ratings from highest to lowest (VA starts with highest)
    const sorted = [...ratings].sort((a, b) => b - a)

    let remaining = 100
    const steps = []

    for (const rating of sorted) {
      const disability = (remaining * rating) / 100
      const newRemaining = remaining - disability
      const combined = 100 - newRemaining

      steps.push({
        rating,
        remaining: Math.round(remaining * 100) / 100,
        disability: Math.round(disability * 100) / 100,
        newRemaining: Math.round(newRemaining * 100) / 100,
        combined: Math.round(combined * 100) / 100
      })

      remaining = newRemaining
    }

    const combined = 100 - remaining
    const rounded = Math.round(combined / 10) * 10

    return { combined: Math.round(combined * 100) / 100, rounded, steps }
  }

  // Calculate bilateral factor
  const calculateBilateralFactor = () => {
    const bilateralGroups = {}

    conditions.forEach(c => {
      if (c.bilateral) {
        if (!bilateralGroups[c.bilateral]) {
          bilateralGroups[c.bilateral] = []
        }
        bilateralGroups[c.bilateral].push(c)
      }
    })

    // Only apply bilateral factor if we have conditions on both sides
    const eligibleGroups = Object.entries(bilateralGroups).filter(([, items]) => {
      const hasLeft = items.some(i => i.name.toLowerCase().includes('left'))
      const hasRight = items.some(i => i.name.toLowerCase().includes('right'))
      return hasLeft && hasRight
    })

    if (eligibleGroups.length === 0) return { applies: false, bonus: 0, bilateralCombined: 0 }

    // Get all bilateral condition ratings
    const bilateralRatings = eligibleGroups.flatMap(([, items]) => items.map(i => i.rating))

    if (bilateralRatings.length < 2) return { applies: false, bonus: 0, bilateralCombined: 0 }

    // Calculate combined bilateral rating
    const bilateralResult = calculateCombinedRating(bilateralRatings)
    const bilateralCombined = bilateralResult.combined

    // Bilateral factor is 10% of the combined bilateral rating
    const bonus = bilateralCombined * 0.1

    return {
      applies: true,
      bonus: Math.round(bonus * 100) / 100,
      bilateralCombined: Math.round(bilateralCombined * 100) / 100,
      groups: eligibleGroups
    }
  }

  // Get final calculation with bilateral factor
  const getFinalCalculation = () => {
    if (conditions.length === 0) {
      return {
        combinedRaw: 0,
        rounded: 0,
        bilateral: { applies: false, bonus: 0 },
        steps: [],
        monthlyPayment: 0
      }
    }

    const allRatings = conditions.map(c => c.rating)
    const bilateralInfo = calculateBilateralFactor()

    if (bilateralInfo.applies) {
      // With bilateral factor, we need to:
      // 1. Combine bilateral conditions first
      // 2. Add 10% of that combined value
      // 3. Combine that result with non-bilateral conditions

      const bilateralConditions = conditions.filter(c => c.bilateral &&
        (c.name.toLowerCase().includes('left') || c.name.toLowerCase().includes('right')))
      const nonBilateralConditions = conditions.filter(c => !c.bilateral ||
        !(c.name.toLowerCase().includes('left') || c.name.toLowerCase().includes('right')))

      // Step 1: Combine bilateral ratings
      const bilateralRatings = bilateralConditions.map(c => c.rating)
      const bilateralResult = calculateCombinedRating(bilateralRatings)

      // Step 2: Add 10% bonus
      const bilateralWithBonus = bilateralResult.combined + bilateralInfo.bonus

      // Step 3: Combine with non-bilateral conditions
      const nonBilateralRatings = nonBilateralConditions.map(c => c.rating)
      const allRatingsWithBonus = [bilateralWithBonus, ...nonBilateralRatings]
      const finalResult = calculateCombinedRating(allRatingsWithBonus)

      return {
        combinedRaw: finalResult.combined,
        rounded: finalResult.rounded,
        bilateral: bilateralInfo,
        steps: finalResult.steps,
        bilateralSteps: bilateralResult.steps,
        monthlyPayment: VA_RATES_2025[finalResult.rounded] || 0
      }
    } else {
      const result = calculateCombinedRating(allRatings)
      return {
        combinedRaw: result.combined,
        rounded: result.rounded,
        bilateral: { applies: false, bonus: 0 },
        steps: result.steps,
        monthlyPayment: VA_RATES_2025[result.rounded] || 0
      }
    }
  }

  const addCondition = (condition) => {
    const newCondition = {
      id: Date.now(),
      name: condition.name,
      rating: condition.defaultRating,
      maxRating: condition.maxRating,
      bilateral: condition.bilateral || null
    }
    setConditions([...conditions, newCondition])
    setShowAddModal(false)
  }

  const addCustomCondition = () => {
    if (!customName.trim()) return
    const newCondition = {
      id: Date.now(),
      name: customName.trim(),
      rating: customRating,
      bilateral: customBilateral || null
    }
    setConditions([...conditions, newCondition])
    setCustomName('')
    setCustomRating(10)
    setCustomBilateral('')
    setShowAddModal(false)
  }

  const updateRating = (id, newRating) => {
    setConditions(conditions.map(c => {
      if (c.id === id) {
        const maxRating = c.maxRating || 100
        const clampedRating = Math.min(newRating, maxRating)
        return { ...c, rating: clampedRating }
      }
      return c
    }))
  }

  const removeCondition = (id) => {
    setConditions(conditions.filter(c => c.id !== id))
  }

  const result = getFinalCalculation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <PublicNav currentPage="/calculator/va-combined-rating" />

      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              VA Combined Rating Calculator
            </h1>
            <p className="text-xl text-slate-300 mb-2">
              Calculate your combined VA disability rating using official VA math
            </p>
            <p className="text-sm text-slate-400">
              Add your conditions below to see how they combine. VA uses "whole person" math, not simple addition.
            </p>
          </div>

          {/* Main Calculator Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-6 mb-8">
            {/* Conditions List */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Your Conditions</h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  + Add Condition
                </button>
              </div>

              {conditions.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <p className="mb-2">No conditions added yet.</p>
                  <p className="text-sm">Click "Add Condition" to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {conditions.map((condition) => (
                    <div
                      key={condition.id}
                      className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{condition.name}</span>
                          {condition.bilateral && (
                            <span className="px-2 py-0.5 text-xs bg-purple-600/50 text-purple-200 rounded">
                              Bilateral ({condition.bilateral})
                            </span>
                          )}
                          {condition.maxRating && (
                            <span className="px-2 py-0.5 text-xs bg-amber-600/50 text-amber-200 rounded">
                              Max {condition.maxRating}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={condition.rating}
                          onChange={(e) => updateRating(condition.id, parseInt(e.target.value))}
                          className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white font-medium"
                        >
                          {VALID_RATINGS.filter(r => !condition.maxRating || r <= condition.maxRating).map(r => (
                            <option key={r} value={r}>{r}%</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeCondition(condition.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Remove condition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Results Section */}
            {conditions.length > 0 && (
              <div className="border-t border-slate-600 pt-6">
                {/* Bilateral Factor Notice */}
                {result.bilateral.applies && (
                  <div className="mb-4 p-4 bg-purple-900/30 border border-purple-600 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚖️</span>
                      <div>
                        <h3 className="font-semibold text-purple-200 mb-1">Bilateral Factor Applied</h3>
                        <p className="text-sm text-purple-300">
                          You have conditions affecting both sides of paired body parts.
                          VA adds a 10% bonus to your bilateral combined rating.
                        </p>
                        <p className="text-sm text-purple-300 mt-1">
                          Bilateral combined: {result.bilateral.bilateralCombined}% + {result.bilateral.bonus}% bonus = {(result.bilateral.bilateralCombined + result.bilateral.bonus).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600 text-center">
                    <div className="text-sm text-slate-400 mb-1">Simple Addition</div>
                    <div className="text-2xl font-bold text-slate-400 line-through">
                      {conditions.reduce((sum, c) => sum + c.rating, 0)}%
                    </div>
                    <div className="text-xs text-red-400">Not how VA calculates</div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl border-2 border-blue-500 text-center">
                    <div className="text-sm text-blue-300 mb-1">VA Combined Rating</div>
                    <div className="text-3xl font-bold text-blue-300">
                      {result.combinedRaw.toFixed(1)}%
                    </div>
                    <div className="text-xs text-blue-400">Before rounding</div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-xl border-2 border-green-500 text-center">
                    <div className="text-sm text-green-300 mb-1">Final Rating</div>
                    <div className="text-4xl font-bold text-green-300">
                      {result.rounded}%
                    </div>
                    <div className="text-xs text-green-400">Rounded to nearest 10%</div>
                  </div>
                </div>

                {/* Monthly Payment */}
                <div className="p-6 bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-xl border border-green-500/50 text-center mb-6">
                  <div className="text-sm text-slate-300 mb-2">Estimated Monthly Payment (2025 Rates, Veteran Alone)</div>
                  <div className="text-5xl font-bold text-green-400 mb-2">
                    ${result.monthlyPayment.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-400">
                    ${(result.monthlyPayment * 12).toLocaleString()}/year
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Rates may be higher with dependents. VA disability is tax-free.
                  </p>
                </div>

                {/* Show Calculation Button */}
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="w-full py-3 text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {showExplanation ? 'Hide' : 'Show'} Step-by-Step Calculation
                  <svg className={`w-5 h-5 transition-transform ${showExplanation ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Step-by-Step Explanation */}
                {showExplanation && (
                  <div className="mt-4 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                    <h3 className="font-semibold text-white mb-4">How VA Math Works:</h3>

                    <div className="mb-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
                      <p className="text-sm text-blue-200">
                        <strong>The Formula:</strong> Each disability takes a percentage of your remaining "whole person" capacity.
                        <br />
                        <code className="bg-slate-800 px-2 py-1 rounded mt-1 inline-block">
                          Combined = 100 - ((100 - rating1) × (100 - rating2) × ... / 100)
                        </code>
                      </p>
                    </div>

                    <div className="space-y-2">
                      {result.steps.map((step, index) => (
                        <div key={index} className="p-3 bg-slate-800 rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">
                              Step {index + 1}: Apply <span className="text-yellow-400 font-bold">{step.rating}%</span> rating
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {step.remaining}% remaining × {step.rating}% = {step.disability}% disability
                          </div>
                          <div className="text-sm text-green-400 mt-1">
                            Running total: <strong>{step.combined}%</strong>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded-lg">
                      <p className="text-sm text-green-200">
                        <strong>Final:</strong> {result.combinedRaw.toFixed(1)}% rounds to <strong>{result.rounded}%</strong>
                        <br />
                        <span className="text-xs">(VA rounds 0.5 and up to next 10%: 65%→70%, 64%→60%)</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Educational Content */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Understanding VA Combined Ratings</h2>

            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="font-semibold text-white mb-2">Why Isn't It Simple Addition?</h3>
                <p className="text-sm">
                  The VA uses a "whole person" concept. If you're 50% disabled, you have 50% of your "efficiency" remaining.
                  The next disability takes a percentage of what's left, not of the original 100%.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Example: 50% + 30%</h3>
                <p className="text-sm">
                  • Start with 100% efficiency<br />
                  • 50% disability leaves 50% remaining<br />
                  • 30% of 50% = 15% more disability<br />
                  • Total: 50% + 15% = <strong>65%</strong> (not 80%)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">What Is the Bilateral Factor?</h3>
                <p className="text-sm">
                  If you have conditions affecting both sides of paired body parts (both knees, both shoulders, etc.),
                  the VA adds a 10% bonus to your bilateral combined rating before combining with other conditions.
                  This recognizes that bilateral conditions cause more functional impairment than single-sided ones.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Important Notes</h3>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Mental health conditions (PTSD, depression, anxiety) are typically rated together, not separately</li>
                  <li>Tinnitus is capped at 10% regardless of severity</li>
                  <li>The final rating is rounded to the nearest 10%</li>
                  <li>This calculator provides estimates - your actual rating may differ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4 text-center">
            <p className="text-sm text-yellow-200">
              <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only.
              Actual VA ratings depend on medical evidence, C&P exams, and VA adjudicators.
              This tool is not affiliated with or endorsed by the Department of Veterans Affairs.
            </p>
          </div>
        </div>
      </div>

      {/* Add Condition Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Add Condition</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Common Conditions */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Common Conditions
                </h3>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {COMMON_CONDITIONS.map((condition) => (
                    <button
                      key={condition.name}
                      onClick={() => addCondition(condition)}
                      className="p-3 text-left bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition-colors"
                    >
                      <div className="font-medium text-white text-sm">{condition.name}</div>
                      <div className="text-xs text-slate-400">
                        {condition.defaultRating}%
                        {condition.bilateral && ` (${condition.bilateral})`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Condition */}
              <div className="border-t border-slate-600 pt-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Add Custom Condition
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Condition Name</label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="e.g., Plantar Fasciitis (Right)"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Rating</label>
                      <select
                        value={customRating}
                        onChange={(e) => setCustomRating(parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      >
                        {VALID_RATINGS.map(r => (
                          <option key={r} value={r}>{r}%</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-1">Bilateral Group</label>
                      <select
                        value={customBilateral}
                        onChange={(e) => setCustomBilateral(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      >
                        <option value="">None</option>
                        <option value="arm">Arm/Shoulder</option>
                        <option value="leg">Leg/Hip</option>
                        <option value="hand">Hand/Wrist</option>
                        <option value="foot">Foot/Ankle</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={addCustomCondition}
                    disabled={!customName.trim()}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                  >
                    Add Custom Condition
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
