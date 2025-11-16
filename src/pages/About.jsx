import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  useEffect(() => {
    document.title = 'Keeping MTT Free | Military Transition Toolkit'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 mb-6 border border-slate-700">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Keeping MTT Free</h1>
          <p className="text-slate-300 text-lg">Currently Free - Mission: Stay Free Forever</p>
        </div>

        <div className="space-y-6">
          {/* Mission */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">The Mission</h2>
            <p className="text-slate-300 mb-4">
              Military Transition Toolkit was created by someone going through the medboard process.
              We know how confusing and anxiety-inducing the transition process can be. That's why MTT
              is free - and why we're actively seeking partnerships to keep it that way.
            </p>
          </div>

          {/* Sustainability Model */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Sustainability Model</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Partnership Revenue (Primary Goal)</h3>
                <p className="text-slate-300 mb-3">
                  We partner with companies and nonprofits that serve transitioning servicemembers -
                  training providers, education platforms, financial services - who support our mission.
                  When our users benefit from partner services, those partners help sustain MTT.
                </p>
                <p className="text-slate-400 mb-3">
                  <strong>Current partners:</strong> <em>Actively seeking partnerships</em>
                </p>
                <p className="text-slate-300">
                  Interested in partnering? <Link to="/contact" className="text-blue-400 hover:text-blue-300 underline">Contact us</Link>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Community Support</h3>
                <p className="text-slate-300 mb-4">
                  One-time donations help cover immediate infrastructure costs like servers and development tools.
                </p>
                <Link
                  to="/donate"
                  className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-colors shadow-lg"
                >
                  ☕ Support the Mission
                </Link>
              </div>
            </div>
          </div>

          {/* Commitment */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Our Commitment</h2>
            <p className="text-slate-300 mb-4">
              As long as partnerships and community donations sustain operations, MTT stays free for all servicemembers.
            </p>
            <p className="text-slate-300 mb-3">
              If we ever face circumstances requiring fees to maintain operations, we will:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Provide 60 days advance notice</li>
              <li>Grandfather in all current members</li>
              <li>Keep core transition tools free</li>
              <li>Keep all core features free</li>
            </ul>
          </div>

          {/* Transparency */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Transparency</h2>
            <p className="text-slate-300 mb-4">Status updates posted quarterly.</p>
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-100 mb-2"><strong>Last updated:</strong> November 2025</p>
              <p className="text-blue-100"><strong>Current status:</strong> ✅ Operating sustainably</p>
            </div>
          </div>

          {/* Resources & Feedback */}
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg shadow-lg p-6 sm:p-8 border-2 border-blue-500/50">
            <h2 className="text-2xl font-bold text-white mb-4">📚 Resources & Feedback</h2>
            <p className="text-slate-300 mb-6">
              Stay updated with our progress and share your feedback to help us improve:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="https://docs.google.com/document/d/1pJ0rHGXtb9g3txue9hsiN-kritb-_ZAml1r6P2axq98/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-blue-400 rounded-lg p-4 transition-all group"
              >
                <div className="text-3xl mb-2">🗺️</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400">View Full Roadmap</h3>
                <p className="text-slate-400 text-sm">See detailed feature plans and upcoming improvements</p>
              </a>

              <a
                href="https://docs.google.com/document/d/10YECz-KhGHPeUjnzRvA1HYGnVIu6A2GSsUzHvd4v_k0/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-green-400 rounded-lg p-4 transition-all group"
              >
                <div className="text-3xl mb-2">📝</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400">View Changelog</h3>
                <p className="text-slate-400 text-sm">Track all updates, fixes, and new features</p>
              </a>

              <a
                href="https://forms.gle/Z3ZFnphafATv7pRn6"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-purple-400 rounded-lg p-4 transition-all group"
              >
                <div className="text-3xl mb-2">💬</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400">Submit Feedback</h3>
                <p className="text-slate-400 text-sm">Share your experience and help us improve</p>
              </a>
            </div>
          </div>

          {/* DoD Disclaimer */}
          <div className="bg-slate-700 rounded-lg shadow-lg p-6 sm:p-8 border border-slate-600">
            <h2 className="text-xl font-bold text-slate-200 mb-3">⚠️ Important Disclaimer</h2>
            <div className="space-y-3 text-slate-300 text-sm">
              <p className="font-semibold">
                Military Transition Toolkit is NOT affiliated with, endorsed by, or officially connected to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>The U.S. Department of Defense (DoD)</li>
                <li>Any branch of the U.S. Armed Forces</li>
                <li>The Department of Veterans Affairs (VA)</li>
                <li>Any federal, state, or local government agency</li>
              </ul>
              <p>
                This is an <strong>independent, privately-owned tool</strong> created by someone going
                through transition to help fellow servicemembers navigate the military separation process.
                All information provided is for educational and planning purposes only.
              </p>
              <p>
                <strong>Official Information:</strong> Always verify critical information with official
                government sources, your command, your transition assistance office, or the VA. While we
                strive for accuracy, this tool does not replace official guidance from your chain of
                command or government agencies.
              </p>
              <p className="text-slate-400 italic">
                The views expressed on this website are those of the creator and do not reflect the
                official policy or position of the Department of Defense, any military service, or the U.S. Government.
              </p>
            </div>
          </div>

          {/* Optional Donation Link */}
          <div className="text-center mt-8">
            <Link
              to="/donate"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Optional: Support MTT with a one-time donation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
