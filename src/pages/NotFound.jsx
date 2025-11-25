import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import PublicNav from '../components/Navigation/PublicNav'

export default function NotFound() {
  // Set page title
  useEffect(() => {
    document.title = 'Page Not Found - Military Transition Toolkit'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <PublicNav />
      <div className="px-4 py-16 sm:px-0">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-xl p-12 border border-slate-700 text-center">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-2xl text-slate-300 mb-6">Page not found</p>
            <p className="text-slate-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              ← Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
