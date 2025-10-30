// Use CommonJS for Vercel serverless functions
const Stripe = require('stripe')
const { createClient } = require('@supabase/supabase-js')

// Serverless function handler
module.exports = async function handler(req, res) {
  // CRITICAL: Set Content-Type header first
  res.setHeader('Content-Type', 'application/json')

  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
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

  // Wrap entire function in try-catch to ensure JSON responses
  try {
    // Validate environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'STRIPE_SECRET_KEY not configured'
      })
    }

    if (!process.env.SUPABASE_URL) {
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'SUPABASE_URL not configured'
      })
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'SUPABASE_SERVICE_ROLE_KEY not configured'
      })
    }

    // Initialize Stripe and Supabase
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Verify JWT token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        details: 'No token provided'
      })
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      console.error('Authentication failed:', authError?.message)
      return res.status(401).json({
        error: 'Unauthorized',
        details: 'Invalid token'
      })
    }

    const userId = user.id

    // Get customer ID from subscription
    const { data: subscription, error: subError } = await supabase
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single()

    if (subError || !subscription?.stripe_customer_id) {
      console.error('Subscription lookup error:', subError?.message)
      return res.status(404).json({
        error: 'No subscription found',
        details: 'User does not have an active subscription'
      })
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${process.env.APP_URL || req.headers.origin}/app/account`
    })

    return res.status(200).json({ url: session.url })

  } catch (error) {
    console.error('Portal session creation error:', error)

    // Build error response
    const errorResponse = {
      error: 'Failed to create portal session',
      details: error.message || 'Unknown error occurred'
    }

    if (error.type) {
      errorResponse.stripeErrorType = error.type
    }
    if (error.code) {
      errorResponse.stripeErrorCode = error.code
    }

    return res.status(500).json(errorResponse)
  }
}
