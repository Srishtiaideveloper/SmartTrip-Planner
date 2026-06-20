import { createContext, useContext, useState, useEffect } from 'react';

/**
 * @typedef {'dark' | 'light'} Theme
 * 
 * @typedef {Object} ThemeContextValue
 * @property {Theme} theme - Current theme ('dark' or 'light')
 * @property {function} toggleTheme - Function to toggle between dark and light
 * @property {function(Theme): void} setTheme - Function to set a specific theme
 * @property {boolean} isDark - Convenience boolean for checking dark mode
 */

const ThemeContext = createContext(undefined);

/**
 * ThemeProvider — Wraps the app and provides dark/light mode state.
 * Reads initial preference from localStorage, falls back to system preference.
 * Persists the user's choice to localStorage.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem('smarttrip-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    // Fall back to system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('smarttrip-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme — Hook to access the current theme and toggle function.
 * Must be used within a ThemeProvider.
 *
 * @returns {ThemeContextValue}
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
