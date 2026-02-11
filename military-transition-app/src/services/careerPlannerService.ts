/**
 * Career Planner Service
 *
 * Supabase persistence for career assessment results and bookmarked careers.
 * Table: career_plans (user_id, assessment_answers, bookmarked_careers, updated_at)
 */

import { supabase, getCurrentUser } from '../lib/supabase'

export interface CareerPlanData {
  assessment_answers: Record<string, string>
  bookmarked_careers: string[]
  updated_at: string
}

/**
 * Get the user's saved career plan (assessment answers + bookmarks).
 */
export async function getCareerPlan(): Promise<CareerPlanData | null> {
  const user = await getCurrentUser()
  if (!user || !supabase) return null

  const { data, error } = await supabase
    .from('career_plans')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // no row yet
    console.error('Error fetching career plan:', error)
    return null
  }

  return data
}

/**
 * Save / update assessment answers.
 */
export async function saveAssessmentAnswers(
  answers: Record<string, string>
): Promise<CareerPlanData | null> {
  const user = await getCurrentUser()
  if (!user || !supabase) throw new Error('No authenticated user')

  // Fetch existing bookmarks so we don't clobber them
  const existing = await getCareerPlan()

  const { data, error } = await supabase
    .from('career_plans')
    .upsert(
      {
        user_id: user.id,
        assessment_answers: answers,
        bookmarked_careers: existing?.bookmarked_careers ?? [],
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error saving assessment answers:', error)
    throw error
  }

  return data
}

/**
 * Toggle a career bookmark (add if not present, remove if present).
 */
export async function toggleBookmark(careerId: string): Promise<string[]> {
  const user = await getCurrentUser()
  if (!user || !supabase) throw new Error('No authenticated user')

  const existing = await getCareerPlan()
  const current = existing?.bookmarked_careers ?? []

  const updated = current.includes(careerId)
    ? current.filter((id: string) => id !== careerId)
    : [...current, careerId]

  const { error } = await supabase
    .from('career_plans')
    .upsert(
      {
        user_id: user.id,
        assessment_answers: existing?.assessment_answers ?? {},
        bookmarked_careers: updated,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error toggling bookmark:', error)
    throw error
  }

  return updated
}
