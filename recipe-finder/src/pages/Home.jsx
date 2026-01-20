import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import RecipeCard from "../components/RecipeCard"
import Footer from "../components/Footer";
import recipes from '../data/recipes.json';
import { useMemo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from '../contexts/ThemeContext';

const Home = () => {
  const { theme, colors } = useContext(ThemeContext);
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
      let updated;
      if (prev.includes(recipeId)) {
        updated = prev.filter(id => id !== recipeId);
      } else {
        updated = [...prev, recipeId];
      }
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const handleOnClickOfRecipeCard = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleMaxTimeChange = (e) => {
    setMaxTime(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.background, color: colors.text }}>
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <SearchBar 
            handleSearchChange={handleSearchChange} 
            searchTerm={searchTerm} 
            handleMaxTimeChange={handleMaxTimeChange} 
            maxTime={maxTime} 
          />
          
          {/* Recipe Grid */}
          {currentRecipes.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
                </h2>
                {searchTerm && (
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing results for: "{searchTerm}"
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-8">
                {currentRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={{ ...recipe, liked: favoriteIds.includes(recipe.id) }}
                    toggleLike={toggleLike}
                    handleOnClickOfRecipeCard={handleOnClickOfRecipeCard}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍳</div>
              <h3 className="text-2xl font-bold mb-4">No Recipes Found</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                {searchTerm ? 
                  `We couldn't find any recipes matching "${searchTerm}". Try a different search term or clear the filters.` :
                  "No recipes match your current filters. Try adjusting the maximum cooking time."}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 mb-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === 1 
                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 min-w-[44px] rounded-lg font-medium transition-all ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === totalPages 
                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                Next
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