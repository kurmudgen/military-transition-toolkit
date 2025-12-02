import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AIAssistant from './AIAssistant'
import PublicNav from './Navigation/PublicNav'

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
  const { signOut, user } = useAuth()

  // All features are free - no premium gates

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

  // All navigation links for mobile menu - all features free
  const navLinks = [
    { to: '/app', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/app/progress', label: 'Progress Dashboard' },
    { to: '/app/reminders', label: 'Reminders' },
    { to: '/app/resources', label: 'Resources' },
    { to: '/app/retirement', label: '20+ Year Retirement' },
    { to: '/app/medboard', label: 'MedBoard' },
    { to: '/app/separation', label: 'Separation (<20 Yrs)' },
    { to: '/state-benefits', label: 'State Benefits' },
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

  // Simplified desktop navigation - only essential items - all free
  const desktopNavLinks = [
    { to: '/app', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/app/progress', label: 'Progress' },
    { to: '/app/resources', label: 'Resources' },
    { to: '/state-benefits', label: 'State Benefits' },
    { to: '/app/va-claims-builder', label: 'VA Claims', highlighted: true },
    { to: '/app/settings', label: 'Settings' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      <PublicNav />

      <main className="flex-1 max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="bg-slate-800 dark:bg-slate-900 border-t border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Sustainability Banner */}
          <div className="text-center mb-8 bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <p className="text-blue-100 text-sm mb-2 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-lg">💡</span>
              <strong>Currently Free - Mission: Stay Free Forever</strong>
            </p>
            <p className="text-blue-200 text-xs">
              100% free for all servicemembers and veterans. Optional donations welcome but never required.
            </p>
          </div>

          {/* Privacy Banner */}
          <div className="text-center mb-8">
            <p className="text-slate-300 text-sm mb-2 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-lg">🔒</span>
              <strong>Your Privacy:</strong> End-to-end encrypted cloud storage
            </p>
            <p className="text-slate-400 text-xs">
              Military-grade encryption • Secure cloud backup • Access from any device
            </p>
          </div>

          {/* Footer Navigation - Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-4xl mx-auto">
            {/* Company Column */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/app/about" className="text-slate-400 hover:text-white transition-colors text-sm">
                    About & Mission
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@formationlabs.net"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/resources" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Recommended Resources
                  </Link>
                </li>
                <li>
                  <a
                    href="https://docs.google.com/document/d/1pJ0rHGXtb9g3txue9hsiN-kritb-_ZAml1r6P2axq98/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.google.com/document/d/10YECz-KhGHPeUjnzRvA1HYGnVIu6A2GSsUzHvd4v_k0/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    href="https://forms.gle/Z3ZFnphafATv7pRn6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Give Feedback
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/app/faq" className="text-slate-400 hover:text-white transition-colors text-sm">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="text-center space-y-2 pt-6 border-t border-slate-700">
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
