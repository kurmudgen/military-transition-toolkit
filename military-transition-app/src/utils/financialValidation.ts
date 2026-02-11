/**
 * Financial Validation Utilities
 *
 * Validators for financial inputs — separate from the existing validation.js
 * to avoid conflicts. These focus on military-specific financial validation.
 * Ported from Military Money Coaching (MMC-K6) and adapted for MTT.
 */

export interface ValidationResult {
  valid: boolean
  message?: string
}

const ok: ValidationResult = { valid: true }
const fail = (message: string): ValidationResult => ({ valid: false, message })

// ─── Amount Validators ──────────────────────────────────────────────

/**
 * Validate a monetary amount is positive and within reasonable bounds.
 *
 * @param amount - Dollar amount to validate
 * @param label - Field name for error messages (default: "Amount")
 * @param max - Maximum allowed value (default: 10,000,000)
 */
export function validateAmount(
  amount: number,
  label: string = 'Amount',
  max: number = 10_000_000
): ValidationResult {
  if (amount == null || isNaN(amount)) return fail(`${label} is required`)
  if (amount < 0) return fail(`${label} cannot be negative`)
  if (amount > max) return fail(`${label} cannot exceed $${max.toLocaleString()}`)
  return ok
}

/**
 * Validate a monetary amount is strictly positive (greater than zero).
 */
export function validatePositiveAmount(
  amount: number,
  label: string = 'Amount'
): ValidationResult {
  const base = validateAmount(amount, label)
  if (!base.valid) return base
  if (amount === 0) return fail(`${label} must be greater than zero`)
  return ok
}

/**
 * Validate an amount falls within a specific range.
 */
export function validateAmountRange(
  amount: number,
  min: number,
  max: number,
  label: string = 'Amount'
): ValidationResult {
  if (amount == null || isNaN(amount)) return fail(`${label} is required`)
  if (amount < min) return fail(`${label} must be at least $${min.toLocaleString()}`)
  if (amount > max) return fail(`${label} cannot exceed $${max.toLocaleString()}`)
  return ok
}

// ─── Percentage Validators ──────────────────────────────────────────

/**
 * Validate a percentage value (0-100).
 *
 * @param value - Percentage as a whole number (e.g., 25 for 25%)
 * @param label - Field name for error messages
 * @param allowZero - Whether 0% is valid (default: true)
 */
export function validatePercentage(
  value: number,
  label: string = 'Percentage',
  allowZero: boolean = true
): ValidationResult {
  if (value == null || isNaN(value)) return fail(`${label} is required`)
  if (!allowZero && value === 0) return fail(`${label} must be greater than 0%`)
  if (value < 0) return fail(`${label} cannot be negative`)
  if (value > 100) return fail(`${label} cannot exceed 100%`)
  return ok
}

// ─── Interest Rate Validators ───────────────────────────────────────

/**
 * Validate an interest rate (APR) as a decimal or percentage.
 * Warns on unusually high rates but allows them for educational purposes
 * (e.g., displaying predatory loan APRs).
 *
 * @param rate - APR as percentage (e.g., 24.99 for 24.99%)
 * @param label - Field name for error messages
 */
export function validateInterestRate(
  rate: number,
  label: string = 'Interest rate'
): ValidationResult {
  if (rate == null || isNaN(rate)) return fail(`${label} is required`)
  if (rate < 0) return fail(`${label} cannot be negative`)
  if (rate > 999) return fail(`${label} seems unreasonably high (max 999%)`)
  return ok
}

/**
 * Check if an APR exceeds the Military Lending Act cap (36%).
 * The MLA protects active duty service members and their dependents.
 *
 * @param apr - Annual Percentage Rate as a whole number (e.g., 36 for 36%)
 * @returns true if the rate exceeds the MLA cap
 */
export function isPredatoryAPR(apr: number): boolean {
  return apr > 36
}

/**
 * Get a risk assessment for an APR.
 */
export function getAPRRiskLevel(
  apr: number
): 'low' | 'moderate' | 'high' | 'predatory' {
  if (apr <= 10) return 'low'
  if (apr <= 20) return 'moderate'
  if (apr <= 36) return 'high'
  return 'predatory'
}

// ─── Pay Grade Validators ───────────────────────────────────────────

const VALID_ENLISTED = ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9']
const VALID_WARRANT = ['W-1', 'W-2', 'W-3', 'W-4', 'W-5']
const VALID_OFFICER = ['O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10']
const ALL_PAY_GRADES = [...VALID_ENLISTED, ...VALID_WARRANT, ...VALID_OFFICER]

/**
 * Validate a military pay grade string.
 *
 * @param payGrade - Pay grade string (e.g., "E-5", "O-3", "W-2")
 */
export function validatePayGrade(payGrade: string): ValidationResult {
  if (!payGrade || payGrade.trim() === '') return fail('Pay grade is required')
  const normalized = payGrade.trim().toUpperCase()
  if (!ALL_PAY_GRADES.includes(normalized)) {
    return fail(`Invalid pay grade "${payGrade}". Expected E-1 through E-9, W-1 through W-5, or O-1 through O-10`)
  }
  return ok
}

