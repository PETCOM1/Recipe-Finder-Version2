import Header from "../components/Header";
import Footer from "../components/Footer";
import FavoriteContent from "../contexts/FavourateContect";
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Heart, ChefHat, Stars, Flame } from 'lucide-react';

const Favorite = () => {
  const { colors } = useTheme();

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.6 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen relative"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <Header />
      
      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -50, 0],
              x: [0, i % 2 === 0 ? 30 : -30, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full blur-[100px]"
            style={{
              width: '400px',
              height: '400px',
              left: `${i * 25}%`,
              top: `${i * 20}%`,
              backgroundColor: colors.primary,
            }}
          />
        ))}
      </div>

      {/* Boutique Hero Header */}
      <section className="relative z-10 pt-16 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-current opacity-30"
          >
            <Stars size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Your Curated Selection</span>
          </motion.div>

          <h1 
            className="text-5xl md:text-7xl font-bold tracking-tighter lowercase italic"
            style={{ color: colors.text }}
          >
            the <span style={{ color: colors.primary }}>tasting</span> vault.
          </h1>

          <div className="flex justify-center gap-8 py-6">
             {/* Dynamic Stats Section */}
             {[
               { icon: <Heart size={18} />, label: "Saved" },
               { icon: <ChefHat size={18} />, label: "Kitchen Ready" },
               { icon: <Flame size={18} />, label: "Hot Picks" }
             ].map((stat, idx) => (
               <div key={idx} className="flex flex-col items-center gap-1">
                 <div style={{ color: colors.primary }}>{stat.icon}</div>
                 <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">{stat.label}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-4 pb-20">
        <FavoriteContent />
      </main>

      <Footer />
    </motion.div>
  );
};

export default Favorite;