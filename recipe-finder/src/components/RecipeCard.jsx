import { Heart, Clock, Users, Flame, Beef, Wheat, Droplets } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const RecipeCard = ({ recipe, handleOnClickOfRecipeCard, toggleLike }) => {
  const { colors, theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Remove duplicate tags and dietary items
  const uniqueTags = recipe.tags ? [...new Set(recipe.tags)] : [];
  const uniqueDietary = recipe.dietary ? [...new Set(recipe.dietary)] : [];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const likeButtonVariants = {
    normal: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
    liked: { 
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.4
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 200
      }
    })
  };

  // Handle like click with animation
  const handleLike = (e) => {
    e.stopPropagation();
    if (toggleLike) {
      toggleLike(recipe.id);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="rounded-2xl overflow-hidden flex flex-col w-full max-w-xs mx-auto shadow-lg hover:shadow-2xl cursor-pointer"
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        boxShadow: isHovered 
          ? `0 20px 40px ${theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`
          : `0 8px 24px ${theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`
      }}
      onClick={() => handleOnClickOfRecipeCard(recipe.id)}
      layout
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          variants={imageVariants}
          initial="hidden"
          animate={imageLoaded ? "visible" : "hidden"}
          src={recipe.image.startsWith('.') ? recipe.image.replace('./', '/') : recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading shimmer */}
        {!imageLoaded && (
          <div 
            className="absolute inset-0 animate-pulse"
            style={{ backgroundColor: colors.muted }}
          />
        )}
        
        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: colors.primary + '40' }}
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="text-white font-bold px-4 py-2 rounded-full"
                style={{ backgroundColor: colors.primary }}
              >
                View Recipe →
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Like Button */}
        <motion.button
          variants={likeButtonVariants}
          initial="normal"
          animate={recipe.liked ? "liked" : "normal"}
          whileHover="hover"
          whileTap="tap"
          className={`absolute top-3 right-3 rounded-full p-2.5 shadow-lg z-10 backdrop-blur-sm ${recipe.liked ? 'text-red-500' : 'text-white'}`}
          onClick={handleLike}
          aria-label={recipe.liked ? 'Unlike' : 'Like'}
          style={{
            backgroundColor: recipe.liked 
              ? colors.accent + '40'
              : colors.primary + '40',
            border: `1px solid ${recipe.liked ? colors.accent : colors.primary}`
          }}
        >
          <Heart 
            fill={recipe.liked ? 'currentColor' : 'none'} 
            size={20}
          />
        </motion.button>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3">
          <div 
            className="px-3 py-1 rounded-full flex items-center gap-1 shadow-md"
            style={{
              backgroundColor: colors.accent,
              color: colors.text
            }}
          >
            <span className="text-sm font-bold">★</span>
            <span className="text-sm font-bold">{recipe.rating}</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Title Row */}
        <div className="flex items-start justify-between gap-2">
          <motion.h3 
            className="text-lg font-bold truncate"
            style={{ color: colors.text }}
            whileHover={{ color: colors.primary }}
          >
            {recipe.title}
          </motion.h3>
        </div>

        {/* Tags - Now using uniqueTags */}
        <div className="flex flex-wrap gap-1">
          {uniqueTags.map((tag, index) => (
            <motion.span
              key={tag}
              custom={index}
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                backgroundColor: colors.muted,
                color: colors.textSecondary
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Recipe Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock size={16} style={{ color: colors.textSecondary }} />
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              {recipe.timeMinutes} min
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} style={{ color: colors.textSecondary }} />
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              {recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}
            </span>
          </div>
          <div 
            className="text-xs px-2 py-1 rounded-full capitalize ml-auto"
            style={{
              backgroundColor: colors.secondary + '20',
              color: colors.secondary,
              border: `1px solid ${colors.secondary}40`
            }}
          >
            {recipe.difficulty}
          </div>
        </div>

        {/* Dietary Information - Now using uniqueDietary */}
        {uniqueDietary.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {uniqueDietary.map((diet, index) => (
              <motion.span
                key={diet}
                custom={index}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: colors.success + '15',
                  color: colors.success,
                  border: `1px solid ${colors.success}30`
                }}
              >
                
              </motion.span>
            ))}
          </div>
        )}

        {/* Nutrition Info */}
        <div 
          className="mt-auto pt-3 border-t"
          style={{ borderColor: colors.border }}
        >
          <div className="grid grid-cols-4 gap-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-2 rounded-lg"
              style={{ backgroundColor: colors.muted }}
            >
              <Flame size={14} style={{ color: colors.accent }} />
              <span className="text-xs font-bold mt-1" style={{ color: colors.text }}>
                {recipe.nutrition?.calories || '0'}
              </span>
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                kcal
              </span>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-2 rounded-lg"
              style={{ backgroundColor: colors.muted }}
            >
              <Beef size={14} style={{ color: colors.primary }} />
              <span className="text-xs font-bold mt-1" style={{ color: colors.text }}>
                {recipe.nutrition?.protein || '0g'}
              </span>
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                protein
              </span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-2 rounded-lg"
              style={{ backgroundColor: colors.muted }}
            >
              <Wheat size={14} style={{ color: colors.secondary }} />
              <span className="text-xs font-bold mt-1" style={{ color: colors.text }}>
                {recipe.nutrition?.carbs || '0g'}
              </span>
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                carbs
              </span>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-2 rounded-lg"
              style={{ backgroundColor: colors.muted }}
            >
              <Droplets size={14} style={{ color: colors.accent }} />
              <span className="text-xs font-bold mt-1" style={{ color: colors.text }}>
                {recipe.nutrition?.fat || '0g'}
              </span>
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                fat
              </span>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div 
          className="flex justify-between text-xs pt-2"
          style={{ color: colors.textSecondary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>👨‍🍳 By: {recipe.chef || 'Unknown'}</span>
          <span>📍 {recipe.cuisine || 'Various'}</span>
        </motion.div>
      </div>

      {/* Glow Effect on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: `0 0 40px 10px ${colors.primary}30`
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RecipeCard;