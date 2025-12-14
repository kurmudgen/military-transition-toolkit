import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function PublicNav({ currentPage = '' }) {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const AuthAwareLink = ({ to, children, requiresAuth = false }) => {
    if (requiresAuth && !user) {
      return (
        <span 
          className="text-slate-500 cursor-not-allowed px-3 py-2 text-sm font-medium"
          title="Sign in to access this feature"
        >
          {children}
        </span>
      )
    }

    return (
      <Link
        to={to}
        className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/50 transition-colors"
      >
        {children}
      </Link>
    )
  }

  const renderToolsDropdown = () => (
    <div className="absolute left-0 top-full pt-2 w-80 z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2">
        {/* Planning Section */}
        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Planning
          </div>
          <Link
            to="/app/progress"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">✓</span>
            <span>Transition Checklist</span>
          </Link>
          <Link
            to="/app/timeline"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">📅</span>
            <span>Timeline Tracker</span>
          </Link>
          <Link
            to="/app/appointments"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">📋</span>
            <span>Appointments</span>
          </Link>
        </div>

        <div className="border-t border-slate-700 my-2"></div>

        {/* VA & Medical Section */}
        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            VA & Medical
          </div>
          <Link
            to={user ? "/app/va-claims-builder" : "/va-claims"}
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">🏥</span>
            <span>VA Claims Builder</span>
          </Link>
          <Link
            to="/app/evidence-tracker"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">📂</span>
            <span>Evidence Tracker</span>
          </Link>
          <Link
            to="/app/medboard-timeline"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">⏱️</span>
            <span>MedBoard Timeline</span>
          </Link>
        </div>

        <div className="border-t border-slate-700 my-2"></div>

        {/* Career Section */}
        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Career
          </div>
          <Link
            to={user ? "/app/resume-builder" : "/resume-builder"}
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">📄</span>
            <span>Resume Translator</span>
          </Link>
          <Link
            to="/app/job-search"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">🔍</span>
            <span>Job Search</span>
          </Link>
        </div>

        <div className="border-t border-slate-700 my-2"></div>

        {/* Financial Calculators Section */}
        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Financial Calculators
          </div>
          
          {/* Retirement & Pay */}
          <div className="text-xs text-slate-500 uppercase tracking-wider mt-2 mb-1 pl-3">
            Retirement & Pay
          </div>
          <Link
            to="/public/retirement-calculator"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">💰</span>
            <span>Retirement Calculator</span>
          </Link>
          <Link
            to="/calculator/terminal-leave"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">🏖️</span>
            <span>Terminal Leave Calculator</span>
          </Link>
          <div className="flex items-center px-3 py-2 text-sm text-slate-500">
            <span className="mr-3">💼</span>
            <span>TSP vs 401k Comparison</span>
            <span className="ml-auto text-xs bg-slate-700 px-2 py-0.5 rounded">Soon</span>
          </div>

          {/* Education Benefits */}
          <div className="text-xs text-slate-500 uppercase tracking-wider mt-3 mb-1 pl-3">
            Education Benefits
          </div>
          <div className="flex items-center px-3 py-2 text-sm text-slate-500">
            <span className="mr-3">🎓</span>
            <span>GI Bill BAH Calculator</span>
            <span className="ml-auto text-xs bg-slate-700 px-2 py-0.5 rounded">Soon</span>
          </div>

          {/* Cost of Living */}
          <div className="text-xs text-slate-500 uppercase tracking-wider mt-3 mb-1 pl-3">
            Cost of Living
          </div>
          <div className="flex items-center px-3 py-2 text-sm text-slate-500">
            <span className="mr-3">🏠</span>
            <span>BAH Comparison Tool</span>
            <span className="ml-auto text-xs bg-slate-700 px-2 py-0.5 rounded">Soon</span>
          </div>
          <div className="flex items-center px-3 py-2 text-sm text-slate-500">
            <span className="mr-3">📊</span>
            <span>Cost of Living Calculator</span>
            <span className="ml-auto text-xs bg-slate-700 px-2 py-0.5 rounded">Soon</span>
          </div>
        </div>

        <div className="border-t border-slate-700 my-2"></div>

        {/* State Benefits */}
        <div className="px-4 py-2">
          <Link
            to="/state-benefits"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setToolsOpen(false)}
          >
            <span className="mr-3">🗺️</span>
            <span>State Benefits Comparison</span>
          </Link>
        </div>
      </div>
    </div>
  )

  const renderResourcesDropdown = () => (
    <div className="absolute left-0 top-full pt-2 w-56 z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2">
        <div className="px-4 py-2">
          <Link
            to="/blog"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setResourcesOpen(false)}
          >
            <span className="mr-3">✍️</span>
            <span>Blog & Guides</span>
          </Link>
          <Link
            to="/resources"
            className="flex items-center px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            onClick={() => setResourcesOpen(false)}
          >
            <span className="mr-3">🔗</span>
            <span>Trusted Resources</span>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link to={user ? "/app" : "/"} className="flex items-center">
              <span className="text-2xl font-bold text-white">MTT</span>
            </Link>
          </div>

          {/* Center - Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <Link
              to={user ? "/app" : "/"}
              className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/50 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/blog"
              className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/50 transition-colors"
            >
              Blog
            </Link>

            {/* Tools Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/50 transition-colors flex items-center">
                Tools
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {toolsOpen && renderToolsDropdown()}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/50 transition-colors flex items-center">
                Resources
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesOpen && renderResourcesDropdown()}
            </div>

            <Link
              to="/state-benefits"
              className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/50 transition-colors"
            >
              State Benefits
            </Link>

            <AuthAwareLink to="/app/progress" requiresAuth={true}>
              Progress
            </AuthAwareLink>

            <Link
              to={user ? "/app/va-claims-builder" : "/va-claims"}
              className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-700/50 transition-colors"
            >
              VA Claims
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {loading ? (
              // Loading skeleton
              <div className="flex items-center space-x-2">
                <div className="w-20 h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-28 h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
              </div>
            ) : user ? (
              // Logged in
              <>
                <Link
                  to="/app/settings"
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
                >
                  Logout
                </button>
              </>
            ) : (
              // Logged out
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bg-slate-800 border-t border-slate-700 shadow-xl z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="py-4 space-y-1 px-4">
              <Link
                to={user ? "/app" : "/"}
                className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/blog"
                className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <Link
                to="/state-benefits"
                className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                State Benefits
              </Link>

              {user && (
                <Link
                  to="/app/progress"
                  className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Progress
                </Link>
              )}

              <Link
                to={user ? "/app/va-claims-builder" : "/va-claims"}
                className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                VA Claims
              </Link>

              {/* Mobile Tools Section */}
              <details className="group">
                <summary className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg cursor-pointer">
                  Tools
                </summary>
                <div className="pl-6 space-y-1 mt-2">
                  <Link
                    to="/app/progress"
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Transition Checklist
                  </Link>
                  <Link
                    to={user ? "/app/resume-builder" : "/resume-builder"}
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resume Translator
                  </Link>
                  <Link
                    to="/public/retirement-calculator"
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Retirement Calculator
                  </Link>
                  <Link
                    to="/calculator/terminal-leave"
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Terminal Leave Calculator
                  </Link>
                </div>
              </details>

              {/* Mobile Resources Section */}
              <details className="group">
                <summary className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg cursor-pointer">
                  Resources
                </summary>
                <div className="pl-6 space-y-1 mt-2">
                  <Link
                    to="/blog"
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog & Guides
                  </Link>
                  <Link
                    to="/resources"
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Partner Resources
                  </Link>
                </div>
              </details>

              {/* Mobile Auth Section */}
              <div className="border-t border-slate-700 mt-4 pt-4">
                {loading ? (
                  <div className="space-y-2 px-3">
                    <div className="h-12 bg-slate-700/50 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-slate-700/50 rounded-lg animate-pulse"></div>
                  </div>
                ) : user ? (
                  <div className="space-y-2">
                    <Link
                      to="/app/settings"
                      className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg text-center"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-3 text-base font-medium text-white bg-blue-600 rounded-lg text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
