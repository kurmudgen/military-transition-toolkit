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
  {
    slug: 'va-rating-knee-pain-compensation-rates',
    title: 'VA Rating for Knee Pain: Compensation and Rating Guide',
    date: '2025-11-14',
    description: 'Complete guide to VA knee pain ratings from 0%-100%, monthly compensation amounts, evidence requirements, and successful filing strategies.',
    keywords: 'knee pain va rating, va disability knee, knee injury compensation, veterans knee pain',
    excerpt: "Complete guide to VA knee pain ratings from 0%-100%, monthly compensation amounts, evidence requirements, and successful filing strategies for veterans."
  },
  {
    slug: 'florida-veteran-benefits-2025',
    title: 'Florida Veteran Benefits 2025: Why 1.4 Million Veterans Choose the Sunshine State',
    date: '2025-11-14',
    description: 'Complete guide to Florida veteran benefits: no state income tax, full property tax exemptions, education waivers, and why 1.4M+ veterans call Florida home.',
    keywords: 'Florida veteran benefits, Florida property tax exemption veterans, Florida veteran education benefits',
    excerpt: "Florida's the second-largest veteran population in the country (1.4 million+) for good reason. No state income tax saves you thousands yearly, 100% disabled veterans get complete property tax exemption."
  },
  {
    slug: '25b-it-specialist-civilian-career-guide',
    title: '25B IT Specialist: Your Cyber Security Career Path to $90K+ Salaries',
    date: '2025-11-14',
    description: 'Complete 25B to civilian IT career guide. Cybersecurity jobs, $90K+ salaries, required certs (Security+, CISSP), clearance value, and remote work opportunities.',
    keywords: '25B civilian jobs, 25B IT specialist career, military IT to cyber security',
    excerpt: "25B Information Technology Specialist is one of the smoothest military-to-civilian transitions. Your experience translates directly to civilian IT roles paying $60K-$75K entry-level and $90K-$130K+ with experience."
  },
  {
    slug: 'how-to-transition-military-cybersecurity-career',
    title: 'How to Transition to Cybersecurity: Military IT to Security Career Path',
    date: '2025-11-14',
    description: '17C cyber ops to cybersecurity professional, Security+, CEH, incident response careers, salary expectations, and why military cyber experience is gold.',
    keywords: 'military cybersecurity, 17C career transition, Security+ certification, CEH, cybersecurity careers, incident response',
    excerpt: "If you're military IT (17C, 25B, 25D) with cyber/security background, cybersecurity is your natural path. Transition in 6-12 months with Security+ certification. Starting salary: $80K-$110K."
  },
  {
    slug: '11b-infantry-civilian-career-guide',
    title: 'Army 11B Infantry Career Guide (2025)',
    date: '2025-11-13',
    description: 'Complete career transition guide for Army 11B Infantry. Learn top civilian jobs, salary ranges $50K-$250K+, required certifications, and hiring companies.',
    keywords: '11B infantry, army infantry civilian jobs, infantry to police, military to civilian, law enforcement career',
    excerpt: "Transitioning from Army 11B Infantry to civilian career? Discover high-paying paths in law enforcement ($55K-$90K), private security ($80K-$250K), emergency services, and skilled trades with detailed salary data and certification requirements."
  },
  {
    slug: '68w-combat-medic-civilian-career-guide',
    title: 'Army 68W Combat Medic Career Guide (2025)',
    date: '2025-11-13',
    description: 'Army 68W Combat Medic career transition guide. EMT to Paramedic to RN pathways, bridge programs, salaries $41K-$120K+, and top employers.',
    keywords: '68W combat medic, army medic civilian jobs, EMT certification, paramedic training, medic to nurse',
    excerpt: "68W Combat Medics have a clear path to civilian healthcare careers. From EMT ($41K-$50K) to Paramedic ($58K-$75K) to Registered Nurse ($75K-$120K+), learn about accelerated bridge programs and top employers."
  },
  {
    slug: 'mn-mineman-civilian-career-guide',
    title: 'Navy MN Mineman Career Guide (2025)',
    date: '2025-11-13',
    description: 'Navy Mineman (MN) civilian career guide. Transition to ROV operations, EOD support, defense contracting with salaries $50K-$180K+.',
    keywords: 'navy mineman, MN rating, ROV pilot, EOD technician, defense contractor, underwater robotics',
    excerpt: "Navy Minemen have specialized skills in high demand. Leverage UUV/ROV experience for roles in defense contracting ($52K-$150K), offshore oil/gas ($70K-$150K), and EOD support ($55K-$180K+)."
  },
  {
    slug: 'texas-veteran-benefits-2025',
    title: 'Texas Veteran Benefits Guide (2025-2026)',
    date: '2025-11-13',
    description: 'Complete Texas veteran benefits guide 2025-2026. No state income tax, 100% property tax exemption for disabled vets, save $6K+ annually.',
    keywords: 'texas veteran benefits, texas property tax exemption, disabled veteran texas, military retirement texas',
    excerpt: "Texas offers top veteran benefits: no state income tax (save $2K-$6K+ annually), 100% property tax exemption for 100% disabled veterans, plus graduated exemptions for 10-100% disability ratings."
  },
  {
    slug: 'california-veteran-benefits-2025',
    title: 'California Veteran Benefits Guide (2025-2026)',
    date: '2025-11-13',
    description: 'NEW 2025-2026 California military retirement tax exemption up to $20K. Property tax breaks, CalVet loans, complete veteran benefits guide.',
    keywords: 'california veteran benefits, california property tax exemption, calvet home loan, military retirement california',
    excerpt: "NEW for 2025-2026: California offers up to $20K military retirement income exemption (saving $1,200-$1,860/year), plus property tax exemptions up to $262,950 for 100% disabled veterans."
  },
  {
    slug: 'back-pain-va-rating-guide',
    title: 'Back Pain VA Rating Guide (2025)',
    date: '2025-11-13',
    description: 'Complete VA disability rating guide for back pain and lumbar spine conditions. Ratings 10%-100%, monthly compensation, evidence requirements.',
    keywords: 'back pain va rating, lumbar spine disability, va rating for back, secondary conditions back pain',
    excerpt: "Understand VA disability ratings for back pain: 10% ($175-$185/month) to 100% ($3,737-$3,850/month). Learn rating criteria, evidence requirements, and how to maximize your claim."
  },
  {
    slug: 'military-skills-translator-guide',
    title: 'Military Skills Translator Guide (2025)',
    date: '2025-11-13',
    description: 'Compare 6 top military skills translator tools: O*NET, Military.com, CareerOneStop, LinkedIn. Find civilian job matches for your MOS.',
    keywords: 'military skills translator, military to civilian jobs, mos translator, military resume, job search veterans',
    excerpt: "Find your perfect civilian job match with these 6 military skills translator tools. Compare O*NET, Military.com, CareerOneStop, LinkedIn, and more to translate your MOS into high-paying careers."
  },
  {
    slug: 'salary-negotiation-guide-veterans',
    title: 'Salary Negotiation Guide for Veterans (2025)',
    date: '2025-11-13',
    description: 'Veterans salary negotiation guide. 90% of employers expect it. Learn 6-step process, scripts, and how to evaluate total compensation packages.',
    keywords: 'salary negotiation veterans, veteran first job, military to civilian salary, negotiate job offer',
    excerpt: "90% of employers expect salary negotiation, but most veterans don't do it. Learn the 6-step process to negotiate base salary, signing bonuses, PTO, and total compensation worth $15K-$30K more."
  },
  {
    slug: 'terminal-leave-calculator',
    title: 'Terminal Leave Calculator: Should You Use It or Sell It? (2025)',
    date: '2025-11-14',
    description: 'Take terminal leave or sell it back? We break down the real numbers, tax implications, and who should choose each option with our free calculator.',
    keywords: 'terminal leave calculator, sell terminal leave, terminal leave vs sell back',
    excerpt: "Every separating service member faces this decision: take terminal leave or sell it back for cash? There's no universal right answer. Most people with families should take the leave for TRICARE coverage alone."
  }
]

export function getAllPosts() {
  // Sort by date, newest first
  return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug)
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
