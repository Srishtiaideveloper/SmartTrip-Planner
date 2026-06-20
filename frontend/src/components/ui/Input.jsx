import { forwardRef, useId } from 'react';

/**
 * A polished form input component supporting text inputs and textareas,
 * with built-in label, validation errors, helper text, and icon slots.
 * Fully supports dark/light mode via Tailwind's `dark:` class prefix.
 *
 * @component
 * @param {object} props
 * @param {'input' | 'textarea'} [props.as='input'] - Render as `<input>` or `<textarea>`.
 * @param {string} [props.label] - Label text displayed above the field.
 * @param {string} [props.error] - Error message. When set, the field shows a red border.
 * @param {string} [props.helperText] - Helper / hint text displayed below the field.
 * @param {React.ReactNode} [props.prefixIcon] - Icon element rendered inside the left of the field.
 * @param {React.ReactNode} [props.suffixIcon] - Icon element rendered inside the right of the field.
 * @param {boolean} [props.disabled=false] - Disables the field and applies muted styles.
 * @param {boolean} [props.required=false] - Shows a red asterisk next to the label.
 * @param {string} [props.className] - Additional CSS classes for the wrapper div.
 * @param {string} [props.inputClassName] - Additional CSS classes for the input/textarea element.
 * @param {string} [props.type='text'] - HTML input type (ignored when `as='textarea'`).
 * @param {number} [props.rows=4] - Number of rows when rendered as textarea.
 * @param {string} [props.id] - Explicit id; auto-generated if omitted.
 * @param {React.Ref<HTMLInputElement | HTMLTextAreaElement>} ref - Forwarded ref.
 * @returns {JSX.Element}
 *
 * @example
 * // Basic input with label and error
 * <Input label="Email" type="email" error="Please enter a valid email" required />
 *
 * @example
 * // Textarea with helper text
 * <Input as="textarea" label="Notes" helperText="Max 500 characters" rows={6} />
 *
 * @example
 * // Input with icons
 * <Input label="Search" prefixIcon={<SearchIcon />} suffixIcon={<XIcon />} />
 */
const Input = forwardRef(function Input(
  {
    as = 'input',
    label,
    error,
    helperText,
    prefixIcon,
    suffixIcon,
    disabled = false,
    required = false,
    className = '',
    inputClassName = '',
    type = 'text',
    rows = 4,
    id: explicitId,
    ...rest
  },
  ref
) {
  const autoId = useId();
  const id = explicitId || autoId;

  const Tag = as === 'textarea' ? 'textarea' : 'input';

  /* ------------------------------------------------------------------ */
  /*  Field classes                                                      */
  /* ------------------------------------------------------------------ */
  const fieldBase = [
    'w-full appearance-none transition-all duration-300 ease-out',
    'rounded-xl text-sm leading-relaxed outline-none',
    // Light mode
    'bg-white border border-slate-300 text-slate-900 placeholder-slate-400',
    'hover:border-slate-400',
    'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
    // Dark mode
    'dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-500',
    'dark:hover:border-white/20',
    'dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20',
  ].join(' ');

  const errorClasses = error
    ? [
        'border-red-500 dark:border-red-500/70',
        'focus:border-red-500 focus:ring-red-500/20',
        'dark:focus:border-red-500 dark:focus:ring-red-500/20',
      ].join(' ')
    : '';

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  const paddingClasses = [
    prefixIcon ? 'pl-10' : 'pl-4',
    suffixIcon ? 'pr-10' : 'pr-4',
    as === 'textarea' ? 'py-3' : 'py-2.5',
  ].join(' ');

  const composedFieldClass = [
    fieldBase,
    paddingClasses,
    errorClasses,
    disabledClasses,
    inputClassName,
  ]
    .filter(Boolean)
    .join(' ');

  /* ------------------------------------------------------------------ */
  /*  Icon wrappers                                                      */
  /* ------------------------------------------------------------------ */
  const iconBase =
    'absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 dark:text-slate-500 pointer-events-none transition-colors duration-300';

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="block mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500 dark:text-red-400">*</span>
          )}
        </label>
      )}

      {/* Field wrapper */}
      <div className="relative">
        {/* Prefix icon */}
        {prefixIcon && (
          <span className={`${iconBase} left-3`}>{prefixIcon}</span>
        )}

        <Tag
          ref={ref}
          id={id}
          type={as === 'textarea' ? undefined : type}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={composedFieldClass}
          {...(as === 'textarea' ? { rows } : {})}
          {...rest}
        />

        {/* Suffix icon */}
        {suffixIcon && (
          <span className={`${iconBase} right-3`}>{suffixIcon}</span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400 flex items-center gap-1 transition-colors duration-300"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Helper text */}
      {!error && helperText && (
        <p
          id={`${id}-helper`}
          className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
