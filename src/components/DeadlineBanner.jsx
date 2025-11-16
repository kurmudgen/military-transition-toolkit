import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function DeadlineBanner() {
  const { user } = useAuth()

  // Don't show banner if user is logged in
  if (user) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
          <span className="font-semibold text-sm sm:text-base">
            🎖️ Create your free account today and help shape MTT's future
          </span>
          <Link
            to="/signup"
            className="px-4 sm:px-6 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  )
}
