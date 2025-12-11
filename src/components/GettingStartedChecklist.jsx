import { Link } from 'react-router-dom'
import { trackButtonClick } from '../utils/analytics'

/**
 * Getting Started Checklist component
 * Shows 5 key actions for new users to complete
 * Visible until user completes 3+ items
 */
export default function GettingStartedChecklist({
  progress,
  completedCount,
  totalCount,
  separationDate,
  onMarkComplete
}) {
  const checklistItems = [
    {
      id: 'separationDateSet',
      title: 'Set your separation date',
      description: separationDate
        ? `Set to ${new Date(separationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
        : 'Enables personalized countdown and timeline',
      action: 'Set Date',
      link: null, // Handled by settings modal
      isSettings: true,
      completed: progress.separationDateSet,
      icon: '📅'
    },
    {
      id: 'transitionAssessmentComplete',
      title: 'Complete transition readiness assessment',
      description: 'Takes 5 minutes - get your personalized timeline',
      action: 'Start Now',
      link: '/app/progress',
      completed: progress.transitionAssessmentComplete,
      icon: '📊'
    },
    {
      id: 'resumeStarted',
      title: 'Build your military-to-civilian resume',
      description: 'Our translator makes MOS conversion easy',
      action: 'Resume Builder',
      link: '/app/resume-builder',
      completed: progress.resumeStarted,
      icon: '📄'
    },
    {
      id: 'stateBenefitsViewed',
      title: 'Compare veteran benefits by state',
      description: 'See what you qualify for in each state',
      action: 'State Benefits',
      link: '/app/state-benefits',
      completed: progress.stateBenefitsViewed,
      icon: '🗺️'
    },
    {
      id: 'vaClaimsStarted',
      title: 'Start tracking your VA claim',
      description: 'Organize evidence and build a strong claim',
      action: 'VA Claims Tracker',
      link: '/app/va-claims-builder',
      completed: progress.vaClaimsStarted,
      icon: '🏥'
    }
  ]

  const handleClick = (item) => {
    trackButtonClick(`Onboarding - ${item.title}`)
    if (!item.completed) {
      onMarkComplete(item.id)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-700 overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 px-6 py-4 border-b border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎯</div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Getting Started Checklist</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              {completedCount} of {totalCount} done
            </span>
            <div className="w-24 h-2 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {checklistItems.map((item, index) => (
          <div
            key={item.id}
            className={`px-6 py-4 flex items-center gap-4 transition-colors ${
              item.completed
                ? 'bg-green-50/50 dark:bg-green-900/10'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            {/* Checkbox */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              item.completed
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
            }`}>
              {item.completed ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-sm font-bold">{index + 1}</span>
              )}
            </div>

            {/* Icon */}
            <div className="text-2xl flex-shrink-0">{item.icon}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold ${
                item.completed
                  ? 'text-green-700 dark:text-green-400 line-through'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                {item.description}
              </p>
            </div>

            {/* Action Button */}
            {!item.completed && (
              item.isSettings ? (
                <button
                  onClick={() => handleClick(item)}
                  className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors min-h-[40px] whitespace-nowrap"
                >
                  {item.action}
                </button>
              ) : (
                <Link
                  to={item.link}
                  onClick={() => handleClick(item)}
                  className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors min-h-[40px] whitespace-nowrap"
                >
                  {item.action} →
                </Link>
              )
            )}

            {item.completed && (
              <span className="flex-shrink-0 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                Complete
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer with encouragement */}
      {completedCount > 0 && completedCount < totalCount && (
        <div className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-700">
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            {completedCount === 1 && "Great start! Keep going to unlock your full transition toolkit."}
            {completedCount === 2 && "You're making progress! One more step and you'll have the basics covered."}
            {completedCount >= 3 && "Excellent work! You're well on your way to a smooth transition."}
          </p>
        </div>
      )}
    </div>
  )
}
