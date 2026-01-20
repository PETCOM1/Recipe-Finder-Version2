import { useState,useEffect, useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { Link,useNavigate } from "react-router-dom";
import recipes from '../data/recipes.json';
import ThemeContext from './ThemeContext';

const FavourateContect = () => {
    const { theme, colors } = useContext(ThemeContext);
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    //Now filter the favorite recipes based on the IDs that are in local Storage
    const filteredFavorites = recipes.filter((recipe) => favorites.includes(recipe.id));

    // Pagination logic
    const totalPages = Math.ceil(filteredFavorites.length / recipesPerPage);
    const startIndex = (currentPage - 1) * recipesPerPage;
    const currentRecipes = filteredFavorites.slice(startIndex, startIndex + recipesPerPage);

    const handlePageChange = (page) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handler to toggle favorite status and update state/localStorage
    const handleToggleLike = (id) => {
      const updatedFavorites = favorites.includes(id)
        ? favorites.filter(favId => favId !== id)
        : [...favorites, id];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      // Reset to first page if current page becomes empty
      if (currentRecipes.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    
    //Should this function be triggered on recipe card click?,the we should be able to navigate to RecipeDetails page
    const handleOnClickOfRecipeCard = (recipeId) => {
      // Navigate to RecipeDetails page
      navigate(`/recipe/${recipeId}`);
    }

    return (
      <div className="flex flex-col items-center gap-8 p-4">
        <div className="flex flex-wrap justify-center items-center gap-6 w-full max-w-7xl">
          {filteredFavorites.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>No Favorites Yet</h3>
              <p className="max-w-md mx-auto mb-8" style={{ color: colors.textSecondary }}>
                You haven't saved any recipes to your favorites yet. Start exploring and click the heart icon to save them here!
              </p>
              <Link 
                to="/" 
                className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                Explore Recipes
              </Link>
            </div>
          ) : (
            currentRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} 
                recipe={{ ...recipe, liked: true }}
                toggleLike={handleToggleLike}
                handleOnClickOfRecipeCard={handleOnClickOfRecipeCard}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 mb-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 1 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'shadow-md hover:shadow-lg hover:-translate-y-0.5'
              }`}
              style={{
                backgroundColor: currentPage === 1 ? colors.muted : colors.primary,
                color: currentPage === 1 ? colors.textSecondary : 'white'
              }}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 min-w-[44px] rounded-lg font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5`}
                style={{
                  backgroundColor: currentPage === page ? colors.primary : colors.surface,
                  color: currentPage === page ? 'white' : colors.text,
                  border: currentPage === page ? 'none' : `1px solid ${colors.border}`
                }}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === totalPages 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'shadow-md hover:shadow-lg hover:-translate-y-0.5'
              }`}
              style={{
                backgroundColor: currentPage === totalPages ? colors.muted : colors.primary,
                color: currentPage === totalPages ? colors.textSecondary : 'white'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
}

export default FavourateContect
