/**
 * Debt Service
 *
 * Supabase persistence for debt tracking.
 * Table: debt_tracking (user_id, debts, extra_monthly_payment, strategy, history)
 */

import { supabase, getCurrentUser } from '../lib/supabase'

export interface Debt {
  id: string
  name: string
  type: 'credit_card' | 'auto_loan' | 'personal_loan' | 'student_loan' | 'medical' | 'other'
  balance: number       // dollars
  interestRate: number  // decimal (0.2499 = 24.99%)
  minimumPayment: number // dollars
  dueDate?: number      // day of month
}

export interface DebtSnapshot {
  date: string
  totalBalance: number
  debtCount: number
}

export interface DebtData {
  debts: Debt[]
  extra_monthly_payment: number // dollars
  strategy: 'snowball' | 'avalanche'
  history: DebtSnapshot[]
}

function createDefaultDebtData(): DebtData {
  return {
    debts: [],
    extra_monthly_payment: 0,
    strategy: 'avalanche',
    history: [],
  }
}

export async function getDebtData(): Promise<DebtData> {
  const user = await getCurrentUser()
  if (!user || !supabase) return createDefaultDebtData()

  const { data, error } = await supabase
    .from('debt_tracking')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return createDefaultDebtData()
    console.error('Error fetching debt data:', error)
    return createDefaultDebtData()
  }

  return {
    debts: data.debts || [],
    extra_monthly_payment: data.extra_monthly_payment || 0,
    strategy: data.strategy || 'avalanche',
    history: data.history || [],
  }
}

export async function saveDebtData(debtData: DebtData): Promise<void> {
  const user = await getCurrentUser()
  if (!user || !supabase) throw new Error('No authenticated user')

  // Input validation: reject negative / unreasonable values
  for (const debt of debtData.debts) {
    if (debt.balance < 0) throw new Error('Debt balance cannot be negative')
    if (debt.interestRate < 0 || debt.interestRate > 1) throw new Error('Interest rate must be between 0 and 1')
    if (debt.minimumPayment < 0) throw new Error('Minimum payment cannot be negative')
  }
  if (debtData.extra_monthly_payment < 0) throw new Error('Extra payment cannot be negative')

  const { error } = await supabase
    .from('debt_tracking')
    .upsert(
      {
        user_id: user.id,
        debts: debtData.debts,
        extra_monthly_payment: debtData.extra_monthly_payment,
        strategy: debtData.strategy,
        history: debtData.history,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error saving debt data:', error)
    throw error
  }
}

/**
 * Simulate payoff order using snowball (lowest balance) or avalanche (highest rate).
 * Returns ordered list of debts with projected payoff month and total interest.
 */
export interface PayoffResult {
  debtId: string
  debtName: string
  payoffMonth: number
  interestPaid: number
}

export interface PayoffSummary {
  order: PayoffResult[]
  totalMonths: number
  totalInterestPaid: number
}

export function simulatePayoff(
  debts: Debt[],
  extraPayment: number,
  strategy: 'snowball' | 'avalanche'
): PayoffSummary {
  if (debts.length === 0) return { order: [], totalMonths: 0, totalInterestPaid: 0 }

  // Sort by strategy
  const sorted = [...debts].sort((a, b) =>
    strategy === 'snowball'
      ? a.balance - b.balance
      : b.interestRate - a.interestRate
  )

  // Simulate month by month
  const balances = new Map<string, number>()
  const interestPaid = new Map<string, number>()
  const payoffMonths = new Map<string, number>()

  for (const d of sorted) {
    balances.set(d.id, d.balance)
    interestPaid.set(d.id, 0)
  }

  let month = 0
  const maxMonths = 600

  while (month < maxMonths) {
    // Check if all debts are paid
    const remaining = sorted.filter((d) => (balances.get(d.id) || 0) > 0)
    if (remaining.length === 0) break

    month++
    let extraAvailable = extraPayment

    // Apply minimum payments + interest to all debts
    for (const d of remaining) {
      const bal = balances.get(d.id) || 0
      const monthlyRate = d.interestRate / 12
      const interest = bal * monthlyRate
      interestPaid.set(d.id, (interestPaid.get(d.id) || 0) + interest)

      const payment = Math.min(bal + interest, d.minimumPayment)
      const newBal = bal + interest - payment
      balances.set(d.id, Math.max(0, newBal))

      if (newBal <= 0.01) {
        balances.set(d.id, 0)
        if (!payoffMonths.has(d.id)) payoffMonths.set(d.id, month)
        // freed-up minimum goes to extra
        extraAvailable += d.minimumPayment
      }
    }

    // Apply extra payment to target debt (first in sorted order that still has balance)
    for (const d of sorted) {
      const bal = balances.get(d.id) || 0
      if (bal > 0 && extraAvailable > 0) {
        const apply = Math.min(bal, extraAvailable)
        balances.set(d.id, bal - apply)
        extraAvailable -= apply
        if (bal - apply <= 0.01) {
          balances.set(d.id, 0)
          if (!payoffMonths.has(d.id)) payoffMonths.set(d.id, month)
          extraAvailable += d.minimumPayment
        }
      }
    }
  }

  const order: PayoffResult[] = sorted.map((d) => ({
    debtId: d.id,
    debtName: d.name,
    payoffMonth: payoffMonths.get(d.id) || month,
    interestPaid: Math.round((interestPaid.get(d.id) || 0) * 100) / 100,
  }))

  return {
    order,
    totalMonths: Math.max(...order.map((o) => o.payoffMonth), 0),
    totalInterestPaid: Math.round(order.reduce((s, o) => s + o.interestPaid, 0) * 100) / 100,
  }
}

export function generateDebtId(): string {
  return `debt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
