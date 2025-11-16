// CSRF Token Generation Endpoint
// SECURITY FIX: PENTEST-002 - Provides CSRF tokens to authenticated clients

import { generateCSRFToken } from './_middleware/csrf.js'

export default function handler(req, res) {
  // Set CORS headers (should match main API CORS config)
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Generate new CSRF token
    const token = generateCSRFToken()

    // Return token to client
    res.status(200).json({
      csrfToken: token,
      expiresIn: '1 hour', // Tokens are valid for reasonable time
      usage: 'Include this token in X-CSRF-Token header or csrfToken body field'
    })
  } catch (error) {
    console.error('Failed to generate CSRF token:', error)
    res.status(500).json({
      error: 'Failed to generate CSRF token',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}
