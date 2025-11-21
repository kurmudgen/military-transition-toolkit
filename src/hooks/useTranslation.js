/**
 * useTranslation Hook
 * Provides access to career database and translation functions
 */

import { useState, useMemo } from 'react'
import { careerDatabase, careerLookup } from '../data/translations/careerDatabase'
import { jargonDictionary } from '../data/translations/skillsJargon'
import {
  translateAccomplishment,
  detectMilitaryTerms,
  getSuggestions,
  civilianizeText,
  analyzeAccomplishment
} from '../services/translationService'

export function useTranslation() {
  const [selectedBranch, setSelectedBranch] = useState('army')
  const [selectedMOS, setSelectedMOS] = useState('')

  /**
   * Get career data by MOS/rating code
   */
  const getCareerData = (code) => {
    if (!code) return null
    const normalizedCode = code.toUpperCase().trim()
    return careerLookup[normalizedCode] || null
  }

  /**
   * Search careers by keyword
   */
  const searchCareers = (keyword) => {
    if (!keyword || keyword.length < 2) return []

    const searchTerm = keyword.toLowerCase()
    const results = []

    Object.entries(careerLookup).forEach(([code, data]) => {
      const titleMatch = data.title.toLowerCase().includes(searchTerm)
      const jobMatch = data.civilianJobs.some(job =>
        job.toLowerCase().includes(searchTerm)
      )
      const skillMatch = data.skills.some(skill =>
        skill.toLowerCase().includes(searchTerm)
      )

      if (titleMatch || jobMatch || skillMatch) {
        results.push({ code, ...data })
      }
    })

    return results
  }

  /**
   * Get all MOS codes for a specific branch
   */
  const getMOSListByBranch = (branch) => {
    const branchKey = branch.toLowerCase().replace(' ', '')
    const branchData = careerDatabase[branchKey] || {}

    return Object.entries(branchData).map(([code, data]) => ({
      code,
      title: data.title,
      ...data
    })).sort((a, b) => a.code.localeCompare(b.code))
  }

  /**
   * Get MOS list for currently selected branch
   */
  const currentBranchMOS = useMemo(() => {
    return getMOSListByBranch(selectedBranch)
  }, [selectedBranch])

  /**
   * Get currently selected MOS data
   */
  const currentMOSData = useMemo(() => {
    return getCareerData(selectedMOS)
  }, [selectedMOS])

  /**
   * Get all available branches
   */
  const availableBranches = [
    { key: 'army', label: 'Army' },
    { key: 'marines', label: 'Marine Corps' },
    { key: 'navy', label: 'Navy' },
    { key: 'coastguard', label: 'Coast Guard' }
  ]

  /**
   * Get jargon dictionary
   */
  const getJargonDictionary = () => jargonDictionary

  /**
   * Search jargon dictionary
   */
  const searchJargon = (term) => {
    if (!term || term.length < 2) return []

    const searchTerm = term.toLowerCase()
    const results = []

    Object.entries(jargonDictionary).forEach(([military, civilian]) => {
      if (military.toLowerCase().includes(searchTerm)) {
        results.push({
          military,
          civilian
        })
      }
    })

    return results
  }

  /**
   * Get frequently used jargon terms
   */
  const getFrequentJargon = () => {
    const frequent = [
      'NCOIC', 'OIC', 'squad leader', 'platoon sergeant',
      'conducted', 'supervised', 'coordinated', 'maintained',
      'trained', 'operated', 'accountability', 'mission'
    ]

    return frequent.map(term => ({
      military: term,
      civilian: jargonDictionary[term] || []
    })).filter(item => item.civilian.length > 0)
  }

  /**
   * Get statistics about available data
   */
  const getStatistics = () => {
    const total = Object.keys(careerLookup).length

    const byBranch = {
      army: Object.keys(careerDatabase.army || {}).length,
      marines: Object.keys(careerDatabase.marines || {}).length,
      navy: Object.keys(careerDatabase.navy || {}).length,
      coastguard: Object.keys(careerDatabase.coastguard || {}).length
    }

    const totalJargonTerms = Object.keys(jargonDictionary).length

    return {
      totalMOS: total,
      byBranch,
      totalJargonTerms
    }
  }

  return {
    // State
    selectedBranch,
    setSelectedBranch,
    selectedMOS,
    setSelectedMOS,

    // Career database functions
    getCareerData,
    searchCareers,
    getMOSListByBranch,
    currentBranchMOS,
    currentMOSData,
    availableBranches,

    // Jargon functions
    getJargonDictionary,
    searchJargon,
    getFrequentJargon,
    getSuggestions,

    // Translation functions
    translateAccomplishment,
    detectMilitaryTerms,
    civilianizeText,
    analyzeAccomplishment,

    // Statistics
    getStatistics
  }
}
