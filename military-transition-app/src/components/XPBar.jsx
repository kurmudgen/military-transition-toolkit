import { useMemo } from 'react'

/**
 * Compact XP progress bar showing rank, level, and progress to next rank.
 * Props: xp, rank, nextRank
 */
export default function XPBar({ xp = 0, rank = null, nextRank = null }) {
  const progressPct = useMemo(() => {
    if (!rank || !nextRank) return 100
    const currentLevelXP = xp - rank.xpRequired
    const levelRange = nextRank.next.xpRequired - rank.xpRequired
    if (levelRange <= 0) return 100
    return Math.min(100, Math.round((currentLevelXP / levelRange) * 100))
  }, [xp, rank, nextRank])

  if (!rank) return null

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Rank badge */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
          {rank.rank}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Lv.{rank.level}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex-1 min-w-0">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-0.5">
          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            {xp.toLocaleString()} XP
          </span>
          {nextRank && (
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              {nextRank.next.xpRequired.toLocaleString()} XP
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
