import { useState,useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";
import recipes from '../data/recipes.json';

const FavourateContect = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    //Now filter the favorite recipes based on the IDs that are in local Storage
    const filteredFavorites = recipes.filter((recipe) => favorites.includes(recipe.id));

    // Handler to toggle favorite status and update state/localStorage
    const handleToggleLike = (id) => {
      const updatedFavorites = favorites.includes(id)
        ? favorites.filter(favId => favId !== id)
        : [...favorites, id];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {filteredFavorites.length === 0 ? (
          <p className="text-gray-500 text-lg">No favorites yet.</p>
        ) : (
          filteredFavorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={{ ...recipe, liked: true }} toggleLike={handleToggleLike} />
          ))
        )}
      </div>
    );
}

export default FavourateContect
