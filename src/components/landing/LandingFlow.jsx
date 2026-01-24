import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

// Track clicks for analytics (console.log for now)
const trackClick = (category, action) => {
  console.log(`[MTT Analytics] ${category}: ${action}`)
}

export default function LandingFlow() {
  const [stage, setStage] = useState('initial') // 'initial' | 'retiring' | 'separating' | 'veteran'
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleInitialChoice = (choice) => {
    trackClick('initial_selection', choice)
    setStage(choice)
  }

  const handlePriorityChoice = (priority, route) => {
    trackClick('priority_selection', priority)
    navigate(route)
  }

  // State 1: Initial "Getting out?" screen
  if (stage === 'initial') {
    return (
      <div className="text-center max-w-2xl px-4">
        <Link
          to={user ? '/app' : '/login'}
          className="inline-block text-slate-300 hover:text-white text-sm mb-6 px-4 py-1.5 rounded-full bg-slate-800/60 hover:bg-slate-700/60 transition-all"
        >
          {user ? 'Go to Dashboard' : 'Log in'} &rarr;
        </Link>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-12">
          Getting out?
        </h1>

        <div className="flex flex-col gap-4 mb-8">
          <button
            onClick={() => handleInitialChoice('retiring')}
            className="w-full px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white text-xl font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Retiring (20+ years)
          </button>

          <button
            onClick={() => handleInitialChoice('separating')}
            className="w-full px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white text-xl font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Separating / ETS / Medical
          </button>

          <button
            onClick={() => handleInitialChoice('veteran')}
            className="w-full px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white text-xl font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Already out
          </button>
        </div>

        <p className="text-slate-400 text-sm">
          Built by a veteran. 100% free.
        </p>
        <p className="text-slate-500 text-xs mt-4">
          Free account required to save your progress
        </p>
      </div>
    )
  }

  // State 2a: Retiring flow
  if (stage === 'retiring') {
    return (
      <div className="text-center max-w-2xl px-4">
        <button
          onClick={() => setStage('initial')}
          className="text-slate-400 hover:text-white mb-8 text-sm flex items-center gap-2 mx-auto transition-colors"
        >
          ← Back
        </button>

        <p className="text-xl text-slate-300 mb-2">
          20+ years of service.
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Let's make sure you get everything you've earned.
        </h1>

        <p className="text-slate-400 text-lg mb-8">
          What's your priority?
        </p>

        <div className="flex flex-col gap-4 mb-10">
          <button
            onClick={() => handlePriorityChoice('retirement_calculator', '/app/retirement-calculator')}
            className="w-full px-8 py-5 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-600"
          >
            Calculate my retirement pay
          </button>

          <button
            onClick={() => handlePriorityChoice('va_claims', '/va-claims')}
            className="w-full px-8 py-5 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-600"
          >
            Start my VA claim
          </button>

          <button
            onClick={() => handlePriorityChoice('full_checklist', '/app/retirement')}
            className="w-full px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Show me the full checklist
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-500 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> High-3 vs BRS calculator
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> State-by-state tax comparison
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Personalized timeline
          </span>
        </div>
        <p className="text-slate-500 text-xs mt-6">
          Free account required to save your progress
        </p>
      </div>
    )
  }

  // State 2b: Separating / ETS / Medical flow
  if (stage === 'separating') {
    return (
      <div className="text-center max-w-2xl px-4">
        <button
          onClick={() => setStage('initial')}
          className="text-slate-400 hover:text-white mb-8 text-sm flex items-center gap-2 mx-auto transition-colors"
        >
          ← Back
        </button>

        <p className="text-xl text-slate-300 mb-2">
          You've got deadlines coming.
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Let's make sure you don't miss any.
        </h1>

        <p className="text-slate-400 text-lg mb-8">
          What's your priority?
        </p>

        <div className="flex flex-col gap-4 mb-10">
          <button
            onClick={() => handlePriorityChoice('va_claims', '/va-claims')}
            className="w-full px-8 py-5 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-600"
          >
            Build my VA claim
          </button>

          <button
            onClick={() => handlePriorityChoice('mos_translator', '/resume-builder')}
            className="w-full px-8 py-5 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-600"
          >
            Translate my MOS to civilian jobs
          </button>

          <button
            onClick={() => handlePriorityChoice('timeline', '/app/separation')}
            className="w-full px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Show me my timeline
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-500 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Personalized to your separation date
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> VA claims/benefits/appointments tracked
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Takes 2 minutes
          </span>
        </div>
        <p className="text-slate-500 text-xs mt-6">
          Free account required to save your progress
        </p>
      </div>
    )
  }

  // State 2c: Already out (veteran) flow
  if (stage === 'veteran') {
    return (
      <div className="text-center max-w-2xl px-4">
        <button
          onClick={() => setStage('initial')}
          className="text-slate-400 hover:text-white mb-8 text-sm flex items-center gap-2 mx-auto transition-colors"
        >
          ← Back
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Still time to claim what you earned.
        </h1>

        <p className="text-slate-400 text-lg mb-8">
          What do you need?
        </p>

        <div className="flex flex-col gap-4 mb-10">
          <button
            onClick={() => handlePriorityChoice('va_claims', '/va-claims')}
            className="w-full px-8 py-5 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-600"
          >
            File/improve my VA claim
          </button>

          <button
            onClick={() => handlePriorityChoice('state_benefits', '/state-benefits')}
            className="w-full px-8 py-5 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-600"
          >
            Compare state benefits
          </button>

          <button
            onClick={() => handlePriorityChoice('resources', '/resources')}
            className="w-full px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Find resources
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-500 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> VA Claims Builder with evidence tracking
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> 50-state benefits comparison
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> 60+ curated resources
          </span>
        </div>
        <p className="text-slate-500 text-xs mt-6">
          Free account required to save your progress
        </p>
      </div>
    )
  }

  return null
}
