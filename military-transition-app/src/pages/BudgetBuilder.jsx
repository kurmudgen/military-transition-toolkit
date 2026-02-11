import { useState, useEffect, useMemo, useCallback } from 'react'
import { getBudget, saveBudget, DEFAULT_CATEGORIES, generateCategoryId } from '../services/budgetService'
import { calculate503020, calculateBudgetVariance } from '../utils/financialCalculations'
import { formatCurrency, formatChangeIndicator } from '../utils/formatters'
import { useGamification } from '../hooks/useGamification'
import RecommendedPartners from '../components/RecommendedPartners'

export default function BudgetBuilder() {
  const { awardXP } = useGamification()
  const [budget, setBudget] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCat, setNewCat] = useState({ name: '', type: 'need' })

  useEffect(() => {
    async function load() {
      try {
        const data = await getBudget()
        setBudget(data)
      } catch {
        // offline
      }
      setLoading(false)
    }
    load()
  }, [])

  const currentMonth = budget?.current_month
  const income = currentMonth?.income || 0
  const categories = currentMonth?.categories || []

  const save = useCallback(async (updated) => {
    setBudget(updated)
    setSaving(true)
    try {
      await saveBudget(updated)
    } catch {
      // offline fallback
    }
    setSaving(false)
  }, [])

  function updateIncome(value) {
    const val = Math.max(0, Number(value) || 0)
    const wasZero = income === 0
    save({ ...budget, current_month: { ...currentMonth, income: val } })
    if (wasZero && val > 0) awardXP('budget_created')
  }

  function updateCategory(id, field, value) {
    const val = Math.max(0, Number(value) || 0)
    const updated = categories.map((c) =>
      c.id === id ? { ...c, [field]: val } : c
    )
    save({ ...budget, current_month: { ...currentMonth, categories: updated } })
  }

  function addCategory() {
    if (!newCat.name.trim()) return
    const cat = {
      id: generateCategoryId(),
      name: newCat.name.trim(),
      type: newCat.type,
      planned: 0,
      actual: 0,
    }
    save({
      ...budget,
      current_month: { ...currentMonth, categories: [...categories, cat] },
    })
    setNewCat({ name: '', type: 'need' })
    setShowAddForm(false)
  }

  function deleteCategory(id) {
    save({
      ...budget,
      current_month: {
        ...currentMonth,
        categories: categories.filter((c) => c.id !== id),
      },
    })
  }

  // Navigate months
  function navigateMonth(direction) {
    const [y, m] = currentMonth.month.split('-').map(Number)
    const d = new Date(y, m - 1 + direction, 1)
    const newMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`

    // Check history for this month
    const existing = budget.history.find((h) => h.month === newMonth)
    if (existing) {
      // Save current to history and load existing
      const historyWithout = budget.history.filter((h) => h.month !== newMonth)
      const historyWithCurrent = [...historyWithout, currentMonth]
      save({
        ...budget,
        current_month: existing,
        history: historyWithCurrent,
      })
    } else {
      // Save current to history and create new month
      save({
        ...budget,
        current_month: {
          month: newMonth,
          income: currentMonth.income,
          categories: currentMonth.categories.map((c) => ({
            ...c,
            actual: 0,
          })),
        },
        history: [...budget.history, currentMonth],
      })
    }
  }

  function copyLastMonth() {
    if (budget.history.length === 0) return
    const last = budget.history[budget.history.length - 1]
    save({
      ...budget,
      current_month: {
        ...currentMonth,
        income: last.income,
        categories: last.categories.map((c) => ({
          ...c,
          actual: 0,
        })),
      },
    })
  }

  // 50/30/20 analysis
  const analysis = useMemo(() => {
    if (!income || income <= 0) return null
    const target = calculate503020(income)
    const needs = categories.filter((c) => c.type === 'need')
    const wants = categories.filter((c) => c.type === 'want')
    const savings = categories.filter((c) => c.type === 'saving')

    const actualNeeds = needs.reduce((s, c) => s + c.actual, 0)
    const actualWants = wants.reduce((s, c) => s + c.actual, 0)
    const actualSavings = savings.reduce((s, c) => s + c.actual, 0)
    const plannedNeeds = needs.reduce((s, c) => s + c.planned, 0)
    const plannedWants = wants.reduce((s, c) => s + c.planned, 0)
    const plannedSavings = savings.reduce((s, c) => s + c.planned, 0)

    return {
      target,
      actual: { needs: actualNeeds, wants: actualWants, savings: actualSavings },
      planned: { needs: plannedNeeds, wants: plannedWants, savings: plannedSavings },
    }
  }, [income, categories])

  // Budget health
  const health = useMemo(() => {
    const totalPlanned = categories.reduce((s, c) => s + c.planned, 0)
    const totalActual = categories.reduce((s, c) => s + c.actual, 0)

    let plannedStatus = 'on-track'
    if (income > 0 && totalPlanned > income) plannedStatus = 'over-allocated'
    else if (income > 0 && totalPlanned < income * 0.8) plannedStatus = 'under-allocated'

    let actualStatus = 'on-track'
    if (income > 0 && totalActual > income) actualStatus = 'over-budget'
    else if (income > 0 && totalActual > income * 0.95) actualStatus = 'watch'

    return { totalPlanned, totalActual, plannedStatus, actualStatus }
  }, [income, categories])

  // Previous month for comparison
  const prevMonth = budget?.history?.length > 0
    ? budget.history[budget.history.length - 1]
    : null

  if (loading || !budget) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  const monthLabel = formatMonthLabel(currentMonth.month)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Budget Builder</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Plan and track your monthly spending using the 50/30/20 framework.
          {saving && <span className="ml-2 text-blue-600 dark:text-blue-400 text-xs">Saving...</span>}
        </p>
      </div>

      {/* Month Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center">
        <button onClick={() => navigateMonth(-1)} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{monthLabel}</h2>
          {budget.history.length > 0 && (
            <button onClick={copyLastMonth} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              Copy last month&apos;s plan
            </button>
          )}
        </div>
        <button onClick={() => navigateMonth(1)} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Income Input */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Monthly Take-Home Income
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">$</span>
          <input
            type="number"
            value={income || ''}
            onChange={(e) => updateIncome(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-7 pr-3 py-2 text-sm"
            placeholder="0.00"
            min="0"
            step="100"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Use your net pay from the Pay Calculator, or enter your take-home amount.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Category List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Needs */}
          <CategoryGroup
            label="Needs (50%)"
            type="need"
            categories={categories}
            prevMonth={prevMonth}
            onUpdate={updateCategory}
            onDelete={deleteCategory}
            color="blue"
          />
          {/* Wants */}
          <CategoryGroup
            label="Wants (30%)"
            type="want"
            categories={categories}
            prevMonth={prevMonth}
            onUpdate={updateCategory}
            onDelete={deleteCategory}
            color="purple"
          />
          {/* Savings */}
          <CategoryGroup
            label="Savings (20%)"
            type="saving"
            categories={categories}
            prevMonth={prevMonth}
            onUpdate={updateCategory}
            onDelete={deleteCategory}
            color="green"
          />

          {/* Add Category */}
          {showAddForm ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
              <input
                type="text"
                value={newCat.name}
                onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                placeholder="Category name..."
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
                onKeyDown={(e) => { if (e.key === 'Enter') addCategory() }}
              />
              <div className="flex gap-2">
                {['need', 'want', 'saving'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setNewCat({ ...newCat, type: t })}
                    className={`px-3 py-1 rounded text-xs font-medium capitalize ${
                      newCat.type === t
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {t === 'saving' ? 'savings' : t}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAddForm(false)} className="text-sm text-gray-500 dark:text-gray-400">Cancel</button>
                <button onClick={addCategory} className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm">Add</button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              + Add Custom Category
            </button>
          )}
        </div>

        {/* Right: Analysis Panel */}
        <div className="space-y-4">
          {/* Budget Health */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Budget Health</h3>
            <HealthRow
              label="Planned vs Income"
              amount={health.totalPlanned}
              income={income}
              status={health.plannedStatus}
            />
            <HealthRow
              label="Actual vs Income"
              amount={health.totalActual}
              income={income}
              status={health.actualStatus}
            />
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">Remaining</span>
                <span className={`font-mono font-medium ${
                  income - health.totalActual >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {formatCurrency(income - health.totalActual)}
                </span>
              </div>
            </div>
          </div>

          {/* 50/30/20 Analysis */}
          {analysis && income > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">50/30/20 Analysis</h3>
              <SplitBar
                label="Needs (50%)"
                target={analysis.target.needs}
                actual={analysis.actual.needs}
                income={income}
                color="blue"
              />
              <SplitBar
                label="Wants (30%)"
                target={analysis.target.wants}
                actual={analysis.actual.wants}
                income={income}
                color="purple"
              />
              <SplitBar
                label="Savings (20%)"
                target={analysis.target.savings}
                actual={analysis.actual.savings}
                income={income}
                color="green"
              />
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">50/30/20 Rule</h4>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Allocate 50% of take-home pay to needs (housing, food, insurance), 30% to wants (entertainment, dining), and 20% to savings and extra debt payments. Military members often have lower needs due to BAH and BAS.
            </p>
          </div>

          {/* Recommended Resources */}
          <RecommendedPartners context="budget" limit={3} />
        </div>
      </div>
    </div>
  )
}

// ─── Category Group ───────────────────────────────────────────────

function CategoryGroup({ label, type, categories, prevMonth, onUpdate, onDelete, color }) {
  const items = categories.filter((c) => c.type === type)
  const total = items.reduce((s, c) => s + c.actual, 0)
  const totalPlanned = items.reduce((s, c) => s + c.planned, 0)

  const colors = {
    blue: 'border-l-blue-500',
    purple: 'border-l-purple-500',
    green: 'border-l-green-500',
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow border-l-4 ${colors[color]}`}>
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{label}</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatCurrency(total)} actual / {formatCurrency(totalPlanned)} planned
        </span>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {items.map((cat) => {
          const prevCat = prevMonth?.categories?.find((c) => c.id === cat.id)
          const change = prevCat ? formatChangeIndicator(cat.actual, prevCat.actual) : null
          const variance = calculateBudgetVariance(cat.planned, cat.actual)

          return (
            <div key={cat.id} className="px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <span className="text-sm text-gray-900 dark:text-white">{cat.name}</span>
                {change && change !== '→ 0%' && (
                  <span className={`ml-2 text-xs ${change.startsWith('↑') ? 'text-red-500' : 'text-green-500'}`}>
                    {change} vs last
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24">
                  <input
                    type="number"
                    value={cat.planned || ''}
                    onChange={(e) => onUpdate(cat.id, 'planned', e.target.value)}
                    className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 text-xs text-right"
                    placeholder="Plan"
                    min="0"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    value={cat.actual || ''}
                    onChange={(e) => onUpdate(cat.id, 'actual', e.target.value)}
                    className={`w-full rounded border px-2 py-1 text-xs text-right ${
                      variance < 0
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="Actual"
                    min="0"
                  />
                </div>
                <button
                  onClick={() => onDelete(cat.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete category"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
        {items.length === 0 && (
          <p className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500">No categories</p>
        )}
      </div>
    </div>
  )
}

// ─── Health Row ───────────────────────────────────────────────────

function HealthRow({ label, amount, income, status }) {
  const statusConfig = {
    'on-track': { text: 'On Track', color: 'text-green-600 dark:text-green-400' },
    'watch': { text: 'Watch Spending', color: 'text-yellow-600 dark:text-yellow-400' },
    'over-budget': { text: 'Over Budget', color: 'text-red-600 dark:text-red-400' },
    'over-allocated': { text: 'Over-Allocated', color: 'text-red-600 dark:text-red-400' },
    'under-allocated': { text: 'Under-Allocated', color: 'text-yellow-600 dark:text-yellow-400' },
  }

  const config = statusConfig[status] || statusConfig['on-track']

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className={config.color}>{config.text}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            status === 'over-budget' || status === 'over-allocated'
              ? 'bg-red-500'
              : status === 'watch' || status === 'under-allocated'
              ? 'bg-yellow-500'
              : 'bg-green-500'
          }`}
          style={{ width: `${income > 0 ? Math.min(100, (amount / income) * 100) : 0}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
        {formatCurrency(amount)} / {formatCurrency(income)}
      </p>
    </div>
  )
}

// ─── 50/30/20 Split Bar ──────────────────────────────────────────

function SplitBar({ label, target, actual, income, color }) {
  const pct = income > 0 ? Math.round((actual / income) * 100) : 0
  const targetPct = income > 0 ? Math.round((target / income) * 100) : 0
  const overTarget = actual > target

  const barColors = {
    blue: overTarget ? 'bg-red-500' : 'bg-blue-500',
    purple: overTarget ? 'bg-red-500' : 'bg-purple-500',
    green: actual < target ? 'bg-yellow-500' : 'bg-green-500',
  }

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className={overTarget && color !== 'green' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}>
          {pct}% / {targetPct}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${barColors[color]}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
        {formatCurrency(actual)} actual / {formatCurrency(target)} target
      </p>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────

function formatMonthLabel(monthStr) {
  const [y, m] = monthStr.split('-').map(Number)
  const d = new Date(y, m - 1, 1)
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(d)
}
