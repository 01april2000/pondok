"use client";

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center bg-blue-600">
          <h1 className="text-xl font-bold text-white">Dashboard Admin</h1>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {/* User Management */}
            <div className="group">
              <div className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 cursor-pointer">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>User Management</span>
              </div>
            </div>
            {/* Halaman Santri */}
            <div className="group">
              <div className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-orange-50 cursor-pointer bg-orange-50 border-r-2 border-orange-500">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Halaman Santri</span>
              </div>
            </div>

            {/* Transaksi */}
            <div className="group">
              <div className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 cursor-pointer">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Transaksi</span>
                <svg className="w-4 h-4 ml-auto transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Transaksi Sub-menu */}
              <div className="ml-8 mt-2 space-y-1 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-96 transition-all duration-300">
                <div className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-red-100 cursor-pointer">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  SPP
                </div>
                <div className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-red-100 cursor-pointer">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Syahriah
                </div>
                <div className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-red-100 cursor-pointer">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Uang Saku
                </div>
                <div className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-red-100 cursor-pointer">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Laundry
                </div>
              </div>
            </div>

            {/* Menu Bendahara */}
            <div className="group">
              <div className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-yellow-50 cursor-pointer">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Menu Bendahara</span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Halaman Santri</h2>
              <p className="text-gray-600">Manage student information and data</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">A</span>
                </div>
                <span className="text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Total Santri</h3>
                  <p className="text-2xl font-bold text-blue-600">1,234</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Active Students</h3>
                  <p className="text-2xl font-bold text-green-600">1,156</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-600">78</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">New student registered</span>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Payment completed</span>
                  </div>
                  <span className="text-sm text-gray-500">5 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Document updated</span>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}