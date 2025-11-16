"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Users,
  GraduationCap,
  Banknote,
  DollarSign,
  CreditCard,
  Home,
  ChevronDown,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

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
    key: "dashboard",
    label: "Dashboard",
    icon: "home",
    href: "/dashboard"
  },
  {
    key: "user-management",
    label: "Manajemen Pengguna",
    icon: "users",
    href: "/dashboard/user-management"
  },
  {
    key: "halaman-santri",
    label: "Data Santri",
    icon: "graduation-cap",
    href: "/dashboard/halaman-santri"
  },
  {
    key: "transaksi",
    label: "Transaksi Pembayaran",
    icon: "banknote",
    hasSubmenu: true,
    submenu: [
      { key: "spp", label: "SPP Bulanan", href: "/dashboard/transaksi/spp" },
      { key: "syahriah", label: "Syahriah", href: "/dashboard/transaksi/syahriah" },
      { key: "uang-saku", label: "Uang Saku", href: "/dashboard/transaksi/uang-saku" },
      { key: "laundry", label: "Laundry", href: "/dashboard/transaksi/laundry" }
    ]
  },
  {
    key: "menu-bendahara",
    label: "Keuangan",
    icon: "bar-chart-3",
    href: "/dashboard/menu-bendahara"
  }
];

export default function Sidebar({ activeMenu, expandedMenu, onMenuClick, onSubmenuClick, sidebarOpen = false }: SidebarProps) {
  const getIcon = (iconName: string) => {
    const iconClass = "w-5 h-5";
    switch (iconName) {
      case "home":
        return <Home className={iconClass} />;
      case "users":
        return <Users className={iconClass} />;
      case "graduation-cap":
        return <GraduationCap className={iconClass} />;
      case "banknote":
        return <Banknote className={iconClass} />;
      case "bar-chart-3":
        return <BarChart3 className={iconClass} />;
      default:
        return <Home className={iconClass} />;
    }
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-60 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl transform transition-all duration-500 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    } border-r border-slate-700 flex flex-col`}>
      {/* Header */}
      <div className="flex h-16 items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Sistem Pembayaran</h1>
            <p className="text-xs text-emerald-100">Pondok Pesantren</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.key} className="group">
              {item.hasSubmenu ? (
                <>
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeMenu === item.key
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                    onClick={() => onMenuClick(item.key, true)}
                  >
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded mr-2 ${
                        activeMenu === item.key ? 'bg-white/20' : 'bg-slate-700'
                      }`}>
                        {getIcon(item.icon)}
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      expandedMenu === item.key ? 'transform rotate-180' : ''
                    }`} />
                  </div>
                  
                  {/* Sub-menu */}
                  <div className={`ml-3 mt-1 space-y-0.5 transition-all duration-300 overflow-hidden ${
                    expandedMenu === item.key
                      ? 'max-h-64 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}>
                    {item.submenu?.map((subItem) => (
                      <Link
                        key={subItem.key}
                        href={subItem.href || '#'}
                        onClick={(e) => {
                          e.preventDefault();
                          onSubmenuClick(subItem.key);
                        }}
                        className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                          activeMenu === subItem.key
                            ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border-l-2 border-emerald-400'
                            : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 bg-current rounded-full mr-2"></div>
                        <span className="text-xs font-medium">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href || '#'}
                  className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeMenu === item.key
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => onMenuClick(item.key)}
                >
                  <div className={`p-1.5 rounded mr-2 ${
                    activeMenu === item.key ? 'bg-white/20' : 'bg-slate-700'
                  }`}>
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
        </ScrollArea>
      </nav>
      
      {/* Footer */}
      <div className="p-3 border-t border-slate-700 flex-shrink-0">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-3 border border-slate-600">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">Payment System</p>
              <p className="text-xs text-slate-400">v2.0.1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}