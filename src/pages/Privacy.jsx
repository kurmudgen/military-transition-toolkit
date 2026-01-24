import { useEffect } from 'react'
import PublicNav from '../components/Navigation/PublicNav'

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy - Military Transition Toolkit'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <PublicNav currentPage="/privacy" />
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400 text-sm mb-8">Last Updated: January 2026</p>

          <div className="space-y-8 text-slate-300">
            <section className="bg-blue-900/20 border-l-4 border-blue-500 rounded p-6">
              <h2 className="text-2xl font-bold text-white mb-4">🔒 Our Core Privacy Promise</h2>
              <p className="text-lg mb-4">
                <strong className="text-white">Your privacy is our foundation.</strong>
              </p>
              <p>
                Military Transition Toolkit protects your data with industry-standard security measures. Your information is stored securely in our cloud database with encryption at rest (AES-256), encrypted connections (HTTPS/TLS), and row-level security ensuring only you can access your data.
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
                  Every user's data is isolated at the database level through row-level security (RLS). This means database queries automatically filter to show only your data.
                </p>
                <ul className="text-sm space-y-1 ml-4 list-disc">
                  <li>Row-level security prevents cross-user data access</li>
                  <li>We never sell or share your personal data with third parties</li>
                  <li><strong>Important:</strong> This is a planning tool, not a medical records system. Do not store detailed protected health information.</li>
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
                  <li><strong className="text-white">Encrypted user data:</strong> Your transition planning data, securely encrypted in our database</li>
                  <li><strong className="text-white">Profile information:</strong> Name, military branch, rank, MOS (only what you choose to provide)</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">What We DON'T Collect or Sell</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Device identifiers or precise location data</li>
                  <li>Behavioral tracking across other websites</li>
                  <li>We never sell any user data to third parties</li>
                </ul>
                <p className="mt-3 text-sm text-yellow-400">
                  <strong>Note:</strong> Data you enter (VA claims, appointments, notes) is stored in our database. Use this as a planning tool - we recommend NOT entering detailed medical records or sensitive health information.
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
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security practices to protect your information:
              </p>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Encryption at Rest (AES-256):</strong>
                    <span className="text-sm block">Your data is encrypted in our database using AES-256 encryption, the same standard used by banks and government agencies.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">HTTPS/TLS Encryption in Transit:</strong>
                    <span className="text-sm block">All connections use SSL/TLS encryption to prevent eavesdropping during transmission.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Row-Level Security:</strong>
                    <span className="text-sm block">Database policies ensure you can only access your own data. Other users cannot see your information.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">SOC 2 Compliant Infrastructure:</strong>
                    <span className="text-sm block">Our database provider (Supabase) maintains SOC 2 Type II certification with regular security audits.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white">Secure Authentication:</strong>
                    <span className="text-sm block">Passwords are hashed (never stored in plain text) and we support secure session management.</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>

              <div>
                <p className="mb-2">Your encrypted data is retained in the cloud:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>As long as your account is active</li>
                  <li>For 90 days after account deletion request (grace period for reactivation)</li>
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
                  <p className="text-sm">Row-level security and encryption protect your data from unauthorized access</p>
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
                  <h3 className="font-semibold text-white mb-2">Cloud Storage Provider (Supabase)</h3>
                  <p className="text-sm mb-2">
                    Purpose: Store user data securely with encryption at rest
                  </p>
                  <p className="text-sm">
                    What they store: Your account data, transition planning data, protected by row-level security
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
                    Necessary for the site to function, including authentication and preference storage.
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
                <li><strong className="text-white">Other Jurisdictions:</strong> Our security measures meet or exceed most privacy requirements globally</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Data Breach Notification</h2>
              <p className="mb-4">
                In the unlikely event of a security breach:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We will notify affected users within 72 hours</li>
                <li>Data encrypted at rest provides an additional layer of protection</li>
                <li>We will provide clear guidance on any necessary actions</li>
                <li>We recommend changing your password if notified of a breach</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy occasionally. Changes will be posted on this page with an updated "Last Updated" date.
              </p>
              <p>
                Material changes will be announced on the home page and via email to all users. Your continued use of the service after changes constitutes acceptance of the updated policy.
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
                  <li>✓ Your data is stored securely in our cloud database with AES-256 encryption</li>
                  <li>✓ Row-level security ensures only you can access your data</li>
                  <li>✓ We only track anonymous page views for site improvement</li>
                  <li>✓ You have complete control over your information - export or delete anytime</li>
                  <li>✓ We'll never sell your data - 100% free for all servicemembers and veterans</li>
                  <li>✓ This is a planning tool - don't store detailed medical records here</li>
                  <li>✓ 100% free - optional donations welcome but never required</li>
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
    </div>
  )
}
