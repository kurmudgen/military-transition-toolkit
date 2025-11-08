import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = 'About | Military Transition Toolkit'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6 border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-2">About This Project</h1>
          <p className="text-slate-300">Built by veterans, for veterans</p>
        </div>

        <div className="space-y-6">
          {/* Mission */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">🎯 Our Mission</h2>
            <p className="text-slate-300 mb-4">
              This tool was created by a transitioning service member currently going through the military separation process.
            </p>
            <p className="text-slate-300">
              <strong>Creator Background:</strong><br/>
              • Active duty service member in transition<br/>
              • Currently navigating the MedBoard/IDES process<br/>
              • Built this tool out of personal necessity<br/>
              • Using modern AI tools to develop quickly and affordably
            </p>
          </div>

          {/* Why Built */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">💡 Why We Built This</h2>
            <p className="text-slate-300 mb-4">
              Going through transition, we were overwhelmed by:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Confusing timelines and checklists</li>
              <li>Missing critical deadlines</li>
              <li>Not knowing what evidence to collect</li>
              <li>Losing track of appointments</li>
              <li>Trying to compare retirement options across states</li>
            </ul>
            <p className="text-slate-300">
              We couldn't find ONE comprehensive tool that handled everything. So we built it.
            </p>
          </div>

          {/* What We Offer */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">✨ What We Offer</h2>
            <p className="text-slate-300 mb-4">
              Built for veterans, by veterans:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Small veteran-owned team building with AI assistance</li>
              <li>No venture capital, no huge budget</li>
              <li>Focused on core value over fancy features</li>
              <li>End-to-end encrypted cloud storage for complete privacy and security</li>
              <li>Launched fast to help veterans NOW, not in 2 years</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">What You Get:</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>✓ Complete privacy with military-grade encryption</li>
                  <li>✓ Secure cloud backup & sync across devices</li>
                  <li>✓ Built by veterans going through it NOW</li>
                  <li>✓ Features prioritized by veteran need</li>
                  <li>✓ Access your data from anywhere</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Premium Features:</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>✓ Advanced retirement calculator</li>
                  <li>✓ VA disability claims builder</li>
                  <li>✓ Cloud storage & device sync</li>
                  <li>✓ Automated reminders</li>
                  <li>✓ Priority support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">🗺️ The Roadmap</h2>
            <p className="text-slate-300 mb-4">
              We're committed to continuous improvement:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold">✓ Phase 1:</span>
                <span className="text-slate-300">Launched with core tools & end-to-end encrypted cloud storage</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Phase 2:</span>
                <span className="text-slate-300">Native mobile apps (iOS & Android)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Phase 3:</span>
                <span className="text-slate-300">Enhanced automated reminders and smart notifications</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Phase 4:</span>
                <span className="text-slate-300">AI-powered transition assistant and document automation</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Phase 5:</span>
                <span className="text-slate-300">Partner with VSOs, TAP programs, and military bases</span>
              </div>
            </div>
            <p className="text-slate-300 mt-4 italic">
              Every Premium purchase directly funds these improvements and keeps this tool veteran-focused.
            </p>
          </div>

          {/* Resources & Feedback */}
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg shadow-lg p-6 border-2 border-blue-500/50">
            <h2 className="text-2xl font-bold text-white mb-4">📚 Resources & Feedback</h2>
            <p className="text-slate-300 mb-6">
              Stay updated with our progress and share your feedback to help us improve:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Roadmap Link */}
              <a
                href="https://docs.google.com/document/d/1pJ0rHGXtb9g3txue9hsiN-kritb-_ZAml1r6P2axq98/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-blue-400 rounded-lg p-4 transition-all group"
              >
                <div className="text-3xl mb-2">🗺️</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400">View Full Roadmap</h3>
                <p className="text-slate-400 text-sm">
                  See detailed feature plans and upcoming improvements
                </p>
              </a>

              {/* Changelog Link */}
              <a
                href="https://docs.google.com/document/d/10YECz-KhGHPeUjnzRvA1HYGnVIu6A2GSsUzHvd4v_k0/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-green-400 rounded-lg p-4 transition-all group"
              >
                <div className="text-3xl mb-2">📝</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400">View Changelog</h3>
                <p className="text-slate-400 text-sm">
                  Track all updates, fixes, and new features
                </p>
              </a>

              {/* Feedback Form Link */}
              <a
                href="https://forms.gle/Z3ZFnphafATv7pRn6"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-purple-400 rounded-lg p-4 transition-all group"
              >
                <div className="text-3xl mb-2">💬</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400">Submit Feedback</h3>
                <p className="text-slate-400 text-sm">
                  Share your experience and help us improve
                </p>
              </a>
            </div>
          </div>

          {/* Commitment */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">🤝 Our Commitment</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Core features will ALWAYS be free</li>
              <li>Your privacy will NEVER be compromised for convenience</li>
              <li>No predatory pricing or tricks</li>
              <li>Honest communication about capabilities and limitations</li>
              <li>Built for veterans, by veterans</li>
            </ul>
          </div>

          {/* Thank You */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">🙏 Thank You</h2>
            <p className="text-slate-300 mb-4">
              If this tool helps your transition, please:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-6">
              <div className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span className="text-slate-300">Share it with fellow veterans</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span className="text-slate-300">Leave honest feedback</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span className="text-slate-300">Consider supporting via Premium</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span className="text-slate-300">Spread the word to help more veterans</span>
              </div>
            </div>
            <p className="text-slate-300 font-semibold">
              Good luck with your transition.
            </p>
            <p className="text-slate-400 mt-4 text-sm">
              Questions or feedback?<br/>
              <a href="mailto:support@formationlabs.net" className="text-blue-400 hover:text-blue-300">
                support@formationlabs.net
              </a>
            </p>
          </div>

          {/* DoD Disclaimer */}
          <div className="bg-slate-700 rounded-lg shadow-lg p-6 border border-slate-600">
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
                This is an <strong>independent, privately-owned tool</strong> created by a transitioning service member
                to help fellow veterans navigate the military separation process. All information provided is for
                educational and planning purposes only.
              </p>
              <p>
                <strong>Official Information:</strong> Always verify critical information with official government sources,
                your command, your transition assistance office, or the VA. While we strive for accuracy, this tool does
                not replace official guidance from your chain of command or government agencies.
              </p>
              <p className="text-slate-400 italic">
                The views expressed on this website are those of the creator and do not reflect the official policy
                or position of the Department of Defense, any military service, or the U.S. Government.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
