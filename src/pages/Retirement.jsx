import { useState, useEffect } from 'react'

const TIMELINE_DATA = [
  {
    id: '24mo',
    title: '24 Months Before Retirement',
    items: [
      'Attend initial Transition Assistance Program (TAP) briefing',
      'Begin Individual Transition Plan (ITP)',
      'Research post-military career options',
      'Start building professional network on LinkedIn',
      'Review military benefits and entitlements',
      'Consider education and training opportunities',
      'Begin financial planning for transition',
      'Review retirement pay calculations',
      'Start gathering medical records for ALL family members (not just yourself)',
      'Copy and save all family dental records',
      'Review and update educational/training records and certifications',
      'Verify security clearance documentation is current',
      'Create three post-military budgets (best case, expected, worst case scenarios)',
      'Research CLEP exams and test out of college courses while still in',
      'Document all military training for civilian equivalencies',
      'Start building emergency fund (goal: 6-12 months expenses)',
      'Research veteran-friendly states for tax benefits',
      'Join veteran networking groups on LinkedIn',
      'Subscribe to job boards in target industry',
      'Start informational interviews with veterans in desired field',
    ]
  },
  {
    id: '12mo',
    title: '12 Months Before Retirement',
    items: [
      'Complete TAP workshop (required)',
      'Update resume to civilian format',
      'Translate military skills to civilian terms',
      'Begin job search and application process',
      'Schedule initial medical and dental screenings',
      'Review VA disability compensation process',
      'Start accumulating separation documentation',
      'Research housing and relocation options',
      'Update security clearance if needed',
      'Review TSP and retirement account options',
      'Verify ALL military awards, medals, and ribbons - request any missing ones NOW',
      'Get copies of award certificates and citations',
      'Convert SGLI to VGLI (do NOT let coverage lapse!)',
      'Consider transferring Post-9/11 GI Bill benefits to dependents (CANNOT do this after separation)',
      'Research and apply for SkillBridge programs',
      'Apply for Onward to Opportunity if interested in certifications',
      'Get copies of ALL performance evaluations and fitreps',
      'Verify DD Form 2586 (VMET) is accurate and complete',
      'Begin attending veteran job fairs',
      'Set up consultation with financial advisor about TSP rollover',
      'Research SBP (Survivor Benefit Plan) options thoroughly',
      'Update your will and estate planning documents',
      'Review DEERS and ensure all dependents are enrolled correctly',
    ]
  },
  {
    id: '6mo',
    title: '6 Months Before Retirement',
    items: [
      'Submit VA healthcare enrollment application',
      'Complete Benefits Delivery at Discharge (BDD) claim',
      'Schedule all required medical and dental appointments',
      'Request copies of medical and dental records',
      'Attend job fairs and networking events',
      'Apply for education benefits (GI Bill)',
      'Begin terminal leave planning',
      'Update SGLI beneficiary information',
      'Create or update professional portfolio',
      'Review and plan for military pension',
      'Get ANY medical or dental work done NOW (weird moles, dental work, physicals)',
      'Schedule elective procedures while Tricare still covers them',
      'Get eyeglasses and contacts (Tricare covers before separation)',
      'Schedule mandatory Separation Health Assessment (no later than 90 days out)',
      'Research TAMP (Transitional Assistance Management Program) eligibility',
      'Check if spouse qualifies for military air transportation for house hunting',
      'Apply for TSA PreCheck/Global Entry using military email (free/discounted)',
      'Start professional wardrobe shopping for civilian interviews',
      'Schedule informational interviews in target companies',
      'Research cost of living in target cities thoroughly',
      'Get pre-approved for mortgage/VA home loan if buying',
      'Order extra copies of vital records (marriage cert, birth certificates)',
    ]
  },
  {
    id: '3mo',
    title: '3 Months Before Retirement',
    items: [
      'Finalize transition checklist with command',
      'Complete retirement physical examination',
      'Schedule final out-processing appointments',
      'Confirm employment or education plans',
      'Register with state employment office',
      'Schedule household goods shipment',
      'Notify landlord or make housing arrangements',
      'Transfer professional licenses and certifications',
      'Plan retirement ceremony (if applicable)',
      'Decide where to roll TSP/BRS (Wealthfront, Vanguard, etc.)',
      'Schedule consultation about TSP withdrawal strategies',
      'Request Permissive TDY for house/job hunting (10-30 days depending on status)',
      'Update professional wardrobe completely',
      'Purchase interview outfits',
      'Get professional headshots taken for LinkedIn',
      'Schedule mock interviews',
      'Finalize healthcare plan for day 1 of civilian life',
      'Research ACA marketplace options if needed',
      'Compare Tricare Retired Reserve vs civilian insurance',
      'Set up LinkedIn Premium for job searching',
      'Join professional associations in target industry',
      'Attend final round of job fairs',
    ]
  },
  {
    id: '1mo',
    title: '1 Month Before Retirement',
    items: [
      'Complete unit out-processing requirements',
      'Obtain certified copies of DD Form 214',
      'Ensure all medical appointments are complete',
      'Get copies of performance evaluations',
      'Verify final pay and leave balance',
      'Schedule TRICARE transition (for retirees)',
      'Complete financial counseling (if needed)',
      'Download and save military records from OMPF',
      'Schedule retiree ID card appointment',
      'Set up myPay account for retirement pay',
      'File certified copy of DD-214 with county courthouse (for easy future access)',
      'Make multiple certified copies of DD-214',
      'Sign up for VA newsletter at news.va.gov',
      'Arrange final housing inspection',
      'Inventory and photograph household goods before move',
      'Confirm healthcare coverage starts on separation date',
      'Set up automatic bill pay for first few months',
      'Update emergency contacts with all family members',
      'Schedule retirement ceremony (if desired)',
      'Order retirement gift/plaque if desired',
      'Take final photos in uniform',
      'Write thank you notes to mentors and commanders',
    ]
  },
  {
    id: 'final',
    title: 'Final Week & Post-Retirement',
    items: [
      'Turn in military equipment and gear',
      'Clear all on-base facilities (gym, library, etc.)',
      'Complete final out-processing checklist',
      'Receive DD Form 214 (Member Copy 4)',
      'Obtain retiree ID card',
      'Confirm direct deposit for retirement pay',
      'Save important contacts and phone numbers',
      'Review final retirement briefing materials',
      'Attend retirement ceremony',
      'Obtain retiree ID card immediately',
      'Register for VA healthcare at local facility',
      'Schedule first VA primary care appointment',
      'Update resume with veteran status and end date',
      'Update LinkedIn with veteran status',
      'Connect with local veteran service organizations',
      'File DD-214 with state veterans affairs office',
      'Sign up for state veteran benefits programs',
      'Research county/city veteran property tax exemptions',
      'Within 1 year: file VA claims for any new service-connected conditions that arise',
      'If you have children and 30%+ VA rating: update documentation when they turn 18 (can continue benefits until 23 if full-time student)',
      'Set up eBenefits account if not already done',
      'Register for state unemployment benefits (as backup)',
      'Join local veteran networking groups',
    ]
  }
]

