import { useState, useEffect, useCallback } from 'react'
import { getSavingsData, saveSavingsData, GOAL_TEMPLATES, generateGoalId } from '../services/savingsService'
import { calculateEmergencyFundTarget, calculateEmergencyFundMonths, calculateTimeToGoal } from '../utils/financialCalculations'
import { getEmergencyFundStatus } from '../utils/financialValidation'
import { formatCurrency, formatDuration, formatGoalProgress } from '../utils/formatters'

const TYPE_LABELS = {
  emergency: 'Emergency',
  pcs: 'PCS Move',
  security_deposit: 'Security Deposit',
  vehicle: 'Vehicle',
  education: 'Education',
  wedding: 'Wedding',
  travel: 'Travel',
  custom: 'Custom',
}

const STATUS_STYLES = {
  none: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'No Fund' },
  minimal: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'Minimal' },
  building: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', label: 'Building' },
  adequate: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Adequate' },
  strong: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', label: 'Strong' },
}

export default function SavingsGoals() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [showTemplates, setShowTemplates] = useState(false)

  // Goal form state
  const [goalForm, setGoalForm] = useState({
    name: '', type: 'custom', targetAmount: '', currentAmount: '', monthlyContribution: '', targetDate: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const result = await getSavingsData()
    setData(result)
    setLoading(false)
  }

  const persist = useCallback(async (newData) => {
    setData(newData)
    setSaving(true)
    try {
      await saveSavingsData(newData)
    } catch (e) {
      console.error('Save failed:', e)
    }
    setSaving(false)
  }, [])

  // ─── Emergency Fund Handlers ───────────────────────────────────────

  function updateEmergencyFund(field, value) {
    const num = parseFloat(value) || 0
    const updated = { ...data, emergency_fund: { ...data.emergency_fund, [field]: num } }
    persist(updated)
  }

  // ─── Goal Handlers ─────────────────────────────────────────────────

  function resetGoalForm() {
    setGoalForm({ name: '', type: 'custom', targetAmount: '', currentAmount: '', monthlyContribution: '', targetDate: '' })
    setEditingGoal(null)
    setShowAddGoal(false)
    setShowTemplates(false)
  }

  function startEditGoal(goal) {
    setGoalForm({
      name: goal.name,
      type: goal.type,
      targetAmount: String(goal.targetAmount),
      currentAmount: String(goal.currentAmount),
      monthlyContribution: String(goal.monthlyContribution),
      targetDate: goal.targetDate || '',
    })
    setEditingGoal(goal.id)
    setShowAddGoal(true)
    setShowTemplates(false)
  }

  function useTemplate(template) {
    setGoalForm({
      name: template.name,
      type: template.type,
      targetAmount: String(template.suggestedAmount),
      currentAmount: '0',
      monthlyContribution: '',
      targetDate: '',
    })
    setShowTemplates(false)
    setShowAddGoal(true)
  }

  function saveGoal() {
    const name = goalForm.name.trim()
    if (!name) return
    const target = parseFloat(goalForm.targetAmount) || 0
    if (target <= 0) return

    const goalData = {
      id: editingGoal || generateGoalId(),
      name,
      type: goalForm.type,
      targetAmount: target,
      currentAmount: parseFloat(goalForm.currentAmount) || 0,
      monthlyContribution: parseFloat(goalForm.monthlyContribution) || 0,
      targetDate: goalForm.targetDate || undefined,
      createdAt: editingGoal
        ? data.goals.find((g) => g.id === editingGoal)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    }

    let newGoals
    if (editingGoal) {
      newGoals = data.goals.map((g) => (g.id === editingGoal ? goalData : g))
    } else {
      newGoals = [...data.goals, goalData]
    }

    persist({ ...data, goals: newGoals })
    resetGoalForm()
  }

  function deleteGoal(id) {
    persist({ ...data, goals: data.goals.filter((g) => g.id !== id) })
  }

  function updateGoalAmount(id, amount) {
    const num = parseFloat(amount) || 0
    const newGoals = data.goals.map((g) => (g.id === id ? { ...g, currentAmount: num } : g))
    persist({ ...data, goals: newGoals })
  }

  // ─── Computed Values ───────────────────────────────────────────────

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  const ef = data.emergency_fund
  const efTarget = calculateEmergencyFundTarget(ef.monthlyExpenses, ef.targetMonths)
  const efMonths = calculateEmergencyFundMonths(ef.currentBalance, ef.monthlyExpenses)
  const efStatus = getEmergencyFundStatus(efMonths)
  const efStyle = STATUS_STYLES[efStatus]
  const efPct = efTarget > 0 ? Math.min(100, Math.round((ef.currentBalance / efTarget) * 100)) : 0
  const efTimeToGoal = ef.monthlyContribution > 0 && efTarget > ef.currentBalance
    ? calculateTimeToGoal(efTarget, ef.currentBalance, ef.monthlyContribution)
    : null

  const totalSaved = data.goals.reduce((s, g) => s + g.currentAmount, 0) + ef.currentBalance
  const totalTargets = data.goals.reduce((s, g) => s + g.targetAmount, 0) + efTarget

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Savings Goals</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your emergency fund and savings goals
          </p>
        </div>
        {saving && (
          <span className="text-xs text-blue-600 dark:text-blue-400 animate-pulse">Saving...</span>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Saved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {formatCurrency(totalSaved)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Goals</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {formatCurrency(totalTargets)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Overall Progress</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {totalTargets > 0 ? `${Math.min(100, Math.round((totalSaved / totalTargets) * 100))}%` : '0%'}
          </p>
        </div>
      </div>

      {/* ─── Emergency Fund Section ─────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Emergency Fund</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${efStyle.bg} ${efStyle.text}`}>
            {efStyle.label}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">
              {formatCurrency(ef.currentBalance)} of {formatCurrency(efTarget)}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">{efPct}%</span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                efStatus === 'strong' ? 'bg-green-500' :
                efStatus === 'adequate' ? 'bg-blue-500' :
                efStatus === 'building' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${efPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{efMonths.toFixed(1)} months of expenses covered</span>
            {efTimeToGoal && efTimeToGoal !== Infinity && (
              <span>Goal reached in {formatDuration(efTimeToGoal)}</span>
            )}
          </div>
        </div>

        {/* Emergency fund inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Current Balance
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="100"
                value={ef.currentBalance || ''}
                onChange={(e) => updateEmergencyFund('currentBalance', e.target.value)}
                className="w-full pl-7 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Monthly Expenses
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="100"
                value={ef.monthlyExpenses || ''}
                onChange={(e) => updateEmergencyFund('monthlyExpenses', e.target.value)}
                className="w-full pl-7 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Target Months
            </label>
            <select
              value={ef.targetMonths}
              onChange={(e) => updateEmergencyFund('targetMonths', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
            >
              <option value={3}>3 months</option>
              <option value={6}>6 months (recommended)</option>
              <option value={9}>9 months</option>
              <option value={12}>12 months</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Monthly Contribution
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="25"
                value={ef.monthlyContribution || ''}
                onChange={(e) => updateEmergencyFund('monthlyContribution', e.target.value)}
                className="w-full pl-7 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Tip */}
        {efStatus !== 'strong' && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Tip:</strong>{' '}
              {efStatus === 'none' && 'Start with a $1,000 starter fund, then build toward 3-6 months of expenses. Even $50/month adds up.'}
              {efStatus === 'minimal' && 'Great start! Keep building. Consider automating transfers on payday to reach your goal faster.'}
              {efStatus === 'building' && 'You\'re making solid progress. Service members transitioning should aim for 6+ months as a safety net during job searches.'}
              {efStatus === 'adequate' && 'Strong foundation! Consider bumping to 6 months if you\'re transitioning soon — civilian job searches can take 3-6 months.'}
            </p>
          </div>
        )}
      </div>

      {/* ─── Savings Goals Section ──────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Goals ({data.goals.length})
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Templates
            </button>
            <button
              onClick={() => { setShowAddGoal(true); setShowTemplates(false); setEditingGoal(null); setGoalForm({ name: '', type: 'custom', targetAmount: '', currentAmount: '0', monthlyContribution: '', targetDate: '' }) }}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + Add Goal
            </button>
          </div>
        </div>

        {/* Templates */}
        {showTemplates && (
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick-Start Templates</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {GOAL_TEMPLATES.map((t) => (
                <button
                  key={t.type}
                  onClick={() => useTemplate(t)}
                  className="text-left p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(t.suggestedAmount)}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddGoal && (
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {editingGoal ? 'Edit Goal' : 'New Goal'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Goal Name</label>
                <input
                  type="text"
                  value={goalForm.name}
                  onChange={(e) => setGoalForm({ ...goalForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                  placeholder="e.g., Car Down Payment"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Type</label>
                <select
                  value={goalForm.type}
                  onChange={(e) => setGoalForm({ ...goalForm, type: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                >
                  {Object.entries(TYPE_LABELS).filter(([k]) => k !== 'emergency').map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Target Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={goalForm.targetAmount}
                    onChange={(e) => setGoalForm({ ...goalForm, targetAmount: e.target.value })}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                    placeholder="5000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Amount Saved</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={goalForm.currentAmount}
                    onChange={(e) => setGoalForm({ ...goalForm, currentAmount: e.target.value })}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Monthly Contribution</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="25"
                    value={goalForm.monthlyContribution}
                    onChange={(e) => setGoalForm({ ...goalForm, monthlyContribution: e.target.value })}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                    placeholder="200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Target Date (optional)</label>
                <input
                  type="date"
                  value={goalForm.targetDate}
                  onChange={(e) => setGoalForm({ ...goalForm, targetDate: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={resetGoalForm}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveGoal}
                disabled={!goalForm.name.trim() || !(parseFloat(goalForm.targetAmount) > 0)}
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {editingGoal ? 'Update' : 'Add'} Goal
              </button>
            </div>
          </div>
        )}

        {/* Goals List */}
        {data.goals.length === 0 ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500">
            <p className="text-lg mb-1">No savings goals yet</p>
            <p className="text-sm">Add a goal or start from a template above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.goals.map((goal) => {
              const pct = goal.targetAmount > 0
                ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
                : 0
              const remaining = Math.max(0, goal.targetAmount - goal.currentAmount)
              const monthsToGoal = goal.monthlyContribution > 0
                ? calculateTimeToGoal(goal.targetAmount, goal.currentAmount, goal.monthlyContribution)
                : null
              const isComplete = goal.currentAmount >= goal.targetAmount

              return (
                <div
                  key={goal.id}
                  className={`p-4 rounded-lg border transition ${
                    isComplete
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {goal.name}
                          {isComplete && <span className="ml-2 text-green-600 dark:text-green-400">&#10003;</span>}
                        </h3>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                          {TYPE_LABELS[goal.type] || 'Custom'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {formatGoalProgress(goal.currentAmount, goal.targetAmount)}
                        {remaining > 0 && ` — ${formatCurrency(remaining)} remaining`}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEditGoal(goal)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-2">
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isComplete ? 'bg-green-500' : pct >= 75 ? 'bg-blue-500' : pct >= 50 ? 'bg-blue-400' : 'bg-blue-300'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick-update and timeline */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500 dark:text-gray-400">Update saved:</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                        <input
                          type="number"
                          min="0"
                          step="50"
                          value={goal.currentAmount || ''}
                          onChange={(e) => updateGoalAmount(goal.id, e.target.value)}
                          className="w-28 pl-5 pr-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {isComplete
                        ? 'Goal reached!'
                        : monthsToGoal && monthsToGoal !== Infinity
                          ? `~${formatDuration(monthsToGoal)} to go`
                          : goal.monthlyContribution <= 0
                            ? 'Set a monthly contribution'
                            : ''}
                      {goal.targetDate && !isComplete && (
                        <span className="ml-2">
                          (target: {new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ─── Tips Section ───────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Savings Tips for Service Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Automate Savings', desc: 'Set up allotments through myPay to automatically direct money to savings before you can spend it.' },
            { title: 'PCS Fund', desc: 'Start saving 6-12 months before a PCS. DLA helps, but out-of-pocket costs often exceed it.' },
            { title: 'Deploy & Save', desc: 'Deployments reduce expenses significantly. Maximize TSP contributions and save combat zone tax-free income.' },
            { title: 'Transition Buffer', desc: 'Build 6+ months of expenses before separating. Terminal leave gives you runway, but civilian job searches can take time.' },
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
        This tool is for planning purposes only. Consult a financial advisor for personalized guidance.
        Visit your installation's Financial Readiness Program for free counseling.
      </p>
    </div>
  )
}
