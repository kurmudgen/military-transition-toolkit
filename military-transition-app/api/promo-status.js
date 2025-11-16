// Promo Status API Endpoint
// SECURITY FIX: PENTEST-003 - Server-side promo validation to prevent bypass

export default function handler(req, res) {
  // Set CORS headers
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

  // 🔒 SECURITY: Server-side promo mode check (PENTEST-003 fix)
  // Client cannot bypass this by manipulating environment variables
  const promoModeEnabled = process.env.PROMO_MODE === 'true'

  // Promo end date: November 11, 2025 at 11:59 PM
  const promoEndDate = new Date('2025-11-11T23:59:59Z')
  const now = new Date()
  const promoExpired = now > promoEndDate

  // Calculate time remaining
  const timeRemaining = promoExpired ? 0 : Math.floor((promoEndDate - now) / 1000)

  // Promo is active if enabled AND not expired
  const promoActive = promoModeEnabled && !promoExpired

  // Return promo status
  res.status(200).json({
    active: promoActive,
    endDate: promoEndDate.toISOString(),
    timeRemaining,
    daysRemaining: Math.floor(timeRemaining / 86400),
    message: promoActive
      ? 'All premium features unlocked during government shutdown'
      : promoExpired
        ? 'Promotional period has ended'
        : 'Promotional period not active',
    features: promoActive ? [
      'Unlimited VA Claims',
      'Unlimited Resumes',
      'PDF Exports',
      'State Benefits Comparison',
      'Job Application Tracking',
      'Premium Support'
    ] : []
  })
}
