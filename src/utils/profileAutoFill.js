// Utility functions for auto-filling forms with profile data

/**
 * Get user profile data from localStorage
 * @returns {Object} User profile data
 */
export const getProfileData = () => {
  try {
    const profileData = localStorage.getItem('userProfile')
    return profileData ? JSON.parse(profileData) : {}
  } catch (error) {
    console.error('Error loading profile data:', error)
    return {}
  }
}

/**
 * Get user's full name from profile
 * @returns {string} Full name or empty string
 */
export const getFullName = () => {
  const profile = getProfileData()
  const firstName = profile.firstName || ''
  const lastName = profile.lastName || ''
  return `${firstName} ${lastName}`.trim()
}

/**
 * Get user's contact information
 * @returns {Object} Contact info (email, phone)
 */
export const getContactInfo = () => {
  const profile = getProfileData()
  return {
    email: profile.email || '',
    phone: profile.phone || '',
    preferredContact: profile.preferredContact || 'email'
  }
}

/**
 * Get user's service information
 * @returns {Object} Service info
 */
export const getServiceInfo = () => {
  const profile = getProfileData()
  return {
    branch: profile.branch || '',
    rank: profile.rank || '',
    mos: profile.mos || '',
    yearsOfService: profile.yearsOfService || '',
    separationDate: profile.separationDate || '',
    separationType: profile.separationType || ''
  }
}

/**
 * Get user's location information
 * @returns {Object} Location info
 */
export const getLocationInfo = () => {
  const profile = getProfileData()
  return {
    currentLocation: profile.currentLocation || '',
    targetLocation: profile.targetLocation || ''
  }
}

/**
 * Check if profile has essential data
 * @returns {boolean} True if profile has at least name and email
 */
export const hasProfileData = () => {
  const profile = getProfileData()
  return !!(profile.firstName || profile.lastName || profile.email)
}

/**
 * Auto-fill form data with profile information
 * @param {Object} currentFormData - Current form state
 * @param {Array} fieldsToFill - Array of field mappings {formField: 'fieldName', profileField: 'profileFieldName'}
 * @returns {Object} Updated form data
 */
export const autoFillForm = (currentFormData, fieldsToFill) => {
  const profile = getProfileData()
  const updatedData = { ...currentFormData }

  fieldsToFill.forEach(({ formField, profileField }) => {
    if (profile[profileField]) {
      updatedData[formField] = profile[profileField]
    }
  })

  return updatedData
}

/**
 * Auto-fill common form fields
 * @param {Object} currentFormData - Current form state
 * @returns {Object} Updated form data with common fields filled
 */
export const autoFillCommonFields = (currentFormData) => {
  const profile = getProfileData()
  const updatedData = { ...currentFormData }

  // Map common field names
  const fieldMappings = {
    name: getFullName(),
    fullName: getFullName(),
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    branch: profile.branch,
    rank: profile.rank,
    mos: profile.mos,
    separationDate: profile.separationDate,
    currentLocation: profile.currentLocation,
    targetLocation: profile.targetLocation
  }

  // Only update fields that exist in the form and are currently empty
  Object.keys(fieldMappings).forEach(field => {
    if (field in updatedData && !updatedData[field] && fieldMappings[field]) {
      updatedData[field] = fieldMappings[field]
    }
  })

  return updatedData
}
