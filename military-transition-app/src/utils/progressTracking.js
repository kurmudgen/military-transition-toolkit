// Progress Tracking System for Transition Milestones
// Privacy-first: All data stored locally in localStorage

const PROGRESS_KEY = 'transitionProgress'

// Milestone categories with default items
export const MILESTONE_CATEGORIES = {
  career: {
    name: 'Career & Employment',
    icon: '💼',
    color: 'blue',
    items: [
      'Update resume to civilian format',
      'Create LinkedIn profile',
      'Attend at least 3 networking events',
      'Complete SkillBridge or internship',
      'Apply to 10+ jobs',
      'Practice interview skills',
      'Research target companies',
      'Get professional headshots',
      'Join industry professional groups',
      'Secure job offer or start business'
    ]
  },
  education: {
    name: 'Education & Training',
    icon: '🎓',
    color: 'green',
    items: [
      'Apply for GI Bill benefits',
      'Research colleges/universities',
      'Get transcripts evaluated',
      'Take college entrance exams if needed',
      'Apply for certifications',
      'Complete online courses for skills',
      'Attend career workshops',
      'Join veteran student organizations',
      'Set up education funding plan',
      'Enroll in courses'
    ]
  },
  benefits: {
    name: 'VA Benefits & Claims',
    icon: '🏥',
    color: 'red',
    items: [
      'File VA disability claim',
      'Attend C&P examinations',
      'Gather medical evidence',
      'Get buddy statements',
      'Submit nexus letters',
      'Track claim status',
      'Appeal if necessary',
      'Register for VA healthcare',
      'Understand benefit letters',
      'Set up VA.gov account'
    ]
  },
  housing: {
    name: 'Housing & Relocation',
    icon: '🏠',
    color: 'purple',
    items: [
      'Research target locations',
      'Get pre-approved for VA home loan',
      'Find real estate agent',
      'Tour properties',
      'Make offer on home',
      'Complete home inspection',
      'Arrange household goods move',
      'Set up utilities',
      'Update mailing address',
      'Complete move-in'
    ]
  },
  healthcare: {
    name: 'Healthcare & Insurance',
    icon: '❤️',
    color: 'pink',
    items: [
      'Understand TRICARE transition',
      'Apply for VA healthcare',
      'Find civilian doctors',
      'Transfer medical records',
      'Fill final prescriptions',
      'Get dental work completed',
      'Schedule wellness checkup',
      'Research health insurance options',
      'Enroll in health coverage',
      'Set up HSA/FSA if applicable'
    ]
  },
  financial: {
    name: 'Financial Planning',
    icon: '💰',
    color: 'yellow',
    items: [
      'Review TSP/retirement accounts',
      'Create post-military budget',
      'Build emergency fund (6 months)',
      'Pay off high-interest debt',
      'Review insurance needs',
      'Update will and beneficiaries',
      'Open civilian bank accounts',
      'Understand tax implications',
      'Plan for SBP if retiring',
      'Meet with financial advisor'
    ]
  }
}

// Initialize progress data
const initProgress = () => {
  const stored = localStorage.getItem(PROGRESS_KEY)
  if (!stored) {
    const initialData = {
      categories: {},
      overallProgress: 0,
      lastUpdated: new Date().toISOString(),
      milestones: []
    }

    // Initialize each category
    Object.keys(MILESTONE_CATEGORIES).forEach(categoryId => {
      initialData.categories[categoryId] = {
        items: MILESTONE_CATEGORIES[categoryId].items.map((item, index) => ({
          id: `${categoryId}-${index}`,
          text: item,
          completed: false,
          completedDate: null
        })),
        progress: 0
      }
    })

    localStorage.setItem(PROGRESS_KEY, JSON.stringify(initialData))
    return initialData
  }
  try {
    return JSON.parse(stored)
  } catch {
    localStorage.removeItem(PROGRESS_KEY)
    return initProgress()
  }
}

// Get all progress data
export const getProgress = () => {
  return initProgress()
}

