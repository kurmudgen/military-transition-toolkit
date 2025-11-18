import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { migrateAllDataToSupabase } from '../utils/dataMigration'
import { auditService } from '../services/auditService'

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
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false)
  const [timeoutEnabled, setTimeoutEnabled] = useState(true) // User preference
  const navigate = useNavigate()

  // Timeout configuration (in milliseconds)
  const TIMEOUT_DURATION = 15 * 60 * 1000 // 15 minutes
  const WARNING_DURATION = 13 * 60 * 1000 // 13 minutes (2 min warning)

  // Refs for timers
  const timeoutTimer = useRef(null)
  const warningTimer = useRef(null)
  const lastActivity = useRef(Date.now())

  // Handle session timeout
  const handleTimeout = useCallback(async () => {
    if (!user || !timeoutEnabled || !supabase) return

    // Log timeout event
    await auditService.log('session_timeout')

    // Clear timers and warning
    setShowTimeoutWarning(false)
    if (timeoutTimer.current) clearTimeout(timeoutTimer.current)
    if (warningTimer.current) clearTimeout(warningTimer.current)

    // Perform logout
    await supabase.auth.signOut()
    localStorage.clear()
    sessionStorage.clear()
    navigate('/login')
  }, [user, timeoutEnabled, navigate])

  // Reset activity timer
  const resetActivityTimer = useCallback(() => {
    if (!user || !timeoutEnabled) return

    lastActivity.current = Date.now()
    setShowTimeoutWarning(false)

    // Clear existing timers
    if (timeoutTimer.current) clearTimeout(timeoutTimer.current)
    if (warningTimer.current) clearTimeout(warningTimer.current)

    // Set warning timer (13 minutes)
    warningTimer.current = setTimeout(() => {
      setShowTimeoutWarning(true)
    }, WARNING_DURATION)

    // Set timeout timer (15 minutes)
    timeoutTimer.current = setTimeout(() => {
      handleTimeout()
    }, TIMEOUT_DURATION)
  }, [user, timeoutEnabled, handleTimeout, WARNING_DURATION, TIMEOUT_DURATION])

  // Set up activity listeners
  useEffect(() => {
    if (!user || !timeoutEnabled) return

    const activityEvents = ['mousemove', 'keypress', 'click', 'scroll', 'touchstart']

    const handleActivity = () => {
      resetActivityTimer()
    }

    // Add event listeners
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity)
    })

    // Start initial timer
    resetActivityTimer()

    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
      if (timeoutTimer.current) clearTimeout(timeoutTimer.current)
      if (warningTimer.current) clearTimeout(warningTimer.current)
    }
  }, [user, timeoutEnabled, resetActivityTimer])

  // Return user object (all features free, no subscription needed)
  const fetchSubscriptionData = useCallback(async (baseUser) => {
    if (!baseUser) return null

    // All features are free - just return the base user
    return baseUser
  }, [])

  useEffect(() => {
    // Skip authentication if Supabase is not configured (development mode)
    if (!supabase) {
      setLoading(false)
      return // No cleanup needed when skipping auth
    }

    // Check if URL contains auth code (PKCE flow)
    // If there's a code, we need to wait for Supabase to exchange it before allowing navigation
    const urlParams = new URLSearchParams(window.location.search)
    const hasAuthCode = urlParams.has('code')

    const initAuth = async () => {
      // Recovery mechanism: detect and clear broken auth state on mount
      try {
        const brokenAuthKeys = Object.keys(localStorage).filter(key =>
          key.includes('supabase.auth.token') ||
          key.includes('-auth-token')
        )

        if (brokenAuthKeys.length > 0) {
          console.log('🔍 Checking for broken auth state on mount...')

          // Try to get session - if it fails, clear everything
          try {
            const { data: { session: testSession } } = await supabase.auth.getSession()
            if (!testSession) {
              console.log('🧹 Clearing stale auth tokens from localStorage')
              brokenAuthKeys.forEach(key => localStorage.removeItem(key))
            }
          } catch (err) {
            console.log('🚨 Detected broken auth state - clearing all auth data')
            brokenAuthKeys.forEach(key => localStorage.removeItem(key))
          }
        }
      } catch (err) {
        console.warn('Could not check for broken auth state:', err)
      }

      if (hasAuthCode) {
        console.log('🔐 Auth code detected in URL - clearing stale sessions and waiting for PKCE exchange')

        // CRITICAL FIX: Clear any stale sessions before code exchange
        // This prevents old sessions from interfering with new email confirmation flows
        try {
          await supabase.auth.signOut({ scope: 'local' })
          console.log('✅ Cleared stale session before code exchange')
        } catch (err) {
          console.warn('⚠️ Could not clear stale session:', err)
        }
      }

      // Get initial session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        console.error('❌ Session error:', sessionError)

        // If session retrieval fails, clear local storage and redirect
        console.log('🧹 Clearing broken session data')
        try {
          localStorage.removeItem('supabase.auth.token')
          const authTokenKeys = Object.keys(localStorage).filter(key => key.includes('-auth-token'))
          authTokenKeys.forEach(key => localStorage.removeItem(key))
        } catch (err) {
          console.warn('Could not clear localStorage:', err)
        }

        setSession(null)
        setUser(null)

        // Redirect to login if on protected route
        if (window.location.pathname.includes('/app/')) {
          navigate('/login')
        }
      }

      // Validate session if it exists
      if (session) {
        const isExpired = session.expires_at ? Date.now() / 1000 > session.expires_at : false

        if (isExpired) {
          console.warn('⚠️ Session expired - clearing it')
          await supabase.auth.signOut()
          setSession(null)
          setUser(null)
        } else {
          console.log('✅ Valid session found:', session.user?.id)
          setSession(session)
          // Fetch subscription data and merge with user
          const userWithSubscription = await fetchSubscriptionData(session.user)
          setUser(userWithSubscription)
        }
      } else {
        setSession(null)
        setUser(null)
      }

      // Only set loading to false if we're NOT waiting for code exchange
      // If there's a code in URL, wait for onAuthStateChange to fire with the new session
      if (!hasAuthCode) {
        setLoading(false)
      } else {
        console.log('⏳ Keeping loading state - waiting for code exchange')
      }

      // Run migration if user is logged in and not waiting for code exchange
      if (session?.user && !hasAuthCode && !sessionError) {
        migrateAllDataToSupabase().catch(err => {
          console.error('Migration failed:', err)
        })
      }
    }

    initAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log(`🔄 Auth state change: ${_event}`, session?.user?.id)

      // Handle failed refresh gracefully - prevent white screen
      if (_event === 'SIGNED_OUT' || _event === 'TOKEN_REFRESHED') {
        if (!session) {
          console.log('🚨 Session lost or refresh failed - clearing local data')

          // Clear any stale local data to prevent broken auth state
          try {
            localStorage.removeItem('supabase.auth.token')
            localStorage.removeItem('sb-' + supabase.supabaseUrl.split('//')[1]?.split('.')[0] + '-auth-token')
          } catch (err) {
            console.warn('Could not clear local storage:', err)
          }

          setSession(null)
          setUser(null)

          // Redirect to login if on protected route
          const currentPath = window.location.pathname
          if (currentPath.includes('/app/')) {
            console.log('🔄 Redirecting to login from protected route')
            navigate('/login')
          }

          setLoading(false)
          return
        }
      }

      setSession(session)

      // Fetch subscription data for signed-in users
      if (_event === 'SIGNED_IN' && session?.user) {
        const userWithSubscription = await fetchSubscriptionData(session.user)
        setUser(userWithSubscription)
      } else {
        setUser(session?.user ?? null)
      }

      // Always set loading to false when auth state changes
      // This handles the code exchange completion
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

    // Fallback timeout: if code exchange takes too long (>10 seconds), stop loading
    // This prevents infinite loading if something goes wrong
    let timeoutId
    if (hasAuthCode) {
      timeoutId = setTimeout(() => {
        console.warn('⚠️ Code exchange timeout - setting loading to false')
        setLoading(false)
      }, 10000)
    }

    // Cleanup: only unsubscribe if we created a subscription
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [fetchSubscriptionData])

  const value = {
    session,
    user,
    loading,
    showTimeoutWarning,
    timeoutEnabled,
    setTimeoutEnabled,
    resetActivityTimer,
    signUp: async (email, password, metadata = {}) => {
      if (!supabase) return { data: null, error: { message: 'Authentication not configured' } }

      // Generate referral code from email
      const referralCode = email ? email.split('@')[0].toLowerCase().substring(0, 8) + Math.random().toString(36).substring(2, 6).toUpperCase() : null

      const { data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
            referral_code: referralCode
          }
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

      // Log successful login
      if (!error && data?.user) {
        await auditService.log('login_success')
      } else if (error) {
        await auditService.log('login_failed', null, null, { error: error.message })
      }

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
      // Log logout
      await auditService.log('logout')

      if (!supabase) {
        // ✅ SECURITY FIX: Clear ALL localStorage before navigating
        localStorage.clear()
        sessionStorage.clear()
        navigate('/login')
        return { error: null }
      }

      const { error } = await supabase.auth.signOut()

      if (!error) {
        // ✅ CRITICAL SECURITY: Clear ALL localStorage on logout
        // This removes VA claims, medical conditions, resumes, and other PII
        // from the device to prevent access on shared computers
        localStorage.clear()
        sessionStorage.clear()

        // Clear timeout timers
        if (timeoutTimer.current) clearTimeout(timeoutTimer.current)
        if (warningTimer.current) clearTimeout(warningTimer.current)
        setShowTimeoutWarning(false)

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
