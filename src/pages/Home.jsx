import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import RemindersWidget from '../components/RemindersWidget'
import ReferralCard from '../components/ReferralCard'
import { useAuth } from '../contexts/AuthContext'
import { getUserProfile, completeOnboarding } from '../services/profileService'
import {
  generatePersonalizedTimeline,
  getTasksDueWithin,
  isDueWithinDays
} from '../data/timelineTemplates'
import { getTimelineItems } from '../services/timelineService'

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
  const { user } = useAuth()
  const navigate = useNavigate()
  const [userSetup, setUserSetup] = useState(null)
  const [separationDate, setSeparationDate] = useState('')
  const [userName, setUserName] = useState('')
  const [separationStatus, setSeparationStatus] = useState('transitioning') // NEW: Default to transitioning
  const [showSetup, setShowSetup] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)
  const [isEditingDate, setIsEditingDate] = useState(false)
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [timeline, setTimeline] = useState([])
  const [upcomingTasks, setUpcomingTasks] = useState([])
  const [referralCode, setReferralCode] = useState('')
  const [referralCount, setReferralCount] = useState(0)

  // Load user profile from Supabase (with localStorage fallback)
  useEffect(() => {
    async function loadUserProfile() {
      if (!user?.id) {
        setProfileLoaded(true)
        return
      }

      try {
        // Fetch profile from Supabase
        const profile = await getUserProfile(user.id)

        if (profile) {
          // Use Supabase data as source of truth
          setUserSetup(profile.situation)
          setSeparationDate(profile.separation_date || '')
          setUserName(profile.full_name || '')
          setReferralCode(profile.referral_code || '')
          setReferralCount(profile.referral_count || 0)

          // If situation exists, user has completed setup
          if (profile.situation && profile.separation_date) {
            // User has completed onboarding - go straight to dashboard
            // No need to show onboarding screen
          }
        } else {
          // Fallback to localStorage if Supabase fails
          const saved = localStorage.getItem('userSetup')
          if (saved) {
            try {
              const parsed = JSON.parse(saved)
              setUserSetup(parsed.situation)
              setSeparationDate(parsed.separationDate || '')
              setUserName(parsed.name || '')
            } catch (e) {
              console.error('Error loading localStorage:', e)
            }
          }
        }
      } catch (err) {
        console.error('Error loading user profile:', err)
        // Fallback to localStorage on error
        const saved = localStorage.getItem('userSetup')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            setUserSetup(parsed.situation)
            setSeparationDate(parsed.separationDate || '')
            setUserName(parsed.name || '')
          } catch (e) {
            console.error('Error loading localStorage:', e)
          }
        }
      } finally {
        setProfileLoaded(true)
      }
    }

    loadUserProfile()
  }, [user])

  // Load personalized timeline
  useEffect(() => {
    async function loadTimeline() {
      if (!userSetup || !separationDate) {
        setTimeline([])
        setUpcomingTasks([])
        return
      }

      try {
        // Generate personalized timeline based on situation and separation date
        const personalizedTimeline = generatePersonalizedTimeline(
          separationDate,
          userSetup
        )

        // Get completed tasks from database
        const dbTasks = await getTimelineItems()
        const completedIds = new Set(
          dbTasks.filter(t => t.completed).map(t => t.task_id)
        )

        // Merge with completion status
        const mergedTimeline = personalizedTimeline.map(task => ({
          ...task,
          completed: completedIds.has(task.id)
        }))

        setTimeline(mergedTimeline)

        // Get upcoming tasks (incomplete, due within 7 days, max 3)
        const upcoming = mergedTimeline
          .filter(task => !task.completed && task.dueDate && isDueWithinDays(task.dueDate, 7))
          .sort((a, b) => a.dueDate - b.dueDate)
          .slice(0, 3)

        setUpcomingTasks(upcoming)
      } catch (error) {
        console.error('Error loading timeline:', error)
      }
    }

    loadTimeline()
  }, [userSetup, separationDate])

  // Set page title and track page view
  useEffect(() => {
    document.title = 'Military Transition Toolkit - Plan Your Transition'
    trackPageView('Home Dashboard')
  }, [])

  // Rotate tips every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleSetup = async (situation) => {
    // Save to Supabase
    if (user?.id) {
      try {
        await completeOnboarding(user.id, situation, separationDate || null, userName || null)
      } catch (err) {
        console.error('Error saving to Supabase:', err)
      }
    }

    // Also save to localStorage as backup
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

  // NEW: Load Resume Builder data
  const getResumeData = () => {
    const saved = localStorage.getItem('resumeData')
    if (!saved) return null
    try {
      const data = JSON.parse(saved)
      const hasContactInfo = data.contactInfo && Object.keys(data.contactInfo).length > 0
      const experienceCount = data.experience?.length || 0
      const educationCount = data.education?.length || 0
      const skillsCount = data.skills?.technical?.length + data.skills?.leadership?.length + data.skills?.other?.length || 0

      return {
        hasResume: hasContactInfo || experienceCount > 0,
        experienceCount,
        educationCount,
        skillsCount,
        completeness: hasContactInfo && experienceCount > 0 && educationCount > 0 && skillsCount > 0 ? 100 :
                      hasContactInfo && experienceCount > 0 ? 60 :
                      hasContactInfo ? 30 : 0
      }
    } catch (e) {
      return null
    }
  }

  // NEW: Load Job Search data
  const getJobSearchData = () => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
      const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]')

      const statusCounts = {
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0
      }

      applications.forEach(app => {
        if (statusCounts.hasOwnProperty(app.status)) {
          statusCounts[app.status]++
        }
      })

      return {
        savedCount: savedJobs.length,
        applicationsCount: applications.length,
        ...statusCounts
      }
    } catch (e) {
      return { savedCount: 0, applicationsCount: 0, applied: 0, interview: 0, offer: 0, rejected: 0 }
    }
  }

  // NEW: Load State Benefits data
  const getStateBenefitsData = () => {
    try {
      const comparison = localStorage.getItem('stateComparison')
      const notes = localStorage.getItem('stateBenefitsNotes')

      return {
        hasComparison: !!comparison,
        statesCompared: comparison ? JSON.parse(comparison).length : 0,
        hasNotes: !!notes
      }
    } catch (e) {
      return { hasComparison: false, statesCompared: 0, hasNotes: false }
    }
  }

  // NEW: Get career readiness score (0-100)
  const getCareerReadinessScore = () => {
    const resume = getResumeData()
    const jobSearch = getJobSearchData()
    const stateBenefits = getStateBenefitsData()

    let score = 0

    // Resume contributes 40 points
    if (resume?.hasResume) {
      score += resume.completeness * 0.4
    }

    // Job search activity contributes 30 points
    if (jobSearch.savedCount > 0) score += 10
    if (jobSearch.applicationsCount > 0) score += 10
    if (jobSearch.interview > 0) score += 10

    // State research contributes 20 points
    if (stateBenefits.hasComparison) score += 20

    // VA claims contributes 10 points
    if (getVAConditionsCount() > 0) score += 10

    return Math.round(score)
  }

  const daysUntil = getDaysUntil()
  const overallProgress = getOverallProgress()
  const upcomingAppointments = getUpcomingAppointments()
  const vaConditions = getVAConditionsCount()
  const evidenceProgress = getEvidenceProgress()

  // NEW: Load new feature data
  const resumeData = getResumeData()
  const jobSearchData = getJobSearchData()
  const stateBenefitsData = getStateBenefitsData()
  const careerReadiness = getCareerReadinessScore()

  // Active checklists based on user situation
  const getActiveChecklists = () => {
    const checklists = []
    if (userSetup === 'retirement' || !userSetup) {
      const progress = getChecklistProgress('retirementChecklist')
      checklists.push({
        name: '20+ Year Retirement',
        link: '/app/retirement',
        ...progress,
        color: 'blue'
      })
    }
    if (userSetup === 'medboard' || !userSetup) {
      const progress = getChecklistProgress('medBoardChecklist')
      checklists.push({
        name: 'MedBoard / IDES',
        link: '/app/medboard',
        ...progress,
        color: 'red'
      })
    }
    if (userSetup === 'separation' || !userSetup) {
      const progress = getChecklistProgress('separationUnder20Checklist')
      checklists.push({
        name: 'Separation (<20 Years)',
        link: '/app/separation',
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

    // Check if profile is complete
    const isProfileComplete = userSetup && separationDate

    // If profile is not complete, show setup prompt
    if (!isProfileComplete) {
      actions.push({
        task: 'Complete your profile setup',
        source: 'Getting Started',
        action: 'Complete setup',
        link: '/app/setup',
        urgent: true
      })
      return actions // Return early, don't show other actions yet
    }

    // If profile is complete, show timeline tasks
    if (upcomingTasks.length > 0) {
      upcomingTasks.forEach(task => {
        actions.push({
          task: task.title,
          source: task.category,
          action: 'View Timeline',
          link: '/app/timeline',
          urgent: task.priority === 'critical' || task.priority === 'required',
          dueDate: task.dueDate
        })
      })
    } else {
      // If no upcoming tasks, encourage checking the full timeline
      const totalChecklistItems = activeChecklists.reduce((sum, cl) => sum + cl.total, 0)
      const totalChecklistCompleted = activeChecklists.reduce((sum, cl) => sum + cl.completed, 0)

      if (totalChecklistCompleted < 5) {
        actions.push({
          task: 'Start your transition checklist',
          source: 'Timeline',
          action: 'View Timeline',
          link: '/app/timeline',
          urgent: true
        })
      }
    }

    // NEW: Resume Builder recommendation
    if (!resumeData?.hasResume && daysUntil !== null && daysUntil < 365) {
      actions.push({
        task: 'Build your civilian resume',
        source: 'Career Prep',
        action: 'Start Resume',
        link: '/app/resume-builder',
        urgent: true
      })
    } else if (resumeData?.hasResume && resumeData.completeness < 100) {
      actions.push({
        task: 'Complete your resume with education and skills',
        source: 'Career Prep',
        action: 'Finish Resume',
        link: '/app/resume-builder',
        urgent: false
      })
    }

    // NEW: Job Search recommendation
    if (resumeData?.completeness >= 60 && jobSearchData.savedCount === 0 && daysUntil !== null && daysUntil < 180) {
      actions.push({
        task: 'Start researching job opportunities',
        source: 'Job Search',
        action: 'Search Jobs',
        link: '/app/job-search',
        urgent: false
      })
    } else if (jobSearchData.savedCount > 0 && jobSearchData.applicationsCount === 0) {
      actions.push({
        task: 'Apply to your saved jobs',
        source: 'Job Search',
        action: 'Apply Now',
        link: '/app/job-search',
        urgent: true
      })
    }

    // Appointment reminders
    if (upcomingAppointments.length === 0 && daysUntil !== null && daysUntil < 365) {
      actions.push({
        task: 'Schedule your initial PEBLO/TAP meeting',
        source: 'Appointments',
        action: 'Add appointment',
        link: '/app/appointments',
        urgent: false
      })
    }

    // VA claims
    if (vaConditions === 0 && (userSetup === 'medboard' || userSetup === 'retirement')) {
      actions.push({
        task: 'Start documenting your medical conditions',
        source: 'VA Claims',
        action: 'Build claim',
        link: '/app/va-claims-builder',
        urgent: true
      })
    } else if (vaConditions > 0 && evidenceProgress < 50) {
      actions.push({
        task: 'Gather evidence for your VA claims',
        source: 'Evidence Tracker',
        action: 'Track evidence',
        link: '/app/va-claims-builder',
        urgent: true
      })
    }

    // NEW: State benefits recommendation
    if (!stateBenefitsData.hasComparison && daysUntil !== null && daysUntil < 365) {
      actions.push({
        task: 'Research veteran-friendly states for relocation',
        source: 'Relocation',
        action: 'Compare states',
        link: '/app/state-benefits',
        urgent: false
      })
    }

    return actions.slice(0, 6)
  }

  const priorityActions = getPriorityActions()

  // Show loading state while profile is being loaded
  if (!profileLoaded) {
    return (
      <div className="px-4 py-6 sm:px-0 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

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
      {/* Success Message */}
      {/* NEW: Claims-Focused Dashboard for Already-Separated Veterans */}
      {separationStatus === 'separated' ? (
        <div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {userName ? `Welcome back, ${userName}!` : 'Welcome Back, Veteran!'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Let's get your VA claims filed and approved.
            </p>
          </div>

          {/* Tip of the Day */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Tip of the Day</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{TIPS[currentTip]}</p>
              </div>
            </div>
          </div>

          {/* Quick Action Cards - Claims Focused */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* VA Claims Builder - HERO */}
            <Link
              to="/app/va-claims-builder"
              onClick={() => trackButtonClick('Dashboard - VA Claims Builder')}
              className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">📋</div>
                <div>
                  <h3 className="text-2xl font-bold">VA Claims Builder</h3>
                  <p className="text-blue-100 text-sm mt-1">Build your claim step-by-step</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-white/90">
                  {vaConditions > 0 ? `${vaConditions} conditions tracked` : 'Get started →'}
                </span>
                {evidenceProgress > 0 && (
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                    {evidenceProgress}% complete
                  </span>
                )}
              </div>
            </Link>

            {/* State Benefits */}
            <Link
              to="/app/state-benefits"
              onClick={() => trackButtonClick('Dashboard - State Benefits')}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">🗺️</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">State Benefits</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Compare veteran benefits by state
              </p>
              {stateBenefitsData.statesCompared > 0 && (
                <div className="text-blue-600 dark:text-blue-400 font-semibold">
                  {stateBenefitsData.statesCompared} states compared
                </div>
              )}
            </Link>

            {/* Resources */}
            <Link
              to="/app/resources"
              onClick={() => trackButtonClick('Dashboard - Resources')}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">📚</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Resources</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                VA forms, guides, and helpful links
              </p>
              <div className="text-blue-600 dark:text-blue-400 font-semibold">
                Browse library →
              </div>
            </Link>
          </div>

          {/* Quick Links Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/app/va-claims-builder"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">📄</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">File a Claim</span>
              </Link>
              <Link
                to="/app/appointments"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">🏥</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Track Appointments</span>
              </Link>
              <Link
                to="/app/state-benefits"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">💰</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">State Benefits</span>
              </Link>
              <Link
                to="/app/resources"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-2xl">📖</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">VA Resources</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Original Full Dashboard for Transitioning Service Members */
        <div>
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
          className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 border-2 border-blue-600 dark:border-blue-500 rounded-lg transition-all min-h-[44px] flex items-center gap-2 shadow-sm hover:shadow-md"
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
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black rounded-xl shadow-2xl p-6 sm:p-8 mb-8 border border-slate-700 dark:border-slate-600">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">What brings you here?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleSetup('retirement')}
            className={`p-5 rounded-xl border-2 ${
              userSetup === 'retirement'
                ? 'border-blue-500 bg-slate-700/80 shadow-lg shadow-blue-500/20'
                : 'border-slate-600 hover:border-blue-400 hover:bg-slate-700/60 hover:shadow-lg'
            } transition-all duration-200 text-left group`}
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🎖️</div>
            <h3 className="font-bold text-white mb-2">20+ Year Retirement</h3>
            <p className="text-sm text-slate-300">Planning standard military retirement</p>
          </button>
          <button
            onClick={() => handleSetup('medboard')}
            className={`p-5 rounded-xl border-2 ${
              userSetup === 'medboard'
                ? 'border-blue-500 bg-slate-700/80 shadow-lg shadow-blue-500/20'
                : 'border-slate-600 hover:border-blue-400 hover:bg-slate-700/60 hover:shadow-lg'
            } transition-all duration-200 text-left group`}
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🏥</div>
            <h3 className="font-bold text-white mb-2">MedBoard / Medical Separation</h3>
            <p className="text-sm text-slate-300">Going through IDES process</p>
          </button>
          <button
            onClick={() => handleSetup('separation')}
            className={`p-5 rounded-xl border-2 ${
              userSetup === 'separation'
                ? 'border-blue-500 bg-slate-700/80 shadow-lg shadow-blue-500/20'
                : 'border-slate-600 hover:border-blue-400 hover:bg-slate-700/60 hover:shadow-lg'
            } transition-all duration-200 text-left group`}
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📋</div>
            <h3 className="font-bold text-white mb-2">Separation (Under 20 Years)</h3>
            <p className="text-sm text-slate-300">ETS or voluntary separation</p>
          </button>
        </div>
        <p className="text-slate-400 text-sm mt-6 leading-relaxed">
          Your selection helps us show you the most relevant tools and checklists. You can change this anytime in Settings.
        </p>
      </div>

      {/* Settings Modal */}
      {showSetup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Settings</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Name (optional)</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Separation/Retirement Date</label>
                <input
                  type="date"
                  value={separationDate}
                  onChange={(e) => setSeparationDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Transition Type</label>
                <select
                  value={userSetup}
                  onChange={(e) => setUserSetup(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="retirement">20+ Year Retirement</option>
                  <option value="separation">Separation (&lt;20 Years)</option>
                  <option value="medboard">MedBoard/IDES</option>
                  <option value="planning">Already Separated</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => {
                  const setup = { situation: userSetup, separationDate, name: userName }
                  localStorage.setItem('userSetup', JSON.stringify(setup))
                  setShowSetup(false)
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setShowSetup(false)}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Card - Countdown & Progress */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-2xl p-8 sm:p-10 text-white mb-8 border border-blue-500/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center sm:text-left">
            {daysUntil !== null && daysUntil > 0 ? (
              <>
                <h2 className="text-5xl sm:text-6xl font-extrabold mb-3 tracking-tight">{daysUntil} <span className="text-blue-200">Days</span></h2>
                <p className="text-xl sm:text-2xl text-blue-100 font-medium mb-2">Until Separation/Retirement</p>
                <p className="text-base text-blue-200/90 mt-3 font-light">
                  {separationDate && new Date(separationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </>
            ) : daysUntil !== null && daysUntil <= 0 ? (
              <>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">Separation Date Passed</h2>
                <p className="text-xl sm:text-2xl text-blue-100">Focus on post-transition planning</p>
              </>
            ) : (
              <>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to start planning?</h2>
                <button
                  onClick={() => setShowSetup(true)}
                  className="mt-3 text-base font-semibold bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 hover:shadow-lg min-h-[48px] transition-all"
                >
                  Set your separation date
                </button>
              </>
            )}
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44">
              <svg className="transform -rotate-90 w-full h-full drop-shadow-lg" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="14"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="white"
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray={`${overallProgress * 4.4} 440`}
                  strokeLinecap="round"
                  className="drop-shadow-md"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold drop-shadow-md">{overallProgress}%</div>
                  <div className="text-sm text-blue-100 font-medium mt-1">Complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row - Enhanced with New Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Career Readiness - NEW */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg shadow-md p-6 border-2 border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-purple-800 dark:text-purple-300">Career Readiness</p>
            <div className="text-3xl">💼</div>
          </div>
          <div className="relative w-24 h-24 mx-auto mb-2">
            <svg className="transform -rotate-90 w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-purple-200 dark:text-purple-900"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - careerReadiness / 100)}`}
                className="text-purple-600 dark:text-purple-400 transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{careerReadiness}%</span>
            </div>
          </div>
          <p className="text-xs text-center text-purple-700 dark:text-purple-400">
            Resume • Jobs • Research
          </p>
        </div>

        {/* Checklist Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Checklist Progress</p>
            <div className="text-3xl">✅</div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {activeChecklists.reduce((sum, cl) => sum + cl.completed, 0)}/
            {activeChecklists.reduce((sum, cl) => sum + cl.total, 0)}
          </p>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
            <div
              className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{overallProgress}% complete</p>
        </div>

        {/* Job Search Activity - NEW */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg shadow-md p-6 border-2 border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-green-800 dark:text-green-300">Job Search</p>
            <div className="text-3xl">🎯</div>
          </div>
          {jobSearchData.applicationsCount > 0 ? (
            <>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                {jobSearchData.applicationsCount}
              </p>
              <p className="text-xs text-green-700 dark:text-green-400 mb-1">
                Applications • {jobSearchData.interview} interviews
              </p>
              {jobSearchData.offer > 0 && (
                <p className="text-sm font-bold text-green-600 dark:text-green-300">
                  🎉 {jobSearchData.offer} offer{jobSearchData.offer > 1 ? 's' : ''}!
                </p>
              )}
            </>
          ) : jobSearchData.savedCount > 0 ? (
            <>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                {jobSearchData.savedCount}
              </p>
              <p className="text-xs text-green-700 dark:text-green-400">Jobs saved • Ready to apply</p>
            </>
          ) : (
            <p className="text-lg text-green-600 dark:text-green-400">Not started</p>
          )}
        </div>

        {/* VA Claims Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">VA Claims</p>
            <div className="text-3xl">🏥</div>
          </div>
          {vaConditions > 0 ? (
            <>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{vaConditions}</p>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                <div
                  className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${evidenceProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Conditions • {evidenceProgress}% evidence
              </p>
            </>
          ) : (
            <p className="text-lg text-gray-500 dark:text-gray-400">Not started</p>
          )}
        </div>
      </div>

      {/* NEW: Career Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Resume Status */}
        <Link to="/app/resume-builder" className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 dark:text-white">Resume Builder</h3>
            <span className="text-2xl">📄</span>
          </div>
          {resumeData?.hasResume ? (
            <div>
              <div className="mb-2">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${resumeData.completeness}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{resumeData.completeness}% complete</p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {resumeData.experienceCount} jobs • {resumeData.educationCount} education • {resumeData.skillsCount} skills
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create your military-to-civilian resume →
            </p>
          )}
        </Link>

        {/* Appointments */}
        <Link to="/app/appointments" className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 dark:text-white">Appointments</h3>
            <span className="text-2xl">📅</span>
          </div>
          {upcomingAppointments.length > 0 ? (
            <div>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {Math.ceil((new Date(upcomingAppointments[0].date) - new Date()) / (1000 * 60 * 60 * 24))} days
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {upcomingAppointments[0].title}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Schedule your transition appointments →
            </p>
          )}
        </Link>

        {/* State Benefits */}
        <Link to="/app/state-benefits" className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 dark:text-white">State Benefits</h3>
            <span className="text-2xl">🗺️</span>
          </div>
          {stateBenefitsData.hasComparison ? (
            <div>
              <p className="text-xl font-bold text-green-600 dark:text-green-400 mb-1">
                {stateBenefitsData.statesCompared}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                States compared • {stateBenefitsData.hasNotes ? 'Notes saved' : 'View comparison'}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compare veteran benefits by state →
            </p>
          )}
        </Link>
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
                        {action.dueDate && (
                          <p className="text-sm text-gray-700 mt-1 font-medium">
                            Due: {new Date(action.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        )}
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

          {/* Reminders Widget */}
          <RemindersWidget />

          {/* Referral Card */}
          {referralCode && (
            <div className="mb-8">
              <ReferralCard referralCode={referralCode} referralCount={referralCount} />
            </div>
          )}

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
                  to="/app/appointments"
                  className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Full Calendar →
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No appointments scheduled</p>
                <Link
                  to="/app/appointments"
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
          {/* Tools & Calculators - Enhanced */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🧮 Planning Tools</h2>
            <div className="space-y-3">
              <Link
                to="/app/resume-builder"
                className="block p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Resume Builder</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create civilian resume</p>
              </Link>

              <Link
                to="/app/job-search"
                className="block p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Job Search</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Find and track opportunities</p>
              </Link>

              <Link
                to="/app/retirement-calculator"
                className="block p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Retirement Calculator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calculate retirement pay</p>
              </Link>

              <Link
                to="/app/state-benefits"
                className="block p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">State Benefits</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Compare states for relocation</p>
              </Link>

              <Link
                to="/app/va-claims-builder"
                className="block p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">VA Claims Builder</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Build disability claim</p>
              </Link>

              <Link
                to="/app/resources"
                className="block p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Resources Library</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">60+ curated resources</p>
              </Link>
            </div>
          </div>

          {/* Tip of the Day - Enhanced */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span>💡</span>
              <span>Tip of the Day</span>
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{TIPS[currentTip]}</p>
          </div>

          {/* Resources & Support - Enhanced */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Quick Links</h2>
            <div className="space-y-2">
              <Link to="/app/resources" className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                Resource Library (60+ resources) →
              </Link>
              <Link to="/app/appointments" className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                Appointments & Tracking →
              </Link>
              <Link to="/app/faq" className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                FAQ & Guides →
              </Link>
              <Link to="/app/progress" className="block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                View Full Progress Report →
              </Link>
            </div>
          </div>

          {/* NEW: Quick Action - Export PDF */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span>📄</span>
              <span>Export Your Progress</span>
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Download a comprehensive PDF of your transition plan, checklist progress, VA claims, and more.
            </p>
            <Link
              to="/app/progress"
              onClick={() => trackButtonClick('Dashboard - Export PDF Link')}
              className="block w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-center rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 font-semibold transition-colors"
            >
              Go to Progress Page
            </Link>
          </div>
        </div>
      </div>
        </div>
      )}
    </div>
  )
}
