import { supabase, getCurrentUser } from '../lib/supabase'

/**
 * Audit Logging Service
 * Tracks critical user actions for security and compliance
 */

export const auditService = {
  /**
   * Log an action
   * @param {string} action - Action name (e.g., 'login_success', 'va_condition_created')
   * @param {string} resourceType - Type of resource (e.g., 'va_condition', 'resume')
   * @param {string} resourceId - ID of the resource
   * @param {object} details - Additional details about the action
   */
  async log(action, resourceType = null, resourceId = null, details = {}) {
    try {
      const user = await getCurrentUser()

      if (!user) return

      const { error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          details,
          user_agent: navigator.userAgent,
          created_at: new Date().toISOString()
        })

      if (error) {
        console.error('Audit log failed:', error)
      }
    } catch (err) {
      // Silently fail - don't break user experience if audit logging fails
      console.error('Audit logging error:', err)
    }
  },

  /**
   * Get recent activity for current user
   * @param {number} limit - Number of recent activities to fetch
   */
  async getRecentActivity(limit = 10) {
    try {
      const user = await getCurrentUser()
      if (!user) return []

      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching audit logs:', error)
        return []
      }

      return data || []
    } catch (err) {
      console.error('Error fetching recent activity:', err)
      return []
    }
  },

  /**
   * Format action name for display
   */
  formatAction(action) {
    const actionMap = {
      'login_success': 'Logged in',
      'logout': 'Logged out',
      'login_failed': 'Failed login attempt',
      'password_reset_requested': 'Requested password reset',
      'password_changed': 'Changed password',
      'va_condition_created': 'Created VA condition',
      'va_condition_updated': 'Updated VA condition',
      'va_condition_deleted': 'Deleted VA condition',
      'va_condition_viewed': 'Viewed VA claims',
      'appointment_created': 'Created appointment',
      'appointment_updated': 'Updated appointment',
      'appointment_deleted': 'Deleted appointment',
      'resume_created': 'Created resume',
      'resume_updated': 'Updated resume',
      'resume_deleted': 'Deleted resume',
      'resume_exported': 'Exported resume',
      'subscription_created': 'Created subscription',
      'subscription_canceled': 'Canceled subscription',
      'profile_updated': 'Updated profile',
      'account_deleted': 'Deleted account',
      'data_export_requested': 'Requested data export',
      'pdf_generated': 'Generated PDF',
      'checklist_exported': 'Exported checklist',
      'session_timeout': 'Session timed out'
    }

    return actionMap[action] || action
  }
}
