import { useState, useEffect } from 'react'

// State benefits data (placeholder - will be updated with real data)
const STATE_DATA = {
  TX: {
    name: 'Texas',
    friendlinessScore: 95,
    taxes: {
      retirementPay: 'Fully Exempt (No state income tax)',
      propertyTax: '100% property tax exemption for 100% disabled veterans',
      vehicleRegistration: 'Yes - Free registration for disabled veterans',
      salesTax: 'Standard - No special exemptions'
    },
    healthcare: {
      vaHospitals: 8,
      vaClinics: 45,
      majorCenters: ['Houston (Michael E. DeBakey VA)', 'Dallas VA', 'San Antonio VA', 'Austin VA']
    },
    education: {
      stateGiBill: 'Yes - Hazlewood Act provides free tuition at state schools',
      inStateTuition: 'Yes - Immediate in-state tuition',
      dependentBenefits: 'Yes - Hazlewood benefits transfer to dependents'
    },
    employment: {
      hiringPreference: 'Strong',
      programs: 'Texas Workforce Commission veteran programs, Veterans Business Program'
    },
    other: {
      huntingFishing: 'Free - Lifetime hunting/fishing license for disabled veterans',
      stateParks: 'Free - State park pass for disabled veterans',
      licensePlates: 'Yes - Multiple veteran specialty plates available'
    }
  },
  FL: {
    name: 'Florida',
    friendlinessScore: 93,
    taxes: {
      retirementPay: 'Fully Exempt (No state income tax)',
      propertyTax: 'Up to $5,000 exemption for disabled veterans; total exemption for 100% disabled',
      vehicleRegistration: 'Yes - Fee waiver for certain disabled veterans',
      salesTax: 'Standard - No special exemptions'
    },
    healthcare: {
      vaHospitals: 7,
      vaClinics: 52,
      majorCenters: ['Miami VA', 'Tampa (James A. Haley VA)', 'Orlando VA', 'West Palm Beach VA']
    },
    education: {
      stateGiBill: 'Yes - Florida GI Bill waives tuition/fees at state schools',
      inStateTuition: 'Yes - Immediate in-state tuition',
      dependentBenefits: 'Yes - For children of disabled/deceased veterans'
    },
    employment: {
      hiringPreference: 'Strong',
      programs: 'Florida Department of Veterans Affairs employment assistance, CareerSource veteran programs'
    },
    other: {
      huntingFishing: 'Discounted - Reduced fee licenses',
      stateParks: 'Discounted - Reduced admission',
      licensePlates: 'Yes - Extensive veteran plate options'
    }
  },
  CA: {
    name: 'California',
    friendlinessScore: 78,
    taxes: {
      retirementPay: 'Fully Taxed (State income tax applies)',
      propertyTax: 'Up to $196,262 exemption for disabled veterans (2024)',
      vehicleRegistration: 'Yes - Fee exemptions for certain disabled veterans',
      salesTax: 'Standard - No special exemptions'
    },
    healthcare: {
      vaHospitals: 11,
      vaClinics: 68,
      majorCenters: ['Los Angeles VA', 'San Diego VA', 'San Francisco VA', 'Palo Alto VA', 'Long Beach VA']
    },
    education: {
      stateGiBill: 'Yes - CalVet College Fee Waiver',
      inStateTuition: 'Yes - Immediate in-state tuition',
      dependentBenefits: 'Limited - Some programs for dependents of disabled veterans'
    },
    employment: {
      hiringPreference: 'Moderate',
      programs: 'CalVet employment services, Veteran Employment Program'
    },
    other: {
      huntingFishing: 'Discounted - Reduced fee licenses for disabled veterans',
      stateParks: 'Free - Disabled Veteran Pass available',
      licensePlates: 'Yes - Multiple veteran specialty plates'
    }
  },
  VA: {
    name: 'Virginia',
    friendlinessScore: 88,
    taxes: {
      retirementPay: 'Partially Exempt - Up to $10,000 exemption (expanding)',
      propertyTax: 'Local exemptions for 100% disabled veterans (varies by county)',
      vehicleRegistration: 'Yes - Free registration for disabled veterans',
      salesTax: 'Standard - No special exemptions'
    },
    healthcare: {
      vaHospitals: 5,
      vaClinics: 28,
      majorCenters: ['Richmond VA', 'Hampton VA', 'Salem VA', 'DC VA (nearby)']
    },
    education: {
      stateGiBill: 'Yes - Virginia Military Survivors and Dependents Education Program',
      inStateTuition: 'Yes - Immediate in-state tuition',
      dependentBenefits: 'Yes - For dependents of disabled/deceased veterans'
    },
    employment: {
      hiringPreference: 'Strong',
      programs: 'Virginia Values Veterans (V3), Veteran Employment Services'
    },
    other: {
      huntingFishing: 'Free - Lifetime licenses for 100% disabled veterans',
      stateParks: 'Free - Annual pass for disabled veterans',
      licensePlates: 'Yes - Extensive veteran plate options'
    }
  },
  NC: {
    name: 'North Carolina',
    friendlinessScore: 85,
    taxes: {
      retirementPay: 'Partially Exempt - Up to $47,729 exemption (2024)',
      propertyTax: '$45,000 exemption for disabled veterans',
      vehicleRegistration: 'Yes - Free registration for certain disabled veterans',
      salesTax: 'Standard - No special exemptions'
    },
    healthcare: {
      vaHospitals: 4,
      vaClinics: 22,
      majorCenters: ['Durham VA', 'Fayetteville VA', 'Asheville VA', 'Salisbury VA']
    },
    education: {
      stateGiBill: 'Yes - NC National Guard Tuition Assistance, scholarship programs',
      inStateTuition: 'Yes - Immediate in-state tuition',
      dependentBenefits: 'Yes - Scholarships for children of disabled/deceased veterans'
    },
    employment: {
      hiringPreference: 'Moderate',
      programs: 'NC4ME veteran employment program, NCWorks veteran services'
    },
    other: {
      huntingFishing: 'Free - Lifetime licenses for 100% disabled veterans',
      stateParks: 'Standard - No special benefits',
      licensePlates: 'Yes - Multiple veteran specialty plates'
    }
  },
  AZ: {
    name: 'Arizona',
    friendlinessScore: 90,
    taxes: {
      retirementPay: 'Partially Exempt - Up to $3,500 exemption',
      propertyTax: 'Exemptions available for disabled veterans',
      vehicleRegistration: 'Yes - Fee waivers for disabled veterans',
      salesTax: 'Standard - No special exemptions'
    },
    healthcare: {
      vaHospitals: 3,
      vaClinics: 18,
      majorCenters: ['Phoenix VA', 'Tucson VA', 'Prescott VA']
    },
    education: {
      stateGiBill: 'Yes - Tuition waiver at state universities for 100% disabled veterans',
      inStateTuition: 'Yes - Immediate in-state tuition',
      dependentBenefits: 'Yes - For dependents of certain disabled veterans'
    },
    employment: {
      hiringPreference: 'Strong',
      programs: 'Arizona Coalition for Military Families, Veteran Employment Program'
    },
    other: {
      huntingFishing: 'Free - Hunting/fishing licenses for certain disabled veterans',
      stateParks: 'Free - Annual pass for disabled veterans',
      licensePlates: 'Yes - Extensive veteran plate options'
    }
  },
  WA: {
    name: 'Washington',
    friendlinessScore: 87,
    taxes: {
      retirementPay: 'Fully Exempt (No state income tax)',
      propertyTax: 'Exemptions available for disabled veterans',
      vehicleRegistration: 'Yes - Fee waivers for certain disabled veterans',
      salesTax: 'Standard - No special exemptions'
    },
    healthcare: {
      vaHospitals: 3,
      vaClinics: 15,
      majorCenters: ['Seattle VA', 'Spokane VA', 'Walla Walla VA']
    },
    education: {
      stateGiBill: 'Yes - Washington State GI Bill tuition waiver',
      inStateTuition: 'Yes - Immediate in-state tuition',
      dependentBenefits: 'Limited - Some programs available'
    },
    employment: {
      hiringPreference: 'Strong',
      programs: 'Washington State Department of Veterans Affairs employment services'
    },
    other: {
      huntingFishing: 'Discounted - Reduced fees for disabled veterans',
      stateParks: 'Discounted - Reduced admission',
      licensePlates: 'Yes - Multiple veteran specialty plates'
    }
  },
  PA: {
    name: 'Pennsylvania',
    friendlinessScore: 91,
    taxes: {
      retirementPay: 'Fully Exempt - Tax-free military retirement pay',
      propertyTax: 'Up to 50% reduction for disabled veterans (varies by county)',
      vehicleRegistration: 'Yes - Fee exemptions for certain disabled veterans',
      salesTax: 'Standard - No special exemptions'
    },
    healthcare: {
      vaHospitals: 6,
      vaClinics: 25,
      majorCenters: ['Philadelphia VA', 'Pittsburgh VA', 'Wilkes-Barre VA', 'Lebanon VA']
    },
    education: {
      stateGiBill: 'Yes - Educational Gratuity Program for children of disabled veterans',
      inStateTuition: 'Yes - Immediate in-state tuition',
      dependentBenefits: 'Yes - For children of disabled/deceased veterans'
    },
    employment: {
      hiringPreference: 'Moderate',
      programs: 'Pennsylvania Department of Military and Veterans Affairs employment services'
    },
    other: {
      huntingFishing: 'Free - Lifetime licenses for certain disabled veterans',
      stateParks: 'Standard - No special benefits',
      licensePlates: 'Yes - Multiple veteran specialty plates'
    }
  },
  GA: {
    name: 'Georgia',
    friendlinessScore: 83,
    taxes: {
      retirementPay: 'Partially Exempt - Up to $65,000 exemption (age 62+) or $35,000 (under 62)',
      propertyTax: '$60,000 exemption for 100% disabled veterans',
      vehicleRegistration: 'Yes - Fee waivers for certain disabled veterans',
      salesTax: 'Standard - No special exemptions'
    },
    healthcare: {
      vaHospitals: 4,
      vaClinics: 19,
      majorCenters: ['Atlanta VA', 'Augusta VA (Charlie Norwood VA)', 'Dublin VA', 'Decatur VA']
    },
    education: {
      stateGiBill: 'Yes - HERO Scholarship and other programs',
      inStateTuition: 'Yes - Immediate in-state tuition',
      dependentBenefits: 'Yes - For children of disabled/deceased veterans'
    },
    employment: {
      hiringPreference: 'Moderate',
      programs: 'Georgia Department of Veterans Service employment assistance'
    },
    other: {
      huntingFishing: 'Free - Lifetime licenses for certain disabled veterans',
      stateParks: 'Free - Annual ParkPass for disabled veterans',
      licensePlates: 'Yes - Multiple veteran specialty plates'
    }
  },
  CO: {
    name: 'Colorado',
    friendlinessScore: 81,
    taxes: {
      retirementPay: 'Partially Exempt - Up to $24,000 exemption (ages 55-64)',
      propertyTax: '50% reduction for 100% disabled veterans',
      vehicleRegistration: 'Yes - Fee exemptions for certain disabled veterans',
      salesTax: 'Standard - No special exemptions'
    },
    healthcare: {
      vaHospitals: 2,
      vaClinics: 12,
      majorCenters: ['Denver VA', 'Grand Junction VA']
    },
    education: {
      stateGiBill: 'Yes - Colorado GI Bill tuition assistance',
      inStateTuition: 'Yes - Immediate in-state tuition',
      dependentBenefits: 'Limited - Some programs available'
    },
    employment: {
      hiringPreference: 'Moderate',
      programs: 'Colorado Department of Military and Veterans Affairs employment programs'
    },
    other: {
      huntingFishing: 'Discounted - Reduced fees',
      stateParks: 'Free - Annual pass for disabled veterans',
      licensePlates: 'Yes - Multiple veteran specialty plates'
    }
  }
}

