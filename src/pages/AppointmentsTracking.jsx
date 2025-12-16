import { useState, useEffect } from 'react'
import { isPromoModeActive } from '../utils/promoConfig'
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment as deleteAppointmentDB
} from '../services/appointmentService'

const APPOINTMENT_TYPES = [
  { id: 'medical', name: 'Medical Appointment', color: 'blue' },
  { id: 'vacp', name: 'VA C&P Exam', color: 'red' },
  { id: 'peblo', name: 'PEBLO Meeting', color: 'purple' },
  { id: 'tap', name: 'TAP/Transition Event', color: 'green' },
  { id: 'personal', name: 'Personal Reminder', color: 'yellow' }
]

const SAMPLE_APPOINTMENTS = [
  {
    id: '1',
    type: 'medical',
    title: 'Orthopedic Consultation',
    date: '2025-11-01',
    time: '10:00',
    location: 'Military Hospital - Building 3',
    provider: 'Dr. Smith',
    phone: '555-123-4567',
    notes: 'Discuss knee pain and get referral for MRI'
  },
  {
    id: '2',
    type: 'vacp',
    title: 'C&P Exam - Mental Health',
    date: '2025-11-05',
    time: '14:00',
    location: 'VA Regional Office',
    provider: 'Dr. Johnson',
    phone: '555-234-5678',
    notes: 'Bring list of PTSD symptoms and medications'
  }
]

