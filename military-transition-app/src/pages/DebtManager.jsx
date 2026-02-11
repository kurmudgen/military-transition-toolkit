import { useState, useEffect, useMemo, useCallback } from 'react'
import { getDebtData, saveDebtData, simulatePayoff, generateDebtId } from '../services/debtService'
import { isPredatoryAPR, getAPRRiskLevel } from '../utils/financialValidation'
import { formatCurrency, formatDuration, formatAPR } from '../utils/formatters'
import { useGamification } from '../hooks/useGamification'
import RecommendedPartners from '../components/RecommendedPartners'

const DEBT_TYPES = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'auto_loan', label: 'Auto Loan' },
  { value: 'personal_loan', label: 'Personal Loan' },
  { value: 'student_loan', label: 'Student Loan' },
  { value: 'medical', label: 'Medical' },
  { value: 'other', label: 'Other' },
]

export default function DebtManager() {
  const { awardXP } = useGamification()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: '', type: 'credit_card', balance: '', interestRate: '', minimumPayment: '',
  })

  useEffect(() => {
    async function load() {
      try {
        const d = await getDebtData()
        setData(d)
      } catch { /* offline */ }
      setLoading(false)
    }
    load()
  }, [])

  const save = useCallback(async (updated) => {
    setData(updated)
    setSaving(true)
    try { await saveDebtData(updated) } catch { /* offline */ }
    setSaving(false)
  }, [])

  const debts = data?.debts || []
  const strategy = data?.strategy || 'avalanche'
  const extraPayment = data?.extra_monthly_payment || 0

  const totalBalance = debts.reduce((s, d) => s + d.balance, 0)
  const totalMinPayments = debts.reduce((s, d) => s + d.minimumPayment, 0)

  // Payoff simulations
  const snowball = useMemo(() => simulatePayoff(debts, extraPayment, 'snowball'), [debts, extraPayment])
  const avalanche = useMemo(() => simulatePayoff(debts, extraPayment, 'avalanche'), [debts, extraPayment])
  const current = strategy === 'snowball' ? snowball : avalanche
  const other = strategy === 'snowball' ? avalanche : snowball

  // Predatory debts
  const predatoryDebts = debts.filter((d) => isPredatoryAPR(d.interestRate * 100))

  function resetForm() {
    setForm({ name: '', type: 'credit_card', balance: '', interestRate: '', minimumPayment: '' })
    setEditingId(null)
    setShowForm(false)
  }

  function startEdit(debt) {
    setForm({
      name: debt.name,
      type: debt.type,
      balance: String(debt.balance),
      interestRate: String(Math.round(debt.interestRate * 10000) / 100),
      minimumPayment: String(debt.minimumPayment),
    })
    setEditingId(debt.id)
    setShowForm(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const debt = {
      id: editingId || generateDebtId(),
      name: form.name.trim(),
      type: form.type,
      balance: Number(form.balance) || 0,
      interestRate: (Number(form.interestRate) || 0) / 100,
      minimumPayment: Number(form.minimumPayment) || 0,
    }
    if (!debt.name) return

    const updated = editingId
      ? debts.map((d) => (d.id === editingId ? debt : d))
      : [...debts, debt]
    save({ ...data, debts: updated })
    resetForm()
    if (!editingId) awardXP('debt_added')
  }

  function deleteDebt(id) {
    save({ ...data, debts: debts.filter((d) => d.id !== id) })
  }

  function setStrategy(s) {
    save({ ...data, strategy: s })
  }

  function setExtra(val) {
    save({ ...data, extra_monthly_payment: Math.max(0, Number(val) || 0) })
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Debt Manager</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Track debts, compare payoff strategies, and see the impact of extra payments.
          {saving && <span className="ml-2 text-blue-600 dark:text-blue-400 text-xs">Saving...</span>}
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Debt</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(totalBalance)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Minimums</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalMinPayments)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Debt-Free In</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {debts.length > 0 ? formatDuration(current.totalMonths) : 'N/A'}
          </p>
        </div>
      </div>

      {/* Predatory Alert */}
      {predatoryDebts.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
            Predatory Rate Alert
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300">
            {predatoryDebts.map((d) => d.name).join(', ')} {predatoryDebts.length === 1 ? 'has' : 'have'} an
            APR exceeding the 36% Military Lending Act cap. If this is an active-duty debt, you may have legal protections.
          </p>
          <a href="/app/financial-education" className="text-sm text-red-600 dark:text-red-400 hover:underline mt-1 inline-block">
            Learn about predatory lending protections →
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Debt List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Debts ({debts.length})</h2>
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                + Add Debt
              </button>
            )}
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
                    placeholder="e.g., Chase Visa" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm">
                    {DEBT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Balance ($)</label>
                  <input type="number" value={form.balance} onChange={(e) => setForm({ ...form, balance: e.target.value })}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
                    placeholder="5000" min="0" step="0.01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">APR (%)</label>
                  <input type="number" value={form.interestRate} onChange={(e) => setForm({ ...form, interestRate: e.target.value })}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
                    placeholder="24.99" min="0" max="999" step="0.01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Payment ($)</label>
                  <input type="number" value={form.minimumPayment} onChange={(e) => setForm({ ...form, minimumPayment: e.target.value })}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
                    placeholder="150" min="0" step="1" />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={resetForm} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  {editingId ? 'Update' : 'Add Debt'}
                </button>
              </div>
            </form>
          )}

          {/* Debt Cards */}
          {debts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No debts added yet. Add your debts to see payoff projections.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {debts.map((debt) => {
                const aprPct = Math.round(debt.interestRate * 10000) / 100
                const risk = getAPRRiskLevel(aprPct)
                const riskColors = {
                  low: 'text-green-600 dark:text-green-400',
                  moderate: 'text-yellow-600 dark:text-yellow-400',
                  high: 'text-orange-600 dark:text-orange-400',
                  predatory: 'text-red-600 dark:text-red-400',
                }
                const typeLabel = DEBT_TYPES.find((t) => t.value === debt.type)?.label || debt.type

                return (
                  <div key={debt.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-900 dark:text-white text-sm">{debt.name}</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">{typeLabel}</span>
                        {isPredatoryAPR(aprPct) && (
                          <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded">MLA Alert</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {formatCurrency(debt.balance)} balance ·{' '}
                        <span className={riskColors[risk]}>{formatAPR(aprPct)}</span> ·{' '}
                        {formatCurrency(debt.minimumPayment)}/mo min
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => startEdit(debt)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                      <button onClick={() => deleteDebt(debt.id)} className="text-sm text-red-600 dark:text-red-400 hover:underline">Delete</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right: Strategy Panel */}
        <div className="space-y-4">
          {/* Extra Payment */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Extra Monthly Payment</h3>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                value={extraPayment || ''}
                onChange={(e) => setExtra(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-7 pr-3 py-2 text-sm"
                placeholder="0"
                min="0"
                max="10000"
                step="25"
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="25"
              value={extraPayment}
              onChange={(e) => setExtra(e.target.value)}
              className="w-full accent-blue-600"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Beyond your {formatCurrency(totalMinPayments)}/mo minimums
            </p>
          </div>

          {/* Strategy Toggle */}
          {debts.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Payoff Strategy</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setStrategy('avalanche')}
                  className={`p-3 rounded-lg border-2 text-left ${
                    strategy === 'avalanche'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Avalanche</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Highest rate first</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Saves the most $</p>
                </button>
                <button
                  onClick={() => setStrategy('snowball')}
                  className={`p-3 rounded-lg border-2 text-left ${
                    strategy === 'snowball'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Snowball</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Lowest balance first</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Quick wins</p>
                </button>
              </div>

              {/* Comparison */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Time to debt-free</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatDuration(current.totalMonths)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Total interest</span>
                  <span className="font-medium text-red-600 dark:text-red-400">{formatCurrency(current.totalInterestPaid)}</span>
                </div>
                {Math.abs(avalanche.totalInterestPaid - snowball.totalInterestPaid) > 1 && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-green-600 dark:text-green-400">
                      {avalanche.totalInterestPaid < snowball.totalInterestPaid
                        ? `Avalanche saves ${formatCurrency(snowball.totalInterestPaid - avalanche.totalInterestPaid)} in interest`
                        : `Snowball pays off first debt sooner`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payoff Order */}
          {debts.length > 0 && current.order.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Payoff Order</h3>
              <ol className="space-y-2">
                {current.order.map((item, idx) => (
                  <li key={item.debtId} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">{item.debtName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Paid off in {formatDuration(item.payoffMonth)} · {formatCurrency(item.interestPaid)} interest
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Resources */}
      <RecommendedPartners context="debt" limit={3} />

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <span className="font-semibold">Disclaimer:</span> Payoff projections are estimates assuming fixed rates and consistent payments.
          Actual results may vary based on rate changes, fees, and payment timing.
        </p>
      </div>
    </div>
  )
}
