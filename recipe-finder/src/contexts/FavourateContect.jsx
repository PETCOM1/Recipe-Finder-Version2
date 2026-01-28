import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, Utensils } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import recipes from '../data/recipes.json';
import ThemeContext from './ThemeContext';

const FavoriteContent = () => {
    const { colors } = useContext(ThemeContext);
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const filteredFavorites = recipes.filter((recipe) => favorites.includes(recipe.id));

    // Pagination logic
    const totalPages = Math.ceil(filteredFavorites.length / recipesPerPage);
    const startIndex = (currentPage - 1) * recipesPerPage;
    const currentRecipes = filteredFavorites.slice(startIndex, startIndex + recipesPerPage);

    const handlePageChange = (page) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleToggleLike = (id) => {
      const updatedFavorites = favorites.filter(favId => favId !== id);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      if (currentRecipes.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    
    const handleOnClickOfRecipeCard = (recipeId) => {
      navigate(`/recipe/${recipeId}`);
    }

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pb-20 px-4"
      >
        {/* Header Section */}
        <header className="max-w-7xl mx-auto pt-12 pb-8 flex flex-col items-center text-center">
            <Link 
                to="/" 
                className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: colors.text }}
            >
                <ArrowLeft size={14} /> Back to Studio
            </Link>
            <h1 className="text-5xl font-bold tracking-tighter lowercase italic" style={{ color: colors.text }}>
                your <span style={{ color: colors.primary }}>favorites.</span>
            </h1>
            <p className="mt-2 text-sm opacity-60 italic" style={{ color: colors.text }}>
                A curated collection of your most-loved flavors.
            </p>
        </header>

        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredFavorites.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 px-6 rounded-[3rem] border-2 border-dashed"
                style={{ borderColor: `${colors.border}40` }}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${colors.primary}15` }}>
                  <Heart size={32} className="text-red-400" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-bold lowercase italic mb-2" style={{ color: colors.text }}>The vault is empty.</h3>
                <p className="max-w-xs text-center text-sm opacity-60 mb-8" style={{ color: colors.text }}>
                  Browse our collection and save the recipes that inspire your inner chef.
                </p>
                <Link 
                  to="/" 
                  className="group flex items-center gap-3 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all"
                  style={{ backgroundColor: colors.primary, color: 'white' }}
                >
                  <Utensils size={16} /> Explore Recipes
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
              >
                <AnimatePresence>
                  {currentRecipes.map((recipe) => (
                    <motion.div 
                        key={recipe.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                    >
                        <RecipeCard 
                            recipe={{ ...recipe, liked: true }}
                            toggleLike={handleToggleLike}
                            handleOnClickOfRecipeCard={handleOnClickOfRecipeCard}
                        />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Boutique Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-20">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-full flex items-center justify-center border transition-all disabled:opacity-20"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2 text-sm font-bold">
                <span style={{ color: colors.primary }}>{currentPage}</span>
                <span className="opacity-30">/</span>
                <span style={{ color: colors.text }}>{totalPages}</span>
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-full flex items-center justify-center border transition-all disabled:opacity-20 rotate-180"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              <ArrowLeft size={20} />
            </button>
          </div>
        )}
      </motion.div>
    );
}

export default FavoriteContent;