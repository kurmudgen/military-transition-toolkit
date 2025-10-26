import { useState, useEffect } from 'react'
import UseProfileButton from '../components/UseProfileButton'
import { getProfileData, getServiceInfo, getLocationInfo } from '../utils/profileAutoFill'

// 2025 Base Pay Data (simplified - showing E-7 through O-5 for key ranks)
const BASE_PAY_2025 = {
  'E-7': { '20': 4480, '22': 4642, '24': 4805, '26': 4968, '30': 5460 },
  'E-8': { '20': 5157, '22': 5349, '24': 5542, '26': 5735, '30': 6300 },
  'E-9': { '20': 6370, '22': 6605, '24': 6840, '26': 7075, '30': 7770 },
  'O-3': { '10': 6159, '12': 6752, '14': 7103, '16': 7103, '20': 7103 },
  'O-4': { '10': 7278, '12': 7968, '14': 8423, '16': 8733, '20': 9105 },
  'O-5': { '16': 9668, '18': 10058, '20': 10448, '22': 10838, '26': 11418 },
}

// VA Disability Rates 2025 (monthly)
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

export default function RetirementCalculator() {
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

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Military Retirement Pay Calculator
        </h1>
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
                  currentStep === idx + 1 ? 'text-gray-900 font-semibold' : 'text-gray-600'
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Branch</label>
              <select
                value={formData.branch}
                onChange={(e) => updateFormData('branch', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Rank at Retirement</label>
              <select
                value={formData.rank}
                onChange={(e) => updateFormData('rank', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <optgroup label="Enlisted">
                  <option>E-1</option>
                  <option>E-2</option>
                  <option>E-3</option>
                  <option>E-4</option>
                  <option>E-5</option>
                  <option>E-6</option>
                  <option>E-7</option>
                  <option>E-8</option>
                  <option>E-9</option>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Retirement System</label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="retirementSystem"
                    value="high3"
                    checked={formData.retirementSystem === 'high3'}
                    onChange={(e) => updateFormData('retirementSystem', e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">
                      <span className="underline decoration-dotted cursor-help" title="High-3: Your retirement pay is calculated using the average of your highest 36 months of basic pay">High-3</span> (Legacy System)
                    </div>
                    <div className="text-sm text-gray-600">Entered service before 2018 - 2.5% per year multiplier</div>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="retirementSystem"
                    value="brs"
                    checked={formData.retirementSystem === 'brs'}
                    onChange={(e) => updateFormData('retirementSystem', e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">
                      <span className="underline decoration-dotted cursor-help" title="BRS: Blended Retirement System combines a reduced pension (2.0% per year) with government TSP matching contributions">BRS</span> (Blended Retirement System)
                    </div>
                    <div className="text-sm text-gray-600">Entered service after 2018 - 2.0% per year multiplier + <span className="underline decoration-dotted cursor-help" title="TSP: Thrift Savings Plan - Similar to a 401(k), the government matches up to 5% of your contributions">TSP match</span></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Retirement Pay Calculation */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Step 2: Retirement Pay Calculation</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                High-3 Average Monthly Pay
              </label>
              <input
                type="number"
                value={formData.high3Pay}
                onChange={(e) => updateFormData('high3Pay', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your high-3 average monthly pay"
              />
              <p className="text-sm text-gray-600 mt-1">
                This is the average of your highest 36 months of basic pay
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Calculation Formula:</h3>
              <div className="space-y-2 text-sm">
                <div>
                  Years of Service: <span className="font-medium">{formData.yearsOfService}.{(formData.monthsOfService / 12 * 10).toFixed(0)} years</span>
                </div>
                <div>
                  Multiplier: <span className="font-medium">{formData.retirementSystem === 'high3' ? '2.5%' : '2.0%'} per year</span>
                </div>
                <div>
                  Percentage: <span className="font-medium">{((formData.yearsOfService + formData.monthsOfService / 12) * (formData.retirementSystem === 'high3' ? 2.5 : 2.0)).toFixed(1)}%</span>
                </div>
                <div className="pt-2 border-t border-blue-300">
                  <div className="text-lg font-bold text-blue-900">
                    Monthly Retirement Pay: ${calculateRetirement().toFixed(2)}
                  </div>
                  <div className="text-lg font-bold text-blue-900">
                    Annual Retirement Pay: ${(calculateRetirement() * 12).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {formData.retirementSystem === 'brs' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">BRS Additional Benefits:</h3>
                <ul className="text-sm space-y-1 text-gray-700">
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
            <h2 className="text-2xl font-bold text-gray-900">Step 3: VA Disability Compensation</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">VA Disability Rating</label>
              <select
                value={formData.vaRating}
                onChange={(e) => updateFormData('vaRating', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(VA_DISABILITY_RATES).map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dependents</label>
              <input
                type="number"
                min="0"
                value={formData.dependents}
                onChange={(e) => updateFormData('dependents', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-600 mt-1">
                Dependents can increase your VA compensation (spouse, children)
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">VA Disability Compensation:</h3>
              <div className="text-2xl font-bold text-green-900">
                ${calculateVACompensation().toFixed(2)}/month
              </div>
              <div className="text-lg font-bold text-green-900">
                ${(calculateVACompensation() * 12).toFixed(2)}/year
              </div>
              <p className="text-sm text-gray-700 mt-2">
                VA disability compensation is tax-free
              </p>
            </div>

            {formData.yearsOfService >= 20 && parseInt(formData.vaRating) >= 50 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">✓ You Qualify for <span className="underline decoration-dotted cursor-help" title="CRDP: Concurrent Retirement Disability Pay - Allows you to receive both retirement pay and VA compensation without reduction">CRDP</span>!</h3>
                <p className="text-sm text-gray-700">
                  <strong>Concurrent Retirement Disability Pay (CRDP)</strong> allows you to receive both full military retirement pay AND full VA disability compensation without offset.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Requirements: 20+ years of service AND 50%+ VA rating
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: State Taxes */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Step 4: State Tax Impact</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Your State</label>
              <select
                value={formData.selectedState}
                onChange={(e) => updateFormData('selectedState', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(STATE_TAX_DATA).sort().map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Tax Treatment in {formData.selectedState}:</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTaxBadgeColor(STATE_TAX_DATA[formData.selectedState].treatment)}`}>
                  {STATE_TAX_DATA[formData.selectedState].description}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Monthly Retirement Pay:</span>
                  <span className="font-medium">${calculateRetirement().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Estimated State Tax:</span>
                  <span className="font-medium text-red-600">-${calculateStateTax(formData.selectedState, calculateRetirement()).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Monthly VA Disability (Tax-Free):</span>
                  <span className="font-medium text-green-600">+${calculateVACompensation().toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-gray-300">
                  <div className="flex justify-between font-bold">
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
            <h2 className="text-2xl font-bold text-gray-900">Step 5: Compare States Side-by-Side</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Add States to Compare (up to 3)</label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addComparisonState(e.target.value)
                    e.target.value = ''
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Category</th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-semibold">{formData.selectedState}</th>
                      {formData.comparisonStates.map(state => (
                        <th key={state} className="border border-gray-300 px-4 py-2 text-center font-semibold">
                          {state}
                          <button
                            onClick={() => removeComparisonState(state)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Tax Treatment</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getTaxBadgeColor(STATE_TAX_DATA[formData.selectedState].treatment)}`}>
                          {STATE_TAX_DATA[formData.selectedState].description}
                        </span>
                      </td>
                      {formData.comparisonStates.map(state => (
                        <td key={state} className="border border-gray-300 px-4 py-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${getTaxBadgeColor(STATE_TAX_DATA[state].treatment)}`}>
                            {STATE_TAX_DATA[state].description}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Retirement Pay</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">${calculateRetirement().toFixed(2)}</td>
                      {formData.comparisonStates.map(state => (
                        <td key={state} className="border border-gray-300 px-4 py-2 text-center">${calculateRetirement().toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">State Tax</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-red-600">
                        -${calculateStateTax(formData.selectedState, calculateRetirement()).toFixed(2)}
                      </td>
                      {formData.comparisonStates.map(state => (
                        <td key={state} className="border border-gray-300 px-4 py-2 text-center text-red-600">
                          -${calculateStateTax(state, calculateRetirement()).toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">VA Disability (Tax-Free)</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-green-600">
                        ${calculateVACompensation().toFixed(2)}
                      </td>
                      {formData.comparisonStates.map(state => (
                        <td key={state} className="border border-gray-300 px-4 py-2 text-center text-green-600">
                          ${calculateVACompensation().toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50 font-bold">
                      <td className="border border-gray-300 px-4 py-2">Net Monthly Income</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        ${(calculateRetirement() - calculateStateTax(formData.selectedState, calculateRetirement()) + calculateVACompensation()).toFixed(2)}
                      </td>
                      {formData.comparisonStates.map(state => (
                        <td key={state} className="border border-gray-300 px-4 py-2 text-center">
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
            <h2 className="text-2xl font-bold text-gray-900">Step 6: Survivor Benefit Plan (SBP)</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">What is SBP?</h3>
              <p className="text-sm text-gray-700">
                The Survivor Benefit Plan (SBP) provides a monthly income to your surviving spouse if you die.
                Your spouse will receive 55% of your retirement pay for the rest of their life.
              </p>
            </div>

            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.electSBP}
                onChange={(e) => updateFormData('electSBP', e.target.checked)}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">Elect SBP Coverage</div>
                <div className="text-sm text-gray-600">
                  Cost: 6.5% of gross retirement pay (${(calculateRetirement() * 0.065).toFixed(2)}/month)
                </div>
              </div>
            </label>

            {formData.electSBP && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">SBP Benefits:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Your Monthly Retirement Pay:</span>
                      <span className="font-medium">${calculateRetirement().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">SBP Cost (6.5%):</span>
                      <span className="font-medium text-red-600">-${calculateSBP(calculateRetirement()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Your Net Pay with SBP:</span>
                      <span className="font-medium">${(calculateRetirement() - calculateSBP(calculateRetirement())).toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-green-300">
                      <div className="flex justify-between font-bold">
                        <span>Spouse Monthly Benefit (55%):</span>
                        <span className="text-green-700">${(calculateRetirement() * 0.55).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Important Considerations:</h3>
                  <ul className="text-sm space-y-1 text-gray-700">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Retirement Calculation Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Monthly Retirement Pay</div>
                <div className="text-2xl font-bold text-blue-900">${results.monthlyRetirement.toFixed(2)}</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Monthly VA Disability</div>
                <div className="text-2xl font-bold text-green-900">${results.monthlyVA.toFixed(2)}</div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Total Monthly Income</div>
                <div className="text-2xl font-bold text-purple-900">${results.totalMonthly.toFixed(2)}</div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Annual Income</div>
                <div className="text-2xl font-bold text-indigo-900">${results.annualIncome.toFixed(2)}</div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">State Tax Impact ({formData.selectedState})</div>
                <div className="text-2xl font-bold text-red-900">-${results.stateTax.toFixed(2)}/mo</div>
              </div>

              {formData.electSBP && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">SBP Cost</div>
                  <div className="text-2xl font-bold text-yellow-900">-${results.sbpCost.toFixed(2)}/mo</div>
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
                <h3 className="text-lg font-bold text-gray-900 mb-4">Saved Calculations</h3>
                <div className="space-y-2">
                  {savedCalculations.map((calc, idx) => (
                    <div key={idx} className="p-4 border border-gray-300 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{calc.name}</div>
                          <div className="text-sm text-gray-600">
                            {calc.data.rank} • {calc.data.yearsOfService} years • Net: ${calc.results.netMonthly.toFixed(2)}/mo
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setFormData(calc.data)
                            setCurrentStep(7)
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800"
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
    </div>
  )
}
