import recipes from '../data/recipes.json';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Clock, Users, ChefHat, Flame, 
  Heart, BookOpen, Scale, Droplets, Leaf,
  Timer, TrendingUp, Share2, Printer, Bookmark
} from 'lucide-react';
import { useState, useEffect } from 'react';

const RecipeDetails = () => {
  const { colors, theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isLiked, setIsLiked] = useState(false);
  const [servings, setServings] = useState(1);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const tabVariants = {
    active: { 
      scale: 1.05,
      backgroundColor: colors.primary,
      color: 'white'
    },
    inactive: { 
      scale: 1,
      backgroundColor: colors.muted,
      color: colors.text
    }
  };

  // Load recipe
  useEffect(() => {
    const foundRecipe = recipes.find(r => r.id === id);
    setRecipe(foundRecipe);
    if (foundRecipe) {
      setServings(foundRecipe.servings);
      setTimeLeft(foundRecipe.timeMinutes * 60);
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setIsLiked(favorites.includes(foundRecipe.id));
    }
  }, [id]);

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            setIsTimerRunning(false);
            if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
              new Notification(`${recipe.title} is ready!`, {
                body: `Your ${recipe.title} should be done cooking!`,
                icon: recipe.image
              });
            }
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (!isTimerRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, recipe]);

  // Toggle like
  const handleLike = () => {
    setIsLiked(!isLiked);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updated = isLiked 
      ? favorites.filter(favId => favId !== recipe.id)
      : [...favorites, recipe.id];
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // Adjust servings
  const adjustServings = (factor) => {
    setServings(prev => Math.max(1, prev + factor));
  };

  // Share recipe
  const handleShare = async () => {
    if (navigator.share && recipe) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this delicious recipe: ${recipe.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  // Print recipe
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: colors.background }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8 rounded-2xl"
          style={{ backgroundColor: colors.surface }}
        >
          <ChefHat size={64} className="mx-auto mb-4" style={{ color: colors.primary }} />
          <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>Recipe Not Found</h2>
          <p className="mb-6" style={{ color: colors.textSecondary }}>This recipe seems to have disappeared from our cookbook!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl font-bold"
            style={{ backgroundColor: colors.primary, color: 'white' }}
          >
            Back to Recipes
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Calculate adjusted ingredients
  const adjustedIngredients = recipe.ingredients.map(ing => ({
    ...ing,
    adjustedQuantity: servings / recipe.servings * ing.quantity
  }));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Back button */}
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ x: -5 }}
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-lg"
        style={{
          backgroundColor: colors.surface,
          color: colors.text,
          border: `2px solid ${colors.border}`
        }}
      >
        <ChevronLeft size={20} />
        Back to Recipes
      </motion.button>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: colors.surface,
            border: `2px solid ${colors.border}`,
            boxShadow: `0 20px 60px ${theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`
          }}
        >
          {/* Recipe header */}
          <div className="relative">
            {/* Recipe image */}
            <motion.div
              variants={imageVariants}
              className="relative h-64 md:h-80 lg:h-96 overflow-hidden"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className="p-3 rounded-full shadow-lg backdrop-blur-sm"
                  style={{
                    backgroundColor: isLiked ? colors.primary + '40' : colors.surface + '80',
                    border: `2px solid ${isLiked ? colors.primary : colors.border}`
                  }}
                >
                  <Heart 
                    size={24} 
                    fill={isLiked ? colors.primary : 'none'}
                    style={{ color: isLiked ? colors.primary : colors.text }}
                  />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="p-3 rounded-full shadow-lg backdrop-blur-sm"
                  style={{
                    backgroundColor: colors.surface + '80',
                    border: `2px solid ${colors.border}`
                  }}
                >
                  <Share2 size={24} style={{ color: colors.text }} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrint}
                  className="p-3 rounded-full shadow-lg backdrop-blur-sm"
                  style={{
                    backgroundColor: colors.surface + '80',
                    border: `2px solid ${colors.border}`
                  }}
                >
                  <Printer size={24} style={{ color: colors.text }} />
                </motion.button>
              </div>
              
              {/* Recipe title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {recipe.title}
                </motion.h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-2xl"
                      style={{ color: i < Math.floor(recipe.rating) ? colors.accent : colors.textSecondary }}
                    >
                      ★
                    </motion.span>
                  ))}
                  <span className="text-white font-bold ml-2">{recipe.rating}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative -mt-8 mx-6 md:mx-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <ChefHat size={24} />, label: 'Difficulty', value: recipe.difficulty, color: colors.primary },
                  { icon: <Clock size={24} />, label: 'Time', value: `${recipe.timeMinutes} min`, color: colors.accent },
                  { icon: <Users size={24} />, label: 'Servings', value: servings, color: colors.secondary },
                  { icon: <Flame size={24} />, label: 'Calories', value: `${recipe.nutrition.calories} kcal`, color: colors.error },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="p-4 rounded-xl shadow-lg flex flex-col items-center"
                    style={{ backgroundColor: colors.surface }}
                  >
                    <div className="p-2 rounded-full mb-2" style={{ backgroundColor: stat.color + '20' }}>
                      <div style={{ color: stat.color }}>{stat.icon}</div>
                    </div>
                    <span className="text-sm" style={{ color: colors.textSecondary }}>{stat.label}</span>
                    <span className="text-xl font-bold" style={{ color: colors.text }}>{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main content area */}
          <div className="p-6 md:p-8">
            {/* Servings adjustment */}
            <div className="flex items-center justify-between mb-8 p-4 rounded-xl" style={{ backgroundColor: colors.muted }}>
              <span style={{ color: colors.text }} className="font-bold">Adjust Servings:</span>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustServings(-1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.background, color: colors.text }}
                >
                  -
                </motion.button>
                <span className="text-2xl font-bold" style={{ color: colors.text }}>{servings}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustServings(1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.background, color: colors.text }}
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {[
                { id: 'ingredients', label: 'Ingredients', icon: <Scale size={20} /> },
                { id: 'steps', label: 'Steps', icon: <BookOpen size={20} /> },
                { id: 'nutrition', label: 'Nutrition', icon: <TrendingUp size={20} /> },
                { id: 'tags', label: 'Tags', icon: <Bookmark size={20} /> },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  variants={tabVariants}
                  animate={activeTab === tab.id ? 'active' : 'inactive'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap"
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Ingredients tab */}
                {activeTab === 'ingredients' && (
                  <div className="space-y-4">
                    {adjustedIngredients.map((ingredient, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-xl hover:shadow-md transition-shadow"
                        style={{ backgroundColor: colors.muted }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                          <span style={{ color: colors.text }} className="font-medium">
                            {ingredient.name}
                          </span>
                        </div>
                        <span style={{ color: colors.textSecondary }} className="font-bold">
                          {ingredient.adjustedQuantity.toFixed(1)} {ingredient.unit || ''}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Steps tab */}
                {activeTab === 'steps' && (
                  <div className="space-y-6">
                    {recipe.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 p-4 rounded-xl"
                        style={{ backgroundColor: colors.muted }}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                            style={{ backgroundColor: colors.primary, color: 'white' }}
                          >
                            {index + 1}
                          </div>
                        </div>
                        <p style={{ color: colors.text }} className="flex-1">
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Nutrition tab */}
                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(recipe.nutrition).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-4 rounded-xl text-center"
                        style={{ backgroundColor: colors.muted }}
                      >
                        <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                        <div className="text-2xl font-bold" style={{ color: colors.text }}>
                          {value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Tags tab */}
                {activeTab === 'tags' && (
                  <div className="space-y-6">
                    {/* Dietary tags */}
                    {recipe.dietary && recipe.dietary.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: colors.text }}>
                          <Leaf size={20} /> Dietary
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {recipe.dietary.map((diet, index) => (
                            <motion.span
                              key={index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.1 }}
                              className="px-4 py-2 rounded-full font-medium"
                              style={{
                                backgroundColor: colors.success + '20',
                                color: colors.success,
                                border: `1px solid ${colors.success}40`
                              }}
                            >
                              {diet}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recipe tags */}
                    {recipe.tags && recipe.tags.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold mb-3" style={{ color: colors.text }}>Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {recipe.tags.map((tag, index) => (
                            <motion.span
                              key={index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.1 }}
                              className="px-4 py-2 rounded-full font-medium"
                              style={{
                                backgroundColor: colors.primary + '20',
                                color: colors.primary,
                                border: `1px solid ${colors.primary}40`
                              }}
                            >
                              #{tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Timer section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-6 rounded-xl"
              style={{
                backgroundColor: colors.primary + '10',
                border: `2px dashed ${colors.primary}40`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Timer size={24} style={{ color: colors.primary }} />
                  <div>
                    <h3 className="font-bold" style={{ color: colors.text }}>Cooking Timer</h3>
                    <div className="text-3xl font-mono font-bold" style={{ color: colors.primary }}>
                      {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg font-bold"
                    style={{
                      backgroundColor: isTimerRunning ? colors.error : colors.primary,
                      color: 'white'
                    }}
                    onClick={() => {
                      if (isTimerRunning) {
                        setIsTimerRunning(false);
                      } else {
                        setIsTimerRunning(true);
                      }
                    }}
                  >
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg font-bold"
                    style={{
                      backgroundColor: colors.muted,
                      color: colors.text
                    }}
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimeLeft(recipe.timeMinutes * 60);
                    }}
                  >
                    Reset
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default RecipeDetails;