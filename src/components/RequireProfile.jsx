import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getUserProfile } from '../services/profileService'
import { validateProfileCompleteness, loadProfileSafely } from '../utils/profileValidation'

/**
 * RequireProfile Component
 * Ensures user has completed profile before accessing protected content
 * Redirects to /app/setup if profile is incomplete
 */
export default function RequireProfile({ children }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isChecking, setIsChecking] = useState(true)
  const [profileComplete, setProfileComplete] = useState(false)

  useEffect(() => {
    async function checkProfile() {
      // Skip check if on setup page to avoid redirect loop
      if (location.pathname === '/app/setup') {
        setProfileComplete(true)
        setIsChecking(false)
        return
      }

      // If user is logged in, check Supabase profile
      if (user?.id) {
        try {
          console.log('🔍 User logged in:', user.id)
          const profile = await getUserProfile(user.id)
          console.log('📊 Profile from DB:', profile)

          if (profile) {
            // Map database fields to app format
            const validation = validateProfileCompleteness({
              situation: profile.situation,
              separationDate: profile.separation_date,
              name: profile.full_name  // FIXED: Use full_name from database
            })

            console.log('✅ Profile complete?', validation.isComplete)
            if (!validation.isComplete) {
              console.log('❌ Missing fields:', validation.missing)
            }

            if (validation.isComplete) {
              setProfileComplete(true)
              setIsChecking(false)
              return
            } else {
              console.log('📋 Profile incomplete - redirecting to setup')
              // Redirect to setup
              navigate('/app/setup', { replace: true })
              return
            }
          } else {
            console.log('⚠️ No profile found in database')
          }
        } catch (error) {
          console.error('❌ Error checking profile:', error)
        }
      }

      // Fallback: Check localStorage
      const { profile, needsSetup, validation } = loadProfileSafely()

      if (needsSetup) {
        console.log('⚠️ Profile setup required:', validation.reason)
        navigate('/app/setup', { replace: true })
      } else {
        setProfileComplete(true)
      }

      setIsChecking(false)
    }

    checkProfile()
  }, [user, navigate, location.pathname])

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Only render children if profile is complete
  return profileComplete ? children : null
}
