// VA Conditions Library - 100+ Conditions with Detailed Information
// Each condition includes symptoms, functional limitations, and evidence types

export const VA_CONDITIONS_LIBRARY = {
  // ═══════════════════════════════════════════════════════════
  // MUSCULOSKELETAL CONDITIONS (30+)
  // ═══════════════════════════════════════════════════════════

  "Low Back Pain": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Chronic lower back pain",
      "Pain radiating to legs (sciatica)",
      "Difficulty standing long periods",
      "Pain with bending/lifting/twisting",
      "Morning stiffness",
      "Muscle spasms",
      "Reduced range of motion",
      "Pain interferes with sleep",
      "Numbness/tingling in legs"
    ],
    functionalLimitations: [
      "Sitting for extended periods",
      "Standing for long periods",
      "Lifting or carrying heavy objects",
      "Bending or stooping",
      "Walking long distances",
      "Sleeping comfortably",
      "Performing physically demanding work"
    ],
    treatments: [
      "Physical therapy",
      "Medications (NSAIDs, muscle relaxants)",
      "Injections (epidural, cortisone)",
      "Chiropractic care",
      "Surgery",
      "Using brace/support",
      "Heat/ice therapy",
      "Exercise and stretching",
      "Pain management program"
    ],
    evidenceTypes: [
      "Service medical records showing back complaints",
      "X-rays, MRI, or CT scans",
      "Orthopedic or neurosurgery evaluations",
      "Physical therapy records",
      "Pain management records",
      "Buddy statements from service members",
      "Nexus letter from doctor",
      "Range of motion measurements"
    ]
  },

  "Degenerative Disc Disease": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Chronic back or neck pain",
      "Pain worse with sitting or bending",
      "Pain radiating to extremities",
      "Weakness in arms or legs",
      "Numbness or tingling",
      "Stiffness",
      "Pain relief when changing positions",
      "Muscle spasms"
    ],
    functionalLimitations: [
      "Prolonged sitting or standing",
      "Heavy lifting",
      "Bending and twisting",
      "Physically demanding work",
      "Driving long distances",
      "Sleep disturbances"
    ],
    evidenceTypes: [
      "MRI or CT scans showing disc degeneration",
      "Service medical records",
      "Neurosurgery or orthopedic evaluations",
      "Pain management documentation",
      "Physical therapy records",
      "Nexus letter"
    ]
  },

  "Sciatica": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Sharp pain from lower back to leg",
      "Burning or tingling down the leg",
      "Numbness in leg or foot",
      "Weakness in affected leg",
      "Pain worse with sitting",
      "Difficulty standing up",
      "Electric shock-like pain"
    ],
    functionalLimitations: [
      "Sitting for long periods",
      "Walking or standing",
      "Climbing stairs",
      "Driving",
      "Sleeping on certain sides",
      "Physical activity"
    ],
    evidenceTypes: [
      "MRI showing nerve compression",
      "Neurological examination",
      "EMG/nerve conduction studies",
      "Service medical records",
      "Orthopedic evaluation",
      "Treatment records"
    ]
  },

  "Cervical Strain": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Neck pain and stiffness",
      "Reduced range of motion",
      "Headaches",
      "Shoulder pain",
      "Pain radiating to arms",
      "Muscle spasms",
      "Difficulty turning head"
    ],
    functionalLimitations: [
      "Turning head while driving",
      "Looking up or down",
      "Computer work",
      "Sleeping comfortably",
      "Carrying items",
      "Overhead activities"
    ],
    evidenceTypes: [
      "Cervical spine X-rays or MRI",
      "Service medical records",
      "Orthopedic or chiropractic records",
      "Physical therapy documentation",
      "Range of motion tests"
    ]
  },

  "Rotator Cuff Tear": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Shoulder pain, especially at night",
      "Pain with overhead activities",
      "Weakness in shoulder",
      "Difficulty reaching behind back",
      "Popping or clicking",
      "Limited range of motion",
      "Muscle atrophy"
    ],
    functionalLimitations: [
      "Reaching overhead",
      "Lifting objects",
      "Carrying items",
      "Sleeping on affected side",
      "Getting dressed",
      "Work activities requiring shoulder use"
    ],
    evidenceTypes: [
      "MRI showing rotator cuff tear",
      "Orthopedic evaluation",
      "Surgical records if applicable",
      "Physical therapy records",
      "Service medical records documenting injury",
      "Range of motion measurements"
    ]
  },

  "Shoulder Impingement": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Pain with overhead motion",
      "Weakness in shoulder",
      "Night pain",
      "Difficulty reaching",
      "Catching sensation",
      "Limited range of motion"
    ],
    functionalLimitations: [
      "Overhead reaching",
      "Lifting",
      "Pushing/pulling",
      "Sleeping on affected side",
      "Work requiring shoulder movement"
    ],
    evidenceTypes: [
      "MRI or ultrasound",
      "Orthopedic examination",
      "Physical therapy records",
      "Service medical records",
      "Range of motion testing"
    ]
  },

  "Labral Tear (Shoulder)": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Deep shoulder pain",
      "Catching or locking",
      "Instability",
      "Decreased range of motion",
      "Weakness",
      "Pain with specific movements"
    ],
    functionalLimitations: [
      "Throwing motions",
      "Overhead activities",
      "Lifting",
      "Carrying",
      "Sports activities"
    ],
    evidenceTypes: [
      "MRI arthrogram showing labral tear",
      "Orthopedic evaluation",
      "Surgical records",
      "Service medical records",
      "Physical therapy documentation"
    ]
  },

  "Knee Meniscus Tear": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Knee pain",
      "Swelling",
      "Catching or locking",
      "Instability",
      "Difficulty straightening knee",
      "Popping sensation",
      "Pain with twisting"
    ],
    functionalLimitations: [
      "Squatting or kneeling",
      "Climbing stairs",
      "Walking long distances",
      "Running",
      "Sports activities",
      "Getting in/out of vehicles"
    ],
    evidenceTypes: [
      "MRI showing meniscus tear",
      "Orthopedic evaluation",
      "Surgical records (arthroscopy)",
      "Service medical records",
      "Physical therapy records"
    ]
  },

  "Patellofemoral Syndrome": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Anterior knee pain",
      "Pain worse with stairs",
      "Pain after prolonged sitting",
      "Grinding sensation",
      "Instability",
      "Swelling"
    ],
    functionalLimitations: [
      "Climbing stairs",
      "Squatting",
      "Kneeling",
      "Prolonged sitting",
      "Running or jogging"
    ],
    evidenceTypes: [
      "Orthopedic examination",
      "X-rays or MRI",
      "Physical therapy records",
      "Service medical records"
    ]
  },

  "ACL/PCL/MCL/LCL Tear": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Knee instability",
      "Severe pain at injury",
      "Swelling",
      "Limited range of motion",
      "Difficulty bearing weight",
      "Feeling of knee giving way"
    ],
    functionalLimitations: [
      "Running or sports",
      "Walking on uneven surfaces",
      "Sudden direction changes",
      "Climbing stairs",
      "Physical labor"
    ],
    evidenceTypes: [
      "MRI showing ligament tear",
      "Orthopedic evaluation",
      "Surgical records",
      "Service medical records documenting injury",
      "Physical therapy records"
    ]
  },

  "Hip Pain/Arthritis": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Hip or groin pain",
      "Stiffness",
      "Limited range of motion",
      "Pain with weight bearing",
      "Limping",
      "Pain radiating to thigh",
      "Difficulty sleeping on side"
    ],
    functionalLimitations: [
      "Walking long distances",
      "Climbing stairs",
      "Getting in/out of vehicles",
      "Bending over",
      "Standing for long periods"
    ],
    evidenceTypes: [
      "Hip X-rays or MRI",
      "Orthopedic evaluation",
      "Service medical records",
      "Range of motion measurements",
      "Surgical records if applicable"
    ]
  },

  "Ankle Pain/Instability": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Ankle pain or swelling",
      "Instability or giving way",
      "Recurring sprains",
      "Stiffness",
      "Weakness",
      "Difficulty on uneven surfaces"
    ],
    functionalLimitations: [
      "Walking on uneven terrain",
      "Running",
      "Climbing stairs",
      "Standing for long periods",
      "Sports activities"
    ],
    evidenceTypes: [
      "Ankle X-rays or MRI",
      "Orthopedic evaluation",
      "Service medical records",
      "History of recurrent injuries",
      "Physical therapy records"
    ]
  },

  "Plantar Fasciitis": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Heel pain, especially in morning",
      "Pain after prolonged standing",
      "Pain worse after exercise",
      "Tenderness in heel",
      "Stiffness in foot"
    ],
    functionalLimitations: [
      "Standing for long periods",
      "Walking or running",
      "Climbing stairs",
      "Work requiring standing",
      "Exercise activities"
    ],
    evidenceTypes: [
      "Podiatry examination",
      "X-rays showing heel spurs",
      "Service medical records",
      "Treatment documentation",
      "Orthotic prescriptions"
    ]
  },

  "Carpal Tunnel Syndrome": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Numbness in thumb, index, middle fingers",
      "Tingling or burning",
      "Weakness in hand",
      "Difficulty gripping",
      "Pain radiating to arm",
      "Night pain"
    ],
    functionalLimitations: [
      "Typing or computer work",
      "Gripping objects",
      "Fine motor tasks",
      "Sleeping without wrist braces",
      "Manual labor"
    ],
    evidenceTypes: [
      "EMG/nerve conduction studies",
      "Neurological examination",
      "Service medical records",
      "Surgical records if applicable",
      "Occupational medicine records"
    ]
  },

  "Tennis Elbow/Lateral Epicondylitis": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Outer elbow pain",
      "Weak grip strength",
      "Pain with grasping",
      "Tenderness at elbow",
      "Pain radiating to forearm"
    ],
    functionalLimitations: [
      "Gripping objects",
      "Lifting",
      "Turning doorknobs",
      "Shaking hands",
      "Sports activities"
    ],
    evidenceTypes: [
      "Orthopedic examination",
      "Service medical records",
      "Treatment records",
      "MRI if performed"
    ]
  },

  "Golfer's Elbow/Medial Epicondylitis": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Inner elbow pain",
      "Weak grip",
      "Pain with wrist flexion",
      "Tenderness at inner elbow",
      "Stiffness"
    ],
    functionalLimitations: [
      "Gripping",
      "Lifting",
      "Throwing motions",
      "Work activities requiring elbow use"
    ],
    evidenceTypes: [
      "Orthopedic examination",
      "Service medical records",
      "Treatment documentation"
    ]
  },

  "Arthritis (General)": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Joint pain",
      "Stiffness, especially morning",
      "Swelling",
      "Reduced range of motion",
      "Warmth in joint",
      "Deformity"
    ],
    functionalLimitations: [
      "Manual tasks",
      "Walking or standing",
      "Climbing stairs",
      "Gripping objects",
      "Physical activity"
    ],
    evidenceTypes: [
      "X-rays showing arthritis",
      "Rheumatology evaluation",
      "Service medical records",
      "Lab tests (RA factor, etc.)",
      "Treatment records"
    ]
  },

  "TMJ (Temporomandibular Joint Disorder)": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Jaw pain",
      "Clicking or popping",
      "Difficulty opening mouth",
      "Locking jaw",
      "Headaches",
      "Ear pain"
    ],
    functionalLimitations: [
      "Chewing",
      "Speaking for long periods",
      "Yawning",
      "Dental work"
    ],
    evidenceTypes: [
      "Dental/TMJ specialist evaluation",
      "Imaging studies",
      "Service medical records",
      "Treatment documentation"
    ]
  },

  "Radiculopathy": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Radiating pain",
      "Numbness or tingling",
      "Weakness in extremities",
      "Loss of reflexes",
      "Burning sensations"
    ],
    functionalLimitations: [
      "Using affected limb",
      "Manual work",
      "Gripping or lifting",
      "Walking or standing"
    ],
    evidenceTypes: [
      "MRI showing nerve compression",
      "EMG/nerve studies",
      "Neurological examination",
      "Service medical records"
    ]
  },

  "Spinal Stenosis": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Back or neck pain",
      "Numbness in extremities",
      "Weakness",
      "Balance problems",
      "Pain with walking",
      "Cramping in legs"
    ],
    functionalLimitations: [
      "Walking long distances",
      "Standing",
      "Bending backwards",
      "Physical activities"
    ],
    evidenceTypes: [
      "MRI or CT showing stenosis",
      "Neurosurgery evaluation",
      "Service medical records",
      "Surgical records if applicable"
    ]
  },

  "Herniated Disc": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Back or neck pain",
      "Radiating pain to extremities",
      "Numbness or tingling",
      "Weakness",
      "Pain worse with movement"
    ],
    functionalLimitations: [
      "Lifting or bending",
      "Sitting or standing long periods",
      "Physical work",
      "Sleeping comfortably"
    ],
    evidenceTypes: [
      "MRI showing herniated disc",
      "Neurosurgery or orthopedic evaluation",
      "Service medical records",
      "Surgical records if applicable",
      "Physical therapy records"
    ]
  },

  "Spondylolisthesis": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Lower back pain",
      "Leg pain or numbness",
      "Muscle tightness",
      "Difficulty standing",
      "Weakness in legs"
    ],
    functionalLimitations: [
      "Standing or walking",
      "Physical activities",
      "Bending",
      "Lifting"
    ],
    evidenceTypes: [
      "X-rays or MRI showing vertebral slippage",
      "Orthopedic or neurosurgery evaluation",
      "Service medical records",
      "Surgical records if applicable"
    ]
  },

  "Flat Feet (Pes Planus)": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Foot pain",
      "Ankle pain",
      "Difficulty standing on toes",
      "Swelling along inner foot",
      "Back or leg pain"
    ],
    functionalLimitations: [
      "Standing for long periods",
      "Walking or running",
      "Military footwear requirements",
      "Physical training"
    ],
    evidenceTypes: [
      "Podiatry examination",
      "Foot X-rays",
      "Service medical records",
      "Orthotic prescriptions"
    ]
  },

  "Bunions": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Painful bump at base of big toe",
      "Swelling and redness",
      "Restricted toe movement",
      "Difficulty wearing shoes",
      "Corns or calluses"
    ],
    functionalLimitations: [
      "Wearing military boots",
      "Walking or running",
      "Standing",
      "Physical training"
    ],
    evidenceTypes: [
      "Foot X-rays",
      "Podiatry examination",
      "Service medical records",
      "Surgical records if applicable"
    ]
  },

  "Gout": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Sudden severe joint pain",
      "Swelling and redness",
      "Warmth in joint",
      "Limited range of motion",
      "Recurrent attacks"
    ],
    functionalLimitations: [
      "Walking during flares",
      "Wearing shoes",
      "Physical activities",
      "Work during attacks"
    ],
    evidenceTypes: [
      "Uric acid lab tests",
      "Joint aspiration results",
      "Rheumatology records",
      "Service medical records",
      "Medication records"
    ]
  },

  "Fibromyalgia": {
    category: "Musculoskeletal",
    commonSymptoms: [
      "Widespread chronic pain",
      "Fatigue",
      "Sleep disturbances",
      "Cognitive difficulties (fibro fog)",
      "Tender points",
      "Headaches",
      "Depression/anxiety"
    ],
    functionalLimitations: [
      "Physical activities",
      "Working full-time",
      "Concentrating",
      "Daily tasks during flares",
      "Sleep quality"
    ],
    evidenceTypes: [
      "Rheumatology diagnosis",
      "Documentation of tender points",
      "Service medical records",
      "Treatment records",
      "Sleep study if applicable"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MENTAL HEALTH CONDITIONS (15+)
  // ═══════════════════════════════════════════════════════════

  "PTSD (Post-Traumatic Stress Disorder) - Combat": {
    category: "Mental Health",
    commonSymptoms: [
      "Nightmares or flashbacks",
      "Intrusive thoughts",
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
      "Combat records or deployment history",
      "Service records documenting stressor events",
      "Buddy statements describing behavioral changes",
      "Lay statements from family"
    ]
  },

  "PTSD - Military Sexual Trauma (MST)": {
    category: "Mental Health",
    commonSymptoms: [
      "Flashbacks of trauma",
      "Nightmares",
      "Severe anxiety",
      "Hypervigilance",
      "Avoidance of triggers",
      "Trust issues",
      "Difficulty with intimacy",
      "Depression",
      "Substance abuse"
    ],
    functionalLimitations: [
      "Relationships and intimacy",
      "Working with certain genders",
      "Social situations",
      "Medical examinations",
      "Employment stability"
    ],
    evidenceTypes: [
      "Mental health treatment records",
      "VA MST coordinator documentation",
      "PTSD diagnosis",
      "Therapy notes",
      "Behavioral markers from service",
      "Lay statements"
    ]
  },

  "PTSD - Non-Combat": {
    category: "Mental Health",
    commonSymptoms: [
      "Re-experiencing trauma",
      "Avoidance behaviors",
      "Hyperarousal",
      "Negative mood changes",
      "Sleep disturbances",
      "Anxiety",
      "Depression"
    ],
    functionalLimitations: [
      "Employment difficulties",
      "Social functioning",
      "Relationship problems",
      "Daily activities",
      "Concentration"
    ],
    evidenceTypes: [
      "Mental health treatment records",
      "Documentation of stressor event",
      "PTSD diagnosis",
      "Service records",
      "Lay statements"
    ]
  },

  "Major Depressive Disorder": {
    category: "Mental Health",
    commonSymptoms: [
      "Persistent sadness or hopelessness",
      "Loss of interest in activities",
      "Fatigue or low energy",
      "Sleep problems (insomnia or hypersomnia)",
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
      "PHQ-9 scores",
      "Service medical records",
      "Lay statements from family/friends"
    ]
  },

  "Generalized Anxiety Disorder": {
    category: "Mental Health",
    commonSymptoms: [
      "Excessive worry or fear",
      "Restlessness",
      "Fatigue",
      "Difficulty concentrating",
      "Irritability",
      "Muscle tension",
      "Sleep disturbance"
    ],
    functionalLimitations: [
      "Work performance",
      "Social situations",
      "Decision making",
      "Daily activities",
      "Relationships"
    ],
    treatments: [
      "Therapy (CBT, acceptance and commitment therapy)",
      "Medications (SSRIs, SNRIs, benzodiazepines)",
      "Stress management techniques",
      "Relaxation techniques (meditation, breathing exercises)",
      "Exercise",
      "Lifestyle modifications",
      "Support groups"
    ],
    evidenceTypes: [
      "Mental health treatment records",
      "GAD-7 scores",
      "Medication records",
      "Therapy notes",
      "Service medical records"
    ]
  },

  "Panic Disorder": {
    category: "Mental Health",
    commonSymptoms: [
      "Recurrent panic attacks",
      "Heart palpitations",
      "Sweating and trembling",
      "Shortness of breath",
      "Fear of losing control",
      "Fear of dying",
      "Avoidance of places where attacks occurred"
    ],
    functionalLimitations: [
      "Leaving home",
      "Driving",
      "Public places",
      "Work attendance",
      "Social activities"
    ],
    evidenceTypes: [
      "Mental health diagnosis",
      "Treatment records",
      "Medication prescriptions",
      "ER visits for panic attacks",
      "Service medical records"
    ]
  },

  "Bipolar Disorder": {
    category: "Mental Health",
    commonSymptoms: [
      "Manic episodes (elevated mood, increased activity)",
      "Depressive episodes",
      "Rapid mood changes",
      "Impulsive behavior",
      "Sleep disturbances",
      "Difficulty concentrating"
    ],
    functionalLimitations: [
      "Employment stability",
      "Relationships",
      "Financial management during manic episodes",
      "Daily functioning",
      "Social relationships"
    ],
    evidenceTypes: [
      "Psychiatric diagnosis and treatment",
      "Medication records (mood stabilizers)",
      "Hospitalization records",
      "Service medical records",
      "Treatment history"
    ]
  },

  "Insomnia (Chronic Sleep Disturbance)": {
    category: "Mental Health",
    commonSymptoms: [
      "Difficulty falling asleep",
      "Difficulty staying asleep",
      "Early morning awakening",
      "Non-restorative sleep",
      "Daytime fatigue",
      "Irritability",
      "Difficulty concentrating"
    ],
    functionalLimitations: [
      "Work performance",
      "Daytime functioning",
      "Operating vehicles",
      "Mood regulation",
      "Physical health"
    ],
    evidenceTypes: [
      "Sleep study results",
      "Mental health records",
      "Sleep medication prescriptions",
      "Service medical records",
      "Treatment documentation"
    ]
  },

  "Adjustment Disorder": {
    category: "Mental Health",
    commonSymptoms: [
      "Stress reaction to life changes",
      "Anxiety or depression",
      "Difficulty coping",
      "Behavioral changes",
      "Sleep or appetite changes"
    ],
    functionalLimitations: [
      "Work performance",
      "Relationships",
      "Daily activities",
      "Social functioning"
    ],
    evidenceTypes: [
      "Mental health diagnosis",
      "Treatment records",
      "Documentation of stressor",
      "Service medical records"
    ]
  },

  "Substance Use Disorder": {
    category: "Mental Health",
    commonSymptoms: [
      "Inability to control use",
      "Cravings",
      "Tolerance",
      "Withdrawal symptoms",
      "Neglecting responsibilities",
      "Continued use despite consequences"
    ],
    functionalLimitations: [
      "Employment",
      "Relationships",
      "Financial stability",
      "Legal problems",
      "Health issues"
    ],
    evidenceTypes: [
      "Substance abuse treatment records",
      "Hospitalization or detox records",
      "VA substance abuse program participation",
      "Service medical records",
      "Nexus to service-connected condition"
    ]
  },

  "Social Anxiety Disorder": {
    category: "Mental Health",
    commonSymptoms: [
      "Fear of social situations",
      "Fear of judgment or embarrassment",
      "Avoidance of social interactions",
      "Physical symptoms in social settings",
      "Difficulty making friends"
    ],
    functionalLimitations: [
      "Job interviews",
      "Public speaking",
      "Social gatherings",
      "Team work environments",
      "Daily interactions"
    ],
    evidenceTypes: [
      "Mental health diagnosis",
      "Treatment records",
      "Medication prescriptions",
      "Therapy notes",
      "Service medical records"
    ]
  },

  "Agoraphobia": {
    category: "Mental Health",
    commonSymptoms: [
      "Fear of open or crowded spaces",
      "Fear of leaving home",
      "Panic symptoms in certain situations",
      "Avoidance behaviors"
    ],
    functionalLimitations: [
      "Leaving home",
      "Shopping or errands",
      "Using public transportation",
      "Employment outside home",
      "Social activities"
    ],
    evidenceTypes: [
      "Mental health diagnosis",
      "Treatment records",
      "Medication records",
      "Documentation of limitations"
    ]
  },

  "Obsessive-Compulsive Disorder (OCD)": {
    category: "Mental Health",
    commonSymptoms: [
      "Intrusive obsessive thoughts",
      "Compulsive behaviors",
      "Anxiety when unable to perform rituals",
      "Time-consuming rituals",
      "Distress from obsessions"
    ],
    functionalLimitations: [
      "Work productivity",
      "Daily activities delayed by rituals",
      "Social functioning",
      "Quality of life"
    ],
    evidenceTypes: [
      "Mental health diagnosis",
      "Treatment records",
      "Medication prescriptions",
      "Y-BOCS scores",
      "Service medical records"
    ]
  },

  "Eating Disorders": {
    category: "Mental Health",
    commonSymptoms: [
      "Abnormal eating behaviors",
      "Preoccupation with food/weight",
      "Body image distortion",
      "Binge eating or restricting",
      "Purging behaviors"
    ],
    functionalLimitations: [
      "Physical health complications",
      "Social eating situations",
      "Work performance",
      "Relationships"
    ],
    evidenceTypes: [
      "Mental health and medical records",
      "Nutritionist documentation",
      "Hospitalization records",
      "Service medical records"
    ]
  },

  "TBI - Cognitive/Mood Effects": {
    category: "Mental Health",
    commonSymptoms: [
      "Memory problems",
      "Difficulty concentrating",
      "Mood swings",
      "Irritability",
      "Depression",
      "Anxiety",
      "Personality changes"
    ],
    functionalLimitations: [
      "Work performance",
      "Relationships",
      "Daily tasks",
      "Social functioning",
      "Independent living"
    ],
    evidenceTypes: [
      "TBI diagnosis and documentation",
      "Neuropsychological testing",
      "Mental health treatment",
      "Service medical records documenting injury",
      "Brain imaging"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // NEUROLOGICAL CONDITIONS (10+)
  // ═══════════════════════════════════════════════════════════

  "Migraines": {
    category: "Neurological",
    commonSymptoms: [
      "Severe throbbing headache",
      "Nausea or vomiting",
      "Sensitivity to light (photophobia)",
      "Sensitivity to sound (phonophobia)",
      "Visual disturbances (aura)",
      "Duration of 4-72 hours",
      "Worsened by physical activity"
    ],
    functionalLimitations: [
      "Missing work during episodes",
      "Unable to perform daily activities",
      "Need to lie down in dark room",
      "Difficulty concentrating",
      "Reduced productivity",
      "Social/recreational limitations"
    ],
    evidenceTypes: [
      "Neurology evaluation",
      "Headache diary/log showing frequency",
      "Medication records (preventive and abortive)",
      "Service medical records",
      "MRI or CT scans if performed",
      "Lay statements about impact on daily life"
    ]
  },

  "Tension Headaches": {
    category: "Neurological",
    commonSymptoms: [
      "Bilateral head pain",
      "Tight band-like sensation",
      "Mild to moderate pain",
      "Muscle tension in neck/shoulders",
      "Not worsened by activity"
    ],
    functionalLimitations: [
      "Work concentration",
      "Daily activities",
      "Sleep quality"
    ],
    evidenceTypes: [
      "Medical diagnosis",
      "Headache diary",
      "Treatment records",
      "Service medical records"
    ]
  },

  "Peripheral Neuropathy": {
    category: "Neurological",
    commonSymptoms: [
      "Numbness or tingling in hands/feet",
      "Burning pain",
      "Loss of sensation",
      "Weakness",
      "Balance problems",
      "Sensitivity to touch"
    ],
    functionalLimitations: [
      "Walking or balance",
      "Fine motor tasks",
      "Foot care and injury risk",
      "Manual work",
      "Driving"
    ],
    evidenceTypes: [
      "EMG/nerve conduction studies",
      "Neurology examination",
      "Lab tests for causes",
      "Service medical records",
      "Medication records"
    ]
  },

  "Traumatic Brain Injury (TBI)": {
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

  "Seizure Disorder": {
    category: "Neurological",
    commonSymptoms: [
      "Seizures of various types",
      "Loss of consciousness",
      "Muscle spasms or convulsions",
      "Confusion after seizure",
      "Memory problems",
      "Fatigue"
    ],
    functionalLimitations: [
      "Driving restrictions",
      "Work limitations",
      "Safety concerns",
      "Independent living challenges",
      "Social activities"
    ],
    evidenceTypes: [
      "EEG results",
      "Neurology diagnosis",
      "Medication records (anti-epileptic drugs)",
      "Service medical records",
      "Witness statements of seizures"
    ]
  },

  "Vertigo": {
    category: "Neurological",
    commonSymptoms: [
      "Spinning sensation",
      "Dizziness",
      "Balance problems",
      "Nausea or vomiting",
      "Difficulty walking",
      "Triggered by head movements"
    ],
    functionalLimitations: [
      "Driving",
      "Working at heights",
      "Walking",
      "Daily activities during episodes",
      "Employment"
    ],
    evidenceTypes: [
      "ENT or neurology evaluation",
      "Vestibular testing",
      "Service medical records",
      "Treatment documentation"
    ]
  },

  "Meniere's Disease": {
    category: "Neurological",
    commonSymptoms: [
      "Vertigo episodes",
      "Tinnitus",
      "Hearing loss (fluctuating)",
      "Feeling of fullness in ear",
      "Nausea",
      "Balance problems"
    ],
    functionalLimitations: [
      "Driving during episodes",
      "Work attendance",
      "Balance and safety",
      "Hearing difficulties",
      "Daily activities"
    ],
    evidenceTypes: [
      "ENT diagnosis",
      "Audiogram results",
      "Vestibular testing",
      "Service medical records",
      "Treatment records"
    ]
  },

  "Bell's Palsy": {
    category: "Neurological",
    commonSymptoms: [
      "Facial weakness or paralysis",
      "Drooping on one side of face",
      "Difficulty closing eye",
      "Drooling",
      "Loss of taste",
      "Pain around jaw or ear"
    ],
    functionalLimitations: [
      "Facial expressions",
      "Eating and drinking",
      "Eye protection",
      "Speech",
      "Social interactions"
    ],
    evidenceTypes: [
      "Neurology diagnosis",
      "Service medical records",
      "Treatment documentation",
      "Photos if applicable"
    ]
  },

  "Multiple Sclerosis": {
    category: "Neurological",
    commonSymptoms: [
      "Fatigue",
      "Vision problems",
      "Numbness or tingling",
      "Weakness",
      "Balance and coordination problems",
      "Cognitive changes",
      "Bladder dysfunction"
    ],
    functionalLimitations: [
      "Walking and mobility",
      "Work performance",
      "Daily activities",
      "Independent living",
      "Driving"
    ],
    evidenceTypes: [
      "Neurology diagnosis",
      "MRI showing lesions",
      "Spinal tap results",
      "Service medical records",
      "Treatment records (disease-modifying therapies)"
    ]
  },

  "Restless Leg Syndrome": {
    category: "Neurological",
    commonSymptoms: [
      "Uncomfortable sensations in legs",
      "Urge to move legs",
      "Symptoms worse at rest",
      "Symptoms worse in evening/night",
      "Sleep disturbance"
    ],
    functionalLimitations: [
      "Sleep quality",
      "Daytime fatigue",
      "Sitting for long periods",
      "Work performance"
    ],
    evidenceTypes: [
      "Sleep study results",
      "Neurology diagnosis",
      "Medication records",
      "Service medical records"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // RESPIRATORY CONDITIONS (10+)
  // ═══════════════════════════════════════════════════════════

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
      "Pulmonary function tests (spirometry)",
      "Pulmonology records",
      "Medication prescriptions (inhalers, steroids)",
      "ER/hospitalization records",
      "Service medical records",
      "Exposure documentation (burn pits, etc.)"
    ]
  },

  "COPD (Chronic Obstructive Pulmonary Disease)": {
    category: "Respiratory",
    commonSymptoms: [
      "Chronic cough",
      "Shortness of breath",
      "Wheezing",
      "Chest tightness",
      "Frequent respiratory infections",
      "Fatigue",
      "Mucus production"
    ],
    functionalLimitations: [
      "Physical exertion",
      "Climbing stairs",
      "Walking distances",
      "Work requiring physical activity",
      "Daily activities",
      "Oxygen dependence"
    ],
    evidenceTypes: [
      "Pulmonary function tests showing obstruction",
      "Chest X-rays or CT scans",
      "Pulmonology diagnosis",
      "Smoking history and/or burn pit exposure",
      "Service medical records",
      "Medication and oxygen records"
    ]
  },

  "Sleep Apnea": {
    category: "Respiratory",
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
      "CPAP usage/compliance records",
      "Pulmonology or sleep medicine evaluation",
      "Service medical records",
      "Lay statements about symptoms",
      "Evidence of related conditions (obesity, PTSD)"
    ]
  },

  "Chronic Sinusitis": {
    category: "Respiratory",
    commonSymptoms: [
      "Facial pain or pressure",
      "Nasal congestion",
      "Thick nasal discharge",
      "Reduced sense of smell",
      "Headaches",
      "Postnasal drip",
      "Fatigue"
    ],
    functionalLimitations: [
      "Breathing difficulty",
      "Sleep disturbance",
      "Work concentration",
      "Frequent medical appointments",
      "Chronic medication use"
    ],
    evidenceTypes: [
      "CT scans of sinuses",
      "ENT evaluation",
      "Service medical records",
      "Treatment records (antibiotics, surgery)",
      "Allergy testing if applicable"
    ]
  },

  "Allergic Rhinitis": {
    category: "Respiratory",
    commonSymptoms: [
      "Nasal congestion",
      "Sneezing",
      "Runny nose",
      "Itchy nose, eyes, throat",
      "Postnasal drip",
      "Watery eyes"
    ],
    functionalLimitations: [
      "Seasonal work limitations",
      "Sleep quality",
      "Concentration",
      "Outdoor activities"
    ],
    evidenceTypes: [
      "Allergy testing results",
      "ENT or allergy specialist records",
      "Service medical records",
      "Medication prescriptions"
    ]
  },

  "Burn Pit Exposure": {
    category: "Respiratory",
    commonSymptoms: [
      "Chronic cough",
      "Shortness of breath",
      "Wheezing",
      "Frequent respiratory infections",
      "Sinus problems",
      "Asthma-like symptoms"
    ],
    functionalLimitations: [
      "Physical exertion",
      "Work requiring physical activity",
      "Breathing in certain environments",
      "Exercise tolerance"
    ],
    evidenceTypes: [
      "Deployment records showing burn pit exposure",
      "Pulmonary function tests",
      "VA burn pit registry enrollment",
      "Respiratory diagnosis records",
      "Service medical records",
      "Buddy statements about exposure"
    ]
  },

  "Chronic Bronchitis": {
    category: "Respiratory",
    commonSymptoms: [
      "Persistent cough with mucus",
      "Shortness of breath",
      "Wheezing",
      "Chest discomfort",
      "Fatigue",
      "Frequent respiratory infections"
    ],
    functionalLimitations: [
      "Physical activities",
      "Work performance",
      "Exercise",
      "Daily tasks"
    ],
    evidenceTypes: [
      "Pulmonary function tests",
      "Chest X-rays",
      "Pulmonology records",
      "Service medical records",
      "Smoking/exposure history"
    ]
  },

  "Pneumonia (Residuals)": {
    category: "Respiratory",
    commonSymptoms: [
      "Chronic cough",
      "Shortness of breath",
      "Chest pain",
      "Fatigue",
      "Reduced lung capacity"
    ],
    functionalLimitations: [
      "Physical exertion",
      "Exercise tolerance",
      "Work requiring physical activity"
    ],
    evidenceTypes: [
      "Service medical records of pneumonia",
      "Chest X-rays showing scarring",
      "Pulmonary function tests",
      "Pulmonology evaluation"
    ]
  },

  "Tuberculosis (Residuals)": {
    category: "Respiratory",
    commonSymptoms: [
      "Chronic cough",
      "Shortness of breath",
      "Fatigue",
      "Reduced lung function"
    ],
    functionalLimitations: [
      "Physical activities",
      "Exercise",
      "Work performance"
    ],
    evidenceTypes: [
      "Service medical records of TB",
      "Treatment records",
      "Chest X-rays",
      "Pulmonary function tests"
    ]
  },

  "Sarcoidosis": {
    category: "Respiratory",
    commonSymptoms: [
      "Shortness of breath",
      "Persistent dry cough",
      "Chest pain",
      "Wheezing",
      "Fatigue",
      "Weight loss"
    ],
    functionalLimitations: [
      "Physical exertion",
      "Daily activities",
      "Work performance"
    ],
    evidenceTypes: [
      "Chest X-rays or CT showing granulomas",
      "Pulmonology diagnosis",
      "Biopsy results",
      "Pulmonary function tests",
      "Service medical records"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // CARDIOVASCULAR CONDITIONS (10+)
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
      "Evidence of complications (heart, kidney, eye damage)"
    ]
  },

  "Ischemic Heart Disease": {
    category: "Cardiovascular",
    commonSymptoms: [
      "Chest pain (angina)",
      "Shortness of breath",
      "Fatigue",
      "Pain radiating to arm/jaw",
      "Palpitations"
    ],
    functionalLimitations: [
      "Physical exertion",
      "Exercise limitations",
      "Work restrictions",
      "Daily activities",
      "Risk of heart attack"
    ],
    evidenceTypes: [
      "Cardiac catheterization results",
      "Stress test results",
      "EKG abnormalities",
      "Cardiology diagnosis",
      "Service medical records",
      "Surgical records (bypass, stents)"
    ]
  },

  "Arrhythmia": {
    category: "Cardiovascular",
    commonSymptoms: [
      "Irregular heartbeat",
      "Palpitations",
      "Dizziness",
      "Shortness of breath",
      "Chest pain",
      "Fatigue",
      "Fainting"
    ],
    functionalLimitations: [
      "Physical activities",
      "Work performance",
      "Driving restrictions",
      "Exercise limitations",
      "Need for medications or devices"
    ],
    evidenceTypes: [
      "EKG or Holter monitor results",
      "Cardiology diagnosis",
      "Medication records",
      "Pacemaker/defibrillator records",
      "Service medical records"
    ]
  },

  "Cardiomyopathy": {
    category: "Cardiovascular",
    commonSymptoms: [
      "Shortness of breath",
      "Fatigue",
      "Swelling in legs/ankles/feet",
      "Irregular heartbeat",
      "Dizziness",
      "Chest pain"
    ],
    functionalLimitations: [
      "Physical exertion",
      "Daily activities",
      "Exercise",
      "Work limitations",
      "Risk of heart failure"
    ],
    evidenceTypes: [
      "Echocardiogram showing heart muscle abnormality",
      "Cardiology diagnosis",
      "Medication records",
      "Service medical records",
      "Possible genetic testing"
    ]
  },

  "Peripheral Artery Disease": {
    category: "Cardiovascular",
    commonSymptoms: [
      "Leg pain with walking (claudication)",
      "Numbness or weakness in legs",
      "Coldness in lower leg or foot",
      "Slow wound healing on feet/legs",
      "Color changes in legs",
      "Hair loss on legs"
    ],
    functionalLimitations: [
      "Walking distances",
      "Exercise",
      "Standing",
      "Work requiring mobility",
      "Risk of amputation"
    ],
    evidenceTypes: [
      "Ankle-brachial index (ABI) test",
      "Vascular ultrasound",
      "Angiogram results",
      "Vascular surgery records",
      "Service medical records"
    ]
  },

  "Varicose Veins": {
    category: "Cardiovascular",
    commonSymptoms: [
      "Visible twisted veins",
      "Leg pain or aching",
      "Heaviness in legs",
      "Swelling",
      "Itching around veins",
      "Skin changes or ulcers"
    ],
    functionalLimitations: [
      "Standing for long periods",
      "Physical activities",
      "Wearing certain clothing or footwear",
      "Work requiring standing"
    ],
    evidenceTypes: [
      "Vascular ultrasound",
      "Vascular surgery evaluation",
      "Photos of varicose veins",
      "Service medical records",
      "Treatment or surgical records"
    ]
  },

  "Deep Vein Thrombosis (DVT) Residuals": {
    category: "Cardiovascular",
    commonSymptoms: [
      "Leg swelling",
      "Pain or tenderness",
      "Skin discoloration",
      "Warmth in affected area",
      "Risk of recurrence"
    ],
    functionalLimitations: [
      "Need for blood thinners",
      "Exercise limitations",
      "Travel restrictions",
      "Risk of pulmonary embolism"
    ],
    evidenceTypes: [
      "Ultrasound showing DVT",
      "Service medical records of DVT",
      "Anticoagulation medication records",
      "Vascular specialist records"
    ]
  },

  "Heart Valve Conditions": {
    category: "Cardiovascular",
    commonSymptoms: [
      "Shortness of breath",
      "Fatigue",
      "Heart murmur",
      "Chest pain",
      "Dizziness or fainting",
      "Swelling in legs/feet"
    ],
    functionalLimitations: [
      "Physical exertion",
      "Exercise limitations",
      "Daily activities",
      "Work restrictions"
    ],
    evidenceTypes: [
      "Echocardiogram showing valve abnormality",
      "Cardiology diagnosis",
      "Surgical records (valve repair/replacement)",
      "Service medical records"
    ]
  },

  "Pericarditis": {
    category: "Cardiovascular",
    commonSymptoms: [
      "Sharp chest pain",
      "Pain worse when lying down",
      "Pain relieved by sitting forward",
      "Shortness of breath",
      "Fatigue",
      "Low-grade fever"
    ],
    functionalLimitations: [
      "Physical activities",
      "Work performance",
      "Sleep position",
      "Daily activities during flares"
    ],
    evidenceTypes: [
      "Echocardiogram",
      "EKG changes",
      "Cardiology diagnosis",
      "Service medical records",
      "Treatment records"
    ]
  },

  "Tachycardia": {
    category: "Cardiovascular",
    commonSymptoms: [
      "Rapid heart rate",
      "Palpitations",
      "Dizziness",
      "Shortness of breath",
      "Chest discomfort",
      "Fatigue"
    ],
    functionalLimitations: [
      "Physical activities",
      "Work performance",
      "Exercise limitations",
      "Need for medications"
    ],
    evidenceTypes: [
      "EKG or Holter monitor",
      "Cardiology diagnosis",
      "Medication records",
      "Service medical records"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // GASTROINTESTINAL CONDITIONS (10+)
  // ═══════════════════════════════════════════════════════════

  "GERD (Gastroesophageal Reflux Disease)": {
    category: "Gastrointestinal",
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
      "pH monitoring results",
      "Medication prescriptions (PPIs)",
      "Service medical records"
    ]
  },

  "IBS (Irritable Bowel Syndrome)": {
    category: "Gastrointestinal",
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
      "Colonoscopy results (ruling out other causes)",
      "Service medical records",
      "Treatment records",
      "Medication prescriptions",
      "Lay statements about functional impact"
    ]
  },

  "Crohn's Disease": {
    category: "Gastrointestinal",
    commonSymptoms: [
      "Abdominal pain and cramping",
      "Severe diarrhea",
      "Rectal bleeding",
      "Weight loss",
      "Fatigue",
      "Fever",
      "Mouth sores"
    ],
    functionalLimitations: [
      "Frequent bathroom needs",
      "Work attendance",
      "Travel restrictions",
      "Nutritional deficiencies",
      "Daily activities during flares",
      "Risk of complications"
    ],
    evidenceTypes: [
      "Colonoscopy with biopsy results",
      "CT or MRI enterography",
      "Gastroenterology diagnosis",
      "Medication records (immunosuppressants, biologics)",
      "Service medical records",
      "Surgical records if applicable"
    ]
  },

  "Ulcerative Colitis": {
    category: "Gastrointestinal",
    commonSymptoms: [
      "Diarrhea with blood or pus",
      "Abdominal pain and cramping",
      "Urgency to defecate",
      "Inability to defecate despite urgency",
      "Weight loss",
      "Fatigue",
      "Fever"
    ],
    functionalLimitations: [
      "Need for immediate bathroom access",
      "Work and social limitations",
      "Travel restrictions",
      "Frequent medical care",
      "Daily activities during flares"
    ],
    evidenceTypes: [
      "Colonoscopy with biopsy",
      "Gastroenterology diagnosis",
      "Medication records (5-ASAs, steroids, biologics)",
      "Service medical records",
      "Surgical records (colectomy if applicable)"
    ]
  },

  "Hemorrhoids": {
    category: "Gastrointestinal",
    commonSymptoms: [
      "Rectal bleeding",
      "Pain or discomfort",
      "Itching or irritation",
      "Swelling around anus",
      "Lump near anus"
    ],
    functionalLimitations: [
      "Sitting for long periods",
      "Bowel movements painful",
      "Physical activities",
      "Work requiring sitting"
    ],
    evidenceTypes: [
      "Gastroenterology or colorectal surgery evaluation",
      "Service medical records",
      "Treatment or surgical records"
    ]
  },

  "Hiatal Hernia": {
    category: "Gastrointestinal",
    commonSymptoms: [
      "Heartburn",
      "Regurgitation",
      "Difficulty swallowing",
      "Chest pain",
      "Belching",
      "Shortness of breath"
    ],
    functionalLimitations: [
      "Eating large meals",
      "Lying down after eating",
      "Physical exertion",
      "Sleep disturbance"
    ],
    evidenceTypes: [
      "Upper endoscopy results",
      "Barium swallow X-ray",
      "Gastroenterology records",
      "Service medical records",
      "Surgical records if applicable"
    ]
  },

  "Gastritis": {
    category: "Gastrointestinal",
    commonSymptoms: [
      "Upper abdominal pain",
      "Nausea or vomiting",
      "Feeling of fullness",
      "Loss of appetite",
      "Indigestion",
      "Bloating"
    ],
    functionalLimitations: [
      "Diet restrictions",
      "Eating difficulties",
      "Medication dependence",
      "Work performance during flares"
    ],
    evidenceTypes: [
      "Endoscopy with biopsy",
      "H. pylori testing",
      "Gastroenterology records",
      "Service medical records"
    ]
  },

  "Peptic Ulcer": {
    category: "Gastrointestinal",
    commonSymptoms: [
      "Burning stomach pain",
      "Feeling of fullness or bloating",
      "Nausea",
      "Pain worse on empty stomach",
      "Heartburn",
      "Dark stools (if bleeding)"
    ],
    functionalLimitations: [
      "Diet restrictions",
      "Pain affecting daily activities",
      "Medication requirements",
      "Risk of complications"
    ],
    evidenceTypes: [
      "Endoscopy showing ulcer",
      "Gastroenterology diagnosis",
      "Medication records",
      "Service medical records"
    ]
  },

  "Diverticulitis": {
    category: "Gastrointestinal",
    commonSymptoms: [
      "Abdominal pain (usually left side)",
      "Fever",
      "Nausea",
      "Change in bowel habits",
      "Bloating",
      "Rectal bleeding"
    ],
    functionalLimitations: [
      "Work during flares",
      "Diet restrictions",
      "Risk of hospitalization",
      "Daily activities during attacks"
    ],
    evidenceTypes: [
      "CT scan showing diverticulitis",
      "Colonoscopy results",
      "Gastroenterology records",
      "Service medical records",
      "Surgical records if applicable"
    ]
  },

  "Chronic Constipation": {
    category: "Gastrointestinal",
    commonSymptoms: [
      "Infrequent bowel movements",
      "Difficulty passing stool",
      "Hard or lumpy stool",
      "Abdominal pain or bloating",
      "Feeling of incomplete evacuation"
    ],
    functionalLimitations: [
      "Daily discomfort",
      "Need for medications or procedures",
      "Work performance",
      "Quality of life"
    ],
    evidenceTypes: [
      "Gastroenterology evaluation",
      "Colonoscopy results",
      "Service medical records",
      "Medication records"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // SKIN CONDITIONS (10+)
  // ═══════════════════════════════════════════════════════════

  "Scars - Surgical": {
    category: "Skin",
    commonSymptoms: [
      "Visible scarring",
      "Pain or tenderness at scar site",
      "Itching",
      "Restricted movement if over joint",
      "Discoloration",
      "Keloid formation"
    ],
    functionalLimitations: [
      "Limited range of motion (if over joint)",
      "Pain with movement",
      "Difficulty wearing certain clothing",
      "Self-consciousness",
      "Employment limitations if visible"
    ],
    evidenceTypes: [
      "Photographs of scars",
      "Surgical records",
      "Measurements of scar size/area",
      "Dermatology evaluation",
      "Range of motion testing if applicable"
    ]
  },

  "Scars - Traumatic": {
    category: "Skin",
    commonSymptoms: [
      "Visible scarring from injury",
      "Pain or sensitivity",
      "Disfigurement",
      "Keloid or hypertrophic scarring",
      "Restricted movement"
    ],
    functionalLimitations: [
      "Physical limitations",
      "Self-consciousness",
      "Employment impact",
      "Social situations"
    ],
    evidenceTypes: [
      "Photographs",
      "Service medical records of injury",
      "Treatment records",
      "Measurements of scars"
    ]
  },

  "Scars - Burn": {
    category: "Skin",
    commonSymptoms: [
      "Burn scars",
      "Contractures",
      "Pain or sensitivity",
      "Discoloration",
      "Restricted movement"
    ],
    functionalLimitations: [
      "Range of motion",
      "Pain with movement",
      "Skin breakdown risk",
      "Appearance concerns"
    ],
    evidenceTypes: [
      "Photographs",
      "Burn treatment records",
      "Service medical records",
      "Plastic surgery records"
    ]
  },

  "Psoriasis": {
    category: "Skin",
    commonSymptoms: [
      "Red patches with silvery scales",
      "Dry, cracked skin that may bleed",
      "Itching or burning",
      "Thickened or ridged nails",
      "Joint pain (psoriatic arthritis)"
    ],
    functionalLimitations: [
      "Embarrassment in social situations",
      "Difficulty wearing certain clothing",
      "Hand involvement affecting work",
      "Sleep disruption from itching",
      "Frequent treatment required"
    ],
    evidenceTypes: [
      "Dermatology diagnosis",
      "Photographs of affected areas",
      "Treatment records (topicals, phototherapy, biologics)",
      "Service medical records"
    ]
  },

  "Eczema (Atopic Dermatitis)": {
    category: "Skin",
    commonSymptoms: [
      "Itchy, inflamed skin",
      "Red or brownish patches",
      "Dry, cracked skin",
      "Small raised bumps",
      "Thickened skin from scratching",
      "Sensitive skin"
    ],
    functionalLimitations: [
      "Sleep disturbance from itching",
      "Hand involvement affecting work",
      "Difficulty with certain clothing or materials",
      "Frequent skin care required",
      "Social embarrassment"
    ],
    evidenceTypes: [
      "Dermatology diagnosis",
      "Photographs",
      "Treatment records",
      "Allergy testing if applicable",
      "Service medical records"
    ]
  },

  "Severe Acne": {
    category: "Skin",
    commonSymptoms: [
      "Persistent severe acne",
      "Cysts and nodules",
      "Scarring",
      "Pain or tenderness",
      "Emotional distress"
    ],
    functionalLimitations: [
      "Self-esteem and social situations",
      "Employment if severe/visible",
      "Pain from lesions",
      "Frequent dermatology care"
    ],
    evidenceTypes: [
      "Dermatology diagnosis and treatment",
      "Photographs",
      "Medication records (Accutane, etc.)",
      "Service medical records"
    ]
  },

  "Rosacea": {
    category: "Skin",
    commonSymptoms: [
      "Facial redness",
      "Visible blood vessels",
      "Bumps and pimples",
      "Eye irritation",
      "Thickened skin (rhinophyma)",
      "Burning or stinging"
    ],
    functionalLimitations: [
      "Self-consciousness",
      "Sensitivity to sun and temperature",
      "Work in certain environments",
      "Need for ongoing treatment"
    ],
    evidenceTypes: [
      "Dermatology diagnosis",
      "Photographs",
      "Treatment records",
      "Service medical records"
    ]
  },

  "Contact Dermatitis": {
    category: "Skin",
    commonSymptoms: [
      "Red, itchy rash",
      "Blisters or bumps",
      "Dry, cracked skin",
      "Burning or tenderness",
      "Triggered by specific substances"
    ],
    functionalLimitations: [
      "Work with certain materials",
      "Hand involvement affecting tasks",
      "Avoidance of triggers",
      "Frequent skin care"
    ],
    evidenceTypes: [
      "Dermatology diagnosis",
      "Patch testing results",
      "Service medical records",
      "Documentation of exposure"
    ]
  },

  "Skin Cancer": {
    category: "Skin",
    commonSymptoms: [
      "Unusual moles or growths",
      "Changes in existing moles",
      "Sores that don't heal",
      "Scars from removal"
    ],
    functionalLimitations: [
      "Scarring from treatment",
      "Need for frequent monitoring",
      "Sun exposure restrictions",
      "Anxiety about recurrence"
    ],
    evidenceTypes: [
      "Biopsy results showing cancer",
      "Dermatology or oncology records",
      "Surgical records",
      "Service medical records",
      "Photos of lesions"
    ]
  },

  "Hidradenitis Suppurativa": {
    category: "Skin",
    commonSymptoms: [
      "Painful lumps under skin",
      "Abscesses that drain pus",
      "Tunnels under skin",
      "Scarring",
      "Odor from drainage"
    ],
    functionalLimitations: [
      "Pain affecting daily activities",
      "Difficulty with clothing",
      "Social embarrassment",
      "Frequent medical care",
      "Work limitations during flares"
    ],
    evidenceTypes: [
      "Dermatology diagnosis",
      "Photographs",
      "Treatment records (antibiotics, biologics, surgery)",
      "Service medical records"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // EAR/NOSE/THROAT CONDITIONS (5+)
  // ═══════════════════════════════════════════════════════════

  "Tinnitus": {
    category: "Ear/Nose/Throat",
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
    treatments: [
      "Hearing aids",
      "Sound therapy/masking devices",
      "Tinnitus retraining therapy (TRT)",
      "Cognitive Behavioral Therapy (CBT)",
      "Medications (for underlying causes or associated anxiety/depression)",
      "Avoiding loud noises",
      "Stress management",
      "Limiting caffeine and alcohol"
    ],
    evidenceTypes: [
      "Audiogram",
      "Tinnitus evaluation",
      "ENT examination records",
      "Service medical records",
      "Noise exposure documentation",
      "Lay statements about impact on daily life"
    ]
  },

  "Hearing Loss": {
    category: "Ear/Nose/Throat",
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
      "Audiogram results showing hearing loss",
      "ENT examination",
      "Service medical records",
      "Noise exposure documentation",
      "Hearing aid prescription/records",
      "Lay statements from family/friends"
    ]
  },

  "Meniere's Disease": {
    category: "Ear/Nose/Throat",
    commonSymptoms: [
      "Vertigo episodes",
      "Tinnitus",
      "Hearing loss (fluctuating)",
      "Feeling of fullness in ear",
      "Nausea",
      "Balance problems"
    ],
    functionalLimitations: [
      "Driving during episodes",
      "Work attendance",
      "Balance and safety",
      "Hearing difficulties",
      "Daily activities"
    ],
    evidenceTypes: [
      "ENT diagnosis",
      "Audiogram results",
      "Vestibular testing",
      "Service medical records",
      "Treatment records"
    ]
  },

  "Deviated Septum": {
    category: "Ear/Nose/Throat",
    commonSymptoms: [
      "Nasal congestion (one or both sides)",
      "Difficulty breathing through nose",
      "Frequent nosebleeds",
      "Facial pain",
      "Noisy breathing during sleep",
      "Headaches"
    ],
    functionalLimitations: [
      "Breathing difficulty",
      "Sleep disturbance",
      "Exercise limitations",
      "Chronic sinus problems"
    ],
    evidenceTypes: [
      "ENT examination",
      "CT scan of sinuses",
      "Service medical records",
      "Surgical records if applicable"
    ]
  },

  "Chronic Laryngitis": {
    category: "Ear/Nose/Throat",
    commonSymptoms: [
      "Hoarseness or voice changes",
      "Weak voice or voice loss",
      "Throat irritation",
      "Chronic cough",
      "Frequent throat clearing"
    ],
    functionalLimitations: [
      "Communication difficulties",
      "Work requiring speaking",
      "Social situations",
      "Phone use"
    ],
    evidenceTypes: [
      "ENT examination",
      "Laryngoscopy results",
      "Service medical records",
      "Treatment records"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // EYE CONDITIONS (5+)
  // ═══════════════════════════════════════════════════════════

  "Vision Loss": {
    category: "Eyes",
    commonSymptoms: [
      "Decreased visual acuity",
      "Blind spots",
      "Difficulty with night vision",
      "Difficulty reading",
      "Peripheral vision loss"
    ],
    functionalLimitations: [
      "Reading and writing",
      "Driving",
      "Work tasks",
      "Daily activities",
      "Safety concerns"
    ],
    evidenceTypes: [
      "Ophthalmology examination",
      "Visual field testing",
      "Service medical records",
      "Corrective lens prescriptions"
    ]
  },

  "Cataracts": {
    category: "Eyes",
    commonSymptoms: [
      "Clouded, blurred, or dim vision",
      "Difficulty with night vision",
      "Sensitivity to light and glare",
      "Fading or yellowing of colors",
      "Double vision in one eye"
    ],
    functionalLimitations: [
      "Driving at night",
      "Reading",
      "Work tasks requiring clear vision",
      "Daily activities"
    ],
    evidenceTypes: [
      "Ophthalmology examination showing cataracts",
      "Service medical records",
      "Surgical records if applicable"
    ]
  },

  "Glaucoma": {
    category: "Eyes",
    commonSymptoms: [
      "Gradual loss of peripheral vision",
      "Tunnel vision (advanced stages)",
      "Eye pain",
      "Blurred vision",
      "Halos around lights",
      "Redness"
    ],
    functionalLimitations: [
      "Driving",
      "Reading",
      "Daily activities",
      "Work tasks",
      "Risk of blindness"
    ],
    evidenceTypes: [
      "Ophthalmology diagnosis",
      "Intraocular pressure measurements",
      "Visual field testing",
      "Service medical records",
      "Medication or surgical records"
    ]
  },

  "Retinal Conditions": {
    category: "Eyes",
    commonSymptoms: [
      "Vision loss or distortion",
      "Floaters",
      "Flashes of light",
      "Blind spots",
      "Difficulty with central or peripheral vision"
    ],
    functionalLimitations: [
      "Reading and close work",
      "Driving",
      "Recognizing faces",
      "Work tasks",
      "Daily activities"
    ],
    evidenceTypes: [
      "Retinal examination",
      "Optical coherence tomography (OCT)",
      "Fluorescein angiography",
      "Service medical records",
      "Treatment records (injections, laser)"
    ]
  },

  "Dry Eye Syndrome": {
    category: "Eyes",
    commonSymptoms: [
      "Eye dryness",
      "Burning or stinging",
      "Redness",
      "Sensitivity to light",
      "Difficulty wearing contact lenses",
      "Watery eyes (reflex tearing)",
      "Blurred vision"
    ],
    functionalLimitations: [
      "Computer work",
      "Reading",
      "Driving",
      "Contact lens wear",
      "Outdoor activities"
    ],
    evidenceTypes: [
      "Ophthalmology examination",
      "Tear production tests",
      "Service medical records",
      "Treatment records (artificial tears, plugs)"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // GENITOURINARY CONDITIONS (10+)
  // ═══════════════════════════════════════════════════════════

  "Erectile Dysfunction": {
    category: "Genitourinary",
    commonSymptoms: [
      "Difficulty achieving erection",
      "Difficulty maintaining erection",
      "Reduced sexual desire"
    ],
    functionalLimitations: [
      "Sexual function",
      "Intimate relationships",
      "Quality of life",
      "Psychological impact"
    ],
    evidenceTypes: [
      "Urology evaluation",
      "Medication prescriptions",
      "Service medical records",
      "Nexus to service-connected conditions (diabetes, PTSD, medications)"
    ]
  },

  "Kidney Disease": {
    category: "Genitourinary",
    commonSymptoms: [
      "Fatigue",
      "Swelling in legs/ankles/feet",
      "Changes in urination",
      "Nausea",
      "Decreased appetite",
      "Sleep problems",
      "Muscle cramps"
    ],
    functionalLimitations: [
      "Daily activities",
      "Work performance",
      "Dialysis requirements",
      "Diet restrictions",
      "Medication needs"
    ],
    evidenceTypes: [
      "Lab tests (creatinine, GFR)",
      "Nephrology diagnosis",
      "Service medical records",
      "Treatment records",
      "Dialysis records if applicable"
    ]
  },

  "Bladder Conditions": {
    category: "Genitourinary",
    commonSymptoms: [
      "Frequent urination",
      "Urgency",
      "Pain with urination",
      "Incontinence",
      "Difficulty emptying bladder",
      "Blood in urine"
    ],
    functionalLimitations: [
      "Need for frequent bathroom access",
      "Travel limitations",
      "Work disruptions",
      "Social situations",
      "Sleep disturbance"
    ],
    evidenceTypes: [
      "Urology evaluation",
      "Cystoscopy results",
      "Urodynamic testing",
      "Service medical records",
      "Treatment records"
    ]
  },

  "Prostate Conditions": {
    category: "Genitourinary",
    commonSymptoms: [
      "Difficulty urinating",
      "Frequent urination, especially at night",
      "Weak urine stream",
      "Urgency",
      "Inability to empty bladder",
      "Pain with urination"
    ],
    functionalLimitations: [
      "Sleep disturbance",
      "Frequent bathroom needs",
      "Work interruptions",
      "Travel limitations",
      "Quality of life"
    ],
    evidenceTypes: [
      "Urology evaluation",
      "PSA testing",
      "Prostate exam",
      "Service medical records",
      "Treatment or surgical records"
    ]
  },

  "Urinary Incontinence": {
    category: "Genitourinary",
    commonSymptoms: [
      "Involuntary urine leakage",
      "Urgency",
      "Stress incontinence (with coughing, sneezing)",
      "Frequent urination",
      "Nighttime urination"
    ],
    functionalLimitations: [
      "Social embarrassment",
      "Need for protective garments",
      "Work limitations",
      "Physical activities",
      "Travel"
    ],
    evidenceTypes: [
      "Urology or urogynecology evaluation",
      "Urodynamic testing",
      "Service medical records",
      "Treatment records"
    ]
  },

  "Interstitial Cystitis": {
    category: "Genitourinary",
    commonSymptoms: [
      "Bladder pressure and pain",
      "Frequent urination (up to 60+ times/day)",
      "Urgency",
      "Pain with bladder filling",
      "Pain during intercourse",
      "Chronic pelvic pain"
    ],
    functionalLimitations: [
      "Need for constant bathroom access",
      "Sleep disturbance",
      "Work and social limitations",
      "Sexual function",
      "Diet restrictions",
      "Quality of life severely impacted"
    ],
    evidenceTypes: [
      "Urology diagnosis",
      "Cystoscopy with hydrodistention",
      "Voiding diary",
      "Service medical records",
      "Treatment records"
    ]
  },

  "Chronic Kidney Stones": {
    category: "Genitourinary",
    commonSymptoms: [
      "Severe pain in side and back",
      "Pain radiating to lower abdomen and groin",
      "Painful urination",
      "Blood in urine",
      "Nausea and vomiting",
      "Frequent urination",
      "Recurrent infections"
    ],
    functionalLimitations: [
      "Work attendance during episodes",
      "Physical activities",
      "Travel concerns",
      "Need for procedures",
      "Diet restrictions"
    ],
    evidenceTypes: [
      "CT scans showing stones",
      "Urology records",
      "Service medical records",
      "Stone analysis",
      "Surgical/procedure records"
    ]
  },

  "Recurrent Urinary Tract Infections": {
    category: "Genitourinary",
    commonSymptoms: [
      "Frequent UTIs",
      "Burning with urination",
      "Urgency and frequency",
      "Pelvic pain",
      "Blood in urine",
      "Fatigue during infections"
    ],
    functionalLimitations: [
      "Work during infections",
      "Daily activities",
      "Frequent antibiotic use",
      "Medical appointments"
    ],
    evidenceTypes: [
      "Urine culture results showing recurrent infections",
      "Urology evaluation",
      "Service medical records",
      "Antibiotic prescription history"
    ]
  },

  "Testicular Conditions": {
    category: "Genitourinary",
    commonSymptoms: [
      "Pain or discomfort",
      "Swelling",
      "Lumps or masses",
      "Feeling of heaviness"
    ],
    functionalLimitations: [
      "Physical activities",
      "Work performance",
      "Sexual function",
      "Discomfort"
    ],
    evidenceTypes: [
      "Urology examination",
      "Ultrasound results",
      "Service medical records",
      "Surgical records if applicable"
    ]
  },

  "Pelvic Pain Syndromes": {
    category: "Genitourinary",
    commonSymptoms: [
      "Chronic pelvic pain",
      "Pain with urination",
      "Pain with intercourse",
      "Lower abdominal pain",
      "Urinary symptoms"
    ],
    functionalLimitations: [
      "Sexual function",
      "Daily activities",
      "Work performance",
      "Quality of life"
    ],
    evidenceTypes: [
      "Urology or gynecology evaluation",
      "Service medical records",
      "Treatment records",
      "Pain management documentation"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // ENDOCRINE CONDITIONS (5+)
  // ═══════════════════════════════════════════════════════════

  "Diabetes Type 1": {
    category: "Endocrine",
    commonSymptoms: [
      "Frequent urination",
      "Excessive thirst",
      "Extreme hunger",
      "Fatigue",
      "Blurred vision",
      "Slow wound healing",
      "Weight loss"
    ],
    functionalLimitations: [
      "Daily insulin injections required",
      "Frequent blood sugar monitoring",
      "Risk of hypoglycemia",
      "Diet restrictions",
      "Risk of complications (neuropathy, retinopathy, nephropathy)",
      "Employment limitations"
    ],
    evidenceTypes: [
      "Endocrinology records",
      "Blood sugar logs",
      "A1C test results",
      "Insulin prescription records",
      "Service medical records",
      "Evidence of complications"
    ]
  },

  "Diabetes Type 2": {
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
      "Daily medication/insulin required",
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
      "Evidence of complications (neuropathy, retinopathy)"
    ]
  },

  "Thyroid Disorders (Hypo/Hyperthyroidism)": {
    category: "Endocrine",
    commonSymptoms: [
      "Fatigue or increased energy",
      "Weight changes",
      "Temperature sensitivity",
      "Heart rate changes",
      "Mood changes",
      "Hair loss",
      "Sleep disturbances"
    ],
    functionalLimitations: [
      "Daily medication required",
      "Energy level fluctuations",
      "Work performance",
      "Daily activities",
      "Mood regulation"
    ],
    evidenceTypes: [
      "Thyroid function tests (TSH, T3, T4)",
      "Endocrinology diagnosis",
      "Medication prescriptions",
      "Service medical records",
      "Ultrasound or scan if applicable"
    ]
  },

  "Metabolic Syndrome": {
    category: "Endocrine",
    commonSymptoms: [
      "High blood pressure",
      "High blood sugar",
      "Excess abdominal fat",
      "Abnormal cholesterol levels",
      "Fatigue"
    ],
    functionalLimitations: [
      "Multiple medications required",
      "Diet and lifestyle restrictions",
      "Exercise limitations",
      "Risk of cardiovascular disease and diabetes",
      "Frequent medical monitoring"
    ],
    evidenceTypes: [
      "Lab tests (glucose, lipids, blood pressure)",
      "Endocrinology or internal medicine records",
      "Service medical records",
      "Medication records"
    ]
  },

  "Adrenal Disorders": {
    category: "Endocrine",
    commonSymptoms: [
      "Fatigue",
      "Weakness",
      "Weight changes",
      "Blood pressure changes",
      "Mood changes",
      "Salt cravings",
      "Dizziness"
    ],
    functionalLimitations: [
      "Daily activities",
      "Work performance",
      "Need for hormone replacement",
      "Risk of adrenal crisis",
      "Stress management requirements"
    ],
    evidenceTypes: [
      "Hormone testing (cortisol, ACTH, aldosterone)",
      "Endocrinology diagnosis",
      "Service medical records",
      "Medication records"
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // TOXIC EXPOSURE CONDITIONS (10+)
  // ═══════════════════════════════════════════════════════════

  "Burn Pit Exposure - Respiratory Effects": {
    category: "Toxic Exposure",
    commonSymptoms: [
      "Chronic cough",
      "Shortness of breath",
      "Wheezing",
      "Chronic bronchitis",
      "Asthma",
      "COPD symptoms",
      "Frequent respiratory infections"
    ],
    functionalLimitations: [
      "Exercise tolerance",
      "Physical work",
      "Breathing difficulties",
      "Work performance"
    ],
    evidenceTypes: [
      "Deployment records showing burn pit exposure",
      "VA burn pit registry enrollment",
      "Pulmonary function tests",
      "Respiratory diagnosis records",
      "Service medical records"
    ]
  },

  "Agent Orange Exposure": {
    category: "Toxic Exposure",
    commonSymptoms: [
      "Varies by condition (diabetes, neuropathy, cancer, heart disease, etc.)",
      "Skin conditions",
      "Respiratory problems"
    ],
    functionalLimitations: [
      "Depends on resulting condition",
      "Multiple organ systems may be affected"
    ],
    evidenceTypes: [
      "Vietnam service records or other qualifying service",
      "Medical diagnosis of presumptive condition",
      "VA Agent Orange registry",
      "Medical treatment records"
    ]
  },

  "Gulf War Syndrome": {
    category: "Toxic Exposure",
    commonSymptoms: [
      "Chronic fatigue",
      "Musculoskeletal pain",
      "Cognitive problems",
      "Skin problems",
      "Respiratory symptoms",
      "Gastrointestinal issues",
      "Neurological symptoms"
    ],
    functionalLimitations: [
      "Multiple body systems affected",
      "Work performance",
      "Daily activities",
      "Chronic pain and fatigue"
    ],
    evidenceTypes: [
      "Gulf War service records",
      "VA Gulf War registry",
      "Medical diagnosis of chronic multisymptom illness",
      "Treatment records",
      "Service medical records"
    ]
  },

  "Radiation Exposure": {
    category: "Toxic Exposure",
    commonSymptoms: [
      "Varies by condition (cancer, thyroid disease, etc.)",
      "Depends on exposure level and type"
    ],
    functionalLimitations: [
      "Depends on resulting illness",
      "May include cancer, organ damage"
    ],
    evidenceTypes: [
      "Service records documenting radiation exposure",
      "Dosimetry records",
      "Medical diagnosis of radiation-related condition",
      "Treatment records"
    ]
  },

  "Asbestos Exposure": {
    category: "Toxic Exposure",
    commonSymptoms: [
      "Shortness of breath",
      "Chronic cough",
      "Chest pain",
      "Difficulty breathing",
      "Pleural thickening"
    ],
    functionalLimitations: [
      "Breathing difficulties",
      "Exercise intolerance",
      "Work limitations",
      "Risk of mesothelioma or lung cancer"
    ],
    evidenceTypes: [
      "Service records showing asbestos exposure (shipyard, Navy ships, etc.)",
      "Chest X-rays or CT showing pleural plaques or asbestosis",
      "Pulmonary function tests",
      "Pulmonology diagnosis"
    ]
  },

  "Lead Poisoning": {
    category: "Toxic Exposure",
    commonSymptoms: [
      "Fatigue",
      "Headaches",
      "Abdominal pain",
      "Memory problems",
      "Mood disorders",
      "Peripheral neuropathy"
    ],
    functionalLimitations: [
      "Cognitive function",
      "Work performance",
      "Neurological problems",
      "Daily activities"
    ],
    evidenceTypes: [
      "Service records showing lead exposure",
      "Blood lead levels",
      "Neurological testing",
      "Service medical records"
    ]
  },

  "Chemical Exposure": {
    category: "Toxic Exposure",
    commonSymptoms: [
      "Depends on chemical",
      "Respiratory symptoms",
      "Skin conditions",
      "Neurological symptoms",
      "Multi-system effects"
    ],
    functionalLimitations: [
      "Varies by chemical and exposure",
      "May affect multiple body systems"
    ],
    evidenceTypes: [
      "Service records documenting chemical exposure",
      "Medical diagnosis of chemical-related condition",
      "Treatment records",
      "Occupational health records"
    ]
  },

  "Camp Lejeune Water Contamination": {
    category: "Toxic Exposure",
    commonSymptoms: [
      "Varies by condition (cancer, liver disease, kidney disease, etc.)",
      "Multiple organ systems may be affected"
    ],
    functionalLimitations: [
      "Depends on resulting condition",
      "May include cancer, organ damage"
    ],
    evidenceTypes: [
      "Service records showing residence at Camp Lejeune 1953-1987",
      "Medical diagnosis of presumptive condition",
      "Treatment records"
    ]
  },

  "PFAS Exposure (Firefighting Foam)": {
    category: "Toxic Exposure",
    commonSymptoms: [
      "Thyroid disease",
      "High cholesterol",
      "Liver damage",
      "Cancer",
      "Immune system effects"
    ],
    functionalLimitations: [
      "Depends on resulting condition",
      "Multiple organ systems may be affected"
    ],
    evidenceTypes: [
      "Service records showing firefighter duties or exposure to AFFF",
      "Medical diagnosis",
      "Blood tests showing PFAS levels if available",
      "Treatment records"
    ]
  },

  "Depleted Uranium Exposure": {
    category: "Toxic Exposure",
    commonSymptoms: [
      "Kidney damage",
      "Cognitive problems",
      "Respiratory issues",
      "Cancer"
    ],
    functionalLimitations: [
      "Depends on exposure level and resulting conditions",
      "Multiple systems may be affected"
    ],
    evidenceTypes: [
      "Service records showing potential exposure (combat arms, vehicle crews)",
      "Urine uranium testing",
      "Medical diagnosis of related conditions",
      "Treatment records"
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

// Helper function to get most common conditions
export const getMostCommonConditions = () => {
  return [
    "Tinnitus",
    "PTSD (Post-Traumatic Stress Disorder) - Combat",
    "Low Back Pain",
    "Sleep Apnea",
    "Hearing Loss",
    "Major Depressive Disorder",
    "Knee Meniscus Tear",
    "Migraines",
    "Asthma",
    "GERD (Gastroesophageal Reflux Disease)"
  ]
}

// Helper function to search conditions
export const searchConditions = (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return getConditionNames()
  }

  const lowerSearch = searchTerm.toLowerCase()
  return getConditionNames().filter(name =>
    name.toLowerCase().includes(lowerSearch)
  )
}
