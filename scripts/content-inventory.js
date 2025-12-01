import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

// Categorize filename
function categorizeFile(filename, filepath) {
  const lower = filename.toLowerCase()

  // Army MOS patterns
  if (lower.match(/^army-mos-\d+[a-z]/) || lower.match(/^\d{2}[a-z]-/)) {
    return { category: 'Army MOS Guides', subcategory: extractMOS(filename) }
  }

  // Air Force AFSC patterns
  if (lower.match(/afsc/) || lower.match(/air-force-afsc/)) {
    return { category: 'Air Force AFSC Guides', subcategory: extractAFSC(filename) }
  }

  // Navy Rate patterns
  if (lower.match(/^[a-z]{2,3}-.*civilian-career/) && !lower.includes('army') && !lower.includes('marine') && !lower.includes('air-force')) {
    if (!lower.includes('coastguard') && !lower.includes('coast-guard')) {
      return { category: 'Navy Rate Guides', subcategory: extractRate(filename) }
    }
  }

  // Coast Guard
  if (lower.includes('coastguard') || lower.includes('coast-guard')) {
    return { category: 'Coast Guard Rate Guides', subcategory: extractRate(filename) }
  }

  // Marine Corps MOS patterns
  if (lower.match(/^0\d{3}-/) || lower.match(/^marine/)) {
    return { category: 'Marine Corps MOS Guides', subcategory: extractMarineMOS(filename) }
  }

  // VA Disability
  if (lower.includes('va-rating') || lower.includes('cp-exam') || lower.includes('disability') || lower.includes('claiming')) {
    return { category: 'VA Disability Guides', subcategory: null }
  }

  // State benefits
  if (lower.includes('best-cities') || lower.includes('veteran-benefits') || lower.includes('veteran-tax-benefits') || lower.includes('veteran-healthcare')) {
    return { category: 'State Benefits Guides', subcategory: extractState(filename) }
  }

  // How-to guides
  if (lower.includes('how-to') || lower.includes('guide') && !lower.includes('civilian-career')) {
    return { category: 'How-To & General Guides', subcategory: null }
  }

  // Calculator research
  if (filepath.includes('Calculator-Research')) {
    return { category: 'Calculator Research', subcategory: null }
  }

  // Technical/administrative
  if (lower.match(/readme|security|deployment|grant|phase|migration|setup|guide/) && !lower.includes('career')) {
    return { category: 'Technical/Administrative', subcategory: null }
  }

  return { category: 'Other/Uncategorized', subcategory: null }
}

function extractMOS(filename) {
  const match = filename.match(/(\d{2,3}[a-zA-Z])/i)
  return match ? match[1].toUpperCase() : null
}

function extractAFSC(filename) {
  const match = filename.match(/(\d[a-zA-Z]\d{2}x?\d)/i)
  return match ? match[1].toUpperCase() : null
}

function extractRate(filename) {
  const match = filename.match(/^([a-zA-Z]{2,3})-/)
  return match ? match[1].toUpperCase() : null
}

function extractMarineMOS(filename) {
  const match = filename.match(/^(0\d{3})/)
  return match ? match[1] : null
}

function extractState(filename) {
  const match = filename.match(/^([a-z]{2})-/)
  return match ? match[1].toUpperCase() : null
}

console.log('📊 Creating comprehensive content inventory...\n')

// Scan app blog folder
console.log('1️⃣  Scanning app blog folder...')
const appBlogDir = path.join(__dirname, '../src/content/blog')
const appFiles = fs.readdirSync(appBlogDir)
  .filter(f => f.endsWith('.md'))
  .map(f => {
    const filepath = path.join(appBlogDir, f)
    const content = fs.readFileSync(filepath, 'utf8')
    const frontmatter = parseFrontmatter(content)
    const cat = categorizeFile(f, filepath)

    return {
      filename: f,
      location: 'app',
      title: frontmatter.title || f.replace('.md', ''),
      category: cat.category,
      subcategory: cat.subcategory,
      branch: frontmatter.branch || null
    }
  })

console.log(`   Found ${appFiles.length} files in app`)

// Scan S: drive
console.log('\n2️⃣  Scanning S: drive content library...')
const sDriveRoot = 'S:/Military-Toolkit-Content-Library'
const sFiles = []

function scanDirectory(dir, basePath = '') {
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      const relativePath = path.join(basePath, item.name)

      if (item.isDirectory()) {
        scanDirectory(fullPath, relativePath)
      } else if (item.name.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8')
          const frontmatter = parseFrontmatter(content)
          const cat = categorizeFile(item.name, fullPath)

          sFiles.push({
            filename: item.name,
            location: `S:/${relativePath}`,
            title: frontmatter.title || item.name.replace('.md', ''),
            category: cat.category,
            subcategory: cat.subcategory,
            folder: path.dirname(relativePath)
          })
        } catch (err) {
          // Skip files that can't be read
        }
      }
    }
  } catch (err) {
    // Skip directories that can't be read
  }
}

scanDirectory(sDriveRoot)
console.log(`   Found ${sFiles.length} markdown files on S: drive`)

// Find duplicates
console.log('\n3️⃣  Identifying duplicates...')
const duplicates = []
const appFileNames = new Set(appFiles.map(f => f.filename))

