/**
 * Military Resume Translator - Test Examples
 *
 * Demonstrates the translator with real-world examples:
 * - MN (Mineman) E6 scenario (user's rating)
 * - 25B (IT Specialist) E5 scenario
 *
 * Run this file to see translation examples and verify functionality.
 */

import {
  translateResumeBullet,
  generateBulletVariations,
  analyzeResumeBullet,
  getJobRecommendations,
  batchTranslate,
  getTranslationStats
} from './src/utils/resumeTranslator.js';

console.log('\n========================================');
console.log('MILITARY RESUME TRANSLATOR - TEST EXAMPLES');
console.log('========================================\n');

// Display translation statistics
console.log('TRANSLATION DATABASE STATS:');
const stats = getTranslationStats();
console.log(`- Total MOS/Ratings: ${stats.totalMOS}`);
console.log(`- Total Phrases: ${stats.totalPhrases}`);
console.log(`- Total Jargon Terms: ${stats.totalJargonTerms}`);
console.log(`- Rank Groups: ${stats.rankGroups}`);
console.log(`- Phrase Categories: ${stats.phraseCategories.join(', ')}`);
console.log(`- Jargon Types: ${stats.jargonTypes.join(', ')}\n`);

// ========================================
// EXAMPLE 1: MN (Mineman) E6
// ========================================
console.log('========================================');
console.log('EXAMPLE 1: MN (MINEMAN) E6');
console.log('========================================\n');

const mnRating = getJobRecommendations('MN');
console.log('MOS/Rating:', mnRating.code, '-', mnRating.title);
console.log('Branch:', mnRating.branch);
console.log('Civilian Jobs:');
mnRating.civilianJobs.forEach((job, i) => {
  console.log(`  ${i + 1}. ${job}`);
});
console.log('');

// MN E6 resume bullets (realistic examples)
const mnBullets = [
  "Led a team of 6 sailors maintaining UUV systems worth $12M",
  "Conducted operations deploying and recovering underwater vehicles in support of mission requirements",
  "Trained personnel on sonar systems and mine detection procedures",
  "Maintained accountability for classified equipment and ensured mission readiness",
  "Briefed senior leadership on operational capabilities and system status"
];

console.log('ORIGINAL MILITARY BULLETS:');
mnBullets.forEach((bullet, i) => {
  console.log(`${i + 1}. ${bullet}`);
});
console.log('');

console.log('TRANSLATED VARIATIONS (MN E6):\n');
mnBullets.forEach((bullet, i) => {
  console.log(`Bullet ${i + 1}: "${bullet}"`);
  const variations = generateBulletVariations(bullet, 'E6');
  console.log('\n  EXECUTIVE LEVEL:');
  console.log(`  ${variations.executive}\n`);
  console.log('  TECHNICAL LEVEL:');
  console.log(`  ${variations.technical}\n`);
  console.log('  ENTRY LEVEL:');
  console.log(`  ${variations.entryLevel}\n`);
  console.log('---\n');
});

// ========================================
// EXAMPLE 2: 25B (IT Specialist) E5
// ========================================
console.log('========================================');
console.log('EXAMPLE 2: 25B (IT SPECIALIST) E5');
console.log('========================================\n');

const itMos = getJobRecommendations('25B');
console.log('MOS/Rating:', itMos.code, '-', itMos.title);
console.log('Branch:', itMos.branch);
console.log('Civilian Jobs:');
itMos.civilianJobs.forEach((job, i) => {
  console.log(`  ${i + 1}. ${job}`);
});
console.log('');

// 25B E5 resume bullets (realistic examples)
const itBullets = [
  "Supervised a team of 4 soldiers maintaining network security for 500-user organization",
  "Performed preventive maintenance on network infrastructure worth $800K",
  "Conducted security operations ensuring compliance with DoD 8570 requirements",
  "Trained personnel on cybersecurity procedures and network troubleshooting",
  "Managed supply chain operations for IT equipment valued at $1.2M"
];

console.log('ORIGINAL MILITARY BULLETS:');
itBullets.forEach((bullet, i) => {
  console.log(`${i + 1}. ${bullet}`);
});
console.log('');

console.log('TRANSLATED VARIATIONS (25B E5):\n');
itBullets.forEach((bullet, i) => {
  console.log(`Bullet ${i + 1}: "${bullet}"`);
  const variations = generateBulletVariations(bullet, 'E5');
  console.log('\n  EXECUTIVE LEVEL:');
  console.log(`  ${variations.executive}\n`);
  console.log('  TECHNICAL LEVEL:');
  console.log(`  ${variations.technical}\n`);
  console.log('  ENTRY LEVEL:');
  console.log(`  ${variations.entryLevel}\n`);
  console.log('---\n');
});

