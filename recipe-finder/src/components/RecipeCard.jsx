
import { Heart } from 'lucide-react';


const RecipeCard = ({ recipe, clickHandler, toggleLike }) => {
  // liked status is now passed as a prop (recipe.liked)
  const handleLike = (e) => {
    e.stopPropagation();
    if (toggleLike) toggleLike(recipe.id);
  };

  return (
    <div
  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-xl w-full max-w-xs mx-auto"
      style={{ cursor: 'pointer' }}
    >
      <div className="relative">
        <img
          src={recipe.image.startsWith('.') ? recipe.image.replace('./', '/'): recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <button
          className={`absolute top-2 right-2 bg-white/80 rounded-full p-2 shadow hover:bg-red-100 transition-colors ${recipe.liked ? 'text-red-500' : 'text-gray-400'}`}
          onClick={handleLike}
          aria-label={recipe.liked ? 'Unlike' : 'Like'}
        >
          <Heart fill={recipe.liked ? 'currentColor' : 'none'} size={22} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-gray-800 truncate">{recipe.title}</h2>
          <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full ml-2"> {recipe.rating}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {recipe.tags && recipe.tags.map(tag => (
            <span key={tag} className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
          <span>⏱ {recipe.timeMinutes} min</span>
          <span>🍽 {recipe.servings} servings</span>
          <span className="capitalize">{recipe.difficulty}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {recipe.dietary && recipe.dietary.map(diet => (
            <span key={diet} className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{diet}</span>
          ))}
        </div>
        <div className="flex gap-3 text-xs text-gray-500 mt-2">
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
