import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'https://www.militarytransitiontoolkit.com'
const TODAY = new Date().toISOString().split('T')[0]

// Static pages with their priorities
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/resources', priority: '0.9', changefreq: 'weekly' },
  { path: '/state-benefits', priority: '0.9', changefreq: 'weekly' },
  { path: '/app', priority: '0.9', changefreq: 'weekly' },
  { path: '/app/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/app/faq', priority: '0.8', changefreq: 'monthly' },
  { path: '/app/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/app/terms', priority: '0.5', changefreq: 'monthly' },
  { path: '/app/refund', priority: '0.5', changefreq: 'monthly' },
  { path: '/login', priority: '0.6', changefreq: 'monthly' },
  { path: '/signup', priority: '0.6', changefreq: 'monthly' },
]

// Parse frontmatter from markdown
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)

  if (!match) return {}

  const frontmatterText = match[1]
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

  return data
}

console.log('🗺️  Generating sitemap...\n')

// Read all blog posts
const blogDir = path.join(__dirname, '../src/content/blog')
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))

console.log(`Found ${files.length} markdown files`)

const blogPosts = []
let skipped = 0

files.forEach(filename => {
  try {
    const filepath = path.join(blogDir, filename)
    const content = fs.readFileSync(filepath, 'utf8')
    const frontmatter = parseFrontmatter(content)

    const postDate = frontmatter.date || frontmatter.publishDate

    if (!frontmatter.title || !postDate) {
      skipped++
      return
    }

    const slug = filename.replace('.md', '')
    blogPosts.push({
      slug,
      date: postDate
    })
  } catch (error) {
    skipped++
  }
})

console.log(`✅ ${blogPosts.length} valid blog posts`)
console.log(`⏭️  ${skipped} files skipped (no title/date)\n`)

// Generate sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

// Add static pages
staticPages.forEach(page => {
  sitemap += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
})

// Add blog posts
blogPosts.forEach(post => {
  sitemap += `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
})

sitemap += `</urlset>
`

// Write sitemap
const outputPath = path.join(__dirname, '../public/sitemap.xml')
fs.writeFileSync(outputPath, sitemap, 'utf8')

const totalUrls = staticPages.length + blogPosts.length

console.log(`✅ Generated sitemap at ${outputPath}`)
console.log(`📊 Total URLs: ${totalUrls}`)
console.log(`   - Static pages: ${staticPages.length}`)
console.log(`   - Blog posts: ${blogPosts.length}`)
console.log('\n✨ Done!')
