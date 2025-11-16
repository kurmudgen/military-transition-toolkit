import { useNavigate } from 'react-router-dom'
import { SparklesIcon, LockClosedIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

/**
 * Reusable upgrade prompt component
 * Shows when users try to access premium features
 */
export default function UpgradePrompt({
  title,
  message,
  feature,
  variant = 'banner', // 'banner', 'modal', 'inline'
  onClose
}) {
  const navigate = useNavigate()

  const handleUpgrade = () => {
    navigate('/pricing')
  }

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-lg mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <SparklesIcon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{title || 'Upgrade to Premium'}</h3>
            <p className="mb-4 opacity-90">{message}</p>
            <div className="flex gap-3">
              <button
                onClick={handleUpgrade}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Upgrade Now
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-white opacity-90 hover:opacity-100 px-4 py-2 rounded-lg font-medium"
                >
                  Maybe Later
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <LockClosedIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {title || 'Premium Feature'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{message}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              <span className="flex items-center justify-center gap-2">
                <SparklesIcon className="h-5 w-5" />
                Upgrade to Premium
              </span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Maybe Later
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <LockClosedIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{message}</p>
            <button
              onClick={handleUpgrade}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium inline-flex items-center gap-1"
            >
              <ArrowUpCircleIcon className="h-4 w-4" />
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

/**
 * Premium badge component
 * Shows a "Premium" badge on locked features
 */
export function PremiumBadge({ size = 'sm' }) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  }

  return (
    <span
      className={`inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-semibold ${sizeClasses[size]}`}
    >
      <SparklesIcon className={size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'} />
      Premium
    </span>
  )
}

/**
 * Feature lock overlay
 * Shows a lock icon over locked features
 */
export function FeatureLockOverlay({ message, onUpgrade }) {
  return (
    <div className="absolute inset-0 bg-gray-900/10 dark:bg-gray-900/30 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
      <div className="text-center p-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-4">
          <LockClosedIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
        </div>
        <p className="text-gray-900 dark:text-white font-semibold mb-3">{message}</p>
        <button
          onClick={onUpgrade}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  )
}
