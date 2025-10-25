import { useEffect } from 'react'

export default function FAQ() {
  useEffect(() => {
    document.title = 'FAQ | Military Transition Toolkit'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6 border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h1>
          <p className="text-slate-300">Honest answers to your questions about this tool</p>
        </div>

        <div className="space-y-6">
          {/* Privacy & Storage */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
            <h2 className="text-2xl font-bold text-white p-6 pb-4">🔒 Privacy & Data Storage</h2>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Why can't I sync my data across devices?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <p><strong>Short answer:</strong> Doing it securely requires infrastructure we can't afford yet.</p>
                <p className="mt-2"><strong>Long answer:</strong> We chose to prioritize your privacy and launch an affordable tool NOW rather than wait years to build enterprise-grade cloud infrastructure. Use Export/Import to move data between devices for now.</p>
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Will you add cloud backup eventually?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                Yes, if the app generates enough revenue to build it properly with zero-knowledge encryption. We will NEVER add cloud features that compromise your privacy. It'll be done right or not at all.
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Why not just use Google Drive or Dropbox integration?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                Great question! This is actually on our roadmap for Phase 2. It would let YOU control where your data lives (your own Google Drive) while we just facilitate access. This requires development time and integration costs, but it's a solid option we're considering.
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Can't you just store my data on AWS like everyone else?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <p>We could, but then:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>We'd need HIPAA compliance (expensive)</li>
                  <li>We'd need security audits (expensive)</li>
                  <li>We'd need lawyers (expensive)</li>
                  <li>We'd have liability if breached (risky)</li>
                  <li>We'd need to pass those costs to you (expensive for you)</li>
                </ul>
                <p className="mt-2">By keeping it local-only, we keep it FREE or very cheap while protecting your privacy completely.</p>
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Is my data encrypted?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                Browser localStorage is not encrypted by default. Data is protected by your device password. For maximum security, enable full-device encryption and export sensitive documents to encrypted storage.
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Can you recover my data if I lose it?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                No. Since we don't store anything on servers, we cannot recover data. Export important information regularly.
              </div>
            </details>
          </div>

          {/* Development & Features */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
            <h2 className="text-2xl font-bold text-white p-6 pb-4">🚀 Development & Features</h2>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: When will advanced features be added?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <p>Honest answer: When enough veterans find this valuable and support it (through Premium or donations). We need sustainable revenue to invest in infrastructure.</p>
                <p className="mt-2"><strong>Current pace:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>100 Premium users = Can add text reminders</li>
                  <li>500 Premium users = Can add encrypted cloud backup</li>
                  <li>2,000 Premium users = Can add full mobile apps</li>
                  <li>10,000 Premium users = Can add everything</li>
                </ul>
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Is this because you're lazy or cheap?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                Neither - it's deliberate design for YOUR benefit. We're a small veteran-owned team building a tool for transitioning veterans. We chose to launch a secure, private, affordable tool quickly rather than spend 2 years and $200k building enterprise infrastructure.
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: What if you shut down?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                Since everything is local-only, you're not dependent on us staying online. Export your data and it's yours forever. If we shut down, the tool still works in your browser (just no updates).
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Can I use this on multiple devices?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                Data doesn't sync between devices automatically. Use Export/Import to move data, or use different devices for different purposes. Cloud sync is planned for the future with proper security.
              </div>
            </details>
          </div>

          {/* Trust & Pricing */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
            <h2 className="text-2xl font-bold text-white p-6 pb-4">💰 Trust & Pricing</h2>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Why should I trust you with this?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                You shouldn't trust us - that's the point! We designed it so you DON'T have to trust us. We literally cannot see your data. It never leaves your device. The only trust needed is: "Will this app help me transition successfully?" Try the free version and decide for yourself.
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Are you making money off veterans?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                We're trying to make a LIVING helping veterans, not making money OFF veterans. The free tier is fully functional. Premium is optional and cheaper than one appointment with a career counselor. If this helps you successfully transition and you find it worth $29, that supports development that helps more veterans.
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: What's your background?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                We're a small veteran-owned team. The founder is currently going through their own MedBoard transition right now. This tool was built out of personal necessity - experiencing the same confusion and overwhelm you're facing. We're using AI development tools to build quickly and affordably so we can help transitioning service members NOW rather than years from now.
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Is this HIPAA compliant?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                This app is a planning tool, not a medical records system. It is not HIPAA compliant and should not be used to store protected health information. Keep detailed medical records in secure, encrypted storage designed for that purpose.
              </div>
            </details>
          </div>

          {/* Contact */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">📧 Still Have Questions?</h2>
            <p className="text-slate-300 mb-4">
              We read and respond to every message personally.
            </p>
            <a href="mailto:support@militarytransitiontoolkit.com" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
