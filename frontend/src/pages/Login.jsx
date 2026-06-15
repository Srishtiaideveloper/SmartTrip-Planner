import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Lock, Eye, EyeOff, Globe, ArrowRight, Github, Chrome } from 'lucide-react';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future: Connect to FastAPI backend
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center relative overflow-hidden pt-20 pb-10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/8 rounded-full blur-[100px] animate-float animate-delay-500" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            {/* Left: Branding */}
            <div className="hidden lg:block">
              <Link to="/" className="flex items-center gap-3 mb-8 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold">
                  Smart<span className="gradient-text">Trip</span>
                </span>
              </Link>

              <h1 className="text-4xl xl:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Your Sustainable{' '}
                <span className="gradient-text">Travel Journey</span>{' '}
                Starts Here
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Join thousands of conscious travelers who plan smarter and explore responsibly 
                with AI-powered itineraries.
              </p>

              <div className="space-y-4">
                {[
                  'Personalized AI-generated itineraries',
                  'Eco-friendly travel recommendations',
                  'Save and manage your travel plans',
                  'Track your sustainability impact',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="glass-card p-6 sm:p-8">
                {/* Form Toggle */}
                <div className="flex bg-white/5 rounded-xl p-1 mb-8">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      isLogin
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      !isLogin
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Heading */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {isLogin ? 'Welcome back' : 'Create your account'}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {isLogin
                      ? 'Sign in to access your travel dashboard'
                      : 'Start your sustainable travel journey today'}
                  </p>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300">
                    <Chrome className="w-4 h-4" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300">
                    <Github className="w-4 h-4" />
                    GitHub
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-slate-500 font-medium">OR</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field (Sign Up only) */}
                  {!isLogin && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field pl-11"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                        Password
                      </label>
                      {isLogin && (
                        <button type="button" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field pl-11 pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me (Login only) */}
                  {isLogin && (
                    <div className="flex items-center gap-2">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-0"
                      />
                      <label htmlFor="remember" className="text-sm text-slate-400">
                        Remember me for 30 days
                      </label>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-base"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </form>

                {/* Footer Text */}
                <p className="text-center text-xs text-slate-500 mt-6">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
