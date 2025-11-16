import { supabase, getCurrentUser } from '../lib/supabase'

/**
 * State Benefits Service
 * Manages state comparison data in Supabase
 */

// Get state comparison for current user
export const getStateComparison = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('state_comparisons')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No data found
      return null
    }
    console.error('Error fetching state comparison:', error)
    return null
  }

  return data
}

// Save or update state comparison
export const saveStateComparison = async (states, notes = '') => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('state_comparisons')
    .upsert({
      user_id: user.id,
      states: states,
      notes: notes,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving state comparison:', error)
    throw error
  }

  return data
}

// Update state comparison notes
export const updateStateComparisonNotes = async (notes) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('state_comparisons')
    .update({
      notes: notes,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating state comparison notes:', error)
    throw error
  }

  return data
}

// Delete state comparison
export const deleteStateComparison = async () => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { error } = await supabase
    .from('state_comparisons')
    .delete()
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting state comparison:', error)
    throw error
  }

  return true
}

// Migration helper
export const migrateStateBenefitsFromLocalStorage = async () => {
  try {
    const user = await getCurrentUser()
    if (!user) return

    const stateComparison = localStorage.getItem('stateComparison')
    const notes = localStorage.getItem('stateBenefitsNotes')

    if (stateComparison) {
      const parsed = JSON.parse(stateComparison)
      await saveStateComparison(parsed, notes || '')
      console.log(`Migrated state comparison with ${parsed.length} states`)
    }

    console.log('State benefits data migrated from localStorage to Supabase')
  } catch (error) {
    console.error('Error migrating state benefits data:', error)
  }
}
