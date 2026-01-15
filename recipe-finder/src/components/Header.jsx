import { Sun, Moon, Home, Heart, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = window.location.pathname;

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5
      }
    }
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3
      }
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const themeToggleVariants = {
    light: { rotate: 0 },
    dark: { rotate: 180 }
  };

  // Common button classes
  const navBtnBase = 'flex flex-row items-center justify-center gap-2 p-2 rounded-2xl transition-all duration-300 h-12 min-h-[48px] font-medium';

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="w-full border-b-[1px] shadow-sm sticky top-0 z-50"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        boxShadow: `0 4px 20px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)'}`
      }}
    >
      <div className="flex flex-col md:flex-row md:justify-between items-center p-4 md:p-6 gap-2 md:gap-0">
        {/* Logo Section */}
        <motion.div 
          variants={logoVariants}
          whileHover="hover"
          whileTap="tap"
          className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start cursor-pointer"
          onClick={() => navigate('/')}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatDelay: 5,
              duration: 2 
            }}
          >
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTFpZzhocmxzOHl0eXZydXZlajI3cGEwcG9zY2R3empwbWt2a2ZhaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/v8jIlDELZYmTxjqmUH/giphy.gif"
              alt="Animated cooking GIF"
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-full shadow-lg"
              style={{ border: `2px solid ${colors.accent}` }}
            />
          </motion.div>
          <motion.h1 
            className="text-[24px] sm:text-[28px] md:text-[32px] font-bold italic squiggly-font text-center md:text-left"
            style={{ color: colors.primary }}
            whileHover={{ scale: 1.02 }}
          >
            Recipe Finder
          </motion.h1>
        </motion.div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex flex-row gap-4 w-auto">
          {/* Home Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`${navBtnBase} ${currentPath === '/' ? 'shadow-lg' : ''}`}
            onClick={() => navigate('/')}
            aria-label="Go to Home"
            style={{
              backgroundColor: currentPath === '/' ? colors.primary : colors.secondary,
              color: 'white',
              boxShadow: currentPath === '/' ? `0 4px 12px ${colors.primary}40` : 'none'
            }}
          >
            <Home size={20} /> 
            <span>Home</span>
          </motion.button>

          {/* Favorites Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`${navBtnBase} ${currentPath === '/favorites' ? 'shadow-lg' : ''}`}
            onClick={() => navigate('/favorites')}
            aria-label="Go to Favorites"
            style={{
              backgroundColor: currentPath === '/favorites' ? colors.primary : colors.secondary,
              color: 'white',
              boxShadow: currentPath === '/favorites' ? `0 4px 12px ${colors.primary}40` : 'none'
            }}
          >
            <Heart size={20} /> 
            <span>Favorites</span>
          </motion.button>

          {/* Dark Mode Toggle */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={toggleTheme}
            className="p-3 rounded-2xl transition-colors"
            aria-label="Toggle dark mode"
            style={{
              backgroundColor: colors.accent,
              color: colors.text
            }}
          >
            <motion.div
              animate={theme === "dark" ? "dark" : "light"}
              variants={themeToggleVariants}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {theme === "dark" ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-800" size={20} />
              )}
            </motion.div>
          </motion.button>
        </nav>

        {/* Burger Menu Button (Mobile) */}
        <div className="md:hidden flex items-center justify-end w-full">
          <motion.button 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Open menu" 
            className="p-2 rounded-full focus:outline-none"
            style={{ 
              backgroundColor: colors.primary,
              color: 'white'
            }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu with Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 md:hidden"
              style={{ backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)' }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              key="menu-panel"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-4/5 max-w-xs z-50 md:hidden flex flex-col p-6 shadow-2xl"
              style={{ backgroundColor: colors.surface }}
            >
              {/* Menu Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: "linear" }}
                  >
                    <img
                      src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTFpZzhocmxzOHl0eXZydXZlajI3cGEwcG9zY2R3empwbWt2a2ZhaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/v8jIlDELZYmTxjqmUH/giphy.gif"
                      alt="Animated cooking GIF"
                      className="w-10 h-10 rounded-full"
                      style={{ border: `2px solid ${colors.accent}` }}
                    />
                  </motion.div>
                  <h2 style={{ color: colors.primary }} className="text-xl font-bold">
                    Recipe Finder
                  </h2>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col gap-4 flex-1">
                {[
                  { label: 'Home', icon: <Home size={24} />, path: '/' },
                  { label: 'Favorites', icon: <Heart size={24} />, path: '/favorites' },
                ].map((item, index) => (
                  <motion.button
                    key={item.label}
                    variants={menuItemVariants}
                    custom={index}
                    whileHover={{ x: 10, backgroundColor: colors.muted }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(item.path);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl text-lg font-medium transition-colors ${
                      currentPath === item.path ? 'shadow-md' : ''
                    }`}
                    style={{
                      backgroundColor: currentPath === item.path ? colors.primary : 'transparent',
                      color: currentPath === item.path ? 'white' : colors.text
                    }}
                  >
                    {item.icon}
                    {item.label}
                    {currentPath === item.path && (
                      <motion.div
                        layoutId="active-indicator"
                        className="w-2 h-2 rounded-full ml-auto"
                        style={{ backgroundColor: colors.accent }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Theme Toggle Section */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.border }}>
                <motion.button
                  variants={menuItemVariants}
                  custom={2}
                  whileHover={{ scale: 1.02, backgroundColor: colors.muted }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    toggleTheme();
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full p-4 rounded-xl"
                  style={{ 
                    backgroundColor: colors.muted,
                    color: colors.text
                  }}
                >
                  <div className="flex items-center gap-3">
                    <AnimatePresence mode="wait">
                      {theme === "dark" ? (
                        <motion.div
                          key="sun"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                        >
                          <Sun className="text-yellow-500" size={24} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                        >
                          <Moon className="text-gray-700" size={24} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="font-medium">
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </span>
                  </div>
                  <motion.div
                    className="w-10 h-6 rounded-full p-1"
                    style={{ 
                      backgroundColor: theme === 'dark' ? colors.primary : colors.border
                    }}
                  >
                    <motion.div
                      layout
                      className="w-4 h-4 rounded-full bg-white"
                      animate={{ x: theme === 'dark' ? 20 : 0 }}
                    />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;