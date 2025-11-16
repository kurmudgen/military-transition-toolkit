// Input Validation and Sanitization Utility
// SECURITY FIX: PENTEST-006/007/008 - Comprehensive input validation

/**
 * Validation limits for different field types
 */
export const VALIDATION_LIMITS = {
  NAME: 100,
  EMAIL: 255,
  SHORT_TEXT: 500,
  LONG_TEXT: 5000,
  DESCRIPTION: 10000,
  PHONE: 20,
  URL: 2000,
  ZIP_CODE: 10
}

/**
 * Sanitize text input - removes potentially dangerous content
 * @param {string} input - Raw input text
 * @returns {string} - Sanitized text
 */
export function sanitizeText(input) {
  if (!input || typeof input !== 'string') return ''

  return input
    // Remove script tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove javascript: URLs
    .replace(/javascript:/gi, '')
    // Remove on* event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove data: URLs (can be used for XSS)
    .replace(/data:text\/html/gi, '')
    // Trim whitespace
    .trim()
}

/**
 * Validate string length
 * @param {string} text - Text to validate
 * @param {number} maxLength - Maximum allowed length
 * @param {string} fieldName - Name of field for error message
 * @returns {Object} - {valid: boolean, error: string}
 */
export function validateLength(text, maxLength, fieldName = 'Text') {
  if (!text) return { valid: true }

  if (typeof text !== 'string') {
    return { valid: false, error: `${fieldName} must be text` }
  }

  if (text.length > maxLength) {
    return {
      valid: false,
      error: `${fieldName} exceeds maximum length of ${maxLength} characters`
    }
  }

  return { valid: true }
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {Object} - {valid: boolean, error: string}
 */
export function validateEmail(email) {
  if (!email) {
    return { valid: false, error: 'Email is required' }
  }

  if (typeof email !== 'string') {
    return { valid: false, error: 'Email must be text' }
  }

  // Length check
  if (email.length > VALIDATION_LIMITS.EMAIL) {
    return { valid: false, error: 'Email is too long' }
  }

  // Basic RFC 5322 format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }

  // Check for common typos
  const domain = email.split('@')[1]?.toLowerCase()
  const suspiciousDomains = ['gmial.com', 'gmai.com', 'yahooo.com', 'hotmial.com']
  if (suspiciousDomains.includes(domain)) {
    return {
      valid: false,
      error: `Did you mean ${domain.replace('mial', 'mail').replace('ooo', 'oo')}?`
    }
  }

  return { valid: true }
}

/**
 * Validate phone number (flexible format)
 * @param {string} phone - Phone number
 * @returns {Object} - {valid: boolean, error: string}
 */
export function validatePhone(phone) {
  if (!phone) return { valid: true } // Phone is optional in most cases

  // Remove formatting characters
  const digitsOnly = phone.replace(/[\s\-\(\)\.]/g, '')

  // Check if only digits remain
  if (!/^\d+$/.test(digitsOnly)) {
    return { valid: false, error: 'Phone number can only contain digits' }
  }

  // US phone numbers should be 10 digits
  if (digitsOnly.length !== 10 && digitsOnly.length !== 11) {
    return { valid: false, error: 'Phone number should be 10-11 digits' }
  }

  return { valid: true }
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {Object} - {valid: boolean, error: string}
 */
export function validateURL(url) {
  if (!url) return { valid: true } // URL is optional in most cases

  try {
    const urlObj = new URL(url)
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { valid: false, error: 'URL must use http or https protocol' }
    }
    return { valid: true }
  } catch (e) {
    return { valid: false, error: 'Invalid URL format' }
  }
}

/**
 * Validate VA condition data
 * @param {Object} data - VA condition object
 * @returns {Object} - {valid: boolean, errors: Array, sanitizedData: Object}
 */
export function validateVACondition(data) {
  const errors = []
  const sanitized = { ...data }

  // Required fields
  if (!data.name) {
    errors.push('Condition name is required')
  } else {
    const lengthCheck = validateLength(data.name, VALIDATION_LIMITS.SHORT_TEXT, 'Condition name')
    if (!lengthCheck.valid) errors.push(lengthCheck.error)
    sanitized.name = sanitizeText(data.name)
  }

  if (!data.rating) {
    errors.push('Rating is required')
  } else if (typeof data.rating !== 'number' || data.rating < 0 || data.rating > 100) {
    errors.push('Rating must be between 0 and 100')
  }

  // Optional fields
  if (data.description) {
    const lengthCheck = validateLength(data.description, VALIDATION_LIMITS.LONG_TEXT, 'Description')
    if (!lengthCheck.valid) errors.push(lengthCheck.error)
    sanitized.description = sanitizeText(data.description)
  }

  if (data.symptoms) {
    const lengthCheck = validateLength(data.symptoms, VALIDATION_LIMITS.LONG_TEXT, 'Symptoms')
    if (!lengthCheck.valid) errors.push(lengthCheck.error)
    sanitized.symptoms = sanitizeText(data.symptoms)
  }

  if (data.treatment) {
    const lengthCheck = validateLength(data.treatment, VALIDATION_LIMITS.LONG_TEXT, 'Treatment history')
    if (!lengthCheck.valid) errors.push(lengthCheck.error)
    sanitized.treatment = sanitizeText(data.treatment)
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitizedData: sanitized
  }
}

/**
 * Validate resume data
 * @param {Object} data - Resume object
 * @returns {Object} - {valid: boolean, errors: Array, sanitizedData: Object}
 */
export function validateResumeData(data) {
  const errors = []
  const sanitized = { ...data }

  // Validate name
  if (data.name) {
    const lengthCheck = validateLength(data.name, VALIDATION_LIMITS.NAME, 'Name')
    if (!lengthCheck.valid) errors.push(lengthCheck.error)
    sanitized.name = sanitizeText(data.name)
  }

  // Validate email
  if (data.email) {
    const emailCheck = validateEmail(data.email)
    if (!emailCheck.valid) errors.push(emailCheck.error)
    sanitized.email = data.email.toLowerCase().trim()
  }

  // Validate phone
  if (data.phone) {
    const phoneCheck = validatePhone(data.phone)
    if (!phoneCheck.valid) errors.push(phoneCheck.error)
    sanitized.phone = data.phone.trim()
  }

  // Validate summary
  if (data.summary) {
    const lengthCheck = validateLength(data.summary, VALIDATION_LIMITS.LONG_TEXT, 'Summary')
    if (!lengthCheck.valid) errors.push(lengthCheck.error)
    sanitized.summary = sanitizeText(data.summary)
  }

  // Validate URLs
  if (data.linkedin) {
    const urlCheck = validateURL(data.linkedin)
    if (!urlCheck.valid) errors.push('LinkedIn: ' + urlCheck.error)
  }

  if (data.portfolio) {
    const urlCheck = validateURL(data.portfolio)
    if (!urlCheck.valid) errors.push('Portfolio: ' + urlCheck.error)
  }

  // Sanitize all string fields
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string' && key !== 'email' && key !== 'phone') {
      sanitized[key] = sanitizeText(sanitized[key])
    }
  })

  return {
    valid: errors.length === 0,
    errors,
    sanitizedData: sanitized
  }
}

