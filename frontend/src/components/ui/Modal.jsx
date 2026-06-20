import { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/**
 * An accessible modal dialog rendered via `createPortal` at `document.body`.
 * Supports backdrop-click dismiss, Escape key dismiss, animated open/close
 * transitions, and four pre-defined sizes. Fully supports dark/light mode
 * via Tailwind's `dark:` class prefix.
 *
 * @component
 * @param {object} props
 * @param {boolean} props.isOpen - Controls visibility of the modal.
 * @param {() => void} props.onClose - Callback fired when the modal requests closing.
 * @param {string} [props.title] - Optional title rendered in the modal header.
 * @param {'sm' | 'md' | 'lg' | 'full'} [props.size='md'] - Width preset for the dialog panel.
 *   - `sm`   – max-w-sm  (384 px)
 *   - `md`   – max-w-lg  (512 px)
 *   - `lg`   – max-w-2xl (672 px)
 *   - `full` – max-w-5xl (1024 px)
 * @param {boolean} [props.closeOnBackdrop=true] - Whether clicking the backdrop closes the modal.
 * @param {boolean} [props.closeOnEscape=true] - Whether pressing Escape closes the modal.
 * @param {boolean} [props.showCloseButton=true] - Whether to render the X close button in the header.
 * @param {string} [props.className] - Additional classes for the dialog panel.
 * @param {React.ReactNode} props.children - Modal body content.
 * @returns {JSX.Element | null}
 *
 * @example
 * const [open, setOpen] = useState(false);
 *
 * <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm Booking" size="md">
 *   <p>Are you sure you want to book this trip?</p>
 *   <Button onClick={() => setOpen(false)}>Yes, book it!</Button>
 * </Modal>
 */
function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  children,
}) {
  const panelRef = useRef(null);

  /* ------------------------------------------------------------------ */
  /*  Escape key handler                                                 */
  /* ------------------------------------------------------------------ */
  const handleKeyDown = useCallback(
    (e) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleKeyDown]);

  /* ------------------------------------------------------------------ */
  /*  Focus trap — bring focus into modal on open                        */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  /* ------------------------------------------------------------------ */
  /*  Size map                                                           */
  /* ------------------------------------------------------------------ */
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    full: 'max-w-5xl',
  };

  if (!isOpen) return null;

  /* ------------------------------------------------------------------ */
  /*  Render via portal                                                  */
  /* ------------------------------------------------------------------ */
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className={[
          'absolute inset-0',
          'bg-black/40 dark:bg-black/60 backdrop-blur-sm',
          'animate-[fadeIn_200ms_ease-out]',
        ].join(' ')}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={[
          'relative w-full',
          sizeClasses[size],
          // Light mode
          'bg-white shadow-2xl shadow-slate-900/10',
          // Dark mode
          'dark:bg-slate-900 dark:border dark:border-white/10 dark:shadow-2xl dark:shadow-black/40',
          // Shape & animation
          'rounded-2xl',
          'animate-[modalIn_250ms_ease-out]',
          'outline-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          // Inline keyframes for the modal entrance (kept self-contained)
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 pt-5 pb-0">
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className={[
                  'ml-auto p-1.5 rounded-lg transition-all duration-200',
                  'text-slate-400 hover:text-slate-600 hover:bg-slate-100',
                  'dark:text-slate-500 dark:hover:text-white dark:hover:bg-white/10',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                ].join(' ')}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {children}
        </div>
      </div>

      {/* Inject keyframes via <style> to keep component self-contained */}
      <style>{`
        @keyframes modalIn {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>,
    document.body
  );
}

export default Modal;
