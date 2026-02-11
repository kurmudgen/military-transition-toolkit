import { useState, useMemo, useEffect } from 'react'
import {
  ASSESSMENT_QUESTIONS,
  CAREER_PROFILES,
  scoreAssessment,
  getCareersByCategory,
  getCategoryLabel,
  getGrowthLabel,
  getDifficultyLabel,
  getCareerById,
} from '../data/careerData'
import { getCareerPlan, saveAssessmentAnswers, toggleBookmark } from '../services/careerPlannerService'
import { formatCurrency } from '../utils/formatters'

const TABS = ['assessment', 'results', 'explore', 'bookmarks']

export default function CareerPlanner() {
  const [activeTab, setActiveTab] = useState('assessment')
  const [answers, setAnswers] = useState({})
  const [bookmarks, setBookmarks] = useState([])
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [expandedCareer, setExpandedCareer] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Load saved data on mount
  useEffect(() => {
    async function load() {
      try {
        const plan = await getCareerPlan()
        if (plan) {
          if (plan.assessment_answers) setAnswers(plan.assessment_answers)
          if (plan.bookmarked_careers) setBookmarks(plan.bookmarked_careers)
        }
      } catch {
        // Not logged in or table doesn't exist yet — that's fine
      }
      setLoaded(true)
    }
    load()
  }, [])

  // Assessment scoring
  const assessmentComplete = Object.keys(answers).length === ASSESSMENT_QUESTIONS.length
  const categoryScores = useMemo(() => {
    if (!assessmentComplete) return []
    return scoreAssessment(answers)
  }, [answers, assessmentComplete])

  const topCategories = categoryScores.slice(0, 3)
  const recommendedCareers = useMemo(() => {
    if (topCategories.length === 0) return []
    const careers = []
    for (const { category } of topCategories) {
      careers.push(...getCareersByCategory(category))
    }
    return careers
  }, [topCategories])

  // Explore filtering
  const filteredCareers = useMemo(() => {
    let list = CAREER_PROFILES
    if (categoryFilter) {
      list = list.filter((c) => c.category === categoryFilter)
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term) ||
          c.skillsRequired.some((s) => s.toLowerCase().includes(term)) ||
          c.relatedMOS.some((m) => m.toLowerCase().includes(term))
      )
    }
    return list
  }, [categoryFilter, searchTerm])

  const bookmarkedCareers = useMemo(
    () => bookmarks.map((id) => getCareerById(id)).filter(Boolean),
    [bookmarks]
  )

  // Handlers
  function handleAnswer(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  async function handleFinishAssessment() {
    setSaving(true)
    try {
      await saveAssessmentAnswers(answers)
    } catch {
      // save failed — still show results locally
    }
    setSaving(false)
    setActiveTab('results')
  }

  async function handleToggleBookmark(careerId) {
    // Optimistic update
    setBookmarks((prev) =>
      prev.includes(careerId)
        ? prev.filter((id) => id !== careerId)
        : [...prev, careerId]
    )
    try {
      const updated = await toggleBookmark(careerId)
      setBookmarks(updated)
    } catch {
      // revert on failure would be nice but non-critical
    }
  }

  function handleResetAssessment() {
    setAnswers({})
    setActiveTab('assessment')
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Career Planner</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Take the assessment to discover careers that match your military experience, or explore all 30+ career profiles.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab === 'assessment' && 'Assessment'}
              {tab === 'results' && 'Results'}
              {tab === 'explore' && 'Explore Careers'}
              {tab === 'bookmarks' && `Bookmarks (${bookmarks.length})`}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'assessment' && (
        <AssessmentTab
          answers={answers}
          onAnswer={handleAnswer}
          onFinish={handleFinishAssessment}
          saving={saving}
          complete={assessmentComplete}
        />
      )}

      {activeTab === 'results' && (
        <ResultsTab
          assessmentComplete={assessmentComplete}
          categoryScores={categoryScores}
          recommendedCareers={recommendedCareers}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
          onRetake={handleResetAssessment}
          expandedCareer={expandedCareer}
          setExpandedCareer={setExpandedCareer}
        />
      )}

      {activeTab === 'explore' && (
        <ExploreTab
          careers={filteredCareers}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
          expandedCareer={expandedCareer}
          setExpandedCareer={setExpandedCareer}
        />
      )}

      {activeTab === 'bookmarks' && (
        <BookmarksTab
          careers={bookmarkedCareers}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
          expandedCareer={expandedCareer}
          setExpandedCareer={setExpandedCareer}
        />
      )}
    </div>
  )
}

// ─── Assessment Tab ───────────────────────────────────────────────

