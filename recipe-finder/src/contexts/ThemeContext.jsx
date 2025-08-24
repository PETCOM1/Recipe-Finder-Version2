import React, { createContext, useState, useEffect } from "react";

// 1. Create the context
const ThemeContext = createContext();

// 2. Create the provider component
function ThemeProvider(props) {
  // Check localStorage for saved theme, default to 'light'
  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    } else {
      return "light";
    }
  }

  const themeState = useState(getInitialTheme());
  const theme = themeState[0];
  const setTheme = themeState[1];

  // Update localStorage and document class whenever theme changes
  useEffect(function () {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Toggle function
  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

// Export at the bottom
export { ThemeContext, ThemeProvider };
