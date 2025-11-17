import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    const dismissed = localStorage.getItem('stateBenefitsBannerDismissed');
    const dismissedDate = localStorage.getItem('stateBenefitsBannerDismissedDate');

    if (!dismissed) return true;

    // Show again after 7 days
    if (dismissedDate) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed > 7) {
        localStorage.removeItem('stateBenefitsBannerDismissed');
        localStorage.removeItem('stateBenefitsBannerDismissedDate');
        return true;
      }
    }

    return false;
  });

  const handleBannerClick = () => {
    // Track banner click
    if (window.gtag) {
      window.gtag('event', 'banner_click', {
        'banner_type': 'state_benefits_announcement',
        'banner_location': 'homepage'
      });
    }
  };

  const handleDismiss = () => {
    // Track banner dismissal
    if (window.gtag) {
      window.gtag('event', 'banner_dismiss', {
        'banner_type': 'state_benefits_announcement',
        'banner_location': 'homepage'
      });
    }

    setIsVisible(false);
    localStorage.setItem('stateBenefitsBannerDismissed', 'true');
    localStorage.setItem('stateBenefitsBannerDismissedDate', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-green-600 text-white">
      <div className="max-w-7xl mx-auto py-2 sm:py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Icon */}
          <span className="flex p-1.5 sm:p-2 rounded-lg bg-yellow-400 flex-shrink-0">
            <span className="text-base sm:text-xl">🆕</span>
          </span>

          {/* Message */}
          <p className="flex-1 min-w-0 text-sm sm:text-base font-medium text-white">
            <span className="inline-block mr-1 sm:mr-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-bold bg-yellow-400 text-gray-900 rounded-full">
              NEW
            </span>
            <span className="hidden sm:inline">
              Compare Veteran Benefits Across All 50 States
            </span>
            <span className="sm:hidden">
              State Benefits Tool
            </span>
            <span className="hidden md:inline ml-2 text-blue-100">
              → Property taxes, healthcare, education & more
            </span>
          </p>

          {/* CTA Button */}
          <Link
            to="/state-benefits"
            onClick={handleBannerClick}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-blue-600 bg-white hover:bg-blue-50 rounded-md shadow-sm transition-colors whitespace-nowrap flex-shrink-0"
          >
            Try Free
            <span className="hidden sm:inline"> →</span>
          </Link>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="flex p-1.5 sm:p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
