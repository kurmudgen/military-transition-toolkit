import { useState, useEffect } from 'react'

const DISMISSED_KEY = 'featureAnnouncementDismissed'

/**
 * Feature announcement banner to inform users about the new onboarding checklist
 * Shows for all users until dismissed, stored in localStorage
 */
export default function FeatureAnnouncementBanner() {
  const [dismissed, setDismissed] = useState(true) // Start hidden to prevent flash
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check localStorage on mount
    const wasDismissed = localStorage.getItem(DISMISSED_KEY) === 'true'
    setDismissed(wasDismissed)
  }, [])

  const handleDismiss = () => {
    setIsAnimating(true)
    setTimeout(() => {
      localStorage.setItem(DISMISSED_KEY, 'true')
      setDismissed(true)
    }, 300)
  }

  const handleFeedback = () => {
    window.location.href = 'mailto:jacob@formationlabs.io?subject=Onboarding%20Checklist%20Feedback'
  }

  if (dismissed) return null

  return (
    <div
      className={`relative bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-5 mb-6 transition-all duration-300 ${
        isAnimating ? 'opacity-0 transform -translate-y-2' : 'opacity-100'
      }`}
    >
      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1.5 rounded-full text-blue-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
        aria-label="Dismiss announcement"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-start gap-4 pr-8">
        {/* Icon */}
        <div className="text-3xl flex-shrink-0">
          🎉
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
            New Feature: Getting Started Checklist
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-4 leading-relaxed">
            We've added an interactive checklist to help you get the most out of Military Transition Toolkit.
            It guides you through key features and tracks your progress as you explore the platform.
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
            Don't like it? Have feedback? Please let us know!
          </p>

          {/* Action button */}
          <button
            onClick={handleFeedback}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Feedback
          </button>
        </div>
      </div>
    </div>
  )
}
