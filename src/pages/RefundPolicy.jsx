import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function RefundPolicy() {
  useEffect(() => {
    document.title = 'Refund Policy | Military Transition Toolkit'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6 border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-2">Refund Policy</h1>
          <p className="text-slate-300">100% Free - No Refunds Needed</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* It's Free */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">💯 Military Transition Toolkit is 100% Free</h2>
            <p className="text-slate-300 mb-4">
              There are <strong>no subscriptions, no payments, and no hidden fees</strong> for any features
              on Military Transition Toolkit.
            </p>
            <p className="text-slate-300">
              All features are available to all servicemembers and veterans at no cost. Since there are
              no charges, there are no refunds needed.
            </p>
          </div>

          {/* How We're Supported */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">📋 How We Keep MTT Free</h2>
            <p className="text-slate-300 mb-3">
              Military Transition Toolkit is supported by:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Affiliate commissions from recommended services (no cost to you)</li>
              <li>Optional donations from users who want to support the mission</li>
            </ul>
            <p className="text-slate-300 mt-4">
              We believe servicemembers and veterans have earned access to quality transition resources
              without having to pay for them.
            </p>
          </div>

          {/* Questions */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">❓ Questions?</h2>
            <p className="text-slate-300 mb-4">
              If you have any questions about MTT or need assistance, contact us anytime.
            </p>
            <div className="space-y-2">
              <p className="text-slate-300">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:support@formationlabs.net"
                  className="text-blue-400 hover:text-blue-300"
                >
                  support@formationlabs.net
                </a>
              </p>
              <p className="text-slate-400 text-sm mt-4">
                We typically respond within 24-48 hours
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
