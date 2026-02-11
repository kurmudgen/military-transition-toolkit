/**
 * PCS Checklist Service
 *
 * Supabase persistence for PCS career prep checklist progress.
 * Follows the same pattern as checklistService.js.
 * Table: checklist_progress (reuses existing table with checklist_type = 'pcs_career_prep')
 */

import { supabase, getCurrentUser } from '../lib/supabase'

const CHECKLIST_TYPE = 'pcs_career_prep'

export type PCSChecklistProgress = Record<string, boolean>

/**
 * Get PCS checklist progress for the current user.
 * Returns a map of item IDs to completion status.
 */
export async function getPCSChecklistProgress(): Promise<PCSChecklistProgress> {
  const user = await getCurrentUser()
  if (!user || !supabase) return {}

  const { data, error } = await supabase
    .from('checklist_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('checklist_type', CHECKLIST_TYPE)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return {} // no row yet
    console.error('Error fetching PCS checklist progress:', error)
    return {}
  }

  return data?.checklist_data || {}
}

/**
 * Save PCS checklist progress.
 */
export async function savePCSChecklistProgress(
  progress: PCSChecklistProgress
): Promise<void> {
  const user = await getCurrentUser()
  if (!user || !supabase) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('checklist_progress')
    .upsert(
      {
        user_id: user.id,
        checklist_type: CHECKLIST_TYPE,
        checklist_data: progress,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,checklist_type' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error saving PCS checklist progress:', error)
    throw error
  }
}

/**
 * Toggle a single checklist item.
 */
export async function togglePCSChecklistItem(
  itemId: string,
  currentProgress: PCSChecklistProgress
): Promise<PCSChecklistProgress> {
  const updated = {
    ...currentProgress,
    [itemId]: !currentProgress[itemId],
  }

  await savePCSChecklistProgress(updated)
  return updated
}
