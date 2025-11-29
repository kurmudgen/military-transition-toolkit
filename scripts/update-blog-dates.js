import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Parse frontmatter from markdown
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: content, frontmatterText: '' }
  }

  const frontmatterText = match[1]
  const contentWithoutFrontmatter = content.substring(match[0].length)

  const data = {}
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      value = value.replace(/^["']|["']$/g, '')
      data[key] = value
    }
  })

  return { data, content: contentWithoutFrontmatter, frontmatterText }
}

// Update frontmatter with new date
function updateFrontmatterDate(frontmatterText, newDate) {
  let updated = frontmatterText

  // Update or add date field
  if (updated.includes('date:')) {
    updated = updated.replace(/^date:.*$/m, `date: "${newDate}"`)
  } else if (updated.includes('publishDate:')) {
    // If only publishDate exists, add date field after it
    updated = updated.replace(/^publishDate:.*$/m, (match) => `${match}\ndate: "${newDate}"`)
  } else {
    // Add date as second line (after title)
    const lines = updated.split('\n')
    lines.splice(1, 0, `date: "${newDate}"`)
    updated = lines.join('\n')
  }

  return updated
}

// Priority ranking for post types (higher = publish first)
function getPriority(filename, frontmatter) {
  let score = 0

  // High-value popular MOS/AFSC/Ratings (publish first)
  const popularMOS = ['11b', '25b', '68w', '17c', '31b', '35f', '88m', '92y']
  const popularAFSC = ['1a0x1', '1a1x1', '2a3x3']
  const popularRatings = ['hm', 'it', 'ls', 'yn', 'gm']

  if (popularMOS.some(mos => filename.includes(mos))) score += 100
  if (popularAFSC.some(afsc => filename.includes(afsc))) score += 100
  if (popularRatings.some(rating => filename.includes(`${rating}-`))) score += 100

  // Category priorities
  if (filename.includes('va-rating') || filename.includes('cp-exam')) score += 50
  if (filename.includes('best-cities') || filename.includes('veteran-benefits')) score += 40
  if (filename.includes('how-to')) score += 30
  if (filename.includes('civilian-career-guide')) score += 20

  // Army posts slightly higher (largest branch)
  if (filename.includes('army-mos')) score += 5

  // Marines slightly higher
  if (filename.match(/^0[0-9]{3}/)) score += 4

  // Navy ratings
  if (filename.match(/^[a-z]{2,3}-.*civilian-career/i) && !filename.includes('coast')) score += 3

  // Air Force
  if (filename.includes('afsc')) score += 2

  // Coast Guard (smaller, less priority)
  if (filename.includes('coastguard') || filename.includes('coast-guard')) score += 1

  return score
}

console.log('🔍 Scanning blog posts...\n')

const blogDir = path.join(__dirname, '../src/content/blog')
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))

console.log(`Found ${files.length} markdown files\n`)

// Read all files and get metadata
const postsData = []
files.forEach(filename => {
  try {
    const filepath = path.join(blogDir, filename)
    const content = fs.readFileSync(filepath, 'utf8')
    const { data, content: bodyContent, frontmatterText } = parseFrontmatter(content)

    const priority = getPriority(filename, data)

    postsData.push({
      filename,
      filepath,
      originalContent: content,
      frontmatter: data,
      frontmatterText,
      bodyContent,
      priority
    })
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error.message)
  }
})

// Sort by priority (highest first)
postsData.sort((a, b) => b.priority - a.priority)

console.log('📅 Assigning staggered dates (10 posts per day starting Nov 28, 2025)...\n')

const startDate = new Date('2025-11-28')
const postsPerDay = 10
let updatedCount = 0

postsData.forEach((post, index) => {
  const dayOffset = Math.floor(index / postsPerDay)
  const publishDate = new Date(startDate)
  publishDate.setDate(startDate.getDate() + dayOffset)

  const dateString = publishDate.toISOString().split('T')[0]

  // Update frontmatter with new date
  const updatedFrontmatter = updateFrontmatterDate(post.frontmatterText, dateString)
  const updatedContent = `---\n${updatedFrontmatter}\n---${post.bodyContent}`

  // Write updated content back to file
  fs.writeFileSync(post.filepath, updatedContent, 'utf8')
  updatedCount++

  if (index < 10 || index % 50 === 0) {
    console.log(`   [${dateString}] ${post.filename.substring(0, 60)}... (priority: ${post.priority})`)
  }
})

console.log(`\n✅ Updated ${updatedCount} blog posts`)

// Calculate date range
const lastDayOffset = Math.floor((postsData.length - 1) / postsPerDay)
const endDate = new Date(startDate)
endDate.setDate(startDate.getDate() + lastDayOffset)

console.log(`📅 Publishing schedule: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`)
console.log(`📊 ${Math.ceil(postsData.length / postsPerDay)} days of content (${postsPerDay} posts/day)`)
console.log(`\n✨ Done! Now run 'node scripts/generate-blog-index.js' to regenerate the blog index.`)
