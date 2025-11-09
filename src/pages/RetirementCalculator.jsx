import { useState, useEffect } from 'react'
import UseProfileButton from '../components/UseProfileButton'
import { getProfileData, getServiceInfo, getLocationInfo } from '../utils/profileAutoFill'
import { isPromoModeActive } from '../utils/promoConfig'
import { SHUTDOWN_BANNER } from '../utils/constants'

// 2025 Base Pay Data - Retirement Years Only (20-30 years)
// Source: 2025 Active Duty Pay Table effective April 1, 2025
const BASE_PAY_2025 = {
  // Enlisted (E-5 through E-9)
  'E-9': { '20': 9374.10, '22': 9374.10, '24': 9843.30, '26': 9843.30, '28': 10336.50, '30': 10336.50 },
  'E-8': { '20': 7619.40, '22': 7772.10, '24': 7772.10, '26': 7772.10, '28': 7772.10, '30': 7772.10 },
  'E-7': { '20': 6017.10, '22': 6238.20, '24': 6356.70, '26': 6808.80, '28': 6808.80, '30': 6808.80 },
  'E-6': { '20': 5074.80, '22': 5074.80, '24': 5074.80, '26': 5074.80, '28': 5074.80, '30': 5074.80 },
  'E-5': { '20': 4259.70, '22': 4259.70, '24': 4259.70, '26': 4259.70, '28': 4259.70, '30': 4259.70 },
  // Warrant Officers (W-1 through W-5)
  'W-5': { '20': 12821.10, '22': 12821.10, '24': 12821.10, '26': 12821.10, '28': 12821.10, '30': 12821.10 },
  'W-4': { '20': 8891.10, '22': 9315.60, '24': 9664.80, '26': 10062.90, '28': 10062.90, '30': 10263.60 },
  'W-3': { '20': 8166.30, '22': 8354.40, '24': 8554.50, '26': 8827.20, '28': 8827.20, '30': 8827.20 },
  'W-2': { '20': 7164.60, '22': 7313.70, '24': 7431.90, '26': 7431.90, '28': 7431.90, '30': 7431.90 },
  'W-1': { '20': 6753.60, '22': 6753.60, '24': 6753.60, '26': 6753.60, '28': 6753.60, '30': 6753.60 },
  // Officers (O-1 through O-10)
  'O-10': { '20': 18808.20, '22': 18808.20, '24': 18808.20, '26': 18808.20, '28': 18808.20, '30': 18808.20 },
  'O-9': { '20': 18808.20, '22': 18808.20, '24': 18808.20, '26': 18808.20, '28': 18808.20, '30': 18808.20 },
  'O-8': { '20': 17917.20, '22': 18359.10, '24': 18359.10, '26': 18359.10, '28': 18359.10, '30': 18808.20 },
  'O-7': { '20': 16202.10, '22': 16202.10, '24': 16202.10, '26': 16202.10, '28': 16285.50, '30': 16611.00 },
  'O-6': { '20': 13247.70, '22': 13596.30, '24': 13949.10, '26': 14632.80, '28': 14632.80, '30': 14925.00 },
  'O-5': { '20': 11592.30, '22': 11940.90, '24': 11940.90, '26': 11940.90, '28': 11940.90, '30': 11940.90 },
  'O-4': { '20': 10125.00, '22': 10125.00, '24': 10125.00, '26': 10125.00, '28': 10125.00, '30': 10125.00 },
  'O-3': { '20': 8674.50, '22': 8674.50, '24': 8674.50, '26': 8674.50, '28': 8674.50, '30': 8674.50 },
  'O-2': { '20': 6375.30, '22': 6375.30, '24': 6375.30, '26': 6375.30, '28': 6375.30, '30': 6375.30 },
  'O-1': { '20': 5031.30, '22': 5031.30, '24': 5031.30, '26': 5031.30, '28': 5031.30, '30': 5031.30 },
}

// VA Disability Rates 2025 (monthly) - Comprehensive with Dependents
const VA_DISABILITY_RATES = {
  '0%': 0,
  '10%': 171,
  '20%': 338,
  '30%': 524,
  '40%': 755,
  '50%': 1075,
  '60%': 1361,
  '70%': 1716,
  '80%': 1995,
  '90%': 2241,
  '100%': 3737
}

