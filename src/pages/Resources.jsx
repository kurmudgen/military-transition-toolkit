import { useEffect } from 'react'

export default function Resources() {
  useEffect(() => {
    document.title = 'Transition Resources - Military Transition Toolkit'
  }, [])

  const ResourceCard = ({ href, title, description }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors group"
    >
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-slate-300 text-sm mb-2">{description}</p>
      <span className="text-blue-400 text-sm group-hover:text-blue-300">
        Visit site →
      </span>
    </a>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Transition Resources</h1>
          <p className="text-slate-300 text-lg">
            Comprehensive directory of official resources to support your military transition
          </p>
        </div>

        <div className="space-y-6">
          {/* TAP & Transition Programs */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">🎓 TAP & Transition Programs</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ResourceCard
                href="https://www.dodtap.mil"
                title="DOD TAP"
                description="Official Transition Assistance Program site - comprehensive transition planning and workshops"
              />

              <ResourceCard
                href="https://www.skillbridge.osd.mil"
                title="SkillBridge"
                description="Industry training opportunities during final 180 days of service"
              />

              <ResourceCard
                href="https://www.militaryonesource.mil"
                title="Military OneSource"
                description="24/7 support for service members and families - free counseling, resources, tools"
              />

              <ResourceCard
                href="https://www.acap.army.mil"
                title="Army ACAP"
                description="Army Career and Alumni Program - transition services for soldiers"
              />

              <ResourceCard
                href="https://www.navy.mil/Resources/Transition/"
                title="Navy FFSC"
                description="Navy Fleet and Family Support - transition assistance and counseling"
              />

              <ResourceCard
                href="https://www.usmc-mccs.org/services/career/transition-readiness/"
                title="Marine Corps TAMP"
                description="Marine Corps Transition and Employment Assistance Program"
              />
            </div>
          </div>

          {/* VA Benefits */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">🏥 VA Benefits & Healthcare</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ResourceCard
                href="https://www.va.gov"
                title="VA.gov"
                description="Main VA benefits portal - healthcare, disability, pensions, and more"
              />

              <ResourceCard
                href="https://www.ebenefits.va.gov"
                title="eBenefits"
                description="Manage your VA benefits online - claims, letters, dependents"
              />

              <ResourceCard
                href="https://www.myhealth.va.gov"
                title="My HealtheVet"
                description="Access VA health records, appointments, prescriptions, and messaging"
              />

              <ResourceCard
                href="https://www.benefits.va.gov/compensation/"
                title="VA Disability Compensation"
                description="Information about disability ratings, benefits, and compensation"
              />

              <ResourceCard
                href="https://www.benefits.va.gov/vocrehab/"
                title="VR&E"
                description="Vocational Rehabilitation & Employment - education and career counseling"
              />

              <ResourceCard
                href="https://www.va.gov/health-care/eligibility/"
                title="VA Healthcare Enrollment"
                description="Learn about VA healthcare eligibility and how to enroll"
              />
            </div>
          </div>

          {/* Education & GI Bill */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">📚 Education & GI Bill</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ResourceCard
                href="https://www.va.gov/education/"
                title="GI Bill Overview"
                description="Complete guide to GI Bill benefits - Post-9/11, Montgomery, and more"
              />

              <ResourceCard
                href="https://www.benefits.va.gov/gibill/comparison_tool.asp"
                title="GI Bill Comparison Tool"
                description="Compare education benefits and school costs across institutions"
              />

              <ResourceCard
                href="https://www.gibill.va.gov"
                title="GI Bill Website"
                description="Official GI Bill information, applications, and support"
              />

              <ResourceCard
                href="https://www.veteransaidbenefit.org"
                title="Federal Student Aid for Veterans"
                description="Additional financial aid options beyond GI Bill benefits"
              />

              <ResourceCard
                href="https://www.cool.osd.mil"
                title="COOL - Credentialing"
                description="Civilian credentialing opportunities based on military training"
              />

              <ResourceCard
                href="https://www.onlinelearning.va.gov"
                title="VA Education Benefits Portal"
                description="Apply for education benefits and track your status online"
              />
            </div>
          </div>

          {/* Employment */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">💼 Employment & Careers</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ResourceCard
                href="https://www.careeronestop.org/Veterans/"
                title="CareerOneStop for Veterans"
                description="DOL employment resources - job search, training, career exploration"
              />

              <ResourceCard
                href="https://www.hirevets.gov"
                title="Hire Vets Medallion"
                description="Find employers committed to hiring veterans"
              />

              <ResourceCard
                href="https://www.usajobs.gov/Veterans/"
                title="USAJOBS Veterans"
                description="Federal job opportunities with veterans preference"
              />

              <ResourceCard
                href="https://www.dol.gov/agencies/vets"
                title="DOL Veterans Employment"
                description="Department of Labor veteran employment and training services"
              />

              <ResourceCard
                href="https://www.linkedinforgood.linkedin.com/programs/veterans"
                title="LinkedIn for Veterans"
                description="Free premium LinkedIn access for transitioning service members"
              />

              <ResourceCard
                href="https://www.mynextmove.org/vets"
                title="My Next Move for Veterans"
                description="Career exploration tool matching military skills to civilian careers"
              />
            </div>
          </div>

          {/* Financial Planning */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">💰 Financial Planning</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ResourceCard
                href="https://www.tsp.gov"
                title="Thrift Savings Plan (TSP)"
                description="Manage your TSP account, contributions, and retirement planning"
              />

              <ResourceCard
                href="https://www.dfas.mil"
                title="DFAS"
                description="Defense Finance and Accounting Service - pay, retirement, benefits"
              />

              <ResourceCard
                href="https://www.militaryonesource.mil/financial-legal/"
                title="Military OneSource Financial"
                description="Free financial counseling and planning services"
              />

              <ResourceCard
                href="https://www.mypay.dfas.mil"
                title="myPay"
                description="Access pay statements, W-2s, 1099-Rs, and update direct deposit"
              />

              <ResourceCard
                href="https://www.consumer.ftc.gov/military"
                title="FTC Military Consumer"
                description="Consumer protection and financial education resources"
              />

              <ResourceCard
                href="https://www.finred.usalearning.gov"
                title="Financial Readiness"
                description="DOD financial literacy and education programs"
              />
            </div>
          </div>

          {/* VSO Finder */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">🤝 Veteran Service Organizations</h2>
            <p className="text-slate-300 mb-4">
              Find local VSOs that can help with your transition and claims. These organizations provide free assistance:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <ResourceCard
                href="https://www.dav.org"
                title="DAV"
                description="Disabled American Veterans - free claims assistance"
              />

              <ResourceCard
                href="https://www.vfw.org"
                title="VFW"
                description="Veterans of Foreign Wars - service officers and support"
              />

              <ResourceCard
                href="https://www.legion.org"
                title="American Legion"
                description="Advocacy, benefits assistance, and community"
              />

              <ResourceCard
                href="https://www.woundedwarriorproject.org"
                title="Wounded Warrior Project"
                description="Programs for wounded veterans and their families"
              />

              <ResourceCard
                href="https://www.teamrubicon.org"
                title="Team Rubicon"
                description="Disaster response and veteran community"
              />

              <ResourceCard
                href="https://www.iava.org"
                title="IAVA"
                description="Iraq and Afghanistan Veterans of America"
              />

              <ResourceCard
                href="https://www.veteranscrisisline.net"
                title="Veterans Crisis Line"
                description="24/7 confidential support - call 988 then press 1"
              />

              <ResourceCard
                href="https://www.va.gov/vso/"
                title="VA Accredited VSOs"
                description="Directory of all VA-accredited organizations"
              />

              <ResourceCard
                href="https://www.uso.org"
                title="USO"
                description="United Service Organizations - support programs"
              />
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">🔗 Additional Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ResourceCard
                href="https://www.tricare.mil"
                title="TRICARE"
                description="Healthcare coverage for service members, retirees, and families"
              />

              <ResourceCard
                href="https://www.dmdc.osd.mil/milconnect"
                title="MilConnect"
                description="Manage DEERS, ID cards, and benefits eligibility"
              />

              <ResourceCard
                href="https://www.archives.gov/veterans"
                title="National Archives Veterans"
                description="Request military records and DD-214"
              />

              <ResourceCard
                href="https://www.sba.gov/veterans"
                title="SBA Veterans Programs"
                description="Small Business Administration support for veteran entrepreneurs"
              />
            </div>
          </div>

          {/* Contact Help */}
          <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Need Help?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-slate-300">
              <div>
                <p className="font-semibold text-white mb-2">Veterans Crisis Line</p>
                <p className="mb-1">Call: <a href="tel:988" className="text-blue-400 hover:underline">988 then press 1</a></p>
                <p className="mb-1">Text: <a href="sms:838255" className="text-blue-400 hover:underline">838255</a></p>
                <p>Chat: <a href="https://www.veteranscrisisline.net/get-help/chat" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">VeteransCrisisLine.net</a></p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">VA Benefits Hotline</p>
                <p className="mb-1">Call: <a href="tel:1-800-827-1000" className="text-blue-400 hover:underline">1-800-827-1000</a></p>
                <p className="text-sm text-slate-400">Mon-Fri, 8am-9pm ET</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
