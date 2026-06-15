import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Globe,
  Leaf,
  Brain,
  Users,
  Target,
  Heart,
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Layout,
  Shield,
  Palette,
  Server,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Values Data ─── */
const values = [
  {
    icon: <Leaf className="w-6 h-6 text-emerald-400" />,
    title: 'Sustainability First',
    description: 'Every recommendation is evaluated for environmental impact and local community benefit.',
  },
  {
    icon: <Brain className="w-6 h-6 text-violet-400" />,
    title: 'AI-Driven Innovation',
    description: 'Multi-agent architecture that delivers truly intelligent, context-aware travel planning.',
  },
  {
    icon: <Heart className="w-6 h-6 text-rose-400" />,
    title: 'User-Centric Design',
    description: 'Built with travelers in mind — intuitive interfaces, fast results, and meaningful experiences.',
  },
  {
    icon: <Shield className="w-6 h-6 text-amber-400" />,
    title: 'Trust & Privacy',
    description: 'Your data is encrypted and secure. We never share your personal information with third parties.',
  },
];

/* ─── Tech Stack Data ─── */
const techStack = [
  { name: 'React.js', category: 'Frontend', icon: <Layout className="w-5 h-5" /> },
  { name: 'Tailwind CSS', category: 'Styling', icon: <Palette className="w-5 h-5" /> },
  { name: 'FastAPI', category: 'Backend', icon: <Server className="w-5 h-5" /> },
  { name: 'PostgreSQL', category: 'Database', icon: <Database className="w-5 h-5" /> },
  { name: 'OpenAI API', category: 'AI Engine', icon: <Cpu className="w-5 h-5" /> },
  { name: 'JWT Auth', category: 'Security', icon: <Shield className="w-5 h-5" /> },
];

/* ─── Team Data ─── */
const team = [
  {
    name: 'Srishti',
    role: 'Full Stack Developer & AI Engineer',
    bio: 'B.Tech 4th Year student passionate about AI-driven solutions and sustainable technology.',
    initials: 'SR',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

/* ─── Stats ─── */
const stats = [
  { value: '3+', label: 'AI Agents' },
  { value: '10+', label: 'Technologies' },
  { value: '100%', label: 'Eco-Focused' },
  { value: '∞', label: 'Possibilities' },
];

function About() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-10 left-20 w-60 h-60 bg-teal-500/8 rounded-full blur-[100px] animate-float animate-delay-500" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-emerald-500/20 mb-6">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-slate-300">About SmartTrip Planner</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Reimagining Travel with{' '}
              <span className="gradient-text">AI & Purpose</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              We're building the future of travel planning — where artificial intelligence meets 
              sustainability to create meaningful journeys that benefit both travelers and the planet.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-teal-500/20 mb-5">
                <Target className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-medium text-slate-300">Our Mission</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Making Sustainable Travel{' '}
                <span className="gradient-text">Effortless</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                SmartTrip Planner was born from a simple belief: travel should be both extraordinary 
                and responsible. We leverage cutting-edge multi-agent AI architecture to understand 
                your unique preferences and match them with eco-friendly options that don't compromise 
                on experience.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Our Preference Agent, Destination Agent, and Sustainability Agent work in harmony to 
                analyze thousands of possibilities and deliver personalized itineraries that are 
                optimized for enjoyment, budget, and environmental impact.
              </p>
              <div className="space-y-3">
                {[
                  'Multi-agent AI for intelligent recommendations',
                  'Day-wise itineraries with eco-scoring',
                  'Support for local communities & businesses',
                  'Carbon footprint tracking & offset suggestions',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats + Visual */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card p-6 sm:p-8 text-center hover:bg-white/[0.08] transition-all duration-500 group"
                >
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-radial-gradient" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-emerald-500/20 mb-5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-slate-300">Our Values</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What <span className="gradient-text">Drives Us</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="glass-card p-6 sm:p-8 hover:bg-white/[0.08] transition-all duration-500 group text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-5 group-hover:bg-white/10 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-cyan-500/20 mb-5">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-slate-300">Technology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built with <span className="gradient-text">Modern Tech</span>
            </h2>
            <p className="text-base text-slate-400 max-w-xl mx-auto">
              Industry-standard technologies powering a reliable, scalable, and fast platform.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="glass-card p-5 text-center hover:bg-white/[0.08] transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors duration-300">
                  {tech.icon}
                </div>
                <div className="text-sm font-semibold text-white mb-1">{tech.name}</div>
                <div className="text-xs text-slate-500">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-violet-500/20 mb-5">
              <Users className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-slate-300">The Creator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Meet the <span className="gradient-text">Developer</span>
            </h2>
          </div>

          <div className="max-w-md mx-auto">
            {team.map((member, i) => (
              <div
                key={i}
                className="glass-card p-8 text-center hover:bg-white/[0.08] transition-all duration-500 group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  {member.initials}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-emerald-400 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Want to <span className="gradient-text">Explore More?</span>
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                Head to the dashboard and experience the power of AI-driven travel planning firsthand.
              </p>
              <Link
                to="/dashboard"
                className="group btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
