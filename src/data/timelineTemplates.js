// Timeline Templates - Situation-Specific Transition Timelines
// Templates are customized based on the user's transition situation (medboard, retirement, ETS)

// Helper function to calculate due date from separation date
export const calculateDueDate = (separationDate, monthsBefore) => {
  if (!separationDate) return null
  const date = new Date(separationDate)
  date.setMonth(date.getMonth() - monthsBefore)
  return date
}

// Helper function to format due date for display
export const formatDueDate = (date) => {
  if (!date) return 'TBD'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Medical Board (Medboard) Timeline
export const MEDBOARD_TIMELINE = [
  {
    id: 'medboard-referral',
    title: 'Medical Evaluation Board (MEB) Referral',
    monthsBefore: 12,
    category: 'Medical Board',
    description: 'Commander refers you to MEB due to medical condition that may affect your ability to serve',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'meb-counseling',
    title: 'Attend MEB Counseling Session',
    monthsBefore: 11.5,
    category: 'Medical Board',
    description: 'Meet with PEBLO (Physical Evaluation Board Liaison Officer) to understand the process',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'medical-exams',
    title: 'Complete All Medical Examinations',
    monthsBefore: 10,
    category: 'Medical Board',
    description: 'Attend all scheduled medical appointments and evaluations',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'narsum-review',
    title: 'Review NARSUM (Narrative Summary)',
    monthsBefore: 9,
    category: 'Medical Board',
    description: 'Review your medical narrative summary for accuracy. You have 10 days to submit a rebuttal.',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'meb-findings',
    title: 'Receive MEB Findings',
    monthsBefore: 8.5,
    category: 'Medical Board',
    description: 'MEB determines if you meet retention standards',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'peb-referral',
    title: 'Referred to Physical Evaluation Board (PEB)',
    monthsBefore: 8,
    category: 'Medical Board',
    description: 'If found unfit for duty, case goes to PEB for disability rating',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'peb-findings-review',
    title: 'Review PEB Findings',
    monthsBefore: 7,
    category: 'Medical Board',
    description: 'Review proposed findings and disability rating. Decide to concur or request formal hearing.',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'va-claim-bdd',
    title: 'File VA Disability Claim (BDD Program)',
    monthsBefore: 6,
    category: 'VA Benefits',
    description: 'File Benefits Delivery at Discharge claim 180-90 days before separation',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'va-cp-exam',
    title: 'Complete VA Compensation & Pension (C&P) Exams',
    monthsBefore: 5,
    category: 'VA Benefits',
    description: 'Attend all scheduled VA medical examinations for your disability claim',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'taps-medboard',
    title: 'Complete TAP/TGPS Workshop',
    monthsBefore: 5,
    category: 'Transition Assistance',
    description: 'Complete required Transition Assistance Program',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'medical-records',
    title: 'Request Complete Medical Records',
    monthsBefore: 4.5,
    category: 'Medical Documentation',
    description: 'Get copies of all service medical records before separation',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'severance-election',
    title: 'Make Severance Pay Election (if applicable)',
    monthsBefore: 4,
    category: 'Financial',
    description: 'Choose between lump sum or VA disability pay recoupment',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'crsc-crdp',
    title: 'Research CRSC/CRDP Eligibility',
    monthsBefore: 4,
    category: 'VA Benefits',
    description: 'Determine if you qualify for Combat-Related Special Compensation or Concurrent Retirement/Disability Pay',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'final-counseling',
    title: 'Final Separation Counseling',
    monthsBefore: 3,
    category: 'Out-Processing',
    description: 'Meet with PEBLO for final separation guidance',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'healthcare-transition',
    title: 'Plan Healthcare Transition',
    monthsBefore: 3,
    category: 'Healthcare',
    description: 'Understand VA healthcare enrollment, Tricare options, or civilian insurance',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'pre-separation-counseling',
    title: 'Pre-Separation Counseling',
    monthsBefore: 2.5,
    category: 'Out-Processing',
    description: 'Review DD Form 2648 benefits and services',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'resume-linkedin',
    title: 'Create Resume and LinkedIn Profile',
    monthsBefore: 2.5,
    category: 'Employment',
    description: 'Translate military experience to civilian terms',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'gi-bill-certificate',
    title: 'Obtain Certificate of Eligibility for GI Bill',
    monthsBefore: 2,
    category: 'Education',
    description: 'Request COE through eBenefits or VA.gov',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'out-processing',
    title: 'Begin Out-Processing Checklist',
    monthsBefore: 2,
    category: 'Out-Processing',
    description: 'Complete installation-specific out-processing requirements',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'job-search',
    title: 'Start Active Job Search',
    monthsBefore: 1.5,
    category: 'Employment',
    description: 'Apply to positions, network, attend job fairs',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'final-medical',
    title: 'Complete Final Medical/Dental Appointments',
    monthsBefore: 1.5,
    category: 'Healthcare',
    description: 'Address any outstanding medical or dental issues',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'tricare-enrollment',
    title: 'Enroll in Tricare Retired Reserve (if eligible)',
    monthsBefore: 1,
    category: 'Healthcare',
    description: 'Set up healthcare coverage for you and family',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'final-finance',
    title: 'Final Finance In-Processing',
    monthsBefore: 1,
    category: 'Financial',
    description: 'Ensure final pay, travel claims, and entitlements are correct',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'dd214-review',
    title: 'Review DD Form 214 for Accuracy',
    monthsBefore: 0.5,
    category: 'Out-Processing',
    description: 'Check for errors before final signing - this is your proof of service',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'final-clearance',
    title: 'Complete Final Out-Processing',
    monthsBefore: 0.25,
    category: 'Out-Processing',
    description: 'Turn in gear, clear housing, obtain final signatures',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'separation-day',
    title: 'Separation Day',
    monthsBefore: 0,
    category: 'Separation',
    description: 'Official separation from military service',
    rank: 'all',
    branch: 'all',
    priority: 'milestone'
  }
]

// Retirement Timeline
export const RETIREMENT_TIMELINE = [
  {
    id: 'retirement-notification',
    title: 'Submit Retirement Request',
    monthsBefore: 12,
    category: 'Retirement Process',
    description: 'Submit formal retirement request through your chain of command',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'retirement-counseling',
    title: 'Attend Pre-Retirement Counseling',
    monthsBefore: 11,
    category: 'Retirement Process',
    description: 'Meet with retirement services officer to understand the process',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'sbp-decision',
    title: 'Make Survivor Benefit Plan (SBP) Election',
    monthsBefore: 10,
    category: 'Retirement Benefits',
    description: 'Critical decision - choose SBP coverage for spouse/dependents. Requires spouse signature if declining.',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'retirement-pay-calculation',
    title: 'Review Retirement Pay Calculation',
    monthsBefore: 10,
    category: 'Financial',
    description: 'Understand your retired pay based on High-3, Redux, or BRS system',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'va-claim-file',
    title: 'File VA Disability Claim (BDD Program)',
    monthsBefore: 6,
    category: 'VA Benefits',
    description: 'File Benefits Delivery at Discharge claim 180-90 days before retirement',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'taps-retirement',
    title: 'Complete TAP/TGPS Workshop',
    monthsBefore: 6,
    category: 'Transition Assistance',
    description: 'Required transition assistance program',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'va-cp-exams',
    title: 'Complete VA C&P Examinations',
    monthsBefore: 5,
    category: 'VA Benefits',
    description: 'Attend all scheduled VA medical exams for disability claim',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'tricare-retiree',
    title: 'Research Tricare for Life and Retiree Options',
    monthsBefore: 5,
    category: 'Healthcare',
    description: 'Understand Tricare Prime, Select, or Tricare for Life (age 65+)',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'tsp-planning',
    title: 'Plan Thrift Savings Plan (TSP) Distributions',
    monthsBefore: 5,
    category: 'Financial',
    description: 'Decide on withdrawals, rollovers, or leaving funds in TSP',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'medical-records-retirement',
    title: 'Request Complete Medical Records',
    monthsBefore: 4,
    category: 'Medical Documentation',
    description: 'Obtain full service medical and dental records',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'retirement-ceremony-planning',
    title: 'Plan Retirement Ceremony (optional)',
    monthsBefore: 4,
    category: 'Retirement Process',
    description: 'Coordinate with unit for retirement ceremony if desired',
    rank: 'all',
    branch: 'all',
    priority: 'low'
  },
  {
    id: 'id-card-transition',
    title: 'Understand Retiree ID Card Process',
    monthsBefore: 3.5,
    category: 'Administrative',
    description: 'Plan to get retiree ID card (blue) and dependent ID cards',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'dfas-account',
    title: 'Set Up myPay/DFAS Account',
    monthsBefore: 3,
    category: 'Financial',
    description: 'Ensure you can access retirement pay information online',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'resume-career',
    title: 'Update Resume and Plan Second Career',
    monthsBefore: 3,
    category: 'Employment',
    description: 'Prepare for civilian employment or plan for full retirement',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'gi-bill-transfer',
    title: 'Confirm GI Bill Transfer to Dependents (if applicable)',
    monthsBefore: 3,
    category: 'Education',
    description: 'Ensure transfer of education benefits is complete (must be done before retirement)',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'ccda-counseling',
    title: 'Attend Final Pre-Separation Counseling',
    monthsBefore: 2.5,
    category: 'Transition Assistance',
    description: 'DD Form 2648 - review all benefits and entitlements',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'retirement-pay-start',
    title: 'Confirm Retirement Pay Start Date',
    monthsBefore: 2,
    category: 'Financial',
    description: 'Verify when first retirement payment will be issued (usually 30 days after retirement)',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'vets-preference',
    title: 'Understand Veterans Preference for Federal Jobs',
    monthsBefore: 2,
    category: 'Employment',
    description: 'Learn how to use 5-point or 10-point preference',
    rank: 'all',
    branch: 'all',
    priority: 'medium'
  },
  {
    id: 'out-processing-start',
    title: 'Begin Out-Processing Checklist',
    monthsBefore: 2,
    category: 'Out-Processing',
    description: 'Complete installation-specific out-processing',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'final-medical-retirement',
    title: 'Complete Final Medical/Dental Screening',
    monthsBefore: 1.5,
    category: 'Healthcare',
    description: 'Address any health issues before retirement',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'retirement-orders',
    title: 'Receive Retirement Orders',
    monthsBefore: 1,
    category: 'Retirement Process',
    description: 'Official orders approving your retirement',
    rank: 'all',
    branch: 'all',
    priority: 'milestone'
  },
  {
    id: 'vred-enrollment',
    title: 'Enroll in VRED (VA Retiree Dental)',
    monthsBefore: 1,
    category: 'Healthcare',
    description: 'Optional dental insurance program for retirees',
    rank: 'all',
    branch: 'all',
    priority: 'low'
  },
  {
    id: 'retirement-pay-election',
    title: 'Make Final Retirement Pay Elections',
    monthsBefore: 1,
    category: 'Financial',
    description: 'Confirm SBP, tax withholding, allotments, direct deposit',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'dd214-retirement',
    title: 'Review DD Form 214 for Accuracy',
    monthsBefore: 0.5,
    category: 'Out-Processing',
    description: 'Critical: Check dates, characterization, RE code, awards',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'retiree-id',
    title: 'Obtain Retiree ID Card',
    monthsBefore: 0.25,
    category: 'Administrative',
    description: 'Get blue retiree ID card at DEERS/RAPIDS office',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'final-out',
    title: 'Complete Final Out-Processing',
    monthsBefore: 0.25,
    category: 'Out-Processing',
    description: 'Turn in gear, clear housing, final signatures',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'retirement-ceremony',
    title: 'Retirement Ceremony (if planned)',
    monthsBefore: 0,
    category: 'Retirement Process',
    description: 'Formal recognition of your military service',
    rank: 'all',
    branch: 'all',
    priority: 'milestone'
  },
  {
    id: 'retirement-day',
    title: 'Retirement Date',
    monthsBefore: 0,
    category: 'Retirement Process',
    description: 'Official retirement from military service - Thank you for your service!',
    rank: 'all',
    branch: 'all',
    priority: 'milestone'
  }
]

// ETS (Expiration Term of Service) Timeline
export const ETS_TIMELINE = [
  {
    id: 'ets-notification',
    title: 'Receive ETS Notification',
    monthsBefore: 12,
    category: 'Separation Process',
    description: 'Notified of upcoming ETS date',
    rank: 'all',
    branch: 'all',
    priority: 'milestone'
  },
  {
    id: 'reenlistment-decision',
    title: 'Make Reenlistment Decision',
    monthsBefore: 11,
    category: 'Career Decision',
    description: 'Decide whether to reenlist, extend, or separate',
    rank: 'enlisted',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'taps-mandatory',
    title: 'Complete TAP/TGPS Workshop (Mandatory)',
    monthsBefore: 12,
    category: 'Transition Assistance',
    description: 'Required by law to complete 1 year before separation',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'va-claim-ets',
    title: 'File VA Disability Claim (BDD Program)',
    monthsBefore: 6,
    category: 'VA Benefits',
    description: 'File claim 180-90 days before separation',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'skillbridge',
    title: 'Apply for SkillBridge Program (if interested)',
    monthsBefore: 6,
    category: 'Employment',
    description: 'Civilian job training during last 180 days of service',
    rank: 'all',
    branch: 'all',
    priority: 'medium'
  },
  {
    id: 'va-exams',
    title: 'Complete VA C&P Examinations',
    monthsBefore: 5,
    category: 'VA Benefits',
    description: 'Attend all scheduled VA medical exams',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'resume-ets',
    title: 'Create Resume and LinkedIn Profile',
    monthsBefore: 5,
    category: 'Employment',
    description: 'Translate military skills to civilian resume',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'medical-records-ets',
    title: 'Request Service Medical Records',
    monthsBefore: 4,
    category: 'Medical Documentation',
    description: 'Get complete copy of medical and dental records',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'gi-bill-coe',
    title: 'Apply for GI Bill Certificate of Eligibility',
    monthsBefore: 4,
    category: 'Education',
    description: 'Request COE if planning to use education benefits',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'healthcare-plan',
    title: 'Research Post-Separation Healthcare Options',
    monthsBefore: 4,
    category: 'Healthcare',
    description: 'VA healthcare, ACA marketplace, or employer insurance',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'education-planning',
    title: 'Research Schools or Training Programs',
    monthsBefore: 3.5,
    category: 'Education',
    description: 'If using GI Bill, research and apply to schools',
    rank: 'all',
    branch: 'all',
    priority: 'medium'
  },
  {
    id: 'job-search-active',
    title: 'Begin Active Job Search',
    monthsBefore: 3,
    category: 'Employment',
    description: 'Network, attend job fairs, apply to positions',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'tsp-decision',
    title: 'Decide on TSP (Leave, Withdraw, or Rollover)',
    monthsBefore: 3,
    category: 'Financial',
    description: 'Understand tax implications of TSP decisions',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'vgli',
    title: 'Apply for VGLI (Veterans Group Life Insurance)',
    monthsBefore: 2.5,
    category: 'Insurance',
    description: 'Must apply within 1 year and 120 days of separation',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'pre-sep-counseling',
    title: 'Attend Pre-Separation Counseling',
    monthsBefore: 2.5,
    category: 'Transition Assistance',
    description: 'DD Form 2648 - review benefits with counselor',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'terminal-leave',
    title: 'Submit Terminal Leave Request',
    monthsBefore: 2,
    category: 'Leave',
    description: 'Use remaining leave before ETS (must be approved)',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'out-processing-ets',
    title: 'Begin Out-Processing Checklist',
    monthsBefore: 2,
    category: 'Out-Processing',
    description: 'Complete installation clearing requirements',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'unemployment-research',
    title: 'Research Unemployment Benefits (UCX)',
    monthsBefore: 1.5,
    category: 'Financial',
    description: 'Understand eligibility for Unemployment Compensation for Ex-Service members',
    rank: 'all',
    branch: 'all',
    priority: 'medium'
  },
  {
    id: 'final-medical-ets',
    title: 'Complete Separation Health Assessment',
    monthsBefore: 1.5,
    category: 'Healthcare',
    description: 'Required medical screening before separation',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'tricare-tamp',
    title: 'Enroll in Transitional Assistance Management Program (TAMP)',
    monthsBefore: 1,
    category: 'Healthcare',
    description: '180 days of Tricare coverage after separation (if eligible)',
    rank: 'all',
    branch: 'all',
    priority: 'high'
  },
  {
    id: 'finance-final',
    title: 'Final Finance Review',
    monthsBefore: 1,
    category: 'Financial',
    description: 'Ensure travel pay, final pay, and leave balance are correct',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'gear-turn-in',
    title: 'Schedule CIF/TA-50 Turn-In',
    monthsBefore: 0.75,
    category: 'Out-Processing',
    description: 'Appointment to return military equipment',
    rank: 'enlisted',
    branch: 'Army',
    priority: 'required'
  },
  {
    id: 'dd214-ets',
    title: 'Review DD Form 214 for Accuracy',
    monthsBefore: 0.5,
    category: 'Out-Processing',
    description: 'Critical: Verify all information before signing',
    rank: 'all',
    branch: 'all',
    priority: 'critical'
  },
  {
    id: 'housing-clear',
    title: 'Clear Base Housing (if applicable)',
    monthsBefore: 0.5,
    category: 'Out-Processing',
    description: 'Schedule move-out inspection and forwarding address',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'final-clear',
    title: 'Complete Final Out-Processing',
    monthsBefore: 0.25,
    category: 'Out-Processing',
    description: 'Final signatures, turn in ID card, get DD214',
    rank: 'all',
    branch: 'all',
    priority: 'required'
  },
  {
    id: 'ets-day',
    title: 'ETS Date',
    monthsBefore: 0,
    category: 'Separation',
    description: 'Official separation from military service',
    rank: 'all',
    branch: 'all',
    priority: 'milestone'
  }
]

// Get timeline based on situation
export const getTimelineTemplate = (situation) => {
  switch(situation?.toLowerCase()) {
    case 'medboard':
    case 'medical-board':
    case 'medical board':
      return MEDBOARD_TIMELINE
    case 'retirement':
    case 'retiring':
      return RETIREMENT_TIMELINE
    case 'ets':
    case 'separating':
    case 'separation':
      return ETS_TIMELINE
    default:
      return ETS_TIMELINE // Default to ETS timeline
  }
}

// Generate personalized timeline with actual dates
export const generatePersonalizedTimeline = (separationDate, situation, userProfile = {}) => {
  const template = getTimelineTemplate(situation)

  return template.map(task => {
    const dueDate = calculateDueDate(separationDate, task.monthsBefore)

    return {
      ...task,
      dueDate,
      formattedDueDate: formatDueDate(dueDate),
      completed: false,
      completedAt: null
    }
  })
}

// Get tasks due within a certain number of days
export const getTasksDueWithin = (timeline, days) => {
  const today = new Date()
  const futureDate = new Date()
  futureDate.setDate(today.getDate() + days)

  return timeline.filter(task => {
    if (!task.dueDate || task.completed) return false
    return task.dueDate >= today && task.dueDate <= futureDate
  }).sort((a, b) => a.dueDate - b.dueDate)
}

// Get overdue tasks
export const getOverdueTasks = (timeline) => {
  const today = new Date()

  return timeline.filter(task => {
    if (!task.dueDate || task.completed) return false
    return task.dueDate < today
  }).sort((a, b) => a.dueDate - b.dueDate)
}

// Get tasks by category
export const getTasksByCategory = (timeline) => {
  const categories = {}

  timeline.forEach(task => {
    if (!categories[task.category]) {
      categories[task.category] = []
    }
    categories[task.category].push(task)
  })

  return categories
}

// Get completion percentage
export const getCompletionPercentage = (timeline) => {
  if (!timeline || timeline.length === 0) return 0
  const completed = timeline.filter(task => task.completed).length
  return Math.round((completed / timeline.length) * 100)
}

// Check if task is due this week
export const isDueThisWeek = (dueDate) => {
  if (!dueDate) return false
  const today = new Date()
  const weekFromNow = new Date()
  weekFromNow.setDate(today.getDate() + 7)
  return dueDate >= today && dueDate <= weekFromNow
}

// Check if task is due within days
export const isDueWithinDays = (dueDate, days) => {
  if (!dueDate) return false
  const today = new Date()
  const futureDate = new Date()
  futureDate.setDate(today.getDate() + days)
  return dueDate >= today && dueDate <= futureDate
}

// Priority colors for UI
export const getPriorityColor = (priority) => {
  switch(priority) {
    case 'critical':
      return 'red'
    case 'required':
      return 'orange'
    case 'high':
      return 'yellow'
    case 'medium':
      return 'blue'
    case 'low':
      return 'gray'
    case 'milestone':
      return 'purple'
    default:
      return 'gray'
  }
}
