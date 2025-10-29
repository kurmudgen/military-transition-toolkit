import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for server-side
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
    // Use ONLY verified user ID and email from token
    // DO NOT accept userId or email from request body
    // ============================================
    const userId = user.id
    const email = user.email

    // Only accept priceId from request body
    const { priceId } = req.body

    if (!priceId) {
      return res.status(400).json({ error: 'Missing priceId' })
    }

    // Check if customer already exists
    const { data: existingSub } = await supabase
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single()

    let customerId = existingSub?.stripe_customer_id

    // Create new customer if none exists
    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: {
          supabase_user_id: userId
        }
      })
      customerId = customer.id
    }

    // Create checkout session
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
      success_url: `${process.env.VITE_APP_URL || req.headers.origin}/app/account?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_APP_URL || req.headers.origin}/pricing`,
      metadata: {
        supabase_user_id: userId
      },
      subscription_data: {
        metadata: {
          supabase_user_id: userId
        }
      }
    })

    return res.status(200).json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout session creation error:', error)
    return res.status(500).json({ error: error.message })
  }
}