// Toggle item completion
export const toggleProgressItem = (categoryId, itemId) => {
  const progress = initProgress()
  const category = progress.categories[categoryId]

  if (!category) return progress

  const item = category.items.find(i => i.id === itemId)
  if (!item) return progress

  item.completed = !item.completed
  item.completedDate = item.completed ? new Date().toISOString() : null

  // Recalculate category progress
  category.progress = Math.round(
    (category.items.filter(i => i.completed).length / category.items.length) * 100
  )

  // Recalculate overall progress
  const totalItems = Object.values(progress.categories).reduce(
    (sum, cat) => sum + cat.items.length, 0
  )
  const completedItems = Object.values(progress.categories).reduce(
    (sum, cat) => sum + cat.items.filter(i => i.completed).length, 0
  )
  progress.overallProgress = Math.round((completedItems / totalItems) * 100)

  // Check for milestone achievements
  if (category.progress === 100 && !progress.milestones.includes(categoryId)) {
    progress.milestones.push(categoryId)
  }

  progress.lastUpdated = new Date().toISOString()
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))

  return progress
}

// Add custom item to category
export const addCustomItem = (categoryId, itemText) => {
  const progress = initProgress()
  const category = progress.categories[categoryId]

  if (!category) return progress

  const newItem = {
    id: `${categoryId}-custom-${Date.now()}`,
    text: itemText,
    completed: false,
    completedDate: null,
    custom: true
  }

  category.items.push(newItem)

  // Recalculate progress
  category.progress = Math.round(
    (category.items.filter(i => i.completed).length / category.items.length) * 100
  )

  const totalItems = Object.values(progress.categories).reduce(
    (sum, cat) => sum + cat.items.length, 0
  )
  const completedItems = Object.values(progress.categories).reduce(
    (sum, cat) => sum + cat.items.filter(i => i.completed).length, 0
  )
  progress.overallProgress = Math.round((completedItems / totalItems) * 100)

  progress.lastUpdated = new Date().toISOString()
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))

  return progress
}

// Delete custom item
export const deleteCustomItem = (categoryId, itemId) => {
  const progress = initProgress()
  const category = progress.categories[categoryId]

  if (!category) return progress

  category.items = category.items.filter(i => i.id !== itemId)

  // Recalculate progress
  if (category.items.length > 0) {
    category.progress = Math.round(
      (category.items.filter(i => i.completed).length / category.items.length) * 100
    )
  } else {
    category.progress = 0
  }

  const totalItems = Object.values(progress.categories).reduce(
    (sum, cat) => sum + cat.items.length, 0
  )
  const completedItems = Object.values(progress.categories).reduce(
    (sum, cat) => sum + cat.items.filter(i => i.completed).length, 0
  )
  progress.overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  progress.lastUpdated = new Date().toISOString()
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))

  return progress
}

// Get category statistics
export const getCategoryStats = (categoryId) => {
  const progress = initProgress()
  const category = progress.categories[categoryId]

  if (!category) return null

  const total = category.items.length
  const completed = category.items.filter(i => i.completed).length
  const remaining = total - completed

  return {
    total,
    completed,
    remaining,
    percentage: category.progress
  }
}

// Get overall statistics
export const getOverallStats = () => {
  const progress = initProgress()

  const totalItems = Object.values(progress.categories).reduce(
    (sum, cat) => sum + cat.items.length, 0
  )
  const completedItems = Object.values(progress.categories).reduce(
    (sum, cat) => sum + cat.items.filter(i => i.completed).length, 0
  )

  const completedCategories = Object.values(progress.categories).filter(
    cat => cat.progress === 100
  ).length

  const totalCategories = Object.keys(progress.categories).length

  return {
    overallProgress: progress.overallProgress,
    totalItems,
    completedItems,
    remainingItems: totalItems - completedItems,
    completedCategories,
    totalCategories,
    milestones: progress.milestones
  }
}

// Reset all progress (with confirmation)
export const resetAllProgress = () => {
  localStorage.removeItem(PROGRESS_KEY)
  return initProgress()
}
