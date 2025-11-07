import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

export default async function handler(req, res) {
  // Set headers
  res.setHeader('Content-Type', 'application/json')

  // CORS
  const allowedOrigins = [
    'https://military-transition-toolkit.vercel.app',
    'https://www.military-transition-toolkit.vercel.app',
    ...(process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'
      ? ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173']
      : [])
  ]

  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true })
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate environment variables
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase environment variables')
      return res.status(500).json({
        error: 'Server configuration error',
        hasActiveSubscription: false,
        tier: 'free'
      })
    }

    // Initialize Supabase with service role key (server-side)
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Get user from JWT token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        hasActiveSubscription: false,
        tier: 'free'
      })
    }

    const token = authHeader.substring(7)

    // Verify JWT and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      console.error('Auth error:', authError?.message)
      return res.status(401).json({
        error: 'Invalid token',
        hasActiveSubscription: false,
        tier: 'free'
      })
    }

    console.log('Verifying subscription for user:', user.id)

    // Fetch subscription from database (source of truth)
    const { data: subscription, error: subError } = await supabase
      .from('user_subscriptions')
      .select('status, plan_id, current_period_end, stripe_subscription_id, stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    // No subscription found = free tier
    if (subError && subError.code === 'PGRST116') {
      console.log('No subscription found for user:', user.id)
      return res.status(200).json({
        hasActiveSubscription: false,
        tier: 'free',
        status: 'none'
      })
    }

    if (subError) {
      console.error('Database error:', subError.message)
      return res.status(500).json({
        hasActiveSubscription: false,
        tier: 'free',
        error: 'Database error'
      })
    }

    // Map plan_id to tier
    const getTierFromPlanId = (planId) => {
      if (!planId) return 'free'
      const lowerPlanId = planId.toLowerCase()
      if (lowerPlanId.includes('monthly')) return 'monthly'
      if (lowerPlanId.includes('annual')) return 'annual'
      if (lowerPlanId.includes('lifetime')) return 'lifetime'
      return 'free'
    }

    const tier = getTierFromPlanId(subscription.plan_id)

    // Check if subscription is active
    const isLifetime = tier === 'lifetime'
    const notExpired = subscription.current_period_end
      ? new Date(subscription.current_period_end) > new Date()
      : false
    const statusActive = subscription.status === 'active'
    const isPaidTier = tier !== 'free'

    let isActive = statusActive && isPaidTier && (isLifetime || notExpired)

    // Double-check with Stripe for extra security (if subscription exists)
    if (subscription.stripe_subscription_id && isActive && process.env.STRIPE_SECRET_KEY) {
      try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const stripeSubscription = await stripe.subscriptions.retrieve(
          subscription.stripe_subscription_id
        )

        console.log('Stripe subscription status:', stripeSubscription.status)

        // Stripe must agree subscription is active
        if (stripeSubscription.status !== 'active' && stripeSubscription.status !== 'trialing') {
          console.warn('Stripe says subscription inactive, updating database')

          // Update our database to match Stripe
          await supabase
            .from('user_subscriptions')
            .update({ status: 'inactive' })
            .eq('user_id', user.id)

          isActive = false
        }
      } catch (stripeError) {
        console.error('Stripe verification error:', stripeError.message)
        // Continue with database check if Stripe API fails
      }
    }

    console.log('Subscription verified:', {
      userId: user.id,
      tier,
      isActive,
      status: subscription.status
    })

    return res.status(200).json({
      hasActiveSubscription: isActive,
      tier: tier,
      status: subscription.status,
      expiresAt: subscription.current_period_end
    })

  } catch (error) {
    console.error('Subscription verification error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      hasActiveSubscription: false,
      tier: 'free'
    })
  }
}
