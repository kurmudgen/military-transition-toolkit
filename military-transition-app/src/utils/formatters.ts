/**
 * Display Formatter Utilities
 *
 * Pure functions for formatting values for display.
 * Ported from Military Money Coaching (MMC-K7) and adapted for MTT.
 */

// ─── Currency ───────────────────────────────────────────────────────

/**
 * Format a dollar amount as US currency.
 *
 * @param dollars - Amount in dollars (e.g., 1234.56)
 * @returns Formatted string (e.g., "$1,234.56")
 */
export function formatCurrency(dollars: number): string {
  if (dollars == null || isNaN(dollars)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(dollars)
}

/**
 * Format a dollar amount in compact notation.
 *
 * @param dollars - Amount in dollars
 * @returns Compact string (e.g., "$1.2K", "$3.4M")
 */
export function formatCurrencyCompact(dollars: number): string {
  if (dollars == null || isNaN(dollars)) return '$0'
  const abs = Math.abs(dollars)
  const sign = dollars < 0 ? '-' : ''

  if (abs >= 1_000_000) {
    return `${sign}$${(abs / 1_000_000).toFixed(1)}M`
  }
  if (abs >= 1_000) {
    return `${sign}$${(abs / 1_000).toFixed(1)}K`
  }
  return formatCurrency(dollars)
}

/**
 * Format a dollar amount as monthly payment.
 *
 * @param dollars - Monthly amount in dollars
 * @returns Formatted string (e.g., "$1,234/mo")
 */
export function formatMonthlyPayment(dollars: number): string {
  if (dollars == null || isNaN(dollars)) return '$0/mo'
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars)
  return `${formatted}/mo`
}

// ─── Percentages ────────────────────────────────────────────────────

/**
 * Format a decimal value as a percentage string.
 *
 * @param decimal - Value as decimal (e.g., 0.125 for 12.5%)
 * @param decimals - Decimal places to show (default: 1)
 * @returns Formatted string (e.g., "12.5%")
 */
export function formatPercent(decimal: number, decimals: number = 1): string {
  if (decimal == null || isNaN(decimal)) return '0%'
  return `${(decimal * 100).toFixed(decimals)}%`
}

/**
 * Format an APR for display.
 *
 * @param rate - APR as whole number (e.g., 24.99)
 * @returns Formatted string (e.g., "24.99% APR")
 */
export function formatAPR(rate: number): string {
  if (rate == null || isNaN(rate)) return '0% APR'
  return `${rate.toFixed(2)}% APR`
}

// ─── Dates ──────────────────────────────────────────────────────────

/**
 * Format a date for display.
 *
 * @param date - Date object or ISO string
 * @returns Formatted string (e.g., "Jan 15, 2026")
 */
export function formatDate(date: Date | string): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d)
}

/**
 * Format a date relative to now.
 *
 * @param date - Date object or ISO string
 * @returns Relative string (e.g., "2 days ago", "in 3 months")
 */
export function formatRelativeDate(date: Date | string): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''

  const now = new Date()
  const diffMs = d.getTime() - now.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
  const absDays = Math.abs(diffDays)

  const suffix = diffDays < 0 ? 'ago' : ''
  const prefix = diffDays > 0 ? 'in ' : ''

  if (absDays === 0) return 'today'
  if (absDays === 1) return diffDays < 0 ? 'yesterday' : 'tomorrow'
  if (absDays < 7) return `${prefix}${absDays} days${suffix ? ' ' + suffix : ''}`
  if (absDays < 30) {
    const weeks = Math.round(absDays / 7)
    return `${prefix}${weeks} week${weeks !== 1 ? 's' : ''}${suffix ? ' ' + suffix : ''}`
  }
  if (absDays < 365) {
    const months = Math.round(absDays / 30)
    return `${prefix}${months} month${months !== 1 ? 's' : ''}${suffix ? ' ' + suffix : ''}`
  }
  const years = Math.round(absDays / 365)
  return `${prefix}${years} year${years !== 1 ? 's' : ''}${suffix ? ' ' + suffix : ''}`
}

// ─── Military ───────────────────────────────────────────────────────

