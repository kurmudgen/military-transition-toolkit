/**
 * Profile Validation Utilities
 * Prevents white screen crashes from incomplete profile data
 */

/**
 * Check if user profile data is complete
 * @param {Object} profile - User profile object from localStorage or Supabase
 * @returns {Object} { isComplete: boolean, missing: string[] }
 */
export function validateProfileCompleteness(profile) {
  if (!profile) {
    return {
      isComplete: false,
      missing: ['profile'],
      reason: 'No profile data found'
    }
  }

  const missing = []

  // Check required fields
  if (!profile.situation || profile.situation === '') {
    missing.push('situation')
  }

  if (!profile.separationDate || profile.separationDate === '') {
    missing.push('separationDate')
  }

  if (!profile.name || profile.name === '') {
    missing.push('name')
  }

  return {
    isComplete: missing.length === 0,
    missing,
    reason: missing.length > 0
      ? `Missing required fields: ${missing.join(', ')}`
      : null
  }
}

/**
 * Get user profile from localStorage with safety checks
 * @returns {Object|null} User profile or null if invalid
 */
export function getProfileFromLocalStorage() {
  try {
    const saved = localStorage.getItem('userSetup')
    if (!saved) {
      console.log('📋 No userSetup found in localStorage')
      return null
    }

    const profile = JSON.parse(saved)

    // Ensure all fields exist (even if empty)
    return {
      situation: profile.situation || '',
      separationDate: profile.separationDate || '',
      name: profile.name || ''
    }
  } catch (error) {
    console.error('❌ Error parsing userSetup from localStorage:', error)
    // Clear corrupted data
    localStorage.removeItem('userSetup')
    return null
  }
}

/**
 * Save user profile to localStorage with validation
 * @param {Object} profile - Profile data to save
 * @returns {boolean} Success status
 */
export function saveProfileToLocalStorage(profile) {
  try {
    // Validate before saving
    if (!profile) {
      console.warn('⚠️ Attempted to save null profile')
      return false
    }

    // Ensure all required fields exist
    const safeProfile = {
      situation: profile.situation || '',
      separationDate: profile.separationDate || '',
      name: profile.name || ''
    }

    localStorage.setItem('userSetup', JSON.stringify(safeProfile))
    console.log('✅ Profile saved to localStorage')
    return true
  } catch (error) {
    console.error('❌ Error saving profile to localStorage:', error)
    return false
  }
}

/**
 * Check if separation date is valid
 * @param {string} dateString - Date string to validate
 * @returns {boolean} Whether date is valid
 */
export function isValidSeparationDate(dateString) {
  if (!dateString || dateString === '') {
    return false
  }

  const date = new Date(dateString)

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return false
  }

  // Check if date is in a reasonable range (past 1970, before 2100)
  const year = date.getFullYear()
  if (year < 1970 || year > 2100) {
    return false
  }

  return true
}

/**
 * Get safe days until separation (returns null if date invalid)
 * @param {string} separationDate - Separation date string
 * @returns {number|null} Days until separation or null
 */
export function getSafeDaysUntilSeparation(separationDate) {
  if (!isValidSeparationDate(separationDate)) {
    return null
  }

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const targetDate = new Date(separationDate)
    targetDate.setHours(0, 0, 0, 0)

    const diffTime = targetDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  } catch (error) {
    console.error('Error calculating days until separation:', error)
    return null
  }
}

/**
 * Get display name with fallback
 * @param {string} name - User's name
 * @returns {string} Name or fallback
 */
export function getSafeDisplayName(name) {
  if (!name || name.trim() === '') {
    return 'Service Member'
  }
  return name.trim()
}

/**
 * Clean up corrupted profile data
 */
export function cleanupCorruptedProfile() {
  console.log('🧹 Cleaning up potentially corrupted profile data')

  try {
    const profile = getProfileFromLocalStorage()

    // If profile exists but is incomplete, clear it
    if (profile) {
      const validation = validateProfileCompleteness(profile)
      if (!validation.isComplete) {
        console.warn('⚠️ Incomplete profile found, clearing:', validation.missing)
        localStorage.removeItem('userSetup')
        return false
      }
      return true
    }

    return false
  } catch (error) {
    console.error('Error during profile cleanup:', error)
    localStorage.removeItem('userSetup')
    return false
  }
}

/**
 * Migrate old profile format to new format (if needed)
 * @param {Object} oldProfile - Old profile format
 * @returns {Object} New profile format
 */
export function migrateProfileFormat(oldProfile) {
  if (!oldProfile) return null

  // Handle various old formats
  return {
    situation: oldProfile.situation || oldProfile.status || '',
    separationDate: oldProfile.separationDate || oldProfile.date || '',
    name: oldProfile.name || oldProfile.displayName || oldProfile.userName || ''
  }
}

/**
 * Safe profile loader that won't crash the app
 * @returns {Object} { profile: Object|null, needsSetup: boolean }
 */
export function loadProfileSafely() {
  try {
    let profile = getProfileFromLocalStorage()

    // Try migration if profile exists but in old format
    if (profile) {
      profile = migrateProfileFormat(profile)
      saveProfileToLocalStorage(profile)
    }

    const validation = validateProfileCompleteness(profile)

    return {
      profile: validation.isComplete ? profile : null,
      needsSetup: !validation.isComplete,
      validation
    }
  } catch (error) {
    console.error('❌ Critical error loading profile:', error)
    return {
      profile: null,
      needsSetup: true,
      validation: {
        isComplete: false,
        missing: ['all'],
        reason: 'Failed to load profile'
      }
    }
  }
}
