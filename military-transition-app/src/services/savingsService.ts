/**
 * Savings Service
 *
 * Supabase persistence for savings goals and emergency fund tracking.
 * Table: savings_goals (user_id, emergency_fund, goals, history)
 */

import { supabase, getCurrentUser } from '../lib/supabase'

export interface SavingsGoal {
  id: string
  name: string
  type: 'emergency' | 'pcs' | 'security_deposit' | 'vehicle' | 'education' | 'wedding' | 'travel' | 'custom'
  targetAmount: number    // dollars
  currentAmount: number   // dollars
  monthlyContribution: number // dollars
  targetDate?: string     // ISO date (optional deadline)
  createdAt: string       // ISO date
}

export interface EmergencyFund {
  currentBalance: number        // dollars
  monthlyExpenses: number       // dollars
  targetMonths: number          // how many months of coverage desired (default 6)
  monthlyContribution: number   // dollars
}

export interface SavingsSnapshot {
  date: string
  totalSaved: number
  goalCount: number
  emergencyFundBalance: number
}

export interface SavingsData {
  emergency_fund: EmergencyFund
  goals: SavingsGoal[]
  history: SavingsSnapshot[]
}

function createDefaultSavingsData(): SavingsData {
  return {
    emergency_fund: {
      currentBalance: 0,
      monthlyExpenses: 0,
      targetMonths: 6,
      monthlyContribution: 0,
    },
    goals: [],
    history: [],
  }
}

export async function getSavingsData(): Promise<SavingsData> {
  const user = await getCurrentUser()
  if (!user || !supabase) return createDefaultSavingsData()

  const { data, error } = await supabase
    .from('savings_goals')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return createDefaultSavingsData()
    console.error('Error fetching savings data:', error)
    return createDefaultSavingsData()
  }

  return {
    emergency_fund: data.emergency_fund || createDefaultSavingsData().emergency_fund,
    goals: data.goals || [],
    history: data.history || [],
  }
}

export async function saveSavingsData(savingsData: SavingsData): Promise<void> {
  const user = await getCurrentUser()
  if (!user || !supabase) throw new Error('No authenticated user')

  // Input validation: reject negative values
  if (savingsData.emergency_fund.currentBalance < 0) throw new Error('Emergency fund balance cannot be negative')
  if (savingsData.emergency_fund.monthlyExpenses < 0) throw new Error('Monthly expenses cannot be negative')
  for (const goal of savingsData.goals) {
    if (goal.targetAmount < 0 || goal.currentAmount < 0) throw new Error('Savings amounts cannot be negative')
  }

  const { error } = await supabase
    .from('savings_goals')
    .upsert(
      {
        user_id: user.id,
        emergency_fund: savingsData.emergency_fund,
        goals: savingsData.goals,
        history: savingsData.history,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error saving savings data:', error)
    throw error
  }
}

export const GOAL_TEMPLATES: { type: SavingsGoal['type']; name: string; suggestedAmount: number }[] = [
  { type: 'pcs', name: 'PCS Move Fund', suggestedAmount: 3000 },
  { type: 'security_deposit', name: 'Security Deposit + First Month', suggestedAmount: 3500 },
  { type: 'vehicle', name: 'Car Down Payment', suggestedAmount: 5000 },
  { type: 'education', name: 'Education / Certification', suggestedAmount: 2000 },
  { type: 'wedding', name: 'Wedding / Event Fund', suggestedAmount: 10000 },
  { type: 'travel', name: 'Travel / Leave Fund', suggestedAmount: 2500 },
]

export function generateGoalId(): string {
  return `goal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
