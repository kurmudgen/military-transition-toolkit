/**
 * Gamification Service
 *
 * Standalone XP / rank / mission / milestone engine.
 * Other features emit lightweight events; this service processes them.
 * Table: gamification (user_id, xp, level, rank_title, streak_days, ...)
 */

import { supabase, getCurrentUser } from '../lib/supabase'
import { MISSIONS } from '../data/missionsData'
import { MILESTONES } from '../data/milestonesData'

// ─── XP Values ───────────────────────────────────────────────────────

export const XP_VALUES: Record<string, number> = {
  // Daily engagement
  daily_login: 10,
  streak_bonus_7: 50,
  streak_bonus_30: 200,
  streak_bonus_90: 500,

  // Career tools
  career_assessment_completed: 100,
  career_bookmarked: 10,
  skill_added: 15,
  certification_earned: 150,
  certification_started: 25,
  learning_goal_completed: 100,

  // Financial tools
  budget_created: 100,
  budget_month_completed: 50,
  debt_added: 25,
  debt_paid_off: 200,
  savings_goal_created: 50,
  savings_contribution: 15,
  savings_goal_reached: 250,
  emergency_fund_tier_reached: 150,

  // Checklists
  checklist_item_completed: 10,
  checklist_section_completed: 75,
  checklist_fully_completed: 300,
  pcs_checklist_item: 10,
  pcs_section_completed: 75,

  // Education
  lesson_read: 30,
  education_category_completed: 150,

  // Profile & setup
  profile_completed: 100,
  first_tool_used: 50,
}

// ─── Rank System ─────────────────────────────────────────────────────

export interface RankInfo {
  level: number
  xpRequired: number
  rank: string
  title: string
}

export const RANK_LEVELS: RankInfo[] = [
  { level: 1, xpRequired: 0, rank: 'E-1', title: 'Private / Seaman Recruit' },
  { level: 2, xpRequired: 200, rank: 'E-2', title: 'Private / Seaman Apprentice' },
  { level: 3, xpRequired: 500, rank: 'E-3', title: 'PFC / Seaman' },
  { level: 4, xpRequired: 1000, rank: 'E-4', title: 'Specialist / Petty Officer 3rd' },
  { level: 5, xpRequired: 2000, rank: 'E-5', title: 'Sergeant / Petty Officer 2nd' },
  { level: 6, xpRequired: 3500, rank: 'E-6', title: 'Staff Sergeant / Petty Officer 1st' },
  { level: 7, xpRequired: 5500, rank: 'E-7', title: 'SFC / Chief Petty Officer' },
  { level: 8, xpRequired: 8000, rank: 'E-8', title: 'MSG / Senior Chief' },
  { level: 9, xpRequired: 12000, rank: 'E-9', title: 'SGM / Master Chief' },
  { level: 10, xpRequired: 18000, rank: 'O-1', title: 'Second Lieutenant / Ensign' },
  { level: 11, xpRequired: 25000, rank: 'O-3', title: 'Captain / Lieutenant' },
  { level: 12, xpRequired: 35000, rank: 'O-5', title: 'LTC / Commander' },
  { level: 13, xpRequired: 50000, rank: 'O-7', title: 'Brigadier General / RDML' },
  { level: 14, xpRequired: 75000, rank: 'O-9', title: 'Lieutenant General / VADM' },
  { level: 15, xpRequired: 100000, rank: 'O-10', title: 'General / Admiral' },
]

export function getRankForXP(xp: number): RankInfo {
  let rank = RANK_LEVELS[0]
  for (const r of RANK_LEVELS) {
    if (xp >= r.xpRequired) rank = r
    else break
  }
  return rank
}

export function getNextRank(xp: number): { next: RankInfo; xpNeeded: number } | null {
  const current = getRankForXP(xp)
  const idx = RANK_LEVELS.findIndex((r) => r.level === current.level)
  if (idx >= RANK_LEVELS.length - 1) return null
  const next = RANK_LEVELS[idx + 1]
  return { next, xpNeeded: next.xpRequired - xp }
}

// ─── Progress Data ───────────────────────────────────────────────────

export interface GamificationProgress {
  xp: number
  level: number
  rank_title: string
  streak_days: number
  last_active_date: string | null
  completed_missions: string[]
  completed_milestones: string[]
  badges: string[]
  stats: Record<string, number>
}

function createDefault(): GamificationProgress {
  return {
    xp: 0,
    level: 1,
    rank_title: 'E-1',
    streak_days: 0,
    last_active_date: null,
    completed_missions: [],
    completed_milestones: [],
    badges: [],
    stats: {},
  }
}

// ─── CRUD ────────────────────────────────────────────────────────────

export async function getProgress(): Promise<GamificationProgress> {
  const user = await getCurrentUser()
  if (!user || !supabase) return createDefault()

  const { data, error } = await supabase
    .from('gamification')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No row yet — create one
      const defaults = createDefault()
      const { error: insertError } = await supabase
        .from('gamification')
        .insert({ user_id: user.id })
        .select()
        .single()
      if (insertError) console.error('Error creating gamification row:', insertError)
      return defaults
    }
    console.error('Error fetching gamification:', error)
    return createDefault()
  }

  return {
    xp: data.xp || 0,
    level: data.level || 1,
    rank_title: data.rank_title || 'E-1',
    streak_days: data.streak_days || 0,
    last_active_date: data.last_active_date,
    completed_missions: data.completed_missions || [],
    completed_milestones: data.completed_milestones || [],
    badges: data.badges || [],
    stats: data.stats || {},
  }
}

