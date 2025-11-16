// Rate Limiting Middleware using Upstash Redis
// SECURITY FIX: PENTEST-001 - Prevents brute force attacks, credential stuffing, and DoS

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Initialize Redis connection
// NOTE: Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables
const redis = process.env.UPSTASH_REDIS_REST_URL ? new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
}) : null

// Authentication rate limit: 5 attempts per 15 minutes
// Prevents brute force attacks on login/signup
export const authRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
  prefix: "ratelimit:auth",
}) : null

// General API rate limit: 100 requests per minute
// Prevents abuse of API endpoints
export const apiRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true,
  prefix: "ratelimit:api",
}) : null

// Strict rate limit: 10 requests per hour
// For sensitive operations (payments, subscriptions, deletions)
export const strictRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: true,
  prefix: "ratelimit:strict",
}) : null

// Webhook rate limit: 1000 requests per minute
// For Stripe webhooks (higher limit needed)
export const webhookRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1000, "1 m"),
  analytics: true,
  prefix: "ratelimit:webhook",
}) : null

/**
 * Apply rate limiting to an API endpoint
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Ratelimit} rateLimit - Rate limit instance to use
 * @returns {boolean} - True if request allowed, false if rate limited
 */
export async function applyRateLimit(req, res, rateLimit) {
  // If Redis not configured, log warning and allow request (fail open)
  if (!rateLimit) {
    console.warn('⚠️  Rate limiting not configured - missing Upstash Redis credentials')
    console.warn('   Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables')
    return true
  }

  // Use IP address as identifier (with fallbacks)
  const identifier = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
                     req.headers['x-real-ip'] ||
                     req.connection?.remoteAddress ||
                     req.socket?.remoteAddress ||
                     'unknown'

  try {
    // Check rate limit
    const { success, limit, reset, remaining } = await rateLimit.limit(identifier)

    // Set standard rate limit headers
    res.setHeader('X-RateLimit-Limit', limit.toString())
    res.setHeader('X-RateLimit-Remaining', remaining.toString())
    res.setHeader('X-RateLimit-Reset', new Date(reset).toISOString())

    if (!success) {
      console.warn(`🚫 Rate limit exceeded for IP: ${identifier}`)
      res.status(429).json({
        error: 'Too many requests',
        details: 'You have exceeded the rate limit. Please try again later.',
        retryAfter: new Date(reset).toISOString(),
        limit: limit,
        remaining: 0
      })
      return false
    }

    // Log if getting close to limit (for monitoring)
    if (remaining < 3) {
      console.log(`⚠️  IP ${identifier} approaching rate limit: ${remaining}/${limit} remaining`)
    }

    return true
  } catch (error) {
    // If rate limiting fails, log error but allow request (fail open for availability)
    console.error('❌ Rate limiting error:', error.message)
    return true
  }
}

/**
 * Get identifier for rate limiting (used for custom scenarios)
 * @param {Object} req - Request object
 * @param {string} customKey - Optional custom key to append (e.g., user ID, email)
 * @returns {string} - Identifier for rate limiting
 */
export function getRateLimitIdentifier(req, customKey = '') {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
             req.headers['x-real-ip'] ||
             req.connection?.remoteAddress ||
             'unknown'

  return customKey ? `${ip}:${customKey}` : ip
}
