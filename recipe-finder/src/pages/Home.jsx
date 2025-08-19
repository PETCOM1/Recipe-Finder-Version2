import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import RecipeCard from "../components/RecipeCard"
import recipes from '../data/recipes.json';
import { useEffect, useState } from "react";

const Home = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);

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

  return (
    <div>
      <Header />
      <SearchBar />
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={{ ...recipe, liked: favoriteIds.includes(recipe.id) }}
            toggleLike={toggleLike}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
