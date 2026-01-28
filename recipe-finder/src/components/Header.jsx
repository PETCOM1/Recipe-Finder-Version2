import { Sun, Moon, Home, Heart, Leaf } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Easing for that "Premium" feel
const transition = { type: "spring", stiffness: 260, damping: 30 };
const softCurve = [0.23, 1, 0.32, 1]; // Power4 easeOut equivalent

const Header = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Favorites', icon: Heart, path: '/favorites' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: softCurve }}
        className="fixed top-0 left-0 right-0 z-50 px-6 pt-5 pointer-events-none"
      >
        <motion.div 
          layout // Smoothly animates height/width changes
          className={`container mx-auto max-w-5xl rounded-[2.5rem] flex items-center justify-between px-8 pointer-events-auto transition-shadow duration-500 ${
            isScrolled ? 'shadow-[0_20px_50px_rgba(0,0,0,0.1)]' : 'shadow-none'
          }`}
          style={{
            backgroundColor: isScrolled ? `${colors.surface}F2` : `${colors.surface}80`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid ${colors.border}${isScrolled ? '60' : '20'}`,
            height: isScrolled ? '64px' : '80px',
          }}
        >
          {/* Logo with Magnetic Hover */}
          <Link to="/" className="no-underline group">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ x: 3 }}
              transition={transition}
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6, ease: softCurve }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
              >
                <Leaf size={18} color="white" fill="white" />
              </motion.div>
              <span className="text-2xl font-black tracking-tighter lowercase italic" style={{ color: colors.text }}>
                velish<span style={{ color: colors.primary }}>.</span>
              </span>
            </motion.div>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            <nav className="flex items-center bg-black/[0.03] dark:bg-white/[0.03] p-1.5 rounded-full">
              {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <Link key={item.path} to={item.path} className="relative px-6 py-2 no-underline group">
                    <span 
                      className="relative z-10 text-sm font-bold tracking-tight transition-colors duration-500"
                      style={{ color: isActive ? (theme === 'dark' ? '#000' : '#fff') : colors.text }}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="activePill"
                        className="absolute inset-0 rounded-full shadow-lg"
                        style={{ backgroundColor: colors.text }}
                        transition={{ ...transition, stiffness: 300 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Icon Transitions */}
            <motion.button
              onClick={toggleTheme}
              className="ml-2 w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
              whileHover={{ backgroundColor: `${colors.muted}90` }}
              whileTap={{ scale: 0.9 }}
              style={{ color: colors.text }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: 20, opacity: 0, rotate: 45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.4, ease: softCurve }}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Dock - Floating & Elastic */}
      <AnimatePresence>
        <motion.nav 
          initial={{ y: 100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: softCurve }}
          className="fixed bottom-8 left-1/2 z-50 md:hidden w-[85%] max-w-[320px]"
        >
          <div 
            className="flex items-center justify-around p-2 rounded-[2.5rem] border shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            style={{ 
              backgroundColor: `${colors.surface}F2`, 
              borderColor: `${colors.border}60`,
              backdropFilter: 'blur(20px)',
            }}
          >
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link key={item.path} to={item.path} className="relative py-3 px-6 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ 
                      y: isActive ? -2 : 0,
                      color: isActive ? colors.primary : `${colors.text}40` 
                    }}
                    transition={transition}
                  >
                    <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>
                  {isActive && (
                    <motion.div 
                      layoutId="mobileDot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      </AnimatePresence>

      <div className="h-32" />
    </>
  );
};

export default Header;