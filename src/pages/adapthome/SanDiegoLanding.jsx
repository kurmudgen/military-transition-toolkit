import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function SanDiegoLanding() {
  const { user } = useAuth()

  const contractors = [
    {
      name: "Accessible Home Solutions San Diego",
      location: "San Diego, CA",
      specialties: ["Bathroom Modifications", "Wheelchair Ramps", "Door Widening"],
      yearsExperience: 12,
      capsVerified: true,
      vaProjects: 45
    },
    {
      name: "Freedom Access Remodeling",
      location: "Oceanside, CA",
      specialties: ["Kitchen Adaptations", "Roll-in Showers", "Grab Bar Installation"],
      yearsExperience: 8,
      capsVerified: true,
      vaProjects: 32
    },
    {
      name: "Veterans First Construction",
      location: "Chula Vista, CA",
      specialties: ["Full Home Modifications", "Elevator Installation", "Smart Home Tech"],
      yearsExperience: 15,
      capsVerified: true,
      vaProjects: 67
    },
    {
      name: "Pacific Adaptive Builders",
      location: "La Mesa, CA",
      specialties: ["Ramp Systems", "Stair Lifts", "Accessible Garages"],
      yearsExperience: 10,
      capsVerified: true,
      vaProjects: 28
    },
    {
      name: "SoCal Universal Design",
      location: "Carlsbad, CA",
      specialties: ["Master Suite Conversions", "Threshold Removal", "Lighting Upgrades"],
      yearsExperience: 9,
      capsVerified: true,
      vaProjects: 38
    },
    {
      name: "Adapt & Thrive Home Services",
      location: "El Cajon, CA",
      specialties: ["Bathroom Remodels", "Kitchen Lowering", "Accessible Entries"],
      yearsExperience: 11,
      capsVerified: true,
      vaProjects: 41
    },
    {
      name: "Mission Valley Accessibility",
      location: "San Diego, CA",
      specialties: ["Complete Home Renovations", "Voice-Activated Systems", "Flooring Modifications"],
      yearsExperience: 14,
      capsVerified: true,
      vaProjects: 53
    }
  ]

  const topModifications = [
    { name: "Bathroom Modifications", avgCost: "$15,000 - $35,000", requestRate: "78%" },
    { name: "Wheelchair Ramps", avgCost: "$3,000 - $12,000", requestRate: "65%" },
    { name: "Door Widening", avgCost: "$1,500 - $3,500", requestRate: "52%" },
    { name: "Roll-in/Walk-in Showers", avgCost: "$8,000 - $20,000", requestRate: "61%" },
    { name: "Grab Bar Installation", avgCost: "$500 - $2,000", requestRate: "45%" },
    { name: "Kitchen Modifications", avgCost: "$10,000 - $25,000", requestRate: "38%" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              AdaptHome.vet
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <a href="#stats" className="text-slate-300 hover:text-white transition-colors">Stats</a>
              <a href="#modifications" className="text-slate-300 hover:text-white transition-colors">Modifications</a>
              <a href="#contractors" className="text-slate-300 hover:text-white transition-colors">Contractors</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a>
              <a
                href="#calculator"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Calculate Costs
              </a>
            </div>
            <div className="md:hidden">
              <a
                href="#calculator"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
              >
                Calculate
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-block bg-blue-600/20 border border-blue-500 px-4 py-2 rounded-full mb-6">
          <span className="text-blue-400 font-semibold">San Diego County Veterans</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          VA Housing Grants for<br />San Diego County Veterans
        </h1>

        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Connect with CAPS-certified contractors for your adaptive home modifications.
          Free cost calculator + contractor matching for veterans with SAH, SHA, or HISA grants.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#calculator"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg text-lg transition-colors shadow-lg"
          >
            Calculate Your Project Costs →
          </a>
          <a
            href="#contractors"
            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg text-lg transition-colors shadow-lg"
          >
            View Local Contractors
          </a>
        </div>

        {/* Veteran-Owned Badge */}
        <div className="mt-8 text-slate-400">
          <p className="text-sm">🇺🇸 Veteran-Owned & Operated | Always Free for Veterans</p>
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          San Diego County by the Numbers
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <div className="text-4xl font-bold text-blue-400 mb-2">240,000</div>
            <div className="text-slate-300">Veterans in San Diego County</div>
            <div className="text-sm text-slate-500 mt-2">2nd largest in California</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <div className="text-4xl font-bold text-green-400 mb-2">$875K</div>
            <div className="text-slate-300">Median Home Value</div>
            <div className="text-sm text-slate-500 mt-2">San Diego City (2024)</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <div className="text-4xl font-bold text-purple-400 mb-2">$115,956</div>
            <div className="text-slate-300">Max SAH Grant</div>
            <div className="text-sm text-slate-500 mt-2">For major modifications</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <div className="text-4xl font-bold text-yellow-400 mb-2">7</div>
            <div className="text-slate-300">CAPS Contractors</div>
            <div className="text-sm text-slate-500 mt-2">VA-experienced in your area</div>
          </div>
        </div>

        {/* Regional Home Values */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6">Average Home Values by City</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$930K</div>
              <div className="text-slate-300 font-semibold">San Diego</div>
              <div className="text-sm text-slate-500">Downtown & Coastal</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$865K</div>
              <div className="text-slate-300 font-semibold">Oceanside</div>
              <div className="text-sm text-slate-500">North County</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$820K</div>
              <div className="text-slate-300 font-semibold">Chula Vista</div>
              <div className="text-sm text-slate-500">South Bay</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Modifications Section */}
      <div id="modifications" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Most Requested Modifications
        </h2>
        <p className="text-slate-400 text-center mb-12">
          Based on VA grant applications in San Diego County
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topModifications.map((mod, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">{mod.name}</h3>
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                  {mod.requestRate}
                </span>
              </div>
              <p className="text-slate-300 font-semibold">{mod.avgCost}</p>
              <p className="text-sm text-slate-500 mt-2">Average cost range in San Diego</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-600/10 border border-blue-500/30 rounded-xl p-6">
          <h4 className="text-xl font-bold text-white mb-3">VA Grant Programs Available:</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="font-semibold text-blue-400">SAH Grant</div>
              <div className="text-slate-300">Up to $115,956</div>
              <div className="text-sm text-slate-500">Major modifications</div>
            </div>
            <div>
              <div className="font-semibold text-green-400">SHA Grant</div>
              <div className="text-slate-300">Up to $23,444</div>
              <div className="text-sm text-slate-500">Less extensive modifications</div>
            </div>
            <div>
              <div className="font-semibold text-purple-400">HISA Grant</div>
              <div className="text-slate-300">Up to $6,800</div>
              <div className="text-sm text-slate-500">Minor modifications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contractors Section */}
      <div id="contractors" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          CAPS-Certified Contractors in San Diego County
        </h2>
        <p className="text-slate-400 text-center mb-12">
          All contractors are verified CAPS-certified and VA-experienced
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {contractors.map((contractor, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{contractor.name}</h3>
                  <p className="text-slate-400 text-sm">📍 {contractor.location}</p>
                </div>
                {contractor.capsVerified && (
                  <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ CAPS
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="text-sm text-slate-500 mb-2">Specialties:</div>
                <div className="flex flex-wrap gap-2">
                  {contractor.specialties.map((specialty, idx) => (
                    <span key={idx} className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div className="text-slate-400">
                  <span className="font-semibold text-white">{contractor.yearsExperience}</span> years experience
                </div>
                <div className="text-slate-400">
                  <span className="font-semibold text-white">{contractor.vaProjects}</span> VA projects
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-xl p-6 text-center">
          <p className="text-yellow-400 font-semibold mb-2">🚧 Beta Launch - Example Contractors</p>
          <p className="text-slate-300 text-sm">
            These are example contractors to demonstrate the platform. We're actively onboarding verified CAPS-certified contractors in San Diego County.
            Contact us to join our beta program.
          </p>
        </div>
      </div>

      {/* Success Story Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur rounded-2xl p-8 border border-blue-500/30">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
            <h3 className="text-2xl font-bold text-white mb-4">Success Story: Marine Veteran in Oceanside</h3>
          </div>

          <div className="text-slate-300 space-y-4 mb-6">
            <p className="italic">
              "After 22 years in the Marines, I took an IED blast in Afghanistan that left me wheelchair-bound.
              Coming home to my family in Oceanside should have been a relief, but our home wasn't accessible.
              I couldn't even get into my own bathroom independently."
            </p>

            <p className="italic">
              "AdaptHome made the process so simple. Within 24 hours, I had cost estimates for a full bathroom remodel,
              wheelchair ramp, and doorway widening - all within my SAH grant limits. They connected me with a local
              CAPS contractor who had done dozens of VA projects."
            </p>

            <p className="italic">
              "Four months later, I have a fully accessible home. Roll-in shower, widened doorways, and a beautiful ramp
              that my kids use for their bikes. The contractor knew exactly what the VA required for approval. No surprises,
              no runaround - just results."
            </p>
          </div>

          <div className="border-t border-slate-600 pt-6">
            <p className="text-white font-semibold">— Staff Sergeant Michael R., USMC (Ret.)</p>
            <p className="text-slate-400 text-sm">Oceanside, CA • 100% Service-Connected • SAH Grant Recipient</p>
          </div>
        </div>
      </div>

      {/* VA Office Info Section */}
      <div id="contact" className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          San Diego VA Regional Office
        </h2>

        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
              <div className="space-y-3 text-slate-300">
                <div>
                  <div className="text-sm text-slate-500">Address</div>
                  <div className="font-semibold">8620 Spectrum Center Blvd, Suite 629</div>
                  <div className="font-semibold">San Diego, CA 92123</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Phone</div>
                  <div className="font-semibold">800-827-1000</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Email</div>
                  <div className="font-semibold">PCTC.vbasdc@va.gov</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Hours</div>
                  <div className="font-semibold">Monday - Friday: 8:00 AM - 4:00 PM</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Getting Help</h3>
              <div className="space-y-3 text-slate-300">
                <div>
                  <div className="font-semibold mb-1">Schedule an Appointment</div>
                  <div className="text-sm text-slate-400">
                    Use the VA's VERA portal for virtual or in-person appointments
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Walk-ins Welcome</div>
                  <div className="text-sm text-slate-400">
                    Walk-ins accepted during business hours for disability compensation, education benefits, and home loans
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Parking</div>
                  <div className="text-sm text-slate-400">
                    Free first hour, $2 per additional hour in adjacent parking garage
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="calculator" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Get instant cost estimates for your adaptive home modifications and connect with
            CAPS-certified contractors who understand VA grant requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-700 font-bold rounded-lg text-lg transition-colors shadow-lg">
              Calculate Your Project Costs →
            </button>
            <button className="px-8 py-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg text-lg transition-colors">
              Talk to a Contractor
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Always Free for Veterans</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>No Obligations</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Veteran-Owned</span>
            </div>
          </div>
        </div>
      </div>

      {/* About AdaptHome Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">About AdaptHome</h3>
          <div className="text-slate-300 space-y-4">
            <p>
              AdaptHome is a veteran-to-veteran service connecting California veterans with VA housing grants
              to CAPS-certified contractors who specialize in adaptive home modifications.
            </p>
            <p>
              Built by Jacob, an active-duty Navy E6 with 19 years of service currently going through the medical
              board process. I'm building the tools I wish existed during my own transition.
            </p>
            <p className="font-semibold text-white">
              Our mission is simple: Make it easier for veterans to use their hard-earned VA benefits to create
              accessible, independent living spaces.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700 text-center">
            <p className="text-slate-400 text-sm">
              Formation Labs LLC | Wyoming-Based | Serving Veterans Nationwide
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-800/30 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-slate-400 text-sm">
            <p className="mb-2">© 2024 AdaptHome.vet - A Formation Labs Product</p>
            <p>Made with 🇺🇸 by veterans, for veterans</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
