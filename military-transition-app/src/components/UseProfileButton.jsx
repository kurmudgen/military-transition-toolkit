import { hasProfileData } from '../utils/profileAutoFill'
import { trackButtonClick } from '../utils/analytics'

/**
 * Reusable button component for auto-filling forms with profile data
 * @param {Function} onUseProfile - Callback function to execute when button is clicked
 * @param {string} className - Additional CSS classes
 * @param {string} label - Button label text
 * @param {boolean} disabled - Whether button is disabled
 */
export default function UseProfileButton({
  onUseProfile,
  className = '',
  label = 'Use Profile Info',
  disabled = false
}) {
  const profileExists = hasProfileData()

  const handleClick = () => {
    trackButtonClick('Use Profile Info - ' + label)
    onUseProfile()
  }

  if (!profileExists) {
    return null // Don't show button if no profile data exists
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors ${className}`}
      title="Auto-fill form with your profile information"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      {label}
    </button>
  )
}
