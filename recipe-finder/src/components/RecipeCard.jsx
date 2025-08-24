
import { Heart } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';


const RecipeCard = ({ recipe, handleOnClickOfRecipeCard, toggleLike }) => {
  const { theme } = useContext(ThemeContext);
  // liked status is now passed as a prop (recipe.liked)
  const handleLike = (e) => {
    e.stopPropagation();
    if (toggleLike) toggleLike(recipe.id);
  };

  return (
    <div
      className={`rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-xl w-full max-w-xs mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      style={{ cursor: 'pointer' }}
      onClick={() => handleOnClickOfRecipeCard(recipe.id)}
    >
      <div className="relative">
        <img
          src={recipe.image.startsWith('.') ? recipe.image.replace('./', '/'): recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <button
          className={`absolute top-2 right-2 rounded-full p-2 shadow transition-colors ${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-red-100'} ${recipe.liked ? 'text-red-500' : (theme === 'dark' ? 'text-gray-300' : 'text-gray-400')}`}
          onClick={handleLike}
          aria-label={recipe.liked ? 'Unlike' : 'Like'}
        >
          <Heart fill={recipe.liked ? 'currentColor' : 'none'} size={22} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between mb-1">
          <h2 className={`text-lg font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{recipe.title}</h2>
          <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full ml-2"> {recipe.rating}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {recipe.tags && recipe.tags.map(tag => (
            <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-600'}`}>{tag}</span>
          ))}
        </div>
        <div className={`flex items-center gap-3 text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>⏱ {recipe.timeMinutes} min</span>
          <span>🍽 {recipe.servings} servings</span>
          <span className="capitalize">{recipe.difficulty}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {recipe.dietary && recipe.dietary.map(diet => (
            <span key={diet} className={`text-xs px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-700'}`}>{diet}</span>
          ))}
        </div>
        <div className={`flex gap-3 text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>🔥 {recipe.nutrition?.calories} kcal</span>
          <span>🥩 {recipe.nutrition?.protein}</span>
          <span>🍞 {recipe.nutrition?.carbs}</span>
          <span>🧈 {recipe.nutrition?.fat}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
