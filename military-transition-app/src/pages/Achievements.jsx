import { useState } from 'react'
import { useGamification } from '../hooks/useGamification'
import { RANK_LEVELS } from '../services/gamificationService'
import XPBar from '../components/XPBar'
import CelebrationModal from '../components/CelebrationModal'
import MissionBoard from '../components/MissionBoard'
import AchievementBadges from '../components/AchievementBadges'

export default function Achievements() {
  const {
    progress,
    loading,
    rank,
    nextRank,
    missions,
    celebration,
    dismissCelebration,
  } = useGamification()

  const [activeTab, setActiveTab] = useState('missions')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!progress) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Sign in to track your achievements and earn XP
        </p>
      </div>
    )
  }

  const completedMissionCount = progress.completed_missions.length
  const completedMilestoneCount = progress.completed_milestones.length
  const totalMissions = missions.length
  const xpProgress = rank && nextRank
    ? Math.round(((progress.xp - rank.xpRequired) / (nextRank.next.xpRequired - rank.xpRequired)) * 100)
    : 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <CelebrationModal celebration={celebration} onDismiss={dismissCelebration} />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track your progress, complete missions, and earn your way through the ranks
        </p>
      </div>

      {/* Rank Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Rank icon */}
          <div className="flex-shrink-0 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">{rank?.rank || 'E-1'}</span>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">
              Level {rank?.level || 1}
            </p>
          </div>

          {/* Rank info + progress */}
          <div className="flex-1 w-full">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center sm:text-left">
              {rank?.title || 'Private / Seaman Recruit'}
            </h2>

            {/* XP Progress */}
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">
                  {progress.xp.toLocaleString()} XP
                </span>
                {nextRank && (
                  <span className="text-gray-600 dark:text-gray-400">
                    {nextRank.next.xpRequired.toLocaleString()} XP for {nextRank.next.rank}
                  </span>
                )}
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, xpProgress)}%` }}
                />
              </div>
              {nextRank && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {nextRank.xpNeeded.toLocaleString()} XP to next promotion
                </p>
              )}
              {!nextRank && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                  Maximum rank achieved!
                </p>
              )}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {progress.xp.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total XP</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {progress.streak_days}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Day Streak</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {completedMissionCount}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Missions</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {completedMilestoneCount}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Badges</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rank Progression */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Rank Progression</h2>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {RANK_LEVELS.map((r) => {
            const isCurrentOrPast = progress.xp >= r.xpRequired
            const isCurrent = rank?.level === r.level
            return (
              <div
                key={r.level}
                className={`flex-shrink-0 px-2 py-1.5 rounded text-center transition ${
                  isCurrent
                    ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                    : isCurrentOrPast
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}
                title={`${r.rank} — ${r.title} (${r.xpRequired.toLocaleString()} XP)`}
              >
                <p className="text-xs font-bold">{r.rank}</p>
                <p className="text-[9px]">Lv.{r.level}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'missions', label: 'Missions', count: `${completedMissionCount}/${totalMissions}` },
          { id: 'badges', label: 'Badges', count: completedMilestoneCount },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === 'missions' && (
          <MissionBoard
            stats={progress.stats}
            completedMissions={progress.completed_missions}
          />
        )}
        {activeTab === 'badges' && (
          <AchievementBadges
            completedMilestones={progress.completed_milestones}
          />
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 pb-4">
        XP and ranks are for motivation and progress tracking only. Keep going — every action counts!
      </p>
    </div>
  )
}
