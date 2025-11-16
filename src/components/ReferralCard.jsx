import { useState } from 'react';
import { Copy, Check, Mail, Share2 } from 'lucide-react';
import { trackButtonClick } from '../utils/analytics';

export default function ReferralCard({ referralCode, referralCount }) {
  const [copied, setCopied] = useState(false);
  const referralUrl = `${window.location.origin}/signup?ref=${referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      trackButtonClick('Copy Referral Link');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Check out Military Transition Toolkit');
    const body = encodeURIComponent(
      `I'm using Military Transition Toolkit to plan my transition - it's 100% free and has VA claims tracking, state benefits comparison, resume builder, and more.\n\nSign up here: ${referralUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    trackButtonClick('Share Referral via Email');
  };

  const shareViaNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Military Transition Toolkit',
          text: "I'm using MTT to plan my military transition - it's 100% free with VA claims tracking, resume builder, and more!",
          url: referralUrl
        });
        trackButtonClick('Share Referral via Native');
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-2 border-blue-500/50 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <Share2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-xl font-bold text-white mb-2">
            Invite Your Battle Buddies
          </h3>
          <p className="text-slate-300 text-sm">
            Share MTT with fellow servicemembers and help them navigate transition
          </p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Your Referral Link
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralUrl}
            readOnly
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="mb-4 p-4 bg-slate-800/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">People You've Referred</p>
            <p className="text-3xl font-bold text-white">{referralCount}</p>
          </div>
          {referralCount > 0 && (
            <div className="text-right">
              <p className="text-green-400 font-semibold flex items-center gap-1">
                ✓ Founding Member
              </p>
              <p className="text-slate-400 text-xs">Thank you for sharing!</p>
            </div>
          )}
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex gap-3">
        <button
          onClick={shareViaEmail}
          className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Email
        </button>
        {navigator.share && (
          <button
            onClick={shareViaNative}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        )}
      </div>

      {/* Incentive Text */}
      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
        <p className="text-blue-200 text-xs text-center">
          💡 Help us grow MTT and keep it free for everyone. Every referral helps!
        </p>
      </div>
    </div>
  );
}
