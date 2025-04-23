import React from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';

const picks = [
  {
    title: 'Stuffed sticky rice ball',
    time: '32 minutes',
    author: 'Jennifer King',
    avatar: '/avatar1.png',
    description: 'Stuffed sticky rice balls: A delightful Asian treat with chewy, glutinous rice and a flavorful surprise filling...',
    image: '/food1.png',
  },
  {
    title: 'Strawberry smoothie',
    time: '45 minutes',
    author: 'Matthew Martinez',
    avatar: '/avatar2.png',
    description: 'Savor the refreshing delight of a strawberry smoothie. Made with ripe strawberries, this creamy blend offers...',
    image: '/food1.png',
  },
  {
    title: 'Latte Art',
    time: '18 minutes',
    author: 'Sarah Hill',
    avatar: '/avatar3.png',
    description: 'Latte art is the skillful craft of creating captivating designs on the surface of a latte...',
    image: '/food1.png',
  },
  {
    title: 'Butter fried noodles',
    time: '16 minutes',
    author: 'Julia Lopez',
    avatar: '/avatar4.png',
    description: 'Butter fried noodles: Savory noodles cooked in butter for a delicious and satisfying meal...',
    image: '/food1.png',
  },
];

export default function EditorsPick() {
  return (
    <section className="py-12 px-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-pink-600">Editor's pick</h2>
        <p className="text-gray-600 mt-2">
          Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {picks.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-md transition flex gap-4 p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-28 h-28 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                <BookmarkIcon className="w-5 h-5 text-pink-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              <p className="text-sm text-gray-700 mt-2">{item.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <img src={item.avatar} alt={item.author} className="w-6 h-6 rounded-full" />
                <span className="text-sm text-gray-800">{item.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
