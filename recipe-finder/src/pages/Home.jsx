import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";
import recipes from '../data/recipes.json';
import { useMemo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from '../contexts/ThemeContext';
import { motion, AnimatePresence } from "framer-motion";
import { SearchX, ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  const { colors } = useContext(ThemeContext);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const navigate = useNavigate();

  const filteredRecipes = useMemo(() => {
    let results = recipes;
    const lowerSearch = searchTerm.toLowerCase();

    if (searchTerm) {
      results = results.filter(recipe =>
        recipe.title.toLowerCase().includes(lowerSearch) ||
        recipe.ingredients.some(ingredient =>
          ingredient.name.toLowerCase().includes(lowerSearch)
        )
      );
    }

    if (maxTime) {
      results = results.filter(recipe => recipe.timeMinutes <= Number(maxTime));
    }

    return results;
  }, [searchTerm, maxTime]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteIds(favs);
  }, []);

  const toggleLike = (recipeId) => {
    setFavoriteIds((prev) => {
      const updated = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const handleOnClickOfRecipeCard = (recipeId) => navigate(`/recipe/${recipeId}`);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleMaxTimeChange = (e) => {
    setMaxTime(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <SearchBar 
            handleSearchChange={handleSearchChange} 
            searchTerm={searchTerm} 
            handleMaxTimeChange={handleMaxTimeChange} 
            maxTime={maxTime} 
          />
          
          <div className="mt-12">
            <AnimatePresence mode="wait">
              {currentRecipes.length > 0 ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h2 className="text-4xl font-bold tracking-tighter lowercase italic">
                        {searchTerm ? 'search results.' : 'latest recipes.'}
                      </h2>
                      <p className="text-sm opacity-50 font-medium uppercase tracking-widest mt-1">
                        {filteredRecipes.length} culinary matches found
                      </p>
                    </div>
                  </header>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {currentRecipes.map(recipe => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={{ ...recipe, liked: favoriteIds.includes(recipe.id) }}
                        toggleLike={toggleLike}
                        handleOnClickOfRecipeCard={handleOnClickOfRecipeCard}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-center py-24 px-6 rounded-[3rem] border-2 border-dashed"
                  style={{ borderColor: `${colors.border}40` }}
                >
                  <div className="inline-flex p-6 rounded-full mb-6" style={{ backgroundColor: `${colors.primary}10` }}>
                    <SearchX size={48} style={{ color: colors.primary }} />
                  </div>
                  <h3 className="text-3xl font-bold lowercase italic mb-3">nothing in the pantry.</h3>
                  <p className="max-w-md mx-auto opacity-60 text-sm leading-relaxed">
                    We couldn't find any recipes matching your criteria. Try widening your search or adjusting the cooking time.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Boutique Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-20 mb-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-full transition-all disabled:opacity-20"
                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className="w-10 h-10 rounded-full text-xs font-black transition-all"
                    style={{ 
                      backgroundColor: currentPage === page ? colors.primary : 'transparent',
                      color: currentPage === page ? '#fff' : colors.text,
                      border: currentPage === page ? 'none' : `1px solid ${colors.border}40`
                    }}
                  >
                    {String(page).padStart(2, '0')}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full transition-all disabled:opacity-20"
                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;