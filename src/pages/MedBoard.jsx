import { useState, useEffect } from 'react'

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

export default function MedBoard() {
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

  // Set page title
  useEffect(() => {
    document.title = 'Transition Checklist - MedBoard/IDES'
  }, [])

  // Load completed items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('medBoardChecklist')
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
      localStorage.setItem('medBoardChecklist', JSON.stringify(completedItems))
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

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          MedBoard / Medical Separation (IDES)
        </h1>
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
                      return (
                        <div key={idx} className="flex items-start">
                          <input
                            type="checkbox"
                            id={`${section.id}-${idx}`}
                            checked={isCompleted}
                            onChange={() => toggleItem(section.id, idx)}
                            className="mt-1 h-5 w-5 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer flex-shrink-0"
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
