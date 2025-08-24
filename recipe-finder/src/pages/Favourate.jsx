import Header from "../components/Header"
import RecipeCard from "../components/RecipeCard"
import FavourateContect from "../contexts/FavourateContect"
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const Favourate = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />
      <div className={`flex justify-center items-center m-4 p-4 rounded-2xl shadow-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-red-600'}`}>
          Favorite Recipe(s)
        </h1>
      </div>
      <FavourateContect />
    </div>
  )
}

export default Favourate
