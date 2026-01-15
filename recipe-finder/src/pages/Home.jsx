import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import RecipeCard from "../components/RecipeCard"
import recipes from '../data/recipes.json';
import { useMemo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from '../contexts/ThemeContext';

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const navigate = useNavigate();

  // Memorize filtered recipes to avoid unnecessary computations
const filteredRecipes = useMemo(() => {
  let results = recipes;

  const lowerSearch = searchTerm.toLowerCase();

  // Text search (title + ingredients)
  if (searchTerm) {
    results = results.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerSearch) ||
      recipe.ingredients.some(ingredient =>
        ingredient.name.toLowerCase().includes(lowerSearch)
      )
    );
  }

  // Time filter
  if (maxTime) {
    results = results.filter(recipe => recipe.timeMinutes <= Number(maxTime));
  }

  return results;
}, [searchTerm, maxTime]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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


  //Should this function be triggered on recipe card click?,the we should be able to navigate to RecipeDetails page
  const handleOnClickOfRecipeCard = (recipeId) => {
    // Navigate to RecipeDetails page
    navigate(`/recipe/${recipeId}`);
  }
  
  const handleSearchChange= (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  }

  const handleMaxTimeChange = (e) => {
    setMaxTime(e.target.value);
    setCurrentPage(1); // Reset to first page on filter
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />
      <SearchBar handleSearchChange={handleSearchChange} searchTerm={searchTerm} handleMaxTimeChange={handleMaxTimeChange} maxTime={maxTime} />
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {currentRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={{ ...recipe, liked: favoriteIds.includes(recipe.id) }}
            toggleLike={toggleLike}
            handleOnClickOfRecipeCard={handleOnClickOfRecipeCard}
          />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
