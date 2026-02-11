/**
 * Financial Calculation Utilities
 *
 * Pure functions for financial math — no side effects, no state.
 * All monetary values are in dollars (not cents) unless noted otherwise.
 * Ported from Military Money Coaching (MMC-K5) and adapted for MTT.
 */

// ─── Compound Interest ──────────────────────────────────────────────

/**
 * Calculate compound interest on a principal over time.
 * Formula: A = P(1 + r/n)^(nt)
 *
 * @param principal - Initial amount ($)
 * @param annualRate - Annual interest rate as decimal (e.g., 0.07 for 7%)
 * @param years - Number of years
 * @param compoundsPerYear - Compounding frequency (default: 12 for monthly)
 * @returns Final amount including principal and interest
 */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number = 12
): number {
  if (principal <= 0 || years <= 0) return principal
  if (annualRate <= 0) return principal
  if (compoundsPerYear <= 0) return principal

  const amount =
    principal *
    Math.pow(1 + annualRate / compoundsPerYear, compoundsPerYear * years)
  return Math.round(amount * 100) / 100
}

/**
 * Calculate compound interest with regular contributions.
 * Useful for TSP/401k projections with ongoing deposits.
 *
 * @param principal - Starting balance ($)
 * @param monthlyContribution - Amount added each month ($)
 * @param annualRate - Annual rate of return as decimal
 * @param years - Number of years
 * @returns Final balance after all contributions and growth
 */
export function calculateCompoundInterestWithContributions(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): number {
  if (years <= 0) return principal
  const monthlyRate = annualRate / 12
  const months = Math.floor(years * 12)

  let balance = Math.max(0, principal)
  for (let i = 0; i < months; i++) {
    balance = balance * (1 + monthlyRate) + Math.max(0, monthlyContribution)
  }
  return Math.round(balance * 100) / 100
}

// ─── Loan / Amortization ────────────────────────────────────────────

/**
 * Calculate monthly payment for a fixed-rate loan.
 * Formula: M = P[r(1+r)^n] / [(1+r)^n - 1]
 *
 * @param principal - Loan amount ($)
 * @param annualRate - Annual interest rate as decimal
 * @param termMonths - Loan term in months
 * @returns Monthly payment amount
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  if (principal <= 0 || termMonths <= 0) return 0
  if (annualRate <= 0) return Math.round((principal / termMonths) * 100) / 100

  const monthlyRate = annualRate / 12
  const payment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  return Math.round(payment * 100) / 100
}

/**
 * Calculate total interest paid over the life of a loan.
 *
 * @param principal - Loan amount ($)
 * @param annualRate - Annual interest rate as decimal
 * @param termMonths - Loan term in months
 * @returns Total interest paid
 */
export function calculateTotalInterest(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, termMonths)
  const totalPaid = monthlyPayment * termMonths
  return Math.round((totalPaid - principal) * 100) / 100
}

// ─── Payoff Calculator ──────────────────────────────────────────────

/**
 * Calculate months to pay off a debt with a fixed monthly payment.
 * Formula: n = -log(1 - rP/M) / log(1 + r)
 *
 * @param balance - Current balance ($)
 * @param annualRate - Annual interest rate as decimal
 * @param monthlyPayment - Monthly payment amount ($)
 * @returns Number of months to pay off, or Infinity if payment is too low
 */
export function calculateMonthsToPayoff(
  balance: number,
  annualRate: number,
  monthlyPayment: number
): number {
  if (balance <= 0) return 0
  if (monthlyPayment <= 0) return Infinity

  if (annualRate <= 0) {
    return Math.ceil(balance / monthlyPayment)
  }

  const monthlyRate = annualRate / 12
  const minPayment = balance * monthlyRate

  if (monthlyPayment <= minPayment) return Infinity

  const months =
    -Math.log(1 - (monthlyRate * balance) / monthlyPayment) /
    Math.log(1 + monthlyRate)
  return Math.ceil(months)
}

/**
 * Calculate interest savings from extra monthly payments.
 *
 * @param balance - Current balance ($)
 * @param annualRate - Annual interest rate as decimal
 * @param currentPayment - Current monthly payment ($)
 * @param extraPayment - Additional monthly payment ($)
 * @returns Object with months saved and interest saved
 */
