/* HIDDEN - Free model - Keep for future use
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isPromoModeActive } from '../utils/promoConfig'
import { getUserSubscription } from '../services/subscriptionService'

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [dismissed, setDismissed] = useState(false)
  const [hasPremium, setHasPremium] = useState(false)

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      const subscription = await getUserSubscription()
      if (subscription && subscription.status === 'active') {
        setHasPremium(true)
        setIsVisible(false) // Hide banner for premium users
      }
    }
    checkSubscription()
  }, [])

  // Check if user dismissed banner in this session
  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('promoBannerDismissed')
    if (wasDismissed === 'true') {
      setDismissed(true)
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setDismissed(true)
    sessionStorage.setItem('promoBannerDismissed', 'true')
  }

  // Don't show if promo mode is not active, user dismissed it, or user has premium
  if (!isPromoModeActive() || !isVisible || dismissed || hasPremium) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0 mt-1" role="img" aria-label="US Flag">
              🇺🇸
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm sm:text-base mb-2">
                ⚠️ LIFETIME FREE ACCESS ENDS NOV 19 - Sign Up Now
              </p>
              <p className="text-xs sm:text-sm text-blue-50 font-medium">
                Join 43+ founding members who locked in lifetime free access. Basic features stay free, premium features become $7/month on Nov 20.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* CTA Button */}
            <Link
              to="/pricing"
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap"
            >
              View Plans
            </Link>

            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="text-white hover:text-blue-100 transition-colors p-1 flex-shrink-0"
              aria-label="Dismiss banner"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
*/

// Simplified version for free model
export default function PromoBanner() {
  return null
}
