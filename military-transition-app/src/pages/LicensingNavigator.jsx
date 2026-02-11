import { useState, useMemo } from 'react'
import {
  professionalLicenses,
  generalLicensingResources,
  getAllProfessions,
} from '../data/licensingData'

export default function LicensingNavigator() {
  const [selectedProfession, setSelectedProfession] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [showSpouseOnly, setShowSpouseOnly] = useState(false)

  const professions = getAllProfessions()

  const currentLicense = useMemo(
    () => professionalLicenses.find((l) => l.id === selectedProfession),
    [selectedProfession]
  )

  const filteredStates = useMemo(() => {
    if (!currentLicense) return []
    let states = currentLicense.states
    if (selectedState) {
      states = states.filter((s) => s.stateCode === selectedState)
    }
    if (showSpouseOnly) {
      states = states.filter((s) => s.hasMilitarySpouseProtection)
    }
    return states
  }, [currentLicense, selectedState, showSpouseOnly])

  const allStateCodes = useMemo(() => {
    if (!currentLicense) return []
    return currentLicense.states.map((s) => ({ code: s.stateCode, name: s.state }))
  }, [currentLicense])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Licensing Navigator</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Find state-by-state professional licensing requirements, military spouse protections, and expedited pathways for transitioning service members and families.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Find Your License</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Profession
            </label>
            <select
              value={selectedProfession}
              onChange={(e) => {
                setSelectedProfession(e.target.value)
                setSelectedState('')
              }}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a profession...</option>
              {professions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.profession}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={!currentLicense}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            >
              <option value="">All States</option>
              {allStateCodes.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSpouseOnly(!showSpouseOnly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showSpouseOnly ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                role="switch"
                aria-checked={showSpouseOnly}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showSpouseOnly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700 dark:text-gray-300">Spouse protections only</span>
            </div>
          </div>
        </div>
      </div>

      {/* No profession selected */}
      {!currentLicense && (
        <div className="space-y-4">
          {/* Overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {professions.map((p) => {
              const license = professionalLicenses.find((l) => l.id === p.id)
              const expeditedCount = license?.states.filter((s) => s.hasExpedited).length ?? 0
              const spouseCount = license?.states.filter((s) => s.hasMilitarySpouseProtection).length ?? 0
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProfession(p.id)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-left hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{p.profession}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {license?.states.length} states covered
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      {expeditedCount} with expedited process
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      {spouseCount} with spouse protections
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* General Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              General Licensing Resources
            </h2>
            <div className="space-y-3">
              {generalLicensingResources.map((resource) => (
                <div key={resource.name} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {resource.name}
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {resource.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profession selected — show details */}
      {currentLicense && (
        <div className="space-y-4">
          {/* Profession Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentLicense.profession}
              </h2>
              <button
                onClick={() => {
                  setSelectedProfession('')
                  setSelectedState('')
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all professions
              </button>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {currentLicense.description}
            </p>

            {/* Requirements */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Typical Requirements
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {currentLicense.typicalRequirements.map((req, i) => (
                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Military Considerations */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Military Considerations
              </h3>
              <ul className="space-y-2">
                {currentLicense.militaryConsiderations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* State-by-State Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              State-by-State Details ({filteredStates.length})
            </h2>
            {filteredStates.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No states match your current filters.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredStates.map((stateInfo) => (
                  <div
                    key={stateInfo.stateCode}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {stateInfo.state} ({stateInfo.stateCode})
                        </h3>
                        <div className="flex gap-2 mt-1">
                          {stateInfo.hasExpedited && (
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
                              Expedited Available
                            </span>
                          )}
                          {stateInfo.hasMilitarySpouseProtection && (
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">
                              Spouse Protection
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ~{stateInfo.estimatedTimeline}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Transfer Process
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {stateInfo.transferProcess}
                      </p>
                    </div>

                    <a
                      href={stateInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Visit state licensing board
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <span className="font-semibold">Disclaimer:</span> Licensing requirements change frequently.
          Always verify current requirements directly with the state licensing board before making decisions.
          Information covers the top 10 military-friendly states. Data last reviewed 2024/2025.
        </p>
      </div>
    </div>
  )
}
