"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "./admin/Sidebar";
import Header from "./admin/Header";
import SPPManagement from "./admin/SPPManagement";
import EditSPPModal from "./admin/EditSPPModal";
import AddClassDialog from "./admin/AddClassDialog";
import SyahriahManagement from "./admin/SyahriahManagement";
import EditSyahriahModal from "./admin/EditSyahriahModal";
import AddSyahriahDialog from "./admin/AddSyahriahDialog";

interface MenuItem {
  key: string;
  label: string;
  icon: string;
  href?: string;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  key: string;
  label: string;
  href?: string;
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

export default function Admin() {
  const [activeMenu, setActiveMenu] = useState("spp");
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddClassDialogOpen, setIsAddClassDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState("");
  const [monthlySpp, setMonthlySpp] = useState("");
  const [semesterSpp, setSemesterSpp] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sppClasses, setSppClasses] = useState([
    { name: "Class X", monthly: "Rp 150.000", semester: "Rp 750.000" },
    { name: "Class XI", monthly: "Rp 160.000", semester: "Rp 800.000" },
    { name: "Class XII", monthly: "Rp 170.000", semester: "Rp 850.000" }
  ]);
  
  // Syahriah state
  const [isEditSyahriahModalOpen, setIsEditSyahriahModalOpen] = useState(false);
  const [isAddSyahriahDialogOpen, setIsAddSyahriahDialogOpen] = useState(false);
  const [editingSyahriahClass, setEditingSyahriahClass] = useState("");
  const [monthlySyahriah, setMonthlySyahriah] = useState("");
  const [yearlySyahriah, setYearlySyahriah] = useState("");
  const [syahriahClasses, setSyahriahClasses] = useState([
    { name: "Class X", monthly: "Rp 100.000", yearly: "Rp 1.200.000" },
    { name: "Class XI", monthly: "Rp 110.000", yearly: "Rp 1.320.000" },
    { name: "Class XII", monthly: "Rp 120.000", yearly: "Rp 1.440.000" }
  ]);

  const handleMenuClick = (menuKey: string, hasSubmenu = false) => {
    setActiveMenu(menuKey);
    if (hasSubmenu) {
      setExpandedMenu(expandedMenu === menuKey ? null : menuKey);
    } else {
      setExpandedMenu(null);
      setSidebarOpen(false); // Close sidebar on mobile after selection
    }
  };

