import { Link } from 'react-router-dom'

export default function MarketingAbout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation back to landing */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link to="/" className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors">
          ← Back to home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold mb-4">
            Built by Veterans, for Veterans
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Your Complete Military<br/>Transition Toolkit
        </h1>

        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          For transitioning service members AND current veterans. Plan your transition, file VA claims, compare states, and access comprehensive resources - all in one place.
        </p>

        <div className="flex gap-4 justify-center mb-12">
          <Link to="/app" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-lg transition-colors">
            Start Planning Free →
          </Link>
          <a href="#features" className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg text-lg transition-colors">
            Learn More
          </a>
        </div>

        <p className="text-slate-400 text-sm">
          100% private • Works on all devices
        </p>
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
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-3xl mb-3">😰</div>
            <h3 className="text-xl font-semibold text-white mb-2">Too Many Checklists</h3>
            <p className="text-slate-300">Scattered PDFs, confusing timelines, missed deadlines</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-3xl mb-3">💸</div>
            <h3 className="text-xl font-semibold text-white mb-2">Missed Benefits</h3>
            <p className="text-slate-300">Veterans leave thousands on the table from incomplete VA claims</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-3xl mb-3">🤔</div>
            <h3 className="text-xl font-semibold text-white mb-2">Poor Planning</h3>
            <p className="text-slate-300">Where to live? What job? How much money? Too many unknowns</p>
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
            <Link to="/signup" className="inline-block px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg text-lg hover:bg-blue-50 transition-colors">
              Get Started - It's Free →
            </Link>
            <p className="text-blue-200 text-sm mt-3">
              Sign up takes 30 seconds • No credit card required
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Everything You Need, One Place
          </h2>
          <p className="text-slate-300 text-lg">
            Comprehensive tools for every type of transition
          </p>
        </div>

        <div className="space-y-8">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded text-sm font-semibold mb-3">
                Timeline Checklists
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Never Miss a Critical Deadline</h3>
              <p className="text-slate-300 mb-4">
                Step-by-step checklists for 20+ year retirement, medical separation, or early ETS.
                Track your progress from 24 months out to day one civilian.
              </p>
              <ul className="text-slate-300 space-y-2">
                <li>✓ Personalized timeline based on your situation</li>
                <li>✓ Track completion progress</li>
                <li>✓ Secure cloud sync across devices (Premium)</li>
              </ul>
            </div>
            <div className="flex-1 bg-slate-700 rounded-lg p-6 text-center">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-slate-300">Interactive Checklists</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-green-600/20 text-green-400 rounded text-sm font-semibold mb-3">
                VA Claims Builder
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Get Every Dollar You Earned</h3>
              <p className="text-slate-300 mb-4">
                Build comprehensive VA disability claims with evidence tracking and statement generators.
                Don't leave money on the table.
              </p>
              <ul className="text-slate-300 space-y-2">
                <li>✓ Condition checklists by body system</li>
                <li>✓ Evidence tracker (what you have vs need)</li>
                <li>✓ Personal statement generator</li>
                <li>✓ Buddy statement templates</li>
              </ul>
            </div>
            <div className="flex-1 bg-slate-700 rounded-lg p-6 text-center">
              <div className="text-6xl mb-4">🏥</div>
              <p className="text-slate-300">Complete Claims Guidance</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 rounded text-sm font-semibold mb-3">
                Financial Planning
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Make Smart Money Decisions</h3>
              <p className="text-slate-300 mb-4">
                Calculate retirement pay, compare states, and understand your financial future.
                Make informed decisions that could save you $10k+ per year.
              </p>
              <ul className="text-slate-300 space-y-2">
                <li>✓ Retirement pay calculator (High-3 vs BRS)</li>
                <li>✓ State tax comparison (all 50 states)</li>
                <li>✓ VA disability compensation estimates</li>
                <li>✓ Side-by-side scenario planning</li>
              </ul>
            </div>
            <div className="flex-1 bg-slate-700 rounded-lg p-6 text-center">
              <div className="text-6xl mb-4">💰</div>
              <p className="text-slate-300">Smart Financial Tools</p>
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

      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-300 text-lg mb-4">
            Core features free forever. Premium options available.
          </p>
          <div className="inline-block px-6 py-3 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg">
            <p className="text-yellow-400 font-bold text-sm md:text-base">
              🎖️ Sign up before Nov 11 to become a Founding Member with lifetime free access!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Free Tier */}
          <div className="bg-slate-800 rounded-lg p-6 border-2 border-slate-700">
            <h3 className="text-xl font-bold text-white mb-2">Free</h3>
            <p className="text-slate-400 text-sm mb-4">Core transition features</p>
            <div className="text-3xl font-bold text-white mb-6">
              $0<span className="text-base text-slate-400">/forever</span>
            </div>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex gap-2"><span className="text-green-400">✓</span><span className="text-slate-300">All transition checklists</span></li>
              <li className="flex gap-2"><span className="text-green-400">✓</span><span className="text-slate-300">Basic calculators</span></li>
              <li className="flex gap-2"><span className="text-green-400">✓</span><span className="text-slate-300">State comparison</span></li>
              <li className="flex gap-2"><span className="text-green-400">✓</span><span className="text-slate-300">Appointment tracking</span></li>
              <li className="flex gap-2"><span className="text-green-400">✓</span><span className="text-slate-300">Resource library</span></li>
            </ul>
            <Link to="/app" className="block w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg text-center transition-colors text-sm">
              Start Free
            </Link>
          </div>

          {/* Monthly */}
          <div className="bg-slate-800 rounded-lg p-6 border-2 border-slate-600">
            <h3 className="text-xl font-bold text-white mb-2">Monthly</h3>
            <p className="text-slate-400 text-sm mb-4">Pay as you go</p>
            <div className="text-3xl font-bold text-white mb-6">
              $7<span className="text-base text-slate-400">/month</span>
            </div>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex gap-2"><span className="text-blue-400">✓</span><span className="text-slate-300">Everything in Free</span></li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span><span className="text-slate-300">VA claims builder</span></li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span><span className="text-slate-300">Statement generators</span></li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span><span className="text-slate-300">Evidence tracker</span></li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span><span className="text-slate-300">PDF exports</span></li>
            </ul>
            <Link to="/pricing" className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-center transition-colors text-sm">
              Subscribe Monthly
            </Link>
          </div>

          {/* Annual - Best Value */}
          <div className="bg-slate-800 rounded-lg p-6 border-2 border-blue-500 relative transform md:scale-105 shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
              BEST VALUE
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Annual</h3>
            <p className="text-slate-400 text-sm mb-4">Save $35/year</p>
            <div className="text-3xl font-bold text-white mb-1">
              $49<span className="text-base text-slate-400">/year</span>
            </div>
            <p className="text-green-400 text-xs font-semibold mb-4">Save 42% vs Monthly</p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex gap-2"><span className="text-blue-400">✓</span><span className="text-slate-300">Everything in Free</span></li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span><span className="text-slate-300">VA claims builder</span></li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span><span className="text-slate-300">Statement generators</span></li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span><span className="text-slate-300">Evidence tracker</span></li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span><span className="text-slate-300">PDF exports</span></li>
            </ul>
            <Link to="/pricing" className="block w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-lg text-center transition-colors text-sm shadow-lg">
              Subscribe Annual
            </Link>
          </div>

          {/* Lifetime - Founding Member */}
          <div className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 rounded-lg p-6 border-2 border-yellow-500 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 text-xs font-bold rounded-full">
              FOUNDING MEMBER
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Lifetime</h3>
            <p className="text-yellow-400 text-sm mb-4">One-time payment</p>
            <div className="text-3xl font-bold text-white mb-1">
              $249<span className="text-base text-slate-400">/lifetime</span>
            </div>
            <p className="text-green-400 text-xs font-semibold mb-4">Limited-time offer</p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">✓</span><span className="text-slate-300">Everything in Premium</span></li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span><span className="text-slate-300">Lifetime access</span></li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span><span className="text-slate-300">All future features</span></li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span><span className="text-slate-300">Founding Member badge</span></li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span><span className="text-slate-300">Priority support</span></li>
            </ul>
            <Link to="/pricing" className="block w-full py-2.5 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-slate-900 font-bold rounded-lg text-center transition-colors text-sm shadow-lg">
              Become Founding Member
            </Link>
          </div>
        </div>

        {/* Shutdown Promo Notice */}
        <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">
              🎖️ Government Shutdown Support Program
            </h3>
            <p className="text-slate-300 mb-4">
              All premium features are <strong className="text-white">completely FREE</strong> during the government shutdown. Sign up before <strong className="text-yellow-400">November 11, 2025</strong> to lock in lifetime free access as a <strong className="text-white">Founding Member</strong>.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-left">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-yellow-400 font-semibold mb-2">✓ What You Get NOW (Free):</p>
                <ul className="text-slate-300 space-y-1 text-xs">
                  <li>• Complete VA Claims Builder</li>
                  <li>• All Premium Features Unlocked</li>
                  <li>• Unlimited PDF Exports</li>
                  <li>• Priority Support</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-yellow-400 font-semibold mb-2">✓ What Happens After Shutdown:</p>
                <ul className="text-slate-300 space-y-1 text-xs">
                  <li>• Keep ALL premium features forever</li>
                  <li>• Founding Member badge & recognition</li>
                  <li>• Never pay a subscription fee</li>
                  <li>• Access to all future updates</li>
                </ul>
              </div>
            </div>
            <Link to="/app" className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-slate-900 font-bold rounded-lg transition-colors shadow-lg">
              Claim Your Founding Member Status →
            </Link>
          </div>
        </div>
      </div>

      {/* Try Our Tools Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Try Our Tools - No Signup Required
          </h2>
          <p className="text-xl text-slate-300">
            Explore our toolkit with these free previews
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Start Planning Your Transition Today
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          Join thousands of service members successfully transitioning with our free tools
        </p>
        <Link to="/signup" className="inline-block px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg transition-colors">
          Get Started Free →
        </Link>
        <p className="text-slate-400 text-sm mt-4">
          No credit card required • Start in 30 seconds
        </p>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/app" className="hover:text-white">Checklists</Link></li>
                <li><Link to="/app" className="hover:text-white">Calculators</Link></li>
                <li><Link to="/app" className="hover:text-white">VA Claims</Link></li>
                <li><Link to="/app" className="hover:text-white">State Comparison</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/app/faq" className="hover:text-white">FAQ</Link></li>
                <li><a href="mailto:support@formationlabs.net" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Built by Veterans</h4>
              <p className="text-slate-400 text-sm mb-3">
                Created by transitioning service members, for transitioning service members.
              </p>
              <p className="text-slate-500 text-xs">
                🇺🇸 Thank you for your service
              </p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
            <p>© 2025 Military Transition Toolkit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
