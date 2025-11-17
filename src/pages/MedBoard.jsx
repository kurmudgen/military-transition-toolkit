import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getChecklistProgress, updateChecklistProgress } from '../services/checklistService'

// Resource link mapping for MedBoard checklist items
const RESOURCE_LINKS = {
  'File VA disability claim with help from MSC': { to: '/public/resources#vso-resources', label: 'VSO Resources', external: false },
  'Attend ALL VA C&P (Compensation & Pension) exams': { to: 'https://www.va.gov/disability/va-claim-exam/', label: 'C&P Exam Guide', external: true },
  'Gather ALL medical documentation from civilian providers': { to: '/app/va-claims-builder', label: 'Evidence Tracker', external: false },
  'Request buddy statements from fellow service members': { to: '/app/va-claims-builder', label: 'Buddy Statements Guide', external: false },
  'Contact Wounded Warrior Program if applicable': { to: 'https://www.woundedwarriorproject.org/', label: 'WWP Website', external: true },
  'Join veteran networking groups': { to: '/public/resources#vso-resources', label: 'VSO Resources', external: false },
  'Connect with veteran service organizations': { to: '/public/resources#vso-resources', label: 'VSO Resources', external: false },
  'Apply for state veterans benefits': { to: '/public/state-benefits', label: 'State Benefits', external: false },
  'Research state veteran benefits': { to: '/public/state-benefits', label: 'State Benefits', external: false },
  'Research healthcare options': { to: '/public/resources#healthcare', label: 'Healthcare Resources', external: false },
  'Enroll in VA healthcare': { to: 'https://www.va.gov/health-care/how-to-apply/', label: 'VA Healthcare Enrollment', external: true },
  'Research GI Bill benefits': { to: '/public/resources#education', label: 'GI Bill Guide', external: false },
  'Start job search': { to: '/public/resources#employment', label: 'Job Resources', external: false },
  'Update resume': { to: '/app/resume-builder', label: 'Resume Builder', external: false },
  'Calculate retirement pay': { to: '/public/retirement-calculator', label: 'Retirement Calculator', external: false },
}

