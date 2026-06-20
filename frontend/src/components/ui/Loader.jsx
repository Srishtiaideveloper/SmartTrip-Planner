/**
 * A flexible loading indicator component offering four distinct visual
 * variants. Adaptive to dark/light mode via Tailwind's `dark:` prefix.
 *
 * @component
 * @param {object} props
 * @param {'spinner' | 'dots' | 'skeleton' | 'pulse'} [props.variant='spinner']
 *   - `spinner`  – Classic spinning ring (CSS animation).
 *   - `dots`     – Three bouncing dots.
 *   - `skeleton` – Rectangular shimmer placeholder (configurable dimensions).
 *   - `pulse`    – Gentle pulsing circle.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Overall size scale.
 * @param {string} [props.color] - Custom Tailwind color class override (e.g. `'text-rose-500'`).
 *   When omitted the component falls back to adaptive emerald/slate colors.
 * @param {string} [props.width] - Width for the `skeleton` variant (any CSS value, e.g. `'100%'`, `'12rem'`).
 * @param {string} [props.height] - Height for the `skeleton` variant.
 * @param {string} [props.rounded] - Border-radius Tailwind class for skeleton (default `'rounded-lg'`).
 * @param {string} [props.className] - Additional CSS classes.
 * @param {string} [props.label] - Accessible screen-reader label (default `'Loading'`).
 * @returns {JSX.Element}
 *
 * @example
 * // Default spinner
 * <Loader />
 *
 * @example
 * // Large bouncing dots with custom color
 * <Loader variant="dots" size="lg" color="text-teal-500" />
 *
 * @example
 * // Skeleton placeholder
 * <Loader variant="skeleton" width="100%" height="1rem" rounded="rounded-full" />
 *
 * @example
 * // Pulse indicator
 * <Loader variant="pulse" size="sm" />
 */
function Loader({
  variant = 'spinner',
  size = 'md',
  color,
  width,
  height,
  rounded = 'rounded-lg',
  className = '',
  label = 'Loading',
}) {
  /* ------------------------------------------------------------------ */
  /*  Size maps                                                          */
  /* ------------------------------------------------------------------ */
  const spinnerSizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const spinnerBorder = { sm: 'border-2', md: 'border-[3px]', lg: 'border-4' };
  const dotSizes = { sm: 'w-1.5 h-1.5', md: 'w-2.5 h-2.5', lg: 'w-3.5 h-3.5' };
  const pulseSizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-14 h-14' };

  /* ------------------------------------------------------------------ */
  /*  Default adaptive color                                             */
  /* ------------------------------------------------------------------ */
  const defaultColor = 'text-emerald-500 dark:text-emerald-400';
  const resolvedColor = color || defaultColor;

  /* ================================================================== */
  /*  SPINNER                                                            */
  /* ================================================================== */
  if (variant === 'spinner') {
    return (
      <div
        role="status"
        aria-label={label}
        className={`inline-flex items-center justify-center ${className}`}
      >
        <div
          className={[
            spinnerSizes[size],
            spinnerBorder[size],
            'rounded-full animate-spin',
            'border-current border-t-transparent',
            resolvedColor,
          ].join(' ')}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  /* ================================================================== */
  /*  DOTS                                                               */
  /* ================================================================== */
  if (variant === 'dots') {
    return (
      <div
        role="status"
        aria-label={label}
        className={`inline-flex items-center gap-1.5 ${className}`}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={[
              dotSizes[size],
              'rounded-full',
              color || 'bg-emerald-500 dark:bg-emerald-400',
              'animate-[dotBounce_1.4s_ease-in-out_infinite]',
            ].join(' ')}
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
        <span className="sr-only">{label}</span>

        <style>{`
          @keyframes dotBounce {
            0%, 80%, 100% {
              transform: scale(0.6);
              opacity: 0.4;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  /* ================================================================== */
  /*  SKELETON                                                           */
  /* ================================================================== */
  if (variant === 'skeleton') {
    const skeletonHeight =
      height || { sm: '0.75rem', md: '1rem', lg: '1.5rem' }[size];
    const skeletonWidth = width || '100%';

    return (
      <div
        role="status"
        aria-label={label}
        className={[
          rounded,
          'bg-slate-200 dark:bg-white/10',
          'animate-pulse',
          'overflow-hidden relative',
          className,
        ].join(' ')}
        style={{ width: skeletonWidth, height: skeletonHeight }}
      >
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 animate-[shimmer_2s_infinite]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          }}
        />
        <span className="sr-only">{label}</span>

        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  /* ================================================================== */
  /*  PULSE                                                              */
  /* ================================================================== */
  if (variant === 'pulse') {
    return (
      <div
        role="status"
        aria-label={label}
        className={`inline-flex items-center justify-center ${className}`}
      >
        <div className="relative">
          <div
            className={[
              pulseSizes[size],
              'rounded-full',
              color || 'bg-emerald-500/20 dark:bg-emerald-400/20',
              'animate-ping',
            ].join(' ')}
          />
          <div
            className={[
              'absolute inset-0 m-auto',
              size === 'sm'
                ? 'w-3 h-3'
                : size === 'md'
                  ? 'w-5 h-5'
                  : 'w-7 h-7',
              'rounded-full',
              color || 'bg-emerald-500 dark:bg-emerald-400',
            ].join(' ')}
          />
        </div>
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return null;
}

export default Loader;
