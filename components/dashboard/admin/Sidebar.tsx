"use client";

import Link from "next/link";
import { useState } from "react";

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  href?: string;
  hasSubmenu?: boolean;
  submenu?: Array<{
    key: string;
    label: string;
    href: string;
  }>;
}

interface SidebarProps {
  activeMenu: string;
  expandedMenu: string | null;
  onMenuClick: (menuKey: string, hasSubmenu?: boolean) => void;
  onSubmenuClick: (subItemKey: string) => void;
  sidebarOpen?: boolean;
}

const menuItems: MenuItem[] = [
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

export default function Sidebar({ activeMenu, expandedMenu, onMenuClick, onSubmenuClick, sidebarOpen = false }: SidebarProps) {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
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
                    onClick={() => onMenuClick(item.key, true)}
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
                          onSubmenuClick(subItem.key);
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
                  onClick={() => onMenuClick(item.key)}
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
  );
}