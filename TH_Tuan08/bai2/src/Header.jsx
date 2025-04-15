// Header.jsx
import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo-chefify.png" alt="Chefify Logo" className="h-8" />
          <span className="text-xl font-bold text-pink-500">Chefify</span>
        </div>

        {/* Search bar */}
        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="What would you like to cook?"
            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700">
          {['What to cook', 'Recipes', 'Ingredients', 'Occasions', 'About Us'].map((label) => (
            <a
              key={label}
              href="/"
              className="hover:text-pink-500 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-pink-500 transition-colors">
            Login
          </button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </header>
  );
}
