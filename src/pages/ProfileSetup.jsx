import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { completeOnboarding, getUserProfile } from '../services/profileService'
import { isValidSeparationDate, saveProfileToLocalStorage } from '../utils/profileValidation'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ProfileSetup() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    situation: '',
    separationDate: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load existing profile data if available
  useEffect(() => {
    async function loadExisting() {
      if (!user?.id) {
        setIsLoading(false)
        return
      }

      try {
        const profile = await getUserProfile(user.id)
        if (profile) {
          setFormData({
            name: profile.display_name || '',
            situation: profile.situation || '',
            separationDate: profile.separation_date || ''
          })
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadExisting()
  }, [user])

  const validate = () => {
    const newErrors = {}

    // Validate name
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Validate situation
    if (!formData.situation) {
      newErrors.situation = 'Please select your situation'
    }

    // Validate separation date
    if (!formData.separationDate) {
      newErrors.separationDate = 'Separation date is required'
    } else if (!isValidSeparationDate(formData.separationDate)) {
      newErrors.separationDate = 'Please enter a valid date'
    } else {
      // Check if date is in the past
      const date = new Date(formData.separationDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (date < today) {
        // Allow past dates but warn
        console.log('Note: Separation date is in the past')
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Save to Supabase if user is logged in
      if (user?.id) {
        await completeOnboarding(
          user.id,
          formData.situation,
          formData.separationDate,
          formData.name
        )
      }

      // Also save to localStorage
      saveProfileToLocalStorage({
        situation: formData.situation,
        separationDate: formData.separationDate,
        name: formData.name
      })

      // Navigate to dashboard
      navigate('/app')
    } catch (error) {
      console.error('Error saving profile:', error)
      setErrors({ submit: 'Failed to save profile. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
            Let's set up your account to personalize your transition experience
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <div className="mt-1 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Situation Field */}
            <div>
              <label htmlFor="situation" className="block text-sm font-medium text-gray-700 mb-2">
                Your Situation <span className="text-red-500">*</span>
              </label>
              <select
                id="situation"
                value={formData.situation}
                onChange={(e) => handleChange('situation', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.situation ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Select your situation --</option>
                <option value="retirement">20+ Year Retirement</option>
                <option value="medboard">Medical Board / IDES</option>
                <option value="separation">Separation (Under 20 Years)</option>
              </select>
              {errors.situation && (
                <div className="mt-1 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.situation}
                </div>
              )}
            </div>

            {/* Separation Date Field */}
            <div>
              <label htmlFor="separationDate" className="block text-sm font-medium text-gray-700 mb-2">
                Separation / Retirement Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="separationDate"
                value={formData.separationDate}
                onChange={(e) => handleChange('separationDate', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.separationDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.separationDate && (
                <div className="mt-1 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.separationDate}
                </div>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Your ETS, retirement, or separation date
              </p>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center text-red-800">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {errors.submit}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Complete Setup
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Your information is securely stored and used only to personalize your experience.
          </p>
        </div>
      </div>
    </div>
  )
}