// Comprehensive 2025 VA Disability Rates with Dependents
const VA_DISABILITY_WITH_DEPENDENTS = {
  '0%': { base: 0, withSpouse: 0, spouseAndOneChild: 0, spouseAndTwoChildren: 0, spouseAndThreeChildren: 0, spouseAndFourPlusChildren: 0, oneChildNoSpouse: 0, twoChildrenNoSpouse: 0, oneParent: 0, twoParents: 0 },
  '10%': { base: 171, withSpouse: 171, spouseAndOneChild: 171, spouseAndTwoChildren: 171, spouseAndThreeChildren: 171, spouseAndFourPlusChildren: 171, oneChildNoSpouse: 171, twoChildrenNoSpouse: 171, oneParent: 171, twoParents: 171 },
  '20%': { base: 338, withSpouse: 338, spouseAndOneChild: 338, spouseAndTwoChildren: 338, spouseAndThreeChildren: 338, spouseAndFourPlusChildren: 338, oneChildNoSpouse: 338, twoChildrenNoSpouse: 338, oneParent: 338, twoParents: 338 },
  '30%': { base: 524, withSpouse: 586, spouseAndOneChild: 633, spouseAndTwoChildren: 677, spouseAndThreeChildren: 718, spouseAndFourPlusChildren: 718, oneChildNoSpouse: 563, twoChildrenNoSpouse: 597, oneParent: 556, twoParents: 587 },
  '40%': { base: 755, withSpouse: 847, spouseAndOneChild: 908, spouseAndTwoChildren: 965, spouseAndThreeChildren: 1019, spouseAndFourPlusChildren: 1019, oneChildNoSpouse: 804, twoChildrenNoSpouse: 849, oneParent: 795, twoParents: 834 },
  '50%': { base: 1075, withSpouse: 1197, spouseAndOneChild: 1271, spouseAndTwoChildren: 1341, spouseAndThreeChildren: 1408, spouseAndFourPlusChildren: 1408, oneChildNoSpouse: 1138, twoChildrenNoSpouse: 1197, oneParent: 1124, twoParents: 1172 },
  '60%': { base: 1361, withSpouse: 1513, spouseAndOneChild: 1602, spouseAndTwoChildren: 1686, spouseAndThreeChildren: 1768, spouseAndFourPlusChildren: 1768, oneChildNoSpouse: 1438, twoChildrenNoSpouse: 1511, oneParent: 1417, twoParents: 1472 },
  '70%': { base: 1716, withSpouse: 1898, spouseAndOneChild: 2001, spouseAndTwoChildren: 2101, spouseAndThreeChildren: 2198, spouseAndFourPlusChildren: 2198, oneChildNoSpouse: 1809, twoChildrenNoSpouse: 1898, oneParent: 1781, twoParents: 1845 },
  '80%': { base: 1995, withSpouse: 2207, spouseAndOneChild: 2326, spouseAndTwoChildren: 2441, spouseAndThreeChildren: 2553, spouseAndFourPlusChildren: 2553, oneChildNoSpouse: 2104, twoChildrenNoSpouse: 2207, oneParent: 2070, twoParents: 2144 },
  '90%': { base: 2241, withSpouse: 2477, spouseAndOneChild: 2611, spouseAndTwoChildren: 2741, spouseAndThreeChildren: 2868, spouseAndFourPlusChildren: 2868, oneChildNoSpouse: 2364, twoChildrenNoSpouse: 2482, oneParent: 2325, twoParents: 2408 },
  '100%': { base: 3737, withSpouse: 3946, spouseAndOneChild: 4096, spouseAndTwoChildren: 4241, spouseAndThreeChildren: 4382, spouseAndFourPlusChildren: 4532, oneChildNoSpouse: 3877, twoChildrenNoSpouse: 4012, oneParent: 3829, twoParents: 3920 }
}

// State tax treatment of military retirement
const STATE_TAX_DATA = {
  'Alabama': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Alaska': { treatment: 'exempt', rate: 0, description: 'No state income tax' },
  'Arizona': { treatment: 'partial', rate: 2.5, description: 'Partial exemption' },
  'Arkansas': { treatment: 'exempt', rate: 0, description: '$6,000 exemption' },
  'California': { treatment: 'taxed', rate: 8, description: 'Fully taxed' },
  'Colorado': { treatment: 'partial', rate: 4, description: 'Partial exemption (age-based)' },
  'Connecticut': { treatment: 'partial', rate: 5, description: 'Partial exemption' },
  'Delaware': { treatment: 'partial', rate: 6, description: '$2,000 exclusion (under 60)' },
  'Florida': { treatment: 'exempt', rate: 0, description: 'No state income tax' },
  'Georgia': { treatment: 'partial', rate: 5, description: 'Up to $65,000 exempt (age 62+)' },
  'Hawaii': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Idaho': { treatment: 'partial', rate: 6, description: 'Partial exemption' },
  'Illinois': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Indiana': { treatment: 'taxed', rate: 3, description: 'Fully taxed' },
  'Iowa': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Kansas': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Kentucky': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Louisiana': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Maine': { treatment: 'partial', rate: 7, description: 'Partial exemption' },
  'Maryland': { treatment: 'partial', rate: 5, description: 'First $5,000 exempt' },
  'Massachusetts': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Michigan': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Minnesota': { treatment: 'taxed', rate: 7, description: 'Fully taxed' },
  'Mississippi': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Missouri': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Montana': { treatment: 'partial', rate: 6, description: 'Partial exemption' },
  'Nebraska': { treatment: 'partial', rate: 5, description: 'Partial exemption' },
  'Nevada': { treatment: 'exempt', rate: 0, description: 'No state income tax' },
  'New Hampshire': { treatment: 'exempt', rate: 0, description: 'No state income tax' },
  'New Jersey': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'New Mexico': { treatment: 'partial', rate: 4, description: 'Partial exemption' },
  'New York': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'North Carolina': { treatment: 'partial', rate: 4, description: 'Up to $47,729 exempt' },
  'North Dakota': { treatment: 'partial', rate: 2, description: 'Partial exemption' },
  'Ohio': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Oklahoma': { treatment: 'exempt', rate: 0, description: 'Fully exempt (75% after 20 years)' },
  'Oregon': { treatment: 'partial', rate: 8, description: 'Partial exemption' },
  'Pennsylvania': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Rhode Island': { treatment: 'partial', rate: 5, description: 'Partial exemption' },
  'South Carolina': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'South Dakota': { treatment: 'exempt', rate: 0, description: 'No state income tax' },
  'Tennessee': { treatment: 'exempt', rate: 0, description: 'No state income tax' },
  'Texas': { treatment: 'exempt', rate: 0, description: 'No state income tax' },
  'Utah': { treatment: 'partial', rate: 4, description: 'Partial exemption' },
  'Vermont': { treatment: 'taxed', rate: 6, description: 'Fully taxed' },
  'Virginia': { treatment: 'partial', rate: 5, description: 'Up to $10,000 exempt' },
  'Washington': { treatment: 'exempt', rate: 0, description: 'No state income tax' },
  'West Virginia': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Wisconsin': { treatment: 'exempt', rate: 0, description: 'Fully exempt' },
  'Wyoming': { treatment: 'exempt', rate: 0, description: 'No state income tax' }
}

