import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isPromoModeActive } from '../utils/promoConfig'
import { useAuth } from '../contexts/AuthContext'
import { AUTH_LOADING_TIMEOUT } from '../utils/constants'
import { syncOnboardingWithExistingData } from '../hooks/useOnboardingProgress'
import {
  getVAConditions,
  createVACondition,
  updateVACondition,
  deleteVACondition,
  getAllVAEvidence,
  createVAEvidence,
  updateVAEvidence,
  deleteVAEvidence
} from '../services/vaService'
import { VA_CONDITIONS_LIBRARY, getConditionData } from '../data/vaConditions'

// Helper function to match condition names to library data
const getConditionLibraryData = (conditionName) => {
  // Try exact match first
  let data = getConditionData(conditionName)
  if (data) return data

  // Try to match base condition (remove left/right/upper/lower/etc)
  const normalized = conditionName
    .replace(/^(Left|Right|Upper|Lower)\s+/i, '')
    .replace(/\s*\(.*?\)/g, '') // Remove parentheses content
    .trim()

  // Check common mappings
  const mappings = {
    'knee pain/injury': 'Knee Pain',
    'knee pain': 'Knee Pain',
    'back pain lumbar spine': 'Low Back Pain',
    'lower back pain': 'Low Back Pain',
    'low back pain': 'Low Back Pain',
    'neck pain cervical spine': 'Neck Pain (Cervical Spine)',
    'neck pain': 'Neck Pain (Cervical Spine)',
    'shoulder injury': 'Shoulder Pain',
    'shoulder pain': 'Shoulder Pain',
    'ankle/foot condition': 'Ankle Pain',
    'ankle pain': 'Ankle Pain',
    'hip condition': 'Hip Pain',
    'hip pain': 'Hip Pain',
    'ptsd': 'PTSD (Post-Traumatic Stress Disorder)',
    'major depressive disorder': 'Depression',
    'depression': 'Depression',
    'anxiety disorder': 'Generalized Anxiety Disorder',
    'anxiety': 'Generalized Anxiety Disorder',
    'generalized anxiety disorder': 'Generalized Anxiety Disorder',
    'tinnitus': 'Tinnitus',
    'hearing loss': 'Hearing Loss',
    'scars': 'Scars',
    'sleep apnea': 'Sleep Apnea',
    'asthma': 'Asthma',
    'ibs': 'IBS (Irritable Bowel Syndrome)',
    'gerd': 'GERD (Acid Reflux)',
    'migraine headaches': 'Migraine Headaches',
    'traumatic brain injury': 'TBI (Traumatic Brain Injury)',
    'tbi': 'TBI (Traumatic Brain Injury)',
    'hypertension': 'Hypertension (High Blood Pressure)',
    'diabetes': 'Diabetes'
  }

  const mappedName = mappings[normalized.toLowerCase()]
  if (mappedName) {
    data = getConditionData(mappedName)
    if (data) return data
  }

  // Return generic default if no match
  return {
    category: 'Other',
    commonSymptoms: ['Pain', 'Discomfort', 'Difficulty with daily activities'],
    functionalLimitations: ['Impact on work', 'Impact on daily activities', 'Impact on quality of life'],
    evidenceTypes: ['Medical records', 'Service medical records', 'Treatment documentation']
  }
}

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

// localStorage keys for guest mode
const GUEST_VA_CONDITIONS_KEY = 'vaClaimsGuestConditions'
const GUEST_VA_DETAILS_KEY = 'vaClaimsGuestDetails'
const GUEST_VA_EVIDENCE_KEY = 'vaClaimsGuestEvidence'

