import { useState, useEffect } from 'react'
import {
  getProgress,
  toggleProgressItem,
  addCustomItem,
  deleteCustomItem,
  getOverallStats,
  MILESTONE_CATEGORIES
} from '../utils/progressTracking'
import { trackPageView } from '../utils/analytics'

// Celebration animation component
function CelebrationModal({ onClose, categoryName }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-3xl p-12 max-w-lg text-center shadow-2xl animate-bounce-in">
        <div className="text-8xl mb-6 animate-pulse">🎉</div>
        <h2 className="text-4xl font-extrabold text-white mb-4">Congratulations!</h2>
        <p className="text-2xl text-white font-semibold mb-2">
          You completed {categoryName}!
        </p>
        <p className="text-lg text-white/90">
          Keep up the amazing progress! 🚀
        </p>
      </div>
    </div>
  )
}

export default function Progress() {
  const [progress, setProgress] = useState(null)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [showCelebration, setShowCelebration] = useState(null)
  const [newItemText, setNewItemText] = useState({})

  useEffect(() => {
    document.title = 'Progress Dashboard - Military Transition Toolkit'
    trackPageView('Progress Dashboard')
    loadProgress()
  }, [])

  const loadProgress = () => {
    const data = getProgress()
    setProgress(data)

    // Auto-expand categories with items
    const expanded = {}
    Object.keys(data.categories).forEach(catId => {
      expanded[catId] = false // Start collapsed for cleaner view
    })
    setExpandedCategories(expanded)
  }

  const handleToggleItem = (categoryId, itemId) => {
    const oldProgress = progress.categories[categoryId].progress
    const updatedProgress = toggleProgressItem(categoryId, itemId)
    setProgress(updatedProgress)

    // Show celebration if category just completed
    const newProgress = updatedProgress.categories[categoryId].progress
    if (newProgress === 100 && oldProgress !== 100) {
      setShowCelebration(MILESTONE_CATEGORIES[categoryId].name)
    }
  }

  const handleAddCustomItem = (categoryId) => {
    const text = newItemText[categoryId]?.trim()
    if (!text) return

    const updatedProgress = addCustomItem(categoryId, text)
    setProgress(updatedProgress)
    setNewItemText({ ...newItemText, [categoryId]: '' })
  }

  const handleDeleteItem = (categoryId, itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedProgress = deleteCustomItem(categoryId, itemId)
      setProgress(updatedProgress)
    }
  }

  const toggleCategory = (categoryId) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId]
    })
  }

  if (!progress) {
    return <div className="p-6 text-gray-600 dark:text-gray-400">Loading progress...</div>
  }

  const stats = getOverallStats()

  return (
    <div className="px-4 py-6 sm:px-0 max-w-7xl mx-auto">
      {/* Celebration Modal */}
      {showCelebration && (
        <CelebrationModal
          categoryName={showCelebration}
          onClose={() => setShowCelebration(null)}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Transition Progress Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Track your journey across all major transition milestones
        </p>
      </div>

      {/* Overall Progress Hero Card */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-8 sm:p-12 mb-10 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="text-7xl sm:text-8xl font-extrabold mb-4 tracking-tight">
                {stats.overallProgress}%
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">Overall Progress</h2>
              <div className="space-y-2 text-lg text-blue-100">
                <p className="font-semibold">
                  {stats.completedItems} of {stats.totalItems} tasks completed
                </p>
                <p>
                  {stats.completedCategories} of {stats.totalCategories} categories complete
                </p>
              </div>
            </div>

            {/* Circular progress indicator */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56">
              <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="18"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="white"
                  strokeWidth="18"
                  fill="none"
                  strokeDasharray={`${stats.overallProgress * 5.34} 534`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">
                    {stats.overallProgress === 100 ? '🎉' : stats.overallProgress >= 75 ? '🚀' : stats.overallProgress >= 50 ? '💪' : stats.overallProgress >= 25 ? '📈' : '🌱'}
                  </div>
                  <div className="text-sm font-semibold text-blue-100">
                    {stats.remainingItems} left
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(MILESTONE_CATEGORIES).map(([categoryId, categoryData]) => {
          const categoryProgress = progress.categories[categoryId]
          const isExpanded = expandedCategories[categoryId]
          const completedCount = categoryProgress.items.filter(i => i.completed).length
          const totalCount = categoryProgress.items.length

          return (
            <div
              key={categoryId}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(categoryId)}
                className="w-full p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 hover:from-gray-100 hover:to-gray-150 dark:hover:from-gray-750 dark:hover:to-gray-700 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{categoryData.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {categoryData.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {completedCount} of {totalCount} completed
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                      categoryData.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      categoryData.color === 'green' ? 'from-green-500 to-green-600' :
                      categoryData.color === 'red' ? 'from-red-500 to-red-600' :
                      categoryData.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      categoryData.color === 'pink' ? 'from-pink-500 to-pink-600' :
                      'from-yellow-500 to-yellow-600'
                    }`}
                    style={{ width: `${categoryProgress.progress}%` }}
                  >
                    {categoryProgress.progress > 15 && (
                      <div className="text-white text-xs font-bold px-3 py-1">
                        {categoryProgress.progress}%
                      </div>
                    )}
                  </div>
                </div>
              </button>

              {/* Category Items (Expanded) */}
              {isExpanded && (
                <div className="p-6 space-y-3 bg-white dark:bg-gray-800">
                  {categoryProgress.items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group"
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleItem(categoryId, item.id)}
                        className="mt-1 h-5 w-5 rounded-md border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
                      />
                      <div className="flex-1">
                        <label
                          className={`cursor-pointer select-none text-base ${
                            item.completed
                              ? 'line-through text-gray-400 dark:text-gray-500'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                          onClick={() => handleToggleItem(categoryId, item.id)}
                        >
                          {item.text}
                        </label>
                        {item.completedDate && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Completed {new Date(item.completedDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      {item.custom && (
                        <button
                          onClick={() => handleDeleteItem(categoryId, item.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-opacity"
                          aria-label="Delete item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add Custom Item */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newItemText[categoryId] || ''}
                        onChange={(e) => setNewItemText({ ...newItemText, [categoryId]: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCustomItem(categoryId)}
                        placeholder="Add custom task..."
                        className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                      <button
                        onClick={() => handleAddCustomItem(categoryId)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Motivation Section */}
      <div className="mt-10 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 border-2 border-green-200 dark:border-green-800">
        <div className="flex items-start gap-4">
          <div className="text-5xl">💪</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {stats.overallProgress < 25 ? "You've Started Your Journey!" :
               stats.overallProgress < 50 ? "Great Progress!" :
               stats.overallProgress < 75 ? "You're More Than Halfway There!" :
               stats.overallProgress < 100 ? "Almost Complete!" :
               "🎉 Congratulations! You Did It!"}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {stats.overallProgress < 25 ?
                "Every journey begins with a single step. Keep checking off tasks and you'll build momentum!" :
               stats.overallProgress < 50 ?
                "You're making solid progress! Stay focused and keep moving forward." :
               stats.overallProgress < 75 ?
                "Excellent work! You're well on your way to a successful transition." :
               stats.overallProgress < 100 ?
                "You're in the home stretch! Finish strong!" :
                "You've completed your transition planning! Remember to keep updating as things change."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