async function saveProgress(progress: GamificationProgress): Promise<void> {
  const user = await getCurrentUser()
  if (!user || !supabase) return

  const rank = getRankForXP(progress.xp)

  await supabase
    .from('gamification')
    .upsert(
      {
        user_id: user.id,
        xp: progress.xp,
        level: rank.level,
        rank_title: rank.rank,
        streak_days: progress.streak_days,
        last_active_date: progress.last_active_date,
        completed_missions: progress.completed_missions,
        completed_milestones: progress.completed_milestones,
        badges: progress.badges,
        stats: progress.stats,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single()
}

// ─── Core Actions ────────────────────────────────────────────────────

export interface AwardResult {
  xpGained: number
  newTotalXP: number
  leveledUp: boolean
  newRank: RankInfo | null
  previousRank: RankInfo
  newMissions: string[]      // mission IDs just completed
  newMilestones: string[]    // milestone IDs just earned
}

export async function awardXP(
  action: string,
  progress: GamificationProgress
): Promise<{ updatedProgress: GamificationProgress; result: AwardResult }> {
  const xpGain = XP_VALUES[action] || 0
  const previousRank = getRankForXP(progress.xp)

  // Update stats
  const stats = { ...progress.stats }
  stats[action] = (stats[action] || 0) + 1
  stats.total_actions = (stats.total_actions || 0) + 1

  // Track first tool usage
  const toolActions = ['budget_created', 'debt_added', 'savings_goal_created', 'career_assessment_completed']
  if (toolActions.includes(action) && !stats.first_tool_used) {
    stats.first_tool_used = 1
  }

  // Apply XP
  const newXP = progress.xp + xpGain
  const newRankInfo = getRankForXP(newXP)
  const leveledUp = newRankInfo.level > previousRank.level

  // Track level for milestones
  if (leveledUp) {
    stats.level_reached = newRankInfo.level
  }

  // Check missions
  const newMissions: string[] = []
  const completedMissions = [...progress.completed_missions]
  for (const mission of MISSIONS) {
    if (completedMissions.includes(mission.id)) continue
    const allMet = mission.requirements.every(
      (req) => (stats[req.action] || 0) >= req.count
    )
    if (allMet) {
      completedMissions.push(mission.id)
      newMissions.push(mission.id)
    }
  }

  // Check milestones
  const newMilestoneIds: string[] = []
  const completedMilestones = [...progress.completed_milestones]
  const badges = [...progress.badges]
  for (const ms of MILESTONES) {
    if (completedMilestones.includes(ms.id)) continue
    if ((stats[ms.statKey] || 0) >= ms.threshold) {
      completedMilestones.push(ms.id)
      newMilestoneIds.push(ms.id)
      if (!badges.includes(ms.badge)) badges.push(ms.badge)
    }
  }

  // Add mission/milestone XP
  let bonusXP = 0
  for (const mId of newMissions) {
    const m = MISSIONS.find((x) => x.id === mId)
    if (m) bonusXP += m.xpReward
  }
  for (const msId of newMilestoneIds) {
    const ms = MILESTONES.find((x) => x.id === msId)
    if (ms) bonusXP += ms.xpReward
  }

  const finalXP = newXP + bonusXP
  const finalRank = getRankForXP(finalXP)
  const finalLeveledUp = finalRank.level > previousRank.level

  const updatedProgress: GamificationProgress = {
    ...progress,
    xp: finalXP,
    level: finalRank.level,
    rank_title: finalRank.rank,
    completed_missions: completedMissions,
    completed_milestones: completedMilestones,
    badges,
    stats,
  }

  // Persist
  await saveProgress(updatedProgress)

  return {
    updatedProgress,
    result: {
      xpGained: xpGain + bonusXP,
      newTotalXP: finalXP,
      leveledUp: finalLeveledUp,
      newRank: finalLeveledUp ? finalRank : null,
      previousRank,
      newMissions,
      newMilestones: newMilestoneIds,
    },
  }
}

// ─── Streak ──────────────────────────────────────────────────────────

export async function checkStreak(
  progress: GamificationProgress
): Promise<{ updatedProgress: GamificationProgress; result: AwardResult | null }> {
  const today = new Date().toISOString().split('T')[0]
  const lastActive = progress.last_active_date

  // Already checked in today
  if (lastActive === today) {
    return { updatedProgress: progress, result: null }
  }

  let newStreak = 1
  if (lastActive) {
    const lastDate = new Date(lastActive)
    const todayDate = new Date(today)
    const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (86400000))
    if (diffDays === 1) {
      newStreak = progress.streak_days + 1
    }
    // diffDays > 1 means streak broken, reset to 1
  }

  let updated: GamificationProgress = {
    ...progress,
    streak_days: newStreak,
    last_active_date: today,
  }

  // Award daily login XP
  const { updatedProgress, result } = await awardXP('daily_login', updated)
  updated = updatedProgress

  // Check streak milestones
  if (newStreak === 7) {
    const r = await awardXP('streak_bonus_7', updated)
    updated = r.updatedProgress
  } else if (newStreak === 30) {
    const r = await awardXP('streak_bonus_30', updated)
    updated = r.updatedProgress
  } else if (newStreak === 90) {
    const r = await awardXP('streak_bonus_90', updated)
    updated = r.updatedProgress
  }

  return { updatedProgress: updated, result }
}

// ─── Mission Helpers ─────────────────────────────────────────────────

export function getMissionProgress(
  stats: Record<string, number>
): Array<{ mission: typeof MISSIONS[number]; progress: number; total: number; complete: boolean }> {
  return MISSIONS.map((mission) => {
    let completed = 0
    const total = mission.requirements.length
    for (const req of mission.requirements) {
      if ((stats[req.action] || 0) >= req.count) completed++
    }
    return { mission, progress: completed, total, complete: completed === total }
  })
}
