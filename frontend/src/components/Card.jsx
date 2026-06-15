import { ArrowUpRight } from 'lucide-react';

/**
 * Reusable Card component for displaying feature/destination information.
 * 
 * @param {object} props
 * @param {React.ReactNode} props.icon - Lucide icon component element
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description text
 * @param {string[]} [props.tags] - Optional array of tag labels
 * @param {string} [props.gradient] - Optional gradient class for the icon background
 * @param {string} [props.accentColor] - Optional accent color class for hover effects
 * @param {boolean} [props.featured] - Whether this is a featured/highlighted card
 */
function Card({
  icon,
  title,
  description,
  tags = [],
  gradient = 'from-emerald-500 to-teal-500',
  accentColor = 'emerald',
  featured = false,
}) {
  return (
    <div
      className={`group relative glass-card p-6 sm:p-8 gradient-border hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-${accentColor}-500/10 ${
        featured ? 'ring-1 ring-emerald-500/20' : ''
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-xs font-semibold text-white shadow-lg shadow-emerald-500/20">
          Popular
        </div>
      )}

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
      >
        {icon}
      </div>

      {/* Title + Arrow */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
          {title}
        </h3>
        <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 mt-1" />
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4 group-hover:text-slate-300 transition-colors duration-300">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-slate-400 border border-white/5 group-hover:border-emerald-500/20 group-hover:text-emerald-300/80 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
