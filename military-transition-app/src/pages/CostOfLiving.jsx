import { useState, useMemo } from 'react'
import { COST_OF_LIVING_CITIES, CATEGORIES, CATEGORY_LABELS, REGION_LABELS } from '../data/costOfLivingData'
import { formatCurrency } from '../utils/formatters'

const INDEX_COLOR = (val) => {
  if (val <= 85) return 'text-green-600 dark:text-green-400'
  if (val <= 95) return 'text-green-500 dark:text-green-400'
  if (val <= 105) return 'text-gray-600 dark:text-gray-400'
  if (val <= 120) return 'text-yellow-600 dark:text-yellow-400'
  if (val <= 150) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
}

const INDEX_BG = (val) => {
  if (val <= 90) return 'bg-green-100 dark:bg-green-900/30'
  if (val <= 105) return 'bg-gray-100 dark:bg-gray-700'
  if (val <= 120) return 'bg-yellow-100 dark:bg-yellow-900/30'
  if (val <= 150) return 'bg-orange-100 dark:bg-orange-900/30'
  return 'bg-red-100 dark:bg-red-900/30'
}

export default function CostOfLiving() {
  const [cityA, setCityA] = useState('')
  const [cityB, setCityB] = useState('')
  const [currentSalary, setCurrentSalary] = useState('')
  const [regionFilter, setRegionFilter] = useState('all')
  const [baseFilter, setBaseFilter] = useState(false)
  const [sortBy, setSortBy] = useState('overallIndex')

  const filteredCities = useMemo(() => {
    let list = [...COST_OF_LIVING_CITIES]
    if (regionFilter !== 'all') list = list.filter((c) => c.region === regionFilter)
    if (baseFilter) list = list.filter((c) => c.nearBase)
    list.sort((a, b) => (sortBy === 'city' ? a.city.localeCompare(b.city) : a[sortBy] - b[sortBy]))
    return list
  }, [regionFilter, baseFilter, sortBy])

  const dataA = COST_OF_LIVING_CITIES.find((c) => c.id === cityA)
  const dataB = COST_OF_LIVING_CITIES.find((c) => c.id === cityB)
  const salary = parseFloat(currentSalary) || 0

  // Salary equivalent: if you earn X in city A, you'd need Y in city B to maintain the same standard
  const salaryEquiv = dataA && dataB && salary > 0
    ? Math.round((salary * dataB.overallIndex / dataA.overallIndex) * 100) / 100
    : null

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cost of Living Comparison</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Compare living costs between military and civilian metros — index of 100 = national average
        </p>
      </div>

      {/* Comparison Tool */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Side-by-Side Comparison</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">City A (Current)</label>
            <select
              value={cityA}
              onChange={(e) => setCityA(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
            >
              <option value="">Select city...</option>
              {COST_OF_LIVING_CITIES.map((c) => (
                <option key={c.id} value={c.id}>{c.city}, {c.state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">City B (Moving to)</label>
            <select
              value={cityB}
              onChange={(e) => setCityB(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
            >
              <option value="">Select city...</option>
              {COST_OF_LIVING_CITIES.map((c) => (
                <option key={c.id} value={c.id}>{c.city}, {c.state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Current Annual Salary (optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
                className="w-full pl-7 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                placeholder="55000"
              />
            </div>
          </div>
        </div>

        {/* Comparison Results */}
        {dataA && dataB ? (
          <div className="space-y-4">
            {/* Overall */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">{dataA.city}</p>
                <p className={`text-2xl font-bold ${INDEX_COLOR(dataA.overallIndex)}`}>{dataA.overallIndex}</p>
              </div>
              <div className="p-3 flex flex-col items-center justify-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Difference</p>
                <p className={`text-lg font-bold ${
                  dataB.overallIndex > dataA.overallIndex
                    ? 'text-red-600 dark:text-red-400'
                    : dataB.overallIndex < dataA.overallIndex
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {dataB.overallIndex > dataA.overallIndex ? '+' : ''}{dataB.overallIndex - dataA.overallIndex}
                  <span className="text-sm ml-1">
                    ({dataB.overallIndex > dataA.overallIndex ? '+' : ''}
                    {Math.round((dataB.overallIndex - dataA.overallIndex) / dataA.overallIndex * 100)}%)
                  </span>
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">{dataB.city}</p>
                <p className={`text-2xl font-bold ${INDEX_COLOR(dataB.overallIndex)}`}>{dataB.overallIndex}</p>
              </div>
            </div>

            {/* Category breakdown */}
            <div className="space-y-2">
              {CATEGORIES.map((cat) => {
                const a = dataA[cat]
                const b = dataB[cat]
                const diff = b - a
                return (
                  <div key={cat} className="grid grid-cols-[1fr_80px_60px_80px] sm:grid-cols-[1fr_100px_80px_100px] items-center gap-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{CATEGORY_LABELS[cat]}</span>
                    <span className={`text-sm text-right font-medium ${INDEX_COLOR(a)}`}>{a}</span>
                    <span className={`text-xs text-center font-medium ${
                      diff > 0 ? 'text-red-500' : diff < 0 ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      {diff > 0 ? '+' : ''}{diff}
                    </span>
                    <span className={`text-sm text-right font-medium ${INDEX_COLOR(b)}`}>{b}</span>
                  </div>
                )
              })}
            </div>

            {/* Rent comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Average Rent — {dataA.city}</p>
                <p className="text-sm text-gray-900 dark:text-white">
                  1BR: {formatCurrency(dataA.avgRent1BR)} · 2BR: {formatCurrency(dataA.avgRent2BR)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Average Rent — {dataB.city}</p>
                <p className="text-sm text-gray-900 dark:text-white">
                  1BR: {formatCurrency(dataB.avgRent1BR)} · 2BR: {formatCurrency(dataB.avgRent2BR)}
                </p>
              </div>
            </div>

            {/* Salary equivalent */}
            {salaryEquiv && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  To maintain the same standard of living:
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(salary)} in {dataA.city} ≈ <span className="text-blue-600 dark:text-blue-400">{formatCurrency(salaryEquiv)}</span> in {dataB.city}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {salaryEquiv > salary
                    ? `You'd need ${formatCurrency(salaryEquiv - salary)} more per year`
                    : salaryEquiv < salary
                      ? `You'd save about ${formatCurrency(salary - salaryEquiv)} per year`
                      : 'Roughly the same cost of living'}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 dark:text-gray-500">
            <p>Select two cities above to compare costs</p>
          </div>
        )}
      </div>

      {/* All Cities Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Cities</h2>
          <div className="flex flex-wrap gap-2">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-2 py-1 text-xs bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="all">All Regions</option>
              {Object.entries(REGION_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            <button
              onClick={() => setBaseFilter(!baseFilter)}
              className={`px-2 py-1 text-xs rounded-lg border transition ${
                baseFilter
                  ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'
              }`}
            >
              Near Base Only
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 text-xs bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="overallIndex">Sort: Overall Index</option>
              <option value="city">Sort: City Name</option>
              <option value="housing">Sort: Housing</option>
              <option value="avgRent1BR">Sort: Rent (1BR)</option>
              <option value="medianIncome">Sort: Income</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                <th className="pb-2 pr-3">City</th>
                <th className="pb-2 pr-3 text-right">Overall</th>
                <th className="pb-2 pr-3 text-right hidden sm:table-cell">Housing</th>
                <th className="pb-2 pr-3 text-right hidden md:table-cell">Groceries</th>
                <th className="pb-2 pr-3 text-right">1BR Rent</th>
                <th className="pb-2 text-right hidden lg:table-cell">Med. Income</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-2 pr-3">
                    <p className="font-medium text-gray-900 dark:text-white">{c.city}, {c.state}</p>
                    {c.nearBase && (
                      <p className="text-xs text-blue-600 dark:text-blue-400">{c.nearBase}</p>
                    )}
                  </td>
                  <td className="py-2 pr-3 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${INDEX_BG(c.overallIndex)} ${INDEX_COLOR(c.overallIndex)}`}>
                      {c.overallIndex}
                    </span>
                  </td>
                  <td className={`py-2 pr-3 text-right hidden sm:table-cell ${INDEX_COLOR(c.housing)}`}>{c.housing}</td>
                  <td className={`py-2 pr-3 text-right hidden md:table-cell ${INDEX_COLOR(c.groceries)}`}>{c.groceries}</td>
                  <td className="py-2 pr-3 text-right text-gray-900 dark:text-white">{formatCurrency(c.avgRent1BR)}</td>
                  <td className="py-2 text-right hidden lg:table-cell text-gray-600 dark:text-gray-400">{formatCurrency(c.medianIncome)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          Showing {filteredCities.length} of {COST_OF_LIVING_CITIES.length} cities
        </p>
      </div>

      {/* Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">PCS & Transition Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'BAH Doesn\'t Always Cover It', desc: 'In high-cost areas (San Diego, DC, Honolulu), BAH often falls short of actual rent. Factor this into your budget before PCSing.' },
            { title: 'State Taxes Matter', desc: 'Some states (TX, FL, NV, WA) have no state income tax. This effectively adds 4-10%+ to your take-home pay compared to high-tax states.' },
            { title: 'Look Beyond Base Pay', desc: 'When comparing civilian salaries, factor in healthcare costs (military covers this), housing differences, and retirement benefits.' },
            { title: 'Transition Location Strategy', desc: 'Consider separating at a low-cost base, then job searching remotely. Your savings stretch further while you interview.' },
          ].map((tip) => (
            <div key={tip.title} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{tip.title}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 pb-4">
        Cost of living indexes are approximations based on publicly available data (C2ER, BLS) and may
        not reflect real-time market conditions. Use as a planning guide, not a guarantee.
      </p>
    </div>
  )
}
