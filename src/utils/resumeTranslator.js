/**
 * Military Resume Translator Engine
 *
 * Converts military resume bullets into professional civilian language.
 * Uses real data from 19 MOS/rating career guides.
 *
 * Features:
 * - Translates military phrases to civilian language
 * - Replaces jargon with business terms
 * - Adjusts tone based on rank/pay grade
 * - Provides MOS-to-civilian job recommendations
 */

import { mosJobMappings, getCivilianJobs } from '../data/translations/mosJobMappings.js';
import {
  militaryPhrases,
  translatePhrase,
  getPhrasesByCategory
} from '../data/translations/militaryPhrases.js';
import {
  jargonDictionary,
  translateJargon,
  replaceJargonInText
} from '../data/translations/jargonDictionary.js';
import {
  rankModifiers,
  getRankModifier,
  getRecommendedVerbs,
  checkVerbForRank
} from '../data/translations/rankModifiers.js';

/**
 * Main translation function - converts military resume bullet to civilian language
 *
 * @param {string} militaryBullet - Original military resume bullet
 * @param {string} rank - Military rank (e.g., "E5", "E6", "O3")
 * @param {string} level - Desired civilian level: "executive", "technical", or "entryLevel"
 * @returns {string} Translated civilian resume bullet
 */
export function translateResumeBullet(militaryBullet, rank = "E5", level = "technical") {
  let translated = militaryBullet;

  // Step 1: Replace military jargon with civilian terms
  translated = replaceJargonInText(translated);

  // Step 2: Identify and translate military phrases
  translated = translateMilitaryPhrases(translated, level);

  // Step 3: Adjust action verbs based on rank
  translated = adjustVerbsForRank(translated, rank, level);

  // Step 4: Clean up and polish
  translated = polishTranslation(translated);

  return translated;
}

/**
 * Translate military phrases found in the bullet text
 * @param {string} text - Resume bullet text
 * @param {string} level - Civilian career level
 * @returns {string} Text with phrases translated
 */
function translateMilitaryPhrases(text, level) {
  let result = text;

  // Sort phrases by length (longest first) to avoid partial replacements
  const sortedPhrases = [...militaryPhrases].sort(
    (a, b) => b.military.length - a.military.length
  );

  sortedPhrases.forEach(phrase => {
    const militaryPattern = new RegExp(
      phrase.military.replace(/\[.*?\]/g, '\\d+'), // Replace [number] with digit pattern
      'gi'
    );

    if (militaryPattern.test(result)) {
      const civilianVersion = phrase.civilian[level] || phrase.civilian.technical;
      result = result.replace(militaryPattern, civilianVersion);
    }
  });

  return result;
}

/**
 * Adjust action verbs based on rank appropriateness
 * @param {string} text - Resume bullet text
 * @param {string} rank - Military rank
 * @param {string} level - Civilian level
 * @returns {string} Text with adjusted verbs
 */
function adjustVerbsForRank(text, rank, level) {
  const modifier = getRankModifier(rank);
  let result = text;

  // Check if current verb is in "avoid" list and suggest replacement
  const words = text.split(' ');
  const firstWord = words[0];

  if (firstWord) {
    const verbCheck = checkVerbForRank(firstWord, rank);
    if (!verbCheck.appropriate && verbCheck.suggestion) {
      words[0] = verbCheck.suggestion;
      result = words.join(' ');
    }
  }

  return result;
}

/**
 * Polish the translation for readability and professionalism
 * @param {string} text - Translated text
 * @returns {string} Polished text
 */
function polishTranslation(text) {
  let result = text;

  // Remove multiple spaces
  result = result.replace(/\s+/g, ' ');

  // Ensure first letter is capitalized
  result = result.charAt(0).toUpperCase() + result.slice(1);

  // Trim whitespace
  result = result.trim();

  return result;
}

/**
 * Detect military-specific phrases in text
 * @param {string} text - Text to analyze
 * @returns {Array} Detected military phrases
 */
export function detectMilitaryPhrases(text) {
  const detected = [];
  const lowerText = text.toLowerCase();

  militaryPhrases.forEach(phrase => {
    if (lowerText.includes(phrase.military.toLowerCase())) {
      detected.push({
        military: phrase.military,
        category: phrase.category,
        civilianOptions: phrase.civilian
      });
    }
  });

  return detected;
}

