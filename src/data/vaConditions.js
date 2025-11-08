// VA Conditions Library - Condition-Specific Symptoms and Evidence
// This prevents showing orthopedic symptoms for mental health conditions, etc.

export const VA_CONDITIONS_LIBRARY = {
  // ═══════════════════════════════════════════════════════════
  // MENTAL HEALTH CONDITIONS
  // ═══════════════════════════════════════════════════════════

  "Anxiety Disorder": {
    category: "Mental Health",
    commonSymptoms: [
      "Panic attacks or racing heart",
      "Excessive worry or fear",
      "Difficulty concentrating",
      "Sleep disturbance",
      "Avoidance of situations/places",
      "Irritability or anger outbursts",
      "Hypervigilance or being easily startled",
      "Social withdrawal",
      "Physical symptoms (sweating, trembling, nausea)"
    ],
    functionalLimitations: [
      "Difficulty maintaining employment",
      "Trouble in social situations",
      "Inability to leave home",
      "Problems with relationships",
      "Difficulty concentrating at work",
      "Avoiding public places or crowds"
    ],
    evidenceTypes: [
      "Mental health treatment records",
      "Psychiatric evaluations",
      "Medication records",
      "Therapy notes",
      "Service records showing stressors",
      "Lay statements from family/friends"
    ]
  },

  "PTSD (Post-Traumatic Stress Disorder)": {
    category: "Mental Health",
    commonSymptoms: [
      "Nightmares or night terrors",
      "Flashbacks or intrusive thoughts",
      "Hypervigilance",
      "Exaggerated startle response",
      "Avoidance of trauma reminders",
      "Negative thoughts about self/world",
      "Difficulty experiencing positive emotions",
      "Irritability or aggressive behavior",
      "Self-destructive behavior",
      "Sleep disturbance"
    ],
    functionalLimitations: [
      "Difficulty maintaining employment",
      "Problems with relationships",
      "Social isolation",
      "Avoiding places/people/activities",
      "Difficulty concentrating",
      "Trouble completing tasks"
    ],
    evidenceTypes: [
      "Mental health treatment records",
      "PTSD diagnosis from VA or private provider",
      "Service records documenting stressor events",
      "Combat records or deployment history",
      "Buddy statements describing behavioral changes",
      "Lay statements from family"
    ]
  },

  "Depression": {
    category: "Mental Health",
    commonSymptoms: [
      "Persistent sadness or hopelessness",
      "Loss of interest in activities",
      "Fatigue or low energy",
      "Sleep problems (too much or too little)",
      "Appetite changes",
      "Difficulty concentrating",
      "Feelings of worthlessness or guilt",
      "Thoughts of death or suicide",
      "Physical aches without clear cause"
    ],
    functionalLimitations: [
      "Difficulty getting out of bed",
      "Unable to maintain work schedule",
      "Neglecting personal hygiene",
      "Social withdrawal",
      "Trouble completing daily tasks",
      "Problems with relationships"
    ],
    evidenceTypes: [
      "Mental health treatment records",
      "Medication prescriptions (antidepressants)",
      "Therapy notes",
      "Hospitalization records",
      "Lay statements from family/friends",
      "Service medical records"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MUSCULOSKELETAL CONDITIONS
  // ═══════════════════════════════════════════════════════════

  "Knee Pain": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Pain during activity",
      "Swelling or inflammation",
      "Limited range of motion",
      "Stiffness (especially morning)",
      "Instability or knee giving way",
      "Locking or catching sensation",
      "Grinding or popping sounds",
      "Pain when climbing stairs"
    ],
    functionalLimitations: [
      "Walking long distances",
      "Standing for long periods",
      "Climbing stairs",
      "Running or jogging",
      "Kneeling or squatting",
      "Lifting heavy objects",
      "Getting in/out of vehicles"
    ],
    evidenceTypes: [
      "X-rays or MRI results",
      "Orthopedic evaluation",
      "Physical therapy records",
      "Surgical records",
      "Service medical records",
      "Range of motion measurements",
      "Lay statements about functional impact"
    ]
  },

  "Back Pain (Lumbar Spine)": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Lower back pain",
      "Pain radiating to legs (sciatica)",
      "Muscle spasms",
      "Limited range of motion",
      "Numbness or tingling in legs",
      "Weakness in legs or feet",
      "Pain when bending or twisting",
      "Stiffness (especially morning)"
    ],
    functionalLimitations: [
      "Sitting for extended periods",
      "Standing for long periods",
      "Lifting or carrying objects",
      "Bending or stooping",
      "Walking long distances",
      "Sleeping comfortably",
      "Performing physically demanding work"
    ],
    evidenceTypes: [
      "X-rays, MRI, or CT scans",
      "Orthopedic or neurosurgery evaluations",
      "Physical therapy records",
      "Surgical records if applicable",
      "Pain management records",
      "Service medical records",
      "Range of motion tests"
    ]
  },

  "Shoulder Pain": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Pain with overhead motion",
      "Limited range of motion",
      "Weakness in affected shoulder",
      "Popping or grinding sensation",
      "Night pain affecting sleep",
      "Stiffness",
      "Instability or shoulder feeling loose",
      "Pain radiating down arm"
    ],
    functionalLimitations: [
      "Reaching overhead",
      "Lifting objects",
      "Carrying items",
      "Pushing or pulling",
      "Getting dressed",
      "Sleeping on affected side",
      "Performing job duties"
    ],
    evidenceTypes: [
      "X-rays or MRI",
      "Orthopedic evaluation",
      "Physical therapy records",
      "Surgical records",
      "Service medical records",
      "Range of motion measurements"
    ]
  },

  "Neck Pain (Cervical Spine)": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Neck pain or stiffness",
      "Pain radiating to shoulders or arms",
      "Headaches",
      "Limited range of motion",
      "Numbness or tingling in arms/hands",
      "Muscle spasms",
      "Grinding or popping sensation",
      "Difficulty sleeping"
    ],
    functionalLimitations: [
      "Turning head while driving",
      "Looking up or down for extended periods",
      "Carrying items",
      "Computer work",
      "Sleeping comfortably",
      "Overhead activities"
    ],
    evidenceTypes: [
      "X-rays, MRI, or CT scans",
      "Orthopedic or neurosurgery evaluation",
      "Physical therapy records",
      "Service medical records",
      "Range of motion tests"
    ]
  },

  "Hip Pain": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Pain in hip or groin",
      "Limited range of motion",
      "Stiffness (especially morning)",
      "Popping or clicking sensation",
      "Pain when walking or standing",
      "Limping",
      "Difficulty sleeping on affected side",
      "Pain radiating to thigh"
    ],
    functionalLimitations: [
      "Walking long distances",
      "Standing for long periods",
      "Climbing stairs",
      "Getting in/out of vehicles",
      "Bending or stooping",
      "Running or jogging"
    ],
    evidenceTypes: [
      "X-rays or MRI",
      "Orthopedic evaluation",
      "Physical therapy records",
      "Surgical records",
      "Service medical records",
      "Range of motion measurements"
    ]
  },

  "Ankle Pain": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Pain or swelling in ankle",
      "Instability or ankle giving way",
      "Limited range of motion",
      "Stiffness",
      "Difficulty bearing weight",
      "Popping or clicking",
      "Weakness",
      "Recurring sprains"
    ],
    functionalLimitations: [
      "Walking on uneven surfaces",
      "Running or jogging",
      "Climbing stairs",
      "Standing for long periods",
      "Participating in sports",
      "Wearing certain footwear"
    ],
    evidenceTypes: [
      "X-rays or MRI",
      "Orthopedic evaluation",
      "Physical therapy records",
      "Service medical records",
      "History of injuries"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // HEARING/EAR CONDITIONS
  // ═══════════════════════════════════════════════════════════

  "Tinnitus": {
    category: "Hearing",
    commonSymptoms: [
      "Ringing in ears (constant or intermittent)",
      "Buzzing, hissing, or roaring sounds",
      "Worse in quiet environments",
      "Difficulty concentrating",
      "Sleep disturbance",
      "Increased stress or anxiety",
      "Difficulty hearing conversations"
    ],
    functionalLimitations: [
      "Difficulty concentrating at work",
      "Trouble sleeping",
      "Difficulty in loud environments",
      "Problems with communication",
      "Increased irritability",
      "Social withdrawal"
    ],
    evidenceTypes: [
      "Audiogram showing hearing loss",
      "Tinnitus evaluation",
      "ENT examination records",
      "Service medical records",
      "Noise exposure documentation",
      "Lay statements about impact on daily life"
    ]
  },

  "Hearing Loss": {
    category: "Hearing",
    commonSymptoms: [
      "Difficulty understanding speech",
      "Need to increase TV/radio volume",
      "Frequently asking people to repeat",
      "Difficulty in noisy environments",
      "Tinnitus (ringing in ears)",
      "Feeling of fullness in ears"
    ],
    functionalLimitations: [
      "Difficulty in conversations",
      "Problems in group settings",
      "Trouble on telephone",
      "Safety concerns (can't hear alarms/warnings)",
      "Social isolation",
      "Employment difficulties"
    ],
    evidenceTypes: [
      "Audiogram results",
      "ENT examination",
      "Service medical records",
      "Noise exposure documentation",
      "Hearing aid prescription/records",
      "Lay statements from family/friends"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // SKIN CONDITIONS
  // ═══════════════════════════════════════════════════════════

  "Scars": {
    category: "Skin",
    commonSymptoms: [
      "Visible scarring",
      "Keloid or hypertrophic scarring",
      "Pain or tenderness at scar site",
      "Itching",
      "Discoloration",
      "Restricted movement (if over joint)",
      "Sensitivity to temperature"
    ],
    functionalLimitations: [
      "Limited range of motion (if over joint)",
      "Pain with movement",
      "Difficulty wearing certain clothing",
      "Self-consciousness in social situations",
      "Employment limitations (if visible)",
      "Skin breakdown or ulceration"
    ],
    evidenceTypes: [
      "Photographs of scars",
      "Medical records documenting injury",
      "Surgical records",
      "Measurements of scar size/area",
      "Range of motion testing (if applicable)",
      "Dermatology evaluation"
    ]
  },

  "Skin Conditions (Eczema, Psoriasis, etc.)": {
    category: "Skin",
    commonSymptoms: [
      "Itching or burning",
      "Redness or rash",
      "Dry, cracked skin",
      "Flaking or scaling",
      "Blisters or oozing",
      "Thickened skin",
      "Discoloration",
      "Pain or tenderness"
    ],
    functionalLimitations: [
      "Difficulty sleeping due to itching",
      "Embarrassment in social situations",
      "Difficulty wearing certain clothing",
      "Hand involvement affecting work",
      "Frequent treatment required",
      "Impact on daily activities"
    ],
    evidenceTypes: [
      "Dermatology records",
      "Photographs of affected areas",
      "Treatment records",
      "Medication prescriptions",
      "Service medical records",
      "Lay statements about flare-ups"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // SLEEP/RESPIRATORY CONDITIONS
  // ═══════════════════════════════════════════════════════════

  "Sleep Apnea": {
    category: "Respiratory/Sleep",
    commonSymptoms: [
      "Loud snoring",
      "Witnessed breathing pauses during sleep",
      "Gasping or choking during sleep",
      "Excessive daytime sleepiness",
      "Morning headaches",
      "Difficulty concentrating",
      "Irritability",
      "Night sweats"
    ],
    functionalLimitations: [
      "Falling asleep during day",
      "Difficulty staying awake while driving",
      "Reduced work performance",
      "Memory problems",
      "Relationship problems (due to snoring)",
      "Unable to function without CPAP"
    ],
    evidenceTypes: [
      "Sleep study results (polysomnography)",
      "CPAP usage records",
      "Pulmonology evaluation",
      "Service medical records",
      "Lay statements about symptoms",
      "Evidence of related conditions (obesity, hypertension)"
    ]
  },

  "Asthma": {
    category: "Respiratory",
    commonSymptoms: [
      "Shortness of breath",
      "Wheezing",
      "Chest tightness",
      "Coughing (especially at night)",
      "Difficulty breathing with exercise",
      "Triggered by allergens or cold air",
      "Use of rescue inhaler",
      "Fatigue"
    ],
    functionalLimitations: [
      "Exercise intolerance",
      "Difficulty in dusty/smoky environments",
      "Frequent use of medications",
      "ER visits for severe attacks",
      "Missing work due to symptoms",
      "Avoiding certain activities"
    ],
    evidenceTypes: [
      "Pulmonary function tests",
      "Pulmonology records",
      "Medication prescriptions (inhalers)",
      "ER/hospitalization records",
      "Service medical records",
      "Exposure documentation (burn pits, etc.)"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // DIGESTIVE CONDITIONS
  // ═══════════════════════════════════════════════════════════

  "IBS (Irritable Bowel Syndrome)": {
    category: "Digestive",
    commonSymptoms: [
      "Abdominal pain or cramping",
      "Bloating",
      "Diarrhea",
      "Constipation",
      "Alternating diarrhea and constipation",
      "Mucus in stool",
      "Urgency to have bowel movement",
      "Feeling of incomplete evacuation"
    ],
    functionalLimitations: [
      "Need for frequent bathroom access",
      "Difficulty traveling",
      "Problems attending meetings/events",
      "Diet restrictions",
      "Social anxiety about symptoms",
      "Employment difficulties",
      "Inability to be far from bathroom"
    ],
    evidenceTypes: [
      "Gastroenterology evaluation",
      "Colonoscopy results",
      "Service medical records",
      "Treatment records",
      "Medication prescriptions",
      "Lay statements about functional impact"
    ]
  },

  "GERD (Acid Reflux)": {
    category: "Digestive",
    commonSymptoms: [
      "Heartburn",
      "Regurgitation of food or liquid",
      "Chest pain",
      "Difficulty swallowing",
      "Chronic cough",
      "Hoarseness",
      "Sore throat",
      "Worse when lying down"
    ],
    functionalLimitations: [
      "Diet restrictions",
      "Difficulty sleeping",
      "Frequent medication use",
      "Impact on daily activities",
      "Avoiding certain positions"
    ],
    evidenceTypes: [
      "Gastroenterology records",
      "Endoscopy results",
      "Medication prescriptions",
      "Service medical records",
      "Treatment documentation"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // HEADACHE/NEUROLOGICAL CONDITIONS
  // ═══════════════════════════════════════════════════════════

  "Migraine Headaches": {
    category: "Neurological",
    commonSymptoms: [
      "Severe throbbing headache",
      "Nausea or vomiting",
      "Sensitivity to light",
      "Sensitivity to sound",
      "Visual disturbances (aura)",
      "Duration of 4-72 hours",
      "Worsened by physical activity"
    ],
    functionalLimitations: [
      "Missing work/school",
      "Unable to perform daily activities during episode",
      "Need to lie down in dark room",
      "Difficulty concentrating",
      "Reduced productivity",
      "Social/recreational limitations"
    ],
    evidenceTypes: [
      "Neurology evaluation",
      "Headache diary/log",
      "Medication records",
      "Service medical records",
      "MRI or CT scans (if performed)",
      "Lay statements about frequency and impact"
    ]
  },

  "TBI (Traumatic Brain Injury)": {
    category: "Neurological",
    commonSymptoms: [
      "Headaches",
      "Memory problems",
      "Difficulty concentrating",
      "Dizziness",
      "Irritability or mood changes",
      "Sleep disturbance",
      "Sensitivity to light/noise",
      "Balance problems",
      "Confusion"
    ],
    functionalLimitations: [
      "Difficulty with complex tasks",
      "Problems at work",
      "Relationship difficulties",
      "Need for assistance with daily activities",
      "Inability to drive",
      "Social isolation"
    ],
    evidenceTypes: [
      "Neurology/neuropsychology evaluations",
      "Brain imaging (CT, MRI)",
      "Cognitive testing results",
      "Service medical records documenting injury",
      "Treatment records",
      "Lay statements from family"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // ADDITIONAL CONDITIONS
  // ═══════════════════════════════════════════════════════════

  "Hypertension (High Blood Pressure)": {
    category: "Cardiovascular",
    commonSymptoms: [
      "Often no symptoms (silent)",
      "Headaches",
      "Dizziness",
      "Fatigue",
      "Vision changes",
      "Chest pain (severe cases)"
    ],
    functionalLimitations: [
      "Need for daily medication",
      "Frequent monitoring required",
      "Diet restrictions",
      "Exercise limitations",
      "Risk of serious complications"
    ],
    evidenceTypes: [
      "Blood pressure readings over time",
      "Medication prescriptions",
      "Cardiology records",
      "Service medical records",
      "Evidence of complications"
    ]
  },

  "Diabetes": {
    category: "Endocrine",
    commonSymptoms: [
      "Frequent urination",
      "Excessive thirst",
      "Fatigue",
      "Blurred vision",
      "Slow wound healing",
      "Numbness or tingling in feet",
      "Frequent infections"
    ],
    functionalLimitations: [
      "Daily insulin/medication required",
      "Frequent blood sugar monitoring",
      "Diet restrictions",
      "Risk of complications",
      "Foot care requirements",
      "Vision problems"
    ],
    evidenceTypes: [
      "Endocrinology records",
      "Blood sugar logs",
      "A1C test results",
      "Medication prescriptions",
      "Service medical records",
      "Evidence of complications"
    ]
  }
}

// Helper function to get all condition names for dropdown
export const getConditionNames = () => {
  return Object.keys(VA_CONDITIONS_LIBRARY).sort()
}

// Helper function to get conditions by category
export const getConditionsByCategory = () => {
  const categories = {}
  Object.entries(VA_CONDITIONS_LIBRARY).forEach(([name, data]) => {
    if (!categories[data.category]) {
      categories[data.category] = []
    }
    categories[data.category].push(name)
  })
  return categories
}

// Helper function to get condition data
export const getConditionData = (conditionName) => {
  return VA_CONDITIONS_LIBRARY[conditionName] || null
}
