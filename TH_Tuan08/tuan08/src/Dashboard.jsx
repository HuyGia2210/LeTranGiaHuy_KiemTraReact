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

const OverviewCard = ({ title, value, change, icon, bgClass }) => (
  <div className={`${bgClass} p-6 rounded-lg flex justify-between items-center`}>  
    <div>
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-green-500 mt-1">{change} period of change</p>
    </div>
    <div className="text-3xl opacity-30">{icon}</div>
  </div>
);

const DetailedReport = () => {
  const data = [
    { name: 'Elizabeth Lee', company: 'AvatarSystems', value: '$359', date: '10/07/2023', status: 'New' },
    { name: 'Carlos Garcia', company: 'SmoozeShift', value: '$747', date: '24/07/2023', status: 'New' },
    { name: 'Elizabeth Bailey', company: 'Prime Time Telecom', value: '$564', date: '08/08/2023', status: 'In-progress' },
    { name: 'Ryan Brown', company: 'OmniTech Corporation', value: '$541', date: '31/08/2023', status: 'In-progress' },
    { name: 'Ryan Young', company: 'DataStream Inc.', value: '$769', date: '01/05/2023', status: 'Completed' },
    { name: 'Hailey Adams', company: 'FlowRush', value: '$922', date: '10/06/2023', status: 'Completed' },
  ];

  return (
    <div className="border rounded-lg p-4">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2"><input type="checkbox" /></th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Order Value</th>
            <th className="px-4 py-2">Order Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2"><input type="checkbox" /></td>
              <td className="px-4 py-2 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                <span>{row.name}</span>
              </td>
              <td className="px-4 py-2">{row.company}</td>
              <td className="px-4 py-2">{row.value}</td>
              <td className="px-4 py-2">{row.date}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  row.status === 'New' ? 'bg-blue-100 text-blue-500' :
                  row.status === 'In-progress' ? 'bg-yellow-100 text-yellow-500' :
                  'bg-green-100 text-green-500'
                }`}>{row.status}</span>
              </td>
              <td className="px-4 py-2 cursor-pointer">✏️</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <span>63 results</span>
        <div className="space-x-2">
          {[1,2,3,4,'...',11].map((p, i) => (
            <button key={i} className={`px-3 py-1 rounded ${p === 1 ? 'bg-pink-500 text-white' : 'hover:bg-gray-100'}`}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = () => (
  <header className="flex justify-between items-center p-4 border-b bg-white">
    <h1 className="text-2xl font-bold text-pink-500">Dashboard</h1>
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-lg px-3 py-1"
      />
      <div className="cursor-pointer">🔔</div>
      <div className="cursor-pointer">❓</div>
      <div className="w-8 h-8 rounded-full bg-gray-200"></div>
    </div>
  </header>
);

export default function DashboardPage() {
  return (
    <div className="flex h-screen font-sans bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 space-y-6 overflow-auto">
          <section className="grid grid-cols-3 gap-6">
            <OverviewCard
              title="Turnover"
              value="$92,405"
              change="↑ 5.39%"
              icon="🛒"
              bgClass="bg-pink-50"
            />
            <OverviewCard
              title="Profit"
              value="$32,218"
              change="↑ 5.39%"
              icon="$"
              bgClass="bg-blue-50"
            />
            <OverviewCard
              title="New customer"
              value="298"
              change="↑ 6.84%"
              icon="👤"
              bgClass="bg-indigo-50"
            />
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Detailed report</h2>
              <div className="space-x-2">
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">Import</button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">Export</button>
              </div>
            </div>
            <DetailedReport />
          </section>
        </main>
      </div>
    </div>
  );
}
