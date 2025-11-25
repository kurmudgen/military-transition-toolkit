import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PublicNav from '../components/Navigation/PublicNav'

// 2025 Base Pay for common ranks (monthly)
const BASE_PAY_BY_RANK = {
  'E-4': 2670,
  'E-5': 2916,
  'E-6': 3188,
  'E-7': 3686,
  'E-8': 4481,
  'E-9': 5473,
  'W-1': 3399,
  'W-2': 3873,
  'W-3': 4377,
  'W-4': 4828,
  'W-5': 5917,
  'O-1': 3826,
  'O-2': 4408,
  'O-3': 5107,
  'O-4': 6184,
  'O-5': 7191,
  'O-6': 8625
}

export default function TerminalLeaveCalculator() {
  const [leaveDays, setLeaveDays] = useState(30)
  const [selectedRank, setSelectedRank] = useState('E-5')
  const [customBasePay, setCustomBasePay] = useState('')
  const [useCustomPay, setUseCustomPay] = useState(false)
  const [bah, setBah] = useState('')
  const [hasJob, setHasJob] = useState(true)
  const [startDate, setStartDate] = useState('')

  useEffect(() => {
    document.title = 'Terminal Leave Calculator - Military Transition Toolkit'
  }, [])

  // Calculate base pay (either from rank or custom)
  const basePay = useCustomPay && customBasePay
    ? parseFloat(customBasePay)
    : BASE_PAY_BY_RANK[selectedRank]

  const bahValue = bah ? parseFloat(bah) : 0

  // Option A: Take Terminal Leave
  const takeLeaveBasePay = (leaveDays / 30) * basePay
  const takeLeaveBah = (leaveDays / 30) * bahValue
  const takeLeaveTricare = (leaveDays / 30) * 800 // Estimated monthly TRICARE value
  const takeLeaveTotalValue = takeLeaveBasePay + takeLeaveBah + takeLeaveTricare

  // Option B: Sell It Back
  const sellBackGross = (leaveDays / 30) * basePay
  const sellBackTaxRate = 0.28 // Estimated federal tax on lump sum
  const sellBackTaxes = sellBackGross * sellBackTaxRate
  const sellBackNet = sellBackGross - sellBackTaxes

  // Recommendation
  const getRecommendation = () => {
    const valueDifference = takeLeaveTotalValue - sellBackNet

    if (valueDifference > 500) {
      return {
        choice: 'Take Terminal Leave',
        reason: `Taking terminal leave provides approximately $${Math.round(valueDifference).toLocaleString()} more in total value, primarily from extended TRICARE coverage and BAH${bahValue > 0 ? '' : ' (if eligible)'}.`,
        color: 'text-green-400'
      }
    } else if (valueDifference < -200) {
      return {
        choice: 'Sell It Back',
        reason: `Selling provides more immediate cash, though you'll lose healthcare coverage early. Consider if you need the lump sum now.`,
        color: 'text-blue-400'
      }
    } else {
      return {
        choice: 'Close Call',
        reason: `The financial difference is minimal. Your decision should be based on personal factors like relocation needs, healthcare situation, and job start date flexibility.`,
        color: 'text-yellow-400'
      }
    }
  }

  const recommendation = getRecommendation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <PublicNav currentPage="/calculator/terminal-leave" />
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
          <Link to="/" className="inline-block text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terminal Leave Calculator
          </h1>
          <p className="text-xl text-slate-300">
            Calculate whether taking terminal leave or selling it back gives you more value
          </p>
        </div>

        {/* Calculator Inputs */}
        <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Your Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Terminal Leave Days */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Terminal Leave Days Available
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={leaveDays}
                onChange={(e) => setLeaveDays(Math.max(1, Math.min(60, parseInt(e.target.value) || 0)))}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <p className="text-xs text-slate-400 mt-1">Typically 1-60 days</p>
            </div>

            {/* Base Pay Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Monthly Base Pay
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setUseCustomPay(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !useCustomPay
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  By Rank
                </button>
                <button
                  onClick={() => setUseCustomPay(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    useCustomPay
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Custom Amount
                </button>
              </div>
              {!useCustomPay ? (
                <select
                  value={selectedRank}
                  onChange={(e) => setSelectedRank(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <optgroup label="Enlisted">
                    {Object.keys(BASE_PAY_BY_RANK)
                      .filter((r) => r.startsWith('E-'))
                      .map((rank) => (
                        <option key={rank} value={rank}>
                          {rank} - ${BASE_PAY_BY_RANK[rank].toLocaleString()}/mo
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Warrant Officers">
                    {Object.keys(BASE_PAY_BY_RANK)
                      .filter((r) => r.startsWith('W-'))
                      .map((rank) => (
                        <option key={rank} value={rank}>
                          {rank} - ${BASE_PAY_BY_RANK[rank].toLocaleString()}/mo
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Officers">
                    {Object.keys(BASE_PAY_BY_RANK)
                      .filter((r) => r.startsWith('O-'))
                      .map((rank) => (
                        <option key={rank} value={rank}>
                          {rank} - ${BASE_PAY_BY_RANK[rank].toLocaleString()}/mo
                        </option>
                      ))}
                  </optgroup>
                </select>
              ) : (
                <input
                  type="number"
                  value={customBasePay}
                  onChange={(e) => setCustomBasePay(e.target.value)}
                  placeholder="Enter monthly base pay"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              )}
            </div>

            {/* BAH */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Monthly BAH (Optional)
              </label>
              <input
                type="number"
                value={bah}
                onChange={(e) => setBah(e.target.value)}
                placeholder="Enter BAH if applicable"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <p className="text-xs text-slate-400 mt-1">Leave blank if not receiving BAH</p>
            </div>

            {/* Civilian Job */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Civilian Job Status
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setHasJob(true)}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    hasJob
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  ✓ Job Lined Up
                </button>
                <button
                  onClick={() => setHasJob(false)}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    !hasJob
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Still Searching
                </button>
              </div>
              {hasJob && (
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Expected start date"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setLeaveDays(30)
              setSelectedRank('E-5')
              setCustomBasePay('')
              setUseCustomPay(false)
              setBah('')
              setHasJob(true)
              setStartDate('')
            }}
            className="mt-6 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
          >
            Reset Calculator
          </button>
        </div>

        {/* Results Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Option A: Take Terminal Leave */}
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-xl shadow-lg p-8 border-2 border-green-600">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-3xl">✓</span>
              Take Terminal Leave
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Base Pay:</span>
                <span className="text-white font-bold text-lg">
                  ${Math.round(takeLeaveBasePay).toLocaleString()}
                </span>
              </div>
              {bahValue > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">BAH:</span>
                  <span className="text-white font-bold text-lg">
                    ${Math.round(takeLeaveBah).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-slate-300">TRICARE Value:</span>
                <span className="text-white font-bold text-lg">
                  ${Math.round(takeLeaveTricare).toLocaleString()}
                </span>
              </div>
              <div className="border-t border-green-700 pt-4 flex justify-between items-center">
                <span className="text-green-300 font-semibold">Total Value:</span>
                <span className="text-green-300 font-bold text-2xl">
                  ${Math.round(takeLeaveTotalValue).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 text-sm text-slate-300">
              <p className="font-semibold text-white mb-2">Benefits:</p>
              <ul className="space-y-1 ml-4">
                <li>• Extended healthcare coverage</li>
                <li>• Time for relocation</li>
                <li>• Decompression period</li>
                <li>• Flexible job start date</li>
              </ul>
            </div>
          </div>

          {/* Option B: Sell It Back */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl shadow-lg p-8 border-2 border-blue-600">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-3xl">💵</span>
              Sell It Back
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Gross Payment:</span>
                <span className="text-white font-bold text-lg">
                  ${Math.round(sellBackGross).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Est. Taxes (28%):</span>
                <span className="text-red-400 font-bold text-lg">
                  -${Math.round(sellBackTaxes).toLocaleString()}
                </span>
              </div>
              <div className="border-t border-blue-700 pt-4 flex justify-between items-center">
                <span className="text-blue-300 font-semibold">Net Payment:</span>
                <span className="text-blue-300 font-bold text-2xl">
                  ${Math.round(sellBackNet).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 text-sm text-slate-300">
              <p className="font-semibold text-white mb-2">Considerations:</p>
              <ul className="space-y-1 ml-4">
                <li>• TRICARE ends immediately</li>
                <li>• Lump sum taxed at higher rate</li>
                <li>• Less relocation time</li>
                <li>• Immediate cash available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 mb-6">
          <h3 className="text-2xl font-bold text-white mb-4">💡 Recommendation</h3>
          <div className="bg-slate-900 rounded-lg p-6">
            <p className={`text-xl font-bold mb-3 ${recommendation.color}`}>
              {recommendation.choice}
            </p>
            <p className="text-slate-300 leading-relaxed">{recommendation.reason}</p>
          </div>
        </div>

        {/* Additional Considerations */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">When to Take Terminal Leave</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Have young family needing healthcare continuity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Need time to relocate across country</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Want decompression time between military and civilian life</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Civilian job has flexible start date</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Healthcare costs would exceed cash value</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">When to Sell It Back</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Single or spouse has insurance through their job</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Civilian job starts immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Need cash now more than benefits later</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Ready to start earning civilian salary ASAP</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Healthcare costs aren't a major concern</span>
              </li>
            </ul>
          </div>
        </div>

        {/* What to Consider */}
        <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Important Factors to Consider</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Healthcare</h4>
              <p className="text-slate-300 text-sm mb-4">
                Family health insurance on the civilian market costs $800-1,500/month. TRICARE
                continuation during terminal leave can save thousands, especially if you have
                ongoing treatments or prescriptions.
              </p>

              <h4 className="font-semibold text-slate-200 mb-2">Tax Implications</h4>
              <p className="text-slate-300 text-sm">
                Lump sum payments are taxed at a higher rate (25-30%) because they count as income
                in a single tax year. Taking terminal leave spreads the income over 2 months,
                potentially resulting in lower overall tax liability.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Relocation</h4>
              <p className="text-slate-300 text-sm mb-4">
                Terminal leave provides time to move your household goods, find housing, and get
                your family settled before starting a new job. Selling leave means you need to
                manage relocation while starting work immediately.
              </p>

              <h4 className="font-semibold text-slate-200 mb-2">Mental Health</h4>
              <p className="text-slate-300 text-sm">
                The transition from military to civilian life is significant. Terminal leave
                provides decompression time to mentally prepare for the next chapter without the
                immediate pressure of a new job.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Want More Transition Tools?</h3>
          <p className="text-blue-100 mb-6">
            Create a free account to access checklists, VA claims tracking, resume builder, and
            more transition planning tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-lg transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              to="/blog/terminal-leave-calculator"
              className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg transition-colors"
            >
              Read Full Terminal Leave Guide
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
