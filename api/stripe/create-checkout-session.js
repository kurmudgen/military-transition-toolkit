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
    console.log('=== CHECKOUT SESSION API CALLED ===')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Request method:', req.method)
    console.log('Request headers:', JSON.stringify(req.headers, null, 2))

    // ============================================
    // STEP 1: Load dependencies inside try-catch
    // ============================================
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

    // ============================================
    // STEP 2: Validate environment variables
    // ============================================
    console.log('Validating environment variables...')
    const envVars = {
      STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      APP_URL: !!process.env.APP_URL
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

    // ============================================
    // STEP 3: Initialize Stripe and Supabase
    // ============================================
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

    // ============================================
    // STEP 4: Verify JWT token from Authorization header
    // ============================================
    console.log('Verifying authorization...')
    const authHeader = req.headers.authorization
    console.log('Authorization header present:', !!authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        details: 'No token provided'
      })
    }

    const token = authHeader.split(' ')[1]

    // Verify JWT with Supabase
    console.log('Verifying JWT token...')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      console.error('Authentication failed:', authError?.message)
      return res.status(401).json({
        error: 'Unauthorized',
        details: 'Invalid token'
      })
    }

    console.log('✓ User authenticated:', user.id)

    // ============================================
    // STEP 5: Extract and validate request data
    // ============================================
    console.log('Extracting request data...')
    const userId = user.id
    const email = user.email
    const { priceId } = req.body

    console.log('Checkout request:', { userId, email, priceId })

    if (!priceId) {
      return res.status(400).json({
        error: 'Bad request',
        details: 'Missing priceId'
      })
    }

    // Validate priceId format
    if (!priceId.startsWith('price_')) {
      console.error('Invalid priceId format:', priceId)
      return res.status(400).json({
        error: 'Bad request',
        details: 'Invalid price ID format (must start with "price_")'
      })
    }

    // ============================================
    // STEP 6: Get or create Stripe customer
    // ============================================
    console.log('Checking for existing customer...')
    const { data: existingSub, error: subError } = await supabase
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single()

    if (subError && subError.code !== 'PGRST116') {
      console.error('Database error:', subError.message)
    }

    let customerId = existingSub?.stripe_customer_id

    if (!customerId) {
      console.log('Creating new Stripe customer...')
      const customer = await stripe.customers.create({
        email,
        metadata: {
          supabase_user_id: userId
        }
      })
      customerId = customer.id
      console.log('Customer created:', customerId)
    } else {
      console.log('Using existing customer:', customerId)
    }

    // ============================================
    // STEP 7: Create Stripe checkout session
    // ============================================
    console.log('Creating checkout session...')
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${process.env.APP_URL || req.headers.origin}/app?upgrade=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL || req.headers.origin}/pricing?upgrade=cancelled`,
      metadata: {
        supabase_user_id: userId
      },
      subscription_data: {
        metadata: {
          supabase_user_id: userId
        }
      }
    })

    console.log('Checkout session created:', session.id)
    console.log('Session URL:', session.url)

    // Return success response
    return res.status(200).json({
      url: session.url,
      sessionId: session.id
    })

  } catch (error) {
    // CRITICAL: Catch ALL errors and return JSON
    console.error('=== ERROR IN CHECKOUT SESSION CREATION ===')
    console.error('Error type:', error.constructor.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)

    // Build detailed error response
    const errorResponse = {
      error: 'Failed to create checkout session',
      details: error.message || 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }

    // Add Stripe-specific error details if available
    if (error.type) {
      errorResponse.stripeErrorType = error.type
    }
    if (error.code) {
      errorResponse.stripeErrorCode = error.code
    }
    if (error.statusCode) {
      errorResponse.statusCode = error.statusCode
    }

    console.error('Error response:', JSON.stringify(errorResponse, null, 2))

    return res.status(500).json(errorResponse)
  }
}
