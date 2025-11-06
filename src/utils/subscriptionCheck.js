/**
 * Subscription Utility Functions
 * Handles subscription tier checks and feature access control
 */

/**
 * Check if user has an active paid subscription
 * @param {Object} user - User object from auth context
 * @returns {boolean} - True if user has active paid subscription
 */
export const hasActiveSubscription = (user) => {
  if (!user) return false

  return (
    user.subscription_status === 'active' &&
    user.subscription_tier !== 'free'
  )
}

/**
 * Get the subscription tier for a user
 * @param {Object} user - User object from auth context
 * @returns {'free'|'monthly'|'annual'|'lifetime'} - Subscription tier
 */
export const getSubscriptionTier = (user) => {
  if (!user) return 'free'
  return user.subscription_tier || 'free'
}

/**
 * Check if a feature requires a paid subscription
 * @param {string} feature - Feature identifier
 * @returns {boolean} - True if feature requires subscription
 */
export const requiresSubscription = (feature) => {
  return SUBSCRIPTION_FEATURES[feature] === true
}

/**
 * Feature access control mapping
 * true = requires paid subscription
 * false = publicly accessible
 */
export const SUBSCRIPTION_FEATURES = {
  // Premium features (require paid subscription)
  claims_builder: true,
  document_generator: true,
  resume_builder: true,
  appointments: true,
  job_tracker: true,
  advanced_calculators: true,
  medboard: true,
  separation: true,
  progress_tracking: true,
  reminders: true,

  // Public features (accessible to everyone, no login required)
  state_benefits: false,
  basic_calculator: false,
  resources: false,
  retirement_calculator: false
}

/**
 * Get list of premium features
 * @returns {string[]} - Array of premium feature identifiers
 */
export const getPremiumFeatures = () => {
  return Object.keys(SUBSCRIPTION_FEATURES).filter(
    feature => SUBSCRIPTION_FEATURES[feature] === true
  )
}

/**
 * Get list of public features
 * @returns {string[]} - Array of public feature identifiers
 */
export const getPublicFeatures = () => {
  return Object.keys(SUBSCRIPTION_FEATURES).filter(
    feature => SUBSCRIPTION_FEATURES[feature] === false
  )
}

/**
 * Check if user can access a specific feature
 * @param {string} feature - Feature identifier
 * @param {Object} user - User object
 * @returns {boolean} - True if user can access feature
 */
export const canAccessFeature = (feature, user) => {
  // Public features are always accessible
  if (!requiresSubscription(feature)) {
    return true
  }

  // Premium features require active subscription
  return hasActiveSubscription(user)
}

/**
 * Get upgrade message for a feature
 * @param {string} feature - Feature identifier
 * @returns {string} - Upgrade message
 */
export const getUpgradeMessage = (feature) => {
  const messages = {
    claims_builder: 'Track unlimited VA disability claims with evidence management, deadlines, and status updates.',
    document_generator: 'Generate professional military-to-civilian documents with AI-powered templates.',
    resume_builder: 'Create unlimited ATS-optimized resumes with military experience translation.',
    appointments: 'Track all your medical and administrative appointments in one place.',
    job_tracker: 'Manage your job search with application tracking and follow-up reminders.',
    advanced_calculators: 'Access advanced retirement and disability calculators with detailed breakdowns.',
    medboard: 'Complete MEB/PEB checklist with document tracking and deadline management.',
    separation: 'Under-20 year separation checklist with benefits and timeline tracking.',
    progress_tracking: 'Track your transition progress across all checklists and milestones.',
    reminders: 'Never miss a deadline with automated reminders and notifications.'
  }

  return messages[feature] || 'Upgrade to Premium to unlock this feature and save your data to the cloud.'
}
