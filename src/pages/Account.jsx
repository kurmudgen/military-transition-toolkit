import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCircleIcon, CreditCardIcon, BellIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { getUserSubscription, createCustomerPortalSession } from '../services/subscriptionService'
import { STRIPE_PLANS, getPlanById } from '../lib/stripe'

export default function Account() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [managingBilling, setManagingBilling] = useState(false)

  useEffect(() => {
    loadSubscription()
  }, [])

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

  const handleManageBilling = async () => {
    try {
      setManagingBilling(true)
      const portalUrl = await createCustomerPortalSession()
      window.location.href = portalUrl
    } catch (error) {
      console.error('Error opening billing portal:', error)
      alert('Failed to open billing portal. Please try again.')
    } finally {
      setManagingBilling(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const currentPlan = subscription ? getPlanById(subscription.plan_id) : STRIPE_PLANS.FREE

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600 dark:text-gray-400">Loading account...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
              <p className="text-gray-900 dark:text-white">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">User ID</label>
              <p className="text-gray-900 dark:text-white font-mono text-sm">{user?.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Account Created
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(user?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCardIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Subscription</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Current Plan
              </label>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.name}
                </p>
                {currentPlan.price > 0 && (
                  <span className="text-gray-600 dark:text-gray-400">
                    ${currentPlan.price}/{currentPlan.interval}
                  </span>
                )}
              </div>
            </div>

            {subscription && subscription.status === 'active' && subscription.plan_id !== 'free' && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {subscription.status}
                    {subscription.cancel_at_period_end && (
                      <span className="text-orange-600 dark:text-orange-400 ml-2">
                        (Cancels at period end)
                      </span>
                    )}
                  </p>
                </div>
                {subscription.current_period_end && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {subscription.cancel_at_period_end ? 'Active Until' : 'Renews On'}
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(subscription.current_period_end).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {subscription && subscription.plan_id !== 'free' ? (
                <button
                  onClick={handleManageBilling}
                  disabled={managingBilling}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {managingBilling ? 'Opening...' : 'Manage Subscription'}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/pricing')}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Upgrade to Premium
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Plan Features */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Plan Includes
          </h3>
          <ul className="space-y-2">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Usage Limits */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Limits</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Resumes</span>
                <span className="text-gray-900 dark:text-white">
                  {currentPlan.limits.resumes === Infinity ? 'Unlimited' : `${currentPlan.limits.resumes} max`}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Saved Jobs</span>
                <span className="text-gray-900 dark:text-white">
                  {currentPlan.limits.savedJobs === Infinity ? 'Unlimited' : `${currentPlan.limits.savedJobs} max`}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">PDF Exports</span>
                <span className="text-gray-900 dark:text-white">
                  {currentPlan.limits.exports ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">AI Questions</span>
                <span className="text-gray-900 dark:text-white">
                  {currentPlan.limits.aiQuestions === 0 ? 'Not available' : `${currentPlan.limits.aiQuestions}/day`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
