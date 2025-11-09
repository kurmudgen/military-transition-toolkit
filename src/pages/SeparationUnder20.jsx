import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getChecklistProgress, updateChecklistProgress } from '../services/checklistService'
import UpgradeOverlay from '../components/UpgradeOverlay'

// Resource link mapping for checklist items
const RESOURCE_LINKS = {
  'File VA disability claim': { to: '/public/resources#vso-resources', label: 'See VSO Resources', external: false },
  'Attend all VA C&P exams': { to: 'https://www.va.gov/disability/va-claim-exam/', label: 'C&P Exam Guide', external: true },
  'Gather medical evidence': { to: '/public/resources#va-benefits', label: 'Evidence Guide', external: false },
  'Start AGGRESSIVE job search': { to: '/public/resources#employment', label: 'Job Search Resources', external: false },
  'Update resume to civilian language immediately': { to: '/app/resume-builder', label: 'Resume Builder', external: false },
  'Update resume to civilian language': { to: '/app/resume-builder', label: 'Resume Builder', external: false },
  'Set up LinkedIn profile and make it public': { to: 'https://www.linkedin.com/help/linkedin/answer/a542685', label: 'LinkedIn Guide', external: true },
  'Research certification programs in target industry': { to: '/public/resources#education', label: 'Certification Resources', external: false },
  'Apply for SkillBridge if eligible and helps career goals': { to: 'https://skillbridge.osd.mil/', label: 'SkillBridge Portal', external: true },
  'Calculate final leave payout': { to: '/public/retirement-calculator', label: 'Retirement Calculator', external: false },
  'Begin GI Bill planning': { to: '/public/resources#education', label: 'GI Bill Resources', external: false },
  'Research unemployment benefits in target state': { to: '/public/state-benefits', label: 'State Benefits Comparison', external: false },
  'Research state unemployment benefits': { to: '/public/state-benefits', label: 'State Benefits Comparison', external: false },
  'Finalize VA disability claim with ALL documentation': { to: '/public/resources#vso-resources', label: 'VSO Assistance', external: false },
  'Secure job offer if at all possible': { to: '/app/job-tracker', label: 'Job Tracker', external: false },
  'Continue aggressive job search if not yet employed': { to: '/public/resources#employment', label: 'Job Resources', external: false },
  'Apply to 10-20 jobs per week minimum': { to: '/app/job-tracker', label: 'Job Tracker', external: false },
  'Apply to 20+ jobs per week': { to: '/app/job-tracker', label: 'Job Tracker', external: false },
  'Research healthcare options thoroughly': { to: '/public/resources#healthcare', label: 'Healthcare Resources', external: false },
  'Research ACA marketplace': { to: 'https://www.healthcare.gov/', label: 'Healthcare.gov', external: true },
  'Convert SGLI to VGLI immediately': { to: 'https://www.va.gov/life-insurance/options-eligibility/vgli/', label: 'VGLI Info', external: true },
  'Apply for state veterans benefits in new location': { to: '/public/state-benefits', label: 'State Benefits', external: false },
  'File for state unemployment benefits if no job secured': { to: '/public/state-benefits', label: 'State Benefits', external: false },
  'Enroll in VA healthcare immediately': { to: 'https://www.va.gov/health-care/how-to-apply/', label: 'VA Healthcare Enrollment', external: true },
  'Follow up on VA disability claim status': { to: 'https://www.va.gov/claim-or-appeal-status/', label: 'Check Claim Status', external: true },
  'Check eBenefits for rating decision': { to: 'https://www.va.gov/resources/the-pact-act-and-your-va-benefits/', label: 'eBenefits Portal', external: true },
  'Begin using GI Bill if pursuing education': { to: '/public/resources#education', label: 'GI Bill Guide', external: false },
  'File DD-214 with county courthouse': { to: 'https://www.archives.gov/veterans/military-service-records', label: 'DD-214 Info', external: true },
  'Apply for county/city veteran benefits': { to: '/public/state-benefits', label: 'State Benefits', external: false },
  'Research property tax exemptions for veterans': { to: '/public/state-benefits', label: 'State Benefits', external: false },
  'Attend veteran job fairs': { to: '/public/resources#employment', label: 'Job Fair Resources', external: false },
  'Join veteran networking groups': { to: '/public/resources#vso-resources', label: 'VSO Resources', external: false },
  'Connect with veteran service organizations': { to: '/public/resources#vso-resources', label: 'VSO Resources', external: false },
}

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

