import { Link } from 'react-router-dom'
import LandingFlow from '../components/landing/LandingFlow'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Main landing flow - fills available space */}
      <main className="flex-1 flex items-center justify-center">
        <LandingFlow />
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-4">
              <Link to="/about" className="hover:text-slate-300 transition-colors">
                About
              </Link>
              <Link to="/blog" className="hover:text-slate-300 transition-colors">
                Blog
              </Link>
              <Link to="/terms" className="hover:text-slate-300 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="hover:text-slate-300 transition-colors">
                Privacy
              </Link>
            </div>
            <p>© 2025 Military Transition Toolkit</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
