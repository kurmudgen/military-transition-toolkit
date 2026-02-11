/**
 * Pay Calculator Service
 *
 * Stateless calculator — no Supabase persistence needed.
 * Combines base pay + BAS + BAH and estimates deductions.
 */

import { getBasePay, getBAS } from '../data/militaryPayData'
import type { PayGrade } from '../data/militaryPayData'
import { getBAHRate } from '../data/bahRatesData'

export interface PayBreakdown {
  basePay: number
  bas: number
  bah: number
  grossPay: number
  deductions: DeductionBreakdown
  netPay: number
  annualGross: number
  annualNet: number
}

export interface DeductionBreakdown {
  federalTax: number
  ficaSocialSecurity: number
  ficaMedicare: number
  sgli: number
  tsp: number
  totalDeductions: number
}

/**
 * Calculate complete pay breakdown for a service member.
 *
 * @param grade - Pay grade (e.g., "E-5", "O-3")
 * @param yearsOfService - Years of service (0-40)
 * @param locationId - BAH location ID (or empty for no BAH)
 * @param withDependents - BAH dependency status
 * @param tspPercent - TSP contribution as percentage (0-100, default 5)
 * @param sgliCoverage - SGLI coverage in thousands (0, 50, 100, ..., 400, default 400)
 */
export function calculatePayBreakdown(
  grade: PayGrade,
  yearsOfService: number,
  locationId: string,
  withDependents: boolean,
  tspPercent: number = 5,
  sgliCoverage: number = 400
): PayBreakdown {
  const basePay = getBasePay(grade, yearsOfService)
  const bas = getBAS(grade)
  const bah = locationId ? getBAHRate(locationId, grade, withDependents) : 0

  // BAH and BAS are tax-free, so gross for tax purposes = base pay only
  const taxableIncome = basePay
  const grossPay = basePay + bas + bah

  // Deductions (estimated — actual rates depend on filing status, state, etc.)
  // Federal tax: simplified marginal estimate for single filer
  const annualTaxable = taxableIncome * 12
  const federalTax = estimateFederalTax(annualTaxable) / 12

  // FICA (Social Security 6.2% on first $168,600 + Medicare 1.45%)
  const ficaSocialSecurity = Math.min(taxableIncome * 0.062, 168600 * 0.062 / 12)
  const ficaMedicare = taxableIncome * 0.0145

  // SGLI: $25/month for $400K coverage, scaled proportionally
  const sgli = sgliCoverage > 0 ? Math.round((sgliCoverage / 400) * 25 * 100) / 100 : 0

  // TSP contribution (percentage of base pay)
  const tsp = Math.round(basePay * (Math.min(tspPercent, 100) / 100) * 100) / 100

  const totalDeductions = Math.round((federalTax + ficaSocialSecurity + ficaMedicare + sgli + tsp) * 100) / 100

  const deductions: DeductionBreakdown = {
    federalTax: Math.round(federalTax * 100) / 100,
    ficaSocialSecurity: Math.round(ficaSocialSecurity * 100) / 100,
    ficaMedicare: Math.round(ficaMedicare * 100) / 100,
    sgli,
    tsp,
    totalDeductions,
  }

  const netPay = Math.round((grossPay - totalDeductions) * 100) / 100

  return {
    basePay,
    bas,
    bah,
    grossPay,
    deductions,
    netPay,
    annualGross: Math.round(grossPay * 12 * 100) / 100,
    annualNet: Math.round(netPay * 12 * 100) / 100,
  }
}

/**
 * Simplified federal tax estimate using 2024 brackets (single filer).
 * This is an approximation — actual taxes depend on filing status,
 * deductions, credits, and state taxes.
 */
function estimateFederalTax(annualTaxableIncome: number): number {
  // Standard deduction for single filer
  const standardDeduction = 14600
  const taxable = Math.max(0, annualTaxableIncome - standardDeduction)

  // 2024 tax brackets (single)
  const brackets = [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ]

  let tax = 0
  let remaining = taxable

  for (let i = 0; i < brackets.length && remaining > 0; i++) {
    const prevLimit = i === 0 ? 0 : brackets[i - 1].limit
    const bracketWidth = brackets[i].limit - prevLimit
    const taxableInBracket = Math.min(remaining, bracketWidth)
    tax += taxableInBracket * brackets[i].rate
    remaining -= taxableInBracket
  }

  return tax
}