const COMMON_SCENARIOS = [
  {
    name: 'E-7 with 20 years, 70% VA rating',
    data: {
      branch: 'Army',
      rank: 'E-7',
      yearsOfService: 20,
      monthsOfService: 0,
      retirementSystem: 'high3',
      high3Pay: 4480,
      vaRating: '70%',
      dependents: 0,
      selectedState: 'Texas',
      electSBP: false
    }
  },
  {
    name: 'W-4 with 24 years, 40% VA rating',
    data: {
      branch: 'Army',
      rank: 'W-4',
      yearsOfService: 24,
      monthsOfService: 0,
      retirementSystem: 'high3',
      high3Pay: 9647.10,
      vaRating: '40%',
      dependents: 1,
      selectedState: 'Virginia',
      electSBP: true
    }
  },
  {
    name: 'O-5 with 22 years, 50% VA rating',
    data: {
      branch: 'Air Force',
      rank: 'O-5',
      yearsOfService: 22,
      monthsOfService: 0,
      retirementSystem: 'high3',
      high3Pay: 10838,
      vaRating: '50%',
      dependents: 1,
      selectedState: 'Florida',
      electSBP: true
    }
  },
  {
    name: 'E-9 with 30 years, 100% VA rating',
    data: {
      branch: 'Navy',
      rank: 'E-9',
      yearsOfService: 30,
      monthsOfService: 0,
      retirementSystem: 'high3',
      high3Pay: 7770,
      vaRating: '100%',
      dependents: 2,
      selectedState: 'Pennsylvania',
      electSBP: false
    }
  }
]

