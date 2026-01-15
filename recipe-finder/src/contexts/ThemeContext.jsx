import React, { createContext, useContext, useState, useEffect } from 'react';

// Define color palettes
const colorPalettes = {
  blue: {
    primary: '#3B82F6',
    secondary: '#64748B',
    accent: '#F59E0B',
    surface: '#FFFFFF',
    muted: '#F8FAFC',
    border: '#E2E8F0',
    text: '#1E293B',
    textSecondary: '#64748B',
  },
  green: {
    primary: '#10B981',
    secondary: '#64748B',
    accent: '#F59E0B',
    surface: '#FFFFFF',
    muted: '#F0FDF4',
    border: '#D1FAE5',
    text: '#064E3B',
    textSecondary: '#64748B',
  },
  purple: {
    primary: '#8B5CF6',
    secondary: '#64748B',
    accent: '#F59E0B',
    surface: '#FFFFFF',
    muted: '#FAF5FF',
    border: '#E9D5FF',
    text: '#581C87',
    textSecondary: '#64748B',
  },
  red: {
    primary: '#EF4444',
    secondary: '#64748B',
    accent: '#F59E0B',
    surface: '#FFFFFF',
    muted: '#FEF2F2',
    border: '#FECACA',
    text: '#991B1B',
    textSecondary: '#64748B',
  },
};

const darkColorPalettes = {
  blue: {
    primary: '#60A5FA',
    secondary: '#94A3B8',
    accent: '#F59E0B',
    surface: '#1E293B',
    muted: '#334155',
    border: '#475569',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
  },
  green: {
    primary: '#34D399',
    secondary: '#94A3B8',
    accent: '#F59E0B',
    surface: '#1E293B',
    muted: '#334155',
    border: '#475569',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
  },
  purple: {
    primary: '#A78BFA',
    secondary: '#94A3B8',
    accent: '#F59E0B',
    surface: '#1E293B',
    muted: '#334155',
    border: '#475569',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
  },
  red: {
    primary: '#F87171',
    secondary: '#94A3B8',
    accent: '#F59E0B',
    surface: '#1E293B',
    muted: '#334155',
    border: '#475569',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [palette, setPalette] = useState('blue');

  // Load theme and palette from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedPalette = localStorage.getItem('palette');
    if (savedTheme) setTheme(savedTheme);
    if (savedPalette) setPalette(savedPalette);
  }, []);

  // Save theme and palette to localStorage when they change
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('palette', palette);
  }, [theme, palette]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const colors = theme === 'dark' ? darkColorPalettes[palette] : colorPalettes[palette];

  const value = {
    theme,
    palette,
    colors,
    toggleTheme,
    setPalette,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
