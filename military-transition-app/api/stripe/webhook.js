import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.SUPABASE_URL,  // ✅ FIXED: Use SUPABASE_URL not VITE_SUPABASE_URL
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Helper to map Stripe price ID to plan ID
const getPlanIdFromPriceId = (priceId) => {
  // ✅ FIXED: Use backend environment variables
  if (priceId === process.env.STRIPE_PRICE_MONTHLY) {
    return 'premium_monthly'
  } else if (priceId === process.env.STRIPE_PRICE_ANNUAL) {
    return 'premium_annual'
  } else if (priceId === process.env.STRIPE_PRICE_LIFETIME) {
    return 'premium_lifetime'
  }
  return 'free'
}

// Disable body parsing, need raw body for signature verification
export const config = {
  api: {
    bodyParser: false
  }
}

// Helper to read raw body
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let event

  try {
    // Get raw body for signature verification
    const rawBody = await getRawBody(req)
    const signature = req.headers['stripe-signature']

    // ✅ CRITICAL: Verify webhook signature to prevent fake payments
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: `Webhook Error: ${err.message}` })
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata.supabase_user_id

        if (!userId) {
          console.error('No user ID in session metadata')
          break
        }

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(session.subscription)
        const priceId = subscription.items.data[0].price.id
        const planId = getPlanIdFromPriceId(priceId)

        // Update or create user subscription
        const { error } = await supabase
          .from('user_subscriptions')
          .upsert({
            user_id: userId,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            plan_id: planId,
            status: 'active',
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: false
          })

        if (error) {
          console.error('❌ Database error:', error)
        } else {
          console.log(`✅ Subscription created for user ${userId}`)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        let userId = subscription.metadata.supabase_user_id

        if (!userId) {
          // Try to find user by customer ID
          const { data: existingSub } = await supabase
            .from('user_subscriptions')
            .select('user_id')
            .eq('stripe_customer_id', subscription.customer)
            .single()

          if (!existingSub) {
            console.error('No user found for subscription update')
            break
          }
          
          userId = existingSub.user_id
        }

        const priceId = subscription.items.data[0].price.id
        const planId = getPlanIdFromPriceId(priceId)

        // Update subscription
        const { error } = await supabase
          .from('user_subscriptions')
          .update({
            plan_id: planId,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) {
          console.error('❌ Database error:', error)
        } else {
          console.log(`✅ Subscription updated: ${subscription.id}`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object

        // Update subscription to cancelled
        const { error } = await supabase
          .from('user_subscriptions')
          .update({
            status: 'cancelled',
            plan_id: 'free'
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) {
          console.error('❌ Database error:', error)
        } else {
          console.log(`✅ Subscription cancelled: ${subscription.id}`)
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        console.log(`✅ Payment succeeded for invoice: ${invoice.id}`)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object

        // Update subscription status
        const { error } = await supabase
          .from('user_subscriptions')
          .update({
            status: 'past_due'
          })
          .eq('stripe_customer_id', invoice.customer)

        if (error) {
          console.error('❌ Database error:', error)
        } else {
          console.log(`❌ Payment failed for invoice: ${invoice.id}`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return res.status(500).json({ error: error.message })
  }
}
