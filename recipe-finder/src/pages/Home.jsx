import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import RecipeCard from "../components/RecipeCard"
import recipes from '../data/recipes.json';
import { useMemo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../contexts/ThemeContext';

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxTime, setMaxTime] = useState('');
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
  }

  const handleMaxTimeChange = (e) => {
    setMaxTime(e.target.value);
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />
      <SearchBar handleSearchChange={handleSearchChange} searchTerm={searchTerm} handleMaxTimeChange={handleMaxTimeChange} maxTime={maxTime} />
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {filteredRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={{ ...recipe, liked: favoriteIds.includes(recipe.id) }}
            toggleLike={toggleLike}
            handleOnClickOfRecipeCard={handleOnClickOfRecipeCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
