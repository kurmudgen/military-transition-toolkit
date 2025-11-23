/**
 * Emergency Translator Diagnosis Test
 * Tests the actual user input: "led 9 sailors in day to day combat operations"
 */

import {
  generateBulletVariations,
  analyzeResumeBullet
} from './src/utils/resumeTranslator.js';
import { jargonDictionary, replaceJargonInText } from './src/data/translations/jargonDictionary.js';
import { militaryPhrases } from './src/data/translations/militaryPhrases.js';
import { rankModifiers } from './src/data/translations/rankModifiers.js';

console.log("═══════════════════════════════════════════════════════════");
console.log("EMERGENCY TRANSLATOR DIAGNOSIS");
console.log("═══════════════════════════════════════════════════════════\n");

// Step 1: Verify database files loaded
console.log("STEP 1: DATABASE VERIFICATION");
console.log("────────────────────────────────────────────────────────────");
console.log(`✓ jargonDictionary loaded: ${jargonDictionary.length} terms`);
console.log(`✓ militaryPhrases loaded: ${militaryPhrases.length} phrases`);
console.log(`✓ rankModifiers loaded: ${Object.keys(rankModifiers).length} ranks\n`);

// Step 2: Test jargon replacement specifically
console.log("STEP 2: JARGON REPLACEMENT TEST");
console.log("────────────────────────────────────────────────────────────");
const testInput = "led 9 sailors in day to day combat operations";
console.log(`Original: "${testInput}"`);
console.log(`\nSearching for jargon terms in input...`);

// Check which jargon terms are in the input
const foundJargon = [];
const inputLower = testInput.toLowerCase();
jargonDictionary.forEach(({ military, civilian }) => {
  if (inputLower.includes(military.toLowerCase())) {
    foundJargon.push({ military, civilian });
  }
});

console.log(`Found ${foundJargon.length} jargon terms:`);
foundJargon.forEach(({ military, civilian }) => {
  console.log(`  - "${military}" → "${civilian}"`);
});

const jargonReplaced = replaceJargonInText(testInput);
console.log(`\nAfter jargon replacement: "${jargonReplaced}"`);

// Step 3: Check for military phrases
console.log("\n\nSTEP 3: MILITARY PHRASE DETECTION");
console.log("────────────────────────────────────────────────────────────");
console.log("Checking if input contains any military phrases...\n");

const foundPhrases = [];
militaryPhrases.forEach(phrase => {
  if (inputLower.includes(phrase.military.toLowerCase()) ||
      phrase.military.toLowerCase().includes("led")) {
    foundPhrases.push(phrase);
  }
});

console.log(`Found ${foundPhrases.length} relevant phrases:`);
foundPhrases.slice(0, 5).forEach(phrase => {
  console.log(`  - "${phrase.military}"`);
  console.log(`    Executive: "${phrase.civilian.executive}"`);
  console.log(`    Technical: "${phrase.civilian.technical}"`);
  console.log(`    Entry: "${phrase.civilian.entryLevel}"\n`);
});

// Step 4: Test full translation
console.log("\nSTEP 4: FULL TRANSLATION TEST");
console.log("────────────────────────────────────────────────────────────");
console.log(`Input: "${testInput}"`);
console.log(`Rank: E6\n`);

try {
  const variations = generateBulletVariations(testInput, "E6");
  console.log("RESULTS:");
  console.log(`\n🎯 Executive:\n   "${variations.executive}"`);
  console.log(`\n⚙️  Technical:\n   "${variations.technical}"`);
  console.log(`\n🌱 Entry-Level:\n   "${variations.entryLevel}"`);
} catch (error) {
  console.log(`❌ ERROR: ${error.message}`);
  console.log(`Stack: ${error.stack}`);
}

// Step 5: Test analysis
console.log("\n\nSTEP 5: BULLET ANALYSIS TEST");
console.log("────────────────────────────────────────────────────────────");
try {
  const analysis = analyzeResumeBullet(testInput, "E6");
  console.log("Analysis results:");
  console.log(`  Detected jargon: ${JSON.stringify(analysis.detectedJargon, null, 2)}`);
  console.log(`  Detected phrases: ${JSON.stringify(analysis.detectedPhrases, null, 2)}`);
} catch (error) {
  console.log(`❌ ERROR: ${error.message}`);
}

// Step 6: Expected vs Actual
console.log("\n\nSTEP 6: EXPECTED VS ACTUAL");
console.log("────────────────────────────────────────────────────────────");
console.log("EXPECTED OUTPUT:");
console.log('  Executive: "Directed team of 9 personnel in daily operational activities"');
console.log('  Technical: "Supervised team of 9 personnel in daily operational activities"');
console.log('  Entry: "Coordinated team of 9 personnel in daily operational activities"');
console.log("\nACTUAL OUTPUT: (see above)");

console.log("\n\n═══════════════════════════════════════════════════════════");
console.log("DIAGNOSIS COMPLETE");
console.log("═══════════════════════════════════════════════════════════");
