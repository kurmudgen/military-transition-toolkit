import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function PublicNav({ currentPage = '' }) {
  const { user } = useAuth()
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Tools menu structure
  const toolsMenu = {
    planning: {
      title: 'Planning',
      items: [
        { name: 'Transition Checklist', path: '/app/checklist' },
        { name: 'Timeline Tracker', path: '/app' },
        { name: 'Appointments', path: '/app#appointments', isHashLink: true }
      ]
    },
    vaMedical: {
      title: 'VA & Medical',
      items: [
        { name: 'VA Claims Builder', path: '/app/va-claims-builder' },
        { name: 'Evidence Tracker', path: '/app/va-claims-builder#evidence', isHashLink: true },
        { name: 'MedBoard Timeline', path: '/app/medboard' }
      ]
    },
    career: {
      title: 'Career',
      items: [
        { name: 'Resume Translator', path: '/app/resume-translator' },
        { name: 'Resume Builder', path: '/app/resume-builder' },
        { name: 'Job Search', path: '/app/job-search' }
      ]
    },
    financial: {
      title: 'Financial Calculators',
      hasSubmenu: true,
      submenu: {
        retirementPay: {
          title: 'Retirement & Pay',
          items: [
            { name: 'Retirement Calculator', path: '/app/retirement-calculator' },
            { name: 'Terminal Leave Calculator', path: '/calculator/terminal-leave' },
            { name: 'TSP vs 401k', comingSoon: true }
          ]
        },
        education: {
          title: 'Education Benefits',
          items: [
            { name: 'GI Bill BAH Calculator', comingSoon: true }
          ]
        },
        costOfLiving: {
          title: 'Cost of Living',
          items: [
            { name: 'BAH Comparison', comingSoon: true },
            { name: 'Cost of Living Calculator', comingSoon: true },
            { name: 'State Tax Comparison', path: '/state-benefits' }
          ]
        }
      }
    },
    stateBenefits: {
      title: 'State Benefits Comparison',
      path: '/state-benefits'
    }
  }

  // Resources menu structure
  const resourcesMenu = {
    careerGuides: {
      title: 'Career Guides',
      items: [
        { name: 'Army MOS Guides', path: '/blog?category=army' },
        { name: 'Air Force AFSC Guides', path: '/blog?category=air-force' },
        { name: 'Navy Rate Guides', path: '/blog?category=navy' },
        { name: 'Marine Corps MOS', path: '/blog?category=marines' }
      ]
    },
    resources: [
      { name: 'Resource Library', path: '/app/resources' },
      { name: 'Recommended Services', path: '/resources' },
      { name: 'Blog & Guides', path: '/blog' }
    ]
  }

  const renderToolsDropdown = () => (
    <div className="absolute left-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 z-50">
      {/* Planning */}
      <div className="px-3 py-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {toolsMenu.planning.title}
        </div>
        {toolsMenu.planning.items.map((item) => (
          item.isHashLink ? (
            <a
              key={item.name}
              href={item.path}
              className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors"
            >
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              {item.name}
            </Link>
          )
        ))}
      </div>

      <div className="border-t border-slate-700 my-1"></div>

      {/* VA & Medical */}
      <div className="px-3 py-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {toolsMenu.vaMedical.title}
        </div>
        {toolsMenu.vaMedical.items.map((item) => (
          item.isHashLink ? (
            <a
              key={item.name}
              href={item.path}
              className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors"
            >
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              {item.name}
            </Link>
          )
        ))}
      </div>

      <div className="border-t border-slate-700 my-1"></div>

      {/* Career */}
      <div className="px-3 py-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {toolsMenu.career.title}
        </div>
        {toolsMenu.career.items.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors"
            onClick={() => setActiveDropdown(null)}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="border-t border-slate-700 my-1"></div>

      {/* Financial Calculators - Nested Submenu */}
      <div className="px-3 py-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {toolsMenu.financial.title}
        </div>

        {/* Retirement & Pay */}
        <div className="mb-2">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide px-3 py-1">
            {toolsMenu.financial.submenu.retirementPay.title}
          </div>
          {toolsMenu.financial.submenu.retirementPay.items.map((item) => (
            item.comingSoon ? (
              <div
                key={item.name}
                className="px-3 py-1.5 text-slate-500 text-sm cursor-not-allowed flex items-center justify-between group"
                title="Coming soon - stay tuned!"
              >
                <span>{item.name}</span>
                <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">Soon</span>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>

        {/* Education Benefits */}
        <div className="mb-2">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide px-3 py-1">
            {toolsMenu.financial.submenu.education.title}
          </div>
          {toolsMenu.financial.submenu.education.items.map((item) => (
            item.comingSoon ? (
              <div
                key={item.name}
                className="px-3 py-1.5 text-slate-500 text-sm cursor-not-allowed flex items-center justify-between group"
                title="Coming soon - stay tuned!"
              >
                <span>{item.name}</span>
                <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">Soon</span>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>

        {/* Cost of Living */}
        <div>
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide px-3 py-1">
            {toolsMenu.financial.submenu.costOfLiving.title}
          </div>
          {toolsMenu.financial.submenu.costOfLiving.items.map((item) => (
            item.comingSoon ? (
              <div
                key={item.name}
                className="px-3 py-1.5 text-slate-500 text-sm cursor-not-allowed flex items-center justify-between group"
                title="Coming soon - stay tuned!"
              >
                <span>{item.name}</span>
                <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">Soon</span>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
      </div>

      <div className="border-t border-slate-700 my-1"></div>

      {/* State Benefits */}
      <div className="px-3 py-2">
        <Link
          to={toolsMenu.stateBenefits.path}
          className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors font-medium"
          onClick={() => setActiveDropdown(null)}
        >
          {toolsMenu.stateBenefits.title}
        </Link>
      </div>
    </div>
  )

  const renderResourcesDropdown = () => (
    <div className="absolute left-0 mt-2 w-72 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 z-50">
      {/* Career Guides */}
      <div className="px-3 py-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {resourcesMenu.careerGuides.title}
        </div>
        {resourcesMenu.careerGuides.items.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors"
            onClick={() => setActiveDropdown(null)}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="border-t border-slate-700 my-1"></div>

      {/* Other Resources */}
      <div className="px-3 py-2">
        {resourcesMenu.resources.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700 hover:text-white rounded transition-colors"
            onClick={() => setActiveDropdown(null)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white">MTT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('tools')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="px-3 py-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50 flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'tools'}
              >
                Tools
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === 'tools' && renderToolsDropdown()}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="px-3 py-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50 flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'resources'}
              >
                Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === 'resources' && renderResourcesDropdown()}
            </div>

            {/* Other Nav Items */}
            <Link
              to="/#features"
              className="px-3 py-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
            >
              Features
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 transition-colors rounded-lg hover:bg-slate-700/50 ${
                currentPage === '/about' ? 'text-white bg-slate-700/50' : 'text-slate-300 hover:text-white'
              }`}
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {user ? (
              <Link
                to="/app"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-700">
            <div className="space-y-1">
              {/* Tools Mobile Dropdown */}
              <details className="group">
                <summary className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg cursor-pointer list-none flex items-center justify-between">
                  <span>Tools</span>
                  <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-2 ml-4 space-y-1">
                  {/* Planning */}
                  <div className="mb-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                      {toolsMenu.planning.title}
                    </div>
                    {toolsMenu.planning.items.map((item) => (
                      item.isHashLink ? (
                        <a
                          key={item.name}
                          href={item.path}
                          className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </div>

                  {/* VA & Medical */}
                  <div className="mb-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                      {toolsMenu.vaMedical.title}
                    </div>
                    {toolsMenu.vaMedical.items.map((item) => (
                      item.isHashLink ? (
                        <a
                          key={item.name}
                          href={item.path}
                          className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </div>

                  {/* Career */}
                  <div className="mb-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                      {toolsMenu.career.title}
                    </div>
                    {toolsMenu.career.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Financial Calculators */}
                  <div className="mb-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                      {toolsMenu.financial.title}
                    </div>

                    {/* Retirement & Pay */}
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide px-3 py-1 mt-1">
                      {toolsMenu.financial.submenu.retirementPay.title}
                    </div>
                    {toolsMenu.financial.submenu.retirementPay.items.map((item) => (
                      item.comingSoon ? (
                        <div
                          key={item.name}
                          className="px-3 py-1.5 text-slate-500 text-sm flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">Soon</span>
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}

                    {/* Education Benefits */}
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide px-3 py-1 mt-1">
                      {toolsMenu.financial.submenu.education.title}
                    </div>
                    {toolsMenu.financial.submenu.education.items.map((item) => (
                      item.comingSoon ? (
                        <div
                          key={item.name}
                          className="px-3 py-1.5 text-slate-500 text-sm flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">Soon</span>
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}

                    {/* Cost of Living */}
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide px-3 py-1 mt-1">
                      {toolsMenu.financial.submenu.costOfLiving.title}
                    </div>
                    {toolsMenu.financial.submenu.costOfLiving.items.map((item) => (
                      item.comingSoon ? (
                        <div
                          key={item.name}
                          className="px-3 py-1.5 text-slate-500 text-sm flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">Soon</span>
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </div>

                  {/* State Benefits */}
                  <Link
                    to={toolsMenu.stateBenefits.path}
                    className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {toolsMenu.stateBenefits.title}
                  </Link>
                </div>
              </details>

              {/* Resources Mobile Dropdown */}
              <details className="group">
                <summary className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg cursor-pointer list-none flex items-center justify-between">
                  <span>Resources</span>
                  <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-2 ml-4 space-y-1">
                  {/* Career Guides */}
                  <div className="mb-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                      {resourcesMenu.careerGuides.title}
                    </div>
                    {resourcesMenu.careerGuides.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Other Resources */}
                  {resourcesMenu.resources.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-3 py-1.5 text-slate-300 text-sm hover:bg-slate-700/50 hover:text-white rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </details>

              {/* Other Mobile Nav Items */}
              <a
                href="/#features"
                className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>

              <Link
                to="/about"
                className={`block px-3 py-2 rounded-lg hover:bg-slate-700/50 ${
                  currentPage === '/about' ? 'text-white bg-slate-700/50' : 'text-slate-300 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
                {user ? (
                  <Link
                    to="/app"
                    className="block px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-slate-300 text-center hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
