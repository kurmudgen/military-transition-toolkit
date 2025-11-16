import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { trackPageView, trackButtonClick } from '../utils/analytics';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Donate() {
  const [amount, setAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const presetAmounts = [5, 10, 25, 50];

  useEffect(() => {
    document.title = 'Support MTT (Optional) - Military Transition Toolkit';
    trackPageView('Donate');
  }, []);

  const handleDonate = async () => {
    setLoading(true);

    const donationAmount = customAmount || amount;
    trackButtonClick(`Donate - $${donationAmount}`);

    try {
      const response = await fetch('/.netlify/functions/create-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: donationAmount * 100 }) // Convert to cents
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Donation error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Support Our Mission (Optional)
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            MTT is 100% free and always will be
          </p>
          <p className="text-slate-400">
            Optional donations help cover costs while we build partnership revenue
          </p>
        </div>

        {/* Donation Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">

          {/* No Pressure Message */}
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 mb-8">
            <p className="text-slate-300 text-sm text-center">
              💙 Only donate if MTT saved you time or helped your transition.
              No pressure, no expectations, no guilt.
            </p>
          </div>

          {/* Preset Amounts */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">
              Choose an amount (optional):
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setAmount(preset);
                    setCustomAmount('');
                  }}
                  className={`py-3 rounded-lg font-semibold transition-all ${
                    amount === preset && !customAmount
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-8">
            <label className="block text-white font-semibold mb-3">
              Or enter custom amount:
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 text-lg">$</span>
              <input
                type="number"
                min="1"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount(0);
                }}
                className="w-full pl-8 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            disabled={loading || (!amount && !customAmount)}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white py-4 rounded-lg font-bold text-lg transition-colors"
          >
            {loading ? 'Processing...' : `Support MTT - $${customAmount || amount}`}
          </button>

          {/* Security Note */}
          <p className="text-slate-400 text-sm text-center mt-4">
            🔒 Secure one-time payment via Stripe
          </p>
        </div>

        {/* What Donations Cover */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            What donations help with:
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💻</div>
              <h4 className="font-semibold text-white mb-2">Server Costs</h4>
              <p className="text-slate-400 text-sm">
                ~$50/month for hosting and database
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🔧</div>
              <h4 className="font-semibold text-white mb-2">Development Tools</h4>
              <p className="text-slate-400 text-sm">
                Services that make MTT better
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-semibold text-white mb-2">New Features</h4>
              <p className="text-slate-400 text-sm">
                Mobile app, community forum, more tools
              </p>
            </div>
          </div>
        </div>

        {/* Alternative Support */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 mb-3">
            Can't donate? No problem! You can also help by:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/resources"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Using our partner resources
            </a>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a
              href="/app"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Referring friends
            </a>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400">Spreading the word</span>
          </div>
        </div>
      </div>
    </div>
  );
}