export function calculateInterestSavings(
  balance: number,
  annualRate: number,
  currentPayment: number,
  extraPayment: number
): { monthsSaved: number; interestSaved: number } {
  if (balance <= 0 || extraPayment <= 0) {
    return { monthsSaved: 0, interestSaved: 0 }
  }

  const monthlyRate = annualRate / 12

  function simulatePayoff(payment: number): { months: number; totalInterest: number } {
    let remaining = balance
    let totalInterest = 0
    let months = 0
    const maxMonths = 600 // 50-year cap

    while (remaining > 0 && months < maxMonths) {
      const interest = remaining * monthlyRate
      totalInterest += interest
      remaining = remaining + interest - payment
      months++
      if (remaining < 0) remaining = 0
    }
    return { months, totalInterest }
  }

  const original = simulatePayoff(currentPayment)
  const accelerated = simulatePayoff(currentPayment + extraPayment)

  return {
    monthsSaved: Math.max(0, original.months - accelerated.months),
    interestSaved: Math.round((original.totalInterest - accelerated.totalInterest) * 100) / 100,
  }
}

// ─── Ratios & Metrics ───────────────────────────────────────────────

/**
 * Calculate debt-to-income ratio.
 * Healthy: below 36%. Concerning: 36-49%. Dangerous: 50%+.
 *
 * @param monthlyDebtPayments - Total monthly debt payments ($)
 * @param monthlyGrossIncome - Gross monthly income ($)
 * @returns Ratio as decimal (e.g., 0.35 for 35%)
 */
export function calculateDebtToIncomeRatio(
  monthlyDebtPayments: number,
  monthlyGrossIncome: number
): number {
  if (monthlyGrossIncome <= 0) return 0
  if (monthlyDebtPayments <= 0) return 0
  return Math.round((monthlyDebtPayments / monthlyGrossIncome) * 10000) / 10000
}

/**
 * Calculate savings rate (percentage of income being saved).
 * Recommended: 20%+ (the "20" in 50/30/20).
 *
 * @param monthlySavings - Amount saved per month ($)
 * @param monthlyGrossIncome - Gross monthly income ($)
 * @returns Rate as decimal (e.g., 0.20 for 20%)
 */
export function calculateSavingsRate(
  monthlySavings: number,
  monthlyGrossIncome: number
): number {
  if (monthlyGrossIncome <= 0) return 0
  if (monthlySavings <= 0) return 0
  return Math.round((monthlySavings / monthlyGrossIncome) * 10000) / 10000
}

/**
 * Calculate net worth (assets minus liabilities).
 *
 * @param totalAssets - Sum of all assets ($)
 * @param totalLiabilities - Sum of all debts ($)
 * @returns Net worth ($)
 */
export function calculateNetWorth(
  totalAssets: number,
  totalLiabilities: number
): number {
  return Math.round(((totalAssets || 0) - (totalLiabilities || 0)) * 100) / 100
}

// ─── APR & Fee Calculations ─────────────────────────────────────────

/**
 * Calculate effective APR from a flat fee on a short-term loan.
 * Reveals the true cost of payday loans, title loans, etc.
 *
 * @param loanAmount - Amount borrowed ($)
 * @param fee - Fee charged ($)
 * @param termDays - Loan term in days
 * @returns Annualized percentage rate as decimal
 */
export function calculateAPRFromFee(
  loanAmount: number,
  fee: number,
  termDays: number
): number {
  if (loanAmount <= 0 || termDays <= 0) return 0
  if (fee <= 0) return 0
  const periodsPerYear = 365 / termDays
  return Math.round((fee / loanAmount) * periodsPerYear * 10000) / 10000
}

// ─── Future Value & Projections ─────────────────────────────────────

/**
 * Calculate future value of a lump sum.
 * Formula: FV = PV × (1 + r)^n
 *
 * @param presentValue - Current value ($)
 * @param annualRate - Annual growth rate as decimal
 * @param years - Number of years
 * @returns Future value ($)
 */
