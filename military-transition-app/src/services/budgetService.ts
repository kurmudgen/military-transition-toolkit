/**
 * Budget Service
 *
 * Supabase persistence for monthly budgets.
 * Table: budgets (user_id, current_month, history, settings)
 */

import { supabase, getCurrentUser } from '../lib/supabase'

export interface BudgetCategory {
  id: string
  name: string
  type: 'need' | 'want' | 'saving'
  planned: number  // dollars
  actual: number   // dollars
}

export interface BudgetMonth {
  month: string  // "2026-02"
  income: number // dollars
  categories: BudgetCategory[]
}

export interface BudgetSettings {
  defaultCategories: string[]
  showTips: boolean
}

export interface BudgetData {
  current_month: BudgetMonth
  history: BudgetMonth[]
  settings: BudgetSettings
}

export const DEFAULT_CATEGORIES: BudgetCategory[] = [
  // Needs
  { id: 'housing', name: 'Housing / Rent', type: 'need', planned: 0, actual: 0 },
  { id: 'utilities', name: 'Utilities', type: 'need', planned: 0, actual: 0 },
  { id: 'groceries', name: 'Groceries', type: 'need', planned: 0, actual: 0 },
  { id: 'transportation', name: 'Transportation', type: 'need', planned: 0, actual: 0 },
  { id: 'insurance', name: 'Insurance', type: 'need', planned: 0, actual: 0 },
  { id: 'min-debt', name: 'Minimum Debt Payments', type: 'need', planned: 0, actual: 0 },
  { id: 'childcare', name: 'Childcare', type: 'need', planned: 0, actual: 0 },
  // Wants
  { id: 'dining', name: 'Dining Out', type: 'want', planned: 0, actual: 0 },
  { id: 'entertainment', name: 'Entertainment', type: 'want', planned: 0, actual: 0 },
  { id: 'subscriptions', name: 'Subscriptions', type: 'want', planned: 0, actual: 0 },
  { id: 'shopping', name: 'Shopping', type: 'want', planned: 0, actual: 0 },
  { id: 'hobbies', name: 'Hobbies', type: 'want', planned: 0, actual: 0 },
  // Savings
  { id: 'emergency', name: 'Emergency Fund', type: 'saving', planned: 0, actual: 0 },
  { id: 'tsp', name: 'TSP / Retirement', type: 'saving', planned: 0, actual: 0 },
  { id: 'savings-goals', name: 'Savings Goals', type: 'saving', planned: 0, actual: 0 },
  { id: 'extra-debt', name: 'Extra Debt Payments', type: 'saving', planned: 0, actual: 0 },
]

function getCurrentMonthString(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

function createDefaultBudget(): BudgetData {
  return {
    current_month: {
      month: getCurrentMonthString(),
      income: 0,
      categories: DEFAULT_CATEGORIES.map((c) => ({ ...c })),
    },
    history: [],
    settings: {
      defaultCategories: DEFAULT_CATEGORIES.map((c) => c.id),
      showTips: true,
    },
  }
}

/**
 * Get user's budget data.
 */
export async function getBudget(): Promise<BudgetData> {
  const user = await getCurrentUser()
  if (!user || !supabase) return createDefaultBudget()

  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return createDefaultBudget()
    console.error('Error fetching budget:', error)
    return createDefaultBudget()
  }

  return {
    current_month: data.current_month || createDefaultBudget().current_month,
    history: data.history || [],
    settings: data.settings || createDefaultBudget().settings,
  }
}

/**
 * Save budget data.
 */
export async function saveBudget(budgetData: BudgetData): Promise<void> {
  const user = await getCurrentUser()
  if (!user || !supabase) throw new Error('No authenticated user')

  // Input validation: reject negative values
  if (budgetData.current_month.income < 0) throw new Error('Income cannot be negative')
  for (const cat of budgetData.current_month.categories) {
    if (cat.planned < 0 || cat.actual < 0) throw new Error('Budget amounts cannot be negative')
  }

  const { error } = await supabase
    .from('budgets')
    .upsert(
      {
        user_id: user.id,
        current_month: budgetData.current_month,
        history: budgetData.history,
        settings: budgetData.settings,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error saving budget:', error)
    throw error
  }
}

/**
 * Generate a unique category ID.
 */
export function generateCategoryId(): string {
  return `cat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
