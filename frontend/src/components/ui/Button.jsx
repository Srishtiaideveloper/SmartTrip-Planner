import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * A versatile, industry-grade button component with multiple variants, sizes,
 * loading/disabled states, and icon support. Fully supports dark/light mode
 * via Tailwind's `dark:` class prefix.
 *
 * @component
 * @param {object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='primary']
 *   - `primary`   – Emerald gradient with glow effect
 *   - `secondary` – Glassmorphism / subtle teal tint
 *   - `outline`   – Transparent with emerald border
 *   - `ghost`     – No background, text-only hover highlight
 *   - `danger`    – Red gradient for destructive actions
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Controls padding, font-size, and icon sizing.
 * @param {boolean} [props.loading=false] - When true, shows a spinner and disables interaction.
 * @param {boolean} [props.disabled=false] - Disables the button and applies muted styles.
 * @param {boolean} [props.fullWidth=false] - Makes the button stretch to 100% width.
 * @param {React.ReactNode} [props.leftIcon] - Icon element rendered before the label.
 * @param {React.ReactNode} [props.rightIcon] - Icon element rendered after the label.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Native HTML button type.
 * @param {string} [props.className] - Additional CSS classes merged onto the root element.
 * @param {React.ReactNode} props.children - Button label / content.
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to the underlying `<button>`.
 * @returns {JSX.Element}
 *
 * @example
 * // Primary button with loading state
 * <Button variant="primary" loading>
 *   Saving…
 * </Button>
 *
 * @example
 * // Outline button with icons
 * <Button variant="outline" leftIcon={<PlusIcon />} size="lg">
 *   Add Destination
 * </Button>
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    type = 'button',
    className = '',
    children,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;

  /* ------------------------------------------------------------------ */
  /*  Variant class maps                                                 */
  /* ------------------------------------------------------------------ */
  const variantClasses = {
    primary: [
      // Dark mode
      'dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-500',
      'dark:text-white dark:shadow-lg dark:shadow-emerald-500/25',
      'dark:hover:shadow-emerald-500/40 dark:hover:brightness-110',
      'dark:active:brightness-95',
      // Light mode
      'bg-gradient-to-r from-emerald-600 to-teal-600',
      'text-white shadow-md shadow-emerald-600/20',
      'hover:shadow-emerald-600/30 hover:brightness-105',
      'active:brightness-95',
      // Focus ring
      'focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
      'dark:focus-visible:ring-offset-slate-950',
    ].join(' '),

    secondary: [
      // Dark mode
      'dark:bg-white/5 dark:backdrop-blur-lg dark:text-slate-200',
      'dark:border dark:border-white/10',
      'dark:hover:bg-white/10 dark:hover:text-white',
      // Light mode
      'bg-slate-100 text-slate-700 border border-slate-200',
      'hover:bg-slate-200 hover:text-slate-900',
      'active:bg-slate-200',
      // Focus ring
      'focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
      'dark:focus-visible:ring-offset-slate-950',
    ].join(' '),

    outline: [
      // Dark mode
      'dark:bg-transparent dark:text-emerald-400 dark:border dark:border-emerald-500/50',
      'dark:hover:bg-emerald-500/10 dark:hover:border-emerald-400',
      // Light mode
      'bg-transparent text-emerald-700 border border-emerald-500',
      'hover:bg-emerald-50 hover:text-emerald-800',
      'active:bg-emerald-100',
      // Focus ring
      'focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
      'dark:focus-visible:ring-offset-slate-950',
    ].join(' '),

    ghost: [
      // Dark mode
      'dark:bg-transparent dark:text-slate-300',
      'dark:hover:bg-white/5 dark:hover:text-white',
      // Light mode
      'bg-transparent text-slate-600',
      'hover:bg-slate-100 hover:text-slate-900',
      'active:bg-slate-150',
      // Focus ring
      'focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
      'dark:focus-visible:ring-offset-slate-950',
    ].join(' '),

    danger: [
      // Dark mode
      'dark:bg-gradient-to-r dark:from-red-600 dark:to-rose-600',
      'dark:text-white dark:shadow-lg dark:shadow-red-600/25',
      'dark:hover:shadow-red-600/40 dark:hover:brightness-110',
      // Light mode
      'bg-gradient-to-r from-red-600 to-rose-600',
      'text-white shadow-md shadow-red-600/20',
      'hover:shadow-red-600/30 hover:brightness-105',
      'active:brightness-95',
      // Focus ring
      'focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2',
      'dark:focus-visible:ring-offset-slate-950',
    ].join(' '),
  };

  /* ------------------------------------------------------------------ */
  /*  Size class maps                                                    */
  /* ------------------------------------------------------------------ */
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg',
    md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
    lg: 'px-7 py-3.5 text-base gap-2.5 rounded-xl',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  /* ------------------------------------------------------------------ */
  /*  Compose final className                                            */
  /* ------------------------------------------------------------------ */
  const composedClassName = [
    // Base
    'relative inline-flex items-center justify-center font-semibold',
    'transition-all duration-300 ease-out',
    'select-none outline-none',
    // Size
    sizeClasses[size],
    // Variant
    variantClasses[variant],
    // Full width
    fullWidth ? 'w-full' : '',
    // Disabled / loading
    isDisabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer',
    // User overrides
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={composedClassName}
      {...rest}
    >
      {/* Loading spinner replaces left icon */}
      {loading ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : (
        leftIcon && (
          <span className={`inline-flex shrink-0 ${iconSizes[size]}`}>
            {leftIcon}
          </span>
        )
      )}

      {/* Label */}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>

      {/* Right icon */}
      {!loading && rightIcon && (
        <span className={`inline-flex shrink-0 ${iconSizes[size]}`}>
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
