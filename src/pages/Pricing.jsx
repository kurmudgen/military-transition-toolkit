import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon, XCircleIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { STRIPE_PLANS, getStripe } from '../lib/stripe'
import { getUserSubscription, createCheckoutSession } from '../services/subscriptionService'

export default function Pricing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processingPlan, setProcessingPlan] = useState(null)

  useEffect(() => {
    if (user) {
      loadSubscription()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadSubscription = async () => {
    try {
      const sub = await getUserSubscription()
      setSubscription(sub)
    } catch (error) {
      console.error('Error loading subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (plan) => {
    if (!user) {
      navigate('/signup')
      return
    }

    if (!plan.stripePriceId) {
      return // Free plan
    }

    try {
      setProcessingPlan(plan.id)

      // Create checkout session
      const sessionId = await createCheckoutSession(plan.stripePriceId)

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setProcessingPlan(null)
    }
  }

  const isCurrentPlan = (planId) => {
    if (!subscription) return planId === 'free'
    return subscription.plan_id === planId && subscription.status === 'active'
  }

  const PlanCard = ({ plan, featured = false }) => (
    <div
      className={`relative rounded-2xl border-2 p-8 ${
        featured
          ? 'border-blue-600 dark:border-blue-500 shadow-xl scale-105'
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <SparklesIcon className="h-4 w-4" />
            Best Value
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {plan.name}
        </h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold text-gray-900 dark:text-white">
            ${plan.price}
          </span>
          {plan.interval && (
            <span className="text-gray-600 dark:text-gray-400">/{plan.interval}</span>
          )}
        </div>
        {plan.savings && (
          <p className="text-green-600 dark:text-green-400 font-semibold mt-2">
            {plan.savings}
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => handleUpgrade(plan)}
        disabled={isCurrentPlan(plan.id) || processingPlan === plan.id}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          isCurrentPlan(plan.id)
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : featured
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white'
            : 'bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100'
        }`}
      >
        {processingPlan === plan.id
          ? 'Processing...'
          : isCurrentPlan(plan.id)
          ? 'Current Plan'
          : plan.id === 'free'
          ? 'Get Started Free'
          : 'Upgrade Now'}
      </button>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600 dark:text-gray-400">Loading pricing...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Start free and upgrade when you're ready. All premium features unlock immediately.
        </p>
      </div>

      {/* Current Plan Banner */}
      {subscription && subscription.status === 'active' && (
        <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-100">
                Current Plan: {subscription.plan_id === 'premium_monthly' ? 'Premium Monthly' : subscription.plan_id === 'premium_annual' ? 'Premium Annual' : 'Free'}
              </p>
              {subscription.current_period_end && (
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {subscription.cancel_at_period_end
                    ? `Cancels on ${new Date(subscription.current_period_end).toLocaleDateString()}`
                    : `Renews on ${new Date(subscription.current_period_end).toLocaleDateString()}`}
                </p>
              )}
            </div>
            {subscription.plan_id !== 'free' && (
              <button
                onClick={() => navigate('/app/account')}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Manage Subscription
              </button>
            )}
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PlanCard plan={STRIPE_PLANS.FREE} />
        <PlanCard plan={STRIPE_PLANS.PREMIUM_MONTHLY} />
        <PlanCard plan={STRIPE_PLANS.PREMIUM_ANNUAL} featured />
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Can I try premium features before paying?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes! Start with the free plan to explore the app. When you're ready to unlock all features,
              upgrade to premium with just one click.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Can I cancel anytime?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Absolutely. You can cancel your subscription at any time from your account settings.
              You'll keep premium access until the end of your billing period.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              What happens to my data if I downgrade?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All your data is preserved. If you exceed free tier limits (like more than 1 resume or 5 saved jobs),
              you'll be able to view but not edit until you upgrade again or reduce your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
