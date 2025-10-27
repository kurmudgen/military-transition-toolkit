import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
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
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import FAQ from './pages/FAQ'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Marketing pages without Layout */}
      <Route path="/" element={<Landing />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />

      {/* Application routes with Layout */}
      <Route path="/app" element={<Layout />}>
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
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Catch all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
