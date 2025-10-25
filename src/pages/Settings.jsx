import { useEffect, useState } from 'react'

export default function Settings() {
  const [importStatus, setImportStatus] = useState('')
  const [importError, setImportError] = useState('')

  useEffect(() => {
    document.title = 'Settings - Military Transition Toolkit'
  }, [])

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

  const importData = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)

        // Validate data structure
        if (typeof data !== 'object' || data === null) {
          throw new Error('Invalid data format')
        }

        // Confirm before overwriting
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

        // Import new data
        Object.keys(data).forEach(key => {
          localStorage.setItem(key, data[key])
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
                🔒 Your data is stored locally on your device. We have zero access to your information.
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
                  <strong className="text-white">100% Local Storage:</strong>
                  <span className="text-sm block">All your data stays on your device. Nothing is sent to our servers.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <div>
                  <strong className="text-white">Zero Access:</strong>
                  <span className="text-sm block">We cannot see, access, or recover your data even if you lose it.</span>
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
