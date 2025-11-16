// Cancel Stripe Subscription API Endpoint
// Called by accountDeletionService when user deletes account

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { applyRateLimit, strictRateLimit } from '../_middleware/ratelimit.js'
import { requireCSRF } from '../_middleware/csrf.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // 🔒 SECURITY: Apply strict rate limiting (10 requests per hour)
  // Prevents cancellation abuse - PENTEST-001 fix
  const rateLimitOk = await applyRateLimit(req, res, strictRateLimit)
  if (!rateLimitOk) return // Rate limit response already sent

  // 🔒 SECURITY: Require CSRF token for state-changing operations
  // Prevents cross-site request forgery attacks - PENTEST-002 fix
  const csrfOk = await requireCSRF(req, res)
  if (!csrfOk) return // CSRF error response already sent

  try {
    // ============================================
    // AUTHENTICATION: Verify JWT token
    // ============================================
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - Missing token' })
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      console.error('Auth error:', authError)
      return res.status(401).json({ error: 'Unauthorized - Invalid token' })
    }

    console.log(`Cancel subscription request from user: ${user.id}`)

    // ============================================
    // VALIDATE INPUT
    // ============================================
    const { subscriptionId } = req.body

    if (!subscriptionId) {
      return res.status(400).json({ error: 'Missing subscriptionId' })
    }

    if (!subscriptionId.startsWith('sub_')) {
      return res.status(400).json({ error: 'Invalid subscription ID format' })
    }

    // ============================================
    // AUTHORIZATION: Verify subscription belongs to user
    // ============================================
    const { data: subscription, error: dbError } = await supabase
      .from('user_subscriptions')
      .select('stripe_subscription_id, user_id')
      .eq('user_id', user.id)
      .eq('stripe_subscription_id', subscriptionId)
      .single()

    if (dbError || !subscription) {
      console.error('Subscription not found or does not belong to user:', dbError)
      return res.status(403).json({
        error: 'Forbidden - Subscription not found or does not belong to you'
      })
    }

    console.log(`Authorized: Subscription ${subscriptionId} belongs to user ${user.id}`)

    // ============================================
    // CANCEL SUBSCRIPTION IN STRIPE
    // ============================================
    console.log(`Canceling Stripe subscription: ${subscriptionId}`)

    const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId)

    console.log(`✓ Subscription canceled successfully:`, {
      id: canceledSubscription.id,
      status: canceledSubscription.status,
      canceled_at: canceledSubscription.canceled_at
    })

    // ============================================
    // UPDATE DATABASE
    // ============================================
    // Update subscription status in database
    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update({
        status: 'canceled',
        cancel_at_period_end: true,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('stripe_subscription_id', subscriptionId)

    if (updateError) {
      console.error('Failed to update subscription status in database:', updateError)
      // Don't fail the request - cancellation in Stripe succeeded
    }

    // ============================================
    // SUCCESS RESPONSE
    // ============================================
    return res.status(200).json({
      success: true,
      message: 'Subscription canceled successfully',
      subscription: {
        id: canceledSubscription.id,
        status: canceledSubscription.status,
        canceled_at: canceledSubscription.canceled_at
      }
    })

  } catch (error) {
    console.error('Cancel subscription error:', error)

    // Handle specific Stripe errors
    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({
        error: 'Invalid subscription ID',
        details: error.message
      })
    }

    if (error.type === 'StripeAuthenticationError') {
      return res.status(500).json({
        error: 'Stripe authentication failed',
        details: 'Server configuration error'
      })
    }

    // Generic error response (don't expose stack trace in production)
    const errorResponse = {
      error: 'Failed to cancel subscription',
      details: error.message || 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }

    // Only include stack trace in development
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = error.stack
    }

    return res.status(500).json(errorResponse)
  }
}
