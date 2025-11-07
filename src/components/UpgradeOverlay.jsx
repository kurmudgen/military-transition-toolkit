import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import DOMPurify from 'dompurify'

/**
 * UpgradeOverlay Component
 * Displays a modal overlay for premium features in preview mode
 * Shows benefits and pricing with CTA to upgrade
 *
 * SECURITY: All user-provided inputs are sanitized with DOMPurify to prevent XSS
 */
export default function UpgradeOverlay({ featureName, description, benefits = null }) {
  const navigate = useNavigate()

  // Sanitize inputs to prevent XSS attacks (SECURITY: HIGH-002 fix)
  const sanitizedFeatureName = featureName ? DOMPurify.sanitize(featureName, { ALLOWED_TAGS: [] }) : null
  const sanitizedDescription = description ? DOMPurify.sanitize(description, { ALLOWED_TAGS: [] }) : null

  // Default benefits if none provided
  const defaultBenefits = [
    'Unlimited saves and tracking',
    'Cloud storage and sync across devices',
    'Export and share documents',
    'Priority support'
  ]

  // Sanitize benefits array to prevent XSS
  const displayBenefits = (benefits || defaultBenefits).map(benefit =>
    DOMPurify.sanitize(benefit, { ALLOWED_TAGS: [] })
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Icon and Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full mb-4">
              <LockClosedIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Premium Feature
            </h3>
            {sanitizedFeatureName && (
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                {sanitizedFeatureName}
              </p>
            )}
            <p className="text-gray-600 dark:text-gray-400">
              {sanitizedDescription}
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-3 mb-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            {displayBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Pricing Options */}
          <div className="mb-6 space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-700">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Monthly Plan</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Cancel anytime</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$7</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">per month</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-700">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Lifetime Access</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Pay once, use forever</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$250</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">one-time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/pricing')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors shadow-lg"
            >
              View All Plans & Upgrade
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm py-2"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
