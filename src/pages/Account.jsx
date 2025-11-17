import { useNavigate } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

export default function Account() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
              <p className="text-gray-900 dark:text-white">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">User ID</label>
              <p className="text-gray-900 dark:text-white font-mono text-sm">{user?.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Account Created
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(user?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* All Features Free */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border-2 border-green-200 dark:border-green-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            🎉 100% Free - All Features Unlocked
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Military Transition Toolkit is completely free for all servicemembers and veterans.
            All features are unlocked with your free account.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
              Unlimited resumes with PDF export
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
              Full VA Claims Builder access
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
              Complete state benefits comparison tool
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
              Job search and application tracking
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
              All transition checklists and resources
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
              Cloud storage for all your data
            </li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Supported by affiliate partnerships - no subscriptions, no payments, no catch.
          </p>
        </div>
      </div>
    </div>
  )
}
