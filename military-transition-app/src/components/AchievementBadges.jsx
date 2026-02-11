import { useState } from 'react'
import { MILESTONES } from '../data/milestonesData'

/**
 * Grid of earned and locked achievement badges.
 * Props: completedMilestones (array of milestone IDs)
 */
export default function AchievementBadges({ completedMilestones = [] }) {
  const [selectedMilestone, setSelectedMilestone] = useState(null)

  const earned = MILESTONES.filter((m) => completedMilestones.includes(m.id))
  const locked = MILESTONES.filter((m) => !completedMilestones.includes(m.id))

  return (
    <div>
      {/* Earned */}
      {earned.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Earned ({earned.length})
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
            {earned.map((ms) => (
              <button
                key={ms.id}
                onClick={() => setSelectedMilestone(selectedMilestone?.id === ms.id ? null : ms)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 transition border-2 ${
                  selectedMilestone?.id === ms.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-transparent bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-2xl">{ms.badge}</span>
                <span className="text-[9px] text-gray-600 dark:text-gray-400 text-center leading-tight mt-0.5 line-clamp-2">
                  {ms.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Locked ({locked.length})
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
          {locked.map((ms) => (
            <button
              key={ms.id}
              onClick={() => setSelectedMilestone(selectedMilestone?.id === ms.id ? null : ms)}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 transition border-2 opacity-50 ${
                selectedMilestone?.id === ms.id
                  ? 'border-gray-400 bg-gray-100 dark:bg-gray-700'
                  : 'border-transparent bg-gray-100 dark:bg-gray-800 hover:opacity-70'
              }`}
            >
              <span className="text-2xl grayscale">🔒</span>
              <span className="text-[9px] text-gray-500 dark:text-gray-500 text-center leading-tight mt-0.5 line-clamp-2">
                ???
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {selectedMilestone && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {completedMilestones.includes(selectedMilestone.id) ? selectedMilestone.badge : '🔒'}
            </span>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{selectedMilestone.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{selectedMilestone.description}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {completedMilestones.includes(selectedMilestone.id)
                  ? `Earned! +${selectedMilestone.xpReward} XP`
                  : `How to earn: ${selectedMilestone.condition} • +${selectedMilestone.xpReward} XP`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
