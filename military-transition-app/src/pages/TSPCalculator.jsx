import { useState, useMemo } from 'react'
import { calculateTSPGrowth, calculateTSPContribution, calculateMilitaryRetirementPay } from '../utils/financialCalculations'
import { formatCurrency, formatCurrencyCompact } from '../utils/formatters'

const TSP_FUNDS = [
  { symbol: 'G', name: 'Government Securities', risk: 'Low', historicalReturn: 0.035, desc: 'US Treasury securities. Lowest risk, lowest return. Capital is guaranteed.' },
  { symbol: 'F', name: 'Fixed Income Index', risk: 'Low–Med', historicalReturn: 0.045, desc: 'Bloomberg US Aggregate Bond Index. Slightly higher risk/return than G Fund.' },
  { symbol: 'C', name: 'Common Stock Index', risk: 'Medium', historicalReturn: 0.10, desc: 'Tracks the S&P 500. Broad exposure to large US companies.' },
  { symbol: 'S', name: 'Small Cap Stock Index', risk: 'Med–High', historicalReturn: 0.105, desc: 'Dow Jones US Completion TSM Index. Small & mid-cap US stocks not in S&P 500.' },
  { symbol: 'I', name: 'International Stock Index', risk: 'Med–High', historicalReturn: 0.075, desc: 'MSCI EAFE Index. International developed market stocks.' },
]

const LIFECYCLE_FUNDS = [
  { name: 'L Income', target: 'Retired', return: 0.04 },
  { name: 'L 2025', target: '2025', return: 0.045 },
  { name: 'L 2030', target: '2030', return: 0.055 },
  { name: 'L 2035', target: '2035', return: 0.065 },
  { name: 'L 2040', target: '2040', return: 0.07 },
  { name: 'L 2045', target: '2045', return: 0.075 },
  { name: 'L 2050', target: '2050', return: 0.08 },
  { name: 'L 2055', target: '2055', return: 0.085 },
  { name: 'L 2060', target: '2060', return: 0.09 },
  { name: 'L 2065', target: '2065', return: 0.095 },
]

const BRS_MATCH_SCHEDULE = [
  { yos: '0-2', autoEnroll: '3%', match: '0%', note: 'Auto-enrolled at 3% after 60 days' },
  { yos: '2', autoEnroll: '—', match: 'Up to 5%', note: 'DoD matches dollar-for-dollar on first 3%, then $0.50/dollar on next 2%' },
  { yos: '2-26', autoEnroll: '—', match: 'Up to 5%', note: 'Full matching: 1% auto + up to 4% match = 5% total from DoD' },
  { yos: '26+', autoEnroll: '—', match: '1% auto only', note: 'Matching stops, but 1% automatic contribution continues' },
]

// 2025 IRS limit
const TSP_ANNUAL_LIMIT = 23500
const TSP_CATCH_UP = 7500

