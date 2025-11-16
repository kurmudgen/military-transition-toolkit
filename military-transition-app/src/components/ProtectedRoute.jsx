import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  // ✅ SECURITY FIX: Only allow dev bypass in actual development mode
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const isProduction = import.meta.env.MODE === 'production'
  const isDevelopment = import.meta.env.MODE === 'development'
  const isMisconfigured = !supabaseUrl || !supabaseKey

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // ✅ CRITICAL SECURITY: Fail securely if production is misconfigured
  if (isProduction && isMisconfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20">
        <div className="text-center max-w-md p-8">
          <div className="text-red-600 dark:text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-3">
            Configuration Error
          </h1>
          <p className="text-red-700 dark:text-red-300 mb-4">
            Application is not properly configured. Please contact technical support.
          </p>
          <p className="text-sm text-red-600 dark:text-red-400 font-mono">
            Error Code: AUTH_CONFIG_MISSING
          </p>
        </div>
      </div>
    )
  }

  // ✅ SECURITY: Only allow dev bypass in actual development mode
  if (isDevelopment && isMisconfigured) {
    return (
      <>
        {/* Development mode banner */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-b-2 border-yellow-400 dark:border-yellow-600 px-4 py-2">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
            <strong>⚠️ Development Mode:</strong> Authentication disabled (Supabase not configured).
          </p>
        </div>
        {children}
      </>
    )
  }

  // ✅ SECURITY: Require authentication for all other cases
  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 🔒 SECURITY FIX (VULN-001): Require email verification
  // Prevents unverified users from accessing protected routes
  // HIPAA/GDPR compliance: ensures valid contact email for PHI access
  if (!user.email_confirmed_at) {
    // Redirect to email verification required page
    return <Navigate to="/verify-email-required" state={{ from: location }} replace />
  }

  return children
}
