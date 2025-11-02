import { useState, useEffect } from 'react'
import { CheckCircleIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { isPromoActive, getTimeRemaining, PRICING, shouldHidePaymentUI } from '../utils/promoConfig'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import { createCheckoutSession } from '../services/subscriptionService'
import { getCurrentUser } from '../lib/supabase'

export default function Pricing() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining())
  const [loading, setLoading] = useState(false)
  const [showCancelMessage, setShowCancelMessage] = useState(false)
  const promoActive = isPromoActive()
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

    // Update countdown every minute
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining())
    }, 60000)

    return () => clearInterval(timer)
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
      alert('All premium features are currently FREE during our government shutdown support promotion. Simply sign up for a free account to get full access!')
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

  const PlanCard = ({ plan, planId, featured = false }) => (
    <div
      className={`relative rounded-2xl border-2 p-8 h-full flex flex-col bg-white dark:bg-gray-800 ${
        featured
          ? 'border-blue-600 dark:border-blue-500 shadow-2xl scale-105'
          : 'border-gray-200 dark:border-gray-700 shadow-lg'
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className={`${
            featured
              ? 'bg-gradient-to-r from-blue-600 to-blue-500'
              : 'bg-gradient-to-r from-purple-600 to-purple-500'
          } text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}>
            <SparklesIcon className="h-4 w-4" />
            {plan.badge}
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {plan.name}
        </h3>
        {plan.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {plan.description}
          </p>
        )}
        <div className="flex items-baseline justify-center gap-1">
          {plan.originalPrice && (
            <span className="text-2xl font-semibold text-gray-400 dark:text-gray-500 line-through">
              ${plan.originalPrice}
            </span>
          )}
          <span className="text-5xl font-bold text-gray-900 dark:text-white">
            ${plan.price}
          </span>
          {plan.priceMonthly && (
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              (${plan.priceMonthly}/mo)
            </span>
          )}
        </div>
        {plan.savings && (
          <p className="text-green-600 dark:text-green-400 font-semibold mt-2">
            Save ${plan.savings}
          </p>
        )}
        {plan.price === 0 && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Forever Free
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => handleSelectPlan(planId)}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors mt-auto disabled:opacity-50 disabled:cursor-not-allowed ${
          planId === 'free'
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            : featured
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
        }`}
      >
        {loading ? 'Processing...' : (planId === 'free' ? 'Get Started Free' : 'Upgrade Now')}
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 min-h-screen transition-colors">
      {/* Cancel Message */}
      {showCancelMessage && (
        <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-6 text-center">
          <p className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2">
            No charge was made to your card
          </p>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            You can try again anytime. We're here to help if you have questions!
          </p>
        </div>
      )}

      {/* Government Shutdown Support Header */}
      {promoActive && (
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-5xl" role="img" aria-label="US Flag">🇺🇸</span>
            <h2 className="text-3xl font-bold">Supporting Veterans During Government Shutdown</h2>
          </div>

          <p className="text-xl mb-4 text-blue-100">
            <strong>All premium features remain FREE</strong> until federal operations resume
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-4">
            <p className="text-base text-blue-50 leading-relaxed mb-3">
              We had planned to offer free access through Veterans Day, but with veterans potentially impacted by the government shutdown, we're extending free premium access until the shutdown ends.
            </p>
            <p className="text-base text-blue-100 font-medium">
              Active duty, veterans, and military families - you have enough to worry about. Focus on your transition, we've got the rest covered.
            </p>
          </div>

          <p className="text-blue-100 max-w-2xl mx-auto">
            Explore everything risk-free, then choose your plan. Lock in <strong>Founding Member</strong> pricing
            ($249 lifetime) before it increases to $399 when the promotion ends.
          </p>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {promoActive ? 'Try Everything Free, Then Choose' : 'Choose Your Plan'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {promoActive
            ? 'All premium features unlocked until the government shutdown ends. Sign up now to try everything before deciding.'
            : 'Start free and upgrade when you\'re ready. All premium features unlock immediately.'
          }
        </p>
      </div>

      {/* Pricing Cards - Hidden during promo mode */}
      {!paymentUIHidden && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 items-stretch">
          <PlanCard plan={PRICING.FREE} planId="free" />
          <PlanCard plan={PRICING.MONTHLY} planId="monthly" />
          <PlanCard plan={PRICING.ANNUAL} planId="annual" />
          <PlanCard plan={PRICING.LIFETIME} planId="lifetime" featured />
        </div>
      )}

      {/* Promo Mode Message - Show when payment UI is hidden */}
      {paymentUIHidden && (
        <div className="mb-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-500 dark:border-green-600 rounded-2xl p-12 text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All Premium Features Are FREE
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              During our government shutdown support promotion, every feature of Military Transition Toolkit
              is completely free. No credit card required. No payment needed.
            </p>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 mb-6">
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Unlimited resumes and job applications</span>
                </li>
                <li className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>VA disability claims builder with evidence tracking</span>
                </li>
                <li className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Advanced retirement calculator (BRS & High-3)</span>
                </li>
                <li className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Cloud storage and device sync</span>
                </li>
                <li className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => window.location.href = '/signup'}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-xl"
            >
              Get Started Free - No Payment Required
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Paid plans will be available when the promotion ends
            </p>
          </div>
        </div>
      )}

      {/* Launch Special Callout */}
      {promoActive && (
        <div className="mb-16 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="flex-shrink-0">
              <span className="text-4xl" role="img" aria-label="Medal">🎖️</span>
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Founding Member Launch Special
              </h3>
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                Lock in lifetime access at <strong>50% off</strong> the regular price. This is a one-time opportunity
                to become a Founding Member and support veteran-built software.
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Pay once, use forever - no recurring fees</span>
                </li>
                <li className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>All future premium features included at no extra cost</span>
                </li>
                <li className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Price increases to $399 when promotion ends</span>
                </li>
              </ul>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 inline-block px-4 py-2 rounded-lg">
                ⏰ {timeRemaining.days} days remaining to lock in this price
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Feature Comparison */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          What's Included
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Feature</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Free</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">Basic transition checklists</td>
                <td className="text-center py-4 px-6">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                </td>
                <td className="text-center py-4 px-6">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">State benefits comparison</td>
                <td className="text-center py-4 px-6">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                </td>
                <td className="text-center py-4 px-6">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">Advanced retirement calculator (BRS & High-3)</td>
                <td className="text-center py-4 px-6 text-gray-400 dark:text-gray-500">Basic only</td>
                <td className="text-center py-4 px-6">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">VA disability claims builder</td>
                <td className="text-center py-4 px-6 text-gray-400 dark:text-gray-500">—</td>
                <td className="text-center py-4 px-6">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">Cloud storage & device sync</td>
                <td className="text-center py-4 px-6 text-gray-400 dark:text-gray-500">—</td>
                <td className="text-center py-4 px-6">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">Priority support</td>
                <td className="text-center py-4 px-6 text-gray-400 dark:text-gray-500">—</td>
                <td className="text-center py-4 px-6">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {promoActive && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                What happens when the promotion ends?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                In response to the government shutdown affecting military families, we've extended our free premium access period.
                Originally planned through Veterans Day, all features will remain free until federal operations resume.
                When the promotion ends, premium features will require a paid plan. Free tier users will still have access
                to core transition planning tools, but advanced features like the VA claims builder and cloud sync
                will require an upgrade. Lock in Founding Member pricing now to keep full access forever.
              </p>
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Is my data safe and private?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes! Your data is protected with end-to-end encryption and stored securely in the cloud with
              military-grade security. Only you can access your information. Premium users get automatic
              cloud backup and the ability to sync across all their devices.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Can I cancel anytime?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Absolutely. Monthly and annual plans can be cancelled at any time. You'll keep premium access until
              the end of your billing period. Founding Member lifetime access never expires and has no recurring fees.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              What's included with Founding Member?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Founding Members get lifetime access to ALL premium features, forever. This includes all future
              features we add - no additional charges, ever. Plus, you get priority support and help shape the
              future of the platform with early access to new features.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to take control of your transition?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {promoActive
            ? 'Start using all premium features free during the government shutdown. Lock in Founding Member pricing before it\'s too late.'
            : 'Join thousands of transitioning service members who trust our platform.'
          }
        </p>
        <button
          onClick={() => handleSelectPlan('lifetime')}
          className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-xl"
        >
          Get Started Now
        </button>
      </div>
    </div>
  )
}
