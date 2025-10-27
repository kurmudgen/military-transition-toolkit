import { useState, useEffect } from 'react'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import { useUsageLimits } from '../hooks/useFeatureAccess'
import UpgradePrompt from '../components/UpgradePrompt'

export default function JobSearch() {
  // Feature gating
  const { checkLimit } = useUsageLimits()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)


  const [searchParams, setSearchParams] = useState({
    keywords: '',
    location: '',
    distance: '25',
    jobType: 'all',
    experienceLevel: 'all',
    salary: '',
    remote: false
  })

  const [jobs, setJobs] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('search') // search, saved, applications
  const [selectedJob, setSelectedJob] = useState(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)

  // Load saved data from localStorage
  useEffect(() => {
    trackPageView('/app/job-search')

    const saved = localStorage.getItem('savedJobs')
    if (saved) setSavedJobs(JSON.parse(saved))

    const apps = localStorage.getItem('jobApplications')
    if (apps) setApplications(JSON.parse(apps))
  }, [])

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs))
  }, [savedJobs])

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(applications))
  }, [applications])

  // Mock job data (in production, this would call Indeed/USAJobs APIs)
  const mockJobSearch = () => {
    return [
      {
        id: 'job-1',
        title: 'Project Manager',
        company: 'Tech Solutions Inc',
        location: 'Remote',
        salary: '$75,000 - $95,000',
        type: 'Full-time',
        posted: '2 days ago',
        description: 'Leading cross-functional teams in delivering complex technical projects. Military leadership experience highly valued.',
        requirements: ['5+ years project management', 'PMP certification preferred', 'Strong leadership skills', 'Excellent communication'],
        veteranFriendly: true,
        source: 'Indeed'
      },
      {
        id: 'job-2',
        title: 'Network Administrator',
        company: 'Federal Cybersecurity',
        location: 'Washington, DC',
        salary: '$80,000 - $110,000',
        type: 'Full-time',
        posted: '1 week ago',
        description: 'Manage and secure network infrastructure for federal agency. Security clearance required.',
        requirements: ['Active Secret clearance', 'Network+ or CCNA', '3+ years experience', 'Military IT experience preferred'],
        veteranFriendly: true,
        source: 'USAJobs'
      },
      {
        id: 'job-3',
        title: 'Operations Manager',
        company: 'Logistics Global',
        location: 'Fort Worth, TX',
        salary: '$70,000 - $90,000',
        type: 'Full-time',
        posted: '3 days ago',
        description: 'Oversee daily operations of logistics warehouse. Veterans encouraged to apply.',
        requirements: ['Supply chain management', 'Team leadership', 'Process improvement', 'Military logistics background a plus'],
        veteranFriendly: true,
        source: 'Indeed'
      },
      {
        id: 'job-4',
        title: 'Security Specialist',
        company: 'Corporate Security Solutions',
        location: 'Multiple Locations',
        salary: '$60,000 - $85,000',
        type: 'Full-time',
        posted: '5 days ago',
        description: 'Develop and implement security protocols for corporate facilities.',
        requirements: ['Security experience', 'Crisis management', 'Law enforcement or military background', 'Strong analytical skills'],
        veteranFriendly: true,
        source: 'Indeed'
      },
      {
        id: 'job-5',
        title: 'Healthcare Administrator',
        company: 'Veterans Medical Center',
        location: 'San Diego, CA',
        salary: '$65,000 - $85,000',
        type: 'Full-time',
        posted: '1 day ago',
        description: 'Manage administrative operations for VA medical facility.',
        requirements: ['Healthcare administration', 'Electronic health records', 'Budget management', 'Veterans preference'],
        veteranFriendly: true,
        source: 'USAJobs'
      }
    ]
  }

  const handleSearch = () => {
    trackButtonClick('Search Jobs')
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const results = mockJobSearch()

      // Filter based on search params
      const filtered = results.filter(job => {
        const matchesKeywords = !searchParams.keywords ||
          job.title.toLowerCase().includes(searchParams.keywords.toLowerCase()) ||
          job.description.toLowerCase().includes(searchParams.keywords.toLowerCase())

        const matchesLocation = !searchParams.location ||
          job.location.toLowerCase().includes(searchParams.location.toLowerCase()) ||
          job.location === 'Remote'

        const matchesType = searchParams.jobType === 'all' ||
          job.type.toLowerCase().includes(searchParams.jobType.toLowerCase())

        const matchesRemote = !searchParams.remote || job.location === 'Remote'

        return matchesKeywords && matchesLocation && matchesType && matchesRemote
      })

      setJobs(filtered)
      setLoading(false)
    }, 1000)
  }

  const saveJob = async (job) => {
    trackButtonClick('Save Job')

    // Check if already saved
    if (savedJobs.find(j => j.id === job.id)) {
      return
    }

    // Check if user has reached job limit (free tier = 5 saved jobs max)
    const reachedLimit = await checkLimit('savedJobs', savedJobs.length)

    if (reachedLimit) {
      setShowUpgradeModal(true)
      trackButtonClick('Save Job Blocked')
      return
    }

    setSavedJobs([...savedJobs, { ...job, savedDate: new Date().toISOString() }])
  }

  const unsaveJob = (jobId) => {
    setSavedJobs(savedJobs.filter(j => j.id !== jobId))
  }

  const isJobSaved = (jobId) => {
    return savedJobs.some(j => j.id === jobId)
  }

  const openApplicationModal = (job) => {
    setSelectedJob(job)
    setShowApplicationModal(true)
  }

  const submitApplication = (applicationData) => {
    trackButtonClick('Submit Application')
    const newApplication = {
      id: `app-${Date.now()}`,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      appliedDate: new Date().toISOString(),
      status: 'Applied',
      ...applicationData
    }

    setApplications([...applications, newApplication])
    setShowApplicationModal(false)
    setSelectedJob(null)
    setActiveTab('applications')
  }

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(applications.map(app =>
      app.id === appId ? { ...app, status: newStatus } : app
    ))
  }

  const deleteApplication = (appId) => {
    setApplications(applications.filter(app => app.id !== appId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Search</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Find veteran-friendly job opportunities and track your applications
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('search')}
            className={`${
              activeTab === 'search'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors`}
          >
            Search Jobs
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`${
              activeTab === 'saved'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors`}
          >
            Saved Jobs ({savedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`${
              activeTab === 'applications'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors`}
          >
            Applications ({applications.length})
          </button>
        </nav>
      </div>

      {/* Search Tab */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          {/* Search Form */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Search Filters</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={searchParams.keywords}
                  onChange={(e) => setSearchParams({ ...searchParams, keywords: e.target.value })}
                  placeholder="Job title, skills, company..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                  placeholder="City, state, or zip code"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Type
                </label>
                <select
                  value={searchParams.jobType}
                  onChange={(e) => setSearchParams({ ...searchParams, jobType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Experience Level
                </label>
                <select
                  value={searchParams.experienceLevel}
                  onChange={(e) => setSearchParams({ ...searchParams, experienceLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Salary
                </label>
                <input
                  type="text"
                  value={searchParams.salary}
                  onChange={(e) => setSearchParams({ ...searchParams, salary: e.target.value })}
                  placeholder="e.g., $60,000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Remote Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remote"
                  checked={searchParams.remote}
                  onChange={(e) => setSearchParams({ ...searchParams, remote: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remote" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remote jobs only
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search Jobs'}
              </button>
              <button
                onClick={() => setSearchParams({
                  keywords: '',
                  location: '',
                  distance: '25',
                  jobType: 'all',
                  experienceLevel: 'all',
                  salary: '',
                  remote: false
                })}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Job Results */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {jobs.length > 0 ? `${jobs.length} Jobs Found` : 'Search for jobs to see results'}
            </h2>

            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={isJobSaved(job.id)}
                onSave={() => saveJob(job)}
                onUnsave={() => unsaveJob(job.id)}
                onApply={() => openApplicationModal(job)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Saved Jobs Tab */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Saved Jobs ({savedJobs.length})
          </h2>

          {savedJobs.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No saved jobs yet. Search for jobs and save your favorites!</p>
            </div>
          ) : (
            savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={true}
                onSave={() => {}}
                onUnsave={() => unsaveJob(job.id)}
                onApply={() => openApplicationModal(job)}
                showSavedDate={true}
              />
            ))
          )}
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Job Applications ({applications.length})
          </h2>

          {applications.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No applications yet. Apply to jobs to track your progress!</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {applications.map((app) => (
                    <ApplicationRow
                      key={app.id}
                      application={app}
                      onUpdateStatus={(status) => updateApplicationStatus(app.id, status)}
                      onDelete={() => deleteApplication(app.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => {
            setShowApplicationModal(false)
            setSelectedJob(null)
          }}
          onSubmit={submitApplication}
        />
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <UpgradePrompt
          variant="modal"
          title="Upgrade to Premium"
          message="Free users can save up to 5 jobs. Upgrade to Premium for unlimited saved jobs and applications!"
          onClose={() => setShowUpgradeModal(false)}
        />
      )}
    </div>
  )
}

// Job Card Component
function JobCard({ job, isSaved, onSave, onUnsave, onApply, showSavedDate = false }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
            {job.veteranFriendly && (
              <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                Veteran Friendly
              </span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-2">{job.company}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span>📍 {job.location}</span>
            <span>💼 {job.type}</span>
            <span>💰 {job.salary}</span>
            <span>🕒 {job.posted}</span>
            {showSavedDate && (
              <span>⭐ Saved {new Date(job.savedDate).toLocaleDateString()}</span>
            )}
          </div>

          {expanded && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description:</h4>
                <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Source: {job.source}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <button
            onClick={isSaved ? onUnsave : onSave}
            className={`px-4 py-2 ${
              isSaved
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            } text-gray-900 dark:text-white font-semibold rounded-lg transition-colors`}
          >
            {isSaved ? '⭐ Saved' : '☆ Save'}
          </button>

          <button
            onClick={onApply}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
      >
        {expanded ? '▲ Show Less' : '▼ Show More'}
      </button>
    </div>
  )
}

// Application Row Component
function ApplicationRow({ application, onUpdateStatus, onDelete }) {
  const statusColors = {
    'Applied': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'Phone Screen': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    'Interview': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    'Offer': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    'Rejected': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    'Withdrawn': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        {application.jobTitle}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
        {application.company}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
        {new Date(application.appliedDate).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={application.status}
          onChange={(e) => onUpdateStatus(e.target.value)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[application.status]} border-0 cursor-pointer`}
        >
          <option value="Applied">Applied</option>
          <option value="Phone Screen">Phone Screen</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Withdrawn">Withdrawn</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
        <button
          onClick={onDelete}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

// Application Modal Component
function ApplicationModal({ job, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    resumeVersion: '',
    coverLetter: '',
    notes: '',
    followUpDate: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apply to {job.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resume Version Used
              </label>
              <input
                type="text"
                value={formData.resumeVersion}
                onChange={(e) => setFormData({ ...formData, resumeVersion: e.target.value })}
                placeholder="e.g., Tech Resume v2"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Letter / Application Notes
              </label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                rows={4}
                placeholder="Key points from your cover letter or application..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Referral source, contact info, important details..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Follow-up Date (Optional)
              </label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
