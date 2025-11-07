import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Rate Limiting Utility for API Endpoints
 * SECURITY: Phase 4 - CRITICAL-004 fix
 *
 * Prevents abuse, DDoS attacks, and API exhaustion by limiting requests per IP
 *
 * Usage:
 *   const { success, limit, reset, remaining } = await rateLimitCheck(req, 'checkout', 10)
 *   if (!success) return res.status(429).json({ error: 'Too many requests' })
 */

// Initialize Redis client (uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars)
let redis
let ratelimiters = {}

function getRedis() {
  if (!redis) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      console.warn('Upstash Redis environment variables not set. Rate limiting disabled in development.')
      return null
    }
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  }
  return redis
}

/**
 * Get or create a rate limiter for a specific endpoint
 * @param {string} endpoint - Endpoint identifier (e.g., 'checkout', 'cancel', 'verify')
 * @param {number} maxRequests - Maximum requests allowed in window
 * @param {string} window - Time window (e.g., '1 h', '10 m')
 * @returns {Ratelimit|null}
 */
function getRateLimiter(endpoint, maxRequests, window) {
  const redisClient = getRedis()
  if (!redisClient) {
    // Development mode without Redis - no rate limiting
    return null
  }

  const key = `${endpoint}-${maxRequests}-${window}`
  if (!ratelimiters[key]) {
    ratelimiters[key] = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(maxRequests, window),
      analytics: true,
      prefix: `ratelimit:${endpoint}`,
    })
  }
  return ratelimiters[key]
}

/**
 * Check rate limit for a request
 * @param {Object} req - Express request object
 * @param {string} endpoint - Endpoint identifier
 * @param {number} maxRequests - Max requests in window (default: 10)
 * @param {string} window - Time window (default: '1 h')
 * @returns {Promise<Object>} - { success, limit, reset, remaining, identifier }
 */
export async function rateLimitCheck(req, endpoint, maxRequests = 10, window = '1 h') {
  const limiter = getRateLimiter(endpoint, maxRequests, window)

  // If no limiter (dev mode), allow all requests
  if (!limiter) {
    return {
      success: true,
      limit: maxRequests,
      reset: Date.now() + 3600000,
      remaining: maxRequests,
      identifier: 'dev-mode'
    }
  }

  // Get identifier from various sources (prioritize forwarded IP)
  const identifier =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.headers['x-real-ip'] ||
    req.socket.remoteAddress ||
    'unknown'

  try {
    const result = await limiter.limit(identifier)

    return {
      success: result.success,
      limit: result.limit,
      reset: result.reset,
      remaining: result.remaining,
      identifier: identifier
    }
  } catch (error) {
    console.error('Rate limit check error:', error)
    // Fail open on Redis errors (allow request but log error)
    // Note: In production, you might want to fail closed for security
    return {
      success: true,
      limit: maxRequests,
      reset: Date.now() + 3600000,
      remaining: 0,
      identifier: identifier,
      error: error.message
    }
  }
}

/**
 * Middleware helper to add rate limit headers to response
 * @param {Object} res - Express response object
 * @param {Object} rateLimitResult - Result from rateLimitCheck()
 */
export function addRateLimitHeaders(res, rateLimitResult) {
  res.setHeader('X-RateLimit-Limit', rateLimitResult.limit)
  res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining)
  res.setHeader('X-RateLimit-Reset', new Date(rateLimitResult.reset).toISOString())
}

/**
 * Rate limit configurations for different endpoint types
 */
export const RATE_LIMITS = {
  // Payment endpoints - very strict
  CHECKOUT: { maxRequests: 5, window: '1 h' },
  CANCEL_SUBSCRIPTION: { maxRequests: 3, window: '1 h' },

  // Verification endpoints - moderate
  VERIFY_SUBSCRIPTION: { maxRequests: 100, window: '1 h' },
  AUTH: { maxRequests: 20, window: '15 m' },

  // Data endpoints - generous
  DATA_READ: { maxRequests: 200, window: '1 h' },
  DATA_WRITE: { maxRequests: 100, window: '1 h' },

  // Webhook endpoints - very generous (Stripe needs flexibility)
  WEBHOOK: { maxRequests: 1000, window: '1 h' },

  // Default fallback
  DEFAULT: { maxRequests: 50, window: '1 h' }
}

/**
 * Example usage in API endpoint:
 *
 * import { rateLimitCheck, addRateLimitHeaders, RATE_LIMITS } from './_utils/ratelimit.js'
 *
 * export default async function handler(req, res) {
 *   // Check rate limit
 *   const rateLimitResult = await rateLimitCheck(
 *     req,
 *     'checkout',
 *     RATE_LIMITS.CHECKOUT.maxRequests,
 *     RATE_LIMITS.CHECKOUT.window
 *   )
 *
 *   if (!rateLimitResult.success) {
 *     addRateLimitHeaders(res, rateLimitResult)
 *     return res.status(429).json({
 *       error: 'Too many requests',
 *       message: `Rate limit exceeded. Try again after ${new Date(rateLimitResult.reset).toLocaleString()}`,
 *       retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
 *     })
 *   }
 *
 *   // Add rate limit headers to successful responses too
 *   addRateLimitHeaders(res, rateLimitResult)
 *
 *   // Continue with endpoint logic...
 * }
 */
