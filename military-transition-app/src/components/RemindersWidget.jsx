import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  getUpcomingReminders,
  getOverdueReminders,
  getTodayReminders,
  toggleReminderComplete,
  REMINDER_CATEGORIES,
  formatReminderDate,
  getDaysUntil,
  isOverdue,
  isToday
} from '../utils/reminders'

export default function RemindersWidget() {
  const [reminders, setReminders] = useState([])
  const [overdue, setOverdue] = useState([])
  const [todayReminders, setTodayReminders] = useState([])

  useEffect(() => {
    loadReminders()
  }, [])

  const loadReminders = () => {
    setReminders(getUpcomingReminders(5))
    setOverdue(getOverdueReminders())
    setTodayReminders(getTodayReminders())
  }

  const handleToggleComplete = (reminderId) => {
    toggleReminderComplete(reminderId)
    loadReminders()
  }

  const hasReminders = reminders.length > 0 || overdue.length > 0 || todayReminders.length > 0

  if (!hasReminders) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="text-3xl">🔔</span>
            Upcoming Reminders
          </h2>
          <Link
            to="/app/reminders"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">No upcoming reminders</p>
          <Link
            to="/app/reminders"
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Add Your First Reminder
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <span className="text-3xl">🔔</span>
          Upcoming Reminders
        </h2>
        <Link
          to="/app/reminders"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-colors"
        >
          Manage All →
        </Link>
      </div>

      {/* Alert badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        {overdue.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-full">
            <span className="text-red-600 dark:text-red-400 font-bold text-sm">
              {overdue.length} Overdue
            </span>
          </div>
        )}
        {todayReminders.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-300 dark:border-orange-700 rounded-full">
            <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">
              {todayReminders.length} Due Today
            </span>
          </div>
        )}
      </div>

      {/* Reminders list */}
      <div className="space-y-3">
        {reminders.map(reminder => {
          const category = REMINDER_CATEGORIES[reminder.category] || REMINDER_CATEGORIES.event
          const overdueStatus = isOverdue(reminder.date)
          const todayStatus = isToday(reminder.date)
          const daysUntil = getDaysUntil(reminder.date)

          return (
            <div
              key={reminder.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                overdueStatus
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                  : todayStatus
                  ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700'
                  : 'bg-gray-50 dark:bg-gray-750 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={reminder.completed}
                  onChange={() => handleToggleComplete(reminder.id)}
                  className="mt-1 h-5 w-5 rounded-md border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`font-semibold text-gray-900 dark:text-white ${
                      reminder.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''
                    }`}>
                      {reminder.title}
                    </h3>
                    <span className="text-2xl flex-shrink-0">{category.icon}</span>
                  </div>

                  {reminder.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {reminder.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-sm font-semibold ${
                      overdueStatus
                        ? 'text-red-600 dark:text-red-400'
                        : todayStatus
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {formatReminderDate(reminder.date)}
                    </span>

                    {overdueStatus && (
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                        OVERDUE
                      </span>
                    )}

                    {todayStatus && !overdueStatus && (
                      <span className="px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">
                        TODAY
                      </span>
                    )}

                    {!overdueStatus && !todayStatus && daysUntil >= 0 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({daysUntil === 1 ? 'Tomorrow' : `in ${daysUntil} days`})
                      </span>
                    )}

                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      category.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                      category.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                      category.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      category.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {category.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {reminders.length >= 5 && (
        <div className="mt-4 text-center">
          <Link
            to="/app/reminders"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-colors"
          >
            View all reminders →
          </Link>
        </div>
      )}
    </div>
  )
}