/**
 * Check if a pay grade string is valid (boolean convenience function).
 */
export function isValidPayGrade(payGrade: string): boolean {
  return validatePayGrade(payGrade).valid
}

/**
 * Get the category of a pay grade.
 */
export function getPayGradeCategory(
  payGrade: string
): 'enlisted' | 'warrant' | 'officer' | null {
  const normalized = payGrade.trim().toUpperCase()
  if (VALID_ENLISTED.includes(normalized)) return 'enlisted'
  if (VALID_WARRANT.includes(normalized)) return 'warrant'
  if (VALID_OFFICER.includes(normalized)) return 'officer'
  return null
}

// ─── Years of Service Validator ─────────────────────────────────────

/**
 * Validate years of service (0-40).
 *
 * @param years - Years of military service
 */
export function validateYearsOfService(years: number): ValidationResult {
  if (years == null || isNaN(years)) return fail('Years of service is required')
  if (years < 0) return fail('Years of service cannot be negative')
  if (years > 40) return fail('Years of service cannot exceed 40')
  if (!Number.isInteger(years) && (years * 10) % 1 !== 0) {
    return fail('Years of service must be a whole number or half year (e.g., 4, 4.5)')
  }
  return ok
}

// ─── Budget Validators ──────────────────────────────────────────────

/**
 * Validate that budget category allocations sum to approximately 100%.
 * Allows a small tolerance for rounding.
 *
 * @param allocations - Array of percentage allocations
 * @param tolerance - Allowed deviation from 100% (default: 1%)
 */
export function validateBudgetAllocation(
  allocations: number[],
  tolerance: number = 1
): ValidationResult {
  if (!allocations || allocations.length === 0) {
    return fail('At least one budget category is required')
  }

  for (let i = 0; i < allocations.length; i++) {
    if (allocations[i] < 0) {
      return fail(`Category ${i + 1} cannot have a negative allocation`)
    }
  }

  const total = allocations.reduce((sum, val) => sum + val, 0)
  if (Math.abs(total - 100) > tolerance) {
    return fail(`Budget allocations must sum to 100% (currently ${total.toFixed(1)}%)`)
  }

  return ok
}

/**
 * Validate a monthly payment amount relative to income.
 */
export function validateMonthlyPayment(
  payment: number,
  monthlyIncome: number,
  label: string = 'Payment'
): ValidationResult {
  const base = validatePositiveAmount(payment, label)
  if (!base.valid) return base

  if (monthlyIncome > 0 && payment > monthlyIncome) {
    return fail(`${label} ($${payment.toLocaleString()}) exceeds monthly income ($${monthlyIncome.toLocaleString()})`)
  }

  return ok
}

// ─── Debt Health Checks ─────────────────────────────────────────────

/**
 * Check if a debt-to-income ratio is healthy.
 * Under 36% is generally considered manageable.
 *
 * @param ratio - DTI ratio as decimal (e.g., 0.35 for 35%)
 * @returns true if the ratio is at or below 36%
 */
export function isHealthyDebtRatio(ratio: number): boolean {
  return ratio <= 0.36
}

/**
 * Get a debt-to-income risk assessment.
 */
export function getDebtRiskLevel(
  ratio: number
): 'healthy' | 'caution' | 'high' | 'critical' {
  if (ratio <= 0.20) return 'healthy'
  if (ratio <= 0.36) return 'caution'
  if (ratio <= 0.50) return 'high'
  return 'critical'
}

/**
 * Check if a savings rate is healthy.
 * 20%+ is the standard recommendation (50/30/20 rule).
 *
 * @param rate - Savings rate as decimal (e.g., 0.20 for 20%)
 */
export function isHealthySavingsRate(rate: number): boolean {
  return rate >= 0.20
}

/**
 * Check if a debt is considered high-interest.
 * Generally, anything above 10% APR is considered high.
 *
 * @param apr - Annual percentage rate as whole number (e.g., 15 for 15%)
 */
export function isHighInterestDebt(apr: number): boolean {
  return apr > 10
}

// ─── Emergency Fund Checks ──────────────────────────────────────────

/**
 * Assess emergency fund adequacy.
 *
 * @param fundMonths - Number of months the fund covers
 * @returns Assessment level
 */
export function getEmergencyFundStatus(
  fundMonths: number
): 'none' | 'minimal' | 'building' | 'adequate' | 'strong' {
  if (fundMonths <= 0) return 'none'
  if (fundMonths < 1) return 'minimal'
  if (fundMonths < 3) return 'building'
  if (fundMonths < 6) return 'adequate'
  return 'strong'
}

// ─── Combo Validator ────────────────────────────────────────────────

/**
 * Run multiple validations and return the first failure, or success if all pass.
 */
export function combineValidations(
  ...results: ValidationResult[]
): ValidationResult {
  for (const result of results) {
    if (!result.valid) return result
  }
  return ok
}
