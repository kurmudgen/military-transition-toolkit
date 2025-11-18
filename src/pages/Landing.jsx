import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AnnouncementBanner from '../components/AnnouncementBanner'

export default function Landing() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Navigation Bar */}
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              Military Transition Toolkit
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <Link to="/resources" className="text-slate-300 hover:text-white transition-colors">
                Resources
              </Link>
              <Link to="/blog" className="text-slate-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/state-benefits" className="text-slate-300 hover:text-white transition-colors">
                State Benefits
              </Link>
              <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">
                FAQ
              </Link>

              {/* Show different buttons based on auth state */}
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
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-slate-900 font-semibold rounded-lg transition-colors"
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
                  Go to Dashboard →
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {!user ? (
                // Not logged in - show Login and Sign Up
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-white text-sm rounded-lg transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-slate-900 font-semibold text-sm rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                // Logged in - show Dashboard link
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

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Military Transition Toolkit
        </h1>

        <p className="text-xl text-slate-300 mb-6 max-w-3xl mx-auto">
          Navigate your transition with VA claims tracking, state benefits comparison, and comprehensive planning tools
        </p>

        <p className="text-lg font-semibold text-yellow-400 mb-8">
          Currently Free - Mission: Stay Free Forever
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          {!user ? (
            <>
              <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg text-lg transition-colors shadow-lg">
                Get Started Free
              </Link>
              <Link to="/about" className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg text-lg transition-colors shadow-lg">
                Our Mission
              </Link>
            </>
          ) : (
            <Link to="/app" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg text-lg transition-colors shadow-lg">
              Go to Dashboard →
            </Link>
          )}
        </div>
      </div>

      {/* Mission & Sustainability Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 sm:p-12 border border-slate-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">💡 Our Mission & Sustainability</h2>
            <p className="text-slate-300 text-lg">
              Military Transition Toolkit is currently free and our mission is to keep it that way.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">How we plan to sustain this:</h3>
              <p className="text-slate-300">
                We're actively seeking partnerships with organizations that serve transitioning servicemembers and veterans - training providers, financial services, education platforms - to support operating costs while keeping the platform free.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">How you can help keep MTT free:</h3>
              <ul className="space-y-2 text-slate-300">
                <li>🤝 Know an organization that might partner with us? Put us in touch</li>
                <li>📢 Share MTT with others going through transition - growth helps attract partners</li>
                <li>💼 Use our affiliate links when purchasing recommended services - helps at no cost to you</li>
              </ul>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-100">
                <strong className="text-blue-300">Our commitment:</strong> As long as affiliate partnerships sustain operations, MTT stays free. If circumstances change, current members will be grandfathered in.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/resources"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-center transition-colors shadow-lg"
            >
              Explore Resources & Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Try Our Tools Section - Moved Higher */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Try Our Tools - No Signup Required
          </h2>
          <p className="text-xl text-slate-300">
            Explore our toolkit with these free previews
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* State Benefits */}
          <Link to="/public/state-benefits" className="group bg-slate-800 hover:bg-slate-700 rounded-xl p-6 border-2 border-slate-700 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-3">🗺️</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              State Benefits Comparison
            </h3>
            <p className="text-slate-300 mb-4">
              Browse veteran benefits across all 50 states. See tax advantages, education benefits, and more.
            </p>
            <span className="text-blue-400 text-sm font-semibold">
              Explore States →
            </span>
          </Link>

          {/* Retirement Calculator */}
          <Link to="/public/retirement-calculator" className="group bg-slate-800 hover:bg-slate-700 rounded-xl p-6 border-2 border-slate-700 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Retirement Pay Calculator
            </h3>
            <p className="text-slate-300 mb-4">
              Calculate your estimated retirement pay. Try our basic calculator with High-3 and BRS systems.
            </p>
            <span className="text-blue-400 text-sm font-semibold">
              Calculate Pay →
            </span>
          </Link>

          {/* Resource Library */}
          <Link to="/public/resources" className="group bg-slate-800 hover:bg-slate-700 rounded-xl p-6 border-2 border-slate-700 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Resource Library
            </h3>
            <p className="text-slate-300 mb-4">
              Access 60+ curated resources for career planning, VA benefits, education, and more.
            </p>
            <span className="text-blue-400 text-sm font-semibold">
              Browse Resources →
            </span>
          </Link>

          {/* Sample Checklist */}
          <Link to="/public/sample-checklist" className="group bg-slate-800 hover:bg-slate-700 rounded-xl p-6 border-2 border-slate-700 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Sample Transition Checklist
            </h3>
            <p className="text-slate-300 mb-4">
              Preview our comprehensive 20+ year retirement timeline with detailed action items.
            </p>
            <span className="text-blue-400 text-sm font-semibold">
              View Checklist →
            </span>
          </Link>

          {/* NEW: VA Claims Builder Demo */}
          <Link to="/demo/va-claims" className="group bg-gradient-to-br from-blue-900/40 to-indigo-900/40 hover:from-blue-800/50 hover:to-indigo-800/50 rounded-xl p-6 border-2 border-blue-500 hover:border-blue-400 transition-all lg:col-span-2">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Try VA Claims Builder
            </h3>
            <p className="text-slate-300 mb-4">
              Build a complete VA disability claim with condition-specific tracking. See how it works before signing up.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-sm font-semibold">
                Try Demo →
              </span>
              <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500 text-yellow-400 text-xs font-bold rounded">
                FEATURED
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Problem Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Transitioning is Overwhelming
          </h2>
          <p className="text-slate-300 text-lg">
            200,000 service members transition annually. Most are confused and unprepared.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 shadow-lg">
            <div className="text-3xl mb-3">😰</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Too Many Checklists</h3>
            <p className="text-gray-600 dark:text-slate-300">Scattered PDFs, confusing timelines, missed deadlines</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 shadow-lg">
            <div className="text-3xl mb-3">💸</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Missed Benefits</h3>
            <p className="text-gray-600 dark:text-slate-300">Veterans leave thousands on the table from incomplete VA claims</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 shadow-lg">
            <div className="text-3xl mb-3">🤔</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Poor Planning</h3>
            <p className="text-gray-600 dark:text-slate-300">Where to live? What job? How much money? Too many unknowns</p>
          </div>
        </div>
      </div>

      {/* Already Separated Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 border-2 border-blue-600">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-blue-600/30 text-blue-200 rounded-full text-sm font-semibold mb-4">
              Already Out?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Already Separated? We've Got You Covered
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Current veterans can use our tools to file VA claims, compare state benefits, and access resources - no transition planning needed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-blue-400/30">
              <div className="text-4xl mb-3">🏥</div>
              <h3 className="text-xl font-semibold text-white mb-2">VA Claims Builder</h3>
              <p className="text-blue-100 text-sm">
                Build comprehensive claims with evidence tracking, personal statement generators, and buddy statement templates. Get every dollar you earned.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-blue-400/30">
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="text-xl font-semibold text-white mb-2">State Benefits Comparison</h3>
              <p className="text-blue-100 text-sm">
                Compare veteran benefits across all 50 states. Find the best place to live based on tax breaks, healthcare, education benefits, and more.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-blue-400/30">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-semibold text-white mb-2">Resource Library</h3>
              <p className="text-blue-100 text-sm">
                Access 60+ curated resources for VA benefits, healthcare, education, employment rights, and veteran-specific support services.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/getting-started" className="inline-block px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg text-lg hover:bg-blue-50 transition-colors">
              Explore Free Tools →
            </Link>
            <p className="text-blue-200 text-sm mt-3">
              100% free • No credit card required
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need, One Place
          </h2>
          <p className="text-gray-700 dark:text-slate-300 text-lg">
            Comprehensive tools for every type of transition
          </p>
        </div>

        <div className="space-y-8">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700 shadow-lg">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded text-sm font-semibold mb-3">
                Timeline Checklists
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Never Miss a Critical Deadline</h3>
              <p className="text-gray-700 dark:text-slate-300 mb-4">
                Step-by-step checklists for 20+ year retirement, medical separation, or early ETS.
                Track your progress from 24 months out to day one civilian.
              </p>
              <ul className="text-gray-700 dark:text-slate-300 space-y-2">
                <li>✓ Personalized timeline based on your situation</li>
                <li>✓ Track completion progress</li>
                <li>✓ Secure cloud sync across devices</li>
              </ul>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-lg p-6 text-center">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-700 dark:text-slate-300">Interactive Checklists</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700 shadow-lg">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-green-600/20 text-green-400 rounded text-sm font-semibold mb-3">
                VA Claims Builder
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get Every Dollar You Earned</h3>
              <p className="text-gray-700 dark:text-slate-300 mb-4">
                Build comprehensive VA disability claims with evidence tracking and statement generators.
                Don't leave money on the table.
              </p>
              <ul className="text-gray-700 dark:text-slate-300 space-y-2">
                <li>✓ Condition checklists by body system</li>
                <li>✓ Evidence tracker (what you have vs need)</li>
                <li>✓ Personal statement generator</li>
                <li>✓ Buddy statement templates</li>
              </ul>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-lg p-6 text-center">
              <div className="text-6xl mb-4">🏥</div>
              <p className="text-gray-700 dark:text-slate-300">Complete Claims Guidance</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700 shadow-lg">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 rounded text-sm font-semibold mb-3">
                Financial Planning
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Make Smart Money Decisions</h3>
              <p className="text-gray-700 dark:text-slate-300 mb-4">
                Calculate retirement pay, compare states, and understand your financial future.
                Make informed decisions that could save you $10k+ per year.
              </p>
              <ul className="text-gray-700 dark:text-slate-300 space-y-2">
                <li>✓ Retirement pay calculator (High-3 vs BRS)</li>
                <li>✓ State tax comparison (all 50 states)</li>
                <li>✓ VA disability compensation estimates</li>
                <li>✓ Side-by-side scenario planning</li>
              </ul>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-lg p-6 text-center">
              <div className="text-6xl mb-4">💰</div>
              <p className="text-gray-700 dark:text-slate-300">Smart Financial Tools</p>
            </div>
          </div>

          {/* More features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <h4 className="text-lg font-semibold text-white mb-2">State Comparison</h4>
              <p className="text-slate-300 text-sm">Interactive map showing veteran benefits, taxes, and cost of living</p>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
              <div className="text-4xl mb-3">📅</div>
              <h4 className="text-lg font-semibold text-white mb-2">Appointment Tracker</h4>
              <p className="text-slate-300 text-sm">Never miss medical appointments, PEBLO meetings, or TAP classes</p>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
              <div className="text-4xl mb-3">🏥</div>
              <h4 className="text-lg font-semibold text-white mb-2">MedBoard Timeline</h4>
              <p className="text-slate-300 text-sm">Complete IDES/MedBoard process guidance with phase-by-phase tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Military-Grade Privacy & Security
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Your data is protected with end-to-end encryption and zero-knowledge architecture.
            We mathematically cannot access your information - only you hold the keys.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
            <div className="flex gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300 text-sm">End-to-end encryption</span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300 text-sm">Zero-knowledge security</span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300 text-sm">Never sell your data</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          {!user ? 'Start Planning Your Transition Today' : 'Ready to Continue Your Transition?'}
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          Built by veterans who've been through this process. We know what you're going through.
        </p>
        {!user ? (
          <>
            <Link to="/signup" className="inline-block px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xl font-bold rounded-lg transition-colors shadow-lg">
              Get Started Free →
            </Link>
            <p className="text-slate-400 text-sm mt-4">
              100% free • No credit card required
            </p>
          </>
        ) : (
          <>
            <Link to="/app" className="inline-block px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-lg transition-colors shadow-lg">
              Go to Your Dashboard →
            </Link>
            <p className="text-slate-400 text-sm mt-4">
              Access all your personalized transition tools and resources
            </p>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Product</h4>
              <ul className="space-y-2 text-gray-600 dark:text-slate-400 text-sm">
                <li><Link to="/app" className="hover:text-gray-900 dark:hover:text-white">Checklists</Link></li>
                <li><Link to="/app" className="hover:text-gray-900 dark:hover:text-white">Calculators</Link></li>
                <li><Link to="/app" className="hover:text-gray-900 dark:hover:text-white">VA Claims</Link></li>
                <li><Link to="/app" className="hover:text-gray-900 dark:hover:text-white">State Comparison</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Company</h4>
              <ul className="space-y-2 text-gray-600 dark:text-slate-400 text-sm">
                <li><Link to="/blog" className="hover:text-gray-900 dark:hover:text-white">Blog</Link></li>
                <li><Link to="/about" className="hover:text-gray-900 dark:hover:text-white">About</Link></li>
                <li><Link to="/faq" className="hover:text-gray-900 dark:hover:text-white">FAQ</Link></li>
                <li><a href="mailto:support@formationlabs.net" className="hover:text-gray-900 dark:hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-600 dark:text-slate-400 text-sm">
                <li><Link to="/terms" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Built by Veterans</h4>
              <p className="text-gray-600 dark:text-slate-400 text-sm">
                Created by transitioning service members, for transitioning service members.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-slate-700 pt-6 text-center text-gray-600 dark:text-slate-400 text-sm">
            <p>© 2025 Military Transition Toolkit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
