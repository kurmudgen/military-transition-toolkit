import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isPromoActive, getTimeRemaining, PROMO_END_DATE } from '../utils/promoConfig'
import { getUserSubscription } from '../services/subscriptionService'

export default function PromoBanner() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining())
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

  // Update countdown every minute
  useEffect(() => {
    // Check if user dismissed banner in this session
    const wasDismissed = sessionStorage.getItem('promoBannerDismissed')
    if (wasDismissed === 'true') {
      setDismissed(true)
      setIsVisible(false)
      return
    }

    const timer = setInterval(() => {
      const remaining = getTimeRemaining()
      setTimeRemaining(remaining)

      // Hide banner if promo expired
      if (remaining.expired) {
        setIsVisible(false)
      }
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setDismissed(true)
    sessionStorage.setItem('promoBannerDismissed', 'true')
  }

  // Don't show if promo is not active, user dismissed it, or user has premium
  if (!isPromoActive() || !isVisible || dismissed || hasPremium) {
    return null
  }

  const { days, hours } = timeRemaining
  const formattedDate = PROMO_END_DATE.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0" role="img" aria-label="Military Medal">
              🎖️
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm sm:text-base mb-1">
                Veterans Day Launch Special: All Premium Features FREE
              </p>
              <p className="text-xs sm:text-sm text-blue-100">
                Lock in Founding Member pricing ($249 lifetime) before it increases to $399 on {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center hidden sm:block">
              <div className="text-xs text-blue-100 mb-0.5">Time Remaining</div>
              <div className="font-bold text-sm">
                {days}d {hours}h
              </div>
            </div>

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

        {/* Mobile countdown */}
        <div className="mt-2 sm:hidden text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-xs text-blue-100">Time Remaining: </span>
            <span className="font-bold text-sm">{days}d {hours}h</span>
          </div>
        </div>
      </div>
    </div>
  )
}
