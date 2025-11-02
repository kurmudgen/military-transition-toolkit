import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

/**
 * Session Timeout Warning Modal
 * Shows warning 2 minutes before auto-logout
 */
export default function SessionTimeoutWarning() {
  const { showTimeoutWarning, resetActivityTimer } = useAuth()
  const [countdown, setCountdown] = useState(120) // 2 minutes in seconds

  useEffect(() => {
    if (!showTimeoutWarning) {
      setCountdown(120)
      return
    }

    // Countdown timer
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [showTimeoutWarning])

  if (!showTimeoutWarning) return null

  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border-2 border-yellow-500 rounded-lg shadow-2xl p-8 max-w-md mx-4 animate-fadeIn">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-500/20 rounded-full p-4">
            <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Warning Message */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Session Timeout Warning
        </h2>
        <p className="text-slate-300 text-center mb-6">
          Your session will expire due to inactivity. You will be automatically logged out in:
        </p>

        {/* Countdown */}
        <div className="bg-slate-900 rounded-lg p-6 mb-6 text-center">
          <div className="text-5xl font-bold text-yellow-500 font-mono">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-slate-400 text-sm mt-2">
            minutes remaining
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-300">
            <strong>Security Notice:</strong> This timeout protects your sensitive military and medical data on shared computers.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={resetActivityTimer}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          Stay Logged In
        </button>

        {/* Info Text */}
        <p className="text-slate-400 text-xs text-center mt-4">
          Any activity will keep you logged in. This includes clicking, typing, or moving your mouse.
        </p>
      </div>
    </div>
  )
}
