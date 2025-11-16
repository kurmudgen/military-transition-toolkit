import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getAllPosts } from '../utils/blog'

export default function Blog() {
  const { user } = useAuth()
  const allPosts = getAllPosts()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('newest') // newest, oldest, alphabetical

  useEffect(() => {
    document.title = 'Blog - Military Transition Toolkit'
  }, [])

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    // Filter by search query
    let filtered = allPosts.filter(post => {
      const searchLower = searchQuery.toLowerCase()
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        (post.category && post.category.toLowerCase().includes(searchLower))
      )
    })

    // Sort posts
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.date) - new Date(a.date)
        case 'oldest':
          return new Date(a.date) - new Date(b.date)
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return sorted
  }, [allPosts, searchQuery, sortOption])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              Military Transition Toolkit
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <Link to="/resources" className="text-slate-300 hover:text-white transition-colors">
                Resources
              </Link>
              <Link to="/blog" className="text-blue-400 font-semibold">
                Blog
              </Link>
              <Link to="/app/about" className="text-slate-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/app/faq" className="text-slate-300 hover:text-white transition-colors">
                FAQ
              </Link>

              {/* Show different buttons based on auth state */}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-white rounded-lg transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link
                  to="/app"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Dashboard →
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-white text-sm rounded-lg transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link
                  to="/app"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  Dashboard →
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Military Transition Blog
          </h1>
          <p className="text-xl text-slate-300">
            Guides, calculators, and advice for transitioning service members
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search posts by title, content, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="md:w-48">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-slate-400 text-sm">
          Showing {filteredAndSortedPosts.length} of {allPosts.length} posts
          {searchQuery && ` for "${searchQuery}"`}
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {filteredAndSortedPosts.map(post => (
            <article
              key={post.slug}
              className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700 hover:border-blue-500 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <time className="text-sm text-slate-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                <Link to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-slate-300 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* Empty State - No posts at all */}
        {allPosts.length === 0 && (
          <div className="bg-slate-800 rounded-xl shadow-lg p-12 border border-slate-700 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Posts Yet</h3>
            <p className="text-slate-400">Check back soon for transition guides and resources!</p>
          </div>
        )}

        {/* Empty State - No search results */}
        {allPosts.length > 0 && filteredAndSortedPosts.length === 0 && (
          <div className="bg-slate-800 rounded-xl shadow-lg p-12 border border-slate-700 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Results Found</h3>
            <p className="text-slate-400 mb-4">
              No posts match your search query "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
