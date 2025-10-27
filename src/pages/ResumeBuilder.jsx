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
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
                    >
                      📄 Export PDF
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
