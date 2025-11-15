import { supabase } from '../lib/supabase'

/**
 * User Profile Service
 * Manages user profiles including situation selection and onboarding status
 */

/**
 * Get user profile from Supabase
 * The user_profiles table uses 'id' as the primary key (references auth.users.id)
 */
export async function getUserProfile(userId) {
  if (!userId) return null

  try {
    // Try to get existing profile
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" - that's okay
      console.error('Error fetching user profile:', error)
      return null
    }

    // Profile should already exist (created by signup trigger)
    // If it doesn't exist, it will be created on next update
    return data
  } catch (err) {
    console.error('Error in getUserProfile:', err)
    return null
  }
}

/**
 * Update user profile
 * The user_profiles table uses 'id' as the primary key (references auth.users.id)
 */
export async function updateUserProfile(userId, updates) {
  if (!userId) return { error: 'User ID required' }

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating user profile:', error)
      return { error }
    }

    return { data }
  } catch (err) {
    console.error('Error in updateUserProfile:', err)
    return { error: err }
  }
}

/**
 * Complete onboarding and set situation
 * Note: table uses 'full_name' not 'display_name'
 */
export async function completeOnboarding(userId, situation, separationDate = null, fullName = null) {
  if (!userId || !situation) {
    return { error: 'User ID and situation required' }
  }

  try {
    const updates = {
      situation,
      separation_date: separationDate,
      full_name: fullName
    }

    return await updateUserProfile(userId, updates)
  } catch (err) {
    console.error('Error completing onboarding:', err)
    return { error: err }
  }
}

/**
 * Check if user has completed onboarding
 */
export async function hasCompletedOnboarding(userId) {
  if (!userId) return false

  try {
    const profile = await getUserProfile(userId)
    return profile?.onboarding_completed === true
  } catch (err) {
    console.error('Error checking onboarding status:', err)
    return false
  }
}
