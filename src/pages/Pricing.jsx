/* HIDDEN - Free model - Keep for future use
import { useState, useEffect } from 'react'
import { CheckCircleIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { PRICING, shouldHidePaymentUI } from '../utils/promoConfig'
import { SHUTDOWN_BANNER } from '../utils/constants'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import { createCheckoutSession } from '../services/subscriptionService'
import { getCurrentUser } from '../lib/supabase'

function PricingOriginal() {
  const [loading, setLoading] = useState(false)
  const [showCancelMessage, setShowCancelMessage] = useState(false)
  const paymentUIHidden = shouldHidePaymentUI()

  useEffect(() => {
    trackPageView('/pricing')

    // Check for upgrade cancellation
    const params = new URLSearchParams(window.location.search)
    if (params.get('upgrade') === 'cancelled') {
      setShowCancelMessage(true)
      // Clear the URL parameter
      window.history.replaceState({}, '', '/pricing')

      // Auto-hide message after 5 seconds
      setTimeout(() => setShowCancelMessage(false), 5000)
    }
  }, [])

  // Stripe Price IDs (from environment variables)
  const STRIPE_PRICE_IDS = {
    monthly: import.meta.env.VITE_STRIPE_PRICE_MONTHLY,
    annual: import.meta.env.VITE_STRIPE_PRICE_ANNUAL,
    lifetime: import.meta.env.VITE_STRIPE_PRICE_LIFETIME
  }

  const handleSelectPlan = async (planId) => {
    trackButtonClick(`Select Plan - ${planId}`)

    // PROMO MODE: Block all paid plan selections when promo mode active
    if (paymentUIHidden && planId !== 'free') {
      alert('Sign up by Nov 19 for lifetime free access to all premium features! Starting Nov 20: Basic features stay free, premium features are $7/month.')
      return
    }

    // Free plan doesn't need Stripe
    if (planId === 'free') {
      const user = await getCurrentUser()
      if (!user) {
        // Redirect to signup
        window.location.href = '/signup'
      } else {
        // Already have free access, go to dashboard
        window.location.href = '/app'
      }
      return
    }

    // Paid plans need authentication first
    const user = await getCurrentUser()
    if (!user) {
      // Save intended plan and redirect to signup
      sessionStorage.setItem('intendedPlan', planId)
      window.location.href = '/signup'
      return
    }

    // Create Stripe checkout session
    try {
      setLoading(true)
      const priceId = STRIPE_PRICE_IDS[planId]

      if (!priceId) {
        throw new Error('Invalid plan selected')
      }

      const checkoutUrl = await createCheckoutSession(priceId)

      // Redirect to Stripe checkout
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Checkout error:', error)
      alert(`Error starting checkout: ${error.message}. Please try again or contact support@formationlabs.net`)
      setLoading(false)
    }
  }

  const PlanCard = ({ plan, planId, featured = false, bestValue = false }) => (
    <div
      className={`relative rounded-2xl border-2 p-8 h-full flex flex-col bg-slate-800 ${
        featured
          ? 'border-blue-500 shadow-2xl'
          : 'border-slate-700 shadow-lg'
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <SparklesIcon className="h-4 w-4" />
            {plan.badge}
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          {plan.name}
        </h3>
        {plan.description && (
          <p className="text-sm text-slate-400 mb-3">
            {plan.description}
          </p>
        )}
        <div className="flex items-baseline justify-center gap-1">
          {plan.originalPrice && (
            <span className="text-2xl font-semibold text-slate-500 line-through">
              ${plan.originalPrice}
            </span>
          )}
          <span className="text-5xl font-bold text-white">
            ${plan.price}
          </span>
          {plan.priceMonthly && (
            <span className="text-slate-400 text-sm">
              (${plan.priceMonthly}/mo)
            </span>
          )}
        </div>
        {plan.savings && (
          <p className="text-green-400 font-semibold mt-2">
            Save ${plan.savings}
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => handleSelectPlan(planId)}
        disabled={loading || paymentUIHidden}
        className="w-full py-3 px-6 rounded-lg font-semibold transition-colors mt-auto bg-slate-700 text-slate-300 cursor-not-allowed shadow-md"
      >
        {loading ? 'Processing...' : 'Currently Free - No Payment Needed'}
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cancel Message */}
        {showCancelMessage && (
          <div className="mb-8 bg-yellow-900/20 border-2 border-yellow-600 rounded-xl p-6 text-center">
            <p className="text-yellow-200 font-semibold mb-2">
              No charge was made to your card
            </p>
            <p className="text-yellow-300 text-sm">
              You can try again anytime. We're here to help if you have questions!
            </p>
          </div>
        )}

        {/* Founding Member Deadline Banner */}
        <div className="mb-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-3">⚠️ Lifetime Free Access Ends Nov 19</h2>
          <p className="text-xl text-green-100 mb-2">
            {SHUTDOWN_BANNER.line1}
          </p>
          <p className="text-sm text-green-200">
            {SHUTDOWN_BANNER.line2}
          </p>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
            Core features like state benefits and basic calculator are always free - no account needed.
          </p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Premium features below unlock cloud storage, advanced tools, and unlimited tracking.
          </p>
        </div>

        {/* Pricing Cards - 3 paid tiers only */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 items-stretch max-w-5xl mx-auto">
          <PlanCard plan={PRICING.MONTHLY} planId="monthly" />
          <PlanCard plan={PRICING.ANNUAL} planId="annual" bestValue />
          <PlanCard plan={PRICING.LIFETIME} planId="lifetime" featured />
        </div>


      {/* Optional Donation Section - Promo Mode Only */}
      {/* TODO: Wire up donation checkout after soft launch */}
      {paymentUIHidden && (
        <div className="hidden mb-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-2xl p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6">☕</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Love This Tool? Buy Me a Coffee!
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              This tool is <strong>100% free</strong> for founding members (sign up by Nov 19). Starting Nov 20: Basic features stay free, premium features are $7/month.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
              If you find it valuable and want to support continued development, consider buying me a coffee. It's completely optional and genuinely appreciated! 🙏
            </p>

            {/* Donation Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <a
                href="https://donate.stripe.com/test_aEU5kU4xm8vt5gI000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('Donation - $5')}
                className="block p-6 bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-400 rounded-xl transition-all hover:shadow-lg group"
              >
                <div className="text-4xl mb-2">☕</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">Coffee</div>
              </a>

              <a
                href="https://donate.stripe.com/test_aEU5kU4xm8vt5gI000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('Donation - $10')}
                className="block p-6 bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-400 rounded-xl transition-all hover:shadow-lg group"
              >
                <div className="text-4xl mb-2">🍔</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$10</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">Lunch</div>
              </a>

              <a
                href="https://donate.stripe.com/test_aEU5kU4xm8vt5gI000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('Donation - $25')}
                className="block p-6 bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-400 rounded-xl transition-all hover:shadow-lg group"
              >
                <div className="text-4xl mb-2">⛽</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$25</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">Tank of Gas</div>
              </a>
            </div>

            <a
              href="https://donate.stripe.com/test_aEU5kU4xm8vt5gI000"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('Donation - Custom')}
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              💝 Custom Amount
            </a>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
              Donations are processed securely through Stripe. 100% optional, 100% appreciated.
            </p>
          </div>
        </div>
      )}


        {/* Feature Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Premium Features
          </h2>
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-white">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-white">Included</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr className="bg-slate-800">
                  <td className="py-4 px-6 text-slate-300">Unlimited resumes with ATS optimization</td>
                  <td className="text-center py-4 px-6">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-slate-800/50">
                  <td className="py-4 px-6 text-slate-300">VA disability claims builder</td>
                  <td className="text-center py-4 px-6">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-slate-800">
                  <td className="py-4 px-6 text-slate-300">Evidence tracking and management</td>
                  <td className="text-center py-4 px-6">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-slate-800/50">
                  <td className="py-4 px-6 text-slate-300">Advanced retirement calculator (BRS & High-3)</td>
                  <td className="text-center py-4 px-6">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-slate-800">
                  <td className="py-4 px-6 text-slate-300">Cloud storage & device sync</td>
                  <td className="text-center py-4 px-6">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-slate-800/50">
                  <td className="py-4 px-6 text-slate-300">PDF exports and document generation</td>
                  <td className="text-center py-4 px-6">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-slate-800">
                  <td className="py-4 px-6 text-slate-300">Priority support</td>
                  <td className="text-center py-4 px-6">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-2">
                Is my data safe and private?
              </h3>
              <p className="text-slate-300">
                Yes! Your data is protected with end-to-end encryption and stored securely in the cloud with
                military-grade security. Only you can access your information. Premium users get automatic
                cloud backup and the ability to sync across all their devices.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-slate-300">
                Absolutely. Monthly and annual plans can be cancelled at any time. You'll keep premium access until
                the end of your billing period. Lifetime access never expires and has no recurring fees.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-semibold text-white mb-2">
                What's included with Lifetime Access?
              </h3>
              <p className="text-slate-300">
                Lifetime Access gives you ALL premium features, forever. This includes all future
                features we add - no additional charges, ever. Plus, you get priority support and one-time
                payment means no recurring bills.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
*/

// Simplified version for free model - redirect to About page
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Pricing() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to About page which explains sustainability model
    navigate('/app/about', { replace: true })
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Currently Free</h1>
        <p className="text-xl text-slate-300">Redirecting to our mission page...</p>
      </div>
    </div>
  )
}
