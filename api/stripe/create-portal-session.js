// ES6 modules for Vercel serverless functions
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { rateLimitCheck, addRateLimitHeaders, RATE_LIMITS } from '../_utils/ratelimit.js'

// Serverless function handler
export default async function handler(req, res) {
  // CRITICAL: Set Content-Type header FIRST before any processing
  res.setHeader('Content-Type', 'application/json')

  // Rate limiting (SECURITY: Phase 4 - CRITICAL-004 fix)
  const rateLimitResult = await rateLimitCheck(
    req,
    'portal',
    RATE_LIMITS.DEFAULT.maxRequests,
    RATE_LIMITS.DEFAULT.window
  )

  if (!rateLimitResult.success) {
    addRateLimitHeaders(res, rateLimitResult)
    return res.status(429).json({
      error: 'Too many requests',
      message: `Rate limit exceeded. Please try again after ${new Date(rateLimitResult.reset).toLocaleString()}`,
      retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
    })
  }

  addRateLimitHeaders(res, rateLimitResult)

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

  // Wrap entire function in try-catch to ensure JSON responses
  try {
    console.log('=== STRIPE PORTAL DEBUG ===')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Environment variables check:', {
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasAppUrl: !!process.env.APP_URL,
      stripeKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7),
      supabaseUrlPrefix: process.env.SUPABASE_URL?.substring(0, 20)
    })

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
    // CRITICAL: Catch ALL errors and return JSON
    console.error('=== PORTAL ERROR ===')
    console.error('Error type:', error.constructor?.name || 'Unknown')
    console.error('Error message:', error.message || 'No message')
    console.error('Error stack:', error.stack || 'No stack trace')
    console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2))

    // Build error response (exclude sensitive info in production)
    const errorResponse = {
      error: 'Failed to create portal session',
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
