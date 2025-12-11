import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Interactive preview component for the landing page
 * Allows visitors to experience tools before signing up
 */
export default function InteractivePreview() {
  const [activeTab, setActiveTab] = useState('va-claims')

  const tabs = [
    { id: 'va-claims', label: 'VA Claims Tracker', icon: '📋' },
    { id: 'resume', label: 'Resume Builder', icon: '📄' },
    { id: 'state-benefits', label: 'State Benefits', icon: '🗺️' },
    { id: 'timeline', label: 'Timeline', icon: '📅' }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          See It In Action - Try It Now
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Experience the tools before signing up. No account required.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 rounded-lg font-semibold text-sm md:text-base transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
        {/* VA Claims Tab */}
        {activeTab === 'va-claims' && (
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="text-2xl font-bold text-white">VA Claims Builder</h3>
                <p className="text-slate-400">Track conditions, organize evidence, build winning claims</p>
              </div>
            </div>

            {/* Sample Claim Preview */}
            <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Your Conditions</h4>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">3 tracked</span>
              </div>

              <div className="space-y-3">
                {/* Sample Condition 1 */}
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">Lower Back Pain (Lumbar Spine)</span>
                    <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs">75% ready</span>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-400">
                    <span>Service Treatment Records</span>
                    <span>Buddy Statement</span>
                    <span>Nexus Letter</span>
                  </div>
                </div>

                {/* Sample Condition 2 */}
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">Tinnitus</span>
                    <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs">100% ready</span>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-400">
                    <span>Audiogram</span>
                    <span>Noise Exposure Log</span>
                  </div>
                </div>

                {/* Sample Condition 3 */}
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">Left Knee Pain</span>
                    <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded text-xs">40% ready</span>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-400">
                    <span>MRI Results</span>
                    <span className="text-slate-500">Missing: Buddy Statement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Prop */}
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 mb-6 border border-green-700/50">
              <p className="text-green-300 font-semibold mb-1">Average 50% VA Rating = $1,075/month for life</p>
              <p className="text-slate-400 text-sm">Well-documented claims get approved faster and at higher ratings</p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                to="/signup"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg text-lg transition-all shadow-lg"
              >
                Sign Up Free to Track Your Claims
              </Link>
              <p className="text-slate-500 text-sm mt-3">No credit card required</p>
            </div>
          </div>
        )}

        {/* Resume Builder Tab */}
        {activeTab === 'resume' && (
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📄</span>
              <div>
                <h3 className="text-2xl font-bold text-white">Resume Builder</h3>
                <p className="text-slate-400">Translate military experience to civilian language</p>
              </div>
            </div>

            {/* Translation Demo */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Military Side */}
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎖️</span> Military Experience
                </h4>
                <div className="space-y-4">
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <p className="text-white font-semibold mb-2">11B Infantryman, E-6</p>
                    <p className="text-slate-400 text-sm">Led 9-soldier squad in combat operations. Responsible for training, welfare, and mission execution.</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <p className="text-white font-semibold mb-2">92Y Unit Supply Specialist</p>
                    <p className="text-slate-400 text-sm">Managed $2.3M equipment inventory. Conducted inventories and maintained accountability.</p>
                  </div>
                </div>
              </div>

              {/* Civilian Side */}
              <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-700/50">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">💼</span> Civilian Translation
                </h4>
                <div className="space-y-4">
                  <div className="bg-slate-800 rounded-lg p-4 border border-blue-600/50">
                    <p className="text-blue-400 font-semibold mb-2">Operations Team Lead</p>
                    <p className="text-slate-300 text-sm">Directed cross-functional team of 9 in high-pressure environments. Developed training programs increasing team proficiency by 40%.</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4 border border-blue-600/50">
                    <p className="text-blue-400 font-semibold mb-2">Supply Chain Manager</p>
                    <p className="text-slate-300 text-sm">Managed $2.3M asset portfolio with 100% accountability. Implemented inventory control procedures reducing losses by 25%.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Prop */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 mb-6 border border-purple-700/50">
              <p className="text-purple-300 font-semibold mb-1">Stop using military jargon that confuses recruiters</p>
              <p className="text-slate-400 text-sm">Our translator converts MOS codes and military terms to civilian-friendly language</p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                to="/signup"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg text-lg transition-all shadow-lg"
              >
                Sign Up Free to Build Your Resume
              </Link>
              <p className="text-slate-500 text-sm mt-3">No credit card required</p>
            </div>
          </div>
        )}

        {/* State Benefits Tab */}
        {activeTab === 'state-benefits' && (
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🗺️</span>
              <div>
                <h3 className="text-2xl font-bold text-white">State Benefits Comparison</h3>
                <p className="text-slate-400">Find the best state for your situation</p>
              </div>
            </div>

            {/* Sample States Preview */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* Texas */}
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-white">Texas</h4>
                  <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs font-semibold">Top 5</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-green-400">
                    <span>✓</span> No state income tax
                  </li>
                  <li className="flex items-center gap-2 text-green-400">
                    <span>✓</span> 100% property tax exemption
                  </li>
                  <li className="flex items-center gap-2 text-green-400">
                    <span>✓</span> Hazlewood Act (free tuition)
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span>•</span> $15k+ annual savings
                  </li>
                </ul>
              </div>

              {/* Florida */}
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-white">Florida</h4>
                  <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs font-semibold">Top 5</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-green-400">
                    <span>✓</span> No state income tax
                  </li>
                  <li className="flex items-center gap-2 text-green-400">
                    <span>✓</span> Homestead exemption
                  </li>
                  <li className="flex items-center gap-2 text-green-400">
                    <span>✓</span> VA healthcare facilities
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span>•</span> $12k+ annual savings
                  </li>
                </ul>
              </div>

              {/* Virginia */}
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-white">Virginia</h4>
                  <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs font-semibold">Top 10</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-green-400">
                    <span>✓</span> Military pay tax-free
                  </li>
                  <li className="flex items-center gap-2 text-green-400">
                    <span>✓</span> Defense job market
                  </li>
                  <li className="flex items-center gap-2 text-green-400">
                    <span>✓</span> In-state tuition benefits
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <span>•</span> High job opportunities
                  </li>
                </ul>
              </div>
            </div>

            {/* Value Prop */}
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 mb-6 border border-green-700/50">
              <p className="text-green-300 font-semibold mb-1">The wrong state could cost you $50,000+ over 10 years</p>
              <p className="text-slate-400 text-sm">Compare all 50 states for taxes, benefits, healthcare, and job markets</p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                to="/state-benefits"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg text-lg transition-all shadow-lg mr-4"
              >
                Explore All 50 States
              </Link>
              <p className="text-slate-500 text-sm mt-3">Free to browse - sign up to save comparisons</p>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📅</span>
              <div>
                <h3 className="text-2xl font-bold text-white">Personalized Transition Timeline</h3>
                <p className="text-slate-400">Never miss a critical deadline</p>
              </div>
            </div>

            {/* Sample Timeline */}
            <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
              {/* Countdown */}
              <div className="text-center mb-6 pb-6 border-b border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Days Until Separation</p>
                <p className="text-5xl font-bold text-blue-400">247</p>
                <p className="text-slate-500 text-sm mt-2">Target: August 15, 2025</p>
              </div>

              {/* Timeline Items */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">✓</div>
                    <div className="w-0.5 h-full bg-slate-700 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-white">Start TAP Classes</p>
                    <p className="text-slate-400 text-sm">12+ months before separation</p>
                    <span className="text-green-400 text-xs">Completed</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">!</div>
                    <div className="w-0.5 h-full bg-slate-700 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-white">File BDD Claim (180 days out)</p>
                    <p className="text-slate-400 text-sm">Due in 67 days</p>
                    <span className="text-yellow-400 text-xs">Action Required</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 text-sm">3</div>
                    <div className="w-0.5 h-full bg-slate-700 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-slate-400">Schedule C&P Exams</p>
                    <p className="text-slate-500 text-sm">120 days before separation</p>
                    <span className="text-slate-500 text-xs">Upcoming</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 text-sm">4</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-400">Final Out-Processing</p>
                    <p className="text-slate-500 text-sm">30 days before separation</p>
                    <span className="text-slate-500 text-xs">Upcoming</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Prop */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 mb-6 border border-blue-700/50">
              <p className="text-blue-300 font-semibold mb-1">Personalized based on YOUR separation date and situation</p>
              <p className="text-slate-400 text-sm">Get reminders, track progress, and never miss critical deadlines</p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                to="/signup"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg text-lg transition-all shadow-lg"
              >
                Sign Up Free to Create Your Timeline
              </Link>
              <p className="text-slate-500 text-sm mt-3">No credit card required</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
