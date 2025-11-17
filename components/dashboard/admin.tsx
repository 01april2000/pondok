"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "./admin/Sidebar";
import Header from "./admin/Header";
import SPPManagement from "./admin/SPPManagement";
import ClassFormModal from "./admin/ClassFormModal";
import SyahriahManagement from "./admin/SyahriahManagement";
import SyahriahFormModal from "./admin/SyahriahFormModal";
import SearchComponent from "./admin/SearchComponent";
import SantriManagement from "./admin/SantriManagement";
import SantriFormModal from "./admin/SantriFormModal";
import UangSakuManagement from "./admin/UangSakuManagement";
import UangSakuFormModal from "./admin/UangSakuFormModal";

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

interface AdminProps {
  initialActiveMenu?: string;
}

export default function Admin({ initialActiveMenu = "spp" }: AdminProps) {
  const [activeMenu, setActiveMenu] = useState(initialActiveMenu);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [classModalMode, setClassModalMode] = useState<"add" | "edit">("add");
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
  const [isSyahriahModalOpen, setIsSyahriahModalOpen] = useState(false);
  const [syahriahModalMode, setSyahriahModalMode] = useState<"add" | "edit">("add");
  const [editingSyahriahClass, setEditingSyahriahClass] = useState("");
  const [monthlySyahriah, setMonthlySyahriah] = useState("");
  const [yearlySyahriah, setYearlySyahriah] = useState("");
  const [syahriahClasses, setSyahriahClasses] = useState([
    { name: "Class X", monthly: "Rp 100.000", yearly: "Rp 1.200.000" },
    { name: "Class XI", monthly: "Rp 110.000", yearly: "Rp 1.320.000" },
    { name: "Class XII", monthly: "Rp 120.000", yearly: "Rp 1.440.000" }
  ]);

  // Santri state
  const [santriList, setSantriList] = useState([
    {
      id: 1, nis: "2023001", name: "Ahmad Fauzi", parentName: "Bapak Ahmad",
      class: "X-A", sppStatus: "Lunas", syahriahStatus: "Lunas",
      sppPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        unpaidMonths: [],
        totalPaid: 12,
        totalUnpaid: 0
      },
      syahriahPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        unpaidMonths: [],
        totalPaid: 12,
        totalUnpaid: 0
      }
    },
    {
      id: 2, nis: "2023002", name: "Siti Nurhaliza", parentName: "Ibu Siti",
      class: "XI-B", sppStatus: "Belum Lunas", syahriahStatus: "Lunas",
      sppPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus"],
        unpaidMonths: ["September", "Oktober", "November", "Desember"],
        totalPaid: 8,
        totalUnpaid: 4
      },
      syahriahPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        unpaidMonths: [],
        totalPaid: 12,
        totalUnpaid: 0
      }
    },
    {
      id: 3, nis: "2023003", name: "Budi Santoso", parentName: "Bapak Budi",
      class: "X-C", sppStatus: "Lunas", syahriahStatus: "Belum Lunas",
      sppPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        unpaidMonths: [],
        totalPaid: 12,
        totalUnpaid: 0
      },
      syahriahPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei"],
        unpaidMonths: ["Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        totalPaid: 5,
        totalUnpaid: 7
      }
    },
    {
      id: 4, nis: "2023004", name: "Rina Wijaya", parentName: "Ibu Rina",
      class: "XII-A", sppStatus: "Lunas", syahriahStatus: "Lunas",
      sppPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        unpaidMonths: [],
        totalPaid: 12,
        totalUnpaid: 0
      },
      syahriahPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        unpaidMonths: [],
        totalPaid: 12,
        totalUnpaid: 0
      }
    },
    {
      id: 5, nis: "2023005", name: "Andi Pratama", parentName: "Bapak Andi",
      class: "XI-C", sppStatus: "Belum Lunas", syahriahStatus: "Belum Lunas",
      sppPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April"],
        unpaidMonths: ["Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        totalPaid: 4,
        totalUnpaid: 8
      },
      syahriahPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret"],
        unpaidMonths: ["April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        totalPaid: 3,
        totalUnpaid: 9
      }
    },
    {
      id: 6, nis: "2023006", name: "Dewi Lestari", parentName: "Ibu Dewi",
      class: "X-B", sppStatus: "Lunas", syahriahStatus: "Lunas",
      sppPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        unpaidMonths: [],
        totalPaid: 12,
        totalUnpaid: 0
      },
      syahriahPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November"],
        unpaidMonths: ["Desember"],
        totalPaid: 11,
        totalUnpaid: 1
      }
    },
    {
      id: 7, nis: "2023007", name: "Eko Susilo", parentName: "Bapak Eko",
      class: "XII-B", sppStatus: "Belum Lunas", syahriahStatus: "Lunas",
      sppPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli"],
        unpaidMonths: ["Agustus", "September", "Oktober", "November", "Desember"],
        totalPaid: 7,
        totalUnpaid: 5
      },
      syahriahPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November"],
        unpaidMonths: ["Desember"],
        totalPaid: 11,
        totalUnpaid: 1
      }
    },
    {
      id: 8, nis: "2023008", name: "Fitri Handayani", parentName: "Ibu Fitri",
      class: "X-D", sppStatus: "Lunas", syahriahStatus: "Belum Lunas",
      sppPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober"],
        unpaidMonths: ["November", "Desember"],
        totalPaid: 10,
        totalUnpaid: 2
      },
      syahriahPaymentDetails: {
        paidMonths: ["Januari", "Februari", "Maret", "April", "Mei"],
        unpaidMonths: ["Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        totalPaid: 5,
        totalUnpaid: 7
      }
    }
  ]);
  const [isSantriModalOpen, setIsSantriModalOpen] = useState(false);
  const [santriModalMode, setSantriModalMode] = useState<"add" | "edit">("add");
  const [editingSantri, setEditingSantri] = useState<any>(null);

  // Uang Saku state
  const [isUangSakuModalOpen, setIsUangSakuModalOpen] = useState(false);
  const [uangSakuModalMode, setUangSakuModalMode] = useState<"add" | "edit">("add");
  const [editingUangSakuTransaction, setEditingUangSakuTransaction] = useState<any>(null);
  const [selectedSantriId, setSelectedSantriId] = useState<number | null>(null);
  const [transactionType, setTransactionType] = useState<"topup" | "withdrawal" | null>(null);
  
  // Santri balance state
  const [santriBalances, setSantriBalances] = useState<{ [key: number]: number }>({
    1: 250000,
    2: 150000,
    3: 50000,
    4: 300000,
    5: 75000,
    6: 200000,
    7: 100000,
    8: 180000,
  });
  
  // Transaction list state
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      santriId: 1,
      santriName: "Ahmad Fauzi",
      description: "Top up Uang Saku",
      amount: 100000,
      type: "topup" as const,
      time: "2 hours ago",
      status: "Completed" as const,
      statusColor: "green" as const
    },
    {
      id: 2,
      santriId: 2,
      santriName: "Siti Nurhaliza",
      description: "Pembelian Kantin",
      amount: 25000,
      type: "withdrawal" as const,
      time: "5 hours ago",
      status: "Completed" as const,
      statusColor: "green" as const
    },
    {
      id: 3,
      santriId: 3,
      santriName: "Budi Santoso",
      description: "Top up Uang Saku",
      amount: 50000,
      type: "topup" as const,
      time: "1 day ago",
      status: "Pending" as const,
      statusColor: "yellow" as const
    },
    {
      id: 4,
      santriId: 4,
      santriName: "Rina Wijaya",
      description: "Pembelian Laundry",
      amount: 15000,
      type: "withdrawal" as const,
      time: "2 days ago",
      status: "Completed" as const,
      statusColor: "green" as const
    },
    {
      id: 5,
      santriId: 5,
      santriName: "Andi Pratama",
      description: "Top up Uang Saku",
      amount: 75000,
      type: "topup" as const,
      time: "3 days ago",
      status: "Completed" as const,
      statusColor: "green" as const
    },
    {
      id: 6,
      santriId: 6,
      santriName: "Dewi Lestari",
      description: "Pembelian Kantin",
      amount: 30000,
      type: "withdrawal" as const,
      time: "4 days ago",
      status: "Failed" as const,
      statusColor: "red" as const
    },
    {
      id: 7,
      santriId: 7,
      santriName: "Eko Susilo",
      description: "Top up Uang Saku",
      amount: 100000,
      type: "topup" as const,
      time: "5 days ago",
      status: "Completed" as const,
      statusColor: "green" as const
    },
    {
      id: 8,
      santriId: 8,
      santriName: "Fitri Handayani",
      description: "Pembelian Buku",
      amount: 45000,
      type: "withdrawal" as const,
      time: "1 week ago",
      status: "Completed" as const,
      statusColor: "green" as const
    }
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
    setClassModalMode("edit");
    setIsClassModalOpen(true);
  };

  const handleSaveSPP = (className: string, monthlySpp: string, semesterSpp: string) => {
    if (classModalMode === "edit") {
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
    } else {
      // Add new class
      setSppClasses(prevClasses => [
        ...prevClasses,
        {
          name: className,
          monthly: `Rp ${parseInt(monthlySpp).toLocaleString('id-ID')}`,
          semester: `Rp ${parseInt(semesterSpp).toLocaleString('id-ID')}`
        }
      ]);
    }
    setIsClassModalOpen(false);
  };

  const handleDeleteClass = (className: string) => {
    if (window.confirm(`Are you sure you want to delete ${className}?`)) {
      setSppClasses(prevClasses =>
        prevClasses.filter(classItem => classItem.name !== className)
      );
    }
  };

  const openAddClassDialog = () => {
    setClassModalMode("add");
    setIsClassModalOpen(true);
  };

  // Syahriah handlers
  const openEditSyahriahModal = (className: string, monthly: string, yearly: string) => {
    setEditingSyahriahClass(className);
    setMonthlySyahriah(monthly);
    setYearlySyahriah(yearly);
    setSyahriahModalMode("edit");
    setIsSyahriahModalOpen(true);
  };

  const handleSaveSyahriah = (className: string, monthlySyahriah: string, yearlySyahriah: string) => {
    if (syahriahModalMode === "edit") {
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
    } else {
      // Add new class
      setSyahriahClasses(prevClasses => [
        ...prevClasses,
        {
          name: className,
          monthly: `Rp ${parseInt(monthlySyahriah).toLocaleString('id-ID')}`,
          yearly: `Rp ${parseInt(yearlySyahriah).toLocaleString('id-ID')}`
        }
      ]);
    }
    setIsSyahriahModalOpen(false);
  };

  const handleDeleteSyahriahClass = (className: string) => {
    if (window.confirm(`Are you sure you want to delete ${className}?`)) {
      setSyahriahClasses(prevClasses =>
        prevClasses.filter(classItem => classItem.name !== className)
      );
    }
  };

  const openAddSyahriahDialog = () => {
    setSyahriahModalMode("add");
    setIsSyahriahModalOpen(true);
  };

  // Santri handlers
  const openEditSantriModal = (santri: any) => {
    setEditingSantri(santri);
    setSantriModalMode("edit");
    setIsSantriModalOpen(true);
  };

  const handleSaveSantri = (santri: any) => {
    if (santriModalMode === "edit") {
      setSantriList(prevSantri =>
        prevSantri.map(item =>
          item.id === editingSantri.id ? {
            ...santri,
            id: editingSantri.id,
            // Preserve existing SPP payment details if not provided
            sppPaymentDetails: santri.sppPaymentDetails || item.sppPaymentDetails || {
              paidMonths: [],
              unpaidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
              totalPaid: 0,
              totalUnpaid: 12
            },
            // Preserve existing Syahriah payment details if not provided
            syahriahPaymentDetails: santri.syahriahPaymentDetails || item.syahriahPaymentDetails || {
              paidMonths: [],
              unpaidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
              totalPaid: 0,
              totalUnpaid: 12
            }
          } : item
        )
      );
    } else {
      // Add new santri
      const newSantri = {
        ...santri,
        id: Math.max(...santriList.map(s => s.id)) + 1,
        // Initialize SPP payment details for new santri
        sppPaymentDetails: santri.sppPaymentDetails || {
          paidMonths: [],
          unpaidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
          totalPaid: 0,
          totalUnpaid: 12
        },
        // Initialize Syahriah payment details for new santri
        syahriahPaymentDetails: santri.syahriahPaymentDetails || {
          paidMonths: [],
          unpaidMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
          totalPaid: 0,
          totalUnpaid: 12
        }
      };
      setSantriList(prevSantri => [...prevSantri, newSantri]);
    }
    setIsSantriModalOpen(false);
  };

  const handleDeleteSantri = (nis: string) => {
    if (window.confirm(`Are you sure you want to delete santri with NIS: ${nis}?`)) {
      setSantriList(prevSantri =>
        prevSantri.filter(item => item.nis !== nis)
      );
    }
  };

  const openAddSantriDialog = () => {
    setSantriModalMode("add");
    setIsSantriModalOpen(true);
  };

  // Uang Saku handlers
  const openEditUangSakuModal = (transaction: any) => {
    setEditingUangSakuTransaction(transaction);
    setUangSakuModalMode("edit");
    setIsUangSakuModalOpen(true);
  };

  const openAddUangSakuDialog = (santriId: number, type: "topup" | "withdrawal") => {
    setSelectedSantriId(santriId);
    setTransactionType(type);
    setUangSakuModalMode("add");
    setIsUangSakuModalOpen(true);
  };

  const handleSaveUangSaku = (transaction: any) => {
    // Update the transaction list
    if (uangSakuModalMode === "edit") {
      // Update existing transaction
      setTransactions(prevTransactions =>
        prevTransactions.map(t =>
          t.id === transaction.id ? transaction : t
        )
      );
    } else {
      // Add new transaction
      setTransactions(prevTransactions => [transaction, ...prevTransactions]);
    }
    
    // Update santri balance if transaction is completed
    if (transaction.status === "Completed") {
      setSantriBalances(prevBalances => {
        const currentBalance = prevBalances[transaction.santriId] || 0;
        let newBalance;
        
        if (transaction.type === "topup") {
          newBalance = currentBalance + transaction.amount;
        } else {
          newBalance = currentBalance - transaction.amount;
        }
        
        return {
          ...prevBalances,
          [transaction.santriId]: newBalance
        };
      });
    }
    
    setIsUangSakuModalOpen(false);
  };

  const handleViewSantriDetails = (santri: any) => {
    // This function will be handled by the SantriManagement component itself
    // We're passing it as a prop, but the actual implementation is in SantriManagement
    // The component will use its own state to show the modal
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
          {activeMenu === 'halaman-santri' && (
            <SantriManagement
              onEditModalOpen={openEditSantriModal}
              onAddNewSantri={openAddSantriDialog}
              onViewDetails={handleViewSantriDetails}
              onDeleteSantri={handleDeleteSantri}
              santriList={santriList}
            />
          )}
          {activeMenu === 'uang-saku' && (
            <UangSakuManagement
              onEditModalOpen={openEditUangSakuModal}
              onAddNewTransaction={openAddUangSakuDialog}
              onViewDetails={handleViewDetails}
              santriBalances={santriBalances}
              transactions={transactions}
            />
          )}
        </main>
      </div>

      {/* Class Form Modal (Add/Edit) */}
      <ClassFormModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        mode={classModalMode}
        initialData={classModalMode === "edit" ? {
          className: editingClass,
          monthlySpp: monthlySpp,
          semesterSpp: semesterSpp
        } : undefined}
        onSubmit={handleSaveSPP}
      />

      {/* Syahriah Form Modal (Add/Edit) */}
      <SyahriahFormModal
        isOpen={isSyahriahModalOpen}
        onClose={() => setIsSyahriahModalOpen(false)}
        mode={syahriahModalMode}
        initialData={syahriahModalMode === "edit" ? {
          className: editingSyahriahClass,
          monthlySyahriah: monthlySyahriah,
          yearlySyahriah: yearlySyahriah
        } : undefined}
        onSubmit={handleSaveSyahriah}
      />

      {/* Santri Form Modal (Add/Edit) */}
      <SantriFormModal
        isOpen={isSantriModalOpen}
        onClose={() => setIsSantriModalOpen(false)}
        mode={santriModalMode}
        initialData={santriModalMode === "edit" ? editingSantri : undefined}
        onSubmit={handleSaveSantri}
      />

      {/* Uang Saku Form Modal (Add/Edit) */}
      <UangSakuFormModal
        isOpen={isUangSakuModalOpen}
        onClose={() => setIsUangSakuModalOpen(false)}
        mode={uangSakuModalMode}
        initialData={uangSakuModalMode === "edit" ? {
          transaction: editingUangSakuTransaction
        } : {
          santriId: selectedSantriId || undefined,
          transactionType: transactionType || undefined
        }}
        onSubmit={handleSaveUangSaku}
        santriBalances={santriBalances}
      />
    </div>
  );
}