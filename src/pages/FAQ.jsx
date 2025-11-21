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
                <span className="font-semibold text-blue-400">Q: Can I sync my data across devices?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <p><strong>Yes!</strong> All users get automatic cloud sync across all devices when logged in. Your data is securely stored and accessible from any device.</p>
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Is cloud backup available?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                Yes! All users get secure cloud backup with military-grade encryption. Your data is automatically backed up and protected. Only you can access your information - we use zero-knowledge encryption so even we can't read your data.
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: How do you store my data securely?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <p>We use industry-standard security practices for all users:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Encrypted at rest in secure cloud storage (AES-256)</li>
                  <li>HTTPS/TLS encryption in transit</li>
                  <li>Zero-knowledge architecture (we can't read your data)</li>
                  <li>Row-level security (only you can access your data)</li>
                  <li>Regular security audits and updates</li>
                </ul>
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
                <p><strong>All users:</strong> Your data is stored in our secure cloud database with bank-level encryption (AES-256). Your data is protected by row-level security, ensuring only you can access your information. We use zero-knowledge architecture, meaning we cannot decrypt or read your personal information.</p>
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
                <strong>All users:</strong> Your data is automatically backed up to the cloud. Sign in from any device to restore your information. However, if you forget your login credentials and don't have recovery options set up, we cannot recover your data due to our zero-knowledge encryption.
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
                <strong>Yes!</strong> All users get automatic data syncing across all devices (phone, tablet, computer). Sign in from any device and your data will be there.
              </div>
            </details>
          </div>

          {/* Development & Features */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
            <h2 className="text-2xl font-bold text-white p-6 pb-4">🚀 Development & Features</h2>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: What features does MTT include?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <p><strong>All features are free and included for everyone:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Comprehensive transition checklists</li>
                  <li>State-by-state veteran benefits comparison</li>
                  <li>Military-to-civilian resume builder with translation helper</li>
                  <li>Retirement calculator (BRS & High-3)</li>
                  <li>VA disability claims builder</li>
                  <li>Timeline and goal tracking</li>
                  <li>Automated reminders</li>
                  <li>Cloud storage & sync across devices</li>
                  <li>Curated resource library</li>
                  <li>Career guides for 272 MOS/ratings</li>
                </ul>
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: When will new features be added?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <p>We're actively developing new features based on veteran feedback. Upcoming features include:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Native mobile apps (iOS & Android)</li>
                  <li>Enhanced smart notifications</li>
                  <li>AI-powered document automation</li>
                  <li>Integration with VSOs and TAP programs</li>
                </ul>
                <p className="mt-2">All new features will be free for all users.</p>
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
                <p><strong>All users:</strong> You'll receive advance notice and full data export in multiple formats. Your encrypted data is yours to keep. We believe in data portability and your right to own your information.</p>
                <p className="mt-2">We're committed to serving veterans long-term, but we'll always ensure you can take your data with you.</p>
              </div>
            </details>
          </div>

          {/* Trust & Pricing */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
            <h2 className="text-2xl font-bold text-white p-6 pb-4">💰 Trust & Pricing</h2>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Why should I trust you with my data?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                We use bank-level encryption with zero-knowledge architecture, which means we literally cannot read your data even if we wanted to. Your data is encrypted in our database with row-level security, and only you have access to your information. All data is transmitted over HTTPS/TLS and stored with AES-256 encryption.
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: How much does this cost?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <strong>Military Transition Toolkit is 100% free for all servicemembers and veterans.</strong> No subscriptions, no hidden fees, no paywalls. All features are available to everyone at no cost.
                <p className="mt-2">MTT is 100% free for all servicemembers and veterans. Optional donations are welcome but never required. Active duty, veterans, and military families have enough to worry about - focus on your transition, we've got the rest covered.</p>
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Will this always be free?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <p>Yes. Our mission is to keep MTT completely free for all transitioning servicemembers and veterans. If we ever face circumstances that require changes to this model, current users will be grandfathered in and continue to have free access.</p>
                <p className="mt-2">We believe you've earned this. Your service and sacrifice are worth more than a subscription fee.</p>
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
                We're a veteran-owned team. The founder is currently going through their own MedBoard transition right now. This tool was built out of personal necessity - experiencing the same confusion and overwhelm you're facing. We're using modern AI development tools to build quickly and affordably so we can help transitioning service members NOW rather than years from now.
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
                This app is a planning and organizational tool, not a medical records system. While we use strong encryption and security practices, it is not HIPAA compliant and should not be used to store detailed protected health information. Keep comprehensive medical records in secure, HIPAA-compliant systems designed for that purpose.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
