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
    name: 'Free Forever',
    price: 0,
    features: [
      'Basic transition checklists',
      'Essential resources and links',
      'State benefits comparison',
      'Retirement calculator (basic)',
      'Local data storage only'
    ]
  },
  MONTHLY: {
    name: 'Premium Monthly',
    price: 7,
    features: [
      'All Free features',
      'Advanced retirement calculator (BRS & High-3)',
      'VA disability claims builder',
      'Document tracking',
      'Appointments manager',
      'Cloud storage & sync',
      'Priority support'
    ]
  },
  ANNUAL: {
    name: 'Premium Annual',
    price: 49,
    priceMonthly: 4.08,
    savings: 35,
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
    features: [
      'All Premium features',
      'Lifetime access - pay once, use forever',
      'Lock in launch pricing (50% off)',
      'Priority support forever',
      'All future premium features included',
      'Support veteran-built software'
    ],
    badge: 'Best Value'
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
