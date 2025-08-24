
import recipes from '../data/recipes.json';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const RecipeDetails = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === id);


  return (
    <div className={`flex justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Card */}
      <div className={`flew-full max-w-3xl p-6 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <header className="flex flex-row items-center gap-4 mb-4 text-xl font-bold">
          <Link to="/" className="text-xl flex items-center text-blue-500 hover:underline">
            <ChevronLeft /> Back to Home
          </Link>
          <span className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-red-600'}`}>Recipe Details</span>
        </header>

        {/* Recipe Content */}
        {recipe ? (
          <>
            <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{recipe.title}</h1>

            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded mb-4"
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags &&
                recipe.tags.map(tag => (
                  <span
                    key={tag}
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold border shadow-sm ${theme === 'dark' ? 'bg-blue-800 text-blue-200 border-blue-700' : 'bg-blue-100 text-blue-700 border-blue-200'}`}
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            {/* Meta Info */}
            <div className="mb-4">
              <span className={`inline-block rounded px-2 py-1 text-sm mr-2 ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
                Difficulty: {recipe.difficulty}
              </span>
              <span className={`inline-block rounded px-2 py-1 text-sm mr-2 ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
                Time: {recipe.timeMinutes} min
              </span>
              <span className={`inline-block rounded px-2 py-1 text-sm ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
                Servings: {recipe.servings}
              </span>
            </div>

            {/* Ingredients */}
            <h2 className={`text-xl font-semibold mt-6 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Ingredients</h2>
            <ul className={`list-disc list-inside mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx}>
                  {ing.quantity} {ing.name}
                </li>
              ))}
            </ul>

            {/* Steps */}
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Steps</h2>
            <ol className={`list-decimal list-inside mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {recipe.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>

            {/* Nutrition */}
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Nutrition</h2>
            <ul className={`list-disc list-inside mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {Object.entries(recipe.nutrition).map(([key, value]) => (
                <li key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </li>
              ))}
            </ul>

            {/* Dietary */}
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Dietary</h2>
            <div className="flex flex-wrap gap-2">
              {recipe.dietary &&
                recipe.dietary.map((diet, idx) => (
                  <span
                    key={idx}
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold border shadow-sm ${theme === 'dark' ? 'bg-green-800 text-green-200 border-green-700' : 'bg-green-100 text-green-700 border-green-200'}`}
                  >
                    {diet}
                  </span>
                ))}
            </div>
          </>
        ) : (
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
            Recipe not found. Click{" "}
            <Link to="/" className="text-blue-500 underline">
              here
            </Link>{" "}
            to go back to the homepage.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
