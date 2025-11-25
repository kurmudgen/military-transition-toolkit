import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

/**
 * Unified Public Navigation Component
 *
 * Used on all public-facing pages:
 * - Landing page (/)
 * - About (/about)
 * - Resources (/resources)
 * - Blog (/blog, /blog/*)
 * - State Benefits (/state-benefits, /state-benefits/*)
 * - Legal pages (/terms, /privacy, etc.)
 *
 * Features:
 * - Responsive (mobile-first)
 * - Auth-aware (shows different buttons for logged in/out users)
 * - Active page highlighting
 * - Consistent styling across all public pages
 */
export default function PublicNav({ currentPage = '' }) {
  const { user } = useAuth()

  // Public navigation items
  const navItems = [
    { name: 'Features', path: '/#features', isHashLink: true },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
    { name: 'State Benefits', path: '/state-benefits' },
    { name: 'About', path: '/about' },
  ]

  const isActive = (path) => {
    if (path.startsWith('/#')) return false // Hash links never active
    return currentPage === path
  }

  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            Military Transition Toolkit
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              item.isHashLink ? (
                <a
                  key={item.name}
                  href={item.path}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    isActive(item.path)
                      ? 'text-blue-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  } transition-colors`}
                >
                  {item.name}
                </Link>
              )
            ))}

            {/* Auth Buttons */}
            {!user ? (
              // Not logged in - show Login and Sign Up
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-white rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              // Logged in - show Dashboard link
              <Link
                to="/app"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Dashboard →
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-white text-sm rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                to="/app"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
              >
                Dashboard →
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
