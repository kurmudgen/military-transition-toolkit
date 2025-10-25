import { useEffect } from 'react'

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy - Military Transition Toolkit'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400 text-sm mb-8">Last Updated: January 2025</p>

          <div className="space-y-8 text-slate-300">
            <section className="bg-blue-900/20 border-l-4 border-blue-500 rounded p-6">
              <h2 className="text-2xl font-bold text-white mb-4">🔒 Our Core Privacy Promise</h2>
              <p className="text-lg mb-4">
                <strong className="text-white">We don't collect, store, or have access to your personal data.</strong>
              </p>
              <p>
                Military Transition Toolkit is built with privacy as the foundation. All your data stays on your device, stored in your browser's local storage. We literally cannot see your information even if we wanted to.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. What Data We Don't Collect</h2>
              <p className="mb-4">
                Unlike most web applications, we do NOT collect, process, or store:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal information (name, email, address, phone number)</li>
                <li>Military service records or details</li>
                <li>Financial information or calculations you perform</li>
                <li>VA disability claim information</li>
                <li>Checklist progress or completion status</li>
                <li>Appointment or calendar data</li>
                <li>Any information you enter into forms or calculators</li>
                <li>Device identifiers or precise location data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How Local Storage Works</h2>
              <p className="mb-4">
                All your data is stored using your browser's localStorage feature. This means:
              </p>

              <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">✓ Your Data Stays on Your Device</h3>
                <p className="text-sm">
                  Information never leaves your computer, tablet, or phone. It's stored in your web browser, just like browser bookmarks or history.
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">✓ We Have Zero Access</h3>
                <p className="text-sm">
                  We don't have servers collecting your data. We don't have databases with your information. We can't see what you're planning or calculating.
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">✓ You Have Complete Control</h3>
                <p className="text-sm">
                  You can export your data at any time. You can clear it from your browser settings. You can use the app in private/incognito mode and no data will persist.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Anonymous Analytics (Optional)</h2>
              <p className="mb-4">
                We use Google Analytics to understand basic usage patterns. This helps us improve the tool. The analytics collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Page views (which pages are visited)</li>
                <li>Approximate geographic location (city/state level, not precise)</li>
                <li>Device type (desktop, mobile, tablet)</li>
                <li>Browser type (Chrome, Firefox, Safari, etc.)</li>
                <li>How users navigate through the site</li>
              </ul>
              <p className="mb-4">
                Analytics data is:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Completely anonymous - no personal identifiers</li>
                <li>Aggregated - we only see trends, not individual sessions</li>
                <li>Limited - Google Analytics only tracks page views, not form content</li>
                <li>Optional - you can block analytics with browser extensions or do-not-track settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Similar Technologies</h2>
              <p className="mb-4">
                We use minimal cookies:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white">Essential Cookies (Required)</h3>
                  <p className="text-sm">
                    These are necessary for the site to function. They remember your preferences (like which checklist you're using) but only on your device.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white">Analytics Cookies (Optional)</h3>
                  <p className="text-sm">
                    Google Analytics cookies track anonymous usage patterns. You can disable these with browser settings or privacy extensions.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm">
                We do NOT use cookies for: advertising, tracking across websites, selling data, or identifying individual users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
              <p className="mb-4">
                We use these external services:
              </p>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Google Analytics</h3>
                  <p className="text-sm mb-2">
                    Purpose: Anonymous usage statistics
                  </p>
                  <p className="text-sm mb-2">
                    Privacy Policy: <a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
                  </p>
                  <p className="text-sm">
                    What they collect: Anonymous page views, device type, approximate location
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Hosting Provider</h3>
                  <p className="text-sm mb-2">
                    Purpose: Serving the website files
                  </p>
                  <p className="text-sm">
                    What they collect: Standard server logs (IP address, timestamp, page requested) - automatically deleted after 30 days
                  </p>
                </div>
              </div>

              <p className="mt-4">
                We do NOT use: social media trackers, advertising networks, data brokers, or marketing platforms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
              <p className="mb-4">
                Since we don't collect your data, there's nothing for us to retain or delete. Your locally stored data remains on your device until:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You manually clear your browser data/cache</li>
                <li>You use the app's "Clear All Data" or export/delete features</li>
                <li>You uninstall your web browser</li>
                <li>You use private/incognito browsing (data clears when you close the browser)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Data Security</h2>
              <p className="mb-4">
                Your data security is maximized through our privacy-first architecture:
              </p>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">No Server Breaches Possible:</strong>
                    <span className="text-sm block">We don't store your data on servers, so hackers can't breach our databases to steal your information.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">HTTPS Encryption:</strong>
                    <span className="text-sm block">All connections to our site use SSL/TLS encryption to prevent eavesdropping.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Browser Security:</strong>
                    <span className="text-sm block">Your data benefits from your browser's built-in security features and sandboxing.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Export for Backup:</strong>
                    <span className="text-sm block">Use the export feature to back up your data to encrypted storage under your control.</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Your Privacy Rights</h2>
              <p className="mb-4">
                You have complete control over your data:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Access</h3>
                  <p className="text-sm">All your data is accessible through the app's export feature</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Delete</h3>
                  <p className="text-sm">Clear your browser data or use app's clear data features</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Portability</h3>
                  <p className="text-sm">Export your data in JSON format anytime</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Privacy</h3>
                  <p className="text-sm">Use in incognito mode for zero data persistence</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p>
                Our service is not directed to individuals under 18. We do not knowingly collect information from children. Since we don't collect any personal information at all, this is not a concern for our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy occasionally. Changes will be posted on this page with an updated "Last Updated" date.
              </p>
              <p>
                Material changes will be announced on the home page. Your continued use of the service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. International Users</h2>
              <p className="mb-4">
                Our privacy-first approach makes compliance simple:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">GDPR (European Union):</strong> We don't process personal data, so GDPR requirements are minimal</li>
                <li><strong className="text-white">CCPA (California):</strong> We don't sell personal information because we don't have it</li>
                <li><strong className="text-white">Other Jurisdictions:</strong> Our local-storage model exceeds most privacy requirements globally</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Do Not Track</h2>
              <p>
                We respect Do Not Track (DNT) browser settings. If your browser sends a DNT signal, we honor it by not loading Google Analytics. The core functionality of the app works identically with or without analytics.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our privacy practices, contact us at:
              </p>
              <p className="text-blue-400 mb-4">
                privacy@militarytransitiontoolkit.com
              </p>
              <p className="text-sm">
                We aim to respond to all privacy inquiries within 48 hours.
              </p>
            </section>

            <section className="border-t border-slate-700 pt-6 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
              <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-6">
                <p className="mb-4">
                  <strong className="text-white">In Plain English:</strong>
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Your data never leaves your device</li>
                  <li>✓ We can't see what you enter, save, or calculate</li>
                  <li>✓ We only track anonymous page views for site improvement</li>
                  <li>✓ No accounts, no emails, no tracking across sites</li>
                  <li>✓ You have complete control over your information</li>
                  <li>✓ We'll never sell your data (because we don't have it)</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-8 flex gap-4">
            <a href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Back to Home
            </a>
            <a href="/app" className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors">
              Go to App
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
