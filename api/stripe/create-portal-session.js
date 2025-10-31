// Use CommonJS for Vercel serverless functions
// NOTE: Requires are moved inside function to ensure errors return JSON

// Serverless function handler
module.exports = async function handler(req, res) {
  // CRITICAL: Set Content-Type header FIRST before any processing
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
    console.log('=== PORTAL SESSION API CALLED ===')
    console.log('Timestamp:', new Date().toISOString())

    // Load dependencies inside try-catch
    console.log('Loading dependencies...')
    let Stripe, createClient

    try {
      Stripe = require('stripe')
      console.log('✓ Stripe module loaded')
    } catch (err) {
      console.error('✗ Failed to load Stripe module:', err.message)
      return res.status(500).json({
        error: 'Server dependency error',
        details: 'Failed to load Stripe module',
        message: err.message
      })
    }

    try {
      const supabaseLib = require('@supabase/supabase-js')
      createClient = supabaseLib.createClient
      console.log('✓ Supabase module loaded')
    } catch (err) {
      console.error('✗ Failed to load Supabase module:', err.message)
      return res.status(500).json({
        error: 'Server dependency error',
        details: 'Failed to load Supabase module',
        message: err.message
      })
    }

    // Validate environment variables
    console.log('Validating environment variables...')
    const envVars = {
      STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    }
    console.log('Environment variables:', envVars)

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('✗ STRIPE_SECRET_KEY not set')
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'STRIPE_SECRET_KEY not configured',
        envVars
      })
    }

    if (!process.env.SUPABASE_URL) {
      console.error('✗ SUPABASE_URL not set')
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'SUPABASE_URL not configured',
        envVars
      })
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('✗ SUPABASE_SERVICE_ROLE_KEY not set')
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'SUPABASE_SERVICE_ROLE_KEY not configured',
        envVars
      })
    }

    console.log('✓ All environment variables present')

    // Initialize Stripe and Supabase
    console.log('Initializing Stripe and Supabase...')
    let stripe, supabase

    try {
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
      console.log('✓ Stripe initialized')
    } catch (err) {
      console.error('✗ Failed to initialize Stripe:', err.message)
      return res.status(500).json({
        error: 'Stripe initialization error',
        details: err.message
      })
    }

    try {
      supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
      console.log('✓ Supabase initialized')
    } catch (err) {
      console.error('✗ Failed to initialize Supabase:', err.message)
      return res.status(500).json({
        error: 'Supabase initialization error',
        details: err.message
      })
    }

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
