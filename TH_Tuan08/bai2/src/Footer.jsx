import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 rounded-t-xl mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="font-bold text-lg mb-3">About Us</h3>
          <p className="text-sm text-gray-300 mb-4">
            Welcome to our website, a wonderful place to explore and learn how to cook like a pro.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md text-black focus:outline-none"
            />
            <button className="bg-pink-500 px-4 py-2 rounded-r-md text-white font-semibold hover:bg-pink-600">
              Send
            </button>
          </div>
        </div>

        {/* Learn More */}
        <div>
          <h3 className="font-bold text-lg mb-3">Learn More</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">Our Cooks</a></li>
            <li><a href="#">See Our Features</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-bold text-lg mb-3">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">Gift Subscription</a></li>
            <li><a href="#">Send Us Feedback</a></li>
          </ul>
        </div>

        {/* Recipes */}
        <div>
          <h3 className="font-bold text-lg mb-3">Recipes</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">What to Cook This Week</a></li>
            <li><a href="#">Pasta</a></li>
            <li><a href="#">Dinner</a></li>
            <li><a href="#">Healthy</a></li>
            <li><a href="#">Vegetarian</a></li>
            <li><a href="#">Vegan</a></li>
            <li><a href="#">Christmas</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <img src="/logo.png" alt="Cheffify Logo" className="w-6 h-6" />
          <span className="font-semibold text-white">Cheffify</span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center md:justify-end">
          <span>2023 Cheffify Company</span>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
