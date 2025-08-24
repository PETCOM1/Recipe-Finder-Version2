
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const SearchBar = ({handleSearchChange,searchTerm,handleMaxTimeChange,maxTime}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <section className={`w-full max-w-xl mx-auto my-6 p-6 rounded-2xl shadow-md flex flex-col gap-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold text-center mb-2 ${theme === 'dark' ? 'text-white' : 'text-red-600'}`}>Find Your Perfect Recipe</h2>
      <p className={`text-center mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Search through our smart collective recipe finder</p>
      <form className="flex flex-col sm:flex-row gap-2 items-center justify-center">
        <input
          type="text"
          placeholder="Search for recipes..."
          className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <input
          type="number"
          placeholder="Max Minutes"
          className={`w-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          value={maxTime}
          onChange={handleMaxTimeChange}
        />
     
        <button
          type="button"
          className={`px-4 py-2 rounded-lg font-semibold transition ${theme === 'dark' ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => {
            handleSearchChange({ target: { value: '' } });
            handleMaxTimeChange({ target: { value: '' } });
          }}
        >
          Clear
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
