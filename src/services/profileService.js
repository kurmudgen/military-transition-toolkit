import { supabase } from '../lib/supabase'

/**
 * User Profile Service
 * Manages user profiles including situation selection and onboarding status
 */

/**
 * Get user profile from Supabase
 * Creates profile if it doesn't exist
 */
export async function getUserProfile(userId) {
  if (!userId) return null

  try {
    // Try to get existing profile
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" - that's okay, we'll create one
      console.error('Error fetching user profile:', error)
      return null
    }

    // If profile doesn't exist, create one
    if (!data) {
      const newProfile = {
        user_id: userId,
        situation: null,
        onboarding_completed: false,
        separation_date: null,
        display_name: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data: created, error: createError } = await supabase
        .from('user_profiles')
        .insert(newProfile)
        .select()
        .single()

      if (createError) {
        console.error('Error creating user profile:', createError)
        return null
      }

      return created
    }

    return data
  } catch (err) {
    console.error('Error in getUserProfile:', err)
    return null
  }
}

/**
 * Update user profile
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
      .eq('user_id', userId)
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
 */
export async function completeOnboarding(userId, situation, separationDate = null, displayName = null) {
  if (!userId || !situation) {
    return { error: 'User ID and situation required' }
  }

  try {
    const updates = {
      situation,
      onboarding_completed: true,
      separation_date: separationDate,
      display_name: displayName
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
