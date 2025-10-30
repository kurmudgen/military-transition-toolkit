import { useEffect } from 'react'

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms of Service - Military Transition Toolkit'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-400 text-sm mb-8">Last Updated: January 2025</p>

          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using the Military Transition Toolkit ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
              </p>
              <p>
                The Service is provided by Military Transition Toolkit and is designed to help military service members plan and execute their transition to civilian life.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="mb-4">
                Military Transition Toolkit provides:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Interactive transition checklists for various separation scenarios</li>
                <li>Retirement pay calculators and financial planning tools</li>
                <li>VA disability claims guidance and evidence tracking</li>
                <li>State benefits comparison tools</li>
                <li>Appointment and document tracking features</li>
                <li>Educational resources and guidance</li>
              </ul>
              <p className="mt-4">
                All data is stored locally on your device. We do not maintain central servers or databases containing your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the Service for lawful purposes only</li>
                <li>Not attempt to reverse engineer, decompile, or disassemble the Service</li>
                <li>Not use the Service to transmit malicious code or harmful content</li>
                <li>Verify all information provided by the Service with official sources</li>
                <li>Back up your locally stored data regularly</li>
                <li>Not hold the Service liable for decisions made based on its tools and information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. No Professional Advice</h2>
              <p className="mb-4">
                <strong className="text-white">Important Disclaimer:</strong> The Service provides general information and planning tools only. It does not constitute:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Legal advice - Consult with JAG or a qualified attorney for legal matters</li>
                <li>Financial advice - Consult with a licensed financial advisor for financial planning</li>
                <li>Medical advice - Consult with qualified healthcare providers for medical decisions</li>
                <li>Official guidance - Always verify with official military and VA sources</li>
              </ul>
              <p className="mt-4">
                Calculators and tools provide estimates only. Actual benefits, payments, and eligibility may vary based on individual circumstances and official determinations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Local Data Storage</h2>
              <p className="mb-4">
                Your data is stored locally on your device using browser localStorage. This means:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We do not have access to your data</li>
                <li>Your data may be lost if you clear browser data or use private browsing</li>
                <li>You are responsible for backing up your data using the export feature</li>
                <li>Data is not synchronized across devices unless you manually export/import</li>
                <li>We cannot recover lost data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. No Warranties</h2>
              <p className="mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties of accuracy, reliability, or completeness of information</li>
                <li>Warranties of uninterrupted or error-free service</li>
                <li>Warranties that defects will be corrected</li>
              </ul>
              <p className="mt-4">
                Information about military benefits, regulations, and procedures may become outdated. You are responsible for verifying current information with official sources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of data, profits, or opportunities</li>
                <li>Decisions made based on information or calculations from the Service</li>
                <li>Missed deadlines or incomplete transition preparation</li>
                <li>Incorrect benefit calculations or eligibility determinations</li>
                <li>Any damages arising from use or inability to use the Service</li>
              </ul>
              <p className="mt-4">
                IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID FOR THE SERVICE IN THE PAST 12 MONTHS (IF ANY).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Premium Features</h2>
              <p className="mb-4">
                Some features may require a premium subscription or one-time payment. Premium features include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Advanced calculators and planning tools</li>
                <li>Statement generators and templates</li>
                <li>PDF export functionality</li>
                <li>Priority support</li>
              </ul>
              <p className="mt-4">
                Payment terms will be clearly displayed before purchase. Premium features are non-refundable unless required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Modifications to Service</h2>
              <p className="mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify, suspend, or discontinue any part of the Service at any time</li>
                <li>Update these Terms at any time</li>
                <li>Change pricing for premium features with 30 days notice</li>
                <li>Add or remove features</li>
              </ul>
              <p className="mt-4">
                Continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Intellectual Property</h2>
              <p className="mb-4">
                The Service, including all content, features, and functionality, is owned by Military Transition Toolkit and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not copy, modify, distribute, sell, or lease any part of the Service without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your access to the Service at any time, for any reason, without notice. You may stop using the Service at any time.
              </p>
              <p>
                Upon termination, all licenses and rights granted to you will immediately cease. Your locally stored data will remain on your device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Government Use</h2>
              <p>
                If you are using the Service on behalf of the U.S. Government, the Service is a "commercial item" as defined in FAR 2.101, and the Government's rights are limited to those granted in these Terms in accordance with FAR 12.212 and DFARS 227.7202.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms, please contact us at:
              </p>
              <p className="text-blue-400">
                support@formationlabs.com
              </p>
            </section>

            <section className="border-t border-slate-700 pt-6 mt-8">
              <p className="text-slate-400 text-sm">
                By using the Military Transition Toolkit, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </div>

          <div className="mt-8 flex gap-4">
            <a href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Back to Home
            </a>
            <a href="/app" className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors">
              Go to App
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
