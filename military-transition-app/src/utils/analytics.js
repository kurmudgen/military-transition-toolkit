// Simple privacy-first analytics system
// All data stored locally in browser - no external tracking

const ANALYTICS_KEY = 'userAnalytics'
const MAX_EVENTS = 500 // Keep last 500 events

// Event types we track
export const EVENT_TYPES = {
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  CHECKLIST_ITEM: 'checklist_item',
  FORM_SUBMIT: 'form_submit',
  TOOL_USAGE: 'tool_usage',
  FEATURE_USAGE: 'feature_usage',
}

// Initialize analytics storage
const initAnalytics = () => {
  const stored = localStorage.getItem(ANALYTICS_KEY)
  if (!stored) {
    const initialData = {
      events: [],
      sessions: [],
      startDate: new Date().toISOString(),
    }
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(initialData))
    return initialData
  }
  return JSON.parse(stored)
}

// Track an event
export const trackEvent = (eventType, eventData = {}) => {
  try {
    const analytics = initAnalytics()

    const event = {
      id: Date.now() + Math.random(),
      type: eventType,
      timestamp: new Date().toISOString(),
      ...eventData,
    }

    // Add event to beginning of array
    analytics.events.unshift(event)

    // Keep only last MAX_EVENTS
    if (analytics.events.length > MAX_EVENTS) {
      analytics.events = analytics.events.slice(0, MAX_EVENTS)
    }

    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics))
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

// Track page view
export const trackPageView = (pageName, pageData = {}) => {
  trackEvent(EVENT_TYPES.PAGE_VIEW, {
    page: pageName,
    ...pageData,
  })
}

// Track button click
export const trackButtonClick = (buttonName, context = {}) => {
  trackEvent(EVENT_TYPES.BUTTON_CLICK, {
    button: buttonName,
    ...context,
  })
}

// Track checklist interaction
export const trackChecklistItem = (checklistName, itemCompleted = true) => {
  trackEvent(EVENT_TYPES.CHECKLIST_ITEM, {
    checklist: checklistName,
    completed: itemCompleted,
  })
}

// Track form submission
export const trackFormSubmit = (formName, formData = {}) => {
  trackEvent(EVENT_TYPES.FORM_SUBMIT, {
    form: formName,
    ...formData,
  })
}

// Track tool usage
export const trackToolUsage = (toolName, action = 'opened') => {
  trackEvent(EVENT_TYPES.TOOL_USAGE, {
    tool: toolName,
    action,
  })
}

// Get all analytics data
export const getAnalytics = () => {
  return initAnalytics()
}

// Get analytics summary/stats
export const getAnalyticsSummary = () => {
  const analytics = initAnalytics()
  const events = analytics.events || []

  // Count events by type
  const eventCounts = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1
    return acc
  }, {})

  // Count page views by page
  const pageViews = events
    .filter(e => e.type === EVENT_TYPES.PAGE_VIEW)
    .reduce((acc, event) => {
      acc[event.page] = (acc[event.page] || 0) + 1
      return acc
    }, {})

  // Count most used tools
  const toolUsage = events
    .filter(e => e.type === EVENT_TYPES.TOOL_USAGE)
    .reduce((acc, event) => {
      acc[event.tool] = (acc[event.tool] || 0) + 1
      return acc
    }, {})

  // Count checklists completed
  const checklistActivity = events
    .filter(e => e.type === EVENT_TYPES.CHECKLIST_ITEM)
    .reduce((acc, event) => {
      if (!acc[event.checklist]) {
        acc[event.checklist] = { completed: 0, uncompleted: 0 }
      }
      if (event.completed) {
        acc[event.checklist].completed++
      } else {
        acc[event.checklist].uncompleted++
      }
      return acc
    }, {})

  // Get activity by day (last 7 days)
  const last7Days = {}
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    last7Days[dateStr] = 0
  }

  events.forEach(event => {
    const eventDate = event.timestamp.split('T')[0]
    if (last7Days.hasOwnProperty(eventDate)) {
      last7Days[eventDate]++
    }
  })

  return {
    totalEvents: events.length,
    eventCounts,
    pageViews,
    toolUsage,
    checklistActivity,
    activityByDay: last7Days,
    mostRecentEvents: events.slice(0, 10),
    startDate: analytics.startDate,
  }
}

// Clear all analytics data
export const clearAnalytics = () => {
  if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
    localStorage.removeItem(ANALYTICS_KEY)
    return true
  }
  return false
}

// Export analytics data as JSON
export const exportAnalytics = () => {
  const analytics = getAnalytics()
  const dataStr = JSON.stringify(analytics, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}
