// Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-red-500">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image1.png')" }}
      ></div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Card */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 max-w-sm text-center space-y-4">
          <div className="inline-block bg-yellow-400 px-4 py-1 rounded-full text-sm font-semibold">
            Recipe of the day
          </div>
          <h2 className="text-2xl font-bold text-pink-500">Salad Caprese</h2>
          <p className="text-gray-700 text-sm">
            Classic Italian Salad Caprese: ripe tomatoes, fresh mozzarella,
            herbs, olive oil, and balsamic vinegar create a refreshing dish for
            lunch or appetizer.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <img
              src="/avatar-salad.png"
              alt="Chef Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-800 font-medium">Salad Caprese</span>
          </div>
          <button className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition">
            View now →
          </button>
        </div>
      </div>
    </section>
  );
}