/**
 * Validate job application data
 * @param {Object} data - Job application object
 * @returns {Object} - {valid: boolean, errors: Array, sanitizedData: Object}
 */
export function validateJobApplication(data) {
  const errors = []
  const sanitized = { ...data }

  if (!data.company) {
    errors.push('Company name is required')
  } else {
    const lengthCheck = validateLength(data.company, VALIDATION_LIMITS.SHORT_TEXT, 'Company name')
    if (!lengthCheck.valid) errors.push(lengthCheck.error)
    sanitized.company = sanitizeText(data.company)
  }

  if (!data.position) {
    errors.push('Position is required')
  } else {
    const lengthCheck = validateLength(data.position, VALIDATION_LIMITS.SHORT_TEXT, 'Position')
    if (!lengthCheck.valid) errors.push(lengthCheck.error)
    sanitized.position = sanitizeText(data.position)
  }

  if (data.notes) {
    const lengthCheck = validateLength(data.notes, VALIDATION_LIMITS.LONG_TEXT, 'Notes')
    if (!lengthCheck.valid) errors.push(lengthCheck.error)
    sanitized.notes = sanitizeText(data.notes)
  }

  if (data.url) {
    const urlCheck = validateURL(data.url)
    if (!urlCheck.valid) errors.push(urlCheck.error)
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitizedData: sanitized
  }
}

/**
 * Prevent common injection attacks
 * @param {string} input - User input to check
 * @returns {Object} - {safe: boolean, threat: string}
 */
export function detectInjectionAttempt(input) {
  if (!input || typeof input !== 'string') return { safe: true }

  const threats = [
    { pattern: /<script/i, type: 'XSS' },
    { pattern: /javascript:/i, type: 'XSS' },
    { pattern: /on\w+\s*=/i, type: 'XSS' },
    { pattern: /union\s+select/i, type: 'SQL Injection' },
    { pattern: /drop\s+table/i, type: 'SQL Injection' },
    { pattern: /insert\s+into/i, type: 'SQL Injection' },
    { pattern: /delete\s+from/i, type: 'SQL Injection' },
    { pattern: /\.\.\//g, type: 'Path Traversal' },
    { pattern: /\$\{.*\}/g, type: 'Template Injection' }
  ]

  for (const threat of threats) {
    if (threat.pattern.test(input)) {
      console.warn(`🚨 Injection attempt detected: ${threat.type}`)
      return { safe: false, threat: threat.type }
    }
  }

  return { safe: true }
}
