/**
 * Skills & Jargon Translator Component
 * Browse and search military-to-civilian term translations
 */

import { useState, useEffect } from 'react'

export default function SkillsTranslator({ translation, onInsert }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showFrequent, setShowFrequent] = useState(true)

  const frequentJargon = translation.getFrequentJargon()
  const allDictionary = translation.getJargonDictionary()

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = translation.searchJargon(searchQuery)
      setSearchResults(results)
      setShowFrequent(false)
    } else {
      setSearchResults([])
      setShowFrequent(true)
    }
  }, [searchQuery, translation])

  const handleInsertTerm = (civilianTerm) => {
    onInsert(civilianTerm)
  }

  const JargonCard = ({ military, civilian }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
              Military
            </span>
            <span className="ml-2 font-medium text-gray-900">{military}</span>
          </div>
          <div className="flex items-center">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
              Civilian
            </span>
            <span className="ml-2 text-gray-400">→</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {Array.isArray(civilian) ? (
          civilian.map((term, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-gray-50 rounded px-3 py-2"
            >
              <span className="text-gray-900">{term}</span>
              <button
                onClick={() => handleInsertTerm(term)}
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Insert
              </button>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
            <span className="text-gray-900">{civilian}</span>
            <button
              onClick={() => handleInsertTerm(civilian)}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Insert
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Military Terms
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for military terms..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {Object.keys(allDictionary).length} military terms in dictionary
        </p>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Search Results ({searchResults.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((result, idx) => (
              <JargonCard
                key={idx}
                military={result.military}
                civilian={result.civilian}
              />
            ))}
          </div>
        </div>
      )}

      {/* Frequently Used Terms */}
      {showFrequent && frequentJargon.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Frequently Used Military Terms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {frequentJargon.map((item, idx) => (
              <JargonCard
                key={idx}
                military={item.military}
                civilian={item.civilian}
              />
            ))}
          </div>
        </div>
      )}

      {/* Browse All */}
      {showFrequent && !searchQuery && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">
              Browse All Terms
            </h3>
            <button
              onClick={() => {
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Back to Top
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {Object.entries(allDictionary)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([military, civilian], idx) => (
                <JargonCard
                  key={idx}
                  military={military}
                  civilian={civilian}
                />
              ))}
          </div>
        </div>
      )}

      {/* Empty State for Search */}
      {searchQuery && searchResults.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium mb-2">No Results Found</p>
          <p className="text-sm">
            Try searching for a different term
          </p>
        </div>
      )}

      {/* Quick Reference Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Reference Guide</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700 mb-1">Leadership Terms:</p>
            <ul className="text-gray-600 space-y-1">
              <li>NCOIC → Supervisor</li>
              <li>OIC → Program Manager</li>
              <li>Squad Leader → Team Lead</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">Action Verbs:</p>
            <ul className="text-gray-600 space-y-1">
              <li>Conducted → Executed</li>
              <li>Supervised → Managed</li>
              <li>Coordinated → Organized</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
