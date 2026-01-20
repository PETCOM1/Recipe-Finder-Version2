import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { ChefHat, Home, Utensils, AlertCircle, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NoPage = () => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    float: {
      y: [0, -30, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  const spinningAnimation = {
    spin: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const brokenIngredients = [
    { emoji: '🍳', delay: 0, size: 40 },
    { emoji: '🥘', delay: 0.2, size: 36 },
    { emoji: '🍲', delay: 0.4, size: 38 },
    { emoji: '🧊', delay: 0.6, size: 32 },
    { emoji: '🔥', delay: 0.8, size: 34 },
  ];

  const helpfulLinks = [
    { label: 'All Recipes', path: '/', icon: <Utensils size={20} /> },
    { label: 'Favorites', path: '/favorites', icon: <ChefHat size={20} /> },
    { label: 'Search Recipes', path: '/', icon: <Search size={20} /> },
  ];

  const errorMessages = [
    "Recipe not found!",
    "404: Kitchen Error",
    "Page went up in smoke!",
    "Lost in the pantry!",
    "Page evaporated!",
  ];

  const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen overflow-hidden relative"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <Header />
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Broken ingredients floating */}
        {brokenIngredients.map((ingredient, index) => (
          <motion.div
            key={index}
            variants={floatingAnimation}
            initial="float"
            animate="float"
            transition={{ delay: ingredient.delay }}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${10 + index * 18}%`,
              top: `${20 + Math.sin(index) * 30}%`,
              fontSize: ingredient.size,
              filter: 'blur(1px)'
            }}
          >
            {ingredient.emoji}
          </motion.div>
        ))}
        
        {/* Spinning warning signs */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            variants={spinningAnimation}
            animate="spin"
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: colors.primary
            }}
          >
            <AlertCircle size={60 + i * 20} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          {/* Animated number 404 */}
          <div className="relative inline-block">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="text-[160px] md:text-[240px] font-bold leading-none"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 50%, ${colors.secondary} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
              }}
            >
              404
            </motion.div>
            
            {/* Crack effect on numbers */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2"
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.error}, transparent)`,
                transformOrigin: 'left'
              }}
            />
          </div>

          {/* Error message */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mt-4 mb-6"
            style={{ color: colors.text }}
          >
            {randomMessage}
          </motion.h2>

          {/* Cooking-themed message */}
          <motion.p
            variants={itemVariants}
            className="text-xl max-w-2xl mx-auto mb-8"
            style={{ color: colors.textSecondary }}
          >
            Looks like this recipe page got a bit too hot to handle! 
            The page you're looking for might have simmered away or been whisked into another dimension.
          </motion.p>
        </motion.div>

        {/* Chef hat animation */}
        <motion.div
          variants={itemVariants}
          className="relative mb-12"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChefHat 
              size={80}
              style={{ 
                color: colors.primary,
                filter: `drop-shadow(0 8px 24px ${colors.primary}40)`
              }}
            />
          </motion.div>
          
          {/* Floating bubbles */}
          <motion.div
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 -left-4 w-6 h-6 rounded-full"
            style={{ backgroundColor: colors.accent }}
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -top-2 -right-4 w-4 h-4 rounded-full"
            style={{ backgroundColor: colors.secondary }}
          />
        </motion.div>

        {/* Helpful links */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-2xl mb-12"
        >
          <h3 className="text-xl font-bold mb-6 text-center" style={{ color: colors.text }}>
            Try one of these delicious alternatives:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {helpfulLinks.map((link, index) => (
              <motion.button
                key={link.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(link.path)}
                className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg transition-all"
                style={{
                  backgroundColor: colors.surface,
                  border: `2px solid ${colors.border}`,
                  boxShadow: `0 8px 32px ${theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`
                }}
              >
                <div className="p-3 rounded-full mb-3"
                  style={{ backgroundColor: colors.muted }}
                >
                  {link.icon}
                </div>
                <span className="font-bold text-lg" style={{ color: colors.text }}>
                  {link.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main action button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="group relative px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
          style={{
            backgroundColor: colors.primary,
            color: 'white',
            boxShadow: `0 12px 40px ${colors.primary}60`
          }}
        >
          {/* Animated background effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.accent}40, transparent)`,
              backgroundSize: '200% 100%'
            }}
            animate={{
              backgroundPosition: ['200% 0', '-200% 0']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="relative z-10 flex items-center gap-3">
            <Home size={24} />
            <span>Back to Kitchen</span>
          </div>
        </motion.button>

        {/* Fun message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center"
          style={{ color: colors.textSecondary }}
        >
          <p className="italic">
            Don't worry, our chefs are already working on fixing this recipe!
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {['👨‍🍳', '👩‍🍳', '🍳', '🔥'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="text-2xl"
              >
                {emoji}
            </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${colors.background} 0%, transparent 100%)`
        }}
      />
      <Footer />
    </motion.div>
  );
};

export default NoPage;