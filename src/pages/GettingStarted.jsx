import { Link } from 'react-router-dom'
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function GettingStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-green-600/20 text-green-400 rounded-full text-sm font-semibold mb-4">
            100% Free - No Login Required
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Start Using These Tools Right Now
        </h1>

        <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
          Access powerful transition planning tools instantly. No account needed, no credit card required.
        </p>

        {/* Free Tools Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* State Benefits Comparison */}
          <Link
            to="/public/state-benefits"
            className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 border-2 border-blue-600 hover:border-blue-400 transition-all hover:scale-105 group"
          >
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              State Benefits Comparison
            </h3>
            <p className="text-blue-100 mb-6 text-sm">
              Compare veteran benefits across all 50 states. Find the best place to live based on tax breaks, education, healthcare, and more.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-300 group-hover:text-blue-200 font-semibold">
              Start Comparing
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </Link>

          {/* Retirement Calculator */}
          <Link
            to="/public/retirement-calculator"
            className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 border-2 border-green-600 hover:border-green-400 transition-all hover:scale-105 group"
          >
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Retirement Calculator
            </h3>
            <p className="text-green-100 mb-6 text-sm">
              Calculate your military retirement pay under BRS or High-3. Plan your finances with accurate projections.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-300 group-hover:text-green-200 font-semibold">
              Calculate Now
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </Link>

          {/* Resources */}
          <Link
            to="/public/resources"
            className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-8 border-2 border-purple-600 hover:border-purple-400 transition-all hover:scale-105 group"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Resource Library
            </h3>
            <p className="text-purple-100 mb-6 text-sm">
              Access 60+ curated resources for VA benefits, healthcare, education, employment, and veteran support services.
            </p>
            <div className="flex items-center justify-center gap-2 text-purple-300 group-hover:text-purple-200 font-semibold">
              Browse Resources
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </Link>
        </div>

        {/* Sample Checklist */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 mb-16">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Preview: Transition Checklists
          </h3>
          <p className="text-slate-300 mb-6">
            See what our comprehensive transition checklists look like
          </p>
          <Link
            to="/public/sample-checklist"
            className="inline-block px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
          >
            View Sample Checklist
          </Link>
        </div>

        {/* Premium Features Teaser */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Want More? Go Premium
          </h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Unlock VA Claims Builder, Resume Builder, Job Tracker, and cloud storage to save your work across devices
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8 text-left max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <CheckCircleIcon className="w-8 h-8 mb-2" />
              <p className="font-semibold mb-1">VA Claims Builder</p>
              <p className="text-sm text-blue-100">Track claims with evidence management</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <CheckCircleIcon className="w-8 h-8 mb-2" />
              <p className="font-semibold mb-1">Resume Builder</p>
              <p className="text-sm text-blue-100">ATS-optimized military-to-civilian resumes</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <CheckCircleIcon className="w-8 h-8 mb-2" />
              <p className="font-semibold mb-1">Cloud Storage</p>
              <p className="text-sm text-blue-100">Save and sync across all devices</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/pricing"
              className="inline-block px-10 py-4 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-lg text-lg transition-colors shadow-xl"
            >
              View Premium Plans
            </Link>
          </div>

          <p className="text-blue-200 text-sm mt-4">
            From $7/month or $250 lifetime • All features included
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-800 border-t border-slate-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Built by veterans, for veterans • 100% privacy-focused
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <a href="mailto:support@formationlabs.net" className="text-slate-400 hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
