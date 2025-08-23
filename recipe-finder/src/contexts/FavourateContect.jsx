import { useState,useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { Link,useNavigate } from "react-router-dom";
import recipes from '../data/recipes.json';

const FavourateContect = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

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
    
    //Should this function be triggered on recipe card click?,the we should be able to navigate to RecipeDetails page
    const handleOnClickOfRecipeCard = (recipeId) => {
      // Navigate to RecipeDetails page
      navigate(`/recipe/${recipeId}`);
    }

    return (
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {filteredFavorites.length === 0 ? (
          <p className="text-gray-500 text-lg">No favorites yet. Click <a href="/" className="text-blue-500 underline">here</a> to go back home.</p>
        ) : (
          filteredFavorites.map((recipe) => (
            <RecipeCard key={recipe.id} 
            recipe={{ ...recipe, liked: true }}
             toggleLike={handleToggleLike}
             handleOnClickOfRecipeCard={handleOnClickOfRecipeCard}
            />
          ))
        )}
      </div>
    );
}

export default FavourateContect
