import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // ============================================
    // SECURITY: Verify JWT token from Authorization header
    // ============================================
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' })
    }

    const token = authHeader.split(' ')[1]

    // Verify JWT with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      console.error('Authentication failed:', authError)
      return res.status(401).json({ error: 'Unauthorized - Invalid token' })
    }

    // ============================================
    // Use ONLY verified user ID from token
    // DO NOT accept userId from request body
    // ============================================
    const userId = user.id

    // Get customer ID from subscription
    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single()

    if (error || !subscription?.stripe_customer_id) {
      return res.status(404).json({ error: 'No subscription found' })
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${process.env.VITE_APP_URL || req.headers.origin}/app/account`
    })

    return res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Portal session creation error:', error)
    return res.status(500).json({ error: error.message })
  }
}
