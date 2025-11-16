import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { trackPageView, trackButtonClick } from '../../utils/analytics'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [separationStatus, setSeparationStatus] = useState('') // New field
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [referralCode, setReferralCode] = useState('')

  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    document.title = 'Sign Up - Military Transition Toolkit'
    trackPageView('Signup')

    // Capture referral code from URL
    const ref = searchParams.get('ref')
    if (ref) {
      setReferralCode(ref)
      trackPageView('Signup - Referred')
    }
  }, [searchParams])

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    // Validation
    if (!separationStatus) {
      return setError('Please select what brings you here')
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      return setError(passwordError)
    }

    if (!fullName.trim()) {
      return setError('Please enter your full name')
    }

    setLoading(true)

    try {
      const { error } = await signUp(email, password, {
        full_name: fullName.trim(),
        separation_status: separationStatus,
        referred_by: referralCode || null
      })

      if (error) {
        setError(error.message)
      } else {
        trackButtonClick(`Signup - ${separationStatus}${referralCode ? ' - Referred' : ''}`)
        setSuccessMessage(
          'Success! Please check your email to verify your account.'
        )
        // Wait 3 seconds then redirect to login
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    } catch (err) {
      setError('An error occurred during signup')
    } finally {
      setLoading(false)
    }
  }

  // TODO: Re-enable OAuth after launch (Google + Apple setup needed)
  // const handleGoogleSignup = async () => { ... }
  // const handleAppleSignup = async () => { ... }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              🎖️ MTT
            </div>
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your free account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Save your progress and access your data from any device. No credit card required.
          </p>
          {referralCode && (
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
              <p className="text-green-700 dark:text-green-300 text-sm font-semibold flex items-center gap-2">
                <span>✓</span>
                Referred by a battle buddy! You're both Founding Members.
              </p>
            </div>
          )}
        </div>

        {/* Account Benefits Callout */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 text-center">
            Why create an account?
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 flex-shrink-0">✓</span>
              <span>Save your progress across all devices</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 flex-shrink-0">✓</span>
              <span>Never lose your data with secure cloud backup</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 flex-shrink-0">✓</span>
              <span>Access from phone, tablet, or computer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 flex-shrink-0">✓</span>
              <span>Bank-level encryption protects your sensitive information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 flex-shrink-0">✓</span>
              <span>100% free - no credit card, no trial, no surprise charges</span>
            </li>
          </ul>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-2xl rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-700">
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {/* TODO: Re-enable OAuth after launch (Google + Apple setup needed) */}
          {/* OAuth buttons temporarily disabled - need to configure providers in Supabase */}

          {/* Email/Password Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Separation Status - NEW */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                What brings you here?
              </label>
              <div className="space-y-3">
                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  separationStatus === 'transitioning'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                }`}>
                  <input
                    type="radio"
                    name="separationStatus"
                    value="transitioning"
                    checked={separationStatus === 'transitioning'}
                    onChange={(e) => setSeparationStatus(e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                      I'm currently transitioning out
                    </span>
                    <span className="block text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Active duty planning separation/retirement
                    </span>
                  </div>
                </label>

                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  separationStatus === 'separated'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                }`}>
                  <input
                    type="radio"
                    name="separationStatus"
                    value="separated"
                    checked={separationStatus === 'separated'}
                    onChange={(e) => setSeparationStatus(e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                      I'm already out and need help with VA claims
                    </span>
                    <span className="block text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Separated/retired veteran needing claims assistance
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.75 6.75m12.03 12.03l-3.127-3.127m0 0A10.05 10.05 0 0112 19c4.478 0 8.268-2.943 9.543-7a9.97 9.97 0 00-1.563-3.029m-5.858-.908a3 3 0 10-4.243-4.243" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>
          </form>
        </div>

        {/* Login link */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
