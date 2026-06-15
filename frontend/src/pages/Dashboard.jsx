import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  MapPin,
  Globe,
  Leaf,
  Award,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Search,
  Settings,
  BarChart3,
  Map,
  Compass,
  Star,
  Plane,
  Hotel,
  Utensils,
  Activity,
  ChevronRight,
  Filter,
  Download,
  Bell,
  Sparkles,
  Zap,
  TreePine,
  Waves,
  Mountain,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/* ─── Mock Data ─── */
const statsData = [
  {
    label: 'Total Trips',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: MapPin,
    color: 'emerald',
    bgGradient: 'from-emerald-500/10 to-teal-500/10',
    iconBg: 'from-emerald-500 to-teal-500',
  },
  {
    label: 'Destinations',
    value: '18',
    change: '+8%',
    trend: 'up',
    icon: Globe,
    color: 'blue',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
    iconBg: 'from-blue-500 to-cyan-500',
  },
  {
    label: 'CO₂ Saved',
    value: '2.4t',
    change: '+23%',
    trend: 'up',
    icon: Leaf,
    color: 'green',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
    iconBg: 'from-green-500 to-emerald-500',
  },
  {
    label: 'Eco Score',
    value: '92',
    change: '+5pt',
    trend: 'up',
    icon: Award,
    color: 'amber',
    bgGradient: 'from-amber-500/10 to-yellow-500/10',
    iconBg: 'from-amber-500 to-yellow-500',
  },
];

const activityData = [
  { month: 'Jan', trips: 2, eco: 78 },
  { month: 'Feb', trips: 1, eco: 82 },
  { month: 'Mar', trips: 3, eco: 85 },
  { month: 'Apr', trips: 2, eco: 88 },
  { month: 'May', trips: 4, eco: 90 },
  { month: 'Jun', trips: 3, eco: 92 },
  { month: 'Jul', trips: 5, eco: 89 },
  { month: 'Aug', trips: 2, eco: 91 },
  { month: 'Sep', trips: 4, eco: 93 },
  { month: 'Oct', trips: 3, eco: 95 },
  { month: 'Nov', trips: 1, eco: 94 },
  { month: 'Dec', trips: 2, eco: 92 },
];

const sustainabilityBreakdown = [
  { name: 'Transport', value: 35, color: '#10b981' },
  { name: 'Accommodation', value: 25, color: '#14b8a6' },
  { name: 'Activities', value: 20, color: '#06b6d4' },
  { name: 'Food', value: 20, color: '#0ea5e9' },
];

const recentItineraries = [
  {
    id: 1,
    destination: 'Bali, Indonesia',
    duration: '7 days',
    budget: '$1,200',
    ecoScore: 94,
    status: 'completed',
    date: 'Dec 2025',
    icon: Waves,
    tags: ['Beach', 'Culture'],
  },
  {
    id: 2,
    destination: 'Swiss Alps, Switzerland',
    duration: '5 days',
    budget: '$2,100',
    ecoScore: 88,
    status: 'completed',
    date: 'Nov 2025',
    icon: Mountain,
    tags: ['Adventure', 'Nature'],
  },
  {
    id: 3,
    destination: 'Kyoto, Japan',
    duration: '6 days',
    budget: '$1,800',
    ecoScore: 96,
    status: 'completed',
    date: 'Oct 2025',
    icon: TreePine,
    tags: ['Heritage', 'Culture'],
  },
  {
    id: 4,
    destination: 'Costa Rica',
    duration: '8 days',
    budget: '$1,500',
    ecoScore: 97,
    status: 'completed',
    date: 'Sep 2025',
    icon: Leaf,
    tags: ['Eco-Tourism', 'Wildlife'],
  },
];

const upcomingTrips = [
  {
    destination: 'Tokyo, Japan',
    dates: 'Jun 25 – Jul 1, 2026',
    days: 7,
    budget: '$2,400',
    ecoScore: 91,
    status: 'confirmed',
    activities: ['Temple Visits', 'Street Food Tour', 'Mt. Fuji Day Trip'],
    image: '🗼',
  },
  {
    destination: 'Patagonia, Chile',
    dates: 'Jul 15 – Jul 24, 2026',
    days: 10,
    budget: '$3,200',
    ecoScore: 95,
    status: 'planning',
    activities: ['Glacier Trekking', 'Wildlife Safari', 'Camping'],
    image: '🏔️',
  },
];

const quickActions = [
  { label: 'New Trip', icon: Plus, gradient: 'from-emerald-500 to-teal-500' },
  { label: 'Explore', icon: Compass, gradient: 'from-blue-500 to-cyan-500' },
  { label: 'Reports', icon: BarChart3, gradient: 'from-violet-500 to-purple-500' },
  { label: 'Settings', icon: Settings, gradient: 'from-slate-500 to-slate-600' },
];

/* ─── Custom Tooltip ─── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 !bg-slate-900/95 shadow-xl border-white/10">
        <p className="text-xs font-semibold text-white mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs text-slate-300">
            <span style={{ color: entry.color }}>●</span>{' '}
            {entry.name}: <span className="font-medium text-white">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/* ─── Eco Score Ring ─── */
