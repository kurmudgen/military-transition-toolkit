// Veterans Day Launch Promotion Configuration

// Promotion end date: November 11, 2025
export const PROMO_END_DATE = new Date('2025-11-11T23:59:59')

// Check if promotion is currently active
export const isPromoActive = () => {
  const now = new Date()
  return now < PROMO_END_DATE
}

// Get days remaining in promotion
export const getDaysRemaining = () => {
  const now = new Date()
  const timeDiff = PROMO_END_DATE - now

  if (timeDiff <= 0) return 0

  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
}

// Get hours remaining in promotion
export const getHoursRemaining = () => {
  const now = new Date()
  const timeDiff = PROMO_END_DATE - now

  if (timeDiff <= 0) return 0

  return Math.ceil(timeDiff / (1000 * 60 * 60))
}

// Get time remaining as formatted string
export const getTimeRemaining = () => {
  const now = new Date()
  const timeDiff = PROMO_END_DATE - now

  if (timeDiff <= 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true }
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

  return { days, hours, minutes, expired: false }
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
    name: 'Founding Member',
    price: 199,
    originalPrice: 399,
    description: 'Lock in lifetime access at launch price',
    badge: 'Limited Time',
    features: [
      'All Premium features forever',
      'Pay once, use forever - no recurring fees',
      'All future premium features included',
      'Priority support forever',
      'Will increase to $399 after Veterans Day',
      'Support veteran-built software'
    ]
  }
}

// Check if user has premium access (during promo, everyone does)
export const hasPremiumAccess = (userTier = 'free') => {
  // During promo, everyone gets premium features
  if (isPromoActive()) {
    return true
  }

  // After promo, check actual tier
  return ['monthly', 'annual', 'lifetime'].includes(userTier?.toLowerCase())
}
