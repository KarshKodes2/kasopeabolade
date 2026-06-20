'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Theme = 'dark' | 'light' | 'forest' | 'ocean' | 'rose' | 'slate';

export const THEMES: { id: Theme; label: string; preview: string }[] = [
  { id: 'dark',   label: 'Dark',   preview: '#0A0A0A' },
  { id: 'light',  label: 'Light',  preview: '#FAFAFA' },
  { id: 'forest', label: 'Forest', preview: '#0A0F0A' },
  { id: 'ocean',  label: 'Ocean',  preview: '#030A14' },
  { id: 'rose',   label: 'Rose',   preview: '#0F0607' },
  { id: 'slate',  label: 'Slate',  preview: '#0B0C10' },
];

const ACCENT_COLORS: Record<Theme, string> = {
  dark:   '#9F67FF',
  light:  '#7C3AED',
  forest: '#10B981',
  ocean:  '#3B82F6',
  rose:   '#F43F5E',
  slate:  '#94A3B8',
};

const STORAGE_KEY = 'portfolio-theme';

type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  accentColor: string;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
  accentColor: ACCENT_COLORS.dark,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = saved && THEMES.find((t) => t.id === saved) ? saved : 'dark';
    setThemeState(initial);
    document.documentElement.setAttribute('data-theme', initial);
    setMounted(true);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(STORAGE_KEY, t);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor: ACCENT_COLORS[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}
