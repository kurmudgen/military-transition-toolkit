// SECURITY FIX: VULN-001 - Email Verification Required Page
// Forces users to verify email before accessing protected routes

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function VerifyEmailRequired() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  // 🔒 SECURITY: Check if email is actually verified
  // If verified, redirect to app (prevents access if navigated directly)
  if (user?.email_confirmed_at) {
    navigate('/app', { replace: true })
    return null
  }

  // 🔒 SECURITY: Resend verification email
  const handleResendEmail = async () => {
    if (!user?.email) {
      setError('No email address found')
      return
    }

    setSending(true)
    setError(null)
    setMessage(null)

    try {
      // Supabase automatically sends verification email
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: user.email
      })

      if (resendError) {
        setError(resendError.message || 'Failed to send verification email')
      } else {
        setMessage('Verification email sent! Check your inbox.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setSending(false)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    await signOut()
  }

  // 🔒 SECURITY: Sanitize email display (show first 2 chars + @domain)
  const getSanitizedEmail = () => {
    if (!user?.email) return 'your email'
    const [local, domain] = user.email.split('@')
    if (!domain) return user.email
    return `${local.substring(0, 2)}***@${domain}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        {/* Icon */}
        <div className="mb-6 text-center">
          <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Verify Your Email
        </h1>

        {/* Message */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            🔒 <strong>Security Required:</strong> Please verify your email address to access your Military Transition Toolkit account.
          </p>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          We sent a verification link to <strong className="text-gray-900 dark:text-white">{getSanitizedEmail()}</strong>
        </p>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Next Steps:</h3>
          <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-2 list-decimal list-inside">
            <li>Check your email inbox (and spam folder)</li>
            <li>Click the verification link in the email</li>
            <li>You'll be redirected back to your dashboard</li>
          </ol>
        </div>

        {/* Success/Error Messages */}
        {message && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-800 dark:text-green-200">{message}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Resend Button */}
        <button
          onClick={handleResendEmail}
          disabled={sending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4"
        >
          {sending ? 'Sending...' : 'Resend Verification Email'}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Sign Out
        </button>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Didn't receive the email?{' '}
            <button
              onClick={handleResendEmail}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Click to resend
            </button>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Need help?{' '}
            <a
              href="mailto:support@formationlabs.net"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