export default function SeparationUnder20({ previewMode = false }) {
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

  // Database loading/saving states
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  // Set page title
  useEffect(() => {
    document.title = 'Transition Checklist - Separation Under 20 Years'
  }, [])

  // Load completed items from database on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true)
        setError(null)

        // Load progress from database
        const progress = await getChecklistProgress('separation')
        setCompletedItems(progress || {})

        console.log('✓ Separation checklist loaded from database')
      } catch (err) {
        console.error('Error loading checklist:', err)
        setError('Failed to load checklist progress. Please refresh the page.')
      } finally {
        setLoading(false)
        setIsInitialLoad(false)
      }
    }

    loadProgress()
  }, [])

  // Save to database whenever completedItems changes
  useEffect(() => {
    const saveProgress = async () => {
      if (isInitialLoad || loading) return

      try {
        setSaving(true)

        // Save progress to database
        await updateChecklistProgress('separation', completedItems)

        setShowToast(true)
        setTimeout(() => setShowToast(false), 2000)

        console.log('✓ Separation checklist saved to database')
      } catch (err) {
        console.error('Error saving checklist:', err)
        setError('Failed to save progress. Please try again.')
      } finally {
        setSaving(false)
      }
    }

    saveProgress()
  }, [completedItems, isInitialLoad, loading])

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

  // Loading state
  if (loading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12">
          <div className="flex flex-col items-center justify-center">
            <svg className="animate-spin h-16 w-16 text-blue-600 dark:text-blue-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">Loading your checklist from secure cloud storage...</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">This may take a moment</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      {previewMode && (
        <UpgradeOverlay
          featureName="Separation Under 20 Years"
          description="Navigate early separation with comprehensive planning tools and benefit calculators."
          benefits={[
            'Calculate separation benefits',
            'Track separation checklist',
            'Plan post-service career',
            'Cloud storage for documents',
            'Sync across all devices'
          ]}
        />
      )}

      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${previewMode ? 'pointer-events-none opacity-60' : ''}`}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Separation Timeline (Under 20 Years)
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Track your transition from military service to civilian life
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
          🔒 Your checklist progress is <strong>securely stored in the cloud</strong> and accessible from any device.
        </p>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-red-800 dark:text-red-200 font-semibold">Error</h3>
                <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
              >
                ×
              </button>
            </div>
          </div>
        )}

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
                      const resourceLink = RESOURCE_LINKS[item]

                      return (
                        <div key={idx} className="flex items-start group">
                          <input
                            type="checkbox"
                            id={`${section.id}-${idx}`}
                            checked={isCompleted}
                            onChange={() => toggleItem(section.id, idx)}
                            className="mt-1 h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer flex-shrink-0"
                          />
                          <label
                            htmlFor={`${section.id}-${idx}`}
                            className={`ml-3 cursor-pointer select-none flex-1 ${
                              isCompleted ? 'line-through text-gray-400' : 'text-gray-700'
                            }`}
                          >
                            {item}
                          </label>

                          {/* Resource Link */}
                          {resourceLink && (
                            resourceLink.external ? (
                              <a
                                href={resourceLink.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title={`View ${resourceLink.label}`}
                              >
                                → {resourceLink.label}
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            ) : (
                              <Link
                                to={resourceLink.to}
                                className="ml-2 text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                                title={`View ${resourceLink.label}`}
                              >
                                → {resourceLink.label}
                              </Link>
                            )
                          )}
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