const IDES_TIMELINE = [
  {
    id: 'phase1',
    title: 'Phase 1: Referral & PEBLO Assignment',
    subtitle: 'Day 1-7',
    items: [
      'Physician submits referral to IDES (Integrated Disability Evaluation System)',
      'You are assigned a Physical Evaluation Board Liaison Officer (PEBLO)',
      'Meet with PEBLO for initial counseling',
      'Understand the entire IDES timeline (approximately 180-210 days)',
      'Learn about your rights throughout the process',
      'Get contact information for PEBLO and backup contacts',
      'Understand difference between MEB (Medical Evaluation Board) and PEB (Physical Evaluation Board)',
      'Learn about free legal counsel availability (JAG)',
      'Get assigned a Military Services Coordinator (MSC) from VA',
      'Request copies of all service treatment records (STRs)',
      'Begin documenting all medical conditions and symptoms daily',
      'Start buddy statement collection from fellow service members',
      'Join MedBoard support groups online for advice',
      'Contact Wounded Warrior Program if applicable',
    ]
  },
  {
    id: 'phase2',
    title: 'Phase 2: Claim Development',
    subtitle: 'Day 8-14',
    items: [
      'File VA disability claim with help from MSC',
      'List ALL service-connected conditions (even minor ones)',
      'Work with MSC to schedule VA examinations',
      'Gather ALL medical documentation from civilian providers',
      'Collect service treatment records (STRs) from entire career',
      'Get copies of deployment medical records',
      'Obtain civilian medical records if treated off-base',
      'Write personal statement about each condition',
      'Request buddy statements from fellow service members',
      'Document how conditions affect daily life',
      'Take photos/videos of limitations if applicable',
      'Get nexus letters from doctors linking conditions to service',
      'Compile all medications currently taking',
      'List all medical appointments from past year',
    ]
  },
  {
    id: 'phase3',
    title: 'Phase 3: VA Examination',
    subtitle: 'Day 15-45',
    items: [
      'Attend ALL VA C&P (Compensation & Pension) exams',
      'Bring all medical documentation to exams',
      'Describe your WORST days, not your best',
      'Be honest about pain levels and limitations',
      'Document what you CANNOT do, not what you can',
      'Bring list of all medications and dosages',
      'Describe frequency and duration of symptoms',
      'Explain how conditions affect work and daily activities',
      'Get copies of all DBQs (Disability Benefits Questionnaires) completed',
      'Follow up immediately if you miss an exam',
      'Request additional exams for conditions not evaluated',
      'Keep diary of symptoms leading up to exams',
      'Bring spouse/family member for credibility if helpful',
      'Review DBQ results for accuracy',
    ]
  },
  {
    id: 'phase4',
    title: 'Phase 4: MEB Stage',
    subtitle: 'Day 46-65',
    items: [
      'Medical Evaluation Board reviews your case',
      'MEB consists of at least two medical doctors',
      'MEB determines which conditions are "medically unacceptable"',
      'Review MEB findings carefully with PEBLO',
      'You have right to submit rebuttal if you disagree',
      'Request Impartial Medical Review (IMR) if needed',
      'Ensure all conditions are documented in MEB report',
      'Check that report accurately reflects limitations',
      'Submit additional medical evidence if needed',
      'Get statement from commander about duty limitations',
      'Submit personal statement addressing each condition',
      'Review narrative summaries (NARSUM) for accuracy',
      'Ensure all claimed conditions are addressed',
      'Deadline to submit rebuttal is typically 7 days',
    ]
  },
  {
    id: 'phase5',
    title: 'Phase 5: Proposed Ratings',
    subtitle: 'Day 66-84',
    items: [
      'VA provides proposed disability ratings for each condition',
      'Review ratings carefully - this affects your entire future',
      'Understand how combined ratings work (not simple addition)',
      'Check if ratings match severity of your conditions',
      'You have 2 days to request VA Rating Reconsideration',
      'Compare proposed ratings to VA rating criteria',
      'Submit additional evidence for low ratings',
      'Request reconsideration if ratings seem too low',
      'Get independent medical opinions if needed',
      'Understand difference between temporary and permanent ratings',
      'Learn about future rating increases/decreases',
      'Review which conditions rated vs not rated',
      'Ensure all claimed conditions have ratings',
      'Submit additional buddy statements if needed',
    ]
  },
  {
    id: 'phase6',
    title: 'Phase 6: PEB Decision',
    subtitle: 'Day 85-110',
    items: [
      'Informal PEB (IPEB) reviews your case',
      'PEB determines if you are fit or unfit for duty',
      'PEB proposes disposition: separation vs medical retirement',
      'Unfit conditions receive disability ratings',
      'Fit conditions do not receive DoD ratings (but may get VA ratings)',
      'Review PEB findings with PEBLO',
      'You have three options: Concur, Non-concur, or request Formal PEB',
      'If you concur: process moves to final disposition',
      'If you non-concur: can submit rebuttal or request Formal PEB',
      'Understand your proposed disability percentage',
      'Learn difference between temporary vs permanent disability retirement',
      'Calculate proposed monthly compensation',
      'Consult with legal counsel (free JAG or private attorney)',
      'Deadline to make election is typically 10 days',
    ]
  },
  {
    id: 'phase7',
    title: 'Phase 7: Final Disposition',
    subtitle: 'Day 111-180',
    items: [
      'If you concurred: separation/retirement orders issued',
      'If you requested Formal PEB: hearing scheduled (24 days)',
      'Formal PEB is like a court hearing with your testimony',
      'You can have attorney represent you',
      'Can present new evidence and witnesses',
      'FPEB makes final determination',
      'Can appeal FPEB decision within 10 days',
      'Final rating determines your benefits going forward',
      'Understand if you\'re getting medical separation or retirement',
      'Medical separation: one-time severance pay, then civilian',
      'Medical retirement: monthly DoD disability payments for life',
      'Learn about CRSC (Combat-Related Special Compensation) eligibility',
      'Learn about CRDP (Concurrent Retirement Disability Pay) if 20+ years',
      'Review final orders for accuracy',
    ]
  },
  {
    id: 'phase8',
    title: 'Phase 8: Transition',
    subtitle: 'Day 181-210',
    items: [
      'Begin standard out-processing procedures',
      'Attend all transition briefings',
      'Final medical and dental exams',
      'Turn in all military equipment and uniforms (keep authorized items)',
      'Update DEERS with new status',
      'Receive final orders in ePEB system',
      'Orders sent to DFAS for pay processing',
      'Set up direct deposit for DoD disability payments',
      'Begin receiving DoD disability pay within 60 days of separation',
      'VA makes final disability decision (typically 30 days after separation)',
      'Apply for retiree/veteran ID card',
      'Register for VA healthcare',
      'File VA claim for any additional conditions not covered by MedBoard',
      'Ensure smooth transition of medical care to VA',
      'Get copies of all medical board documents for records',
      'Join veteran service organizations',
      'Connect with other medically retired veterans for support',
    ]
  }
]

