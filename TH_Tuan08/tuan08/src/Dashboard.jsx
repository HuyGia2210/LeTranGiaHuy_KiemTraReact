import React from 'react';

// Components
const Sidebar = () => (
  <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
    <div>
      <div className="mb-8">
        <div className="text-2xl font-bold text-pink-500">Logo</div>
      </div>
      <nav className="space-y-4">
        {['Dashboard', 'Projects', 'Teams', 'Analytics', 'Messages', 'Integrations'].map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${item === 'Dashboard' ? 'bg-pink-100 text-pink-500' : 'text-gray-600'}`}
          >
            {/* TODO: Replace with icons */}
            <span>{item}</span>
          </div>
        ))}
      </nav>
    </div>
    <div className="mt-8">
      <div className="border p-4 rounded-lg">
        {/* Illustration placeholder */}
        <div className="h-32 bg-gray-100 mb-4 flex items-center justify-center">Illustration</div>
        <div className="text-center">
          <p className="font-semibold mb-2">V2.0 is available</p>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Try now</button>
        </div>
      </div>
    </div>
  </aside>
);



export default function DashboardPage() {
  return (
    <div className="flex h-screen font-sans bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        
        <main className="p-6 space-y-6 overflow-auto">
          <section className="grid grid-cols-3 gap-6">
            
          </section>

          
        </main>
      </div>
    </div>
  );
}
