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
                <strong className="text-white">Your privacy is our foundation.</strong>
              </p>
              <p>
                Military Transition Toolkit is built with military-grade security and end-to-end encryption. We use zero-knowledge architecture, which means we cannot read your data even if we wanted to. Your information is encrypted on your device before it reaches our servers, and only you have the decryption keys.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. How We Store Your Data</h2>
              <p className="mb-4">
                All user data is securely stored in our cloud database with industry-leading security:
              </p>

              <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Secure Cloud Storage (All Users)</h3>
                <p className="text-sm mb-2">
                  Your data is securely stored in the cloud with bank-level encryption. This enables automatic backup and access from any device while maintaining complete privacy and security.
                </p>
                <ul className="text-sm space-y-1 ml-4 list-disc">
                  <li>Bank-level encryption (AES-256) protecting all data at rest</li>
                  <li>Row-level security ensuring users can only access their own data</li>
                  <li>Automatic cloud backup and sync across all devices</li>
                  <li>Secure SSL/TLS encryption for all data in transit</li>
                  <li>SOC 2 Type II certified infrastructure (Supabase)</li>
                  <li>HIPAA-compliant security for medical information</li>
                  <li>Regular automated backups with point-in-time recovery</li>
                </ul>
              </div>

              <div className="bg-green-900/20 border-l-4 border-green-500 rounded p-4 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">🔒 Data Isolation & Privacy</h3>
                <p className="text-sm mb-2">
                  Every user's data is completely isolated at the database level. Even our own administrators cannot access your personal information, VA claims, medical records, or any sensitive data without explicit permission.
                </p>
                <ul className="text-sm space-y-1 ml-4 list-disc">
                  <li>Zero cross-user data access (enforced at database level)</li>
                  <li>Your medical records and VA claims are protected by HIPAA-grade security</li>
                  <li>We never sell or share your personal data with third parties</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. What Data We Collect</h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
                <p className="mb-2">We collect minimal information necessary to provide secure cloud services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Email address:</strong> For account creation, login, and service communications</li>
                  <li><strong className="text-white">Payment information (Premium users):</strong> Processed securely through Stripe (we never store credit card numbers)</li>
                  <li><strong className="text-white">Encrypted user data:</strong> Your transition planning data, securely encrypted in our database</li>
                  <li><strong className="text-white">Profile information:</strong> Name, military branch, rank, MOS (only what you choose to provide)</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">What We DON'T Collect</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your decrypted personal data (we mathematically cannot access it)</li>
                  <li>Detailed military service records</li>
                  <li>Financial calculations or amounts</li>
                  <li>Content of your disability claims or medical information</li>
                  <li>Specific appointment details or calendar entries</li>
                  <li>Device identifiers or precise location data</li>
                  <li>Behavioral tracking across other websites</li>
                </ul>
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
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement industry-leading security practices to protect your information:
              </p>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">End-to-End Encryption (Premium):</strong>
                    <span className="text-sm block">Your data is encrypted on your device using AES-256 encryption before being sent to our servers. We never have access to your unencrypted data.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Zero-Knowledge Architecture:</strong>
                    <span className="text-sm block">Your encryption keys are derived from your password and never leave your device. We cannot decrypt your data even if compelled by law enforcement.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">HTTPS/TLS Encryption:</strong>
                    <span className="text-sm block">All connections use SSL/TLS encryption to prevent eavesdropping during transmission.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Secure Cloud Storage:</strong>
                    <span className="text-sm block">Encrypted data is stored in SOC 2 compliant data centers with physical and network security.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Regular Security Audits:</strong>
                    <span className="text-sm block">We conduct regular security reviews and promptly apply security updates.</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Free Tier Users</h3>
                <p className="mb-2">Your locally stored data remains on your device until:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You manually clear your browser data/cache</li>
                  <li>You use the app's "Clear All Data" feature</li>
                  <li>You uninstall your web browser</li>
                  <li>You use private/incognito browsing (data clears when you close the browser)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Premium Users</h3>
                <p className="mb-2">Your encrypted data is retained in the cloud:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>As long as your account is active and in good standing</li>
                  <li>For 90 days after account cancellation (grace period for reactivation)</li>
                  <li>Permanently deleted upon your request or after the grace period</li>
                  <li>You can export your data at any time before deletion</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Privacy Rights</h2>
              <p className="mb-4">
                You have complete control over your data:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Access</h3>
                  <p className="text-sm">Export your data in multiple formats at any time from your account settings</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Delete</h3>
                  <p className="text-sm">Request immediate account and data deletion from settings or by contacting support</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Portability</h3>
                  <p className="text-sm">Export your data in standard formats (JSON, PDF, CSV) to use elsewhere</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Privacy</h3>
                  <p className="text-sm">Free tier: use in incognito mode. Premium: zero-knowledge encryption ensures privacy</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
              <p className="mb-4">
                We use these external services:
              </p>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Stripe (Payment Processing)</h3>
                  <p className="text-sm mb-2">
                    Purpose: Process Premium subscriptions securely
                  </p>
                  <p className="text-sm mb-2">
                    Privacy Policy: <a href="https://stripe.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a>
                  </p>
                  <p className="text-sm">
                    What they collect: Payment card information (we never see or store this)
                  </p>
                </div>

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
                  <h3 className="font-semibold text-white mb-2">Cloud Storage Provider</h3>
                  <p className="text-sm mb-2">
                    Purpose: Store encrypted Premium user data
                  </p>
                  <p className="text-sm">
                    What they store: Your encrypted data (unreadable without your keys), account metadata
                  </p>
                </div>
              </div>

              <p className="mt-4">
                We do NOT use: social media trackers, advertising networks, data brokers, or marketing platforms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cookies and Similar Technologies</h2>
              <p className="mb-4">
                We use minimal cookies:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white">Essential Cookies (Required)</h3>
                  <p className="text-sm">
                    Necessary for the site to function, including authentication for Premium users and preference storage.
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
                We do NOT use cookies for: advertising, tracking across websites, selling data, or identifying individual users beyond necessary authentication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p>
                Our service is not directed to individuals under 18. We do not knowingly collect information from children. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. International Users</h2>
              <p className="mb-4">
                Our security-first approach ensures compliance with major privacy regulations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">GDPR (European Union):</strong> We use privacy-by-design principles and provide full data control rights</li>
                <li><strong className="text-white">CCPA (California):</strong> We don't sell personal information and provide full transparency</li>
                <li><strong className="text-white">Other Jurisdictions:</strong> Our end-to-end encryption model exceeds most privacy requirements globally</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Data Breach Notification</h2>
              <p className="mb-4">
                In the unlikely event of a security breach affecting Premium user accounts:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We will notify affected users within 72 hours</li>
                <li>Your encrypted data remains protected by your encryption keys</li>
                <li>We will provide clear guidance on any necessary actions</li>
                <li>Free tier users are not affected as data is stored locally only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy occasionally. Changes will be posted on this page with an updated "Last Updated" date.
              </p>
              <p>
                Material changes will be announced on the home page and via email to Premium users. Your continued use of the service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our privacy practices, contact us at:
              </p>
              <p className="text-blue-400 mb-4">
                support@formationlabs.net
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
                  <li>✓ <strong>Free tier:</strong> Your data stays on your device, we never see it</li>
                  <li>✓ <strong>Premium:</strong> End-to-end encrypted cloud storage - we mathematically cannot decrypt your data</li>
                  <li>✓ Zero-knowledge architecture protects your privacy</li>
                  <li>✓ We only track anonymous page views for site improvement</li>
                  <li>✓ You have complete control over your information</li>
                  <li>✓ We'll never sell your data - our business model is Premium subscriptions, not data</li>
                  <li>✓ Military-grade security protects your transition planning</li>
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
