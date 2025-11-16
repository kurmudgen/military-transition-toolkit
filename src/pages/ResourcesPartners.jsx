import { ExternalLink, Home, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { useEffect } from 'react';
import { trackPageView, trackButtonClick } from '../utils/analytics';

export default function ResourcesPartners() {
  useEffect(() => {
    document.title = 'Resources & Partners - Military Transition Toolkit';
    trackPageView('Resources & Partners');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Recommended Transition Resources
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            MTT partners with organizations that serve transitioning servicemembers.
            When you use these services, they help support our mission to stay free.
          </p>
        </div>

        {/* Home Buying Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold text-white">Home Buying</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Veterans United */}
            <ResourceCard
              title="Veterans United Home Loans"
              description="The #1 VA lender - $0 down, no PMI, 34-day average closing"
              benefits={[
                "No down payment required",
                "No private mortgage insurance",
                "Competitive interest rates",
                "Excellent customer service (442K+ reviews)"
              ]}
              link="https://www.veteransunited.com/?utm_source=mtt&utm_medium=referral&utm_campaign=resources-page"
              linkText="Get Pre-Approved"
            />
          </div>
        </section>

        {/* Training & Certifications */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-8 h-8 text-green-400" />
            <h2 className="text-3xl font-bold text-white">Training & Certifications</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* O2O */}
            <ResourceCard
              title="Onward to Opportunity (O2O)"
              description="Free professional certifications from Syracuse University"
              benefits={[
                "40+ certifications available",
                "Google, CompTIA, PMI programs",
                "100% free including exam",
                "$7K-13K higher starting salaries"
              ]}
              link="https://ivmf.syracuse.edu/programs/career-training/?utm_source=mtt&utm_medium=referral&utm_campaign=resources-page"
              linkText="Explore Programs"
            />

            {/* VetsinTech */}
            <ResourceCard
              title="VetsinTech"
              description="Tech training and community for veteran tech careers"
              benefits={[
                "Free cybersecurity training",
                "100K+ community members",
                "Direct employer connections",
                "27 chapters nationwide"
              ]}
              link="https://vetsintech.co/?utm_source=mtt&utm_medium=referral&utm_campaign=resources-page"
              linkText="Join VIT"
            />

            {/* Coursera */}
            <ResourceCard
              title="Coursera"
              description="Professional certificates and online courses"
              benefits={[
                "Google Career Certificates",
                "IBM Data Science",
                "University partnerships",
                "Financial aid available"
              ]}
              link="https://www.coursera.org/?utm_source=mtt&utm_medium=referral&utm_campaign=resources-page"
              linkText="Browse Courses"
            />
          </div>
        </section>

        {/* Career Support */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Career Support</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hire Heroes */}
            <ResourceCard
              title="Hire Heroes USA"
              description="Free 1-on-1 career coaching and resume help"
              benefits={[
                "Free professional resume writing",
                "Mock interviews",
                "LinkedIn optimization",
                "55,000+ veterans assisted"
              ]}
              link="https://www.hireheroesusa.org/?utm_source=mtt&utm_medium=referral&utm_campaign=resources-page"
              linkText="Get Free Coaching"
            />

            {/* LinkedIn Premium */}
            <ResourceCard
              title="LinkedIn Premium"
              description="1 year free for veterans, networking tools"
              benefits={[
                "See who viewed your profile",
                "InMail credits",
                "LinkedIn Learning access",
                "$360-480 value free for 1 year"
              ]}
              link="https://www.linkedin.com/premium/?utm_source=mtt&utm_medium=referral&utm_campaign=resources-page"
              linkText="Claim Free Year"
            />
          </div>
        </section>

        {/* Books & Resources */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Recommended Reading</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Your Next Mission */}
            <ResourceCard
              title="Your Next Mission"
              description="By Lida Citroen - Essential guide for veteran career transition and personal branding"
              link="https://www.amazon.com/dp/1632651483?tag=militarytra05-20"
              linkText="View on Amazon"
              small={true}
            />

            {/* The Veteran's Playbook */}
            <ResourceCard
              title="The Veteran's Playbook"
              description="By Glenn Hubbard - Proven strategies for successful transition to civilian life"
              link="https://www.amazon.com/dp/B07H3V6JYM?tag=militarytra05-20"
              linkText="View on Amazon"
              small={true}
            />

            {/* Combat to College */}
            <ResourceCard
              title="Combat to College"
              description="By Jillian Ventiera - Navigate higher education with your military benefits"
              link="https://www.amazon.com/dp/1948080001?tag=militarytra05-20"
              linkText="View on Amazon"
              small={true}
            />

            {/* Recruit or Die */}
            <ResourceCard
              title="Recruit or Die"
              description="By Ryan McManus - Build your veteran hiring program and team"
              link="https://www.amazon.com/dp/1544510527?tag=militarytra05-20"
              linkText="View on Amazon"
              small={true}
            />
          </div>

          {/* Browse More Link */}
          <div className="mt-6 text-center">
            <a
              href="https://www.amazon.com/s?k=military+transition&tag=militarytra05-20"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('Resource Click - Browse More Books')}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Browse more military transition books on Amazon
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
          <p className="text-slate-400 text-sm">
            MTT may earn commissions from these partners, which helps us keep the platform
            free for all servicemembers and veterans. We only recommend resources we believe
            provide genuine value to the military community.
          </p>
        </div>
      </div>
    </div>
  );
}

// ResourceCard Component
function ResourceCard({ title, description, benefits, link, linkText, small = false }) {
  const handleClick = () => {
    trackButtonClick(`Resource Click - ${title}`);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-300 mb-4">{description}</p>

      {benefits && !small && (
        <ul className="space-y-2 mb-6">
          {benefits.map((benefit, i) => (
            <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      )}

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
      >
        {linkText}
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
