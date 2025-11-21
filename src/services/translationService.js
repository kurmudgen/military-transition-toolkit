/**
 * Translation Service for Resume Builder
 * Converts military experience to civilian-friendly language
 * Uses extracted career database and jargon dictionary
 */

import { jargonDictionary } from '../data/translations/skillsJargon'

/**
 * Detect military terms in text
 * @param {string} text - Text to analyze
 * @returns {Array} Detected military terms with positions
 */
export function detectMilitaryTerms(text) {
  if (!text) return []

  const detectedTerms = []
  const lowerText = text.toLowerCase()

  Object.keys(jargonDictionary).forEach(militaryTerm => {
    const regex = new RegExp(`\\b${militaryTerm}\\b`, 'gi')
    let match

    while ((match = regex.exec(text)) !== null) {
      detectedTerms.push({
        term: match[0],
        position: match.index,
        civilianOptions: jargonDictionary[militaryTerm.toLowerCase()]
      })
    }
  })

  return detectedTerms.sort((a, b) => a.position - b.position)
}

/**
 * Get suggestions for specific military term
 * @param {string} militaryTerm - Military term to translate
 * @returns {Array<string>} Civilian alternatives
 */
export function getSuggestions(militaryTerm) {
  if (!militaryTerm) return []

  const normalized = militaryTerm.toLowerCase().trim()
  return jargonDictionary[normalized] || []
}

/**
 * Replace military term with civilian equivalent
 * @param {string} text - Original text
 * @param {string} militaryTerm - Term to replace
 * @param {string} civilianTerm - Replacement term
 * @returns {string} Updated text
 */
export function replaceTerm(text, militaryTerm, civilianTerm) {
  const regex = new RegExp(`\\b${militaryTerm}\\b`, 'gi')
  return text.replace(regex, civilianTerm)
}

/**
 * Translate entire accomplishment bullet to civilian versions
 * @param {string} militaryText - Original military bullet point
 * @returns {Object} Translation result with multiple versions
 */
export function translateAccomplishment(militaryText) {
  if (!militaryText || militaryText.trim().length === 0) {
    return {
      original: militaryText,
      translations: []
    }
  }

  const detected = detectMilitaryTerms(militaryText)
  const changes = []

  // Generate General Business Version
  let generalVersion = militaryText
  detected.forEach(({ term, civilianOptions }) => {
    if (civilianOptions && civilianOptions.length > 0) {
      const replacement = civilianOptions[0] // Use first option for general version
      generalVersion = replaceTerm(generalVersion, term, replacement)
      changes.push({
        from: term,
        to: replacement
      })
    }
  })

  // Generate Leadership Focused Version
  let leadershipVersion = militaryText
  const leadershipKeywords = ['led', 'supervised', 'managed', 'directed', 'coordinated', 'trained']
  const hasLeadership = leadershipKeywords.some(keyword =>
    militaryText.toLowerCase().includes(keyword)
  )

  if (hasLeadership) {
    // Emphasize leadership aspects
    detected.forEach(({ term, civilianOptions }) => {
      if (civilianOptions && civilianOptions.length > 0) {
        // Prefer leadership-focused alternatives
        const leadershipWord = civilianOptions.find(opt =>
          opt.includes('manag') || opt.includes('lead') || opt.includes('direct') || opt.includes('supervis')
        ) || civilianOptions[0]

        leadershipVersion = replaceTerm(leadershipVersion, term, leadershipWord)
      }
    })
  } else {
    leadershipVersion = generalVersion
  }

  // Generate Achievement Focused Version
  let achievementVersion = militaryText

  // Look for numbers/metrics to emphasize
  const hasMetrics = /\d+/.test(militaryText)

  detected.forEach(({ term, civilianOptions }) => {
    if (civilianOptions && civilianOptions.length > 0) {
      const replacement = civilianOptions[0]
      achievementVersion = replaceTerm(achievementVersion, term, replacement)
    }
  })

  // If has metrics, ensure they're prominent
  if (hasMetrics) {
    // Add impact-focused language
    achievementVersion = achievementVersion
      .replace(/led/gi, 'successfully led')
      .replace(/managed/gi, 'effectively managed')
      .replace(/completed/gi, 'successfully completed')
  }

  // Build translations array (deduplicate)
  const translations = []
  const uniqueTexts = new Set()

  if (generalVersion !== militaryText && !uniqueTexts.has(generalVersion)) {
    translations.push({
      version: 'General Business',
      text: generalVersion,
      changes: changes,
      description: 'Broad appeal for most civilian roles'
    })
    uniqueTexts.add(generalVersion)
  }

  if (hasLeadership && leadershipVersion !== generalVersion && !uniqueTexts.has(leadershipVersion)) {
    translations.push({
      version: 'Leadership Focused',
      text: leadershipVersion,
      changes: changes,
      description: 'Emphasizes management and team leadership'
    })
    uniqueTexts.add(leadershipVersion)
  }

  if (hasMetrics && achievementVersion !== generalVersion && !uniqueTexts.has(achievementVersion)) {
    translations.push({
      version: 'Achievement Focused',
      text: achievementVersion,
      changes: changes,
      description: 'Highlights measurable results and impact'
    })
    uniqueTexts.add(achievementVersion)
  }

  // If no translations generated (no military terms detected), provide generic guidance
  if (translations.length === 0) {
    translations.push({
      version: 'Enhanced',
      text: militaryText,
      changes: [],
      description: 'No military jargon detected. Consider adding specific metrics or outcomes.'
    })
  }

  return {
    original: militaryText,
    translations,
    detectedTerms: detected
  }
}

