import { Sun, Moon, Home, Heart, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Header = () => {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = window.location.pathname;

  // Common button classes
  const navBtnBase = 'flex flex-row items-center p-2 rounded-2xl transition-colors h-12 min-h-[48px]';
  const darkModeHandler = () => {
    // TODO: Implement dark mode toggle
    // You can use context or state to toggle theme
  };

  return (

    
    <header className="w-full border-b-[1px] border-gray-200 shadow-sm bg-white sticky top-0 z-50">
  <div className="flex flex-col md:flex-row md:justify-between items-center p-4 md:p-6 gap-2 md:gap-0">
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTFpZzhocmxzOHl0eXZydXZlajI3cGEwcG9zY2R3empwbWt2a2ZhaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/v8jIlDELZYmTxjqmUH/giphy.gif"
            alt="Animated cooking GIF"
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-full shadow"
          />
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] text-red-600 font-bold italic squiggly-font text-center md:text-left">Recipe Finder</h1>
        </div>
        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex flex-row gap-4 w-auto">
          {/* Home Button */}
          <button
            className={`${navBtnBase} ${currentPath === '/' ? 'bg-black text-white' : 'bg-red-600 text-white p-2'}`}
            onClick={() => navigate('/')}
            aria-label="Go to Home"
          >
            <Home /> Home
          </button>
          {/* Favorites Button */}
          <button
            className={`${navBtnBase} ${currentPath === '/favorites' ? 'bg-black text-white' : 'bg-red-600 text-white p-2'}`}
            onClick={() => navigate('/favorites')}
            aria-label="Go to Favorites"
          >
            <Heart /> Favorites
          </button>
          {/* Dark Mode Toggle */}
          <button
            onClick={darkModeHandler}
            className="ml-0 mt-2 p-2 rounded-2xl bg-gray-700 hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            <Sun />
          </button>
        </nav>
        {/* Burger Menu */}
        <div className="md:hidden flex items-center justify-end w-full">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400">
            <Menu size={28} />
          </button>
        </div>
        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex flex-col items-end md:hidden">
            <div className="w-4/5 max-w-xs bg-white h-full shadow-lg flex flex-col gap-2 p-6 animate-slide-in">
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end mb-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Close menu"
              >
                <Menu size={28} />
              </button>
              {/* Home Button (Mobile) */}
              <button
                onClick={() => { setMenuOpen(false); navigate('/'); }}
                className={`${navBtnBase} ${currentPath === '/' ? 'bg-black text-white' : 'bg-red-600 text-white'} w-full justify-start text-lg py-3`}
                aria-label="Go to Home"
              >
                <Home size={20} className="mr-2" /> Home
              </button>
              {/* Favorites Button (Mobile) */}
              <button
                onClick={() => { setMenuOpen(false); navigate('/favorites'); }}
                className={`${navBtnBase} ${currentPath === '/favorites' ? 'bg-black text-white' : 'bg-red-600 text-white'} w-full justify-start text-lg py-3`}
                aria-label="Go to Favorites"
              >
                <Heart size={20} className="mr-2" /> Favorites
              </button>
              {/* Dark Mode Toggle (Mobile) */}
              <button
                onClick={darkModeHandler}
                className="ml-0 mt-2 p-2 rounded-2xl bg-gray-700 hover:bg-gray-600 transition-colors w-full justify-start text-lg py-3"
                aria-label="Toggle dark mode"
              >
                <Sun className="mr-2" /> Dark Mode
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header
