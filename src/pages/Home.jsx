import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Tips that rotate
const TIPS = [
  "Most veterans miss this: Request your medical records 12+ months before separation!",
  "Pro tip: Get buddy statements NOW while you still have contact info for your team.",
  "Did you know? You can start your VA claim up to 180 days before separation (BDD program).",
  "Coming up: If you're 12 months out, start attending TAP classes now.",
  "Remember: SBP enrollment is a one-time decision - can't add spouse later!",
  "Important: Transfer your GI Bill benefits before separation if eligible (10+ years).",
  "Don't forget: Keep copies of ALL medical appointments - even off-base civilian care.",
  "Heads up: Property tax exemptions vary by state - some require 100% disability rating."
]

export default function Home() {
  const [userSetup, setUserSetup] = useState(null)
  const [separationDate, setSeparationDate] = useState('')
  const [userName, setUserName] = useState('')
  const [showSetup, setShowSetup] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)
  const [isEditingDate, setIsEditingDate] = useState(false)

  // Load user setup from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('userSetup')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setUserSetup(parsed.situation)
        setSeparationDate(parsed.separationDate || '')
        setUserName(parsed.name || '')
      } catch (e) {
        console.error('Error loading user setup:', e)
      }
    }
  }, [])

  // Set page title
  useEffect(() => {
    document.title = 'Military Transition Toolkit - Plan Your Transition'
  }, [])

  // Rotate tips every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleSetup = (situation) => {
    const setup = { situation, separationDate, name: userName }
    localStorage.setItem('userSetup', JSON.stringify(setup))
    setUserSetup(situation)
    setShowSetup(false)
  }

  const updateSeparationDate = (date) => {
    const setup = { situation: userSetup, separationDate: date, name: userName }
    localStorage.setItem('userSetup', JSON.stringify(setup))
    setSeparationDate(date)
    setIsEditingDate(false)
  }

  // Load checklist progress from localStorage
  const getChecklistProgress = (storageKey) => {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return { completed: 0, total: 0 }
    try {
      const data = JSON.parse(saved)
      const completed = Object.values(data).filter(Boolean).length
      const total = Object.keys(data).length
      return { completed, total }
    } catch (e) {
      return { completed: 0, total: 0 }
    }
  }

  // Load appointments from localStorage
  const getUpcomingAppointments = () => {
    const saved = localStorage.getItem('appointments')
    if (!saved) return []
    try {
      const appointments = JSON.parse(saved)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return appointments
        .filter(apt => new Date(apt.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3)
    } catch (e) {
      return []
    }
  }

  // Calculate days until separation
  const getDaysUntil = () => {
    if (!separationDate) return null
    const today = new Date()
    const targetDate = new Date(separationDate)
    const diffTime = targetDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Get overall progress across all relevant checklists
  const getOverallProgress = () => {
    let totalCompleted = 0
    let totalItems = 0

    if (userSetup === 'retirement' || !userSetup) {
      const retirement = getChecklistProgress('retirementChecklist')
      totalCompleted += retirement.completed
      totalItems += retirement.total
    }
    if (userSetup === 'medboard' || !userSetup) {
      const medboard = getChecklistProgress('medBoardChecklist')
      totalCompleted += medboard.completed
      totalItems += medboard.total
    }
    if (userSetup === 'separation' || !userSetup) {
      const separation = getChecklistProgress('separationUnder20Checklist')
      totalCompleted += separation.completed
      totalItems += separation.total
    }

    return totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0
  }

  // Load VA conditions count
  const getVAConditionsCount = () => {
    const saved = localStorage.getItem('vaClaimsConditions')
    if (!saved) return 0
    try {
      return JSON.parse(saved).length
    } catch (e) {
      return 0
    }
  }

  // Load evidence tracking progress
  const getEvidenceProgress = () => {
    const saved = localStorage.getItem('vaClaimsEvidence')
    if (!saved) return 0
    try {
      const evidence = JSON.parse(saved)
      const conditions = Object.keys(evidence)
      if (conditions.length === 0) return 0

      let totalProgress = 0
      conditions.forEach(condition => {
        const ev = evidence[condition]
        let completed = 0
        let total = 9 // 3 required + 6 recommended

        // Required
        if (ev.required?.strs?.status === 'completed') completed++
        if (ev.required?.diagnosis?.status === 'completed') completed++
        if (ev.required?.nexus?.status === 'completed') completed++
        // Recommended
        if (ev.recommended?.buddyStatements?.status === 'received') completed++
        if (ev.recommended?.commanderStatement?.status === 'received') completed++
        if (ev.recommended?.photos?.has) completed++
        if (ev.recommended?.prescriptions?.medications) completed++
        if (ev.recommended?.appointments?.count) completed++
        if (ev.recommended?.dbq?.status === 'completed') completed++

        totalProgress += (completed / total)
      })

      return Math.round((totalProgress / conditions.length) * 100)
    } catch (e) {
      return 0
    }
  }

  const daysUntil = getDaysUntil()
  const overallProgress = getOverallProgress()
  const upcomingAppointments = getUpcomingAppointments()
  const vaConditions = getVAConditionsCount()
  const evidenceProgress = getEvidenceProgress()

  // Active checklists based on user situation
  const getActiveChecklists = () => {
    const checklists = []
    if (userSetup === 'retirement' || !userSetup) {
      const progress = getChecklistProgress('retirementChecklist')
      checklists.push({
        name: '20+ Year Retirement',
        link: '/retirement',
        ...progress,
        color: 'blue'
      })
    }
    if (userSetup === 'medboard' || !userSetup) {
      const progress = getChecklistProgress('medBoardChecklist')
      checklists.push({
        name: 'MedBoard / IDES',
        link: '/medboard',
        ...progress,
        color: 'red'
      })
    }
    if (userSetup === 'separation' || !userSetup) {
      const progress = getChecklistProgress('separationUnder20Checklist')
      checklists.push({
        name: 'Separation (<20 Years)',
        link: '/separation',
        ...progress,
        color: 'green'
      })
    }
    return checklists
  }

  const activeChecklists = getActiveChecklists()

  // Recent activity - get last 5 checked items (mock for now, would need to track in real implementation)
  const getRecentActivity = () => {
    // This would require tracking each checkbox change with timestamp
    // For now, we'll show a placeholder
    return []
  }

  // Priority actions - what user should focus on this week
  const getPriorityActions = () => {
    const actions = []

    // If no checklist progress, encourage starting
    const totalChecklistItems = activeChecklists.reduce((sum, cl) => sum + cl.total, 0)
    const totalChecklistCompleted = activeChecklists.reduce((sum, cl) => sum + cl.completed, 0)

    if (totalChecklistItems === 0) {
      actions.push({
        task: 'Choose your transition path',
        source: 'Getting Started',
        action: 'Complete setup',
        link: '#',
        urgent: true
      })
    } else if (totalChecklistCompleted < 5) {
      actions.push({
        task: 'Start your transition checklist',
        source: 'Timeline',
        action: 'Begin planning',
        link: activeChecklists[0]?.link || '/retirement',
        urgent: true
      })
    }

    // Appointment reminders
    if (upcomingAppointments.length === 0 && daysUntil !== null && daysUntil < 365) {
      actions.push({
        task: 'Schedule your initial PEBLO/TAP meeting',
        source: 'Appointments',
        action: 'Add appointment',
        link: '/appointments',
        urgent: false
      })
    }

    // VA claims
    if (vaConditions === 0 && (userSetup === 'medboard' || userSetup === 'retirement')) {
      actions.push({
        task: 'Start documenting your medical conditions',
        source: 'VA Claims',
        action: 'Build claim',
        link: '/va-claims-builder',
        urgent: true
      })
    } else if (vaConditions > 0 && evidenceProgress < 50) {
      actions.push({
        task: 'Gather evidence for your VA claims',
        source: 'Evidence Tracker',
        action: 'Track evidence',
        link: '/va-claims-builder',
        urgent: true
      })
    }

    // State benefits
    if (!localStorage.getItem('stateComparison')) {
      actions.push({
        task: 'Research veteran-friendly states',
        source: 'Relocation',
        action: 'Compare states',
        link: '/state-benefits',
        urgent: false
      })
    }

    return actions.slice(0, 5)
  }

  const priorityActions = getPriorityActions()

  // Show setup wizard if not configured
  if (!userSetup && !showSetup) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white rounded-lg shadow p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome! Let's personalize your experience
          </h1>
          <p className="text-gray-600 mb-8">
            Select your situation to get tailored guidance and checklists:
          </p>

          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleSetup('retirement')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left transition-colors"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    I'm retiring after 20+ years
                  </h3>
                  <p className="text-sm text-gray-600">
                    Standard military retirement with pension benefits
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => handleSetup('separation')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 text-left transition-colors"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    I'm separating before 20 years
                  </h3>
                  <p className="text-sm text-gray-600">
                    Transitioning without retirement pension (but still eligible for VA benefits)
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => handleSetup('medboard')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 text-left transition-colors"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    I'm going through MedBoard/IDES
                  </h3>
                  <p className="text-sm text-gray-600">
                    Medical separation or retirement process
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => handleSetup('planning')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 text-left transition-colors"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    I'm already separated (planning/claims only)
                  </h3>
                  <p className="text-sm text-gray-600">
                    Focus on VA claims, benefits, and post-service planning
                  </p>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            You can change this later in settings
          </p>
        </div>
      </div>
    )
  }

  // Main Dashboard View
  return (
    <div className="px-4 py-6 sm:px-0 max-w-7xl mx-auto">
      {/* Header with settings */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {userName ? `Welcome back, ${userName}!` : 'Your Transition Dashboard'}
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            {userSetup === 'retirement' && '20+ Year Retirement Track'}
            {userSetup === 'medboard' && 'MedBoard/IDES Track'}
            {userSetup === 'separation' && 'Separation (<20 Years) Track'}
            {userSetup === 'planning' && 'Post-Separation Planning'}
          </p>
        </div>
        <button
          onClick={() => setShowSetup(true)}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors min-h-[44px] flex items-center gap-2"
          aria-label="Open settings"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </button>
      </div>

      {/* User Type Selector - Prominent */}
      <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">What brings you here?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleSetup('retirement')}
            className={`p-4 rounded-lg border-2 ${
              userSetup === 'retirement' ? 'border-blue-500 bg-slate-700' : 'border-slate-600 hover:border-blue-500 hover:bg-slate-700'
            } transition-all text-left`}
          >
            <div className="text-2xl mb-2">🎖️</div>
            <h3 className="font-semibold text-white mb-1">20+ Year Retirement</h3>
            <p className="text-sm text-slate-400">Planning standard military retirement</p>
          </button>
          <button
            onClick={() => handleSetup('medboard')}
            className={`p-4 rounded-lg border-2 ${
              userSetup === 'medboard' ? 'border-blue-500 bg-slate-700' : 'border-slate-600 hover:border-blue-500 hover:bg-slate-700'
            } transition-all text-left`}
          >
            <div className="text-2xl mb-2">🏥</div>
            <h3 className="font-semibold text-white mb-1">MedBoard / Medical Separation</h3>
            <p className="text-sm text-slate-400">Going through IDES process</p>
          </button>
          <button
            onClick={() => handleSetup('separation')}
            className={`p-4 rounded-lg border-2 ${
              userSetup === 'separation' ? 'border-blue-500 bg-slate-700' : 'border-slate-600 hover:border-blue-500 hover:bg-slate-700'
            } transition-all text-left`}
          >
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-semibold text-white mb-1">Separation (Under 20 Years)</h3>
            <p className="text-sm text-slate-400">ETS or voluntary separation</p>
          </button>
        </div>
        <p className="text-slate-400 text-sm mt-4">
          Your selection helps us show you the most relevant tools and checklists. You can change this anytime in Settings.
        </p>
      </div>

      {/* Settings Modal */}
      {showSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Dashboard Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (optional)</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Separation/Retirement Date</label>
                <input
                  type="date"
                  value={separationDate}
                  onChange={(e) => setSeparationDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transition Type</label>
                <select
                  value={userSetup}
                  onChange={(e) => setUserSetup(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="retirement">20+ Year Retirement</option>
                  <option value="separation">Separation (&lt;20 Years)</option>
                  <option value="medboard">MedBoard/IDES</option>
                  <option value="planning">Already Separated</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  const setup = { situation: userSetup, separationDate, name: userName }
                  localStorage.setItem('userSetup', JSON.stringify(setup))
                  setShowSetup(false)
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowSetup(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Card - Countdown & Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 sm:p-8 text-white mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center sm:text-left">
            {daysUntil !== null && daysUntil > 0 ? (
              <>
                <h2 className="text-4xl sm:text-5xl font-bold mb-2">{daysUntil} Days</h2>
                <p className="text-lg sm:text-xl text-blue-100">Until Separation/Retirement</p>
                <p className="text-sm text-blue-200 mt-2">
                  {separationDate && new Date(separationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </>
            ) : daysUntil !== null && daysUntil <= 0 ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Separation Date Passed</h2>
                <p className="text-lg sm:text-xl text-blue-100">Focus on post-transition planning</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Ready to start planning?</h2>
                <button
                  onClick={() => setShowSetup(true)}
                  className="mt-2 text-sm bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 min-h-[44px] transition-colors"
                >
                  Set your separation date
                </button>
              </>
            )}
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="white"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${overallProgress * 4.4} 440`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold">{overallProgress}%</div>
                  <div className="text-xs text-blue-100">Complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Checklist Progress</p>
              <p className="text-lg font-bold text-gray-900 mb-2">
                {activeChecklists.reduce((sum, cl) => sum + cl.completed, 0)}/
                {activeChecklists.reduce((sum, cl) => sum + cl.total, 0)} tasks
              </p>
              <div className="relative w-20 h-20">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - overallProgress / 100)}`}
                    className="text-blue-600 transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">{overallProgress}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600">Appointments</p>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingAppointments.length > 0 ? (
                  <>
                    Next in {Math.ceil((new Date(upcomingAppointments[0].date) - new Date()) / (1000 * 60 * 60 * 24))} days
                  </>
                ) : (
                  'None scheduled'
                )}
              </p>
            </div>
            <div className="text-3xl">📅</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Evidence Tracking</p>
              {vaConditions > 0 ? (
                <>
                  <p className="text-lg font-bold text-gray-900 mb-2">{vaConditions} conditions</p>
                  <div className="relative w-20 h-20">
                    <svg className="transform -rotate-90 w-20 h-20">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 32}`}
                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - evidenceProgress / 100)}`}
                        className="text-green-600 transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-green-600">{evidenceProgress}%</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-lg text-gray-500">Not started</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600">VA Conditions</p>
              <p className="text-2xl font-bold text-gray-900">{vaConditions}</p>
            </div>
            <div className="text-3xl">🏥</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          {/* What's Next - Priority Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Focus on These This Week</h2>
            {priorityActions.length > 0 ? (
              <div className="space-y-3">
                {priorityActions.map((action, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border-2 ${action.urgent ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{action.task}</h3>
                        <p className="text-sm text-gray-600 mt-1">From: {action.source}</p>
                      </div>
                      <Link
                        to={action.link}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap"
                      >
                        {action.action}
                      </Link>
                    </div>
                    {action.urgent && (
                      <span className="inline-block mt-2 px-2 py-1 bg-red-600 text-white text-xs rounded">
                        High Priority
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Great job! You're on track with your transition.</p>
            )}
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📅 This Week's Appointments</h2>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((apt, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{apt.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          {apt.time && ` at ${apt.time}`}
                        </p>
                        {apt.location && <p className="text-sm text-gray-500 mt-1">{apt.location}</p>}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        apt.type === 'medical' ? 'bg-blue-100 text-blue-800' :
                        apt.type === 'vacp' ? 'bg-red-100 text-red-800' :
                        apt.type === 'peblo' ? 'bg-purple-100 text-purple-800' :
                        apt.type === 'tap' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {Math.ceil((new Date(apt.date) - new Date()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </div>
                ))}
                <Link
                  to="/appointments"
                  className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Full Calendar →
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No appointments scheduled</p>
                <Link
                  to="/appointments"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add your first appointment →
                </Link>
              </div>
            )}
          </div>

          {/* Your Checklists */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Checklists</h2>
            <div className="space-y-4">
              {activeChecklists.map((checklist, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{checklist.name}</h3>
                    <span className="text-sm text-gray-600">
                      {checklist.completed}/{checklist.total} items
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full bg-${checklist.color}-500`}
                        style={{ width: `${checklist.total > 0 ? (checklist.completed / checklist.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {checklist.total > 0 ? Math.round((checklist.completed / checklist.total) * 100) : 0}% complete
                    </span>
                    <Link
                      to={checklist.link}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Continue Checklist →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-8">
          {/* Tools & Calculators */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🧮 Planning Tools</h2>
            <div className="space-y-3">
              <Link
                to="/retirement-calculator"
                className="block p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">Retirement Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your monthly retirement pay</p>
              </Link>

              <Link
                to="/state-benefits"
                className="block p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">State Benefits Comparison</h3>
                <p className="text-sm text-gray-600">Find the best state for your situation</p>
              </Link>

              <Link
                to="/va-claims-builder"
                className="block p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">VA Claims Builder</h3>
                <p className="text-sm text-gray-600">Build your disability claim</p>
              </Link>
            </div>
          </div>

          {/* Tip of the Day */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">💡 Tip of the Day</h2>
            <p className="text-sm text-gray-700">{TIPS[currentTip]}</p>
          </div>

          {/* Resources & Support */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📚 Resources</h2>
            <div className="space-y-2">
              <Link to="/resources" className="block text-blue-600 hover:text-blue-800 text-sm">
                Resource Library →
              </Link>
              <Link to="/appointments" className="block text-blue-600 hover:text-blue-800 text-sm">
                Contact Directory →
              </Link>
              <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                FAQ & Guides →
              </a>
            </div>
          </div>

          {/* Premium Upsell */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-lg p-6 text-white">
            <div className="text-2xl mb-2">⭐</div>
            <h2 className="text-lg font-bold mb-2">Upgrade to Premium</h2>
            <ul className="text-sm space-y-1 mb-4 text-purple-100">
              <li>• Appointment reminders</li>
              <li>• Advanced calculators</li>
              <li>• Unlimited PDF exports</li>
              <li>• Priority support</li>
            </ul>
            <button className="w-full px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-semibold">
              See Premium Features
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
