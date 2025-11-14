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
                <p><strong>Yes!</strong> Premium users get automatic cloud sync across all their devices.</p>
                <p className="mt-2">Free tier users can use Export/Import to manually move data between devices. Upgrade to Premium for automatic syncing with end-to-end encryption.</p>
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
                Yes! Premium users get secure cloud backup with end-to-end encryption. Your data is automatically backed up and protected with military-grade security. Only you can access your information - even we can't read your encrypted data.
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
                <p>We use industry-standard security practices:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>End-to-end encryption (your data is encrypted before it leaves your device)</li>
                  <li>Encrypted at rest in secure cloud storage</li>
                  <li>HTTPS/TLS encryption in transit</li>
                  <li>Zero-knowledge architecture (we can't read your data)</li>
                  <li>Regular security audits and updates</li>
                </ul>
                <p className="mt-2">Free tier users have data stored locally in their browser, protected by their device security.</p>
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
                <strong>Premium users:</strong> Yes, with end-to-end encryption. Your data is encrypted on your device before being sent to the cloud, and only you have the keys to decrypt it.
                <p className="mt-2"><strong>All users:</strong> Data is stored in our secure cloud database with bank-level encryption (AES-256). Your data is protected by row-level security, ensuring only you can access your information.</p>
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
                <strong>Premium users:</strong> Your data is automatically backed up to the cloud. Sign in from any device to restore your information.
                <p className="mt-2"><strong>Free tier users:</strong> No, we cannot recover locally stored data. Export your data regularly to create backups.</p>
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
                <strong>Premium users:</strong> Yes! Your data automatically syncs across all devices (phone, tablet, computer).
                <p className="mt-2"><strong>Free tier users:</strong> Data doesn't sync automatically. Use Export/Import to move data between devices, or use different devices for different purposes.</p>
              </div>
            </details>
          </div>

          {/* Development & Features */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
            <h2 className="text-2xl font-bold text-white p-6 pb-4">🚀 Development & Features</h2>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: What's the difference between Free and Premium?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <p><strong>Free Forever tier includes:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Basic transition checklists</li>
                  <li>Essential resources and links</li>
                  <li>State benefits comparison</li>
                  <li>Basic retirement calculator</li>
                  <li>Local data storage only</li>
                </ul>
                <p className="mt-3"><strong>Premium adds:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Advanced retirement calculator (BRS & High-3)</li>
                  <li>VA disability claims builder</li>
                  <li>Cloud storage & sync across devices</li>
                  <li>Automated reminders</li>
                  <li>Priority support</li>
                  <li>All future premium features</li>
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
                <p>We're actively developing new features based on veteran feedback and Premium subscription support. Upcoming features include:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Native mobile apps (iOS & Android)</li>
                  <li>Enhanced smart notifications</li>
                  <li>AI-powered document automation</li>
                  <li>Partnerships with VSOs and TAP programs</li>
                </ul>
                <p className="mt-2">Premium members get early access to all new features.</p>
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
                <strong>Premium users:</strong> You'll receive 90 days advance notice and full data export in multiple formats. Your encrypted data is yours to keep.
                <p className="mt-2"><strong>Free tier users:</strong> Export your data anytime and it's yours forever. The free tier tool works in your browser even offline.</p>
                <p className="mt-2">We're committed to serving veterans long-term, but we believe in data portability and your right to own your information.</p>
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
                We use end-to-end encryption with zero-knowledge architecture, which means we literally cannot read your data even if we wanted to. Your data is encrypted on your device before it reaches our servers, and only you have the decryption keys. Start with the free version to test it yourself before committing to Premium.
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
                We're trying to make a LIVING helping veterans, not making money OFF veterans. The free tier is fully functional for basic transition planning. Premium ($7/month or $249 lifetime) provides advanced features and cloud services that require infrastructure costs. If this helps you successfully transition and you find it valuable, supporting via Premium helps us serve more veterans.
              </div>
            </details>

            <details className="border-t border-slate-700 group">
              <summary className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors flex justify-between items-center list-none">
                <span className="font-semibold text-blue-400">Q: Why are all premium features free right now?</span>
                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-slate-300">
                <strong>Sign up by Nov 19 and get lifetime premium access FREE - forever</strong>. All users who create accounts before Nov 20 will keep premium access for life at no cost. Starting Nov 20: Basic features stay free, premium features are $7/month, $49/year, or $250 lifetime. Active duty, veterans, and military families have enough to worry about - focus on your transition, we've got the rest covered.
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

          {/* Contact */}
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">📧 Still Have Questions?</h2>
            <p className="text-slate-300 mb-4">
              We read and respond to every message personally.
            </p>
            <a href="mailto:support@formationlabs.net" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
