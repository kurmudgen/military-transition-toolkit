import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Pricing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to About page since we're currently free
    navigate('/about');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Currently Free
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Military Transition Toolkit is free for all users.
        </p>
        <p className="text-slate-400 mb-8">
          Learn about our sustainability model and how we plan to stay free.
        </p>
        <button
          onClick={() => navigate('/about')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