export function calculateFutureValue(
  presentValue: number,
  annualRate: number,
  years: number
): number {
  if (presentValue <= 0 || years <= 0) return Math.max(0, presentValue)
  if (annualRate <= 0) return presentValue
  const fv = presentValue * Math.pow(1 + annualRate, years)
  return Math.round(fv * 100) / 100
}

/**
 * Calculate how many months until a savings goal is reached.
 *
 * @param targetAmount - Goal amount ($)
 * @param currentAmount - Amount already saved ($)
 * @param monthlyContribution - Amount saved per month ($)
 * @param annualRate - Annual growth rate as decimal (default 0 for cash savings)
 * @returns Months to reach goal, or Infinity if contribution is 0
 */
export function calculateTimeToGoal(
  targetAmount: number,
  currentAmount: number,
  monthlyContribution: number,
  annualRate: number = 0
): number {
  const remaining = targetAmount - currentAmount
  if (remaining <= 0) return 0
  if (monthlyContribution <= 0) return Infinity

  if (annualRate <= 0) {
    return Math.ceil(remaining / monthlyContribution)
  }

  // Iterative approach for growth with contributions
  const monthlyRate = annualRate / 12
  let balance = currentAmount
  let months = 0
  const maxMonths = 1200 // 100-year cap

  while (balance < targetAmount && months < maxMonths) {
    balance = balance * (1 + monthlyRate) + monthlyContribution
    months++
  }
  return months >= maxMonths ? Infinity : months
}

// ─── Budget Calculations ────────────────────────────────────────────

export interface BudgetSplit {
  needs: number
  wants: number
  savings: number
}

/**
 * Calculate the 50/30/20 budget split.
 * 50% needs (housing, food, utilities, insurance, minimum debt payments)
 * 30% wants (entertainment, dining out, hobbies, subscriptions)
 * 20% savings (emergency fund, retirement, extra debt payments)
 *
 * @param monthlyIncome - After-tax monthly income ($)
 * @returns Object with dollar amounts for needs, wants, and savings
 */
export function calculate503020(monthlyIncome: number): BudgetSplit {
  if (monthlyIncome <= 0) return { needs: 0, wants: 0, savings: 0 }
  return {
    needs: Math.round(monthlyIncome * 0.5 * 100) / 100,
    wants: Math.round(monthlyIncome * 0.3 * 100) / 100,
    savings: Math.round(monthlyIncome * 0.2 * 100) / 100,
  }
}

/**
 * Calculate budget variance (how much over/under budget).
 *
 * @param budgeted - Budgeted amount ($)
 * @param actual - Actual spending ($)
 * @returns Positive = under budget, negative = over budget
 */
export function calculateBudgetVariance(
  budgeted: number,
  actual: number
): number {
  return Math.round((budgeted - actual) * 100) / 100
}

// ─── Affordability ──────────────────────────────────────────────────

/**
 * Calculate an affordability score (0-100) for a purchase.
 * Considers income, existing debt, savings, and purchase cost.
 *
 * @param monthlyIncome - Gross monthly income ($)
 * @param monthlyDebtPayments - Existing monthly debt payments ($)
 * @param savings - Current liquid savings ($)
 * @param purchaseCost - Cost of the proposed purchase ($)
 * @returns Score from 0 (cannot afford) to 100 (easily affordable)
 */
export function calculateAffordabilityScore(
  monthlyIncome: number,
  monthlyDebtPayments: number,
  savings: number,
  purchaseCost: number
): number {
  if (monthlyIncome <= 0 || purchaseCost <= 0) return 0

  // Factor 1: Debt-to-income ratio (40 points max)
  const dti = calculateDebtToIncomeRatio(monthlyDebtPayments, monthlyIncome)
  const dtiScore = Math.max(0, 40 * (1 - dti / 0.5))

  // Factor 2: Savings coverage (30 points max)
  const savingsCoverage = Math.min(1, savings / purchaseCost)
  const savingsScore = 30 * savingsCoverage

  // Factor 3: Monthly cost relative to income (30 points max)
  // Assumes purchase would be financed over 60 months at 6%
  const estimatedMonthly = calculateMonthlyPayment(purchaseCost, 0.06, 60)
  const costRatio = estimatedMonthly / monthlyIncome
  const costScore = Math.max(0, 30 * (1 - costRatio / 0.2))

  const total = Math.round(dtiScore + savingsScore + costScore)
  return Math.min(100, Math.max(0, total))
}

