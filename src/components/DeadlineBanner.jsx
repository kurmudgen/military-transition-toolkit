import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function DeadlineBanner() {
  const { user } = useAuth()
  // Deadline: November 20, 2025 at 00:00:00 PST (America/Los_Angeles)
  const DEADLINE = new Date('2025-11-20T00:00:00-08:00')

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [dismissed, setDismissed] = useState(false)
  const [isBeforeDeadline, setIsBeforeDeadline] = useState(Date.now() < DEADLINE.getTime())

  // Check if banner was dismissed (only applies after deadline)
  useEffect(() => {
    const wasDismissed = localStorage.getItem('deadlineBannerDismissed')
    if (wasDismissed === 'true' && !isBeforeDeadline) {
      setDismissed(true)
    }
  }, [isBeforeDeadline])

  // Update countdown every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      // Check if deadline has passed
      const nowBeforeDeadline = Date.now() < DEADLINE.getTime()
      if (nowBeforeDeadline !== isBeforeDeadline) {
        setIsBeforeDeadline(nowBeforeDeadline)
        // If deadline just passed, reset dismissal
        if (!nowBeforeDeadline) {
          setDismissed(false)
        }
      }
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [isBeforeDeadline])

  function calculateTimeLeft() {
    const difference = DEADLINE.getTime() - Date.now()

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        total: difference
      }
    }

    return null
  }

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('deadlineBannerDismissed', 'true')
  }

  // Don't show if dismissed (only after deadline)
  if (dismissed && !isBeforeDeadline) {
    return null
  }

  // BEFORE DEADLINE: Show countdown banner (not dismissible)
  if (isBeforeDeadline && timeLeft) {
    const isUrgent = timeLeft.total < 24 * 60 * 60 * 1000 // Less than 24 hours
    const isVeryUrgent = timeLeft.total < 60 * 60 * 1000 // Less than 1 hour

    return (
      <div
        className={`${
          isVeryUrgent
            ? 'bg-gradient-to-r from-red-600 to-orange-600 animate-pulse'
            : isUrgent
              ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
              : 'bg-gradient-to-r from-yellow-500 to-amber-500'
        } text-white shadow-lg`}
        role="banner"
        aria-live="polite"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Message and Countdown */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start text-center sm:text-left">
              <span
                className="text-2xl sm:text-3xl flex-shrink-0"
                role="img"
                aria-label="Medal"
              >
                {user ? '✅' : '🎖️'}
              </span>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <p className="font-bold text-sm sm:text-base lg:text-lg">
                  {user ? (
                    "You're locked in as a Founding Member!"
                  ) : isVeryUrgent ? (
                    'LAST CHANCE! Less than 1 hour remaining for FREE LIFETIME ACCESS!'
                  ) : isUrgent ? (
                    'FINAL HOURS! FREE LIFETIME ACCESS ends Nov 19!'
                  ) : (
                    'FREE LIFETIME ACCESS ends Nov 19! Sign up now to become a Founding Member.'
                  )}
                </p>
                {!user && !isVeryUrgent && (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span
                      className={`font-mono font-bold text-base sm:text-lg lg:text-xl px-3 py-1 rounded-md ${
                        isUrgent
                          ? 'bg-red-700 shadow-lg'
                          : 'bg-amber-700'
                      }`}
                      aria-label={`Time remaining: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes`}
                    >
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">
                      remaining
                    </span>
                  </div>
                )}
                {user && (
                  <span className="text-xs sm:text-sm font-semibold">
                    Lifetime free access secured
                  </span>
                )}
              </div>
            </div>

            {/* CTA Button */}
            {!user ? (
              <Link
                to="/signup"
                className={`${
                  isVeryUrgent || isUrgent
                    ? 'bg-white text-red-600 hover:bg-red-50 shadow-2xl ring-4 ring-white/50 animate-bounce'
                    : 'bg-white text-amber-600 hover:bg-amber-50'
                } px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-sm sm:text-base transition-all whitespace-nowrap flex-shrink-0`}
                aria-label="Sign up for free lifetime access"
              >
                {isVeryUrgent ? '🚨 Sign Up NOW!' : '✨ Sign Up Free'}
              </Link>
            ) : (
              <Link
                to="/app"
                className="bg-white text-green-600 hover:bg-green-50 px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-sm sm:text-base transition-all whitespace-nowrap flex-shrink-0"
                aria-label="Go to dashboard"
              >
                Go to Dashboard →
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  // AFTER DEADLINE: Show trial banner (dismissible) only for non-authenticated users
  if (user) {
    // Hide banner for authenticated users after deadline
    return null
  }

  return (
    <div
      className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
          {/* Message */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <span
              className="text-xl sm:text-2xl flex-shrink-0"
              role="img"
              aria-label="Rocket"
            >
              🚀
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm sm:text-base lg:text-lg">
                Start your 7-day free trial today. No credit card required.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* CTA Button */}
            <Link
              to="/signup"
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 sm:px-5 py-2 rounded-lg font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
              aria-label="Try free trial"
            >
              Try Free
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
