/**
 * Translation Helper - Main Modal Component
 * Provides military-to-civilian translation tools for Resume Builder
 */

import { useState } from 'react'
import { useTranslation } from '../../../hooks/useTranslation'
import JobTitleTranslator from './JobTitleTranslator'
import AccomplishmentTranslator from './AccomplishmentTranslator'
import SkillsTranslator from './SkillsTranslator'

export default function TranslationHelper({ isOpen, onClose, onInsert }) {
  const [activeTab, setActiveTab] = useState('job-titles')
  const translation = useTranslation()

  if (!isOpen) return null

  const tabs = [
    { id: 'job-titles', label: 'Job Title Lookup', icon: '🎯' },
    { id: 'accomplishments', label: 'Accomplishment Translator', icon: '✏️' },
    { id: 'skills', label: 'Skills & Jargon', icon: '📚' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Translation Helper</h2>
            <p className="text-sm text-gray-600 mt-1">
              Convert military experience to civilian-friendly language
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-1 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-3 font-medium text-sm transition-colors relative
                  ${activeTab === tab.id
                    ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'job-titles' && (
            <JobTitleTranslator
              translation={translation}
              onInsert={onInsert}
            />
          )}
          {activeTab === 'accomplishments' && (
            <AccomplishmentTranslator
              translation={translation}
              onInsert={onInsert}
            />
          )}
          {activeTab === 'skills' && (
            <SkillsTranslator
              translation={translation}
              onInsert={onInsert}
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600">
              <strong>{translation.getStatistics().totalMOS}</strong> MOS/ratings available •{' '}
              <strong>{translation.getStatistics().totalJargonTerms}</strong> jargon terms
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
