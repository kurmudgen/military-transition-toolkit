/**
 * Tone Adapter
 *
 * Provides tone-aware copy variants for the app.
 * Three personas:
 *   supportive  – warm, encouraging, empathetic
 *   direct      – brief, no-nonsense, action-oriented
 *   motivational – high-energy, military cadence, "let's go"
 *
 * Each key maps to a tone → string dictionary.
 * Components call `getToneCopy(key)` to get the right variant.
 */

export type Tone = 'supportive' | 'direct' | 'motivational'

export const TONE_OPTIONS: { value: Tone; label: string; description: string }[] = [
  {
    value: 'supportive',
    label: 'Supportive',
    description: 'Warm and encouraging — like talking to a mentor',
  },
  {
    value: 'direct',
    label: 'Direct',
    description: 'Straight to the point — no fluff, just facts',
  },
  {
    value: 'motivational',
    label: 'Motivational',
    description: 'High energy — mission-focused and driven',
  },
]

/**
 * Copy dictionary keyed by context → tone → string.
 * Add new entries as features grow.
 */
const COPY: Record<string, Record<Tone, string>> = {
  // Dashboard greetings
  dashboard_greeting: {
    supportive: "Welcome back — you're doing great. Let's keep the momentum going.",
    direct: "Here's where you stand. Let's get to work.",
    motivational: "Roger that — you're back in the fight. Let's make today count!",
  },
  dashboard_no_progress: {
    supportive: "No worries — every journey starts with a single step. Pick something that feels right.",
    direct: "Nothing tracked yet. Choose a task and start.",
    motivational: "Zero tasks? Time to change that. Pick a target and engage!",
  },
  // Budget
  budget_start: {
    supportive: "Building a budget is one of the best things you can do for your family. Let's start simple.",
    direct: "Enter your monthly income and expenses. We'll do the math.",
    motivational: "Time to take control of your finances. Enter your numbers — mission starts now!",
  },
  budget_good: {
    supportive: "You're in a strong position — nice work keeping your spending in check!",
    direct: "Budget balanced. Surplus detected.",
    motivational: "Outstanding! You're running a tight ship. Keep that discipline!",
  },
  budget_over: {
    supportive: "You're spending more than planned — that's okay, let's find some adjustments together.",
    direct: "Over budget. Review expenses and cut where possible.",
    motivational: "Red on the budget — time to regroup and tighten the belt. You've handled tougher.",
  },
  // Debt
  debt_added: {
    supportive: "Good job tracking this. Knowing what you owe is the first step to freedom.",
    direct: "Debt logged. Review your payoff strategy.",
    motivational: "Enemy identified! Now let's build the plan to eliminate it.",
  },
  debt_payoff: {
    supportive: "Congratulations — that's a huge milestone! You should be really proud.",
    direct: "Debt cleared. Move to the next target.",
    motivational: "Target destroyed! One less debt standing in your way. HOOAH!",
  },
  // Savings
  savings_goal_created: {
    supportive: "Great goal! Every dollar saved brings you closer. You've got this.",
    direct: "Goal set. Start contributing.",
    motivational: "Objective locked in! Now let's fund this mission. Every dollar counts!",
  },
  savings_goal_reached: {
    supportive: "You did it! That takes real discipline. Celebrate this win.",
    direct: "Goal met. Consider setting a new target.",
    motivational: "MISSION COMPLETE! You crushed that goal. What's next, warrior?",
  },
  // Career
  career_assessment_done: {
    supportive: "Nice work completing your assessment. These insights will help guide your next chapter.",
    direct: "Assessment complete. Review your matches.",
    motivational: "Recon complete! Now you've got intel on your best career paths. Let's move!",
  },
  career_bookmark: {
    supportive: "Saved for later — take your time exploring what fits best.",
    direct: "Career bookmarked.",
    motivational: "Target marked! Come back and research this one further.",
  },
  // Lessons
  lesson_completed: {
    supportive: "Another lesson done — you're investing in yourself and it shows.",
    direct: "Lesson complete. Move to the next.",
    motivational: "Knowledge acquired! Each lesson makes you stronger. Keep pushing!",
  },
  // General encouragement
  streak_maintained: {
    supportive: "You've been consistent — that's what real progress looks like.",
    direct: "Streak active. Keep logging in daily.",
    motivational: "Streak alive! Consistency is what separates warriors from the rest!",
  },
  level_up: {
    supportive: "You leveled up! Your dedication is paying off.",
    direct: "Level up. New rank achieved.",
    motivational: "PROMOTED! You've earned this. Now push to the next rank!",
  },
  // Checklist
  checklist_reminder: {
    supportive: "Gentle reminder: a few items on your checklist could use some attention when you're ready.",
    direct: "Incomplete checklist items remain. Review your list.",
    motivational: "Unfinished business on your checklist — let's get after it!",
  },
  // Empty states
  empty_debt: {
    supportive: "Nothing here yet — add your debts when you're ready, no rush.",
    direct: "No debts tracked. Add entries to start.",
    motivational: "No debts logged? Either you're debt-free (nice!) or it's time to face the numbers.",
  },
  empty_savings: {
    supportive: "Start by setting a small, achievable goal — you'll build from there.",
    direct: "No savings goals. Create one to begin.",
    motivational: "No targets set! Time to establish your financial objectives, soldier!",
  },
  empty_career: {
    supportive: "Your career exploration starts here. Take the assessment when you're ready.",
    direct: "No career data. Start the assessment.",
    motivational: "Career recon hasn't started. Hit that assessment and find your mission!",
  },
}

const STORAGE_KEY = 'mtt_tone_preference'

/** Get the user's stored tone preference */
export function getTonePreference(): Tone {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && (stored === 'supportive' || stored === 'direct' || stored === 'motivational')) {
      return stored as Tone
    }
  } catch {
    // ignore
  }
  return 'supportive' // default
}

/** Save tone preference */
export function setTonePreference(tone: Tone): void {
  try {
    localStorage.setItem(STORAGE_KEY, tone)
  } catch {
    // ignore
  }
}

/** Get copy for a given key in the user's preferred tone */
export function getToneCopy(key: string, tone?: Tone): string {
  const activeTone = tone || getTonePreference()
  const entry = COPY[key]
  if (!entry) return ''
  return entry[activeTone] || entry.supportive || ''
}

/** Get all available copy keys (for debugging / tests) */
export function getCopyKeys(): string[] {
  return Object.keys(COPY)
}
