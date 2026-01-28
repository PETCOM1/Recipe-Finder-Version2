import { Heart, Clock, Users, Flame, Beef, Wheat, Droplets, ArrowRight, Leaf } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const RecipeCard = ({ recipe, handleOnClickOfRecipeCard, toggleLike }) => {
  const { colors, theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const uniqueTags = recipe.tags ? [...new Set(recipe.tags)] : [];

  // Optimized smooth curve for Velish
  const softCurve = [0.23, 1, 0.32, 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => handleOnClickOfRecipeCard(recipe.id)}
      className="group relative rounded-[2.5rem] overflow-hidden flex flex-col w-full max-w-[340px] mx-auto cursor-pointer transition-all duration-500"
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}40`,
        boxShadow: isHovered 
          ? `0 30px 60px -12px ${colors.primary}20` 
          : `0 10px 30px -15px rgba(0,0,0,0.1)`
      }}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.8, ease: softCurve }}
          src={recipe.image.startsWith('.') ? recipe.image.replace('./', '/') : recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Modern Glass Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Like Button - Boutique Style */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); toggleLike(recipe.id); }}
          className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
          style={{ 
            backgroundColor: recipe.liked ? colors.primary : 'rgba(255,255,255,0.2)',
            color: recipe.liked ? '#fff' : '#fff',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          <Heart size={18} fill={recipe.liked ? "currentColor" : "none"} strokeWidth={2.5} />
        </motion.button>

        {/* Floating Difficulty Badge */}
        <div 
          className="absolute top-5 left-5 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/30 text-[10px] font-black uppercase tracking-widest text-white shadow-xl"
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
        >
          {recipe.difficulty}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: colors.primary }}>
            <Leaf size={12} />
            {recipe.cuisine || 'Gourmet'}
          </div>
          <h3 className="text-xl font-bold tracking-tight lowercase italic" style={{ color: colors.text }}>
            {recipe.title}<span style={{ color: colors.primary }}>.</span>
          </h3>
        </div>

        {/* Quick Stats Grid */}
        <div className="flex items-center gap-6 py-2 border-y" style={{ borderColor: `${colors.border}20` }}>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter" style={{ color: colors.text }}>Time</span>
            <span className="text-sm font-bold" style={{ color: colors.text }}>{recipe.timeMinutes}m</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter" style={{ color: colors.text }}>Rating</span>
            <span className="text-sm font-bold" style={{ color: colors.text }}>★ {recipe.rating}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter" style={{ color: colors.text }}>Calories</span>
            <span className="text-sm font-bold" style={{ color: colors.text }}>{recipe.nutrition?.calories}</span>
          </div>
        </div>

        {/* Nutrition Pills - Clean Minimalist */}
        <div className="flex gap-2 overflow-hidden pt-2">
          {['protein', 'carbs', 'fat'].map((key) => (
            <div 
              key={key}
              className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase"
              style={{ backgroundColor: `${colors.muted}60`, color: colors.text }}
            >
              {recipe.nutrition?.[key]} {key.slice(0, 1)}
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-[11px] font-medium opacity-50 italic" style={{ color: colors.text }}>
            by {recipe.chef || 'Velish Studio'}
          </span>
          <motion.div 
            animate={{ x: isHovered ? 5 : 0 }}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"
            style={{ color: colors.primary }}
          >
            Recipe <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Accent Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-1.5 origin-left"
        style={{ backgroundColor: colors.primary }}
      />
    </motion.div>
  );
};

export default RecipeCard;