// Production Error Handler
// SECURITY FIX: PENTEST-011 - Sanitized error messages for production

import { logger } from './logger'

const isDevelopment = import.meta.env.DEV

/**
 * Error types and user-friendly messages
 */
const ERROR_MESSAGES = {
  // Authentication errors
  AUTH_001: 'Authentication required. Please log in.',
  AUTH_002: 'Invalid credentials. Please try again.',
  AUTH_003: 'Session expired. Please log in again.',

  // Authorization errors
  AUTHZ_001: 'You do not have permission to perform this action.',
  AUTHZ_002: 'Access denied.',

  // Validation errors
  VAL_001: 'Please check your input and try again.',
  VAL_002: 'Required fields are missing.',
  VAL_003: 'Invalid format. Please check your input.',

  // Network errors
  NET_001: 'Unable to connect. Please check your internet connection.',
  NET_002: 'Request timeout. Please try again.',
  NET_003: 'Service temporarily unavailable. Please try again later.',

  // Data errors
  DATA_001: 'Unable to load data. Please refresh the page.',
  DATA_002: 'Unable to save. Please try again.',
  DATA_003: 'Data not found.',

  // Payment errors
  PAY_001: 'Payment processing failed. Please try again.',
  PAY_002: 'Invalid payment information.',
  PAY_003: 'Subscription error. Please contact support.',

  // Rate limit errors
  RATE_001: 'Too many requests. Please wait a moment and try again.',

  // CSRF errors
  CSRF_001: 'Security token expired. Please refresh the page.',
  CSRF_002: 'Security validation failed. Please try again.',

  // Generic
  UNKNOWN: 'An error occurred. Please try again or contact support if the problem persists.'
}

/**
 * Handle and format errors for display to users
 * @param {Error|Object} error - Error object
 * @param {string} context - Where the error occurred
 * @returns {Object} - {message: string, code: string, technical: string}
 */
export function handleError(error, context = '') {
  // Log full error for debugging (redacted in production)
  logger.error(`Error in ${context}:`, error)

  // Extract error information
  const errorMessage = error?.message || error?.error || error?.details || 'Unknown error'
  const errorCode = error?.code || error?.errorCode || 'UNKNOWN'
  const statusCode = error?.status || error?.statusCode

  // Determine user-friendly message
  let userMessage = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.UNKNOWN

  // Handle specific HTTP status codes
  if (statusCode === 401) {
    userMessage = ERROR_MESSAGES.AUTH_001
  } else if (statusCode === 403) {
    userMessage = ERROR_MESSAGES.AUTHZ_001
  } else if (statusCode === 404) {
    userMessage = ERROR_MESSAGES.DATA_003
  } else if (statusCode === 429) {
    userMessage = ERROR_MESSAGES.RATE_001
  } else if (statusCode === 500 || statusCode === 503) {
    userMessage = ERROR_MESSAGES.NET_003
  }

  // Handle network errors
  if (error?.name === 'NetworkError' || errorMessage.includes('fetch')) {
    userMessage = ERROR_MESSAGES.NET_001
  }

  // Handle timeout errors
  if (errorMessage.includes('timeout')) {
    userMessage = ERROR_MESSAGES.NET_002
  }

  // Handle validation errors
  if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
    userMessage = ERROR_MESSAGES.VAL_001
  }

  // Handle CSRF errors
  if (errorCode.includes('CSRF')) {
    userMessage = errorMessage // CSRF messages are already user-friendly
  }

  // Return formatted error
  return {
    message: userMessage,
    code: errorCode,
    // Include technical details only in development
    technical: isDevelopment ? errorMessage : undefined,
    context: isDevelopment ? context : undefined
  }
}

/**
 * Create user-friendly error message from API response
 * @param {Response} response - Fetch response object
 * @returns {Promise<Object>} - Formatted error
 */
export async function handleAPIError(response, context = 'API call') {
  let errorData = {}

  try {
    errorData = await response.json()
  } catch (e) {
    errorData = { message: response.statusText, status: response.status }
  }

  return handleError({
    ...errorData,
    statusCode: response.status
  }, context)
}

/**
 * Show error to user with appropriate UI
 * @param {Error|Object} error - Error object
 * @param {string} context - Error context
 * @param {Function} callback - Optional callback for custom handling
 */
export function showError(error, context = '', callback = null) {
  const formattedError = handleError(error, context)

  if (callback) {
    callback(formattedError)
  } else {
    // Default: show alert (can be replaced with toast notification)
    alert(`Error: ${formattedError.message}${
      formattedError.technical ? `\n\nTechnical: ${formattedError.technical}` : ''
    }`)
  }
}

/**
 * Async error wrapper for try/catch blocks
 * @param {Function} fn - Async function to wrap
 * @param {string} context - Error context
 * @returns {Function} - Wrapped function
 */
export function withErrorHandling(fn, context) {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      const formattedError = handleError(error, context)
      logger.error(`Error in ${context}:`, formattedError)
      throw formattedError
    }
  }
}

/**
 * Retry failed operations with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} baseDelay - Base delay in ms
 * @returns {Promise} - Result or throws error
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      // Don't retry on certain errors
      if (error?.statusCode === 401 || error?.statusCode === 403 || error?.statusCode === 404) {
        throw error
      }

      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i)
        logger.warn(`Retry attempt ${i + 1} after ${delay}ms`)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

export default {
  handleError,
  handleAPIError,
  showError,
  withErrorHandling,
  retryWithBackoff
}
