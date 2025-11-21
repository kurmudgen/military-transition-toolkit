/**
 * Accomplishment Translator Component
 * Converts military accomplishment bullets to civilian-friendly versions
 */

import { useState, useEffect } from 'react'

export default function AccomplishmentTranslator({ translation, onInsert }) {
  const [inputText, setInputText] = useState('')
  const [translationResult, setTranslationResult] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [selectedVersion, setSelectedVersion] = useState(null)

  useEffect(() => {
    if (inputText.trim().length > 0) {
      // Translate and analyze
      const result = translation.translateAccomplishment(inputText)
      const score = translation.analyzeAccomplishment(inputText)
      setTranslationResult(result)
      setAnalysis(score)
    } else {
      setTranslationResult(null)
      setAnalysis(null)
      setSelectedVersion(null)
    }
  }, [inputText, translation])

  const handleInsertTranslation = (text) => {
    onInsert(text)
    // Clear after insert
    setInputText('')
    setTranslationResult(null)
    setAnalysis(null)
    setSelectedVersion(null)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Your Military Accomplishment
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g. Supervised 12 soldiers and conducted training operations for infantry squad..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          Start with an action verb and include specific metrics when possible
        </p>
      </div>

      {/* Analysis Score */}
      {analysis && (
        <div className={`border rounded-lg p-4 ${getScoreBgColor(analysis.score)}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Accomplishment Strength</h4>
            <div className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
              {analysis.score}/100
            </div>
          </div>

          {/* Strengths */}
          {analysis.strengths.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-1">Strengths:</p>
              <ul className="space-y-1">
                {analysis.strengths.map((strength, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {analysis.improvements.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Suggestions:</p>
              <ul className="space-y-1">
                {analysis.improvements.map((improvement, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-yellow-600 mr-2">→</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Detected Military Terms */}
      {translationResult && translationResult.detectedTerms.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Military Terms Detected ({translationResult.detectedTerms.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {translationResult.detectedTerms.map((term, idx) => (
              <div key={idx} className="bg-white rounded-lg px-3 py-2 border border-purple-300">
                <span className="font-medium text-purple-900">{term.term}</span>
                <span className="text-gray-400 mx-2">→</span>
                <span className="text-sm text-gray-700">
                  {term.civilianOptions[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Translation Results */}
      {translationResult && translationResult.translations.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">
            Civilian Versions ({translationResult.translations.length})
          </h4>

          {translationResult.translations.map((trans, idx) => (
            <div
              key={idx}
              className={`
                border-2 rounded-lg p-4 cursor-pointer transition-all
                ${selectedVersion === idx
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => setSelectedVersion(idx)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-medium text-gray-900">{trans.version}</h5>
                  <p className="text-xs text-gray-600">{trans.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleInsertTranslation(trans.text)
                  }}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Insert
                </button>
              </div>
              <p className="text-gray-900 leading-relaxed">{trans.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Original Text Comparison */}
      {translationResult && translationResult.original && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Original (Military):</h5>
          <p className="text-gray-600 italic">{translationResult.original}</p>
        </div>
      )}

      {/* Tips */}
      {!inputText && (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <p className="text-lg font-medium mb-2">Translate Your Accomplishments</p>
          <p className="text-sm mb-4">
            Enter a military accomplishment bullet and get civilian-friendly versions
          </p>

          {/* Quick Tips */}
          <div className="max-w-md mx-auto mt-6 text-left">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Tips for Strong Accomplishments:</h5>
            <ul className="text-sm space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Start with a strong action verb (Led, Managed, Achieved)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Include specific numbers and metrics</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Show the outcome or impact of your work</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Keep it concise (15-30 words)</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
