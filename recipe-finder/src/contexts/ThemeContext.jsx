import React, { createContext, useContext, useState, useEffect } from 'react';

const colorPalettes = {
  // VELISH SIGNATURE: Earthy, warm, and boutique
  signature: {
    primary: '#D4A373',      // Warm Tan / Gold accent
    secondary: '#CCD5AE',    // Sage Green
    accent: '#E9EDC6',       // Creamy highlights
    success: '#606C38',      // Forest Green (for healthy tags)
    surface: '#FEFAE0',      // Off-white paper feel
    muted: '#FAEDCD',        // Soft wheat
    border: '#D4A373',       // Golden border
    text: '#283618',         // Deep botanical green
    textSecondary: '#606C38',
    background: '#FEFAE0',
  },
  // NOIR: Sophisticated high-contrast
  noir: {
    primary: '#FFFFFF',
    secondary: '#A1A1AA',
    accent: '#D4D4D8',
    success: '#4ADE80',
    surface: '#18181B',
    muted: '#27272A',
    border: '#3F3F46',
    text: '#FAFAFA',
    textSecondary: '#A1A1AA',
    background: '#09090B',
  },
  // ROSE: Soft, elegant, and modern
  rose: {
    primary: '#FDA4AF',
    secondary: '#94A3B8',
    accent: '#F1F5F9',
    success: '#10B981',
    surface: '#FFFFFF',
    muted: '#FFF1F2',
    border: '#FFE4E6',
    text: '#4C0519',
    textSecondary: '#9F1239',
    background: '#FFF1F2',
  }
};

// Dark mode overrides for the Signature and Rose palettes
const darkOverrides = {
  signature: {
    surface: '#1A1C14',
    background: '#0D0E0A',
    text: '#FEFAE0',
    textSecondary: '#CCD5AE',
    muted: '#283618',
    border: '#606C38',
  }
  // Noir is already dark-based, Rose would need similar overrides
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [palette, setPalette] = useState('signature');

  useEffect(() => {
    const savedTheme = localStorage.getItem('velish_theme') || 'light';
    const savedPalette = localStorage.getItem('velish_palette') || 'signature';
    setTheme(savedTheme);
    setPalette(savedPalette);
  }, []);

  useEffect(() => {
    localStorage.setItem('velish_theme', theme);
    localStorage.setItem('velish_palette', palette);
  }, [theme, palette]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Logic to merge palette base with dark mode overrides
  const getColors = () => {
    const base = colorPalettes[palette] || colorPalettes.signature;
    if (theme === 'dark' && darkOverrides[palette]) {
      return { ...base, ...darkOverrides[palette] };
    }
    // If it's Noir, it's inherently dark
    if (palette === 'noir') return colorPalettes.noir;
    return base;
  };

  const value = {
    theme,
    palette,
    colors: getColors(),
    toggleTheme,
    setPalette,
    availablePalettes: Object.keys(colorPalettes)
  };

  return (
    <ThemeContext.Provider value={value}>
      <div style={{ backgroundColor: value.colors.background, minHeight: '100vh', transition: 'background-color 0.5s ease' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export default ThemeContext;