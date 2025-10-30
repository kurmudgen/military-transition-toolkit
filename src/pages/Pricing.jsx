import { useState, useEffect } from 'react'
import { CheckCircleIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { isPromoActive, getTimeRemaining, PRICING } from '../utils/promoConfig'
import { trackPageView, trackButtonClick } from '../utils/analytics'

export default function Pricing() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining())
  const promoActive = isPromoActive()

  useEffect(() => {
    trackPageView('/pricing')

    // Update countdown every minute
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const handleSelectPlan = (planId) => {
    trackButtonClick(`Select Plan - ${planId}`)
    // For now, just scroll to contact or show message
    // In production, this would integrate with payment processing
    alert('Thank you for your interest! Payment integration coming soon. For early access, please contact support@formationlabs.com')
  }

  const PlanCard = ({ plan, planId, featured = false, showPromo = false }) => (
    <div
      className={`relative rounded-2xl border-2 p-8 h-full flex flex-col ${
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

      {showPromo && promoActive && (
        <div className="absolute -top-4 right-4">
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            🎖️ Launch Special
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
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors mt-auto ${
          featured
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg'
            : planId === 'free'
            ? 'bg-gray-600 hover:bg-gray-700 text-white'
            : 'bg-gray-800 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100'
        }`}
      >
        {planId === 'free' ? 'Get Started Free' : 'Upgrade Now'}
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 min-h-screen transition-colors">
      {/* Veterans Day Promo Header */}
      {promoActive && (
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <RocketLaunchIcon className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Veterans Day Launch Celebration</h2>
          </div>

          <p className="text-xl mb-4 text-blue-100">
            To honor our fellow veterans, <strong>all premium features are FREE</strong> through Veterans Day
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto mb-4">
            <p className="text-sm text-blue-100 mb-2">Promotion ends in:</p>
            <p className="text-3xl font-bold">
              {timeRemaining.days} days, {timeRemaining.hours} hours
            </p>
            <p className="text-sm text-blue-100 mt-2">November 11, 2025</p>
          </div>

          <p className="text-blue-100 max-w-2xl mx-auto">
            Explore everything risk-free, then choose your plan. Lock in <strong>Founding Member</strong> pricing
            ($249 lifetime) before it increases to $399 after Veterans Day.
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
            ? 'All premium features unlocked until November 11, 2025. Sign up now to try everything before deciding.'
            : 'Start free and upgrade when you\'re ready. All premium features unlock immediately.'
          }
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <PlanCard plan={PRICING.FREE} planId="free" />
        <PlanCard plan={PRICING.MONTHLY} planId="monthly" showPromo />
        <PlanCard plan={PRICING.ANNUAL} planId="annual" showPromo />
        <PlanCard plan={PRICING.LIFETIME} planId="lifetime" featured showPromo />
      </div>

      {/* Launch Special Callout */}
      {promoActive && (
        <div className="mb-16 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-8">
          <div className="flex items-start gap-4">
            <span className="text-4xl" role="img" aria-label="Medal">🎖️</span>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Founding Member Launch Special
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Lock in lifetime access at <strong>50% off</strong> the regular price. This is a one-time opportunity
                to become a Founding Member and support veteran-built software.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Pay once, use forever - no recurring fees
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  All future premium features included at no extra cost
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Price increases to $399 on November 11, 2025
                </li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {timeRemaining.days} days remaining to lock in this price
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
                What happens after November 11, 2025?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                After Veterans Day, premium features will require a paid plan. Free tier users will still have access
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
            ? 'Start using all premium features free until Veterans Day. Lock in Founding Member pricing before it\'s too late.'
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
