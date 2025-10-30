import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { migrateAllDataToSupabase } from '../utils/dataMigration'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Skip authentication if Supabase is not configured (development mode)
    if (!supabase) {
      setLoading(false)
      return // No cleanup needed when skipping auth
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Run migration if user is logged in
      if (session?.user) {
        migrateAllDataToSupabase().catch(err => {
          console.error('Migration failed:', err)
        })
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Run migration on sign in
      if (_event === 'SIGNED_IN' && session?.user) {
        try {
          await migrateAllDataToSupabase()
        } catch (err) {
          console.error('Migration failed:', err)
        }
      }
    })

    // Cleanup: only unsubscribe if we created a subscription
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const value = {
    session,
    user,
    loading,
    signUp: async (email, password, metadata = {}) => {
      if (!supabase) return { data: null, error: { message: 'Authentication not configured' } }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })
      return { data, error }
    },
    signIn: async (email, password) => {
      if (!supabase) return { data: null, error: { message: 'Authentication not configured' } }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { data, error }
    },
    signInWithGoogle: async () => {
      if (!supabase) return { data: null, error: { message: 'Authentication not configured' } }

      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`
          }
        })

        if (error) {
          console.error('Google OAuth error:', error)

          // Provide helpful error messages
          if (error.message?.includes('provider')) {
            return {
              data: null,
              error: {
                message: 'Google sign-in is not configured yet. Please use email/password sign-in for now, or contact support@formationlabs.net'
              }
            }
          }

          return { data, error }
        }

        return { data, error }
      } catch (err) {
        console.error('Unexpected Google OAuth error:', err)
        return {
          data: null,
          error: {
            message: 'Google sign-in is temporarily unavailable. Please use email/password sign-in.'
          }
        }
      }
    },
    signInWithApple: async () => {
      if (!supabase) return { data: null, error: { message: 'Authentication not configured' } }

      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'apple',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`
          }
        })

        if (error) {
          console.error('Apple OAuth error:', error)

          // Provide helpful error messages
          if (error.message?.includes('provider')) {
            return {
              data: null,
              error: {
                message: 'Apple sign-in is not configured yet. Please use email/password sign-in for now, or contact support@formationlabs.net'
              }
            }
          }

          return { data, error }
        }

        return { data, error }
      } catch (err) {
        console.error('Unexpected Apple OAuth error:', err)
        return {
          data: null,
          error: {
            message: 'Apple sign-in is temporarily unavailable. Please use email/password sign-in.'
          }
        }
      }
    },
    signOut: async () => {
      if (!supabase) {
        navigate('/login')
        return { error: null }
      }
      const { error } = await supabase.auth.signOut()
      if (!error) {
        navigate('/login')
      }
      return { error }
    },
    resetPassword: async (email) => {
      if (!supabase) return { data: null, error: { message: 'Authentication not configured' } }
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })
      return { data, error }
    },
    updatePassword: async (newPassword) => {
      if (!supabase) return { data: null, error: { message: 'Authentication not configured' } }
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })
      return { data, error }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
