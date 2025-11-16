const fs = require('fs');

// This script adds treatment arrays to all conditions in vaConditions.js
// It will insert treatments after evidenceTypes for each condition

const filePath = 'src/data/vaConditions.js';
let content = fs.readFileSync(filePath, 'utf8');

// Treatment mappings for specific conditions
// We'll add treatments for the most important ones first
const sampleTreatments = {
  "Low Back Pain": `treatments: [
      "Physical therapy",
      "Medications (NSAIDs, muscle relaxants)",
      "Injections (epidural, cortisone)",
      "Chiropractic care",
      "Surgery",
      "Using brace/support",
      "Heat/ice therapy",
      "Exercise and stretching",
      "Pain management program"
    ],`,

  "Generalized Anxiety Disorder": `treatments: [
      "Therapy (CBT, acceptance and commitment therapy)",
      "Medications (SSRIs, SNRIs, benzodiazepines)",
      "Stress management techniques",
      "Relaxation techniques (meditation, breathing exercises)",
      "Exercise",
      "Lifestyle modifications",
      "Support groups"
    ],`,

  "Tinnitus": `treatments: [
      "Hearing aids",
      "Sound therapy/masking devices",
      "Tinnitus retraining therapy (TRT)",
      "Cognitive Behavioral Therapy (CBT)",
      "Medications (for underlying causes or associated anxiety/depression)",
      "Avoiding loud noises",
      "Stress management",
      "Limiting caffeine and alcohol"
    ],`
};

console.log('This script helps add treatments. Run manual edits instead for full treatment list.');
console.log('Sample treatments defined for:', Object.keys(sampleTreatments));
