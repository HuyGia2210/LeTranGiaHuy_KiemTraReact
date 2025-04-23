// RecipesSection.jsx
import React from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline'; // hoặc bạn có thể dùng icon bất kỳ

const recipes = [
  {
    id: 1,
    title: 'Italian‑style tomato',
    subtitle: 'salad',
    image: '/food1.png',
    time: '15 minutes',
  },
  {
    id: 2,
    title: 'Spaghetti with vegetables',
    subtitle: 'pasta & veg',
    image: '/food1.png',
    time: '30 minutes',
  },
  {
    id: 3,
    title: 'Lotus delight salad',
    subtitle: '',
    image: '/food1.png',
    time: '20 minutes',
  },
  {
    id: 4,
    title: 'Snack cakes',
    subtitle: '',
    image: '/food1.png',
    time: '25 minutes',
  },
];

export default function RecipesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-pink-500 mb-2">
          This Summer Recipes
        </h2>
        <p className="text-gray-600 mb-8">
          We have all your Independence Day sweets covered.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <div className="relative">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                  <BookmarkIcon className="w-5 h-5 text-pink-500" />
                </button>
              </div>
              <div className="mt-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {r.title}
                </h3>
                {r.subtitle && (
                  <p className="text-sm text-gray-500">{r.subtitle}</p>
                )}
              </div>
              <div className="mt-4 text-sm text-pink-500 font-medium">
                {r.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
