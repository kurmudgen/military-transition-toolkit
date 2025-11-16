// ES6 modules for Vercel serverless functions
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { applyRateLimit, strictRateLimit } from '../_middleware/ratelimit.js'
import { requireCSRF } from '../_middleware/csrf.js'

// Serverless function handler
export default async function handler(req, res) {
  // CRITICAL: Set Content-Type header FIRST before any processing
  res.setHeader('Content-Type', 'application/json')

  // ✅ SECURITY FIX: Restrict CORS to only your domains
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
  } else {
    // Fallback to main domain
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0])
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

  // 🔒 SECURITY: Apply strict rate limiting (10 requests per hour)
  // Prevents abuse of payment endpoint - PENTEST-001 fix
  const rateLimitOk = await applyRateLimit(req, res, strictRateLimit)
  if (!rateLimitOk) return // Rate limit response already sent

  // 🔒 SECURITY: Require CSRF token for state-changing operations
  // Prevents cross-site request forgery attacks - PENTEST-002 fix
  const csrfOk = await requireCSRF(req, res)
  if (!csrfOk) return // CSRF error response already sent

  // Wrap entire function in try-catch to ensure JSON responses
  try {
    console.log('=== STRIPE CHECKOUT DEBUG ===')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Environment variables check:', {
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasAppUrl: !!process.env.APP_URL,
      stripeKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7),
      supabaseUrlPrefix: process.env.SUPABASE_URL?.substring(0, 20)
    })
    console.log('Request method:', req.method)
    console.log('Request headers:', JSON.stringify(req.headers, null, 2))

    // ============================================
    // STEP 1: Validate environment variables
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
    // STEP 2: Initialize Stripe and Supabase
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
    // STEP 3: Verify JWT token from Authorization header
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
    // STEP 3.5a: Check if promo mode is active (PENTEST-003 fix)
    // ============================================
    // 🔒 SECURITY: Block paid subscriptions during promo period
    const promoModeEnabled = process.env.PROMO_MODE === 'true'
    const promoEndDate = new Date('2025-11-11T23:59:59Z')
    const now = new Date()
    const promoActive = promoModeEnabled && now < promoEndDate

    if (promoActive) {
      console.log('❌ Checkout blocked - promo mode active')
      return res.status(400).json({
        error: 'Subscriptions temporarily disabled',
        details: 'Sign up by Nov 19 for lifetime free access. Starting Nov 20: Basic features stay free, premium features are $7/month.',
        promoActive: true,
        promoEndDate: promoEndDate.toISOString()
      })
    }

    // ============================================
    // STEP 3.5b: Check if user already has active subscription
    // ============================================
    console.log('Checking for existing subscription...')
    const { data: existingSubscription, error: checkSubError } = await supabase
      .from('user_subscriptions')
      .select('status, plan_id')
      .eq('user_id', user.id)
      .single()

    if (checkSubError && checkSubError.code !== 'PGRST116') {
      console.error('Error checking subscription:', checkSubError.message)
    }

    // Block checkout if user already has active subscription
    if (existingSubscription && existingSubscription.status === 'active') {
      console.log('❌ User already has active subscription:', existingSubscription.plan_id)
      return res.status(400).json({
        error: 'Already subscribed',
        details: 'You already have an active premium subscription. Visit your account settings to manage your subscription.'
      })
    }

    // ============================================
    // STEP 4: Extract and validate request data
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

    // ✅ SECURITY: Whitelist validation - only allow approved price IDs
    const ALLOWED_PRICE_IDS = [
      process.env.STRIPE_PRICE_MONTHLY,
      process.env.STRIPE_PRICE_ANNUAL,
      process.env.STRIPE_PRICE_LIFETIME
    ].filter(Boolean) // Remove undefined values

    if (!ALLOWED_PRICE_IDS.includes(priceId)) {
      console.error('Unauthorized price ID attempted:', priceId)
      console.error('Allowed price IDs:', ALLOWED_PRICE_IDS)
      return res.status(400).json({
        error: 'Bad request',
        details: 'Invalid price ID - not recognized'
      })
    }

    console.log('✓ Price ID validated against whitelist')

    // ============================================
    // STEP 5: Get or create Stripe customer
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
    // STEP 6: Create Stripe checkout session
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
    console.error('=== CHECKOUT ERROR ===')
    console.error('Error type:', error.constructor?.name || 'Unknown')
    console.error('Error message:', error.message || 'No message')
    console.error('Error stack:', error.stack || 'No stack trace')
    console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))

    // Build error response (exclude sensitive info in production)
    const errorResponse = {
      error: 'Failed to create checkout session',
      details: error.message || 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }

    // ✅ SECURITY: Only include stack trace in development
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = error.stack || 'No stack trace available'
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
    if (error.raw) {
      errorResponse.stripeRawError = error.raw
    }

    console.error('Returning error response:', JSON.stringify(errorResponse, null, 2))

    // ALWAYS return JSON with proper status code
    return res.status(500).json(errorResponse)
  }
}
