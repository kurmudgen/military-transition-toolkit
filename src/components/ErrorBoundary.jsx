import React from 'react'
import { AlertTriangle } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to console
    console.error('💥 App crashed:', error)
    console.error('📍 Error info:', errorInfo)
    console.error('🔍 Component stack:', errorInfo.componentStack)

    // Store error details in state
    this.setState({
      error,
      errorInfo
    })

    // Log to external error tracking service if configured
    // Example: Sentry.captureException(error, { extra: errorInfo })
  }

  handleReset = () => {
    // Clear all localStorage data to reset app state
    const confirmReset = window.confirm(
      'This will clear all your data and reset the app. Are you sure?'
    )

    if (confirmReset) {
      console.log('🔄 Resetting app - clearing localStorage')
      localStorage.clear()
      sessionStorage.clear()

      // Reset error boundary state
      this.setState({ hasError: false, error: null, errorInfo: null })

      // Reload the page
      window.location.href = '/'
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg shadow-xl p-8 text-center">
              {/* Error Icon */}
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </div>

              {/* Error Message */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Something Went Wrong
              </h1>
              <p className="text-gray-600 mb-6">
                We encountered an unexpected error. Don't worry - your data is safe.
              </p>

              {/* Error Details (collapsible) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                    Show error details (dev mode)
                  </summary>
                  <div className="bg-gray-50 rounded p-3 text-xs font-mono text-red-600 overflow-auto max-h-48">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error.toString()}
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Stack:</strong>
                        <pre className="whitespace-pre-wrap mt-1">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={this.handleReload}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Reload Page
                </button>

                <button
                  onClick={this.handleReset}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Reset App & Start Over
                </button>

                <a
                  href="/"
                  className="block w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2"
                >
                  Go to Home Page
                </a>
              </div>

              {/* Help Text */}
              <p className="mt-6 text-sm text-gray-500">
                If this problem persists, please contact{' '}
                <a
                  href="mailto:support@militarytransitiontoolkit.com"
                  className="text-blue-600 hover:underline"
                >
                  support@militarytransitiontoolkit.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
