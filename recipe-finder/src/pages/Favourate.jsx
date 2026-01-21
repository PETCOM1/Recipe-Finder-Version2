import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import FavourateContect from "../contexts/FavourateContect";
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Heart, ChefHat, Stars, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';

const Favourate = () => {
  const { colors, theme } = useTheme();
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8
      }
    },
    hover: {
      scale: isMobile ? 1 : 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const floatingHeartVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  const sparkleVariants = {
    twinkle: {
      opacity: [0, 1, 0],
      scale: [0.5, 1.2, 0.5],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen overflow-hidden"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <Header />
      
      {/* Animated background elements - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating hearts - Fewer on mobile */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            variants={floatingHeartVariants}
            animate="float"
            transition={{ delay: i * 0.5 }}
            className="absolute text-xl sm:text-2xl md:text-3xl opacity-5 md:opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: colors.primary
            }}
          >
            ❤️
          </motion.div>
        ))}
        
        {/* Sparkle effects - Reduced size on mobile */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`sparkle-${i}`}
            variants={sparkleVariants}
            animate="twinkle"
            transition={{ delay: i * 0.3 }}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: colors.accent
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <motion.div
          variants={titleVariants}
          whileHover="hover"
          onHoverStart={() => !isMobile && setIsHoveringTitle(true)}
          onHoverEnd={() => !isMobile && setIsHoveringTitle(false)}
          className="flex flex-col items-center justify-center my-4 sm:my-6 md:my-8 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 sm:mx-4 shadow-lg sm:shadow-xl md:shadow-2xl"
          style={{
            backgroundColor: colors.surface,
            border: `2px solid ${colors.border}`,
            backgroundImage: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.muted} 100%)`,
            boxShadow: `0 10px 30px ${theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`
          }}
        >
          {/* Animated hearts around title - Hidden on mobile */}
          <div className="relative flex items-center justify-center">
            {!isMobile && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute"
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      transform: `rotate(${i * 120}deg) translateY(-60px)`,
                    }}
                  >
                    <Heart 
                      size={24}
                      className={isHoveringTitle ? "animate-pulse" : ""}
                      style={{ 
                        fill: colors.primary,
                        color: colors.primary,
                        opacity: isHoveringTitle ? 1 : 0.5
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <motion.div
                animate={{ 
                  scale: isHoveringTitle && !isMobile ? [1, 1.2, 1] : 1,
                  rotate: isHoveringTitle && !isMobile ? [0, 15, -15, 0] : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <ChefHat 
                  size={isMobile ? 32 : 40}
                  className="sm:block hidden"
                  style={{ 
                    color: colors.primary,
                    filter: `drop-shadow(0 2px 6px ${colors.primary}40)`
                  }}
                />
              </motion.div>
              
              <div className="text-center">
                <h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Favorite Recipes
                </h1>
                
                <motion.p 
                  className="text-sm sm:text-base md:text-xl px-2 sm:px-0"
                  style={{ color: colors.textSecondary }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Your personal collection of culinary delights
                </motion.p>
              </div>

              <motion.div
                animate={{ 
                  scale: isHoveringTitle && !isMobile ? [1, 1.2, 1] : 1,
                  rotate: isHoveringTitle && !isMobile ? [0, -15, 15, 0] : 0
                }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Flame 
                  size={isMobile ? 32 : 40}
                  className="sm:block hidden"
                  style={{ 
                    color: colors.accent,
                    filter: `drop-shadow(0 2px 6px ${colors.accent}40)`
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Stats bar - Responsive grid */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8"
            style={{ borderColor: colors.border }}
          >
            {[
              { icon: '❤️', label: 'Loved Recipes', color: colors.primary },
              { icon: '⭐', label: 'Top Rated', color: colors.accent },
              { icon: '👨‍🍳', label: 'Your Collection', color: colors.secondary }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={!isMobile ? { y: -5, scale: 1.05 } : {}}
                className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl w-24 sm:w-28 md:w-auto"
                style={{ backgroundColor: colors.muted }}
              >
                <span className="text-lg sm:text-xl md:text-2xl">{stat.icon}</span>
                <span 
                  className="font-bold text-xs sm:text-sm md:text-lg text-center px-1"
                  style={{ color: stat.color }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Empty state animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center my-8 sm:my-10 md:my-12 px-4"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: colors.border }}
          />
          
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10 p-4 sm:p-6 md:p-8 rounded-full"
            style={{ backgroundColor: colors.surface }}
          >
            <Stars 
              size={isMobile ? 32 : 40}
              style={{ 
                color: colors.accent,
                filter: `drop-shadow(0 0 10px ${colors.accent})`
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Favorites Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 px-3 sm:px-4"
      >
        <FavourateContect />
      </motion.div>

      {/* Decorative bottom gradient - Reduced height on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${colors.background} 0%, transparent 100%)`
        }}
      />
      <Footer />
    </motion.div>
  );
};

export default Favourate;