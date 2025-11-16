// Audit Log Anonymization API Endpoint
// SECURITY FIX: PENTEST-004 - GDPR/HIPAA compliance for audit log retention

import { createClient } from '@supabase/supabase-js'
import { applyRateLimit, strictRateLimit } from './_middleware/ratelimit.js'
import { requireCSRF } from './_middleware/csrf.js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  // Set headers
  res.setHeader('Content-Type', 'application/json')

  // CORS
  const allowedOrigins = [
    'https://military-transition-toolkit.vercel.app',
    'https://www.military-transition-toolkit.vercel.app',
    ...(process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'
      ? ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173']
      : [])
  ]

  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0])
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-CSRF-Token')

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Apply rate limiting
  const rateLimitOk = await applyRateLimit(req, res, strictRateLimit)
  if (!rateLimitOk) return

  // Apply CSRF protection
  const csrfOk = await requireCSRF(req, res)
  if (!csrfOk) return

  try {
    // ============================================
    // AUTHENTICATION: Verify JWT token
    // ============================================
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - Missing token' })
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      console.error('Auth error:', authError)
      return res.status(401).json({ error: 'Unauthorized - Invalid token' })
    }

    console.log(`Anonymize audit logs request from user: ${user.id}`)

    // ============================================
    // VALIDATE INPUT
    // ============================================
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' })
    }

    // ============================================
    // AUTHORIZATION: Users can only anonymize their own logs
    // ============================================
    if (userId !== user.id) {
      console.error('Authorization failed: User attempting to anonymize another user\'s logs')
      return res.status(403).json({
        error: 'Forbidden - Can only anonymize your own audit logs'
      })
    }

    // ============================================
    // ANONYMIZE AUDIT LOGS
    // ============================================
    // IMPORTANT: We don't DELETE audit logs (needed for compliance)
    // Instead, we anonymize PII while preserving action/timestamp
    console.log(`Anonymizing audit logs for user: ${userId}`)

    // Generate anonymous identifier (preserves uniqueness for analytics)
    const anonymousId = `DELETED-USER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Count logs before anonymization
    const { count: logCount } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    console.log(`Found ${logCount} audit logs to anonymize`)

    // Anonymize: Remove PHI from details field, replace user_id
    const { error: updateError } = await supabase
      .from('audit_logs')
      .update({
        user_id: anonymousId,
        details: {}, // Remove all potentially identifying details
        user_agent: '[DELETED]', // Remove user agent (may contain fingerprint info)
        ip_address: null, // Remove IP if stored
        anonymized_at: new Date().toISOString()
      })
      .eq('user_id', userId)

    if (updateError) {
      console.error('Failed to anonymize audit logs:', updateError)
      throw updateError
    }

    console.log(`✓ Successfully anonymized ${logCount} audit logs`)

    // ============================================
    // SUCCESS RESPONSE
    // ============================================
    return res.status(200).json({
      success: true,
      message: 'Audit logs anonymized successfully',
      logsAnonymized: logCount,
      anonymousId, // For record-keeping
      note: 'Audit logs preserved for compliance but all PHI removed'
    })

  } catch (error) {
    console.error('Anonymize audit logs error:', error)

    // Generic error response (don't expose stack trace in production)
    const errorResponse = {
      error: 'Failed to anonymize audit logs',
      details: error.message || 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }

    // Only include stack trace in development
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = error.stack
    }

    return res.status(500).json(errorResponse)
  }
}
