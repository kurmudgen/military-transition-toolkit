import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'https://www.militarytransitiontoolkit.com'

// Parse frontmatter from markdown
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

// Get markdown content without frontmatter
function getContent(content) {
  return content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
}

// Escape HTML entities
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Generate HTML for a blog post (for SEO - content visible to crawlers)
function generateBlogHTML(slug, frontmatter, markdownContent, templateHTML) {
  const title = frontmatter.title || 'Military Transition Toolkit'
  const description = frontmatter.description || 'Military transition resources for veterans.'
  const date = frontmatter.date || ''

  // Convert basic markdown to text for SEO (simplified)
  const plainText = markdownContent
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .substring(0, 5000)

  // Create SEO-optimized HTML with content visible to crawlers
  const seoContent = `
    <article id="seo-content" style="display:none;">
      <h1>${escapeHtml(title)}</h1>
      <time datetime="${date}">${date}</time>
      <div>${escapeHtml(plainText)}</div>
    </article>
    <script>
      // Remove SEO content after React hydrates
      window.addEventListener('load', function() {
        var seo = document.getElementById('seo-content');
        if (seo) seo.remove();
      });
    </script>
  `

  // Inject SEO meta tags and content into template
  let html = templateHTML
    // Replace title
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)} - Military Transition Toolkit</title>`)
    // Add/update meta description
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${escapeHtml(description)}">`
    )
    // Add canonical URL
    .replace(
      '</head>',
      `<link rel="canonical" href="${BASE_URL}/blog/${slug}">\n</head>`
    )
    // Add Open Graph tags
    .replace(
      '<meta property="og:title" content="[^"]*">',
      `<meta property="og:title" content="${escapeHtml(title)}">`
    )
    .replace(
      '<meta property="og:description" content="[^"]*">',
      `<meta property="og:description" content="${escapeHtml(description)}">`
    )
    .replace(
      '<meta property="og:url" content="[^"]*">',
      `<meta property="og:url" content="${BASE_URL}/blog/${slug}">`
    )
    // Inject SEO content into body
    .replace(
      '<div id="root"></div>',
      `<div id="root"></div>${seoContent}`
    )

  return html
}

console.log('🔧 Starting prerender process...\n')

const distDir = path.join(__dirname, '../dist')
const blogDir = path.join(__dirname, '../src/content/blog')

// Check if dist exists
if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Run npm run build first.')
  process.exit(1)
}

// Read template HTML
const templatePath = path.join(distDir, 'index.html')
const templateHTML = fs.readFileSync(templatePath, 'utf8')

// Create blog directory in dist if not exists
const blogDistDir = path.join(distDir, 'blog')
if (!fs.existsSync(blogDistDir)) {
  fs.mkdirSync(blogDistDir, { recursive: true })
}

// Get all blog posts
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))
console.log(`Found ${files.length} markdown files`)

let processed = 0
let skipped = 0
const today = new Date()
today.setHours(0, 0, 0, 0)

files.forEach(filename => {
  try {
    const filepath = path.join(blogDir, filename)
    const content = fs.readFileSync(filepath, 'utf8')
    const frontmatter = parseFrontmatter(content)
    const postDate = frontmatter.date || frontmatter.publishDate

    // Skip files without proper frontmatter
    if (!frontmatter.title || !postDate) {
      skipped++
      return
    }

    // Skip future posts
    if (new Date(postDate) > today) {
      skipped++
      return
    }

    const slug = filename.replace('.md', '')
    const markdownContent = getContent(content)

    // Generate HTML
    const html = generateBlogHTML(slug, frontmatter, markdownContent, templateHTML)

    // Create directory for this post
    const postDir = path.join(blogDistDir, slug)
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true })
    }

    // Write HTML file
    fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf8')
    processed++

    if (processed % 100 === 0) {
      console.log(`  ✓ Processed ${processed} posts...`)
    }
  } catch (error) {
    console.error(`❌ Error processing ${filename}: ${error.message}`)
    skipped++
  }
})

// Also create a prerendered blog index page
const blogIndexHTML = templateHTML
  .replace(/<title>[^<]*<\/title>/, '<title>Blog - Military Transition Toolkit</title>')
  .replace(
    /<meta name="description" content="[^"]*">/,
    '<meta name="description" content="Military transition guides, veteran career resources, VA disability claim tips, and state benefits comparisons.">'
  )
  .replace('</head>', `<link rel="canonical" href="${BASE_URL}/blog">\n</head>`)

fs.writeFileSync(path.join(blogDistDir, 'index.html'), blogIndexHTML, 'utf8')

console.log(`\n✅ Prerendering complete!`)
console.log(`   📝 Processed: ${processed} blog posts`)
console.log(`   ⏭️  Skipped: ${skipped} files (no frontmatter or future date)`)
console.log(`   📁 Output: ${blogDistDir}/`)
