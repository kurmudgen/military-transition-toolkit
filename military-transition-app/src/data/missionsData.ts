/**
 * Missions Data
 *
 * Themed groups of related actions that users can complete for bonus XP.
 * Missions are checked against the user's stats in gamificationService.
 */

export interface MissionRequirement {
  action: string
  count: number
  description: string
}

export interface Mission {
  id: string
  title: string
  description: string
  category: 'career' | 'financial' | 'education' | 'checklist' | 'engagement'
  requirements: MissionRequirement[]
  xpReward: number
  badge: string
}

export const MISSIONS: Mission[] = [
  // ─── Financial ─────────────────────────────────────────────────────
  {
    id: 'financial-foundations',
    title: 'Financial Foundations',
    description: 'Build the base of your financial plan',
    category: 'financial',
    requirements: [
      { action: 'budget_created', count: 1, description: 'Create a budget' },
      { action: 'savings_goal_created', count: 1, description: 'Set a savings goal' },
      { action: 'lesson_read', count: 2, description: 'Read 2 financial lessons' },
    ],
    xpReward: 200,
    badge: '💰',
  },
  {
    id: 'debt-destroyer',
    title: 'Debt Destroyer',
    description: 'Take control of your debt',
    category: 'financial',
    requirements: [
      { action: 'debt_added', count: 1, description: 'Track at least 1 debt' },
      { action: 'budget_created', count: 1, description: 'Create a budget' },
      { action: 'lesson_read', count: 1, description: 'Read a financial lesson' },
    ],
    xpReward: 250,
    badge: '⚔️',
  },
  {
    id: 'emergency-ready',
    title: 'Emergency Ready',
    description: 'Build your financial safety net',
    category: 'financial',
    requirements: [
      { action: 'savings_goal_created', count: 1, description: 'Create a savings goal' },
      { action: 'emergency_fund_tier_reached', count: 1, description: 'Reach 1 month of expenses in emergency fund' },
    ],
    xpReward: 300,
    badge: '🛡️',
  },
  {
    id: 'savings-streak',
    title: 'Savings Streak',
    description: 'Build consistent savings habits',
    category: 'financial',
    requirements: [
      { action: 'savings_contribution', count: 3, description: 'Log 3 savings contributions' },
      { action: 'savings_goal_created', count: 2, description: 'Create 2 savings goals' },
    ],
    xpReward: 175,
    badge: '📈',
  },

  // ─── Career ────────────────────────────────────────────────────────
  {
    id: 'career-recon',
    title: 'Career Recon',
    description: 'Explore your post-military career options',
    category: 'career',
    requirements: [
      { action: 'career_assessment_completed', count: 1, description: 'Complete career assessment' },
      { action: 'career_bookmarked', count: 3, description: 'Bookmark 3 careers' },
      { action: 'skill_added', count: 2, description: 'Add 2 skills' },
    ],
    xpReward: 200,
    badge: '🔍',
  },
  {
    id: 'cert-chaser',
    title: 'Cert Chaser',
    description: 'Pursue professional credentials',
    category: 'career',
    requirements: [
      { action: 'certification_started', count: 1, description: 'Start a certification' },
      { action: 'learning_goal_completed', count: 1, description: 'Complete a learning goal' },
    ],
    xpReward: 175,
    badge: '📜',
  },
  {
    id: 'skill-builder',
    title: 'Skill Builder',
    description: 'Develop your professional toolkit',
    category: 'career',
    requirements: [
      { action: 'skill_added', count: 5, description: 'Track 5 skills' },
      { action: 'certification_started', count: 1, description: 'Start 1 certification' },
    ],
    xpReward: 150,
    badge: '🔧',
  },

  // ─── Education ─────────────────────────────────────────────────────
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Invest in your financial education',
    category: 'education',
    requirements: [
      { action: 'lesson_read', count: 5, description: 'Read 5 financial lessons' },
    ],
    xpReward: 150,
    badge: '📚',
  },
  {
    id: 'financial-scholar',
    title: 'Financial Scholar',
    description: 'Master all financial education categories',
    category: 'education',
    requirements: [
      { action: 'lesson_read', count: 12, description: 'Read 12 financial lessons' },
      { action: 'education_category_completed', count: 2, description: 'Complete 2 education categories' },
    ],
    xpReward: 300,
    badge: '🎓',
  },

  // ─── Checklist ─────────────────────────────────────────────────────
  {
    id: 'pcs-pro',
    title: 'PCS Pro',
    description: 'Prepare for your next move',
    category: 'checklist',
    requirements: [
      { action: 'pcs_checklist_item', count: 10, description: 'Complete 10 PCS checklist items' },
    ],
    xpReward: 200,
    badge: '📦',
  },
  {
    id: 'checklist-champion',
    title: 'Checklist Champion',
    description: 'Stay on top of your transition tasks',
    category: 'checklist',
    requirements: [
      { action: 'checklist_item_completed', count: 15, description: 'Complete 15 checklist items' },
      { action: 'checklist_section_completed', count: 2, description: 'Complete 2 full sections' },
    ],
    xpReward: 250,
    badge: '✅',
  },

  // ─── Engagement ────────────────────────────────────────────────────
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Build a consistent daily habit',
    category: 'engagement',
    requirements: [
      { action: 'streak_bonus_7', count: 1, description: 'Log in 7 days in a row' },
    ],
    xpReward: 100,
    badge: '🔥',
  },
  {
    id: 'month-master',
    title: 'Month Master',
    description: 'A full month of daily engagement',
    category: 'engagement',
    requirements: [
      { action: 'streak_bonus_30', count: 1, description: 'Log in 30 days in a row' },
    ],
    xpReward: 500,
    badge: '⭐',
  },
]
