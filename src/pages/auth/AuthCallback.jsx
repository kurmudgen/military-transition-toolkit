import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('loading') // loading, success, error
  const [message, setMessage] = useState('Signing you in...')

  useEffect(() => {
    // Check for error in URL params first (OAuth errors)
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    if (error) {
      console.error('Auth error:', error, errorDescription)
      setStatus('error')

      // Provide user-friendly error messages
      if (error === 'access_denied') {
        setMessage('Sign in was cancelled. You can try again.')
      } else if (errorDescription?.includes('Email link is invalid')) {
        setMessage('This confirmation link has expired or is invalid. Please request a new one.')
      } else if (errorDescription?.includes('already been used')) {
        setMessage('This confirmation link has already been used. Please try signing in.')
      } else {
        setMessage(errorDescription || 'An error occurred during sign in. Please try again.')
      }

      // Redirect to login after showing error
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 5000)
      return
    }

    // Check for auth code or access token in URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const hasAuthCode = searchParams.get('code') || hashParams.get('access_token')
    const type = searchParams.get('type') || hashParams.get('type')

    if (!hasAuthCode && !supabase) {
      // No auth code and Supabase not configured
      setStatus('error')
      setMessage('Authentication is not properly configured.')
      setTimeout(() => navigate('/login', { replace: true }), 3000)
      return
    }

    // CRITICAL FIX: Wait for auth state change instead of immediately checking session
    // This prevents race condition with PKCE code exchange in AuthContext
    console.log('🔐 Auth callback - waiting for code exchange...', { hasAuthCode, type })

    const handleAuthStateChange = async (event, session) => {
      console.log(`🔄 Auth callback received event: ${event}`, session?.user?.id)

      // Ignore initial state if we're waiting for code exchange
      if (event === 'INITIAL_SESSION' && hasAuthCode) {
        console.log('⏳ Ignoring INITIAL_SESSION - waiting for code exchange')
        return
      }

      // Handle password recovery
      if (type === 'recovery' || type === 'password_recovery') {
        setStatus('success')
        setMessage('Password reset verified! Redirecting...')
        setTimeout(() => navigate('/auth/reset-password', { replace: true }), 2000)
        return
      }

      // Handle email confirmation (signup)
      if (type === 'signup' || type === 'email_confirmation') {
        if (event === 'SIGNED_IN' || session) {
          console.log('✅ Email confirmation successful')
          setStatus('success')
          setMessage('Email confirmed successfully! Redirecting to login...')

          // Sign out the auto-created session to force explicit login
          if (supabase) {
            await supabase.auth.signOut()
          }

          setTimeout(() => {
            navigate('/login?confirmed=true', { replace: true })
          }, 2000)
        }
        return
      }

      // For other OAuth flows (Google, Apple, etc.)
      if (session && event === 'SIGNED_IN') {
        setStatus('success')
        setMessage('Sign in successful! Redirecting to your dashboard...')
        setTimeout(() => {
          navigate('/app', { replace: true })
        }, 2000)
      } else if (event === 'SIGNED_OUT' || (!session && !hasAuthCode)) {
        // Only show error if we're not waiting for code exchange
        setStatus('error')
        setMessage('No active session found. Please try signing in again.')
        setTimeout(() => navigate('/login', { replace: true }), 3000)
      }
    }

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange)

    // Fallback timeout: if nothing happens within 10 seconds, show error
    const timeoutId = setTimeout(() => {
      console.warn('⚠️ Auth callback timeout - no session established')
      setStatus('error')
      setMessage('Email verification timed out. Please try again or contact support.')
      setTimeout(() => navigate('/login', { replace: true }), 3000)
    }, 10000)

    // Cleanup
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
      clearTimeout(timeoutId)
    }
  }, [navigate, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Signing you in...
              </h2>
              <p className="text-slate-400">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-900/30">
                  <svg className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Success!
              </h2>
              <p className="text-slate-400">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-900/30">
                  <svg className="h-10 w-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Authentication Error
              </h2>
              <p className="text-slate-400 mb-4">{message}</p>
              <p className="text-sm text-slate-500">
                Redirecting to login page...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
