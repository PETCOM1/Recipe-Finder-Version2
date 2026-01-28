import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Clock, Users, ChefHat, Flame, Heart, 
  BookOpen, Scale, TrendingUp, Share2, Printer, 
  Bookmark, Timer, Mic, MicOff, X, ChevronRight, Leaf
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import recipes from '../data/recipes.json';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RecipeDetails = () => {
  const { colors, theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [recipe, setRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isLiked, setIsLiked] = useState(false);
  const [servings, setServings] = useState(1);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Cook Mode State
  const [isCookMode, setIsCookMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isListening, setIsListening] = useState(false);

  // Load Data
  useEffect(() => {
    const foundRecipe = recipes.find(r => r.id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setServings(foundRecipe.servings);
      setTimeLeft(foundRecipe.timeMinutes * 60);
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setIsLiked(favorites.includes(foundRecipe.id));
    }
  }, [id]);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      alert(`${recipe?.title} is ready!`);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, recipe]);

  // Voice Command Logic
  useEffect(() => {
    let recognition = null;
    if (isCookMode && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        if (transcript.includes('next')) handleNextStep();
        if (transcript.includes('back') || transcript.includes('previous')) handlePrevStep();
        if (transcript.includes('timer')) setIsTimerRunning(true);
      };

      recognition.start();
    }
    return () => recognition?.stop();
  }, [isCookMode]);

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, recipe.steps.length - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  if (!recipe) return null;

  const adjustedIngredients = recipe.ingredients.map(ing => ({
    ...ing,
    adjustedQuantity: (servings / recipe.servings) * ing.quantity
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <Header />
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="fixed top-24 left-6 z-40 p-3 rounded-full shadow-xl backdrop-blur-md border transition-transform hover:scale-110"
        style={{ backgroundColor: `${colors.surface}cc`, borderColor: colors.border }}
      >
        <ChevronLeft size={24} />
      </button>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image & Stats */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              layoutId={`image-${recipe.id}`}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h1 className="text-5xl font-black italic tracking-tighter mb-4">{recipe.title}</h1>
                <div className="flex gap-4">
                  <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold">
                    <Clock size={16} /> {recipe.timeMinutes}m
                  </span>
                  <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold">
                    <Flame size={16} /> {recipe.nutrition.calories} kcal
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Difficulty', val: recipe.difficulty, icon: <ChefHat />, col: colors.primary },
                { label: 'Rating', val: recipe.rating, icon: <Bookmark />, col: colors.accent },
                { label: 'Serves', val: servings, icon: <Users />, col: colors.secondary },
                { label: 'Health', val: '92%', icon: <Leaf />, col: colors.success },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-3xl border flex flex-col items-center text-center space-y-1" style={{ borderColor: `${colors.border}40`, backgroundColor: `${colors.surface}40` }}>
                  <div style={{ color: stat.col }}>{stat.icon}</div>
                  <span className="text-[10px] uppercase font-black opacity-40 tracking-widest">{stat.label}</span>
                  <span className="font-bold">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Ingredients & Tabs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex gap-2 p-1 rounded-2xl border" style={{ borderColor: colors.border, backgroundColor: `${colors.surface}40` }}>
              {['ingredients', 'steps', 'nutrition'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                  style={{ 
                    backgroundColor: activeTab === tab ? colors.primary : 'transparent',
                    color: activeTab === tab ? 'white' : colors.text
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="min-h-[400px]"
              >
                {activeTab === 'ingredients' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black italic">The Goods</h3>
                      <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/5 rounded-full px-3 py-1">
                        <button onClick={() => setServings(s => Math.max(1, s-1))}>-</button>
                        <span className="font-bold text-sm">{servings}</span>
                        <button onClick={() => setServings(s => s+1)}>+</button>
                      </div>
                    </div>
                    {adjustedIngredients.map((ing, i) => (
                      <div key={i} className="flex justify-between p-4 rounded-2xl border border-transparent hover:border-current transition-all" style={{ backgroundColor: `${colors.surface}80` }}>
                        <span className="font-medium">{ing.name}</span>
                        <span className="font-black opacity-50">{ing.adjustedQuantity.toFixed(1)} {ing.unit}</span>
                      </div>
                    ))}
                    <button 
                      onClick={() => setIsCookMode(true)}
                      className="w-full mt-8 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] shadow-xl transition-transform hover:scale-[1.02]"
                      style={{ backgroundColor: colors.primary, color: 'white' }}
                    >
                      Start Cooking Mode
                    </button>
                  </div>
                )}

                {activeTab === 'steps' && (
                  <div className="space-y-6">
                    {recipe.steps.map((step, i) => (
                      <div key={i} className="flex gap-6">
                        <span className="text-4xl font-black opacity-10 italic">{i + 1}</span>
                        <p className="text-sm leading-relaxed pt-2">{step}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* IMMERSIVE COOK MODE OVERLAY */}
      <AnimatePresence>
        {isCookMode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col p-8 md:p-16"
            style={{ backgroundColor: colors.background }}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {isListening && (
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity }} className="w-2 h-2 rounded-full bg-red-500" />
                  )}
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                    Step {currentStep + 1} of {recipe.steps.length}
                  </span>
                </div>
                <h2 className="text-2xl font-bold italic">{recipe.title}</h2>
              </div>
              <button onClick={() => setIsCookMode(false)} className="p-4 rounded-full border border-gray-200 dark:border-white/10 hover:bg-red-500 hover:text-white transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow flex items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currentStep}
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                  className="text-4xl md:text-6xl font-black tracking-tighter leading-tight max-w-5xl italic"
                >
                  {recipe.steps[currentStep]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex gap-6 items-center">
              <button disabled={currentStep === 0} onClick={handlePrevStep} className="flex-1 py-10 rounded-[3rem] border-2 font-black uppercase text-xs tracking-widest disabled:opacity-10 transition-all hover:bg-current/5">Prev</button>
              <button 
                onClick={currentStep === recipe.steps.length - 1 ? () => setIsCookMode(false) : handleNextStep}
                className="flex-[2] py-10 rounded-[3rem] font-black uppercase text-xs tracking-widest shadow-2xl transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                {currentStep === recipe.steps.length - 1 ? 'Complete Recipe' : 'Next Step'}
              </button>
            </div>
            <div className="mt-8 text-center opacity-30 text-[10px] font-bold uppercase tracking-[0.4em]">
              Voice Commands Active: "Next" • "Back" • "Timer"
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
};

export default RecipeDetails;