export default function Retirement() {
  const [completedItems, setCompletedItems] = useState({})
  const [expandedSections, setExpandedSections] = useState({
    '24mo': true,
    '12mo': false,
    '6mo': false,
    '3mo': false,
    '1mo': false,
    'final': false
  })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Set page title
  useEffect(() => {
    document.title = 'Transition Checklist - 20+ Year Retirement'
  }, [])

  // Load completed items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('retirementChecklist')
    if (saved) {
      try {
        setCompletedItems(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading checklist data:', e)
      }
    }
    setIsInitialLoad(false)
  }, [])

  // Save to localStorage whenever completedItems changes
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem('retirementChecklist', JSON.stringify(completedItems))
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }, [completedItems, isInitialLoad])

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleItem = (sectionId, itemIndex) => {
    const key = `${sectionId}-${itemIndex}`
    setCompletedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const collapseAll = () => {
    const collapsed = {}
    TIMELINE_DATA.forEach(section => {
      collapsed[section.id] = false
    })
    setExpandedSections(collapsed)
  }

  const expandAll = () => {
    const expanded = {}
    TIMELINE_DATA.forEach(section => {
      expanded[section.id] = true
    })
    setExpandedSections(expanded)
  }

  const isItemCompleted = (sectionId, itemIndex) => {
    return !!completedItems[`${sectionId}-${itemIndex}`]
  }

  const getSectionProgress = (sectionId) => {
    const section = TIMELINE_DATA.find(s => s.id === sectionId)
    const total = section.items.length
    const completed = section.items.filter((_, idx) => isItemCompleted(sectionId, idx)).length
    return { completed, total, percentage: Math.round((completed / total) * 100) }
  }

  const getOverallProgress = () => {
    const totalItems = TIMELINE_DATA.reduce((sum, section) => sum + section.items.length, 0)
    const completedCount = Object.values(completedItems).filter(Boolean).length
    return { completed: completedCount, total: totalItems, percentage: Math.round((completedCount / totalItems) * 100) }
  }

  const overall = getOverallProgress()

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          20+ Year Retirement Timeline
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Track your progress through each phase of your retirement journey
        </p>

        {/* Collapse/Expand All Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex gap-3">
            <button
              onClick={collapseAll}
              className="px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-xl transition-all text-sm font-semibold shadow-md hover:shadow-lg"
            >
              Collapse All
            </button>
            <button
              onClick={expandAll}
              className="px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-xl transition-all text-sm font-semibold shadow-md hover:shadow-lg"
            >
              Expand All
            </button>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>💡 Tip: Use Tab to navigate, Space to check/uncheck items</span>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Overall Progress</h2>
            <span className="text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
              {overall.completed} of {overall.total} tasks ({overall.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-4 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${overall.percentage}%` }}
            />
          </div>
        </div>

        {/* Timeline Sections */}
        <div className="space-y-5">
          {TIMELINE_DATA.map(section => {
            const progress = getSectionProgress(section.id)
            const isExpanded = expandedSections[section.id]

            return (
              <div key={section.id} className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 hover:from-gray-100 hover:to-gray-150 dark:hover:from-gray-750 dark:hover:to-gray-700 transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center flex-1 gap-4">
                    <svg
                      className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{section.title}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="w-full sm:w-40 bg-gray-300 dark:bg-gray-600 rounded-full h-2.5 shadow-inner">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm">
                          {progress.completed}/{progress.total} tasks
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="px-6 py-5 space-y-3 bg-white dark:bg-gray-800">
                    {section.items.map((item, idx) => {
                      const isCompleted = isItemCompleted(section.id, idx)
                      return (
                        <div key={idx} className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                          <input
                            type="checkbox"
                            id={`${section.id}-${idx}`}
                            checked={isCompleted}
                            onChange={() => toggleItem(section.id, idx)}
                            className="mt-1 h-5 w-5 text-blue-600 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0 transition-all"
                          />
                          <label
                            htmlFor={`${section.id}-${idx}`}
                            className={`ml-4 cursor-pointer select-none leading-relaxed ${
                              isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {item}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 z-50 group"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-8 right-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-fade-in border border-green-500/20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold text-lg">Progress saved!</span>
        </div>
      )}
    </div>
  )
}
