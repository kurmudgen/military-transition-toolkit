import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('loading') // loading, success, error
  const [message, setMessage] = useState('Completing sign in...')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for error in URL params (OAuth errors)
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

        if (!hasAuthCode && !supabase) {
          // No auth code and Supabase not configured
          setStatus('error')
          setMessage('Authentication is not properly configured.')
          setTimeout(() => navigate('/login', { replace: true }), 3000)
          return
        }

        // Exchange the code for a session (Supabase handles this automatically with detectSessionInUrl)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Session error:', sessionError)
          setStatus('error')

          if (sessionError.message?.includes('expired')) {
            setMessage('Your confirmation link has expired. Please request a new one.')
          } else {
            setMessage('Failed to confirm authentication. Please try again.')
          }

          setTimeout(() => navigate('/login', { replace: true }), 5000)
          return
        }

        if (session) {
          // Check auth event type from URL
          const type = searchParams.get('type') || hashParams.get('type')

          setStatus('success')

          if (type === 'signup' || type === 'email_confirmation') {
            setMessage('Email confirmed successfully! Redirecting to your dashboard...')
          } else if (type === 'recovery' || type === 'password_recovery') {
            setMessage('Password reset verified! Redirecting...')
            // Redirect to password reset page instead of app
            setTimeout(() => navigate('/auth/reset-password', { replace: true }), 2000)
            return
          } else {
            setMessage('Sign in successful! Redirecting to your dashboard...')
          }

          // Redirect to app
          setTimeout(() => {
            navigate('/app', { replace: true })
          }, 2000)
        } else {
          // No session found - might be a password recovery or other flow
          const type = searchParams.get('type') || hashParams.get('type')

          if (type === 'recovery' || type === 'password_recovery') {
            // For password recovery, redirect even without session
            navigate('/auth/reset-password', { replace: true })
          } else {
            // No session and not recovery - go to login
            setStatus('error')
            setMessage('No active session found. Please try signing in again.')
            setTimeout(() => navigate('/login', { replace: true }), 3000)
          }
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error)
        setStatus('error')
        setMessage('An unexpected error occurred. Please try signing in again.')
        setTimeout(() => navigate('/login', { replace: true }), 5000)
      }
    }

    handleAuthCallback()
  }, [navigate, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Processing...
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Success!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30">
                  <svg className="h-10 w-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Authentication Error
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Redirecting to login page...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
