// Feature Configuration
// All features are 100% free - no premium tiers

// ALL features free for all authenticated users
export const isPromoModeActive = () => {
  return true // Always active - all features free
}

// Features available to all users (kept for compatibility with existing code)
export const FEATURES = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Unlimited resumes',
      'Unlimited saved jobs',
      'All transition tools',
      'State benefits comparison',
      'Resource library access',
      'PDF exports',
      'VA claims builder',
      'Statement generators',
      'Evidence tracker',
      'Cloud sync across devices'
    ]
  }
}

// All authenticated users have full access
export const hasPremiumAccess = () => {
  return true // All features free
}

// Payment UI is always hidden - all features free
export const shouldHidePaymentUI = () => {
  return true
}
