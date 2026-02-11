import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LESSONS, LESSON_CATEGORIES } from '../data/financialEducationData'
import { useGamification } from '../hooks/useGamification'

const DIFFICULTY_STYLES = {
  beginner: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  intermediate: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  advanced: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
}

export default function FinancialEducation() {
  const navigate = useNavigate()
  const { awardXP } = useGamification()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [expandedLesson, setExpandedLesson] = useState(null)
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mtt_completed_lessons') || '[]')
    } catch { return [] }
  })

  const filteredLessons = useMemo(() => {
    let list = [...LESSONS]
    if (selectedCategory !== 'all') list = list.filter((l) => l.category === selectedCategory)
    if (selectedDifficulty !== 'all') list = list.filter((l) => l.difficulty === selectedDifficulty)
    return list
  }, [selectedCategory, selectedDifficulty])

  function toggleComplete(lessonId) {
    const isCompleting = !completedLessons.includes(lessonId)
    const updated = isCompleting
      ? [...completedLessons, lessonId]
      : completedLessons.filter((id) => id !== lessonId)
    setCompletedLessons(updated)
    localStorage.setItem('mtt_completed_lessons', JSON.stringify(updated))
    if (isCompleting) awardXP('lesson_read')
  }

  const totalLessons = LESSONS.length
  const completedCount = completedLessons.length
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Education Hub</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Self-paced lessons on money management, military finance, and transition planning
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Progress: {completedCount} of {totalLessons} lessons
          </span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{progressPct}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`p-3 rounded-lg border text-center transition text-sm ${
            selectedCategory === 'all'
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300'
          }`}
        >
          All ({LESSONS.length})
        </button>
        {Object.entries(LESSON_CATEGORIES).map(([key, cat]) => {
          const count = LESSONS.filter((l) => l.category === key).length
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`p-3 rounded-lg border text-center transition text-sm ${
                selectedCategory === key
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300'
              }`}
            >
              <p className="font-medium">{cat.label}</p>
              <p className="text-xs mt-0.5 opacity-70">{count}</p>
            </button>
          )
        })}
      </div>

      {/* Difficulty Filter */}
      <div className="flex gap-2">
        {['all', 'beginner', 'intermediate', 'advanced'].map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDifficulty(d)}
            className={`px-3 py-1 text-xs rounded-full transition ${
              selectedDifficulty === d
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            {d === 'all' ? 'All Levels' : d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        {filteredLessons.map((lesson) => {
          const isExpanded = expandedLesson === lesson.id
          const isComplete = completedLessons.includes(lesson.id)

          return (
            <div
              key={lesson.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition ${
                isComplete
                  ? 'border-green-200 dark:border-green-800'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Lesson Header */}
              <button
                onClick={() => setExpandedLesson(isExpanded ? null : lesson.id)}
                className="w-full p-4 text-left flex items-start gap-3"
              >
                <button
                  onClick={(e) => { e.stopPropagation(); toggleComplete(lesson.id) }}
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                    isComplete
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}
                >
                  {isComplete && (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-medium ${
                      isComplete
                        ? 'text-green-700 dark:text-green-400 line-through opacity-70'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {lesson.title}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${DIFFICULTY_STYLES[lesson.difficulty]}`}>
                      {lesson.difficulty}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {lesson.estimatedMinutes} min
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{lesson.description}</p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-gray-100 dark:border-gray-700 space-y-4">
                  {/* Key Points */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Points</h4>
                    <ul className="space-y-1">
                      {lesson.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-blue-500 mt-1 flex-shrink-0">&#8226;</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Military Context */}
                  {lesson.militaryContext && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">Military Context</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{lesson.militaryContext}</p>
                    </div>
                  )}

                  {/* Action Steps */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Action Steps</h4>
                    <ol className="space-y-1">
                      {lesson.actionSteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-gray-400 font-medium flex-shrink-0 w-5 text-right">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Related Tool Link */}
                  {lesson.relatedTool && (
                    <button
                      onClick={() => navigate(lesson.relatedTool)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Open Related Tool
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  )}

                  {/* Mark Complete */}
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => toggleComplete(lesson.id)}
                      className={`text-sm px-3 py-1.5 rounded-lg transition ${
                        isComplete
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {isComplete ? 'Mark Incomplete' : 'Mark as Completed'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-8 text-gray-400 dark:text-gray-500">
          <p>No lessons match your filters. Try adjusting the category or difficulty level.</p>
        </div>
      )}

      {/* Resources */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Additional Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'Military OneSource', desc: 'Free financial counseling, 24/7. Call 800-342-9647 or visit militaryonesource.mil', url: 'https://www.militaryonesource.mil' },
            { name: 'Consumer Financial Protection Bureau', desc: 'Office of Servicemember Affairs — complaint filing and military financial guides', url: 'https://www.consumerfinance.gov/consumer-tools/military-financial-lifecycle/' },
            { name: 'TSP.gov', desc: 'Official Thrift Savings Plan — manage your account, learn about funds', url: 'https://www.tsp.gov' },
            { name: 'VA.gov Benefits', desc: 'VA benefits, GI Bill comparison tool, disability claims', url: 'https://www.va.gov/education/about-gi-bill-benefits/' },
          ].map((r) => (
            <div key={r.name} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{r.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 pb-4">
        This educational content is for informational purposes only and does not constitute financial advice.
        Consult a qualified financial advisor or your installation's Financial Readiness Program for personalized guidance.
      </p>
    </div>
  )
}
