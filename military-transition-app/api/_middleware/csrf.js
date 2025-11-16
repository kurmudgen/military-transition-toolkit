// CSRF Protection Middleware
// SECURITY FIX: PENTEST-002 - Prevents Cross-Site Request Forgery attacks

import csrf from 'csrf'

// Initialize CSRF token generator
const tokens = new csrf()

// Use environment variable for secret in production, fallback for development
const secret = process.env.CSRF_SECRET || 'development-csrf-secret-change-in-production'

/**
 * Generate a new CSRF token
 * @returns {string} - CSRF token
 */
export function generateCSRFToken() {
  try {
    return tokens.create(secret)
  } catch (error) {
    console.error('Failed to generate CSRF token:', error)
    throw new Error('CSRF token generation failed')
  }
}

/**
 * Verify a CSRF token
 * @param {string} token - Token to verify
 * @returns {boolean} - True if token is valid
 */
export function verifyCSRFToken(token) {
  try {
    return tokens.verify(secret, token)
  } catch (error) {
    console.error('Failed to verify CSRF token:', error)
    return false
  }
}

/**
 * Middleware to require CSRF token on state-changing requests
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {boolean} - True if CSRF check passed, false otherwise
 */
export async function requireCSRF(req, res) {
  // Only check CSRF on state-changing methods
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    return true
  }

  // OPTIONS requests don't need CSRF
  if (req.method === 'OPTIONS') {
    return true
  }

  // Extract token from header or body
  const token = req.headers['x-csrf-token'] ||
                req.body?.csrfToken ||
                req.body?.csrf_token

  if (!token) {
    console.warn('🚫 CSRF token missing from request')
    res.status(403).json({
      error: 'CSRF token required',
      code: 'CSRF_TOKEN_MISSING',
      details: 'State-changing requests must include a valid CSRF token'
    })
    return false
  }

  const isValid = verifyCSRFToken(token)

  if (!isValid) {
    console.warn('🚫 Invalid CSRF token received')
    res.status(403).json({
      error: 'Invalid CSRF token',
      code: 'CSRF_TOKEN_INVALID',
      details: 'The provided CSRF token is invalid or expired'
    })
    return false
  }

  // Token is valid
  return true
}

/**
 * Create CSRF error response with appropriate status code
 * @param {Object} res - Response object
 * @param {string} reason - Reason for CSRF failure
 */
export function sendCSRFError(res, reason = 'missing') {
  const errors = {
    missing: {
      status: 403,
      error: 'CSRF token required',
      code: 'CSRF_TOKEN_MISSING'
    },
    invalid: {
      status: 403,
      error: 'Invalid CSRF token',
      code: 'CSRF_TOKEN_INVALID'
    },
    expired: {
      status: 403,
      error: 'CSRF token expired',
      code: 'CSRF_TOKEN_EXPIRED'
    }
  }

  const errorResponse = errors[reason] || errors.invalid
  res.status(errorResponse.status).json(errorResponse)
}
