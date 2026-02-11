import { useState, useEffect } from 'react'

// Flip this to false to hide the banner without removing the component
const SHOW_MAINTENANCE_BANNER = true

const STORAGE_KEY = 'mtt_maintenance_dismissed'

export default function MaintenanceBanner() {
  const [dismissed, setDismissed] = useState(true) // default hidden to avoid flash

  useEffect(() => {
    const wasDismissed = localStorage.getItem(STORAGE_KEY) === 'true'
    setDismissed(wasDismissed)
  }, [])

  if (!SHOW_MAINTENANCE_BANNER || dismissed) return null

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setDismissed(true)
  }

  return (
    <div className="bg-amber-100 dark:bg-amber-900/80 border-b border-amber-300 dark:border-amber-700">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            <span className="font-semibold">Planned Maintenance</span> — We're upgrading MTT with new features. You may notice brief changes over the next few days. Your data is safe.
          </p>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded-md text-amber-700 dark:text-amber-200 hover:text-amber-900 dark:hover:text-white hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
            aria-label="Dismiss maintenance banner"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
