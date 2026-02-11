import { useState, useMemo } from 'react'
import { getPayGradesByCategory } from '../data/militaryPayData'
import { getLocationOptions } from '../data/bahRatesData'
import { calculatePayBreakdown } from '../services/payCalculatorService'
import { formatCurrency } from '../utils/formatters'
import { formatRankName } from '../utils/formatters'

export default function PayCalculator() {
  const [grade, setGrade] = useState('E-5')
  const [yos, setYos] = useState(4)
  const [location, setLocation] = useState('san-diego')
  const [withDependents, setWithDependents] = useState(false)
  const [tspPercent, setTspPercent] = useState(5)
  const [showSGLI, setShowSGLI] = useState(true)

  const gradesByCategory = getPayGradesByCategory()
  const locations = getLocationOptions()

  const breakdown = useMemo(
    () => calculatePayBreakdown(grade, yos, location, withDependents, tspPercent, showSGLI ? 400 : 0),
    [grade, yos, location, withDependents, tspPercent, showSGLI]
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Military Pay Calculator</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Estimate your monthly and annual military compensation. BAH rates are approximate — use the{' '}
          <a
            href="https://www.defensetravel.dod.mil/site/bahCalc.cfm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            official DoD calculator
          </a>{' '}
          for exact rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Info</h2>

            {/* Pay Grade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pay Grade
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <optgroup label="Enlisted">
                  {gradesByCategory.enlisted.map((g) => (
                    <option key={g} value={g}>{formatRankName(g)}</option>
                  ))}
                </optgroup>
                <optgroup label="Warrant Officer">
                  {gradesByCategory.warrant.map((g) => (
                    <option key={g} value={g}>{formatRankName(g)}</option>
                  ))}
                </optgroup>
                <optgroup label="Officer">
                  {gradesByCategory.officer.map((g) => (
                    <option key={g} value={g}>{formatRankName(g)}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Years of Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Years of Service: <span className="font-bold">{yos}</span>
              </label>
              <input
                type="range"
                min="0"
                max="40"
                value={yos}
                onChange={(e) => setYos(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duty Station (BAH)
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">No BAH (on-base housing)</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.label}</option>
                ))}
              </select>
            </div>

            {/* Dependents */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setWithDependents(!withDependents)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  withDependents ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                role="switch"
                aria-checked={withDependents}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    withDependents ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">With Dependents</span>
            </div>

            {/* TSP Contribution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                TSP Contribution: <span className="font-bold">{tspPercent}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={tspPercent}
                onChange={(e) => setTspPercent(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            {/* SGLI */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSGLI(!showSGLI)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showSGLI ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                role="switch"
                aria-checked={showSGLI}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showSGLI ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">SGLI ($400K)</span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Take-Home Highlight */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-blue-100 text-sm">Monthly Take-Home</p>
                <p className="text-3xl font-bold">{formatCurrency(breakdown.netPay)}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Annual Take-Home</p>
                <p className="text-3xl font-bold">{formatCurrency(breakdown.annualNet)}</p>
              </div>
            </div>
          </div>

          {/* Income Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Income</h2>
            <div className="space-y-3">
              <Row label="Base Pay" value={breakdown.basePay} />
              <Row label="BAS (Subsistence)" value={breakdown.bas} sublabel="Tax-free" />
              <Row
                label="BAH (Housing)"
                value={breakdown.bah}
                sublabel={breakdown.bah > 0 ? 'Tax-free' : 'N/A — on-base housing'}
              />
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <Row label="Gross Monthly Pay" value={breakdown.grossPay} bold />
              </div>
            </div>
          </div>

          {/* Deductions Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Estimated Deductions</h2>
            <div className="space-y-3">
              <Row label="Federal Tax (est.)" value={breakdown.deductions.federalTax} negative />
              <Row label="Social Security (6.2%)" value={breakdown.deductions.ficaSocialSecurity} negative />
              <Row label="Medicare (1.45%)" value={breakdown.deductions.ficaMedicare} negative />
              {breakdown.deductions.sgli > 0 && (
                <Row label="SGLI ($400K)" value={breakdown.deductions.sgli} negative />
              )}
              {breakdown.deductions.tsp > 0 && (
                <Row label={`TSP (${tspPercent}%)`} value={breakdown.deductions.tsp} negative />
              )}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <Row label="Total Deductions" value={breakdown.deductions.totalDeductions} negative bold />
              </div>
            </div>
          </div>

          {/* Annual Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Annual Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Gross Annual</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(breakdown.annualGross)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Net Annual</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">{formatCurrency(breakdown.annualNet)}</p>
              </div>
              {breakdown.deductions.tsp > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 col-span-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Annual TSP Contribution</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(breakdown.deductions.tsp * 12)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <span className="font-semibold">Disclaimer:</span> These are estimates based on 2024/2025 pay tables and standard deduction assumptions (single filer, no state tax).
              Actual pay depends on filing status, state taxes, special pays, and other individual factors.
              For official pay information, check your LES or contact DFAS.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, sublabel, negative, bold }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <span className={`text-sm ${bold ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
          {label}
        </span>
        {sublabel && (
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({sublabel})</span>
        )}
      </div>
      <span
        className={`text-sm font-mono ${
          bold
            ? 'font-bold text-gray-900 dark:text-white'
            : negative
            ? 'text-red-600 dark:text-red-400'
            : 'text-gray-900 dark:text-white'
        }`}
      >
        {negative && value > 0 ? '-' : ''}{formatCurrency(value)}
      </span>
    </div>
  )
}