function EcoScoreRing({ score, size = 120 }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ecoGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="ecoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-white">{score}</span>
        <span className="text-[10px] text-slate-400 font-medium">/ 100</span>
      </div>
    </div>
  );
}

/* ─── Dashboard Page ─── */
function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'trips', label: 'My Trips', icon: Map },
    { id: 'sustainability', label: 'Eco Impact', icon: Leaf },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-12">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Welcome back, <span className="gradient-text">Srishti</span> 👋
              </h1>
              <p className="text-sm sm:text-base text-slate-400">
                Here's your travel overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search trips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10 w-56 text-sm py-2.5"
                />
              </div>
              {/* Notifications */}
              <button className="relative p-2.5 rounded-xl glass hover:bg-white/10 transition-all duration-300">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
              </button>
              {/* New Trip */}
              <button className="btn-primary flex items-center gap-2 py-2.5 text-sm">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Trip</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            {statsData.map((stat, i) => (
              <div
                key={i}
                className={`glass-card p-5 sm:p-6 hover:bg-white/[0.08] transition-all duration-500 group cursor-default bg-gradient-to-br ${stat.bgGradient}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${stat.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                    stat.trend === 'up'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-5 mb-8">
            {/* Activity Chart */}
            <div className="lg:col-span-2 glass-card p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Trip Activity</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Monthly trips & eco score trends</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-400">Trips</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="text-slate-400">Eco Score</span>
                  </div>
                </div>
              </div>
              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="tripGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="ecoGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="trips"
                      name="Trips"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      fill="url(#tripGradient)"
                      dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: '#10b981', stroke: '#10b981', strokeWidth: 2, strokeOpacity: 0.3 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="eco"
                      name="Eco Score"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      fill="url(#ecoGrad)"
                      dot={false}
                      strokeDasharray="4 4"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sustainability Score */}
            <div className="glass-card p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Eco Impact</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Sustainability breakdown</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  <Leaf className="w-3 h-3" />
                  Excellent
                </div>
              </div>

              {/* Score Ring */}
              <div className="flex justify-center mb-6">
                <EcoScoreRing score={92} size={140} />
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                {sustainabilityBreakdown.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-300">{item.name}</span>
                      <span className="text-slate-400 font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Itineraries + Upcoming Trips */}
          <div className="grid lg:grid-cols-3 gap-5 mb-8">
            {/* Recent Itineraries */}
            <div className="lg:col-span-2 glass-card p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Recent Itineraries</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Your latest travel plans</p>
                </div>
                <button className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-300">
                  View All
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {recentItineraries.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center flex-shrink-0 group-hover:from-emerald-500/20 group-hover:to-teal-500/20 transition-all duration-300">
                      <trip.icon className="w-5 h-5 text-emerald-400" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white truncate">{trip.destination}</h4>
                        <div className="flex gap-1.5 hidden sm:flex">
                          {trip.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-slate-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          {trip.duration}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">{trip.budget}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">{trip.date}</span>
                      </div>
                    </div>

                    {/* Eco Score */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        trip.ecoScore >= 95
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : trip.ecoScore >= 90
                          ? 'bg-teal-500/10 text-teal-400'
                          : 'bg-cyan-500/10 text-cyan-400'
                      }`}>
                        <Leaf className="w-3 h-3" />
                        {trip.ecoScore}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Trips */}
            <div className="glass-card p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Upcoming</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Next adventures</p>
                </div>
                <Calendar className="w-5 h-5 text-slate-400" />
              </div>

              <div className="space-y-4">
                {upcomingTrips.map((trip, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.05] transition-all duration-300 group cursor-pointer"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{trip.image}</span>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{trip.destination}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{trip.dates}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
                        trip.status === 'confirmed'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {trip.status}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {trip.days} days
                      </span>
                      <span>{trip.budget}</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Leaf className="w-3 h-3" />
                        {trip.ecoScore}
                      </span>
                    </div>

                    {/* Activities */}
                    <div className="flex flex-wrap gap-1.5">
                      {trip.activities.map((activity, j) => (
                        <span
                          key={j}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-slate-400 border border-white/5"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions + AI Insights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, i) => (
              <button
                key={i}
                className="glass-card p-5 hover:bg-white/[0.08] transition-all duration-500 group text-left"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{action.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>
            ))}
          </div>

          {/* AI Insights Banner */}
          <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-10 w-40 h-40 bg-cyan-500/8 rounded-full blur-[60px]" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">AI Travel Insight</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                    Based on your travel history, we recommend <span className="text-emerald-400 font-medium">Kerala, India</span> for 
                    your next trip — it aligns with your preference for eco-tourism and cultural experiences, 
                    with an estimated eco-score of <span className="text-emerald-400 font-medium">96</span>.
                  </p>
                </div>
              </div>
              <button className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap flex-shrink-0">
                <Zap className="w-4 h-4" />
                Explore This
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
