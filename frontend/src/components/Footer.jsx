import { Link } from 'react-router-dom';
import { Globe, Mail, MapPin, Phone, Github, Linkedin, Twitter, Heart, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Product: [
    { name: 'Features', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Pricing', path: '/' },
    { name: 'API Access', path: '/' },
  ],
  Company: [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/' },
    { name: 'Blog', path: '/' },
    { name: 'Press Kit', path: '/' },
  ],
  Resources: [
    { name: 'Documentation', path: '/' },
    { name: 'Help Center', path: '/' },
    { name: 'Community', path: '/' },
    { name: 'Travel Guides', path: '/' },
  ],
  Legal: [
    { name: 'Privacy Policy', path: '/' },
    { name: 'Terms of Service', path: '/' },
    { name: 'Cookie Policy', path: '/' },
    { name: 'GDPR', path: '/' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/Srishtiaideveloper/SmartTrip-Planner', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-slate-950">
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="container-custom pt-16 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">
                  Smart<span className="gradient-text">Trip</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              AI-powered travel planning that creates personalized, sustainable itineraries. 
              Plan smarter, travel greener.
            </p>
            {/* Contact Info */}
            <div className="space-y-2">
              <a href="mailto:hello@smarttrip.ai" className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                <Mail className="w-4 h-4" />
                hello@smarttrip.ai
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4" />
                Dehradun, India
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-1 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass-card p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Stay in the loop</h4>
              <p className="text-sm text-slate-400">Get the latest travel tips and platform updates.</p>
            </div>
            <div className="flex w-full sm:w-auto gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="input-field flex-1 sm:w-64 text-sm"
              />
              <button className="btn-primary whitespace-nowrap text-sm px-5">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-sm text-slate-500 flex items-center gap-1">
            © {new Date().getFullYear()} SmartTrip Planner. Made with{' '}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />{' '}
            for sustainable travel.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
