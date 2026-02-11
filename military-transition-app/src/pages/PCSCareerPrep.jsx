import { useState, useEffect, useMemo } from 'react'
import {
  PCS_CHECKLIST_ITEMS,
  TIMEFRAME_LABELS,
  CATEGORY_LABELS,
  getTimeframes,
} from '../data/pcsChecklistData'
import {
  getPCSChecklistProgress,
  togglePCSChecklistItem,
} from '../services/pcsChecklistService'
import { useGamification } from '../hooks/useGamification'

export default function PCSCareerPrep() {
  const { awardXP } = useGamification()
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [spouseFilter, setSpouseFilter] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [expandedTimeframe, setExpandedTimeframe] = useState(null)

  const timeframes = getTimeframes()

  useEffect(() => {
    async function load() {
      try {
        const data = await getPCSChecklistProgress()
        setProgress(data)
      } catch {
        // Not logged in or table doesn't exist
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleToggle(itemId) {
    const wasChecked = progress[itemId]
    const prev = { ...progress }
    // Optimistic update
    setProgress((p) => ({ ...p, [itemId]: !p[itemId] }))
    try {
      await togglePCSChecklistItem(itemId, prev)
    } catch {
      // Revert on failure
      setProgress(prev)
    }
    if (!wasChecked) awardXP('pcs_checklist_item')
  }

  // Filtered items per timeframe
  const itemsByTimeframe = useMemo(() => {
    const map = {}
    for (const tf of timeframes) {
      let items = PCS_CHECKLIST_ITEMS.filter((item) => item.timeframe === tf)
      if (spouseFilter) {
        items = items.filter((item) => item.spouseRelevant)
      }
      if (categoryFilter) {
        items = items.filter((item) => item.category === categoryFilter)
      }
      map[tf] = items
    }
    return map
  }, [spouseFilter, categoryFilter, timeframes])

  // Stats
  const totalItems = useMemo(() => {
    let count = 0
    for (const tf of timeframes) count += itemsByTimeframe[tf].length
    return count
  }, [itemsByTimeframe, timeframes])

  const completedItems = useMemo(() => {
    let count = 0
    for (const tf of timeframes) {
      for (const item of itemsByTimeframe[tf]) {
        if (progress[item.id]) count++
      }
    }
    return count
  }, [progress, itemsByTimeframe, timeframes])

  const overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PCS Career Prep</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Timeline-based checklist for career preparation during your PCS move. Track licensing, job search, networking, and benefits tasks.
        </p>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-blue-100">Overall Progress</span>
          <span className="text-sm text-blue-100">
            {completedItems} / {totalItems} tasks
          </span>
        </div>
        <div className="w-full bg-blue-800/50 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-2xl font-bold mt-2">{overallProgress}% Complete</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSpouseFilter(!spouseFilter)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  spouseFilter ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                role="switch"
                aria-checked={spouseFilter}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    spouseFilter ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Spouse-relevant only
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Sections */}
      <div className="space-y-4">
        {timeframes.map((tf) => {
          const items = itemsByTimeframe[tf]
          const tfCompleted = items.filter((item) => progress[item.id]).length
          const tfTotal = items.length
          const isExpanded = expandedTimeframe === null || expandedTimeframe === tf

          if (tfTotal === 0) return null

          return (
            <div key={tf} className="bg-white dark:bg-gray-800 rounded-lg shadow">
              {/* Timeframe Header */}
              <button
                onClick={() =>
                  setExpandedTimeframe(expandedTimeframe === tf ? null : tf)
                }
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors rounded-t-lg"
              >
                <div className="flex items-center gap-3">
                  <TimeframeIcon timeframe={tf} />
                  <div className="text-left">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                      {TIMEFRAME_LABELS[tf]}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tfCompleted} / {tfTotal} completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${tfTotal > 0 ? (tfCompleted / tfTotal) * 100 : 0}%` }}
                    />
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Items */}
              {isExpanded && (
                <div className="border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                  {items.map((item) => (
                    <ChecklistItem
                      key={item.id}
                      item={item}
                      checked={!!progress[item.id]}
                      onToggle={() => handleToggle(item.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <span className="font-semibold">Note:</span> This checklist covers career-specific PCS tasks.
          For full PCS preparation (housing, transportation, medical, school enrollment, etc.),
          see your installation&apos;s Relocation Assistance Program and PCS planning guide.
        </p>
      </div>
    </div>
  )
}

// ─── Checklist Item ───────────────────────────────────────────────

function ChecklistItem({ item, checked, onToggle }) {
  const [expanded, setExpanded] = useState(false)

  const priorityColors = {
    critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    important: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    recommended: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
  }

  return (
    <div className="px-4 py-3">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-0.5 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-medium ${
                checked
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {item.text}
            </span>
            <span className={`text-xs px-1.5 py-0.5 rounded capitalize ${priorityColors[item.priority]}`}>
              {item.priority}
            </span>
            {item.spouseRelevant && (
              <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-1.5 py-0.5 rounded">
                Spouse
              </span>
            )}
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
              {CATEGORY_LABELS[item.category]}
            </span>
          </div>

          {/* Expandable details */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
          >
            {expanded ? 'Hide details' : 'Show details'}
          </button>

          {expanded && (
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              {item.resources.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Resources: </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {item.resources.join(' · ')}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Timeframe Icon ───────────────────────────────────────────────

function TimeframeIcon({ timeframe }) {
  const colors = {
    '6-months-before': 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    '3-months-before': 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    '1-month-before': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    'during-move': 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    'first-30-days': 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  }

  const icons = {
    '6-months-before': '6M',
    '3-months-before': '3M',
    '1-month-before': '1M',
    'during-move': 'GO',
    'first-30-days': '30D',
  }

  return (
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${colors[timeframe]}`}>
      {icons[timeframe]}
    </div>
  )
}
