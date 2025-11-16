// Stripe Customer Deletion API Endpoint
// SECURITY FIX: PENTEST-004 - GDPR Article 17 (Right to Erasure) compliance

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
  } else {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0])
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-CSRF-Token')

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Apply rate limiting
  const rateLimitOk = await applyRateLimit(req, res, strictRateLimit)
  if (!rateLimitOk) return

  // Apply CSRF protection
  const csrfOk = await requireCSRF(req, res)
  if (!csrfOk) return

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

    console.log(`Delete customer request from user: ${user.id}`)

    // ============================================
    // VALIDATE INPUT
    // ============================================
    const { customerId } = req.body

    if (!customerId) {
      return res.status(400).json({ error: 'Missing customerId' })
    }

    if (!customerId.startsWith('cus_')) {
      return res.status(400).json({ error: 'Invalid customer ID format' })
    }

    // ============================================
    // AUTHORIZATION: Verify customer belongs to user
    // ============================================
    const { data: subscription, error: dbError } = await supabase
      .from('user_subscriptions')
      .select('stripe_customer_id, user_id')
      .eq('user_id', user.id)
      .eq('stripe_customer_id', customerId)
      .single()

    if (dbError || !subscription) {
      console.error('Customer not found or does not belong to user:', dbError)
      return res.status(403).json({
        error: 'Forbidden - Customer not found or does not belong to you'
      })
    }

    console.log(`Authorized: Customer ${customerId} belongs to user ${user.id}`)

    // ============================================
    // DELETE CUSTOMER IN STRIPE (GDPR compliance)
    // ============================================
    console.log(`Deleting Stripe customer: ${customerId}`)

    const deletedCustomer = await stripe.customers.del(customerId)

    console.log(`✓ Customer deleted successfully:`, {
      id: deletedCustomer.id,
      deleted: deletedCustomer.deleted
    })

    // ============================================
    // SUCCESS RESPONSE
    // ============================================
    return res.status(200).json({
      success: true,
      message: 'Customer data deleted from Stripe',
      customer: {
        id: deletedCustomer.id,
        deleted: deletedCustomer.deleted
      }
    })

  } catch (error) {
    console.error('Delete customer error:', error)

    // Handle specific Stripe errors
    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({
        error: 'Invalid customer ID',
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
      error: 'Failed to delete customer',
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
