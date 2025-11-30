import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sDriveRoot = 'S:/Military-Toolkit-Content-Library'
const appBlogDir = path.join(__dirname, '../src/content/blog')

// Parse frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)
  if (!match) return {}

  const data = {}
  match[1].split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      value = value.replace(/^["']|["']$/g, '')
      data[key] = value
    }
  })
  return data
}

// Categorize for priority
function categorizeFile(filename, filepath) {
  const lower = filename.toLowerCase()

  // Skip technical/admin files
  if (lower.includes('readme') || lower.includes('security') ||
      lower.includes('deployment') || lower.includes('grant') ||
      lower.includes('phase') || lower.includes('migration') ||
      lower.includes('setup') || lower.includes('audit') ||
      lower.includes('guide') && filepath.includes('00-INBOX') ||
      lower.includes('pentest') || lower.includes('stripe')) {
    return { category: 'skip', priority: 0 }
  }

  // High priority: How-To guides
  if (lower.includes('how-to')) {
    return { category: 'how-to', priority: 100 }
  }

  // High priority: Employer guides
  if (lower.includes('best-companies')) {
    return { category: 'employer', priority: 95 }
  }

  // High priority: Benefits planning
  if (lower.includes('terminal-leave') || lower.includes('tsp-') ||
      lower.includes('gi-bill') || lower.includes('vr-e') ||
      lower.includes('30-days-before')) {
    return { category: 'benefits', priority: 90 }
  }

  // Medium priority: Career transition
  if ((lower.includes('resume') || lower.includes('retirement') ||
       lower.includes('medical-retirement') || lower.includes('spouse')) &&
      !lower.includes('civilian-career-guide')) {
    return { category: 'career-transition', priority: 80 }
  }

  // Medium priority: General transition
  if (lower.includes('transition') && !lower.includes('civilian-career-guide')) {
    return { category: 'general-transition', priority: 70 }
  }

  // Career guides (MOS/AFSC/Rate specific)
  if (lower.includes('civilian-career-guide')) {
    return { category: 'career-guide', priority: 60 }
  }

  // State benefits
  if (lower.includes('veteran-benefits') || lower.includes('best-cities') ||
      lower.includes('veteran-tax') || lower.includes('veteran-healthcare')) {
    return { category: 'state-benefits', priority: 50 }
  }

  // VA disability
  if (lower.includes('va-rating') || lower.includes('cp-exam')) {
    return { category: 'va-disability', priority: 85 }
  }

  return { category: 'other', priority: 40 }
}

console.log('📦 Deploying S: drive content to app...\n')

// Get existing app files
const existingFiles = new Set(
  fs.readdirSync(appBlogDir)
    .filter(f => f.endsWith('.md'))
)

console.log(`📂 Existing app files: ${existingFiles.size}`)

// Scan S: drive
console.log(`🔍 Scanning S: drive for publishable content...\n`)

const candidates = []

function scanDirectory(dir, basePath = '') {
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      const relativePath = path.join(basePath, item.name)

      if (item.isDirectory()) {
        scanDirectory(fullPath, relativePath)
      } else if (item.name.endsWith('.md')) {
        // Skip if already exists
        if (existingFiles.has(item.name)) {
          continue
        }

        try {
          const content = fs.readFileSync(fullPath, 'utf8')
          const frontmatter = parseFrontmatter(content)
          const cat = categorizeFile(item.name, fullPath)

          if (cat.category === 'skip') continue

          // Must have title
          if (!frontmatter.title && content.length < 100) continue

          candidates.push({
            filename: item.name,
            sourcePath: fullPath,
            content: content,
            frontmatter: frontmatter,
            category: cat.category,
            priority: cat.priority
          })
        } catch (err) {
          // Skip files that can't be read
        }
      }
    }
  } catch (err) {
    // Skip directories that can't be accessed
  }
}

scanDirectory(sDriveRoot)

console.log(`✅ Found ${candidates.length} publishable files not in app`)

// Sort by priority (high to low)
candidates.sort((a, b) => b.priority - a.priority)

// Group by category
const byCategory = {}
candidates.forEach(c => {
  if (!byCategory[c.category]) byCategory[c.category] = []
  byCategory[c.category].push(c)
})

console.log('\n📊 By category:')
Object.entries(byCategory).forEach(([cat, files]) => {
  console.log(`   ${cat}: ${files.length}`)
})

// Copy files
console.log(`\n📋 Copying files to app blog folder...\n`)

let copied = 0
let errors = []

for (const candidate of candidates) {
  try {
    const destPath = path.join(appBlogDir, candidate.filename)

    // Copy file
    fs.copyFileSync(candidate.sourcePath, destPath)
    copied++

    if (copied % 50 === 0) {
      console.log(`   Copied ${copied}/${candidates.length}...`)
    }
  } catch (err) {
    errors.push(`${candidate.filename}: ${err.message}`)
  }
}

console.log(`\n✅ Successfully copied ${copied} files`)

if (errors.length > 0) {
  console.log(`\n⚠️  ${errors.length} errors:`)
  errors.slice(0, 10).forEach(e => console.log(`   ${e}`))
  if (errors.length > 10) {
    console.log(`   ... and ${errors.length - 10} more`)
  }
}

// Summary
console.log(`\n📈 Summary:`)
console.log(`   Files in app before: ${existingFiles.size}`)
console.log(`   Files copied: ${copied}`)
console.log(`   Total files now: ${existingFiles.size + copied}`)

console.log(`\n✨ Next steps:`)
console.log(`   1. Run: node scripts/generate-blog-index.js`)
console.log(`   2. Run: node scripts/update-blog-dates.js`)
console.log(`   3. Run: node scripts/generate-blog-index.js (again)`)
console.log(`   4. Commit and push`)
