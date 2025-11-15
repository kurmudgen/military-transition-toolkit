import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import RequireProfile from './components/RequireProfile'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import SessionTimeoutWarning from './components/SessionTimeoutWarning'

// Marketing pages
import Landing from './pages/Landing'
import GettingStarted from './pages/GettingStarted'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import RefundPolicy from './pages/RefundPolicy'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import TerminalLeaveCalculator from './pages/TerminalLeaveCalculator'

// Auth pages
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import AuthCallback from './pages/auth/AuthCallback'

// Application pages
import Home from './pages/Home'
import Progress from './pages/Progress'
import Reminders from './pages/Reminders'
import Resources from './pages/Resources'
import Retirement from './pages/Retirement'
import MedBoard from './pages/MedBoard'
import SeparationUnder20 from './pages/SeparationUnder20'
import StateBenefits from './pages/StateBenefits'
import VAClaimsBuilder from './pages/VAClaimsBuilder'
import RetirementCalculator from './pages/RetirementCalculator'
import AppointmentsTracking from './pages/AppointmentsTracking'
import ResumeBuilder from './pages/ResumeBuilder'
import JobSearch from './pages/JobSearch'
import Timeline from './pages/Timeline'
import Profile from './pages/Profile'
import ProfileSetup from './pages/ProfileSetup'
import Settings from './pages/Settings'
import Account from './pages/Account'
import FAQ from './pages/FAQ'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SessionTimeoutWarning />
        <Routes>
          {/* Marketing pages without auth */}
          <Route path="/" element={<Landing />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Blog pages (public access) */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Calculator pages (public access) */}
          <Route path="/calculator/terminal-leave" element={<TerminalLeaveCalculator />} />

          {/* Tier 1: Public access pages (no login required, fully functional) */}
          <Route path="/public/state-benefits" element={<StateBenefits publicMode />} />
          <Route path="/public/retirement-calculator" element={<RetirementCalculator publicMode />} />
          <Route path="/public/resources" element={<Resources publicMode />} />
          <Route path="/public/sample-checklist" element={<Retirement publicMode sampleMode />} />

          {/* Tier 2: Preview mode pages (no login required, view-only with upgrade overlay) */}
          <Route path="/preview/va-claims-builder" element={<VAClaimsBuilder previewMode />} />
          <Route path="/preview/resume-builder" element={<ResumeBuilder previewMode />} />
          <Route path="/preview/appointments" element={<AppointmentsTracking previewMode />} />
          <Route path="/preview/job-search" element={<JobSearch previewMode />} />
          <Route path="/preview/timeline" element={<Timeline previewMode />} />
          <Route path="/preview/medboard" element={<MedBoard previewMode />} />
          <Route path="/preview/separation" element={<SeparationUnder20 previewMode />} />
          <Route path="/preview/progress" element={<Progress previewMode />} />
          <Route path="/preview/reminders" element={<Reminders previewMode />} />

          {/* Demo pages (no login required, interactive with sample data) */}
          <Route path="/demo/va-claims" element={<VAClaimsBuilder demoMode />} />

          {/* Protected application routes with Layout */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <RequireProfile>
                  <Layout />
                </RequireProfile>
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="setup" element={<ProfileSetup />} />
            <Route path="progress" element={<Progress />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="resources" element={<Resources />} />
            <Route path="retirement" element={<Retirement />} />
            <Route path="medboard" element={<MedBoard />} />
            <Route path="separation" element={<SeparationUnder20 />} />
            <Route path="state-benefits" element={<StateBenefits />} />
            <Route path="va-claims-builder" element={<VAClaimsBuilder />} />
            <Route path="retirement-calculator" element={<RetirementCalculator />} />
            <Route path="appointments" element={<AppointmentsTracking />} />
            <Route path="resume-builder" element={<ResumeBuilder />} />
            <Route path="job-search" element={<JobSearch />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="about" element={<About />} />
          </Route>

          {/* Catch all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
