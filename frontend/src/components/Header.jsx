import React from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
      {/* Logo */}
      <Link to="/" role="link" className="text-4xl font-bold text-gray-800 dark:text-white">
        Daily Notes<span className="text-blue-600">.</span>
      </Link>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        role="img" aria-label="Toggle Theme"
      >
        <BsMoonStarsFill className="text-gray-600 dark:text-white text-xl" />
      </button>
    </header>
  );
};

export default Header;