  const handleSubmenuClick = (subItemKey: string) => {
    setActiveMenu(subItemKey);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const openEditModal = (className: string, monthly: string, semester: string) => {
    setEditingClass(className);
    setMonthlySpp(monthly);
    setSemesterSpp(semester);
    setIsEditModalOpen(true);
  };

  const handleSaveSPP = () => {
    setSppClasses(prevClasses =>
      prevClasses.map(classItem =>
        classItem.name === editingClass
          ? {
              ...classItem,
              monthly: `Rp ${parseInt(monthlySpp).toLocaleString('id-ID')}`,
              semester: `Rp ${parseInt(semesterSpp).toLocaleString('id-ID')}`
            }
          : classItem
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteClass = (className: string) => {
    if (window.confirm(`Are you sure you want to delete ${className}?`)) {
      setSppClasses(prevClasses =>
        prevClasses.filter(classItem => classItem.name !== className)
      );
    }
  };

  const handleAddNewClass = (className: string, monthlySpp: string, semesterSpp: string) => {
    setSppClasses(prevClasses => [
      ...prevClasses,
      {
        name: className,
        monthly: `Rp ${parseInt(monthlySpp).toLocaleString('id-ID')}`,
        semester: `Rp ${parseInt(semesterSpp).toLocaleString('id-ID')}`
      }
    ]);
  };

  const openAddClassDialog = () => {
    setIsAddClassDialogOpen(true);
  };

  // Syahriah handlers
  const openEditSyahriahModal = (className: string, monthly: string, yearly: string) => {
    setEditingSyahriahClass(className);
    setMonthlySyahriah(monthly);
    setYearlySyahriah(yearly);
    setIsEditSyahriahModalOpen(true);
  };

  const handleSaveSyahriah = () => {
    setSyahriahClasses(prevClasses =>
      prevClasses.map(classItem =>
        classItem.name === editingSyahriahClass
          ? {
              ...classItem,
              monthly: `Rp ${parseInt(monthlySyahriah).toLocaleString('id-ID')}`,
              yearly: `Rp ${parseInt(yearlySyahriah).toLocaleString('id-ID')}`
            }
          : classItem
      )
    );
    setIsEditSyahriahModalOpen(false);
  };

  const handleDeleteSyahriahClass = (className: string) => {
    if (window.confirm(`Are you sure you want to delete ${className}?`)) {
      setSyahriahClasses(prevClasses =>
        prevClasses.filter(classItem => classItem.name !== className)
      );
    }
  };

  const handleAddNewSyahriahClass = (className: string, monthlySyahriah: string, yearlySyahriah: string) => {
    setSyahriahClasses(prevClasses => [
      ...prevClasses,
      {
        name: className,
        monthly: `Rp ${parseInt(monthlySyahriah).toLocaleString('id-ID')}`,
        yearly: `Rp ${parseInt(yearlySyahriah).toLocaleString('id-ID')}`
      }
    ]);
  };

  const openAddSyahriahDialog = () => {
    setIsAddSyahriahDialogOpen(true);
  };

  const handleViewDetails = (transactionId: number) => {
    alert(`Viewing details for transaction ID: ${transactionId}`);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <Sidebar
        activeMenu={activeMenu}
        expandedMenu={expandedMenu}
        onMenuClick={handleMenuClick}
        onSubmenuClick={handleSubmenuClick}
        sidebarOpen={sidebarOpen}
      />

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        {/* Header */}
        <Header
          activeMenu={activeMenu}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
          {activeMenu === 'spp' && (
            <SPPManagement
              onEditModalOpen={openEditModal}
              sppClasses={sppClasses}
              onDeleteClass={handleDeleteClass}
              onAddNewClass={openAddClassDialog}
              onViewDetails={handleViewDetails}
            />
          )}
          {activeMenu === 'syahriah' && (
            <SyahriahManagement
              onEditModalOpen={openEditSyahriahModal}
              syahriahClasses={syahriahClasses}
              onDeleteClass={handleDeleteSyahriahClass}
              onAddNewClass={openAddSyahriahDialog}
              onViewDetails={handleViewDetails}
            />
          )}
        </main>
      </div>

      {/* Edit SPP Modal */}
      <EditSPPModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveSPP}
        editingClass={editingClass}
        monthlySpp={monthlySpp}
        semesterSpp={semesterSpp}
        onMonthlySppChange={setMonthlySpp}
        onSemesterSppChange={setSemesterSpp}
      />

      {/* Add Class Dialog */}
      <AddClassDialog
        isOpen={isAddClassDialogOpen}
        onClose={() => setIsAddClassDialogOpen(false)}
        onAddClass={handleAddNewClass}
      />

      {/* Edit Syahriah Modal */}
      <EditSyahriahModal
        isOpen={isEditSyahriahModalOpen}
        onClose={() => setIsEditSyahriahModalOpen(false)}
        onSave={handleSaveSyahriah}
        editingClass={editingSyahriahClass}
        monthlySyahriah={monthlySyahriah}
        yearlySyahriah={yearlySyahriah}
        onMonthlySyahriahChange={setMonthlySyahriah}
        onYearlySyahriahChange={setYearlySyahriah}
      />

      {/* Add Syahriah Dialog */}
      <AddSyahriahDialog
        isOpen={isAddSyahriahDialogOpen}
        onClose={() => setIsAddSyahriahDialogOpen(false)}
        onAddClass={handleAddNewSyahriahClass}
      />
    </div>
  );
}