export default function AppointmentsTracking({ previewMode = false }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [appointments, setAppointments] = useState([])
  const [conditions, setConditions] = useState([])
  const [medicalRecords, setMedicalRecords] = useState([])
  const [contacts, setContacts] = useState([])
  const [showAddAppointment, setShowAddAppointment] = useState(false)
  const [showAddCondition, setShowAddCondition] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [newAppointment, setNewAppointment] = useState({
    type: 'medical',
    title: '',
    date: '',
    time: '',
    location: '',
    provider: '',
    phone: '',
    notes: ''
  })
  const [newCondition, setNewCondition] = useState({
    name: '',
    startDate: '',
    status: 'stable',
    painLevel: 5,
    frequency: 'daily',
    lastFlareup: '',
    medications: '',
    notes: ''
  })

  // Set page title
  useEffect(() => {
    document.title = 'Appointments & Tracking | Military Transition Toolkit'
  }, [])

  // Load from Supabase database
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getAppointments()

        if (data && data.length > 0) {
          // Transform database records to page format
          const formattedAppointments = data.map(appt => ({
            id: appt.id,
            type: appt.type || 'medical',
            title: appt.title,
            date: appt.appointment_date,
            time: appt.appointment_time || '',
            location: appt.location || '',
            provider: appt.provider || '',
            phone: appt.phone || '',
            notes: appt.notes || '',
            completed: appt.completed || false
          }))

          setAppointments(formattedAppointments)
        }

        // Note: conditions, medical records, contacts are currently stored in localStorage
        // TODO: Create separate services for these if needed
        const savedConditions = localStorage.getItem('conditions')
        const savedRecords = localStorage.getItem('medicalRecords')
        const savedContacts = localStorage.getItem('contacts')

        if (savedConditions) setConditions(JSON.parse(savedConditions))
        if (savedRecords) setMedicalRecords(JSON.parse(savedRecords))
        if (savedContacts) setContacts(JSON.parse(savedContacts))

        console.log('✓ Appointments loaded from database')
      } catch (err) {
        console.error('Error loading appointments:', err)
        setError('Failed to load appointments. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    loadAppointments()
  }, [])

  // Auto-save conditions, medical records, contacts to localStorage
  // TODO: Move these to database in future update
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('conditions', JSON.stringify(conditions))
    }
  }, [conditions, loading])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords))
    }
  }, [medicalRecords, loading])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
  }, [contacts, loading])

  const addAppointment = async () => {
    try {
      setSaving(true)
      setError(null)

      // Transform to database format
      const dbData = {
        type: newAppointment.type,
        title: newAppointment.title,
        appointment_date: newAppointment.date,
        appointment_time: newAppointment.time,
        location: newAppointment.location,
        provider: newAppointment.provider,
        phone: newAppointment.phone,
        notes: newAppointment.notes,
        completed: false
      }

      // Save to database
      const created = await createAppointment(dbData)

      // Add to local state with formatted data
      const newAppt = {
        id: created.id,
        type: created.type,
        title: created.title,
        date: created.appointment_date,
        time: created.appointment_time || '',
        location: created.location || '',
        provider: created.provider || '',
        phone: created.phone || '',
        notes: created.notes || '',
        completed: false
      }

      setAppointments([...appointments, newAppt])
      setNewAppointment({
        type: 'medical',
        title: '',
        date: '',
        time: '',
        location: '',
        provider: '',
        phone: '',
        notes: ''
      })
      setShowAddAppointment(false)

      console.log('✓ Appointment created in database')
    } catch (err) {
      console.error('Error adding appointment:', err)
      setError('Failed to save appointment. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const addCondition = () => {
    const condition = {
      ...newCondition,
      id: Date.now().toString()
    }
    setConditions([...conditions, condition])
    setNewCondition({
      name: '',
      startDate: '',
      status: 'stable',
      painLevel: 5,
      frequency: 'daily',
      lastFlareup: '',
      medications: '',
      notes: ''
    })
    setShowAddCondition(false)
  }

  const deleteAppointment = async (id) => {
    if (window.confirm('Delete this appointment? This action cannot be undone.')) {
      try {
        setSaving(true)
        setError(null)

        // Delete from database
        await deleteAppointmentDB(id)

        // Remove from local state
        setAppointments(appointments.filter(a => a.id !== id))

        console.log('✓ Appointment deleted from database')
      } catch (err) {
        console.error('Error deleting appointment:', err)
        setError('Failed to delete appointment. Please try again.')
      } finally {
        setSaving(false)
      }
    }
  }

  const deleteCondition = (id) => {
    if (window.confirm('Delete this condition? This will remove all tracking data. This action cannot be undone.')) {
      setConditions(conditions.filter(c => c.id !== id))
    }
  }

  const getTypeColor = (type) => {
    const apptType = APPOINTMENT_TYPES.find(t => t.id === type)
    return apptType?.color || 'gray'
  }

  const getUpcomingAppointments = () => {
    const today = new Date()
    return appointments
      .filter(a => new Date(a.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  const getNextAppointment = () => {
    const upcoming = getUpcomingAppointments()
    return upcoming[0]
  }

  const getDaysUntil = (dateString) => {
    const today = new Date()
    const apptDate = new Date(dateString)
    const diffTime = apptDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const exportData = () => {
    const data = {
      appointments,
      conditions,
      medicalRecords,
      contacts,
      exportDate: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'medical-tracking-data.json'
    a.click()
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'appointments', name: 'Appointments', icon: '📅' },
    { id: 'conditions', name: 'Conditions', icon: '🏥' },
    { id: 'records', name: 'Medical Records', icon: '📋' },
    { id: 'contacts', name: 'Contacts', icon: '📞' }
  ]

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
              <p className="text-gray-600 font-medium">Loading your appointments from secure cloud storage...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
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
                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
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

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Appointments & Medical Tracking
              </h1>
              {isPromoModeActive() && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                  🎖️ Launch Special - FREE
                </span>
              )}
            </div>
            <p className="text-gray-600">
              Organize appointments, track conditions, and manage medical records
            </p>
          </div>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
          >
            Export All Data
          </button>
        </div>

        {/* Privacy Warning */}
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
                  🔒 Your appointments are <strong>securely stored in the cloud</strong> with AES-256 encryption and row-level security. <strong>Important:</strong> Use this to track appointment dates and notes - keep detailed medical records in HIPAA-compliant systems.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Overview Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Next Appointment */}
              {getNextAppointment() && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Next Appointment</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {getDaysUntil(getNextAppointment().date)} days
                  </div>
                  <div className="text-sm text-gray-700">{getNextAppointment().title}</div>
                  <div className="text-sm text-gray-600">{getNextAppointment().date} at {getNextAppointment().time}</div>
                </div>
              )}

              {/* Total Appointments */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Upcoming Appointments</h3>
                <div className="text-2xl font-bold text-green-600">{getUpcomingAppointments().length}</div>
                <div className="text-sm text-gray-600">scheduled</div>
              </div>

              {/* Conditions Tracking */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Conditions Tracked</h3>
                <div className="text-2xl font-bold text-purple-600">{conditions.length}</div>
                <div className="text-sm text-gray-600">active conditions</div>
              </div>

              {/* Medical Records */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Medical Records</h3>
                <div className="text-2xl font-bold text-yellow-600">{medicalRecords.length}</div>
                <div className="text-sm text-gray-600">documents tracked</div>
              </div>

              {/* Contacts */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Saved Contacts</h3>
                <div className="text-2xl font-bold text-red-600">{contacts.length}</div>
                <div className="text-sm text-gray-600">providers & contacts</div>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Upcoming Appointments This Month</h3>
              {getUpcomingAppointments().slice(0, 5).length > 0 ? (
                <div className="space-y-2">
                  {getUpcomingAppointments().slice(0, 5).map(appt => (
                    <div key={appt.id} className="flex items-center justify-between bg-white p-3 rounded border">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full bg-${getTypeColor(appt.type)}-500 mr-3`}></div>
                        <div>
                          <div className="font-medium text-gray-900">{appt.title}</div>
                          <div className="text-sm text-gray-600">{appt.date} at {appt.time}</div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{getDaysUntil(appt.date)} days</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">No upcoming appointments scheduled</p>
              )}
            </div>
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Appointments Calendar</h2>
              <button
                onClick={() => setShowAddAppointment(!showAddAppointment)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                + Add Appointment
              </button>
            </div>

            {/* Add Appointment Form */}
            {showAddAppointment && (
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">New Appointment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                    <select
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {APPOINTMENT_TYPES.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title/Description</label>
                    <input
                      type="text"
                      value={newAppointment.title}
                      onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., Knee MRI"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={newAppointment.location}
                      onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Building, room, address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider/Contact</label>
                    <input
                      type="text"
                      value={newAppointment.provider}
                      onChange={(e) => setNewAppointment({...newAppointment, provider: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Dr. Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={newAppointment.phone}
                      onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="555-123-4567"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="What to discuss, questions to ask, etc."
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={addAppointment}
                    disabled={!newAppointment.title || !newAppointment.date}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    Save Appointment
                  </button>
                  <button
                    onClick={() => setShowAddAppointment(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Appointments List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">All Appointments</h3>
              {appointments.length > 0 ? (
                appointments
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map(appt => (
                    <div key={appt.id} className={`border-l-4 border-${getTypeColor(appt.type)}-500 bg-white p-4 rounded-r-lg shadow`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium bg-${getTypeColor(appt.type)}-100 text-${getTypeColor(appt.type)}-800 mr-2`}>
                              {APPOINTMENT_TYPES.find(t => t.id === appt.type)?.name}
                            </span>
                            {new Date(appt.date) >= new Date() && (
                              <span className="text-sm text-gray-600">In {getDaysUntil(appt.date)} days</span>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-900 text-lg">{appt.title}</h4>
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            <div>📅 {appt.date} at {appt.time}</div>
                            <div>📍 {appt.location}</div>
                            {appt.provider && <div>👤 {appt.provider}</div>}
                            {appt.phone && <div>📞 {appt.phone}</div>}
                            {appt.notes && (
                              <div className="mt-2 p-2 bg-gray-50 rounded">
                                <div className="text-xs text-gray-500 mb-1">Notes:</div>
                                <div className="text-sm">{appt.notes}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteAppointment(appt.id)}
                          className="text-red-600 hover:text-red-800 ml-4"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      {/* Appointment Preparation Checklist */}
                      {new Date(appt.date) >= new Date() && getDaysUntil(appt.date) <= 7 && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                          <div className="font-medium text-gray-900 mb-2">✓ Preparation Checklist</div>
                          <div className="space-y-1 text-sm">
                            <div>☐ ID card</div>
                            <div>☐ Insurance card</div>
                            <div>☐ List of medications</div>
                            <div>☐ Previous medical records</div>
                            <div>☐ List of symptoms to discuss</div>
                            <div>☐ Questions to ask provider</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding your first appointment</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CONDITIONS TAB */}
        {activeTab === 'conditions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Condition Tracking</h2>
              <button
                onClick={() => setShowAddCondition(!showAddCondition)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                + Track New Condition
              </button>
            </div>

            {/* Add Condition Form */}
            {showAddCondition && (
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">New Condition</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Condition Name</label>
                    <input
                      type="text"
                      value={newCondition.name}
                      onChange={(e) => setNewCondition({...newCondition, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., Chronic knee pain"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Symptoms Started</label>
                    <input
                      type="date"
                      value={newCondition.startDate}
                      onChange={(e) => setNewCondition({...newCondition, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                    <select
                      value={newCondition.status}
                      onChange={(e) => setNewCondition({...newCondition, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="worsening">Getting Worse</option>
                      <option value="stable">Stable</option>
                      <option value="improving">Improving</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pain Level (1-10): {newCondition.painLevel}</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={newCondition.painLevel}
                      onChange={(e) => setNewCondition({...newCondition, painLevel: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <select
                      value={newCondition.frequency}
                      onChange={(e) => setNewCondition({...newCondition, frequency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Flare-up Date</label>
                    <input
                      type="date"
                      value={newCondition.lastFlareup}
                      onChange={(e) => setNewCondition({...newCondition, lastFlareup: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
                    <input
                      type="text"
                      value={newCondition.medications}
                      onChange={(e) => setNewCondition({...newCondition, medications: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="List medications and dosages"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={newCondition.notes}
                      onChange={(e) => setNewCondition({...newCondition, notes: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Symptoms, triggers, what to mention to doctor..."
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={addCondition}
                    disabled={!newCondition.name}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    Save Condition
                  </button>
                  <button
                    onClick={() => setShowAddCondition(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Conditions List */}
            <div className="space-y-4">
              {conditions.length > 0 ? (
                conditions.map(condition => (
                  <div key={condition.id} className="bg-white border border-gray-300 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{condition.name}</h3>
                        <p className="text-sm text-gray-600">Since {condition.startDate}</p>
                      </div>
                      <button
                        onClick={() => deleteCondition(condition.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Status</div>
                        <div className={`font-medium ${
                          condition.status === 'worsening' ? 'text-red-600' :
                          condition.status === 'improving' ? 'text-green-600' :
                          'text-yellow-600'
                        }`}>
                          {condition.status === 'worsening' ? '↓ Worsening' :
                           condition.status === 'improving' ? '↑ Improving' :
                           '→ Stable'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Pain Level</div>
                        <div className="font-medium text-gray-900">{condition.painLevel}/10</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Frequency</div>
                        <div className="font-medium text-gray-900 capitalize">{condition.frequency}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Last Flare-up</div>
                        <div className="font-medium text-gray-900">{condition.lastFlareup || 'N/A'}</div>
                      </div>
                    </div>

                    {condition.medications && (
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-700">Medications:</div>
                        <div className="text-sm text-gray-600">{condition.medications}</div>
                      </div>
                    )}

                    {condition.notes && (
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-sm font-medium text-gray-700 mb-1">Notes:</div>
                        <div className="text-sm text-gray-600">{condition.notes}</div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No conditions tracked</h3>
                  <p className="mt-1 text-sm text-gray-500">Start tracking a condition to monitor symptoms over time</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MEDICAL RECORDS TAB */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Medical Records Tracker</h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Documents Needed Checklist:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>☐ Complete service treatment records (STRs)</div>
                <div>☐ Civilian medical records</div>
                <div>☐ Current prescriptions list</div>
                <div>☐ Lab results (past year)</div>
                <div>☐ Imaging results (X-rays, MRIs, etc.)</div>
                <div>☐ Mental health treatment records</div>
                <div>☐ Physical therapy notes</div>
                <div>☐ Dental records</div>
                <div>☐ Vision records</div>
                <div>☐ Deployment medical records</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">📋 How to Obtain Your Medical Records:</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <strong>Service Treatment Records (STRs):</strong>
                  <p className="ml-4 mt-1">Request through TRICARE or your base medical records office. Can also request via VA.gov or eB enefits.</p>
                </div>
                <div>
                  <strong>Civilian Medical Records:</strong>
                  <p className="ml-4 mt-1">Contact each healthcare provider directly. Many providers now have patient portals for easy access.</p>
                </div>
                <div>
                  <strong>VA Medical Records:</strong>
                  <p className="ml-4 mt-1">Access through MyHealtheVet (www.myhealth.va.gov) or request at your local VA Medical Center.</p>
                </div>
                <div className="mt-4 p-3 bg-blue-100 rounded">
                  <strong>💡 Pro Tip:</strong> Start requesting records 6-12 months before your separation date. Some facilities may take several weeks to process requests.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACTS TAB */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Access Contacts</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sample contact cards */}
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">PEBLO (Physical Evaluation Board Liaison Officer)</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Not yet assigned
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Click to add contact information</div>
                </div>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">MSC (Military Services Coordinator)</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Not yet assigned
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Click to add contact information</div>
                </div>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Primary Care Physician</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Not yet added
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Click to add contact information</div>
                </div>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">VA Representative</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Not yet added
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Click to add contact information</div>
                </div>
              </div>
            </div>

            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Click "+ Add Contact" to store important contact information</p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                + Add Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
