// Reminders System for Important Dates and Deadlines
// Privacy-first: All data stored locally in localStorage

const REMINDERS_KEY = 'transitionReminders'

// Reminder categories
export const REMINDER_CATEGORIES = {
  appointment: { label: 'Appointment', color: 'blue', icon: '📅' },
  deadline: { label: 'Deadline', color: 'red', icon: '⏰' },
  milestone: { label: 'Milestone', color: 'green', icon: '🎯' },
  event: { label: 'Event', color: 'purple', icon: '📌' },
  followup: { label: 'Follow-up', color: 'yellow', icon: '🔔' }
}

// Initialize reminders data
const initReminders = () => {
  const stored = localStorage.getItem(REMINDERS_KEY)
  if (!stored) {
    const initialData = {
      reminders: [],
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(initialData))
    return initialData
  }
  return JSON.parse(stored)
}

// Get all reminders
export const getReminders = () => {
  return initReminders()
}

// Add new reminder
export const addReminder = (reminderData) => {
  const data = initReminders()

  const newReminder = {
    id: `reminder-${Date.now()}`,
    title: reminderData.title,
    description: reminderData.description || '',
    date: reminderData.date,
    category: reminderData.category || 'event',
    completed: false,
    completedDate: null,
    createdDate: new Date().toISOString()
  }

  data.reminders.push(newReminder)
  data.lastUpdated = new Date().toISOString()
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(data))

  return data
}

// Update reminder
export const updateReminder = (reminderId, updates) => {
  const data = initReminders()

  const reminder = data.reminders.find(r => r.id === reminderId)
  if (!reminder) return data

  Object.assign(reminder, updates)
  data.lastUpdated = new Date().toISOString()
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(data))

  return data
}

// Toggle reminder completion
export const toggleReminderComplete = (reminderId) => {
  const data = initReminders()

  const reminder = data.reminders.find(r => r.id === reminderId)
  if (!reminder) return data

  reminder.completed = !reminder.completed
  reminder.completedDate = reminder.completed ? new Date().toISOString() : null
  data.lastUpdated = new Date().toISOString()
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(data))

  return data
}

// Delete reminder
export const deleteReminder = (reminderId) => {
  const data = initReminders()

  data.reminders = data.reminders.filter(r => r.id !== reminderId)
  data.lastUpdated = new Date().toISOString()
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(data))

  return data
}

// Get upcoming reminders (not completed, sorted by date)
export const getUpcomingReminders = (limit = 5) => {
  const data = initReminders()

  const now = new Date()
  const upcoming = data.reminders
    .filter(r => !r.completed)
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  return limit ? upcoming.slice(0, limit) : upcoming
}

// Get overdue reminders
export const getOverdueReminders = () => {
  const data = initReminders()
  const now = new Date()
  now.setHours(0, 0, 0, 0) // Start of today

  return data.reminders
    .filter(r => !r.completed && new Date(r.date) < now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

// Get reminders due today
export const getTodayReminders = () => {
  const data = initReminders()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return data.reminders
    .filter(r => {
      if (r.completed) return false
      const reminderDate = new Date(r.date)
      return reminderDate >= today && reminderDate < tomorrow
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

// Get reminders due this week
export const getThisWeekReminders = () => {
  const data = initReminders()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  return data.reminders
    .filter(r => {
      if (r.completed) return false
      const reminderDate = new Date(r.date)
      return reminderDate >= today && reminderDate < nextWeek
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

// Get statistics
export const getReminderStats = () => {
  const data = initReminders()

  const total = data.reminders.length
  const completed = data.reminders.filter(r => r.completed).length
  const overdue = getOverdueReminders().length
  const today = getTodayReminders().length
  const thisWeek = getThisWeekReminders().length

  return {
    total,
    completed,
    active: total - completed,
    overdue,
    today,
    thisWeek
  }
}

// Check if a date is overdue
export const isOverdue = (dateString) => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const reminderDate = new Date(dateString)
  return reminderDate < now
}

// Check if a date is today
export const isToday = (dateString) => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const reminderDate = new Date(dateString)
  return reminderDate >= today && reminderDate < tomorrow
}

// Format date for display
export const formatReminderDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (isToday(dateString)) {
    return 'Today'
  } else if (date >= tomorrow && date < new Date(tomorrow.getTime() + 86400000)) {
    return 'Tomorrow'
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
}

// Get days until reminder
export const getDaysUntil = (dateString) => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const reminderDate = new Date(dateString)
  reminderDate.setHours(0, 0, 0, 0)
  const diffTime = reminderDate - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
