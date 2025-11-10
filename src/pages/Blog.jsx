import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../utils/blog'

export default function Blog() {
  const posts = getAllPosts()

  useEffect(() => {
    document.title = 'Blog - Military Transition Toolkit'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-block text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Military Transition Blog
          </h1>
          <p className="text-xl text-slate-300">
            Guides, calculators, and advice for transitioning service members
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {posts.map(post => (
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

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="bg-slate-800 rounded-xl shadow-lg p-12 border border-slate-700 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Posts Yet</h3>
            <p className="text-slate-400">Check back soon for transition guides and resources!</p>
          </div>
        )}
      </div>
    </div>
  )
}