export default function TSPCalculator() {
  const [currentBalance, setCurrentBalance] = useState('')
  const [monthlyBasePay, setMonthlyBasePay] = useState('')
  const [contributionPct, setContributionPct] = useState(5)
  const [yearsToRetirement, setYearsToRetirement] = useState(20)
  const [isBRS, setIsBRS] = useState(true)
  const [expectedReturn, setExpectedReturn] = useState(0.07)
  const [selectedFundTab, setSelectedFundTab] = useState('individual')

  // High-3 fields for retirement estimate
  const [highThreeAvg, setHighThreeAvg] = useState('')
  const [yearsOfService, setYearsOfService] = useState('')

  const calc = useMemo(() => {
    const balance = parseFloat(currentBalance) || 0
    const basePay = parseFloat(monthlyBasePay) || 0
    const contribution = calculateTSPContribution(basePay, contributionPct)

    // BRS match: 1% auto + match up to 4% (dollar-for-dollar on first 3%, 50c on next 2%)
    let dodMatch = 0
    if (isBRS && basePay > 0) {
      const autoContrib = basePay * 0.01
      const memberPct = contributionPct
      const matchFirst3 = Math.min(memberPct, 3) / 100 * basePay
      const matchNext2 = Math.max(0, Math.min(memberPct, 5) - 3) / 100 * basePay * 0.5
      dodMatch = autoContrib + matchFirst3 + matchNext2
    }

    const totalMonthly = contribution + dodMatch
    const projected = calculateTSPGrowth(balance, totalMonthly, expectedReturn, yearsToRetirement)
    const withoutMatch = calculateTSPGrowth(balance, contribution, expectedReturn, yearsToRetirement)
    const matchValue = projected - withoutMatch

    // Annual contribution check
    const annualContribution = contribution * 12
    const overLimit = annualContribution > TSP_ANNUAL_LIMIT

    // Retirement pay estimate
    const h3 = parseFloat(highThreeAvg) || 0
    const yos = parseFloat(yearsOfService) || 0
    const retirePay = calculateMilitaryRetirementPay(h3, yos, isBRS)

    // Growth milestones
    const milestones = [5, 10, 15, 20, 25, 30].filter((y) => y <= Math.max(yearsToRetirement, 30)).map((y) => ({
      year: y,
      balance: calculateTSPGrowth(balance, totalMonthly, expectedReturn, y),
    }))

    return {
      contribution,
      dodMatch,
      totalMonthly,
      projected,
      withoutMatch,
      matchValue,
      annualContribution,
      overLimit,
      retirePay,
      milestones,
    }
  }, [currentBalance, monthlyBasePay, contributionPct, yearsToRetirement, isBRS, expectedReturn, highThreeAvg, yearsOfService])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TSP Calculator</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Project your Thrift Savings Plan growth and understand BRS matching
        </p>
      </div>

      {/* Input Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Current TSP Balance
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
                className="w-full pl-7 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                placeholder="15000"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Monthly Base Pay
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="100"
                value={monthlyBasePay}
                onChange={(e) => setMonthlyBasePay(e.target.value)}
                className="w-full pl-7 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                placeholder="3600"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Contribution: {contributionPct}%
            </label>
            <input
              type="range"
              min="0"
              max="60"
              value={contributionPct}
              onChange={(e) => setContributionPct(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>BRS match cap: 5%</span>
              <span>60%</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Years to Retirement
            </label>
            <input
              type="number"
              min="1"
              max="40"
              value={yearsToRetirement}
              onChange={(e) => setYearsToRetirement(Math.min(40, Math.max(1, Number(e.target.value) || 1)))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Expected Annual Return
            </label>
            <select
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
            >
              <option value={0.04}>4% (Conservative)</option>
              <option value={0.05}>5% (Moderate-Low)</option>
              <option value={0.06}>6% (Moderate)</option>
              <option value={0.07}>7% (Moderate-High)</option>
              <option value={0.08}>8% (Aggressive)</option>
              <option value={0.10}>10% (Historical S&P 500)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Retirement System
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setIsBRS(true)}
                className={`flex-1 py-2 text-sm rounded-lg border transition ${
                  isBRS
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                }`}
              >
                BRS
              </button>
              <button
                onClick={() => setIsBRS(false)}
                className={`flex-1 py-2 text-sm rounded-lg border transition ${
                  !isBRS
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                }`}
              >
                High-3
              </button>
            </div>
          </div>
        </div>

        {calc.overLimit && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              <strong>Note:</strong> Your annual contribution ({formatCurrency(calc.annualContribution)}) exceeds the {new Date().getFullYear()} IRS limit of {formatCurrency(TSP_ANNUAL_LIMIT)}.
              The TSP will automatically stop deductions when you hit the limit.
              {' '}Members age 50+ can contribute an additional {formatCurrency(TSP_CATCH_UP)} in catch-up contributions.
            </p>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Your Monthly</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
            {formatCurrency(calc.contribution)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{contributionPct}% of base pay</p>
        </div>
        {isBRS && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">DoD Match</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
              {formatCurrency(calc.dodMatch)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Free money/mo</p>
          </div>
        )}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Projected Balance</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {formatCurrencyCompact(calc.projected)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">in {yearsToRetirement} years</p>
        </div>
        {isBRS && calc.matchValue > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Match Value</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
              {formatCurrencyCompact(calc.matchValue)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">total match + growth</p>
          </div>
        )}
      </div>

      {/* Growth Milestones */}
      {calc.milestones.length > 0 && (parseFloat(currentBalance) > 0 || parseFloat(monthlyBasePay) > 0) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Growth Projection</h2>
          <div className="space-y-2">
            {calc.milestones.map((m) => {
              const maxBalance = calc.milestones[calc.milestones.length - 1]?.balance || 1
              const pct = Math.min(100, Math.round((m.balance / maxBalance) * 100))
              return (
                <div key={m.year} className="flex items-center gap-3">
                  <span className="w-16 text-sm text-gray-600 dark:text-gray-400 text-right">
                    {m.year} yrs
                  </span>
                  <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${Math.max(pct, 8)}%` }}
                    >
                      <span className="text-xs text-white font-medium truncate">
                        {formatCurrencyCompact(m.balance)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* BRS Matching Schedule */}
      {isBRS && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">BRS Matching Schedule</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Under BRS, the DoD automatically contributes 1% of base pay and matches up to an additional 4%
            (dollar-for-dollar on the first 3%, then 50 cents on the dollar for the next 2%).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                  <th className="pb-2 pr-4">Years of Service</th>
                  <th className="pb-2 pr-4">Auto Enroll</th>
                  <th className="pb-2 pr-4">DoD Match</th>
                  <th className="pb-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {BRS_MATCH_SCHEDULE.map((row) => (
                  <tr key={row.yos} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 pr-4 font-medium text-gray-900 dark:text-white">{row.yos}</td>
                    <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">{row.autoEnroll}</td>
                    <td className="py-2 pr-4 text-green-600 dark:text-green-400 font-medium">{row.match}</td>
                    <td className="py-2 text-gray-500 dark:text-gray-400 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {contributionPct < 5 && parseFloat(monthlyBasePay) > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                <strong>You're leaving money on the table!</strong> Contributing {contributionPct}% means you're not
                getting the full 5% DoD match. Increasing to 5% would give you an extra{' '}
                {formatCurrency(calculateTSPContribution(parseFloat(monthlyBasePay) || 0, 5) - calc.contribution + (parseFloat(monthlyBasePay) || 0) * 0.01)}/month
                in combined contributions.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Military Retirement Estimate */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Retirement Pay Estimate</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {isBRS
            ? 'BRS: 2.0% × years of service × high-3 average + TSP (with matching)'
            : 'High-3: 2.5% × years of service × average of highest 36 months of base pay'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              High-3 Average Base Pay
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="100"
                value={highThreeAvg}
                onChange={(e) => setHighThreeAvg(e.target.value)}
                className="w-full pl-7 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                placeholder="5500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Years of Service at Retirement
            </label>
            <input
              type="number"
              min="0"
              max="40"
              value={yearsOfService}
              onChange={(e) => setYearsOfService(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
              placeholder="20"
            />
          </div>
        </div>
        {calc.retirePay > 0 && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Monthly Retirement Pay</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(calc.retirePay)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {isBRS ? '2.0%' : '2.5%'} × {yearsOfService || 0} years = {((isBRS ? 2.0 : 2.5) * (parseFloat(yearsOfService) || 0)).toFixed(1)}% of high-3 average
            </p>
          </div>
        )}
      </div>

      {/* TSP Fund Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">TSP Fund Options</h2>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedFundTab('individual')}
            className={`px-3 py-1.5 text-sm rounded-lg transition ${
              selectedFundTab === 'individual'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Individual Funds
          </button>
          <button
            onClick={() => setSelectedFundTab('lifecycle')}
            className={`px-3 py-1.5 text-sm rounded-lg transition ${
              selectedFundTab === 'lifecycle'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            Lifecycle (L) Funds
          </button>
        </div>

        {selectedFundTab === 'individual' ? (
          <div className="space-y-3">
            {TSP_FUNDS.map((fund) => (
              <div
                key={fund.symbol}
                className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <div className="flex items-center gap-3 sm:w-48">
                  <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-300">
                    {fund.symbol}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{fund.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Risk: {fund.risk}</p>
                  </div>
                </div>
                <p className="flex-1 text-xs text-gray-600 dark:text-gray-400">{fund.desc}</p>
                <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  ~{(fund.historicalReturn * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Lifecycle funds automatically adjust their allocation between the five individual funds,
              becoming more conservative as the target date approaches. Choose the fund closest to your
              expected retirement year.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {LIFECYCLE_FUNDS.map((lf) => (
                <div key={lf.name} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{lf.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">~{(lf.return * 100).toFixed(1)}% avg</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 pb-4">
        Historical returns are approximate and do not guarantee future performance. TSP contribution limits and
        matching rules are based on {new Date().getFullYear()} guidelines. Consult a financial advisor or your
        installation's Financial Readiness Program for personalized advice.
      </p>
    </div>
  )
}