const RANK_NAMES: Record<string, string> = {
  // Enlisted
  'E-1': 'PVT/SR/PV1/AB',
  'E-2': 'PV2/SA/PFC/Amn',
  'E-3': 'PFC/SN/LCpl/A1C',
  'E-4': 'SPC/CPL/PO3/Cpl/SrA',
  'E-5': 'SGT/PO2/Sgt/SSgt',
  'E-6': 'SSG/PO1/SSgt/TSgt',
  'E-7': 'SFC/CPO/GySgt/MSgt',
  'E-8': 'MSG/1SG/SCPO/MSgt/SMSgt',
  'E-9': 'SGM/CSM/MCPO/MGySgt/CMSgt',
  // Warrant Officers
  'W-1': 'WO1',
  'W-2': 'CW2',
  'W-3': 'CW3',
  'W-4': 'CW4',
  'W-5': 'CW5',
  // Officers
  'O-1': '2LT/ENS',
  'O-2': '1LT/LTJG',
  'O-3': 'CPT/LT',
  'O-4': 'MAJ/LCDR',
  'O-5': 'LTC/CDR',
  'O-6': 'COL/CAPT',
  'O-7': 'BG/RDML',
  'O-8': 'MG/RADM',
  'O-9': 'LTG/VADM',
  'O-10': 'GEN/ADM',
}

/**
 * Format a pay grade with rank abbreviations.
 *
 * @param payGrade - Pay grade string (e.g., "E-6")
 * @returns Formatted string (e.g., "E-6 (SSG/PO1/SSgt/TSgt)")
 */
export function formatRankName(payGrade: string): string {
  if (!payGrade) return ''
  const normalized = payGrade.trim().toUpperCase()
  const rankName = RANK_NAMES[normalized]
  if (!rankName) return normalized
  return `${normalized} (${rankName})`
}

/**
 * Format years of service for display.
 *
 * @param years - Years of service
 * @returns Formatted string (e.g., "19 years", "< 1 year", "1 year")
 */
export function formatYearsOfService(years: number): string {
  if (years == null || isNaN(years) || years < 0) return '0 years'
  if (years < 1) return '< 1 year'
  if (years === 1) return '1 year'
  if (Number.isInteger(years)) return `${years} years`
  return `${years.toFixed(1)} years`
}

// ─── Duration ───────────────────────────────────────────────────────

/**
 * Format a number of months as a human-readable duration.
 *
 * @param months - Total months
 * @returns Formatted string (e.g., "2 years, 3 months")
 */
export function formatDuration(months: number): string {
  if (months == null || isNaN(months) || months <= 0) return '0 months'

  const totalMonths = Math.round(months)
  const years = Math.floor(totalMonths / 12)
  const remainingMonths = totalMonths % 12

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
  }
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`
  }
  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
}

// ─── Progress ───────────────────────────────────────────────────────

/**
 * Format progress toward a financial goal.
 *
 * @param current - Current amount ($)
 * @param target - Target amount ($)
 * @returns Formatted string (e.g., "67% ($2,000 / $3,000)")
 */
export function formatGoalProgress(current: number, target: number): string {
  if (target <= 0) return '0%'
  const pct = Math.min(100, Math.round((current / target) * 100))
  return `${pct}% (${formatCurrency(current)} / ${formatCurrency(target)})`
}

/**
 * Format a change indicator showing direction and magnitude.
 *
 * @param current - Current value
 * @param previous - Previous value
 * @returns Formatted string (e.g., "↑ 12.5%", "↓ 3.2%", "→ 0%")
 */
export function formatChangeIndicator(
  current: number,
  previous: number
): string {
  if (previous === 0) {
    if (current > 0) return '↑ new'
    return '→ 0%'
  }

  const change = ((current - previous) / Math.abs(previous)) * 100
  const rounded = Math.abs(Math.round(change * 10) / 10)

  if (change > 0.05) return `↑ ${rounded}%`
  if (change < -0.05) return `↓ ${rounded}%`
  return '→ 0%'
}

// ─── General ────────────────────────────────────────────────────────

/**
 * Format a number with commas.
 *
 * @param value - Number to format
 * @returns Formatted string (e.g., "1,234,567")
 */
export function formatNumber(value: number): string {
  if (value == null || isNaN(value)) return '0'
  return new Intl.NumberFormat('en-US').format(value)
}