export default function VAClaimsBuilder({ previewMode = false, demoMode = false, guestMode = false }) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('builder') // builder, evidence
  const [selectedConditions, setSelectedConditions] = useState([])
  const [conditionDetails, setConditionDetails] = useState({})
  const [evidenceTracking, setEvidenceTracking] = useState({})
  const [expandedCategories, setExpandedCategories] = useState({})
  const [expandedEvidence, setExpandedEvidence] = useState({})
  const [showingSuggestions, setShowingSuggestions] = useState(false)
  const [generatedStatements, setGeneratedStatements] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [conditionIdMap, setConditionIdMap] = useState({}) // Maps condition names to database IDs
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false) // Modal for guest users trying to save

  // Set page title
  useEffect(() => {
    document.title = 'VA Disability Claims Tracker - Organize Evidence, Track C&P Exams | Military Transition Toolkit'
    // Sync onboarding progress when visiting VA claims
    syncOnboardingWithExistingData()
  }, [])

  // Timeout for unauthenticated users - show auth prompt after timeout
  // Skip this for demo mode and guest mode
  useEffect(() => {
    if (!user && !demoMode && !guestMode && loading) {
      const timer = setTimeout(() => {
        setLoading(false)
        setShowAuthPrompt(true)
      }, AUTH_LOADING_TIMEOUT)

      return () => clearTimeout(timer)
    }
  }, [user, demoMode, guestMode, loading])

  // Load data from Supabase database or demo data
  useEffect(() => {
    const loadVAData = async () => {
      // Handle demo mode with pre-populated sample data
      if (demoMode) {
        const demoConditions = ['Lower back pain (lumbar spine)', 'Left knee pain/injury', 'Tinnitus']
        const demoDetails = {
          'Lower back pain (lumbar spine)': {
            startDate: '2018-06',
            incident: 'Injured lower back during deployment while carrying heavy gear and equipment. Lifted ammunition crate incorrectly and felt immediate sharp pain. Pain has been chronic since then, aggravated by long tactical movements with full gear.',
            symptoms: {
              'Constant or frequent pain': true,
              'Sharp pain with certain movements': true,
              'Stiffness in the morning': true,
              'Pain radiating down legs': true,
              'Muscle spasms': true,
              'Difficulty bending or twisting': true
            },
            frequency: 'Daily pain ranging from 4-8/10. Pain spikes when lifting, bending, or after prolonged sitting/standing.',
            worsening: 'Pain worse with physical activity, lifting, bending, twisting, prolonged sitting, and cold/damp weather',
            treatment: {
              'Physical therapy': true,
              'Pain medication (NSAIDs)': true,
              'Muscle relaxers': true,
              'Chiropractic care': true,
              'Epidural injections': true
            },
            limitations: {
              'Lifting heavy objects': true,
              'Prolonged sitting or standing': true,
              'Bending or twisting': true,
              'Physical exercise/running': true,
              'Difficulty sleeping due to pain': true,
              'Impact on work performance': true
            },
            painLevel: '7',
            category: 'Musculoskeletal',
            serviceConnected: true,
            estimatedRating: '20-40%',
            notes: 'MRI shows degenerative disc disease L4-L5 and bulging disc. Currently in physical therapy at VA. Pain impacts daily activities and work.'
          },
          'Left knee pain/injury': {
            startDate: '2019-03',
            incident: 'Injured during field training exercise when I landed incorrectly during a tactical movement. Knee gave out and I fell. Have had chronic pain and instability since.',
            symptoms: {
              'Pain during activity': true,
              'Swelling or inflammation': true,
              'Limited range of motion': true,
              'Instability or knee giving way': true,
              'Pain when climbing stairs': true
            },
            frequency: 'Daily pain, especially after physical activity or at end of day',
            worsening: 'Pain increases with prolonged standing, climbing stairs, running, or cold weather',
            treatment: {
              'Physical therapy': true,
              'Pain medication': true,
              'Ice/heat therapy': true
            },
            limitations: {
              'Walking long distances': true,
              'Standing for long periods': true,
              'Climbing stairs': true,
              'Running or jogging': true,
              'Kneeling or squatting': true
            },
            painLevel: '6',
            category: 'Musculoskeletal',
            serviceConnected: true,
            estimatedRating: '10-20%',
            notes: 'MRI shows meniscus tear and early arthritis. PT helped initially but pain persists.'
          },
          'Tinnitus': {
            startDate: '2017-01',
            incident: 'Exposure to heavy weapons fire, explosions, and aircraft noise during multiple deployments. Ringing started during first deployment and has been constant since.',
            symptoms: {
              'Constant ringing or buzzing': true,
              'Difficulty hearing conversations': true,
              'Worse in quiet environments': true
            },
            frequency: 'Constant 24/7, high-pitched ringing in both ears',
            worsening: 'More noticeable in quiet environments, makes it difficult to sleep',
            treatment: {
              'Hearing aids': false,
              'Sound therapy': true,
              'VA audiology appointments': true
            },
            limitations: {
              'Difficulty sleeping': true,
              'Difficulty concentrating': true,
              'Avoidance of loud environments': true
            },
            painLevel: '',
            category: 'Hearing',
            serviceConnected: true,
            estimatedRating: '10%',
            notes: 'Audiologist confirmed hearing loss. Use white noise machine to sleep.'
          }
        }

        const demoEvidence = {
          'Lower back pain (lumbar spine)': {
            required: {
              strs: { status: 'completed', date: '2024-01-15', notes: 'Obtained service medical records documenting back injury and treatment during active duty', upload: '' },
              diagnosis: { status: 'completed', doctor: 'Dr. Martinez, Orthopedic Spine Specialist', date: '2024-02-01', notes: 'MRI confirms degenerative disc disease L4-L5 and bulging disc' },
              nexus: { status: 'in-progress', doctor: 'Dr. Martinez', date: '', notes: 'Working on nexus letter linking condition to service' }
            },
            recommended: {
              buddyStatements: { count: 1, names: 'SGT Thompson', status: 'received', notes: 'Statement from squad leader who witnessed injury incident' },
              commanderStatement: { status: 'received', date: '2024-01-20', notes: 'Commander verified deployment and heavy gear requirements' },
              photos: { has: true, description: 'MRI images and X-rays showing disc damage', location: 'Medical records folder' },
              prescriptions: { medications: 'Naproxen 500mg, Cyclobenzaprine 10mg', pharmacy: 'VA Pharmacy', dateRange: '2018-present' },
              appointments: { count: '25+', dateRange: '2018-2024', providers: 'VA Orthopedics, Physical Therapy, Pain Management' },
              dbq: { status: 'completed', date: '2024-03-01', examiner: 'VA C&P Examiner' }
            },
            conditionSpecific: {},
            submission: {
              peblo: { submitted: true, date: '2024-03-15', method: 'Electronic', confirmed: true },
              va: { submitted: false, date: '', claimNumber: '', confirmed: false }
            },
            timeline: {
              started: '2024-01-10',
              targetDate: '2024-06-01',
              lastUpdated: new Date().toISOString()
            }
          },
          'Left knee pain/injury': {
            required: {
              strs: { status: 'completed', date: '2024-01-10', notes: 'Service medical records document injury during training', upload: '' },
              diagnosis: { status: 'completed', doctor: 'Dr. Johnson, Orthopedic Surgeon', date: '2024-01-25', notes: 'Orthopedic diagnosis with MRI results' },
              nexus: { status: 'completed', doctor: 'Dr. Johnson', date: '2024-02-05', notes: 'Doctor confirmed injury relates to service incident' }
            },
            recommended: {
              buddyStatements: { count: 0, names: '', status: 'not-started', notes: 'Could get statement from training NCO' },
              commanderStatement: { status: 'not-started', date: '', notes: '' },
              photos: { has: true, description: 'MRI scans showing meniscus tear', location: 'Medical records folder' },
              prescriptions: { medications: 'Ibuprofen, Meloxicam', pharmacy: 'VA Pharmacy', dateRange: '2019-present' },
              appointments: { count: '20+', dateRange: '2019-2024', providers: 'VA Orthopedics, Physical Therapy' },
              dbq: { status: 'completed', date: '2024-02-15', examiner: 'VA C&P Examiner' }
            },
            conditionSpecific: {},
            submission: {
              peblo: { submitted: true, date: '2024-03-15', method: 'Electronic', confirmed: true },
              va: { submitted: false, date: '', claimNumber: '', confirmed: false }
            },
            timeline: {
              started: '2024-01-08',
              targetDate: '2024-06-01',
              lastUpdated: new Date().toISOString()
            }
          },
          'Tinnitus': {
            required: {
              strs: { status: 'completed', date: '2024-01-12', notes: 'Service records show noise exposure', upload: '' },
              diagnosis: { status: 'completed', doctor: 'Dr. Williams, Audiologist', date: '2024-01-30', notes: 'Audiologist confirmed tinnitus' },
              nexus: { status: 'completed', doctor: 'Dr. Williams', date: '2024-02-10', notes: 'Audiologist linked to service noise exposure' }
            },
            recommended: {
              buddyStatements: { count: 0, names: '', status: 'not-started', notes: '' },
              commanderStatement: { status: 'not-started', date: '', notes: '' },
              photos: { has: false, description: '', location: '' },
              prescriptions: { medications: '', pharmacy: '', dateRange: '' },
              appointments: { count: '5', dateRange: '2023-2024', providers: 'VA Audiology' },
              dbq: { status: 'completed', date: '2024-02-20', examiner: 'VA Audiologist' }
            },
            conditionSpecific: {},
            submission: {
              peblo: { submitted: true, date: '2024-03-15', method: 'Electronic', confirmed: true },
              va: { submitted: false, date: '', claimNumber: '', confirmed: false }
            },
            timeline: {
              started: '2024-01-05',
              targetDate: '2024-06-01',
              lastUpdated: new Date().toISOString()
            }
          }
        }

        setSelectedConditions(demoConditions)
        setConditionDetails(demoDetails)
        setEvidenceTracking(demoEvidence)
        setLoading(false)
        console.log('✓ Demo data loaded')
        return
      }

      // Guest mode - load from localStorage
      if (guestMode) {
        try {
          const savedConditions = localStorage.getItem(GUEST_VA_CONDITIONS_KEY)
          const savedDetails = localStorage.getItem(GUEST_VA_DETAILS_KEY)
          const savedEvidence = localStorage.getItem(GUEST_VA_EVIDENCE_KEY)

          if (savedConditions) {
            setSelectedConditions(JSON.parse(savedConditions))
          }
          if (savedDetails) {
            setConditionDetails(JSON.parse(savedDetails))
          }
          if (savedEvidence) {
            setEvidenceTracking(JSON.parse(savedEvidence))
          }

          console.log('✓ Guest data loaded from localStorage')
        } catch (err) {
          console.error('Error loading guest data from localStorage:', err)
        }
        setLoading(false)
        return
      }

      // Normal database loading for non-demo mode
      try {
        setLoading(true)
        setError(null)

        // Load all conditions from database
        const conditions = await getVAConditions()

        if (conditions && conditions.length > 0) {
          // Transform database records into page's data structure
          const names = []
          const details = {}
          const idMap = {}

          conditions.forEach(condition => {
            const name = condition.condition_name
            names.push(name)
            idMap[name] = condition.id

            // Map database fields to page's detail structure
            details[name] = {
              startDate: condition.start_date || '',
              incident: condition.incident_description || '',
              symptoms: condition.symptoms || {},
              frequency: condition.frequency || '',
              worsening: condition.worsening_factors || '',
              treatment: condition.treatment_history || {},
              limitations: condition.functional_limitations || {},
              painLevel: condition.pain_level || '',
              category: condition.category || '',
              description: condition.description || '',
              serviceConnected: condition.service_connected !== false,
              estimatedRating: condition.estimated_rating || '',
              notes: condition.notes || ''
            }
          })

          setSelectedConditions(names)
          setConditionDetails(details)
          setConditionIdMap(idMap)
        }

        // Load all evidence from database
        const evidence = await getAllVAEvidence()

        if (evidence && Object.keys(evidence).length > 0) {
          // Transform evidence by condition_id to evidence by condition_name
          const evidenceByName = {}

          conditions.forEach(condition => {
            const conditionEvidence = evidence[condition.id] || []
            const name = condition.condition_name

            evidenceByName[name] = {
              required: {},
              recommended: {}
            }

            // Group evidence by type
            conditionEvidence.forEach(ev => {
              const type = ev.evidence_type
              const evidenceData = {
                status: ev.status || 'pending',
                notes: ev.notes || '',
                details: ev.details || {}
              }

              // Categorize as required or recommended based on type
              if (['strs', 'diagnosis', 'nexus'].includes(type)) {
                evidenceByName[name].required[type] = evidenceData
              } else {
                evidenceByName[name].recommended[type] = evidenceData
              }
            })
          })

          setEvidenceTracking(evidenceByName)
        }

        console.log('✓ VA Claims data loaded from database')
      } catch (err) {
        console.error('Error loading VA data:', err)
        setError('Failed to load VA claims data. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    loadVAData()
  }, [demoMode, guestMode])

  // Auto-save to localStorage in guest mode whenever data changes
  useEffect(() => {
    if (guestMode && !loading) {
      try {
        localStorage.setItem(GUEST_VA_CONDITIONS_KEY, JSON.stringify(selectedConditions))
        localStorage.setItem(GUEST_VA_DETAILS_KEY, JSON.stringify(conditionDetails))
        localStorage.setItem(GUEST_VA_EVIDENCE_KEY, JSON.stringify(evidenceTracking))
      } catch (err) {
        console.error('Error saving to localStorage:', err)
      }
    }
  }, [guestMode, loading, selectedConditions, conditionDetails, evidenceTracking])

  // Helper function to save condition to database
  const saveConditionToDatabase = async (conditionName, details, isNew = false) => {
    // In demo mode, show upgrade prompt instead of saving
    if (demoMode) {
      alert('Sign up to save your claims permanently!\n\nDemo mode lets you try the tool, but your data won\'t be saved. Create a free account to save your VA claims securely in the cloud.')
      return
    }

    // In guest mode, data is auto-saved to localStorage
    // Just return without database save - the useEffect handles localStorage
    if (guestMode) {
      return
    }

    try {
      setSaving(true)

      const dbData = {
        condition_name: conditionName,
        category: details.category || '',
        description: details.description || '',
        start_date: details.startDate || null,
        incident_description: details.incident || '',
        symptoms: details.symptoms || {},
        frequency: details.frequency || '',
        worsening_factors: details.worsening || '',
        treatment_history: details.treatment || {},
        functional_limitations: details.limitations || {},
        pain_level: details.painLevel || '',
        service_connected: details.serviceConnected !== false,
        estimated_rating: details.estimatedRating || '',
        notes: details.notes || ''
      }

      if (isNew) {
        // Create new condition
        const created = await createVACondition(dbData)
        setConditionIdMap(prev => ({
          ...prev,
          [conditionName]: created.id
        }))
        console.log('✓ VA condition created successfully')
      } else {
        // Update existing condition
        const conditionId = conditionIdMap[conditionName]
        if (conditionId) {
          await updateVACondition(conditionId, dbData)
          console.log('✓ VA condition updated successfully')
        }
      }
    } catch (err) {
      console.error('Error saving condition:', err)
      setError(`Failed to save ${conditionName}. Please try again.`)
    } finally {
      setSaving(false)
    }
  }

  // Helper function to delete condition from database
  const deleteConditionFromDatabase = async (conditionName) => {
    // In demo mode or guest mode, data only exists in local state - no database action needed
    // Guest mode auto-saves to localStorage via useEffect
    if (demoMode || guestMode) {
      return
    }

    try {
      setSaving(true)
      const conditionId = conditionIdMap[conditionName]

      if (conditionId) {
        await deleteVACondition(conditionId)
        console.log('✓ VA condition deleted successfully')

        // Remove from ID map
        setConditionIdMap(prev => {
          const updated = { ...prev }
          delete updated[conditionName]
          return updated
        })
      }
    } catch (err) {
      console.error('Error deleting condition:', err)
      setError(`Failed to delete ${conditionName}. Please try again.`)
    } finally {
      setSaving(false)
    }
  }

  // Helper function to delete ALL VA claims data
  const deleteAllVAData = async () => {
    // In demo mode, just clear local state without database operations
    if (demoMode) {
      const confirmed = window.confirm(
        'Clear all demo data?\n\nThis will reset the demo to its initial state.'
      )

      if (!confirmed) return

      // Clear all local state
      setSelectedConditions([])
      setConditionDetails({})
      setEvidenceTracking({})
      setConditionIdMap({})
      setGeneratedStatements(null)
      setExpandedCategories({})
      setExpandedEvidence({})

      return
    }

    // In guest mode, clear local state and localStorage
    if (guestMode) {
      const confirmed = window.confirm(
        'Clear all your VA claims data?\n\nThis will delete all conditions and evidence you\'ve entered. This cannot be undone.'
      )

      if (!confirmed) return

      // Clear all local state
      setSelectedConditions([])
      setConditionDetails({})
      setEvidenceTracking({})
      setConditionIdMap({})
      setGeneratedStatements(null)
      setExpandedCategories({})
      setExpandedEvidence({})

      // Clear localStorage
      localStorage.removeItem(GUEST_VA_CONDITIONS_KEY)
      localStorage.removeItem(GUEST_VA_DETAILS_KEY)
      localStorage.removeItem(GUEST_VA_EVIDENCE_KEY)

      return
    }

    const confirmed = window.confirm(
      '⚠️ WARNING: This will permanently delete ALL your VA claims data, including all conditions, symptoms, and evidence tracking.\n\nThis action CANNOT be undone.\n\nAre you absolutely sure you want to delete everything?'
    )

    if (!confirmed) return

    // Double confirmation for extra safety
    const doubleConfirmed = window.confirm(
      'Final confirmation: Delete ALL VA claims data?\n\nClick OK to permanently delete everything, or Cancel to keep your data.'
    )

    if (!doubleConfirmed) return

    try {
      setSaving(true)
      setError(null)

      // Delete all conditions from database
      const deletePromises = Object.entries(conditionIdMap).map(async ([name, id]) => {
        await deleteVACondition(id)
      })

      await Promise.all(deletePromises)

      // Clear all local state
      setSelectedConditions([])
      setConditionDetails({})
      setEvidenceTracking({})
      setConditionIdMap({})
      setGeneratedStatements(null)
      setExpandedCategories({})
      setExpandedEvidence({})

      console.log('✓ All VA claims data deleted successfully')
      alert('✓ All VA claims data has been permanently deleted.')
    } catch (err) {
      console.error('Error deleting all VA data:', err)
      setError('Failed to delete all data. Please try again or contact support.')
    } finally {
      setSaving(false)
    }
  }

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

  const toggleCondition = async (condition) => {
    if (selectedConditions.includes(condition)) {
      // Remove condition - delete from database
      setSelectedConditions(selectedConditions.filter(c => c !== condition))
      const newDetails = { ...conditionDetails }
      delete newDetails[condition]
      setConditionDetails(newDetails)
      const newEvidence = { ...evidenceTracking }
      delete newEvidence[condition]
      setEvidenceTracking(newEvidence)

      // Delete from database
      await deleteConditionFromDatabase(condition)
    } else {
      // Add condition - create in database
      const newDetails = {
        startDate: '',
        incident: '',
        symptoms: {},
        frequency: '',
        worsening: '',
        treatment: {},
        limitations: {},
        painLevel: '',
        category: '', // Will be filled in by user
        description: '',
        serviceConnected: true,
        estimatedRating: '',
        notes: ''
      }

      setSelectedConditions([...selectedConditions, condition])
      setConditionDetails({
        ...conditionDetails,
        [condition]: newDetails
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

      // Save to database
      await saveConditionToDatabase(condition, newDetails, true)
    }
  }

  const updateConditionDetail = async (condition, field, value) => {
    const updatedDetails = {
      ...conditionDetails[condition],
      [field]: value
    }

    setConditionDetails({
      ...conditionDetails,
      [condition]: updatedDetails
    })

    // Save to database (debounced by network latency naturally)
    await saveConditionToDatabase(condition, updatedDetails, false)
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
    try {
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
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Clean up the URL object
      setTimeout(() => URL.revokeObjectURL(url), 100)
    } catch (error) {
      console.error('Error exporting evidence checklist:', error)
      alert('Error exporting file. Please try again.')
    }
  }

  const exportAsText = () => {
    if (!generatedStatements) return

    try {
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
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Clean up the URL object
      setTimeout(() => URL.revokeObjectURL(url), 100)
    } catch (error) {
      console.error('Error exporting claim statements:', error)
      alert('Error exporting file. Please try again.')
    }
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

  // Show auth prompt for unauthenticated users after timeout
  if (showAuthPrompt) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Sign In to View Your VA Claims</h3>
            <p className="text-gray-600 mb-6">
              Your VA claims data is securely stored in the cloud. Sign in to access your saved conditions and evidence tracking.
            </p>
          </div>
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              to="/"
              className="block text-gray-500 hover:text-gray-700 text-sm py-2"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Show loading state
  if (loading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600 font-medium">Loading your VA claims data from secure cloud storage...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a moment</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      {/* Demo Mode Banner */}
      {demoMode && (
        <div className="mb-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg p-4 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Demo Mode - Try It Out!</h3>
                <p className="text-gray-800 text-sm">
                  Explore the full VA Claims Builder with sample data. Sign up to save your claims permanently and access from any device.
                </p>
              </div>
            </div>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      )}

      {/* Guest Mode Banner */}
      {guestMode && (
        <div className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="text-3xl">📋</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Your Progress is Auto-Saved Locally</h3>
                <p className="text-blue-100 text-sm">
                  Your data is saved in your browser. Create a free account to sync across devices and access from anywhere.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSaveModal(true)}
              className="px-4 py-2 bg-white hover:bg-gray-100 text-blue-700 font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              Save to Account
            </button>
          </div>
        </div>
      )}

      {/* Save Modal for Guest Users */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">💾</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Save Your Progress</h3>
              <p className="text-gray-600">
                Create a free account to save your VA claims data permanently and access it from any device.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                <span>Access your claims from any device</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                <span>Secure cloud backup of all your data</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                <span>100% free - no credit card required</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/signup"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors"
              >
                Sign Up Free
              </Link>
              <Link
                to="/login"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold text-center transition-colors"
              >
                Already have an account? Log In
              </Link>
              <button
                onClick={() => setShowSaveModal(false)}
                className="block w-full text-gray-500 hover:text-gray-700 py-2 text-sm text-center"
              >
                Continue Without Saving
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`bg-white rounded-lg shadow p-6 ${previewMode ? 'pointer-events-none opacity-60' : ''}`}>
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Saving Indicator */}
        {saving && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded flex items-center">
            <svg className="animate-spin h-4 w-4 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-blue-700 text-sm font-medium">Saving to secure cloud database...</span>
          </div>
        )}

        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">
            VA Claims Builder
          </h1>
          {isPromoModeActive() && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
              🎖️ Launch Special - FREE
            </span>
          )}
        </div>
        <div className="text-gray-600 mb-6 space-y-3">
          <p className="text-lg font-semibold text-gray-900">
            How Do I Organize My VA Disability Claim Evidence?
          </p>
          <p>
            Track your claimed conditions, upload medical records, manage C&P exam appointments, and organize nexus letters in one place. We don't file claims for you - we give you the tools to file them yourself, with confidence.
          </p>
          <p>
            Think of this like TurboTax for VA claims. TurboTax doesn't file your taxes FOR you - it helps YOU file them correctly. Our VA Claims Tracker does the same: it's a software tool that organizes your evidence, tracks deadlines, and ensures you don't miss critical steps.
          </p>
          <p>
            What you track: Current conditions, in-service events, medical evidence, C&P exam dates, Intent to File deadline, claim status, and secondary conditions.
          </p>
        </div>

        {/* Demo Banner or Privacy Warning */}
        {demoMode ? (
          <div className="mb-6 p-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg border-2 border-purple-400">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-bold text-white mb-2">👀 Interactive Demo - Explore Sample VA Claims</h3>
                <div className="text-sm text-purple-100 mb-4">
                  <p className="mb-2">
                    You're viewing <strong>realistic sample data</strong> showing how veterans build VA disability claims with our tool. This demo includes:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>3 common conditions (PTSD, knee injury, tinnitus)</li>
                    <li>Detailed symptoms and functional limitations</li>
                    <li>Evidence tracking with completion status</li>
                    <li>Generated claim statements</li>
                  </ul>
                </div>
                <p className="text-white font-semibold text-sm mb-3">
                  💡 Explore both the <span className="underline">Claims Builder</span> and <span className="underline">Evidence Tracker</span> tabs to see the full system in action.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/signup"
                    className="inline-flex items-center px-5 py-2.5 bg-white text-purple-700 font-bold rounded-lg hover:bg-purple-50 transition-colors shadow-md"
                  >
                    Sign Up Free - Build Your Own Claims
                  </a>
                  <a
                    href="/"
                    className="inline-flex items-center px-5 py-2.5 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-colors border-2 border-white"
                  >
                    ← Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Privacy & Security</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    🔒 Your sensitive medical and personal information is <strong>securely stored in the cloud</strong> with bank-level encryption. Your data is <strong>automatically backed up</strong> and accessible from any device. We use row-level security to ensure complete data isolation - only you can access your VA claims information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
                          {(() => {
                            const conditionData = getConditionLibraryData(condition)
                            const symptoms = conditionData?.commonSymptoms || ['Pain', 'Discomfort']
                            return (
                              <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {symptoms.map(symptom => (
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
                                {/* Custom symptom input */}
                                <div className="mt-3">
                                  <label className="block text-sm text-gray-600 mb-1">
                                    Don't see your symptom? Add it here:
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter custom symptom"
                                    value={details.customSymptom || ''}
                                    onChange={(e) => updateConditionDetail(condition, 'customSymptom', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                  />
                                </div>
                              </>
                            )
                          })()}
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
                            {(() => {
                              // Get condition-specific treatments from library
                              const conditionData = getConditionLibraryData(condition);
                              const treatments = conditionData?.treatments || [
                                'Physical therapy',
                                'Medications',
                                'Injections',
                                'Surgery',
                                'Seeing specialist',
                                'Using brace/support'
                              ];

                              return treatments.map(treatment => (
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
                              ));
                            })()}
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Functional Limitations - What can't you do?
                          </label>
                          {(() => {
                            const conditionData = getConditionLibraryData(condition)
                            const limitations = conditionData?.functionalLimitations || ['Impact on daily activities']
                            return (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {limitations.map(limitation => (
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
                            )
                          })()}
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

                {/* Conditions Being Tracked */}
                <div className="mb-6 p-4 bg-slate-50 border border-slate-300 rounded-lg">
                  <h3 className="font-bold text-slate-900 mb-3">📋 Conditions Being Tracked ({selectedConditions.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {selectedConditions.map((condition, idx) => {
                      const progress = getEvidenceProgress(condition)
                      return (
                        <button
                          key={condition}
                          onClick={() => {
                            setExpandedEvidence(prev => ({ ...prev, [condition]: true }))
                            setTimeout(() => {
                              const element = document.getElementById(`evidence-${idx}`)
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                              }
                            }, 200)
                          }}
                          className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded hover:bg-slate-100 hover:border-blue-400 transition-all text-left group pointer-events-auto cursor-pointer"
                        >
                          <span className="text-sm text-slate-700 group-hover:text-blue-600 font-medium truncate mr-2">{condition}</span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${
                            progress === 100 ? 'bg-green-100 text-green-700' :
                            progress >= 50 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {progress}%
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-xs text-slate-500 mt-3">Click any condition to jump to its evidence tracker below</p>
                </div>

                {/* Priority Alerts */}
                {missingCritical.length > 0 && (
                  <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">⚠️</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-red-900 mb-2">These conditions are missing REQUIRED evidence:</h3>
                        <ul className="space-y-2">
                          {missingCritical.map((item, idx) => {
                            const evidenceIdx = selectedConditions.indexOf(item.condition)
                            return (
                              <li key={idx} className="text-red-800">
                                <span className="font-semibold">{item.condition}</span>
                                <span className="text-red-600"> - Missing: {item.missing.join(', ')}</span>
                                <button
                                  onClick={() => {
                                    setExpandedEvidence(prev => ({ ...prev, [item.condition]: true }))
                                    setTimeout(() => {
                                      const element = document.getElementById(`evidence-${evidenceIdx}`)
                                      if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                      }
                                    }, 200)
                                  }}
                                  className="ml-3 text-sm text-blue-600 hover:text-blue-800 underline pointer-events-auto cursor-pointer"
                                >
                                  Jump to tracker
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Export and Data Management Buttons */}
                <div className="mb-6 flex flex-wrap gap-3 items-center">
                  <button
                    onClick={exportEvidenceChecklist}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Export Evidence Tracker as PDF
                  </button>
                  <button
                    onClick={deleteAllVAData}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm border-2 border-red-700 font-semibold"
                  >
                    🗑️ Delete All Data
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

        {/* Buy Me a Coffee Support Section */}
        {selectedConditions.length > 0 && !demoMode && (
          <div className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">☕ Finding MTT helpful with your VA claim?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If the VA Claims Builder has helped you organize your claim and track your evidence, consider buying me a coffee to help keep this platform free for all servicemembers.
            </p>
            <Link
              to="/donate"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              ☕ Support the Mission
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              100% optional • Helps keep MTT free for everyone
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