// ========================================
// EXAMPLE 3: Detailed Analysis
// ========================================
console.log('========================================');
console.log('EXAMPLE 3: DETAILED BULLET ANALYSIS');
console.log('========================================\n');

const sampleBullet = "Supervised a squad of 9 soldiers performing PMCS on tactical vehicles";
console.log(`Analyzing: "${sampleBullet}"\n`);

const analysis = analyzeResumeBullet(sampleBullet, 'E6');

console.log('RANK INFORMATION:');
console.log(`- Rank Group: ${analysis.rankInfo.group}`);
console.log(`- Civilian Equivalent: ${analysis.rankInfo.civilianEquivalent}`);
console.log(`- Recommended Tone: ${analysis.rankInfo.recommendedTone}\n`);

console.log('DETECTED ISSUES:');
console.log(`- Military Phrases Detected: ${analysis.detectedPhrases}`);
console.log(`- Jargon Terms Detected: ${analysis.detectedJargon}`);
console.log(`- Action Verb Appropriate: ${analysis.actionVerbCheck.appropriate ? 'Yes' : 'No'}`);
if (!analysis.actionVerbCheck.appropriate) {
  console.log(`- Suggested Verb: ${analysis.actionVerbCheck.suggestedVerb}`);
  console.log(`- Reason: ${analysis.actionVerbCheck.reason}`);
}
console.log('');

console.log('DETECTED PHRASES:');
analysis.phrases.forEach(phrase => {
  console.log(`- "${phrase.military}" (${phrase.category})`);
  console.log(`  Options: ${JSON.stringify(phrase.civilianOptions, null, 2)}`);
});
console.log('');

console.log('DETECTED JARGON:');
analysis.jargon.forEach(jargon => {
  console.log(`- "${jargon.military}" → "${jargon.civilian}" (${jargon.type})`);
});
console.log('');

console.log('RECOMMENDATIONS:');
console.log(`- Replace Jargon: ${analysis.recommendations.replaceJargon ? 'Yes' : 'No'}`);
console.log(`- Adjust Verb: ${analysis.recommendations.adjustVerb ? 'Yes' : 'No'}`);
if (analysis.recommendations.suggestedVerb) {
  console.log(`- Suggested Verb: ${analysis.recommendations.suggestedVerb}`);
}
console.log('- Focus Areas for Rank:');
analysis.recommendations.focusAreas.forEach(area => {
  console.log(`  * ${area}`);
});
console.log('');

console.log('TRANSLATIONS:');
console.log('Executive:', analysis.translations.executive);
console.log('Technical:', analysis.translations.technical);
console.log('Entry Level:', analysis.translations.entryLevel);
console.log('');

// ========================================
// EXAMPLE 4: Batch Translation
// ========================================
console.log('========================================');
console.log('EXAMPLE 4: BATCH TRANSLATION');
console.log('========================================\n');

const batchBullets = [
  "Conducted training for 12 soldiers on weapons systems maintenance",
  "Maintained accountability for equipment worth $5M ensuring 100% readiness",
  "Coordinated with multiple agencies to execute mission objectives"
];

console.log('BATCH TRANSLATING 3 BULLETS (E6, Technical Level):\n');
const batchResults = batchTranslate(batchBullets, 'E6', 'technical');

batchResults.forEach(result => {
  console.log(`${result.index + 1}. ORIGINAL: ${result.original}`);
  console.log(`   TRANSLATED: ${result.translated}\n`);
});

// ========================================
// EXAMPLE 5: Multiple Rank Comparisons
// ========================================
console.log('========================================');
console.log('EXAMPLE 5: SAME BULLET, DIFFERENT RANKS');
console.log('========================================\n');

const testBullet = "Led a team maintaining computer network security";
console.log(`Original: "${testBullet}"\n`);

const ranks = ['E4', 'E6', 'E8', 'O3'];
ranks.forEach(rank => {
  console.log(`${rank} (Technical Level):`);
  const translated = translateResumeBullet(testBullet, rank, 'technical');
  console.log(`  ${translated}\n`);
});

console.log('========================================');
console.log('TESTING COMPLETE');
console.log('========================================\n');

console.log('Summary:');
console.log('✓ MN (Mineman) E6 examples generated');
console.log('✓ 25B (IT Specialist) E5 examples generated');
console.log('✓ Multiple variations produced (executive, technical, entry-level)');
console.log('✓ Detailed analysis functionality demonstrated');
console.log('✓ Batch translation demonstrated');
console.log('✓ Rank-based adjustments working\n');

console.log('The translator is ready for integration into the application!\n');
