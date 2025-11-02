import { useState, useEffect } from 'react'
import { getAnalyticsSummary, exportAnalytics, clearAnalytics } from '../utils/analytics'

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    loadAnalytics()
  }, [refreshKey])

  const loadAnalytics = () => {
    const summary = getAnalyticsSummary()
    setAnalytics(summary)
  }

  const handleClear = () => {
    if (clearAnalytics()) {
      setRefreshKey(prev => prev + 1)
    }
  }

  if (!analytics) {
    return <div className="text-gray-600 dark:text-gray-400">Loading analytics...</div>
  }

  const { totalEvents, eventCounts, pageViews, toolUsage, checklistActivity, activityByDay, mostRecentEvents, startDate } = analytics

  // Get sorted page views
  const sortedPageViews = Object.entries(pageViews).sort(([,a], [,b]) => b - a)
  const sortedToolUsage = Object.entries(toolUsage).sort(([,a], [,b]) => b - a)

  // Get activity chart data
  const activityDays = Object.keys(activityByDay).sort().reverse()
  const maxActivity = Math.max(...Object.values(activityByDay))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Tracking since {new Date(startDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportAnalytics}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Export Data
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
          <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">Total Events</div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-200">{totalEvents}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
          <div className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">Page Views</div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-200">{eventCounts.page_view || 0}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700">
          <div className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-1">Button Clicks</div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-200">{eventCounts.button_click || 0}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-700">
          <div className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-1">Tools Used</div>
          <div className="text-3xl font-bold text-orange-900 dark:text-orange-200">{eventCounts.tool_usage || 0}</div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activity Last 7 Days</h3>
        <div className="space-y-3">
          {activityDays.map(day => {
            const count = activityByDay[day]
            const percentage = maxActivity > 0 ? (count / maxActivity) * 100 : 0
            const date = new Date(day)
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

            return (
              <div key={day} className="flex items-center gap-3">
                <div className="w-24 text-sm text-gray-700 dark:text-gray-300 font-medium">{dayName}</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700/50 rounded-full h-8 relative overflow-hidden border border-gray-300 dark:border-gray-600">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                    style={{ width: `${Math.max(percentage, count > 0 ? 5 : 0)}%` }}
                  >
                    {count > 0 && <span className="text-white dark:text-gray-900 font-bold text-sm drop-shadow-sm">{count}</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Most Visited Pages</h3>
          {sortedPageViews.length > 0 ? (
            <div className="space-y-3">
              {sortedPageViews.slice(0, 5).map(([page, count]) => (
                <div key={page} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{page}</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/30 text-blue-900 dark:text-blue-200 font-semibold rounded-lg border border-blue-200 dark:border-blue-400">
                    {count} views
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No page views yet</p>
          )}
        </div>

        {/* Tool Usage */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Most Used Tools</h3>
          {sortedToolUsage.length > 0 ? (
            <div className="space-y-3">
              {sortedToolUsage.slice(0, 5).map(([tool, count]) => (
                <div key={tool} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{tool}</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-500/30 text-green-900 dark:text-green-200 font-semibold rounded-lg border border-green-200 dark:border-green-400">
                    {count} uses
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No tools used yet</p>
          )}
        </div>
      </div>

      {/* Checklist Activity */}
      {Object.keys(checklistActivity).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Checklist Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(checklistActivity).map(([checklist, stats]) => (
              <div key={checklist} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{checklist}</div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-green-600 dark:text-green-400 font-bold">{stats.completed}</span>
                    <span className="text-gray-600 dark:text-gray-300"> completed</span>
                  </div>
                  <div>
                    <span className="text-gray-700 dark:text-gray-300 font-bold">{stats.uncompleted}</span>
                    <span className="text-gray-600 dark:text-gray-300"> unchecked</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {mostRecentEvents.map(event => (
            <div key={event.id} className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm border border-gray-200 dark:border-gray-600">
              <div className="flex-1">
                <span className="font-medium text-gray-900 dark:text-gray-100">{event.type.replace('_', ' ')}</span>
                {event.page && <span className="text-gray-600 dark:text-gray-300"> - {event.page}</span>}
                {event.tool && <span className="text-gray-600 dark:text-gray-300"> - {event.tool}</span>}
                {event.button && <span className="text-gray-600 dark:text-gray-300"> - {event.button}</span>}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap ml-3">
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-1">Privacy-First Analytics</h4>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              All analytics data is stored locally on your device only. Nothing is sent to external servers.
              You can export or clear your data at any time using the buttons above.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
