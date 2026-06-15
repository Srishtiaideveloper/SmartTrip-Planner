import { Link } from 'react-router-dom';
import { ArrowRight, Play, MapPin, Shield, Leaf } from 'lucide-react';

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/8 rounded-full blur-[120px] animate-float animate-delay-300" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] animate-pulse-slow" />

      {/* Decorative Elements */}
      <div className="absolute top-32 right-[15%] hidden lg:block">
        <div className="w-20 h-20 rounded-2xl glass rotate-12 animate-float flex items-center justify-center">
          <MapPin className="w-8 h-8 text-emerald-400" />
        </div>
      </div>
      <div className="absolute bottom-32 left-[12%] hidden lg:block">
        <div className="w-16 h-16 rounded-2xl glass -rotate-12 animate-float animate-delay-500 flex items-center justify-center">
          <Leaf className="w-7 h-7 text-teal-400" />
        </div>
      </div>
      <div className="absolute top-[45%] right-[8%] hidden lg:block">
        <div className="w-14 h-14 rounded-xl glass rotate-6 animate-float animate-delay-700 flex items-center justify-center">
          <Shield className="w-6 h-6 text-cyan-400" />
        </div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-24 sm:pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-emerald-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-slate-300">
              AI-Powered Sustainable Travel Planning
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Plan Smarter.{' '}
            <span className="gradient-text">Travel Greener.</span>{' '}
            <span className="text-slate-300">Explore Further.</span>
          </h1>

          {/* Sub-headline */}
          <p className="animate-fade-in-up animate-delay-200 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
            Our multi-agent AI system crafts personalized itineraries that balance your preferences 
            with eco-friendly choices — making every trip meaningful and sustainable.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up animate-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/dashboard"
              className="group btn-primary flex items-center gap-2 text-base px-8 py-4"
            >
              Start Planning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/about"
              className="group btn-secondary flex items-center gap-2 text-base px-8 py-4"
            >
              <Play className="w-4 h-4" />
              See How It Works
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="animate-fade-in-up animate-delay-500 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { value: '50K+', label: 'Trips Planned' },
              { value: '120+', label: 'Destinations' },
              { value: '98%', label: 'Satisfaction' },
              { value: '2.4K', label: 'Tons CO₂ Saved' },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-card p-4 sm:p-5 hover:bg-white/10 transition-all duration-300 group cursor-default"
              >
                <div className="text-2xl sm:text-3xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}

export default Hero;
