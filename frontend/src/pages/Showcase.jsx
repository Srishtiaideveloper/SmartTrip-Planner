import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input, Modal, Loader } from '../components/ui';
import { useToast } from '../components/ui/Toast';
import { useTheme } from '../context/ThemeContext';
import {
  Sparkles,
  Send,
  ArrowRight,
  Heart,
  Download,
  Trash2,
  Search,
  Mail,
  Lock,
  User,
  Eye,
  AlertCircle,
  Palette,
  Box,
  Type,
  Bell,
  Loader2,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';

function Showcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lgModalOpen, setLgModalOpen] = useState(false);
  const toast = useToast();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-emerald-50 border border-emerald-100'
            }`}>
              <Palette className="w-4 h-4 text-emerald-500" />
              <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Component Library
              </span>
            </div>
            <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              UI <span className="gradient-text">Showcase</span>
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              A production-ready component library built with React, Tailwind CSS, and Lucide icons. 
              All components support dark/light mode.
            </p>
          </div>

          {/* ──────────── BUTTONS ──────────── */}
          <Section title="Button" icon={<Box className="w-5 h-5" />} isDark={isDark}>
            {/* Variants */}
            <SubSection title="Variants" isDark={isDark}>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>Danger</Button>
              </div>
            </SubSection>

            {/* Sizes */}
            <SubSection title="Sizes" isDark={isDark}>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </SubSection>

            {/* States */}
            <SubSection title="States" isDark={isDark}>
              <div className="flex flex-wrap gap-3">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button leftIcon={<Download className="w-4 h-4" />}>With Icon</Button>
                <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Icon Right</Button>
                <Button fullWidth variant="outline" rightIcon={<Send className="w-4 h-4" />} className="max-w-xs">
                  Full Width
                </Button>
              </div>
            </SubSection>
          </Section>

          {/* ──────────── INPUT ──────────── */}
          <Section title="Input" icon={<Type className="w-5 h-5" />} isDark={isDark}>
            <SubSection title="Variants" isDark={isDark}>
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                <Input
                  label="Email Address"
                  placeholder="you@example.com"
                  prefixIcon={<Mail className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  prefixIcon={<Lock className="w-4 h-4" />}
                  suffixIcon={<Eye className="w-4 h-4" />}
                />
                <Input
                  label="Username"
                  placeholder="Enter username"
                  prefixIcon={<User className="w-4 h-4" />}
                  error="This username is already taken"
                />
                <Input
                  label="Search"
                  placeholder="Search destinations..."
                  prefixIcon={<Search className="w-4 h-4" />}
                  helperText="Try 'Bali' or 'Tokyo'"
                />
                <div className="sm:col-span-2">
                  <Input
                    as="textarea"
                    label="Travel Notes"
                    placeholder="Write about your travel preferences, interests, and any special requirements..."
                    helperText="Max 500 characters"
                  />
                </div>
              </div>
            </SubSection>
          </Section>

          {/* ──────────── MODAL ──────────── */}
          <Section title="Modal" icon={<Monitor className="w-5 h-5" />} isDark={isDark}>
            <SubSection title="Sizes & Usage" isDark={isDark}>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                  Open Modal
                </Button>
                <Button variant="outline" onClick={() => setLgModalOpen(true)}>
                  Large Modal
                </Button>
              </div>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Trip"
                size="md"
              >
                <div className="space-y-4">
                  <Input label="Destination" placeholder="Where do you want to go?" prefixIcon={<Search className="w-4 h-4" />} />
                  <Input label="Duration" placeholder="e.g. 7 days" />
                  <Input as="textarea" label="Preferences" placeholder="Describe your ideal trip..." />
                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => { setIsModalOpen(false); toast.success('Trip created successfully!'); }}>
                      Create Trip
                    </Button>
                  </div>
                </div>
              </Modal>

              <Modal
                isOpen={lgModalOpen}
                onClose={() => setLgModalOpen(false)}
                title="Trip Details — Bali Adventure"
                size="lg"
              >
                <div className="space-y-4">
                  <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                    This is a large modal showcasing a detailed trip view. It supports scrollable content, 
                    keyboard navigation (Escape to close), and click-outside-to-dismiss.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Duration', value: '7 Days' },
                      { label: 'Budget', value: '$1,200' },
                      { label: 'Eco Score', value: '94/100' },
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                        <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.label}</div>
                        <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button variant="primary" onClick={() => setLgModalOpen(false)}>Close</Button>
                  </div>
                </div>
              </Modal>
            </SubSection>
          </Section>

          {/* ──────────── TOAST ──────────── */}
          <Section title="Toast" icon={<Bell className="w-5 h-5" />} isDark={isDark}>
            <SubSection title="Types" isDark={isDark}>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" onClick={() => toast.success('Trip saved successfully!')}>
                  Success Toast
                </Button>
                <Button variant="danger" onClick={() => toast.error('Failed to save itinerary. Please try again.')}>
                  Error Toast
                </Button>
                <Button variant="outline" onClick={() => toast.warning('Your session will expire in 5 minutes.')}>
                  Warning Toast
                </Button>
                <Button variant="secondary" onClick={() => toast.info('New eco-friendly destinations are available!')}>
                  Info Toast
                </Button>
              </div>
            </SubSection>
          </Section>

          {/* ──────────── LOADER ──────────── */}
          <Section title="Loader" icon={<Loader2 className="w-5 h-5" />} isDark={isDark}>
            <SubSection title="Spinner" isDark={isDark}>
              <div className="flex flex-wrap items-center gap-6">
                <Loader variant="spinner" size="sm" />
                <Loader variant="spinner" size="md" />
                <Loader variant="spinner" size="lg" />
                <Loader variant="spinner" size="md" color="#f59e0b" />
              </div>
            </SubSection>

            <SubSection title="Dots" isDark={isDark}>
              <div className="flex flex-wrap items-center gap-6">
                <Loader variant="dots" size="sm" />
                <Loader variant="dots" size="md" />
                <Loader variant="dots" size="lg" />
              </div>
            </SubSection>

            <SubSection title="Skeleton" isDark={isDark}>
              <div className="max-w-sm space-y-3">
                <div className="flex items-center gap-3">
                  <Loader variant="skeleton" width="48px" height="48px" rounded="full" />
                  <div className="flex-1 space-y-2">
                    <Loader variant="skeleton" width="60%" height="14px" />
                    <Loader variant="skeleton" width="40%" height="12px" />
                  </div>
                </div>
                <Loader variant="skeleton" width="100%" height="120px" rounded="12px" />
                <div className="flex gap-2">
                  <Loader variant="skeleton" width="80px" height="28px" rounded="full" />
                  <Loader variant="skeleton" width="80px" height="28px" rounded="full" />
                </div>
              </div>
            </SubSection>

            <SubSection title="Pulse" isDark={isDark}>
              <div className="flex flex-wrap items-center gap-6">
                <Loader variant="pulse" size="sm" />
                <Loader variant="pulse" size="md" />
                <Loader variant="pulse" size="lg" />
              </div>
            </SubSection>
          </Section>

          {/* ──────────── THEME TOGGLE DEMO ──────────── */}
          <Section title="Dark / Light Mode" icon={isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />} isDark={isDark}>
            <SubSection title="Toggle Theme" isDark={isDark}>
              <div className="flex items-center gap-4">
                <Button
                  variant={isDark ? 'outline' : 'primary'}
                  onClick={toggleTheme}
                  leftIcon={isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                >
                  Switch to {isDark ? 'Light' : 'Dark'} Mode
                </Button>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Current: <span className="font-semibold gradient-text">{isDark ? 'Dark' : 'Light'}</span>
                </span>
              </div>
            </SubSection>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Helper Components ─── */
function Section({ title, icon, isDark, children }) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
        }`}>
          {icon}
        </div>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

function SubSection({ title, isDark, children }) {
  return (
    <div>
      <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
        isDark ? 'text-slate-400' : 'text-slate-500'
      }`}>
        {title}
      </h3>
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {children}
      </div>
    </div>
  );
}

export default Showcase;
