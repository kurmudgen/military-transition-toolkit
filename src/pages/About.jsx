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

          {/* Honest About Limitations */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">📊 Honest About the Limitations</h2>
            <p className="text-slate-300 mb-4">
              This is a bootstrap operation:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
              <li>Small veteran-owned team building with AI assistance</li>
              <li>No venture capital, no huge budget</li>
              <li>Focused on core value over fancy features</li>
              <li>Local-only storage to protect your privacy AND keep costs down</li>
              <li>Launched fast to help veterans NOW, not in 2 years</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">What You Get:</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>✓ Complete privacy (local-only = truly secure)</li>
                  <li>✓ Low/no cost (no server bills)</li>
                  <li>✓ Built by veterans going through it NOW</li>
                  <li>✓ Features prioritized by veteran need</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">What's Missing (For Now):</h3>
                <ul className="text-slate-300 space-y-1">
                  <li>✗ No cloud sync (yet)</li>
                  <li>✗ No cross-device access (yet)</li>
                  <li>✗ No automated reminders (yet)</li>
                  <li>✗ Must export/backup yourself</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">🗺️ The Roadmap</h2>
            <p className="text-slate-300 mb-4">
              If enough veterans find this valuable:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Phase 1:</span>
                <span className="text-slate-300">Core tools FREE with optional Premium ($29-49)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Phase 2:</span>
                <span className="text-slate-300">Add encrypted cloud backup and sync</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Phase 3:</span>
                <span className="text-slate-300">Native mobile apps</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Phase 4:</span>
                <span className="text-slate-300">Automated reminders and advanced features</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Phase 5:</span>
                <span className="text-slate-300">Partner with VSOs, TAP programs, and military bases</span>
              </div>
            </div>
            <p className="text-slate-300 mt-4 italic">
              Every Premium purchase directly funds these improvements.
            </p>
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
            <div className="text-4xl mb-4">🇺🇸</div>
            <p className="text-slate-300 font-semibold">
              Thank you for your service, and good luck with your transition.
            </p>
            <p className="text-slate-400 mt-4 text-sm">
              Questions or feedback?<br/>
              <a href="mailto:support@militarytransitiontoolkit.com" className="text-blue-400 hover:text-blue-300">
                support@militarytransitiontoolkit.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
