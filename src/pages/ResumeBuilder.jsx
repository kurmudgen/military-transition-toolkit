import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import { getProfileData } from '../utils/profileAutoFill'
import UseProfileButton from '../components/UseProfileButton'
import { isPromoModeActive } from '../utils/promoConfig'
import UpgradeOverlay from '../components/UpgradeOverlay'
import { useAuth } from '../contexts/AuthContext'
import { AUTH_LOADING_TIMEOUT } from '../utils/constants'
import {
  SKILL_TRANSLATIONS,
  MOS_TRANSLATIONS,
  translateAcronym,
  translateAccomplishment,
  getCivilianTitles,
  ACTION_VERBS,
  EXAMPLE_BULLETS
} from '../utils/militaryTranslation'
import { useFeatureAccess, useUsageLimits } from '../hooks/useFeatureAccess'
import { FEATURES } from '../utils/featureGating'
import UpgradePrompt, { PremiumBadge } from '../components/UpgradePrompt'
import { generateResumePDF } from '../utils/pdfExport'
import {
  getAllResumes,
  createResume,
  updateResume,
  deleteResume as deleteResumeDB
} from '../services/resumeService'

export default function ResumeBuilder({ previewMode = false }) {
  const { user } = useAuth()

  // Feature gating hooks
  const { hasAccess: canExport, upgradeMessage: exportMessage } = useFeatureAccess(FEATURES.RESUME_EXPORT)
  const { checkLimit } = useUsageLimits()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeModalMessage, setUpgradeModalMessage] = useState('')

  // Database loading/saving states
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  const [currentStep, setCurrentStep] = useState(1)
  const [template, setTemplate] = useState('chronological')
  const [resumeData, setResumeData] = useState({
    contactInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      linkedIn: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    militaryService: {
      branch: '',
      rank: '',
      mos: '',
      yearsOfService: '',
      honorableDischarge: true
    }
  })
  const [savedResumes, setSavedResumes] = useState([])
  const [currentResumeId, setCurrentResumeId] = useState(null) // Track which resume is loaded
  const [resumeName, setResumeName] = useState('')
  const [showTranslationHelper, setShowTranslationHelper] = useState(false)
  const [searchMOS, setSearchMOS] = useState('')
  const [translationTab, setTranslationTab] = useState('job-titles') // 'job-titles', 'accomplishments', 'skills'
  const [mosSearch, setMosSearch] = useState('')
  const [accomplishmentInput, setAccomplishmentInput] = useState('')
  const [translatedAccomplishment, setTranslatedAccomplishment] = useState('')

  // Resume Import States
  const [showImportModal, setShowImportModal] = useState(false)
  const [importedText, setImportedText] = useState('')
  const [showImportPanel, setShowImportPanel] = useState(false)

  useEffect(() => {
    document.title = 'Resume Builder - Military Transition Toolkit'
    trackPageView('Resume Builder')
    loadSavedResumes()
  }, [])

  // Timeout for unauthenticated users - show auth prompt after timeout
  useEffect(() => {
    if (!user && loading) {
      const timer = setTimeout(() => {
        setLoading(false)
        setShowAuthPrompt(true)
      }, AUTH_LOADING_TIMEOUT)

      return () => clearTimeout(timer)
    }
  }, [user, loading])

  const loadSavedResumes = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load all resumes from database
      const resumes = await getAllResumes()

      if (resumes && resumes.length > 0) {
        // Transform database records to page format
        const formattedResumes = resumes.map(resume => ({
          id: resume.id,
          name: resume.name || `Resume ${new Date(resume.created_at).toLocaleDateString()}`,
          template: resume.template || 'chronological',
          data: {
            contactInfo: resume.contact_info || {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              city: '',
              state: '',
              linkedIn: '',
              website: ''
            },
            summary: resume.professional_summary || '',
            experience: resume.experience || [],
            education: resume.education || [],
            skills: Array.isArray(resume.skills) ? resume.skills : [],
            certifications: resume.certifications || [],
            militaryService: resume.military_service || {
              branch: '',
              rank: '',
              mos: '',
              yearsOfService: '',
              honorableDischarge: true
            }
          },
          createdAt: resume.created_at,
          updatedAt: resume.updated_at
        }))

        setSavedResumes(formattedResumes)
      }

      console.log('✓ Resumes loaded from database')
    } catch (err) {
      console.error('Error loading resumes:', err)
      setError('Failed to load resumes. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const handleAutoFillFromProfile = () => {
    const profile = getProfileData()
    setResumeData(prev => ({
      ...prev,
      contactInfo: {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        city: profile.currentLocation ? profile.currentLocation.split(',')[0] : '',
        state: profile.currentLocation ? profile.currentLocation.split(',')[1]?.trim() : '',
        linkedIn: prev.contactInfo.linkedIn,
        website: prev.contactInfo.website
      },
      militaryService: {
        branch: profile.branch || '',
        rank: profile.rank || '',
        mos: profile.mos || '',
        yearsOfService: profile.yearsOfService || '',
        honorableDischarge: true
      }
    }))
    trackButtonClick('Resume Builder - Auto Fill from Profile')
  }

  const updateContactInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }))
  }

  const updateMilitaryService = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      militaryService: { ...prev.militaryService, [field]: value }
    }))
  }

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          title: '',
          organization: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          accomplishments: ['']
        }
      ]
    }))
  }

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const updateAccomplishment = (expId, index, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === expId
          ? {
              ...exp,
              accomplishments: exp.accomplishments.map((acc, i) =>
                i === index ? value : acc
              )
            }
          : exp
      )
    }))
  }

  const addAccomplishment = (expId) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === expId
          ? { ...exp, accomplishments: [...exp.accomplishments, ''] }
          : exp
      )
    }))
  }

  const removeAccomplishment = (expId, index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === expId
          ? {
              ...exp,
              accomplishments: exp.accomplishments.filter((_, i) => i !== index)
            }
          : exp
      )
    }))
  }

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          degree: '',
          school: '',
          location: '',
          graduationDate: '',
          gpa: '',
          honors: ''
        }
      ]
    }))
  }

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    }
  }

  const removeSkill = (skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: Date.now(),
          name: '',
          issuer: '',
          date: '',
          expirationDate: ''
        }
      ]
    }))
  }

  const updateCertification = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }))
  }

  const removeCertification = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }))
  }

  const saveResume = async () => {
    try {
      setSaving(true)
      setError(null)

      const name = resumeName || `Resume ${new Date().toLocaleDateString()}`

      // Transform to database format
      const dbData = {
        name,
        template,
        contact_info: resumeData.contactInfo,
        professional_summary: resumeData.summary,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        certifications: resumeData.certifications,
        military_service: resumeData.militaryService
      }

      let savedResume

      if (currentResumeId) {
        // Update existing resume
        savedResume = await updateResume(currentResumeId, dbData)
        trackButtonClick('Resume Builder - Update Resume')
      } else {
        // Create new resume - the service handles free tier limits
        try {
          savedResume = await createResume(dbData)
          setCurrentResumeId(savedResume.id)
          trackButtonClick('Resume Builder - Save Resume')
        } catch (err) {
          if (err.message.includes('Free tier')) {
            setUpgradeModalMessage('Free users can only create 1 resume. Upgrade to Premium for unlimited resumes and exports!')
            setShowUpgradeModal(true)
            trackButtonClick('Resume Builder - Save Resume Blocked')
            return
          }
          throw err
        }
      }

      // Reload resumes list to reflect changes
      await loadSavedResumes()

      alert(`Resume "${name}" saved successfully!`)
      console.log('✓ Resume saved to database')
    } catch (err) {
      console.error('Error saving resume:', err)
      setError('Failed to save resume. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const loadResume = (resume) => {
    setResumeData(resume.data)
    setTemplate(resume.template)
    setResumeName(resume.name)
    setCurrentResumeId(resume.id) // Track which resume is loaded for updates
    setCurrentStep(8) // Jump to review step to see the loaded resume
    trackButtonClick('Resume Builder - Load Resume')
  }

  const handleImportResume = () => {
    // Store imported text and show side panel
    setShowImportPanel(true)
    setShowImportModal(false)
    trackButtonClick('Resume Builder - Import Resume')
  }

  const clearImport = () => {
    setImportedText('')
    setShowImportPanel(false)
  }

  const deleteResume = async (id) => {
    if (window.confirm('Delete this resume? This action cannot be undone.')) {
      try {
        setSaving(true)
        setError(null)

        await deleteResumeDB(id)

        // If we deleted the currently loaded resume, clear the current resume ID
        if (currentResumeId === id) {
          setCurrentResumeId(null)
          setResumeName('')
        }

        // Reload resumes list
        await loadSavedResumes()

        trackButtonClick('Resume Builder - Delete Resume')
        console.log('✓ Resume deleted from database')
      } catch (err) {
        console.error('Error deleting resume:', err)
        setError('Failed to delete resume. Please try again.')
      } finally {
        setSaving(false)
      }
    }
  }

  const exportToPDF = () => {
    // Check if user has export permission (free tier = no exports)
    if (!canExport) {
      setUpgradeModalMessage(exportMessage)
      setShowUpgradeModal(true)
      trackButtonClick('Resume Builder - Export PDF Blocked')
      return
    }

    // Generate and download PDF
    trackButtonClick('Resume Builder - Export PDF')
    try {
      const fileName = generateResumePDF(resumeData, template)

      // Show success message
      alert(`✅ Resume exported successfully as ${fileName}`)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('❌ Error exporting PDF. Please try again.')
    }
  }

  const steps = [
    { number: 1, title: 'Template', icon: '📄' },
    { number: 2, title: 'Contact Info', icon: '👤' },
    { number: 3, title: 'Summary', icon: '📝' },
    { number: 4, title: 'Experience', icon: '💼' },
    { number: 5, title: 'Education', icon: '🎓' },
    { number: 6, title: 'Skills', icon: '⚡' },
    { number: 7, title: 'Certifications', icon: '🏆' },
    { number: 8, title: 'Review', icon: '✅' }
  ]

  const getMOSTranslation = () => {
    const mos = resumeData.militaryService.mos
    return MOS_TRANSLATIONS[mos] || null
  }

  // Show auth prompt for unauthenticated users after timeout
  if (showAuthPrompt) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Sign In to View Your Resumes</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your resume data is securely stored in the cloud. Sign in to access your saved resumes and continue building your civilian career profile.
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
                className="block w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Create Free Account
              </Link>
              <Link
                to="/"
                className="block text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm py-2"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12">
            <div className="flex flex-col items-center justify-center">
              <svg className="animate-spin h-16 w-16 text-blue-600 dark:text-blue-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">Loading your resumes from secure cloud storage...</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">This may take a moment</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {/* Preview Mode Overlay (SECURITY: Phase 3 - CRITICAL-003 fix) */}
      {previewMode && (
        <UpgradeOverlay
          featureName="Resume Builder"
          description="Create ATS-optimized resumes with military-to-civilian translation and cloud storage."
          benefits={[
            'Military-to-civilian job translation',
            'ATS-optimized templates',
            'Export to PDF',
            'Cloud storage and sync',
            'Multiple resume versions'
          ]}
        />
      )}

      <div className={`max-w-7xl mx-auto px-4 ${previewMode ? 'pointer-events-none opacity-60' : ''}`}>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Resume Builder</h1>
            {isPromoModeActive() && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                🎖️ Launch Special - FREE
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Create a professional civilian resume with military-to-civilian translation
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            🔒 Your resumes are <strong>securely stored in the cloud</strong> with bank-level encryption. Accessible from any device.
          </p>

          {/* Import Button */}
          <div className="mt-4">
            <button
              onClick={() => setShowImportModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              📋 Import Existing Resume
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-red-800 dark:text-red-200 font-semibold">Error</h3>
                <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Saving Indicator */}
        {saving && (
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-blue-700 dark:text-blue-300 font-medium">Saving to secure cloud storage...</span>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between overflow-x-auto">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center flex-shrink-0">
                <button
                  onClick={() => setCurrentStep(step.number)}
                  className={`flex flex-col items-center min-w-[80px] ${
                    currentStep === step.number
                      ? 'text-blue-600 dark:text-blue-400'
                      : currentStep > step.number
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${
                      currentStep === step.number
                        ? 'bg-blue-100 dark:bg-blue-900'
                        : currentStep > step.number
                        ? 'bg-green-100 dark:bg-green-900'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    {currentStep > step.number ? '✓' : step.icon}
                  </div>
                  <span className="text-xs font-medium text-center">{step.title}</span>
                </button>
                {idx < steps.length - 1 && (
                  <div
                    className={`hidden md:block h-1 w-16 mx-2 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              {/* Step 1: Template Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose a Template</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a resume format that best showcases your experience
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setTemplate('chronological')}
                      className={`p-6 border-2 rounded-lg text-left transition-all ${
                        template === 'chronological'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">📋</div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Chronological</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Best for consistent work history. Lists experience in reverse chronological order.
                      </p>
                    </button>

                    <button
                      onClick={() => setTemplate('functional')}
                      className={`p-6 border-2 rounded-lg text-left transition-all ${
                        template === 'functional'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">🎯</div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Functional</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Emphasizes skills over timeline. Great for career changers.
                      </p>
                    </button>

                    <button
                      onClick={() => setTemplate('hybrid')}
                      className={`p-6 border-2 rounded-lg text-left transition-all ${
                        template === 'hybrid'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">⚡</div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Hybrid</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Combines skills and experience. Flexible and comprehensive.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Info */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
                    <UseProfileButton
                      onUseProfile={handleAutoFillFromProfile}
                      label="Fill from Profile"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={resumeData.contactInfo.firstName}
                        onChange={(e) => updateContactInfo('firstName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={resumeData.contactInfo.lastName}
                        onChange={(e) => updateContactInfo('lastName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={resumeData.contactInfo.email}
                        onChange={(e) => updateContactInfo('email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="john.smith@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={resumeData.contactInfo.phone}
                        onChange={(e) => updateContactInfo('phone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={resumeData.contactInfo.city}
                        onChange={(e) => updateContactInfo('city', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="San Diego"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={resumeData.contactInfo.state}
                        onChange={(e) => updateContactInfo('state', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="CA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={resumeData.contactInfo.linkedIn}
                        onChange={(e) => updateContactInfo('linkedIn', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Website/Portfolio
                      </label>
                      <input
                        type="url"
                        value={resumeData.contactInfo.website}
                        onChange={(e) => updateContactInfo('website', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="yourwebsite.com"
                      />
                    </div>
                  </div>

                  {/* Military Service Info */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Military Service</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Branch
                        </label>
                        <select
                          value={resumeData.militaryService.branch}
                          onChange={(e) => updateMilitaryService('branch', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Branch</option>
                          <option value="Army">Army</option>
                          <option value="Navy">Navy</option>
                          <option value="Air Force">Air Force</option>
                          <option value="Marines">Marines</option>
                          <option value="Coast Guard">Coast Guard</option>
                          <option value="Space Force">Space Force</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Highest Rank
                        </label>
                        <input
                          type="text"
                          value={resumeData.militaryService.rank}
                          onChange={(e) => updateMilitaryService('rank', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="E-7, O-3, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          MOS/AFSC/Rate
                        </label>
                        <input
                          type="text"
                          value={resumeData.militaryService.mos}
                          onChange={(e) => updateMilitaryService('mos', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="11B, 3D0X2, IT, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Years of Service
                        </label>
                        <input
                          type="number"
                          value={resumeData.militaryService.yearsOfService}
                          onChange={(e) => updateMilitaryService('yearsOfService', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="8"
                        />
                      </div>
                    </div>

                    {getMOSTranslation() && (
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                          💡 MOS Translation:
                        </h4>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>{resumeData.militaryService.mos}</strong> - {getMOSTranslation().title}
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                          Civilian equivalents: {getMOSTranslation().civilian}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Professional Summary */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Summary</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Write a brief 2-4 sentence summary highlighting your experience and career goals
                  </p>

                  <div>
                    <textarea
                      value={resumeData.summary}
                      onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Results-driven professional with 8+ years of leadership experience in high-pressure environments. Proven track record of managing teams, optimizing operations, and exceeding performance goals. Seeking to leverage military-honed skills in project management and team leadership in a civilian operations role."
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {resumeData.summary.length} / 500 characters
                    </p>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Tips for Summary:</h3>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Start with your strongest qualities and years of experience</li>
                      <li>• Mention specific achievements or skills</li>
                      <li>• State your career objective or target role</li>
                      <li>• Avoid military jargon - use civilian language</li>
                      <li>• Keep it concise but impactful</li>
                    </ul>
                  </div>

                  {resumeData.militaryService.mos && getMOSTranslation() && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Suggested based on your MOS:</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        "{getMOSTranslation().title} professional with {resumeData.militaryService.yearsOfService || 'X'} years of experience. Skilled in {getMOSTranslation().civilian.split(',')[0]}. Seeking to transition these skills into a civilian {getMOSTranslation().civilian.split(',')[0].toLowerCase()} role."
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Work Experience */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
                    <button
                      onClick={addExperience}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                      + Add Position
                    </button>
                  </div>

                  {resumeData.experience.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">No experience added yet</p>
                      <button
                        onClick={addExperience}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                      >
                        Add Your First Position
                      </button>
                    </div>
                  )}

                  {resumeData.experience.map((exp, idx) => (
                    <div key={exp.id} className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Position {idx + 1}</h3>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 font-semibold"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Job Title *
                          </label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Operations Manager"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Organization *
                          </label>
                          <input
                            type="text"
                            value={exp.organization}
                            onChange={(e) => updateExperience(exp.id, 'organization', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="U.S. Army / Company Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Fort Bragg, NC"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Start Date
                            </label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              End Date
                            </label>
                            <input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              disabled={exp.current}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600"
                            />
                          </div>
                        </div>
                      </div>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">I currently work here</span>
                      </label>

                      {/* Accomplishments */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Key Accomplishments *
                        </label>
                        {exp.accomplishments.map((acc, accIdx) => (
                          <div key={accIdx} className="flex gap-2 mb-2">
                            <textarea
                              value={acc}
                              onChange={(e) => updateAccomplishment(exp.id, accIdx, e.target.value)}
                              rows={2}
                              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                              placeholder="Led team of 15 personnel in high-pressure operations, achieving 100% mission success rate"
                            />
                            {exp.accomplishments.length > 1 && (
                              <button
                                onClick={() => removeAccomplishment(exp.id, accIdx)}
                                className="text-red-600 dark:text-red-400 hover:text-red-700"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => addAccomplishment(exp.id)}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          + Add Accomplishment
                        </button>
                      </div>
                    </div>
                  ))}

                  {resumeData.experience.length > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Example Accomplishments:</h3>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        {EXAMPLE_BULLETS.leadership.slice(0, 3).map((bullet, idx) => (
                          <li key={idx}>• {bullet}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Education */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
                    <button
                      onClick={addEducation}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                      + Add Education
                    </button>
                  </div>

                  {resumeData.education.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">No education added yet</p>
                      <button
                        onClick={addEducation}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                      >
                        Add Education
                      </button>
                    </div>
                  )}

                  {resumeData.education.map((edu, idx) => (
                    <div key={edu.id} className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Education {idx + 1}</h3>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 font-semibold"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Degree *
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Bachelor of Science in Business Administration"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            School *
                          </label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="University of Phoenix"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            value={edu.location}
                            onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Phoenix, AZ"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Graduation Date
                          </label>
                          <input
                            type="month"
                            value={edu.graduationDate}
                            onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            GPA (Optional)
                          </label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="3.8"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Honors (Optional)
                          </label>
                          <input
                            type="text"
                            value={edu.honors}
                            onChange={(e) => updateEducation(edu.id, 'honors', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Magna Cum Laude"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Don't forget:</h3>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Military training and certifications count as education</li>
                      <li>• List most recent education first</li>
                      <li>• Include relevant coursework for career changers</li>
                      <li>• GPA is optional (include if 3.5 or higher)</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 6: Skills */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Add your top skills relevant to your target position
                  </p>

                  <div>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        id="skillInput"
                        placeholder="Add a skill (e.g., Project Management)"
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill(e.target.value)
                            e.target.value = ''
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById('skillInput')
                          addSkill(input.value)
                          input.value = ''
                        }}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                      >
                        Add
                      </button>
                    </div>

                    {resumeData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resumeData.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                          >
                            {skill}
                            <button
                              onClick={() => removeSkill(skill)}
                              className="hover:text-red-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Leadership Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Team Leadership', 'Project Management', 'Strategic Planning', 'Training & Development', 'Operations Management'].map(skill => (
                          <button
                            key={skill}
                            onClick={() => addSkill(skill)}
                            className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                          >
                            + {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Technical Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Microsoft Office', 'Data Analysis', 'Database Management', 'Network Administration', 'Quality Control'].map(skill => (
                          <button
                            key={skill}
                            onClick={() => addSkill(skill)}
                            className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                          >
                            + {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Soft Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Communication', 'Problem Solving', 'Time Management', 'Adaptability', 'Teamwork'].map(skill => (
                          <button
                            key={skill}
                            onClick={() => addSkill(skill)}
                            className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                          >
                            + {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Industry-Specific</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Supply Chain', 'Logistics', 'Security Clearance', 'Compliance', 'Risk Management'].map(skill => (
                          <button
                            key={skill}
                            onClick={() => addSkill(skill)}
                            className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                          >
                            + {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: Certifications */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h2>
                    <button
                      onClick={addCertification}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                      + Add Certification
                    </button>
                  </div>

                  {resumeData.certifications.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">No certifications added yet</p>
                      <button
                        onClick={addCertification}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                      >
                        Add Certification
                      </button>
                    </div>
                  )}

                  {resumeData.certifications.map((cert, idx) => (
                    <div key={cert.id} className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certification {idx + 1}</h3>
                        <button
                          onClick={() => removeCertification(cert.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 font-semibold"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Certification Name *
                          </label>
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="PMP, Security+, etc."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Issuing Organization *
                          </label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="PMI, CompTIA, etc."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date Obtained
                          </label>
                          <input
                            type="month"
                            value={cert.date}
                            onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiration Date (if applicable)
                          </label>
                          <input
                            type="month"
                            value={cert.expirationDate}
                            onChange={(e) => updateCertification(cert.id, 'expirationDate', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Popular Certifications:</h3>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• PMP (Project Management Professional)</li>
                      <li>• Security+, CISSP (IT Security)</li>
                      <li>• Six Sigma (Quality/Process Improvement)</li>
                      <li>• CDL (Commercial Driver's License)</li>
                      <li>• Industry-specific certifications for your field</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 8: Review */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Review Your Resume</h2>

                  <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-6 space-y-6">
                    {/* Contact Info Preview */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {resumeData.contactInfo.firstName} {resumeData.contactInfo.lastName}
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {resumeData.contactInfo.email && <p>{resumeData.contactInfo.email}</p>}
                        {resumeData.contactInfo.phone && <p>{resumeData.contactInfo.phone}</p>}
                        {(resumeData.contactInfo.city || resumeData.contactInfo.state) && (
                          <p>{resumeData.contactInfo.city}{resumeData.contactInfo.city && resumeData.contactInfo.state && ', '}{resumeData.contactInfo.state}</p>
                        )}
                      </div>
                    </div>

                    {/* Summary Preview */}
                    {resumeData.summary && (
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Professional Summary</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{resumeData.summary}</p>
                      </div>
                    )}

                    {/* Experience Preview */}
                    {resumeData.experience.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Experience</h4>
                        <div className="space-y-3">
                          {resumeData.experience.map(exp => (
                            <div key={exp.id}>
                              <div className="font-semibold text-gray-900 dark:text-white">{exp.title}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{exp.organization} • {exp.location}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-500">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education Preview */}
                    {resumeData.education.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Education</h4>
                        <div className="space-y-2">
                          {resumeData.education.map(edu => (
                            <div key={edu.id} className="text-sm">
                              <div className="font-semibold text-gray-900 dark:text-white">{edu.degree}</div>
                              <div className="text-gray-600 dark:text-gray-400">{edu.school}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills Preview */}
                    {resumeData.skills.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications Preview */}
                    {resumeData.certifications.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Certifications</h4>
                        <div className="space-y-1">
                          {resumeData.certifications.map(cert => (
                            <div key={cert.id} className="text-sm text-gray-700 dark:text-gray-300">
                              {cert.name} - {cert.issuer}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      value={resumeName}
                      onChange={(e) => setResumeName(e.target.value)}
                      placeholder="Resume name (e.g., Software Engineer Resume)"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={saveResume}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
                    >
                      💾 Save Resume
                    </button>
                    <button
                      onClick={exportToPDF}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition flex items-center gap-2"
                    >
                      📄 Export PDF
                      {!canExport && <PremiumBadge size="sm" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
                  >
                    ← Previous
                  </button>
                )}
                {currentStep < 8 && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="ml-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Actions</h3>

              <div className="space-y-3">
                <button
                  onClick={saveResume}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
                >
                  💾 Save Resume
                </button>

                <button
                  onClick={exportToPDF}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
                >
                  📄 Export PDF
                  {!canExport && <PremiumBadge size="sm" />}
                </button>

                <button
                  onClick={() => setShowTranslationHelper(!showTranslationHelper)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                  🔄 Translation Helper
                </button>
              </div>

              {/* Saved Resumes */}
              {savedResumes.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Saved Resumes</h4>
                  <div className="space-y-2">
                    {savedResumes.map(resume => (
                      <div
                        key={resume.id}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                      >
                        <button
                          onClick={() => loadResume(resume)}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex-1 text-left"
                        >
                          {resume.name}
                        </button>
                        <button
                          onClick={() => deleteResume(resume.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 ml-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">💡 Tips</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Use action verbs (Led, Managed, Achieved)</li>
                  <li>• Include numbers and metrics</li>
                  <li>• Translate military jargon to civilian terms</li>
                  <li>• Keep it to 1-2 pages</li>
                  <li>• Tailor for each job application</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📋 Import Existing Resume</h2>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Paste Your Resume Text Below
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Copy and paste your existing resume text. Don't worry about formatting - just paste the content
                  and you can reference it while building your new civilian resume.
                </p>
                <textarea
                  value={importedText}
                  onChange={(e) => setImportedText(e.target.value)}
                  rows={15}
                  maxLength={10000}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none font-mono text-sm"
                  placeholder="Paste your resume here - any format works. You can paste from Word, PDF, or any text source..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {importedText.length} / 10,000 characters
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 How This Works</h3>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <li>• Your imported resume will appear in a side panel for easy reference</li>
                  <li>• You can view your old resume while filling out the builder form</li>
                  <li>• This helps you transfer information without constantly switching windows</li>
                  <li>• Your imported text is stored locally and never sent anywhere</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportResume}
                  disabled={!importedText.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Side Panel */}
      {showImportPanel && importedText && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl z-40 overflow-y-auto border-l-2 border-purple-500">
          <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 border-b border-purple-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">📋 Your Imported Resume</h3>
              <button
                onClick={clearImport}
                className="text-white/80 hover:text-white text-xl"
                title="Clear imported resume"
              >
                ×
              </button>
            </div>
            <p className="text-purple-100 text-xs mt-1">Reference while filling out the form →</p>
          </div>

          <div className="p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
              {importedText}
            </pre>
          </div>
        </div>
      )}

      {/* Translation Helper Modal */}
      {showTranslationHelper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🔄 Military-to-Civilian Translation Helper</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Translate military experience into civilian-friendly language
                  </p>
                </div>
                <button
                  onClick={() => setShowTranslationHelper(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setTranslationTab('job-titles')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    translationTab === 'job-titles'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Job Titles
                </button>
                <button
                  onClick={() => setTranslationTab('accomplishments')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    translationTab === 'accomplishments'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Accomplishments
                </button>
                <button
                  onClick={() => setTranslationTab('skills')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    translationTab === 'skills'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Skills & Phrases
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Job Titles Tab */}
              {translationTab === 'job-titles' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Enter your MOS, AFSC, or Rate
                    </label>
                    <input
                      type="text"
                      value={mosSearch}
                      onChange={(e) => setMosSearch(e.target.value.toUpperCase())}
                      placeholder="e.g., 11B, 25B, IT, 0311, 3D0X2"
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {mosSearch && MOS_TRANSLATIONS[mosSearch] && (
                    <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        ✓ Translation Found
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Military Title:</span>
                          <p className="text-lg text-gray-900 dark:text-white font-medium">
                            {mosSearch} - {MOS_TRANSLATIONS[mosSearch].title}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Civilian Equivalents:</span>
                          <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                            {MOS_TRANSLATIONS[mosSearch].civilian}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {mosSearch && !MOS_TRANSLATIONS[mosSearch] && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-500 rounded-lg p-4">
                      <p className="text-yellow-800 dark:text-yellow-200">
                        ⚠️ MOS/AFSC/Rate "{mosSearch}" not found in our database. Try using the Skills & Phrases tab for common military terms.
                      </p>
                    </div>
                  )}

                  {/* Popular MOS Examples */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Popular Examples:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(MOS_TRANSLATIONS).slice(0, 8).map(([mos, data]) => (
                        <button
                          key={mos}
                          onClick={() => setMosSearch(mos)}
                          className="text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                        >
                          <div className="font-semibold text-gray-900 dark:text-white">{mos} - {data.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{data.civilian.split(',')[0]}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Accomplishments Tab */}
              {translationTab === 'accomplishments' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Enter your military accomplishment
                    </label>
                    <textarea
                      value={accomplishmentInput}
                      onChange={(e) => setAccomplishmentInput(e.target.value)}
                      rows={4}
                      placeholder="e.g., Led squad of 9 soldiers during 12-month deployment to Afghanistan"
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                    />
                  </div>

                  <button
                    onClick={() => setTranslatedAccomplishment(translateAccomplishment(accomplishmentInput))}
                    disabled={!accomplishmentInput.trim()}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Translate to Civilian Language
                  </button>

                  {translatedAccomplishment && (
                    <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        ✓ Civilian-Friendly Version
                      </h3>
                      <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
                        {translatedAccomplishment}
                      </p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(translatedAccomplishment)
                          alert('✓ Copied to clipboard!')
                        }}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition text-sm"
                      >
                        📋 Copy to Clipboard
                      </button>
                    </div>
                  )}

                  {/* Example Bullets */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Example Translations:</h4>
                    <div className="space-y-3">
                      {[
                        {
                          military: 'Led squad of 9 soldiers during 12-month deployment',
                          civilian: 'Managed team of 9 personnel during 12-month assignment in high-pressure environment'
                        },
                        {
                          military: 'Conducted tactical operations ensuring mission success',
                          civilian: 'Executed strategic planning and operations achieving 100% project objectives'
                        },
                        {
                          military: 'Trained troops on combat procedures and battle drills',
                          civilian: 'Developed and mentored staff members on emergency procedures and protocols'
                        }
                      ].map((example, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <div className="text-sm">
                            <div className="mb-2">
                              <span className="font-semibold text-red-600 dark:text-red-400">❌ Military:</span>
                              <p className="text-gray-700 dark:text-gray-300 mt-1">{example.military}</p>
                            </div>
                            <div>
                              <span className="font-semibold text-green-600 dark:text-green-400">✓ Civilian:</span>
                              <p className="text-gray-900 dark:text-white mt-1 font-medium">{example.civilian}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Skills & Phrases Tab */}
              {translationTab === 'skills' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-500 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Common Translations</h3>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Browse common military terms and their civilian equivalents. Click to copy to your clipboard.
                    </p>
                  </div>

                  {/* Leadership Skills */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Leadership & Management</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(SKILL_TRANSLATIONS)
                        .filter(([_, value]) => value.includes('Leader') || value.includes('Manager'))
                        .slice(0, 8)
                        .map(([military, civilian]) => (
                          <button
                            key={military}
                            onClick={() => {
                              navigator.clipboard.writeText(civilian)
                              alert(`✓ Copied "${civilian}" to clipboard!`)
                            }}
                            className="text-left p-3 bg-white dark:bg-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-gray-200 dark:border-gray-500 transition"
                          >
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{military}</div>
                            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">→ {civilian}</div>
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Common Phrases */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Common Phrases</h4>
                    <div className="space-y-2">
                      {[
                        { military: 'Conducted reconnaissance', civilian: 'Gathered and analyzed intelligence' },
                        { military: 'Maintained accountability', civilian: 'Managed inventory and tracked assets' },
                        { military: 'Trained personnel', civilian: 'Developed and mentored staff' },
                        { military: 'Ensured mission success', civilian: 'Achieved organizational objectives' },
                        { military: 'Tactical operations', civilian: 'Strategic planning and execution' },
                        { military: 'Combat operations', civilian: 'High-pressure operations' },
                        { military: 'Deployed to', civilian: 'Assigned to' },
                        { military: 'Executed missions', civilian: 'Completed projects' },
                        { military: 'Zero defects', civilian: '100% accuracy' },
                        { military: 'After action review', civilian: 'Post-project analysis' }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            navigator.clipboard.writeText(item.civilian)
                            alert(`✓ Copied "${item.civilian}" to clipboard!`)
                          }}
                          className="w-full text-left p-3 bg-white dark:bg-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded border border-gray-200 dark:border-gray-500 transition"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-sm text-gray-600 dark:text-gray-400">{item.military}</div>
                              <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">→ {item.civilian}</div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Verbs */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Powerful Action Verbs</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Start your resume bullets with these strong action verbs:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {Object.entries(ACTION_VERBS).map(([category, verbs]) => (
                        <div key={category} className="space-y-1">
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{category}</div>
                          {verbs.slice(0, 4).map(verb => (
                            <div key={verb} className="text-sm text-gray-700 dark:text-gray-300">• {verb}</div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💡 Tip: Use these translations to make your resume ATS-friendly and easier for civilian hiring managers to understand.
                </p>
                <button
                  onClick={() => setShowTranslationHelper(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <UpgradePrompt
          variant="modal"
          title="Upgrade to Premium"
          message={upgradeModalMessage}
          onClose={() => setShowUpgradeModal(false)}
        />
      )}
    </div>
  )
}
