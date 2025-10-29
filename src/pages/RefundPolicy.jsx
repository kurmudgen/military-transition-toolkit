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
          <p className="text-slate-300">30-Day Money-Back Guarantee</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Money-Back Guarantee */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">💯 30-Day Money-Back Guarantee</h2>
            <p className="text-slate-300 mb-4">
              We stand behind our product. If you're not satisfied with your premium subscription,
              you can request a full refund within <strong>30 days of purchase</strong>.
            </p>
            <p className="text-slate-300">
              No questions asked. No hassle. We want you to feel confident in your decision to
              support Military Transition Toolkit.
            </p>
          </div>

          {/* How to Request */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">📧 How to Request a Refund</h2>
            <div className="space-y-3 text-slate-300">
              <div>
                <p className="font-semibold mb-2">Contact us at:</p>
                <p className="ml-4">
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:support@militarytransitiontoolkit.com"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    support@militarytransitiontoolkit.com
                  </a>
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">In your email, please include:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Your account email address</li>
                  <li>Subject line: "Refund Request"</li>
                  <li>Reason for refund (optional but helpful for improving our product)</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                <p className="font-semibold text-blue-300">Processing Time:</p>
                <p className="text-slate-300 mt-1">
                  We'll process refunds within <strong>5-7 business days</strong> of receiving your request.
                  Refunds will be issued to the original payment method.
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Types */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">📋 Refund Details by Plan</h2>

            <div className="space-y-4">
              {/* Monthly */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Monthly Subscription</h3>
                <p className="text-slate-300">
                  Full refund available within 30 days of your initial purchase or renewal.
                  After refund, your access will continue until the end of the current billing period.
                </p>
              </div>

              {/* Annual */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">Annual Subscription</h3>
                <p className="text-slate-300">
                  Full refund available within 30 days of your initial purchase or renewal.
                  After refund, your access will continue until the end of the current billing period.
                </p>
              </div>

              {/* Lifetime */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Lifetime Membership</h3>
                <p className="text-slate-300">
                  Same 30-day money-back guarantee applies. After 30 days from purchase,
                  no refunds are available due to the one-time lifetime nature of this plan.
                </p>
              </div>
            </div>
          </div>

          {/* Fair Use Policy */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">⚖️ Fair Use Policy</h2>
            <p className="text-slate-300 mb-3">
              We trust our veteran community and operate on good faith. However, we reserve the right to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Decline refund requests that appear to abuse our generous policy</li>
              <li>Limit refunds to one per user account</li>
              <li>Request additional information if refund patterns appear suspicious</li>
            </ul>
            <p className="text-slate-300 mt-4">
              Our goal is to protect honest veterans while preventing abuse of our veteran-focused business.
            </p>
          </div>

          {/* Veterans Day Promo */}
          <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-lg shadow-lg p-6 border border-blue-700">
            <h2 className="text-2xl font-bold text-white mb-4">🎖️ Veterans Day Launch Special</h2>
            <p className="text-slate-300 mb-3">
              During our Veterans Day launch promotion (through November 11, 2025):
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>All premium features are <strong>FREE</strong></li>
              <li>No refunds needed since no payment is required</li>
              <li>After the promotion ends, paid subscriptions will include the same 30-day guarantee</li>
            </ul>
          </div>

          {/* Questions */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">❓ Questions About Refunds?</h2>
            <p className="text-slate-300 mb-4">
              We're here to help! Contact us with any questions or concerns.
            </p>
            <div className="space-y-2">
              <p className="text-slate-300">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:support@militarytransitiontoolkit.com"
                  className="text-blue-400 hover:text-blue-300"
                >
                  support@militarytransitiontoolkit.com
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
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
