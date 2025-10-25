import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/app', label: 'Home' },
    { to: '/app/resources', label: 'Resources' },
    { to: '/app/retirement', label: '20+ Year Retirement' },
    { to: '/app/medboard', label: 'MedBoard' },
    { to: '/app/separation', label: 'Separation (<20 Yrs)' },
    { to: '/app/state-benefits', label: 'State Benefits' },
    { to: '/app/va-claims-builder', label: 'VA Claims Builder' },
    { to: '/app/retirement-calculator', label: 'Pay Calculator' },
    { to: '/app/appointments', label: 'Appointments & Tracking' },
    { to: '/app/profile', label: 'Profile' },
    { to: '/app/settings', label: 'Settings' },
    { to: '/app/faq', label: 'FAQ' },
    { to: '/app/about', label: 'About' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/app"
                className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Military Transition
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${
                    isActive(link.to)
                      ? 'border-blue-500 text-blue-700 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50'
                  } inline-flex items-center px-3 pt-1 border-b-2 text-sm font-semibold transition-colors rounded-t-md`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
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
          <div className="pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isActive(link.to)
                    ? 'bg-blue-100 border-blue-600 text-blue-700 font-semibold'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-3 border-l-4 text-base font-medium transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="bg-slate-800 border-t border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <p className="text-slate-300 text-sm mb-2 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-lg">🔒</span>
              <strong>Your Privacy:</strong> All data stored locally on your device only
            </p>
            <p className="text-slate-400 text-xs">
              No servers • No tracking • No accounts • No cloud storage
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
            <a
              href="mailto:support@militarytransitiontoolkit.com"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Contact Support
            </a>
          </div>

          <div className="text-center">
            <p className="text-slate-500 text-xs">
              Built by veterans, for veterans • 100% privacy-focused • Open and honest
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
