import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function NotFound() {
  // Set page title
  useEffect(() => {
    document.title = 'Page Not Found - Military Transition Toolkit'
  }, [])

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