// ─── Emergency Fund ─────────────────────────────────────────────────

/**
 * Calculate emergency fund target based on monthly expenses.
 *
 * @param monthlyExpenses - Total monthly essential expenses ($)
 * @param months - Number of months of coverage (default: 6)
 * @returns Target emergency fund amount ($)
 */
export function calculateEmergencyFundTarget(
  monthlyExpenses: number,
  months: number = 6
): number {
  if (monthlyExpenses <= 0 || months <= 0) return 0
  return Math.round(monthlyExpenses * months * 100) / 100
}

/**
 * Calculate how many months of expenses an emergency fund covers.
 *
 * @param fundBalance - Current emergency fund balance ($)
 * @param monthlyExpenses - Monthly essential expenses ($)
 * @returns Number of months of coverage
 */
export function calculateEmergencyFundMonths(
  fundBalance: number,
  monthlyExpenses: number
): number {
  if (monthlyExpenses <= 0 || fundBalance <= 0) return 0
  return Math.round((fundBalance / monthlyExpenses) * 10) / 10
}

// ─── TSP / Retirement ───────────────────────────────────────────────

/**
 * Project TSP (Thrift Savings Plan) growth over time.
 *
 * @param currentBalance - Current TSP balance ($)
 * @param monthlyContribution - Monthly TSP contribution ($)
 * @param annualReturn - Expected annual return as decimal (e.g., 0.07 for 7%)
 * @param years - Years until retirement
 * @returns Projected balance at retirement
 */
export function calculateTSPGrowth(
  currentBalance: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number
): number {
  return calculateCompoundInterestWithContributions(
    currentBalance,
    monthlyContribution,
    annualReturn,
    years
  )
}

/**
 * Estimate military retirement pay.
 *
 * High-3 system: 2.5% × years of service × average of highest 36 months of base pay
 * BRS (Blended Retirement System): 2.0% × years of service × average of highest 36 months
 *
 * @param highThreeAverage - Average of highest 36 months of base pay ($)
 * @param yearsOfService - Total years of creditable service
 * @param isBRS - Whether member is under BRS (default false for High-3)
 * @returns Estimated monthly retirement pay ($)
 */
export function calculateMilitaryRetirementPay(
  highThreeAverage: number,
  yearsOfService: number,
  isBRS: boolean = false
): number {
  if (highThreeAverage <= 0 || yearsOfService <= 0) return 0

  const multiplier = isBRS ? 0.02 : 0.025
  const percentage = Math.min(yearsOfService * multiplier, 1) // Cap at 100%
  const monthlyPay = highThreeAverage * percentage
  return Math.round(monthlyPay * 100) / 100
}

/**
 * Calculate TSP contribution amount from base pay and percentage.
 *
 * @param monthlyBasePay - Monthly base pay ($)
 * @param contributionPercent - Contribution as percentage (e.g., 5 for 5%)
 * @returns Monthly contribution amount ($)
 */
export function calculateTSPContribution(
  monthlyBasePay: number,
  contributionPercent: number
): number {
  if (monthlyBasePay <= 0 || contributionPercent <= 0) return 0
  const rate = Math.min(contributionPercent, 100) / 100
  return Math.round(monthlyBasePay * rate * 100) / 100
}

// ─── Utility Helpers ────────────────────────────────────────────────

/**
 * Round a number to the nearest cent.
 */
export function roundToCent(value: number): number {
  return Math.round(value * 100) / 100
}

/**
 * Round a number to the nearest dollar.
 */
export function roundToDollar(value: number): number {
  return Math.round(value)
}

/**
 * Clamp a number between a minimum and maximum.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Calculate simple percentage.
 *
 * @param part - The part value
 * @param whole - The total value
 * @returns Percentage as a number (e.g., 75 for 75%)
 */
export function calculatePercentage(part: number, whole: number): number {
  if (whole <= 0) return 0
  return Math.round((part / whole) * 10000) / 100
}
