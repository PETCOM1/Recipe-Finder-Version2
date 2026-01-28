import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { X, Hash } from 'lucide-react';

const TagChip = ({ 
  label, 
  onDelete, 
  onClick, 
  active = false, 
  icon: Icon,
  variant = 'default' 
}) => {
  const { colors } = useTheme();

  // Color logic based on Velish brand palette
  const getStyles = () => {
    if (active) {
      return {
        background: colors.primary,
        color: '#fff',
        border: `1px solid ${colors.primary}`,
      };
    }
    if (variant === 'outline') {
      return {
        background: 'transparent',
        color: colors.text,
        border: `1px solid ${colors.border}`,
      };
    }
    // Default "Muted" boutique look
    return {
      background: `${colors.muted}60`,
      color: colors.text,
      border: `1px solid transparent`,
    };
  };

  const styles = getStyles();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        y: -2, 
        backgroundColor: active ? colors.primary : `${colors.muted}90`,
        borderColor: active ? colors.primary : colors.primary + '40'
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
        text-xs font-bold tracking-tight cursor-pointer 
        transition-colors duration-300 select-none
      `}
      style={styles}
    >
      {/* Optional Leading Icon or Default Hash */}
      {Icon ? (
        <Icon size={12} strokeWidth={3} />
      ) : (
        <Hash size={10} className="opacity-40" />
      )}

      <span className="lowercase italic">{label}</span>

      {/* Delete Action for Filter Bars */}
      {onDelete && (
        <motion.button
          whileHover={{ rotate: 90, color: colors.accent }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="ml-1 p-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <X size={12} strokeWidth={3} />
        </motion.button>
      )}
    </motion.div>
  );
};

export default TagChip;