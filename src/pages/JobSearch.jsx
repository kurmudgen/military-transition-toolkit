import { useState, useEffect } from 'react'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import { useUsageLimits } from '../hooks/useFeatureAccess'
import UpgradePrompt from '../components/UpgradePrompt'
import { isPromoActive } from '../utils/promoConfig'

export default function JobSearch() {
  // Feature gating
  const { checkLimit } = useUsageLimits()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)


  const [savedJobs, setSavedJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [activeTab, setActiveTab] = useState('boards') // boards, saved, applications
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

  // Veteran-friendly job boards
  const jobBoards = [
    {
      name: 'Hire Heroes USA',
      url: 'https://hireherosusa.org/jobs',
      description: 'Free job search assistance and career coaching specifically for military members, veterans, and military spouses.',
      icon: '🎖️',
      featured: true
    },
    {
      name: 'USAJOBS',
      url: 'https://www.usajobs.gov',
      description: 'Official federal government job board. Veterans receive preference points on federal applications.',
      icon: '🏛️',
      featured: true
    },
    {
      name: 'RecruitMilitary',
      url: 'https://recruitmilitary.com/jobs',
      description: 'Largest military-to-civilian job board with thousands of veteran-friendly employers.',
      icon: '🪖',
      featured: true
    },
    {
      name: 'LinkedIn Veterans Jobs',
      url: 'https://www.linkedin.com/jobs/veteran-jobs',
      description: 'LinkedIn job search filtered for veteran-friendly positions and military skills translation.',
      icon: '💼',
      featured: false
    },
    {
      name: 'Indeed (Veteran Filter)',
      url: 'https://www.indeed.com/q-Veteran-jobs.html',
      description: 'World\'s largest job site with built-in veteran and military-friendly job filters.',
      icon: '🔍',
      featured: false
    },
    {
      name: 'Corporate Fellows',
      url: 'https://corpfellows.com',
      description: 'Connects transitioning officers with top companies through fellowships and direct hire positions.',
      icon: '🎯',
      featured: false
    },
    {
      name: 'FourBlock',
      url: 'https://fourblock.org/jobs',
      description: 'Career readiness program helping veterans and military spouses transition to meaningful civilian careers.',
      icon: '📚',
      featured: false
    }
  ]

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
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Search</h1>
          {isPromoActive() && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
              🎖️ Launch Special - FREE
            </span>
          )}
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Find veteran-friendly job opportunities and track your applications
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('boards')}
            className={`${
              activeTab === 'boards'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors`}
          >
            Job Boards
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

      {/* Job Boards Tab */}
      {activeTab === 'boards' && (
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              External Job Resources
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-400">
              These are trusted external job boards that specialize in veteran-friendly employment. When you find a job you like on these sites, come back here to save it and track your application progress.
            </p>
          </div>

          {/* Featured Job Boards */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              ⭐ Featured Veteran Job Boards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobBoards.filter(board => board.featured).map((board) => (
                <a
                  key={board.name}
                  href={board.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick(`Job Board - ${board.name}`)}
                  className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl">{board.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {board.name}
                      </h3>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {board.description}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Additional Job Boards */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              More Veteran-Friendly Job Boards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobBoards.filter(board => !board.featured).map((board) => (
                <a
                  key={board.name}
                  href={board.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick(`Job Board - ${board.name}`)}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{board.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {board.name}
                        </h3>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {board.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              💡 How to Use This Page
            </h3>
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">1.</span>
                <span>Visit one of the job boards above to search for veteran-friendly positions</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">2.</span>
                <span>When you find interesting jobs, come back here and use the "Saved Jobs" tab to track them</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
                <span>After applying, use the "Applications" tab to track your progress and follow-ups</span>
              </li>
            </ol>
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
