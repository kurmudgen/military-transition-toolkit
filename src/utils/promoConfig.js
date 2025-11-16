// Promotion Configuration
// When promo mode is active, all authenticated users get free premium access

// PROMO MODE FEATURE FLAG
// When VITE_PROMO_MODE=true, all authenticated users get free premium access
// This allows early adopters to access all features while keeping the platform free
export const isPromoModeActive = () => {
  return import.meta.env.VITE_PROMO_MODE === 'true'
}

// Pricing tiers
export const PRICING = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      '1 resume limit',
      '5 saved jobs',
      'Basic transition tools',
      'State benefits comparison',
      'Resource library access'
    ]
  },
  MONTHLY: {
    name: 'Premium Monthly',
    price: 7,
    description: 'Advanced features for comprehensive planning',
    features: [
      'All Free tier features',
      'Unlimited resumes',
      'Unlimited saved jobs',
      'PDF exports',
      'Advanced calculators',
      'VA claims builder',
      'Statement generators',
      'Evidence tracker',
      'Priority support'
    ]
  },
  ANNUAL: {
    name: 'Premium Annual',
    price: 49,
    priceMonthly: 4.08,
    savings: 35,
    badge: 'Best Value',
    features: [
      'All Premium Monthly features',
      'Save $35 vs monthly',
      'Annual billing at $49/year'
    ]
  },
  LIFETIME: {
    name: 'Lifetime Access',
    price: 250,
    description: 'Pay once, use forever',
    badge: 'Best for Long-Term',
    features: [
      'All Premium features forever',
      'Pay once, use forever - no recurring fees',
      'All future premium features included',
      'Priority support forever',
      'No subscriptions, no renewals',
      'Support veteran-built software'
    ]
  }
}

// Check if user has premium access
// Priority: 1) Promo Mode (founding member access), 2) Actual subscription
export const hasPremiumAccess = (userTier = 'free') => {
  // First check: Promo mode feature flag (e.g., founding member promotion)
  if (isPromoModeActive()) {
    return true
  }

  // Check actual subscription tier
  return ['monthly', 'annual', 'lifetime'].includes(userTier?.toLowerCase())
}

// Check if payment UI should be hidden
export const shouldHidePaymentUI = () => {
  return isPromoModeActive()
}
