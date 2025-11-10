import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostContent, getPostBySlug } from '../utils/blog'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      const postMeta = getPostBySlug(slug)

      if (!postMeta) {
        setLoading(false)
        return
      }

      const postContent = await getPostContent(slug)

      if (postContent) {
        setPost({
          ...postMeta,
          content: postContent.content
        })
        document.title = `${postMeta.title} - Military Transition Toolkit`
      }

      setLoading(false)
    }

    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-block text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors mb-6">
            ← Back to Blog
          </Link>
          <div className="bg-slate-800 rounded-xl shadow-lg p-12 border border-slate-700 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-white mb-2">Post Not Found</h2>
            <p className="text-slate-400 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <article className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link to="/blog" className="inline-block text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors mb-6">
          ← Back to Blog
        </Link>

        {/* Post Header */}
        <header className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <time>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        {/* Post Content */}
        <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
          <div className="prose prose-invert prose-slate max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold text-white mb-4 mt-8" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold text-white mb-3 mt-6" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-bold text-white mb-2 mt-4" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-slate-300 mb-4 leading-relaxed" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a className="text-blue-400 hover:text-blue-300 underline" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-slate-300 ml-4" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold text-white" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-400 my-4" {...props} />
                ),
                code: ({ node, inline, ...props }) =>
                  inline ? (
                    <code className="bg-slate-900 text-blue-400 px-2 py-1 rounded text-sm" {...props} />
                  ) : (
                    <code className="block bg-slate-900 text-slate-300 p-4 rounded-lg overflow-x-auto my-4" {...props} />
                  ),
                hr: ({ node, ...props }) => (
                  <hr className="border-slate-700 my-8" {...props} />
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Back to Blog Footer */}
        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-block px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-colors"
          >
            ← Back to All Posts
          </Link>
        </div>
      </article>
    </div>
  )
}
