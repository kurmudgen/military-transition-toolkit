/**
 * 2025 Military Pay Tables
 * Source: Defense Finance and Accounting Service (DFAS)
 * https://www.dfas.mil/militarymembers/payentitlements/Pay-Tables/
 *
 * Base pay indexed by pay grade and years of service.
 * Values are monthly amounts in dollars.
 */

// Years of service breakpoints used in the pay table
export const YOS_BREAKPOINTS = [0, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40] as const

export type PayGrade =
  | 'E-1' | 'E-2' | 'E-3' | 'E-4' | 'E-5' | 'E-6' | 'E-7' | 'E-8' | 'E-9'
  | 'W-1' | 'W-2' | 'W-3' | 'W-4' | 'W-5'
  | 'O-1' | 'O-2' | 'O-3' | 'O-4' | 'O-5' | 'O-6' | 'O-7' | 'O-8' | 'O-9' | 'O-10'

/**
 * 2025 Monthly Base Pay Table
 * Row = pay grade, columns indexed by YOS_BREAKPOINTS position.
 * A 0 means pay is not authorized at that grade/YOS combination.
 */
export const BASE_PAY_TABLE: Record<PayGrade, number[]> = {
  // Enlisted
  'E-1': [1997, 1997, 1997, 1997, 1997, 1997, 1997, 1997, 1997, 1997, 1997, 1997, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'E-2': [2239, 2239, 2239, 2239, 2239, 2239, 2239, 2239, 2239, 2239, 2239, 2239, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'E-3': [2354, 2503, 2654, 2654, 2654, 2654, 2654, 2654, 2654, 2654, 2654, 2654, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'E-4': [2610, 2745, 2893, 2965, 3086, 3210, 3210, 3210, 3210, 3210, 3210, 3210, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'E-5': [2848, 3039, 3187, 3338, 3474, 3594, 3711, 3811, 3811, 3811, 3811, 3811, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'E-6': [3114, 3428, 3578, 3726, 3864, 3978, 4102, 4238, 4346, 4461, 4505, 4505, 4505, 4505, 4505, 4505, 0, 0, 0, 0, 0, 0],
  'E-7': [3603, 3933, 4084, 4284, 4431, 4568, 4715, 4826, 4954, 5091, 5195, 5296, 5403, 5403, 5403, 5403, 5403, 0, 0, 0, 0, 0],
  'E-8': [0, 0, 0, 0, 0, 0, 0, 5233, 5369, 5504, 5640, 5772, 5907, 5984, 5984, 5984, 5984, 0, 0, 0, 0, 0],
  'E-9': [0, 0, 0, 0, 0, 0, 0, 0, 6389, 6527, 6719, 6860, 7057, 7196, 7340, 7340, 7340, 7340, 0, 0, 0, 0],

  // Warrant Officers
  'W-1': [3627, 4022, 4022, 4226, 4432, 4632, 4829, 5090, 5340, 5538, 5724, 5990, 6263, 6263, 6263, 6263, 0, 0, 0, 0, 0, 0],
  'W-2': [4136, 4530, 4530, 4632, 4845, 5080, 5335, 5537, 5724, 5917, 6098, 6263, 6442, 6611, 6611, 6611, 6611, 0, 0, 0, 0, 0],
  'W-3': [4680, 4879, 4879, 4934, 5142, 5417, 5720, 5917, 6098, 6350, 6611, 6793, 6949, 7106, 7266, 7266, 7266, 7266, 0, 0, 0, 0],
  'W-4': [5117, 5416, 5416, 5553, 5812, 6062, 6350, 6611, 6793, 7037, 7266, 7451, 7645, 7830, 8017, 8017, 8017, 8017, 8017, 0, 0, 0],
  'W-5': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7645, 7830, 8017, 8213, 8407, 8605, 8605, 8605, 8605, 8605, 8605, 8605],

  // Officers
  'O-1': [3826, 3981, 4815, 4815, 4815, 4815, 4815, 4815, 4815, 4815, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'O-2': [4407, 5019, 5780, 5780, 5780, 5780, 5780, 5780, 5780, 5780, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'O-3': [5024, 5697, 6152, 6709, 7029, 7382, 7594, 7800, 8059, 8059, 8059, 8059, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'O-4': [5779, 6690, 7140, 7236, 7647, 8085, 8432, 8756, 9040, 9324, 9525, 9623, 9623, 9623, 0, 0, 0, 0, 0, 0, 0, 0],
  'O-5': [6700, 7541, 8065, 8161, 8489, 8770, 9173, 9536, 9933, 10266, 10593, 10829, 11041, 11041, 11041, 11041, 0, 0, 0, 0, 0, 0],
  'O-6': [7852, 8624, 9192, 9192, 9223, 9618, 9679, 9679, 10254, 10593, 10980, 11376, 11696, 12099, 12693, 12693, 12693, 12693, 0, 0, 0, 0],
  'O-7': [10381, 10863, 11079, 11263, 11580, 11893, 12257, 12615, 12988, 13358, 13753, 13753, 13753, 13753, 13753, 13753, 0, 0, 0, 0, 0, 0],
  'O-8': [12510, 12918, 13195, 13261, 13580, 14126, 14268, 14789, 14789, 14789, 15422, 15563, 15881, 15881, 15881, 15881, 0, 0, 0, 0, 0, 0],
  'O-9': [0, 0, 0, 0, 0, 0, 0, 0, 0, 16239, 16394, 16764, 17137, 17137, 17903, 17903, 0, 0, 0, 0, 0, 0],
  'O-10': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17903, 18038, 18860, 18860, 19803, 19803, 19803, 19803, 0, 0],
}

/**
 * 2025 Basic Allowance for Subsistence (BAS) — monthly rates
 */
export const BAS_RATES = {
  enlisted: 452.56,
  officer: 311.68,
} as const

/**
 * Look up base pay for a given grade and years of service.
 * Finds the highest YOS breakpoint that doesn't exceed the input.
 */
export function getBasePay(grade: PayGrade, yearsOfService: number): number {
  const row = BASE_PAY_TABLE[grade]
  if (!row) return 0

  let colIndex = 0
  for (let i = YOS_BREAKPOINTS.length - 1; i >= 0; i--) {
    if (yearsOfService >= YOS_BREAKPOINTS[i]) {
      colIndex = i
      break
    }
  }

  const pay = row[colIndex]
  return pay || 0
}

/**
 * Get BAS rate based on pay grade category.
 */
export function getBAS(grade: PayGrade): number {
  return grade.startsWith('E') ? BAS_RATES.enlisted : BAS_RATES.officer
}

/**
 * Get all pay grades organized by category.
 */
export function getPayGradesByCategory(): { enlisted: PayGrade[]; warrant: PayGrade[]; officer: PayGrade[] } {
  return {
    enlisted: ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9'],
    warrant: ['W-1', 'W-2', 'W-3', 'W-4', 'W-5'],
    officer: ['O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10'],
  }
}
