import { useEffect } from 'react'

export default function Profile() {
  // Set page title
  useEffect(() => {
    document.title = 'Your Profile - Military Transition Toolkit'
  }, [])

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Your Profile
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Branch
            </label>
            <p className="text-gray-900">To be implemented</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Service
            </label>
            <p className="text-gray-900">To be implemented</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transition Timeline
            </label>
            <p className="text-gray-900">To be implemented</p>
          </div>
        </div>
      </div>
    </div>
  )
}
