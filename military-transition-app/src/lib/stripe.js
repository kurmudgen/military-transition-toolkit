import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe with publishable key
let stripePromise
export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    if (!publishableKey) {
      console.error('Missing Stripe publishable key')
      return null
    }
    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise
}

// Pricing configuration
export const STRIPE_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: null,
    stripePriceId: null,
    features: [
      '1 resume with watermark',
      'No PDF exports',
      'Save up to 5 jobs',
      'Basic checklists',
      'View-only state benefits',
      'No AI assistance'
    ],
    limits: {
      resumes: 1,
      savedJobs: 5,
      exports: false,
      aiQuestions: 0
    }
  },
  PREMIUM_MONTHLY: {
    id: 'premium_monthly',
    name: 'Premium Monthly',
    price: 7,
    interval: 'month',
    stripePriceId: import.meta.env.VITE_STRIPE_PRICE_MONTHLY,
    features: [
      'Unlimited resumes',
      'Unlimited PDF exports',
      'Unlimited saved jobs',
      'Full VA claims builder',
      'Interactive state comparison',
      '50 AI questions/day',
      'Priority support',
      'All future features'
    ],
    limits: {
      resumes: Infinity,
      savedJobs: Infinity,
      exports: true,
      aiQuestions: 50
    }
  },
  PREMIUM_ANNUAL: {
    id: 'premium_annual',
    name: 'Premium Annual',
    price: 49,
    interval: 'year',
    stripePriceId: import.meta.env.VITE_STRIPE_PRICE_ANNUAL,
    savings: '$35/year',
    features: [
      'Unlimited resumes',
      'Unlimited PDF exports',
      'Unlimited saved jobs',
      'Full VA claims builder',
      'Interactive state comparison',
      '50 AI questions/day',
      'Priority support',
      'All future features',
      'Save $35 vs monthly'
    ],
    limits: {
      resumes: Infinity,
      savedJobs: Infinity,
      exports: true,
      aiQuestions: 50
    }
  }
}

// Helper to get plan details by ID
export const getPlanById = (planId) => {
  const planMap = {
    'free': STRIPE_PLANS.FREE,
    'premium_monthly': STRIPE_PLANS.PREMIUM_MONTHLY,
    'premium_annual': STRIPE_PLANS.PREMIUM_ANNUAL
  }
  return planMap[planId] || STRIPE_PLANS.FREE
}

// Helper to check if plan is premium
export const isPremiumPlan = (planId) => {
  return planId === 'premium_monthly' || planId === 'premium_annual'
}
