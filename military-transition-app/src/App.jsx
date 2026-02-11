import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import SessionTimeoutWarning from './components/SessionTimeoutWarning'
import MaintenanceBanner from './components/MaintenanceBanner'

// Marketing pages
import Landing from './pages/Landing'
import MarketingAbout from './pages/MarketingAbout'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import RefundPolicy from './pages/RefundPolicy'
import Pricing from './pages/Pricing'

// Auth pages
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import AuthCallback from './pages/auth/AuthCallback'
import VerifyEmailRequired from './pages/auth/VerifyEmailRequired'

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
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Account from './pages/Account'
import FAQ from './pages/FAQ'
import About from './pages/About'
import PayCalculator from './pages/PayCalculator'
import CareerPlanner from './pages/CareerPlanner'
import ProfessionalDev from './pages/ProfessionalDev'
import LicensingNavigator from './pages/LicensingNavigator'
import PCSCareerPrep from './pages/PCSCareerPrep'
import BudgetBuilder from './pages/BudgetBuilder'
import DebtManager from './pages/DebtManager'
import SavingsGoals from './pages/SavingsGoals'
import TSPCalculator from './pages/TSPCalculator'
import CostOfLiving from './pages/CostOfLiving'
import FinancialEducation from './pages/FinancialEducation'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <MaintenanceBanner />
      <SessionTimeoutWarning />
      <Routes>
        {/* Marketing pages without auth */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<MarketingAbout />} />
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
        <Route path="/verify-email-required" element={<VerifyEmailRequired />} />

        {/* Public access pages (no login required) */}
        <Route path="/public/state-benefits" element={<StateBenefits publicMode />} />
        <Route path="/public/retirement-calculator" element={<RetirementCalculator publicMode />} />
        <Route path="/public/resources" element={<Resources publicMode />} />
        <Route path="/public/sample-checklist" element={<Retirement publicMode sampleMode />} />

        {/* Protected application routes with Layout */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
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
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="about" element={<About />} />
          <Route path="pay-calculator" element={<PayCalculator />} />
          <Route path="career-planner" element={<CareerPlanner />} />
          <Route path="professional-dev" element={<ProfessionalDev />} />
          <Route path="licensing" element={<LicensingNavigator />} />
          <Route path="pcs-career-prep" element={<PCSCareerPrep />} />
          <Route path="budget" element={<BudgetBuilder />} />
          <Route path="debt-manager" element={<DebtManager />} />
          <Route path="savings" element={<SavingsGoals />} />
          <Route path="tsp-calculator" element={<TSPCalculator />} />
          <Route path="cost-of-living" element={<CostOfLiving />} />
          <Route path="financial-education" element={<FinancialEducation />} />
        </Route>

        {/* Catch all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
