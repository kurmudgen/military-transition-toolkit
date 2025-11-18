import { useState, useEffect } from 'react'
import {
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder,
  toggleReminderComplete,
  getReminderStats,
  REMINDER_CATEGORIES,
  formatReminderDate,
  getDaysUntil,
  isOverdue,
  isToday
} from '../utils/reminders'
import { trackPageView, trackButtonClick } from '../utils/analytics'

export default function Reminders({ previewMode = false }) {
  const [data, setData] = useState(null)
  const [stats, setStats] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingReminder, setEditingReminder] = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('active') // active, completed, all
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'event'
  })

  useEffect(() => {
    document.title = 'Reminders - Military Transition Toolkit'
    trackPageView('Reminders')
    loadData()
  }, [])

  const loadData = () => {
    setData(getReminders())
    setStats(getReminderStats())
  }

  const handleAddReminder = () => {
    if (!formData.title || !formData.date) return

    addReminder(formData)
    trackButtonClick('Add Reminder')
    setFormData({ title: '', description: '', date: '', category: 'event' })
    setShowAddModal(false)
    loadData()
  }

  const handleUpdateReminder = () => {
    if (!editingReminder || !formData.title || !formData.date) return

    updateReminder(editingReminder.id, formData)
    trackButtonClick('Update Reminder')
    setEditingReminder(null)
    setFormData({ title: '', description: '', date: '', category: 'event' })
    loadData()
  }

  const handleDeleteReminder = (reminderId) => {
    if (confirm('Are you sure you want to delete this reminder?')) {
      deleteReminder(reminderId)
      trackButtonClick('Delete Reminder')
      loadData()
    }
  }

  const handleToggleComplete = (reminderId) => {
    toggleReminderComplete(reminderId)
    loadData()
  }

  const openAddModal = () => {
    setFormData({ title: '', description: '', date: '', category: 'event' })
    setEditingReminder(null)
    setShowAddModal(true)
  }

  const openEditModal = (reminder) => {
    setFormData({
      title: reminder.title,
      description: reminder.description,
      date: reminder.date,
      category: reminder.category
    })
    setEditingReminder(reminder)
    setShowAddModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingReminder(null)
    setFormData({ title: '', description: '', date: '', category: 'event' })
  }

  if (!data || !stats) {
    return <div className="p-6 text-gray-600 dark:text-gray-400">Loading reminders...</div>
  }

  // Filter reminders
  let filteredReminders = data.reminders

  if (filterStatus === 'active') {
    filteredReminders = filteredReminders.filter(r => !r.completed)
  } else if (filterStatus === 'completed') {
    filteredReminders = filteredReminders.filter(r => r.completed)
  }

  if (filterCategory !== 'all') {
    filteredReminders = filteredReminders.filter(r => r.category === filterCategory)
  }

  // Sort by date (upcoming first, then overdue at top)
  filteredReminders = filteredReminders.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    const aOverdue = isOverdue(a.date)
    const bOverdue = isOverdue(b.date)
    if (aOverdue !== bOverdue) return aOverdue ? -1 : 1
    return new Date(a.date) - new Date(b.date)
  })

  return (
    <div className={`px-4 py-6 sm:px-0 max-w-7xl mx-auto ${previewMode ? 'pointer-events-none opacity-60' : ''}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Reminders & Important Dates
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Track appointments, deadlines, and key milestones
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold mb-1">{stats.active}</div>
          <div className="text-sm text-blue-100">Active</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold mb-1">{stats.overdue}</div>
          <div className="text-sm text-red-100">Overdue</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold mb-1">{stats.today}</div>
          <div className="text-sm text-orange-100">Due Today</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold mb-1">{stats.completed}</div>
          <div className="text-sm text-green-100">Completed</div>
        </div>
      </div>

      {/* Filters and Add Button */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="active">Active Only</option>
              <option value="completed">Completed Only</option>
              <option value="all">All Reminders</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="all">All Categories</option>
              {Object.entries(REMINDER_CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-xl flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Reminder
          </button>
        </div>
      </div>

      {/* Reminders List */}
      {filteredReminders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-7xl mb-4">📭</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No reminders found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {filterStatus === 'active' && filterCategory === 'all'
              ? 'Add your first reminder to get started!'
              : 'Try adjusting your filters'}
          </p>
          {filterStatus === 'active' && filterCategory === 'all' && (
            <button
              onClick={openAddModal}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Add Your First Reminder
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReminders.map(reminder => {
            const category = REMINDER_CATEGORIES[reminder.category] || REMINDER_CATEGORIES.event
            const overdueStatus = !reminder.completed && isOverdue(reminder.date)
            const todayStatus = !reminder.completed && isToday(reminder.date)
            const daysUntil = getDaysUntil(reminder.date)

            return (
              <div
                key={reminder.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 p-6 transition-all ${
                  overdueStatus
                    ? 'border-red-300 dark:border-red-700'
                    : todayStatus
                    ? 'border-orange-300 dark:border-orange-700'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={reminder.completed}
                    onChange={() => handleToggleComplete(reminder.id)}
                    className="mt-1 h-6 w-6 rounded-md border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-2 ${
                          reminder.completed
                            ? 'line-through text-gray-400 dark:text-gray-500'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {reminder.title}
                        </h3>
                        {reminder.description && (
                          <p className="text-gray-600 dark:text-gray-400">
                            {reminder.description}
                          </p>
                        )}
                      </div>
                      <span className="text-4xl flex-shrink-0">{category.icon}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`text-base font-bold ${
                        overdueStatus
                          ? 'text-red-600 dark:text-red-400'
                          : todayStatus
                          ? 'text-orange-600 dark:text-orange-400'
                          : reminder.completed
                          ? 'text-gray-400 dark:text-gray-500'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        📅 {formatReminderDate(reminder.date)}
                      </span>

                      {overdueStatus && (
                        <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
                          OVERDUE {Math.abs(daysUntil)} {Math.abs(daysUntil) === 1 ? 'day' : 'days'}
                        </span>
                      )}

                      {todayStatus && (
                        <span className="px-3 py-1 bg-orange-600 text-white text-sm font-bold rounded-full">
                          DUE TODAY
                        </span>
                      )}

                      {!overdueStatus && !todayStatus && !reminder.completed && daysUntil >= 0 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({daysUntil === 1 ? 'Tomorrow' : `in ${daysUntil} days`})
                        </span>
                      )}

                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        category.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                        category.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                        category.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                        category.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                      }`}>
                        {category.label}
                      </span>
                    </div>

                    {reminder.completed && reminder.completedDate && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        ✓ Completed {new Date(reminder.completedDate).toLocaleDateString()}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(reminder)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="px-4 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 font-semibold rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-bounce-in">
            <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., C&P Exam Appointment"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(REMINDER_CATEGORIES).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => setFormData({ ...formData, category: key })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.category === key
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-1">{cat.icon}</div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {cat.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t-2 border-gray-200 dark:border-gray-700 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={editingReminder ? handleUpdateReminder : handleAddReminder}
                disabled={!formData.title || !formData.date}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingReminder ? 'Update Reminder' : 'Add Reminder'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