/**
 * Civilianize text using jargon dictionary
 * @param {string} text - Military text
 * @returns {string} Civilian-friendly text
 */
export function civilianizeText(text) {
  if (!text) return ''

  let result = text

  Object.entries(jargonDictionary).forEach(([military, civilian]) => {
    const regex = new RegExp(`\\b${military}\\b`, 'gi')
    result = result.replace(regex, civilian[0])
  })

  return result
}

/**
 * Get action verbs suggestions
 * @returns {Array<string>} Strong action verbs for resumes
 */
export function getActionVerbs() {
  return [
    'Achieved', 'Administered', 'Analyzed', 'Coordinated', 'Created', 'Demonstrated',
    'Developed', 'Directed', 'Established', 'Evaluated', 'Executed', 'Facilitated',
    'Generated', 'Implemented', 'Improved', 'Increased', 'Initiated', 'Launched',
    'Led', 'Managed', 'Optimized', 'Organized', 'Oversaw', 'Planned',
    'Produced', 'Reduced', 'Reorganized', 'Resolved', 'Spearheaded', 'Streamlined',
    'Supervised', 'Trained', 'Transformed', 'Updated'
  ]
}

/**
 * Analyze accomplishment strength
 * @param {string} text - Accomplishment text
 * @returns {Object} Analysis with score and suggestions
 */
export function analyzeAccomplishment(text) {
  if (!text) {
    return {
      score: 0,
      strengths: [],
      improvements: ['Add an accomplishment to analyze']
    }
  }

  const strengths = []
  const improvements = []
  let score = 50 // Base score

  // Check for metrics/numbers
  const hasNumbers = /\d+/.test(text)
  if (hasNumbers) {
    strengths.push('Contains quantifiable metrics')
    score += 15
  } else {
    improvements.push('Add specific numbers or metrics')
  }

  // Check for action verbs
  const actionVerbs = getActionVerbs()
  const startsWithActionVerb = actionVerbs.some(verb =>
    text.trim().toLowerCase().startsWith(verb.toLowerCase())
  )
  if (startsWithActionVerb) {
    strengths.push('Starts with strong action verb')
    score += 10
  } else {
    improvements.push('Start with a strong action verb')
  }

  // Check length (ideal 1-2 lines, ~15-30 words)
  const wordCount = text.split(/\s+/).length
  if (wordCount >= 15 && wordCount <= 35) {
    strengths.push('Good length (not too short or long)')
    score += 10
  } else if (wordCount < 15) {
    improvements.push('Add more detail and context')
  } else {
    improvements.push('Consider shortening for clarity')
  }

  // Check for outcome/impact
  const impactWords = ['achieved', 'improved', 'increased', 'reduced', 'resulted', 'led to']
  const hasImpact = impactWords.some(word => text.toLowerCase().includes(word))
  if (hasImpact) {
    strengths.push('Demonstrates clear impact/outcome')
    score += 15
  } else {
    improvements.push('Add the outcome or result of your work')
  }

  // Ensure score is 0-100
  score = Math.min(100, Math.max(0, score))

  return {
    score,
    strengths,
    improvements
  }
}
