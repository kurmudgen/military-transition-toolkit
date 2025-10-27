import { isPremiumUser } from '../lib/supabase'
import { STRIPE_PLANS } from '../lib/stripe'

/**
 * Feature gates for free vs premium users
 */
export const FEATURES = {
  // Resume features
  MULTIPLE_RESUMES: 'multiple_resumes',
  RESUME_EXPORT: 'resume_export',

  // Job search features
  UNLIMITED_SAVED_JOBS: 'unlimited_saved_jobs',

  // VA claims features
  FULL_VA_CLAIMS: 'full_va_claims',

  // State benefits features
  INTERACTIVE_STATE_COMPARISON: 'interactive_state_comparison',

  // AI features (future)
  AI_ASSISTANCE: 'ai_assistance',

  // General features
  PRIORITY_SUPPORT: 'priority_support',
  NO_WATERMARKS: 'no_watermarks'
}

/**
 * Check if user has access to a specific feature
 */
export const hasFeatureAccess = async (feature) => {
  const isPremium = await isPremiumUser()

  // Premium users have access to everything
  if (isPremium) return true

  // Free tier restrictions
  switch (feature) {
    case FEATURES.MULTIPLE_RESUMES:
    case FEATURES.RESUME_EXPORT:
    case FEATURES.UNLIMITED_SAVED_JOBS:
    case FEATURES.FULL_VA_CLAIMS:
    case FEATURES.INTERACTIVE_STATE_COMPARISON:
    case FEATURES.AI_ASSISTANCE:
    case FEATURES.PRIORITY_SUPPORT:
    case FEATURES.NO_WATERMARKS:
      return false

    default:
      return true // Unknown features default to free
  }
}

/**
 * Get user's plan limits
 */
export const getUserLimits = async () => {
  const isPremium = await isPremiumUser()

  if (isPremium) {
    return STRIPE_PLANS.PREMIUM_MONTHLY.limits
  }

  return STRIPE_PLANS.FREE.limits
}

/**
 * Check if user has reached a specific limit
 */
export const hasReachedLimit = async (limitType, currentCount) => {
  const limits = await getUserLimits()
  const limit = limits[limitType]

  if (limit === Infinity) return false

  return currentCount >= limit
}

/**
 * Get upgrade message for a specific feature
 */
export const getUpgradeMessage = (feature) => {
  const messages = {
    [FEATURES.MULTIPLE_RESUMES]: 'Upgrade to Premium to create unlimited resumes',
    [FEATURES.RESUME_EXPORT]: 'Upgrade to Premium to export your resume as PDF',
    [FEATURES.UNLIMITED_SAVED_JOBS]: 'Upgrade to Premium to save unlimited jobs',
    [FEATURES.FULL_VA_CLAIMS]: 'Upgrade to Premium to access full VA claims builder',
    [FEATURES.INTERACTIVE_STATE_COMPARISON]: 'Upgrade to Premium for interactive state comparison',
    [FEATURES.AI_ASSISTANCE]: 'Upgrade to Premium to unlock AI-powered assistance',
    [FEATURES.PRIORITY_SUPPORT]: 'Upgrade to Premium for priority support',
    [FEATURES.NO_WATERMARKS]: 'Upgrade to Premium to remove watermarks'
  }

  return messages[feature] || 'Upgrade to Premium to unlock this feature'
}
