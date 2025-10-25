import { useState, useEffect } from 'react'

const TIMELINE_DATA = [
  {
    id: '12mo',
    title: '12 Months Before Separation (or as soon as you know)',
    items: [
      'Submit separation request through chain of command',
      'Attend TAP workshop IMMEDIATELY (don\'t wait)',
      'File VA disability claim 180-90 days before separation',
      'Start AGGRESSIVE job search (you have NO pension coming)',
      'Update resume to civilian language immediately',
      'Set up LinkedIn profile and make it public',
      'Check eligibility for separation pay (involuntary separation)',
      'Calculate final leave payout',
      'Start building emergency fund aggressively (6-12 months expenses minimum)',
      'Begin GI Bill planning (you can only use it yourself, cannot transfer)',
      'Research certification programs in target industry',
      'Apply for SkillBridge if eligible and helps career goals',
      'Attend every job fair available',
      'Network with veterans in target industry',
      'Research unemployment benefits in target state',
      'Create three post-military budgets (no income safety net)',
      'Cut unnecessary expenses NOW to build savings',
      'Pay down high-interest debt before separation',
    ]
  },
  {
    id: '6mo',
    title: '6 Months Before Separation',
    items: [
      'Finalize VA disability claim with ALL documentation',
      'Attend all VA C&P exams',
      'Secure job offer if at all possible (avoid income gap)',
      'Continue aggressive job search if not yet employed',
      'Apply to 10-20 jobs per week minimum',
      'Research healthcare options thoroughly',
      'Check TAMP eligibility (Transitional Assistance Management Program)',
      'If not TAMP eligible, research ACA marketplace',
      'If job secured, enroll in employer healthcare to start day 1',
      'Convert SGLI to VGLI immediately (don\'t let lapse)',
      'Research VGLI costs and compare to civilian life insurance',
      'Apply for certification programs using military credentials',
      'Leverage credentialing opportunities on base',
      'Get ALL medical and dental care done NOW',
      'Stock up on medications before Tricare ends',
      'Get eyeglasses, contacts, and dental work completed',
      'Complete DD Form 2648 (Pre-Separation Checklist)',
      'Get VMET (Verification of Military Experience and Training)',
      'Ensure all training and schools documented',
      'Request copies of all certifications and licenses',
    ]
  },
  {
    id: '3mo',
    title: '3 Months Before Separation',
    items: [
      'Intensify job search to maximum effort',
      'Apply to 20+ jobs per week',
      'Follow up on all applications',
      'Attend all available interviews',
      'Practice interview skills with TAP counselor',
      'Update professional wardrobe for civilian interviews',
      'Get professional headshots for LinkedIn',
      'Finalize moving arrangements',
      'Research cost of living in target city',
      'Apply for apartments/housing in new location',
      'Save first/last/deposit for housing',
      'Arrange household goods shipment',
      'Decide on DITY move vs military move',
      'Get quotes from moving companies',
      'Complete final medical and dental appointments',
      'Get copies of ALL medical records',
      'Get copies of ALL dental records',
      'Request certified copies of DD-214 in advance',
      'Review DD-214 for accuracy',
      'Update VMET with latest training',
      'Apply for state veterans benefits in new location',
      'Research veteran hiring preferences for government jobs',
    ]
  },
  {
    id: '1mo',
    title: '1 Month Before Separation',
    items: [
      'Confirm healthcare coverage starts on day 1 of separation',
      'Enroll in ACA if no employer healthcare',
      'Budget for healthcare costs if paying out of pocket',
      'Set up direct deposit for any separation pay',
      'Calculate exact final pay and leave payout',
      'Budget for potential gap in income',
      'Turn in all military equipment and uniforms',
      'Complete final out-processing appointments',
      'Get certified copies of DD-214 (get at least 5 copies)',
      'Confirm first civilian paycheck date',
      'Set up automatic payments for all bills for 3 months',
      'Notify landlord/mortgage company of status change',
      'Update car insurance (military discount ending)',
      'Update all insurance policies',
      'Close or convert military bank accounts if needed',
      'Ensure bill payments covered during transition',
      'Confirm GI Bill enrollment if going to school',
      'Register for classes if using GI Bill immediately',
      'Apply for state veteran ID card',
      'Get professional licenses if required for new job',
      'Update emergency contacts with family',
      'Plan for first day of civilian job or school',
    ]
  },
  {
    id: 'post',
    title: 'Post-Separation (First 90 Days)',
    items: [
      'File for state unemployment benefits if no job secured',
      'Use unemployment as bridge while job searching',
      'Enroll in VA healthcare immediately',
      'Schedule first VA primary care appointment',
      'Follow up on VA disability claim status',
      'Check eBenefits for rating decision',
      'Begin using GI Bill if pursuing education',
      'Certify enrollment with VA for BAH payments',
      'Register with state veterans affairs office',
      'File DD-214 with county courthouse for easy access',
      'Apply for county/city veteran benefits',
      'Research property tax exemptions for veterans',
      'Join veteran networking groups',
      'Connect with veteran service organizations',
      'Attend veteran job fairs in new location',
      'Continue aggressive job search if unemployed',
      'Update resume with separation date and veteran status',
      'Update LinkedIn with veteran status',
      'Consider temporary work to bridge income gap',
      'File taxes next year (will need W-2 from DFAS)',
      'Understand tax treatment of separation pay',
      'Within 1 year: file VA claims for any new conditions',
      'Keep documenting service-connected conditions',
      'Maintain health insurance without gap in coverage',
      'Budget tightly until stable income established',
    ]
  }
]

