import React from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';

const recipes = [
  {
    title: 'Salad with cabbage and shrimp',
    time: '25 minutes',
    image: '/food1.png',
  },
  {
    title: 'Salad of cove beans, shrimp and potatoes',
    time: '20 minutes',
    image: '/food1.png',
  },
  {
    title: 'Sunny-side up fried egg',
    time: '15 minutes',
    image: '/food1.png',
  },
  {
    title: 'Lotus delight salad',
    time: '20 minutes',
    image: '/food1.png',
  },
];

export default function RecipesWithVideos() {
  return (
    <section className="py-10 px-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-pink-600">Recipes With Videos</h2>
        <p className="text-gray-600 mt-2">
          Cooking Up Culinary Creations with Step-by-Step Videos
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recipes.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow hover:shadow-md transition">
            <img src={item.image} alt={item.title} className="rounded-t-xl w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
              <div className="flex justify-between items-center mt-2 text-xs text-pink-500 font-medium">
                <span>{item.time}</span>
                <BookmarkIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
