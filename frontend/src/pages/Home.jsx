import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

// --- Icons ---
const IconSvg = ({ children, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const Search = (p) => <IconSvg {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></IconSvg>;
const MapPin = (p) => <IconSvg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></IconSvg>;
const Briefcase = (p) => <IconSvg {...p}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></IconSvg>;
const Building2 = (p) => <IconSvg {...p}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></IconSvg>;
const TrendingUp = (p) => <IconSvg {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></IconSvg>;
const Users = (p) => <IconSvg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconSvg>;
const Code2 = (p) => <IconSvg {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></IconSvg>;
const Palette = (p) => <IconSvg {...p}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.836-.437-1.124-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></IconSvg>;
const LineChart = (p) => <IconSvg {...p}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></IconSvg>;
const Megaphone = (p) => <IconSvg {...p}><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></IconSvg>;
const Stethoscope = (p) => <IconSvg {...p}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></IconSvg>;
const GraduationCap = (p) => <IconSvg {...p}><path d="M21.42 10.922a2 2 0 0 0-.019-3.838L12.83 4.3a2 2 0 0 0-1.66 0l-8.57 2.78a2 2 0 0 0-.02 3.84l8.59 2.8a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></IconSvg>;
const ArrowRight = (p) => <IconSvg {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></IconSvg>;
const Star = (p) => <IconSvg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></IconSvg>;
const CheckCircle2 = (p) => <IconSvg {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></IconSvg>;

// --- UI Components ---
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    hero: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md",
    secondary: "bg-slate-100 text-indigo-700 hover:bg-slate-200",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    white: "bg-white text-indigo-600 hover:bg-slate-50 shadow-md",
  };
  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-12 rounded-md px-8 text-base",
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default', className = '' }) => {
  const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const variants = {
    default: "border-transparent bg-indigo-600 text-white",
    secondary: "border-transparent bg-indigo-50 text-indigo-700",
    outline: "text-slate-900",
  };
  return (
    <div className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const Input = ({ className = '', ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// --- Data ---
const categories = [
  { icon: Code2, name: "Engineering", count: "1,284 jobs" },
  { icon: Palette, name: "Design", count: "642 jobs" },
  { icon: LineChart, name: "Finance", count: "418 jobs" },
  { icon: Megaphone, name: "Marketing", count: "936 jobs" },
  { icon: Stethoscope, name: "Healthcare", count: "725 jobs" },
  { icon: GraduationCap, name: "Education", count: "311 jobs" },
];

const jobs = [
  { id: 1, title: "Senior Frontend Engineer", company: "Linear", logo: "L", location: "Remote · Worldwide", type: "Full-time", salary: "$140k – $180k", tags: ["React", "TypeScript", "Remote"] },
  { id: 2, title: "Product Designer", company: "Figma", logo: "F", location: "San Francisco, CA", type: "Full-time", salary: "$120k – $160k", tags: ["Figma", "UX", "Hybrid"] },
  { id: 3, title: "Backend Engineer", company: "Stripe", logo: "S", location: "Dublin, Ireland", type: "Full-time", salary: "€90k – €130k", tags: ["Go", "Kubernetes"] },
  { id: 4, title: "Marketing Manager", company: "Notion", logo: "N", location: "New York, NY", type: "Full-time", salary: "$95k – $130k", tags: ["Growth", "B2B"] },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white opacity-70" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 py-20 lg:py-32 items-center">
          <div className="z-10 relative">
            <Badge variant="secondary" className="mb-6 gap-2 border border-slate-200 px-3 py-1 shadow-sm font-medium bg-white">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              12,480 new jobs this week
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Find the job that <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">moves you forward</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-xl font-light">
              Connect with top employers and discover opportunities that seamlessly match your skills and aspirations.
            </p>

            {/* Search */}
            <Card className="mt-10 p-2 shadow-lg shadow-indigo-100/50 border-slate-200 flex flex-col md:flex-row gap-2 bg-white rounded-xl">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 md:py-0">
                <Search className="h-5 w-5 text-indigo-400" />
                <Input placeholder="Job title or keyword" className="border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-base" />
              </div>
              <div className="hidden md:block w-px bg-slate-200 my-2" />
              <div className="flex-1 flex items-center gap-3 px-4 py-2 md:py-0 border-t border-slate-100 md:border-t-0">
                <MapPin className="h-5 w-5 text-indigo-400" />
                <Input placeholder="Location or 'Remote'" className="border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-base" />
              </div>
              <Button size="lg" className="shrink-0 w-full md:w-auto rounded-lg">Search jobs</Button>
            </Card>

            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-slate-500">
              <span className="font-medium text-slate-900">Popular:</span>
              {["Product Designer", "React", "Data Scientist", "Remote"].map((t, i) => (
                <React.Fragment key={t}>
                  <Link to="/jobs" className="hover:text-indigo-600 transition-colors underline-offset-4 hover:underline">{t}</Link>
                  {i < 3 && <span className="text-slate-300">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="relative z-10 hidden lg:block">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-indigo-500/10 relative bg-white p-2">
              <img
                src={heroImg}
                alt="Modern professional workspace"
                className="rounded-xl w-full h-auto object-cover opacity-90 transition-opacity hover:opacity-100"
              />
              <Card className="absolute -bottom-6 -left-6 p-5 shadow-xl shadow-indigo-500/10 border-slate-200 hidden xl:flex items-center gap-4 bg-white rounded-xl">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full bg-indigo-50 border-2 border-white flex items-center justify-center text-xs font-bold text-indigo-600 shadow-sm">
                      {i === 1 ? 'U' : i === 2 ? 'K' : 'M'}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">2.4M+ candidates</div>
                  <div className="text-xs text-slate-500 font-medium">hired through HireHub</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 md:py-16">
          {[
            { icon: Briefcase, value: "48,200+", label: "Active jobs" },
            { icon: Building2, value: "9,400+", label: "Companies" },
            { icon: Users, value: "2.4M+", label: "Candidates" },
            { icon: TrendingUp, value: "94%", label: "Placement rate" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm text-indigo-600 border border-slate-100">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl font-extrabold text-slate-900 truncate">{s.value}</div>
                <div className="text-sm font-medium text-slate-500 truncate">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-12 gap-4 text-center sm:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Browse by category</h2>
            <p className="mt-3 text-lg text-slate-500 font-light">Explore opportunities across industries</p>
          </div>
          <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:gap-3 transition-all">
            View all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((c) => (
            <Card key={c.name} className="p-6 hover:shadow-lg shadow-sm border-slate-200 hover:-translate-y-1 transition-all cursor-pointer group bg-white rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors mb-4">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="font-bold text-slate-900 tracking-tight">{c.name}</div>
              <div className="text-sm text-slate-500 mt-1">{c.count}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section id="jobs" className="bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-12 gap-4 text-center sm:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Featured openings</h2>
              <p className="mt-3 text-lg text-slate-500 font-light">Hand-picked roles from top companies</p>
            </div>
            <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:gap-3 transition-all">
              See all jobs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {jobs.map((j) => (
              <Card key={j.id} className="p-6 md:p-8 hover:shadow-lg hover:border-indigo-100 transition-all group bg-white border-slate-200 rounded-2xl">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-black text-xl border border-indigo-100">
                    {j.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-1">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          <Link to={`/jobs/${j.id}`}>{j.title}</Link>
                        </h3>
                        <div className="text-sm text-slate-500 font-medium">
                          <span className="text-slate-700">{j.company}</span> <span className="opacity-50">·</span> {j.location}
                        </div>
                      </div>
                      <Badge variant="secondary" className="shrink-0 w-fit self-start font-semibold text-xs py-1 px-2.5 rounded-lg border border-indigo-100 bg-white">
                        {j.type}
                      </Badge>
                    </div>
                    <div className="mt-4 text-sm font-bold text-slate-900">{j.salary}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {j.tags.map((t) => (
                        <span key={t} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {[
            { title: "Smart Search.", desc: "Filter jobs by location, salary, and role to find exactly what you're looking for instantly." },
            { title: "Easy Apply.", desc: "Create your profile once and apply to multiple top-tier jobs with a single streamlined click." },
            { title: "Top Companies.", desc: "Apply to thousands of highly-vetted jobs from the world's leading companies and disruptive startups." },
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-900">{f.title}</h3>
              <p className="mt-3 text-slate-500 leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <Card className="relative overflow-hidden bg-indigo-600 text-white p-12 md:p-20 text-center border-0 shadow-xl shadow-indigo-600/30 rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <Star className="h-10 w-10 mx-auto mb-6 text-indigo-100" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Ready for your next chapter?</h2>
            <p className="mt-6 text-indigo-100 text-lg md:text-xl font-light">
              Create a free profile and let the world's most innovative companies come to you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="white" className="w-full sm:w-auto text-base font-bold rounded-xl h-14 px-8 shadow-lg">
                  Create free profile
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10 hover:text-white text-base font-medium rounded-xl h-14 px-8 border border-indigo-400">
                  Browse jobs
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

    </div>
  );
};

export default Index;