export default function StateBenefits() {
  const [selectedState, setSelectedState] = useState(null)
  const [comparisonStates, setComparisonStates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')

  // Set page title
  useEffect(() => {
    document.title = 'State Benefits Comparison - Military Transition Toolkit'
  }, [])

  // Load comparison states from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('stateComparison')
    if (saved) {
      try {
        setComparisonStates(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading comparison:', e)
      }
    }
  }, [])

  // Save comparison states to localStorage
  useEffect(() => {
    localStorage.setItem('stateComparison', JSON.stringify(comparisonStates))
  }, [comparisonStates])

  const handleStateClick = (stateCode) => {
    setSelectedState(stateCode)
  }

  const addToComparison = (stateCode) => {
    if (!comparisonStates.includes(stateCode) && comparisonStates.length < 3) {
      setComparisonStates([...comparisonStates, stateCode])
    }
  }

  const removeFromComparison = (stateCode) => {
    setComparisonStates(comparisonStates.filter(s => s !== stateCode))
  }

  const clearComparison = () => {
    if (window.confirm('Clear all selected states from comparison? This will remove all states from your comparison list.')) {
      setComparisonStates([])
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getScoreTextColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Filter and search states
  const getFilteredStates = () => {
    let states = Object.entries(STATE_DATA)

    // Apply search filter
    if (searchTerm) {
      states = states.filter(([code, data]) =>
        data.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply category filter
    if (filterBy !== 'all') {
      states = states.sort(([, a], [, b]) => {
        if (filterBy === 'score') return b.friendlinessScore - a.friendlinessScore
        if (filterBy === 'taxes') {
          const aTax = a.taxes.retirementPay.includes('Fully Exempt') ? 2 : a.taxes.retirementPay.includes('Partially') ? 1 : 0
          const bTax = b.taxes.retirementPay.includes('Fully Exempt') ? 2 : b.taxes.retirementPay.includes('Partially') ? 1 : 0
          return bTax - aTax
        }
        if (filterBy === 'healthcare') return b.healthcare.vaHospitals - a.healthcare.vaHospitals
        return 0
      })
    }

    return states
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          State Veteran Benefits Comparison
        </h1>
        <p className="text-gray-600 mb-6">
          Compare veteran benefits across different states to find the best fit for your transition
        </p>

        {/* Search and Filter Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All States</option>
            <option value="score">Best Overall Score</option>
            <option value="taxes">Best for Taxes</option>
            <option value="healthcare">Best for Healthcare</option>
          </select>
        </div>

        {/* Comparison Bar or Empty State */}
        {comparisonStates.length > 0 ? (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Comparing States:</h3>
              <button
                onClick={clearComparison}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {comparisonStates.map(stateCode => (
                <div key={stateCode} className="flex items-center bg-white px-3 py-1 rounded-full border border-blue-300">
                  <span className="text-sm font-medium">{STATE_DATA[stateCode].name}</span>
                  <button
                    onClick={() => removeFromComparison(stateCode)}
                    className="ml-2 text-gray-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {comparisonStates.length >= 2 && (
              <a
                href="#comparison"
                className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View Comparison Below ↓
              </a>
            )}
          </div>
        ) : (
          <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">Compare States Side-by-Side</h3>
              <p className="mt-1 text-sm text-gray-600">
                Click on any state card below to add it to your comparison. Select at least 2 states to see a detailed side-by-side breakdown.
              </p>
              <p className="mt-2 text-xs text-blue-600 font-medium">
                💡 Tip: You can compare up to 3 states at once
              </p>
            </div>
          </div>
        )}

        {/* State Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {getFilteredStates().map(([stateCode, stateData]) => (
            <div
              key={stateCode}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleStateClick(stateCode)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">{stateData.name}</h3>
                <div className={`w-12 h-12 rounded-full ${getScoreColor(stateData.friendlinessScore)} flex items-center justify-center text-white font-bold`}>
                  {stateData.friendlinessScore}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">Retirement Tax:</span>
                  <span className="ml-2 text-xs">{stateData.taxes.retirementPay.split('-')[0]}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">VA Hospitals:</span>
                  <span className="ml-2">{stateData.healthcare.vaHospitals}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium">State GI Bill:</span>
                  <span className="ml-2">{stateData.education.stateGiBill.split('-')[0]}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  addToComparison(stateCode)
                }}
                disabled={comparisonStates.includes(stateCode) || comparisonStates.length >= 3}
                className={`mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium ${
                  comparisonStates.includes(stateCode)
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {comparisonStates.includes(stateCode) ? 'Added to Comparison' : 'Add to Compare'}
              </button>
            </div>
          ))}
        </div>

        {/* Selected State Detail */}
        {selectedState && (
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{STATE_DATA[selectedState].name}</h2>
              <button
                onClick={() => setSelectedState(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={`inline-block px-4 py-2 rounded-full mb-6 ${getScoreTextColor(STATE_DATA[selectedState].friendlinessScore)} bg-white border-2`}>
              <span className="font-bold">Veteran Friendliness Score: {STATE_DATA[selectedState].friendlinessScore}/100</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tax Benefits */}
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tax Benefits</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Military Retirement Pay:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].taxes.retirementPay}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Property Tax:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].taxes.propertyTax}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Vehicle Registration:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].taxes.vehicleRegistration}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Sales Tax:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].taxes.salesTax}</p>
                  </div>
                </div>
              </div>

              {/* Healthcare */}
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">VA Healthcare</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">VA Hospitals:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].healthcare.vaHospitals}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">VA Outpatient Clinics:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].healthcare.vaClinics}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Major Centers:</span>
                    <ul className="text-gray-600 list-disc list-inside">
                      {STATE_DATA[selectedState].healthcare.majorCenters.map((center, idx) => (
                        <li key={idx}>{center}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Education Benefits</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">State GI Bill:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].education.stateGiBill}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">In-State Tuition:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].education.inStateTuition}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Dependent Benefits:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].education.dependentBenefits}</p>
                  </div>
                </div>
              </div>

              {/* Employment */}
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Employment</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Hiring Preference:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].employment.hiringPreference}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">State Programs:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].employment.programs}</p>
                  </div>
                </div>
              </div>

              {/* Other Benefits */}
              <div className="bg-white p-4 rounded-lg md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Other Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Hunting/Fishing License:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].other.huntingFishing}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">State Parks:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].other.stateParks}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">License Plates:</span>
                    <p className="text-gray-600">{STATE_DATA[selectedState].other.licensePlates}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {comparisonStates.length >= 2 && (
          <div id="comparison" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Category</th>
                    {comparisonStates.map(stateCode => (
                      <th key={stateCode} className="border border-gray-300 px-4 py-2 text-center font-semibold">
                        {STATE_DATA[stateCode].name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Overall Score</td>
                    {comparisonStates.map(stateCode => (
                      <td key={stateCode} className="border border-gray-300 px-4 py-2 text-center">
                        <span className={`font-bold ${getScoreTextColor(STATE_DATA[stateCode].friendlinessScore)}`}>
                          {STATE_DATA[stateCode].friendlinessScore}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Retirement Pay Tax</td>
                    {comparisonStates.map(stateCode => (
                      <td key={stateCode} className="border border-gray-300 px-4 py-2">
                        {STATE_DATA[stateCode].taxes.retirementPay}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Property Tax Exemption</td>
                    {comparisonStates.map(stateCode => (
                      <td key={stateCode} className="border border-gray-300 px-4 py-2">
                        {STATE_DATA[stateCode].taxes.propertyTax}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">VA Hospitals</td>
                    {comparisonStates.map(stateCode => (
                      <td key={stateCode} className="border border-gray-300 px-4 py-2 text-center">
                        {STATE_DATA[stateCode].healthcare.vaHospitals}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">VA Clinics</td>
                    {comparisonStates.map(stateCode => (
                      <td key={stateCode} className="border border-gray-300 px-4 py-2 text-center">
                        {STATE_DATA[stateCode].healthcare.vaClinics}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">State GI Bill</td>
                    {comparisonStates.map(stateCode => (
                      <td key={stateCode} className="border border-gray-300 px-4 py-2">
                        {STATE_DATA[stateCode].education.stateGiBill}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Hiring Preference</td>
                    {comparisonStates.map(stateCode => (
                      <td key={stateCode} className="border border-gray-300 px-4 py-2 text-center">
                        {STATE_DATA[stateCode].employment.hiringPreference}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Hunting/Fishing License</td>
                    {comparisonStates.map(stateCode => (
                      <td key={stateCode} className="border border-gray-300 px-4 py-2">
                        {STATE_DATA[stateCode].other.huntingFishing}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
