import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { ChefHat, Home, Utensils, Search, Wind } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NoPage = () => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen relative flex flex-col"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <Header />
      
      {/* Subtle Atmospheric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
            style={{ backgroundColor: colors.primary }}
         />
      </div>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-20 text-center">
        
        {/* The 404 Visual */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <h1 
            className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter italic opacity-10"
            style={{ color: colors.text }}
          >
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             >
                <ChefHat size={120} strokeWidth={1} style={{ color: colors.primary }} />
             </motion.div>
          </div>
        </motion.div>

        {/* Messaging */}
        <motion.div variants={itemVariants} className="max-w-xl space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter lowercase italic">
            this recipe <span style={{ color: colors.primary }}>evaporated.</span>
          </h2>
          <p className="text-sm md:text-base opacity-60 leading-relaxed uppercase tracking-[0.2em] font-bold">
            The page you're looking for was whisked away into another dimension.
          </p>
        </motion.div>

        {/* Curated Alternatives */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-12"
        >
          {[
            { label: 'Explore All', path: '/', icon: <Utensils size={18} /> },
            { label: 'The Vault', path: '/favorites', icon: <ChefHat size={18} /> },
            { label: 'New Search', path: '/', icon: <Search size={18} /> },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.path)}
              className="group flex flex-col items-center gap-3 p-8 rounded-[2rem] border transition-all hover:scale-105"
              style={{ 
                backgroundColor: `${colors.surface}80`, 
                borderColor: `${colors.border}40`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div 
                className="p-4 rounded-full transition-colors group-hover:bg-white/10"
                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
              >
                {link.icon}
              </div>
              <span className="text-xs font-black uppercase tracking-widest">{link.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          className="mt-16 px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 shadow-xl transition-all"
          style={{ backgroundColor: colors.primary, color: 'white' }}
        >
          <Home size={16} />
          Return to Kitchen
        </motion.button>

      </main>

      <Footer />
    </motion.div>
  );
};

export default NoPage;