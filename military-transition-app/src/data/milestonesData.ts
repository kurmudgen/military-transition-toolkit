/**
 * Milestones Data
 *
 * One-time achievements unlocked by specific conditions.
 * Each milestone can only be earned once.
 */

export interface Milestone {
  id: string
  title: string
  description: string
  condition: string  // stat key to check (e.g., 'budget_created >= 1')
  statKey: string    // key in stats JSONB
  threshold: number  // value that must be met or exceeded
  xpReward: number
  badge: string
}

export const MILESTONES: Milestone[] = [
  // ─── First Actions ─────────────────────────────────────────────────
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Completed your first action in MTT',
    condition: 'Any action completed',
    statKey: 'total_actions',
    threshold: 1,
    xpReward: 50,
    badge: '👣',
  },
  {
    id: 'first-tool',
    title: 'Tool Time',
    description: 'Used your first financial or career tool',
    condition: 'First tool used',
    statKey: 'first_tool_used',
    threshold: 1,
    xpReward: 50,
    badge: '🔨',
  },

  // ─── Financial ─────────────────────────────────────────────────────
  {
    id: 'budget-boss',
    title: 'Budget Boss',
    description: 'Created your first budget',
    condition: 'Budget created',
    statKey: 'budget_created',
    threshold: 1,
    xpReward: 100,
    badge: '💵',
  },
  {
    id: 'debt-tracker',
    title: 'Debt Tracker',
    description: 'Started tracking your debts',
    condition: 'First debt added',
    statKey: 'debt_added',
    threshold: 1,
    xpReward: 75,
    badge: '📊',
  },
  {
    id: 'debt-free',
    title: 'Debt Free',
    description: 'Paid off all tracked debts',
    condition: 'All debts paid off',
    statKey: 'debt_paid_off',
    threshold: 1,
    xpReward: 500,
    badge: '🏆',
  },
  {
    id: 'emergency-funded',
    title: 'Emergency Funded',
    description: 'Emergency fund reached 6 months of expenses',
    condition: 'Emergency fund at 6 months',
    statKey: 'emergency_fund_tier_reached',
    threshold: 3,  // tier 1=1mo, 2=3mo, 3=6mo
    xpReward: 300,
    badge: '🛡️',
  },
  {
    id: 'savings-starter',
    title: 'Savings Starter',
    description: 'Created your first savings goal',
    condition: 'First savings goal',
    statKey: 'savings_goal_created',
    threshold: 1,
    xpReward: 75,
    badge: '🌱',
  },
  {
    id: 'goal-crusher',
    title: 'Goal Crusher',
    description: 'Reached a savings goal',
    condition: 'Savings goal reached',
    statKey: 'savings_goal_reached',
    threshold: 1,
    xpReward: 250,
    badge: '🎯',
  },

  // ─── Career ────────────────────────────────────────────────────────
  {
    id: 'career-clarity',
    title: 'Career Clarity',
    description: 'Completed the career assessment',
    condition: 'Career assessment completed',
    statKey: 'career_assessment_completed',
    threshold: 1,
    xpReward: 100,
    badge: '🧭',
  },
  {
    id: 'certified',
    title: 'Certified',
    description: 'Earned your first certification',
    condition: 'Certification earned',
    statKey: 'certification_earned',
    threshold: 1,
    xpReward: 200,
    badge: '📜',
  },
  {
    id: 'skill-master',
    title: 'Skill Master',
    description: 'Tracked 10 professional skills',
    condition: '10 skills tracked',
    statKey: 'skill_added',
    threshold: 10,
    xpReward: 150,
    badge: '⚡',
  },

  // ─── Education ─────────────────────────────────────────────────────
  {
    id: 'bookworm',
    title: 'Bookworm',
    description: 'Read 5 financial education lessons',
    condition: '5 lessons read',
    statKey: 'lesson_read',
    threshold: 5,
    xpReward: 100,
    badge: '📖',
  },
  {
    id: 'financial-scholar',
    title: 'Financial Scholar',
    description: 'Read all financial education lessons',
    condition: 'All lessons completed',
    statKey: 'lesson_read',
    threshold: 18,
    xpReward: 300,
    badge: '🎓',
  },

  // ─── Checklists ────────────────────────────────────────────────────
  {
    id: 'transition-ready',
    title: 'Transition Ready',
    description: 'Completed all transition checklist items',
    condition: 'Full checklist completion',
    statKey: 'checklist_fully_completed',
    threshold: 1,
    xpReward: 500,
    badge: '🎖️',
  },

  // ─── Rank Milestones ───────────────────────────────────────────────
  {
    id: 'rank-e5',
    title: 'Promoted to E-5',
    description: 'Reached Sergeant / Petty Officer 2nd',
    condition: 'Reach level 5',
    statKey: 'level_reached',
    threshold: 5,
    xpReward: 100,
    badge: '🎖️',
  },
  {
    id: 'rank-o1',
    title: 'Commissioned',
    description: 'Reached O-1 — Second Lieutenant / Ensign',
    condition: 'Reach level 10',
    statKey: 'level_reached',
    threshold: 10,
    xpReward: 250,
    badge: '⭐',
  },

  // ─── Engagement ────────────────────────────────────────────────────
  {
    id: 'streak-7',
    title: 'Week Streak',
    description: 'Logged in 7 days in a row',
    condition: '7-day streak',
    statKey: 'streak_bonus_7',
    threshold: 1,
    xpReward: 75,
    badge: '🔥',
  },
  {
    id: 'streak-30',
    title: 'Month Streak',
    description: 'Logged in 30 days in a row',
    condition: '30-day streak',
    statKey: 'streak_bonus_30',
    threshold: 1,
    xpReward: 200,
    badge: '💎',
  },
  {
    id: 'streak-90',
    title: 'Quarter Streak',
    description: 'Logged in 90 days in a row',
    condition: '90-day streak',
    statKey: 'streak_bonus_90',
    threshold: 1,
    xpReward: 500,
    badge: '👑',
  },
]
