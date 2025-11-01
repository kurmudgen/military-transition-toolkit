import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AIAssistant from './AIAssistant'
import PromoBanner from './PromoBanner'

// Initialize dark mode from localStorage before component mounts
const getInitialDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode')
  return savedMode === 'true'
}

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(getInitialDarkMode)
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  // Apply dark mode class on mount and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode
      localStorage.setItem('darkMode', String(newMode))
      return newMode
    })
  }

  // Handle logout
  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  // All navigation links for mobile menu
  const navLinks = [
    { to: '/app', label: 'Home' },
    { to: '/app/progress', label: 'Progress Dashboard' },
    { to: '/app/reminders', label: 'Reminders' },
    { to: '/app/resources', label: 'Resources' },
    { to: '/app/retirement', label: '20+ Year Retirement' },
    { to: '/app/medboard', label: 'MedBoard' },
    { to: '/app/separation', label: 'Separation (<20 Yrs)' },
    { to: '/app/state-benefits', label: 'State Benefits' },
    { to: '/app/va-claims-builder', label: 'VA Claims Builder' },
    { to: '/app/retirement-calculator', label: 'Pay Calculator' },
    { to: '/app/appointments', label: 'Appointments & Tracking' },
    { to: '/app/resume-builder', label: 'Resume Builder' },
    { to: '/app/job-search', label: 'Job Search' },
    { to: '/app/profile', label: 'Profile' },
    { to: '/app/settings', label: 'Settings' },
    { to: '/app/faq', label: 'FAQ' },
    { to: '/app/about', label: 'About' }
  ]

  // Simplified desktop navigation - only essential items
  const desktopNavLinks = [
    { to: '/app', label: 'Home' },
    { to: '/app/progress', label: 'Progress' },
    { to: '/app/resources', label: 'Resources' },
    { to: '/app/settings', label: 'Settings' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/app"
                className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Military Transition
              </Link>
            </div>

            {/* Desktop Navigation - Simplified */}
            <div className="hidden lg:flex lg:space-x-6 lg:items-center">
              {desktopNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${
                    isActive(link.to)
                      ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-900 dark:text-blue-300'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  } inline-flex items-center px-4 py-2 border-b-2 text-sm font-semibold transition-colors rounded-t-md`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="ml-2 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors font-medium"
                aria-label="Log out"
              >
                Logout
              </button>
            </div>

            {/* Mobile controls: dark mode toggle + menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Dark Mode Toggle - Mobile */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Open main menu</span>
                {!mobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isActive(link.to)
                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-600 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'
                } block pl-3 pr-4 py-3 border-l-4 text-base font-medium transition-colors`}
              >
                {link.label}
              </Link>
            ))}

            {/* Logout Button - Mobile */}
            <button
              onClick={handleLogout}
              className="w-full text-left pl-3 pr-4 py-3 border-l-4 border-transparent text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 text-base font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Veterans Day Promo Banner */}
      <PromoBanner />

      <main className="flex-1 max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="bg-slate-800 dark:bg-slate-900 border-t border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <p className="text-slate-300 text-sm mb-2 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-lg">🔒</span>
              <strong>Your Privacy:</strong> End-to-end encrypted cloud storage
            </p>
            <p className="text-slate-400 text-xs">
              Military-grade encryption • Secure cloud backup • Access from any device
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm mb-4">
            <Link to="/app/about" className="text-slate-400 hover:text-white transition-colors">
              About This Project
            </Link>
            <Link to="/app/faq" className="text-slate-400 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/refund-policy" className="text-slate-400 hover:text-white transition-colors">
              Refund Policy
            </Link>
            <a
              href="mailto:support@formationlabs.net"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Contact Support
            </a>
          </div>

          <div className="text-center space-y-2">
            <p className="text-slate-400 text-xs flex items-center justify-center gap-2 flex-wrap">
              <span>Available on web now</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <span>📱</span>
                <span className="text-blue-400 font-medium">iOS app coming Spring 2026</span>
              </span>
            </p>
            <p className="text-slate-500 text-xs">
              Built by veterans, for veterans • 100% privacy-focused • Open and honest
            </p>
            <p className="text-slate-500 text-xs">
              © 2025 Military Transition Toolkit | Not affiliated with or endorsed by the U.S. Department of Defense
            </p>
          </div>
        </div>
      </footer>

      {/* AI Assistant - Available on all pages */}
      <AIAssistant />
    </div>
  )
}
