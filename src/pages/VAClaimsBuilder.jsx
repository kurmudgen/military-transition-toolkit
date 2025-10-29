import { useState, useEffect } from 'react'
import { isPromoActive } from '../utils/promoConfig'

// Condition categories and their conditions
const CONDITION_CATEGORIES = {
  musculoskeletal: {
    name: 'Musculoskeletal',
    conditions: [
      'Left knee pain/injury',
      'Right knee pain/injury',
      'Lower back pain (lumbar spine)',
      'Upper back pain (thoracic spine)',
      'Neck pain (cervical spine)',
      'Left shoulder injury',
      'Right shoulder injury',
      'Left ankle/foot condition',
      'Right ankle/foot condition',
      'Left hip condition',
      'Right hip condition',
      'Left elbow/wrist/hand',
      'Right elbow/wrist/hand',
      'Degenerative arthritis',
      'Plantar fasciitis'
    ]
  },
  mentalHealth: {
    name: 'Mental Health',
    conditions: [
      'PTSD (Post-Traumatic Stress Disorder)',
      'Major Depressive Disorder',
      'Anxiety Disorder',
      'Sleep disturbance/insomnia',
      'Adjustment disorder'
    ]
  },
  hearing: {
    name: 'Hearing/ENT',
    conditions: [
      'Tinnitus (ringing in ears)',
      'Hearing loss - left ear',
      'Hearing loss - right ear',
      'Sinusitis (chronic)',
      'Rhinitis'
    ]
  },
  neurological: {
    name: 'Neurological',
    conditions: [
      'Migraine headaches',
      'Tension headaches',
      'Traumatic Brain Injury (TBI)',
      'Peripheral neuropathy',
      'Radiculopathy (nerve pain)'
    ]
  },
  skin: {
    name: 'Skin Conditions',
    conditions: [
      'Scars (specify location)',
      'Acne',
      'Eczema',
      'Psoriasis'
    ]
  },
  respiratory: {
    name: 'Respiratory',
    conditions: [
      'Sleep apnea',
      'Asthma'
    ]
  },
  digestive: {
    name: 'Digestive',
    conditions: [
      'GERD (acid reflux)',
      'IBS (Irritable Bowel Syndrome)',
      'Hemorrhoids'
    ]
  },
  other: {
    name: 'Other',
    conditions: [
      'Hypertension (high blood pressure)',
      'Diabetes (Type 2)'
    ]
  }
}

// Secondary condition suggestions
const SECONDARY_SUGGESTIONS = {
  'PTSD (Post-Traumatic Stress Disorder)': [
    'Sleep disturbance/insomnia secondary to PTSD',
    'Major Depressive Disorder secondary to PTSD',
    'Anxiety Disorder secondary to PTSD'
  ],
  'Lower back pain (lumbar spine)': [
    'Left knee pain/injury secondary to altered gait from back pain',
    'Right knee pain/injury secondary to altered gait from back pain',
    'Major Depressive Disorder secondary to chronic pain'
  ],
  'Upper back pain (thoracic spine)': [
    'Major Depressive Disorder secondary to chronic pain'
  ],
  'Neck pain (cervical spine)': [
    'Migraine headaches secondary to cervical spine condition',
    'Major Depressive Disorder secondary to chronic pain'
  ],
  'Traumatic Brain Injury (TBI)': [
    'Migraine headaches secondary to TBI',
    'Sleep disturbance/insomnia secondary to TBI',
    'Major Depressive Disorder secondary to TBI',
    'Tinnitus (ringing in ears) secondary to TBI'
  ]
}

