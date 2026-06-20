import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * @typedef {'success' | 'error' | 'warning' | 'info'} ToastType
 */

/**
 * @typedef {object} ToastOptions
 * @property {ToastType} [type='info'] - Visual style and icon.
 * @property {number} [duration=4000] - Auto-dismiss delay in ms. Set `0` to disable.
 */

/**
 * @typedef {object} ToastEntry
 * @property {string} id - Unique identifier.
 * @property {string} message - Toast message text.
 * @property {ToastType} type - Toast type.
 * @property {number} duration - Auto-dismiss delay.
 * @property {boolean} exiting - True during the exit animation.
 */

/* ===================================================================== */
/*  Context                                                              */
/* ===================================================================== */

const ToastContext = createContext(null);

/* ===================================================================== */
/*  Icon & color maps                                                    */
/* ===================================================================== */

const typeConfig = {
  success: {
    icon: CheckCircle,
    borderColor: 'border-l-emerald-500',
    iconColor: 'text-emerald-500',
    bgTint: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
  error: {
    icon: XCircle,
    borderColor: 'border-l-red-500',
    iconColor: 'text-red-500',
    bgTint: 'bg-red-50 dark:bg-red-500/10',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-l-amber-500',
    iconColor: 'text-amber-500',
    bgTint: 'bg-amber-50 dark:bg-amber-500/10',
  },
  info: {
    icon: Info,
    borderColor: 'border-l-blue-500',
    iconColor: 'text-blue-500',
    bgTint: 'bg-blue-50 dark:bg-blue-500/10',
  },
};

/* ===================================================================== */
/*  Single Toast Item                                                    */
/* ===================================================================== */

/**
 * Internal component rendering an individual toast notification.
 *
 * @param {object} props
 * @param {ToastEntry} props.toast - Toast data.
 * @param {(id: string) => void} props.onDismiss - Dismiss callback.
 */
function ToastItem({ toast, onDismiss }) {
  const { icon: Icon, borderColor, iconColor } = typeConfig[toast.type];

  return (
    <div
      role="alert"
      className={[
        // Layout
        'pointer-events-auto relative flex items-start gap-3 w-80 p-4',
        'rounded-xl border-l-4',
        borderColor,
        // Light mode
        'bg-white shadow-lg shadow-slate-900/10',
        // Dark mode
        'dark:bg-slate-800 dark:shadow-black/30',
        // Animation
        toast.exiting
          ? 'animate-[toastOut_250ms_ease-in_forwards]'
          : 'animate-[toastIn_300ms_ease-out]',
      ].join(' ')}
    >
      {/* Icon */}
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor}`} />

      {/* Message */}
      <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200 leading-snug">
        {toast.message}
      </p>

      {/* Dismiss */}
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className={[
          'p-0.5 rounded-md transition-colors duration-200 shrink-0',
          'text-slate-400 hover:text-slate-600 hover:bg-slate-100',
          'dark:text-slate-500 dark:hover:text-white dark:hover:bg-white/10',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
        ].join(' ')}
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ===================================================================== */
/*  ToastProvider                                                        */
/* ===================================================================== */

/**
 * Provides the toast notification context to the component tree.
 * Wrap your application (or a subtree) with this provider, then call
 * `useToast()` in any descendant to trigger toasts.
 *
 * Toasts stack in the **top-right** corner with smooth slide-in/out
 * animations. Each toast auto-dismisses after its configured duration.
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} props.children - Application subtree.
 * @returns {JSX.Element}
 *
 * @example
 * // In App.jsx
 * <ToastProvider>
 *   <Router>…</Router>
 * </ToastProvider>
 */
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  /* ------------------------------------------------------------------ */
  /*  Dismiss (with exit animation)                                      */
  /* ------------------------------------------------------------------ */
  const dismiss = useCallback((id) => {
    // Mark as exiting to trigger the exit animation
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    // Remove from DOM after exit animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 250);
    // Clear any pending auto-dismiss timer
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Add toast                                                          */
  /* ------------------------------------------------------------------ */
  const addToast = useCallback(
    (message, options = {}) => {
      const { type = 'info', duration = 4000 } = options;
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      setToasts((prev) => [...prev, { id, message, type, duration, exiting: false }]);

      if (duration > 0) {
        timersRef.current[id] = setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss]
  );

  /* ------------------------------------------------------------------ */
  /*  Cleanup all timers on unmount                                      */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Convenience methods                                                */
  /* ------------------------------------------------------------------ */
  const toast = useCallback(
    (message, options) => addToast(message, options),
    [addToast]
  );
  toast.success = (msg, opts) => addToast(msg, { ...opts, type: 'success' });
  toast.error = (msg, opts) => addToast(msg, { ...opts, type: 'error' });
  toast.warning = (msg, opts) => addToast(msg, { ...opts, type: 'warning' });
  toast.info = (msg, opts) => addToast(msg, { ...opts, type: 'info' });

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast container – top-right, stacked */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed top-4 right-4 z-[10000] flex flex-col gap-3 pointer-events-none"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>

      {/* Self-contained keyframes */}
      <style>{`
        @keyframes toastIn {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes toastOut {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(100%);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

/* ===================================================================== */
/*  useToast Hook                                                        */
/* ===================================================================== */

/**
 * Hook that returns the `toast` function for triggering notifications.
 *
 * The returned function supports both direct invocation and convenience
 * shorthand methods for each toast type.
 *
 * @returns {Function & { success: Function, error: Function, warning: Function, info: Function }}
 *
 * @example
 * const toast = useToast();
 *
 * // Generic
 * toast('Hello world', { type: 'info', duration: 5000 });
 *
 * // Shorthand
 * toast.success('Trip booked successfully!');
 * toast.error('Something went wrong');
 * toast.warning('Your session expires soon');
 * toast.info('New destinations available');
 */
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error(
      'useToast() must be used within a <ToastProvider>. ' +
        'Wrap your app with <ToastProvider> to use toast notifications.'
    );
  }
  return ctx;
}

export { ToastProvider, useToast };