export default function MedBoard({ previewMode = false }) {
  const [completedItems, setCompletedItems] = useState({})
  const [expandedSections, setExpandedSections] = useState({
    phase1: true,
    phase2: false,
    phase3: false,
    phase4: false,
    phase5: false,
    phase6: false,
    phase7: false,
    phase8: false
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
    document.title = 'Transition Checklist - MedBoard/IDES'
  }, [])

  // Load completed items from database on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true)
        setError(null)

        // Load progress from database
        const progress = await getChecklistProgress('medboard')
        setCompletedItems(progress || {})

        console.log('✓ MedBoard checklist loaded from database')
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
        await updateChecklistProgress('medboard', completedItems)

        setShowToast(true)
        setTimeout(() => setShowToast(false), 2000)

        console.log('✓ MedBoard checklist saved to database')
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
    IDES_TIMELINE.forEach(section => {
      collapsed[section.id] = false
    })
    setExpandedSections(collapsed)
  }

  const expandAll = () => {
    const expanded = {}
    IDES_TIMELINE.forEach(section => {
      expanded[section.id] = true
    })
    setExpandedSections(expanded)
  }

  const isItemCompleted = (sectionId, itemIndex) => {
    return !!completedItems[`${sectionId}-${itemIndex}`]
  }

  const getSectionProgress = (sectionId) => {
    const section = IDES_TIMELINE.find(s => s.id === sectionId)
    const total = section.items.length
    const completed = section.items.filter((_, idx) => isItemCompleted(sectionId, idx)).length
    return { completed, total, percentage: Math.round((completed / total) * 100) }
  }

  const getOverallProgress = () => {
    const totalItems = IDES_TIMELINE.reduce((sum, section) => sum + section.items.length, 0)
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
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${previewMode ? 'pointer-events-none opacity-60' : ''}`}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          MedBoard / Medical Separation (IDES)
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Navigate the IDES process with confidence. Track each phase of your medical evaluation.
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
        <p className="text-gray-600 mb-6">
          Navigate the Integrated Disability Evaluation System process (approximately 180-210 days)
        </p>

        {/* Important Guidance Notice */}
        <div className="bg-blue-900/30 border-l-4 border-blue-500 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">ℹ️</span>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Important: IDES/MedBoard VA Claims
              </h3>
              <p className="text-gray-700 mb-3">
                If you're going through the Integrated Disability Evaluation System (IDES/MedBoard),
                your VA claim process is different from regular claims:
              </p>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li><strong>✓ Service connection is presumed</strong> - The fact that you're going through
                MedBoard establishes the connection between your conditions and military service</li>
                <li><strong>✓ Focus on impact, not incident details</strong> - You don't need to document
                every time/place symptoms occurred. Focus on how the condition affects your daily life and work</li>
                <li><strong>✓ Your PEBLO and MSC guide the process</strong> - They help you through the claim
                specifics. Use this app to track progress and organize information</li>
                <li><strong>✓ Attend all C&P exams</strong> - These evaluations determine your ratings.
                Describe your worst days, not your best</li>
              </ul>
              <p className="text-gray-700 mt-3 text-sm italic">
                For detailed guidance, work closely with your PEBLO (Physical Evaluation Board Liaison Officer)
                and MSC (Military Services Coordinator).
              </p>
            </div>
          </div>
        </div>

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
        <div className="mb-8 p-4 bg-red-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Overall Progress</h2>
            <span className="text-sm font-medium text-gray-700">
              {overall.completed} of {overall.total} tasks completed ({overall.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-red-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${overall.percentage}%` }}
            />
          </div>
        </div>

        {/* Timeline Sections */}
        <div className="space-y-4">
          {IDES_TIMELINE.map(section => {
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
                      <p className="text-sm text-gray-500 mb-1">{section.subtitle}</p>
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
                            className="mt-1 h-5 w-5 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer flex-shrink-0"
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
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
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