export default function VAClaimsBuilder() {
  const [activeTab, setActiveTab] = useState('builder') // builder, evidence
  const [selectedConditions, setSelectedConditions] = useState([])
  const [conditionDetails, setConditionDetails] = useState({})
  const [evidenceTracking, setEvidenceTracking] = useState({})
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedEvidence, setExpandedEvidence] = useState({})
  const [showingSuggestions, setShowingSuggestions] = useState(false)
  const [generatedStatements, setGeneratedStatements] = useState(null)

  // Set page title
  useEffect(() => {
    document.title = 'VA Claims Builder | Military Transition Toolkit'
  }, [])

  // Load saved data from localStorage
  useEffect(() => {
    const savedConditions = localStorage.getItem('vaClaimsConditions')
    const savedDetails = localStorage.getItem('vaClaimsDetails')
    const savedEvidence = localStorage.getItem('vaClaimsEvidence')

    if (savedConditions) {
      try {
        setSelectedConditions(JSON.parse(savedConditions))
      } catch (e) {
        console.error('Error loading conditions:', e)
      }
    }
    if (savedDetails) {
      try {
        setConditionDetails(JSON.parse(savedDetails))
      } catch (e) {
        console.error('Error loading details:', e)
      }
    }
    if (savedEvidence) {
      try {
        setEvidenceTracking(JSON.parse(savedEvidence))
      } catch (e) {
        console.error('Error loading evidence:', e)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('vaClaimsConditions', JSON.stringify(selectedConditions))
  }, [selectedConditions])

  useEffect(() => {
    localStorage.setItem('vaClaimsDetails', JSON.stringify(conditionDetails))
  }, [conditionDetails])

  useEffect(() => {
    localStorage.setItem('vaClaimsEvidence', JSON.stringify(evidenceTracking))
  }, [evidenceTracking])

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  const toggleEvidenceCondition = (condition) => {
    setExpandedEvidence(prev => ({
      ...prev,
      [condition]: !prev[condition]
    }))
  }

  const toggleCondition = (condition) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition))
      const newDetails = { ...conditionDetails }
      delete newDetails[condition]
      setConditionDetails(newDetails)
      const newEvidence = { ...evidenceTracking }
      delete newEvidence[condition]
      setEvidenceTracking(newEvidence)
    } else {
      setSelectedConditions([...selectedConditions, condition])
      setConditionDetails({
        ...conditionDetails,
        [condition]: {
          startDate: '',
          incident: '',
          symptoms: {},
          frequency: '',
          worsening: '',
          treatment: {},
          limitations: {},
          painLevel: ''
        }
      })
      // Initialize evidence tracking
      setEvidenceTracking({
        ...evidenceTracking,
        [condition]: {
          required: {
            strs: { status: 'not-started', date: '', notes: '', upload: '' },
            diagnosis: { status: 'not-started', doctor: '', date: '', notes: '' },
            nexus: { status: 'not-started', doctor: '', date: '', notes: '' }
          },
          recommended: {
            buddyStatements: { count: 0, names: '', status: 'not-started', notes: '' },
            commanderStatement: { status: 'not-started', date: '', notes: '' },
            photos: { has: false, description: '', location: '' },
            prescriptions: { medications: '', pharmacy: '', dateRange: '' },
            appointments: { count: '', dateRange: '', providers: '' },
            dbq: { status: 'not-started', date: '', examiner: '' }
          },
          conditionSpecific: {},
          submission: {
            peblo: { submitted: false, date: '', method: '', confirmed: false },
            va: { submitted: false, date: '', claimNumber: '', confirmed: false }
          },
          timeline: {
            started: new Date().toISOString().split('T')[0],
            targetDate: '',
            lastUpdated: new Date().toISOString()
          }
        }
      })
    }
  }

  const updateConditionDetail = (condition, field, value) => {
    setConditionDetails({
      ...conditionDetails,
      [condition]: {
        ...conditionDetails[condition],
        [field]: value
      }
    })
  }

  const updateEvidence = (condition, category, field, subfield, value) => {
    setEvidenceTracking(prev => ({
      ...prev,
      [condition]: {
        ...prev[condition],
        [category]: {
          ...prev[condition][category],
          [field]: subfield
            ? { ...prev[condition][category][field], [subfield]: value }
            : value
        },
        timeline: {
          ...prev[condition].timeline,
          lastUpdated: new Date().toISOString()
        }
      }
    }))
  }

  const getConditionType = (condition) => {
    for (const [categoryId, category] of Object.entries(CONDITION_CATEGORIES)) {
      if (category.conditions.includes(condition)) {
        return categoryId
      }
    }
    return 'other'
  }

  const getEvidenceProgress = (condition) => {
    const evidence = evidenceTracking[condition]
    if (!evidence) return 0

    let total = 0
    let completed = 0

    // Required evidence (3 items)
    Object.values(evidence.required).forEach(item => {
      total++
      if (item.status === 'completed') completed++
    })

    // Recommended evidence (6 items)
    const rec = evidence.recommended
    total += 6
    if (rec.buddyStatements.status === 'received') completed++
    if (rec.commanderStatement.status === 'received') completed++
    if (rec.photos.has) completed++
    if (rec.prescriptions.medications) completed++
    if (rec.appointments.count) completed++
    if (rec.dbq.status === 'completed') completed++

    return Math.round((completed / total) * 100)
  }

  const getMissingCriticalEvidence = () => {
    const missing = []
    selectedConditions.forEach(condition => {
      const evidence = evidenceTracking[condition]
      if (evidence) {
        const criticalMissing = []
        if (evidence.required.strs.status !== 'completed') criticalMissing.push('STRs')
        if (evidence.required.diagnosis.status !== 'completed') criticalMissing.push('Diagnosis')
        if (evidence.required.nexus.status !== 'completed') criticalMissing.push('Nexus Letter')

        if (criticalMissing.length > 0) {
          missing.push({ condition, missing: criticalMissing })
        }
      }
    })
    return missing
  }

  const getSuggestedSecondaries = () => {
    const suggestions = []
    selectedConditions.forEach(condition => {
      if (SECONDARY_SUGGESTIONS[condition]) {
        SECONDARY_SUGGESTIONS[condition].forEach(suggestion => {
          if (!selectedConditions.includes(suggestion)) {
            suggestions.push({ primary: condition, secondary: suggestion })
          }
        })
      }
    })
    return suggestions
  }

  const generateClaimStatements = () => {
    const statements = {}
    selectedConditions.forEach(condition => {
      const details = conditionDetails[condition] || {}
      const symptoms = Object.keys(details.symptoms || {}).filter(s => details.symptoms[s]).join(', ')
      const treatments = Object.keys(details.treatment || {}).filter(t => details.treatment[t]).join(', ')
      const limitations = Object.keys(details.limitations || {}).filter(l => details.limitations[l]).join(', ')

      let statement = `${condition}`

      if (details.incident) {
        statement += ` due to ${details.incident} during service`
      }

      if (details.startDate) {
        statement += ` starting ${details.startDate}`
      }

      statement += '.'

      if (symptoms) {
        statement += ` Current symptoms include ${symptoms}`
        if (details.frequency) {
          statement += ` occurring ${details.frequency}`
        }
        statement += '.'
      }

      if (details.painLevel) {
        statement += ` Pain rated ${details.painLevel}/10 on average.`
      }

      if (limitations) {
        statement += ` Condition causes functional limitations including ${limitations}.`
      }

      if (treatments) {
        statement += ` Treatment includes ${treatments}.`
      }

      if (details.worsening) {
        statement += ` Condition worsens with ${details.worsening}.`
      }

      statements[condition] = statement
    })
    setGeneratedStatements(statements)
  }

  const exportEvidenceChecklist = () => {
    let text = 'VA CLAIMS EVIDENCE TRACKER\n'
    text += '='.repeat(80) + '\n\n'

    selectedConditions.forEach((condition, idx) => {
      const evidence = evidenceTracking[condition]
      if (!evidence) return

      text += `${idx + 1}. ${condition.toUpperCase()}\n`
      text += `   Progress: ${getEvidenceProgress(condition)}% complete\n\n`

      text += '   REQUIRED EVIDENCE:\n'
      text += `   ☐ STRs - Status: ${evidence.required.strs.status}\n`
      if (evidence.required.strs.notes) text += `      Notes: ${evidence.required.strs.notes}\n`
      text += `   ☐ Diagnosis - Status: ${evidence.required.diagnosis.status}\n`
      if (evidence.required.diagnosis.doctor) text += `      Doctor: ${evidence.required.diagnosis.doctor}\n`
      text += `   ☐ Nexus Letter - Status: ${evidence.required.nexus.status}\n`
      if (evidence.required.nexus.doctor) text += `      Doctor: ${evidence.required.nexus.doctor}\n`

      text += '\n   RECOMMENDED EVIDENCE:\n'
      text += `   ☐ Buddy Statements - Count: ${evidence.recommended.buddyStatements.count}\n`
      text += `   ☐ Commander Statement - Status: ${evidence.recommended.commanderStatement.status}\n`
      text += `   ☐ Photos/Videos - Has: ${evidence.recommended.photos.has ? 'Yes' : 'No'}\n`
      text += `   ☐ Prescriptions - ${evidence.recommended.prescriptions.medications || 'Not documented'}\n`
      text += `   ☐ Appointment History - ${evidence.recommended.appointments.count || 'Not tracked'}\n`
      text += `   ☐ DBQ - Status: ${evidence.recommended.dbq.status}\n`

      text += '\n' + '-'.repeat(80) + '\n\n'
    })

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'va-claims-evidence-tracker.txt'
    a.click()
  }

  const exportAsText = () => {
    if (!generatedStatements) return

    let text = 'VA DISABILITY CLAIM STATEMENTS\n\n'
    text += '='.repeat(60) + '\n\n'

    Object.entries(generatedStatements).forEach(([condition, statement], idx) => {
      text += `${idx + 1}. ${statement}\n\n`
    })

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'va-claim-statements.txt'
    a.click()
  }

  const copyToClipboard = () => {
    if (!generatedStatements) return

    let text = ''
    Object.values(generatedStatements).forEach((statement, idx) => {
      text += `${idx + 1}. ${statement}\n\n`
    })

    navigator.clipboard.writeText(text)
    alert('Claim statements copied to clipboard!')
  }

  const getProgress = () => {
    const total = selectedConditions.length
    const complete = selectedConditions.filter(c => {
      const details = conditionDetails[c]
      return details && details.incident && details.startDate && Object.keys(details.symptoms || {}).length > 0
    }).length

    return { total, complete, incomplete: total - complete }
  }

  const progress = getProgress()
  const suggestions = getSuggestedSecondaries()
  const missingCritical = getMissingCriticalEvidence()

  // Calculate overall evidence completion
  const overallEvidenceProgress = selectedConditions.length > 0
    ? Math.round(selectedConditions.reduce((sum, c) => sum + getEvidenceProgress(c), 0) / selectedConditions.length)
    : 0

  const conditionsWithCompleteEvidence = selectedConditions.filter(c => getEvidenceProgress(c) === 100).length

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">
            VA Claims Builder
          </h1>
          {isPromoActive() && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
              🎖️ Launch Special - FREE
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-6">
          Build comprehensive claim statements and track evidence for your VA disability application
        </p>

        {/* Privacy Warning */}
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Privacy & Security Notice</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  This page contains sensitive medical and personal information. <strong>Free tier:</strong> Data stored locally on your device. <strong>Premium:</strong> End-to-end encrypted cloud storage with zero-knowledge architecture - we cannot decrypt or access your information.
                  Export your claims regularly as backup.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('builder')}
              className={`${
                activeTab === 'builder'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Claims Builder
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`${
                activeTab === 'evidence'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Evidence Tracker
              {selectedConditions.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                  {selectedConditions.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* CLAIMS BUILDER TAB */}
        {activeTab === 'builder' && (
          <>
            {/* Progress Tracker */}
            {selectedConditions.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Progress</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Conditions selected:</span>
                    <span className="ml-2 font-bold text-blue-600">{progress.total}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Complete information:</span>
                    <span className="ml-2 font-bold text-green-600">{progress.complete}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Need more details:</span>
                    <span className="ml-2 font-bold text-red-600">{progress.incomplete}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Secondary Conditions */}
            {suggestions.length > 0 && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">💡 Suggested Secondary Conditions</h3>
                  <button
                    onClick={() => setShowingSuggestions(!showingSuggestions)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {showingSuggestions ? 'Hide' : 'Show'} ({suggestions.length})
                  </button>
                </div>
                {showingSuggestions && (
                  <div className="space-y-2">
                    {suggestions.map((sug, idx) => (
                      <div key={idx} className="flex items-start">
                        <button
                          onClick={() => toggleCondition(sug.secondary)}
                          className="mt-1 text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          + Add
                        </button>
                        <p className="ml-3 text-sm text-gray-700">
                          <span className="font-medium">{sug.secondary}</span>
                          <span className="text-gray-500"> (from {sug.primary})</span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Condition Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Select Your Conditions</h2>
              <div className="space-y-3">
                {Object.entries(CONDITION_CATEGORIES).map(([categoryId, category]) => (
                  <div key={categoryId} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleCategory(categoryId)}
                      className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left"
                    >
                      <span className="font-semibold text-gray-900">{category.name}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${expandedCategories[categoryId] ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {expandedCategories[categoryId] && (
                      <div className="p-4 space-y-2">
                        {category.conditions.map(condition => (
                          <label key={condition} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                            <input
                              type="checkbox"
                              checked={selectedConditions.includes(condition)}
                              onChange={() => toggleCondition(condition)}
                              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-gray-700">{condition}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Condition Details Forms */}
            {selectedConditions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Provide Details for Each Condition</h2>
                <div className="space-y-6">
                  {selectedConditions.map(condition => {
                    const details = conditionDetails[condition] || {}
                    return (
                      <div key={condition} className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">{condition}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              When did this start?
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., 2015 or January 2018"
                              value={details.startDate || ''}
                              onChange={(e) => updateConditionDetail(condition, 'startDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              How often does it occur?
                            </label>
                            <select
                              value={details.frequency || ''}
                              onChange={(e) => updateConditionDetail(condition, 'frequency', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select frequency</option>
                              <option value="constant">Constant</option>
                              <option value="daily">Daily</option>
                              <option value="3-4x per week">3-4x per week</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            How did it happen?
                          </label>
                          <textarea
                            placeholder="Describe the incident or activities that caused this condition during service..."
                            value={details.incident || ''}
                            onChange={(e) => updateConditionDetail(condition, 'incident', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Symptoms (check all that apply)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {['Pain', 'Swelling', 'Limited range of motion', 'Stiffness', 'Weakness', 'Numbness/tingling'].map(symptom => (
                              <label key={symptom} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={details.symptoms?.[symptom] || false}
                                  onChange={(e) => updateConditionDetail(condition, 'symptoms', {
                                    ...details.symptoms,
                                    [symptom]: e.target.checked
                                  })}
                                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">{symptom}</span>
                              </label>
                            ))}
                          </div>
                          {details.symptoms?.['Pain'] && (
                            <div className="mt-2">
                              <label className="block text-sm text-gray-600 mb-1">Pain level (1-10):</label>
                              <input
                                type="number"
                                min="1"
                                max="10"
                                value={details.painLevel || ''}
                                onChange={(e) => updateConditionDetail(condition, 'painLevel', e.target.value)}
                                className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                          )}
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            What makes it worse?
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., prolonged standing, cold weather, physical activity"
                            value={details.worsening || ''}
                            onChange={(e) => updateConditionDetail(condition, 'worsening', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Treatment Received
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {['Physical therapy', 'Medications', 'Injections', 'Surgery', 'Seeing specialist', 'Using brace/support'].map(treatment => (
                              <label key={treatment} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={details.treatment?.[treatment] || false}
                                  onChange={(e) => updateConditionDetail(condition, 'treatment', {
                                    ...details.treatment,
                                    [treatment]: e.target.checked
                                  })}
                                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">{treatment}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Functional Limitations - What can't you do?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {['Walking long distances', 'Standing for long periods', 'Climbing stairs', 'Running', 'Lifting heavy objects', 'Kneeling/squatting'].map(limitation => (
                              <label key={limitation} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={details.limitations?.[limitation] || false}
                                  onChange={(e) => updateConditionDetail(condition, 'limitations', {
                                    ...details.limitations,
                                    [limitation]: e.target.checked
                                  })}
                                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">{limitation}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Generate and Export */}
            {selectedConditions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. Generate Claim Statements</h2>
                <button
                  onClick={generateClaimStatements}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate Claim Statements
                </button>

                {generatedStatements && (
                  <div className="mt-6">
                    <div className="flex gap-3 mb-4">
                      <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Copy to Clipboard
                      </button>
                      <button
                        onClick={exportAsText}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                      >
                        Download as Text File
                      </button>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-lg p-6">
                      <h3 className="font-bold text-gray-900 mb-4">Your Generated Claim Statements:</h3>
                      <div className="space-y-4">
                        {Object.entries(generatedStatements).map(([condition, statement], idx) => (
                          <div key={condition} className="pb-4 border-b border-gray-200 last:border-0">
                            <p className="font-semibold text-gray-800 mb-2">{idx + 1}. {condition}</p>
                            <p className="text-gray-700 leading-relaxed">{statement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedConditions.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No conditions selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by selecting conditions from the categories above
                </p>
              </div>
            )}
          </>
        )}

        {/* EVIDENCE TRACKER TAB */}
        {activeTab === 'evidence' && (
          <>
            {selectedConditions.length > 0 ? (
              <>
                {/* Dashboard Overview */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{selectedConditions.length}</div>
                    <div className="text-sm text-gray-600">Total Conditions</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{conditionsWithCompleteEvidence}</div>
                    <div className="text-sm text-gray-600">Complete Evidence</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-red-600">{missingCritical.length}</div>
                    <div className="text-sm text-gray-600">Missing Critical Evidence</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">{overallEvidenceProgress}%</div>
                    <div className="text-sm text-gray-600">Overall Progress</div>
                  </div>
                </div>

                {/* Priority Alerts */}
                {missingCritical.length > 0 && (
                  <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">⚠️</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-red-900 mb-2">These conditions are missing REQUIRED evidence:</h3>
                        <ul className="space-y-2">
                          {missingCritical.map((item, idx) => (
                            <li key={idx} className="text-red-800">
                              <span className="font-semibold">{item.condition}</span>
                              <span className="text-red-600"> - Missing: {item.missing.join(', ')}</span>
                              <button
                                onClick={() => {
                                  setExpandedEvidence(prev => ({ ...prev, [item.condition]: true }))
                                  setTimeout(() => {
                                    document.getElementById(`evidence-${idx}`)?.scrollIntoView({ behavior: 'smooth' })
                                  }, 100)
                                }}
                                className="ml-3 text-sm text-blue-600 hover:text-blue-800 underline"
                              >
                                Jump to tracker
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Export Button */}
                <div className="mb-6">
                  <button
                    onClick={exportEvidenceChecklist}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Export Evidence Tracker as PDF
                  </button>
                </div>

                {/* Evidence Cards for Each Condition */}
                <div className="space-y-6">
                  {selectedConditions.map((condition, idx) => {
                    const evidence = evidenceTracking[condition]
                    if (!evidence) return null

                    const conditionType = getConditionType(condition)
                    const progress = getEvidenceProgress(condition)

                    return (
                      <div key={condition} id={`evidence-${idx}`} className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleEvidenceCondition(condition)}
                          className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 flex items-center justify-between text-left"
                        >
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900">{condition}</h3>
                            <div className="mt-2 flex items-center gap-4">
                              <div className="flex-1 bg-gray-200 rounded-full h-3 max-w-md">
                                <div
                                  className={`h-3 rounded-full transition-all ${
                                    progress === 100 ? 'bg-green-500' : progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-700">{progress}% complete</span>
                            </div>
                          </div>
                          <svg
                            className={`w-6 h-6 transition-transform ${expandedEvidence[condition] ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {expandedEvidence[condition] && (
                          <div className="p-6 bg-white">
                            {/* REQUIRED EVIDENCE */}
                            <div className="mb-8">
                              <h4 className="text-md font-bold text-gray-900 mb-4 flex items-center">
                                <span className="text-red-600 mr-2">★</span>
                                REQUIRED EVIDENCE (Must Have)
                              </h4>

                              {/* STRs */}
                              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-start">
                                  <input
                                    type="checkbox"
                                    checked={evidence.required.strs.status === 'completed'}
                                    onChange={(e) => updateEvidence(condition, 'required', 'strs', 'status',
                                      e.target.checked ? 'completed' : 'in-progress')}
                                    className="h-5 w-5 text-green-600 rounded border-gray-300 mt-1 mr-3"
                                  />
                                  <div className="flex-1">
                                    <label className="block font-semibold text-gray-900 mb-2">
                                      Service Treatment Records (STRs) mentioning this condition
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      <div>
                                        <label className="block text-xs text-gray-600 mb-1">Status</label>
                                        <select
                                          value={evidence.required.strs.status}
                                          onChange={(e) => updateEvidence(condition, 'required', 'strs', 'status', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        >
                                          <option value="not-started">Not Started</option>
                                          <option value="in-progress">In Progress</option>
                                          <option value="completed">Completed</option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-xs text-gray-600 mb-1">Date Obtained</label>
                                        <input
                                          type="date"
                                          value={evidence.required.strs.date}
                                          onChange={(e) => updateEvidence(condition, 'required', 'strs', 'date', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        />
                                      </div>
                                      <div className="md:col-span-2">
                                        <label className="block text-xs text-gray-600 mb-1">Upload Reference / File Location</label>
                                        <input
                                          type="text"
                                          placeholder="e.g., Documents/STRs/knee-records.pdf"
                                          value={evidence.required.strs.upload}
                                          onChange={(e) => updateEvidence(condition, 'required', 'strs', 'upload', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        />
                                      </div>
                                      <div className="md:col-span-2">
                                        <label className="block text-xs text-gray-600 mb-1">Notes</label>
                                        <textarea
                                          placeholder="Details about STRs..."
                                          value={evidence.required.strs.notes}
                                          onChange={(e) => updateEvidence(condition, 'required', 'strs', 'notes', e.target.value)}
                                          rows={2}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Current Diagnosis */}
                              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-start">
                                  <input
                                    type="checkbox"
                                    checked={evidence.required.diagnosis.status === 'completed'}
                                    onChange={(e) => updateEvidence(condition, 'required', 'diagnosis', 'status',
                                      e.target.checked ? 'completed' : 'in-progress')}
                                    className="h-5 w-5 text-green-600 rounded border-gray-300 mt-1 mr-3"
                                  />
                                  <div className="flex-1">
                                    <label className="block font-semibold text-gray-900 mb-2">
                                      Current Diagnosis from Doctor
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      <div>
                                        <label className="block text-xs text-gray-600 mb-1">Status</label>
                                        <select
                                          value={evidence.required.diagnosis.status}
                                          onChange={(e) => updateEvidence(condition, 'required', 'diagnosis', 'status', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        >
                                          <option value="not-started">Not Started</option>
                                          <option value="in-progress">In Progress</option>
                                          <option value="completed">Completed</option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-xs text-gray-600 mb-1">Doctor Name</label>
                                        <input
                                          type="text"
                                          placeholder="Dr. Smith"
                                          value={evidence.required.diagnosis.doctor}
                                          onChange={(e) => updateEvidence(condition, 'required', 'diagnosis', 'doctor', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs text-gray-600 mb-1">Date Diagnosed</label>
                                        <input
                                          type="date"
                                          value={evidence.required.diagnosis.date}
                                          onChange={(e) => updateEvidence(condition, 'required', 'diagnosis', 'date', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        />
                                      </div>
                                      <div className="md:col-span-2">
                                        <label className="block text-xs text-gray-600 mb-1">Notes</label>
                                        <textarea
                                          placeholder="Key details from diagnosis..."
                                          value={evidence.required.diagnosis.notes}
                                          onChange={(e) => updateEvidence(condition, 'required', 'diagnosis', 'notes', e.target.value)}
                                          rows={2}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Nexus Letter */}
                              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-start">
                                  <input
                                    type="checkbox"
                                    checked={evidence.required.nexus.status === 'completed'}
                                    onChange={(e) => updateEvidence(condition, 'required', 'nexus', 'status',
                                      e.target.checked ? 'completed' : 'in-progress')}
                                    className="h-5 w-5 text-green-600 rounded border-gray-300 mt-1 mr-3"
                                  />
                                  <div className="flex-1">
                                    <label className="block font-semibold text-gray-900 mb-2">
                                      Nexus Letter (linking condition to service)
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      <div>
                                        <label className="block text-xs text-gray-600 mb-1">Status</label>
                                        <select
                                          value={evidence.required.nexus.status}
                                          onChange={(e) => updateEvidence(condition, 'required', 'nexus', 'status', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        >
                                          <option value="not-started">Not Started</option>
                                          <option value="in-progress">In Progress</option>
                                          <option value="completed">Completed</option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-xs text-gray-600 mb-1">Doctor Name</label>
                                        <input
                                          type="text"
                                          placeholder="Dr. Jones"
                                          value={evidence.required.nexus.doctor}
                                          onChange={(e) => updateEvidence(condition, 'required', 'nexus', 'doctor', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs text-gray-600 mb-1">Date Obtained</label>
                                        <input
                                          type="date"
                                          value={evidence.required.nexus.date}
                                          onChange={(e) => updateEvidence(condition, 'required', 'nexus', 'date', e.target.value)}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        />
                                      </div>
                                      <div className="md:col-span-2">
                                        <label className="block text-xs text-gray-600 mb-1">Notes (Key points in letter)</label>
                                        <textarea
                                          placeholder="Summary of nexus letter..."
                                          value={evidence.required.nexus.notes}
                                          onChange={(e) => updateEvidence(condition, 'required', 'nexus', 'notes', e.target.value)}
                                          rows={2}
                                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* RECOMMENDED EVIDENCE */}
                            <div className="mb-8">
                              <h4 className="text-md font-bold text-gray-900 mb-4 flex items-center">
                                <span className="text-blue-600 mr-2">★</span>
                                RECOMMENDED EVIDENCE (Helpful)
                              </h4>

                              {/* Buddy Statements */}
                              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <label className="block font-semibold text-gray-900 mb-2">Buddy Statements</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Number Collected</label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={evidence.recommended.buddyStatements.count}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'buddyStatements', 'count', parseInt(e.target.value) || 0)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Status</label>
                                    <select
                                      value={evidence.recommended.buddyStatements.status}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'buddyStatements', 'status', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    >
                                      <option value="not-started">Not Started</option>
                                      <option value="requested">Requested</option>
                                      <option value="received">Received</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Names</label>
                                    <input
                                      type="text"
                                      placeholder="John, Jane, Bob"
                                      value={evidence.recommended.buddyStatements.names}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'buddyStatements', 'names', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div className="md:col-span-3">
                                    <label className="block text-xs text-gray-600 mb-1">Notes</label>
                                    <textarea
                                      placeholder="Details about buddy statements..."
                                      value={evidence.recommended.buddyStatements.notes}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'buddyStatements', 'notes', e.target.value)}
                                      rows={2}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Commander Statement */}
                              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <label className="block font-semibold text-gray-900 mb-2">Commander's Statement</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Status</label>
                                    <select
                                      value={evidence.recommended.commanderStatement.status}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'commanderStatement', 'status', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    >
                                      <option value="not-started">Not Started</option>
                                      <option value="requested">Requested</option>
                                      <option value="received">Received</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Date Obtained</label>
                                    <input
                                      type="date"
                                      value={evidence.recommended.commanderStatement.date}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'commanderStatement', 'date', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div className="md:col-span-2">
                                    <label className="block text-xs text-gray-600 mb-1">Notes</label>
                                    <textarea
                                      placeholder="Details about commander statement..."
                                      value={evidence.recommended.commanderStatement.notes}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'commanderStatement', 'notes', e.target.value)}
                                      rows={2}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Photos/Videos */}
                              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <label className="block font-semibold text-gray-900 mb-2">Photos/Videos of Limitations</label>
                                <div className="grid grid-cols-1 gap-3">
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={evidence.recommended.photos.has}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'photos', 'has', e.target.checked)}
                                      className="h-5 w-5 text-blue-600 rounded border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Have visual documentation</span>
                                  </label>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Description</label>
                                    <input
                                      type="text"
                                      placeholder="e.g., Video of limited knee mobility"
                                      value={evidence.recommended.photos.description}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'photos', 'description', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Location</label>
                                    <input
                                      type="text"
                                      placeholder="File path or folder"
                                      value={evidence.recommended.photos.location}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'photos', 'location', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Prescription Records */}
                              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <label className="block font-semibold text-gray-900 mb-2">Prescription Records</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="md:col-span-2">
                                    <label className="block text-xs text-gray-600 mb-1">Medications Listed</label>
                                    <textarea
                                      placeholder="Ibuprofen 800mg, Cyclobenzaprine, etc."
                                      value={evidence.recommended.prescriptions.medications}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'prescriptions', 'medications', e.target.value)}
                                      rows={2}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Pharmacy</label>
                                    <input
                                      type="text"
                                      placeholder="CVS, Walgreens, etc."
                                      value={evidence.recommended.prescriptions.pharmacy}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'prescriptions', 'pharmacy', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Date Range</label>
                                    <input
                                      type="text"
                                      placeholder="2015-2023"
                                      value={evidence.recommended.prescriptions.dateRange}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'prescriptions', 'dateRange', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Medical Appointment History */}
                              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <label className="block font-semibold text-gray-900 mb-2">Medical Appointment History</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Number of Appointments</label>
                                    <input
                                      type="text"
                                      placeholder="e.g., 15+"
                                      value={evidence.recommended.appointments.count}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'appointments', 'count', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Date Range</label>
                                    <input
                                      type="text"
                                      placeholder="2018-2023"
                                      value={evidence.recommended.appointments.dateRange}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'appointments', 'dateRange', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div className="md:col-span-2">
                                    <label className="block text-xs text-gray-600 mb-1">Providers</label>
                                    <textarea
                                      placeholder="Dr. Smith (Orthopedic), Dr. Jones (PT), etc."
                                      value={evidence.recommended.appointments.providers}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'appointments', 'providers', e.target.value)}
                                      rows={2}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* DBQ */}
                              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <label className="block font-semibold text-gray-900 mb-2">DBQ (Disability Benefits Questionnaire) Completed</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Status</label>
                                    <select
                                      value={evidence.recommended.dbq.status}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'dbq', 'status', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    >
                                      <option value="not-started">Not Started</option>
                                      <option value="scheduled">Scheduled</option>
                                      <option value="completed">Completed</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Date</label>
                                    <input
                                      type="date"
                                      value={evidence.recommended.dbq.date}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'dbq', 'date', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Examiner</label>
                                    <input
                                      type="text"
                                      placeholder="Dr. Name"
                                      value={evidence.recommended.dbq.examiner}
                                      onChange={(e) => updateEvidence(condition, 'recommended', 'dbq', 'examiner', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* CONDITION-SPECIFIC EVIDENCE */}
                            {(conditionType === 'mentalHealth' || conditionType === 'musculoskeletal' ||
                              conditionType === 'neurological' || conditionType === 'hearing') && (
                              <div className="mb-8">
                                <h4 className="text-md font-bold text-gray-900 mb-4 flex items-center">
                                  <span className="text-purple-600 mr-2">★</span>
                                  CONDITION-SPECIFIC EVIDENCE
                                </h4>

                                {conditionType === 'mentalHealth' && (
                                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">For Mental Health conditions, also collect:</p>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                      <li>☐ Mental health treatment records</li>
                                      <li>☐ Hospitalization records (if applicable)</li>
                                      <li>☐ Combat documentation (if PTSD)</li>
                                      <li>☐ Stressor statements</li>
                                      <li>☐ Buddy statements about behavior changes</li>
                                    </ul>
                                  </div>
                                )}

                                {conditionType === 'musculoskeletal' && (
                                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">For Musculoskeletal conditions, also collect:</p>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                      <li>☐ X-rays/MRI results</li>
                                      <li>☐ Physical therapy notes</li>
                                      <li>☐ Range of motion measurements</li>
                                      <li>☐ Pain management records</li>
                                      <li>☐ Orthopedic evaluations</li>
                                    </ul>
                                  </div>
                                )}

                                {conditionType === 'neurological' && condition.includes('TBI') && (
                                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">For TBI, also collect:</p>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                      <li>☐ Incident report</li>
                                      <li>☐ Initial medical evaluation after injury</li>
                                      <li>☐ Neurological exam results</li>
                                      <li>☐ Cognitive testing results</li>
                                      <li>☐ Buddy statements about memory/behavior changes</li>
                                    </ul>
                                  </div>
                                )}

                                {conditionType === 'hearing' && (
                                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">For Hearing Loss/Tinnitus, also collect:</p>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                      <li>☐ Audiogram results</li>
                                      <li>☐ Hearing test history</li>
                                      <li>☐ Documentation of noise exposure</li>
                                      <li>☐ Hearing aid records (if applicable)</li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* SUBMISSION TRACKING */}
                            <div className="mb-8">
                              <h4 className="text-md font-bold text-gray-900 mb-4">SUBMISSION TRACKING</h4>

                              {/* PEBLO Submission */}
                              <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                <label className="flex items-center mb-3">
                                  <input
                                    type="checkbox"
                                    checked={evidence.submission.peblo.submitted}
                                    onChange={(e) => updateEvidence(condition, 'submission', 'peblo', 'submitted', e.target.checked)}
                                    className="h-5 w-5 text-green-600 rounded border-gray-300"
                                  />
                                  <span className="ml-2 font-semibold text-gray-900">Documents submitted to PEBLO</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Date Submitted</label>
                                    <input
                                      type="date"
                                      value={evidence.submission.peblo.date}
                                      onChange={(e) => updateEvidence(condition, 'submission', 'peblo', 'date', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Method</label>
                                    <select
                                      value={evidence.submission.peblo.method}
                                      onChange={(e) => updateEvidence(condition, 'submission', 'peblo', 'method', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    >
                                      <option value="">Select method</option>
                                      <option value="email">Email</option>
                                      <option value="in-person">In-person</option>
                                      <option value="mail">Mail</option>
                                      <option value="portal">Portal</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="flex items-center h-full">
                                      <input
                                        type="checkbox"
                                        checked={evidence.submission.peblo.confirmed}
                                        onChange={(e) => updateEvidence(condition, 'submission', 'peblo', 'confirmed', e.target.checked)}
                                        className="h-5 w-5 text-green-600 rounded border-gray-300"
                                      />
                                      <span className="ml-2 text-sm text-gray-700">Confirmation received</span>
                                    </label>
                                  </div>
                                </div>
                              </div>

                              {/* VA Submission */}
                              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <label className="flex items-center mb-3">
                                  <input
                                    type="checkbox"
                                    checked={evidence.submission.va.submitted}
                                    onChange={(e) => updateEvidence(condition, 'submission', 'va', 'submitted', e.target.checked)}
                                    className="h-5 w-5 text-green-600 rounded border-gray-300"
                                  />
                                  <span className="ml-2 font-semibold text-gray-900">Documents submitted to VA</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Date Submitted</label>
                                    <input
                                      type="date"
                                      value={evidence.submission.va.date}
                                      onChange={(e) => updateEvidence(condition, 'submission', 'va', 'date', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Claim Number</label>
                                    <input
                                      type="text"
                                      placeholder="Claim #"
                                      value={evidence.submission.va.claimNumber}
                                      onChange={(e) => updateEvidence(condition, 'submission', 'va', 'claimNumber', e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <label className="flex items-center h-full">
                                      <input
                                        type="checkbox"
                                        checked={evidence.submission.va.confirmed}
                                        onChange={(e) => updateEvidence(condition, 'submission', 'va', 'confirmed', e.target.checked)}
                                        className="h-5 w-5 text-green-600 rounded border-gray-300"
                                      />
                                      <span className="ml-2 text-sm text-gray-700">Confirmation received</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* TIMELINE TRACKER */}
                            <div>
                              <h4 className="text-md font-bold text-gray-900 mb-4">TIMELINE TRACKER</h4>
                              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-600">Evidence collection started:</span>
                                    <p className="font-semibold text-gray-900">{new Date(evidence.timeline.started).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <label className="block text-gray-600 mb-1">Target completion date:</label>
                                    <input
                                      type="date"
                                      value={evidence.timeline.targetDate}
                                      onChange={(e) => updateEvidence(condition, 'timeline', 'targetDate', null, e.target.value)}
                                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Last updated:</span>
                                    <p className="font-semibold text-gray-900">
                                      {new Date(evidence.timeline.lastUpdated).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                {evidence.timeline.targetDate && (
                                  <div className="mt-3 p-3 bg-blue-100 rounded text-sm">
                                    <span className="font-semibold text-blue-900">
                                      Days remaining: {Math.ceil((new Date(evidence.timeline.targetDate) - new Date()) / (1000 * 60 * 60 * 24))}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No conditions selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Go to Claims Builder tab to select conditions first
                </p>
                <button
                  onClick={() => setActiveTab('builder')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Go to Claims Builder
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
