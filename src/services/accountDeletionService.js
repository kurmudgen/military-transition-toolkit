import { supabase, getCurrentUser } from '../lib/supabase'
import { auditService } from './auditService'

/**
 * Account Deletion Service
 * Implements GDPR/HIPAA-style right to deletion
 */

export const accountDeletionService = {
  /**
   * Completely delete user account and all associated data
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async deleteAccount() {
    try {
      const user = await getCurrentUser()
      if (!user) {
        return { success: false, error: 'Not authenticated' }
      }

      // Log the deletion attempt
      await auditService.log('account_deletion_initiated')

      // Cancel Stripe subscription if exists
      try {
        const { data: subscription } = await supabase
          .from('user_subscriptions')
          .select('stripe_subscription_id')
          .eq('user_id', user.id)
          .single()

        if (subscription?.stripe_subscription_id) {
          // Call Stripe cancel endpoint
          const response = await fetch('/api/stripe/cancel-subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session.access_token}`
            },
            body: JSON.stringify({
              subscriptionId: subscription.stripe_subscription_id
            })
          })

          if (!response.ok) {
            console.error('Failed to cancel Stripe subscription')
          }
        }
      } catch (subError) {
        console.error('Error canceling subscription:', subError)
        // Continue with deletion even if subscription cancellation fails
      }

      // Delete from all tables (RLS will restrict to user's own data)
      // Order matters: delete child records before parents
      const tables = [
        'va_evidence',        // Child of va_conditions
        'va_conditions',
        'appointments',
        'resumes',
        'job_applications',
        'saved_jobs',
        'checklist_progress',
        'state_comparisons',
        'custom_resources',
        'resource_ratings',
        'audit_logs',
        'user_subscriptions',
        'user_profiles'
      ]

      console.log('Deleting user data from all tables...')

      for (const table of tables) {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq('user_id', user.id)

        if (error) {
          console.error(`Error deleting from ${table}:`, error)
          // Continue with other tables even if one fails
        } else {
          console.log(`✓ Deleted from ${table}`)
        }
      }

      // Sign out the user
      await supabase.auth.signOut()

      console.log('✓ Account deletion complete')

      return { success: true }
    } catch (error) {
      console.error('Account deletion failed:', error)
      return {
        success: false,
        error: error.message || 'Failed to delete account'
      }
    }
  },

  /**
   * Estimate the amount of data that will be deleted
   * @returns {Promise<{totalItems: number, breakdown: object}>}
   */
  async estimateDataDeletion() {
    try {
      const user = await getCurrentUser()
      if (!user) return { totalItems: 0, breakdown: {} }

      const tables = [
        { name: 'va_conditions', label: 'VA Conditions' },
        { name: 'appointments', label: 'Appointments' },
        { name: 'resumes', label: 'Resumes' },
        { name: 'job_applications', label: 'Job Applications' },
        { name: 'saved_jobs', label: 'Saved Jobs' },
        { name: 'checklist_progress', label: 'Checklist Progress' }
      ]

      const breakdown = {}
      let totalItems = 0

      for (const table of tables) {
        const { count, error } = await supabase
          .from(table.name)
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)

        if (!error && count !== null) {
          breakdown[table.label] = count
          totalItems += count
        }
      }

      return { totalItems, breakdown }
    } catch (error) {
      console.error('Error estimating data deletion:', error)
      return { totalItems: 0, breakdown: {} }
    }
  }
}
