import { useState, useEffect } from 'react'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import { getProfileData } from '../utils/profileAutoFill'
import UseProfileButton from '../components/UseProfileButton'
import {
  SKILL_TRANSLATIONS,
  MOS_TRANSLATIONS,
  translateAcronym,
  translateAccomplishment,
  getCivilianTitles,
  ACTION_VERBS,
  EXAMPLE_BULLETS
} from '../utils/militaryTranslation'

export default function ResumeBuilder() {
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
  const [resumeName, setResumeName] = useState('')
  const [showTranslationHelper, setShowTranslationHelper] = useState(false)
  const [searchMOS, setSearchMOS] = useState('')

  useEffect(() => {
    document.title = 'Resume Builder - Military Transition Toolkit'
    trackPageView('Resume Builder')
    loadSavedResumes()
  }, [])

  const loadSavedResumes = () => {
    const saved = localStorage.getItem('savedResumes')
    if (saved) {
      try {
        setSavedResumes(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading saved resumes:', e)
      }
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

  const saveResume = () => {
    const name = resumeName || `Resume ${new Date().toLocaleDateString()}`
    const resume = {
      id: Date.now(),
      name,
      template,
      data: resumeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const updated = [...savedResumes, resume]
    setSavedResumes(updated)
    localStorage.setItem('savedResumes', JSON.stringify(updated))
    trackButtonClick('Resume Builder - Save Resume')
    alert(`Resume "${name}" saved successfully!`)
  }

  const loadResume = (resume) => {
    setResumeData(resume.data)
    setTemplate(resume.template)
    setResumeName(resume.name)
    trackButtonClick('Resume Builder - Load Resume')
  }

  const deleteResume = (id) => {
    if (confirm('Delete this resume? This cannot be undone.')) {
      const updated = savedResumes.filter(r => r.id !== id)
      setSavedResumes(updated)
      localStorage.setItem('savedResumes', JSON.stringify(updated))
      trackButtonClick('Resume Builder - Delete Resume')
    }
  }

  const exportToPDF = () => {
    // This would integrate with a PDF library like jsPDF
    trackButtonClick('Resume Builder - Export PDF')
    alert('PDF export coming soon! For now, use print preview (Ctrl/Cmd+P) and save as PDF.')
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Resume Builder</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Create a professional civilian resume with military-to-civilian translation
          </p>
        </div>

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

              {/* Continue with more steps in next message due to length... */}

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
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
                >
                  📄 Export PDF
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
    </div>
  )
}
