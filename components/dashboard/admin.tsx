"use client";

import { useState } from "react";
import Link from "next/link";

export default function Admin() {
  const [activeMenu, setActiveMenu] = useState("spp");
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState("");
  const [monthlySpp, setMonthlySpp] = useState("");
  const [semesterSpp, setSemesterSpp] = useState("");

  const handleMenuClick = (menuKey: string, hasSubmenu = false) => {
    setActiveMenu(menuKey);
    if (hasSubmenu) {
      setExpandedMenu(expandedMenu === menuKey ? null : menuKey);
    } else {
      setExpandedMenu(null);
    }
  };

  const openEditModal = (className: string, monthly: string, semester: string) => {
    setEditingClass(className);
    setMonthlySpp(monthly);
    setSemesterSpp(semester);
    setIsEditModalOpen(true);
  };

  const menuItems = [
    {
      key: "user-management",
      label: "User Management",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      href: "/dashboard/user-management"
    },

    {
      key: "halaman-santri",
      label: "Halaman Santri",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      href: "/dashboard/halaman-santri"
    },
    {
      key: "transaksi",
      label: "Transaksi",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
      hasSubmenu: true,
      submenu: [
        { key: "spp", label: "SPP", href: "/dashboard/transaksi/spp" },
        { key: "syahriah", label: "Syahriah", href: "/dashboard/transaksi/syahriah" },
        { key: "uang-saku", label: "Uang Saku", href: "/dashboard/transaksi/uang-saku" },
        { key: "laundry", label: "Laundry", href: "/dashboard/transaksi/laundry" }
      ]
    },
    {
      key: "menu-bendahara",
      label: "Menu Bendahara",
      icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
      href: "/dashboard/menu-bendahara"
    }
  ];

  const currentPage = menuItems.find(item => item.key === activeMenu);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center bg-blue-600">
          <h1 className="text-xl font-bold text-white">Dashboard Admin</h1>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.key} className="group">
                {item.hasSubmenu ? (
                  <>
                    <div
                      className={`flex items-center px-4 py-3 text-gray-700 rounded-lg cursor-pointer ${
                        activeMenu === item.key
                          ? item.key === 'halaman-santri'
                            ? 'bg-orange-50 border-r-2 border-orange-500'
                            : 'bg-blue-50 border-r-2 border-blue-500'
                          : 'hover:bg-blue-50'
                      }`}
                      onClick={() => handleMenuClick(item.key, true)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 ml-auto transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {/* Sub-menu */}
                    <div className={`ml-8 mt-2 space-y-1 transition-all duration-300 ${
                      expandedMenu === item.key
                        ? 'opacity-100 max-h-96'
                        : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.key}
                          href={subItem.href || '#'}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveMenu(subItem.key);
                          }}
                          className={`flex items-center px-4 py-2 text-sm rounded-lg cursor-pointer ${
                            activeMenu === subItem.key
                              ? 'bg-red-100 text-red-700'
                              : 'text-gray-600 hover:bg-red-100'
                          }`}
                        >
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href="#"
                    className={`flex items-center px-4 py-3 text-gray-700 rounded-lg cursor-pointer ${
                      activeMenu === item.key
                        ? item.key === 'halaman-santri'
                          ? 'bg-orange-50 border-r-2 border-orange-500'
                          : 'bg-blue-50 border-r-2 border-blue-500'
                        : 'hover:bg-blue-50'
                    }`}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {activeMenu === 'spp' && 'SPP Management'}
                {activeMenu === 'syahriah' && 'Syahriah Management'}
                {activeMenu === 'uang-saku' && 'Uang Saku Management'}
                {activeMenu === 'laundry' && 'Laundry Management'}
              </h2>
              <p className="text-gray-600">
                {activeMenu === 'spp' && 'Manage SPP pricing and track incoming transactions'}
                {activeMenu === 'syahriah' && 'Manage Syahriah fees and payments'}
                {activeMenu === 'uang-saku' && 'Manage pocket money allowances'}
                {activeMenu === 'laundry' && 'Manage laundry services and fees'}
              </p>
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
          {activeMenu === 'spp' && (
            <>
              {/* SPP Pricing Management */}
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="px-6 py-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">SPP Pricing Management</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    + Add New Class
                  </button>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Class</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Monthly SPP</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Semester SPP</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">Class X</td>
                          <td className="px-4 py-3 text-sm text-gray-900">Rp 150.000</td>
                          <td className="px-4 py-3 text-sm text-gray-900">Rp 750.000</td>
                          <td className="px-4 py-3 text-sm">
                            <button
                              onClick={() => openEditModal("Class X", "150000", "750000")}
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800">Delete</button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">Class XI</td>
                          <td className="px-4 py-3 text-sm text-gray-900">Rp 160.000</td>
                          <td className="px-4 py-3 text-sm text-gray-900">Rp 800.000</td>
                          <td className="px-4 py-3 text-sm">
                            <button
                              onClick={() => openEditModal("Class XI", "160000", "800000")}
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800">Delete</button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">Class XII</td>
                          <td className="px-4 py-3 text-sm text-gray-900">Rp 170.000</td>
                          <td className="px-4 py-3 text-sm text-gray-900">Rp 850.000</td>
                          <td className="px-4 py-3 text-sm">
                            <button
                              onClick={() => openEditModal("Class XII", "170000", "850000")}
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800">Delete</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Recent SPP Transactions</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All →
                  </button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Transaction Item */}
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Ahmad Fauzi</h4>
                            <p className="text-sm text-gray-600">Class X - Monthly SPP</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">Rp 150.000</p>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View Details →
                        </button>
                      </div>
                    </div>

                    {/* Transaction Item */}
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Siti Nurhaliza</h4>
                            <p className="text-sm text-gray-600">Class XI - Semester SPP</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-yellow-600">Rp 800.000</p>
                          <p className="text-sm text-gray-500">5 hours ago</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View Details →
                        </button>
                      </div>
                    </div>

                    {/* Transaction Item */}
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Budi Santoso</h4>
                            <p className="text-sm text-gray-600">Class X - Monthly SPP</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">Rp 150.000</p>
                          <p className="text-sm text-gray-500">1 day ago</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>

        {/* Edit SPP Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Edit SPP Pricing</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Class
                    </label>
                    <input
                      type="text"
                      value={editingClass}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly SPP (Rp)
                    </label>
                    <input
                      type="number"
                      value={monthlySpp}
                      onChange={(e) => setMonthlySpp(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="150000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Semester SPP (Rp)
                    </label>
                    <input
                      type="number"
                      value={semesterSpp}
                      onChange={(e) => setSemesterSpp(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="750000"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle save logic here
                      console.log('Saving SPP:', { editingClass, monthlySpp, semesterSpp });
                      setIsEditModalOpen(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}