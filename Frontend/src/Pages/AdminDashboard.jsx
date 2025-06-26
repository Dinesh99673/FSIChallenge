import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Log out</button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-1/5 bg-white rounded shadow p-4">
          <ul className="space-y-4">
            <li className="text-blue-600 font-semibold">Dashboard</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Users</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Stores</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded shadow text-center">
              <div className="text-4xl mb-2">👥</div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-xl font-bold">100</p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <div className="text-4xl mb-2">🏬</div>
              <p className="text-sm text-gray-500">Total Stores</p>
              <p className="text-xl font-bold">25</p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <div className="text-4xl mb-2">⭐</div>
              <p className="text-sm text-gray-500">Total Submitted Ratings</p>
              <p className="text-xl font-bold">150</p>
            </div>
          </div>

          {/* Add New User & Store List */}
          <div className="grid grid-cols-2 gap-6">
            {/* Add User */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Add New User</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full border rounded px-3 py-2" />
                <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
                <input type="password" placeholder="Password" className="w-full border rounded px-3 py-2" />
                <textarea placeholder="Address" className="w-full border rounded px-3 py-2"></textarea>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add User</button>
              </form>
            </div>

            {/* Store List */}
            <div className="bg-white p-6 rounded shadow max-h-[400px] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">Stores</h2>
              <input
                type="text"
                placeholder="Search..."
                className="w-full mb-4 border rounded px-3 py-2"
              />
              <table className="w-full text-left border-t">
                <thead>
                  <tr className="text-sm text-gray-600">
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Address</th>
                    <th className="py-2">Rating</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {[...Array(10)].map((_, i) => (
                    <tr key={i}>
                      <td className="py-2">Store {String.fromCharCode(65 + i)}</td>
                      <td className="py-2">store{i + 1}@example.com</td>
                      <td className="py-2">City {i + 1}</td>
                      <td className="py-2">{(3.5 + (i % 2)).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
