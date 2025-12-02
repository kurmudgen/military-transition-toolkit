import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import PublicNav from '../components/Navigation/PublicNav'

export default function NotFound() {
  const location = useLocation()
  const isAppRoute = location.pathname.startsWith('/app')

  // Set page title
  useEffect(() => {
    document.title = 'Page Not Found - Military Transition Toolkit'
  }, [])

  // Reusable 404 content
  const NotFoundContent = () => (
    <div className="px-4 py-16 sm:px-0">
      <div className="max-w-2xl mx-auto">
        <div className={`rounded-lg shadow-xl p-12 border text-center ${
          isAppRoute
            ? 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700'
            : 'bg-slate-800 border-slate-700'
        }`}>
          <h1 className={`text-6xl font-bold mb-4 ${
            isAppRoute
              ? 'text-gray-900 dark:text-white'
              : 'text-white'
          }`}>404</h1>
          <p className={`text-2xl mb-6 ${
            isAppRoute
              ? 'text-gray-700 dark:text-slate-300'
              : 'text-slate-300'
          }`}>Page not found</p>
          <p className={`mb-8 ${
            isAppRoute
              ? 'text-gray-600 dark:text-slate-400'
              : 'text-slate-400'
          }`}>The page you're looking for doesn't exist or has been moved.</p>
          <Link
            to={isAppRoute ? '/app' : '/'}
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            ← Go back {isAppRoute ? 'to dashboard' : 'home'}
          </Link>
        </div>
      </div>
    </div>
  )

  // If on /app route, use Layout (authenticated nav)
  if (isAppRoute) {
    return (
      <Layout>
        <NotFoundContent />
      </Layout>
    )
  }

  // Otherwise use PublicNav
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <PublicNav />
      <div className="dark">
        <NotFoundContent />
      </div>
    </div>
  )
}
