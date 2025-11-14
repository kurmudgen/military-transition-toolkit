// Custom frontmatter parser (gray-matter doesn't work in browser - no Buffer API)
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: content };
  }

  const frontmatterText = match[1];
  const contentWithoutFrontmatter = match[2];

  // Parse YAML-style frontmatter
  const data = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  });

  return { data, content: contentWithoutFrontmatter };
}

// This would normally use fs to read files server-side, but in a Vite app
// we need to import the posts directly or use dynamic imports
// For now, we'll manually maintain a list of posts

const blogPosts = [
  // Nov 20 posts
  {
    slug: 'hi-best-cities-veterans-2025',
    title: 'Hawaii Best Cities for Veterans 2025',
    date: '2025-11-20',
    description: 'Best cities in Hawaii for veterans, military benefits, cost of living, VA facilities, and veteran resources.',
    keywords: 'hawaii veterans, best cities hawaii, veterans benefits hawaii',
    excerpt: "Discover the best cities in Hawaii for veterans with comprehensive benefits, excellent VA healthcare, and strong military community support.",
    category: 'State Benefits'
  },
  {
    slug: 'claiming-chronic-headaches-secondary-to-ptsd',
    title: 'VA Disability Claim for Chronic Headaches Secondary to PTSD',
    date: '2025-11-20',
    description: 'How to file VA disability claim for migraines and tension headaches secondary to service-connected PTSD. Evidence, nexus letters, and ratings.',
    keywords: 'chronic headaches secondary to PTSD, migraine VA disability, tension headaches rating',
    excerpt: "Learn how to successfully claim chronic headaches and migraines as secondary to PTSD with proper medical evidence and nexus letters.",
    category: 'VA Disability'
  },
  {
    slug: 'coast-guard-em-electricians-mate-civilian-career-guide',
    title: 'Coast Guard EM Electrician\'s Mate Civilian Career Guide',
    date: '2025-11-20',
    description: 'Coast Guard EM electrician career transition guide with civilian job paths, salaries, and certifications.',
    keywords: 'coast guard electrician, EM rating civilian jobs, electrical careers veterans',
    excerpt: "Coast Guard Electrician's Mates transition to high-paying electrical careers in maritime, industrial, and commercial sectors.",
    category: 'Career Guides',
    branch: 'Coast Guard'
  },
  {
    slug: 'ls-logistics-specialist-civilian-career-guide',
    title: 'Navy LS Logistics Specialist Civilian Career Guide',
    date: '2025-11-20',
    description: 'Navy LS logistics specialist career transition with supply chain jobs, salaries $50K-$95K, and career paths.',
    keywords: 'navy LS career, logistics specialist civilian jobs, supply chain careers',
    excerpt: "Navy Logistics Specialists excel in supply chain management, procurement, and logistics coordination with salaries $50K-$95K.",
    category: 'Career Guides',
    branch: 'Navy'
  },
  {
    slug: 'how-to-dress-civilian-job-interview-veterans',
    title: 'How to Dress for Civilian Job Interviews: Veterans Guide',
    date: '2025-11-20',
    description: 'Professional dress code guide for veteran job seekers with industry-specific advice and interview attire tips.',
    keywords: 'veteran job interview attire, professional dress code, what to wear job interview',
    excerpt: "Master civilian interview dress codes with this comprehensive guide covering business formal, business casual, and industry-specific attire.",
    category: 'How-To Guides'
  },
  // Nov 19 posts
  {
    slug: 'ga-best-cities-veterans-2025',
    title: 'Georgia Best Cities for Veterans 2025',
    date: '2025-11-19',
    description: 'Best cities in Georgia for veterans with benefits, job opportunities, VA healthcare, and military-friendly communities.',
    keywords: 'georgia veterans, best cities georgia, veterans benefits georgia',
    excerpt: "Explore Georgia's top veteran-friendly cities offering excellent benefits, strong job markets, and comprehensive VA services.",
    category: 'State Benefits'
  },
  {
    slug: 'va-rating-shoulder-pain-rotator-cuff',
    title: 'VA Rating for Shoulder Pain and Rotator Cuff Injuries',
    date: '2025-11-19',
    description: 'VA disability ratings for shoulder pain, rotator cuff injuries, compensation rates, and claim filing strategies.',
    keywords: 'shoulder pain va rating, rotator cuff VA disability, shoulder injury compensation',
    excerpt: "Complete guide to VA shoulder pain ratings from 10%-40%, monthly compensation amounts, and successful claim strategies.",
    category: 'VA Disability'
  },
  {
    slug: 'air-force-afsc-1a1x1-civilian-career-guide',
    title: 'Air Force AFSC 1A1X1 Civilian Career Guide',
    date: '2025-11-19',
    description: 'Air Force 1A1X1 flight engineer career transition with civilian aviation jobs and certifications.',
    keywords: 'air force 1a1x1, flight engineer civilian jobs, aviation careers',
    excerpt: "Air Force Flight Engineers transition to high-demand civilian aviation careers with FAA certifications and competitive salaries.",
    category: 'Career Guides',
    branch: 'Air Force'
  },
  {
    slug: 'yn-yeoman-civilian-career-guide',
    title: 'Navy YN Yeoman Civilian Career Guide',
    date: '2025-11-19',
    description: 'Navy Yeoman career transition guide with administrative, HR, and office management positions.',
    keywords: 'navy yeoman civilian jobs, YN rating career, administrative careers veterans',
    excerpt: "Navy Yeomen excel in administrative, HR, and office management roles with strong organizational and documentation skills.",
    category: 'Career Guides',
    branch: 'Navy'
  },
  {
    slug: 'how-to-find-remote-work-veterans',
    title: 'How to Find Remote Work: Veterans Guide',
    date: '2025-11-19',
    description: 'Complete guide to finding remote work opportunities for veterans with job boards, companies, and career paths.',
    keywords: 'remote work veterans, work from home military, veteran remote jobs',
    excerpt: "Discover the best remote job opportunities for veterans including cybersecurity, IT, project management, and customer service roles.",
    category: 'How-To Guides'
  },
  // Nov 18 posts
  {
    slug: 'co-best-cities-veterans-2025',
    title: 'Colorado Best Cities for Veterans 2025',
    date: '2025-11-18',
    description: 'Best cities in Colorado for veterans with outdoor recreation, VA benefits, and military-friendly communities.',
    keywords: 'colorado veterans, best cities colorado, veterans benefits colorado',
    excerpt: "Colorado offers veterans stunning outdoor recreation, strong job markets, and excellent VA healthcare in veteran-friendly cities.",
    category: 'State Benefits'
  },
  {
    slug: 'cp-exam-back-pain-musculoskeletal-guide',
    title: 'CP Exam for Back Pain: Musculoskeletal DBQ Guide',
    date: '2025-11-18',
    description: 'VA C&P exam preparation for back pain and spine conditions with DBQ questions and rating criteria.',
    keywords: 'back pain cp exam, musculoskeletal dbq, va exam back pain',
    excerpt: "Prepare for your VA C&P exam for back pain with this comprehensive guide covering DBQ questions and rating criteria.",
    category: 'VA Disability'
  },
  {
    slug: 'coast-guard-bm-boatswains-mate-civilian-career-guide',
    title: 'Coast Guard BM Boatswain\'s Mate Civilian Career Guide',
    date: '2025-11-18',
    description: 'Coast Guard Boatswain\'s Mate career transition with maritime, logistics, and operations management jobs.',
    keywords: 'coast guard bm, boatswains mate civilian jobs, maritime careers',
    excerpt: "Coast Guard Boatswain's Mates transition to maritime operations, port management, and logistics coordination roles.",
    category: 'Career Guides',
    branch: 'Coast Guard'
  },
  {
    slug: '0621-field-radio-operator-civilian-career-guide',
    title: 'USMC 0621 Field Radio Operator Civilian Career Guide',
    date: '2025-11-18',
    description: 'Marine Corps 0621 radio operator career transition with telecommunications and IT networking jobs.',
    keywords: 'marine 0621 career, radio operator civilian jobs, telecommunications veterans',
    excerpt: "Marine Corps Radio Operators transition to telecommunications, network administration, and IT infrastructure roles.",
    category: 'Career Guides',
    branch: 'Marines'
  },
  {
    slug: 'e7-resume-guide',
    title: 'E7 Resume Guide for Senior NCOs',
    date: '2025-11-18',
    description: 'E7 military resume guide with leadership examples, civilian job translation, and senior NCO career tips.',
    keywords: 'e7 resume, senior nco resume, military leadership resume',
    excerpt: "Senior NCOs at E7 level need powerful resumes highlighting leadership, operations management, and team development skills.",
    category: 'How-To Guides'
  },
  // Nov 17 posts
  {
    slug: 'az-best-cities-veterans-2025',
    title: 'Arizona Best Cities for Veterans 2025',
    date: '2025-11-17',
    description: 'Best cities in Arizona for veterans with warm weather, VA benefits, and growing job markets.',
    keywords: 'arizona veterans, best cities arizona, veterans benefits arizona',
    excerpt: "Arizona's veteran-friendly cities offer year-round sunshine, affordable living, and strong military community support.",
    category: 'State Benefits'
  },
  {
    slug: 'cp-exam-sleep-apnea-dbq-questions',
    title: 'CP Exam for Sleep Apnea: DBQ Questions Guide',
    date: '2025-11-17',
    description: 'VA C&P exam preparation for sleep apnea with DBQ questions, CPAP documentation, and rating criteria.',
    keywords: 'sleep apnea cp exam, va sleep apnea dbq, cpap va rating',
    excerpt: "Prepare for your VA sleep apnea C&P exam with this guide covering DBQ questions, CPAP use, and rating criteria.",
    category: 'VA Disability'
  },
  {
    slug: 'air-force-afsc-1a0x1-civilian-career-guide',
    title: 'Air Force AFSC 1A0X1 Civilian Career Guide',
    date: '2025-11-17',
    description: 'Air Force 1A0X1 in-flight refueling specialist career transition with aviation and logistics jobs.',
    keywords: 'air force 1a0x1, in-flight refueling career, aviation careers',
    excerpt: "Air Force In-Flight Refueling Specialists transition to aviation operations, fuel systems, and logistics management.",
    category: 'Career Guides',
    branch: 'Air Force'
  },
  {
    slug: 'it-information-systems-technician-civilian-career-guide',
    title: 'Navy IT Information Systems Technician Civilian Career Guide',
    date: '2025-11-17',
    description: 'Navy IT specialist career transition with cybersecurity, network admin, and IT jobs paying $60K-$120K.',
    keywords: 'navy it specialist, information systems technician, it careers navy',
    excerpt: "Navy IT Specialists transition smoothly to cybersecurity, network administration, and systems engineering roles with $60K-$120K salaries.",
    category: 'Career Guides',
    branch: 'Navy'
  },
  {
    slug: 'how-to-negotiate-salary-veterans-first-job',
    title: 'How to Negotiate Salary: Veterans First Job Guide',
    date: '2025-11-17',
    description: 'Salary negotiation guide for veterans with scripts, strategies, and how to evaluate total compensation packages.',
    keywords: 'salary negotiation veterans, negotiate first job offer, veteran salary tips',
    excerpt: "Master salary negotiation as a veteran with proven scripts and strategies to increase your offer by $10K-$30K.",
    category: 'How-To Guides'
  },
  // Nov 16 posts
  {
    slug: 'texas-veteran-benefits-2025',
    title: 'Texas Veteran Benefits Guide (2025-2026)',
    date: '2025-11-16',
    description: 'Complete Texas veteran benefits guide 2025-2026. No state income tax, 100% property tax exemption for disabled vets.',
    keywords: 'texas veteran benefits, texas property tax exemption, disabled veteran texas',
    excerpt: "Texas offers top veteran benefits: no state income tax (save $2K-$6K+ annually), 100% property tax exemption for 100% disabled veterans.",
    category: 'State Benefits'
  },
  {
    slug: 'cp-exam-tinnitus-hearing-loss-guide',
    title: 'CP Exam for Tinnitus and Hearing Loss Guide',
    date: '2025-11-16',
    description: 'VA C&P exam preparation for tinnitus and hearing loss with DBQ questions and rating criteria.',
    keywords: 'tinnitus cp exam, hearing loss va exam, tinnitus dbq',
    excerpt: "Prepare for your VA tinnitus and hearing loss C&P exam with this comprehensive DBQ guide and rating criteria.",
    category: 'VA Disability'
  },
  {
    slug: 'coastguard-it-information-systems-technician-civilian-career-guide',
    title: 'Coast Guard IT Information Systems Technician Career Guide',
    date: '2025-11-16',
    description: 'Coast Guard IT specialist career transition with cybersecurity, network, and maritime IT jobs.',
    keywords: 'coast guard it, information systems technician, coast guard cyber jobs',
    excerpt: "Coast Guard IT Specialists transition to cybersecurity, maritime IT systems, and network security roles with strong clearances.",
    category: 'Career Guides',
    branch: 'Coast Guard'
  },
  {
    slug: '0311-rifleman-civilian-career-guide',
    title: 'USMC 0311 Rifleman Civilian Career Guide',
    date: '2025-11-16',
    description: 'Marine Corps 0311 Rifleman career transition with law enforcement, security, and skilled trades jobs.',
    keywords: 'marine 0311 career, rifleman civilian jobs, usmc infantry careers',
    excerpt: "Marine Corps Riflemen excel in law enforcement, private security, emergency response, and skilled trades with competitive salaries.",
    category: 'Career Guides',
    branch: 'Marines'
  },
  {
    slug: 'how-to-apply-federal-jobs-usajobs-guide',
    title: 'How to Apply for Federal Jobs: USAJOBS Guide for Veterans',
    date: '2025-11-16',
    description: 'Complete USAJOBS guide for veterans with resume tips, veteran preference, and federal hiring process.',
    keywords: 'usajobs veterans, federal jobs veterans, veteran preference federal',
    excerpt: "Master the federal job application process with this comprehensive USAJOBS guide covering veteran preference and resume strategies.",
    category: 'How-To Guides'
  },
  // Nov 15 posts
  {
    slug: 'ca-best-cities-veterans-2025',
    title: 'California Best Cities for Veterans 2025',
    date: '2025-11-15',
    description: 'Best cities in California for veterans with benefits, job opportunities, and VA healthcare access.',
    keywords: 'california veterans, best cities california, veterans benefits california',
    excerpt: "Explore California's top veteran-friendly cities offering excellent benefits, strong job markets, and world-class VA healthcare.",
    category: 'State Benefits'
  },
  {
    slug: 'cp-exam-ptsd-what-to-expect-preparation',
    title: 'CP Exam for PTSD: What to Expect and How to Prepare',
    date: '2025-11-15',
    description: 'VA C&P exam preparation for PTSD with DBQ questions, what to expect, and how to maximize your rating.',
    keywords: 'ptsd cp exam, va ptsd exam, ptsd dbq questions',
    excerpt: "Prepare for your PTSD C&P exam with this comprehensive guide covering DBQ questions, examiner expectations, and rating criteria.",
    category: 'VA Disability'
  },
  {
    slug: '11b-infantry-civilian-career-guide',
    title: 'Army 11B Infantry Civilian Career Guide',
    date: '2025-11-15',
    description: 'Army 11B Infantry career transition guide with law enforcement, security, and emergency services jobs.',
    keywords: '11b infantry career, army infantry civilian jobs, infantry to police',
    excerpt: "Army Infantry transition to law enforcement ($55K-$90K), private security ($80K-$250K), and emergency services with detailed career paths.",
    category: 'Career Guides',
    branch: 'Army'
  },
  {
    slug: 'hm-hospital-corpsman-civilian-career-guide',
    title: 'Navy HM Hospital Corpsman Civilian Career Guide',
    date: '2025-11-15',
    description: 'Navy Hospital Corpsman career transition with EMT, paramedic, nursing, and healthcare jobs.',
    keywords: 'navy corpsman civilian jobs, hm rating career, medic to nurse',
    excerpt: "Navy Corpsmen have clear paths to civilian healthcare from EMT ($41K-$50K) to Paramedic ($58K-$75K) to RN ($75K-$120K+).",
    category: 'Career Guides',
    branch: 'Navy'
  },
  {
    slug: 'federal-resume-veterans-guide',
    title: 'Federal Resume Guide for Veterans',
    date: '2025-11-15',
    description: 'Complete federal resume writing guide for veterans with USAJOBS formatting, veteran preference, and examples.',
    keywords: 'federal resume veterans, usajobs resume, veteran preference resume',
    excerpt: "Write a winning federal resume with this comprehensive guide covering USAJOBS formatting, keyword optimization, and veteran preference.",
    category: 'How-To Guides'
  },
  // Nov 14 posts
  {
    slug: 'va-rating-knee-pain-compensation-rates',
    title: 'VA Rating for Knee Pain: Compensation and Rating Guide',
    date: '2025-11-14',
    description: 'Complete guide to VA knee pain ratings from 0%-100%, monthly compensation amounts, evidence requirements, and successful filing strategies.',
    keywords: 'knee pain va rating, va disability knee, knee injury compensation, veterans knee pain',
    excerpt: "Complete guide to VA knee pain ratings from 0%-100%, monthly compensation amounts, evidence requirements, and successful filing strategies for veterans.",
    category: 'VA Disability'
  },
  {
    slug: 'florida-veteran-benefits-2025',
    title: 'Florida Veteran Benefits 2025: Why 1.4 Million Veterans Choose the Sunshine State',
    date: '2025-11-14',
    description: 'Complete guide to Florida veteran benefits: no state income tax, full property tax exemptions, education waivers, and why 1.4M+ veterans call Florida home.',
    keywords: 'Florida veteran benefits, Florida property tax exemption veterans, Florida veteran education benefits',
    excerpt: "Florida's the second-largest veteran population in the country (1.4 million+) for good reason. No state income tax saves you thousands yearly, 100% disabled veterans get complete property tax exemption.",
    category: 'State Benefits'
  },
  {
    slug: '25b-it-specialist-civilian-career-guide',
    title: '25B IT Specialist: Your Cyber Security Career Path to $90K+ Salaries',
    date: '2025-11-14',
    description: 'Complete 25B to civilian IT career guide. Cybersecurity jobs, $90K+ salaries, required certs (Security+, CISSP), clearance value, and remote work opportunities.',
    keywords: '25B civilian jobs, 25B IT specialist career, military IT to cyber security',
    excerpt: "25B Information Technology Specialist is one of the smoothest military-to-civilian transitions. Your experience translates directly to civilian IT roles paying $60K-$75K entry-level and $90K-$130K+ with experience.",
    category: 'Career Guides',
    branch: 'Army'
  },
  {
    slug: 'how-to-transition-military-cybersecurity-career',
    title: 'How to Transition to Cybersecurity: Military IT to Security Career Path',
    date: '2025-11-14',
    description: '17C cyber ops to cybersecurity professional, Security+, CEH, incident response careers, salary expectations, and why military cyber experience is gold.',
    keywords: 'military cybersecurity, 17C career transition, Security+ certification, CEH, cybersecurity careers, incident response',
    excerpt: "If you're military IT (17C, 25B, 25D) with cyber/security background, cybersecurity is your natural path. Transition in 6-12 months with Security+ certification. Starting salary: $80K-$110K.",
    category: 'How-To Guides'
  },
  {
    slug: '11b-infantry-civilian-career-guide',
    title: 'Army 11B Infantry Career Guide (2025)',
    date: '2025-11-13',
    description: 'Complete career transition guide for Army 11B Infantry. Learn top civilian jobs, salary ranges $50K-$250K+, required certifications, and hiring companies.',
    keywords: '11B infantry, army infantry civilian jobs, infantry to police, military to civilian, law enforcement career',
    excerpt: "Transitioning from Army 11B Infantry to civilian career? Discover high-paying paths in law enforcement ($55K-$90K), private security ($80K-$250K), emergency services, and skilled trades with detailed salary data and certification requirements.",
    category: 'Career Guides',
    branch: 'Army'
  },
  {
    slug: '68w-combat-medic-civilian-career-guide',
    title: 'Army 68W Combat Medic Career Guide (2025)',
    date: '2025-11-13',
    description: 'Army 68W Combat Medic career transition guide. EMT to Paramedic to RN pathways, bridge programs, salaries $41K-$120K+, and top employers.',
    keywords: '68W combat medic, army medic civilian jobs, EMT certification, paramedic training, medic to nurse',
    excerpt: "68W Combat Medics have a clear path to civilian healthcare careers. From EMT ($41K-$50K) to Paramedic ($58K-$75K) to Registered Nurse ($75K-$120K+), learn about accelerated bridge programs and top employers.",
    category: 'Career Guides',
    branch: 'Army'
  },
  {
    slug: 'mn-mineman-civilian-career-guide',
    title: 'Navy MN Mineman Career Guide (2025)',
    date: '2025-11-13',
    description: 'Navy Mineman (MN) civilian career guide. Transition to ROV operations, EOD support, defense contracting with salaries $50K-$180K+.',
    keywords: 'navy mineman, MN rating, ROV pilot, EOD technician, defense contractor, underwater robotics',
    excerpt: "Navy Minemen have specialized skills in high demand. Leverage UUV/ROV experience for roles in defense contracting ($52K-$150K), offshore oil/gas ($70K-$150K), and EOD support ($55K-$180K+).",
    category: 'Career Guides',
    branch: 'Navy'
  },
  {
    slug: 'texas-veteran-benefits-2025',
    title: 'Texas Veteran Benefits Guide (2025-2026)',
    date: '2025-11-13',
    description: 'Complete Texas veteran benefits guide 2025-2026. No state income tax, 100% property tax exemption for disabled vets, save $6K+ annually.',
    keywords: 'texas veteran benefits, texas property tax exemption, disabled veteran texas, military retirement texas',
    excerpt: "Texas offers top veteran benefits: no state income tax (save $2K-$6K+ annually), 100% property tax exemption for 100% disabled veterans, plus graduated exemptions for 10-100% disability ratings.",
    category: 'State Benefits'
  },
  {
    slug: 'california-veteran-benefits-2025',
    title: 'California Veteran Benefits Guide (2025-2026)',
    date: '2025-11-13',
    description: 'NEW 2025-2026 California military retirement tax exemption up to $20K. Property tax breaks, CalVet loans, complete veteran benefits guide.',
    keywords: 'california veteran benefits, california property tax exemption, calvet home loan, military retirement california',
    excerpt: "NEW for 2025-2026: California offers up to $20K military retirement income exemption (saving $1,200-$1,860/year), plus property tax exemptions up to $262,950 for 100% disabled veterans.",
    category: 'State Benefits'
  },
  {
    slug: 'back-pain-va-rating-guide',
    title: 'Back Pain VA Rating Guide (2025)',
    date: '2025-11-13',
    description: 'Complete VA disability rating guide for back pain and lumbar spine conditions. Ratings 10%-100%, monthly compensation, evidence requirements.',
    keywords: 'back pain va rating, lumbar spine disability, va rating for back, secondary conditions back pain',
    excerpt: "Understand VA disability ratings for back pain: 10% ($175-$185/month) to 100% ($3,737-$3,850/month). Learn rating criteria, evidence requirements, and how to maximize your claim.",
    category: 'VA Disability'
  },
  {
    slug: 'military-skills-translator-guide',
    title: 'Military Skills Translator Guide (2025)',
    date: '2025-11-13',
    description: 'Compare 6 top military skills translator tools: O*NET, Military.com, CareerOneStop, LinkedIn. Find civilian job matches for your MOS.',
    keywords: 'military skills translator, military to civilian jobs, mos translator, military resume, job search veterans',
    excerpt: "Find your perfect civilian job match with these 6 military skills translator tools. Compare O*NET, Military.com, CareerOneStop, LinkedIn, and more to translate your MOS into high-paying careers.",
    category: 'How-To Guides'
  },
  {
    slug: 'salary-negotiation-guide-veterans',
    title: 'Salary Negotiation Guide for Veterans (2025)',
    date: '2025-11-13',
    description: 'Veterans salary negotiation guide. 90% of employers expect it. Learn 6-step process, scripts, and how to evaluate total compensation packages.',
    keywords: 'salary negotiation veterans, veteran first job, military to civilian salary, negotiate job offer',
    excerpt: "90% of employers expect salary negotiation, but most veterans don't do it. Learn the 6-step process to negotiate base salary, signing bonuses, PTO, and total compensation worth $15K-$30K more.",
    category: 'How-To Guides'
  },
  {
    slug: 'terminal-leave-calculator',
    title: 'Terminal Leave Calculator: Should You Use It or Sell It? (2025)',
    date: '2025-11-14',
    description: 'Take terminal leave or sell it back? We break down the real numbers, tax implications, and who should choose each option with our free calculator.',
    keywords: 'terminal leave calculator, sell terminal leave, terminal leave vs sell back',
    excerpt: "Every separating service member faces this decision: take terminal leave or sell it back for cash? There's no universal right answer. Most people with families should take the leave for TRICARE coverage alone.",
    category: 'How-To Guides'
  }
]

export function getAllPosts() {
  // Get current date at midnight (to include today's posts)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Filter out future posts and sort by date, newest first
  return blogPosts
    .filter(post => new Date(post.date) <= today)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  // Get current date at midnight
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Find post and check if it's published (not a future date)
  const post = blogPosts.find(post => post.slug === slug)
  if (!post) return null

  // Return null for future posts (treat as not found)
  if (new Date(post.date) > today) return null

  return post
}

// Function to load markdown content
export async function getPostContent(slug) {
  try {
    // Use dynamic import to load markdown file
    // Path is relative to src/utils/ so ../content/blog/ goes to src/content/blog/
    const module = await import(`../content/blog/${slug}.md?raw`)
    const content = module.default

    // Parse frontmatter using custom parser (gray-matter doesn't work in browser)
    const { data, content: markdown } = parseFrontmatter(content)
    return {
      frontmatter: data,
      content: markdown
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    console.error('Attempted path:', `../content/blog/${slug}.md?raw`)
    return null
  }
}