for (const sFile of sFiles) {
  if (appFileNames.has(sFile.filename)) {
    duplicates.push(sFile.filename)
  }
}

console.log(`   Found ${duplicates.length} duplicate filenames`)

// Categorize all files
console.log('\n4️⃣  Categorizing content...')
const allFiles = [...appFiles, ...sFiles]
const byCategory = {}

allFiles.forEach(file => {
  if (!byCategory[file.category]) {
    byCategory[file.category] = []
  }
  byCategory[file.category].push(file)
})

// Sort categories by count
const sortedCategories = Object.entries(byCategory)
  .sort((a, b) => b[1].length - a[1].length)

// Find files on S: drive not in app
const missingFromApp = sFiles.filter(sf => {
  const cat = sf.category
  // Only consider blog-worthy content
  if (cat === 'Technical/Administrative' || cat === 'Calculator Research') {
    return false
  }
  return !appFileNames.has(sf.filename)
})

// Generate report
console.log('\n5️⃣  Generating inventory report...')

let report = `# Military Transition Toolkit - Content Inventory

**Generated:** ${new Date().toISOString().split('T')[0]}
**Last Updated:** ${new Date().toLocaleString()}

---

## Executive Summary

| Metric | Count |
|--------|-------|
| **Total posts in app** | ${appFiles.length} |
| **Total files on S: drive** | ${sFiles.length} |
| **Duplicate filenames** | ${duplicates.length} |
| **Blog-worthy content missing from app** | ${missingFromApp.length} |
| **Unique content pieces** | ${new Set(allFiles.map(f => f.filename)).size} |

---

## Content by Category

`

sortedCategories.forEach(([category, files]) => {
  report += `### ${category} (${files.length})\n\n`

  const appCount = files.filter(f => f.location === 'app').length
  const sCount = files.filter(f => f.location !== 'app').length

  report += `- **In App:** ${appCount}\n`
  report += `- **On S: Drive:** ${sCount}\n\n`

  // Group by subcategory if present
  const bySubcat = {}
  files.forEach(f => {
    const key = f.subcategory || 'Other'
    if (!bySubcat[key]) bySubcat[key] = []
    bySubcat[key].push(f)
  })

  // Sort by subcategory, show first 20 from app
  const appFilesInCat = files.filter(f => f.location === 'app').slice(0, 20)

  if (appFilesInCat.length > 0) {
    report += `**Sample files in app:**\n`
    appFilesInCat.forEach(f => {
      report += `- ${f.filename}\n`
    })
    if (files.filter(f => f.location === 'app').length > 20) {
      report += `- ... and ${files.filter(f => f.location === 'app').length - 20} more\n`
    }
    report += `\n`
  }
})

report += `---

## Duplicate Files

Files that exist in both app and S: drive (${duplicates.length} total):

`

duplicates.slice(0, 50).forEach(dup => {
  report += `- ${dup}\n`
})

if (duplicates.length > 50) {
  report += `- ... and ${duplicates.length - 50} more\n`
}

report += `\n---

## Blog-Worthy Content Missing from App

Content on S: drive that could be published (${missingFromApp.length} files):

`

// Group missing content by category
const missingByCategory = {}
missingFromApp.forEach(f => {
  if (!missingByCategory[f.category]) {
    missingByCategory[f.category] = []
  }
  missingByCategory[f.category].push(f)
})

Object.entries(missingByCategory)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([cat, files]) => {
    report += `\n### ${cat} (${files.length})\n\n`
    files.slice(0, 20).forEach(f => {
      report += `- ${f.filename}\n`
      report += `  - Location: ${f.folder}\n`
    })
    if (files.length > 20) {
      report += `- ... and ${files.length - 20} more\n`
    }
  })

report += `\n---

## S: Drive Folder Structure

`

// Get unique folders from S: drive
const folders = [...new Set(sFiles.map(f => f.folder))].sort()
const folderCounts = {}

sFiles.forEach(f => {
  folderCounts[f.folder] = (folderCounts[f.folder] || 0) + 1
})

folders.forEach(folder => {
  report += `- **${folder}** (${folderCounts[folder]} files)\n`
})

report += `\n---

## Recommendations

1. **Duplicates:** ${duplicates.length} files exist in both locations - consider using app as single source of truth
2. **Missing Content:** ${missingFromApp.length} blog-worthy files on S: drive could be added to app
3. **Organization:** Consider consolidating S: drive content into organized folders
4. **Next Steps:**
   - Review "Missing from App" section for content to publish
   - Clean up duplicate files
   - Organize S: drive content library

---

*Generated by content-inventory.js*
`

// Write report
const outputPath = 'S:/Military-Toolkit-Content-Library/CONTENT-INVENTORY.md'
fs.writeFileSync(outputPath, report, 'utf8')

console.log(`\n✅ Inventory complete!`)
console.log(`📄 Report saved to: ${outputPath}`)
console.log(`\n📊 Summary:`)
console.log(`   Total posts in app: ${appFiles.length}`)
console.log(`   Total files on S: drive: ${sFiles.length}`)
console.log(`   Duplicates: ${duplicates.length}`)
console.log(`   Blog-worthy content missing from app: ${missingFromApp.length}`)
console.log(`\n✨ Done!`)
