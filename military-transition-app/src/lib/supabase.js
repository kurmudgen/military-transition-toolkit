import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not configured. Running in development mode.')
  console.warn('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env file to enable authentication.')
}

// Create Supabase client with fallback for development mode
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: window.localStorage,
        flowType: 'pkce'
      }
    })
  : null // Return null if credentials are missing (development mode)

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  if (!supabase) return false
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

// Helper function to get current user
export const getCurrentUser = async () => {
  if (!supabase) return null
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper function to check if user is premium
export const isPremiumUser = async () => {
  if (!supabase) return false
  const user = await getCurrentUser()
  if (!user) return false

  const { data } = await supabase
    .from('user_subscriptions')
    .select('status, plan_id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  return !!data
}

// Helper function to get user's subscription details
export const getUserSubscription = async () => {
  if (!supabase) return null
  const user = await getCurrentUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.error('Error fetching subscription:', error)
    return null
  }

  return data
}
