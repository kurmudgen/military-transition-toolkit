import { useState, useEffect } from 'react'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import { getUserProfile, updateUserProfile } from '../services/userService'

const BRANCHES = ['Army', 'Navy', 'Air Force', 'Marine Corps', 'Coast Guard', 'Space Force']
const RANKS = {
  'Army': ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-1', 'W-2', 'W-3', 'W-4', 'W-5', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10'],
  'Navy': ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-1', 'W-2', 'W-3', 'W-4', 'W-5', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10'],
  'Air Force': ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10'],
  'Marine Corps': ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-1', 'W-2', 'W-3', 'W-4', 'W-5', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10'],
  'Coast Guard': ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10'],
  'Space Force': ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10']
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null) // null, 'success', 'error'
  const [error, setError] = useState(null)
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Service Information
    branch: '',
    rank: '',
    mos: '',
    yearsOfService: '',
    separationDate: '',
    separationType: '',

    // Location
    currentLocation: '',
    targetLocation: '',

    // Service History
    unitAssignments: '',
    deployments: '',
    awards: '',
    specializations: '',

    // Contact Preferences
    preferredContact: 'email',
    contactableHours: '',

    // Profile Picture (base64)
    profilePicture: ''
  })

  useEffect(() => {
    document.title = 'Your Profile - Military Transition Toolkit'
    trackPageView('Profile')
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      const profile = await getUserProfile()
      if (profile) {
        setProfileData(prev => ({
          ...prev,
          firstName: profile.first_name || '',
          lastName: profile.last_name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          branch: profile.branch || '',
          rank: profile.rank || '',
          mos: profile.mos || '',
          yearsOfService: profile.years_of_service || '',
          separationDate: profile.separation_date || '',
          currentLocation: profile.current_location || ''
        }))
      }

      console.log('✓ Profile loaded from database')
    } catch (err) {
      console.error('Error loading profile:', err)
      setError('Failed to load profile.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setSaveStatus(null)
      setError(null)
      setSaveMessage('')

      await updateUserProfile({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone: profileData.phone,
        branch: profileData.branch,
        rank: profileData.rank,
        mos: profileData.mos,
        years_of_service: profileData.yearsOfService,
        separation_date: profileData.separationDate,
        current_location: profileData.currentLocation
      })

      trackButtonClick('Save Profile')
      setSaveStatus('success')
      setIsEditing(false)
      setSaveMessage('✓ Profile updated successfully')
      console.log('✓ Profile saved to database')

      // Reset status after 2 seconds
      setTimeout(() => {
        setSaveStatus(null)
        setSaveMessage('')
      }, 3000)
    } catch (err) {
      console.error('Error saving profile:', err)
      setSaveStatus('error')
      setError('Failed to save profile. Please try again.')
      setSaveMessage('')

      // Reset error status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null)
      }, 3000)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    loadProfile() // Reset to saved data
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('Image size must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePicture: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeProfilePicture = () => {
    setProfileData({ ...profileData, profilePicture: '' })
  }

  const getInitials = () => {
    const first = profileData.firstName?.charAt(0) || ''
    const last = profileData.lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || '?'
  }

  return (
    <div className="px-4 py-6 sm:px-0 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage your personal and service information
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-6 py-3 font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:cursor-not-allowed ${
                saveStatus === 'success'
                  ? 'bg-green-600 text-white'
                  : saveStatus === 'error'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {saving && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {saveStatus === 'success' && '✓'}
              {saveStatus === 'error' && '⚠'}
              {saving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Failed - Try Again' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-lg">
          <p className="text-green-700 dark:text-green-400 font-semibold">{saveMessage}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Picture Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Picture</h2>

          <div className="flex items-center gap-6">
            {/* Profile Picture Display */}
            <div className="relative">
              {profileData.profilePicture ? (
                <img
                  src={profileData.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-4 border-gray-200 dark:border-gray-600">
                  <span className="text-5xl font-bold text-white">{getInitials()}</span>
                </div>
              )}
            </div>

            {/* Upload Controls */}
            {isEditing && (
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-picture-upload"
                />
                <div className="space-y-2">
                  <label
                    htmlFor="profile-picture-upload"
                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer transition-all"
                  >
                    Upload Picture
                  </label>
                  {profileData.profilePicture && (
                    <button
                      onClick={removeProfilePicture}
                      className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
                    >
                      Remove
                    </button>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="John"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.firstName || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Doe"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.lastName || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="john.doe@email.com"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.email || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="(555) 123-4567"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.phone || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Service Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Branch of Service
              </label>
              {isEditing ? (
                <select
                  value={profileData.branch}
                  onChange={(e) => handleChange('branch', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Branch</option>
                  {BRANCHES.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.branch || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Rank
              </label>
              {isEditing ? (
                <select
                  value={profileData.rank}
                  onChange={(e) => handleChange('rank', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!profileData.branch || saving}
                >
                  <option value="">Select Rank</option>
                  {profileData.branch && RANKS[profileData.branch]?.map(rank => (
                    <option key={rank} value={rank}>{rank}</option>
                  ))}
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.rank || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                MOS / Rating / AFSC
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.mos}
                  onChange={(e) => handleChange('mos', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="e.g., 11B, IT, 3D0X2"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.mos || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Years of Service
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={profileData.yearsOfService}
                  onChange={(e) => handleChange('yearsOfService', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="e.g., 8"
                  min="0"
                  max="50"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.yearsOfService ? `${profileData.yearsOfService} years` : <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Separation Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.separationDate}
                  onChange={(e) => handleChange('separationDate', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">
                  {profileData.separationDate ? new Date(profileData.separationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : <span className="text-gray-400">Not set</span>}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Separation Type
              </label>
              {isEditing ? (
                <select
                  value={profileData.separationType}
                  onChange={(e) => handleChange('separationType', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Type</option>
                  <option value="retirement">Retirement (20+ years)</option>
                  <option value="medboard">Medical Separation/Retirement</option>
                  <option value="ets">ETS/Regular Separation</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.separationType || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Location</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Current Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.currentLocation}
                  onChange={(e) => handleChange('currentLocation', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="City, State"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.currentLocation || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Target Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.targetLocation}
                  onChange={(e) => handleChange('targetLocation', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="City, State (where you want to relocate)"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.targetLocation || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>
          </div>
        </div>

        {/* Service History */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Service History</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Unit Assignments
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.unitAssignments}
                  onChange={(e) => handleChange('unitAssignments', e.target.value)}
                  disabled={saving}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="List your major unit assignments..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{profileData.unitAssignments || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Deployments
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.deployments}
                  onChange={(e) => handleChange('deployments', e.target.value)}
                  disabled={saving}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="List deployment locations and dates..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{profileData.deployments || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Awards & Decorations
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.awards}
                  onChange={(e) => handleChange('awards', e.target.value)}
                  disabled={saving}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="List your military awards and decorations..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{profileData.awards || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Specializations & Skills
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.specializations}
                  onChange={(e) => handleChange('specializations', e.target.value)}
                  disabled={saving}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="List special skills, schools, certifications..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{profileData.specializations || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Preferences</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Preferred Contact Method
              </label>
              {isEditing ? (
                <select
                  value={profileData.preferredContact}
                  onChange={(e) => handleChange('preferredContact', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Either Email or Phone</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white text-lg capitalize">{profileData.preferredContact}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Best Times to Contact
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.contactableHours}
                  onChange={(e) => handleChange('contactableHours', e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="e.g., Weekdays 9am-5pm EST"
                />
              ) : (
                <p className="text-gray-900 dark:text-white text-lg">{profileData.contactableHours || <span className="text-gray-400">Not set</span>}</p>
              )}
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-blue-900 dark:text-blue-300 text-sm font-semibold">Privacy First</p>
              <p className="text-blue-800 dark:text-blue-400 text-sm">
                All profile data is stored locally on your device. We have zero access to your information. Your data never leaves your computer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
