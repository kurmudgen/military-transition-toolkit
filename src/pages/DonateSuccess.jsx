import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';

export default function DonateSuccess() {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount') || '0';

  useEffect(() => {
    document.title = 'Thank You! - Military Transition Toolkit';
    trackPageView('Donate Success');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">
          Thank You! 🙏
        </h1>
        <p className="text-xl text-slate-300 mb-4">
          Your ${amount} donation helps keep MTT running
        </p>
        <p className="text-slate-400 mb-8">
          You're making a real difference. MTT stays free for all servicemembers
          thanks to supporters like you.
        </p>
        <Link
          to="/app"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
