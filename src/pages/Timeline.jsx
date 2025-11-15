import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getUserSetup } from '../services/userService'
import {
  generatePersonalizedTimeline,
  getTasksDueWithin,
  getOverdueTasks,
  getTasksByCategory,
  getCompletionPercentage,
  getPriorityColor,
  isDueWithinDays
} from '../data/timelineTemplates'
import { getTimelineItems, createTimelineItem, updateTimelineItem, deleteTimelineItem } from '../services/timelineService'

export default function Timeline({ previewMode = false }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [timeline, setTimeline] = useState([])
  const [completedTasks, setCompletedTasks] = useState(new Set())
  const [userSituation, setUserSituation] = useState(null)
  const [separationDate, setSeparationDate] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [view, setView] = useState('upcoming') // upcoming, all, completed

  // Load user setup and timeline
  useEffect(() => {
    loadTimeline()
  }, [user])

  const loadTimeline = async () => {
    if (!user && !previewMode) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)

      // Get user setup
      const setup = await getUserSetup()
      if (!setup || !setup.situation || !setup.separationDate) {
        // No setup yet
        setLoading(false)
        return
      }

      setUserSituation(setup.situation)
      setSeparationDate(setup.separationDate)

      // Generate personalized timeline
      const personalizedTimeline = generatePersonalizedTimeline(
        setup.separationDate,
        setup.situation
      )

      // Get completed tasks from database
      if (!previewMode) {
        const dbTasks = await getTimelineItems()
        const completedIds = new Set(
          dbTasks.filter(t => t.completed).map(t => t.task_id)
        )
        setCompletedTasks(completedIds)

        // Merge with personalized timeline
        const mergedTimeline = personalizedTimeline.map(task => ({
          ...task,
          completed: completedIds.has(task.id),
          completedAt: dbTasks.find(t => t.task_id === task.id)?.completed_at || null
        }))

        setTimeline(mergedTimeline)
      } else {
        setTimeline(personalizedTimeline)
      }

      setLoading(false)
    } catch (error) {
      console.error('Error loading timeline:', error)
      setLoading(false)
    }
  }

  // Handle task completion toggle
  const handleToggleComplete = async (taskId) => {
    const task = timeline.find(t => t.id === taskId)
    if (!task) return

    const newCompleted = !task.completed

    try {
      if (!previewMode) {
        if (newCompleted) {
          // Mark as complete
          await createTimelineItem({
            task_id: taskId,
            task_title: task.title,
            due_date: task.dueDate,
            category: task.category,
            completed: true,
            completed_at: new Date().toISOString()
          })
        } else {
          // Mark as incomplete
          const dbTasks = await getTimelineItems()
          const dbTask = dbTasks.find(t => t.task_id === taskId)
          if (dbTask) {
            await updateTimelineItem(dbTask.id, {
              completed: false,
              completed_at: null
            })
          }
        }
      }

      // Update local state
      setTimeline(prev => prev.map(t =>
        t.id === taskId
          ? { ...t, completed: newCompleted, completedAt: newCompleted ? new Date().toISOString() : null }
          : t
      ))

      if (newCompleted) {
        setCompletedTasks(prev => new Set([...prev, taskId]))
      } else {
        setCompletedTasks(prev => {
          const newSet = new Set(prev)
          newSet.delete(taskId)
          return newSet
        })
      }
    } catch (error) {
      console.error('Error toggling task completion:', error)
    }
  }

  // Get filtered timeline based on view and category
  const getFilteredTimeline = () => {
    let filtered = [...timeline]

    // Filter by view
    if (view === 'upcoming') {
      filtered = filtered.filter(t => !t.completed)
    } else if (view === 'completed') {
      filtered = filtered.filter(t => t.completed)
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory)
    }

    return filtered
  }

  // Get focus this week tasks
  const getFocusThisWeek = () => {
    return timeline
      .filter(task => !task.completed && task.dueDate && isDueWithinDays(task.dueDate, 7))
      .sort((a, b) => a.dueDate - b.dueDate)
      .slice(0, 3)
  }

  // Get all categories
  const getCategories = () => {
    const categories = new Set(timeline.map(t => t.category))
    return Array.from(categories).sort()
  }

  // Get priority badge classes
  const getPriorityBadge = (priority) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full'
    const colorMap = {
      critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      required: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      high: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      milestone: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    }
    return `${baseClasses} ${colorMap[priority] || colorMap.low}`
  }

  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'TBD'
    const d = new Date(date)
    const today = new Date()
    const diffTime = d - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return `Overdue ${Math.abs(diffDays)} days`
    } else if (diffDays === 0) {
      return 'Due today'
    } else if (diffDays === 1) {
      return 'Due tomorrow'
    } else if (diffDays <= 7) {
      return `Due in ${diffDays} days`
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  // Check if task is overdue
  const isOverdue = (date) => {
    if (!date) return false
    return new Date(date) < new Date() && new Date(date).toDateString() !== new Date().toDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your personalized timeline...</p>
        </div>
      </div>
    )
  }

  if (!userSituation || !separationDate) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Your Profile Setup
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              To see your personalized transition timeline, please complete your profile setup with your situation and separation date.
            </p>
            <a
              href="/app/setup"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Complete Setup
            </a>
          </div>
        </div>
      </div>
    )
  }

  const focusThisWeek = getFocusThisWeek()
  const filteredTimeline = getFilteredTimeline()
  const completionPercentage = getCompletionPercentage(timeline)
  const categories = getCategories()
  const overdueTasks = getOverdueTasks(timeline)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Transition Timeline
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your personalized {userSituation} timeline • {new Date(separationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall Progress</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{completionPercentage}%</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tasks Remaining</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {timeline.filter(t => !t.completed).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              of {timeline.length} total
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overdue Tasks</div>
            <div className={`text-3xl font-bold ${overdueTasks.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {overdueTasks.length}
            </div>
            {overdueTasks.length > 0 && (
              <div className="text-sm text-red-600 mt-2">Needs attention</div>
            )}
          </div>
        </div>

        {/* Focus This Week */}
        {focusThisWeek.length > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">🎯 Focus This Week</h2>
            <div className="space-y-3">
              {focusThisWeek.map(task => (
                <div
                  key={task.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                      className="mt-1 h-5 w-5 rounded border-white/30 bg-white/10 text-blue-600 focus:ring-2 focus:ring-white/50"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{task.title}</h3>
                      <p className="text-blue-100 text-sm mt-1">{task.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-blue-200 text-sm">{formatDate(task.dueDate)}</span>
                        <span className={getPriorityBadge(task.priority)}>{task.priority}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* View Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                View
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setView('upcoming')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === 'upcoming'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setView('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setView('completed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === 'completed'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Timeline Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          {filteredTimeline.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {view === 'completed' ? 'No completed tasks yet. Keep working on your timeline!' : 'All tasks completed! 🎉'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTimeline.map(task => (
                <div
                  key={task.id}
                  className={`p-6 transition-all hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    task.completed ? 'opacity-60' : ''
                  } ${isOverdue(task.dueDate) && !task.completed ? 'bg-red-50 dark:bg-red-900/10' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                          {task.title}
                        </h3>
                        <span className={getPriorityBadge(task.priority)}>{task.priority}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className={`font-medium ${isOverdue(task.dueDate) && !task.completed ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}>
                          {formatDate(task.dueDate)}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                          {task.category}
                        </span>
                        {task.completed && task.completedAt && (
                          <span className="text-green-600 dark:text-green-400">
                            ✓ Completed {new Date(task.completedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
