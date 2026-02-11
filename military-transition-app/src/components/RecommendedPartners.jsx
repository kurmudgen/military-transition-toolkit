import { useMemo } from 'react'
import { getPartnersByContext, PARTNER_CATEGORIES } from '../data/partnersData'

/**
 * Contextual partner/resource recommendations.
 * Drop into any page with a `context` prop to show relevant resources.
 *
 * Props:
 *   context  – PartnerContext string (e.g. 'budget', 'career', 'va_claims')
 *   limit    – max number of partners to show (default 4)
 *   title    – optional custom heading
 */
export default function RecommendedPartners({ context, limit = 4, title }) {
  const partners = useMemo(
    () => getPartnersByContext(context).slice(0, limit),
    [context, limit]
  )

  if (partners.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
        {title || 'Recommended Resources'}
      </h3>
      <div className="space-y-2">
        {partners.map((partner) => {
          const cat = PARTNER_CATEGORIES[partner.category]
          return (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group"
            >
              <span className="text-lg flex-shrink-0 mt-0.5">
                {partner.badge || cat?.icon || '🔗'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {partner.name}
                  </span>
                  {partner.isFree && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                      FREE
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                  {partner.description}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-1 group-hover:text-blue-500 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )
        })}
      </div>
    </div>
  )
}
