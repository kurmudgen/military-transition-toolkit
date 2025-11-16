import { supabase, getCurrentUser } from '../lib/supabase'

/**
 * Get current user's subscription details
 */
export const getUserSubscription = async () => {
  try {
    const user = await getCurrentUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "no rows returned", which is fine
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return null
  }
}

/**
 * Create Stripe checkout session
 * @param {string} priceId - Stripe price ID
 * @param {string} csrfToken - CSRF token for security (PENTEST-002 fix)
 */
export const createCheckoutSession = async (priceId, csrfToken) => {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('No authenticated user')

    // Get session token for Authorization header
    const session = await supabase.auth.getSession()
    const token = session.data.session?.access_token

    if (!token) {
      throw new Error('No valid session token')
    }

    // 🔒 SECURITY: CSRF token required (PENTEST-002 fix)
    if (!csrfToken) {
      throw new Error('CSRF token required for checkout')
    }

    // Call backend API to create checkout session
    // Backend will extract userId and email from verified JWT token
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({
        priceId
        // userId and email are extracted from JWT token on backend
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create checkout session')
    }

    const { url } = await response.json()
    return url
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

/**
 * Create Stripe customer portal session
 * @param {string} csrfToken - CSRF token for security (PENTEST-002 fix)
 */
export const createCustomerPortalSession = async (csrfToken) => {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('No authenticated user')

    // Get session token for Authorization header
    const session = await supabase.auth.getSession()
    const token = session.data.session?.access_token

    if (!token) {
      throw new Error('No valid session token')
    }

    // 🔒 SECURITY: CSRF token required (PENTEST-002 fix)
    if (!csrfToken) {
      throw new Error('CSRF token required for portal access')
    }

    console.log('Calling create-portal-session API...')

    // Call backend API to create portal session
    // Backend will extract userId from verified JWT token
    const response = await fetch('/api/stripe/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({
        // userId is extracted from JWT token on backend
      })
    })

    console.log('API response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API error response:', errorData)
      throw new Error(errorData.details || errorData.error || 'Failed to create portal session')
    }

    const { url } = await response.json()
    console.log('Portal URL received:', url ? 'Yes' : 'No')

    if (!url) {
      throw new Error('No portal URL returned from API')
    }

    return url
  } catch (error) {
    console.error('Error creating portal session:', error)
    throw error
  }
}

/**
 * Check if user has active premium subscription
 */
export const hasActivePremiumSubscription = async () => {
  try {
    const subscription = await getUserSubscription()

    if (!subscription) return false

    return (
      subscription.status === 'active' &&
      (subscription.plan_id === 'premium_monthly' || subscription.plan_id === 'premium_annual')
    )
  } catch (error) {
    console.error('Error checking premium status:', error)
    return false
  }
}

/**
 * Update user subscription (called by webhook)
 * This should only be called from your backend webhook handler
 */
export const updateSubscription = async (userId, subscriptionData) => {
  try {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .upsert({
        user_id: userId,
        stripe_customer_id: subscriptionData.customerId,
        stripe_subscription_id: subscriptionData.subscriptionId,
        plan_id: subscriptionData.planId,
        status: subscriptionData.status,
        current_period_start: subscriptionData.currentPeriodStart,
        current_period_end: subscriptionData.currentPeriodEnd,
        cancel_at_period_end: subscriptionData.cancelAtPeriodEnd || false
      })
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error('Error updating subscription:', error)
    throw error
  }
}
