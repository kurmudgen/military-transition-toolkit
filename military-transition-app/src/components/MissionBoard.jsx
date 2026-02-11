import { useState, useMemo } from 'react'
import { MISSIONS } from '../data/missionsData'

const CATEGORY_LABELS = {
  career: 'Career',
  financial: 'Financial',
  education: 'Education',
  checklist: 'Checklist',
  engagement: 'Engagement',
}

/**
 * Mission list with progress tracking and category filters.
 * Props: stats (user's stat counts), completedMissions (array of IDs)
 */
export default function MissionBoard({ stats = {}, completedMissions = [] }) {
  const [filter, setFilter] = useState('all')

  const missionProgress = useMemo(() => {
    return MISSIONS.map((mission) => {
      const isComplete = completedMissions.includes(mission.id)
      const reqProgress = mission.requirements.map((req) => ({
        ...req,
        current: Math.min(stats[req.action] || 0, req.count),
        met: (stats[req.action] || 0) >= req.count,
      }))
      const completedReqs = reqProgress.filter((r) => r.met).length
      return { mission, reqProgress, completedReqs, isComplete }
    })
  }, [stats, completedMissions])

  const filtered = useMemo(() => {
    let list = missionProgress
    if (filter !== 'all') list = list.filter((m) => m.mission.category === filter)
    // Sort: in-progress first, then available, then completed
    return list.sort((a, b) => {
      if (a.isComplete !== b.isComplete) return a.isComplete ? 1 : -1
      if (a.completedReqs !== b.completedReqs) return b.completedReqs - a.completedReqs
      return 0
    })
  }, [missionProgress, filter])

  const categories = ['all', ...Object.keys(CATEGORY_LABELS)]

  return (
    <div>
      {/* Category filters */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition ${
              filter === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Mission cards */}
      <div className="space-y-3">
        {filtered.map(({ mission, reqProgress, completedReqs, isComplete }) => (
          <div
            key={mission.id}
            className={`p-4 rounded-lg border transition ${
              isComplete
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 opacity-80'
                : completedReqs > 0
                  ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{mission.badge}</span>
                <div>
                  <h3 className={`font-medium text-sm ${
                    isComplete ? 'text-green-700 dark:text-green-400 line-through' : 'text-gray-900 dark:text-white'
                  }`}>
                    {mission.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{mission.description}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                isComplete
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              }`}>
                {isComplete ? 'Done' : `+${mission.xpReward} XP`}
              </span>
            </div>

            {/* Requirements */}
            <div className="space-y-1 ml-8">
              {reqProgress.map((req, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                    req.met
                      ? 'bg-green-500 text-white'
                      : 'border border-gray-300 dark:border-gray-600'
                  }`}>
                    {req.met && (
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={req.met ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-600 dark:text-gray-400'}>
                    {req.description}
                  </span>
                  {!req.met && req.count > 1 && (
                    <span className="text-gray-400 dark:text-gray-500">
                      ({req.current}/{req.count})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 dark:text-gray-500 py-6 text-sm">
          No missions in this category
        </p>
      )}
    </div>
  )
}
