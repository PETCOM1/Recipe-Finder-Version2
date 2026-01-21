import { Sun, Moon, Home, Heart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Favorites', icon: Heart, path: '/favorites' },
  ];

  // Bottom navigation for mobile (like native apps)
  const MobileBottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        boxShadow: `0 -2px 10px ${colors.border}20`,
      }}>
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 no-underline relative p-2"
            >
              <div className="relative">
                <Icon 
                  size={22} 
                  style={{ 
                    color: isActive ? colors.primary : colors.text + '80'
                  }} 
                />
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                )}
              </div>
              <span 
                className="text-xs mt-1 font-medium"
                style={{ 
                  color: isActive ? colors.primary : colors.text + '80',
                  opacity: isActive ? 1 : 0.8
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
        
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center flex-1 p-2"
          aria-label="Toggle theme"
        >
          <div className="relative">
            {theme === 'dark' ? (
              <Sun size={22} className="text-amber-300" />
            ) : (
              <Moon size={22} className="text-slate-700" />
            )}
          </div>
          <span 
            className="text-xs mt-1 font-medium"
            style={{ 
              color: colors.text + '80',
              opacity: 0.8
            }}
          >
            Theme
          </span>
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Main Header - Simplified for mobile */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 ${
          isScrolled ? 'backdrop-blur-lg' : 'backdrop-blur-sm'
        }`}
        style={{
          backgroundColor: isScrolled ? colors.surface + 'CC' : colors.surface + 'E6',
          borderBottom: `1px solid ${colors.border}30`,
          boxShadow: isScrolled ? `0 4px 12px ${colors.border}15` : 'none',
          height: '60px',
        }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Logo - Minimal on mobile */}
            <Link 
              to="/" 
              className="flex items-center gap-2 no-underline"
              aria-label="Recipe Finder - Home"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 8, duration: 4 }}
                  className="overflow-hidden rounded-full"
                  style={{ 
                    background: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`,
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTFpZzhocmxzOHl0eXZydXZlajI3cGEwcG9zY2R3empwbWt2a2ZhaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/v8jIlDELZYmTxjqmUH/giphy.gif"
                    alt="Cooking animation"
                    className="w-8 h-8 rounded-full object-cover"
                    loading="eager"
                  />
                </motion.div>
              </div>
              <span 
                className="hidden sm:inline-block text-lg font-bold"
                style={{ color: colors.primary }}
              >
                RecipeFinder
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="no-underline relative"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-xl
                        font-medium transition-all duration-200
                        ${isActive ? 'shadow-sm' : 'hover:shadow-sm'}
                      `}
                      style={{
                        backgroundColor: isActive ? colors.primary : 'transparent',
                        color: isActive ? '#FFFFFF' : colors.text,
                      }}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          style={{ backgroundColor: colors.accent }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
              
              {/* Desktop Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl hover:shadow-sm transition-shadow"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                style={{
                  backgroundColor: colors.muted,
                  color: colors.text,
                }}
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-amber-300" />
                ) : (
                  <Moon size={20} className="text-slate-700" />
                )}
              </motion.button>
            </nav>

            {/* Mobile: Only show theme toggle and menu button if not using bottom nav */}
            <div className="flex items-center gap-3 md:hidden">
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                style={{
                  backgroundColor: colors.muted,
                  color: colors.text,
                }}
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-amber-300" />
                ) : (
                  <Moon size={20} className="text-slate-700" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Navigation - Always visible */}
      <MobileBottomNav />

      {/* Add padding to prevent content from being hidden behind fixed headers */}
      <div className="pt-[60px] pb-16 md:pb-0" />
    </>
  );
};

export default Header;