function AssessmentTab({ answers, onAnswer, onFinish, saving, complete }) {
  const answeredCount = Object.keys(answers).length
  const total = ASSESSMENT_QUESTIONS.length
  const progress = Math.round((answeredCount / total) * 100)

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress: {answeredCount} of {total} questions
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      {ASSESSMENT_QUESTIONS.map((q, idx) => (
        <div key={q.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            {idx + 1}. {q.text}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onAnswer(q.id, opt.value)}
                className={`text-left rounded-lg border-2 p-3 text-sm transition-colors ${
                  answers[q.id] === opt.value
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={onFinish}
          disabled={!complete || saving}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {saving ? 'Saving...' : complete ? 'View My Results' : `Answer all ${total} questions to continue`}
        </button>
      </div>
    </div>
  )
}

// ─── Results Tab ──────────────────────────────────────────────────

function ResultsTab({
  assessmentComplete,
  categoryScores,
  recommendedCareers,
  bookmarks,
  onToggleBookmark,
  onRetake,
  expandedCareer,
  setExpandedCareer,
}) {
  if (!assessmentComplete) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Complete the Assessment First
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Answer all questions in the Assessment tab to see your personalized career recommendations.
        </p>
      </div>
    )
  }

  const topThree = categoryScores.slice(0, 3)
  const maxScore = topThree[0]?.score || 1

  return (
    <div className="space-y-6">
      {/* Top Category Scores */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Your Top Career Categories</h2>
        <div className="space-y-3">
          {topThree.map(({ category, score }, idx) => (
            <div key={category}>
              <div className="flex justify-between text-sm mb-1">
                <span>
                  {idx + 1}. {getCategoryLabel(category)}
                </span>
                <span className="text-blue-200">{Math.round((score / maxScore) * 100)}% match</span>
              </div>
              <div className="w-full bg-blue-800/50 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${(score / maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Careers */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recommended Careers ({recommendedCareers.length})
          </h2>
          <button
            onClick={onRetake}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Retake Assessment
          </button>
        </div>
        <div className="space-y-3">
          {recommendedCareers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              isBookmarked={bookmarks.includes(career.id)}
              onToggleBookmark={onToggleBookmark}
              isExpanded={expandedCareer === career.id}
              onToggleExpand={() =>
                setExpandedCareer(expandedCareer === career.id ? null : career.id)
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Explore Tab ──────────────────────────────────────────────────

function ExploreTab({
  careers,
  categoryFilter,
  setCategoryFilter,
  searchTerm,
  setSearchTerm,
  bookmarks,
  onToggleBookmark,
  expandedCareer,
  setExpandedCareer,
}) {
  const categories = [
    'technology',
    'healthcare',
    'trades',
    'business',
    'government',
    'education',
    'logistics',
    'security',
    'finance',
  ]

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, skill, or MOS..."
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {getCategoryLabel(cat)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Career List */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing {careers.length} career{careers.length !== 1 ? 's' : ''}
      </p>
      <div className="space-y-3">
        {careers.map((career) => (
          <CareerCard
            key={career.id}
            career={career}
            isBookmarked={bookmarks.includes(career.id)}
            onToggleBookmark={onToggleBookmark}
            isExpanded={expandedCareer === career.id}
            onToggleExpand={() =>
              setExpandedCareer(expandedCareer === career.id ? null : career.id)
            }
          />
        ))}
      </div>
    </div>
  )
}

// ─── Bookmarks Tab ────────────────────────────────────────────────

function BookmarksTab({ careers, bookmarks, onToggleBookmark, expandedCareer, setExpandedCareer }) {
  if (careers.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Bookmarks Yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Bookmark careers you&apos;re interested in from the Explore or Results tab.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {careers.map((career) => (
        <CareerCard
          key={career.id}
          career={career}
          isBookmarked={bookmarks.includes(career.id)}
          onToggleBookmark={onToggleBookmark}
          isExpanded={expandedCareer === career.id}
          onToggleExpand={() =>
            setExpandedCareer(expandedCareer === career.id ? null : career.id)
          }
        />
      ))}
    </div>
  )
}

// ─── Career Card Component ────────────────────────────────────────

function CareerCard({ career, isBookmarked, onToggleBookmark, isExpanded, onToggleExpand }) {
  const growthColors = {
    high: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
    moderate: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
    stable: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700',
    declining: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
  }

  const difficultyColors = {
    easy: 'text-green-600 dark:text-green-400',
    moderate: 'text-yellow-600 dark:text-yellow-400',
    challenging: 'text-red-600 dark:text-red-400',
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header — always visible */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {career.title}
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${growthColors[career.growthOutlook]}`}>
                {getGrowthLabel(career.growthOutlook)}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {getCategoryLabel(career.category)} · {formatCurrency(career.avgSalary)}/yr avg ·{' '}
              <span className={difficultyColors[career.transitionDifficulty]}>
                {getDifficultyLabel(career.transitionDifficulty)}
              </span>
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleBookmark(career.id)
            }}
            className={`ml-3 p-1.5 rounded-full transition-colors ${
              isBookmarked
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this career'}
          >
            <svg className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4 space-y-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">{career.description}</p>

          {/* Salary Range */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
              Salary Range
            </h4>
            <p className="text-sm text-gray-900 dark:text-white">
              {formatCurrency(career.salaryRange[0])} – {formatCurrency(career.salaryRange[1])} /yr
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                (median {formatCurrency(career.avgSalary)})
              </span>
            </p>
          </div>

          {/* Growth */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
              Growth Outlook
            </h4>
            <p className="text-sm text-gray-900 dark:text-white">
              {career.growthPercent}% projected growth over 10 years
            </p>
          </div>

          {/* Veteran Advantage */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
              Veteran Advantage
            </h4>
            <p className="text-sm text-gray-900 dark:text-white">{career.veteranAdvantage}</p>
          </div>

          {/* Related MOS */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
              Related Military Codes
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {career.relatedMOS.map((mos) => (
                <span
                  key={mos}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded"
                >
                  {mos}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
              Key Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {career.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {career.certifications.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                Certifications
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {career.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {career.resources.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                Resources
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-0.5">
                {career.resources.map((resource) => (
                  <li key={resource}>{resource}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
              Typical Education
            </h4>
            <p className="text-sm text-gray-900 dark:text-white capitalize">
              {career.education.replace('-', ' ')}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
