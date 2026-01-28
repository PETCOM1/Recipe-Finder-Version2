import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Clock, Flame, X, CheckCircle2, 
  Mic, MicOff, Volume2, Timer as TimerIcon 
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import recipes from '../data/recipes.json';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Sub-components (Keeps Main Component Lean) ---
const VoiceVisualizer = ({ isListening, color }) => (
  <div className="flex items-center gap-1.5 h-10 px-4 bg-black/5 dark:bg-white/5 rounded-full transition-all">
    {isListening ? (
      <div className="flex items-center gap-1">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [4, 20, 4] }}
            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.08 }}
            className="w-1 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    ) : (
      <MicOff size={16} className="opacity-30" />
    )}
  </div>
);

const RecipeDetails = () => {
  const { colors } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [recipe, setRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(1);
  const [isCookMode, setIsCookMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isListening, setIsListening] = useState(false);

  // Refs for Speech and WakeLock
  const recognitionRef = useRef(null);
  const wakeLockRef = useRef(null);

  // 1. Load Data
  useEffect(() => {
    const foundRecipe = recipes.find(r => r.id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setServings(foundRecipe.servings);
    }
  }, [id]);

  // 2. Speech Engine (TTS)
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }, []);

  // 3. Wake Lock Logic (Prevents screen sleep during cooking)
  const toggleWakeLock = async (enable) => {
    if ('wakeLock' in navigator) {
      try {
        if (enable) {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
        } else {
          wakeLockRef.current?.release();
          wakeLockRef.current = null;
        }
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    }
  };

  // 4. Voice Commands (STT)
  const initSpeech = useCallback(() => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => isCookMode && recognition.start(); // Keep alive

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      
      if (transcript.includes('next')) handleNextStep();
      if (transcript.includes('back') || transcript.includes('previous')) handlePrevStep();
      if (transcript.includes('repeat')) speak(recipe.steps[currentStep]);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isCookMode, recipe, currentStep, speak]);

  useEffect(() => {
    if (isCookMode) {
      initSpeech();
      toggleWakeLock(true);
    } else {
      recognitionRef.current?.stop();
      toggleWakeLock(false);
    }
    return () => recognitionRef.current?.stop();
  }, [isCookMode, initSpeech]);

  // 5. Handlers
  const handleNextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      speak(`Step ${currentStep + 2}`);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      speak(`Step ${currentStep}`);
    }
  };

  // 6. Memoized Ingredient Calculation
  const scaledIngredients = useMemo(() => {
    if (!recipe) return [];
    return recipe.ingredients.map(ing => ({
      ...ing,
      scaledQty: (servings / recipe.servings * ing.quantity).toFixed(1)
    }));
  }, [recipe, servings]);

  if (!recipe) return <div className="h-screen flex items-center justify-center">Loading Chef...</div>;

  return (
    <motion.div className="min-h-screen" style={{ backgroundColor: colors.background, color: colors.text }}>
      <Header />
      
      <button 
        onClick={() => navigate('/')}
        className="fixed top-24 left-6 z-40 p-3 rounded-xl shadow-lg backdrop-blur-md border transition-all hover:bg-primary hover:text-white"
        style={{ backgroundColor: `${colors.surface}cc`, borderColor: colors.border }}
      >
        <ChevronLeft size={24} />
      </button>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Visuals */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img src={recipe.image} alt={recipe.title} className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h1 className="text-5xl font-black text-white mb-4 tracking-tight">{recipe.title}</h1>
                <div className="flex gap-4">
                  <Badge icon={<Clock size={16}/>} text={`${recipe.timeMinutes}m`} />
                  <Badge icon={<Flame size={16}/>} text={`${recipe.nutrition.calories} kcal`} color="orange" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Details */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-[2rem] border h-full flex flex-col" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
              <TabSwitcher active={activeTab} setActive={setActiveTab} colors={colors} />

              <div className="flex-grow mt-8">
                {activeTab === 'ingredients' ? (
                  <ul className="space-y-3">
                    {scaledIngredients.map((ing, i) => (
                      <li key={i} className="flex justify-between p-4 rounded-xl bg-black/5 dark:bg-white/5 items-center">
                        <span className="font-semibold flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-primary" /> {ing.name}
                        </span>
                        <span className="opacity-60">{ing.scaledQty} {ing.unit}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-6">
                    {recipe.steps.slice(0, 3).map((step, i) => (
                      <div key={i} className="flex gap-4 opacity-50">
                        <span className="text-2xl font-black italic">0{i+1}</span>
                        <p className="text-sm line-clamp-2">{step}</p>
                      </div>
                    ))}
                    <p className="text-center text-xs opacity-40 italic">Start Cook Mode for full interactive steps</p>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsCookMode(true)}
                className="w-full mt-8 py-5 rounded-2xl font-black uppercase tracking-widest transition-all hover:brightness-110 active:scale-[0.98]"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                Launch Cook Mode
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- Fullscreen Cook Mode Overlay --- */}
      <AnimatePresence>
        {isCookMode && (
          <CookModeOverlay 
            recipe={recipe}
            currentStep={currentStep}
            isListening={isListening}
            colors={colors}
            onClose={() => setIsCookMode(false)}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}
      </AnimatePresence>
      <Footer />
    </motion.div>
  );
};

// --- Extracted UI Helper Components ---
const Badge = ({ icon, text, color = 'white' }) => (
  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 text-sm font-bold">
    <span style={{ color: color !== 'white' ? color : 'inherit' }}>{icon}</span> {text}
  </div>
);

const TabSwitcher = ({ active, setActive, colors }) => (
  <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-2xl">
    {['ingredients', 'steps'].map(tab => (
      <button
        key={tab}
        onClick={() => setActive(tab)}
        className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${active === tab ? 'shadow-md' : ''}`}
        style={{ 
          backgroundColor: active === tab ? colors.primary : 'transparent',
          color: active === tab ? 'white' : colors.text
        }}
      >
        {tab}
      </button>
    ))}
  </div>
);

const CookModeOverlay = ({ recipe, currentStep, isListening, colors, onClose, onNext, onPrev }) => (
  <motion.div 
    initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    className="fixed inset-0 z-[100] flex flex-col p-8 md:p-16"
    style={{ backgroundColor: colors.background }}
  >
    <div className="flex justify-between items-center">
      <VoiceVisualizer isListening={isListening} color={colors.primary} />
      <div className="flex-1 px-12">
        <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full" 
            animate={{ width: `${((currentStep + 1) / recipe.steps.length) * 100}%` }}
            style={{ backgroundColor: colors.primary }}
          />
        </div>
      </div>
      <button onClick={onClose} className="p-4 rounded-full hover:bg-red-500 hover:text-white transition-all">
        <X size={32} />
      </button>
    </div>

    <div className="flex-grow flex flex-col items-center justify-center text-center">
      <div className="relative">
        <span className="text-[15rem] font-black italic opacity-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {currentStep + 1}
        </span>
        <AnimatePresence mode="wait">
          <motion.h2 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl relative z-10 leading-tight"
          >
            {recipe.steps[currentStep]}
          </motion.h2>
        </AnimatePresence>
      </div>
    </div>

    <div className="flex gap-6">
      <button 
        disabled={currentStep === 0}
        onClick={onPrev}
        className="px-10 py-8 rounded-[2rem] border-2 font-bold uppercase tracking-widest disabled:opacity-0 transition-all"
        style={{ borderColor: colors.border }}
      >
        Back
      </button>
      <button 
        onClick={onNext}
        className="flex-1 py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-xl text-white"
        style={{ backgroundColor: colors.primary }}
      >
        {currentStep === recipe.steps.length - 1 ? 'Complete Recipe' : 'Next Step'}
      </button>
    </div>
  </motion.div>
);

export default RecipeDetails;