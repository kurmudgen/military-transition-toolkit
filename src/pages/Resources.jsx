import { useEffect } from 'react'

export default function Resources() {
  // Set page title
  useEffect(() => {
    document.title = 'Transition Resources - Military Transition Toolkit'
  }, [])

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Transition Resources
        </h1>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Department of Veterans Affairs (VA)
            </h3>
            <p className="text-gray-600">
              Access healthcare, benefits, and support services.
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Transition Assistance Program (TAP)
            </h3>
            <p className="text-gray-600">
              Comprehensive transition preparation and planning.
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Military OneSource
            </h3>
            <p className="text-gray-600">
              24/7 support for service members and their families.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