export default function RetirementCalculator({ publicMode = false }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    branch: 'Army',
    rank: 'E-7',
    yearsOfService: 20,
    monthsOfService: 0,
    retirementSystem: 'high3',
    high3Pay: 4480,
    vaRating: '0%',
    dependents: 0,
    selectedState: 'Texas',
    comparisonStates: [],
    electSBP: false
  })
  const [savedCalculations, setSavedCalculations] = useState([])
  const [showResults, setShowResults] = useState(false)

  // Standalone VA Disability Calculator state
  const [vaCalcRating, setVaCalcRating] = useState('100%')
  const [vaCalcDependents, setVaCalcDependents] = useState('base')

  // Calculate VA Disability Payment
  const calculateVADisability = () => {
    const rates = VA_DISABILITY_WITH_DEPENDENTS[vaCalcRating]
    if (!rates) return 0
    return rates[vaCalcDependents] || 0
  }

  const vaMonthly = calculateVADisability()
  const vaAnnual = vaMonthly * 12

  // Set page title
  useEffect(() => {
    document.title = 'Retirement Pay Calculator - Military Transition Toolkit'
  }, [])

  // Load saved calculations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('retirementCalculations')
    if (saved) {
      try {
        setSavedCalculations(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading calculations:', e)
      }
    }
  }, [])

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const loadScenario = (scenario) => {
    setFormData(scenario.data)
    setCurrentStep(1)
    setShowResults(false)
  }

  const calculateRetirement = () => {
    const { yearsOfService, monthsOfService, high3Pay, retirementSystem } = formData
    const totalYears = yearsOfService + (monthsOfService / 12)
    const multiplier = retirementSystem === 'high3' ? 2.5 : 2.0
    const percentage = (totalYears * multiplier) / 100
    return high3Pay * percentage
  }

  const calculateVACompensation = () => {
    const baseRate = VA_DISABILITY_RATES[formData.vaRating] || 0
    // Simplified - real calculation would include dependent rates
    return baseRate
  }

  const calculateStateTax = (state, retirementPay) => {
    const stateData = STATE_TAX_DATA[state]
    if (stateData.treatment === 'exempt') return 0
    if (stateData.treatment === 'partial') return retirementPay * (stateData.rate / 100) * 0.5
    return retirementPay * (stateData.rate / 100)
  }

  const calculateSBP = (retirementPay) => {
    return formData.electSBP ? retirementPay * 0.065 : 0
  }

  const results = {
    monthlyRetirement: calculateRetirement(),
    monthlyVA: calculateVACompensation(),
    totalMonthly: calculateRetirement() + calculateVACompensation(),
    annualIncome: (calculateRetirement() + calculateVACompensation()) * 12,
    stateTax: calculateStateTax(formData.selectedState, calculateRetirement()),
    sbpCost: calculateSBP(calculateRetirement()),
    netMonthly: calculateRetirement() + calculateVACompensation() - calculateStateTax(formData.selectedState, calculateRetirement()) - calculateSBP(calculateRetirement())
  }

  const saveCalculation = () => {
    const name = prompt('Name this calculation:')
    if (!name) return

    const calculation = {
      name,
      date: new Date().toISOString(),
      data: formData,
      results
    }

    const updated = [...savedCalculations, calculation]
    setSavedCalculations(updated)
    localStorage.setItem('retirementCalculations', JSON.stringify(updated))
    alert('Calculation saved!')
  }

  const exportResults = () => {
    let text = 'MILITARY RETIREMENT CALCULATION\n\n'
    text += `Rank: ${formData.rank}\n`
    text += `Years of Service: ${formData.yearsOfService} years, ${formData.monthsOfService} months\n`
    text += `Retirement System: ${formData.retirementSystem.toUpperCase()}\n`
    text += `State: ${formData.selectedState}\n\n`
    text += `Monthly Retirement Pay: $${results.monthlyRetirement.toFixed(2)}\n`
    text += `Monthly VA Disability: $${results.monthlyVA.toFixed(2)}\n`
    text += `Total Monthly Income: $${results.totalMonthly.toFixed(2)}\n`
    text += `Annual Income: $${results.annualIncome.toFixed(2)}\n`
    text += `State Tax Impact: -$${results.stateTax.toFixed(2)}/month\n`
    if (formData.electSBP) {
      text += `SBP Cost: -$${results.sbpCost.toFixed(2)}/month\n`
    }
    text += `Net Monthly Take-Home: $${results.netMonthly.toFixed(2)}\n`

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'retirement-calculation.txt'
    a.click()
  }

  const addComparisonState = (state) => {
    if (!formData.comparisonStates.includes(state) && formData.comparisonStates.length < 3) {
      updateFormData('comparisonStates', [...formData.comparisonStates, state])
    }
  }

  const removeComparisonState = (state) => {
    updateFormData('comparisonStates', formData.comparisonStates.filter(s => s !== state))
  }

  const getTaxBadgeColor = (treatment) => {
    if (treatment === 'exempt') return 'bg-green-100 text-green-800'
    if (treatment === 'partial') return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const steps = [
    'Basic Info',
    'Retirement Pay',
    'VA Disability',
    'State Taxes',
    'State Comparison',
    'SBP',
    'Results'
  ]

  // PUBLIC MODE: Show simplified basic calculator only
  if (publicMode) {
    const basicResults = calculateRetirement()

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Free Features Banner */}
          <div className="mb-8 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white text-center shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Retirement Calculator</h2>
            <p className="text-xl text-green-100 mb-2">
              {SHUTDOWN_BANNER.line1}
            </p>
            <p className="text-sm text-green-200">
              {SHUTDOWN_BANNER.line2}
            </p>
          </div>

          {/* Simple Calculator Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-3">
              Basic Retirement Pay Calculator
            </h1>
            <p className="text-slate-300 mb-8 text-lg">
              Calculate your estimated base retirement pay
            </p>

            <div className="space-y-6">
              {/* Rank Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Rank at Retirement
                </label>
                <select
                  value={formData.rank}
                  onChange={(e) => {
                    const newRank = e.target.value
                    updateFormData('rank', newRank)
                    const payData = BASE_PAY_2025[newRank]
                    if (payData) {
                      const years = formData.yearsOfService.toString()
                      const closestYear = Object.keys(payData).reduce((prev, curr) =>
                        Math.abs(parseInt(curr) - formData.yearsOfService) < Math.abs(parseInt(prev) - formData.yearsOfService) ? curr : prev
                      )
                      updateFormData('high3Pay', payData[closestYear])
                    }
                  }}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <optgroup label="Enlisted">
                    <option>E-5</option>
                    <option>E-6</option>
                    <option>E-7</option>
                    <option>E-8</option>
                    <option>E-9</option>
                  </optgroup>
                  <optgroup label="Warrant Officers">
                    <option>W-1</option>
                    <option>W-2</option>
                    <option>W-3</option>
                    <option>W-4</option>
                    <option>W-5</option>
                  </optgroup>
                  <optgroup label="Officers">
                    <option>O-3</option>
                    <option>O-4</option>
                    <option>O-5</option>
                  </optgroup>
                </select>
              </div>

              {/* Years of Service */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Years of Service
                </label>
                <input
                  type="number"
                  min="20"
                  max="40"
                  value={formData.yearsOfService}
                  onChange={(e) => {
                    const years = parseInt(e.target.value)
                    updateFormData('yearsOfService', years)
                    const payData = BASE_PAY_2025[formData.rank]
                    if (payData) {
                      const closestYear = Object.keys(payData).reduce((prev, curr) =>
                        Math.abs(parseInt(curr) - years) < Math.abs(parseInt(prev) - years) ? curr : prev
                      )
                      updateFormData('high3Pay', payData[closestYear])
                    }
                  }}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
              </div>

              {/* Retirement System */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Retirement System
                </label>
                <select
                  value={formData.retirementSystem}
                  onChange={(e) => updateFormData('retirementSystem', e.target.value)}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <option value="high3">High-3 (2.5% per year)</option>
                  <option value="brs">BRS (2.0% per year)</option>
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
              >
                Calculate Retirement Pay
              </button>

              {/* Basic Results */}
              {showResults && (
                <div className="mt-6 p-6 bg-gradient-to-br from-green-900/30 to-blue-900/30 border-2 border-green-500 rounded-xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Estimated Monthly Retirement Pay</h3>
                  <div className="text-5xl font-bold text-green-400 mb-2">
                    ${basicResults.toLocaleString()}
                  </div>
                  <p className="text-slate-300 text-sm">
                    Based on {formData.rank} with {formData.yearsOfService} years under {formData.retirementSystem === 'high3' ? 'High-3' : 'BRS'} system
                  </p>

                  <div className="mt-6 p-4 bg-green-900/30 border border-green-600 rounded-lg">
                    <p className="text-green-300 text-sm font-semibold mb-2">
                      Premium features currently free
                    </p>
                    <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                      <li>State-specific tax calculations for all 50 states</li>
                      <li>VA disability compensation estimates (0%-100%)</li>
                      <li>BAH and BAS allowances by location</li>
                      <li>Survivor Benefit Plan (SBP) cost analysis</li>
                      <li>PDF export and unlimited saved scenarios</li>
                      <li>Side-by-side state tax comparisons</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* VA Disability Calculator */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-8 mt-8">
            <h2 className="text-3xl font-bold text-white mb-3">
              VA Disability Compensation Calculator
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Calculate your monthly VA disability compensation based on rating and dependents
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Disability Rating Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Disability Rating
                </label>
                <select
                  value={vaCalcRating}
                  onChange={(e) => setVaCalcRating(e.target.value)}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <option value="0%">0% - No Compensation</option>
                  <option value="10%">10%</option>
                  <option value="20%">20%</option>
                  <option value="30%">30%</option>
                  <option value="40%">40%</option>
                  <option value="50%">50%</option>
                  <option value="60%">60%</option>
                  <option value="70%">70%</option>
                  <option value="80%">80%</option>
                  <option value="90%">90%</option>
                  <option value="100%">100%</option>
                </select>
              </div>

              {/* Dependents Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Do you have dependents?
                </label>
                <select
                  value={vaCalcDependents}
                  onChange={(e) => setVaCalcDependents(e.target.value)}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <option value="base">No dependents</option>
                  <option value="withSpouse">Spouse only</option>
                  <option value="spouseAndOneChild">Spouse + 1 child</option>
                  <option value="spouseAndTwoChildren">Spouse + 2 children</option>
                  <option value="spouseAndThreeChildren">Spouse + 3+ children</option>
                  <option value="oneChildNoSpouse">1 child (no spouse)</option>
                  <option value="twoChildrenNoSpouse">2+ children (no spouse)</option>
                  <option value="oneParent">Dependent parent(s)</option>
                </select>
              </div>
            </div>

            {/* Results Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-2 border-green-500 rounded-xl p-6">
                <h3 className="text-sm text-slate-300 mb-2">Monthly VA Disability</h3>
                <div className="text-4xl font-bold text-green-400">
                  ${vaMonthly.toLocaleString()}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-2 border-blue-500 rounded-xl p-6">
                <h3 className="text-sm text-slate-300 mb-2">Annual VA Disability</h3>
                <div className="text-4xl font-bold text-blue-400">
                  ${vaAnnual.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Combined Results */}
            {showResults && basicResults > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500 rounded-xl p-6">
                  <h3 className="text-sm text-slate-300 mb-2">Combined Monthly (Retirement + VA)</h3>
                  <div className="text-4xl font-bold text-purple-400">
                    ${(basicResults + vaMonthly).toLocaleString()}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-900/30 to-red-900/30 border-2 border-pink-500 rounded-xl p-6">
                  <h3 className="text-sm text-slate-300 mb-2">Combined Annual</h3>
                  <div className="text-4xl font-bold text-pink-400">
                    ${((basicResults + vaMonthly) * 12).toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* Tax-free disclaimer */}
            <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
              <p className="text-sm text-yellow-200">
                <strong>Important:</strong> VA disability compensation is federal tax-free and not reduced by state taxes.
                Rates shown are for 2025.
              </p>
            </div>
          </div>

          {/* Premium Features Callout */}
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-2 border-blue-500 rounded-2xl shadow-xl p-8 mt-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">🔒</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Premium Features Available</h3>
                <p className="text-blue-200">Currently free during government shutdown</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <ul className="space-y-2 text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Save and track multiple retirement scenarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Export calculations to PDF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>State tax comparison for all 50 states</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>BAH and BAS calculations by location</span>
                </li>
              </ul>
              <ul className="space-y-2 text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Survivor Benefit Plan (SBP) calculator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Cloud storage - access from any device</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-xl font-bold text-white mb-2">
                Upgrade to Premium - $7/month
              </p>
              <p className="text-sm text-blue-300">
                Free during government shutdown. Standard pricing applies when federal operations resume.
              </p>
            </div>
          </div>

        </div>
      </div>
    )
  }

  // AUTHENTICATED MODE: Show full calculator
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Military Retirement Pay Calculator
          </h1>
          {isPromoModeActive() && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
              🎖️ Launch Special - FREE
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Calculate your estimated retirement pay, VA disability compensation, and total income
        </p>

        {/* Common Scenarios */}
        <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Quick Start - Common Scenarios:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMMON_SCENARIOS.map((scenario, idx) => (
              <button
                key={idx}
                onClick={() => loadScenario(scenario)}
                className="p-4 bg-white dark:bg-gray-800 border-2 border-blue-300 dark:border-blue-700 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-500 transition-all text-left shadow-md hover:shadow-lg"
              >
                <div className="font-semibold text-gray-900 dark:text-white">{scenario.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          {/* Mobile: Vertical stepper */}
          <div className="block sm:hidden space-y-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                  currentStep > idx + 1 ? 'bg-green-500 text-white' :
                  currentStep === idx + 1 ? 'bg-blue-600 text-white' :
                  'bg-gray-300 text-gray-600'
                } text-sm font-medium`}>
                  {currentStep > idx + 1 ? '✓' : idx + 1}
                </div>
                <div className={`text-sm ${
                  currentStep === idx + 1 ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {step}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Horizontal stepper */}
          <div className="hidden sm:block">
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep > idx + 1 ? 'bg-green-500 text-white' :
                    currentStep === idx + 1 ? 'bg-blue-600 text-white' :
                    'bg-gray-300 text-gray-600'
                  } text-sm font-medium`}>
                    {currentStep > idx + 1 ? '✓' : idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      currentStep > idx + 1 ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              {steps.map((step, idx) => (
                <div key={idx} className="text-xs text-gray-600 text-center flex-1 px-1">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Step 1: Basic Information</h2>
              <UseProfileButton
                onUseProfile={() => {
                  const serviceInfo = getServiceInfo()
                  const locationInfo = getLocationInfo()

                  if (serviceInfo.branch) updateFormData('branch', serviceInfo.branch)
                  if (serviceInfo.rank) updateFormData('rank', serviceInfo.rank)
                  if (serviceInfo.yearsOfService) updateFormData('yearsOfService', parseInt(serviceInfo.yearsOfService) || 20)
                  if (locationInfo.targetLocation) updateFormData('selectedState', locationInfo.targetLocation)
                }}
                label="Fill from Profile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Branch</label>
              <select
                value={formData.branch}
                onChange={(e) => updateFormData('branch', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option>Army</option>
                <option>Navy</option>
                <option>Air Force</option>
                <option>Marines</option>
                <option>Coast Guard</option>
                <option>Space Force</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rank at Retirement</label>
              <select
                value={formData.rank}
                onChange={(e) => updateFormData('rank', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <optgroup label="Enlisted">
                  <option>E-5</option>
                  <option>E-6</option>
                  <option>E-7</option>
                  <option>E-8</option>
                  <option>E-9</option>
                </optgroup>
                <optgroup label="Warrant Officers">
                  <option>W-1</option>
                  <option>W-2</option>
                  <option>W-3</option>
                  <option>W-4</option>
                  <option>W-5</option>
                </optgroup>
                <optgroup label="Officers">
                  <option>O-1</option>
                  <option>O-2</option>
                  <option>O-3</option>
                  <option>O-4</option>
                  <option>O-5</option>
                  <option>O-6</option>
                  <option>O-7</option>
                  <option>O-8</option>
                  <option>O-9</option>
                  <option>O-10</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Years of Service: {formData.yearsOfService} years
              </label>
              <input
                type="range"
                min="0"
                max="40"
                value={formData.yearsOfService}
                onChange={(e) => updateFormData('yearsOfService', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Months of Service: {formData.monthsOfService} months
              </label>
              <input
                type="range"
                min="0"
                max="11"
                value={formData.monthsOfService}
                onChange={(e) => updateFormData('monthsOfService', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Retirement System</label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    type="radio"
                    name="retirementSystem"
                    value="high3"
                    checked={formData.retirementSystem === 'high3'}
                    onChange={(e) => updateFormData('retirementSystem', e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900 dark:text-white">
                      <span className="underline decoration-dotted cursor-help" title="High-3: Your retirement pay is calculated using the average of your highest 36 months of basic pay">High-3</span> (Legacy System)
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Entered service before 2018 - 2.5% per year multiplier</div>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    type="radio"
                    name="retirementSystem"
                    value="brs"
                    checked={formData.retirementSystem === 'brs'}
                    onChange={(e) => updateFormData('retirementSystem', e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900 dark:text-white">
                      <span className="underline decoration-dotted cursor-help" title="BRS: Blended Retirement System combines a reduced pension (2.0% per year) with government TSP matching contributions">BRS</span> (Blended Retirement System)
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Entered service after 2018 - 2.0% per year multiplier + <span className="underline decoration-dotted cursor-help" title="TSP: Thrift Savings Plan - Similar to a 401(k), the government matches up to 5% of your contributions">TSP match</span></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Retirement Pay Calculation */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Step 2: Retirement Pay Calculation</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                High-3 Average Monthly Pay
              </label>
              <input
                type="number"
                value={formData.high3Pay}
                onChange={(e) => updateFormData('high3Pay', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your high-3 average monthly pay"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                This is the average of your highest 36 months of basic pay
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Calculation Formula:</h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  Years of Service: <span className="font-medium">{formData.yearsOfService}.{(formData.monthsOfService / 12 * 10).toFixed(0)} years</span>
                </div>
                <div>
                  Multiplier: <span className="font-medium">{formData.retirementSystem === 'high3' ? '2.5%' : '2.0%'} per year</span>
                </div>
                <div>
                  Percentage: <span className="font-medium">{((formData.yearsOfService + formData.monthsOfService / 12) * (formData.retirementSystem === 'high3' ? 2.5 : 2.0)).toFixed(1)}%</span>
                </div>
                <div className="pt-2 border-t border-blue-300 dark:border-blue-700">
                  <div className="text-lg font-bold text-blue-900 dark:text-blue-200">
                    Monthly Retirement Pay: ${calculateRetirement().toFixed(2)}
                  </div>
                  <div className="text-lg font-bold text-blue-900 dark:text-blue-200">
                    Annual Retirement Pay: ${(calculateRetirement() * 12).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {formData.retirementSystem === 'brs' && (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">BRS Additional Benefits:</h3>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• TSP match: Up to 5% of base pay (approximately ${(formData.high3Pay * 0.05).toFixed(2)}/month)</li>
                  <li>• Continuation pay at 12 years of service</li>
                  <li>• Lower retirement multiplier (2.0% vs 2.5%) but you keep TSP contributions</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Step 3: VA Disability */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Step 3: VA Disability Compensation</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">VA Disability Rating</label>
              <select
                value={formData.vaRating}
                onChange={(e) => updateFormData('vaRating', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.keys(VA_DISABILITY_RATES).map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Dependents</label>
              <input
                type="number"
                min="0"
                value={formData.dependents}
                onChange={(e) => updateFormData('dependents', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Dependents can increase your VA compensation (spouse, children)
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">VA Disability Compensation:</h3>
              <div className="text-2xl font-bold text-green-900 dark:text-green-200">
                ${calculateVACompensation().toFixed(2)}/month
              </div>
              <div className="text-lg font-bold text-green-900 dark:text-green-200">
                ${(calculateVACompensation() * 12).toFixed(2)}/year
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                VA disability compensation is tax-free
              </p>
            </div>

            {formData.yearsOfService >= 20 && parseInt(formData.vaRating) >= 50 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">✓ You Qualify for <span className="underline decoration-dotted cursor-help" title="CRDP: Concurrent Retirement Disability Pay - Allows you to receive both retirement pay and VA compensation without reduction">CRDP</span>!</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Concurrent Retirement Disability Pay (CRDP)</strong> allows you to receive both full military retirement pay AND full VA disability compensation without offset.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Requirements: 20+ years of service AND 50%+ VA rating
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: State Taxes */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Step 4: State Tax Impact</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Your State</label>
              <select
                value={formData.selectedState}
                onChange={(e) => updateFormData('selectedState', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.keys(STATE_TAX_DATA).sort().map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Tax Treatment in {formData.selectedState}:</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTaxBadgeColor(STATE_TAX_DATA[formData.selectedState].treatment)}`}>
                  {STATE_TAX_DATA[formData.selectedState].description}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">Monthly Retirement Pay:</span>
                  <span className="font-medium text-gray-900 dark:text-white">${calculateRetirement().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">Estimated State Tax:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">-${calculateStateTax(formData.selectedState, calculateRetirement()).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">Monthly VA Disability (Tax-Free):</span>
                  <span className="font-medium text-green-600 dark:text-green-400">+${calculateVACompensation().toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-gray-300 dark:border-gray-600">
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                    <span>Net Monthly Income:</span>
                    <span>${(calculateRetirement() - calculateStateTax(formData.selectedState, calculateRetirement()) + calculateVACompensation()).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: State Comparison */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Step 5: Compare States Side-by-Side</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add States to Compare (up to 3)</label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addComparisonState(e.target.value)
                    e.target.value = ''
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select a state to compare...</option>
                {Object.keys(STATE_TAX_DATA).sort().map(state => (
                  <option key={state} value={state} disabled={formData.comparisonStates.includes(state)}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {formData.comparisonStates.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">Category</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-semibold text-gray-900 dark:text-white">{formData.selectedState}</th>
                      {formData.comparisonStates.map(state => (
                        <th key={state} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-semibold text-gray-900 dark:text-white">
                          {state}
                          <button
                            onClick={() => removeComparisonState(state)}
                            className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                          >
                            ×
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium text-gray-900 dark:text-white">Tax Treatment</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getTaxBadgeColor(STATE_TAX_DATA[formData.selectedState].treatment)}`}>
                          {STATE_TAX_DATA[formData.selectedState].description}
                        </span>
                      </td>
                      {formData.comparisonStates.map(state => (
                        <td key={state} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${getTaxBadgeColor(STATE_TAX_DATA[state].treatment)}`}>
                            {STATE_TAX_DATA[state].description}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium text-gray-900 dark:text-white">Retirement Pay</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-gray-900 dark:text-gray-300">${calculateRetirement().toFixed(2)}</td>
                      {formData.comparisonStates.map(state => (
                        <td key={state} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-gray-900 dark:text-gray-300">${calculateRetirement().toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium text-gray-900 dark:text-white">State Tax</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-red-600 dark:text-red-400">
                        -${calculateStateTax(formData.selectedState, calculateRetirement()).toFixed(2)}
                      </td>
                      {formData.comparisonStates.map(state => (
                        <td key={state} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-red-600 dark:text-red-400">
                          -${calculateStateTax(state, calculateRetirement()).toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium text-gray-900 dark:text-white">VA Disability (Tax-Free)</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">
                        ${calculateVACompensation().toFixed(2)}
                      </td>
                      {formData.comparisonStates.map(state => (
                        <td key={state} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">
                          ${calculateVACompensation().toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-700 font-bold">
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white">Net Monthly Income</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-gray-900 dark:text-white">
                        ${(calculateRetirement() - calculateStateTax(formData.selectedState, calculateRetirement()) + calculateVACompensation()).toFixed(2)}
                      </td>
                      {formData.comparisonStates.map(state => (
                        <td key={state} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-gray-900 dark:text-white">
                          ${(calculateRetirement() - calculateStateTax(state, calculateRetirement()) + calculateVACompensation()).toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Step 6: SBP */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Step 6: Survivor Benefit Plan (SBP)</h2>

            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What is SBP?</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                The Survivor Benefit Plan (SBP) provides a monthly income to your surviving spouse if you die.
                Your spouse will receive 55% of your retirement pay for the rest of their life.
              </p>
            </div>

            <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <input
                type="checkbox"
                checked={formData.electSBP}
                onChange={(e) => updateFormData('electSBP', e.target.checked)}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900 dark:text-white">Elect SBP Coverage</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Cost: 6.5% of gross retirement pay (${(calculateRetirement() * 0.065).toFixed(2)}/month)
                </div>
              </div>
            </label>

            {formData.electSBP && (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">SBP Benefits:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Your Monthly Retirement Pay:</span>
                      <span className="font-medium text-gray-900 dark:text-white">${calculateRetirement().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">SBP Cost (6.5%):</span>
                      <span className="font-medium text-red-600 dark:text-red-400">-${calculateSBP(calculateRetirement()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Your Net Pay with SBP:</span>
                      <span className="font-medium text-gray-900 dark:text-white">${(calculateRetirement() - calculateSBP(calculateRetirement())).toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-green-300 dark:border-green-700">
                      <div className="flex justify-between font-bold">
                        <span className="text-gray-900 dark:text-white">Spouse Monthly Benefit (55%):</span>
                        <span className="text-green-700 dark:text-green-300">${(calculateRetirement() * 0.55).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Important Considerations:</h3>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• SBP coverage ends at age 70 or after 360 payments (30 years)</li>
                    <li>• DIC offset may reduce SBP if you die from service-connected condition</li>
                    <li>• Must elect at retirement - cannot add later</li>
                    <li>• Provides inflation protection (COLA adjustments)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 7: Results */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Retirement Calculation Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Retirement Pay</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">${results.monthlyRetirement.toFixed(2)}</div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly VA Disability</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-200">${results.monthlyVA.toFixed(2)}</div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Monthly Income</div>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-200">${results.totalMonthly.toFixed(2)}</div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annual Income</div>
                <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">${results.annualIncome.toFixed(2)}</div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">State Tax Impact ({formData.selectedState})</div>
                <div className="text-2xl font-bold text-red-900 dark:text-red-200">-${results.stateTax.toFixed(2)}/mo</div>
              </div>

              {formData.electSBP && (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">SBP Cost</div>
                  <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-200">-${results.sbpCost.toFixed(2)}/mo</div>
                </div>
              )}

              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-4 md:col-span-2 lg:col-span-3">
                <div className="text-sm mb-1">Final Net Monthly Take-Home</div>
                <div className="text-3xl font-bold">${results.netMonthly.toFixed(2)}</div>
                <div className="text-sm mt-1">${(results.netMonthly * 12).toFixed(2)} per year</div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={saveCalculation}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Save This Calculation
              </button>
              <button
                onClick={exportResults}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
              >
                Export as Text File
              </button>
              <button
                onClick={() => {
                  setCurrentStep(1)
                  setShowResults(false)
                }}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
              >
                Start New Calculation
              </button>
            </div>

            {/* Saved Calculations */}
            {savedCalculations.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Saved Calculations</h3>
                <div className="space-y-2">
                  {savedCalculations.map((calc, idx) => (
                    <div key={idx} className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{calc.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {calc.data.rank} • {calc.data.yearsOfService} years • Net: ${calc.results.netMonthly.toFixed(2)}/mo
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setFormData(calc.data)
                            setCurrentStep(7)
                          }}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          Load
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-10 pt-8 border-t-2 border-gray-300 dark:border-gray-700">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-8 py-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 font-bold rounded-xl hover:from-gray-400 hover:to-gray-500 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all min-h-[52px] shadow-md hover:shadow-lg"
            >
              ← Previous
            </button>
          )}
          <div className={currentStep > 1 ? 'sm:ml-auto' : 'ml-auto'}>
            {currentStep < 7 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all min-h-[52px] shadow-lg hover:shadow-xl"
              >
                Next Step →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Standalone VA Disability Calculator */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mt-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            VA Disability Compensation Calculator
          </h2>
          {isPromoModeActive() && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
              🎖️ Launch Special - FREE
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Calculate your monthly VA disability compensation based on your rating and dependents
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Disability Rating Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Disability Rating
            </label>
            <select
              value={vaCalcRating}
              onChange={(e) => setVaCalcRating(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="0%">0% - No Compensation</option>
              <option value="10%">10%</option>
              <option value="20%">20%</option>
              <option value="30%">30%</option>
              <option value="40%">40%</option>
              <option value="50%">50%</option>
              <option value="60%">60%</option>
              <option value="70%">70%</option>
              <option value="80%">80%</option>
              <option value="90%">90%</option>
              <option value="100%">100%</option>
            </select>
          </div>

          {/* Dependents Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dependents
            </label>
            <select
              value={vaCalcDependents}
              onChange={(e) => setVaCalcDependents(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="base">No dependents</option>
              <option value="withSpouse">Veteran with spouse</option>
              <option value="spouseAndOneChild">Veteran with spouse + 1 child</option>
              <option value="spouseAndTwoChildren">Veteran with spouse + 2 children</option>
              <option value="spouseAndThreeChildren">Veteran with spouse + 3 children</option>
              <option value="spouseAndFourPlusChildren">Veteran with spouse + 4+ children</option>
              <option value="oneChildNoSpouse">Veteran with 1 child (no spouse)</option>
              <option value="twoChildrenNoSpouse">Veteran with 2 children (no spouse)</option>
              <option value="oneParent">Veteran with parent(s)</option>
              <option value="twoParents">Veteran with 2 parents</option>
            </select>
          </div>
        </div>

        {/* Results Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border-2 border-green-500 dark:border-green-600 rounded-xl p-6">
            <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly VA Disability Payment</h3>
            <div className="text-4xl font-bold text-green-700 dark:text-green-300">
              ${vaMonthly.toLocaleString()}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-2 border-blue-500 dark:border-blue-600 rounded-xl p-6">
            <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">Annual VA Disability Payment</h3>
            <div className="text-4xl font-bold text-blue-700 dark:text-blue-300">
              ${vaAnnual.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Combined with Retirement (if calculated) */}
        {currentStep === 7 && results.monthlyRetirement > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-500 dark:border-purple-600 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Combined Retirement + VA Disability
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Military Retirement</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${results.monthlyRetirement.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">VA Disability</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  ${vaMonthly.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Monthly Income</div>
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                  ${(results.monthlyRetirement + vaMonthly).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Important:</strong> VA disability compensation is federal tax-free and not reduced by state taxes.
            Rates shown are for 2025. Actual rates may vary based on individual circumstances and annual COLA adjustments.
          </p>
        </div>
      </div>
    </div>
  )
}
