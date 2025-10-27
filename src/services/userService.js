import { supabase, getCurrentUser } from '../lib/supabase'

/**
 * User Profile Service
 * Manages user profile data in Supabase
 */

// Get user profile
export const getUserProfile = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}

// Update user profile
export const updateUserProfile = async (updates) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating user profile:', error)
    throw error
  }

  return data
}

// Create or update user profile (upsert)
export const upsertUserProfile = async (profileData) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({
      id: user.id,
      email: user.email,
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error('Error upserting user profile:', error)
    throw error
  }

  return data
}

// Get user setup (situation, separation date, etc.)
export const getUserSetup = async () => {
  const profile = await getUserProfile()
  if (!profile) return null

  return {
    situation: profile.situation,
    separationDate: profile.separation_date,
    name: profile.full_name || profile.first_name
  }
}

// Update user setup
export const updateUserSetup = async (setup) => {
  return await updateUserProfile({
    situation: setup.situation,
    separation_date: setup.separationDate,
    full_name: setup.name
  })
}

// Migration helper: Import data from localStorage
export const migrateFromLocalStorage = async () => {
  try {
    const user = await getCurrentUser()
    if (!user) return

    // Migrate user setup
    const userSetup = localStorage.getItem('userSetup')
    if (userSetup) {
      const parsed = JSON.parse(userSetup)
      await updateUserSetup(parsed)
    }

    console.log('User data migrated from localStorage to Supabase')
  } catch (error) {
    console.error('Error migrating user data:', error)
  }
}
