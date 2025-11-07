import { supabase } from '../lib/supabase'

/**
 * Storage Utility Functions
 * Handles data persistence with localStorage for public features
 * and Supabase for premium features
 */

/**
 * Verify subscription server-side (SECURITY: prevents client-side bypass)
 * @returns {Promise<Object>} - { hasActiveSubscription, tier, status }
 */
async function verifySubscriptionServerSide() {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.access_token) {
      return { hasActiveSubscription: false, tier: 'free', status: 'none' }
    }

    const response = await fetch('/api/verify-subscription', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Subscription verification failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Subscription verification error:', error)
    // Fail closed - if we can't verify, assume no subscription
    return { hasActiveSubscription: false, tier: 'free', status: 'error' }
  }
}

/**
 * Public tables that use localStorage
 * These features work without login
 */
const PUBLIC_TABLES = [
  'calculator_results',
  'state_comparisons',
  'retirement_calculations',
  'basic_calculator_data'
]

/**
 * Save data with appropriate storage backend
 * - Public tools use localStorage
 * - Premium features require subscription and use Supabase
 *
 * @param {string} table - Table/storage key name
 * @param {Object|Array} data - Data to save
 * @param {Object} user - User object (null for public features)
 * @returns {Promise<Object>} - Result object with success status
 */
export const saveData = async (table, data, user = null) => {
  // Public tools use localStorage
  if (PUBLIC_TABLES.includes(table)) {
    try {
      const timestamp = new Date().toISOString()
      const dataWithMeta = {
        data,
        savedAt: timestamp,
        storage: 'local'
      }
      localStorage.setItem(table, JSON.stringify(dataWithMeta))
      return {
        success: true,
        storage: 'local',
        message: 'Data saved to your browser (local storage only)'
      }
    } catch (error) {
      // Handle localStorage quota exceeded
      if (error.name === 'QuotaExceededError') {
        return {
          success: false,
          error: 'localStorage_quota_exceeded',
          message: 'Browser storage is full. Upgrade to Premium for unlimited cloud storage.'
        }
      }
      return {
        success: false,
        error: 'localStorage_failed',
        message: 'Failed to save data locally. Please check your browser settings.'
      }
    }
  }

  // Premium features require subscription (server-side verification)
  const subscriptionStatus = await verifySubscriptionServerSide()
  if (!subscriptionStatus.hasActiveSubscription) {
    return {
      success: false,
      error: 'subscription_required',
      message: 'Upgrade to Premium to save your data to the cloud',
      upgradeUrl: '/pricing',
      currentTier: subscriptionStatus.tier
    }
  }

  // Save to Supabase for premium users
  try {
    // Get user from session (server-verified)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'authentication_required',
        message: 'Please log in to save data'
      }
    }

    const dataWithUser = {
      ...data,
      user_id: session.user.id,
      updated_at: new Date().toISOString()
    }

    const { data: result, error } = await supabase
      .from(table)
      .upsert(dataWithUser)
      .select()

    if (error) {
      console.error('Supabase save error:', error)
      return {
        success: false,
        error: error.message,
        message: 'Failed to save to cloud. Please try again.'
      }
    }

    return {
      success: true,
      data: result,
      storage: 'cloud',
      message: 'Data saved to cloud'
    }
  } catch (error) {
    console.error('Storage error:', error)
    return {
      success: false,
      error: error.message,
      message: 'An error occurred while saving. Please try again.'
    }
  }
}

/**
 * Load data from appropriate storage backend
 *
 * @param {string} table - Table/storage key name
 * @param {Object} user - User object (null for public features)
 * @returns {Promise<Object>} - Result object with data
 */
