import matter from 'gray-matter'

// This would normally use fs to read files server-side, but in a Vite app
// we need to import the posts directly or use dynamic imports
// For now, we'll manually maintain a list of posts

const blogPosts = [
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
    title: 'Terminal Leave Calculator Guide (2025)',
    date: '2025-11-13',
    description: 'Calculate whether taking terminal leave or selling it back gives you more value. Free calculator for active duty service members.',
    keywords: 'terminal leave calculator, military terminal leave, sell terminal leave, terminal leave vs sell back',
    excerpt: "When you're preparing to separate from the military, one of the most important financial decisions you'll make is what to do with your terminal leave. Should you take it and extend your benefits, or sell it back for a lump sum payment?"
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

    console.log(`[DEBUG] Loading post: ${slug}`)
    console.log(`[DEBUG] Raw content length: ${content.length}`)
    console.log(`[DEBUG] First 200 chars:`, content.substring(0, 200))

    // Parse frontmatter if present, otherwise just return content
    try {
      const { data, content: markdown } = matter(content)
      console.log(`[DEBUG] Frontmatter parsed successfully`)
      console.log(`[DEBUG] Frontmatter data:`, data)
      console.log(`[DEBUG] Content without frontmatter length: ${markdown.length}`)
      console.log(`[DEBUG] Content first 100 chars:`, markdown.substring(0, 100))
      return {
        frontmatter: data,
        content: markdown
      }
    } catch (parseError) {
      // If no frontmatter, return content as-is
      console.error(`[DEBUG] Failed to parse frontmatter:`, parseError)
      return {
        frontmatter: {},
        content: content
      }
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    console.error('Attempted path:', `../content/blog/${slug}.md?raw`)
    return null
  }
}
