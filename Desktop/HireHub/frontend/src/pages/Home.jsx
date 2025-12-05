import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-24 text-center bg-gradient-to-b from-indigo-50/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Find your next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Dream Job</span> today
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
            Connect with top employers and discover opportunities that match your skills and aspirations.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/jobs" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5">
              Browse Jobs
            </Link>
            <Link to="/signup" className="inline-flex items-center px-8 py-3 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-all transform hover:-translate-y-0.5">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Why HireHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                🔍
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Smart Search</h3>
              <p className="text-slate-600">
                Filter jobs by location, salary, and role to find exactly what you're looking for.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                🏢
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Top Companies</h3>
              <p className="text-slate-600">
                Apply to thousands of jobs from top-tier companies and startups.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                🚀
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Easy Apply</h3>
              <p className="text-slate-600">
                Create your profile once and apply to multiple jobs with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of job seekers and employers on HireHub.
          </p>
          <Link to="/signup" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition-all transform hover:-translate-y-0.5 shadow-lg">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
