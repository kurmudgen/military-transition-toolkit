// Production-Safe Logger
// SECURITY FIX: PENTEST-008 - Prevents PHI leakage in logs

const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD

/**
 * Patterns to detect and redact PHI/PII
 */
const PHI_PATTERNS = {
  SSN: /\b\d{3}-\d{2}-\d{4}\b/g,
  EMAIL: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  PHONE: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
  CREDIT_CARD: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
  DATE_OF_BIRTH: /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12]\d|3[01])[\/\-](19|20)\d{2}\b/g
}

/**
 * Fields that may contain PHI and should be redacted
 */
const PHI_FIELDS = [
  'condition_name',
  'symptoms',
  'treatment_history',
  'incident_description',
  'notes',
  'diagnosis',
  'medical_history',
  'medications',
  'email',
  'name',
  'phone',
  'ssn',
  'address',
  'password',
  'token',
  'api_key'
]

/**
 * Redact PHI/PII from string
 * @param {string} str - String to redact
 * @returns {string} - Redacted string
 */
function redactString(str) {
  if (typeof str !== 'string') return str

  let redacted = str

  // Redact patterns
  Object.entries(PHI_PATTERNS).forEach(([type, pattern]) => {
    redacted = redacted.replace(pattern, `[${type} REDACTED]`)
  })

  return redacted
}

/**
 * Recursively redact PHI from object
 * @param {any} obj - Object to redact
 * @returns {any} - Redacted object
 */
function redactObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return typeof obj === 'string' ? redactString(obj) : obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => redactObject(item))
  }

  const redacted = {}
  for (const [key, value] of Object.entries(obj)) {
    // Check if key is PHI field
    if (PHI_FIELDS.includes(key)) {
      redacted[key] = '[REDACTED]'
    } else if (typeof value === 'string') {
      redacted[key] = redactString(value)
    } else if (typeof value === 'object' && value !== null) {
      redacted[key] = redactObject(value)
    } else {
      redacted[key] = value
    }
  }

  return redacted
}

/**
 * Production-safe logger
 */
export const logger = {
  /**
   * Log info message (development only)
   * @param {string} message - Log message
   * @param  {...any} args - Additional arguments
   */
  log(message, ...args) {
    if (isDevelopment) {
      console.log(message, ...args.map(arg => redactObject(arg)))
    }
  },

  /**
   * Log info message (development only)
   * @param {string} message - Info message
   * @param  {...any} args - Additional arguments
   */
  info(message, ...args) {
    if (isDevelopment) {
      console.info(message, ...args.map(arg => redactObject(arg)))
    }
  },

  /**
   * Log warning (always logged, but redacted in production)
   * @param {string} message - Warning message
   * @param  {...any} args - Additional arguments
   */
  warn(message, ...args) {
    if (isDevelopment) {
      console.warn(message, ...args.map(arg => redactObject(arg)))
    } else {
      console.warn(message, '[Arguments redacted in production]')
    }
  },

  /**
   * Log error (always logged, redacted in production)
   * @param {string} message - Error message
   * @param  {...any} args - Additional arguments
   */
  error(message, ...args) {
    if (isDevelopment) {
      console.error(message, ...args.map(arg => redactObject(arg)))
    } else {
      // In production, only log message and redacted error type
      const errorInfo = args[0] instanceof Error
        ? { type: args[0].constructor.name, message: args[0].message }
        : '[Details redacted]'
      console.error(message, errorInfo)
    }
  },

  /**
   * Log debug message (development only)
   * @param {string} message - Debug message
   * @param  {...any} args - Additional arguments
   */
  debug(message, ...args) {
    if (isDevelopment) {
      console.debug(message, ...args.map(arg => redactObject(arg)))
    }
  },

  /**
   * Log success message with checkmark (development only)
   * @param {string} message - Success message
   */
  success(message) {
    if (isDevelopment) {
      console.log(`✓ ${message}`)
    }
  },

  /**
   * Log security event (always logged with minimal info)
   * @param {string} event - Security event type
   * @param {Object} details - Event details (will be redacted)
   */
  security(event, details = {}) {
    const timestamp = new Date().toISOString()
    if (isProduction) {
      console.warn(`[SECURITY] ${timestamp} - ${event}`)
    } else {
      console.warn(`[SECURITY] ${timestamp} - ${event}`, redactObject(details))
    }
  }
}

/**
 * Safe stringify for logging objects
 * @param {any} obj - Object to stringify
 * @param {number} maxDepth - Maximum recursion depth
 * @returns {string} - JSON string
 */
export function safeStringify(obj, maxDepth = 3) {
  const seen = new WeakSet()

  const replacer = (key, value, depth = 0) => {
    // Redact PHI fields
    if (PHI_FIELDS.includes(key)) {
      return '[REDACTED]'
    }

    // Handle circular references
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]'
      }
      seen.add(value)
    }

    // Limit depth
    if (depth > maxDepth) {
      return '[Max Depth]'
    }

    return value
  }

  try {
    return JSON.stringify(redactObject(obj), replacer, 2)
  } catch (error) {
    return `[Stringify Error: ${error.message}]`
  }
}

export default logger
