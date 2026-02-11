/**
 * Cost of Living Data
 *
 * Relative cost indexes for major military and civilian metros.
 * Base index = 100 (national average). A value of 120 means 20% above average.
 *
 * Sources: Council for Community and Economic Research (C2ER) 2024,
 * BLS Consumer Expenditure Survey, and military installation area estimates.
 *
 * Categories: housing, groceries, utilities, transportation, healthcare, misc
 */

export interface CityData {
  id: string
  city: string
  state: string
  region: 'northeast' | 'southeast' | 'midwest' | 'southwest' | 'west' | 'pacific'
  nearBase?: string              // nearby military installation
  overallIndex: number           // composite COL index (100 = national avg)
  housing: number
  groceries: number
  utilities: number
  transportation: number
  healthcare: number
  misc: number
  medianIncome: number           // median household income ($)
  avgRent1BR: number             // average 1-BR rent ($)
  avgRent2BR: number             // average 2-BR rent ($)
}

export const COST_OF_LIVING_CITIES: CityData[] = [
  // Northeast
  {
    id: 'nyc', city: 'New York City', state: 'NY', region: 'northeast',
    overallIndex: 187, housing: 282, groceries: 116, utilities: 115, transportation: 130, healthcare: 117, misc: 120,
    medianIncome: 74694, avgRent1BR: 3400, avgRent2BR: 4200,
  },
  {
    id: 'boston', city: 'Boston', state: 'MA', region: 'northeast',
    overallIndex: 152, housing: 208, groceries: 108, utilities: 120, transportation: 112, healthcare: 122, misc: 115,
    medianIncome: 81744, avgRent1BR: 2800, avgRent2BR: 3300,
  },
  {
    id: 'dc', city: 'Washington', state: 'DC', region: 'northeast',
    nearBase: 'Joint Base Andrews / Ft. Belvoir',
    overallIndex: 149, housing: 205, groceries: 108, utilities: 108, transportation: 115, healthcare: 110, misc: 112,
    medianIncome: 90842, avgRent1BR: 2300, avgRent2BR: 2800,
  },
  {
    id: 'norfolk', city: 'Norfolk / Virginia Beach', state: 'VA', region: 'northeast',
    nearBase: 'Naval Station Norfolk',
    overallIndex: 102, housing: 104, groceries: 99, utilities: 100, transportation: 102, healthcare: 98, misc: 103,
    medianIncome: 62170, avgRent1BR: 1250, avgRent2BR: 1500,
  },

  // Southeast
  {
    id: 'jacksonville', city: 'Jacksonville', state: 'FL', region: 'southeast',
    nearBase: 'NAS Jacksonville / NS Mayport',
    overallIndex: 96, housing: 89, groceries: 101, utilities: 101, transportation: 99, healthcare: 95, misc: 98,
    medianIncome: 59540, avgRent1BR: 1300, avgRent2BR: 1550,
  },
  {
    id: 'fayetteville', city: 'Fayetteville', state: 'NC', region: 'southeast',
    nearBase: 'Fort Liberty (Bragg)',
    overallIndex: 86, housing: 66, groceries: 98, utilities: 96, transportation: 92, healthcare: 96, misc: 95,
    medianIncome: 47680, avgRent1BR: 900, avgRent2BR: 1100,
  },
  {
    id: 'killeen', city: 'Killeen / Temple', state: 'TX', region: 'southeast',
    nearBase: 'Fort Cavazos (Hood)',
    overallIndex: 82, housing: 60, groceries: 93, utilities: 95, transportation: 90, healthcare: 88, misc: 92,
    medianIncome: 50580, avgRent1BR: 850, avgRent2BR: 1050,
  },
  {
    id: 'sanantonio', city: 'San Antonio', state: 'TX', region: 'southeast',
    nearBase: 'JBSA (Ft. Sam Houston / Lackland / Randolph)',
    overallIndex: 91, housing: 78, groceries: 93, utilities: 96, transportation: 96, healthcare: 92, misc: 95,
    medianIncome: 57630, avgRent1BR: 1100, avgRent2BR: 1350,
  },
  {
    id: 'columbia', city: 'Columbia', state: 'SC', region: 'southeast',
    nearBase: 'Fort Jackson',
    overallIndex: 90, housing: 75, groceries: 100, utilities: 99, transportation: 93, healthcare: 95, misc: 96,
    medianIncome: 51600, avgRent1BR: 1000, avgRent2BR: 1200,
  },
  {
    id: 'atlanta', city: 'Atlanta', state: 'GA', region: 'southeast',
    overallIndex: 104, housing: 108, groceries: 102, utilities: 97, transportation: 105, healthcare: 100, misc: 103,
    medianIncome: 65345, avgRent1BR: 1600, avgRent2BR: 1950,
  },
  {
    id: 'tampa', city: 'Tampa', state: 'FL', region: 'southeast',
    nearBase: 'MacDill AFB',
    overallIndex: 103, housing: 107, groceries: 104, utilities: 99, transportation: 101, healthcare: 96, misc: 101,
    medianIncome: 59540, avgRent1BR: 1550, avgRent2BR: 1900,
  },

  // Midwest
  {
    id: 'omaha', city: 'Omaha', state: 'NE', region: 'midwest',
    nearBase: 'Offutt AFB',
    overallIndex: 90, housing: 78, groceries: 96, utilities: 93, transportation: 96, healthcare: 95, misc: 95,
    medianIncome: 62370, avgRent1BR: 950, avgRent2BR: 1150,
  },
  {
    id: 'stlouis', city: 'St. Louis', state: 'MO', region: 'midwest',
    nearBase: 'Scott AFB (nearby)',
    overallIndex: 89, housing: 73, groceries: 98, utilities: 100, transportation: 96, healthcare: 92, misc: 96,
    medianIncome: 55632, avgRent1BR: 1000, avgRent2BR: 1200,
  },
  {
    id: 'chicago', city: 'Chicago', state: 'IL', region: 'midwest',
    nearBase: 'Great Lakes (NTC)',
    overallIndex: 112, housing: 118, groceries: 106, utilities: 98, transportation: 116, healthcare: 105, misc: 108,
    medianIncome: 65000, avgRent1BR: 1800, avgRent2BR: 2200,
  },
  {
    id: 'indianapolis', city: 'Indianapolis', state: 'IN', region: 'midwest',
    overallIndex: 88, housing: 72, groceries: 98, utilities: 93, transportation: 96, healthcare: 93, misc: 95,
    medianIncome: 54020, avgRent1BR: 1000, avgRent2BR: 1200,
  },

  // Southwest
  {
    id: 'elpaso', city: 'El Paso', state: 'TX', region: 'southwest',
    nearBase: 'Fort Bliss',
    overallIndex: 83, housing: 62, groceries: 95, utilities: 96, transportation: 90, healthcare: 87, misc: 90,
    medianIncome: 48866, avgRent1BR: 830, avgRent2BR: 1000,
  },
  {
    id: 'phoenix', city: 'Phoenix', state: 'AZ', region: 'southwest',
    nearBase: 'Luke AFB',
    overallIndex: 102, housing: 104, groceries: 99, utilities: 102, transportation: 101, healthcare: 97, misc: 101,
    medianIncome: 62055, avgRent1BR: 1350, avgRent2BR: 1650,
  },
  {
    id: 'albuquerque', city: 'Albuquerque', state: 'NM', region: 'southwest',
    nearBase: 'Kirtland AFB',
    overallIndex: 91, housing: 82, groceries: 97, utilities: 95, transportation: 95, healthcare: 91, misc: 95,
    medianIncome: 54322, avgRent1BR: 950, avgRent2BR: 1150,
  },
  {
    id: 'coloradosprings', city: 'Colorado Springs', state: 'CO', region: 'southwest',
    nearBase: 'Ft. Carson / Peterson SFB / USAFA',
    overallIndex: 104, housing: 108, groceries: 100, utilities: 92, transportation: 101, healthcare: 100, misc: 103,
    medianIncome: 71090, avgRent1BR: 1350, avgRent2BR: 1650,
  },

  // West
  {
    id: 'sandiego', city: 'San Diego', state: 'CA', region: 'west',
    nearBase: 'MCRD / NB San Diego / Camp Pendleton',
    overallIndex: 160, housing: 232, groceries: 110, utilities: 116, transportation: 115, healthcare: 112, misc: 112,
    medianIncome: 85750, avgRent1BR: 2300, avgRent2BR: 2900,
  },
  {
    id: 'losangeles', city: 'Los Angeles', state: 'CA', region: 'west',
    overallIndex: 166, housing: 250, groceries: 112, utilities: 112, transportation: 120, healthcare: 113, misc: 113,
    medianIncome: 69778, avgRent1BR: 2400, avgRent2BR: 3100,
  },
  {
    id: 'seattle', city: 'Seattle', state: 'WA', region: 'west',
    nearBase: 'JBLM (Joint Base Lewis-McChord)',
    overallIndex: 150, housing: 210, groceries: 113, utilities: 95, transportation: 120, healthcare: 115, misc: 113,
    medianIncome: 97185, avgRent1BR: 2100, avgRent2BR: 2600,
  },
  {
    id: 'lasvegas', city: 'Las Vegas', state: 'NV', region: 'west',
    nearBase: 'Nellis AFB / Creech AFB',
    overallIndex: 103, housing: 105, groceries: 105, utilities: 95, transportation: 108, healthcare: 97, misc: 101,
    medianIncome: 61000, avgRent1BR: 1300, avgRent2BR: 1550,
  },

  // Pacific
  {
    id: 'honolulu', city: 'Honolulu', state: 'HI', region: 'pacific',
    nearBase: 'JBPHH / Schofield Barracks',
    overallIndex: 192, housing: 293, groceries: 139, utilities: 168, transportation: 125, healthcare: 108, misc: 118,
    medianIncome: 84423, avgRent1BR: 2200, avgRent2BR: 2800,
  },
  {
    id: 'anchorage', city: 'Anchorage', state: 'AK', region: 'pacific',
    nearBase: 'JBER (Elmendorf-Richardson)',
    overallIndex: 127, housing: 132, groceries: 118, utilities: 135, transportation: 110, healthcare: 135, misc: 110,
    medianIncome: 78740, avgRent1BR: 1200, avgRent2BR: 1500,
  },
]

export const CATEGORIES = ['housing', 'groceries', 'utilities', 'transportation', 'healthcare', 'misc'] as const
export type CostCategory = typeof CATEGORIES[number]

export const CATEGORY_LABELS: Record<CostCategory, string> = {
  housing: 'Housing',
  groceries: 'Groceries',
  utilities: 'Utilities',
  transportation: 'Transportation',
  healthcare: 'Healthcare',
  misc: 'Miscellaneous',
}

export const REGION_LABELS: Record<string, string> = {
  northeast: 'Northeast',
  southeast: 'Southeast',
  midwest: 'Midwest',
  southwest: 'Southwest',
  west: 'West Coast',
  pacific: 'Pacific',
}
