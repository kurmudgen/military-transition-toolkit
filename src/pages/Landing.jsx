import { Link } from 'react-router-dom'
import AnnouncementBanner from '../components/AnnouncementBanner'
import PublicNav from '../components/Navigation/PublicNav'
import InteractivePreview from '../components/InteractivePreview'
import { useAuth } from '../contexts/AuthContext'

export default function Landing() {
  const { user } = useAuth()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Navigation Bar */}
      <PublicNav currentPage="/" />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
        {/* Social Proof Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-full text-sm">
            <span className="text-green-400">✓</span>
            <span className="text-slate-300">Trusted by 90+ transitioning service members</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-full text-sm">
            <span className="text-blue-400">🎖️</span>
            <span className="text-slate-300">Built by a Veteran, For Veterans</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-700 rounded-full text-sm">
            <span className="text-green-400">💚</span>
            <span className="text-green-300 font-semibold">100% Free Forever</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Your Complete Military Transition Toolkit
        </h1>

        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Don't leave money on the table. Get organized, file winning VA claims, and plan your future with confidence.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          {!user ? (
            <>
              <Link to="/signup" className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl text-xl transition-all shadow-xl hover:shadow-blue-500/25 hover:scale-105">
                Start Planning Your Transition - Free
              </Link>
            </>
          ) : (
            <Link to="/app" className="px-10 py-5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl text-xl transition-all shadow-xl hover:shadow-blue-500/25">
              Go to Dashboard →
            </Link>
          )}
        </div>

        {/* Trust Indicators */}
        {!user && (
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Your data is secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <span>No spam, ever</span>
            </div>
          </div>
        )}
      </div>

      {/* Benefits Section - Outcome Focused */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Benefit 1 - VA Claims */}
          <Link
            to="/va-claims"
            className="block bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-green-500/50 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">📋</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Build winning VA claims with organized evidence tracking</h3>
                <p className="text-green-400 font-semibold mb-2">Average 50% rating = $1,075/month for life</p>
                <p className="text-slate-400 text-sm mb-3">Track conditions, gather evidence, generate personal statements - everything in one place</p>
                <span className="text-green-400 font-semibold text-sm group-hover:underline">
                  Try it free →
                </span>
              </div>
            </div>
          </Link>

          {/* Benefit 2 - Resume */}
          <Link
            to="/resume-builder"
            className="block bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">📄</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Translate your MOS to civilian careers that actually pay</h3>
                <p className="text-purple-400 font-semibold mb-2">Resume builder with military-to-civilian language</p>
                <p className="text-slate-400 text-sm mb-3">Stop confusing recruiters with military jargon - we translate it for you</p>
                <span className="text-purple-400 font-semibold text-sm group-hover:underline">
                  Try it free →
                </span>
              </div>
            </div>
          </Link>

          {/* Benefit 3 - State Benefits */}
          <Link
            to="/state-benefits"
            className="block bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">🗺️</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Discover state veteran benefits worth $50k+ you didn't know existed</h3>
                <p className="text-blue-400 font-semibold mb-2">All 50 states, personalized to your situation</p>
                <p className="text-slate-400 text-sm mb-3">Compare taxes, education, healthcare, and job markets to find your perfect state</p>
                <span className="text-blue-400 font-semibold text-sm group-hover:underline">
                  Compare states →
                </span>
              </div>
            </div>
          </Link>

          {/* Benefit 4 - Timeline */}
          <Link
            to={user ? "/app/retirement" : "/signup"}
            className="block bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-yellow-500/50 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">📅</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Plan your entire transition timeline in one place</h3>
                <p className="text-yellow-400 font-semibold mb-2">Personalized checklist based on your separation date</p>
                <p className="text-slate-400 text-sm mb-3">Never miss a deadline - from 24 months out to your first day as a civilian</p>
                <span className="text-yellow-400 font-semibold text-sm group-hover:underline">
                  Start planning →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Interactive Preview Section */}
      <InteractivePreview />

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
              <h3 className="text-xl font-semibold text-white mb-3">How we sustain this:</h3>
              <p className="text-slate-300">
                MTT is 100% free for all servicemembers and veterans. We're building partnerships with quality organizations that serve transitioning servicemembers - training providers, financial services, education platforms. Optional donations are welcome but never required.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">How you can help keep MTT free:</h3>
              <ul className="space-y-2 text-slate-300">
                <li>🤝 Know an organization we should recommend? Put us in touch</li>
                <li>📢 Share MTT with others going through transition</li>
                <li>💼 Use our affiliate links when purchasing recommended services - helps at no cost to you</li>
              </ul>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-100">
                <strong className="text-blue-300">Our commitment:</strong> MTT is completely free - no subscriptions, no paywalls, no catch. If we ever need to change this model, current users will be grandfathered in.
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

      {/* Quick Links to Free Tools */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            More Free Tools - No Signup Required
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <Link to="/state-benefits" className="group bg-slate-800 hover:bg-slate-700 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all text-center">
            <div className="text-3xl mb-2">🗺️</div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-400">State Benefits</h3>
          </Link>

          <Link to="/public/retirement-calculator" className="group bg-slate-800 hover:bg-slate-700 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-400">Retirement Calculator</h3>
          </Link>

          <Link to="/public/resources" className="group bg-slate-800 hover:bg-slate-700 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all text-center">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-400">60+ Resources</h3>
          </Link>

          <Link to="/demo/va-claims" className="group bg-slate-800 hover:bg-slate-700 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all text-center">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-400">VA Claims Demo</h3>
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
          {!user ? 'Ready to Take Control of Your Transition?' : 'Ready to Continue Your Transition?'}
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          Join 90+ service members who are already using MTT to plan their future.
        </p>
        {!user ? (
          <>
            <Link to="/signup" className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xl font-bold rounded-xl transition-all shadow-xl hover:shadow-blue-500/25 hover:scale-105">
              Create Your Free Account →
            </Link>
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>100% free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Built by veterans</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/app" className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xl font-bold rounded-xl transition-all shadow-xl hover:shadow-blue-500/25">
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
