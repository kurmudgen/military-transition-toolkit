/**
 * Job Title Translator Component
 * Lookup MOS/rating codes to find civilian job equivalents
 */

import { useState, useEffect } from 'react'

export default function JobTitleTranslator({ translation, onInsert }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [branch, setBranch] = useState('army')

  // Get MOS list for selected branch
  const mosList = translation.getMOSListByBranch(branch)

  useEffect(() => {
    if (searchQuery.length >= 2) {
      // Search careers by code or keyword
      const results = translation.searchCareers(searchQuery)
      setSearchResults(results.slice(0, 10)) // Limit to 10 results
    } else {
      setSearchResults([])
    }
  }, [searchQuery, translation])

  const handleSelectCareer = (careerCode) => {
    const careerData = translation.getCareerData(careerCode)
    setSelectedCareer(careerData)
  }

  const handleInsertJob = (jobTitle) => {
    onInsert(jobTitle)
  }

  return (
    <div className="space-y-6">
      {/* Branch Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Branch
        </label>
        <div className="flex flex-wrap gap-2">
          {translation.availableBranches.map(b => (
            <button
              key={b.key}
              onClick={() => setBranch(b.key)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${branch === b.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Box */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search by MOS/Rating Code or Job Title
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g. 11B, Infantryman, IT Specialist..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              Search Results ({searchResults.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {searchResults.map(result => (
              <button
                key={result.code}
                onClick={() => handleSelectCareer(result.code)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-sm font-medium text-blue-600">
                      {result.code}
                    </span>
                    <span className="ml-2 text-gray-900">{result.title}</span>
                  </div>
                  <span className="text-xs text-gray-500 capitalize">{result.branch}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Career Details */}
      {selectedCareer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedCareer.title}
              </h3>
              <span className="text-sm font-medium text-gray-600 capitalize">
                {selectedCareer.branch}
              </span>
            </div>
            <p className="text-sm font-mono text-blue-600">{selectedCareer.code}</p>
          </div>

          {/* Civilian Job Equivalents */}
          {selectedCareer.civilianJobs && selectedCareer.civilianJobs.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Civilian Job Equivalents
              </h4>
              <div className="space-y-2">
                {selectedCareer.civilianJobs.map((job, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200"
                  >
                    <span className="text-gray-900">{job}</span>
                    <button
                      onClick={() => handleInsertJob(job)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Insert
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transferable Skills */}
          {selectedCareer.skills && selectedCareer.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Transferable Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCareer.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {selectedCareer.certifications && selectedCareer.certifications.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Recommended Certifications
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {selectedCareer.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Salary Range */}
          {selectedCareer.salaryRange && (
            <div className="pt-2 border-t border-blue-200">
              <p className="text-sm text-gray-600">
                <strong>Typical Salary Range:</strong> {selectedCareer.salaryRange}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Browse Hint */}
      {!searchQuery && !selectedCareer && (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-lg font-medium mb-2">Search for Your MOS/Rating</p>
          <p className="text-sm">
            Enter your military job code or title to find civilian career equivalents
          </p>
          <p className="text-xs mt-4 text-gray-400">
            {mosList.length} {branch} careers available
          </p>
        </div>
      )}
    </div>
  )
}
