/**
 * useGamification Hook
 *
 * Wraps gamificationService for React components.
 * Fails silently — never breaks core features.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  getProgress,
  awardXP as awardXPService,
  checkStreak,
  getRankForXP,
  getNextRank,
  getMissionProgress,
  type GamificationProgress,
  type AwardResult,
  type RankInfo,
} from '../services/gamificationService'

interface Celebration {
  id: string
  type: 'xp' | 'level_up' | 'mission' | 'milestone'
  title: string
  description: string
  xpGained: number
  badge?: string
  newRank?: RankInfo
}

interface UseGamificationReturn {
  progress: GamificationProgress | null
  loading: boolean
  rank: RankInfo | null
  nextRank: { next: RankInfo; xpNeeded: number } | null
  missions: ReturnType<typeof getMissionProgress>
  celebration: Celebration | null
  dismissCelebration: () => void
  awardXP: (action: string) => Promise<void>
}

export function useGamification(): UseGamificationReturn {
  const [progress, setProgress] = useState<GamificationProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [celebrationQueue, setCelebrationQueue] = useState<Celebration[]>([])
  const [activeCelebration, setActiveCelebration] = useState<Celebration | null>(null)
  const initialized = useRef(false)

  // Load progress on mount
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    async function init() {
      try {
        const p = await getProgress()
        setProgress(p)

        // Check daily streak
        const { updatedProgress, result } = await checkStreak(p)
        setProgress(updatedProgress)

        if (result && result.xpGained > 0) {
          queueCelebration({
            id: `login-${Date.now()}`,
            type: 'xp',
            title: 'Daily Login',
            description: `+${result.xpGained} XP`,
            xpGained: result.xpGained,
          })
        }
      } catch (e) {
        // Fail silently — gamification should never break the app
        console.warn('Gamification init failed:', e)
      }
      setLoading(false)
    }

    init()
  }, [])

  // Show celebrations one at a time
  useEffect(() => {
    if (!activeCelebration && celebrationQueue.length > 0) {
      const [next, ...rest] = celebrationQueue
      setActiveCelebration(next)
      setCelebrationQueue(rest)
    }
  }, [activeCelebration, celebrationQueue])

  function queueCelebration(c: Celebration) {
    setCelebrationQueue((prev) => [...prev, c])
  }

  const dismissCelebration = useCallback(() => {
    setActiveCelebration(null)
  }, [])

  const awardXP = useCallback(async (action: string) => {
    if (!progress) return
    try {
      const { updatedProgress, result } = await awardXPService(action, progress)
      setProgress(updatedProgress)

      // Queue celebrations for significant events
      if (result.leveledUp && result.newRank) {
        queueCelebration({
          id: `levelup-${Date.now()}`,
          type: 'level_up',
          title: 'Promoted!',
          description: `You've been promoted to ${result.newRank.rank} — ${result.newRank.title}`,
          xpGained: result.xpGained,
          newRank: result.newRank,
          badge: '🎖️',
        })
      } else if (result.newMissions.length > 0) {
        for (const missionId of result.newMissions) {
          const { MISSIONS } = await import('../data/missionsData')
          const mission = MISSIONS.find((m) => m.id === missionId)
          if (mission) {
            queueCelebration({
              id: `mission-${missionId}`,
              type: 'mission',
              title: 'Mission Complete!',
              description: mission.title,
              xpGained: mission.xpReward,
              badge: mission.badge,
            })
          }
        }
      } else if (result.newMilestones.length > 0) {
        for (const msId of result.newMilestones) {
          const { MILESTONES } = await import('../data/milestonesData')
          const ms = MILESTONES.find((m) => m.id === msId)
          if (ms) {
            queueCelebration({
              id: `milestone-${msId}`,
              type: 'milestone',
              title: 'Achievement Unlocked!',
              description: ms.title,
              xpGained: ms.xpReward,
              badge: ms.badge,
            })
          }
        }
      } else if (result.xpGained > 0) {
        // Small XP gains don't need celebration modal — handled by XPBar animation
      }
    } catch (e) {
      console.warn('awardXP failed:', e)
    }
  }, [progress])

  const rank = progress ? getRankForXP(progress.xp) : null
  const nextRankInfo = progress ? getNextRank(progress.xp) : null
  const missions = progress ? getMissionProgress(progress.stats) : []

  return {
    progress,
    loading,
    rank,
    nextRank: nextRankInfo,
    missions,
    celebration: activeCelebration,
    dismissCelebration,
    awardXP,
  }
}