export default function SeparationUnder20() {
  const [completedItems, setCompletedItems] = useState({})
  const [expandedSections, setExpandedSections] = useState({
    '12mo': true,
    '6mo': false,
    '3mo': false,
    '1mo': false,
    'post': false
  })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Set page title
  useEffect(() => {
    document.title = 'Transition Checklist - Separation Under 20 Years'
  }, [])

  // Load completed items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('separationUnder20Checklist')
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
      localStorage.setItem('separationUnder20Checklist', JSON.stringify(completedItems))
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
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Separation Timeline (Under 20 Years)
        </h1>
        <p className="text-gray-600 mb-6">
          Track your transition from military service to civilian life
        </p>

        {/* Collapse/Expand All Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3">
            <button
              onClick={collapseAll}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Collapse All
            </button>
            <button
              onClick={expandAll}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Expand All
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>💡 Tip: Use Tab to navigate, Space to check/uncheck items</span>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-8 p-4 bg-purple-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Overall Progress</h2>
            <span className="text-sm font-medium text-gray-700">
              {overall.completed} of {overall.total} tasks completed ({overall.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${overall.percentage}%` }}
            />
          </div>
        </div>

        {/* Timeline Sections */}
        <div className="space-y-4">
          {TIMELINE_DATA.map(section => {
            const progress = getSectionProgress(section.id)
            const isExpanded = expandedSections[section.id]

            return (
              <div key={section.id} className="border rounded-lg overflow-hidden">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
                >
                  <div className="flex items-center flex-1">
                    <svg
                      className={`w-5 h-5 mr-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                      <div className="flex items-center mt-1">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {progress.completed}/{progress.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="px-6 py-4 space-y-3">
                    {section.items.map((item, idx) => {
                      const isCompleted = isItemCompleted(section.id, idx)
                      return (
                        <div key={idx} className="flex items-start">
                          <input
                            type="checkbox"
                            id={`${section.id}-${idx}`}
                            checked={isCompleted}
                            onChange={() => toggleItem(section.id, idx)}
                            className="mt-1 h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer flex-shrink-0"
                          />
                          <label
                            htmlFor={`${section.id}-${idx}`}
                            className={`ml-3 cursor-pointer select-none ${
                              isCompleted ? 'line-through text-gray-400' : 'text-gray-700'
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
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Progress saved!</span>
        </div>
      )}
    </div>
  )
}