/**
 * Detect military jargon in text
 * @param {string} text - Text to analyze
 * @returns {Array} Detected jargon terms
 */
export function detectMilitaryJargon(text) {
  const detected = [];
  const lowerText = text.toLowerCase();

  jargonDictionary.forEach(item => {
    const pattern = new RegExp(`\\b${item.military}\\b`, 'i');
    if (pattern.test(text)) {
      detected.push({
        military: item.military,
        civilian: item.civilian,
        type: item.type
      });
    }
  });

  return detected;
}

/**
 * Generate multiple resume bullet variations
 * @param {string} militaryBullet - Original military resume bullet
 * @param {string} rank - Military rank
 * @returns {Object} Three variations (executive, technical, entryLevel)
 */
export function generateBulletVariations(militaryBullet, rank = "E5") {
  return {
    executive: translateResumeBullet(militaryBullet, rank, "executive"),
    technical: translateResumeBullet(militaryBullet, rank, "technical"),
    entryLevel: translateResumeBullet(militaryBullet, rank, "entryLevel")
  };
}

/**
 * Get civilian job recommendations for MOS/rating
 * @param {string} mosCode - MOS code or Navy rating
 * @returns {Object|null} Job recommendations
 */
export function getJobRecommendations(mosCode) {
  return getCivilianJobs(mosCode);
}

/**
 * Analyze resume bullet and provide recommendations
 * @param {string} militaryBullet - Resume bullet to analyze
 * @param {string} rank - Military rank
 * @returns {Object} Analysis with suggestions
 */
export function analyzeResumeBullet(militaryBullet, rank = "E5") {
  const detectedPhrases = detectMilitaryPhrases(militaryBullet);
  const detectedJargon = detectMilitaryJargon(militaryBullet);
  const rankInfo = getRankModifier(rank);

  // Check if action verb is appropriate
  const words = militaryBullet.trim().split(' ');
  const firstWord = words[0];
  const verbCheck = checkVerbForRank(firstWord, rank);

  return {
    original: militaryBullet,
    rank,
    rankInfo: {
      group: rankInfo.rankGroup,
      civilianEquivalent: rankInfo.civilianEquivalent,
      recommendedTone: rankInfo.resumeTone
    },
    detectedPhrases: detectedPhrases.length,
    detectedJargon: detectedJargon.length,
    actionVerbCheck: verbCheck,
    phrases: detectedPhrases,
    jargon: detectedJargon,
    recommendations: {
      replaceJargon: detectedJargon.length > 0,
      adjustVerb: !verbCheck.appropriate,
      suggestedVerb: verbCheck.suggestion,
      focusAreas: rankInfo.focusAreas
    },
    translations: generateBulletVariations(militaryBullet, rank)
  };
}

/**
 * Batch translate multiple resume bullets
 * @param {Array<string>} bullets - Array of military resume bullets
 * @param {string} rank - Military rank
 * @param {string} level - Civilian level
 * @returns {Array<Object>} Translated bullets with metadata
 */
export function batchTranslate(bullets, rank = "E5", level = "technical") {
  return bullets.map((bullet, index) => ({
    index,
    original: bullet,
    translated: translateResumeBullet(bullet, rank, level),
    variations: generateBulletVariations(bullet, rank),
    analysis: analyzeResumeBullet(bullet, rank)
  }));
}

/**
 * Get translation statistics
 * @returns {Object} Stats about available translations
 */
export function getTranslationStats() {
  return {
    totalMOS: mosJobMappings.length,
    totalPhrases: militaryPhrases.length,
    totalJargonTerms: jargonDictionary.length,
    rankGroups: Object.keys(rankModifiers).length,
    phraseCategories: [...new Set(militaryPhrases.map(p => p.category))],
    jargonTypes: [...new Set(jargonDictionary.map(j => j.type))]
  };
}

export default {
  translateResumeBullet,
  detectMilitaryPhrases,
  detectMilitaryJargon,
  generateBulletVariations,
  getJobRecommendations,
  analyzeResumeBullet,
  batchTranslate,
  getTranslationStats
};
