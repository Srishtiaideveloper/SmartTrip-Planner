import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Footer from '../components/Footer';
import {
  Brain,
  Route,
  Leaf,
  Shield,
  Zap,
  BarChart3,
  Globe,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Map,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Feature Cards Data ─── */
const features = [
  {
    icon: <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
    title: 'Multi-Agent AI Engine',
    description:
      'Our intelligent agents — Preference, Destination, and Sustainability — collaborate in real-time to deliver context-aware travel plans tailored just for you.',
    tags: ['AI Agents', 'Personalization', 'Smart Planning'],
    gradient: 'from-violet-500 to-purple-500',
    accentColor: 'violet',
    featured: true,
  },
  {
    icon: <Route className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
    title: 'Optimized Itineraries',
    description:
      'Get day-wise travel plans with activities, accommodations, and transport — all optimized for time, budget, and experience quality.',
    tags: ['Day Planner', 'Route Optimization', 'Budget-Friendly'],
    gradient: 'from-blue-500 to-cyan-500',
    accentColor: 'blue',
  },
  {
    icon: <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
    title: 'Sustainable Travel',
    description:
      'Every recommendation is scored for eco-friendliness. Support local communities and reduce your carbon footprint while exploring the world.',
    tags: ['Eco-Score', 'Carbon Offset', 'Local Impact'],
    gradient: 'from-emerald-500 to-teal-500',
    accentColor: 'emerald',
  },
  {
    icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
    title: 'Secure & Private',
    description:
      'JWT-based authentication keeps your travel data safe. Your preferences and itineraries are encrypted and accessible only to you.',
    tags: ['JWT Auth', 'Encryption', 'Data Privacy'],
    gradient: 'from-amber-500 to-orange-500',
    accentColor: 'amber',
  },
  {
    icon: <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
    title: 'Personal Dashboard',
    description:
      'Track your travel history, manage saved itineraries, monitor sustainability scores, and get AI-powered insights — all in one place.',
    tags: ['Analytics', 'History', 'Insights'],
    gradient: 'from-rose-500 to-pink-500',
    accentColor: 'rose',
  },
  {
    icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
    title: 'Instant Generation',
    description:
      'Go from preferences to a complete travel plan in seconds. Our AI pipeline processes your inputs with blazing speed and accuracy.',
    tags: ['Fast', 'Real-Time', 'Accurate'],
    gradient: 'from-yellow-500 to-amber-500',
    accentColor: 'yellow',
  },
];

/* ─── How It Works Steps ─── */
const steps = [
  {
    step: '01',
    title: 'Set Your Preferences',
    description: 'Tell us your budget, dates, interests, destination type, and sustainability priorities.',
    icon: <Users className="w-6 h-6 text-emerald-400" />,
  },
  {
    step: '02',
    title: 'AI Agents Collaborate',
    description: 'Our multi-agent system analyzes your inputs and evaluates thousands of options in seconds.',
    icon: <Brain className="w-6 h-6 text-teal-400" />,
  },
  {
    step: '03',
    title: 'Get Your Itinerary',
    description: 'Receive a detailed, day-wise plan with destinations, activities, stays, and eco-scores.',
    icon: <Map className="w-6 h-6 text-cyan-400" />,
  },
  {
    step: '04',
    title: 'Travel & Track',
    description: 'Explore with confidence. Track your trips, sustainability impact, and share your experiences.',
    icon: <Globe className="w-6 h-6 text-emerald-400" />,
  },
];

/* ─── Testimonials ─── */
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Travel Blogger',
    text: 'SmartTrip Planner completely changed how I plan my trips. The AI suggestions are incredibly accurate and the eco-scores help me make responsible choices.',
    avatar: 'PS',
  },
  {
    name: 'Arjun Mehta',
    role: 'Adventure Enthusiast',
    text: 'The day-wise itineraries save me hours of research. I just input my preferences and get a perfect plan in seconds. Absolutely brilliant!',
    avatar: 'AM',
  },
  {
    name: 'Sarah Chen',
    role: 'Sustainable Tourism Advocate',
    text: 'Finally, a travel platform that prioritizes sustainability without compromising on experience. The multi-agent AI approach is truly innovative.',
    avatar: 'SC',
  },
];

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="section-padding relative" id="features">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-emerald-500/20 mb-5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">Powerful Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Travel Smart</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              From AI-powered recommendations to real-time sustainability tracking — 
              we've built every feature to transform your travel planning experience.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature, index) => (
              <Card key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient" />
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-teal-500/20 mb-5">
              <Route className="w-4 h-4 text-teal-400" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              How <span className="gradient-text">SmartTrip</span> Works
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              Four simple steps to your perfect, sustainable travel plan.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <div
                key={index}
                className="relative glass-card p-6 sm:p-8 hover:bg-white/[0.08] transition-all duration-500 group"
              >
                {/* Step Number */}
                <div className="text-5xl sm:text-6xl font-black text-white/5 absolute top-4 right-4 group-hover:text-emerald-500/10 transition-colors duration-500">
                  {item.step}
                </div>
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-emerald-500/10 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                {/* Connector Line (hidden on last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-emerald-500/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding relative">
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-amber-500/20 mb-5">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Loved by <span className="gradient-text-warm">Travelers</span>
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card p-6 sm:p-8 hover:bg-white/[0.08] transition-all duration-500 group"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-sm font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                    <div className="text-xs text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent" />
        <div className="container-custom relative z-10">
          <div className="glass-card p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Ready to Plan Your Next{' '}
                <span className="gradient-text">Adventure?</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-8">
                Join thousands of travelers who plan smarter and travel greener with SmartTrip Planner.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/dashboard"
                  className="group btn-primary flex items-center gap-2 text-base px-8 py-4"
                >
                  Start Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  No credit card required
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
