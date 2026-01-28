import { Search, Clock, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ handleSearchChange, searchTerm, handleMaxTimeChange, maxTime }) => {
  const { colors, theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const softCurve = [0.23, 1, 0.32, 1];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: softCurve }}
      className="w-full max-w-3xl mx-auto my-12 px-4"
    >
      {/* Editorial Header */}
      <div className="text-center mb-10 space-y-2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2"
          style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
        >
          <Sparkles size={12} /> Curated for you
        </motion.div>
        <h2 className="text-4xl font-bold tracking-tighter lowercase italic" style={{ color: colors.text }}>
          what's on the <span style={{ color: colors.primary }}>menu?</span>
        </h2>
      </div>

      {/* Modern Search Input Container */}
      <div className="relative group">
        <motion.div
          animate={{ 
            scale: isFocused ? 1.01 : 1,
            y: isFocused ? -2 : 0 
          }}
          transition={{ duration: 0.4, ease: softCurve }}
          className="relative flex items-center p-1 rounded-[2rem] transition-all duration-500 shadow-2xl"
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${isFocused ? colors.primary + '40' : colors.border + '40'}`,
            boxShadow: isFocused 
              ? `0 20px 40px -10px ${colors.primary}20` 
              : `0 10px 30px -15px rgba(0,0,0,0.1)`
          }}
        >
          <div className="pl-6" style={{ color: isFocused ? colors.primary : colors.text + '40' }}>
            <Search size={22} strokeWidth={2.5} />
          </div>
          
          <input
            type="text"
            placeholder="Search ingredients, cuisines, or vibes..."
            className="w-full px-4 py-4 bg-transparent focus:outline-none text-lg font-medium tracking-tight placeholder:italic"
            style={{ color: colors.text }}
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 pr-2">
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={() => handleSearchChange({ target: { value: '' } })}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: colors.text + '40' }}
                >
                  <X size={20} />
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: showFilters ? colors.primary : 'transparent',
                color: showFilters ? '#fff' : colors.text
              }}
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Glassmorphism Filter Tray */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: softCurve }}
            className="overflow-hidden mt-4"
          >
            <div 
              className="p-8 rounded-[2rem] border backdrop-blur-xl"
              style={{ 
                backgroundColor: `${colors.surface}80`, 
                borderColor: `${colors.border}40` 
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-black uppercase tracking-widest opacity-40">
                      Prep Time Window
                    </label>
                    <span className="text-xl font-serif italic" style={{ color: colors.primary }}>
                      {maxTime || 60} <span className="text-sm not-italic opacity-60">min</span>
                    </span>
                  </div>
                  
                  <input
                    type="range"
                    min="5"
                    max="180"
                    step="5"
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-current"
                    style={{ 
                      backgroundColor: `${colors.primary}20`,
                      color: colors.primary 
                    }}
                    value={maxTime || 60}
                    onChange={handleMaxTimeChange}
                  />
                </div>

                <div className="flex flex-wrap gap-2 md:max-w-[240px]">
                  {[15, 30, 45, 'reset'].map((time) => (
                    <button
                      key={time}
                      onClick={() => time === 'reset' ? handleMaxTimeChange({ target: { value: '' } }) : handleMaxTimeChange({ target: { value: time.toString() } })}
                      className="px-4 py-2 rounded-full text-xs font-bold border transition-all hover:italic"
                      style={{ 
                        borderColor: maxTime === time.toString() ? colors.primary : `${colors.border}40`,
                        backgroundColor: maxTime === time.toString() ? colors.primary : 'transparent',
                        color: maxTime === time.toString() ? '#fff' : colors.text
                      }}
                    >
                      {time === 'reset' ? 'Clear' : `${time}m`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Search Status */}
      <div className="mt-6 flex justify-center">
        <AnimatePresence mode="wait">
          {searchTerm.length > 0 && searchTerm.length < 3 ? (
            <motion.p
              key="tip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.2em]"
            >
              Keep typing for precision...
            </motion.p>
          ) : (
            <motion.div 
              key="dot"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex gap-1"
            >
              {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.text }} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default SearchBar;