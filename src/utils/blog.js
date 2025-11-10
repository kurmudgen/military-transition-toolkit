import matter from 'gray-matter'

// This would normally use fs to read files server-side, but in a Vite app
// we need to import the posts directly or use dynamic imports
// For now, we'll manually maintain a list of posts

const blogPosts = [
  {
    slug: 'terminal-leave-calculator',
    title: 'Terminal Leave Calculator: Should You Use It or Sell It?',
    date: '2025-11-09',
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
    const module = await import(`../content/blog/${slug}.md?raw`)
    const content = module.default

    // Parse frontmatter
    const { data, content: markdown } = matter(content)

    return {
      frontmatter: data,
      content: markdown
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}
