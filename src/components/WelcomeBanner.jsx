import { useState } from 'react'

/**
 * Welcome banner for first-time users
 * Dismissible, shows once until user clicks X
 */
export default function WelcomeBanner({ userName, onDismiss }) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleDismiss = () => {
    setIsAnimating(true)
    // Wait for animation before calling onDismiss
    setTimeout(() => {
      onDismiss()
    }, 300)
  }

  return (
    <div
      className={`relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-xl shadow-lg p-6 mb-6 text-white overflow-hidden transition-all duration-300 ${
        isAnimating ? 'opacity-0 transform -translate-y-4' : 'opacity-100'
      }`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Dismiss welcome banner"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0">
            👋
          </div>
          <div className="flex-1 pr-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Welcome{userName ? `, ${userName}` : ''}! Let's get your transition on track.
            </h2>
            <p className="text-blue-100 text-sm sm:text-base mb-4">
              Complete these steps to make the most of your toolkit and ensure you don't miss any critical deadlines.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm">
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Personalized timeline</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm">
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Smart reminders</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-sm">
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>VA claim builder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