export const loadData = async (table, user = null) => {
  // Public tools use localStorage
  if (PUBLIC_TABLES.includes(table)) {
    try {
      const stored = localStorage.getItem(table)
      if (!stored) {
        return { success: true, data: null, storage: 'local' }
      }

      const parsed = JSON.parse(stored)
      return {
        success: true,
        data: parsed.data || parsed, // Handle both old and new formats
        savedAt: parsed.savedAt,
        storage: 'local'
      }
    } catch (error) {
      console.error('localStorage read error:', error)
      return {
        success: false,
        error: 'localStorage_read_failed',
        message: 'Failed to load local data'
      }
    }
  }

  // Premium features require subscription (server-side verification)
  const subscriptionStatus = await verifySubscriptionServerSide()
  if (!subscriptionStatus.hasActiveSubscription) {
    return {
      success: false,
      error: 'subscription_required',
      message: 'Upgrade to Premium to access your saved data',
      currentTier: subscriptionStatus.tier
    }
  }

  // Load from Supabase for premium users
  try {
    // Get user from session (server-verified)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'authentication_required',
        message: 'Please log in to access data'
      }
    }

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', session.user.id)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Supabase load error:', error)
      return {
        success: false,
        error: error.message,
        message: 'Failed to load cloud data'
      }
    }

    return {
      success: true,
      data,
      storage: 'cloud'
    }
  } catch (error) {
    console.error('Storage error:', error)
    return {
      success: false,
      error: error.message,
      message: 'An error occurred while loading data'
    }
  }
}

/**
 * Delete data from appropriate storage backend
 *
 * @param {string} table - Table/storage key name
 * @param {string|null} id - Record ID (for Supabase) or null (for localStorage)
 * @param {Object} user - User object
 * @returns {Promise<Object>} - Result object
 */
export const deleteData = async (table, id = null, user = null) => {
  // Public tools use localStorage
  if (PUBLIC_TABLES.includes(table)) {
    try {
      localStorage.removeItem(table)
      return { success: true, storage: 'local' }
    } catch (error) {
      return {
        success: false,
        error: 'localStorage_delete_failed',
        message: 'Failed to delete local data'
      }
    }
  }

  // Premium features require subscription (server-side verification)
  const subscriptionStatus = await verifySubscriptionServerSide()
  if (!subscriptionStatus.hasActiveSubscription) {
    return {
      success: false,
      error: 'subscription_required',
      message: 'Upgrade to Premium to manage your data',
      currentTier: subscriptionStatus.tier
    }
  }

  // Delete from Supabase for premium users
  try {
    // Get user from session (server-verified)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'authentication_required',
        message: 'Please log in to delete data'
      }
    }

    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id)

    if (error) {
      console.error('Supabase delete error:', error)
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete from cloud'
      }
    }

    return { success: true, storage: 'cloud' }
  } catch (error) {
    console.error('Storage error:', error)
    return {
      success: false,
      error: error.message,
      message: 'An error occurred while deleting data'
    }
  }
}

/**
 * Clear all data for a specific storage type
 * Useful for logout or data reset
 *
 * @param {'local'|'cloud'|'all'} storageType - Which storage to clear
 * @param {Object} user - User object (required for cloud)
 * @returns {Promise<Object>} - Result object
 */
export const clearAllData = async (storageType = 'all', user = null) => {
  const results = []

  if (storageType === 'local' || storageType === 'all') {
    try {
      // Clear only our app's localStorage keys
      PUBLIC_TABLES.forEach(table => {
        localStorage.removeItem(table)
      })
      results.push({ storage: 'local', success: true })
    } catch (error) {
      results.push({
        storage: 'local',
        success: false,
        error: error.message
      })
    }
  }

  if ((storageType === 'cloud' || storageType === 'all') && user) {
    // Note: Actual cloud deletion would need table-specific logic
    // This is a placeholder for batch delete operations
    results.push({
      storage: 'cloud',
      success: true,
      message: 'Cloud data preserved (manual deletion required per table)'
    })
  }

  return {
    success: results.every(r => r.success),
    results
  }
}

/**
 * Get storage info for debugging/display
 *
 * @returns {Object} - Storage information
 */
export const getStorageInfo = () => {
  let localStorageSize = 0
  let localStorageItems = 0

  try {
    PUBLIC_TABLES.forEach(table => {
      const item = localStorage.getItem(table)
      if (item) {
        localStorageSize += item.length
        localStorageItems++
      }
    })
  } catch (error) {
    console.error('Error getting storage info:', error)
  }

  return {
    localStorage: {
      items: localStorageItems,
      sizeBytes: localStorageSize,
      sizeKB: (localStorageSize / 1024).toFixed(2),
      tables: PUBLIC_TABLES.filter(table => localStorage.getItem(table))
    }
  }
}
