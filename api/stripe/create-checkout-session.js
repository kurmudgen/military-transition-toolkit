// Use CommonJS for Vercel serverless functions
const Stripe = require('stripe')
const { createClient } = require('@supabase/supabase-js')

// Serverless function handler
module.exports = async function handler(req, res) {
  // CRITICAL: Set Content-Type header first
  res.setHeader('Content-Type', 'application/json')

  // Add CORS headers if needed
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
    // ============================================
    // STEP 1: Validate environment variables
    // ============================================
    console.log('Environment check:')
    console.log('- STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY)
    console.log('- SUPABASE_URL exists:', !!process.env.SUPABASE_URL)
    console.log('- SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('CRITICAL: STRIPE_SECRET_KEY is not set')
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'STRIPE_SECRET_KEY not configured'
      })
    }

    if (!process.env.SUPABASE_URL) {
      console.error('CRITICAL: SUPABASE_URL is not set')
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'SUPABASE_URL not configured'
      })
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('CRITICAL: SUPABASE_SERVICE_ROLE_KEY is not set')
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'SUPABASE_SERVICE_ROLE_KEY not configured'
      })
    }

    // Initialize Stripe and Supabase AFTER validation
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // ============================================
    // STEP 2: Verify JWT token from Authorization header
    // ============================================
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

    console.log('User authenticated:', user.id)

    // ============================================
    // STEP 3: Extract and validate request data
    // ============================================
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
    // STEP 4: Get or create Stripe customer
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
    // STEP 5: Create Stripe checkout session
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
