import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/Layout';
import { statesData } from '../../data/stateBenefitsData';
import PublicNav from '../../components/Navigation/PublicNav';

export default function StateDetailPage() {
  const { user } = useAuth();
  const { stateCode } = useParams();
  const state = statesData[stateCode?.toUpperCase()];

  // "State Not Found" content
  const NotFoundContent = () => (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">State Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">The state you're looking for doesn't exist in our database yet.</p>
      <Link to="/state-benefits" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
        ← Back to Comparison
      </Link>
    </div>
  );

  if (!state) {
    // If user is logged in, use Layout
    if (user) {
      return (
        <Layout>
          <NotFoundContent />
        </Layout>
      );
    }

    // If not logged in, use public navigation
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <PublicNav currentPage="/state-benefits" />
        <div className="dark">
          <NotFoundContent />
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    if (amount >= 999999) return 'Full Exemption';
    return `$${amount.toLocaleString()}`;
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.min(5, Math.round(rating)));
  };

  // Main state detail content (without Layout wrapper)
  const StateDetailContent = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <Link
          to="/state-benefits"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 inline-block font-semibold"
        >
          ← Back to Comparison
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {state.name} Veteran Benefits - Complete Guide 2025
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-2xl">{renderStars(Math.round(state.overallRating / 20))}</div>
          <div className="text-xl text-gray-700 dark:text-gray-300">
            Overall Rating: <span className="font-bold text-blue-600 dark:text-blue-400">{state.overallRating}/100</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">📊 Quick Stats at a Glance</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-600 mb-1">Veteran Population</p>
            <p className="text-2xl font-bold text-blue-600">{state.veteranPopulation.toLocaleString()}</p>
            <p className="text-sm text-gray-500">{state.veteranPercentage}% of state</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Overall MTT Rating</p>
            <p className="text-2xl font-bold text-green-600">{state.overallRating}/100</p>
            <p className="text-sm text-gray-500">{renderStars(Math.round(state.overallRating / 20))}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">VA Medical Centers</p>
            <p className="text-2xl font-bold text-purple-600">{state.healthcare.length}</p>
            <p className="text-sm text-gray-500">Full-service facilities</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Property Tax (100%)</p>
            <p className="text-2xl font-bold text-orange-600">{formatCurrency(state.taxes.propertyTax100Pct)}</p>
            <p className="text-sm text-gray-500">Disabled veteran</p>
          </div>
        </div>
      </div>

      {/* Tax Benefits Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">💰 Tax Benefits in {state.name}</h2>

        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-lg mb-2">Property Tax Exemptions</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>100% Disabled:</strong> {formatCurrency(state.taxes.propertyTax100Pct)} exemption</li>
              {state.taxes.propertyTax50Pct && <li>• <strong>50% Disabled:</strong> {formatCurrency(state.taxes.propertyTax50Pct)} exemption</li>}
            </ul>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg mb-2">Income Tax on Military Retirement</h3>
            <p className="text-gray-700">{state.taxes.incomeTaxRetirement}</p>
          </div>

          {state.taxes.salesTaxExemption && (
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Sales Tax Exemptions</h3>
              <p className="text-gray-700">{state.taxes.salesTaxExemption}</p>
            </div>
          )}

          {state.taxes.vehicleExemption && (
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Vehicle Tax Benefits</h3>
              <p className="text-gray-700">{state.taxes.vehicleExemption}</p>
            </div>
          )}

          {state.taxes.additionalBenefits && (
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-bold text-lg mb-2">Additional Tax Benefits</h3>
              <p className="text-gray-700">{state.taxes.additionalBenefits}</p>
            </div>
          )}
        </div>
      </div>

      {/* Healthcare Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">🏥 VA Healthcare Facilities in {state.name}</h2>
        <p className="text-gray-600 mb-6">{state.name} has {state.healthcare.length} VA Medical Center{state.healthcare.length > 1 ? 's' : ''} providing comprehensive healthcare services.</p>

        <div className="space-y-4">
          {state.healthcare.map((facility, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg text-blue-600">{facility.name}</h3>
                  <p className="text-gray-600 mt-1">{facility.address}</p>
                  <p className="text-sm text-gray-500 mt-2">{facility.services}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Benefits Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">🎓 Education Benefits in {state.name}</h2>
        <div className="space-y-4">
          {state.education.map((benefit, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-green-600 mb-2">{benefit.name}</h3>
              <p className="text-gray-700 mb-2">{benefit.description}</p>
              <div className="flex gap-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">{benefit.eligibility}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Cities Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">🏙️ Best Cities for Veterans in {state.name}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {state.cities.map((city, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
              <h3 className="font-bold text-lg text-blue-600 mb-2">{city.name}</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p>• Cost of Living Index: <span className="font-semibold">{city.costOfLiving}</span></p>
                <p>• {city.veteranServices}</p>
                <p>• {city.highlights}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employment & Resources */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">💼 Employment Resources & Licensing</h2>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg mb-2">Veterans Preference in Hiring</h3>
            <p className="text-gray-700">State and local government jobs give preference points to veterans. Many private employers also prioritize veteran hiring.</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-lg mb-2">Professional Licensing</h3>
            <p className="text-gray-700">Military training and experience may count toward professional licensing requirements in fields like healthcare, emergency services, commercial driving, and trades.</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-lg mb-2">State Veteran Employment Programs</h3>
            <p className="text-gray-700">Dedicated veteran employment specialists help with resume building, job searches, and connections to employers actively seeking veteran candidates.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">❓ Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg mb-2">Q: Do I need to pay property taxes in {state.name} if I'm 100% disabled?</h3>
            <p className="text-gray-700">A: {state.taxes.propertyTax100Pct >= 999999 ? `No! ${state.name} offers a full property tax exemption for 100% disabled veterans.` : `${state.name} offers a property tax exemption of up to ${formatCurrency(state.taxes.propertyTax100Pct)} for 100% disabled veterans.`}</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-lg mb-2">Q: Is my military retirement pay taxed in {state.name}?</h3>
            <p className="text-gray-700">A: {state.taxes.incomeTaxRetirement}</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-lg mb-2">Q: How many VA medical facilities are in {state.name}?</h3>
            <p className="text-gray-700">A: {state.name} has {state.healthcare.length} VA Medical Center{state.healthcare.length > 1 ? 's' : ''} providing full-service healthcare.</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Next Steps</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/state-benefits"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-center font-semibold"
          >
            Compare {state.name} with Other States
          </Link>
          <button className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 font-semibold">
            Calculate My Savings in {state.name}
          </button>
          <button className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 font-semibold">
            📄 Download {state.name} Benefits Guide PDF
            <span className="text-xs block mt-1 text-gray-600">🔒 Sign up free</span>
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-semibold">
            ⭐ Save {state.name} to Favorites
            <span className="text-xs block mt-1 text-gray-600">🔒 Sign up free</span>
          </button>
        </div>
      </div>
    </div>
  );

  // If user is logged in, use Layout.jsx for consistent navigation
  if (user) {
    return (
      <Layout>
        <StateDetailContent />
      </Layout>
    );
  }

  // If not logged in, use public marketing navigation
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <PublicNav currentPage="/state-benefits" />
      <div className="dark">
        <StateDetailContent />
      </div>
    </div>
  );
}
