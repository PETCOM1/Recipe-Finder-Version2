import { Search, Clock, X, Filter } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ handleSearchChange, searchTerm, handleMaxTimeChange, maxTime }) => {
  const { colors, theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const inputVariants = {
    unfocused: { scale: 1 },
    focused: {
      scale: 1.02,
      boxShadow: `0 0 0 3px ${colors.primary}40`,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const filterVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      y: -10
    },
    visible: {
      height: "auto",
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const clearButtonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200
      }
    }
  };

  const handleClear = () => {
    handleSearchChange({ target: { value: '' } });
    handleMaxTimeChange({ target: { value: '' } });
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto my-6 p-6 rounded-2xl shadow-lg"
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 10px 40px ${theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.h2 
          className="text-2xl font-bold mb-2"
          style={{ color: colors.primary }}
          whileHover={{ scale: 1.02 }}
        >
          Find Your Perfect Recipe
        </motion.h2>
        <motion.p 
          className="text-lg"
          style={{ color: colors.textSecondary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Discover delicious recipes tailored to your taste
        </motion.p>
      </div>

      {/* Main Search */}
      <div className="relative mb-4">
        <motion.div
          variants={inputVariants}
          animate={isFocused ? "focused" : "unfocused"}
          className="flex items-center"
        >
          <div 
            className="absolute left-4 z-10"
            style={{ color: colors.textSecondary }}
          >
            <Search size={20} />
          </div>
          
          <input
            type="text"
            placeholder="Search for recipes, ingredients, or cuisines..."
            className="w-full pl-12 pr-12 py-3 rounded-xl border-2 focus:outline-none text-lg transition-all duration-300"
            style={{
              backgroundColor: colors.background,
              borderColor: isFocused ? colors.primary : colors.border,
              color: colors.text
            }}
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          {/* Clear Button (only when there's input) */}
          <AnimatePresence>
            {(searchTerm || maxTime) && (
              <motion.button
                variants={clearButtonVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClear}
                className="absolute right-4 p-1.5 rounded-full"
                style={{
                  backgroundColor: colors.muted,
                  color: colors.textSecondary
                }}
                aria-label="Clear search"
              >
                <X size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-center mb-4">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors"
          style={{
            backgroundColor: showFilters ? colors.primary : colors.muted,
            color: showFilters ? 'white' : colors.text
          }}
        >
          <Filter size={18} />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </motion.button>
      </div>

      {/* Filter Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <div 
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: colors.muted,
                borderColor: colors.border
              }}
            >
              {/* Time Filter */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={18} style={{ color: colors.textSecondary }} />
                  <label 
                    className="font-medium"
                    style={{ color: colors.text }}
                  >
                    Maximum Cooking Time
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="240"
                    step="5"
                    className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      backgroundColor: colors.border,
                      accentColor: colors.primary
                    }}
                    value={maxTime || 60}
                    onChange={handleMaxTimeChange}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Minutes"
                      className="w-20 px-3 py-1.5 rounded-lg border text-center"
                      style={{
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        color: colors.text
                      }}
                      value={maxTime}
                      onChange={handleMaxTimeChange}
                    />
                    <span style={{ color: colors.textSecondary }}>min</span>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span style={{ color: colors.textSecondary }}>5 min</span>
                  <span style={{ color: colors.textSecondary }}>240 min</span>
                </div>
              </div>

              {/* Quick Time Presets */}
              <div className="flex flex-wrap gap-2">
                {[15, 30, 45, 60, 90].map((time) => (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleMaxTimeChange({ target: { value: time.toString() } })}
                    className="px-3 py-1.5 rounded-lg font-medium transition-colors"
                    style={{
                      backgroundColor: maxTime === time.toString() 
                        ? colors.primary 
                        : colors.background,
                      color: maxTime === time.toString() ? 'white' : colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    {time} min
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Stats */}
      <motion.div 
        className="flex justify-between items-center mt-4 pt-4 border-t"
        style={{ borderColor: colors.border }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: colors.accent }}
          />
          <span style={{ color: colors.textSecondary }} className="text-sm">
            {searchTerm ? `Searching for: "${searchTerm}"` : 'Ready to search...'}
          </span>
        </div>
        
        {/* Character Count */}
        <AnimatePresence>
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{ color: colors.textSecondary }}
              className="text-sm"
            >
              {searchTerm.length} character{searchTerm.length !== 1 ? 's' : ''}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {searchTerm.length > 0 && searchTerm.length < 3 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 p-3 rounded-lg"
            style={{
              backgroundColor: colors.accent + '10',
              border: `1px solid ${colors.accent}20`
            }}
          >
            <p className="text-sm flex items-center gap-2" style={{ color: colors.textSecondary }}>
              <span>💡</span>
              Try typing at least 3 characters for better results
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default SearchBar;