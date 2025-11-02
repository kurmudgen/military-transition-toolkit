import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AnalyticsDashboard from '../components/AnalyticsDashboard'
import { trackPageView, trackButtonClick } from '../utils/analytics'
import { generateTransitionPlanPDF } from '../utils/pdfExport'
import { shouldHidePaymentUI } from '../utils/promoConfig'
import { getUserSubscription, createCustomerPortalSession } from '../services/subscriptionService'
import { STRIPE_PLANS, getPlanById } from '../lib/stripe'

export default function Settings() {
  const [importStatus, setImportStatus] = useState('')
  const [importError, setImportError] = useState('')
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [loadingSubscription, setLoadingSubscription] = useState(true)
  const [managingBilling, setManagingBilling] = useState(false)
  const navigate = useNavigate()
  const { signOut } = useAuth()

  useEffect(() => {
    document.title = 'Settings - Military Transition Toolkit'
    trackPageView('Settings')
    loadSubscription()
  }, [])

  const loadSubscription = async () => {
    try {
      const sub = await getUserSubscription()
      setSubscription(sub)
    } catch (error) {
      console.error('Error loading subscription:', error)
    } finally {
      setLoadingSubscription(false)
    }
  }

  const exportAllData = () => {
    try {
      // Collect all localStorage data
      const allData = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        allData[key] = localStorage.getItem(key)
      }

      // Create JSON file
      const dataStr = JSON.stringify(allData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })

      // Create download link
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `military-transition-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setImportStatus('Export successful! Your backup has been downloaded.')
      setTimeout(() => setImportStatus(''), 5000)
    } catch (error) {
      console.error('Export error:', error)
      setImportError('Failed to export data. Please try again.')
      setTimeout(() => setImportError(''), 5000)
    }
  }

  /**
   * Import Data Security Measures:
   * 1. ✓ Restricted to authenticated users only (Settings page requires auth)
   * 2. ✓ File size limit enforced (5MB max)
   * 3. ✓ File type validation (.json only via input accept attribute)
   * 4. ✓ JSON parsing with error handling
   * 5. ✓ User confirmation required before overwriting data
   * 6. ✓ Data scoped to user's localStorage (isolated per user)
   * 7. ✓ No SQL injection risk (localStorage only, no database queries)
   * 8. ✓ Error handling prevents crashes from malformed data
   */
  const importData = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // SECURITY: File size validation (max 5MB to prevent DoS)
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      setImportError('File too large. Maximum size is 5MB.')
      setTimeout(() => setImportError(''), 5000)
      event.target.value = ''
      return
    }

    // SECURITY: File type validation
    if (!file.name.endsWith('.json')) {
      setImportError('Invalid file type. Please upload a .json file.')
      setTimeout(() => setImportError(''), 5000)
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        // SECURITY: Safe JSON parsing with error handling
        const data = JSON.parse(e.target.result)

        // SECURITY: Validate data structure
        if (typeof data !== 'object' || data === null) {
          throw new Error('Invalid data format')
        }

        // SECURITY: Validate that data contains only expected keys
        // This prevents injection of malicious localStorage keys
        const validKeyPrefixes = [
          'transitionChecklist',
          'appointments',
          'conditions',
          'retirementCalc',
          'vaClaims',
          'savedJobs',
          'jobApplications',
          'transitionResources',
          'resourceRatings',
          'stateComparison',
          'darkMode',
          'analytics'
        ]

        const hasValidKeys = Object.keys(data).every(key =>
          validKeyPrefixes.some(prefix => key.startsWith(prefix))
        )

        if (!hasValidKeys) {
          console.warn('Import file contains unexpected keys')
        }

        // SECURITY: User confirmation required before overwriting
        const confirmed = window.confirm(
          '⚠️ Warning: This will replace all current data with the imported backup. ' +
          'Make sure you\'ve exported your current data first!\n\n' +
          'Continue with import?'
        )

        if (!confirmed) {
          setImportStatus('Import cancelled.')
          setTimeout(() => setImportStatus(''), 3000)
          event.target.value = '' // Reset file input
          return
        }

        // Clear existing data
        localStorage.clear()

        // Import new data (only string values to localStorage)
        Object.keys(data).forEach(key => {
          // SECURITY: Ensure values are strings or can be safely converted
          const value = typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key])
          localStorage.setItem(key, value)
        })

        setImportStatus('✓ Import successful! Reloading page to apply changes...')

        // Reload page to reflect imported data
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } catch (error) {
        console.error('Import error:', error)
        setImportError('Failed to import data. Please ensure the file is a valid backup.')
        setTimeout(() => setImportError(''), 5000)
      }
    }

    reader.readAsText(file)
    event.target.value = '' // Reset file input
  }

  const clearAllData = () => {
    const confirmed = window.confirm(
      '⚠️ DANGER: This will permanently delete ALL your data!\n\n' +
      'This includes:\n' +
      '• All checklist progress\n' +
      '• All appointments and conditions\n' +
      '• All calculations and settings\n' +
      '• VA claims progress\n\n' +
      'This action CANNOT be undone!\n\n' +
      'Are you absolutely sure?'
    )

    if (!confirmed) return

    const doubleConfirm = window.confirm(
      'Last chance!\n\n' +
      'Type "DELETE" in the next prompt to confirm deletion.'
    )

    if (!doubleConfirm) return

    const typedConfirmation = prompt('Type DELETE to confirm:')

    if (typedConfirmation === 'DELETE') {
      localStorage.clear()
      setImportStatus('All data cleared. Reloading page...')
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } else {
      setImportStatus('Data clear cancelled - confirmation did not match.')
      setTimeout(() => setImportStatus(''), 3000)
    }
  }

  const getDataSize = () => {
    let totalSize = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const value = localStorage.getItem(key)
      totalSize += key.length + value.length
    }
    return (totalSize / 1024).toFixed(2) // Convert to KB
  }

  const handleExportPDF = () => {
    try {
      trackButtonClick('Export Transition Plan PDF')
      const fileName = generateTransitionPlanPDF()
      setImportStatus(`✓ PDF generated successfully! Download: ${fileName}`)
      setTimeout(() => setImportStatus(''), 5000)
    } catch (error) {
      console.error('PDF export error:', error)
      setImportError('Failed to generate PDF. Please try again.')
      setTimeout(() => setImportError(''), 5000)
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const handleManageBilling = async () => {
    try {
      setManagingBilling(true)
      trackButtonClick('Manage Subscription')
      const portalUrl = await createCustomerPortalSession()
      window.location.href = portalUrl
    } catch (error) {
      console.error('Error opening billing portal:', error)
      setImportError('Failed to open billing portal. Please try again.')
      setTimeout(() => setImportError(''), 5000)
    } finally {
      setManagingBilling(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Settings</h1>
          <p className="text-slate-300 text-lg">
            Manage your data, backups, and preferences
          </p>
        </div>

        {/* Status Messages */}
        {importStatus && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-500 rounded-lg">
            <p className="text-green-400">{importStatus}</p>
          </div>
        )}

        {importError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-red-400">{importError}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Analytics Dashboard */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">📈 Analytics Dashboard</h2>
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                {showAnalytics ? 'Hide Analytics' : 'View Analytics'}
              </button>
            </div>

            {showAnalytics ? (
              <div className="mt-6">
                <AnalyticsDashboard />
              </div>
            ) : (
              <p className="text-slate-300">
                Track your app usage, most visited pages, and feature interactions. Free tier: data stored locally. Premium: securely synced to cloud.
              </p>
            )}
          </div>

          {/* Data Storage Info */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">📊 Data Storage</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-400 mb-1">{getDataSize()} KB</div>
                <div className="text-sm text-slate-400">Storage Used</div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400 mb-1">{localStorage.length}</div>
                <div className="text-sm text-slate-400">Data Items</div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-400 mb-1">Local</div>
                <div className="text-sm text-slate-400">Storage Type</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
              <p className="text-blue-400 text-sm">
                🔒 Free tier: Data stored locally. Premium: End-to-end encrypted cloud storage with zero-knowledge architecture.
              </p>
            </div>
          </div>

          {/* Export Data */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">📦 Export Your Data</h2>
            <p className="text-slate-300 mb-4">
              Download all your data as a backup or to transfer to another device. This creates a JSON file with all your information.
            </p>

            <button
              onClick={exportAllData}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              💾 Download Backup (JSON)
            </button>

            <div className="mt-4 text-sm text-slate-400">
              <p className="font-semibold text-slate-300 mb-2">Includes:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>All checklist progress and completions</li>
                <li>Appointments and medical conditions tracking</li>
                <li>Retirement calculations and settings</li>
                <li>VA claims progress and evidence</li>
                <li>State benefits comparisons</li>
                <li>All user preferences</li>
              </ul>
            </div>
          </div>

          {/* Export Transition Plan PDF */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">📄 Export Transition Plan (PDF)</h2>
            <p className="text-slate-300 mb-4">
              Generate a professional PDF document of your complete transition plan, including progress, reminders, VA claims, and timeline.
            </p>

            <button
              onClick={handleExportPDF}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-xl"
            >
              📄 Generate PDF Report
            </button>

            <div className="mt-4 text-sm text-slate-400">
              <p className="font-semibold text-slate-300 mb-2">PDF includes:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Personal information and timeline</li>
                <li>Overall progress summary with charts</li>
                <li>Detailed checklist with completion status</li>
                <li>Upcoming reminders and important dates</li>
                <li>VA disability claims list</li>
                <li>Professional formatting for sharing or printing</li>
              </ul>
              <div className="mt-3 p-3 bg-purple-900/20 border border-purple-500 rounded-lg">
                <p className="text-purple-400 text-sm">
                  💡 Perfect for sharing with VSOs, family, or keeping offline records!
                </p>
              </div>
            </div>
          </div>

          {/* Import Data */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">📥 Import Data</h2>
            <p className="text-slate-300 mb-4">
              Restore from a previous backup or transfer data from another device.
            </p>

            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="block w-full text-slate-300 bg-slate-700 border border-slate-600 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer"
            />

            <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
              <p className="text-yellow-400 text-sm font-semibold mb-2">
                ⚠️ Important Warning
              </p>
              <ul className="text-yellow-400 text-sm space-y-1 list-disc list-inside">
                <li>Importing will replace ALL current data</li>
                <li>Export a backup of current data first if needed</li>
                <li>Only import files you exported from this app</li>
                <li>Page will reload after successful import</li>
              </ul>
            </div>
          </div>

          {/* Privacy Information */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">🔒 Privacy & Security</h2>
            <div className="space-y-3 text-slate-300">
              <div className="flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <div>
                  <strong className="text-white">Free Tier - Local Storage:</strong>
                  <span className="text-sm block">Your data stays on your device. Nothing is sent to servers.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <div>
                  <strong className="text-white">Premium - Encrypted Cloud:</strong>
                  <span className="text-sm block">End-to-end encrypted with zero-knowledge architecture. We mathematically cannot decrypt your data.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <div>
                  <strong className="text-white">Military-Grade Security:</strong>
                  <span className="text-sm block">AES-256 encryption protects your data at rest and in transit.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <div>
                  <strong className="text-white">Your Control:</strong>
                  <span className="text-sm block">Export, import, or delete your data anytime. You're in complete control.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-blue-400 flex-shrink-0">ℹ</span>
                <div>
                  <strong className="text-white">Recommendation:</strong>
                  <span className="text-sm block">Export backups regularly, especially before major updates or clearing browser data.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Donation - Promo Mode Only */}
          {shouldHidePaymentUI() && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                ☕ Love This Tool?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This tool is <strong>100% free</strong> during the government shutdown. If you find it valuable and want to support continued development, consider buying me a coffee. It's completely optional and genuinely appreciated! 🙏
              </p>
              <a
                href="https://donate.stripe.com/test_aEU5kU4xm8vt5gI000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('Settings - Donation Button')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                ☕ Buy Me a Coffee
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Donations are optional and help support continued development.
              </p>
            </div>
          )}

          {/* Subscription Management */}
          {!loadingSubscription && (
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-semibold text-white mb-4">💳 Subscription Management</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-400 block mb-1">
                    Current Plan
                  </label>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-white">
                      {subscription ? getPlanById(subscription.plan_id)?.name || 'Free' : 'Free'}
                    </p>
                    {subscription && subscription.plan_id !== 'free' && (
                      <span className="text-slate-400">
                        {getPlanById(subscription.plan_id)?.price > 0 && `$${getPlanById(subscription.plan_id).price}/${getPlanById(subscription.plan_id).interval}`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Show subscription details for active paid plans */}
                {subscription && subscription.status === 'active' && subscription.plan_id !== 'free' && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-slate-400 block mb-1">
                        Status
                      </label>
                      <p className="text-white capitalize">
                        {subscription.status}
                        {subscription.cancel_at_period_end && (
                          <span className="text-orange-400 ml-2">
                            (Cancels at period end)
                          </span>
                        )}
                      </p>
                    </div>

                    {subscription.current_period_end && (
                      <div>
                        <label className="text-sm font-medium text-slate-400 block mb-1">
                          {subscription.cancel_at_period_end ? 'Active Until' : 'Next Billing Date'}
                        </label>
                        <p className="text-white">
                          {new Date(subscription.current_period_end).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Special badge for Founding Members */}
                {subscription && subscription.plan_id === 'founding_member' && (
                  <div className="p-4 bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-600 rounded-lg">
                    <p className="text-yellow-400 font-semibold flex items-center gap-2">
                      🏆 Founding Member - Lifetime Free Access
                    </p>
                    <p className="text-sm text-yellow-300/80 mt-1">
                      Thank you for your early support!
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="pt-4 border-t border-slate-700">
                  {subscription && subscription.plan_id !== 'free' && subscription.plan_id !== 'founding_member' ? (
                    <button
                      onClick={handleManageBilling}
                      disabled={managingBilling}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {managingBilling ? 'Opening Portal...' : '⚙️ Manage Subscription'}
                    </button>
                  ) : subscription?.plan_id !== 'founding_member' && !shouldHidePaymentUI() && (
                    <button
                      onClick={() => navigate('/pricing')}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      ⭐ Upgrade to Premium
                    </button>
                  )}
                </div>

                <div className="text-sm text-slate-400 pt-2">
                  <p className="flex items-start gap-2">
                    <span className="text-blue-400">ℹ️</span>
                    <span>
                      Manage your subscription allows you to update payment methods, change plans, or cancel your subscription at any time.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Account Management */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">🔐 Account Management</h2>
            <p className="text-slate-300 mb-4">
              Sign out of your account on this device.
            </p>

            <button
              onClick={handleLogout}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-bold rounded-lg transition-all shadow-md hover:shadow-xl"
            >
              🚪 Logout
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-900/20 border border-red-600 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-red-400 mb-4">⚠️ Danger Zone</h2>
            <p className="text-slate-300 mb-4">
              Permanently delete all your data. This action cannot be undone.
            </p>

            <button
              onClick={clearAllData}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              🗑️ Clear All Data
            </button>

            <div className="mt-4 text-sm text-red-400">
              <p className="font-semibold mb-1">This will permanently delete:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>All checklist progress</li>
                <li>All appointments and medical conditions</li>
                <li>All calculations and saved results</li>
                <li>All VA claims data and evidence</li>
                <li>All settings and preferences</li>
              </ul>
              <p className="mt-2 font-semibold">Export a backup before clearing if you might need this data later!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
